import { consumeAnalysis, type BetaProfile } from './betaAccess'
import { getSupabase } from './supabase'

const analysisApiUrl = import.meta.env.VITE_ANALYSIS_API_URL

export type AnalysisJobResult =
  | {
      status: 'accepted'
      jobId: string
      profile: BetaProfile
      fileName: string
    }
  | {
      status: 'not_configured'
      fileName: string
    }
  | {
      status: 'failed'
      fileName: string
    }

/**
 * Submit a contract for analysis.
 *
 * Quota policy:
 * - Before upload: caller must verify analyses_used < analyses_limit.
 * - Quota is consumed ONLY after the backend accepts the job (returns a job/report id).
 * - If the API is not configured or the request fails, no quota is consumed.
 */
export async function submitAnalysisJob(file: File): Promise<AnalysisJobResult> {
  if (!analysisApiUrl) {
    // TODO(RR-API): Remove this branch once VITE_ANALYSIS_API_URL is configured.
    // Until then, do not call consume_analysis() — failed or preview uploads must not burn quota.
    return { status: 'not_configured', fileName: file.name }
  }

  const client = getSupabase()
  const { data: sessionData } = await client.auth.getSession()
  const accessToken = sessionData.session?.access_token

  const body = new FormData()
  body.append('file', file)

  let response: Response
  try {
    response = await fetch(analysisApiUrl, {
      method: 'POST',
      body,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  } catch {
    return { status: 'failed', fileName: file.name }
  }

  if (!response.ok) {
    return { status: 'failed', fileName: file.name }
  }

  let jobId: string | undefined
  try {
    const payload = (await response.json()) as {
      job_id?: string
      report_id?: string
      id?: string
    }
    jobId = payload.job_id ?? payload.report_id ?? payload.id
  } catch {
    return { status: 'failed', fileName: file.name }
  }

  if (!jobId) {
    return { status: 'failed', fileName: file.name }
  }

  // Backend accepted the job — now consume one analysis slot.
  const quota = await consumeAnalysis()
  if (!quota.success) {
    return { status: 'failed', fileName: file.name }
  }

  return {
    status: 'accepted',
    jobId,
    profile: quota.profile,
    fileName: file.name,
  }
}

export function isAnalysisApiConfigured(): boolean {
  return Boolean(analysisApiUrl)
}
