import { ReactNode } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface PillarItem {
    number: string;
    title: string;
    description: string;
    quote: string;
    quoteAuthor: string;
}

interface PillarIntro {
    label: string;
    title: ReactNode;
}

interface PillarsProps {
    intro?: PillarIntro;
    items?: PillarItem[];
}

const defaultItems: PillarItem[] = [
    {
        number: '01',
        title: 'Invisible Presence',
        description: 'My approach is quiet, intuitive, human. You live your day — I capture it unfolding naturally. No intrusion, no interruption, just authentic moments preserved forever.',
        quote: '"Alex made us forget there was a camera. We were just… us."',
        quoteAuthor: 'Sofia & Michael, USA',
    },
    {
        number: '02',
        title: 'Editorial Sensibility',
        description: "When gentle guidance is needed — portraits, golden hour, family formals — it's subtle, elegant and natural. No stiff poses. No awkward \"say cheese.\"",
        quote: '"Every image feels natural, timeless and deeply emotional."',
        quoteAuthor: 'Chiara & Luca, Italy',
    },
    {
        number: '03',
        title: 'Bespoke Attention',
        description: "Every couple, every celebration is different. You're not a number — you're a story I'm honoured to tell, with my full creative focus from first inquiry to final gallery.",
        quote: '"Everything was so far above expectations. No words."',
        quoteAuthor: 'Francesca, Italy',
    },
];

export default function Pillars({ intro, items }: PillarsProps) {
    const displayItems = items || defaultItems;
    const label = intro?.label || 'Why Couples Choose Alex';
    const title = intro?.title || <>Three Pillars of<br /><em>Unforgettable Imagery</em></>;

    return (
        <section className="s-grey pad" id="approach">
            <div className="max">
                <RevealOnScroll className="sec-head center">
                    <div className="f-label">{label}</div>
                    <div className="h2-lg">{title}</div>
                </RevealOnScroll>
                <RevealOnScroll className="pillars d1">
                    {displayItems.map((item, i) => (
                        <div className="pillar" key={i}>
                            <div className="pillar-n">{item.number}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p className="pillar-q">{item.quote} — {item.quoteAuthor}</p>
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
