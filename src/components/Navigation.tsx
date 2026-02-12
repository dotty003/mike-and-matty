"use client";
import React, { useEffect, useState } from 'react';
import { NavigationContent } from '@/lib/types';

interface NavigationProps {
  content: NavigationContent;
}

export const Navigation: React.FC<NavigationProps> = ({ content }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.logoUrl}
            alt="Mike and Matty"
            className="h-10 w-auto object-contain"
          />
        </div>
        <button
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-[10px] text-sm font-bold font-display uppercase tracking-wide transition-all border ${
            scrolled
              ? 'bg-[#FFD747] text-brand-bg border-[#FFD747] hover:bg-[#ffe175]'
              : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
          }`}
        >
          {content.ctaText}
        </button>
      </div>
    </nav>
  );
};
