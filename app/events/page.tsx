import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import EventCard from "../components/EventCard";
import NewsCard from "../components/NewsCard";
import { Prose, Cinema, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import { BRAND, SITE_URL } from "../lib/facts";
import { EVENTS, pastEvents, todayISO, upcomingEvents, type SiteEvent } from "../lib/events";
import { POSTS } from "../lib/news";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/events";
const DESCRIPTION =
  "Where to meet Spectral Flow in person: the events we pitch at and attend, and how to book a time to fly our mission demo with us.";

export const metadata: Metadata = {
  title: "Events",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: `Events · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Events · ${BRAND}`,
    description: DESCRIPTION,
  },
};

/**
 * Regenerated at most once a day, on the first visit after the period
 * expires, so an event moves to "Past" shortly after it ends.
 */
export const revalidate = 86400;

/* ----- Structured data ----------------------------------------------- */

/** ISO 3166-1 alpha-2 codes for the countries in EVENTS. */
const COUNTRY_CODE: Record<string, string> = {
  France: "FR",
  Germany: "DE",
};

function eventJsonLd(e: SiteEvent) {
  const us = { "@id": `${SITE_URL}/#org` };
  const onStage = e.role === "Pitching" || e.role === "Speaking" || e.role === "Exhibiting";
  return {
    "@type": "Event",
    "@id": `${SITE_URL}${PAGE_PATH}#${e.slug}`,
    name: e.name,
    description: e.blurb,
    startDate: e.start,
    endDate: e.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.city,
        addressCountry: COUNTRY_CODE[e.country] ?? e.country,
      },
    },
    url: e.href ?? `${SITE_URL}${PAGE_PATH}#${e.slug}`,
    ...(onStage ? { performer: us } : { attendee: us }),
  };
}

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}${PAGE_PATH}#page`,
      url: `${SITE_URL}${PAGE_PATH}`,
      name: `Events · ${BRAND}`,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
    },
    ...EVENTS.map(eventJsonLd),
  ],
};

/* ----- Page ---------------------------------------------------------- */

const MEET_POINTS = [
  {
    t: "Fly a mission with us",
    d: "We bring the mission demo on a laptop: a full navigation chain without satellites, flown in simulation, every figure model-derived. Choose a situation and see each position with its error bound.",
  },
  {
    t: "Talk about a programme",
    d: "Tell us your platform and your mission. We will look together at where magnetic navigation fits, and at what a study or a programme would involve.",
  },
  {
    t: "Invite us",
    d: "If you organise an event on navigation, quantum sensing or space, we are glad to present our work or to bring the demo.",
  },
];

export default function EventsPage() {
  const today = todayISO();
  const upcoming = upcomingEvents(today);
  const past = pastEvents(today);
  const eventNews = POSTS.filter((p) => p.tag === "Event").slice(0, 4);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />

      <PageHeader
        eyebrow="Events"
        title="Where to meet us."
        intro="We take our mission demo to the events below. Meet us there to fly a mission together, or to talk about a programme."
      />

      {/* Upcoming */}
      <Prose id="upcoming">
        <Reveal>
          <Eyebrow>Upcoming</Eyebrow>
          <H2 className="max-w-3xl mb-12">Next on the calendar.</H2>
        </Reveal>

        {upcoming.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 80}>
                <div id={e.slug} className="h-full">
                  <EventCard event={e} today={today} contactHref="/contact" />
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Body className="max-w-2xl">
            No event is scheduled right now. New dates appear here once they are confirmed, and you
            can always write to us to meet.
          </Body>
        )}
      </Prose>

      {/* Meet us */}
      <Cinema id="meet">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Meet us</Eyebrow>
            <H2 className="mb-6">Book a time before the day.</H2>
            <Lead className="mb-8">
              Write to us with the event, your organisation and what you work on. We will propose a
              time and bring the demo.
            </Lead>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href="/contact" className="btn-primary self-start">
                Request a meeting <span aria-hidden>→</span>
              </Link>
              <Link href="/instrument" className="textlink">
                Fly a mission now <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-8">
            {MEET_POINTS.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 80}>
                <div className="hairline pt-6">
                  <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                    {p.t}
                  </h3>
                  <Body>{p.d}</Body>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Cinema>

      {/* Past */}
      {past.length > 0 && (
        <Prose id="past">
          <Reveal>
            <Eyebrow>Past</Eyebrow>
            <H2 className="max-w-3xl mb-12">Where we have been.</H2>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {past.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 80}>
                <div id={e.slug} className="h-full">
                  <EventCard event={e} today={today} />
                </div>
              </Reveal>
            ))}
          </ul>
        </Prose>
      )}

      {/* Event news */}
      {eventNews.length > 0 && (
        <Prose id="news">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-start">
            <Reveal>
              <Eyebrow>From the news</Eyebrow>
              <H2 className="mb-6">Notes from events.</H2>
              <Link href="/news" className="textlink">
                All news <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              {eventNews.map((p) => (
                <NewsCard key={p.slug} post={p} variant="row" />
              ))}
            </div>
          </div>
        </Prose>
      )}
    </main>
  );
}
