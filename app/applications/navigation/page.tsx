import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import Steps from "../../components/Steps";
import GnssMap from "../../components/GnssMap";
import ErrorBound from "../../components/ErrorBound";
import SourceNote from "../../components/SourceNote";
import DuotoneClip from "../../components/DuotoneClip";
import NewsCard from "../../components/NewsCard";
import VerticalGlyph from "../../components/VerticalGlyph";
import { Prose, Cinema, Plate, Eyebrow, H2, Lead, Body } from "../../components/kit";
import {
  BRAND,
  FACTS_AS_OF,
  PATENT_DETAIL,
  SITE_URL,
  STAGE_LINE,
  getSource,
  type ContextSource,
} from "../../lib/facts";
import { getPost, type Post } from "../../lib/news";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/applications/navigation";
const META_TITLE = "Navigation without GPS";
const SHARE_TITLE = `Navigation that knows how wrong it can be · ${BRAND}`;
/** Short enough for search results. */
const DESCRIPTION =
  "Diamond quantum magnetometers for navigation where satellite positioning cannot be trusted. Each position comes with its error bound.";
/** Longer version for share cards. */
const SHARE_DESCRIPTION =
  "Spectral Flow designs diamond quantum magnetometers for navigation where satellite positioning cannot be trusted. The instrument reads the Earth's magnetic field, matches it to a map and returns each position with its error bound.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

/* ----- Content ------------------------------------------------------- */

const ON_THIS_PAGE = [
  { id: "problem", label: "The problem" },
  { id: "bound", label: "The error bound" },
  { id: "how", label: "How it works" },
  { id: "situations", label: "Situations" },
  { id: "offer", label: "What we offer" },
  { id: "faq", label: "FAQ" },
];

/** Third-party context figures shown next to the map (ids from facts.ts). */
const FIGURE_SOURCES = ["iata-2025-safety-report", "iata-agm-2026", "opsgroup-2024"];
const POLICY_SOURCE = "easa-eurocontrol-plan-2026";

const PROBLEM_POINTS = [
  {
    t: "Denied or faked",
    d: "Jamming drowns the satellite signal. Spoofing replaces it with a false one that can look perfectly healthy.",
  },
  {
    t: "The fallback drifts",
    d: "Without satellites, the vehicle falls back on its inertial unit. Its error grows from the moment the signal is lost.",
  },
  {
    t: "No check on the error",
    d: "The inertial unit's own estimate of its error keeps growing, and without an outside reference nothing can check it.",
  },
];

const BOUND_POINTS = [
  {
    t: "A position and its bound",
    d: "Every fix comes with its error bound: where the vehicle is, and how wrong that can be.",
  },
  {
    t: "Integrity",
    d: "The instrument says when not to trust it, instead of passing on a confident error.",
  },
  {
    t: "Declared by the instrument",
    d: "The bound is declared by the instrument itself. Certifying it is the work of a programme, with its users and its authority.",
  },
];

const HOW_STEPS = [
  {
    n: "01",
    t: "Sense",
    d: "The diamond sensor reads the Earth's magnetic field as a full vector, at room temperature.",
  },
  {
    n: "02",
    t: "Reject",
    d: "The vehicle carries its own magnetic field: motors, currents, steel. The instrument rejects it on board, in real time.",
  },
  {
    n: "03",
    t: "Match",
    d: "The cleaned readings along the track are matched against a magnetic anomaly map. The fix corrects the drift of the inertial unit.",
  },
  {
    n: "04",
    t: "Bound",
    d: "Every fix comes with its error bound. Between fixes, the inertial unit carries the position and the bound grows.",
  },
];

const HOW_POINTS = [
  {
    t: "Completes the inertial unit",
    d: "The inertial unit gives a smooth, continuous estimate. Each magnetic fix pulls its drift back.",
  },
  {
    t: "Passive",
    d: "It reads the Earth's own field and needs no external signal.",
  },
  {
    t: "Built on diamond",
    d: "Room temperature. Survives the platform. Four crystal axes: the vector comes from the lattice.",
    link: { href: "/technology#diamond", label: "Why diamond" },
  },
];

type Situation = {
  label: string;
  title: string;
  body: string;
  status: string[];
  photo: { src: string; alt: string; position?: string };
  clip: { poster: string; sources: { src: string; type: string }[] };
  link?: { href: string; label: string };
};

