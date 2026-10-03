/**
 * Site menu: one structure shared by the header (Nav) and the footer.
 * Each sub-link carries a one-line benefit shown in the desktop panel.
 */

import { LINKEDIN_URL } from "./facts";

export type NavLink = {
  label: string;
  href: string;
  /** One short line under the link in the desktop panel. */
  blurb?: string;
  external?: boolean;
};

export type NavSection = {
  label: string;
  /** Landing page of the section; omitted when the section is only a group. */
  href?: string;
  links: NavLink[];
};

export const NAV: NavSection[] = [
  {
    label: "Navigation",
    href: "/applications/navigation",
    links: [
      {
        label: "The problem",
        href: "/applications/navigation#problem",
        blurb: "Where satellite positioning fails, and why that matters.",
      },
      {
        label: "The error bound",
        href: "/applications/navigation#bound",
        blurb: "Every fix comes with how wrong it can be.",
      },
      {
        label: "How it works",
        href: "/applications/navigation#how",
        blurb: "The Earth's magnetic field, read and matched to a map.",
      },
      {
        label: "Situations",
        href: "/applications/navigation#situations",
        blurb: "Survey, at sea, in the air and in space.",
      },
      {
        label: "FAQ",
        href: "/applications/navigation#faq",
        blurb: "Straight answers to the usual objections.",
      },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    links: [
      {
        label: "The principle",
        href: "/technology#principle",
        blurb: "Resonance in diamond, read with light.",
      },
      {
        label: "Why diamond",
        href: "/technology#diamond",
        blurb: "Room temperature, robust, a vector from the lattice.",
      },
      {
        label: "Simulation first",
        href: "/technology#simulation",
        blurb: "Designed in simulation, checked against published experiments.",
      },
      {
        label: "Where we stand",
        href: "/company#where-we-stand",
        blurb: "What is done and what comes next, dated.",
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
    links: [
      {
        label: "Navigation",
        href: "/applications/navigation",
        blurb: "Positioning you can trust without GPS.",
      },
      {
        label: "Life sciences",
        href: "/applications/life-sciences",
        blurb: "Magnetic resonance on small samples, and the magnetic signature of cells.",
      },
      {
        label: "Semiconductors & industry",
        href: "/applications/semiconductors",
        blurb: "Current paths and buried defects, seen through their magnetic field.",
      },
      {
        label: "Quantum computing",
        href: "/applications/quantum-computing",
        blurb: "Spin control at room temperature.",
      },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "News", href: "/news", blurb: "Milestones and notes from the work." },
      { label: "Events", href: "/events", blurb: "Where to meet us next." },
      { label: "Glossary", href: "/glossary", blurb: "The terms of quantum navigation, explained." },
      { label: "Press kit", href: "/press", blurb: "Facts, boilerplate, logos and contact." },
      { label: "Mission demos", href: "/instrument", blurb: "Fly a simulated mission in your browser." },
    ],
  },
  {
    label: "Company",
    href: "/company",
    links: [
      { label: "About", href: "/company", blurb: "One diamond platform, many instruments." },
      { label: "Team", href: "/company#team", blurb: "Who designs the instrument." },
      {
        label: "Support & memberships",
        href: "/company#support",
        blurb: "Recognitions, memberships and selections.",
      },
      { label: "Careers", href: "/company#careers", blurb: "Internships and roles from 2027." },
      { label: "Contact", href: "/contact", blurb: "Programmes, laboratories, press." },
      { label: "En français", href: "/fr", blurb: "Le site en français." },
    ],
  },
];

/** The call to action at the right of the header. */
export const NAV_CTA: NavLink = { label: "Fly the Instrument", href: "/instrument" };

/** Footer-only links, after the menu columns. */
export const FOOTER_EXTRA: NavLink[] = [
  { label: "Tools", href: "/tools" },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "Legal notice", href: "/legal" },
  { label: "Privacy policy", href: "/privacy" },
];

/**
 * Label of the menu section that owns `pathname`: the section holding the
 * longest matching path. Ties go to the first section, so the navigation
 * product page belongs to "Navigation" rather than "Applications".
 */
export function activeSection(pathname: string, nav: NavSection[] = NAV): string | undefined {
  let best: { label: string; len: number } | undefined;
  for (const s of nav) {
    const paths = [s.href, ...s.links.map((l) => l.href)]
      .filter((h): h is string => !!h && h.startsWith("/"))
      .map((h) => h.split("#")[0]);
    for (const p of paths) {
      const match = pathname === p || (p !== "/" && pathname.startsWith(`${p}/`));
      if (match && (!best || p.length > best.len)) best = { label: s.label, len: p.length };
    }
  }
  return best?.label;
}
