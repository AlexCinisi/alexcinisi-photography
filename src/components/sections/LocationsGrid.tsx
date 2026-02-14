import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function LocationsGrid() {
    return (
        <section className="s-grey pad" id="locations">
            <div className="max">
                <RevealOnScroll className="sec-head center">
                    <div className="f-label">Wedding Venues</div>
                    <div className="h2-lg">Luxury Venues Across<br /><em>Sicily &amp; Italy</em></div>
                    <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.85, maxWidth: 560, margin: '8px auto 0' }}>
                        From Palermo&apos;s Art Nouveau palazzi to Taormina&apos;s cliffside terraces and Noto&apos;s baroque splendour — I know every corner of this island intimately.
                    </p>
                </RevealOnScroll>
            </div>
            <RevealOnScroll className="loc-grid d1">
                <a href="https://www.alexcinisiphotography.com/wedding-photographer-palermo/" className="loc-card">
                    <div className="loc-card-city">Palermo</div>
                    <div className="loc-card-venues">Villa Igiea · Villa Niscemi · Villa Valguarnera · Palazzo Chiaramonte · Palazzo Butera</div>
                    <div className="loc-card-link">Explore Palermo Weddings</div>
                </a>
                <a href="https://www.alexcinisiphotography.com/wedding-photographer-taormina/" className="loc-card">
                    <div className="loc-card-city">Taormina</div>
                    <div className="loc-card-venues">Belmond Grand Hotel Timeo · San Domenico Palace · Villa Comunale · Teatro Antico</div>
                    <div className="loc-card-link">Explore Taormina Weddings</div>
                </a>
                <a href="https://www.alexcinisiphotography.com/tonnara-di-scopello-wedding/" className="loc-card">
                    <div className="loc-card-city">Scopello</div>
                    <div className="loc-card-venues">Tonnara di Scopello · Borgo di Scopello · Zingaro Nature Reserve</div>
                    <div className="loc-card-link">Explore Scopello Weddings</div>
                </a>
                <a href="https://www.alexcinisiphotography.com/wedding-photographer-noto/" className="loc-card">
                    <div className="loc-card-city">Noto</div>
                    <div className="loc-card-venues">Palazzo Nicolaci · Cattedrale di Noto · Villa Anna · Baroque Palazzi</div>
                    <div className="loc-card-link">Explore Noto Weddings</div>
                </a>
                <a href="https://www.alexcinisiphotography.com/villa-igiea-wedding-photographer/" className="loc-card">
                    <div className="loc-card-city">Villa Igiea</div>
                    <div className="loc-card-venues">Rocco Forte&apos;s iconic Art Nouveau palazzo on the Gulf of Palermo. A world-class setting.</div>
                    <div className="loc-card-link">Explore Villa Igiea Weddings</div>
                </a>
                <a href="https://www.alexcinisiphotography.com/stories/" className="loc-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'var(--ink)' }}>
                    <div className="loc-card-city" style={{ color: 'var(--off-white)' }}>Worldwide</div>
                    <div className="loc-card-venues" style={{ color: 'rgba(250,250,248,.45)' }}>Italy · Europe · Destination weddings across 15+ countries</div>
                    <div className="loc-card-link" style={{ color: 'var(--accent)', justifyContent: 'center' }}>View All Stories</div>
                </a>
            </RevealOnScroll>
        </section>
    );
}
