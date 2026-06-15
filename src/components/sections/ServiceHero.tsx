import Image from 'next/image';
import Link from 'next/link';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';

interface ServiceHeroProps {
  image?: any;
  eyebrow?: string;
  /** Righe del titolo H1, es. ['Proposal Photography', 'in Sicily'] */
  titleLines: string[];
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  /** Secondo CTA opzionale (es. "View Gallery") */
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  darkText?: boolean;
}

/**
 * Hero modulare per le service page. Stile identico a HeroLocation,
 * ma TESTI e CTA arrivano via props (no contenuti cablati).
 */
export default function ServiceHero({
  image,
  eyebrow,
  titleLines,
  subtitle,
  ctaText,
  ctaHref,
  ctaSecondaryText,
  ctaSecondaryHref,
  darkText = false,
}: ServiceHeroProps) {
  return (
    <section className={`hero hero--location${darkText ? ' hero--dark-text' : ''}`}>
      <div className="hero-bg">
        {image?.asset && (
          <Image
            src={urlFor(image).fit('crop').crop('focalpoint').width(2400).auto('format').quality(90).url()}
            alt={image.alt || titleLines.join(' ') || ''}
            fill
            sizes="100vw"
            priority
            quality={90}
            style={{ objectFit: 'cover', objectPosition: getHotspotPosition(image) }}
          />
        )}
      </div>
      <div className="hero-content">
        {eyebrow && <div className="hero-eyebrow f-label">{eyebrow}</div>}
        <h1>
          {titleLines.map((line, i) => (
            <span key={i} className={`l${i + 1}`}>{line}</span>
          ))}
        </h1>
        {subtitle && <p className="hero-sub" style={{ maxWidth: '460px' }}>{subtitle}</p>}
        {(ctaText || ctaSecondaryText) && (
          <div className="hero-actions">
            {ctaText && ctaHref && <Link href={ctaHref} className="btn-fill">{ctaText}</Link>}
            {ctaSecondaryText && ctaSecondaryHref && <Link href={ctaSecondaryHref} className="btn-text">{ctaSecondaryText}</Link>}
          </div>
        )}
      </div>
    </section>
  );
}
