import React from 'react';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { AboutContent } from '@/lib/types';
import { convertImageUrl } from '@/lib/imageUtils';

interface AboutProps {
  content: AboutContent;
}

export const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <Section bg="brand" className="border-y border-white/5">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative group">
          <Reveal delay={0.2}>
             <div className="aspect-[4/5] rounded-[20px] overflow-hidden relative shadow-2xl border border-brand-accent/20 group-hover:border-brand-accent/50 transition-colors duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={convertImageUrl(content.imageUrl)}
                  alt={content.imageAlt}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent opacity-60"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-1 w-12 bg-brand-accent mb-4"></div>
                  <h3 className="text-3xl text-white mb-1 font-serif">{content.founderName}</h3>
                  <p className="text-brand-accent font-display uppercase tracking-widest text-xs font-bold">{content.founderSubtitle}</p>
                </div>
             </div>

             <div className="absolute -top-4 -right-4 w-full h-full border border-brand-accent/10 rounded-[20px] -z-10 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 space-y-8">
          <Reveal>
            <h2 className="text-4xl md:text-6xl leading-tight font-serif text-white">
              {content.title} <span className="text-brand-accent italic">{content.titleAccent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
              {content.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}

              <div className="bg-brand-bg p-8 rounded-[16px] border border-brand-accent/20 mt-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/10 rounded-full blur-xl"></div>
                <p className="text-white font-medium italic font-serif text-xl relative z-10">
                  &quot;{content.pullQuote}&quot;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
