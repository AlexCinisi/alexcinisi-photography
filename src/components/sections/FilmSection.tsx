'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface FilmSectionProps {
    image?: any;
}

export default function FilmSection({ image }: FilmSectionProps) {
    const filmSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = filmSectionRef.current;
        if (!section) return;

        // REVERSE: dark → light (specchia l'intro stories che fa light → dark)
        const BG_FROM = { r: 10,  g: 10,  b: 9   }; // warm-black
        const BG_TO   = { r: 245, g: 243, b: 239 }; // pearl

        let ticking = false;

        function lerp(a: number, b: number, t: number) {
            return Math.round(a + (b - a) * t);
        }

        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function updateColors() {
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sH = section.offsetHeight;

            // Inizia quando section top passa il viewport top (rect.top < 0)
            // Completa quando il 70% della sezione è uscito
            const scrolledPast = Math.max(0, -rect.top);
            const transitionDistance = sH * 0.7;
            const rawProgress = scrolledPast / transitionDistance;

            const clamped = Math.max(0, Math.min(1, rawProgress));
            const progress = easeInOutCubic(clamped);

            // Background: warm-black → pearl
            const r = lerp(BG_FROM.r, BG_TO.r, progress);
            const g = lerp(BG_FROM.g, BG_TO.g, progress);
            const b = lerp(BG_FROM.b, BG_TO.b, progress);
            section.style.backgroundColor = `rgb(${r},${g},${b})`;

            // Non transitare il colore del testo, resta chiaro

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateColors);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        updateColors();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div ref={filmSectionRef} className="film-wrap s-warm">
            <div className="film-media">
                <div className="film-single-img">
                    {image ? (
                        <Image
                            src={urlFor(image).width(800).quality(85).auto('format').url()}
                            alt="Film photography by Alex Cinisi"
                            width={600}
                            height={900}
                            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <div className="film-img-ph" />
                    )}
                </div>
            </div>
            <RevealOnScroll className="film-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Film &amp; Digital</div>
                <div className="h2" style={{ color: 'var(--off-white)', marginBottom: '22px' }}>The Best of<br /><em>Both Worlds</em></div>
                <p>Every wedding receives the richness of digital mastery — vibrant colours, flawless detail, fast turnaround. For those who want something even more special, medium-format film adds an unmistakable warmth, grain, and timelessness that digital cannot replicate.</p>
                <p>Film photography is available as a bespoke enhancement to any package. The two mediums complement each other beautifully — giving you a gallery that feels both contemporary and eternal.</p>
                <Link href="#invest" className="btn-fill" style={{ background: 'var(--off-white)', color: 'var(--ink)', marginTop: '22px' }}>See Investment Details</Link>
            </RevealOnScroll>
        </div>
    );
}
