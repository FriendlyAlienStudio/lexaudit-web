/** Map Supabase auth errors to user-safe messages (no internal details). */
export function authErrorMessage(error?: unknown): string {
  if (import.meta.env.DEV && error) console.debug(error)
  return 'Something went wrong. Please try again.'
}

export function otpSendErrorMessage(error?: unknown): string {
  if (import.meta.env.DEV && error) console.debug(error)
  return 'Unable to send verification code. Please check your number and try again.'
}

export function otpVerifyErrorMessage(error?: unknown): string {
  if (import.meta.env.DEV && error) console.debug(error)
  return 'Invalid verification code. Please try again.'
}
