/**
 * VerticalIcon — a tiny line-mark per vertical for the home chooser and the
 * applications hub cards. Same ink language as VerticalGlyph, one rare blue
 * point. A 24x24 frame. Static.
 */

import type { ReactNode } from "react";

const INK = "var(--text-secondary)";
const BLUE = "var(--accent)";

function Nav() {
  return (
    <>
      <path d="M6 8 L12 10 L6 12 Z" fill="none" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M3 18 Q7 14 11 18 T19 18" fill="none" stroke={INK} strokeWidth="1.2" />
      <circle cx="15" cy="16.4" r="2" fill={BLUE} />
    </>
  );
}
function Life() {
  return (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="7.5" fill="none" stroke={INK} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="4.4" fill="none" stroke={INK} strokeWidth="0.9" strokeDasharray="1.6 2" />
      <circle cx="12" cy="12" r="2.1" fill={BLUE} />
    </>
  );
}
function Semi() {
  return (
    <>
      {[8, 12, 16].map((y) => (
        <line key={y} x1="5" y1={y} x2="19" y2={y} stroke={INK} strokeWidth="1.2" />
      ))}
      <circle cx="12" cy="12" r="2" fill={BLUE} />
    </>
  );
}
function Quantum() {
  return (
    <>
      <line x1="8" y1="12" x2="16" y2="12" stroke={INK} strokeWidth="1.1" strokeDasharray="1.6 2" />
      <circle cx="16" cy="12" r="3" fill="none" stroke={INK} strokeWidth="1.2" />
      <circle cx="8" cy="12" r="2.4" fill={BLUE} />
    </>
  );
}

const ICONS: Record<string, () => ReactNode> = {
  navigation: Nav,
  "life-sciences": Life,
  semiconductors: Semi,
  "quantum-computing": Quantum,
};

export default function VerticalIcon({ slug, className }: { slug: string; className?: string }) {
  const I = ICONS[slug];
  if (!I) return null;
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} role="img" aria-hidden="true">
      <I />
    </svg>
  );
}
