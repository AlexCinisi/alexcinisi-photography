import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Pillars() {
    return (
        <section className="s-white">
            <div className="max">
                <RevealOnScroll className="pillars">
                    <div className="pillar">
                        <div className="pillar-n">01</div>
                        <h3>Unobtrusive Presence</h3>
                        <p>I am a guest with a camera, not a director. I blend in, dress like a guest, and never interrupt a moment to ask you to "do that again".</p>
                        <div className="pillar-q">"We didn't even notice you were there until we saw the photos!"</div>
                    </div>
                    <div className="pillar">
                        <div className="pillar-n">02</div>
                        <h3>Editorial Eye</h3>
                        <p>Influenced by Vogue and classic cinema, I look for composition, light, and flattering angles naturally, without turning your wedding into a rigid photoshoot.</p>
                        <div className="pillar-q">"Like a movie, but it was actually our real life."</div>
                    </div>
                    <div className="pillar">
                        <div className="pillar-n">03</div>
                        <h3>Sicily Oriented</h3>
                        <p>Based in Palermo, I know the light, the logistics, and the hidden spots of this island better than any fly-in photographer ever could.</p>
                        <div className="pillar-q">"He knew exactly when the sunset would hit the Tonnara."</div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
