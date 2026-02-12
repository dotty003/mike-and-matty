"use client";
import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const handleScrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">

      <div className="container mx-auto px-4 text-center z-10 max-w-6xl">

        <Reveal>
          <div className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-surface border border-brand-primary/20 backdrop-blur-md shadow-lg shadow-brand-primary/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD747] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD747]"></span>
            </span>
            <span className="text-sm font-display font-semibold text-slate-200 tracking-wide uppercase">
              {content.badgeText} {new Date().toLocaleString('default', { month: 'long' })}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white mb-8 leading-[1.1]">
            {content.headline} <br/>
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD747] to-[#d4b035] glow-text italic pr-2">{content.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: content.subheadline }} />
        </Reveal>

        <Reveal delay={0.3} width="full">
          <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group mb-14 bg-black">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-[#FFD747] to-brand-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-1000"></div>

            <div className="relative z-10 w-full h-full bg-black rounded-[23px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <span className="text-brand-primary font-display animate-pulse tracking-widest text-xs">ESTABLISHING SECURE CONNECTION...</span>
              </div>
              <iframe
                className="absolute inset-0 w-full h-full z-10"
                src={`https://www.youtube.com/embed/${content.youtubeVideoId}?autoplay=0&rel=0&modestbranding=1`}
                title="Mike and Matty Strategy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30 z-20"></div>
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30 z-20"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30 z-20"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30 z-20"></div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-col items-center gap-6">
            <Button onClick={handleScrollToBooking} className="min-w-[280px] text-lg py-5 shadow-[0_0_30px_rgba(255,215,71,0.2)] group">
              {content.ctaText}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm font-display text-slate-500 uppercase tracking-widest">
              {content.ctaSubtext}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
