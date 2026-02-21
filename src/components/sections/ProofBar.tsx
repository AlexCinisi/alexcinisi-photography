import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Image from 'next/image';

interface ProofBarProps {
    logos?: Array<{ name: string; logo: any; url: string }>;
}

export default function ProofBar({ logos }: ProofBarProps) {
    return (
        <RevealOnScroll>
            <div className="proof-bar">
                <div className="proof-inner">
                    <span className="proof-label">As Featured In</span>
                    <div className="proof-logos">
                        {logos && logos.length > 0 ? (
                            logos.map((logo, index) => (
                                <a key={index} href={logo.url || '#'} className="proof-logo" title={logo.name}>
                                    {logo.logo?.asset?.url ? (
                                        <Image
                                            src={logo.logo.asset.url}
                                            alt={logo.name || 'Proof Logo'}
                                            width={100} // Placeholder, will set auto in css if needed
                                            height={28}
                                            style={{ width: 'auto' }}
                                        />
                                    ) : (
                                        <span className="proof-logo-text">{logo.name}</span>
                                    )}
                                </a>
                            ))
                        ) : (
                            <>
                                <a href="#" className="proof-logo" title="Featured in Vogue">
                                    <span className="proof-logo-text" style={{ fontStyle: 'italic', fontSize: '1.35rem', letterSpacing: '.02em' }}>Vogue</span>
                                </a>
                                <a href="https://wezoree.com/it/vendors/profile/19253-alex-cinisi/" className="proof-logo" target="_blank" rel="noopener" title="Top Rated on Wezoree">
                                    <span className="proof-logo-text" style={{ fontSize: '.82rem', letterSpacing: '.14em', fontWeight: 400 }}>WEZOREE</span>
                                </a>
                                <a href="https://anfm.it/fotografo/3902-alex-cinisi/" className="proof-logo" target="_blank" rel="noopener" title="ANFM Certified Member">
                                    <span className="proof-logo-text" style={{ fontSize: '.82rem', letterSpacing: '.14em', fontWeight: 400 }}>ANFM</span>
                                </a>
                                <a href="https://www.thetuscanweddingnetwork.net/" className="proof-logo" target="_blank" rel="noopener" title="The Tuscan Wedding Network">
                                    <span className="proof-logo-text" style={{ fontSize: '.68rem', letterSpacing: '.08em', fontWeight: 400 }}>TUSCAN WEDDING NETWORK</span>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
}
