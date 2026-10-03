import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";
import DuotonePhoto from "../components/DuotonePhoto";
import Supporters from "../components/Supporters";
import VerticalIcon from "../components/VerticalIcon";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import {
  ADDRESS,
  BRAND,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  PATENT_APPLICATIONS,
  PATENT_DETAIL,
  RCS,
  REGISTERED_LABEL,
  SITE_URL,
  STAGE_LINE, SHARE_IMAGE } from "../lib/facts";
import { NAV } from "../lib/nav";
import { getPost } from "../lib/news";
import { RESEARCH_PARTNERS_LINE } from "../lib/supporters";

const PAGE_PATH = "/company";
const DESCRIPTION =
  "Spectral Flow designs diamond quantum sensors, navigation first. Where we stand, the founder, support and memberships, patent applications and careers.";

export const metadata: Metadata = {
  title: "Company",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Company · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Company · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}${PAGE_PATH}#page`,
  url: `${SITE_URL}${PAGE_PATH}`,
  name: `Company · ${BRAND}`,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#org` },
  mainEntity: { "@id": `${SITE_URL}/#org` },
};

/* ----- On this page ------------------------------------------------- */

const SECTIONS = [
  { id: "vision", label: "Vision" },
  { id: "where-we-stand", label: "Where we stand" },
  { id: "team", label: "Team" },
  { id: "support", label: "Support and memberships" },
  { id: "patents", label: "Patents" },
  { id: "careers", label: "Careers" },
];

/* ----- Applications, from the menu ----------------------------------- */

/** One line per application card on this page, keyed by route slug. */
const APPLICATION_LINE: Record<string, string> = {
  navigation: "Positioning you can trust without GPS.",
  "life-sciences": "Magnetic resonance on small samples, and the magnetic signature of cells.",
  semiconductors: "Seeing current paths and buried defects, without damage.",
  "quantum-computing": "Spin control at room temperature.",
};

const APPLICATIONS = (NAV.find((s) => s.label === "Applications")?.links ?? []).map((l) => {
  const slug = l.href.split("/").pop() ?? "";
  return { label: l.label, href: l.href, slug, line: APPLICATION_LINE[slug] };
});

/* ----- Where we stand ------------------------------------------------ */

type Status = "done" | "now" | "next";

type Milestone = {
  status: Status;
  /** Printed date; omitted for undated steps, which show their status only. */
  when?: string;
  /** Machine-readable month (yyyy-mm), when the step is dated. */
  dateTime?: string;
  title: string;
  body?: string;
  link?: { href: string; label: string };
};

/** Link to a news article, only if the article exists. */
function newsLink(slug: string, label: string): Milestone["link"] {
  return getPost(slug) ? { href: `/news/${slug}`, label } : undefined;
}

const MILESTONES: Milestone[] = [
  {
    status: "done",
    when: "April 2026",
    dateTime: "2026-04",
    title: `${LEGAL_NAME} registered`,
  },
  {
    status: "done",
    when: "June 2026",
    dateTime: "2026-06",
    title: "Navigation simulation online",
    body: "Our sensor design flies complete missions in simulation, from the magnetic terrain to the navigation filter. The simulation is still to be calibrated against hardware, and every figure is model-derived.",
    link: newsLink("navigation-simulation-online", "About the simulation"),
  },
  {
    status: "done",
    when: "June 2026",
    dateTime: "2026-06",
    title: "Member of NVIDIA Inception and of the Google for Startups Cloud Program",
  },
  {
    status: "done",
    when: "July 2026",
    dateTime: "2026-07",
    title: "Mission demos open to everyone",
    body: "Anyone can fly a mission in the browser, with no account.",
    link: { href: "/instrument", label: "Fly a mission" },
  },
  {
    status: "done",
    when: "July 2026",
    dateTime: "2026-07",
    title: "Qualified as a deeptech company by Bpifrance",
    link: newsLink("qualified-deeptech-bpifrance", "About the qualification"),
  },
  {
    status: "done",
    when: "September 2026",
    dateTime: "2026-09",
    title: "Seventeenth patent application, filed in France",
    link: { href: "#patents", label: "Patent applications" },
  },
  {
    status: "now",
    when: FACTS_AS_OF,
    /** The same month as FACTS_AS_OF: update both together. */
    dateTime: "2026-10",
    title: "First mobile prototype designed",
    body: "The sensor, the electronics that drive and read it, and the mechanics that carry them on a moving vehicle.",
    link: newsLink("first-mobile-prototype-designed", "About the prototype"),
  },
  {
    status: "next",
    title: "Assembly and first tests",
    body: "First measurements on the assembled prototype, then tests on the move.",
  },
];

