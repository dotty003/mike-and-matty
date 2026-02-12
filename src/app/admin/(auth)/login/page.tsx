"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/hero");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm font-display">Mike & Matty CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-brand-surface p-8 rounded-[20px] border border-white/5">
          <label className="block text-sm font-display text-slate-300 mb-2 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-bg border border-brand-primary/30 rounded-[10px] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD747] transition-colors"
            placeholder="Enter admin password"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#FFD747] text-brand-bg font-bold font-display py-3 rounded-[10px] hover:bg-[#ffe175] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
