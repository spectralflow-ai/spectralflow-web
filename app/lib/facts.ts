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
 * No preprint count is quoted anywhere public: the deposits are listed
 * by name in publications.ts, and a count invites the one comparison we
 * do not want to be measured on. See /company#publications.
 */

/** Patented application verticals. */
export const VERTICALS = 5;
