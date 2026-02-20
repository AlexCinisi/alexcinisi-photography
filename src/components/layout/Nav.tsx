'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { urlFor } from '@/lib/sanity/image';

interface NavProps {
    logo?: any;
}

export default function Nav({ logo }: NavProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = !menuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <nav id="nav" className={scrolled ? 'scrolled' : ''}>
                <Link href="/" className="nav-logo">
                    {logo ? (
                        <Image
                            src={urlFor(logo).height(40).auto('format').url()}
                            alt="Alex Cinisi Photography"
                            width={180}
                            height={40}
                            priority={true}
                        />
                    ) : (
                        "Alex Cinisi Photography"
                    )}
                </Link>
                <div className="nav-right">
                    <Link href="#contact" className="nav-cta">Reserve Your Date</Link>
                    <button
                        className={`hamburger${menuOpen ? ' active' : ''}`}
                        id="hamburger"
                        aria-label="Menu"
                        onClick={toggleMenu}
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </nav>

            <div className={`menu-overlay${menuOpen ? ' open' : ''}`} id="menuOverlay">
                <ul className="menu-links">
                    <li><Link href="#portfolio" onClick={closeMenu}>Portfolio</Link></li>
                    <li><Link href="#approach" onClick={closeMenu}>Approach</Link></li>
                    <li><Link href="#invest" onClick={closeMenu}>Investment</Link></li>
                    <li><Link href="#about" onClick={closeMenu}>About</Link></li>
                    <li><Link href="#locations" onClick={closeMenu}>Locations</Link></li>
                    <li><Link href="https://www.alexcinisiphotography.com/stories/">Stories</Link></li>
                    <li><Link href="#contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
                <div className="menu-footer">
                    <a href="https://www.instagram.com/alexcinisiphotography/" target="_blank" rel="noopener">Instagram</a>
                    <a href="mailto:info@alexcinisiphotography.com">Email</a>
                    <a href="/policies/Privacy_Policy_Alex_Cinisi_Photography.pdf">Privacy</a>
                </div>
            </div>
        </>
    );
}
