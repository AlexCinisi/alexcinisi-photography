'use client'

import { useState, FormEvent } from 'react'
import Turnstile from 'react-turnstile'

interface AdsFormProps {
  source: string
  ctaText: string
  dateLabel?: string
  datePlaceholder?: string
  locationLabel?: string
  locationPlaceholder?: string
  visionLabel?: string
  visionPlaceholder?: string
  reassuranceItems?: string[]
  urgencyText?: string
  headingText?: string
  descriptionText?: string
}

export default function AdsForm({
  source,
  ctaText,
  dateLabel = 'Wedding Date',
  datePlaceholder = '',
  locationLabel = 'Wedding Location',
  locationPlaceholder = 'Sicily, Italy / Destination',
  visionLabel = 'Tell me about your wedding vision',
  visionPlaceholder = '',
  reassuranceItems = [
    '✓ Personal response within 24 hours',
    '✓ No obligation to book',
    '✓ Free initial consultation call',
  ],
  urgencyText = 'Only 4 dates remaining for Autumn 2026.',
  headingText = 'Begin Your Story',
  descriptionText = 'I accept a limited number of destination weddings each year to ensure every couple receives my full creative focus.',
}: AdsFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    weddingDate: '',
    location: '',
    vision: '',
    privacyConsent: false,
  })
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.privacyConsent) return
    setStatus('submitting')

    try {
      const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          weddingDate: formData.weddingDate,
          location: formData.location,
          message: formData.vision,
          source,
          website: honeypot,
          turnstileToken,
          privacyConsent: formData.privacyConsent,
          eventId,
        }),
      })

      // Analytics: push dataLayer event for GTM (Meta Pixel Lead + GA4 + Google Ads conversion)
      if (res.ok && typeof window !== 'undefined') {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({
          event: 'form_submit_success',
          event_id: eventId,
          form_name: 'ads_form',
          form_variant: 'ads',
          form_location: source, // proposal-sicily, luxury-destination-wedding-sicily, etc
          user_email: formData.email || undefined,
          user_first_name: formData.firstName || undefined,
          venue: formData.location || undefined,
          wedding_date: formData.weddingDate || undefined,
        })
      }

      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (status === 'success') {
    return (
      <section id="book" className="ads-form-section">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="ads-form-card">
            <div className="ads-form-success">
              <h3>Thank you.</h3>
              <p>I&apos;ll be in touch personally within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="ads-form-section">
      <div className="ads-form-grid">
        <div className="ads-form-text">
          <div className="ads-eyebrow" style={{ justifyContent: 'flex-start' }}>
            <span>Limited Availability</span>
          </div>
          <h2>{headingText}</h2>
          <p>{descriptionText}</p>
          <p className="ads-form-urgency">{urgencyText}</p>
          <ul className="ads-form-reassurance">
            {reassuranceItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="ads-form-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="ads-name">Your Name *</label>
            <input
              type="text" id="ads-name" required
              value={formData.firstName}
              onChange={e => updateField('firstName', e.target.value)}
            />

            <label htmlFor="ads-email">Email Address *</label>
            <input
              type="email" id="ads-email" required
              value={formData.email}
              onChange={e => updateField('email', e.target.value)}
            />

            <label htmlFor="ads-date">{dateLabel}</label>
            <input
              type={datePlaceholder ? 'text' : 'date'}
              id="ads-date"
              placeholder={datePlaceholder}
              value={formData.weddingDate}
              onChange={e => updateField('weddingDate', e.target.value)}
            />

            <label htmlFor="ads-location">{locationLabel}</label>
            <input
              type="text" id="ads-location"
              placeholder={locationPlaceholder}
              value={formData.location}
              onChange={e => updateField('location', e.target.value)}
            />

            <label htmlFor="ads-vision">{visionLabel}</label>
            <textarea
              id="ads-vision" rows={4}
              placeholder={visionPlaceholder}
              value={formData.vision}
              onChange={e => updateField('vision', e.target.value)}
            />

            {/* Honeypot — hidden bot trap */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="ads-website">Website</label>
              <input
                type="text" id="ads-website" name="website"
                tabIndex={-1} autoComplete="off"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
              />
            </div>

            <div className="ads-form-privacy">
              <input
                type="checkbox" id="ads-privacy"
                checked={formData.privacyConsent}
                onChange={e => updateField('privacyConsent', e.target.checked)}
              />
              <label htmlFor="ads-privacy" style={{ margin: 0, textTransform: 'none', letterSpacing: 0 }}>
                I agree to the privacy policy.
              </label>
            </div>

            <div style={{ marginTop: 16 }}>
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken('')}
                theme="light"
                size="flexible"
              />
            </div>

            <input type="hidden" name="source" value={source} />

            <button
              type="submit"
              className="ads-form-submit"
              disabled={status === 'submitting' || !formData.privacyConsent || !turnstileToken}
            >
              {status === 'submitting' ? 'Sending...' : ctaText}
            </button>

            {status === 'error' && (
              <p style={{ color: '#c44', fontSize: '.85rem', marginTop: 12, textAlign: 'center' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
