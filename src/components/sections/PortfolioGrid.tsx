import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

export default function PortfolioGrid() {
    const cameraIcon = (
        <div className="iph">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" width="32" height="32">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
        </div>
    );

    return (
        <section className="s-white pad" id="portfolio">
            <div className="max">
                <RevealOnScroll className="port-intro">
                    <div>
                        <div className="f-label" style={{ marginBottom: '14px' }}>Selected Work</div>
                        <div className="h2-lg">Love Stories<br />Across Sicily</div>
                    </div>
                    <p className="port-intro-note">Every frame tells a story. Hover each image to discover the couple behind it.</p>
                </RevealOnScroll>
                <RevealOnScroll className="port-grid d1">
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Marina &amp; James</h4><span>Villa Valguarnera · Bagheria</span></div></div><div className="port-badge">Film + Digital</div></div>
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Sophie &amp; David</h4><span>Taormina · Full Day</span></div></div><div className="port-badge">Destination</div></div>
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Lucia &amp; Marco</h4><span>Tonnara di Scopello</span></div></div><div className="port-badge">Editorial</div></div>
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Anna &amp; Mark</h4><span>Taormina · UK Couple</span></div></div><div className="port-badge">Film</div></div>
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Julia &amp; Thomas</h4><span>Noto · USA Couple</span></div></div><div className="port-badge">Intimate</div></div>
                    <div className="port-item"><div className="port-bg">{cameraIcon}</div><div className="port-ov"><div className="port-cap"><h4>Chiara &amp; Luca</h4><span>Scopello · Weekend</span></div></div><div className="port-badge">Full Weekend</div></div>
                </RevealOnScroll>
                <RevealOnScroll className="d2" style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link href="#contact" className="btn-outline">View Complete Portfolio</Link>
                </RevealOnScroll>
            </div>
        </section>
    );
}
