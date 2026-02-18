"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Type, Users, Image, MessageSquare, HelpCircle, Calendar, Globe, Footprints, Handshake, Palette } from "lucide-react";

const navItems = [
  { href: "/admin/hero", label: "Hero", icon: Layout },
  { href: "/admin/trust-bar", label: "Trust Bar", icon: Handshake },
  { href: "/admin/features", label: "Features", icon: Type },
  { href: "/admin/about", label: "About", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: Users },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/booking", label: "Booking", icon: Calendar },
  { href: "/admin/footer", label: "Footer", icon: Footprints },
  { href: "/admin/global", label: "Global", icon: Globe },
  { href: "/admin/visual-branding", label: "Visual Branding", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-brand-bg border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link href="/" target="_blank" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center text-brand-bg font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-white font-display font-bold text-sm">Mike & Matty</p>
            <p className="text-slate-500 text-xs font-display">Admin CMS</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-display transition-colors ${
                isActive
                  ? "bg-brand-accent/10 text-brand-accent border-l-2 border-brand-accent"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-display text-slate-400 hover:text-white transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-display text-red-400 hover:text-red-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
