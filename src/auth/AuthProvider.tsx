import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { fetchBetaProfile, type BetaProfile } from '../lib/betaAccess'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './authContext'

const PROFILE_LOAD_EVENTS = new Set<AuthChangeEvent>([
  'INITIAL_SESSION',
  'SIGNED_IN',
  'SIGNED_OUT',
  'USER_UPDATED',
])

function devLog(label: string, detail?: unknown) {
  if (import.meta.env.DEV) console.debug(`[beta-auth] ${label}`, detail ?? '')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured()
  const [loading, setLoading] = useState(configured)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<BetaProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const sessionRef = useRef<Session | null>(null)
  const hasProfileRef = useRef(false)
  const profileRequestRef = useRef(0)
  const profileInFlightRef = useRef<Promise<BetaProfile | null> | null>(null)

  useEffect(() => {
    hasProfileRef.current = profile !== null
  }, [profile])

  const loadProfile = useCallback(
    async (activeSession: Session | null, reason: string, force = false) => {
      devLog('profile refresh', reason)

      if (!configured) {
        setProfile(null)
        return null
      }

      if (!activeSession) {
        setProfile(null)
        hasProfileRef.current = false
        return null
      }

      if (profileInFlightRef.current && !force) {
        return profileInFlightRef.current
      }

      const requestId = ++profileRequestRef.current
      if (!hasProfileRef.current) {
        setProfileLoading(true)
      }

      const request = (async () => {
        try {
          const next = await fetchBetaProfile()
          if (requestId !== profileRequestRef.current) return null
          devLog('profile loaded', {
            allowed: next.allowed,
            profile_complete: next.profile_complete,
            analyses_remaining: next.analyses_remaining,
          })
          setProfile(next)
          hasProfileRef.current = true
          return next
        } finally {
          if (requestId === profileRequestRef.current) {
            setProfileLoading(false)
            profileInFlightRef.current = null
          }
        }
      })()

      profileInFlightRef.current = request
      return request
    },
    [configured],
  )

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }

    const client = getSupabase()
    let mounted = true
    const initialSessionHandledRef = { current: false }

    const handleSession = (nextSession: Session | null, reason: string, loadProfileNow: boolean) => {
      sessionRef.current = nextSession
      setSession(nextSession)
      setLoading(false)

      if (loadProfileNow) {
        void loadProfile(nextSession, reason)
      }
    }

    client.auth.getSession().then(({ data }) => {
      if (!mounted) return

      devLog('session loaded', data.session?.user?.id ?? null)
      if (initialSessionHandledRef.current) return
      initialSessionHandledRef.current = true
      handleSession(data.session, 'getSession', true)
    })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, nextSession) => {
      if (!mounted) return

      devLog('auth state changed', event)

      if (event === 'TOKEN_REFRESHED') {
        sessionRef.current = nextSession
        setSession(nextSession)
        setLoading(false)
        return
      }

      if (event === 'INITIAL_SESSION') {
        if (initialSessionHandledRef.current) return
        initialSessionHandledRef.current = true
        handleSession(nextSession, event, true)
        return
      }

      if (!PROFILE_LOAD_EVENTS.has(event)) return

      handleSession(nextSession, event, true)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [configured, loadProfile])

  const refreshProfile = useCallback(async () => {
    profileRequestRef.current += 1
    profileInFlightRef.current = null
    return loadProfile(sessionRef.current, 'manual refresh', true)
  }, [loadProfile])

  const signOut = useCallback(async () => {
    if (!configured) return
    profileRequestRef.current += 1
    profileInFlightRef.current = null
    await getSupabase().auth.signOut()
    sessionRef.current = null
    setSession(null)
    setProfile(null)
    hasProfileRef.current = false
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
