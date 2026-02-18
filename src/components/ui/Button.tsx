"use client";
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold font-display transition-all duration-300 rounded-[10px] px-8 py-4 text-lg tracking-wide transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg";

  const variants = {
    primary: "bg-brand-accent text-brand-bg hover:bg-brand-accent-hover shadow-[0_0_20px_rgba(255,215,71,0.3)]",
    secondary: "bg-brand-primary/20 hover:bg-brand-primary/40 text-white border border-brand-primary/50",
    outline: "bg-transparent border-2 border-brand-accent hover:bg-brand-accent/10 text-brand-accent",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
