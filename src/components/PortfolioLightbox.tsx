'use client';

import { useEffect, useRef, useState } from 'react';

export interface PortfolioItem {
  ratio: string;
}

export interface PortfolioLightboxProps {
  images: PortfolioItem[];
  startIndex: number;
  onClose: () => void;
}

export default function PortfolioLightbox({ images, startIndex, onClose }: PortfolioLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isOpen, setIsOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Mount - animate in + lock scroll
  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 350); // wait fadeOut before unmount
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') setCurrentIndex(p => Math.min(p + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setCurrentIndex(p => Math.max(p - 1, 0));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [images.length]);

  // Auto-scroll active thumbnail
  useEffect(() => {
    const el = thumbsRef.current?.children[currentIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [currentIndex]);

  return (
    <div 
      className={`lb-overlay ${isOpen ? 'is-open' : ''}`} 
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="lb-header">
        <span className="lb-counter">{currentIndex + 1} / {images.length}</span>
        <button className="lb-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="lb-main" onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}>
        <button 
          className="lb-arrow lb-prev" 
          onClick={() => setCurrentIndex(p => Math.max(p - 1, 0))}
          disabled={currentIndex === 0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div className="lb-image" style={{ aspectRatio: images[currentIndex].ratio }}>
            <div style={{ width: '100%', height: '100%', background: '#E8E5E0' }} />
        </div>

        <button 
          className="lb-arrow lb-next" 
          onClick={() => setCurrentIndex(p => Math.min(p + 1, images.length - 1))}
          disabled={currentIndex === images.length - 1}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className="lb-thumbs" ref={thumbsRef}>
        {images.map((_, i) => (
          <div
            key={i}
            className={`lb-thumb ${i === currentIndex ? 'is-active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
