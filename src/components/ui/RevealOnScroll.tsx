'use client';

import { ReactNode, useEffect, useRef } from 'react';

export default function RevealOnScroll({
    children,
    delay = 0,
    className = "",
    style
}: {
    children: ReactNode,
    delay?: number | string,
    className?: string,
    style?: React.CSSProperties
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If already in viewport on mount (e.g., user refreshed mid-page), reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Support both numeric delay (via style) and string delay (via class)
    const isNumeric = typeof delay === 'number';
    const effectiveClassName = `reveal ${!isNumeric ? delay : ""} ${className}`.trim();
    const effectiveStyle = isNumeric
        ? { ...style, transitionDelay: `${delay}s` }
        : style;

    return (
        <div ref={ref} className={effectiveClassName} style={effectiveStyle}>
            {children}
        </div>
    );
}
