'use client';

import { ReactNode, useEffect, useState } from 'react';
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

function distributeToColumns<T>(items: T[], numCols: number): T[][] {
    const columns: T[][] = Array.from({ length: numCols }, () => []);
    items.forEach((item, i) => {
        columns[i % numCols].push(item);
    });
    return columns;
}

export default function PortfolioGrid({
    intro,
    items,
    legacyItems,
    ctaText = 'Explore All Stories',
    ctaLink = 'https://www.alexcinisiphotography.com/stories/',
}: PortfolioGridProps) {
    const [numCols, setNumCols] = useState(4);

    useEffect(() => {
        const checkWidth = () => {
            setNumCols(window.innerWidth <= 960 ? 3 : 4);
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    const hasSanityItems = items && items.length > 0;
    const isLocationsPage = legacyItems && legacyItems.length > 0;

    let displayItems: any[] = [];
    if (hasSanityItems && items) {
        displayItems = items.map(item => ({
            title: item.coupleName,
            subtitle: item.location,
            badge: item.badge || '',
            sanityImage: item.image,
            aspect: '3/4'
        }));
    } else if (isLocationsPage && legacyItems) {
        displayItems = legacyItems.map(item => ({
            title: item.title,
            subtitle: item.subtitle,
            badge: item.badge,
            sanityImage: null,
            aspect: '3/4'
        }));
    } else {
        displayItems = defaultItems.map((item, index) => ({
            title: item.title,
            subtitle: item.subtitle,
            badge: item.badge,
            sanityImage: null,
            aspect: index % 3 === 0 && index !== 0 ? '3/2' : '3/4' // Vary aspect ratios for rhythm
        }));
    }

    const columns = distributeToColumns(displayItems, numCols);

    const headerLabel = intro?.label || 'Selected Work';
    const headerTitle = intro?.title || <>Love Stories From<br /><em>Sicily &amp; Beyond</em></>;
    const headerNote = intro?.note;

    return (
        <section className="portfolio-masonry" id="portfolio">
            <div className="pad">
                <RevealOnScroll className="sec-head center">
                    <div className="f-label">{headerLabel}</div>
                    <div className="h2-lg">{headerTitle}</div>
                    {headerNote && (
                        <p style={{ fontSize: '.82rem', color: 'var(--mid)', maxWidth: 260, lineHeight: 1.7, margin: '0 auto' }}>
                            {headerNote}
                        </p>
                    )}
                </RevealOnScroll>

                <RevealOnScroll className="masonry-grid d1">
                    {columns.map((col, colIndex) => (
                        <div key={colIndex} className="masonry-col" style={{ marginTop: numCols === 4 && colIndex % 2 !== 0 ? '40px' : '0' }}>
                            {col.map((item, itemIndex) => (
                                <div key={itemIndex} className="masonry-item">
                                    {item.sanityImage ? (
                                        <Image
                                            src={urlFor(item.sanityImage).width(800).auto('format').quality(85).url()}
                                            alt={`${item.title} wedding at ${item.subtitle}`}
                                            width={600}
                                            height={800}
                                            sizes="(max-width: 960px) 33vw, 25vw"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: item.aspect,
                                            background: `linear-gradient(${150 + (itemIndex * 10)}deg, #2a2825, #1e1c1a, #151412)`
                                        }} />
                                    )}
                                    <div className="masonry-overlay">
                                        <strong>{item.title}</strong>
                                        <span>{item.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </RevealOnScroll>


            </div>
        </section>
    );
}

