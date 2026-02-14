import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function FilmSection() {
    return (
        <div className="film-wrap">
            <div className="film-media">
                <div className="iph" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={36} height={36}>
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                    Film &amp; Digital Samples
                </div>
            </div>
            <RevealOnScroll className="film-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Film &amp; Digital</div>
                <div className="h2" style={{ color: 'var(--off-white)', marginBottom: '22px' }}>The Best of<br /><em>Both Worlds</em></div>
                <p>Every wedding receives the richness of digital mastery — vibrant colours, flawless detail, fast turnaround. For those who want something even more special, medium-format film adds an unmistakable warmth, grain, and timelessness that digital cannot replicate.</p>
                <p>Film photography is available as a bespoke enhancement to any package. The two mediums complement each other beautifully — giving you a gallery that feels both contemporary and eternal.</p>
                <Link href="#invest" className="btn-fill" style={{ background: 'var(--off-white)', color: 'var(--ink)', marginTop: '22px' }}>See Investment Details</Link>
            </RevealOnScroll>
        </div>
    );
}
