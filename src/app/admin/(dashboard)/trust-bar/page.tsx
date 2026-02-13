"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminImageUpload } from "../../components/FormFields";
import { Trash2, Plus, Youtube } from "lucide-react";

const MAX_CHANNELS = 10;
const emptyChannel = { channelUrl: "", photoUrl: "", channelName: "", subscriberCount: "" };

export default function EditTrustBar() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const trustBar = content.trustBar;
  const channels = trustBar.youtubeChannels || [];

  const updateChannel = (index: number, field: string, value: string) => {
    const updated = [...channels];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("trustBar", { ...trustBar, youtubeChannels: updated });
  };

  const addChannel = () => {
    if (channels.length >= MAX_CHANNELS) return;
    updateSection("trustBar", {
      ...trustBar,
      youtubeChannels: [...channels, { ...emptyChannel }],
    });
  };

  const removeChannel = (index: number) => {
    updateSection("trustBar", {
      ...trustBar,
      youtubeChannels: channels.filter((_, i) => i !== index),
    });
  };

  const updatePartner = (index: number, field: string, value: string) => {
    const partners = [...trustBar.partners];
    partners[index] = { ...partners[index], [field]: value };
    updateSection("trustBar", { ...trustBar, partners });
  };

  const addPartner = () => {
    updateSection("trustBar", {
      ...trustBar,
      partners: [...trustBar.partners, { name: "New Partner", displayStyle: "display-bold" as const }],
    });
  };

  const removePartner = (index: number) => {
    const partners = trustBar.partners.filter((_, i) => i !== index);
    updateSection("trustBar", { ...trustBar, partners });
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Trust Bar</h1>

      <div className="max-w-2xl space-y-6">
        <AdminInput label="Section Label" value={trustBar.label} onChange={(v) => updateSection("trustBar", { ...trustBar, label: v })} />

        {/* YouTube Channels */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Youtube className="w-4 h-4 text-red-500" />
            <label className="block text-xs font-display text-slate-400 uppercase tracking-wider">
              YouTube Channels ({channels.length}/{MAX_CHANNELS})
            </label>
          </div>
          <div className="space-y-4">
            {channels.map((ch, i) => (
              <div key={i} className="bg-brand-bg p-4 rounded-[10px] border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-white text-sm font-display">Channel {i + 1}</span>
                  <button onClick={() => removeChannel(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <AdminInput
                  label="Channel URL"
                  value={ch.channelUrl}
                  onChange={(v) => updateChannel(i, "channelUrl", v)}
                  placeholder="https://youtube.com/@channelname"
                />
                <AdminInput
                  label="Channel Name"
                  value={ch.channelName}
                  onChange={(v) => updateChannel(i, "channelName", v)}
                  placeholder="Mike & Matty"
                />
                <AdminImageUpload
                  label="Channel Photo"
                  value={ch.photoUrl}
                  onChange={(v) => updateChannel(i, "photoUrl", v)}
                />
                <AdminInput
                  label="Subscriber Count"
                  value={ch.subscriberCount}
                  onChange={(v) => updateChannel(i, "subscriberCount", v)}
                  placeholder="125K subscribers"
                />
              </div>
            ))}
          </div>
          {channels.length < MAX_CHANNELS && (
            <button
              onClick={addChannel}
              className="mt-4 flex items-center gap-2 text-sm font-display text-[#FFD747] hover:text-[#ffe175] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add YouTube Channel
            </button>
          )}
        </div>

        {/* Partners */}
        <div>
          <label className="block text-xs font-display text-slate-400 mb-3 uppercase tracking-wider">Partners</label>
          <div className="space-y-4">
            {trustBar.partners.map((partner, i) => (
              <div key={i} className="bg-brand-bg p-4 rounded-[10px] border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-white text-sm font-display">Partner {i + 1}</span>
                  <button onClick={() => removePartner(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <AdminInput label="Name" value={partner.name} onChange={(v) => updatePartner(i, "name", v)} />
                <AdminInput label="Logo URL (optional)" value={partner.logoUrl || ""} onChange={(v) => updatePartner(i, "logoUrl", v)} />
                <div className="mb-4">
                  <label className="block text-xs font-display text-slate-400 mb-1.5 uppercase tracking-wider">Display Style</label>
                  <select
                    value={partner.displayStyle}
                    onChange={(e) => updatePartner(i, "displayStyle", e.target.value)}
                    className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFD747] transition-colors"
                  >
                    <option value="image">Image only</option>
                    <option value="image-text">Image + Text</option>
                    <option value="serif-italic">Serif Italic Text</option>
                    <option value="display-bold">Display Bold Text</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addPartner}
            className="mt-4 flex items-center gap-2 text-sm font-display text-[#FFD747] hover:text-[#ffe175] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Partner
          </button>
        </div>
      </div>
    </div>
  );
}