/** Neutral order: survey and exploration, at sea, in the air, in space. */
const SITUATIONS: Situation[] = [
  {
    label: "Survey and exploration",
    title: "A bounded position for every reading.",
    body: "An airborne magnetic survey is only as good as the position of each reading and the quiet of the platform. The instrument is designed for both: it rejects the aircraft's own field on board and keeps each position within its bound, including where satellite positioning is lost.",
    status: ["Mission demo available", "Model-derived"],
    photo: {
      src: "/img/v3/estuary-16x9.webp",
      alt: "A civilian survey drone flying low over a desert plain.",
    },
    clip: { poster: "/video/situations/survey-poster.webp", sources: [{ src: "/video/situations/survey.webm", type: "video/webm" }, { src: "/video/situations/survey.mp4", type: "video/mp4" }] },
    link: { href: "/instrument?profile=geo", label: "Fly the survey" },
  },
  {
    label: "At sea",
    title: "Out of reach of satellites, still inside the field.",
    body: "Ships report interference with satellite positioning in several sea areas, and the drones that survey ports and coasts rely on it too. Under water, satellite signals never arrive at all. The Earth's magnetic field reaches all of them.",
    status: ["In our design scope", "No mission demo yet"],
    photo: {
      src: "/img/v3/port-drone.webp",
      alt: "A research vessel crossing open sea, seen from above.",
    },
    clip: { poster: "/video/situations/sea-poster.webp", sources: [{ src: "/video/situations/sea.mp4", type: "video/mp4" }] },
  },
  {
    label: "In the air",
    title: "Through jammed and spoofed airspace.",
    body: "Aircraft and drones cross regions where satellite signals are jammed or spoofed. The magnetic signature of the ground below does not depend on any of those signals.",
    status: ["Mission demo available", "Model-derived"],
    photo: {
      src: "/img/v3/air.webp",
      alt: "An airliner above the clouds at dusk.",
    },
    clip: { poster: "/video/situations/air-poster.webp", sources: [{ src: "/video/situations/air.webm", type: "video/webm" }, { src: "/video/situations/air.mp4", type: "video/mp4" }] },
    link: { href: "/instrument", label: "Fly a mission" },
  },
  {
    label: "In space",
    title: "Beyond the reach of satellite navigation.",
    body: "No navigation satellite orbits Mars. Its crust keeps a fossil magnetic field in places, and our mission demo flies a scout on it.",
    status: ["Mission demo available", "Model-derived"],
    photo: {
      src: "/img/v3/smallsat.webp",
      alt: "A small spacecraft above a planet.",
    },
    clip: { poster: "/video/situations/space-poster.webp", sources: [{ src: "/video/situations/space.webm", type: "video/webm" }, { src: "/video/situations/space.mp4", type: "video/mp4" }] },
    link: { href: "/instrument?profile=space", label: "Fly the Mars scout" },
  },
];

const OFFERS = [
  {
    t: "Programmes",
    d: "With navigation integrators and programme owners, we develop the instrument for your platform and your mission, inside your programme.",
  },
  {
    t: "Feasibility and integration studies",
    d: "We study whether magnetic navigation can work on your platform and over your area, on your mission profile, in simulation, before any hardware is fitted.",
  },
  {
    t: "Expert simulation sessions",
    d: "Your mission flown end to end in our simulation, with us. The simulation is still being calibrated: it is useful in relative terms, to compare options, not to promise a figure.",
  },
];

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

type FaqItem = { q: string; a: string; link?: { href: string; label: string } };

/**
 * Plain text on purpose: the same strings feed the page and the FAQPage
 * data. An optional link is shown on the page only.
 */
