// fr-source: app/lib/facts.ts sha256:373252dac804c8e5
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Faits publics de la société, en français. Mêmes noms d'export que
 * app/lib/facts.ts : une page française change seulement son chemin d'import.
 * Tout ce qui n'est pas du texte (adresses web, nombres, dates ISO,
 * identifiants) est ré-exporté du module anglais ; seuls les textes sont
 * redéfinis ici.
 */

import {
  BRAND,
  CONTEXT_SOURCES as CONTEXT_SOURCES_EN,
  FACTS_AS_OF as FACTS_AS_OF_EN,
  FOUNDER as FOUNDER_EN,
  REGISTERED_LABEL as REGISTERED_LABEL_EN,
  SHARE_IMAGE as SHARE_IMAGE_EN,
  type ContextSource,
} from "../facts";

export type { ContextSource } from "../facts";
export {
  ADDRESS,
  ADDRESS_LINES,
  BRAND,
  LEGAL_NAME,
  LINKEDIN_URL,
  PATENT_APPLICATIONS,
  PATENT_FAMILIES,
  RCS,
  REGISTERED,
  SIREN,
  SITE_URL,
  VERTICALS,
} from "../facts";

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

/** Une date anglaise imprimée, en français : "9 March 2026" devient "9 mars 2026". */
function dateLabelFr(label: string): string {
  return label
    .replace(/\b1 (?=[A-Z])/g, "1er ")
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => MOIS[m])
    .replace(/ and /g, " et ");
}

/* ----- Nom ------------------------------------------------------------- */

export const DESCRIPTOR = "Capteurs quantiques à diamant";
/** Le nom et le descripteur ensemble, pour les titres et les cartes de partage. */
export const BRAND_LINE = `${BRAND} · ${DESCRIPTOR}`;

/** L'image de partage du site, avec son texte alternatif en français. */
export const SHARE_IMAGE = {
  ...SHARE_IMAGE_EN,
  alt: `${BRAND_LINE}. D’abord, une navigation fiable sans GPS.`,
};

/** Date à laquelle se rapportent les décomptes datés et la chronologie. */
export const FACTS_AS_OF = dateLabelFr(FACTS_AS_OF_EN);

/* ----- Brevets --------------------------------------------------------- */

/** Ligne sans date ni nombre, pour les surfaces permanentes. */
export const PATENT_LINE = "Demandes de brevet déposées en 2026";
/** Détail daté, pour la page Société, la presse et les actualités. */
export const PATENT_DETAIL =
  "Dix-sept demandes de brevet déposées en 2026 : seize demandes provisoires au Royaume-Uni et une en France.";

/** @deprecated conservé tant que toutes les pages n'ont pas migré. Utiliser PATENT_LINE. */
export const PATENT_FAMILIES_LABEL = PATENT_LINE;

/* ----- Stade ----------------------------------------------------------- */

export const STAGE_LINE =
  "Notre premier prototype mobile est conçu ; son assemblage commence dès que son financement est confirmé.";

/* ----- La société sur le papier ---------------------------------------- */

export const REGISTERED_LABEL = dateLabelFr(REGISTERED_LABEL_EN);

export const FOUNDER = {
  name: FOUNDER_EN.name,
  role: "Fondateur et président",
} as const;

/* ----- Chiffres de contexte de tiers ------------------------------------ */

/**
 * Le chiffre (`figure`) et l'organisme sont traduits ; la date imprimée est
 * mise en français. Le titre (`title`) et la citation (`quote`) restent ceux
 * de la source, dans sa langue : ce sont ses mots exacts. Une source sans
 * traduction ici n'est pas citée en français.
 */
const SOURCE_TEXT: Record<string, Pick<ContextSource, "org" | "figure">> = {
  "iata-2025-safety-report": {
    org: "IATA",
    figure:
      "Les cas de brouillage signalés ont augmenté de 67 % en 2025 par rapport à 2023, et les cas de leurrage GPS signalés de 193 %.",
  },
  "iata-agm-2026": {
    org: "IATA",
    figure:
      "Plus de 71 000 cas d’interférence signalés et 2,1 millions de pertes de signal GPS dans le rapport de l’IATA sur les interférences GNSS pour 2024 et 2025.",
  },
  "easa-iata-2025": {
    org: "EASA et IATA",
    figure: "Les pertes de signal GPS ont augmenté de 220 % entre 2021 et 2024.",
  },
  "easa-eurocontrol-plan-2026": {
    org: "EASA et EUROCONTROL",
    figure:
      "À la suite d’une lettre de 13 États membres de l’UE, le plan d’action européen pour l’aviation vise à contenir la menace pendant au moins les trois prochaines années.",
  },
  "opsgroup-2024": {
    org: "OPSGROUP",
    figure: "En août 2024, environ 1 500 vols par jour étaient leurrés, contre environ 300 en janvier.",
  },
};

export const CONTEXT_SOURCES: ContextSource[] = CONTEXT_SOURCES_EN.flatMap((s) => {
  const t = SOURCE_TEXT[s.id];
  return t ? [{ ...s, ...t, dateLabel: dateLabelFr(s.dateLabel) }] : [];
});

export function getSource(id: string): ContextSource | undefined {
  return CONTEXT_SOURCES.find((s) => s.id === id);
}
