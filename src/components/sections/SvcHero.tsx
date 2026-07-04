import Image from 'next/image'
import Link from 'next/link'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'

interface SvcHeroProps {
  image?: any
  eyebrow?: string
  headingLines?: string[]
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  fallbackEyebrow?: string
  fallbackHeading?: string[]
}

export default function SvcHero({
  image, eyebrow, headingLines, subtitle,
  ctaText = 'Get in Touch', ctaHref = '/contact',
  fallbackEyebrow = '', fallbackHeading = [],
}: SvcHeroProps) {
  const lines = (headingLines && headingLines.length ? headingLines : fallbackHeading)
  return (
    <section className="svc-hero">
      <div className="svc-hero-bg">
        {image?.asset && (
          <Image
            src={urlFor(image).fit('crop').crop('focalpoint').width(2400).auto('format').quality(90).url()}
            alt={image.alt || lines.join(' ') || ''}
            fill priority quality={90} sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: getHotspotPosition(image) }}
          />
        )}
      </div>
      <div className="svc-hero-content">
        <div className="svc-eyebrow">{eyebrow || fallbackEyebrow}</div>
        <h1>
          {lines.map((line: string, i: number) => (
            <span key={i} className={i > 0 ? 'svc-serif' : ''}>{line}</span>
          ))}
        </h1>
        {subtitle && <p className="svc-hero-sub">{subtitle}</p>}
        <div className="svc-hero-actions">
          <Link href={ctaHref} className="svc-btn">{ctaText}</Link>
        </div>
      </div>
    </section>
  )
}
