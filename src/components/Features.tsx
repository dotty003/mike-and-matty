"use client";
import React from 'react';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Check, X } from 'lucide-react';
import { FeaturesContent } from '@/lib/types';
import { getIcon } from '@/lib/iconMap';

interface FeaturesProps {
  content: FeaturesContent;
}

export const Features: React.FC<FeaturesProps> = ({ content }) => {
  return (
    <>
      <Section bg="glass">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -left-8 -top-8 w-24 h-24 bg-brand-primary/20 rounded-full blur-xl"></div>
              <h2 className="text-3xl md:text-4xl mb-8 relative z-10">
                {content.forTitle} <span className="text-brand-primary italic font-serif bg-brand-accent px-2 text-brand-bg">{content.forAccent}</span>
              </h2>
              <div className="space-y-6">
                {content.forItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <Check className="w-3.5 h-3.5 text-brand-primary group-hover:text-brand-accent" />
                    </div>
                    <span className="text-lg text-slate-300 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl mb-8">
                {content.notForTitle} <span className="text-red-400 decoration-wavy underline decoration-red-400/30 underline-offset-4">{content.notForAccent}</span> For
              </h2>
              <div className="space-y-6">
                {content.notForItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 opacity-70 hover:opacity-100 transition-opacity">
                     <div className="w-6 h-6 rounded-full bg-red-900/20 flex items-center justify-center shrink-0 mt-1">
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <span className="text-lg text-slate-400 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="text-center">
        <Reveal>
          <div className="mb-20">
              <h2 className="text-4xl md:text-6xl mb-6">{content.systemTitle} <span className="text-brand-accent">{content.systemAccent}</span> System</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                {content.systemDescription}
              </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {content.featureCards.map((card, i) => {
            const Icon = getIcon(card.iconName);
            return (
              <Reveal key={i} delay={i * 0.2}>
                <div className="p-8 rounded-[20px] bg-brand-surface border border-white/5 hover:border-brand-accent/50 transition-all duration-300 group hover:-translate-y-1 h-full">
                  <div className="mb-6 w-16 h-16 rounded-[14px] bg-brand-accent flex items-center justify-center shadow-[0_0_20px_rgba(255,215,71,0.2)] group-hover:shadow-[0_0_40px_rgba(255,215,71,0.6)] group-hover:scale-110 transition-all duration-300 ease-out">
                    <Icon className="w-8 h-8 text-brand-bg transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl mb-3 text-white group-hover:text-brand-accent transition-colors duration-300">{card.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
};
