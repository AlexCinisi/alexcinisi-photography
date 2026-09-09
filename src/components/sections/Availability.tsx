import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

import type { AvailabilityItem } from '@/lib/availability';

interface AvailabilityProps {
    /** Righe già risolte: gli anni li calcola `resolveAvailability`, non questo componente. */
    items: AvailabilityItem[];
    text: string;
}

export default function Availability({ items, text }: AvailabilityProps) {
    // Senza righe la sezione non esiste: meglio niente che una card vuota.
    if (items.length === 0) return null;

    return (
        <section className="s-offwh pad-sm">
            <div className="max">
                <RevealOnScroll className="avail-inner">
                    <div>
                        <div className="f-label" style={{ marginBottom: '22px' }}>Availability</div>
                        <h2 className="h2" style={{ marginBottom: '16px' }}>Limited Dates<br /><em>Remaining</em></h2>
                        <p>{text}</p>
                        <Link href="#contact" className="btn-fill" style={{ marginTop: '28px' }}>Check Your Date</Link>
                    </div>
                    <div className="avail-cards">
                        {items.map((item, i) => (
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
