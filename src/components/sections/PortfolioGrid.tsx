import { ReactNode } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface PortfolioItem {
    coupleName: string;
    location: string;
    badge?: string;
    image?: any;
    slug?: any;
}

interface LegacyPortfolioItem {
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
    legacyItems?: LegacyPortfolioItem[];
    ctaText?: string;
    ctaLink?: string;
}

const defaultItems: LegacyPortfolioItem[] = [
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
    legacyItems,
    ctaText = 'Explore All Stories',
    ctaLink = 'https://www.alexcinisiphotography.com/stories/',
}: PortfolioGridProps) {
    const hasSanityItems = items && items.length > 0;
    const isLocationsPage = legacyItems && legacyItems.length > 0;

    // We decide what to loop over based on what's provided
    const displaySpans = hasSanityItems || isLocationsPage ? locationSpans : defaultSpans;

    // Calculate total items to display
    const totalItemsCount = hasSanityItems
        ? items.length
        : (isLocationsPage ? legacyItems.length : defaultItems.length);

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
                {Array.from({ length: totalItemsCount }).map((_, i) => {
                    const span = displaySpans[i] || displaySpans[displaySpans.length - 1];

                    let title = '';
                    let subtitle = '';
                    let badge = '';
                    let sanityImage = null;

                    if (hasSanityItems) {
                        const item = items[i];
                        title = item.coupleName;
                        subtitle = item.location;
                        badge = item.badge || '';
                        sanityImage = item.image;
                    } else if (isLocationsPage && legacyItems) {
                        const item = legacyItems[i];
                        title = item.title;
                        subtitle = item.subtitle;
                        badge = item.badge;
                    } else {
                        const item = defaultItems[i];
                        title = item.title;
                        subtitle = item.subtitle;
                        badge = item.badge;
                    }

                    return (
                        <div
                            key={i}
                            className="port-item"
                            style={{ gridColumn: span.col, height: span.h, position: 'relative', overflow: 'hidden' }}
                        >
                            {sanityImage ? (
                                <Image
                                    src={urlFor(sanityImage).width(800).auto('format').quality(80).url()}
                                    alt={`${title} wedding at ${subtitle}`}
                                    fill
                                    sizes="(max-width:960px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : null}
                            <div className="port-info">
                                <strong>{title}</strong>
                                <span>{subtitle}</span>
                            </div>
                            <div className="port-badge">{badge}</div>
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
