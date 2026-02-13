import React from 'react';
import { TrustBarContent } from '@/lib/types';
import { convertImageUrl } from '@/lib/imageUtils';

interface TrustBarProps {
  content: TrustBarContent;
}

export const TrustBar: React.FC<TrustBarProps> = ({ content }) => {
  const yt = content.youtubeChannel;
  const hasYouTube = yt && yt.photoUrl && yt.subscriberCount;

  return (
    <div className="w-full border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-slate-500 text-xs font-display uppercase tracking-[0.2em] mb-8">
          {content.label}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {/* YouTube Channel Stats */}
          {hasYouTube && (
            <a
              href={yt.channelUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group transition-all hover:scale-105"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-red-500/40 group-hover:ring-red-500 transition-all shadow-lg shadow-red-500/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={convertImageUrl(yt.photoUrl)}
                  alt={yt.channelName || "YouTube Channel"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                {yt.channelName && (
                  <p className="text-white text-xs font-display font-bold leading-tight">{yt.channelName}</p>
                )}
                <p className="text-red-400 text-[11px] font-display font-bold group-hover:text-red-300 transition-colors">
                  {yt.subscriberCount}
                </p>
              </div>
            </a>
          )}

          {/* Divider between YouTube and partners */}
          {hasYouTube && content.partners.length > 0 && (
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
          )}

          {/* Partners */}
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
    </div>
  );
};
