'use client';

import { useState } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface FAQItemData {
    q: string;
    a: string;
}

interface FAQProps {
    label?: string;
    items?: FAQItemData[];
}

const defaultItems: FAQItemData[] = [
    {
        q: "How much does a luxury wedding photographer in Sicily cost?",
        a: "My starting investment is €2,500 for full-day coverage including two photographers, drone aerial photography, 300–500 edited images, a premium album, and private gallery. Most couples invest between €2,500 and €5,000 depending on coverage hours and enhancements.",
    },
    {
        q: "How far in advance should we book?",
        a: "Most couples book 12–18 months ahead, especially for peak season (May–October). Sicily's most popular venues fill quickly. I occasionally have last-minute availability — reach out and let's see what's possible.",
    },
    {
        q: "Do you travel for destination weddings outside Sicily?",
        a: "Absolutely. While Sicily is home, I've covered weddings across 15+ countries. Travel costs for destinations outside Sicily are included in your personalised proposal — no hidden fees.",
    },
    {
        q: "What is the best time of year to get married in Sicily?",
        a: "Late spring (May–June) and early autumn (September–October) offer the most beautiful light and comfortable temperatures. These months are ideal for outdoor ceremonies and golden hour portraits at Sicily's iconic venues.",
    },
    {
        q: "What wedding venues in Sicily do you photograph at?",
        a: "I have extensive experience at Villa Igiea, Tonnara di Scopello, Villa Valguarnera, venues throughout Taormina, Noto's baroque palazzi, and many more. I'm happy to recommend venues based on your vision and guest count.",
    },
    {
        q: "When will we receive our photos?",
        a: "You receive a sneak peek of 30–50 images within 48–72 hours. Your complete gallery is delivered within 8–10 weeks, carefully edited to ensure every image meets the highest artistic standard.",
    },
    {
        q: "Do you speak Italian and English?",
        a: "Yes, I'm fluent in both Italian and English. I work regularly with international couples and local families alike, and communication is always smooth and personal.",
    },
];

export default function FAQ({ label, items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const displayItems = items || defaultItems;
    const displayLabel = label || 'Common Questions';

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="s-white pad">
            <div className="max">
                <RevealOnScroll className="sec-head center">
                    <div className="f-label">{displayLabel}</div>
                    <div className="h2-lg">Everything You<br /><em>Need to Know</em></div>
                </RevealOnScroll>
                <RevealOnScroll className="faq-wrap d1">
                    {displayItems.map((item, index) => (
                        <div key={index} className={`faq-item${openIndex === index ? ' open' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFAQ(index)}>
                                <span className="faq-q-t">{item.q}</span>
                                <span className="faq-ico">+</span>
                            </div>
                            <div className="faq-a">
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
