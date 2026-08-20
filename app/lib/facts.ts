/**
 * Public company facts : single source of truth for figures quoted
 * across the site (pages, footer, metadata, OG image).
 *
 * PATENT_FAMILIES: update on each new filing. 16 as of 2026-07-06
 * confirmed by the founder.
 */
export const PATENT_FAMILIES = 16;
export const PATENT_FAMILIES_LABEL = `${PATENT_FAMILIES} patent families`;

/**
 * No preprint count is quoted anywhere public, and the Zenodo deposits are
 * not linked from the site (founder decision, 19/08/2026): a count invites
 * the one comparison we do not want to be measured on.
 */

/** Patented application verticals. */
export const VERTICALS = 5;
