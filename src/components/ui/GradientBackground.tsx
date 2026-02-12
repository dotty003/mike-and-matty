"use client";
import React, { useEffect, useRef } from 'react';

export const GradientBackground: React.FC = () => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-brand-bg">
      <div className="absolute top-0 left-0 w-[90vw] h-[90vw] bg-brand-primary mix-blend-screen filter blur-[100px] opacity-40 animate-blob rounded-full" />
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#FFD747] mix-blend-screen filter blur-[130px] opacity-[0.06] animate-blob rounded-full" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-10 w-[90vw] h-[90vw] bg-brand-primary mix-blend-screen filter blur-[100px] opacity-40 animate-blob rounded-full" style={{ animationDelay: '4s' }} />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-primary mix-blend-normal filter blur-[150px] opacity-20 pointer-events-none" />

      <div
        ref={interactiveRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-accent mix-blend-screen filter blur-[100px] opacity-[0.12] pointer-events-none rounded-full will-change-transform"
      />

      <div className="absolute inset-0 opacity-[0.3] bg-repeat" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
};
