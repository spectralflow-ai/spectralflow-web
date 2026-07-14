/**
 * Single source of truth for the public contact address and the two
 * gated mailto CTAs (predictive datasheet, expert twin session).
 * Switching the public address (e.g. to info@) is a one-line change.
 */
export const CONTACT_EMAIL = "info@spectralflow.ai";

export const MAILTO_DATASHEET = `mailto:${CONTACT_EMAIL}?subject=SF-100%20predictive%20datasheet%20request`;

export const MAILTO_TWIN_DEMO = `mailto:${CONTACT_EMAIL}?subject=Expert%20twin%20session%20request`;
