"use client";

/* The footer of both languages: the path says which one (see lib/i18n). */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_EMAIL } from "../lib/contact";
import { ADDRESS_LINES, BRAND, DESCRIPTOR, LEGAL_NAME, PATENT_LINE, RCS } from "../lib/facts";
import { DESCRIPTOR as DESCRIPTOR_FR, PATENT_LINE as PATENT_LINE_FR } from "../lib/fr/facts";
import { NAV, FOOTER_EXTRA, type NavLink } from "../lib/nav";
import { NAV as NAV_FR, FOOTER_EXTRA as FOOTER_EXTRA_FR } from "../lib/fr/nav";
import { SUPPORTERS } from "../lib/supporters";
import { SUPPORTERS as SUPPORTERS_FR } from "../lib/fr/supporters";
import { langOf } from "../lib/i18n";

const linkTone =
  "transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]";
const linkClass = `text-sm ${linkTone}`;

function FooterLink({ link, className = linkClass }: { link: NavLink; className?: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

/** Brand mark, drawn as in the app icon. */
function Mark() {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" aria-hidden focusable="false">
      <rect x="4.4" y="4.4" width="11.2" height="11.2" rx="2.8" transform="rotate(45 10 10)" fill="var(--text-primary)" />
      <circle cx="10" cy="10" r="2.1" fill="var(--accent)" />
    </svg>
  );
}

export default function Footer() {
  const fr = langOf(usePathname()) === "fr";
  // Standing relationships only; time-bound selections live on Company and Events.
  const standingNames = new Set(SUPPORTERS.filter((s) => s.kind !== "Selected for").map((s) => s.name));
  const standing = (fr ? SUPPORTERS_FR : SUPPORTERS).filter((s) => standingNames.has(s.name));
  const nav = fr ? NAV_FR : NAV;
  const extra = fr ? FOOTER_EXTRA_FR : FOOTER_EXTRA;
  const year = new Date().getFullYear();

  return (
    <footer className="hairline mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(5,1fr)] gap-x-8 gap-y-10">
        {/* Brand block */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link
            href={fr ? "/fr" : "/"}
            className="inline-flex items-center gap-2.5"
            aria-label={`${BRAND}, ${fr ? "accueil" : "home"}`}
          >
            <Mark />
            <span className="font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {BRAND}
            </span>
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            {fr ? DESCRIPTOR_FR : DESCRIPTOR}
          </p>
          <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "var(--muted)" }}>
            {LEGAL_NAME}
            <br />
            {ADDRESS_LINES[1]}
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} mt-4 inline-block`}>
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Menu columns */}
        {nav.map((section) => (
          <nav key={section.label} aria-label={section.label}>
            <p className="eyebrow mb-4">
              {section.href ? (
                <Link href={section.href} className="hover:text-[color:var(--text-primary)] transition-colors">
                  {section.label}
                </Link>
              ) : (
                section.label
              )}
            </p>
            <ul className="flex flex-col gap-2.5">
              {section.links.map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Support line */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pb-8">
        <p className="figure-label is-plain">
          {standing.map((s, i) => (
            <span key={s.name}>
              {i > 0 && <span aria-hidden> · </span>}
              {s.statement}
            </span>
          ))}
        </p>
      </div>

      <div className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="figure-label is-plain">
            {LEGAL_NAME} · {RCS} · © {year}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li className="figure-label is-plain">{fr ? PATENT_LINE_FR : PATENT_LINE}</li>
            {extra.map((l) => (
              <li key={l.label}>
                <FooterLink link={l} className={`text-xs ${linkTone}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
