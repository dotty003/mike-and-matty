import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'transparent' | 'glass' | 'dark' | 'brand';
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id, bg = 'transparent' }) => {
  const bgClass =
    bg === 'glass' ? 'glass-panel' :
    bg === 'dark' ? 'bg-brand-dark' :
    bg === 'brand' ? 'bg-brand-primary/10' :
    'bg-transparent';

  return (
    <section id={id} className={`py-20 md:py-32 relative overflow-hidden ${bgClass} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {children}
      </div>
    </section>
  );
};
