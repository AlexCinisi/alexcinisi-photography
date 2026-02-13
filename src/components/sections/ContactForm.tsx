'use client';

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
                                <span className="cd-val">hello@alexcinisi.com</span>
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
                        <form>
                            <div className="fg"><label>First Name</label><input type="text" placeholder="Your Name" /></div>
                            <div className="fg"><label>Last Name</label><input type="text" placeholder="Partner's Name" /></div>
                            <div className="fg"><label>Email Address</label><input type="email" placeholder="best.email@example.com" /></div>
                            <div className="fg"><label>Wedding Date</label><input type={dateType} placeholder={datePlaceholder} /></div>

                            {showGuestCount && (
                                <div className="fg">
                                    <label>Guest Count</label>
                                    <select><option value="">Select…</option><option>Elopement (just us)</option><option>Intimate (under 50)</option><option>Medium (50–100)</option><option>Grand (100+)</option></select>
                                </div>
                            )}

                            {showSource && (
                                <div className="fg">
                                    <label>How did you find us?</label>
                                    <select><option value="">Select…</option><option>Google</option><option>Instagram</option><option>Wedding Planner</option><option>Venue recommendation</option><option>Friend / Referral</option><option>Other</option></select>
                                </div>
                            )}

                            {!venueHidden && (
                                <div className={`fg ${showGuestCount || showSource ? '' : 'full'}`}>
                                    <label>{venueLabel}</label>
                                    <input type="text" placeholder={venuePlaceholder} defaultValue={venueValue} />
                                </div>
                            )}

                            {showBudget && (
                                <div className="fg full">
                                    <label>Estimated Photography Investment</label>
                                    <select><option value="">Select a range…</option><option>€2,000 – €2,500</option><option>€2,500 – €3,000</option><option>€3,000+</option><option>Flexible / Let's discuss</option></select>
                                </div>
                            )}

                            <div className="fg full"><label>{messageLabel}</label><textarea placeholder="How did you meet? What is the vibe of your day? Be as detailed as you like - I love stories."></textarea></div>

                            {showInterestCheckboxes && (
                                <div className="check-group">
                                    <label className="check-lbl"><input type="checkbox" />Wedding Photography</label>
                                    <label className="check-lbl"><input type="checkbox" />Elopement</label>
                                    <label className="check-lbl"><input type="checkbox" />Couple Session</label>
                                    <label className="check-lbl"><input type="checkbox" />Film Photography</label>
                                </div>
                            )}

                            <div className="priv-row">
                                <input type="checkbox" required />
                                <span>I have read and agree to the Privacy Policy and consent to the processing of my personal data (GDPR compliant).</span>
                            </div>
                            <button type="submit" className="btn-sub">Request Your Proposal</button>
                        </form>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
