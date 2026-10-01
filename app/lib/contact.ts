/**
 * Public contact address, the contact reasons, and the mailto fallback.
 *
 * The CTAs point at the contact form (with the reason preselected)
 * rather than at a raw mailto: a corporate desktop with no mail client
 * configured turns a mailto click into silence, and we never learn that
 * the enquiry was lost. The form falls back to mailto when the server
 * side is unavailable, so no path is a dead end.
 *
 * Intent values are part of shared links: existing values never change.
 * "twin" is the stable value behind the expert simulation session; new
 * links use the "simulation" alias, which resolves to it.
 */
export const CONTACT_EMAIL = "info@spectralflow.ai";

export type Intent =
  | "general"
  | "programme"
  | "lab"
  | "datasheet"
  | "twin"
  | "press"
  | "careers";

export const INTENTS: { value: Intent; label: string; subject: string }[] = [
  {
    value: "general",
    label: "General enquiry",
    subject: "Spectral Flow enquiry",
  },
  {
    value: "programme",
    label: "Programme partnership (integrators, programme owners)",
    subject: "Programme partnership enquiry",
  },
  {
    value: "lab",
    label: "Research laboratory collaboration",
    subject: "Research collaboration enquiry",
  },
  {
    value: "datasheet",
    label: "Model-derived datasheet",
    subject: "Model-derived datasheet request",
  },
  {
    value: "twin",
    label: "Expert simulation session",
    subject: "Expert simulation session request",
  },
  {
    value: "press",
    label: "Press and media",
    subject: "Press enquiry",
  },
  {
    value: "careers",
    label: "Careers and internships",
    subject: "Careers enquiry",
  },
];

export const isIntent = (v: string | null | undefined): v is Intent =>
  typeof v === "string" && INTENTS.some((i) => i.value === v);

/** Reads an intent from a URL value, accepting the public aliases. */
export function toIntent(v: string | null | undefined): Intent | null {
  if (isIntent(v)) return v;
  if (v === "simulation") return "twin";
  return null;
}

export const subjectFor = (intent: Intent) =>
  INTENTS.find((i) => i.value === intent)?.subject ?? INTENTS[0].subject;

/** CTAs used across the site. */
export const CTA_DATASHEET = "/contact?intent=datasheet";
export const CTA_SIMULATION = "/contact?intent=simulation";
export const CTA_PROGRAMME = "/contact?intent=programme";
export const CTA_LAB = "/contact?intent=lab";
export const CTA_PRESS = "/contact?intent=press";
export const CTA_CAREERS = "/contact?intent=careers";
/** @deprecated same destination as CTA_SIMULATION. */
export const CTA_TWIN = CTA_SIMULATION;

/** Fallback compose link, used when the server side cannot take the message. */
export function mailtoFor(fields: {
  intent: Intent;
  name: string;
  org: string;
  email: string;
  message: string;
}) {
  const subject = encodeURIComponent(subjectFor(fields.intent));
  const body = encodeURIComponent(
    `Name: ${fields.name}\nOrganisation: ${fields.org}\nEmail: ${fields.email}\n\n${fields.message}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
