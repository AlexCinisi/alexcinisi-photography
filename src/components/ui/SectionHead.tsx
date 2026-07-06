import { ReactNode } from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

type HeadingTag = 'h1' | 'h2' | 'h3';

interface SectionHeadProps {
    as?: HeadingTag;
    label?: string;
    title: ReactNode;
    center?: boolean;
    delay?: number | string;
    className?: string;
}

export default function SectionHead({
    as = 'h2',
    label,
    title,
    center = false,
    delay = 0,
    className = '',
}: SectionHeadProps) {
    const Tag = as;
    const wrapperClass = `sec-head${center ? ' center' : ''}${className ? ` ${className}` : ''}`;

    return (
        <RevealOnScroll className={wrapperClass} delay={delay}>
            {label && <div className="f-label">{label}</div>}
            <Tag className={`sec-title sec-title--${as}`}>{title}</Tag>
        </RevealOnScroll>
    );
}
