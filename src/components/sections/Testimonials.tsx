import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface TestimonialItem {
    flag: string;
    quote: string;
    author: string;
    location: string;
}

interface TestimonialsProps {
    items?: TestimonialItem[];
}

const defaultItems: TestimonialItem[] = [
    {
        flag: '🇺🇸',
        quote: "Alex has an extraordinary ability to disappear into the background while capturing the most intimate, beautiful moments. We couldn't imagine our Sicilian wedding without him.",
        author: 'Sofia & Michael',
        location: 'Villa Valguarnera · Bagheria',
    },
    {
        flag: '🇬🇧',
        quote: "From our very first call, Alex understood exactly the feeling we wanted. The photos are not just beautiful — they're the truest version of our day. We're forever grateful.",
        author: 'Sophie & David',
        location: 'Taormina · Destination Wedding',
    },
    {
        flag: '🇮🇹',
        quote: "Every image feels natural, timeless and deeply emotional. Alex captured moments we didn't even know were happening. His work is pure artistry.",
        author: 'Chiara & Luca',
        location: 'Tonnara di Scopello',
    },
    {
        flag: '🇩🇪',
        quote: "We flew from Berlin for our Sicily dream wedding and Alex was the best decision we made. He guided us beautifully through every moment while keeping everything completely natural.",
        author: 'Anna & Thomas',
        location: 'Noto · Baroque Palazzo',
    },
    {
        flag: '🇮🇹',
        quote: "Everything was so far above expectations. No words. The album is the most precious thing we own. Alex, you are family to us now.",
        author: 'Francesca & Marco',
        location: 'Palermo · Intimate Ceremony',
    },
];

export default function Testimonials({ items }: TestimonialsProps) {
    const displayItems = items || defaultItems;
    const topItems = displayItems.slice(0, 3);
    const bottomItems = displayItems.slice(3);

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
                            <p className="tcard-quote">&ldquo;{item.quote}&rdquo;</p>
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
                                <p className="tcard-quote">&ldquo;{item.quote}&rdquo;</p>
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
