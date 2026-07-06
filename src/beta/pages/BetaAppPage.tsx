import { useState, type FormEvent } from 'react'
import { hasAnalysisQuota, limitMessage } from '../../lib/betaAccess'
import { isAnalysisApiConfigured, submitAnalysisJob } from '../../lib/analysisJob'
import { useAuth } from '../../auth/authContext'

export function BetaAppPage() {
  const { profile, refreshProfile, signOut } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!profile?.allowed || !profile.profile_complete) return null

  const activeProfile = profile
  const atLimit = !hasAnalysisQuota(activeProfile)
  const apiConfigured = isAnalysisApiConfigured()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setMessage(null)

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

      if (result.status === 'accepted') {
        await refreshProfile()
        setMessage(
          `Analysis accepted for "${result.fileName}" (ref ${result.jobId}). Usage: ${result.profile.analyses_used} of ${result.profile.analyses_limit}.`,
        )
        setFile(null)
        return
      }

      if (result.status === 'not_configured') {
        // Quota is not consumed — backend not wired yet.
        setMessage(
          `"${result.fileName}" is ready to analyze. The analysis service is not connected yet — no quota was used. Remaining analyses: ${activeProfile.analyses_remaining}.`,
        )
        setFile(null)
        return
      }

      setError('Unable to start analysis. Please try again.')
    } catch {
      setError('Unable to start analysis. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="beta-card">
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
          Analysis API is not configured yet. You can select a file to preview the flow — quota will
          not be used until a job is accepted by the backend.
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
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={busy || atLimit}
        />
        <p className="beta-hint">PDF, Word, or plain text. Your document stays confidential.</p>

        {error && <p className="beta-error" role="alert">{error}</p>}
        {message && <p className="beta-success" role="status">{message}</p>}

        <button
          type="submit"
          className="beta-btn beta-btn-primary"
          disabled={busy || atLimit || !file}
        >
          {busy ? 'Starting…' : 'Start analysis'}
        </button>
      </form>
    </div>
  )
}
