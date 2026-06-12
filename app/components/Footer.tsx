import Link from "next/link";

const COLS = [
  {
    title: "Platform",
    links: [
      { href: "/technology", label: "Technology" },
      { href: "/applications", label: "Applications" },
      { href: "https://studio.spectralflow.ai", label: "SpectralFlow Studio", external: true },
      {
        href: "mailto:alex@spectralflow.ai?subject=Navigation%20digital%20twin%20%E2%80%94%20demo%20access%20request",
        label: "Digital twin — request access",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "About & vision" },
      { href: "/news", label: "News & insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3.5 w-3.5 rotate-45 rounded-[3px]"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
            />
            <span className="font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              SpectralFlow
            </span>
          </div>
          <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "var(--muted)" }}>
            NV-diamond quantum sensors — taking quantum out of the lab. European, sovereign deep tech.
          </p>
          <p className="font-mono text-xs mt-6" style={{ color: "var(--muted)" }}>
            Member of NVIDIA Inception
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4" style={{ color: "var(--muted)" }}>
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
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
          <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            SpectralFlow SAS — France · © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            13 UK patents filed · Quantum sensing for navigation, industry & life sciences
          </p>
        </div>
      </div>
    </footer>
  );
}
