// src/components/sections/Breadcrumb.tsx
import Link from 'next/link';

export default function Breadcrumb({ items }: { items: { label: string, href: string }[] }) {
    return (
        <nav className="text-xs uppercase tracking-widest text-[var(--mid)] mb-8">
            {items.map((item, i) => (
                <span key={item.href}>
                    <Link href={item.href} className="hover:text-[var(--ink)]">{item.label}</Link>
                    {i < items.length - 1 && <span className="mx-2">/</span>}
                </span>
            ))}
        </nav>
    );
}
