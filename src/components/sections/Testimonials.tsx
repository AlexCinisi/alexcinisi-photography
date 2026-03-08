'use client';

import { useRef, useEffect } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface TestimonialItem {
    flag?: string;
    quote: string;
    author?: string;
    location?: string;
    coupleName?: string;
    countryFlag?: string;
}

interface TestimonialsProps {
    items?: TestimonialItem[];
}

const FALLBACK_TESTIMONIALS = [
    {
        flag: '🇺🇸',
        stars: 5,
        quote: 'Alex made us forget there was a camera. We were just… us. The photos are pure magic.',
        author: 'Sofia & Michael',
        location: 'Villa Valguarnera, Bagheria'
    },
    {
        flag: '🇮🇹',
        stars: 5,
        quote: 'Every image feels natural, timeless and deeply emotional. Far beyond our expectations.',
        author: 'Chiara & Luca',
        location: 'Tonnara di Scopello'
    },
    {
        flag: '🇮🇹',
        stars: 5,
        quote: 'Everything was so far above expectations. No words can describe how beautiful our photos are.',
        author: 'Francesca',
        location: 'Villa Igiea, Palermo'
    },
    {
        flag: '🇺🇸',
        stars: 5,
        quote: "We couldn't have imagined a more perfect experience. Alex captured our day so naturally.",
        author: 'Anna & Mark',
        location: 'Taormina'
    },
    {
        flag: '🇺🇸',
        stars: 5,
        quote: 'The light, the atmosphere, the emotions — everything was real and effortless.',
        author: 'Julia & Thomas',
        location: 'Noto'
    }
];

export default function Testimonials({ items }: TestimonialsProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // REVERSE: dark → light
        const BG_FROM = { r: 10, g: 10, b: 9 }; // warm-black (inizio = scuro)
        const BG_TO = { r: 245, g: 243, b: 239 }; // pearl (fine = chiaro)

        // Text: light → dark
        const TEXT_FROM = { r: 250, g: 250, b: 248 }; // off-white
        const TEXT_TO = { r: 30, g: 29, b: 27 }; // ink

        let ticking = false;

        function lerp(a: number, b: number, t: number) { return Math.round(a + (b - a) * t); }
        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function updateColors() {
            const rect = section!.getBoundingClientRect();
            const vh = window.innerHeight;
            const sH = section!.offsetHeight;

            // Transition starts when section enters viewport from the bottom
            const enteredBy = vh - rect.top;
            const startAt = 0;
            const endAt = sH * 0.4;

            const rawProgress = (enteredBy - startAt) / (endAt - startAt);
            const clamped = Math.max(0, Math.min(1, rawProgress));
            const progress = easeInOutCubic(clamped);

            // Background
            const r = lerp(BG_FROM.r, BG_TO.r, progress);
            const g = lerp(BG_FROM.g, BG_TO.g, progress);
            const b = lerp(BG_FROM.b, BG_TO.b, progress);
            section!.style.backgroundColor = `rgb(${r},${g},${b})`;

            // Text color
            const tr = lerp(TEXT_FROM.r, TEXT_TO.r, progress);
            const tg = lerp(TEXT_FROM.g, TEXT_TO.g, progress);
            const tb = lerp(TEXT_FROM.b, TEXT_TO.b, progress);
            section!.style.color = `rgb(${tr},${tg},${tb})`;

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

    const displayItems = (items && items.length > 0) ? items : FALLBACK_TESTIMONIALS;
    const topItems = displayItems.slice(0, 3);
    const bottomItems = displayItems.slice(3, 5);

    return (
        <section ref={sectionRef} className="testimonials-section s-pearl pad" id="reviews">
            <RevealOnScroll className="sec-head center" style={{ padding: '72px 64px 0' }}>
                <div className="f-label">What Couples Say</div>
                <div className="h2-lg">Straight From<br /><em>Their Hearts</em></div>
            </RevealOnScroll>
            <div style={{ padding: '44px 0 0' }}>
                <RevealOnScroll className="test-grid d1">
                    {topItems.map((item, i) => (
                        <div className="tcard" key={i}>
                            <span className="tcard-flag">{item.flag}</span>
                            <div className="tcard-stars"><span>★ ★ ★ ★ ★</span></div>
                            <p className="tcard-quote"><em>&ldquo;{item.quote}&rdquo;</em></p>
                            <div className="tcard-auth">
                                <strong>{item.author}</strong>
                                <span>{item.location}</span>
                            </div>
                        </div>
                    ))}
                </RevealOnScroll>
                {bottomItems.length > 0 && (
                    <RevealOnScroll className="test-grid-2 d2">
                        {bottomItems.map((item, i) => (
                            <div className="tcard" key={i}>
                                <span className="tcard-flag">{item.flag}</span>
                                <div className="tcard-stars"><span>★ ★ ★ ★ ★</span></div>
                                <p className="tcard-quote"><em>&ldquo;{item.quote}&rdquo;</em></p>
                                <div className="tcard-auth">
                                    <strong>{item.author}</strong>
                                    <span>{item.location}</span>
                                </div>
                            </div>
                        ))}
                    </RevealOnScroll>
                )}
            </div>
        </section>
    );
}
