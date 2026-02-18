"use client";
import React, { useEffect, useRef, useState } from "react";

export type CursorStyle = "glow" | "ring" | "colorshift" | "trail" | "magnetic";

interface CustomCursorProps {
  style: CursorStyle;
  size: "sm" | "md" | "lg";
  intensity: number; // 10–100
}

const TRAIL_COUNT = 8;
const SCALE_MAP = { sm: 0.6, md: 1, lg: 1.7 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function CustomCursor({ style, size, intensity }: CustomCursorProps) {
  const [visible, setVisible] = useState(false);
  const visRef = useRef(false);
  const mouseRef = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);

  // Shared DOM refs
  const el1Ref = useRef<HTMLDivElement>(null);
  const el2Ref = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>(Array(TRAIL_COUNT).fill(null));

  // Lerp positions
  const pos1 = useRef({ x: -500, y: -500 });
  const pos2 = useRef({ x: -500, y: -500 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -500, y: -500 }))
  );

  const scale = SCALE_MAP[size];
  const opacityFactor = intensity / 100;

  // Keep visRef in sync so the animate loop can read it without stale closure
  useEffect(() => {
    visRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const animate = (time: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const vis = visRef.current;

      /* ── Glow Orb ── */
      if (style === "glow") {
        const d = Math.round(70 * scale);
        pos1.current.x = lerp(pos1.current.x, mx, 0.1);
        pos1.current.y = lerp(pos1.current.y, my, 0.1);
        if (el1Ref.current) {
          el1Ref.current.style.transform = `translate(${pos1.current.x - d / 2}px, ${pos1.current.y - d / 2}px)`;
        }
      }

      /* ── Pulse Ring ── */
      if (style === "ring") {
        const d = Math.round(40 * scale);
        pos1.current.x = lerp(pos1.current.x, mx, 0.14);
        pos1.current.y = lerp(pos1.current.y, my, 0.14);
        if (el1Ref.current) {
          el1Ref.current.style.transform = `translate(${pos1.current.x - d / 2}px, ${pos1.current.y - d / 2}px)`;
        }
      }

      /* ── Color Shift ── */
      if (style === "colorshift") {
        const d = Math.round(22 * scale);
        const hue = (time / 40) % 360;
        pos1.current.x = lerp(pos1.current.x, mx, 0.12);
        pos1.current.y = lerp(pos1.current.y, my, 0.12);
        if (el1Ref.current) {
          el1Ref.current.style.transform = `translate(${pos1.current.x - d / 2}px, ${pos1.current.y - d / 2}px)`;
          el1Ref.current.style.filter = `blur(3px) hue-rotate(${hue}deg)`;
        }
      }

      /* ── Dot Trail ── */
      if (style === "trail") {
        trailPos.current[0].x = lerp(trailPos.current[0].x, mx, 0.25);
        trailPos.current[0].y = lerp(trailPos.current[0].y, my, 0.25);
        for (let i = 1; i < TRAIL_COUNT; i++) {
          trailPos.current[i].x = lerp(trailPos.current[i].x, trailPos.current[i - 1].x, 0.4);
          trailPos.current[i].y = lerp(trailPos.current[i].y, trailPos.current[i - 1].y, 0.4);
        }
        trailRefs.current.forEach((el, i) => {
          if (!el) return;
          const ratio = (TRAIL_COUNT - i) / TRAIL_COUNT;
          const d = Math.max(3, Math.round(14 * scale * ratio));
          el.style.width = `${d}px`;
          el.style.height = `${d}px`;
          el.style.opacity = vis ? `${ratio * opacityFactor}` : "0";
          el.style.transform = `translate(${trailPos.current[i].x - d / 2}px, ${trailPos.current[i].y - d / 2}px)`;
        });
      }

      /* ── Magnetic ── */
      if (style === "magnetic") {
        const dotD = Math.round(9 * scale);
        const ringD = Math.round(44 * scale);
        pos1.current.x = lerp(pos1.current.x, mx, 0.45);
        pos1.current.y = lerp(pos1.current.y, my, 0.45);
        pos2.current.x = lerp(pos2.current.x, mx, 0.07);
        pos2.current.y = lerp(pos2.current.y, my, 0.07);
        if (el1Ref.current) {
          el1Ref.current.style.transform = `translate(${pos1.current.x - dotD / 2}px, ${pos1.current.y - dotD / 2}px)`;
        }
        if (el2Ref.current) {
          el2Ref.current.style.transform = `translate(${pos2.current.x - ringD / 2}px, ${pos2.current.y - ringD / 2}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [style, scale, opacityFactor]);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    willChange: "transform",
    transition: "opacity 0.3s ease",
  };

  if (style === "glow") {
    const d = Math.round(70 * scale);
    const blur = Math.round(d / 2.5);
    return (
      <div
        ref={el1Ref}
        aria-hidden
        style={{
          ...base,
          width: d,
          height: d,
          background: "var(--color-brand-accent)",
          filter: `blur(${blur}px)`,
          mixBlendMode: "screen",
          opacity: visible ? opacityFactor * 0.5 : 0,
        }}
      />
    );
  }

  if (style === "ring") {
    const d = Math.round(40 * scale);
    const bw = Math.max(1, Math.round(1.5 * scale));
    return (
      <div
        ref={el1Ref}
        aria-hidden
        style={{
          ...base,
          width: d,
          height: d,
          border: `${bw}px solid var(--color-brand-accent)`,
          background: "transparent",
          opacity: visible ? opacityFactor * 0.9 : 0,
          animation: "cursor-ring-blink 1.2s ease-in-out infinite",
        }}
      />
    );
  }

  if (style === "colorshift") {
    const d = Math.round(22 * scale);
    return (
      <div
        ref={el1Ref}
        aria-hidden
        style={{
          ...base,
          width: d,
          height: d,
          background: "var(--color-brand-accent)",
          mixBlendMode: "screen",
          opacity: visible ? opacityFactor * 0.9 : 0,
          filter: "blur(3px) hue-rotate(0deg)",
        }}
      />
    );
  }

  if (style === "trail") {
    return (
      <>
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            aria-hidden
            style={{
              ...base,
              width: 14,
              height: 14,
              background: "var(--color-brand-accent)",
              mixBlendMode: "screen",
              opacity: 0,
            }}
          />
        ))}
      </>
    );
  }

  if (style === "magnetic") {
    const dotD = Math.round(9 * scale);
    const ringD = Math.round(44 * scale);
    return (
      <>
        <div
          ref={el1Ref}
          aria-hidden
          style={{
            ...base,
            width: dotD,
            height: dotD,
            background: "var(--color-brand-accent)",
            opacity: visible ? opacityFactor : 0,
          }}
        />
        <div
          ref={el2Ref}
          aria-hidden
          style={{
            ...base,
            width: ringD,
            height: ringD,
            border: `1.5px solid var(--color-brand-accent)`,
            background: "transparent",
            opacity: visible ? opacityFactor * 0.5 : 0,
          }}
        />
      </>
    );
  }

  return null;
}
