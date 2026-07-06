import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface SvcProcessStep { step?: string; title?: string; description?: string }
interface SvcProcessProps { eyebrow?: string; heading?: string; steps?: SvcProcessStep[] }

export default function SvcProcess({ eyebrow = 'How It Works', heading, steps }: SvcProcessProps) {
  if (!steps?.length) return null
  return (
    <section className="svc-process">
      <div className="svc-wrap">
        <SectionHead
          as="h2"
          label={eyebrow}
          title={heading || 'From First Message to Final Gallery'}
        />
        <RevealOnScroll className="svc-proc-grid">
          {steps.map((s, i) => (
            <div key={i} className="svc-proc-step">
              <div className="svc-proc-n">{s.step || String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
