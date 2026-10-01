/**
 * Recognitions, memberships and selections shown on the site. Each entry
 * is labelled by the nature of the relationship. An entry is added only
 * once it is acquired in writing and its wording is cleared.
 */

export type SupporterKind = "Recognised" | "Member of" | "Selected for";

export type Supporter = {
  name: string;
  kind: SupporterKind;
  /** The full sentence, as it may be printed. */
  statement: string;
  /** Month the relationship started, as printed. */
  since: string;
  /** Official artwork in /public, unmodified. Text only when absent. */
  logo?: { src: string; alt: string; width: number; height: number };
  href?: string;
};

export const SUPPORTERS: Supporter[] = [
  {
    name: "Bpifrance",
    kind: "Recognised",
    statement: "Qualified as a deeptech company by Bpifrance",
    since: "July 2026",
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
    },
  },
  {
    name: "Google for Startups Cloud Program",
    kind: "Member of",
    statement: "Member of the Google for Startups Cloud Program",
    since: "June 2026",
  },
  {
    name: "Tech Tour Quantum & Defence 2026",
    kind: "Selected for",
    statement: "Selected to pitch at Tech Tour Quantum & Defence 2026 (Berlin)",
    since: "July 2026",
  },
];

/** Display order of the labelled blocks. */
export const SUPPORTER_KINDS: SupporterKind[] = ["Recognised", "Member of", "Selected for"];

export function supportersByKind(kind: SupporterKind): Supporter[] {
  return SUPPORTERS.filter((s) => s.kind === kind);
}

/** The one sentence about research partners, until each has agreed to be named. */
export const RESEARCH_PARTNERS_LINE =
  "We work with European research laboratories in diamond growth and nanofabrication, photonics and spin physics. We name each one once they have agreed.";
