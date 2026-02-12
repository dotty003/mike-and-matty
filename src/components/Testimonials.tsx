"use client";
import React from 'react';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Star } from 'lucide-react';
import { TestimonialsContent } from '@/lib/types';

interface TestimonialsProps {
  content: TestimonialsContent;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <Section>
      <Reveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-6">{content.title} <span className="italic text-[#FFD747]">{content.titleAccent}</span></h2>
          <p className="text-slate-400 font-display uppercase tracking-widest text-sm">{content.subtitle}</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {content.items.map((t, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <div className="bg-brand-surface p-10 rounded-[10px] relative group hover:bg-brand-surface/80 transition-colors border border-transparent hover:border-[#FFD747]/30 h-full">
              <div className="absolute top-8 right-8 text-6xl font-serif text-brand-primary opacity-20 group-hover:opacity-40 leading-none">&quot;</div>

              <div className="flex gap-1.5 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-[#FFD747] fill-[#FFD747]" />
                ))}
              </div>

              <p className="text-xl text-white mb-8 font-serif leading-relaxed">&quot;{t.quote}&quot;</p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                {t.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-[#FFD747] flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white font-display uppercase tracking-wide text-sm">{t.name}</h4>
                  <p className="text-xs text-[#FFD747] opacity-80">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
