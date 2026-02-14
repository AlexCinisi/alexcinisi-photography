'use client';

import { useState, FormEvent } from 'react';
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData(prev => {
            if (name === 'privacyConsent') {
                return { ...prev, privacyConsent: checked };
            }
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
        setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

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
                            <form onSubmit={handleSubmit}>
                                <div className="fg">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="fg">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="partnerName"
                                        placeholder="Partner's Name"
                                        value={formData.partnerName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="fg">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="best.email@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="fg">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="fg">
                                    <label>Wedding Date</label>
                                    <input
                                        type={dateType}
                                        name="weddingDate"
                                        placeholder={datePlaceholder}
                                        value={formData.weddingDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {showGuestCount && (
                                    <div className="fg">
                                        <label>Guest Count</label>
                                        <select name="guestCount" value={formData.guestCount} onChange={handleInputChange}>
                                            <option value="">Select…</option>
                                            <option value="Elopement (just us)">Elopement (just us)</option>
                                            <option value="Intimate (under 50)">Intimate (under 50)</option>
                                            <option value="Medium (50–100)">Medium (50–100)</option>
                                            <option value="Grand (100+)">Grand (100+)</option>
                                        </select>
                                    </div>
                                )}

                                {showSource && (
                                    <div className="fg">
                                        <label>How did you find us?</label>
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
                                    <div className={`fg ${showGuestCount || showSource ? '' : 'full'}`}>
                                        <label>{venueLabel}</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder={venuePlaceholder}
                                            value={formData.location}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}

                                {showBudget && (
                                    <div className="fg full">
                                        <label>Estimated Photography Investment</label>
                                        <select name="budget" value={formData.budget} onChange={handleInputChange}>
                                            <option value="">Select a range…</option>
                                            <option value="€2,000 – €2,500">€2,000 – €2,500</option>
                                            <option value="€2,500 – €3,000">€2,500 – €3,000</option>
                                            <option value="€3,000+">€3,000+</option>
                                            <option value="Flexible / Let's discuss">Flexible / Let's discuss</option>
                                        </select>
                                    </div>
                                )}

                                <div className="fg full">
                                    <label>{messageLabel}</label>
                                    <textarea
                                        name="vision"
                                        placeholder="How did you meet? What is the vibe of your day? Be as detailed as you like - I love stories."
                                        value={formData.vision}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                {showInterestCheckboxes && (
                                    <div className="check-group">
                                        <label className="check-lbl"><input type="checkbox" value="Wedding Photography" onChange={handleCheckboxChange} checked={formData.interests.includes("Wedding Photography")} />Wedding Photography</label>
                                        <label className="check-lbl"><input type="checkbox" value="Elopement" onChange={handleCheckboxChange} checked={formData.interests.includes("Elopement")} />Elopement</label>
                                        <label className="check-lbl"><input type="checkbox" value="Couple Session" onChange={handleCheckboxChange} checked={formData.interests.includes("Couple Session")} />Couple Session</label>
                                        <label className="check-lbl"><input type="checkbox" value="Film Photography" onChange={handleCheckboxChange} checked={formData.interests.includes("Film Photography")} />Film Photography</label>
                                    </div>
                                )}

                                <div className="priv-row">
                                    <input
                                        type="checkbox"
                                        name="privacyConsent"
                                        required
                                        checked={formData.privacyConsent}
                                        onChange={handlePrivacyChange}
                                    />
                                    <span>I have read and agree to the Privacy Policy and consent to the processing of my personal data (GDPR compliant).</span>
                                </div>

                                {status === 'error' && (
                                    <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-sub"
                                    disabled={status === 'submitting'}
                                    style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
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
