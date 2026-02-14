import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <Link href="/" className="footer-logo">Alex Cinisi Photography</Link>
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
