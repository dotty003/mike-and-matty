import React from 'react';
import { TrustBarContent } from '@/lib/types';
import { convertImageUrl } from '@/lib/imageUtils';

interface TrustBarProps {
  content: TrustBarContent;
}

export const TrustBar: React.FC<TrustBarProps> = ({ content }) => {
  return (
    <div className="w-full border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-slate-500 text-xs font-display uppercase tracking-[0.2em] mb-8">
          {content.label}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {content.partners.map((partner, i) => {
            if (partner.displayStyle === "image" && partner.logoUrl) {
              return (
                <div key={i} className="h-6 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={convertImageUrl(partner.logoUrl!)} alt={partner.name} className="h-full object-contain brightness-0 invert" />
                </div>
              );
            }
            if (partner.displayStyle === "image-text" && partner.logoUrl) {
              return (
                <div key={i} className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={convertImageUrl(partner.logoUrl!)} alt={partner.name} className="h-8 w-8 object-contain brightness-0 invert" />
                  <span className="font-sans font-medium text-xl text-white">{partner.name}</span>
                </div>
              );
            }
            if (partner.displayStyle === "serif-italic") {
              return (
                <div key={i} className="text-xl font-serif text-white italic">{partner.name}</div>
              );
            }
            // display-bold
            return (
              <div key={i} className="h-8 flex items-center">
                <span className="font-display font-bold text-2xl text-white tracking-tighter">{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
