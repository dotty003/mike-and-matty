"use client";
import React from "react";
import { useAdmin } from "./AdminContext";

export function SaveBar() {
  const { save, saving, error, successMessage } = useAdmin();

  return (
    <div className="fixed bottom-0 right-0 left-64 bg-brand-bg/95 backdrop-blur-md border-t border-white/5 px-8 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}
      </div>
      <button
        onClick={save}
        disabled={saving}
        className="bg-[#FFD747] text-brand-bg font-bold font-display px-8 py-2.5 rounded-[10px] hover:bg-[#ffe175] transition-colors disabled:opacity-50 text-sm"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
