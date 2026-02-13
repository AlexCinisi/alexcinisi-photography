import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

interface InvestmentProps {
    intro?: {
        label: string;
        title: React.ReactNode;
    };
    price?: string;
    priceRange?: string;
    description?: string;
    includes?: string[];
    enhancements?: string[];
    signatureQuote?: React.ReactNode;
    ctaText?: string;
}

export default function Investment({
    intro = {
        label: "Your Investment",
        title: <>Transparent Pricing,<br /><em>Exceptional Value</em></>
    },
    price = "€ 2,500",
    priceRange = "Most couples invest between €2,500 – €4,000",
    description = "I believe in complete transparency. Your investment covers everything you need for a beautifully documented wedding — no hidden costs, no unexpected add-ons.",
    includes = [
        "Full wedding day coverage — 8 hours",
        "Professional photographer dedicated to your day",
        "400 – 600 beautifully edited high-resolution images",
        "Private online gallery with sharing & download",
        "High-resolution files with full print rights",
        "Pre-wedding consultation",
        "Sneak peek delivery within 48–72 hours"
    ],
    enhancements = [
        "Extended coverage (10–12 hours or multi-day)",
        "Second photographer",
        "Engagement session",
        "Film photography (medium format)",
        "Rehearsal dinner coverage",
        "Fine Art wedding albums (Made in Italy)",
        "Drone aerial photography"
    ],
    signatureQuote = <>"Your wedding memories<br />deserve to be preserved<br />as timeless art."</>,
    ctaText = "Request Your Proposal"
}: InvestmentProps) {
    return (
        <section className="s-offwh pad" id="invest">
            <div className="max">
                <RevealOnScroll className="sec-head">
                    <div className="f-label">{intro.label}</div>
                    <div className="h2-lg">{intro.title}</div>
                </RevealOnScroll>
                <div className="invest-grid">
                    <RevealOnScroll>
                        <p style={{ fontSize: '.88rem', lineHeight: '1.85', color: 'var(--charcoal)', marginBottom: '8px' }}>{description}</p>
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
                        <Link href="#contact" className="btn-fill">{ctaText}</Link>
                    </RevealOnScroll>
                    <RevealOnScroll className="d2">
                        <div className="enhancements-box">
                            <h3>Bespoke Enhancements</h3>
                            <p>Every wedding is unique. Tailor your experience with add-ons detailed in your personalised proposal.</p>
                            {enhancements.map((item, i) => (
                                <div className="e-item" key={i}>{item}</div>
                            ))}
                            <div className="invest-sig">
                                <p>{signatureQuote}</p>
                                <span>— Alex Cinisi</span>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
