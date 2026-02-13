import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <Link href="/" className="footer-logo">Alex Cinisi Photography</Link>
            <div className="footer-copy">© 2026 Alex Cinisi. All rights reserved.</div>
            <div className="footer-links">
                <Link href="#">Instagram</Link>
                <Link href="#">Email</Link>
            </div>
        </footer>
    );
}
