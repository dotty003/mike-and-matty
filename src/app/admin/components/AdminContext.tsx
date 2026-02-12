"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContent } from "@/lib/types";

interface AdminContextType {
  content: SiteContent | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  successMessage: string | null;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  save: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const updateSection = useCallback(<K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent((prev) => {
      if (!prev) return prev;
      return { ...prev, [section]: data };
    });
  }, []);

  const save = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        throw new Error("Failed to save");
      }

      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
    setSaving(false);
  }, [content]);

  return (
    <AdminContext.Provider value={{ content, loading, saving, error, successMessage, updateSection, save }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
