import { ReactNode } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface InvestmentProps {
    price?: string;
    priceRange?: string;
    includes?: string[];
    ctaText?: string;
    signatureQuote?: ReactNode;
}

const defaultIncludes = [
    'Full wedding day coverage — 8 hours',
    'Two professional photographers',
    '300 – 500 beautifully edited images',
    'Private online gallery via PicTime',
    'Premium 30×20cm wedding album included',
    'High-resolution files with full print rights',
    'Drone aerial photography included',
    'Pre-wedding consultation & location scouting',
    'Sneak peek delivery within 48–72 hours',
];

export default function Investment({
    price = '€ 2,500',
    priceRange = 'Most couples invest between €2,500 – €5,000',
    includes = defaultIncludes,
    ctaText = 'Request Your Bespoke Proposal',
    signatureQuote,
}: InvestmentProps) {
    const quote = signatureQuote || <>&ldquo;No packages.<br />No templates.<br />Just your story, your way.&rdquo;</>;

    return (
        <section className="s-offwh pad" id="invest">
            <div className="max">
                <RevealOnScroll className="sec-head">
                    <div className="f-label">Your Investment</div>
                    <div className="h2-lg">Complete Transparency,<br /><em>No Surprises</em></div>
                </RevealOnScroll>
                <div className="invest-grid">
                    <RevealOnScroll>
                        <div className="invest-price-block">
                            <span className="price-eye">Starting Investment</span>
                            <span className="price-big">{price}</span>
                            <span className="price-rng">{priceRange}</span>
                        </div>
                        <ul className="includes">
                            {includes.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <Link href="#contact" className="btn-fill" style={{ marginTop: '32px' }}>{ctaText}</Link>
                    </RevealOnScroll>
                    <RevealOnScroll className="d2">
                        <div className="enhancements-box">
                            <h3>Bespoke Enhancements</h3>
                            <p>Every story is unique. Tailor your experience — all options detailed in your personalised proposal.</p>
                            <div className="e-item">Film photography rolls (medium format)</div>
                            <div className="e-item">Extended coverage (10–12 hours)</div>
                            <div className="e-item">Engagement session in Sicily</div>
                            <div className="e-item">Cinematic video highlight reel</div>
                            <div className="e-item">Second-day / rehearsal dinner coverage</div>
                            <div className="e-item">Additional premium albums (family sets)</div>
                        </div>
                        <div className="invest-sig">
                            <p>{quote}</p>
                            <span>— Alex Cinisi</span>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
