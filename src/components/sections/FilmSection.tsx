import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function FilmSection() {
    return (
        <section className="film-wrap">
            <div className="film-media">
                <div className="film-fr"></div>
                <div className="film-fr"></div>
                <div className="film-fr"></div>
                <div className="film-fr"></div>
            </div>
            <RevealOnScroll className="film-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Hybird Coverage</div>
                <div className="h2">The Nostalgia of Analog.<br />The Reliability of Digital.</div>
                <p>Why choose? I shoot with both.</p>
                <p><strong>Digital</strong> ensures I never miss a split-second reaction in low light. <strong>Film</strong> (35mm & 120mm) forces me to slow down and compose with intention, creating images with a texture, grain, and soul that digital filters simply cannot fake.</p>
                <div className="film-callout">
                    <strong>My Approach</strong>
                    <p>80% Digital for safety & speed.<br />20% Film for artistry & soul.</p>
                </div>
            </RevealOnScroll>
        </section>
    );
}
