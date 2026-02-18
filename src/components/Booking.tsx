"use client";
import React from 'react';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { ArrowRight, Lock, Calendar } from 'lucide-react';
import { BookingContent } from '@/lib/types';

interface BookingProps {
  content: BookingContent;
}

export const Booking: React.FC<BookingProps> = ({ content }) => {
  return (
    <Section id="booking" className="bg-brand-bg/50">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="bg-brand-surface p-8 md:p-16 rounded-[30px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl mb-6 text-white">
                {content.title} <br />
                <span className="text-brand-accent italic">{content.titleAccent}</span>
              </h2>

              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                {content.description}
              </p>

              <div className="bg-brand-bg p-6 md:p-8 rounded-[20px] border border-white/10 mb-8 max-w-lg mx-auto shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-[12px] bg-brand-primary/20 flex items-center justify-center text-brand-accent">
                        <Calendar className="w-7 h-7" />
                     </div>
                     <div className="text-left">
                        <h4 className="font-bold text-white font-display text-lg">{content.sessionTitle}</h4>
                        <p className="text-sm text-slate-400">{content.sessionDuration} &bull; {content.sessionType}</p>
                     </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider">
                      Available
                    </span>
                  </div>
                </div>

                <Button fullWidth className="group mb-4" onClick={() => window.open(content.calendarUrl, '_blank')}>
                  {content.ctaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-bold">
                   <Lock className="w-3 h-3" />
                   {content.securityText}
                </div>
              </div>

              <p className="text-sm text-slate-500 font-display">
                {content.footnote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
