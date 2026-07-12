import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SectionHead from '@/components/ui/SectionHead';

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
        <section className="s-pearl pad">
            <div className="max">
                <SectionHead as="h2" label={label} title={title} />
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
