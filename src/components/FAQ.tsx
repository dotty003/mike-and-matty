"use client";
import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Plus, Minus } from 'lucide-react';
import { FAQContent } from '@/lib/types';

interface FAQProps {
  content: FAQContent;
}

const AccordionItem: React.FC<{ item: { question: string; answer: string }, delay: number }> = ({ item, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="border-b border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-6 flex items-start justify-between text-left group"
        >
          <span className={`text-xl md:text-2xl font-serif pr-8 transition-colors duration-300 ${isOpen ? 'text-brand-accent' : 'text-slate-200 group-hover:text-white'}`}>
            {item.question}
          </span>
          <span className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? (
              <Minus className="w-5 h-5 text-brand-accent" />
            ) : (
              <Plus className="w-5 h-5 text-slate-400 group-hover:text-white" />
            )}
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-slate-400 font-light leading-relaxed text-lg">
            {item.answer}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export const FAQ: React.FC<FAQProps> = ({ content }) => {
  const midPoint = Math.ceil(content.items.length / 2);
  const leftColumnFaqs = content.items.slice(0, midPoint);
  const rightColumnFaqs = content.items.slice(midPoint);

  return (
    <Section className="py-20">
      <Reveal>
        <h2 className="text-5xl md:text-6xl text-center mb-16 text-white font-serif">
          {content.title}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 items-start">
        <div className="space-y-4">
          {leftColumnFaqs.map((faq, index) => (
            <AccordionItem key={index} item={faq} delay={index * 0.1} />
          ))}
        </div>

        <div className="space-y-4">
          {rightColumnFaqs.map((faq, index) => (
            <AccordionItem key={index + midPoint} item={faq} delay={(index + midPoint) * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};
