"use client";
import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "full" | "fit";
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  width = "full"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${width === 'full' ? 'w-full' : 'w-fit'} ${className} transition-all duration-1000`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
      }}
    >
      {children}
    </div>
  );
};
