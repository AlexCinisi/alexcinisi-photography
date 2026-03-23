import Link from 'next/link';
import Image from 'next/image';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';

interface HeroLocationProps {
  image?: any;
  eyebrow: string;
  titleL1: string;
  titleL2: string;
  titleL3: string;
  subtitle: string;
  scrollText?: string;
  locationTag?: string;
  darkText?: boolean;
}

export default function HeroLocation({
  image,
  eyebrow,
  titleL1,
  titleL2,
  titleL3,
  subtitle,
  scrollText = "Scroll to discover",
  locationTag,
  darkText = false
}: HeroLocationProps) {
  return (
    <section className={`hero hero--location${darkText ? ' hero--dark-text' : ''}`}>
      {/* Background image — identical pattern to Hero.tsx */}
      <div className="hero-bg">
        {image ? (
          <Image
            src={urlFor(image).fit('crop').crop('focalpoint').width(2400).auto('format').quality(90).url()}
            alt={image.alt || `${titleL1} — luxury wedding venue photography`}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: getHotspotPosition(image)
            }}
            priority={true}
            quality={90}
          />
        ) : (
          <div className="iph" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={48} height={48}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Full-Width Hero Photo
          </div>
        )}
      </div>

      {/* Content overlay — identical pattern to Hero.tsx */}
      <div className="hero-content">
        <div className="hero-eyebrow f-label">{eyebrow}</div>
        <h1>
          <span className="l1">{titleL1}</span>
          <span className="l2">{titleL2}</span>
          <span className="l3">{titleL3}</span>
        </h1>
        <p className="hero-sub" style={{ maxWidth: '460px' }}>{subtitle}</p>
        <div className="hero-actions">
          <Link href="#contact" className="btn-fill">Tell Me About Your Wedding</Link>
          <Link href="#gallery" className="btn-text">View Gallery</Link>
        </div>
      </div>
    </section>
  );
}
