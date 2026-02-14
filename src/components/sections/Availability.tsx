import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface AvailabilityItem {
    year: string;
    status: string;
    substatus: string;
    dotClass: string;
}

interface AvailabilityProps {
    items?: AvailabilityItem[];
    text?: string;
}

const defaultItems: AvailabilityItem[] = [
    { year: '2026', status: 'Select dates still available', substatus: 'Spring & Autumn openings remaining', dotClass: 'open' },
    { year: '2027', status: 'Now accepting enquiries', substatus: 'Secure your date early', dotClass: 'soon' },
];

const defaultText = "I accept a limited number of weddings each year to ensure every couple receives my full creative attention and bespoke service. Peak season dates fill 12–18 months in advance.";

export default function Availability({ items, text }: AvailabilityProps) {
    const displayItems = items || defaultItems;
    const displayText = text || defaultText;

    return (
        <section className="s-offwh pad-sm">
            <div className="max">
                <RevealOnScroll className="avail-inner">
                    <div>
                        <div className="f-label" style={{ marginBottom: '22px' }}>Availability</div>
                        <div className="h2" style={{ marginBottom: '16px' }}>Limited Dates<br /><em>Remaining</em></div>
                        <p>{displayText}</p>
                        <Link href="#contact" className="btn-fill" style={{ marginTop: '28px' }}>Check Your Date</Link>
                    </div>
                    <div className="avail-cards">
                        {displayItems.map((item, i) => (
                            <div className="avail-card" key={i}>
                                <div className={`avail-dot ${item.dotClass}`}></div>
                                <div className="avail-yr">{item.year}</div>
                                <div className="avail-st">
                                    {item.status}
                                    <span>{item.substatus}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
