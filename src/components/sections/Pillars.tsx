import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface PillarItem {
    number: string;
    title: string;
    description: string;
    quote?: string;
    quoteAuthor?: string;
}

interface PillarsProps {
    intro?: {
        label: string;
        title: React.ReactNode;
    };
    items?: PillarItem[];
}

const defaultItems: PillarItem[] = [
    { number: "01", title: "Timeless Editing", description: "My editing style is true to life, refined, and consistent. Your photos will look as beautiful in 50 years as they do today.", quote: "The colors are so natural and elegant.", quoteAuthor: "Julia & Sam" },
    { number: "02", title: "Unobtrusive Approach", description: "I capture moments as they unfold, without interfering. You enjoy your day; I preserve the memories.", quote: "We basically forgot he was there!", quoteAuthor: "Mark & Sarah" },
    { number: "03", title: "Curated Experience", description: "From the first call to album delivery, every step is handled with care and attention to detail.", quote: "Professional, kind, and incredibly talented.", quoteAuthor: "Elena & Tom" },
];

export default function Pillars({
    intro = {
        label: "My Approach",
        title: <>Photography rooted<br />in <em>Connection</em></>
    },
    items = defaultItems
}: PillarsProps) {
    return (
        <section className="s-white pad">
            <div className="max">
                <RevealOnScroll className="sec-head">
                    <div className="f-label">{intro.label}</div>
                    <div className="h2-lg">{intro.title}</div>
                </RevealOnScroll>
                <RevealOnScroll className="pillars d1">
                    {items.map((item, i) => (
                        <div className="pillar" key={i}>
                            <div className="pillar-n">{item.number}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            {item.quote && (
                                <p className="pillar-q">&quot;{item.quote}&quot;{item.quoteAuthor && ` — ${item.quoteAuthor}`}</p>
                            )}
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
