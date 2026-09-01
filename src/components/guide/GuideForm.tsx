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
        if (!formData.name.trim()) errors.name = 'Required';
        if (!formData.email.trim()) {
            errors.email = 'Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = 'Check this address';
        }
        if (!formData.privacyConsent) errors.privacyConsent = 'Consent required';
        return errors;
    };

    // Regola 4 di form-behavior-rules.md: validazione in tempo reale.
    // onBlur e non onChange: correggere mentre si digita interrompe chi scrive.
    const handleBlur = (field: string) => {
        const errors = validateForm();
        setFormErrors((prev) => ({ ...prev, [field]: errors[field] || '' }));
    };

    // Un errore già visibile sparisce alla prima correzione, non al blur successivo.
    const clearError = (field: string) => {
        setFormErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
    };

    const fieldClass = (field: string) => (formErrors[field] ? 'fg fg--error' : 'fg');

    const ErrorMsg = ({ field }: { field: string }) => (
        formErrors[field] ? <p className="fg-error">{formErrors[field]}</p> : null
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
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
            setErrorMessage('Something went wrong — please try again');
        }
    };

    return (
        <div className="ads-form-card">
            <form onSubmit={handleSubmit} ref={formRef} id="guide-form">
                <h3>{heading}</h3>

                <div className={fieldClass('name')}>
                    <label htmlFor="guide-form-name">First name</label>
                    <input
                        type="text"
                        id="guide-form-name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError('name'); }}
                        onBlur={() => handleBlur('name')}
                        autoComplete="given-name"
                    />
                    <ErrorMsg field="name" />
                </div>

                <div className={fieldClass('email')}>
                    <label htmlFor="guide-form-email">Email address</label>
                    <input
                        type="email"
                        id="guide-form-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError('email'); }}
                        onBlur={() => handleBlur('email')}
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

                <div>
                    <label className="ads-form-privacy">
                        <input
                            type="checkbox"
                            name="privacyConsent"
                            checked={formData.privacyConsent}
                            onChange={(e) => { setFormData({ ...formData, privacyConsent: e.target.checked }); clearError('privacyConsent'); }}
                            onBlur={() => handleBlur('privacyConsent')}
                        />
                        <span>
                            I have read and agree to the{' '}
                            <a
                                href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Privacy Policy
                            </a>
                            {' '}and consent to the processing of my personal data (GDPR compliant).
                        </span>
                    </label>
                    <ErrorMsg field="privacyConsent" />
                </div>

                <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken('')}
                    theme="light"
                    size="flexible"
                />

                <button type="submit" className="ads-form-submit" disabled={status === 'submitting' || !turnstileToken}>
                    {status === 'submitting' ? 'Sending…' : ctaLabel}
                </button>

                <p style={{ fontSize: '.72rem', lineHeight: 1.6, color: 'var(--mid)', margin: 0 }}>
                    {gdprMicrocopy}
                </p>

                {status === 'error' && errorMessage && (
                    <p className="fg-error">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}
