import Image from 'next/image';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface GalleryImage {
  asset?: { metadata?: { lqip?: string } };
  alt?: string;
  caption?: string;
}

interface ServiceGalleryProps {
  label?: string;
  heading?: React.ReactNode;
  images: GalleryImage[];
  /** Sfondo sezione: 'pearl' | 'white'. Default 'pearl'. */
  background?: 'pearl' | 'white';
}

/**
 * Gallery modulare. Container ad aspect-ratio fisso (3:4) + fill,
 * immagini in alta risoluzione, hover opacity. Testi via props.
 */
export default function ServiceGallery({
  label = 'Portfolio',
  heading,
  images,
  background = 'pearl',
}: ServiceGalleryProps) {
  if (!images?.length) return null;

  return (
    <section className={`s-${background} pad`}>
      <div className="max">
        <RevealOnScroll className="sec-head">
          {label && <div className="f-label">{label}</div>}
          {heading && <div className="h2-lg">{heading}</div>}
        </RevealOnScroll>
        <RevealOnScroll className="service-gallery-grid">
          {images.map((img, i) => (
            img?.asset && (
              <figure key={i} className="service-gallery-item">
                <Image
                  src={urlFor(img).width(1400).quality(85).auto('format').url()}
                  alt={img.alt || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={img.asset.metadata?.lqip}
                  style={{ objectFit: 'cover', objectPosition: getHotspotPosition(img) }}
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            )
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
