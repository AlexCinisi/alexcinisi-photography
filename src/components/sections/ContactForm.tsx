'use client';

import { useState, FormEvent, useRef } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface ContactFormProps {
    venueLabel?: string;
    venuePlaceholder?: string;
    venueHidden?: boolean;
    venueValue?: string; // Pre-filled value
    showGuestCount?: boolean;
    showBudget?: boolean;
    showSource?: boolean;
    messageLabel?: string;
    showInterestCheckboxes?: boolean;
    dateType?: "date" | "text";
    datePlaceholder?: string;
}

export default function ContactForm({
    venueLabel = "Venue / Location",
    venuePlaceholder = "e.g. Tonnara di Scopello, or 'Undecided'",
    venueHidden = false,
    venueValue = "",
    showGuestCount = false,
    showBudget = false,
    showSource = false,
    messageLabel = "Tell Me About Your Story",
    showInterestCheckboxes = true,
    dateType = "date",
    datePlaceholder
}: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        partnerName: '',
        email: '',
        phone: '',
        instagram: '',
        planner: '',
        weddingDate: '',
        location: venueValue,
        guestCount: '',
        howFound: '',
        budget: '',
        vision: '',
        interests: [] as string[],
        privacyConsent: false
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Refs for scrolling to errors
    const formRef = useRef<HTMLFormElement>(null);

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
        const { name, value, checked } = e.target;
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

        if (showGuestCount && !formData.guestCount) errors.guestCount = "This field is required";
        if (showBudget && !formData.budget) errors.budget = "This field is required";

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
                body: JSON.stringify(formData),
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

    return (
        <section className="s-white pad" id="contact">
            <div className="max">
                <div className="contact-grid">
                    <RevealOnScroll className="contact-left">
                        <div className="f-label">Inquiries</div>
                        <div className="h2">Let’s Start<br />The Conversation.</div>
                        <p>Please use the form to check availability for your date. I respond to all inquiries within 24 hours (Monday-Friday).</p>
                        <div className="contact-details">
                            <div className="cd">
                                <span className="cd-lbl">Response</span>
                                <span className="cd-val">Within 24 hours — personally</span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Email</span>
                                <span className="cd-val">info@alexcinisiphotography.com</span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Studio</span>
                                <span className="cd-val">Palermo, Sicily</span>
                            </div>
                            <div className="cd">
                                <span className="cd-lbl">Social</span>
                                <span className="cd-val">@alexcinisi</span>
                            </div>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll className="contact-right d2">
                        {status === 'success' ? (
                            <div className="success-message" style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '4px' }}>
                                <h3 className="h3">Thank you!</h3>
                                <p>Your message has been received. I'll respond within 24 hours.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn-sub"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} ref={formRef}>


                                {status === 'error' && errorMessage && (
                                    <div style={{ color: 'red', marginBottom: '1.5rem', padding: '10px', backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '4px' }}>
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="fg">
                                    <Label text="First Name" required />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required={false} // Disable browser validation to use custom
                                    />
                                    <ErrorMsg field="name" />
                                </div>
                                <div className="fg">
                                    <Label text="Partner Type / Name" required />
                                    <input
                                        type="text"
                                        name="partnerName"
                                        placeholder="Partner's Name"
                                        value={formData.partnerName}
                                        onChange={handleInputChange}
                                    />
                                    <ErrorMsg field="partnerName" />
                                </div>
                                <div className="fg">
                                    <Label text="Email Address" required />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="best.email@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required={false}
                                    />
                                    <ErrorMsg field="email" />
                                </div>
                                <div className="fg">
                                    <Label text="Phone Number" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Row 3: Instagram + Wedding Planner */}
                                <div className="fg">
                                    <Label text="Instagram Handle" />
                                    <input
                                        type="text"
                                        name="instagram"
                                        placeholder="@yourhandle"
                                        value={formData.instagram}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="fg">
                                    <Label text="Wedding Planner" />
                                    <input
                                        type="text"
                                        name="planner"
                                        placeholder="Name of your planner, or 'Not yet'"
                                        value={formData.planner}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                                    <Label text="Wedding Date" required />
                                    <input
                                        type={dateType}
                                        name="weddingDate"
                                        placeholder={datePlaceholder}
                                        value={formData.weddingDate}
                                        onChange={handleInputChange}
                                    />
                                    <ErrorMsg field="weddingDate" />
                                </div>

                                {showGuestCount && (
                                    <div className="fg">
                                        <Label text="Guest Count" required />
                                        <select name="guestCount" value={formData.guestCount} onChange={handleInputChange}>
                                            <option value="">Select…</option>
                                            <option value="Elopement (just us)">Elopement (just us)</option>
                                            <option value="Intimate (under 50)">Intimate (under 50)</option>
                                            <option value="Medium (50–100)">Medium (50–100)</option>
                                            <option value="Grand (100+)">Grand (100+)</option>
                                        </select>
                                        <ErrorMsg field="guestCount" />
                                    </div>
                                )}

                                {showSource && (
                                    <div className="fg">
                                        <Label text="How did you find us?" />
                                        <select name="howFound" value={formData.howFound} onChange={handleInputChange}>
                                            <option value="">Select…</option>
                                            <option value="Google">Google</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Wedding Planner">Wedding Planner</option>
                                            <option value="Venue recommendation">Venue recommendation</option>
                                            <option value="Friend / Referral">Friend / Referral</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                )}

                                {!venueHidden && (
                                    <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                                        <Label text={venueLabel} required />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder={venuePlaceholder}
                                            value={formData.location}
                                            onChange={handleInputChange}
                                        />
                                        <ErrorMsg field="location" />
                                    </div>
                                )}

                                {showBudget && (
                                    <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                                        <Label text="Estimated Photography Investment" required />
                                        <select name="budget" value={formData.budget} onChange={handleInputChange}>
                                            <option value="">Select a range…</option>
                                            <option value="€2,000 – €2,500">€2,000 – €2,500</option>
                                            <option value="€2,500 – €3,000">€2,500 – €3,000</option>
                                            <option value="€3,000+">€3,000+</option>
                                            <option value="Flexible / Let's discuss">Flexible / Let's discuss</option>
                                        </select>
                                        <ErrorMsg field="budget" />
                                    </div>
                                )}

                                <div className="fg full" style={{ gridColumn: '1 / -1' }}>
                                    <Label text={messageLabel} required />
                                    <textarea
                                        name="vision"
                                        placeholder="How did you meet? What is the vibe of your day? Be as detailed as you like - I love stories."
                                        value={formData.vision}
                                        onChange={handleInputChange}
                                    ></textarea>
                                    <ErrorMsg field="vision" />
                                </div>

                                {showInterestCheckboxes && (
                                    <div className="check-group" style={{ gridColumn: '1 / -1' }}>
                                        <label className="check-lbl"><input type="checkbox" value="Wedding Photography" onChange={handleCheckboxChange} checked={formData.interests.includes("Wedding Photography")} />Wedding Photography</label>
                                        <label className="check-lbl"><input type="checkbox" value="Elopement" onChange={handleCheckboxChange} checked={formData.interests.includes("Elopement")} />Elopement</label>
                                        <label className="check-lbl"><input type="checkbox" value="Couple Session" onChange={handleCheckboxChange} checked={formData.interests.includes("Couple Session")} />Couple Session</label>
                                        <label className="check-lbl"><input type="checkbox" value="Film Photography" onChange={handleCheckboxChange} checked={formData.interests.includes("Film Photography")} />Film Photography</label>
                                    </div>
                                )}

                                <div className="priv-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', gridColumn: '1 / -1' }}>
                                    <label className="custom-checkbox" style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        flexShrink: 0,
                                        marginTop: '2px', // Align with top line of text
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
                                    <span style={{ fontSize: '0.9em', lineHeight: '1.4', cursor: 'pointer' }} onClick={() => handlePrivacyChange({ target: { checked: !formData.privacyConsent } } as any)}>
                                        I have read and agree to the Privacy Policy and consent to the processing of my personal data (GDPR compliant).
                                    </span>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}><ErrorMsg field="privacyConsent" /></div>

                                <button
                                    type="submit"
                                    className="btn-sub"
                                    disabled={status === 'submitting' || !formData.privacyConsent}
                                    style={{
                                        opacity: (status === 'submitting' || !formData.privacyConsent) ? 0.5 : 1,
                                        marginTop: '1rem',
                                        cursor: (status === 'submitting' || !formData.privacyConsent) ? 'not-allowed' : 'pointer',
                                        gridColumn: '1 / -1'
                                    }}
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Request Your Proposal'}
                                </button>
                            </form>
                        )}
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
