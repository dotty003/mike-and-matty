"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminImageUpload } from "../../components/FormFields";
import { Trash2, Plus } from "lucide-react";

export default function EditFooter() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const footer = content.footer;
  const update = (field: string, value: unknown) => {
    updateSection("footer", { ...footer, [field]: value });
  };

  const updateLink = (index: number, field: string, value: string) => {
    const links = [...footer.links];
    links[index] = { ...links[index], [field]: value };
    update("links", links);
  };

  const addLink = () => {
    update("links", [...footer.links, { label: "", href: "#" }]);
  };

  const removeLink = (index: number) => {
    update("links", footer.links.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Footer</h1>

      <div className="max-w-2xl space-y-6">
        <AdminImageUpload label="Footer Logo" value={footer.logoUrl} onChange={(v) => update("logoUrl", v)} />
        <AdminInput label="Copyright Text" value={footer.copyrightText} onChange={(v) => update("copyrightText", v)} />

        <div>
          <label className="block text-xs font-display text-slate-400 mb-3 uppercase tracking-wider">Links</label>
          {footer.links.map((link, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <input
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
              />
              <input
                value={link.href}
                onChange={(e) => updateLink(i, "href", e.target.value)}
                placeholder="URL"
                className="flex-1 bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
              />
              <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-300 px-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addLink} className="flex items-center gap-2 text-sm text-[#FFD747] hover:text-[#ffe175] font-display">
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>
      </div>
    </div>
  );
}
