import Image from 'next/image'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface GuideLightProps {
  eyebrow?: string
  heading?: string
  image?: any
  body?: string
  pullquote?: string
}

export default function GuideLight({ eyebrow, heading, image, body, pullquote }: GuideLightProps) {
  if (!heading) return null
  const dims = image?.asset?.metadata?.dimensions
  const lqip = image?.asset?.metadata?.lqip
  return (
    <section className="s-pearl pad">
      <div className="max">
        {eyebrow && <div className="svc-eyebrow">{eyebrow}</div>}
        <SectionHead as="h2" title={heading} />
        <div className="light-split">
          {image?.asset && (
            <RevealOnScroll className="light-img">
              <Image
                src={urlFor(image).width(1400).auto('format').quality(85).url()}
                alt={image.alt || ''}
                width={dims?.width || 1400}
                height={dims?.height || 1750}
                sizes="(max-width: 600px) 100vw, 50vw"
                placeholder={lqip ? 'blur' : 'empty'}
                blurDataURL={lqip}
                style={{ width: '100%', height: 'auto', objectPosition: getHotspotPosition(image) }}
              />
            </RevealOnScroll>
          )}
          <RevealOnScroll className="light-text">
            {body && <p>{body}</p>}
            {pullquote && <blockquote className="light-pullquote">{pullquote}</blockquote>}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
