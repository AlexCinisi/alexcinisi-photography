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
        flag: '🇬🇧',
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
    const displayItems = (items && items.length > 0) ? items : FALLBACK_TESTIMONIALS;
    const topItems = displayItems.slice(0, 3);
    const bottomItems = displayItems.slice(3, 5);

    return (
        <section className="s-grey" id="reviews">
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
