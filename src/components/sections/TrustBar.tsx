import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface TrustItem {
    number: string;
    label: React.ReactNode;
}

interface TrustBarProps {
    items?: TrustItem[];
}

export default function TrustBar({ items }: TrustBarProps) {
    const defaultItems: TrustItem[] = [
        { number: "10+", label: <>Years<br />Experience</> },
        { number: "50+", label: <>Weddings<br />Captured</> },
        { number: "100%", label: <>Client<br />Satisfaction</> },
        { number: "Sicily", label: <>Based<br />& Worldwide</> },
    ];

    const displayItems = items || defaultItems;

    return (
        <RevealOnScroll className="trust-bar">
            {displayItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="trust-item">
                        <span className="trust-n">{item.number}</span>
                        <span className="trust-l">{item.label}</span>
                    </div>
                    {i < displayItems.length - 1 && <div className="trust-sep"></div>}
                </div>
            ))}
        </RevealOnScroll>
    );
}
