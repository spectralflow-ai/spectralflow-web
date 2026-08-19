/**
 * Public company facts : single source of truth for figures quoted
 * across the site (pages, footer, metadata, OG image).
 *
 * PATENT_FAMILIES: update on each new filing. 16 as of 2026-07-06
 * confirmed by the founder.
 */
import { PUBLICATIONS } from "./publications";

export const PATENT_FAMILIES = 16;
export const PATENT_FAMILIES_LABEL = `${PATENT_FAMILIES} patent families`;

/**
 * Public preprints on Zenodo. Derived from the published list so the
 * figure and the DOIs a visitor can click can never disagree: add an
 * entry to publications.ts and the count follows.
 */
export const PREPRINTS = PUBLICATIONS.length;

/** Patented application verticals. */
export const VERTICALS = 5;
