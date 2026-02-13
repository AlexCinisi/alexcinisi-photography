import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Investment() {
    return (
        <section className="s-white pad" id="invest">
            <div className="max">
                <div className="sec-head">
                    <div className="f-label">Investment</div>
                    <div className="h2-lg">Simple, Transparent<br />Pricing for 2026.</div>
                </div>
                <div className="invest-grid">
                    <RevealOnScroll className="invest-left">
                        <p className="hero-sub">I believe you shouldn't need a spreadsheet to understand your wedding photography package. I offer one comprehensive collection that covers everything 95% of couples need.</p>
                        <div className="invest-price-block">
                            <span className="price-eye">Full Day Collection</span>
                            <span className="price-big">€3,500</span>
                            <span className="price-rng">All-inclusive for Sicily Weddings</span>
                        </div>
                        <ul className="includes">
                            <li>Up to 10 Hours of Coverage</li>
                            <li>400+ High-Res Edited Images</li>
                            <li>Online Private Gallery (10 Years)</li>
                            <li>Sneak Peeks within 48 Hours</li>
                            <li>Travel included throughout Sicily</li>
                            <li>Personal Printing Rights</li>
                        </ul>
                        <div className="invest-sig">
                            <p>"No hidden travel fees, no confusing tiers. Just me, your wedding, and a commitment to excellence."</p>
                            <span>— Alex Cinisi</span>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll className="invest-right d2">
                        <div className="enhancements-box">
                            <h3>Enhancements</h3>
                            <p>Customise your collection with these optional extras.</p>
                            <div className="e-item">Second Photographer (Recommended for 100+ guests)</div>
                            <div className="e-item">35mm Film Add-On (3 Rolls)</div>
                            <div className="e-item">Rehearsal Dinner Coverage (2 Hours)</div>
                            <div className="e-item">Next-Day Editorial Session</div>
                            <div className="e-item">Fine Art Album (30x30cm)</div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
