"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea } from "../../components/FormFields";
import { Trash2, Plus } from "lucide-react";
import { availableIcons } from "@/lib/iconMap";

export default function EditFeatures() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const features = content.features;
  const update = (field: string, value: unknown) => {
    updateSection("features", { ...features, [field]: value });
  };

  const updateListItem = (field: "forItems" | "notForItems", index: number, value: string) => {
    const items = [...features[field]];
    items[index] = value;
    update(field, items);
  };

  const addListItem = (field: "forItems" | "notForItems") => {
    update(field, [...features[field], ""]);
  };

  const removeListItem = (field: "forItems" | "notForItems", index: number) => {
    update(field, features[field].filter((_, i) => i !== index));
  };

  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...features.featureCards];
    cards[index] = { ...cards[index], [field]: value };
    update("featureCards", cards);
  };

  const addCard = () => {
    update("featureCards", [...features.featureCards, { iconName: "Zap", title: "", description: "" }]);
  };

  const removeCard = (index: number) => {
    update("featureCards", features.featureCards.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Features Section</h1>

      <div className="max-w-2xl space-y-8">
        {/* For Items */}
        <div>
          <h2 className="text-lg font-display text-white mb-4">Who This Is For</h2>
          <AdminInput label="Title" value={features.forTitle} onChange={(v) => update("forTitle", v)} />
          <AdminInput label="Accent Word" value={features.forAccent} onChange={(v) => update("forAccent", v)} />
          <label className="block text-xs font-display text-slate-400 mb-2 uppercase tracking-wider">Items</label>
          {features.forItems.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={item}
                onChange={(e) => updateListItem("forItems", i, e.target.value)}
                className="flex-1 bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
              />
              <button onClick={() => removeListItem("forItems", i)} className="text-red-400 hover:text-red-300 px-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={() => addListItem("forItems")} className="flex items-center gap-1 text-sm text-[#FFD747] hover:text-[#ffe175] font-display mt-1">
            <Plus className="w-3 h-3" /> Add Item
          </button>
        </div>

        {/* Not For Items */}
        <div>
          <h2 className="text-lg font-display text-white mb-4">Who This Is NOT For</h2>
          <AdminInput label="Title" value={features.notForTitle} onChange={(v) => update("notForTitle", v)} />
          <AdminInput label="Accent Word" value={features.notForAccent} onChange={(v) => update("notForAccent", v)} />
          <label className="block text-xs font-display text-slate-400 mb-2 uppercase tracking-wider">Items</label>
          {features.notForItems.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={item}
                onChange={(e) => updateListItem("notForItems", i, e.target.value)}
                className="flex-1 bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
              />
              <button onClick={() => removeListItem("notForItems", i)} className="text-red-400 hover:text-red-300 px-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={() => addListItem("notForItems")} className="flex items-center gap-1 text-sm text-[#FFD747] hover:text-[#ffe175] font-display mt-1">
            <Plus className="w-3 h-3" /> Add Item
          </button>
        </div>

        {/* System Section */}
        <div>
          <h2 className="text-lg font-display text-white mb-4">System Section</h2>
          <AdminInput label="Title" value={features.systemTitle} onChange={(v) => update("systemTitle", v)} />
          <AdminInput label="Accent Word" value={features.systemAccent} onChange={(v) => update("systemAccent", v)} />
          <AdminTextarea label="Description" value={features.systemDescription} onChange={(v) => update("systemDescription", v)} />
        </div>

        {/* Feature Cards */}
        <div>
          <h2 className="text-lg font-display text-white mb-4">Feature Cards</h2>
          {features.featureCards.map((card, i) => (
            <div key={i} className="bg-brand-bg p-4 rounded-[10px] border border-white/5 mb-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-white text-sm font-display">Card {i + 1}</span>
                <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">Icon</label>
                <select
                  value={card.iconName}
                  onChange={(e) => updateCard(i, "iconName", e.target.value)}
                  className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <AdminInput label="Title" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
              <AdminTextarea label="Description" value={card.description} onChange={(v) => updateCard(i, "description", v)} rows={3} />
            </div>
          ))}
          <button onClick={addCard} className="flex items-center gap-2 text-sm text-[#FFD747] hover:text-[#ffe175] font-display">
            <Plus className="w-4 h-4" /> Add Feature Card
          </button>
        </div>
      </div>
    </div>
  );
}
