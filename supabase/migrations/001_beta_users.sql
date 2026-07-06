-- LexAudit private beta allowlist
-- Apply in Supabase SQL editor or via supabase db push

CREATE TABLE IF NOT EXISTS public.beta_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('active', 'disabled', 'pending')),
  analyses_limit integer NOT NULL DEFAULT 5
    CHECK (analyses_limit >= 0),
  analyses_used integer NOT NULL DEFAULT 0
    CHECK (analyses_used >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT analyses_used_within_limit CHECK (analyses_used <= analyses_limit)
);

CREATE INDEX IF NOT EXISTS beta_users_phone_idx ON public.beta_users (phone);

COMMENT ON TABLE public.beta_users IS
  'Allowlisted beta testers keyed by normalized E.164 phone number.';

-- Normalize user-entered phone numbers to E.164 for consistent lookups.
CREATE OR REPLACE FUNCTION public.normalize_phone(raw_phone text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  digits text;
BEGIN
  IF raw_phone IS NULL OR btrim(raw_phone) = '' THEN
    RETURN NULL;
  END IF;

  digits := regexp_replace(raw_phone, '[^0-9+]', '', 'g');

  IF digits LIKE '+%' THEN
    RETURN '+' || regexp_replace(substring(digits from 2), '[^0-9]', '', 'g');
  END IF;

  digits := regexp_replace(digits, '[^0-9]', '', 'g');

  IF digits LIKE '0%' AND length(digits) >= 9 THEN
    RETURN '+972' || substring(digits from 2);
  END IF;

  IF digits LIKE '972%' THEN
    RETURN '+' || digits;
  END IF;

  RETURN '+' || digits;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS beta_users_updated_at ON public.beta_users;
CREATE TRIGGER beta_users_updated_at
  BEFORE UPDATE ON public.beta_users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Returns allowlist status and analysis quota for the authenticated user.
CREATE OR REPLACE FUNCTION public.get_beta_profile()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_phone text;
  normalized text;
  row public.beta_users;
  remaining integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'not_authenticated',
      'status', null,
      'analyses_limit', 0,
      'analyses_used', 0,
      'analyses_remaining', 0
    );
  END IF;

  SELECT phone INTO auth_phone FROM auth.users WHERE id = auth.uid();
  normalized := public.normalize_phone(auth_phone);

  IF normalized IS NULL THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'no_phone',
      'status', null,
      'analyses_limit', 0,
      'analyses_used', 0,
      'analyses_remaining', 0
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
      'analyses_remaining', 0
    );
  END IF;

  remaining := greatest(0, row.analyses_limit - row.analyses_used);

  IF row.status = 'disabled' THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'disabled',
      'status', row.status,
      'analyses_limit', row.analyses_limit,
      'analyses_used', row.analyses_used,
      'analyses_remaining', remaining
    );
  END IF;

  IF row.status <> 'active' THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'pending',
      'status', row.status,
      'analyses_limit', row.analyses_limit,
      'analyses_used', row.analyses_used,
      'analyses_remaining', remaining
    );
  END IF;

  RETURN json_build_object(
    'allowed', true,
    'reason', null,
    'status', row.status,
    'analyses_limit', row.analyses_limit,
    'analyses_used', row.analyses_used,
    'analyses_remaining', remaining
  );
END;
$$;

-- Atomically consume one analysis slot if the user is active and under limit.
CREATE OR REPLACE FUNCTION public.consume_analysis()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_phone text;
  normalized text;
  profile json;
BEGIN
  profile := public.get_beta_profile();

  IF NOT COALESCE((profile ->> 'allowed')::boolean, false) THEN
    RETURN json_build_object('success', false, 'reason', profile ->> 'reason', 'profile', profile);
  END IF;

  IF COALESCE((profile ->> 'analyses_remaining')::integer, 0) <= 0 THEN
    profile := public.get_beta_profile();
    RETURN json_build_object('success', false, 'reason', 'limit_exceeded', 'profile', profile);
  END IF;

  SELECT phone INTO auth_phone FROM auth.users WHERE id = auth.uid();
  normalized := public.normalize_phone(auth_phone);

  UPDATE public.beta_users
  SET analyses_used = analyses_used + 1
  WHERE phone = normalized
    AND status = 'active'
    AND analyses_used < analyses_limit;

  IF NOT FOUND THEN
    profile := public.get_beta_profile();
    RETURN json_build_object('success', false, 'reason', 'limit_exceeded', 'profile', profile);
  END IF;

  profile := public.get_beta_profile();
  RETURN json_build_object('success', true, 'reason', null, 'profile', profile);
END;
$$;

REVOKE ALL ON FUNCTION public.get_beta_profile() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_analysis() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_beta_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_analysis() TO authenticated;

ALTER TABLE public.beta_users ENABLE ROW LEVEL SECURITY;

-- No client policies: allowlist is read only through SECURITY DEFINER RPCs.
-- Manage rows via Supabase dashboard or service role.

-- Example seed (replace with real beta numbers):
-- INSERT INTO public.beta_users (phone, status, analyses_limit)
-- VALUES (public.normalize_phone('+972544561132'), 'active', 10);
