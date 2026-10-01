import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import VerticalIcon from "../components/VerticalIcon";
import VerticalGlyph from "../components/VerticalGlyph";
import { Prose, Cinema, Plate, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import {
  ADJACENT_VERTICALS,
  FLAGSHIP_VERTICAL,
  VERTICALS_ORDERED,
  verticalHref,
} from "../lib/verticals";
import { BRAND, SITE_URL } from "../lib/facts";

const PAGE_PATH = "/applications";
const SHARE_TITLE = `Applications · ${BRAND}`;
const DESCRIPTION =
  "Diamond quantum sensors, navigation first. Then life sciences, semiconductors and quantum computing, on the same diamond, each shown with where it stands.";

export const metadata: Metadata = {
  title: "Applications",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

/** Navigation situations. */
const SITUATIONS = ["Survey and exploration", "At sea", "In the air", "In space"];

/** What every application shares. */
const SHARED = [
  {
    h: "The diamond",
    p: "The material sets the limit of every instrument made with it. We work on it with research laboratories in diamond growth and nanofabrication.",
  },
  {
    h: "The readout",
    p: "The NV spin is read with light: green in, red out, with microwaves to find the resonance. The same reading serves every application.",
  },
  {
    h: "The software",
    p: "Every value comes with its uncertainty, and our designs are tried in simulation before they are made.",
  },
];

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

const ITEMLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Applications",
  itemListElement: VERTICALS_ORDERED.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: v.navLabel,
    url: `${SITE_URL}${verticalHref(v.slug)}`,
  })),
};

export default function Applications() {
  const nav = FLAGSHIP_VERTICAL;
  const navHref = verticalHref(nav.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }}
      />

      <PageHeader
        eyebrow="Applications"
        title={
          <>
            One diamond platform.
            <br className="hidden md:block" /> Navigation first.
          </>
        }
        intro="Nitrogen-vacancy centres in diamond measure magnetic fields at room temperature. We are developing that capability for navigation first. The same diamond, readout and software reach other fields, and each one below says where we stand."
      />

      {/* First application: navigation */}
      <Cinema id="navigation">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <VerticalIcon slug={nav.slug} />
              <p className="eyebrow">{nav.horizon.label}</p>
            </div>
            <H2 className="max-w-xl mb-6">{nav.title}</H2>
            <Lead className="max-w-xl mb-8">{nav.intro}</Lead>

            <p className="figure-label mb-3">Situations</p>
            <ul className="flex flex-wrap gap-2 mb-8" aria-label="Navigation situations">
              {SITUATIONS.map((s) => (
                <li key={s}>
                  <Link
                    href={`${navHref}#situations`}
                    className="pill inline-block hover:underline underline-offset-4"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hairline pt-5 mb-9 max-w-xl">
              <p className="figure-label mb-2">Where we stand</p>
              <Body>{nav.horizon.note}</Body>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={navHref} className="btn-primary">
                Explore navigation <span aria-hidden>→</span>
              </Link>
              <Link href="/instrument" className="btn-ghost">
                Fly a mission
              </Link>
            </div>
            <Link href={`${navHref}#problem`} className="textlink mt-6">
              See the daily interference map <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Plate caption={nav.glyphCaption}>
              <VerticalGlyph slug={nav.slug} />
            </Plate>
          </Reveal>
        </div>
      </Cinema>

      {/* One diamond platform: the other applications */}
      <Prose id="platform">
        <Reveal>
          <Eyebrow>Beyond navigation</Eyebrow>
          <H2 className="max-w-3xl mb-6">One diamond platform, other measurements.</H2>
          <Lead className="max-w-3xl mb-14">
            NV centres respond to magnetic fields and to the spins of nearby atoms. The diamond, the
            optical readout and the software we develop carry over to scientific instruments and
            non-destructive testing, markets that come after navigation. Quantum information is a
            longer-horizon research interest.
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mb-16">
          {SHARED.map((s, i) => (
            <Reveal key={s.h} delay={i * 80}>
              <div className="hairline pt-6 h-full">
                <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {s.h}
                </h3>
                <Body>{s.p}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADJACENT_VERTICALS.map((v, i) => (
            <Reveal key={v.slug} delay={i * 80} className="h-full">
              <Link
                href={verticalHref(v.slug)}
                className="card p-6 md:p-7 h-full flex flex-col gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <VerticalIcon slug={v.slug} />
                  <p className="eyebrow">{v.navLabel}</p>
                </div>
                <h3
                  className="display text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.title}
                </h3>
                <Body>{v.tagline}</Body>
                <div className="hairline pt-4 mt-auto">
                  <p className="figure-label mb-1.5">{v.horizon.label}</p>
                  <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                    {v.horizon.note}
                  </p>
                </div>
                <span className="textlink pt-1" style={{ color: "var(--text-primary)" }}>
                  Explore {v.navLabel.toLowerCase()} <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* Call to action */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">Working on one of these measurements?</H2>
          <Lead className="max-w-2xl mb-9">
            We are looking for programme partners in navigation, and for research laboratories
            interested in the other applications. Tell us what you need to measure.
          </Lead>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Get in touch <span aria-hidden>→</span>
            </Link>
            <Link href="/technology" className="textlink">
              How the sensor works <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
