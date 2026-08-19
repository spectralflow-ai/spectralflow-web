"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on any route change (covers back/forward navigation).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Materialise the header once the page scrolls (rAF-throttled).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Escape dismisses the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{
        background: scrolled ? "rgba(250, 250, 248, 0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            className="inline-block h-3.5 w-3.5 rotate-45 rounded-[3px]"
            style={{ background: "var(--text-primary)" }}
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
                className={`relative group text-sm font-medium transition-colors ${active ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"}`}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1.5 h-px opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ background: "var(--text-primary)" }}
                />
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-1.5 h-px"
                    style={{ background: "var(--text-primary)" }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/instrument"
            className="btn-ghost"
            style={{ padding: "0.45rem 1rem" }}
          >
            Fly the Instrument <span>→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 h-10 w-10"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{
              background: "var(--text-secondary)",
              transform: open ? "translateY(3px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{
              background: "var(--text-secondary)",
              transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}
        >
          <Link
            href="/instrument"
            onClick={() => setOpen(false)}
            className="py-2.5 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Fly the Instrument →
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm font-medium transition-colors ${pathname === l.href ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
