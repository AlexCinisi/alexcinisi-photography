'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyMobileCTA() {
    const pathname = usePathname();
    const isHomepage = pathname === '/';

    return (
        <div className="sticky-mob">
            <Link href={isHomepage ? '#contact' : '/contact'}>Reserve Your Date</Link>
        </div>
    );
}
