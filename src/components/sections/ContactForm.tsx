'use client';

import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function ContactForm() {
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
                            <div className="fg"><label>Wedding Date</label><input type="date" /></div>
                            <div className="fg full"><label>Venue / Location</label><input type="text" placeholder="e.g. Tonnara di Scopello, or 'Undecided'" /></div>
                            <div className="fg full"><label>Tell Me About Your Story</label><textarea placeholder="How did you meet? What is the vibe of your day? Be as detailed as you like - I love stories."></textarea></div>
                            <div className="check-group">
                                <label className="check-lbl"><input type="checkbox" />Wedding Photography</label>
                                <label className="check-lbl"><input type="checkbox" />Elopement</label>
                                <label className="check-lbl"><input type="checkbox" />Couple Session</label>
                                <label className="check-lbl"><input type="checkbox" />Other</label>
                            </div>
                            <div className="priv-row">
                                <input type="checkbox" required />
                                <span>I agree to the privacy policy and consent to having this website store my submitted information so they can respond to my inquiry.</span>
                            </div>
                            <button type="submit" className="btn-sub">Send Inquiry</button>
                        </form>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
