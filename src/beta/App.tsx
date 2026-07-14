import { useAuth } from '../auth/authContext'
import { RequestAccess } from './components/RequestAccess'
import { BetaAppPage } from './pages/BetaAppPage'
import { LoginPage } from './pages/LoginPage'
import { OnboardingPage } from './pages/OnboardingPage'

function ConfigMissing() {
  return (
    <div className="beta-card beta-card--narrow">
      <p className="beta-eyebrow">Private Beta</p>
      <h1 className="beta-title">Beta not configured</h1>
      <p className="beta-lead">
        Supabase environment variables are missing. Set <code>VITE_SUPABASE_URL</code> and{' '}
        <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.
      </p>
      <a className="beta-btn beta-btn-secondary" href="/">
        Back to homepage
      </a>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="beta-card beta-card--narrow">
      <p className="beta-eyebrow">Private Beta</p>
      <p className="beta-lead">Loading…</p>
    </div>
  )
}

export default function BetaApp() {
  const { configured, loading, session, profile, profileLoading, signOut } = useAuth()

  if (!configured) return <ConfigMissing />

  const awaitingInitialProfile = Boolean(session && !profile && profileLoading)
  if (loading || awaitingInitialProfile) return <LoadingState />

  if (!session) return <LoginPage />

  if (!profile?.allowed) {
    return <RequestAccess profile={profile} onSignOut={() => void signOut()} />
  }

  if (!profile.profile_complete) {
    return <OnboardingPage />
  }

  return <BetaAppPage />
}
