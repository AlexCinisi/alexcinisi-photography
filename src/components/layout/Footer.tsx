import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
    logo?: any;
    logoFooter?: any;
}

export default function Footer({ logo, logoFooter }: FooterProps) {
    const displayLogo = logoFooter || logo;

    return (
        <footer>
            <Link href="/" className="footer-logo">
                {displayLogo?.asset?.url ? (
                    <Image
                        src={displayLogo.asset.url}
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
                <a href="https://www.instagram.com/alexcinisi" target="_blank" rel="noopener noreferrer">Instagram</a>
                <Link href="#contact">Contact</Link>
                <a href="/policies/Privacy_Policy_Alex_Cinisi_Photography.pdf">Privacy</a>
            </div>
        </footer>
    );
}
