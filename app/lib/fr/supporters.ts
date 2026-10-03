// fr-source: app/lib/supporters.ts sha256:666500b4534d7f8a
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Reconnaissance, adhésions et sélections, en français. Mêmes noms d'export
 * que app/lib/supporters.ts. Chaque entrée reprend l'entrée anglaise (nom,
 * nature de la relation, logo, lien) et n'en redéfinit que les textes. Une
 * entrée sans traduction ici n'est pas affichée en français.
 */

import { SUPPORTERS as SUPPORTERS_EN, type Supporter, type SupporterKind } from "../supporters";

export type { Supporter, SupporterKind } from "../supporters";
export { SUPPORTER_KINDS } from "../supporters";

/* ----- Dates en français ---------------------------------------------- */

const MOIS: Record<string, string> = {
  January: "janvier",
  February: "février",
  March: "mars",
  April: "avril",
  May: "mai",
  June: "juin",
  July: "juillet",
  August: "août",
  September: "septembre",
  October: "octobre",
  November: "novembre",
  December: "décembre",
};

/** Une date anglaise imprimée, en français : "July 2026" devient "juillet 2026". */
function dateLabelFr(label: string): string {
  return label
    .replace(/\b1 (?=[A-Z])/g, "1er ")
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => MOIS[m])
    .replace(/ and /g, " et ");
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ----- Entrées --------------------------------------------------------- */

/** La phrase imprimée, et le texte alternatif du logo quand il n'est pas un nom propre ; par nom anglais. */
const TEXT: Record<string, { statement: string; logoAlt?: string }> = {
  Bpifrance: {
    statement: "Qualifiée Deeptech par Bpifrance",
  },
  "Incubateur Provence Côte d'Azur": {
    statement: "Pré-incubée à l’Incubateur Provence Côte d’Azur",
  },
  QuIC: {
    statement:
      "Membre de QuIC, le consortium européen de l’industrie quantique (European Quantum Industry Consortium)",
  },
  "NVIDIA Inception": {
    statement: "Membre de NVIDIA Inception",
    logoAlt: "Membre de NVIDIA Inception",
  },
  "Google for Startups Cloud Program": {
    statement: "Membre du programme Google for Startups Cloud",
  },
  "Tech Tour Quantum & Defence 2026": {
    statement: "Sélectionnée pour présenter son projet au Tech Tour Quantum & Defence 2026, à Berlin",
  },
};

export const SUPPORTERS: Supporter[] = SUPPORTERS_EN.flatMap((s) => {
  const t = TEXT[s.name];
  if (!t) return [];
  const { since, logo, ...rest } = s;
  const out: Supporter = { ...rest, statement: t.statement };
  if (since) out.since = dateLabelFr(since);
  if (logo) out.logo = t.logoAlt ? { ...logo, alt: t.logoAlt } : logo;
  return [out];
});

export function supportersByKind(kind: SupporterKind): Supporter[] {
  return SUPPORTERS.filter((s) => s.kind === kind);
}

/** La ligne imprimée sous une entrée : un mois de début, ou rien. */
export function sinceLine(s: Supporter): string | null {
  if (!s.since) return null;
  return s.kind === "Selected for" ? cap(s.since) : `Depuis ${s.since}`;
}

/** La phrase unique sur les partenaires de recherche. */
export const RESEARCH_PARTNERS_LINE =
  "Nous travaillons avec les meilleurs laboratoires de recherche européens, en croissance et nanofabrication du diamant, en photonique et en physique du spin. Leurs noms sont communiqués sur demande.";
