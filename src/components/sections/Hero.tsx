import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-left">
                <div className="hero-eyebrow f-label">Sicily &amp; Worldwide · Film &amp; Digital</div>
                <h1>
                    <span className="l1">Your Love Story,</span>
                    <span className="l2">Told Like a Film</span>
                    <span className="l3">You&apos;ll Never Forget</span>
                </h1>
                <p className="hero-sub">Timeless destination wedding photography for couples who believe their day deserves to be captured with heart, artistry and soul — not just a camera.</p>
                <div className="hero-actions">
                    <Link href="#contact" className="btn-fill">Reserve Your Date</Link>
                    <Link href="#portfolio" className="btn-text">Discover the Work</Link>
                </div>
                <div className="hero-scroll">Scroll</div>
            </div>
            <div className="hero-right">
                <div className="hero-ph">
                    <div className="iph">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="36" height="36"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                        Your Hero Photo
                    </div>
                </div>
                <div className="hero-tag">Sicily · 2026</div>
            </div>
        </section>
    );
}
