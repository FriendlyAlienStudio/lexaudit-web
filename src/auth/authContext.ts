import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { BetaProfile } from '../lib/betaAccess'

export type AuthContextValue = {
  configured: boolean
  loading: boolean
  session: Session | null
  user: User | null
  profile: BetaProfile | null
  profileLoading: boolean
  refreshProfile: () => Promise<BetaProfile | null>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
