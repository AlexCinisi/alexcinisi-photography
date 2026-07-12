import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SectionHead from '@/components/ui/SectionHead';

export default function ProcessSteps() {
    return (
        <section className="s-pearl pad">
            <div className="max">
                <SectionHead
                    as="h2"
                    label="How It Works"
                    title={<>A Seamless Journey<br />From Hello to <em>&ldquo;I Do&rdquo;</em></>}
                />
                <RevealOnScroll className="process-grid d1">
                    <div className="step">
                        <span className="step-n">01</span>
                        <h3>Connect</h3>
                        <p>Fill out the form below. I respond within 24 hours with tailored questions about your vision and celebration.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">02</span>
                        <h3>Discover</h3>
                        <p>We jump on a video call to understand your story, your style, your wedding. This is where the magic begins.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">03</span>
                        <h3>Proposal</h3>
                        <p>Within 48 hours you receive a bespoke proposal — clear pricing, coverage options, timeline. Everything transparent.</p>
                    </div>
                    <div className="step">
                        <span className="step-n">04</span>
                        <h3>Celebrate</h3>
                        <p>Pre-wedding planning, location scouting, timeline consultation — I&apos;m here to make your entire experience effortless.</p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
