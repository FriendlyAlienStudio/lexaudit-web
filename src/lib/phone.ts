/** Normalize phone input to E.164 (mirrors DB normalize_phone logic). */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  let digits = trimmed.replace(/[^0-9+]/g, '')

  if (digits.startsWith('+')) {
    return '+' + digits.slice(1).replace(/\D/g, '')
  }

  digits = digits.replace(/\D/g, '')

  if (digits.startsWith('0') && digits.length >= 9) {
    return '+972' + digits.slice(1)
  }

  if (digits.startsWith('972')) {
    return '+' + digits
  }

  return '+' + digits
}

export function formatPhoneHint(raw: string): string {
  const normalized = normalizePhone(raw)
  return normalized ?? raw.trim()
}

/** True when input normalizes to a complete E.164 or Israeli mobile number. */
export function isValidPhone(raw: string): boolean {
  const e164 = normalizePhone(raw)
  if (!e164?.startsWith('+')) return false

  const digits = e164.slice(1)
  if (!/^\d+$/.test(digits) || digits.length > 15) return false

  if (digits.startsWith('972')) {
    return digits.length === 12
  }

  return digits.length >= 10
}
