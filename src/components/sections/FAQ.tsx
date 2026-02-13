'use client';

import { useState } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { q: "How many images do we receive?", a: "For a full day wedding, you will receive between 400-600 fully edited, high-resolution images. I believe in quality over quantity." },
        { q: "Do you travel outside of Sicily?", a: "Yes! While I specialise in Sicily, I frequently shoot in Amalfi, Tuscany, and Lake Como. Travel fees apply for mainland Italy." },
        { q: "How long does it take to get our photos?", a: "You will receive a sneak peek gallery (30-50 photos) within 48 hours. The full gallery will be delivered within 6 weeks." },
        { q: "Do we need a second shooter?", a: "For weddings with over 100 guests, I highly recommend it to ensure candid moments of your guests are captured while I focus on you." },
        { q: "How do we book you?", a: "A 30% retainer and a signed contract secures your date. Dates for 2026 are booking fast, so I recommend reaching out 9-12 months in advance." }
    ];

    return (
        <section className="s-white pad-sm">
            <div className="max faq-wrap">
                <div className="sec-head center">
                    <div className="f-label">Common Questions</div>
                </div>
                <RevealOnScroll>
                    {faqs.map((faq, i) => (
                        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`} onClick={() => toggleFAQ(i)}>
                            <div className="faq-q">
                                <span className="faq-q-t">{faq.q}</span>
                                <div className="faq-ico">+</div>
                            </div>
                            <div className="faq-a">
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </section>
    );
}
