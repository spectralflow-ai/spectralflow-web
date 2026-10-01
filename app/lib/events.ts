import type { Logo } from "../components/LogoMark";

/**
 * Events we attend or speak at. Only confirmed participations are listed.
 */

export type EventRole = "Pitching" | "Attending" | "Speaking" | "Exhibiting";

export type SiteEvent = {
  slug: string;
  name: string;
  city: string;
  country: string;
  venue: string;
  /** First day, ISO yyyy-mm-dd. */
  start: string;
  /** Last day, ISO yyyy-mm-dd (same as start for a one-day event). */
  end: string;
  /** Dates as printed. */
  dateLabel: string;
  role: EventRole;
  /** One or two sentences for the card. */
  blurb: string;
  /** Short call to action, printed on the card. */
  ask?: string;
  /** Official event page. */
  href?: string;
  /** Logo of the event or of its organiser. */
  logo?: Logo;
};

export const EVENTS: SiteEvent[] = [
  {
    slug: "tech-tour-quantum-defence-2026",
    name: "Tech Tour Quantum & Defence 2026",
    city: "Berlin",
    country: "Germany",
    venue: "Leonardo Royal Hotel",
    start: "2026-10-08",
    end: "2026-10-09",
    dateLabel: "8 and 9 October 2026",
    role: "Pitching",
    blurb:
      "We were selected to pitch to investors and experts in quantum and defence technologies. Ask us for the live mission demo.",
    ask: "Meet us in Berlin",
    href: "https://techtour.com/ttqd26/",
    logo: { src: "/logos/tech-tour.svg", alt: "Tech Tour", width: 577.5, height: 101.6 },
  },
  {
    slug: "blue-day-maritime-spatial-2026",
    name: "Blue Day Maritime & Space",
    city: "Paris",
    country: "France",
    venue: "CNES",
    start: "2026-10-13",
    end: "2026-10-13",
    dateLabel: "13 October 2026",
    role: "Speaking",
    blurb:
      "A day on space for the maritime world, organised by CNES, GICAN, GIFAS, the SAFE cluster and Pôle Mer Bretagne Atlantique. We speak about quantum magnetic navigation at sea and in space.",
    ask: "Meet us in Paris",
    href: "https://www.pole-mer-bretagne-atlantique.com/agenda-actualites/blue-day-maritime-spatial",
    logo: {
      src: "/logos/pole-mer-bretagne-atlantique.svg",
      alt: "Pôle Mer Bretagne Atlantique",
      width: 102.297,
      height: 49.183,
    },
  },
  {
    slug: "rencontres-du-spatial-region-sud-2026",
    name: "Rencontres du Spatial en Région Sud",
    city: "Cannes",
    country: "France",
    venue: "Palais des Festivals",
    start: "2026-11-19",
    end: "2026-11-19",
    dateLabel: "19 November 2026",
    role: "Attending",
    blurb:
      "The space community of the Région Sud meets in Cannes. Ask us to fly the space profile of our mission demo with you.",
    ask: "Meet us in Cannes",
    logo: { src: "/logos/safe-cluster.png", alt: "SAFE cluster", width: 1001, height: 348 },
  },
];

/** Events whose last day is on or after `today` (ISO yyyy-mm-dd), soonest first. */
export function upcomingEvents(today: string): SiteEvent[] {
  return EVENTS.filter((e) => e.end >= today).sort((a, b) => a.start.localeCompare(b.start));
}

/** Events whose last day is before `today` (ISO yyyy-mm-dd), most recent first. */
export function pastEvents(today: string): SiteEvent[] {
  return EVENTS.filter((e) => e.end < today).sort((a, b) => b.start.localeCompare(a.start));
}

/** Today's date as ISO yyyy-mm-dd, for callers that render at request or build time. */
export function todayISO(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function getEvent(slug: string): SiteEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
