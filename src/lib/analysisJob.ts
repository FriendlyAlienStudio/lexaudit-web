import { consumeAnalysis, type BetaProfile } from './betaAccess'

const analysisApiUrl = import.meta.env.VITE_ANALYSIS_API_URL as string | undefined

export type AnalysisApiResponse = {
  success: boolean
  contract_type: string
  risk_level: string
  html: string
  pdf_url: string
  report_data: Record<string, unknown>
}

export type AnalysisJobResult =
  | {
      status: 'success'
      fileName: string
      contractType: string
      riskLevel: string
      html: string
      pdfUrl: string
      profile: BetaProfile
    }
  | {
      status: 'not_configured'
      fileName: string
    }
  | {
      status: 'failed'
      fileName: string
      detail?: string
    }

function analysisBaseUrl(): string {
  return analysisApiUrl!.replace(/\/$/, '')
}

function isDev(): boolean {
  return import.meta.env.DEV
}

function devFailureMessage(productionMessage: string, developmentMessage: string): string {
  return isDev() ? developmentMessage : productionMessage
}

function devAnalysisLog(phase: string, detail: Record<string, unknown>) {
  if (!isDev()) return
  console.debug(`[analysis-api] ${phase}`, detail)
}

function errorDetails(err: unknown): { message: string; stack?: string } {
  if (err instanceof Error) {
    return { message: err.message, stack: err.stack }
  }
  return { message: String(err) }
}

function userFacingApiError(status: number, detail: string | undefined): string {
  if (status >= 500) {
    return 'Unable to complete analysis. Please try again or contact support if the problem continues.'
  }

  if (detail && detail.length <= 200 && !/traceback|exception|error:/i.test(detail)) {
    return detail
  }

  return 'Unable to complete analysis. Please try again.'
}

export function analysisAnalyzeUrl(): string {
  return `${analysisBaseUrl()}/analyze`
}

export function analysisPdfUrl(pdfPath: string): string {
  const normalizedPath = pdfPath.startsWith('/') ? pdfPath : `/${pdfPath}`
  return `${analysisBaseUrl()}${normalizedPath}`
}

/**
 * Submit a contract for analysis.
 *
 * Quota policy:
 * - Before upload: caller must verify analyses_used < analyses_limit.
 * - Quota is consumed ONLY after the analysis API returns success.
 * - If the API is not configured or the request fails, no quota is consumed.
 */
export async function submitAnalysisJob(file: File): Promise<AnalysisJobResult> {
  if (!analysisApiUrl) {
    return { status: 'not_configured', fileName: file.name }
  }

  const url = analysisAnalyzeUrl()
  const body = new FormData()
  body.append('contract_file', file)

  devAnalysisLog('request start', { url, fileName: file.name, fileSize: file.size })

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      body,
    })
  } catch (err) {
    const { message, stack } = errorDetails(err)
    devAnalysisLog('fetch failed — request never left the browser (network/CORS)', {
      url,
      error: message,
      stack,
      err,
    })
    return {
      status: 'failed',
      fileName: file.name,
      detail: devFailureMessage(
        'Could not reach the analysis service. Please try again.',
        `[Network/CORS] ${message} (POST ${url})`,
      ),
    }
  }

  const rawBody = await response.text()

  devAnalysisLog('response received', {
    url,
    status: response.status,
    statusText: response.statusText,
    body: rawBody,
  })

  if (!response.ok) {
    let rawDetail: string | undefined
    try {
      const payload = JSON.parse(rawBody) as { detail?: string | Array<{ msg?: string }> }
      if (typeof payload.detail === 'string') {
        rawDetail = payload.detail
      } else if (Array.isArray(payload.detail) && payload.detail[0]?.msg) {
        rawDetail = payload.detail[0].msg
      }
    } catch {
      // Body was not JSON — rawBody is logged above.
    }

    const detail = rawDetail ?? rawBody ?? response.statusText
    const devMessage = `[HTTP ${response.status}] ${detail}`
    return {
      status: 'failed',
      fileName: file.name,
      detail: devFailureMessage(userFacingApiError(response.status, rawDetail), devMessage),
    }
  }

  let payload: AnalysisApiResponse
  try {
    payload = JSON.parse(rawBody) as AnalysisApiResponse
  } catch (err) {
    const { message, stack } = errorDetails(err)
    devAnalysisLog('parse failed — request reached API but response body is not valid JSON', {
      url,
      status: response.status,
      body: rawBody,
      error: message,
      stack,
    })
    return {
      status: 'failed',
      fileName: file.name,
      detail: devFailureMessage(
        'The analysis service returned an invalid response.',
        `[Parse error] HTTP ${response.status}: ${message}`,
      ),
    }
  }

  if (!payload.success || !payload.html || !payload.pdf_url) {
    devAnalysisLog('incomplete payload — request reached API but report fields missing', {
      url,
      status: response.status,
      success: payload.success,
      hasHtml: Boolean(payload.html),
      hasPdfUrl: Boolean(payload.pdf_url),
      body: rawBody,
    })
    return {
      status: 'failed',
      fileName: file.name,
      detail: devFailureMessage(
        'The analysis service did not return a complete report.',
        `[Incomplete response] HTTP ${response.status}: missing success/html/pdf_url`,
      ),
    }
  }

  const quota = await consumeAnalysis()
  if (!quota.success) {
    if (import.meta.env.DEV) console.debug('consume_analysis RPC failed after successful analysis')
    return {
      status: 'failed',
      fileName: file.name,
      detail: 'Your report was generated, but usage could not be recorded. Please contact support.',
    }
  }

  return {
    status: 'success',
    fileName: file.name,
    contractType: payload.contract_type,
    riskLevel: payload.risk_level,
    html: payload.html,
    pdfUrl: analysisPdfUrl(payload.pdf_url),
    profile: quota.profile,
  }
}

export function isAnalysisApiConfigured(): boolean {
  return Boolean(analysisApiUrl)
}
