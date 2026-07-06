import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface VenueCalloutProps {
    label: string;
    title: React.ReactNode;
    content: React.ReactNode;
    imageAlt?: string;
    image?: any;
}

export default function VenueCallout({ label, title, content, imageAlt = "Venue Context", image }: VenueCalloutProps) {
    return (
        <div className="venue-callout">
            <RevealOnScroll className="vc-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>{label}</div>
                <h2 className="h2" style={{ marginBottom: '22px' }}>{title}</h2>
                {content}
            </RevealOnScroll>
      <div className="vc-media floating-frame-container --dark">
        {image ? (
          <div className="floating-frame">
            <Image
              src={urlFor(image).width(1200).height(1600).quality(85).auto('format').url()}
              alt={image.alt || imageAlt}
              width={1200}
              height={1600}
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        ) : (
          <div className="floating-frame">
            <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(170deg, #3A3835, #2A2826)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={32} height={32}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
        )}
      </div>
        </div>
    );
}
