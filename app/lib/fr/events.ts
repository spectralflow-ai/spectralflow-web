// fr-source: app/lib/events.ts sha256:e8c0a33022de4748
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Les événements où nous sommes, en français. Mêmes noms d'export que
 * app/lib/events.ts. Chaque événement reprend l'événement anglais (slug,
 * dates ISO, rôle, lieu, lien, logo) et n'en redéfinit que les textes. Un
 * événement sans traduction ici n'est pas affiché en français.
 */

import { EVENTS as EVENTS_EN, type SiteEvent } from "../events";

export type { EventRole, SiteEvent } from "../events";
export { todayISO } from "../events";

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

/** Une date anglaise imprimée, en français : "8 and 9 October 2026" devient "8 et 9 octobre 2026". */
function dateLabelFr(label: string): string {
  return label
    .replace(/\b1 (?=[A-Z])/g, "1er ")
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => MOIS[m])
    .replace(/ and /g, " et ");
}

/* ----- Entrées --------------------------------------------------------- */

const COUNTRY: Record<string, string> = {
  Germany: "Allemagne",
  France: "France",
};

/** Textes par slug ; `name` et `logoAlt` seulement quand ils diffèrent de l'anglais. */
const TEXT: Record<string, { blurb: string; ask?: string; name?: string; logoAlt?: string }> = {
  "tech-tour-quantum-defence-2026": {
    blurb:
      "Nous avons été sélectionnés pour présenter notre projet à des investisseurs et à des experts des technologies quantiques et de défense. Demandez-nous la mission de démonstration en direct.",
    ask: "Retrouvez-nous à Berlin",
  },
  "blue-day-maritime-spatial-2026": {
    name: "Blue Day Maritime & Spatial",
    blurb:
      "Une journée consacrée au spatial pour le monde maritime, organisée par le CNES, le GICAN, le GIFAS, le pôle SAFE et le Pôle Mer Bretagne Atlantique. Nous y parlons de navigation magnétique quantique en mer et dans l’espace.",
    ask: "Retrouvez-nous à Paris",
  },
  "rencontres-du-spatial-region-sud-2026": {
    blurb:
      "La communauté spatiale de la Région Sud se retrouve à Cannes. Demandez-nous de piloter avec vous le profil spatial de notre mission de démonstration.",
    ask: "Retrouvez-nous à Cannes",
    logoAlt: "Pôle SAFE",
  },
};

export const EVENTS: SiteEvent[] = EVENTS_EN.flatMap((e) => {
  const t = TEXT[e.slug];
  if (!t) return [];
  const { ask, logo, ...rest } = e;
  const out: SiteEvent = {
    ...rest,
    name: t.name ?? e.name,
    country: COUNTRY[e.country] ?? e.country,
    dateLabel: dateLabelFr(e.dateLabel),
    blurb: t.blurb,
  };
  if (ask && t.ask) out.ask = t.ask;
  if (logo) out.logo = t.logoAlt ? { ...logo, alt: t.logoAlt } : logo;
  return [out];
});

/** Événements dont le dernier jour est `today` (ISO aaaa-mm-jj) ou après, le plus proche d'abord. */
export function upcomingEvents(today: string): SiteEvent[] {
  return EVENTS.filter((e) => e.end >= today).sort((a, b) => a.start.localeCompare(b.start));
}

/** Événements dont le dernier jour est avant `today` (ISO aaaa-mm-jj), le plus récent d'abord. */
export function pastEvents(today: string): SiteEvent[] {
  return EVENTS.filter((e) => e.end < today).sort((a, b) => b.start.localeCompare(a.start));
}

export function getEvent(slug: string): SiteEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
