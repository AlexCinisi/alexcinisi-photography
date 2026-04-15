'use client'

import { useState, useEffect, useCallback } from 'react'

// ------ TYPES ------
type ConsentState = 'pending' | 'accepted_all' | 'rejected_all' | 'custom'
type ConsentPrefs = {
  analytics: boolean
  marketing: boolean
}

const COOKIE_NAME = 'cookie_consent'
const COOKIE_DAYS = 180 // 6 mesi — requisito Garante italiano
const POLICY_VERSION = '1.0'

// ------ HELPERS ------
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

function updateGtagConsent(prefs: ConsentPrefs) {
  // Google Consent Mode v2
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    })
  }
}

// ------ COMPONENT ------
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState<ConsentPrefs>({ analytics: false, marketing: false })

  // Al mount: controlla se esiste già una scelta salvata
  useEffect(() => {
    // Imposta i default del Consent Mode PRIMA di tutto
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
      }
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
      })
    }

    const saved = getCookie(COOKIE_NAME)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Applica i consensi salvati senza mostrare il banner
        updateGtagConsent({
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false,
        })
      } catch {
        // Cookie corrotto — mostra il banner
        setVisible(true)
      }
    } else {
      // Nessun cookie — primo accesso — mostra il banner
      setVisible(true)
    }
  }, [])

  const saveChoice = useCallback((state: ConsentState, consentPrefs: ConsentPrefs) => {
    const value = JSON.stringify({
      state,
      analytics: consentPrefs.analytics,
      marketing: consentPrefs.marketing,
      version: POLICY_VERSION,
      timestamp: new Date().toISOString(),
    })
    setCookie(COOKIE_NAME, value, COOKIE_DAYS)
    updateGtagConsent(consentPrefs)
    setVisible(false)
    setShowPrefs(false)
  }, [])

  const handleAcceptAll = useCallback(() => {
    saveChoice('accepted_all', { analytics: true, marketing: true })
  }, [saveChoice])

  const handleRejectAll = useCallback(() => {
    saveChoice('rejected_all', { analytics: false, marketing: false })
  }, [saveChoice])

  const handleSavePrefs = useCallback(() => {
    saveChoice('custom', prefs)
  }, [saveChoice, prefs])

  // X in alto a destra = chiude senza accettare (= rifiuto)
  const handleClose = useCallback(() => {
    saveChoice('rejected_all', { analytics: false, marketing: false })
  }, [saveChoice])

  // Funzione pubblica per riaprire il banner dalle Cookie Preferences nel footer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__reopenCookieConsent = () => {
        // Carica le preferenze correnti
        const saved = getCookie(COOKIE_NAME)
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            setPrefs({
              analytics: parsed.analytics ?? false,
              marketing: parsed.marketing ?? false,
            })
          } catch {
            setPrefs({ analytics: false, marketing: false })
          }
        }
        setShowPrefs(true)
        setVisible(true)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div className="cc-overlay" role="dialog" aria-label="Cookie consent" aria-modal="true">
      <div className="cc-banner">
        {/* X button — requisito Garante */}
        <button
          className="cc-close"
          onClick={handleClose}
          aria-label="Close without accepting"
        >
          ×
        </button>

        {!showPrefs ? (
          /* ---------- VISTA PRINCIPALE ---------- */
          <>
            <div className="cc-text">
              <p className="cc-title">Your Privacy</p>
              <p className="cc-body">
                We use cookies to analyse site traffic and enhance your experience. 
                You can accept, reject, or customise your preferences. Your choice 
                is saved for 6 months.{' '}
                <a href="/cookie-policy" className="cc-link">Cookie Policy</a>
              </p>
            </div>
            <div className="cc-actions">
              <button className="cc-btn cc-btn--reject" onClick={handleRejectAll}>
                Reject All
              </button>
              <button className="cc-btn cc-btn--accept" onClick={handleAcceptAll}>
                Accept All
              </button>
            </div>
            <button
              className="cc-customise"
              onClick={() => setShowPrefs(true)}
            >
              Customise Preferences
            </button>
          </>
        ) : (
          /* ---------- VISTA PREFERENZE ---------- */
          <>
            <div className="cc-text">
              <p className="cc-title">Cookie Preferences</p>
              <p className="cc-body">
                Choose which cookie categories to allow. Essential cookies cannot 
                be disabled as they are required for the site to function.
              </p>
            </div>
            <div className="cc-prefs">
              {/* Necessari — sempre attivi, non disattivabili */}
              <div className="cc-pref-row">
                <div className="cc-pref-info">
                  <span className="cc-pref-name">Essential</span>
                  <span className="cc-pref-desc">Required for site functionality</span>
                </div>
                <div className="cc-toggle cc-toggle--locked">
                  <span className="cc-toggle-label">Always on</span>
                </div>
              </div>
              {/* Analytics */}
              <div className="cc-pref-row">
                <div className="cc-pref-info">
                  <span className="cc-pref-name">Analytics</span>
                  <span className="cc-pref-desc">Google Analytics, Microsoft Clarity</span>
                </div>
                <label className="cc-toggle-switch">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  />
                  <span className="cc-toggle-slider" />
                </label>
              </div>
              {/* Marketing */}
              <div className="cc-pref-row">
                <div className="cc-pref-info">
                  <span className="cc-pref-name">Marketing</span>
                  <span className="cc-pref-desc">Advertising and remarketing cookies</span>
                </div>
                <label className="cc-toggle-switch">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  />
                  <span className="cc-toggle-slider" />
                </label>
              </div>
            </div>
            <div className="cc-actions">
              <button className="cc-btn cc-btn--reject" onClick={handleRejectAll}>
                Reject All
              </button>
              <button className="cc-btn cc-btn--accept" onClick={handleSavePrefs}>
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
