import type { Metadata } from "next";
import { Suspense } from "react";
import Instrument from "./Instrument";
import { CTA_SIMULATION } from "../lib/contact";
import { BRAND, FACTS_AS_OF, LEGAL_NAME, SITE_URL, STAGE_LINE } from "../lib/facts";
import { TWIN_API } from "../lib/twin";

/** Origin of the compute API, when configured as an absolute URL. */
const API_ORIGIN = /^https?:\/\//.test(TWIN_API)
  ? new URL(TWIN_API).origin
  : null;

/** The stage, dated: it goes stale, so it always carries its date. */
const STAGE_DATED = `As of ${FACTS_AS_OF}, ${STAGE_LINE.charAt(0).toLowerCase()}${STAGE_LINE.slice(1)}`;

const DESCRIPTION =
  "Mission demos computed live in simulation: fly the full navigation chain end to end, attack it, and watch it calibrate itself, separate sources and state its own confidence. All figures model-derived.";

export const metadata: Metadata = {
  title: "The Instrument · mission demos",
  description: DESCRIPTION,
  alternates: { canonical: "/instrument" },
  openGraph: {
    title: `The Instrument · mission demos · ${BRAND}`,
    description: DESCRIPTION,
    url: "/instrument",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `The Instrument · mission demos · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Instrument",
  url: `${SITE_URL}/instrument`,
  description: DESCRIPTION,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any, in a web browser",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  publisher: {
    "@type": "Organization",
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE_URL,
  },
};

export default function InstrumentPage() {
  return (
    <>
      {API_ORIGIN && <link rel="preconnect" href={API_ORIGIN} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PAGE_JSONLD).replace(/</g, "\\u003c"),
        }}
      />
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 pb-1">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-4 flex-wrap">
              <h1
                style={{
                  fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Fly the sensor. In software.
              </h1>
              <p
                className="figure-label"
                style={{ color: "var(--accent)", margin: 0 }}
              >
                The Instrument · mission demos
              </p>
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.8rem",
                margin: 0,
              }}
            >
              Every figure model-derived, computed live.
            </p>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.88rem",
              lineHeight: 1.55,
              margin: "0.4rem 0 0",
              maxWidth: "52rem",
            }}
          >
            Each mission is computed live by the simulation we design with.
            Deeper scenarios run in{" "}
            <a href={CTA_SIMULATION} className="textlink">
              expert simulation sessions
            </a>
            .
          </p>
        </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <Suspense fallback={null}>
            <Instrument />
          </Suspense>
        </div>
      </section>
      <section className="hairline">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.85rem",
              maxWidth: "42rem",
              lineHeight: 1.6,
            }}
          >
            The mission demos are curated scenarios. Expert sessions open the
            full simulation on request, on your own trajectories, platforms
            and scenarios. The
            simulation is still to be calibrated against hardware and is useful
            in relative terms. The design software, the device design rules and
            the full estimation stack are proprietary; the methods shown here
            are covered by patent applications filed in 2026. All figures are
            model-derived, on a synthetic map: they are neither measurements
            nor specifications. {STAGE_DATED}
          </p>
          <p style={{ marginTop: "0.7rem" }}>
            <a href={CTA_SIMULATION} className="textlink">
              Request an expert simulation session <span>→</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
