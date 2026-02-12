"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea } from "../../components/FormFields";
import { Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";

export default function EditFAQ() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const faq = content.faq;
  const update = (field: string, value: unknown) => {
    updateSection("faq", { ...faq, [field]: value });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...faq.items];
    items[index] = { ...items[index], [field]: value };
    update("items", items);
  };

  const addItem = () => {
    update("items", [...faq.items, { question: "", answer: "" }]);
  };

  const removeItem = (index: number) => {
    update("items", faq.items.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const items = [...faq.items];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    update("items", items);
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit FAQ</h1>

      <div className="max-w-2xl space-y-6">
        <AdminInput label="Section Title" value={faq.title} onChange={(v) => update("title", v)} />

        <div>
          <label className="block text-xs font-display text-slate-400 mb-3 uppercase tracking-wider">FAQ Items</label>
          {faq.items.map((item, i) => (
            <div key={i} className="bg-brand-bg p-4 rounded-[10px] border border-white/5 mb-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-white text-sm font-display">Question {i + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(i, "up")}
                    disabled={i === 0}
                    className="text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(i, "down")}
                    disabled={i === faq.items.length - 1}
                    className="text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <AdminInput label="Question" value={item.question} onChange={(v) => updateItem(i, "question", v)} />
              <AdminTextarea label="Answer" value={item.answer} onChange={(v) => updateItem(i, "answer", v)} rows={4} />
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#FFD747] hover:text-[#ffe175] font-display">
            <Plus className="w-4 h-4" /> Add FAQ Item
          </button>
        </div>
      </div>
    </div>
  );
}
