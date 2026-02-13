import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'fill' | 'text' | 'outline';
    href?: string;
    children: React.ReactNode;
}

export default function Button({ variant = 'fill', className, href, children, ...props }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center uppercase tracking-[0.22em] text-[0.68rem] transition-colors duration-300 font-medium";

    const variants = {
        fill: "bg-[var(--ink)] text-white px-[34px] py-[15px] hover:bg-[var(--charcoal)]",
        text: "text-[var(--ink)] border-b border-[var(--ink)] pb-1 hover:text-[var(--mid)] hover:border-[var(--mid)]",
        outline: "border border-[var(--rule)] text-[var(--charcoal)] px-[34px] py-[15px] hover:border-[var(--mid)] hover:text-[var(--ink)]"
    };

    const styles = cn(baseStyles, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={styles} style={{ display: 'inline-flex' }}>
                {children}
            </Link>
        );
    }

    return (
        <button className={styles} {...props}>
            {children}
        </button>
    );
}
