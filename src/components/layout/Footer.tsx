import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface FooterProps {
    logo?: any;
}

export default function Footer({ logo }: FooterProps) {
    return (
        <footer>
            <Link href="/" className="footer-logo">
                {logo ? (
                    <Image
                        src={urlFor(logo).height(32).auto('format').url()}
                        alt="Alex Cinisi Photography"
                        width={160}
                        height={32}
                    />
                ) : (
                    "Alex Cinisi Photography"
                )}
            </Link>
            <p className="footer-copy">© 2026 Alex Cinisi Photography · Luxury Wedding Photographer · Sicily, Italy</p>
            <div className="footer-links">
                <Link href="https://www.alexcinisiphotography.com/stories/">Portfolio</Link>
                <a href="https://www.instagram.com/alexcinisiphotography/" target="_blank" rel="noopener">Instagram</a>
                <Link href="#contact">Contact</Link>
                <a href="/policies/Privacy_Policy_Alex_Cinisi_Photography.pdf">Privacy</a>
            </div>
        </footer>
    );
}
