import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function TrustBar() {
    return (
        <RevealOnScroll className="trust-bar">
            <div className="trust-item"><span className="trust-n">30+</span><span className="trust-l">International<br />Weddings</span></div>
            <div className="trust-sep"></div>
            <div className="trust-item"><span className="trust-n">15+</span><span className="trust-l">Countries<br />Served</span></div>
            <div className="trust-sep"></div>
            <div className="trust-item"><span className="trust-n">2</span><span className="trust-l">Photographers<br />Included</span></div>
            <div className="trust-sep"></div>
            <div className="trust-item"><span className="trust-n">8h</span><span className="trust-l">Full Day<br />Coverage</span></div>
            <div className="trust-sep"></div>
            <div className="trust-item"><span className="trust-n">Film</span><span className="trust-l">&amp; Digital<br />Artistry</span></div>
        </RevealOnScroll>
    );
}
