import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg">
                <div className="iph" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={48} height={48}>
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                    Full-Width Hero Photo
                </div>
            </div>
            <div className="hero-content">
                <div className="hero-eyebrow f-label">Luxury Wedding Photographer · Sicily &amp; Worldwide</div>
                <h1>
                    <span className="l1">Your Love Story,</span>
                    <span className="l2">Told Like a Film</span>
                    <span className="l3">You&apos;ll Never Forget</span>
                </h1>
                <p className="hero-sub">
                    Timeless destination wedding photography in Sicily for couples who believe their day deserves to be captured with heart, artistry and soul — not just a camera.
                </p>
                <div className="hero-actions">
                    <Link href="#contact" className="btn-fill">Reserve Your Date</Link>
                    <Link href="#portfolio" className="btn-text">Discover the Work</Link>
                </div>
            </div>
        </section>
    );
}
