import { getSupabase } from './supabase'

export type BetaProfile = {
  allowed: boolean
  reason:
    | 'not_authenticated'
    | 'no_phone'
    | 'not_allowlisted'
    | 'disabled'
    | 'pending'
    | 'limit_exceeded'
    | null
  status: 'active' | 'disabled' | 'pending' | 'unknown' | null
  analyses_limit: number
  analyses_used: number
  analyses_remaining: number
  name: string | null
  law_firm: string | null
  area_of_practice: string | null
  profile_complete: boolean
}

type RpcProfile = {
  allowed?: boolean
  reason?: BetaProfile['reason']
  status?: BetaProfile['status']
  analyses_limit?: number
  analyses_used?: number
  analyses_remaining?: number
  name?: string | null
  law_firm?: string | null
  area_of_practice?: string | null
  profile_complete?: boolean
}

function toProfile(data: RpcProfile | null): BetaProfile {
  return {
    allowed: Boolean(data?.allowed),
    reason: data?.reason ?? null,
    status: data?.status ?? null,
    analyses_limit: data?.analyses_limit ?? 0,
    analyses_used: data?.analyses_used ?? 0,
    analyses_remaining: data?.analyses_remaining ?? 0,
    name: data?.name ?? null,
    law_firm: data?.law_firm ?? null,
    area_of_practice: data?.area_of_practice ?? null,
    profile_complete: Boolean(data?.profile_complete),
  }
}

export const EMPTY_BETA_PROFILE: BetaProfile = {
  allowed: false,
  reason: 'not_authenticated',
  status: null,
  analyses_limit: 0,
  analyses_used: 0,
  analyses_remaining: 0,
  name: null,
  law_firm: null,
  area_of_practice: null,
  profile_complete: false,
}

export const UNKNOWN_BETA_PROFILE: BetaProfile = {
  ...EMPTY_BETA_PROFILE,
  reason: 'not_allowlisted',
  status: 'unknown',
}

export async function fetchBetaProfile(): Promise<BetaProfile> {
  const client = getSupabase()
  const { data, error } = await client.rpc('get_beta_profile')

  if (error) {
    return { ...EMPTY_BETA_PROFILE }
  }

  return toProfile(data as RpcProfile)
}

export async function updateBetaProfile(input: {
  name: string
  law_firm: string
  area_of_practice: string
}): Promise<{ success: boolean; profile: BetaProfile }> {
  const client = getSupabase()
  const { data, error } = await client.rpc('update_beta_profile', {
    p_name: input.name,
    p_law_firm: input.law_firm,
    p_area_of_practice: input.area_of_practice,
  })

  if (error) {
    const profile = await fetchBetaProfile()
    return { success: false, profile }
  }

  const payload = data as { success?: boolean; profile?: RpcProfile }
  return {
    success: Boolean(payload?.success),
    profile: toProfile(payload?.profile ?? null),
  }
}

/** Reserved for post-acceptance quota consumption once the analysis API is wired. */
export async function consumeAnalysis(): Promise<{
  success: boolean
  profile: BetaProfile
}> {
  const client = getSupabase()
  const { data, error } = await client.rpc('consume_analysis')

  if (error) {
    const profile = await fetchBetaProfile()
    return { success: false, profile }
  }

  const payload = data as { success?: boolean; profile?: RpcProfile }
  return {
    success: Boolean(payload?.success),
    profile: toProfile(payload?.profile ?? null),
  }
}

export function betaAccessMessage(profile: BetaProfile): string {
  switch (profile.reason) {
    case 'disabled':
      return 'Your beta access has been paused. Contact us if you believe this is an error.'
    case 'pending':
      return 'Your access request is pending approval. We will notify you when your account is activated.'
    case 'not_allowlisted':
    case 'no_phone':
    default:
      return 'LexAudit is in private beta. Your number is not yet approved for access.'
  }
}

export function limitMessage(profile: BetaProfile): string {
  return `You have used all analyses included in your beta access (${profile.analyses_used} of ${profile.analyses_limit}). Contact us to request more.`
}

export function hasAnalysisQuota(profile: BetaProfile): boolean {
  return profile.analyses_used < profile.analyses_limit
}
