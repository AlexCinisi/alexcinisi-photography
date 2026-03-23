import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface HeroLocationProps {
    eyebrow: string;
    titleL1: string;
    titleL2: string;
    titleL3: string;
    subtitle: string;
    scrollText?: string;
    locationTag?: string;
    image?: any;
}

export default function HeroLocation({
    eyebrow,
    titleL1,
    titleL2,
    titleL3,
    subtitle,
    scrollText = "Scroll to discover",
    locationTag,
    image
}: HeroLocationProps) {
    return (
        <section className="hero hero--location">
            <div className="hero-left">
                <RevealOnScroll className="hero-eyebrow f-label" delay={0.3}>{eyebrow}</RevealOnScroll>
                <RevealOnScroll delay={0.5}>
                    <h1>
                        <span className="l1">{titleL1}</span>
                        <span className="l2">{titleL2}</span>
                        <span className="l3">{titleL3}</span>
                    </h1>
                </RevealOnScroll>
                <RevealOnScroll className="hero-sub" delay={0.7} style={{ maxWidth: '460px' }}>{subtitle}</RevealOnScroll>

                <RevealOnScroll className="hero-actions" delay={0.9}>
                    <Link href="#contact" className="btn-fill">Tell Me About Your Wedding</Link>
                    <Link href="#gallery" className="btn-text">View Gallery</Link>
                </RevealOnScroll>

                <RevealOnScroll className="hero-scroll" delay={1.1}>
                    {scrollText}
                </RevealOnScroll>
            </div>

            <div className="hero-right">
                {image ? (
                    <Image
                        src={urlFor(image).width(1400).height(1800).quality(85).auto('format').url()}
                        alt={image.alt || `${titleL1} wedding venue`}
                        width={1400}
                        height={1800}
                        priority
                        sizes="(max-width: 960px) 100vw, 50vw"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div className="hero-ph">
                        <div className="iph">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="36" height="36"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                            {titleL1} Hero Photo
                        </div>
                    </div>
                )}
                {locationTag && <div className="hero-tag">{locationTag}</div>}
            </div>
        </section>
    );
}
