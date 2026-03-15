'use client';

import { ReactNode } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { PORTFOLIO_HOME } from '@/lib/constants';

interface PortfolioIntro {
    label: string;
    title: ReactNode;
    note?: string;
}

interface PortfolioGridProps {
    intro?: PortfolioIntro;
    // Keeping legacy props for backwards compatibility with any remaining usages
    items?: any[];
    legacyItems?: any[];
    ctaText?: string;
    ctaLink?: string;
}

export default function PortfolioGrid({
    intro,
    ctaText = 'Explore All Stories',
    ctaLink = 'https://www.alexcinisiphotography.com/stories/',
}: PortfolioGridProps) {
    const headerLabel = intro?.label || 'Selected Work';
    const headerTitle = intro?.title || <>Moments That Speak<br /><em>for Themselves</em></>;
    const headerNote = intro?.note;

    const openLightbox = (item: typeof PORTFOLIO_HOME[0]) => {
        // Implement lightbox functionality here or pass as prop later
    };

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

                <RevealOnScroll className="port-grid">
                    {PORTFOLIO_HOME.map((item, i) => (
                        <div 
                            className="port-item" 
                            key={i} 
                            style={{ '--port-ratio': item.ratio } as React.CSSProperties}
                            onClick={() => openLightbox(item)}
                        >
                            <div className="port-bg" />
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
