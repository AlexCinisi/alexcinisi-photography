'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface ContactFormProps {
    variant?: 'compact' | 'full';     // DEFAULT: 'compact'
    venueHidden?: boolean;            // true nelle location pages
    venueValue?: string;              // pre-filled venue name
    ctaText?: string;                 // testo bottone submit
    sidebarImage?: any;               // Sanity image object (solo nella contact page)
    sidebarTestimonial?: {            // Testimonial nel sidebar (solo dove serve)
        quote: string;
        author: string;
        location: string;
        country: string;
    };
}

export default function ContactForm({
    variant = 'compact',
    venueHidden = false,
    venueValue = "",
    ctaText,
    sidebarImage,
    sidebarTestimonial,
}: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        partnerName: '',
        email: '',
        phone: '',
        instagram: '',
        partnerInstagram: '',
        planner: '',
        weddingDate: '',
        location: venueValue,
        guestCount: '',         // non usato, ma mantenuto per backward compat API
        howFound: '',           // non usato
        budget: '',             // non usato
        vision: '',
        interests: [] as string[],
        privacyConsent: false
    });

    const [trackingData, setTrackingData] = useState({
        pageUrl: '',
        referrer: '',
        userAgent: '',
        browserLang: '',
        formStartTime: 0
    });

    useEffect(() => {
        setTrackingData({
            pageUrl: window.location.href,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            browserLang: navigator.language || (navigator.languages && navigator.languages[0]) || 'unknown',
            formStartTime: Date.now()
        });
    }, []);

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Refs for scrolling to errors
    const formRef = useRef<HTMLFormElement>(null);

    // Derivare tutto dalla variant
    const isCompact = variant === 'compact';
    const isFull = variant === 'full';

    const showGroupLabels = isFull;
    const showDualInstagram = isFull;
    const showPlanner = isFull;

    const defaultCtaText = isCompact
        ? 'Tell Me About Your Wedding →'
        : 'Request Your Bespoke Proposal →';

    const interestsList = isCompact
        ? ['Wedding Photography', 'Elopement', 'Couple Session']
        : ['Wedding Photography', 'Elopement', 'Couple Session', 'Film Photography'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            // For interests checkboxes
            if (checked) {
                return { ...prev, interests: [...prev.interests, value] };
            } else {
                return { ...prev, interests: prev.interests.filter(item => item !== value) };
            }
        });
    };

    // Special handler for privacy consent since it has a specific name
    const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFormData(prev => ({ ...prev, privacyConsent: checked }));
        if (checked && formErrors.privacyConsent) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.privacyConsent;
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) errors.name = "This field is required";
        if (!formData.partnerName.trim()) errors.partnerName = "This field is required";
        if (!formData.email.trim()) errors.email = "This field is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email";

        if (!formData.weddingDate.trim()) errors.weddingDate = "This field is required";

        if (!venueHidden && !formData.location.trim()) errors.location = "This field is required";

        if (!formData.vision.trim()) errors.vision = "This field is required";

        if (!formData.privacyConsent) errors.privacyConsent = "You must accept the Privacy Policy to continue";

        return errors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // precise validation
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setErrorMessage("Please complete all required fields before submitting");
            setStatus('error'); // Show general error message at top

            // Scroll to the first error
            const firstErrorField = Object.keys(errors)[0];
            const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setStatus('submitting');
        setErrorMessage('');
        setFormErrors({});

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ...trackingData,
                    timeOnPage: Math.round((Date.now() - trackingData.formStartTime) / 1000)
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            setFormData({
                name: '',
                partnerName: '',
                email: '',
                phone: '',
                instagram: '',
                partnerInstagram: '',
                planner: '',
                weddingDate: '',
                location: venueValue, // Keep venue value if provided via props
                guestCount: '',
                howFound: '',
                budget: '',
                vision: '',
                interests: [],
                privacyConsent: false
            });
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again later or email me directly at info@alexcinisiphotography.com');
        }
    };

    // Helper to render label with asterisk
    const Label = ({ text, required = false }: { text: string, required?: boolean }) => (
        <label>
            {text}
            {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
        </label>
    );

    // Helper to render error message
    const ErrorMsg = ({ field }: { field: string }) => (
        formErrors[field] ? <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors[field]}</div> : null
    );

    const successMessage = (
        <div className="success-message" style={{ padding: '2rem', background: 'var(--off-white)', borderRadius: '0' }}>
            <h3 className="h2">Thank you.</h3>
            <p style={{ fontSize: '.87rem', color: 'var(--charcoal)', lineHeight: 1.85, marginTop: 12 }}>
                Your message has been received. I&apos;ll respond personally within 24 hours.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-sub" style={{ marginTop: '1.5rem' }}>
                Send another message
            </button>
        </div>
    );

    const formContent = (
        <form onSubmit={handleSubmit} ref={formRef}>
            {/* ── ABOUT YOU ── */}
            {showGroupLabels && <div className="form-group-label">About you</div>}

            <div className="fg">
                <Label text="First Name" required />
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
                <ErrorMsg field="name" />
            </div>
            <div className="fg">
                <Label text="Partner's Name" required />
                <input type="text" name="partnerName" placeholder="Partner's Name" value={formData.partnerName} onChange={handleInputChange} />
                <ErrorMsg field="partnerName" />
            </div>

            <div className="fg">
                <Label text="Email Address" required />
                <input type="email" name="email" placeholder="best.email@example.com" value={formData.email} onChange={handleInputChange} />
                <ErrorMsg field="email" />
            </div>
            <div className="fg">
                <Label text="Phone Number" />
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
            </div>

            {isCompact && (
                <>
                    <div className="fg">
                        <Label text="Wedding Date" required />
                        <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleInputChange} />
                        <ErrorMsg field="weddingDate" />
                    </div>
                    <div className="fg">
                        <Label text="Instagram Handle" />
                        <input type="text" name="instagram" placeholder="@yourhandle" value={formData.instagram} onChange={handleInputChange} />
                    </div>
                </>
            )}

            {isFull && (
                <>
                    <div className="fg">
                        <Label text="Your Instagram" />
                        <input type="text" name="instagram" placeholder="@yourhandle" value={formData.instagram} onChange={handleInputChange} />
                    </div>
                    <div className="fg">
                        <Label text="Partner's Instagram" />
                        <input type="text" name="partnerInstagram" placeholder="@partnerhandle" value={formData.partnerInstagram} onChange={handleInputChange} />
                    </div>
                </>
            )}

            {/* ── YOUR WEDDING ── */}
            {showGroupLabels && <div className="form-group-label">Your wedding</div>}

            {/* Venue — sempre visibile. Disabilitato quando pre-compilato */}
            <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                <Label text="Venue / Location" required={!venueHidden} />
                <input
                    type="text"
                    name="location"
                    placeholder="e.g. Tonnara di Scopello, or 'Undecided'"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={venueHidden}
                    style={venueHidden ? {
                        opacity: 0.6,
                        cursor: 'not-allowed',
                        backgroundColor: 'var(--grey-bg, #F3F1EE)',
                    } : undefined}
                />
                {!venueHidden && <ErrorMsg field="location" />}
            </div>

            {isFull && (
                <>
                    <div className="fg">
                        <Label text="Wedding Date" required />
                        <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleInputChange} />
                        <ErrorMsg field="weddingDate" />
                    </div>
                    <div className="fg">
                        <Label text="Wedding Planner" />
                        <input type="text" name="planner" placeholder="Name of your planner, or 'Not yet'" value={formData.planner} onChange={handleInputChange} />
                    </div>
                </>
            )}

            {/* ── YOUR VISION ── */}
            {showGroupLabels && <div className="form-group-label">Your vision</div>}

            <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                <Label text="Tell Me About Your Story" required />
                <textarea name="vision" placeholder="How did you meet? What is the vibe of your day? Be as detailed as you like - I love stories." value={formData.vision} onChange={handleInputChange} />
                <ErrorMsg field="vision" />
            </div>

            <div className="check-group" style={{ gridColumn: '1 / -1' }}>
                {interestsList.map((interest) => (
                    <label key={interest} className="check-lbl">
                        <input type="checkbox" value={interest} onChange={handleCheckboxChange} checked={formData.interests.includes(interest)} />
                        {interest}
                    </label>
                ))}
            </div>

            <div className="priv-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', gridColumn: '1 / -1', marginTop: 12 }}>
                <label className="custom-checkbox" style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    flexShrink: 0,
                    cursor: 'pointer'
                }}>
                    <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handlePrivacyChange}
                        style={{
                            opacity: 0,
                            width: 0,
                            height: 0,
                            position: 'absolute'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '20px',
                        width: '20px',
                        backgroundColor: formData.privacyConsent ? 'var(--ink, #1E1D1B)' : 'transparent',
                        border: '1px solid var(--ink, #1E1D1B)',
                        borderRadius: '2px', // Slight radius or 0 depending on design system
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
                <span style={{ fontSize: '0.78rem', lineHeight: '1.5', cursor: 'pointer', color: 'var(--mid)' }} onClick={() => handlePrivacyChange({ target: { checked: !formData.privacyConsent } } as any)}>
                    I have read and agree to the <a href="/policies/Privacy_Policy_Alex_Cinisi_Photography.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a> and consent to the processing of my personal data (GDPR compliant).
                </span>
            </div>
            <div style={{ gridColumn: '1 / -1' }}><ErrorMsg field="privacyConsent" /></div>

            <button
                type="submit"
                className="btn-sub"
                disabled={status === 'submitting' || !formData.privacyConsent}
                style={{
                    opacity: (status === 'submitting' || !formData.privacyConsent) ? 0.5 : 1,
                    marginTop: '1.5rem',
                    cursor: (status === 'submitting' || !formData.privacyConsent) ? 'not-allowed' : 'pointer',
                    gridColumn: '1 / -1'
                }}
            >
                {status === 'submitting' ? 'Sending...' : (ctaText || defaultCtaText)}
            </button>

            {status === 'error' && errorMessage && (
                <div style={{ gridColumn: '1 / -1', color: '#C53030', padding: '12px 16px', backgroundColor: '#FFF0F0', border: '1px solid #FED7D7', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', marginTop: '8px' }}>
                    {errorMessage}
                </div>
            )}
        </form>
    );

    return (
        <section className="s-white pad" id="contact">
            <div className="max">
                <div className="contact-grid">
                    {/* Sidebar SX — identico sempre */}
                    <RevealOnScroll className="contact-left">
                        <div className="f-label">Inquiries</div>
                        <div className="h2">Let&apos;s Start<br />The Conversation.</div>
                        <p>Please use the form to check availability for your date. I respond to all inquiries within 24 hours.</p>
                        <div className="contact-details">
                            <div className="cd">
                                <span className="cd-lbl">Response</span>
                                <span className="cd-val">Within 24 hours — personally</span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Email</span>
                                <span className="cd-val">
                                    <a href="mailto:info@alexcinisiphotography.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@alexcinisiphotography.com</a>
                                </span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Studio</span>
                                <span className="cd-val">Palermo, Sicily</span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Social</span>
                                <span className="cd-val">
                                    <a href="https://www.instagram.com/alexcinisi" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@alexcinisi</a>
                                </span>
                            </div>
                        </div>

                        {/* Immagine sidebar — opzionale, da prop */}
                        {sidebarImage && (
                            <div style={{ marginTop: '32px' }}>
                                <Image
                                    src={urlFor(sidebarImage).fit('crop').crop('focalpoint').width(800).quality(85).auto('format').url()}
                                    alt={sidebarImage.alt || 'Alex Cinisi Photography'}
                                    width={400}
                                    height={533}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </div>
                        )}

                        {/* Testimonial — opzionale, da prop */}
                        {sidebarTestimonial?.quote && (
                            <blockquote className="contact-testimonial" style={{ marginTop: '32px' }}>
                                <p>&ldquo;{sidebarTestimonial.quote}&rdquo;</p>
                                <cite>{sidebarTestimonial.author} · {sidebarTestimonial.country} · {sidebarTestimonial.location}</cite>
                            </blockquote>
                        )}
                    </RevealOnScroll>

                    {/* Form DX */}
                    <RevealOnScroll className="contact-right d2">
                        {status === 'success' ? successMessage : formContent}
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
