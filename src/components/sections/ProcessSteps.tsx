import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function ProcessSteps() {
    return (
        <section className="s-grey pad">
            <div className="max">
                <div className="sec-head center">
                    <div className="f-label">The Experience</div>
                    <div className="h2">How We Work Together</div>
                </div>
                <RevealOnScroll className="process-grid">
                    <div className="step">
                        <span className="step-n">01</span>
                        <h3>The Connection</h3>
                        <p>We hop on a video call. Chemistry is key. If we vibe, you secure your date with a 30% retainer.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">02</span>
                        <h3>The Planning</h3>
                        <p>I send you my "Sicily Guide" and a questionnaire. We create a timeline that prioritises light and flowing moments.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">03</span>
                        <h3>The Wedding</h3>
                        <p>I arrive early. I shoot. I help you feel calm. You enjoy your party. I capture the magic.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">04</span>
                        <h3>The Delivery</h3>
                        <p>Previews in 2 days. Full gallery in 6 weeks. Your memories, safe forever.</p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
