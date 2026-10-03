// fr-source: app/events/page.tsx sha256:ebad0bb8417b6125
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import EventCard from "../../components/EventCard";
import NewsCard from "../../components/NewsCard";
import { Prose, Cinema, Eyebrow, H2, Lead, Body, PageHeader } from "../../components/kit";
import { BRAND, SITE_URL } from "../../lib/facts";
import { SHARE_IMAGE } from "../../lib/fr/facts";
import { EVENTS, pastEvents, todayISO, upcomingEvents, type SiteEvent } from "../../lib/fr/events";
import { POSTS } from "../../lib/fr/news";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/fr/events";
const DESCRIPTION =
  "Où rencontrer Spectral Flow en personne : les événements où nous présentons notre projet et ceux auxquels nous assistons, et comment prendre rendez-vous pour piloter avec nous notre mission de démonstration.";

export const metadata: Metadata = {
  title: "Événements",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH, languages: { en: "/events", fr: PAGE_PATH } },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Événements · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Événements · ${BRAND}`,
    description: DESCRIPTION,
  },
};

/**
 * Regenerated at most once a day, on the first visit after the period
 * expires, so an event moves to "Past" shortly after it ends.
 */
export const revalidate = 86400;

/* ----- Structured data ----------------------------------------------- */

/** ISO 3166-1 alpha-2 codes for the countries in EVENTS (English or French name). */
const COUNTRY_CODE: Record<string, string> = {
  France: "FR",
  Germany: "DE",
  Allemagne: "DE",
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
      name: `Événements · ${BRAND}`,
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
    },
    ...EVENTS.map(eventJsonLd),
  ],
};

/* ----- Page ---------------------------------------------------------- */

const MEET_POINTS = [
  {
    t: "Piloter une mission avec nous",
    d: "Nous apportons la mission de démonstration sur un ordinateur portable : une chaîne de navigation complète sans satellites, jouée en simulation, chaque chiffre issu du modèle. Choisissez une situation et voyez chaque position avec sa borne d’erreur.",
  },
  {
    t: "Parler d’un programme",
    d: "Décrivez-nous votre plateforme et votre mission. Nous verrons ensemble où la navigation magnétique trouve sa place, et ce qu’impliquerait une étude ou un programme.",
  },
  {
    t: "Invitez-nous",
    d: "Si vous organisez un événement sur la navigation, les capteurs quantiques ou l’espace, nous présenterons volontiers notre travail ou apporterons la démonstration.",
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
        eyebrow="Événements"
        title="Où nous rencontrer."
        intro="Nous emmenons notre mission de démonstration aux événements ci-dessous. Retrouvez-nous sur place pour piloter une mission ensemble, ou pour parler d’un programme."
      />

      {/* Upcoming */}
      <Prose id="upcoming">
        <Reveal>
          <Eyebrow>À venir</Eyebrow>
          <H2 className="max-w-3xl mb-12">Les prochaines dates.</H2>
        </Reveal>

        {upcoming.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 80}>
                <div id={e.slug} className="h-full">
                  <EventCard event={e} today={today} contactHref="/fr/contact" lang="fr" />
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Body className="max-w-2xl">
            Aucun événement n’est prévu pour le moment. Les nouvelles dates s’affichent ici dès
            qu’elles sont confirmées, et vous pouvez toujours nous écrire pour nous rencontrer.
          </Body>
        )}
      </Prose>

      {/* Meet us */}
      <Cinema id="meet">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Nous rencontrer</Eyebrow>
            <H2 className="mb-6">Prenez rendez-vous avant le jour&nbsp;J.</H2>
            <Lead className="mb-8">
              Écrivez-nous en indiquant l’événement, votre organisation et ce sur quoi vous
              travaillez. Nous vous proposerons un créneau et apporterons la démonstration.
            </Lead>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href="/fr/contact" className="btn-primary self-start">
                Demander un rendez-vous <span aria-hidden>→</span>
              </Link>
              <Link href="/instrument" hrefLang="en" className="textlink">
                Piloter une mission maintenant (en anglais) <span aria-hidden>→</span>
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
            <Eyebrow>Passés</Eyebrow>
            <H2 className="max-w-3xl mb-12">Où nous sommes allés.</H2>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {past.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 80}>
                <div id={e.slug} className="h-full">
                  <EventCard event={e} today={today} contactHref="/fr/contact" lang="fr" />
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
              <Eyebrow>Dans les actualités</Eyebrow>
              <H2 className="mb-6">Retours d’événements.</H2>
              <Link href="/fr/news" className="textlink">
                Toutes les actualités <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              {eventNews.map((p) => (
                <NewsCard key={p.slug} post={p} variant="row" lang="fr" />
              ))}
            </div>
          </div>
        </Prose>
      )}
    </main>
  );
}
