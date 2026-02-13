"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea, AdminImageUpload } from "../../components/FormFields";
import { Trash2, Plus } from "lucide-react";

export default function EditTestimonials() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const testimonials = content.testimonials;
  const update = (field: string, value: unknown) => {
    updateSection("testimonials", { ...testimonials, [field]: value });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...testimonials.items];
    items[index] = { ...items[index], [field]: value };
    update("items", items);
  };

  const addItem = () => {
    update("items", [...testimonials.items, { name: "", role: "", quote: "" }]);
  };

  const removeItem = (index: number) => {
    update("items", testimonials.items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Testimonials</h1>

      <div className="max-w-2xl space-y-6">
        <AdminInput label="Section Title" value={testimonials.title} onChange={(v) => update("title", v)} />
        <AdminInput label="Title Accent (gold italic text)" value={testimonials.titleAccent} onChange={(v) => update("titleAccent", v)} />
        <AdminInput label="Subtitle" value={testimonials.subtitle} onChange={(v) => update("subtitle", v)} />

        <div>
          <label className="block text-xs font-display text-slate-400 mb-3 uppercase tracking-wider">Testimonials</label>
          {testimonials.items.map((item, i) => (
            <div key={i} className="bg-brand-bg p-4 rounded-[10px] border border-white/5 mb-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-white text-sm font-display">Testimonial {i + 1}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <AdminInput label="Name" value={item.name} onChange={(v) => updateItem(i, "name", v)} />
              <AdminInput label="Role" value={item.role} onChange={(v) => updateItem(i, "role", v)} />
              <AdminTextarea label="Quote" value={item.quote} onChange={(v) => updateItem(i, "quote", v)} rows={3} />
              <AdminImageUpload label="Screenshot / Result Photo (optional)" value={item.imageUrl || ""} onChange={(v) => updateItem(i, "imageUrl", v)} />
              <AdminImageUpload label="Avatar (optional)" value={item.avatarUrl || ""} onChange={(v) => updateItem(i, "avatarUrl", v)} />
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#FFD747] hover:text-[#ffe175] font-display">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}
