'use client';

import { ReactNode, useEffect, useRef } from 'react';

export default function RevealOnScroll({ children, delay = 0, className = "", style }: { children: ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}s` }}>
            {children}
        </div>
    );
}