const STATUS_LABEL: Record<Status, string> = {
  done: "Done",
  now: "Now",
  next: "Next",
};

function Dot({ status }: { status: Status }) {
  const base = "absolute left-0 top-[0.3rem] block h-[11px] w-[11px] rounded-full";
  if (status === "now") {
    return (
      <span
        aria-hidden
        className={base}
        style={{ background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }}
      />
    );
  }
  if (status === "next") {
    return (
      <span
        aria-hidden
        className={base}
        style={{ background: "var(--background)", border: "1.5px dashed var(--border-strong)" }}
      />
    );
  }
  return <span aria-hidden className={base} style={{ background: "var(--text-primary)" }} />;
}

/* ----- The company on paper ----------------------------------------- */

const ON_PAPER: { k: string; v: ReactNode }[] = [
  {
    k: "Legal entity",
    v: (
      <>
        {LEGAL_NAME}, <span lang="fr">société par actions simplifiée</span>
      </>
    ),
  },
  { k: "Trade register", v: RCS },
  { k: "Registered on", v: REGISTERED_LABEL },
  { k: "Registered office", v: `${ADDRESS.locality}, ${ADDRESS.country}` },
  { k: "President", v: FOUNDER.name },
];

export default function Company() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />

      <PageHeader
        eyebrow="Company"
        title={
          <>
            One diamond platform,
            <br className="hidden md:block" /> many instruments.
          </>
        }
        intro="Spectral Flow designs quantum sensors based on nitrogen-vacancy centres in diamond. Navigation comes first: positions you can trust without GPS, each with its error bound."
      />

      {/* On this page */}
      <nav aria-label="On this page" className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm transition-colors text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Vision */}
      <Prose id="vision">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Vision</Eyebrow>
            <H2 className="mb-6">Navigation first, then other instruments.</H2>
            <Lead className="mb-5">
              A nitrogen-vacancy centre is a defect in diamond that behaves like a tiny compass you
              read with light. It works at room temperature, and the same sensing core can serve
              very different instruments.
            </Lead>
            <Body className="mb-4">
              We start with navigation: an instrument that reads the Earth&rsquo;s magnetic field
              and returns each position with its error bound. The same diamond can also serve life
              sciences, semiconductors and industry, and quantum computing. Those applications
              follow navigation, each at its own pace.
            </Body>
            <Body>
              We design the sensor, its electronics and its software, with European research
              laboratories.
            </Body>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPLICATIONS.map((a, i) => (
              <Reveal as="li" key={a.href} delay={i * 80}>
                <Link href={a.href} className="card p-6 h-full flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <VerticalIcon slug={a.slug} />
                    {i === 0 && <span className="figure-label is-plain">First application</span>}
                  </div>
                  <h3
                    className="font-semibold text-lg mt-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {a.label}
                  </h3>
                  {a.line && <Body>{a.line}</Body>}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Prose>

      {/* Where we stand */}
      <Prose id="where-we-stand">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Where we stand</Eyebrow>
            <H2 className="mb-6">What is done, and what comes next.</H2>
            <Lead className="mb-6">{STAGE_LINE}</Lead>
            <p className="figure-label is-plain">As of {FACTS_AS_OF}</p>
          </Reveal>

          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px"
              style={{ background: "var(--border-strong)" }}
            />
            <ol className="relative" aria-label={`Milestones, as of ${FACTS_AS_OF}`}>
              {MILESTONES.map((m, i) => (
                <Reveal
                  as="li"
                  key={`${m.when ?? m.status}-${m.title}`}
                  delay={i * 50}
                  className="relative pl-9 pb-9 last:pb-0"
                >
                  <Dot status={m.status} />
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {m.when && (
                      <span className="figure-label is-plain">
                        {m.dateTime ? <time dateTime={m.dateTime}>{m.when}</time> : m.when}
                      </span>
                    )}
                    {m.status === "done" ? (
                      <span className="sr-only">{STATUS_LABEL.done}</span>
                    ) : (
                      <span
                        className="figure-label"
                        style={{ color: m.status === "now" ? "var(--accent)" : "var(--muted)" }}
                      >
                        {STATUS_LABEL[m.status]}
                      </span>
                    )}
                  </p>
                  <h3
                    className="font-semibold text-[17px] leading-snug mt-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {m.title}
                  </h3>
                  {m.body && <Body className="mt-1.5 max-w-xl">{m.body}</Body>}
                  {m.link && (
                    <Link href={m.link.href} className="textlink mt-2">
                      {m.link.label} <span aria-hidden>→</span>
                    </Link>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Prose>

      {/* Team */}
      <Prose id="team">
        <Reveal>
          <Eyebrow>Team</Eyebrow>
          <H2 className="max-w-3xl mb-12">A founder from business, working with research laboratories.</H2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <Reveal>
            <DuotonePhoto
              src="/founder-alexandre-papa.jpg"
              alt={`${FOUNDER.name}, founder of ${BRAND}`}
              width={170}
              height={170}
              sizes="160px"
              className="w-40"
            />
            <h3 className="font-semibold mt-4" style={{ color: "var(--text-primary)" }}>
              {FOUNDER.name}
            </h3>
            <p className="figure-label is-plain mt-1">{FOUNDER.role}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-2xl">
              <Lead className="mb-5">
                {FOUNDER.name} founded {BRAND} in {ADDRESS.locality}, on the French Riviera.
              </Lead>
              <Body className="mb-4">
                He spent twenty-five years in finance and operations: deputy to the chief financial
                officer of an 11,000-person group, then interim chief financial officer of smaller
                companies. That work taught him that the hardest problems live at the seams between
                disciplines.
              </Body>
              <Body className="mb-4">
                In November 2025 he read his first papers on diamond quantum sensing. He did not ask
                what the sensor could do, but where it would be worth the most. The answer was
                navigation.
              </Body>
              <Body>
                His operating rule comes from aviation history: no Concordes. Every instrument must
                also make commercial sense.
              </Body>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="hairline mt-14 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">Research laboratories</h3>
            <div className="max-w-2xl">
              <Body className="mb-3">{RESEARCH_PARTNERS_LINE}</Body>
              <Link href="/contact" className="textlink">
                Laboratories, write to us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="hairline mt-10 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">The company on paper</h3>
            <div className="max-w-2xl">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                {ON_PAPER.map((r) => (
                  <div key={r.k}>
                    <dt className="figure-label is-plain">{r.k}</dt>
                    <dd className="text-[15px] leading-7 mt-1" style={{ color: "var(--text-secondary)" }}>
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Body className="mt-7">
                Full company and hosting details are in our{" "}
                <Link href="/legal" className="underline underline-offset-2 hover:text-[var(--text-primary)]">
                  legal notice
                </Link>
                .
              </Body>
            </div>
          </div>
        </Reveal>
      </Prose>

      {/* Support and memberships */}
      <Prose id="support">
        <Reveal>
          <Eyebrow>Support and memberships</Eyebrow>
          <H2 className="max-w-3xl mb-10">Recognitions, memberships and selections.</H2>
        </Reveal>
        <Reveal delay={80}>
          <Supporters variant="full" heading={null} showResearchLine={false} />
        </Reveal>
      </Prose>

      {/* Patents */}
      <Prose id="patents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Patents</Eyebrow>
            <H2 className="mb-6">Patent-pending.</H2>
            <Body className="mb-5 max-w-lg">
              {PATENT_DETAIL} Their content is not public.
            </Body>
            <p className="figure-label is-plain">As of {FACTS_AS_OF}</p>
          </Reveal>
          <Reveal delay={100}>
            <dl
              className="rounded-[var(--radius)] p-7 md:p-9"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-col-reverse gap-3">
                <dt className="figure-label is-plain">Patent applications filed in 2026</dt>
                <dd
                  className="display text-5xl md:text-6xl tabular-nums"
                  style={{ color: "var(--text-primary)" }}
                >
                  {PATENT_APPLICATIONS}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Prose>

      {/* Careers */}
      <Prose id="careers">
        <Reveal>
          <Eyebrow>Careers</Eyebrow>
          <H2 className="max-w-3xl mb-6">Internships and engineering roles, from 2027.</H2>
          <Lead className="max-w-2xl">
            We are a small team. In 2027 we will open internships in diamond nanofabrication and
            quantum sensing, and engineering roles. We also welcome spontaneous applications from
            researchers and postdocs whose work is closely aligned with ours: diamond growth and
            nanofabrication, spin physics, photonics and magnetic navigation.{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-current"
              style={{ color: "var(--accent)" }}
            >
              Write to us
            </Link>
            .
          </Lead>
        </Reveal>
      </Prose>

      {/* Press */}
      <Prose>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <Eyebrow>Press</Eyebrow>
              <H2 className="max-w-2xl mb-4">Writing about {BRAND}?</H2>
              <Body className="max-w-xl">
                Facts, boilerplate, the mark to download and a press contact, in one place.
              </Body>
            </div>
            <Link href="/press" className="btn-ghost">
              Open the press kit <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
