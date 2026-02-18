"use client";
import React, { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  size: "sm" | "md" | "lg";
  intensity: number; // 10–100
}

const SIZE_MAP = { sm: 40, md: 70, lg: 120 };

export function CustomCursor({ size, intensity }: CustomCursorProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const diameter = SIZE_MAP[size];
    const blur = Math.round(diameter / 2.5);
    const opacity = (intensity / 200).toFixed(2); // 0.05–0.50

    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentX - diameter / 2}px, ${currentY - diameter / 2}px)`;
        orbRef.current.style.opacity = opacity;
        orbRef.current.style.width = `${diameter}px`;
        orbRef.current.style.height = `${diameter}px`;
        orbRef.current.style.filter = `blur(${blur}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [size, intensity, visible]);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: "50%",
        background: "var(--color-brand-accent)",
        mixBlendMode: "screen",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
      className={visible ? "" : "!opacity-0"}
    />
  );
}
