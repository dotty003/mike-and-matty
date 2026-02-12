"use client";
import React, { useRef } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function AdminInput({ label, value, onChange, placeholder, type = "text" }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FFD747] transition-colors"
      />
    </div>
  );
}

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function AdminTextarea({ label, value, onChange, placeholder, rows = 4 }: TextareaProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FFD747] transition-colors resize-y"
      />
    </div>
  );
}

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function AdminImageUpload({ label, value, onChange }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL"
            className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FFD747] transition-colors"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="text-xs font-display text-[#FFD747] hover:text-[#ffe175] transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </div>
        {value && (
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

interface YouTubePreviewProps {
  label: string;
  value: string;
  onChange: (videoId: string) => void;
}

export function AdminYouTubePreview({ label, value, onChange }: YouTubePreviewProps) {
  const parseVideoId = (input: string): string => {
    // Handle full YouTube URLs
    const urlMatch = input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (urlMatch) return urlMatch[1];
    // Handle bare video IDs
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    return input;
  };

  const handleChange = (input: string) => {
    onChange(parseVideoId(input));
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="YouTube Video ID or URL"
        className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FFD747] transition-colors"
      />
      {value && /^[a-zA-Z0-9_-]{11}$/.test(value) && (
        <div className="mt-3 aspect-video max-w-md rounded-lg overflow-hidden border border-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${value}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
