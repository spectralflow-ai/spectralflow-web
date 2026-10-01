import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import { CTA_DATASHEET, CTA_SIMULATION } from "../lib/contact";
import { BRAND, FACTS_AS_OF, STAGE_LINE } from "../lib/facts";

const DESCRIPTION = `${BRAND}'s tools: the Instrument (free mission demos in the browser, computed live in simulation), expert simulation sessions and the model-derived datasheet. All figures model-derived.`;

/** The stage, dated: it goes stale, so it always carries its date. */
const STAGE_DATED = `As of ${FACTS_AS_OF}, ${STAGE_LINE.charAt(0).toLowerCase()}${STAGE_LINE.slice(1)}`;

export const metadata: Metadata = {
  title: "Tools",
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: `Tools · ${BRAND}`,
    description: DESCRIPTION,
    url: "/tools",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tools · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const RUNGS = [
  {
    k: "Try it · free",
    title: "The Instrument",
    body: "Our public mission demos, computed live in simulation, in your browser and with no account. Fly a full mission where satellites cannot help, attack the instrument three ways, and watch it hold. Every figure is recomputed live and labelled model-derived.",
    cta: { href: "/instrument", label: "Fly the Instrument" },
  },
  {
    k: "Talk to us",
    title: "Expert simulation session",
    body: "A guided session on our full engineering simulation, under agreement: the sensor model, the navigation filter and the design targets, walked through with our team. For partners and technical evaluators who need to go past the public layer.",
    cta: { href: CTA_SIMULATION, label: "Request an expert session" },
  },
];

export default function Tools() {
  return (
    <main>
      <PageHeader
        eyebrow="Tools"
        title={
          <>
            Design it in software.
            <br className="hidden md:block" /> Fly it in the browser.
          </>
        }
        intro={`We design the sensor in software first. There are two ways in: free mission demos in the browser, and expert simulation sessions with our team. Every figure in both is model-derived. ${STAGE_DATED}`}
      />

      <Prose>
        <div className="flex flex-col gap-4">
          {RUNGS.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <div className="card p-7 md:p-9 grid grid-cols-1 md:grid-cols-[0.7fr_1.6fr_auto] gap-5 md:gap-10 items-start">
                <p className="eyebrow">{r.k}</p>
                <div>
                  <h2 className="text-xl font-semibold display mb-3" style={{ color: "var(--text-primary)" }}>
                    {r.title}
                  </h2>
                  <Body>{r.body}</Body>
                </div>
                <div className="md:pt-1">
                  <Link href={r.cta.href} className="btn-primary whitespace-nowrap">
                    {r.cta.label} <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* The simulation, in one paragraph */}
      <Prose>
        <Reveal>
          <Eyebrow>Simulation first</Eyebrow>
          <H2 className="max-w-3xl mb-6">The sensor, simulated before it is made.</H2>
          <Lead className="max-w-3xl">
            Our first-principles simulation models the diamond&rsquo;s spin coherence and magnetic
            sensitivity across independent decoherence channels. Its validation register covers more
            than a hundred published results; quantitative validation covers the subset whose
            experimental conditions are documented well enough, and the list is available. It is
            still to be calibrated against our own hardware and is useful in relative terms: it lets
            us design, and be checked, in software before committing to fabrication.
          </Lead>
        </Reveal>
      </Prose>

      {/* CTA */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">Evaluating the technology?</H2>
          <Lead className="max-w-2xl mb-9">
            Start with the Instrument, then ask for the model-derived datasheet or an expert
            simulation session.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href={CTA_DATASHEET} className="btn-primary">
              Request the model-derived datasheet <span>→</span>
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in touch <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
