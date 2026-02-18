"use client";
import { useAdmin } from "../../components/AdminContext";
import { BrandingContent } from "@/lib/types";
import { defaultBranding } from "@/data/defaultContent";
import { RotateCcw } from "lucide-react";

const FONT_OPTIONS = [
  // Serif
  "Young Serif",
  "Playfair Display",
  "Lora",
  "Merriweather",
  "Crimson Text",
  "EB Garamond",
  "Libre Baskerville",
  // Sans-serif
  "Space Grotesk",
  "Inter",
  "Poppins",
  "Montserrat",
  "Raleway",
  "DM Sans",
  "Plus Jakarta Sans",
  "Outfit",
  // System
  "Helvetica Neue",
  "Arial",
  "Georgia",
  "system-ui",
];

const RADIUS_OPTIONS = [
  { label: "Sharp", value: "0" },
  { label: "Subtle", value: "6" },
  { label: "Rounded", value: "10" },
  { label: "Pill", value: "16" },
  { label: "Extra Round", value: "24" },
];

function ColorField({ label, value, onChange, description }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
        />
      </div>
      <div className="flex-1">
        <label className="text-sm text-white font-display">{label}</label>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-28 bg-brand-bg border border-brand-primary/30 rounded-lg px-3 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-[#FFD747] transition-colors"
      />
    </div>
  );
}

function FontSelect({ label, value, onChange, description }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {description && <p className="text-xs text-slate-600 mb-2">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
      >
        {FONT_OPTIONS.map((font) => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
    </div>
  );
}

export default function EditVisualBranding() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const branding: BrandingContent = content.branding || defaultBranding;

  const updateColor = (key: string, value: string) => {
    updateSection("branding", {
      ...branding,
      colors: { ...branding.colors, [key]: value },
    });
  };

  const updateFont = (key: string, value: string) => {
    updateSection("branding", {
      ...branding,
      fonts: { ...branding.fonts, [key]: value },
    });
  };

  const updateRadius = (value: string) => {
    updateSection("branding", { ...branding, borderRadius: value });
  };

  const resetToDefaults = () => {
    updateSection("branding", { ...defaultBranding });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif text-white">Visual Branding</h1>
        <button
          onClick={resetToDefaults}
          className="flex items-center gap-2 text-xs font-display text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
        >
          <RotateCcw className="w-3 h-3" />
          Reset to Defaults
        </button>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Colors */}
        <div>
          <h2 className="text-sm font-display text-slate-300 uppercase tracking-wider mb-4">Colors</h2>
          <div className="bg-brand-bg p-5 rounded-[10px] border border-white/5 space-y-5">
            <ColorField
              label="Accent"
              value={branding.colors.accent}
              onChange={(v) => updateColor("accent", v)}
              description="Main highlight color (buttons, links, headings)"
            />
            <ColorField
              label="Accent Hover"
              value={branding.colors.accentHover}
              onChange={(v) => updateColor("accentHover", v)}
              description="Lighter accent for hover states"
            />
            <div className="border-t border-white/5 pt-5" />
            <ColorField
              label="Background"
              value={branding.colors.background}
              onChange={(v) => updateColor("background", v)}
              description="Main page background"
            />
            <ColorField
              label="Surface"
              value={branding.colors.surface}
              onChange={(v) => updateColor("surface", v)}
              description="Card and section backgrounds"
            />
            <ColorField
              label="Primary"
              value={branding.colors.primary}
              onChange={(v) => updateColor("primary", v)}
              description="Borders, overlays, subtle backgrounds"
            />
            <ColorField
              label="Dark"
              value={branding.colors.dark}
              onChange={(v) => updateColor("dark", v)}
              description="Footer and darkest areas"
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <h2 className="text-sm font-display text-slate-300 uppercase tracking-wider mb-4">Preview</h2>
          <div
            className="p-6 rounded-[10px] border border-white/10 overflow-hidden"
            style={{ backgroundColor: branding.colors.background }}
          >
            <div className="flex gap-4 items-center mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: branding.colors.accent, color: branding.colors.background }}>
                M
              </div>
              <div>
                <p className="text-white text-sm font-bold" style={{ fontFamily: branding.fonts.display }}>Your Brand</p>
                <p className="text-xs" style={{ color: branding.colors.accent }}>Accent text</p>
              </div>
            </div>
            <div className="p-4 mb-4" style={{ backgroundColor: branding.colors.surface, borderRadius: `${branding.borderRadius}px` }}>
              <h3 className="text-white mb-1" style={{ fontFamily: branding.fonts.heading }}>Heading Font Preview</h3>
              <p className="text-slate-300 text-sm" style={{ fontFamily: branding.fonts.body }}>Body text looks like this. It should be easy to read.</p>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 text-sm font-bold"
                style={{
                  backgroundColor: branding.colors.accent,
                  color: branding.colors.background,
                  borderRadius: `${branding.borderRadius}px`,
                  fontFamily: branding.fonts.display,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 text-sm border"
                style={{
                  borderColor: branding.colors.accent,
                  color: branding.colors.accent,
                  borderRadius: `${branding.borderRadius}px`,
                  fontFamily: branding.fonts.display,
                }}
              >
                Outline Button
              </button>
            </div>
          </div>
        </div>

        {/* Fonts */}
        <div>
          <h2 className="text-sm font-display text-slate-300 uppercase tracking-wider mb-4">Typography</h2>
          <div className="bg-brand-bg p-5 rounded-[10px] border border-white/5">
            <FontSelect
              label="Heading Font"
              value={branding.fonts.heading}
              onChange={(v) => updateFont("heading", v)}
              description="Used for section titles and headings"
            />
            <FontSelect
              label="Display Font"
              value={branding.fonts.display}
              onChange={(v) => updateFont("display", v)}
              description="Used for buttons, labels, and navigation"
            />
            <FontSelect
              label="Body Font"
              value={branding.fonts.body}
              onChange={(v) => updateFont("body", v)}
              description="Used for paragraphs and general text"
            />
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <h2 className="text-sm font-display text-slate-300 uppercase tracking-wider mb-4">Shape</h2>
          <div className="bg-brand-bg p-5 rounded-[10px] border border-white/5">
            <label className="block text-xs font-display text-slate-400 mb-3 uppercase tracking-wider">Border Radius</label>
            <div className="flex gap-3">
              {RADIUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateRadius(opt.value)}
                  className={`flex-1 py-3 text-xs font-display text-center border transition-all ${
                    branding.borderRadius === opt.value
                      ? "border-[#FFD747] bg-[#FFD747]/10 text-[#FFD747]"
                      : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                  style={{ borderRadius: `${opt.value}px` }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
