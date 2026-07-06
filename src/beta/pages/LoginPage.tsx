import { useState, type FormEvent } from 'react'
import { normalizePhone } from '../../lib/phone'
import { getSupabase } from '../../lib/supabase'
import { otpSendErrorMessage, otpVerifyErrorMessage } from '../../lib/authErrors'
import { useAuth } from '../../auth/authContext'

type Step = 'phone' | 'otp'

export function LoginPage() {
  const { refreshProfile } = useAuth()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [normalizedPhone, setNormalizedPhone] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSendOtp(event: FormEvent) {
    event.preventDefault()
    setError(null)

    const e164 = normalizePhone(phone)
    if (!e164 || e164.length < 10) {
      setError('Enter a valid phone number including country code.')
      return
    }

    setBusy(true)
    try {
      const { error: sendError } = await getSupabase().auth.signInWithOtp({ phone: e164 })
      if (sendError) {
        setError(otpSendErrorMessage(sendError))
        return
      }
      setNormalizedPhone(e164)
      setStep('otp')
    } catch (err) {
      setError(otpSendErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleVerifyOtp(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!normalizedPhone) return

    const token = otp.replace(/\D/g, '')
    if (token.length < 4) {
      setError('Enter the verification code from your SMS.')
      return
    }

    setBusy(true)
    try {
      const { error: verifyError } = await getSupabase().auth.verifyOtp({
        phone: normalizedPhone,
        token,
        type: 'sms',
      })
      if (verifyError) {
        setError(otpVerifyErrorMessage(verifyError))
        return
      }
      await refreshProfile()
    } catch (err) {
      setError(otpVerifyErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="beta-card beta-card--narrow">
      <p className="beta-eyebrow">Private Beta</p>
      <h1 className="beta-title">Sign in with your phone</h1>
      <p className="beta-lead">
        LexAudit is in private beta. Enter the mobile number approved for your account.
      </p>

      {step === 'phone' ? (
        <form className="beta-form" onSubmit={handleSendOtp}>
          <label className="beta-label" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            className="beta-input"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+972 54 456 1132"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={busy}
            required
          />
          <p className="beta-hint">Include country code. Israeli numbers may start with +972.</p>
          {error && <p className="beta-error" role="alert">{error}</p>}
          <button type="submit" className="beta-btn beta-btn-primary beta-btn-full" disabled={busy}>
            {busy ? 'Sending…' : 'Send verification code'}
          </button>
        </form>
      ) : (
        <form className="beta-form" onSubmit={handleVerifyOtp}>
          <p className="beta-hint">
            Code sent to <span dir="ltr">{normalizedPhone}</span>
          </p>
          <label className="beta-label" htmlFor="otp">
            Verification code
          </label>
          <input
            id="otp"
            className="beta-input beta-input-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={busy}
            required
          />
          {error && <p className="beta-error" role="alert">{error}</p>}
          <button type="submit" className="beta-btn beta-btn-primary beta-btn-full" disabled={busy}>
            {busy ? 'Verifying…' : 'Verify and continue'}
          </button>
          <button
            type="button"
            className="beta-link-btn"
            onClick={() => {
              setStep('phone')
              setOtp('')
              setError(null)
            }}
            disabled={busy}
          >
            Change phone number
          </button>
        </form>
      )}
    </div>
  )
}
