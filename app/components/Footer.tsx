import Link from "next/link";
import { MAILTO_TWIN_DEMO } from "../lib/contact";
import { PATENT_FAMILIES } from "../lib/facts";

const COLS = [
  {
    title: "Platform",
    links: [
      { href: "/technology", label: "Technology" },
      { href: "/applications", label: "Applications" },
      { href: "/tools", label: "Tools" },
      { href: "/instrument", label: "The Instrument · fly the twin" },
      { href: "https://studio.spectralflow.ai", label: "SpectralFlow Studio", external: true },
      {
        href: MAILTO_TWIN_DEMO,
        label: "Expert twin session · on request",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "About & vision" },
      { href: "/news", label: "News & insights" },
      {
        href: "https://www.linkedin.com/company/spectralflow",
        label: "LinkedIn",
        external: true,
      },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal", label: "Legal notice" },
      { href: "/privacy", label: "Privacy policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3.5 w-3.5 rotate-45 rounded-[3px]"
              style={{ background: "var(--text-primary)" }}
            />
            <span className="font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              SpectralFlow
            </span>
          </div>
          <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "var(--muted)" }}>
            NV-diamond quantum sensors, taking quantum out of the lab. European, sovereign deep
            tech.
          </p>
          <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "var(--muted)" }}>
            Spectral Flow SAS<br />
            14 avenue de Grande Bretagne<br />
            06230 Villefranche-sur-Mer, France
          </p>
          <p className="figure-label mt-6">Member of NVIDIA Inception</p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a
                      href={l.href}
                      className="text-sm transition-colors hover:text-black"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-black"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="figure-label" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
            SpectralFlow SAS · France · © {new Date().getFullYear()}
          </p>
          <p className="figure-label" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
            {PATENT_FAMILIES} patent families filed · Quantum sensing for navigation, industry & life sciences
          </p>
        </div>
      </div>
    </footer>
  );
}
