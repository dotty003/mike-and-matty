"use client";
import React, { useEffect, useCallback } from "react";
import { X, ZoomIn } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lightbox-backdrop"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-[#FFD747]/50 transition-all group"
      >
        <X className="w-5 h-5 group-hover:text-[#FFD747] transition-colors" />
      </button>

      {/* Hint text */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-display z-10">
        Press ESC or click outside to close
      </p>

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[20px] overflow-hidden shadow-[0_0_80px_rgba(255,215,71,0.15)] border border-[#FFD747]/30 bg-brand-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] w-auto h-auto object-contain"
          />
        </div>

        {/* Caption */}
        <p className="text-center mt-4 text-sm text-slate-400 font-display">{alt}</p>
      </div>
    </div>
  );
}

/**
 * Wrapper that adds a zoom-in cursor and hover hint on any clickable image.
 */
export function LightboxTrigger({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`cursor-zoom-in relative group/zoom ${className}`}
      onClick={onClick}
    >
      {children}
      {/* Zoom hint overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[16px]">
        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-[#FFD747]/40 flex items-center justify-center shadow-lg">
          <ZoomIn className="w-5 h-5 text-[#FFD747]" />
        </div>
      </div>
    </div>
  );
}
