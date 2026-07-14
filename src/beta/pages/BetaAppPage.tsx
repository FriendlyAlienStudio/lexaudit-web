import { useState, type FormEvent } from 'react'
import { hasAnalysisQuota, limitMessage } from '../../lib/betaAccess'
import {
  isAnalysisApiConfigured,
  submitAnalysisJob,
  type AnalysisJobResult,
} from '../../lib/analysisJob'
import { useAuth } from '../../auth/authContext'

type CompletedAnalysis = Extract<AnalysisJobResult, { status: 'success' }>

function formatContractType(value: string): string {
  return value.replace(/_/g, ' ')
}

function formatRiskLevel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function BetaAppPage() {
  const { profile, refreshProfile, signOut } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<CompletedAnalysis | null>(null)

  if (!profile?.allowed || !profile.profile_complete) {
    return null
  }

  const activeProfile = profile
  const atLimit = !hasAnalysisQuota(activeProfile)
  const apiConfigured = isAnalysisApiConfigured()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setReport(null)

    if (!file) {
      setError('Select a contract file to analyze.')
      return
    }

    if (atLimit) {
      setError(limitMessage(activeProfile))
      return
    }

    setBusy(true)
    try {
      const result = await submitAnalysisJob(file)

      if (result.status === 'success') {
        await refreshProfile()
        setReport(result)
        setMessage(`Analysis complete for "${result.fileName}".`)
        setFile(null)
        return
      }

      if (result.status === 'not_configured') {
        setMessage(
          `"${result.fileName}" is ready to analyze. The analysis backend is not configured — no quota was used. Remaining analyses: ${activeProfile.analyses_remaining}.`,
        )
        setFile(null)
        return
      }

      setError(
        result.detail ??
          'Unable to complete analysis. Please try again or contact support if the problem continues.',
      )
    } catch {
      setError('Unable to complete analysis. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="beta-card beta-card--wide">
      <div className="beta-app-head">
        <div>
          <p className="beta-eyebrow">Private Beta</p>
          <h1 className="beta-title">New analysis</h1>
        </div>
        <button type="button" className="beta-link-btn" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>

      <p className="beta-lead">
        Upload a contract for structured legal analysis. This beta includes{' '}
        <strong>{activeProfile.analyses_remaining}</strong> remaining{' '}
        {activeProfile.analyses_remaining === 1 ? 'analysis' : 'analyses'} (
        {activeProfile.analyses_used} of {activeProfile.analyses_limit} used).
      </p>

      {!apiConfigured && (
        <p className="beta-hint">
          Analysis backend is not configured yet. You can select a file to preview the flow — quota
          will not be used until analysis succeeds.
        </p>
      )}

      {atLimit && (
        <p className="beta-warning" role="status">
          {limitMessage(activeProfile)}
        </p>
      )}

      <form className="beta-form" onSubmit={handleSubmit}>
        <label className="beta-label" htmlFor="contract">
          Contract file
        </label>
        <input
          id="contract"
          className="beta-input beta-input-file"
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null)
            setError(null)
            setMessage(null)
          }}
          disabled={busy || atLimit}
        />
        {file && (
          <p className="beta-selected-file">
            Selected: <span dir="ltr">{file.name}</span>
          </p>
        )}
        <p className="beta-hint">PDF, Word (.docx), or plain text. Your document stays confidential.</p>

        {error && (
          <p className="beta-error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="beta-success" role="status">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="beta-btn beta-btn-primary"
          disabled={busy || atLimit || !file}
        >
          {busy ? 'Analyzing…' : 'Start analysis'}
        </button>
      </form>

      {busy && (
        <p className="beta-loading" role="status">
          Reviewing contract and preparing your report. This usually takes under a minute.
        </p>
      )}

      {report && (
        <section className="beta-report" aria-label="Analysis report">
          <div className="beta-report-summary">
            <div>
              <p className="beta-label">Contract type</p>
              <p className="beta-report-value">{formatContractType(report.contractType)}</p>
            </div>
            <div>
              <p className="beta-label">Risk level</p>
              <p className="beta-report-value">{formatRiskLevel(report.riskLevel)}</p>
            </div>
            <div>
              <p className="beta-label">Remaining analyses</p>
              <p className="beta-report-value">{report.profile.analyses_remaining}</p>
            </div>
            <div className="beta-report-actions">
              <a
                className="beta-btn beta-btn-secondary"
                href={report.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF report
              </a>
            </div>
          </div>

          <iframe
            className="beta-report-frame"
            title={`Analysis report for ${report.fileName}`}
            srcDoc={report.html}
            sandbox=""
            referrerPolicy="no-referrer"
          />
        </section>
      )}
    </div>
  )
}
