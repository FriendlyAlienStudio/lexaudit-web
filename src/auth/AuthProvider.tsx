import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { fetchBetaProfile, type BetaProfile } from '../lib/betaAccess'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured()
  const [loading, setLoading] = useState(configured)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<BetaProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const loadProfile = useCallback(async (activeSession: Session | null) => {
    if (!configured || !activeSession) {
      setProfile(null)
      return null
    }

    setProfileLoading(true)
    try {
      const next = await fetchBetaProfile()
      setProfile(next)
      return next
    } finally {
      setProfileLoading(false)
    }
  }, [configured])

  useEffect(() => {
    if (!configured) return

    const client = getSupabase()
    let mounted = true

    client.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setLoading(false)
      void loadProfile(data.session)
    })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
      void loadProfile(nextSession)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [configured, loadProfile])

  const refreshProfile = useCallback(async () => {
    return loadProfile(session)
  }, [loadProfile, session])

  const signOut = useCallback(async () => {
    if (!configured) return
    await getSupabase().auth.signOut()
    setProfile(null)
  }, [configured])

  const value = useMemo<AuthContextValue>(
    () => ({
      configured,
      loading,
      session,
      user: session?.user ?? null,
      profile,
      profileLoading,
      refreshProfile,
      signOut,
    }),
    [configured, loading, session, profile, profileLoading, refreshProfile, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
