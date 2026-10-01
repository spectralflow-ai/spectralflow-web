import type { Logo } from "../components/LogoMark";

/**
 * Recognitions, memberships and selections shown on the site. Each entry
 * is labelled by the nature of the relationship. An entry is added only
 * once it is acquired in writing and its wording is cleared.
 */

export type SupporterKind = "Recognised" | "Pre-incubated at" | "Member of" | "Selected for";

export type Supporter = {
  name: string;
  kind: SupporterKind;
  /** The full sentence, as it may be printed. */
  statement: string;
  /** Month the relationship started, as printed. */
  since?: string;
  logo?: Logo;
  href?: string;
};

export const SUPPORTERS: Supporter[] = [
  {
    name: "Bpifrance",
    kind: "Recognised",
    statement: "Qualified as a deeptech company by Bpifrance",
    since: "July 2026",
    logo: { src: "/logos/bpifrance.svg", alt: "Bpifrance", width: 77.352, height: 22.2 },
  },
  {
    name: "Incubateur Provence Côte d'Azur",
    kind: "Pre-incubated at",
    statement: "Pre-incubated at the Incubateur Provence Côte d'Azur",
    logo: {
      src: "/logos/incubateur-pca.png",
      alt: "Incubateur Provence Côte d'Azur",
      width: 304,
      height: 132,
    },
  },
  {
    name: "QuIC",
    kind: "Member of",
    statement: "Member of QuIC, the European Quantum Industry Consortium",
    since: "October 2026",
    logo: { src: "/logos/quic.svg", alt: "QuIC, European Quantum Industry Consortium", width: 130, height: 67 },
    href: "https://www.euroquic.org/",
  },
  {
    name: "NVIDIA Inception",
    kind: "Member of",
    statement: "Member of NVIDIA Inception",
    since: "June 2026",
    logo: {
      src: "/nvidia-inception-1c-blk.svg",
      alt: "Member of NVIDIA Inception",
      width: 500,
      height: 216,
      tone: "original",
    },
  },
  {
    name: "Google for Startups Cloud Program",
    kind: "Member of",
    statement: "Member of the Google for Startups Cloud Program",
    since: "June 2026",
    logo: { src: "/logos/google-for-startups.svg", alt: "Google for Startups", width: 824, height: 100 },
  },
  {
    name: "Tech Tour Quantum & Defence 2026",
    kind: "Selected for",
    statement: "Selected to pitch at Tech Tour Quantum & Defence 2026 (Berlin)",
    since: "July 2026",
    logo: { src: "/logos/tech-tour.svg", alt: "Tech Tour", width: 577.5, height: 101.6 },
  },
];

/** Display order of the labelled blocks. */
export const SUPPORTER_KINDS: SupporterKind[] = [
  "Recognised",
  "Pre-incubated at",
  "Member of",
  "Selected for",
];

export function supportersByKind(kind: SupporterKind): Supporter[] {
  return SUPPORTERS.filter((s) => s.kind === kind);
}

/** The line printed under a supporter: a start month, or nothing. */
export function sinceLine(s: Supporter): string | null {
  if (!s.since) return null;
  return s.kind === "Selected for" ? s.since : `Since ${s.since}`;
}

/** The one sentence about research partners. */
export const RESEARCH_PARTNERS_LINE =
  "We work with the best European research laboratories in diamond growth and nanofabrication, photonics and spin physics. Their names are available on request.";
