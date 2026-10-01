import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";
import DuotonePhoto from "../components/DuotonePhoto";
import NewsCard from "../components/NewsCard";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL, CTA_PRESS } from "../lib/contact";
import {
  ADDRESS,
  BRAND,
  DESCRIPTOR,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  LINKEDIN_URL,
  PATENT_DETAIL,
  RCS,
  REGISTERED_LABEL,
  SITE_URL,
  STAGE_LINE,
} from "../lib/facts";
import { latestPosts } from "../lib/news";
import {
  RESEARCH_PARTNERS_LINE,
  SUPPORTERS,
  SUPPORTER_KINDS,
  supportersByKind,
  type SupporterKind,
} from "../lib/supporters";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/press";
const DESCRIPTION =
  "Press kit of Spectral Flow, diamond quantum sensors: dated facts, texts to quote, founder bio, logo files and a press contact.";

export const metadata: Metadata = {
  title: "Press kit",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: `Press kit · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Press kit · ${BRAND}`,
    description: DESCRIPTION,
  },
};

/* ----- Texts to quote ------------------------------------------------ */

const ONE_LINE = `${BRAND} designs diamond quantum sensors, starting with navigation you can trust without GPS.`;

const STAGE_THIRD_PERSON = STAGE_LINE.replace(/^Our/, "Its");

/** 50 words. */
const BOILERPLATE_SHORT = `${BRAND} designs diamond quantum sensors. Its first application is navigation you can trust without GPS: an instrument designed to read the Earth's magnetic field, match it to a map and return each position with its error bound. ${STAGE_THIRD_PERSON}`;

/** About 130 words. */
const BOILERPLATE_LONG = [
  `${BRAND} designs diamond quantum sensors. They read magnetic fields with nitrogen-vacancy (NV) centres: atomic-scale defects in diamond that behave like tiny compasses read with light, at room temperature.`,
  "The first application is navigation you can trust without GPS. The instrument is designed to read the Earth's magnetic field, match it to a magnetic anomaly map and return each position with its error bound. It completes the vehicle's inertial unit, it does not replace it. The same diamond platform opens applications in life sciences, semiconductors and quantum computing.",
  `${LEGAL_NAME} was founded on ${REGISTERED_LABEL} in ${ADDRESS.locality}, ${ADDRESS.country}. ${STAGE_THIRD_PERSON} It is qualified as a deeptech company by Bpifrance and is a member of NVIDIA Inception.`,
];

const FOUNDER_ONE_LINE = `${FOUNDER.name} is the founder and president of ${BRAND}, which designs diamond quantum sensors for navigation without GPS.`;

const FOUNDER_BIO = `${FOUNDER.name} is the founder and president of ${BRAND}. He spent twenty-five years in finance and operations: deputy to the chief financial officer of an 11,000-person group, then interim chief financial officer of smaller companies. In November 2025 he read his first papers on diamond quantum sensing. He did not ask what the sensor could do, but where it would be worth the most. The answer was navigation. He registered ${LEGAL_NAME} on ${REGISTERED_LABEL}, in ${ADDRESS.locality}.`;

/* ----- Facts --------------------------------------------------------- */

