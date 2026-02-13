import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function AboutSection() {
    return (
        <section className="about-grid" id="about">
            <div className="about-img"></div>
            <RevealOnScroll className="about-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>The Photographer</div>
                <div className="h2">Observing Life,<br />Frame by Frame.</div>
                <p>I grew up in Palermo, surrounded by chaotic beauty and ancient light. Photography was never just a job — it was my way of making sense of the world.</p>
                <p><em>"Alex has a way of seeing things that others miss. A shadow, a touch, a fleeting look."</em></p>
                <p>When I'm not shooting weddings, you'll find me shooting street photography in the markets of Ballarò, drinking too much espresso, or swimming in the sea at Mondello (even in winter).</p>
                <div className="traits">
                    <div className="trait">Fluent English</div>
                    <div className="trait">Sicily Native</div>
                    <div className="trait">Film &amp; Digital</div>
                </div>
            </RevealOnScroll>
        </section>
    );
}
