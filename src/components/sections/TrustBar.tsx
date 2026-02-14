import React, { ReactNode } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface TrustBarItem {
    number: string;
    label: ReactNode;
}

interface TrustBarProps {
    items?: TrustBarItem[];
}

const defaultItems: TrustBarItem[] = [
    { number: '30+', label: <>International<br />Weddings</> },
    { number: '15+', label: <>Countries<br />Served</> },
    { number: '2', label: <>Photographers<br />Included</> },
    { number: '8h', label: <>Full Day<br />Coverage</> },
    { number: 'Film', label: <>&amp; Digital<br />Artistry</> },
];

export default function TrustBar({ items = defaultItems }: TrustBarProps) {
    return (
        <RevealOnScroll>
            <div className="trust-bar">
                {items.map((item, index) => (
                    <div key={index} className="trust-item">
                        <span className="trust-n">{item.number}</span>
                        <span className="trust-l">{item.label}</span>
                    </div>
                ))}
            </div>
        </RevealOnScroll>
    );
}
