"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/technology", label: "Technology" },
  { href: "/applications", label: "Applications" },
  { href: "/company", label: "Company" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(5, 5, 10, 0.72)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span
            className="inline-block h-3.5 w-3.5 rotate-45 rounded-[3px]"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              boxShadow: "0 0 14px rgba(0, 229, 255, 0.6)",
            }}
          />
          <span className="font-semibold tracking-tight text-[15px]" style={{ color: "var(--text-primary)" }}>
            SpectralFlow
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="text-sm transition-colors hover:text-white"
                style={{ color: active ? "var(--accent)" : "var(--text-secondary)" }}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="https://spectralflow.streamlit.app"
            className="btn-ghost text-sm font-medium rounded-lg px-4 py-2"
          >
            Studio →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 h-10 w-10"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{ background: "var(--text-secondary)", transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{ background: "var(--text-secondary)", transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden px-6 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid var(--border)" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm"
              style={{ color: pathname === l.href ? "var(--accent)" : "var(--text-secondary)" }}
            >
              {l.label}
            </Link>
          ))}
          <a href="https://spectralflow.streamlit.app" className="py-2.5 text-sm" style={{ color: "var(--accent)" }}>
            Open Studio →
          </a>
        </div>
      )}
    </header>
  );
}