const FAQ: FaqItem[] = [
  {
    q: "Does it replace GNSS?",
    a: "No. Where satellite positioning works and can be trusted, it stays the reference. Our instrument is designed for when it cannot be: jammed, spoofed or out of reach. It is designed to give a second source of position that needs no external signal, and to say how wrong that position can be.",
  },
  {
    q: "Does it replace the inertial unit?",
    a: "No. It completes the inertial unit, it does not replace it. The inertial unit gives a smooth, continuous estimate that drifts with time. Each magnetic fix corrects that drift, and each fix comes with its error bound.",
  },
  {
    q: "Can it be spoofed?",
    a: "It is passive: it reads the Earth's own field and needs no external signal. That does not make it immune. A magnetic source placed nearby can disturb a magnetometer. The instrument is designed to detect that and say so. In our mission demo, you can play that attack yourself.",
    link: { href: "/instrument", label: "Play the attack in the mission demo" },
  },
  {
    q: "What limits it?",
    a: "The map first: a magnetic fix is only as good as the anomaly map it is matched against. Then the vehicle, whose own magnetic field has to be rejected cleanly. And the Sun: during a magnetic storm, the field itself moves. Past a threshold, more sensor sensitivity buys little: the error sits in the vehicle and in the map. What the diamond brings is a full vector from the crystal lattice, on a moving platform, at room temperature. We work on the vehicle and the map as well.",
  },
  {
    q: "What do you sell today?",
    a: "Studies and programme work, not units. We offer feasibility and integration studies on your mission profile and expert simulation sessions, and we look for programmes to join with navigation integrators and programme owners. Units come after, from those programmes.",
  },
  {
    q: "Where are you today?",
    a: `As of ${FACTS_AS_OF}, ${lowerFirst(STAGE_LINE)} The full navigation chain is flown end to end in simulation, and every result we show is model-derived. ${PATENT_DETAIL}`,
  },
];

const RELATED_POSTS = [
  "position-and-its-error-bound",
  "contested-satellite-navigation",
  "the-instrument-is-public",
];

/** JSON for a script tag, with "<" escaped. */
const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/* ----- Page ---------------------------------------------------------- */

function Point({ t, d, children }: { t: string; d: string; children?: ReactNode }) {
  return (
    <div className="hairline pt-6 h-full">
      <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
        {t}
      </h3>
      <Body>{d}</Body>
      {children}
    </div>
  );
}

