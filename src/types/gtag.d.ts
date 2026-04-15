// src/types/gtag.d.ts
interface Window {
  dataLayer: Record<string, unknown>[]
  gtag: (...args: unknown[]) => void
  __reopenCookieConsent?: () => void
}
