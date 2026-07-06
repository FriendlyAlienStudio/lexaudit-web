import { useState, type FormEvent } from 'react'
import { updateBetaProfile } from '../../lib/betaAccess'
import { useAuth } from '../../auth/authContext'

export function OnboardingPage() {
  const { profile, refreshProfile } = useAuth()
  const [name, setName] = useState(profile?.name ?? '')
  const [lawFirm, setLawFirm] = useState(profile?.law_firm ?? '')
  const [areaOfPractice, setAreaOfPractice] = useState(profile?.area_of_practice ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !lawFirm.trim() || !areaOfPractice.trim()) {
      setError('Please complete all fields to continue.')
      return
    }

    setBusy(true)
    try {
      const result = await updateBetaProfile({
        name: name.trim(),
        law_firm: lawFirm.trim(),
        area_of_practice: areaOfPractice.trim(),
      })

      if (!result.success || !result.profile.profile_complete) {
        setError('Unable to save your profile. Please try again.')
        return
      }

      await refreshProfile()
    } catch {
      setError('Unable to save your profile. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="beta-card beta-card--narrow">
      <p className="beta-eyebrow">Private Beta</p>
      <h1 className="beta-title">Welcome to LexAudit Private Beta</h1>
      <p className="beta-lead">
        Before your first analysis, tell us a little about your practice so we can prioritize the
        right contract workflows.
      </p>

      <form className="beta-form" onSubmit={handleSubmit}>
        <label className="beta-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="beta-input"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
          required
        />

        <label className="beta-label" htmlFor="law-firm">
          Law firm
        </label>
        <input
          id="law-firm"
          className="beta-input"
          type="text"
          autoComplete="organization"
          value={lawFirm}
          onChange={(e) => setLawFirm(e.target.value)}
          disabled={busy}
          required
        />

        <label className="beta-label" htmlFor="area-of-practice">
          Area of practice
        </label>
        <input
          id="area-of-practice"
          className="beta-input"
          type="text"
          value={areaOfPractice}
          onChange={(e) => setAreaOfPractice(e.target.value)}
          disabled={busy}
          required
        />

        {error && <p className="beta-error" role="alert">{error}</p>}

        <button type="submit" className="beta-btn beta-btn-primary beta-btn-full" disabled={busy}>
          {busy ? 'Saving…' : 'Continue to LexAudit'}
        </button>
      </form>
    </div>
  )
}
