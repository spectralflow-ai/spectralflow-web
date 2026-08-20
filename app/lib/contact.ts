/**
 * Public contact address, the two gated asks, and the mailto fallback.
 *
 * The gated CTAs point at the contact form (with the intent preselected)
 * rather than at a raw mailto: a corporate desktop with no mail client
 * configured turns a mailto click into silence, and we never learn that
 * the enquiry was lost. The form falls back to mailto when the server
 * side is unavailable, so no path is a dead end.
 */
export const CONTACT_EMAIL = "info@spectralflow.ai";

export type Intent = "general" | "datasheet" | "twin";

export const INTENTS: { value: Intent; label: string; subject: string }[] = [
  {
    value: "general",
    label: "General enquiry",
    subject: "SpectralFlow enquiry",
  },
  {
    value: "datasheet",
    label: "SF-100 predictive datasheet",
    subject: "SF-100 predictive datasheet request",
  },
  {
    value: "twin",
    label: "Expert twin session",
    subject: "Expert twin session request",
  },
];

export const isIntent = (v: string | null | undefined): v is Intent =>
  v === "general" || v === "datasheet" || v === "twin";

export const subjectFor = (intent: Intent) =>
  INTENTS.find((i) => i.value === intent)?.subject ?? INTENTS[0].subject;

/** Gated CTAs used across the site. */
export const CTA_DATASHEET = "/contact?intent=datasheet";
export const CTA_TWIN = "/contact?intent=twin";

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
