// fr-source: app/lib/contact.ts sha256:5f140ffa53792bd5
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Adresse de contact, motifs de contact et lien de secours mailto, en
 * français. Mêmes noms d'export que app/lib/contact.ts. Les valeurs des
 * motifs (`value`) font partie des liens partagés : elles restent celles
 * de l'anglais ; seuls les libellés et les sujets sont traduits.
 */

import {
  CONTACT_EMAIL,
  CTA_CAREERS as CTA_CAREERS_EN,
  CTA_DATASHEET as CTA_DATASHEET_EN,
  CTA_LAB as CTA_LAB_EN,
  CTA_PRESS as CTA_PRESS_EN,
  CTA_PROGRAMME as CTA_PROGRAMME_EN,
  CTA_SIMULATION as CTA_SIMULATION_EN,
  INTENTS as INTENTS_EN,
  type Intent,
} from "../contact";

export type { Intent } from "../contact";
export { CONTACT_EMAIL, isIntent, toIntent } from "../contact";

/** Libellé et sujet de chaque motif ; un motif ajouté en anglais doit être traduit ici. */
const TEXT: Record<Intent, { label: string; subject: string }> = {
  general: {
    label: "Demande générale",
    subject: "Demande d’information Spectral Flow",
  },
  programme: {
    label: "Partenariat de programme (intégrateurs, porteurs de programme)",
    subject: "Demande de partenariat de programme",
  },
  lab: {
    label: "Collaboration avec un laboratoire de recherche",
    subject: "Demande de collaboration de recherche",
  },
  datasheet: {
    label: "Fiche technique issue du modèle",
    subject: "Demande de fiche technique issue du modèle",
  },
  twin: {
    label: "Session de simulation experte",
    subject: "Demande de session de simulation experte",
  },
  press: {
    label: "Presse et médias",
    subject: "Demande presse",
  },
  careers: {
    label: "Emplois et stages",
    subject: "Demande sur les emplois et les stages",
  },
};

export const INTENTS: { value: Intent; label: string; subject: string }[] = INTENTS_EN.map((i) => ({
  value: i.value,
  ...TEXT[i.value],
}));

export const subjectFor = (intent: Intent) =>
  INTENTS.find((i) => i.value === intent)?.subject ?? INTENTS[0].subject;

/** Appels à l'action du site : le formulaire de contact existe en français. */
export const CTA_DATASHEET = `/fr${CTA_DATASHEET_EN}`;
export const CTA_SIMULATION = `/fr${CTA_SIMULATION_EN}`;
export const CTA_PROGRAMME = `/fr${CTA_PROGRAMME_EN}`;
export const CTA_LAB = `/fr${CTA_LAB_EN}`;
export const CTA_PRESS = `/fr${CTA_PRESS_EN}`;
export const CTA_CAREERS = `/fr${CTA_CAREERS_EN}`;
/** @deprecated même destination que CTA_SIMULATION. */
export const CTA_TWIN = CTA_SIMULATION;

/** Lien de rédaction de secours, quand le serveur ne peut pas prendre le message. */
export function mailtoFor(fields: {
  intent: Intent;
  name: string;
  org: string;
  email: string;
  message: string;
}) {
  const subject = encodeURIComponent(subjectFor(fields.intent));
  const body = encodeURIComponent(
    `Nom : ${fields.name}\nOrganisation : ${fields.org}\nCourriel : ${fields.email}\n\n${fields.message}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
