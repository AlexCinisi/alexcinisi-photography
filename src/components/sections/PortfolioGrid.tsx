import { ReactNode } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface PortfolioItem {
    title: string;
    subtitle: string;
    badge: string;
}

interface PortfolioIntro {
    label: string;
    title: ReactNode;
    note?: string;
}

interface PortfolioGridProps {
    intro?: PortfolioIntro;
    items?: PortfolioItem[];
    ctaText?: string;
    ctaLink?: string;
}

const defaultItems: PortfolioItem[] = [
    { title: 'Marina & James', subtitle: 'Villa Valguarnera · Bagheria', badge: 'Film + Digital' },
    { title: 'Sophie & David', subtitle: 'Taormina · Full Day', badge: 'Destination' },
    { title: 'Lucia & Marco', subtitle: 'Tonnara di Scopello', badge: 'Editorial' },
    { title: 'Anna & Mark', subtitle: 'Taormina · UK Couple', badge: 'Film' },
    { title: 'Julia & Thomas', subtitle: 'Noto · USA Couple', badge: 'Intimate' },
    { title: 'Chiara & Luca', subtitle: 'Scopello · Weekend', badge: 'Full Weekend' },
    { title: 'Elena & Robert', subtitle: 'Villa Igiea · Palermo', badge: 'Luxury' },
];

const defaultSpans = [
    { col: 'span 7', h: 460 },
    { col: 'span 5', h: 460 },
    { col: 'span 4', h: 380 },
    { col: 'span 4', h: 380 },
    { col: 'span 4', h: 380 },
    { col: 'span 5', h: 420 },
    { col: 'span 7', h: 420 },
];

// Location page spans (6 items)
const locationSpans = [
    { col: 'span 5', h: 560 },
    { col: 'span 7', h: 272 },
    { col: 'span 4', h: 272 },
    { col: 'span 3', h: 272 },
    { col: 'span 5', h: 300 },
    { col: 'span 7', h: 300 },
];

export default function PortfolioGrid({
    intro,
    items,
    ctaText = 'Explore All Stories',
    ctaLink = 'https://www.alexcinisiphotography.com/stories/',
}: PortfolioGridProps) {
    const displayItems = items || defaultItems;
    const spans = items ? locationSpans : defaultSpans;

    const headerLabel = intro?.label || 'Selected Work';
    const headerTitle = intro?.title || <>Love Stories From<br /><em>Sicily &amp; Beyond</em></>;
    const headerNote = intro?.note;

    return (
        <section className="s-white pad-sm" id="portfolio">
            <div className="max">
                <RevealOnScroll className="sec-head">
                    <div className="f-label">{headerLabel}</div>
                    <div className="h2-lg">{headerTitle}</div>
                    {headerNote && (
                        <p style={{ fontSize: '.82rem', color: 'var(--mid)', maxWidth: 260, lineHeight: 1.7 }}>
                            {headerNote}
                        </p>
                    )}
                </RevealOnScroll>
            </div>
            <RevealOnScroll className="port-grid d1">
                {displayItems.map((item, i) => {
                    const span = spans[i] || spans[spans.length - 1];
                    return (
                        <div
                            key={i}
                            className="port-item"
                            style={{ gridColumn: span.col, height: span.h }}
                        >
                            <div className="port-info">
                                <strong>{item.title}</strong>
                                <span>{item.subtitle}</span>
                            </div>
                            <div className="port-badge">{item.badge}</div>
                        </div>
                    );
                })}
            </RevealOnScroll>
            <RevealOnScroll>
                <div style={{ textAlign: 'center', paddingTop: '56px' }}>
                    <Link href={ctaLink} className="btn-fill">{ctaText}</Link>
                </div>
            </RevealOnScroll>
        </section>
    );
}