const siteHost = SITE_URL.replace(/^https?:\/\//, "");

const FACT_LABEL: Record<SupporterKind, string> = {
  Recognised: "Recognition",
  "Member of": "Memberships",
  "Selected for": "Selection",
};

const FACTS: { k: string; v: ReactNode }[] = [
  {
    k: "Name",
    v: (
      <>
        {BRAND}, in two words. Legal name: {LEGAL_NAME}.
      </>
    ),
  },
  {
    k: "What we do",
    v: `${DESCRIPTOR}. First application: navigation you can trust without GPS.`,
  },
  { k: "Founded", v: REGISTERED_LABEL },
  { k: "Headquarters", v: `${ADDRESS.locality}, ${ADDRESS.country}` },
  { k: "Registration", v: RCS },
  { k: FOUNDER.role, v: FOUNDER.name },
  { k: "Stage", v: STAGE_LINE },
  { k: "Patent applications", v: PATENT_DETAIL },
  ...SUPPORTER_KINDS.filter((kind) => supportersByKind(kind).length > 0).map((kind) => ({
    k: FACT_LABEL[kind],
    v: (
      <ul className="flex flex-col gap-2.5">
        {supportersByKind(kind).map((s) => (
          <li key={s.name}>
            {s.statement}
            {kind !== "Selected for" && (
              <span className="block text-sm" style={{ color: "var(--muted)" }}>
                Since {s.since}
              </span>
            )}
          </li>
        ))}
      </ul>
    ),
  })),
  { k: "Research laboratories", v: RESEARCH_PARTNERS_LINE },
  {
    k: "Online",
    v: (
      <>
        <a href={SITE_URL} className="underline underline-offset-2 hover:text-[color:var(--text-primary)]">
          {siteHost}
        </a>
        {" · "}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[color:var(--text-primary)]"
        >
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </>
    ),
  },
];

/* ----- Files and usage ----------------------------------------------- */

type PressFile = {
  label: string;
  note: string;
  files: { href: string; kind: "SVG" | "PNG" }[];
};

const FILES: PressFile[] = [
  {
    label: "Lockup, for light backgrounds",
    note: "The mark and the name. SVG, or PNG 2400 px wide, transparent.",
    files: [
      { href: "/press/spectral-flow-lockup.svg", kind: "SVG" },
      { href: "/press/spectral-flow-lockup.png", kind: "PNG" },
    ],
  },
  {
    label: "Lockup, for dark backgrounds",
    note: "The mark and the name. SVG, or PNG 2400 px wide, transparent.",
    files: [
      { href: "/press/spectral-flow-lockup-dark.svg", kind: "SVG" },
      { href: "/press/spectral-flow-lockup-dark.png", kind: "PNG" },
    ],
  },
  {
    label: "Mark, for light backgrounds",
    note: "SVG, or PNG 1024 × 1024 px, transparent.",
    files: [
      { href: "/press/spectral-flow-mark-transparent.svg", kind: "SVG" },
      { href: "/press/spectral-flow-mark-transparent.png", kind: "PNG" },
    ],
  },
  {
    label: "Mark, for dark backgrounds",
    note: "SVG, or PNG 1024 × 1024 px, transparent.",
    files: [
      { href: "/press/spectral-flow-mark-transparent-dark.svg", kind: "SVG" },
      { href: "/press/spectral-flow-mark-transparent-dark.png", kind: "PNG" },
    ],
  },
  {
    label: "App icon",
    note: "The mark on its porcelain square. SVG, or PNG 1024 × 1024 px.",
    files: [
      { href: "/press/spectral-flow-mark.svg", kind: "SVG" },
      { href: "/press/spectral-flow-mark-1024.png", kind: "PNG" },
    ],
  },
];

/** Intrinsic size of the lockup files, for the previews. */
const LOCKUP = { width: 1200, height: 201 };

const PALETTE = [
  { name: "Porcelain", hex: "#FAFAF8" },
  { name: "Ink", hex: "#0B0F1A" },
  { name: "Blue", hex: "#0B5FFF" },
];

/** Statements cleared for reuse by the press. */
const QUOTABLE = SUPPORTERS.filter((s) => s.name !== "Google for Startups Cloud Program");

const USAGE: { t: string; d: ReactNode }[] = [
  {
    t: "The name",
    d: (
      <>
        {BRAND}, in two words, with a capital at each. The legal name is {LEGAL_NAME}. Where a
        descriptor helps: {BRAND}, {DESCRIPTOR.toLowerCase()}.
      </>
    ),
  },
  {
    t: "Recognition, memberships and selection",
    d: (
      <>
        Please quote each one exactly as written:
        <ul className="mt-3 flex flex-col gap-1.5">
          {QUOTABLE.map((s) => (
            <li key={s.name} style={{ color: "var(--text-primary)" }}>
              &ldquo;{s.statement}&rdquo;
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    t: "Stage",
    d: (
      <>
        {STAGE_LINE} Our mission demo runs in simulation: its figures are model-derived, not
        measurements. Please do not quote them as the performance of our instrument.
      </>
    ),
  },
  {
    t: "Patent applications",
    d: (
      <>
        {PATENT_DETAIL} The count is as of {FACTS_AS_OF}. Please describe them as patent
        applications, or as patent-pending.
      </>
    ),
  },
  {
    t: "Logo files",
    d: "Use the files as supplied: the lockup, or the mark with the name set in text next to it. Please do not recolour, stretch or redraw them, and leave clear space around them.",
  },
];

/* ----- Page ---------------------------------------------------------- */

const SECTIONS = [
  { id: "facts", label: "Facts" },
  { id: "boilerplate", label: "Boilerplate" },
  { id: "founder", label: "Founder" },
  { id: "visuals", label: "Visuals" },
  { id: "usage", label: "Usage" },
  { id: "contact", label: "Press contact" },
  { id: "news", label: "News" },
];

function TextBlock({ label, note, children }: { label: string; note?: string; children: ReactNode }) {
  return (
    <figure className="card p-6 md:p-8 h-full flex flex-col">
      <figcaption className="flex items-baseline justify-between gap-4 mb-5">
        <span className="eyebrow">{label}</span>
        {note && <span className="figure-label is-plain">{note}</span>}
      </figcaption>
      <div className="flex flex-col gap-4 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </figure>
  );
}

export default function PressPage() {
  const news = latestPosts(3);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Press enquiry")}`;

  return (
    <main>
      <PageHeader
        eyebrow="Press kit"
        title="Facts and texts for the press."
        intro={`${BRAND} designs diamond quantum sensors, starting with navigation you can trust without GPS. Below: our facts as of ${FACTS_AS_OF}, texts to quote as they are, our logo files and a press contact.`}
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

      {/* Facts */}
      <Prose id="facts">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Facts</Eyebrow>
            <H2 className="mb-6">The company, on paper.</H2>
            <Lead>What journalists and event organisers ask for most, in one place.</Lead>
            <p className="figure-label is-plain mt-6">As of {FACTS_AS_OF}</p>
          </Reveal>

          <Reveal delay={100}>
            <dl>
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="hairline py-5 grid grid-cols-1 sm:grid-cols-[0.55fr_1.45fr] gap-1 sm:gap-8"
                >
                  <dt className="figure-label is-plain pt-1">{f.k}</dt>
                  <dd className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Prose>

      {/* Boilerplate */}
      <Prose id="boilerplate">
        <Reveal>
          <Eyebrow>Boilerplate</Eyebrow>
          <H2 className="max-w-3xl mb-4">About {BRAND}, ready to quote.</H2>
          <Body className="max-w-2xl mb-12">
            Use these texts as they are, or shorten them. Please keep the facts and the wording of
            the stage as written.
          </Body>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6">
          <Reveal className="flex flex-col gap-6">
            <TextBlock label="In one line">
              <p>{ONE_LINE}</p>
            </TextBlock>
            <TextBlock label="Short" note="About 50 words">
              <p>{BOILERPLATE_SHORT}</p>
            </TextBlock>
          </Reveal>
          <Reveal delay={100}>
            <TextBlock label="Long" note="About 130 words">
              {BOILERPLATE_LONG.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </TextBlock>
          </Reveal>
        </div>
      </Prose>

      {/* Founder */}
      <Prose id="founder">
        <Reveal>
          <Eyebrow>Founder</Eyebrow>
          <H2 className="max-w-3xl mb-12">{FOUNDER.name}, {FOUNDER.role.toLowerCase()}.</H2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <Reveal>
            <DuotonePhoto
              src="/founder-alexandre-papa.jpg"
              alt={`${FOUNDER.name}, founder of ${BRAND}`}
              width={170}
              height={170}
              sizes="144px"
              className="w-36"
            />
            <p className="figure-label is-plain mt-4 max-w-[9rem]">
              High-resolution portrait on request.
            </p>
          </Reveal>

          <Reveal delay={100} className="grid grid-cols-1 gap-6 max-w-3xl">
            <TextBlock label="In one line">
              <p>{FOUNDER_ONE_LINE}</p>
            </TextBlock>
            <TextBlock label="Short bio" note="About 80 words">
              <p>{FOUNDER_BIO}</p>
            </TextBlock>
          </Reveal>
        </div>
      </Prose>

      {/* Visuals */}
      <Prose id="visuals">
        <Reveal>
          <Eyebrow>Visuals</Eyebrow>
          <H2 className="max-w-3xl mb-4">The lockup and the mark.</H2>
          <Body className="max-w-2xl mb-12">
            Our mark is an ink diamond with a blue point at its centre. The lockup sets it next to
            the name, in two words, in Geist, our typeface: an open-source sans-serif. As an app
            icon, the mark sits on a porcelain square.
          </Body>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <figure>
              <div className="plate p-6 sm:p-10 md:p-14 min-h-40 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- the file offered for download, shown as is */}
                <img
                  src="/press/spectral-flow-lockup.svg"
                  alt={`${BRAND} lockup, for light backgrounds`}
                  width={LOCKUP.width}
                  height={LOCKUP.height}
                  className="w-full max-w-[20rem] h-auto"
                />
              </div>
              <figcaption className="figure-label is-plain mt-3">On porcelain or white</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={80} className="print:hidden">
            <figure>
              <div
                className="cinema p-6 sm:p-10 md:p-14 min-h-40 flex items-center justify-center rounded-[calc(var(--radius)+8px)]"
                style={{ border: "1px solid var(--border)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- the file offered for download, shown as is */}
                <img
                  src="/press/spectral-flow-lockup-dark.svg"
                  alt={`${BRAND} lockup, for dark backgrounds`}
                  width={LOCKUP.width}
                  height={LOCKUP.height}
                  className="w-full max-w-[20rem] h-auto"
                />
              </div>
              <figcaption className="figure-label is-plain mt-3">On ink or dark photographs</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-14">
          <Reveal>
            <h3 className="eyebrow mb-4">Download</h3>
            <ul>
              {FILES.map((f) => (
                <li key={f.label} className="hairline py-4 flex items-center justify-between gap-4">
                  <span className="text-[15px]" style={{ color: "var(--text-primary)" }}>
                    {f.label}
                    <span className="block text-sm" style={{ color: "var(--muted)" }}>
                      {f.note}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-5">
                    {f.files.map((file) => (
                      <a key={file.href} href={file.href} download className="textlink">
                        {file.kind}
                        <span className="sr-only">, {f.label}</span>
                        <span aria-hidden>↓</span>
                      </a>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <Body className="mt-5">
              Product photographs will follow the assembly of our first mobile prototype. For another
              format, write to us.
            </Body>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="eyebrow mb-4">Colours</h3>
            <ul>
              {PALETTE.map((c) => (
                <li key={c.hex} className="hairline py-4 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="inline-block w-9 h-9 rounded-lg shrink-0"
                    style={{ background: c.hex, border: "1px solid var(--border-strong)" }}
                  />
                  <span className="text-[15px]" style={{ color: "var(--text-primary)" }}>
                    {c.name}
                  </span>
                  <span className="figure-label is-plain ml-auto">{c.hex}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Prose>

      {/* Usage */}
      <Prose id="usage">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Usage</Eyebrow>
            <H2 className="mb-6">A few words, used exactly.</H2>
            <Lead>Our stage, our patent applications and our memberships each have a precise wording.</Lead>
          </Reveal>

          <div>
            {USAGE.map((u, i) => (
              <Reveal key={u.t} delay={i * 60}>
                <div className="hairline py-7 grid grid-cols-1 sm:grid-cols-[0.55fr_1.45fr] gap-2 sm:gap-8">
                  <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    {u.t}
                  </h3>
                  <div className="text-[15px] leading-7" style={{ color: "var(--muted)" }}>
                    {u.d}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Prose>

      {/* Press contact */}
      <Prose id="contact">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Press contact</Eyebrow>
            <H2 className="mb-6">Write to us.</H2>
            <Lead className="mb-8">
              For an interview, a fact to check or a file in another format. We answer in English
              or in French.
            </Lead>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href={CTA_PRESS} className="btn-primary self-start">
                Send a press enquiry <span aria-hidden>→</span>
              </Link>
              <a href={mailto} className="textlink">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </Reveal>
      </Prose>

      {/* Latest news */}
      {news.length > 0 && (
        <Prose id="news">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <Eyebrow>News</Eyebrow>
                <H2>Latest announcements.</H2>
              </div>
              <Link href="/news" className="textlink">
                All news <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <NewsCard post={p} />
              </Reveal>
            ))}
          </ul>
        </Prose>
      )}
    </main>
  );
}
