interface AdsHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaText: string
  microText: string
}

export default function AdsHero({ eyebrow, title, subtitle, ctaText, microText }: AdsHeroProps) {
  return (
    <section className="ads-hero">
      <div className="ads-hero-bg" />
      <div className="ads-hero-content">
        <p className="ads-hero-eyebrow">{eyebrow}</p>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p className="ads-hero-subtitle">{subtitle}</p>
        <a href="#book" className="ads-hero-cta">{ctaText}</a>
        <p className="ads-hero-micro">{microText}</p>
      </div>
    </section>
  )
}
