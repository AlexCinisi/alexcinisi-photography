'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { PORTFOLIO_HOME } from '@/lib/constants';
import PortfolioLightbox from '@/components/PortfolioLightbox';
import Image from 'next/image';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';

export interface SanityPortfolioItem {
  coupleName: string
  location: string
  badge?: string
  slug?: { current: string }
  image?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
          aspectRatio: number
        }
        lqip?: string
      }
    }
    hotspot?: { x: number; y: number }
    crop?: any
    alt?: string
  }
}

interface PortfolioIntro {
    label: string;
    title: ReactNode;
    note?: string;
}

interface PortfolioGridProps {
    intro?: PortfolioIntro;
    items?: SanityPortfolioItem[] | null;
    ctaText?: string;
    ctaLink?: string;
}

function getAspectRatio(item: any): string {
  if (item.image?.asset?.metadata?.dimensions) {
    const { width, height } = item.image.asset.metadata.dimensions
    return `${width}/${height}`
  }
  return item.ratio || '3/4'
}

function PortfolioItem({ item, index, onOpenLightbox }: { item: any, index: number, onOpenLightbox: () => void }) {
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
                '--port-ratio': getAspectRatio(item),
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${staggerDelay}s, 
                             transform 0.7s cubic-bezier(0.4,0,0.2,1) ${staggerDelay}s`,
            } as React.CSSProperties}
            onClick={onOpenLightbox}
        >
            <div className="port-bg">
                {item.image?.asset ? (
                    <Image
                        src={urlFor(item.image)
                            .width(800)
                            .quality(85)
                            .auto('format')
                            .fit('crop')
                            .crop('focalpoint')
                            .url()}
                        alt={item.image.alt || `${item.coupleName || 'Wedding'} photography by Alex Cinisi`}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: getHotspotPosition(item.image),
                        }}
                        placeholder={item.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={item.image.asset.metadata?.lqip}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#E8E5E0',
                    }} />
                )}
            </div>
        </div>
    );
}

export default function PortfolioGrid({
    intro,
    items,
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

    const portfolioItems = (items && items.length > 0)
        ? items
        : PORTFOLIO_HOME.map(item => ({
            ...item,
            image: null,
        }));

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
                    {portfolioItems.map((item, i) => (
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
                    items={portfolioItems}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </section>
    );
}
