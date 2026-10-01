"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NAV, NAV_CTA, activeSection, type NavSection } from "../lib/nav";
import { BRAND } from "../lib/facts";

/** The mark: ink diamond with the blue point at its centre, as in the app icon. */
export function BrandMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden focusable="false">
      <rect
        x="4.4"
        y="4.4"
        width="11.2"
        height="11.2"
        rx="2.8"
        transform="rotate(45 10 10)"
        fill="var(--text-primary)"
      />
      <circle cx="10" cy="10" r="2.1" fill="var(--accent)" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden focusable="false">
      <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----- Desktop: one disclosure per section ---------------------------- */

function DesktopSection({
  section,
  index,
  open,
  active,
  onOpen,
  onClose,
  onToggle,
}: {
  section: NavSection;
  index: number;
  open: boolean;
  active: boolean;
  onOpen: (i: number) => void;
  onClose: () => void;
  onToggle: (i: number) => void;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  // A click right after a hover-open (or a tap, which fires both) keeps the
  // panel open instead of toggling it shut.
  const hoverOpenedAt = useRef(0);
  // The last two sections open towards the left so the panel stays on screen.
  const alignRight = index >= NAV.length - 2;

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 140);
  };
  useEffect(() => cancelClose, []);

  const focusLink = (which: "first" | "last") => {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!links || links.length === 0) return;
    (which === "first" ? links[0] : links[links.length - 1]).focus();
  };

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen(index);
      requestAnimationFrame(() => focusLink("first"));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onOpen(index);
      requestAnimationFrame(() => focusLink("last"));
    }
  };

  const onPanelKey = (e: React.KeyboardEvent) => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown" && links.length) {
      e.preventDefault();
      links[(i + 1) % links.length].focus();
    } else if (e.key === "ArrowUp" && links.length) {
      e.preventDefault();
      links[(i - 1 + links.length) % links.length].focus();
    } else if (e.key === "Home" && links.length) {
      e.preventDefault();
      links[0].focus();
    } else if (e.key === "End" && links.length) {
      e.preventDefault();
      links[links.length - 1].focus();
    }
  };

  // Leaving the section with Tab closes its panel.
  const onBlurWithin = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
  };

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        if (!open) hoverOpenedAt.current = Date.now();
        onOpen(index);
      }}
      onMouseLeave={scheduleClose}
      onBlur={onBlurWithin}
    >
      <button
        ref={triggerRef}
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active ? "true" : undefined}
        onClick={() => {
          if (open && Date.now() - hoverOpenedAt.current < 600) return;
          onToggle(index);
        }}
        onKeyDown={onTriggerKey}
      >
        {section.label}
        <Chevron />
      </button>
      {active && (
        <span
          aria-hidden
          className="absolute left-0 right-4 -bottom-0.5 h-px"
          style={{ background: "var(--text-primary)" }}
        />
      )}

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        onKeyDown={onPanelKey}
        className={`absolute top-full pt-3 ${alignRight ? "right-0" : "left-0"}`}
      >
        <div className="nav-panel nav-panel-in w-[34rem] max-w-[calc(100vw-2rem)] p-3">
          {section.href && (
            <Link
              href={section.href}
              className="textlink px-3 pt-2 pb-3"
              onClick={onClose}
            >
              {section.label} overview <span>→</span>
            </Link>
          )}
          <ul className="grid grid-cols-2 gap-1">
            {section.links.map((l) => (
              <li key={`${l.label}-${l.href}`}>
                <Link href={l.href} className="nav-panel-link" onClick={onClose}>
                  <span className="nav-link-label">{l.label}</span>
                  {l.blurb && <span className="nav-link-blurb">{l.blurb}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/* ----- Header ---------------------------------------------------------- */

export default function Nav() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const current = activeSection(pathname);

  // Close every menu on route change (covers back and forward navigation).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenIndex(null);
    setMobileOpen(false);
  }

  const closeDesktop = useCallback(() => setOpenIndex(null), []);
  const openDesktop = useCallback((i: number) => setOpenIndex(i), []);
  const toggleDesktop = useCallback((i: number) => setOpenIndex((o) => (o === i ? null : i)), []);

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

  // Desktop: Escape anywhere and a click outside close the open panel.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [openIndex]);

  // Mobile: lock the page behind the menu, move focus in, Escape closes,
  // Tab stays inside the menu and its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = mobileRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !mobileRef.current || !toggleRef.current) return;
      const items = [
        toggleRef.current,
        ...Array.from(mobileRef.current.querySelectorAll<HTMLElement>("a, button")),
      ].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Close the mobile menu if the viewport grows past the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || openIndex !== null || mobileOpen;
  // No backdrop filter while the mobile menu is open: a filtered ancestor
  // would become the containing block of the fixed full-screen menu.
  const blur = solid && !mobileOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${blur ? "backdrop-blur-md" : ""}`}
      style={{
        background: mobileOpen ? "var(--background)" : solid ? "rgba(250, 250, 248, 0.94)" : "transparent",
        borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        ref={navRef}
        aria-label="Main"
        className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-6"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setMobileOpen(false)}
          aria-label={`${BRAND}, home`}
        >
          <BrandMark />
          <span className="font-semibold tracking-tight text-[15px]" style={{ color: "var(--text-primary)" }}>
            {BRAND}
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV.map((s, i) => (
            <DesktopSection
              key={s.label}
              section={s}
              index={i}
              open={openIndex === i}
              active={current === s.label}
              onOpen={openDesktop}
              onClose={closeDesktop}
              onToggle={toggleDesktop}
            />
          ))}
        </ul>

        <div className="hidden lg:block shrink-0">
          <Link href={NAV_CTA.href} className="btn-ghost" style={{ padding: "0.45rem 1rem" }}>
            {NAV_CTA.label} <span>→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 h-10 w-10 -mr-2"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{
              background: "var(--text-secondary)",
              transform: mobileOpen ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-transform duration-300"
            style={{
              background: "var(--text-secondary)",
              transform: mobileOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu: full screen, one accordion per section */}
      <div
        id="mobile-menu"
        ref={mobileRef}
        className="nav-mobile lg:hidden"
        hidden={!mobileOpen}
      >
        <div className="px-6 pt-4 pb-16">
          <Link
            href={NAV_CTA.href}
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full mb-6"
          >
            {NAV_CTA.label} <span>→</span>
          </Link>
          <ul>
            {NAV.map((s, i) => {
              const expanded = mobileSection === i;
              const listId = `mobile-section-${i}`;
              return (
                <li key={s.label} className="hairline">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-4 text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    onClick={() => setMobileSection(expanded ? null : i)}
                  >
                    {s.label}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300"
                      style={{ transform: expanded ? "rotate(180deg)" : "none", color: "var(--muted)" }}
                    >
                      <Chevron />
                    </span>
                  </button>
                  <ul id={listId} hidden={!expanded} className="pb-4 flex flex-col gap-1">
                    {s.href && (
                      <li>
                        <Link
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm font-medium"
                          style={{ color: "var(--accent)" }}
                        >
                          {s.label} overview →
                        </Link>
                      </li>
                    )}
                    {s.links.map((l) => (
                      <li key={`${l.label}-${l.href}`}>
                        <Link
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2"
                        >
                          <span className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {l.label}
                          </span>
                          {l.blurb && (
                            <span className="block text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                              {l.blurb}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
