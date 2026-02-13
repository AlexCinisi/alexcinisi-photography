import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

interface AvailabilityProps {
    items?: {
        year: string;
        status: string;
        substatus: string;
        dotClass: "open" | "soon" | "closed";
    }[];
    text?: string;
    ctaText?: string;
}

export default function Availability({
    items = [
        { year: "2025", status: "Fully Booked", substatus: "Waitlist Only", dotClass: "closed" },
        { year: "2026", status: "Now Booking", substatus: "Spring & Summer", dotClass: "open" }
    ],
    text = "To ensure every couple receives my complete creative attention, I accept a limited number of weddings each year.",
    ctaText = "Check Your Date"
}: AvailabilityProps) {
    return (
        <section className="s-grey pad-sm">
            <div className="max">
                <RevealOnScroll className="avail-inner">
                    <div>
                        <div className="f-label" style={{ marginBottom: '18px' }}>Availability</div>
                        <div className="h2"><em>Limited &amp;</em><br />Intentional Selection</div>
                        <p style={{ marginTop: '18px' }}>{text}</p>
                    </div>
                    <div className="avail-cards">
                        {items.map((item, i) => (
                            <div className="avail-card" key={i}>
                                <span className={`avail-dot ${item.dotClass}`}></span>
                                <span className="avail-yr">{item.year}</span>
                                <div className="avail-st">{item.status}<span>{item.substatus}</span></div>
                            </div>
                        ))}
                        <Link href="#contact" className="btn-fill" style={{ textAlign: 'center' }}>{ctaText} →</Link>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
