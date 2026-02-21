import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface AboutSectionProps {
    image?: any;
}

export default function AboutSection({ image }: AboutSectionProps) {
    return (
        <div className="about-grid" id="about">
            <div className="about-img" style={{ position: 'relative' }}>
                {image ? (
                    <Image
                        src={urlFor(image).width(1600).auto('format').quality(85).url()}
                        alt="Alex Cinisi, wedding photographer in Sicily"
                        fill
                        sizes="(max-width:960px) 0px, 50vw"
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className="iph" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={34} height={34}>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Portrait of Alex
                    </div>
                )}
            </div>
            <RevealOnScroll className="about-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>About Alex</div>
                <div className="h2" style={{ marginBottom: '26px' }}>Why I Do<br /><em>This Work</em></div>
                <p>Hi, I&apos;m Alex. I fell in love with wedding photography not because of cameras or compositions — but because of <em>people</em>.</p>
                <p>There&apos;s something sacred about being invited into someone&apos;s most important day. The nervousness before the ceremony. The father&apos;s eyes when he sees his daughter. The way <strong>you two look at each other when no one&apos;s watching</strong>.</p>
                <p>That&apos;s what makes me feel alive.</p>
                <p>I grew up in Sicily, surrounded by extraordinary light and endless stories. My approach is quiet, intuitive, human. You live your day — I capture it unfolding naturally.</p>

                <div className="traits-grid">
                    <div className="trait-cell"><span className="trait-val">Sicilian</span><span className="trait-lbl">Born &amp; Raised</span></div>
                    <div className="trait-cell"><span className="trait-val">IT · EN</span><span className="trait-lbl">Bilingual</span></div>
                    <div className="trait-cell"><span className="trait-val">Film</span><span className="trait-lbl">&amp; Digital</span></div>
                    <div className="trait-cell"><span className="trait-val">Editorial</span><span className="trait-lbl">Style</span></div>
                    <div className="trait-cell"><span className="trait-val">30+</span><span className="trait-lbl">Weddings</span></div>
                    <div className="trait-cell"><span className="trait-val">15+</span><span className="trait-lbl">Countries</span></div>
                </div>
            </RevealOnScroll>
        </div>
    );
}
