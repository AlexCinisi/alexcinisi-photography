'use client'

export default function CookiePrefsButton() {
  return (
    <button
      className="footer-cookie-btn"
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).__reopenCookieConsent) {
          (window as any).__reopenCookieConsent()
        }
      }}
    >
      Cookie Preferences
    </button>
  )
}
