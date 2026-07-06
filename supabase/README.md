# Supabase setup — LexAudit private beta

## 1. Create a Supabase project

Enable **Phone** auth in Authentication → Providers.

## 2. Run the migration

Apply `supabase/migrations/001_beta_users.sql` in the SQL editor (or via Supabase CLI).

## 3. Add allowlisted users

Insert normalized E.164 numbers:

```sql
INSERT INTO public.beta_users (phone, status, analyses_limit)
VALUES
  (public.normalize_phone('+972544561132'), 'active', 10);
```

Status values: `active`, `disabled`, `pending`.

## 4. Configure the web app

Copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 5. Access flow

1. User opens `/beta/`
2. Enters phone → Supabase sends OTP
3. User verifies OTP → session created
4. App calls `get_beta_profile()` RPC
5. Access granted only when `status = active`
6. If profile fields are missing → short onboarding form (`update_beta_profile()`)
7. Upload/analysis: quota is checked before start; `consume_analysis()` runs **only after** the backend accepts a job (when `VITE_ANALYSIS_API_URL` is configured)

Apply `supabase/migrations/002_beta_user_profile.sql` after the initial migration for name, law firm, and area of practice fields.

Direct reads/writes to `beta_users` from the client are blocked by RLS; only RPCs expose allowlist state.
