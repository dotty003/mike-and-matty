"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea, AdminImageUpload } from "../../components/FormFields";
import { Trash2, Plus } from "lucide-react";

export default function EditAbout() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const about = content.about;
  const update = (field: string, value: unknown) => {
    updateSection("about", { ...about, [field]: value });
  };

  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...about.paragraphs];
    paragraphs[index] = value;
    update("paragraphs", paragraphs);
  };

  const addParagraph = () => {
    update("paragraphs", [...about.paragraphs, ""]);
  };

  const removeParagraph = (index: number) => {
    update("paragraphs", about.paragraphs.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit About Section</h1>

      <div className="max-w-2xl space-y-2">
        <AdminImageUpload label="Founder Image" value={about.imageUrl} onChange={(v) => update("imageUrl", v)} />
        <AdminInput label="Image Alt Text" value={about.imageAlt} onChange={(v) => update("imageAlt", v)} />
        <AdminInput label="Founder Name" value={about.founderName} onChange={(v) => update("founderName", v)} />
        <AdminInput label="Founder Subtitle" value={about.founderSubtitle} onChange={(v) => update("founderSubtitle", v)} />
        <AdminInput label="Section Title" value={about.title} onChange={(v) => update("title", v)} />
        <AdminInput label="Title Accent (gold italic text)" value={about.titleAccent} onChange={(v) => update("titleAccent", v)} />

        <div>
          <label className="block text-xs font-display text-slate-400 mb-2 uppercase tracking-wider mt-6">
            Paragraphs (supports HTML: &lt;strong&gt;, &lt;em&gt;)
          </label>
          {about.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                rows={3}
                className="flex-1 bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors resize-y"
              />
              <button onClick={() => removeParagraph(i)} className="text-red-400 hover:text-red-300 px-2 self-start mt-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addParagraph} className="flex items-center gap-1 text-sm text-[#FFD747] hover:text-[#ffe175] font-display">
            <Plus className="w-3 h-3" /> Add Paragraph
          </button>
        </div>

        <AdminTextarea label="Pull Quote" value={about.pullQuote} onChange={(v) => update("pullQuote", v)} rows={3} />
      </div>
    </div>
  );
}
