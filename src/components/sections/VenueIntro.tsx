import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';

interface VenueIntroProps {
  label: string;
  title: React.ReactNode;
  description: React.ReactNode;
  galleryLinkText?: string;
  image?: any;
}

export default function VenueIntro({ label, title, description, galleryLinkText = "See Weddings", image }: VenueIntroProps) {
  return (
    <div className="venue-grid">
      <RevealOnScroll className="venue-copy">
        <div className="f-label" style={{ marginBottom: '22px' }}>{label}</div>
        <div className="h2-lg" style={{ marginBottom: '28px' }}>{title}</div>
        {description}
        <div style={{ marginTop: '36px' }}>
          <Link href="#gallery" className="btn-text">{galleryLinkText}</Link>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="venue-media floating-frame-container --light d2">
        {image ? (
          <div className="floating-frame">
            <Image
              src={urlFor(image).width(1200).height(1600).quality(85).auto('format').fit('crop').crop('focalpoint').url()}
              alt={image.alt || 'Venue editorial photograph'}
              width={1200}
              height={1600}
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        ) : (
          <div className="floating-frame">
            <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(170deg, #DDD6CA, #C8C0B3, #B8AC98)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={36} height={36}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
        )}
      </RevealOnScroll>
    </div>
  );
}
