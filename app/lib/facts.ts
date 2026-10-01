/**
 * Public company facts: the single source for every name, date and count
 * quoted across the site (pages, nav, footer, metadata, OG images, llms.txt).
 *
 * Counts that go stale are only quoted in a dated context (FACTS_AS_OF).
 * Permanent surfaces (footer, metadata) use PATENT_LINE, which carries no
 * number.
 */

/* ----- Name ---------------------------------------------------------- */

/** The name, always in two words. */
export const BRAND = "Spectral Flow";
export const LEGAL_NAME = "Spectral Flow SAS";
export const DESCRIPTOR = "Diamond quantum sensors";
/** Name and descriptor together, for titles and share cards. */
export const BRAND_LINE = `${BRAND} · ${DESCRIPTOR}`;

export const SITE_URL = "https://www.spectralflow.ai";
export const LINKEDIN_URL = "https://www.linkedin.com/company/spectralflow";

/** Date that dated counts and the "where we stand" timeline refer to. */
export const FACTS_AS_OF = "October 2026";

/* ----- Patents ------------------------------------------------------- */

export const PATENT_APPLICATIONS = 17;
/** Undated, number-free line for permanent surfaces. */
export const PATENT_LINE = "Patent applications filed in 2026";
/** Dated detail, for Company, Press and the news archive. */
export const PATENT_DETAIL =
  "Seventeen patent applications filed in 2026: sixteen UK provisional, one French.";

/** @deprecated kept until every page migrates. Use PATENT_APPLICATIONS or PATENT_LINE. */
export const PATENT_FAMILIES = PATENT_APPLICATIONS;
/** @deprecated kept until every page migrates. Use PATENT_LINE. */
export const PATENT_FAMILIES_LABEL = PATENT_LINE;

/* ----- Stage --------------------------------------------------------- */

export const STAGE_LINE =
  "Our first mobile prototype is designed; assembly starts once funding is confirmed.";

/* ----- Company on paper ---------------------------------------------- */

/** Date of registration (ISO). */
export const REGISTERED = "2026-04-02";
export const REGISTERED_LABEL = "2 April 2026";
export const RCS = "RCS Nice 103 022 588";
export const SIREN = "103 022 588";

export const ADDRESS = {
  street: "14 Avenue de la Grande-Bretagne",
  postalCode: "06230",
  locality: "Villefranche-sur-Mer",
  country: "France",
  countryCode: "FR",
} as const;

export const ADDRESS_LINES = [
  ADDRESS.street,
  `${ADDRESS.postalCode} ${ADDRESS.locality}, ${ADDRESS.country}`,
] as const;

export const FOUNDER = {
  name: "Alexandre Papa",
  role: "Founder and President",
} as const;

/* ----- Third-party context figures ------------------------------------ */

/**
 * Context figures from third parties, each with its exact source. These
 * are the only figures the site quotes besides the patent count.
 * `figure` is our short wording of the number, safe to print as is;
 * `quote` is the source's exact words, for a pull quote or a tooltip.
 * Print either one next to a SourceNote built from the same entry, and
 * never edit a figure without re-reading the source.
 */
export type ContextSource = {
  id: string;
  org: string;
  /** Human date of the source, as it should be printed. */
  dateLabel: string;
  title: string;
  figure: string;
  quote: string;
  href: string;
};

export const CONTEXT_SOURCES: ContextSource[] = [
  {
    id: "iata-2025-safety-report",
    org: "IATA",
    dateLabel: "9 March 2026",
    title: "IATA Releases 2025 Safety Report",
    figure: "Reported jamming events rose 67% in 2025 compared with 2023, and reported GPS spoofing incidents 193%.",
    quote:
      "Reported jamming events in 2025 increased by 67% compared to 2023 while reported GPS spoofing incidents rose by 193%.",
    href: "https://www.iata.org/en/pressroom/2026-releases/2026-03-09-01/",
  },
  {
    id: "iata-agm-2026",
    org: "IATA",
    dateLabel: "June 2026",
    title: "Media Briefing Safety & Operations, AGM 2026",
    figure:
      "More than 71,000 reported interference cases and 2.1 million GPS signal-loss events in IATA's GNSS interference report for 2024 and 2025.",
    quote:
      "More than 71,000 reported interference cases; 2.1 million GPS signal-loss events; 31.8 million abnormal satellite navigation events; and 1,171 official aviation alerts.",
    href: "https://www.iata.org/en/iata-repository/pressroom/presentations/media-briefing-safety-operations-agm-2026/",
  },
  {
    id: "easa-iata-2025",
    org: "EASA and IATA",
    dateLabel: "18 June 2025",
    title: "EASA and IATA outline comprehensive plan to mitigate GNSS interference risks",
    figure: "GPS signal-loss events rose 220% between 2021 and 2024.",
    quote:
      "The number of GPS signal loss events increased by 220% between 2021 and 2024 according to IATA's data from the Global Aviation Data Management Flight Data eXchange.",
    href: "https://www.easa.europa.eu/newsroom-and-events/press-releases/easa-and-iata-outline-comprehensive-plan-mitigate-gnss",
  },
  {
    id: "easa-eurocontrol-plan-2026",
    org: "EASA and EUROCONTROL",
    dateLabel: "March 2026",
    title: "European Aviation Action Plan for Ensuring Safe Operations during GNSS Interferences",
    figure:
      "After a letter from 13 EU Member States, Europe's aviation action plan aims to contain the threat for at least the next three years.",
    quote:
      "Following a letter from 13 Member States to the European Commission on June 6, 2025 [...] containing the threat for at least the next 3 years.",
    href: "https://www.eurocontrol.int/publication/european-aviation-action-plan-ensuring-safe-operations-during-gnss-interferences",
  },
  {
    id: "opsgroup-2024",
    org: "OPSGROUP",
    dateLabel: "6 September 2024",
    title: "Report of the 2024 GPS Spoofing Workgroup",
    figure: "By August 2024, about 1,500 flights a day were being spoofed, up from about 300 in January.",
    quote: "By January 2024, an average of 300 flights a day were being spoofed. By August 2024, this had grown to around 1500 flights per day.",
    href: "https://ops.group/dashboard/wp-content/uploads/2024/09/GPS-Spoofing-Final-Report-OPSGROUP-WG-OG24.pdf",
  },
];

export function getSource(id: string): ContextSource | undefined {
  return CONTEXT_SOURCES.find((s) => s.id === id);
}

/* ----- Deprecated ---------------------------------------------------- */

/** @deprecated kept until every page migrates. */
export const VERTICALS = 5;
