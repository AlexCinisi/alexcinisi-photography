import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface RegionCard {
  name?: string
  description?: string
  airport?: string
  locationPageRef?: { slug?: string }
}
interface GuideRegionsProps { heading?: string; intro?: string; cards?: RegionCard[] }

export default function GuideRegions({ heading, intro, cards }: GuideRegionsProps) {
  if (!cards?.length) return null
  return (
    <section className="s-white pad">
      <div className="max">
        <SectionHead as="h2" label="The Island" title={heading || 'Where in Sicily'} center />
        {intro && (
          <RevealOnScroll>
            <p className="guide-regions-intro">{intro}</p>
          </RevealOnScroll>
        )}
        <RevealOnScroll className="region-cards">
          {cards.map((card, i) => {
            const inner = (
              <>
                <h3>{card.name}</h3>
                {card.description && <p>{card.description}</p>}
                {card.airport && <span className="region-airport">{card.airport}</span>}
              </>
            )
            return card.locationPageRef?.slug ? (
              <Link key={i} href={`/locations/${card.locationPageRef.slug}`} className="region-card">{inner}</Link>
            ) : (
              <div key={i} className="region-card">{inner}</div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
