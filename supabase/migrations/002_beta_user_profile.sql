-- LexAudit beta user profile fields + onboarding RPCs
-- Safe to apply after 001_beta_users.sql (additive only).

ALTER TABLE public.beta_users
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS law_firm text,
  ADD COLUMN IF NOT EXISTS area_of_practice text;

COMMENT ON COLUMN public.beta_users.name IS 'Beta user display name (collected at onboarding).';
COMMENT ON COLUMN public.beta_users.law_firm IS 'Law firm or organization.';
COMMENT ON COLUMN public.beta_users.area_of_practice IS 'Primary area of legal practice.';

-- Helper: true when all onboarding profile fields are present.
CREATE OR REPLACE FUNCTION public.beta_profile_complete(
  p_name text,
  p_law_firm text,
  p_area_of_practice text
)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT
    NULLIF(btrim(COALESCE(p_name, '')), '') IS NOT NULL
    AND NULLIF(btrim(COALESCE(p_law_firm, '')), '') IS NOT NULL
    AND NULLIF(btrim(COALESCE(p_area_of_practice, '')), '') IS NOT NULL;
$$;

-- Resolve the authenticated user's normalized phone (null if unavailable).
CREATE OR REPLACE FUNCTION public.auth_normalized_phone()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_phone text;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT phone INTO auth_phone FROM auth.users WHERE id = auth.uid();
  RETURN public.normalize_phone(auth_phone);
END;
$$;

REVOKE ALL ON FUNCTION public.auth_normalized_phone() FROM PUBLIC;

-- Returns allowlist status, quota, and profile fields for the authenticated user.
CREATE OR REPLACE FUNCTION public.get_beta_profile()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized text;
  row public.beta_users;
  remaining integer;
  complete boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'not_authenticated',
      'status', null,
      'analyses_limit', 0,
      'analyses_used', 0,
      'analyses_remaining', 0,
      'name', null,
      'law_firm', null,
      'area_of_practice', null,
      'profile_complete', false
    );
  END IF;

  normalized := public.auth_normalized_phone();

  IF normalized IS NULL THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'no_phone',
      'status', null,
      'analyses_limit', 0,
      'analyses_used', 0,
      'analyses_remaining', 0,
      'name', null,
      'law_firm', null,
      'area_of_practice', null,
      'profile_complete', false
    );
  END IF;

  SELECT * INTO row FROM public.beta_users WHERE phone = normalized;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'not_allowlisted',
      'status', 'unknown',
      'analyses_limit', 0,
      'analyses_used', 0,
      'analyses_remaining', 0,
      'name', null,
      'law_firm', null,
      'area_of_practice', null,
      'profile_complete', false
    );
  END IF;

  remaining := greatest(0, row.analyses_limit - row.analyses_used);
  complete := public.beta_profile_complete(row.name, row.law_firm, row.area_of_practice);

  IF row.status = 'disabled' THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'disabled',
      'status', row.status,
      'analyses_limit', row.analyses_limit,
      'analyses_used', row.analyses_used,
      'analyses_remaining', remaining,
      'name', row.name,
      'law_firm', row.law_firm,
      'area_of_practice', row.area_of_practice,
      'profile_complete', complete
    );
  END IF;

  IF row.status <> 'active' THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'pending',
      'status', row.status,
      'analyses_limit', row.analyses_limit,
      'analyses_used', row.analyses_used,
      'analyses_remaining', remaining,
      'name', row.name,
      'law_firm', row.law_firm,
      'area_of_practice', row.area_of_practice,
      'profile_complete', complete
    );
  END IF;

  RETURN json_build_object(
    'allowed', true,
    'reason', null,
    'status', row.status,
    'analyses_limit', row.analyses_limit,
    'analyses_used', row.analyses_used,
    'analyses_remaining', remaining,
    'name', row.name,
    'law_firm', row.law_firm,
    'area_of_practice', row.area_of_practice,
    'profile_complete', complete
  );
END;
$$;

-- Update profile fields for the authenticated user's own allowlist row only.
CREATE OR REPLACE FUNCTION public.update_beta_profile(
  p_name text,
  p_law_firm text,
  p_area_of_practice text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized text;
  clean_name text;
  clean_firm text;
  clean_area text;
BEGIN
  normalized := public.auth_normalized_phone();

  IF normalized IS NULL THEN
    RETURN json_build_object('success', false, 'profile', public.get_beta_profile());
  END IF;

  clean_name := NULLIF(btrim(COALESCE(p_name, '')), '');
  clean_firm := NULLIF(btrim(COALESCE(p_law_firm, '')), '');
  clean_area := NULLIF(btrim(COALESCE(p_area_of_practice, '')), '');

  IF clean_name IS NULL OR clean_firm IS NULL OR clean_area IS NULL THEN
    RETURN json_build_object('success', false, 'profile', public.get_beta_profile());
  END IF;

  UPDATE public.beta_users
  SET
    name = clean_name,
    law_firm = clean_firm,
    area_of_practice = clean_area
  WHERE phone = normalized
    AND status = 'active';

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'profile', public.get_beta_profile());
  END IF;

  RETURN json_build_object('success', true, 'profile', public.get_beta_profile());
END;
$$;

REVOKE ALL ON FUNCTION public.update_beta_profile(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_beta_profile(text, text, text) TO authenticated;
