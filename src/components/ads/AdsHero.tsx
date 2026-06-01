'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface AdsHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaText: string
  microText: string
  image?: any // Sanity image object
  secondaryCta?: React.ReactNode
}

export default function AdsHero({ eyebrow, title, subtitle, ctaText, microText, image, secondaryCta }: AdsHeroProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'view_content',
            event_category: 'Engagement',
            event_label: 'Scrolled past hero — Proposal Landing',
          })
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    const hero = document.querySelector('.ads-hero')
    if (hero) observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="ads-hero">
      <div className="ads-hero-bg">
        {image?.asset && (
          <Image
            src={urlFor(image).width(1920).auto('format').quality(80).url()}
            alt={image.alt || 'Wedding photography by Alex Cinisi'}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: image.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : '50% 50%',
            }}
            priority
          />
        )}
      </div>
      <div className="ads-hero-content">
        <p className="ads-hero-eyebrow">{eyebrow}</p>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p className="ads-hero-subtitle">{subtitle}</p>
        <div className="ads-hero-ctas">
          <a href="#book" className="ads-hero-cta">{ctaText}</a>
          {secondaryCta}
        </div>
        <p className="ads-hero-micro">{microText}</p>
      </div>
    </section>
  )
}
