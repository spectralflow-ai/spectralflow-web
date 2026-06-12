/**
 * Single source of truth for the public contact address and the two
 * gated mailto CTAs (predictive datasheet, digital-twin demo access).
 * Switching the public address (e.g. to info@) is a one-line change.
 */
export const CONTACT_EMAIL = "alex@spectralflow.ai";

export const MAILTO_DATASHEET = `mailto:${CONTACT_EMAIL}?subject=SF-100%20predictive%20datasheet%20request`;

export const MAILTO_TWIN_DEMO = `mailto:${CONTACT_EMAIL}?subject=Navigation%20digital%20twin%20%E2%80%94%20demo%20access%20request`;
