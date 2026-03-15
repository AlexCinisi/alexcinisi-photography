'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { PORTFOLIO_HOME } from '@/lib/constants';
import PortfolioLightbox from '@/components/PortfolioLightbox';

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

function PortfolioItem({ item, index, onOpenLightbox }: { item: typeof PORTFOLIO_HOME[0], index: number, onOpenLightbox: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { 
                if (e.isIntersecting) { 
                    setVisible(true); 
                    obs.disconnect(); 
                } 
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    
    // Stagger: items nella stessa "onda" (posizione % colonne)
    const staggerDelay = (index % 3) * 0.12; // 0ms, 120ms, 240ms
    
    return (
        <div 
            ref={ref}
            className="port-item"
            style={{
                '--port-ratio': item.ratio,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${staggerDelay}s, 
                             transform 0.7s cubic-bezier(0.4,0,0.2,1) ${staggerDelay}s`,
            } as React.CSSProperties}
            onClick={onOpenLightbox}
        >
            <div className="port-bg" />
        </div>
    );
}

export default function PortfolioGrid({
    intro,
    ctaText = 'Explore All Stories',
    ctaLink = 'https://www.alexcinisiphotography.com/stories/',
}: PortfolioGridProps) {
    const headerLabel = intro?.label || 'Selected Work';
    const headerTitle = intro?.title || <>Moments That Speak<br /><em>for Themselves</em></>;
    const headerNote = intro?.note;

    const headRef = useRef<HTMLDivElement>(null);
    const [headVisible, setHeadVisible] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { 
                if (e.isIntersecting) { 
                    setHeadVisible(true); 
                    obs.disconnect(); 
                } 
            },
            { threshold: 0.3 }
        );
        if (headRef.current) obs.observe(headRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="portfolio-masonry" id="portfolio">
            <div className="pad">
                <div 
                    ref={headRef}
                    className="sec-head center"
                    style={{
                        opacity: headVisible ? 1 : 0,
                        transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
                    }}
                >
                    <div className="f-label">{headerLabel}</div>
                    <div className="h2-lg">{headerTitle}</div>
                    {headerNote && (
                        <p style={{ fontSize: '.82rem', color: 'var(--mid)', maxWidth: 260, lineHeight: 1.7, margin: '0 auto' }}>
                            {headerNote}
                        </p>
                    )}
                </div>

                <div className="port-grid">
                    {PORTFOLIO_HOME.map((item, i) => (
                        <PortfolioItem 
                            key={i} 
                            item={item} 
                            index={i} 
                            onOpenLightbox={() => setLightboxIndex(i)} 
                        />
                    ))}
                </div>
            </div>

            {lightboxIndex !== null && (
                <PortfolioLightbox
                    images={PORTFOLIO_HOME}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </section>
    );
}
