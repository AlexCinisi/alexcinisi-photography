'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import Turnstile from 'react-turnstile';

interface GuideFormProps {
    heading: string;
    ctaLabel: string;
    gdprMicrocopy: string;
}

export default function GuideForm({ heading, ctaLabel, gdprMicrocopy }: GuideFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        weddingYear: '',
        privacyConsent: false,
    });

    const [trackingData, setTrackingData] = useState({
        pageUrl: '',
        referrer: '',
        userAgent: '',
        browserLang: '',
        formStartTime: 0,
    });

    useEffect(() => {
        setTrackingData({
            pageUrl: window.location.href,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            browserLang: navigator.language || (navigator.languages && navigator.languages[0]) || 'unknown',
            formStartTime: Date.now(),
        });
    }, []);

    const [honeypot, setHoneypot] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const formRef = useRef<HTMLFormElement>(null);

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = 'Please tell me your first name';
        if (!formData.email.trim()) {
            errors.email = 'Please enter your email address';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = 'That email address does not look right';
        }
        if (!formData.privacyConsent) errors.privacyConsent = 'You must accept the Privacy Policy to continue';
        return errors;
    };

    const ErrorMsg = ({ field }: { field: string }) => (
        formErrors[field] ? <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors[field]}</div> : null
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setErrorMessage('Please complete all required fields before submitting');
            setStatus('error');
            const firstErrorField = Object.keys(errors)[0];
            const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setStatus('submitting');
        setErrorMessage('');
        setFormErrors({});

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ...trackingData,
                    timeOnPage: Math.round((Date.now() - trackingData.formStartTime) / 1000),
                    website: honeypot,
                    turnstileToken,
                }),
            });

            if (!response.ok) throw new Error('Subscribe failed');

            // Nessun dataLayer.push qui: la conversione CompleteRegistration
            // viene registrata da /guide-confirmed al load. Un push anche qui
            // produrrebbe un doppio conteggio.
            // Navigazione piena e non router.push: garantisce il pageview a GTM
            // senza dipendere da un trigger History Change.
            window.location.href = '/guide-confirmed';
        } catch {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again in a moment.');
        }
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} id="guide-form" style={{ display: 'grid', gap: '16px' }}>
            <h2 className="h2">{heading}</h2>

            <div className="fg">
                <label htmlFor="guide-form-name">First name</label>
                <input
                    type="text"
                    id="guide-form-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="given-name"
                />
                <ErrorMsg field="name" />
            </div>

            <div className="fg">
                <label htmlFor="guide-form-email">Email address</label>
                <input
                    type="email"
                    id="guide-form-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                />
                <ErrorMsg field="email" />
            </div>

            <div className="fg">
                <label htmlFor="guide-form-year">When are you getting married?</label>
                <select
                    id="guide-form-year"
                    name="weddingYear"
                    value={formData.weddingYear}
                    onChange={(e) => setFormData({ ...formData, weddingYear: e.target.value })}
                >
                    <option value="">Choose one</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="Not decided yet">Not decided yet</option>
                </select>
            </div>

            {/* Honeypot — campo invisibile per catturare bot */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="guide-form-website">Website</label>
                <input
                    type="text"
                    id="guide-form-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>

            <div className="priv-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 4 }}>
                <label className="custom-checkbox" style={{ position: 'relative', display: 'inline-block', width: '20px', height: '20px', flexShrink: 0, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                    />
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '20px',
                        width: '20px',
                        backgroundColor: formData.privacyConsent ? 'var(--ink, #1E1D1B)' : 'transparent',
                        border: '1px solid var(--ink, #1E1D1B)',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                    }}>
                        {formData.privacyConsent && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </span>
                </label>
                <span
                    style={{ fontSize: '0.78rem', lineHeight: '1.5', cursor: 'pointer', color: 'var(--mid)' }}
                    onClick={() => setFormData({ ...formData, privacyConsent: !formData.privacyConsent })}
                >
                    I have read and agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a> and consent to the processing of my personal data (GDPR compliant).
                </span>
            </div>
            <ErrorMsg field="privacyConsent" />

            <div style={{ marginTop: '8px' }}>
                <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken('')}
                    theme="light"
                    size="flexible"
                />
            </div>

            <button type="submit" className="btn-sub" disabled={status === 'submitting' || !turnstileToken}>
                {status === 'submitting' ? 'Sending…' : ctaLabel}
            </button>

            <p style={{ fontSize: '0.72rem', lineHeight: '1.6', color: 'var(--mid)', margin: 0 }}>
                {gdprMicrocopy}
            </p>

            {status === 'error' && errorMessage && (
                <div style={{ color: '#C53030', background: '#FFF0F0', border: '1px solid #FED7D7', padding: '12px', fontSize: '0.8rem' }}>
                    {errorMessage}
                </div>
            )}
        </form>
    );
}
