import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

export interface PortfolioItem {
    title: string;
    subtitle: string;
    badge: string;
}

interface PortfolioGridProps {
    intro?: {
        label: string;
        title: React.ReactNode;
        note: string;
    };
    items?: PortfolioItem[];
    ctaLink?: string;
    ctaText?: string;
}

const defaultItems: PortfolioItem[] = [
    { title: "Marina & James", subtitle: "Villa Valguarnera · Bagheria", badge: "Film + Digital" },
    { title: "Sophie & David", subtitle: "Taormina · Full Day", badge: "Destination" },
    { title: "Lucia & Marco", subtitle: "Tonnara di Scopello", badge: "Editorial" },
    { title: "Anna & Mark", subtitle: "Taormina · UK Couple", badge: "Film" },
    { title: "Julia & Thomas", subtitle: "Noto · USA Couple", badge: "Intimate" },
    { title: "Chiara & Luca", subtitle: "Scopello · Weekend", badge: "Full Weekend" },
];

export default function PortfolioGrid({
    intro = {
        label: "Selected Work",
        title: <>Love Stories<br />Across Sicily</>,
        note: "Every frame tells a story. Hover each image to discover the couple behind it."
    },
    items = defaultItems,
    ctaLink = "#contact",
    ctaText = "View Complete Portfolio"
}: PortfolioGridProps) {

    // Placeholder SVG for images
    const cameraIcon = (
        <div className="iph">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" width="32" height="32">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
        </div>
    );

    return (
        <section className="s-white pad" id="portfolio">
            <div className="max">
                <RevealOnScroll className="port-intro">
                    <div>
                        <div className="f-label" style={{ marginBottom: '14px' }}>{intro.label}</div>
                        <div className="h2-lg">{intro.title}</div>
                    </div>
                    <p className="port-intro-note">{intro.note}</p>
                </RevealOnScroll>

                <RevealOnScroll className="port-grid d1">
                    {items.map((item, i) => (
                        <div className="port-item" key={i}>
                            <div className="port-bg">
                                <div className="iph">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" width="32" height="32">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="port-ov">
                                <div className="port-cap">
                                    <h4>{item.title}</h4>
                                    <span>{item.subtitle}</span>
                                </div>
                            </div>
                            <div className="port-badge">{item.badge}</div>
                        </div>
                    ))}
                </RevealOnScroll>

                <RevealOnScroll className="d2" style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link href={ctaLink} className="btn-outline">{ctaText}</Link>
                </RevealOnScroll>
            </div>
        </section>
    );
}
