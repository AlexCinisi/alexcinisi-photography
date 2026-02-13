import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface DetailItem {
    icon: string;
    title: string;
    description: string;
}

interface VenueDetailsProps {
    label: string;
    title: React.ReactNode;
    items: DetailItem[];
}

export default function VenueDetails({ label, title, items }: VenueDetailsProps) {
    return (
        <section className="s-grey pad">
            <div className="max">
                <RevealOnScroll className="sec-head">
                    <div className="f-label">{label}</div>
                    <div className="h2-lg">{title}</div>
                </RevealOnScroll>
                <RevealOnScroll className="venue-details d1">
                    {items.map((item, i) => (
                        <div className="vd-item" key={i}>
                            <span className="vd-icon">{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
