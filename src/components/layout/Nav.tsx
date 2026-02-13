'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav id="nav" className={scrolled ? 'scrolled' : ''}>
            <Link href="/" className="nav-logo">Alex Cinisi Photography</Link>
            <div className="nav-right">
                <Link href="#portfolio" className="nav-link">Portfolio</Link>
                <Link href="#invest" className="nav-link">Investment</Link>
                <Link href="#about" className="nav-link">About</Link>
                <Link href="#contact" className="nav-cta">Reserve Your Date</Link>
            </div>
        </nav>
    );
}