export default function NavigationPage() {
  const figures = FIGURE_SOURCES.map((id) => getSource(id)).filter(
    (s): s is ContextSource => !!s
  );
  const policy = getSource(POLICY_SOURCE);
  const related = RELATED_POSTS.map((slug) => getPost(slug)).filter((p): p is Post => !!p);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE_URL}/applications` },
      { "@type": "ListItem", position: 3, name: "Navigation", item: `${SITE_URL}${PAGE_PATH}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }}
      />

      {/* ============================ HERO ============================ */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="hero-rise">
              <Eyebrow>Navigation without GPS</Eyebrow>
              <h1
                className="display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.3rem] font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Navigation that knows how wrong it can be
                <span style={{ color: "var(--accent)" }}>.</span>
              </h1>
            </div>
            <div className="hero-rise" style={{ animationDelay: "140ms" }}>
              <Lead className="max-w-xl mt-7">
                Diamond quantum magnetometers for navigation where satellite positioning cannot be
                trusted.
              </Lead>
              <Body className="max-w-xl mt-4">
                The instrument reads the Earth&apos;s magnetic field, matches it to a map and returns
                each position with a guaranteed error bound.
              </Body>
            </div>
            <div className="hero-rise" style={{ animationDelay: "260ms" }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-9">
                <Link href="/instrument" className="btn-primary self-start">
                  Fly a mission <span aria-hidden>→</span>
                </Link>
                <Link href="/contact" className="textlink">
                  Discuss a programme <span aria-hidden>→</span>
                </Link>
              </div>
              <p className="figure-label is-plain mt-9 max-w-xl">{STAGE_LINE}</p>
            </div>
          </div>

          <figure className="hero-rise" style={{ animationDelay: "200ms" }}>
            <div
              className="relative overflow-hidden rounded-[var(--radius)]"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <Image
                src="/img/v3/relief.webp"
                alt="Contour lines of a magnetic anomaly map, with a blue path drawn across them."
                width={2400}
                height={1800}
                sizes="(min-width: 1024px) 44vw, 100vw"
                preload
                className="block w-full h-auto"
              />
            </div>
            <figcaption className="figure-label is-plain mt-4">
              Illustration: a path across the Earth&apos;s magnetic fingerprint.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* On this page */}
      <nav aria-label="On this page" className="hairline">
        <ul className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex flex-wrap gap-x-7 gap-y-3">
          {ON_THIS_PAGE.map((j) => (
            <li key={j.id}>
              <a
                href={`#${j.id}`}
                className="text-sm font-medium transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ========================= THE PROBLEM ========================= */}
      <Cinema id="problem">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2 className="max-w-3xl mb-6">Satellite navigation is now a contested signal.</H2>
          <Lead className="max-w-3xl">
            Jamming and spoofing of satellite navigation now affect whole regions around conflict
            zones, among them the Baltic Sea, the Black Sea, the eastern Mediterranean and the
            Middle East. The live map below is rebuilt every day from aircraft data.
          </Lead>
          <SourceNote
            org="EASA, Safety Information Bulletin 2022-02R4"
            date="3 July 2026"
            title="Global Navigation Satellite System Outage and Alterations Leading to Communication / Navigation / Surveillance Degradation"
            href="https://ad.easa.europa.eu/blob/EASA_SIB_2022_02R4.pdf/SIB_2022-02R4_1"
            className="mt-4 max-w-3xl"
          />
        </Reveal>

        <Reveal delay={100}>
          <GnssMap className="mt-12" />
        </Reveal>

        {figures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            {figures.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div className="card p-6 md:p-7 h-full flex flex-col gap-5">
                  <p
                    className="text-lg leading-snug font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.figure}
                  </p>
                  <SourceNote source={s} className="mt-auto" />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {policy && (
          <Reveal>
            <div className="mt-8 max-w-3xl flex flex-col gap-2">
              <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                {policy.figure}
              </p>
              <SourceNote source={policy} />
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-20">
          {PROBLEM_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="display text-2xl md:text-3xl font-semibold tracking-tight mt-16 max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Where GPS fails, nobody can say how wrong the position is.
          </p>
          <a href="#bound" className="textlink mt-6">
            The error bound <span aria-hidden>→</span>
          </a>
        </Reveal>
      </Cinema>

      {/* ======================== THE ERROR BOUND ======================== */}
      <Prose id="bound">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-end">
          <Reveal>
            <Eyebrow>The error bound</Eyebrow>
            <H2>Not how accurate you were on a good day: how wrong you can be right now.</H2>
          </Reveal>
          <Reveal delay={100}>
            <Lead>
              We return each position with its error bound: the radius the true position is
              designed to stay inside, at a stated risk.
            </Lead>
            <Body className="mt-4">
              Between magnetic fixes the bound widens, as the inertial unit drifts. At each fix it
              tightens again. A guidance system, a pilot or an operator can then decide how far to
              rely on each position.
            </Body>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="plate p-6 md:p-10 mt-12">
            <ErrorBound
              labels={{
                others: "A position on its own",
                ours: "A position with its error bound",
                truth: "True path",
              }}
              ariaLabel="Illustration: along the same path, a position given on its own drifts away with nothing to show its error, while a position given with its error bound stays inside a dashed disc that widens between magnetic fixes and tightens at each fix."
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-14">
          {BOUND_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* ========================= HOW IT WORKS ========================= */}
      <Prose id="how">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <H2 className="mb-6">The Earth has a magnetic fingerprint, and it is mapped.</H2>
            <Lead className="mb-5">
              The rocks of the crust carry a magnetic signature that changes from place to place.
              Geological surveys have mapped much of it for decades, over land and sea, at varying
              resolution.
            </Lead>
            <Body>
              A sensitive magnetometer reads the local field. Matched against the map along the
              track, the readings tell the vehicle where it is and correct the drift of its inertial
              unit. This is magnetic map matching.
            </Body>
          </Reveal>
          <Reveal delay={120}>
            <Plate caption="Readings along the track, matched to the magnetic map, give a fix.">
              <div role="img" aria-label="A vehicle matches its magnetometer readings against a magnetic map to correct its position.">
                <div aria-hidden="true">
                  <VerticalGlyph slug="navigation" />
                </div>
              </div>
            </Plate>
          </Reveal>
        </div>

        <Reveal>
          <p
            className="display text-2xl md:text-3xl font-semibold tracking-tight mt-16 md:mt-20 max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            The map, more than the sensor, sets the value. We work on both.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24">
          <Steps
            eyebrow="Four stages"
            title={
              <>
                From the Earth&rsquo;s field
                <br />
                to a bounded fix.
              </>
            }
            lead="It completes the inertial unit, it does not replace it."
            steps={HOW_STEPS}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-16">
          {HOW_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d}>
                {p.link && (
                  <Link href={p.link.href} className="textlink mt-4">
                    {p.link.label} <span aria-hidden>→</span>
                  </Link>
                )}
              </Point>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* ========================== SITUATIONS ========================== */}
      <Prose id="situations">
        <Reveal>
          <Eyebrow>Situations</Eyebrow>
          <H2 className="max-w-3xl mb-6">Wherever satellite positioning cannot be trusted.</H2>
          <Lead className="max-w-3xl mb-14">
            One instrument, four situations. Each says plainly where it stands: a mission demo is a
            simulation, and everything it shows is model-derived.
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {SITUATIONS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 90} as="article" className="flex flex-col h-full">
              <DuotoneClip
                poster={s.clip.poster}
                sources={s.clip.sources}
                alt={s.photo.alt}
                aspect="16/9"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <p className="eyebrow mt-6 mb-2">{s.label}</p>
              <h3
                className="text-xl md:text-2xl font-semibold tracking-tight leading-snug mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {s.title}
              </h3>
              <Body>{s.body}</Body>
              <ul className="flex flex-wrap items-center gap-2 mt-5" aria-label="Where it stands">
                {s.status.map((st) => (
                  <li key={st} className="pill">
                    {st}
                  </li>
                ))}
              </ul>
              {s.link && (
                <Link href={s.link.href} className="textlink mt-5">
                  {s.link.label} <span aria-hidden>→</span>
                </Link>
              )}
            </Reveal>
          ))}
        </div>

      </Prose>

      {/* ========================= WHAT WE OFFER ========================= */}
      <Prose id="offer">
        <Reveal>
          <Eyebrow>What we offer</Eyebrow>
          <H2 className="max-w-3xl mb-6">A market of programmes first, then units.</H2>
          <Lead className="max-w-3xl mb-14">
            Navigation without satellites is bought through programmes before it is bought by the
            unit. That is where we start, with navigation integrators and programme owners.
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFERS.map((o, i) => (
            <Reveal key={o.t} delay={i * 80}>
              <div className="card p-6 md:p-7 h-full flex flex-col gap-3">
                <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                  {o.t}
                </h3>
                <Body>{o.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mt-12">
            <Link href="/contact" className="btn-primary self-start">
              Discuss a programme <span aria-hidden>→</span>
            </Link>
            <p className="text-[15px] leading-7" style={{ color: "var(--muted)" }}>
              Units come after, from the programmes.
            </p>
          </div>
        </Reveal>
      </Prose>

      {/* ============================== FAQ ============================== */}
      <Prose id="faq">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <H2 className="max-w-3xl mb-12">Questions and objections.</H2>
        </Reveal>
        <div className="flex flex-col">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="hairline py-8 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-3 md:gap-12">
                <h3
                  className="text-lg font-semibold tracking-tight leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {f.q}
                </h3>
                <div>
                  <Body>{f.a}</Body>
                  {f.link && (
                    <Link href={f.link.href} className="textlink mt-4">
                      {f.link.label} <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/company#where-we-stand" className="textlink mt-8">
            Where we stand, dated <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ============================== NEWS ============================== */}
      {related.length > 0 && (
        <Prose>
          <Reveal>
            <Eyebrow>News</Eyebrow>
            <H2 className="max-w-3xl mb-10">More on navigation.</H2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <NewsCard post={p} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/news" className="textlink mt-10">
              All news <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </Prose>
      )}

      {/* =========================== FINAL CALL =========================== */}
      <Cinema>
        <Reveal>
          <Eyebrow>Next step</Eyebrow>
          <H2 className="max-w-3xl mb-6">Fly a mission. Then tell us about yours.</H2>
          <Lead className="max-w-2xl mb-9">
            The mission demo runs in your browser: a full mission without satellite navigation,
            every figure model-derived. If you have a platform, an area or a programme in mind, we
            would like to hear about it.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href="/instrument" className="btn-primary self-start">
              Fly a mission <span aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="btn-ghost self-start">
              Contact us
            </Link>
          </div>
          <p className="text-[15px] leading-7 mt-12" style={{ color: "var(--text-secondary)" }}>
            Navigation is the first application of one diamond platform.{" "}
            <Link href="/applications" className="textlink">
              See the others <span aria-hidden>→</span>
            </Link>
          </p>
        </Reveal>
      </Cinema>
    </main>
  );
}
