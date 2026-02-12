"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminImageUpload } from "../../components/FormFields";

export default function EditGlobal() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const global = content.global;
  const nav = content.navigation;

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Global Settings</h1>

      <div className="max-w-2xl space-y-8">
        <div>
          <h2 className="text-lg font-display text-white mb-4">SEO & Meta</h2>
          <AdminInput label="Site Title" value={global.siteTitle} onChange={(v) => updateSection("global", { ...global, siteTitle: v })} />
          <AdminInput label="Meta Description" value={global.metaDescription} onChange={(v) => updateSection("global", { ...global, metaDescription: v })} />
          <AdminInput label="Favicon URL" value={global.faviconUrl} onChange={(v) => updateSection("global", { ...global, faviconUrl: v })} />
        </div>

        <div>
          <h2 className="text-lg font-display text-white mb-4">Navigation</h2>
          <AdminImageUpload label="Navigation Logo" value={nav.logoUrl} onChange={(v) => updateSection("navigation", { ...nav, logoUrl: v })} />
          <AdminInput label="CTA Button Text" value={nav.ctaText} onChange={(v) => updateSection("navigation", { ...nav, ctaText: v })} />
        </div>
      </div>
    </div>
  );
}
