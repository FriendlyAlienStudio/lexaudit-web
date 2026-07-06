import { betaAccessMessage, UNKNOWN_BETA_PROFILE, type BetaProfile } from '../../lib/betaAccess'

type RequestAccessProps = {
  profile: BetaProfile | null
  onSignOut: () => void
}

export function RequestAccess({ profile, onSignOut }: RequestAccessProps) {
  const message = profile ? betaAccessMessage(profile) : betaAccessMessage(UNKNOWN_BETA_PROFILE)

  return (
    <div className="beta-card beta-card--narrow">
      <p className="beta-eyebrow">Private Beta</p>
      <h1 className="beta-title">Request access</h1>
      <p className="beta-lead">{message}</p>
      <p className="beta-note">
        LexAudit is available to approved legal professionals during private beta.
      </p>
      <div className="beta-actions">
        <a className="beta-btn beta-btn-primary" href="mailto:hello@lexaudit.ai?subject=LexAudit%20Beta%20Access">
          Request access
        </a>
        <button type="button" className="beta-btn beta-btn-secondary" onClick={onSignOut}>
          Use a different number
        </button>
      </div>
    </div>
  )
}
