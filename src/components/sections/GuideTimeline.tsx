import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface TimelineStep { when?: string; what?: string }
interface GuideTimelineProps { heading?: string; steps?: TimelineStep[] }

export default function GuideTimeline({ heading, steps }: GuideTimelineProps) {
  if (!steps?.length) return null
  return (
    <section className="s-pearl pad">
      <div className="max">
        <SectionHead as="h2" label="Planning" title={heading || 'Working Backwards from the Date'} center />
        <RevealOnScroll className="timeline">
          {steps.map((step, i) => (
            <div key={i} className="timeline-step">
              <span className="timeline-when">{step.when}</span>
              <p className="timeline-what">{step.what}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
