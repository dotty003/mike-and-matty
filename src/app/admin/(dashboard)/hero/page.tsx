"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea, AdminYouTubePreview } from "../../components/FormFields";

export default function EditHero() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const hero = content.hero;
  const update = (field: string, value: string) => {
    updateSection("hero", { ...hero, [field]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Hero Section</h1>

      <div className="max-w-2xl space-y-2">
        <AdminInput label="Badge Text" value={hero.badgeText} onChange={(v) => update("badgeText", v)} />
        <AdminInput label="Headline" value={hero.headline} onChange={(v) => update("headline", v)} />
        <AdminInput label="Headline Accent Word (gold text)" value={hero.headlineAccent} onChange={(v) => update("headlineAccent", v)} />
        <AdminTextarea label="Subheadline" value={hero.subheadline} onChange={(v) => update("subheadline", v)} rows={3} />
        <AdminYouTubePreview label="YouTube Video" value={hero.youtubeVideoId} onChange={(v) => update("youtubeVideoId", v)} />
        <AdminInput label="CTA Button Text" value={hero.ctaText} onChange={(v) => update("ctaText", v)} />
        <AdminInput label="CTA Subtext" value={hero.ctaSubtext} onChange={(v) => update("ctaSubtext", v)} />
      </div>
    </div>
  );
}
