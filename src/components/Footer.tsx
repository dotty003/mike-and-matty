"use client";
import React from 'react';
import { FooterContent } from '@/lib/types';
import { convertImageUrl } from '@/lib/imageUtils';

interface FooterProps {
  content: FooterContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-[#0B1412] py-12 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-display">
        <div className="mb-4 md:mb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={convertImageUrl(content.logoUrl)}
            alt="Mike and Matty"
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="flex gap-8">
          {content.links.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-[#FFD747] transition-colors">{link.label}</a>
          ))}
        </div>
        <div className="mt-4 md:mt-0 opacity-60">
          &copy; {new Date().getFullYear()} {content.copyrightText}
        </div>
      </div>
    </footer>
  );
};
