import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface PressLogo {
  name: string;
  logo: any;
  url?: string;
}

interface PressBarProps {
  logos?: PressLogo[];
}

const FALLBACK_NAMES = [
  'Vogue Italia',
  'Marie Claire',
  "L'Officiel",
  'La Cucina Italiana',
  'Wezoree',
  'ANFM',
];

export default function PressBar({ logos }: PressBarProps) {
  return (
    <section className="press-bar">
      {logos && logos.length > 0 ? (
        <div className="press-bar-inner">
          {logos.map((item, i) => {
            const imgEl = (
              <Image
                key={i}
                src={urlFor(item.logo).height(80).auto('format').url()}
                alt={item.name}
                width={120}
                height={40}
                className="press-bar-logo"
                style={{ width: 'auto', height: '40px' }}
              />
            );
            return item.url ? (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press-bar-link"
                title={item.name}
              >
                {imgEl}
              </a>
            ) : (
              <span key={i}>{imgEl}</span>
            );
          })}
        </div>
      ) : (
        <div className="press-bar-text">
          {FALLBACK_NAMES.map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      )}
    </section>
  );
}
