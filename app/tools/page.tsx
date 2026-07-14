import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import { MAILTO_TWIN_DEMO } from "../lib/contact";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "SpectralFlow's tools: The Instrument (free in-browser mission demos on our navigation digital twin), SpectralFlow Studio (the SF-QSim design engine) and expert twin sessions. All figures model-derived.",
  alternates: { canonical: "/tools" },
};

const RUNGS = [
  {
    k: "Try it · free",
    title: "The Instrument",
    body: "The public layer of our navigation digital twin, live in your browser with no account. Fly a full mission where satellites cannot help, attack the instrument three ways, and watch it hold. Every figure is recomputed live and honestly labelled model-derived.",
    cta: { href: "/instrument", label: "Fly the Instrument", internal: true },
  },
  {
    k: "Go deeper",
    title: "SpectralFlow Studio",
    body: "The design engine behind the sensor. SF-QSim predicts coherence and magnetic sensitivity from first principles, so a lean team can explore the parameter space in software before the cleanroom. Studio is where that engine is put to work.",
    cta: { href: "https://studio.spectralflow.ai", label: "Open Studio", internal: false },
  },
  {
    k: "Talk to us",
    title: "Expert twin session",
    body: "A guided session on the full engineering digital twin, under agreement: the complete sensor model, the navigation filter and the design targets, walked through with our team. For partners and technical evaluators who need to go past the public layer.",
    cta: { href: MAILTO_TWIN_DEMO, label: "Request an expert session", internal: false },
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
        intro="We validate the sensor in software before it exists. Three ways in, from free in-browser mission demos to the full engineering twin, each honest about the fact that every figure is model-derived and no hardware exists yet."
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
                  {r.cta.internal ? (
                    <Link href={r.cta.href} className="btn-primary whitespace-nowrap">
                      {r.cta.label} <span>→</span>
                    </Link>
                  ) : (
                    <a href={r.cta.href} className="btn-ghost whitespace-nowrap">
                      {r.cta.label} <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* The engine, in one line */}
      <Prose>
        <Reveal>
          <Eyebrow>The engine behind it all</Eyebrow>
          <H2 className="max-w-3xl mb-6">SF-QSim: the sensor, simulated first.</H2>
          <Lead className="max-w-3xl">
            SF-QSim is our first-principles simulation engine. It predicts coherence and magnetic
            sensitivity across independent decoherence channels, benchmarked against a registry of
            more than 100 published experimental results. It is the layer that lets us design, and
            be measured, in software before committing to fabrication.
          </Lead>
        </Reveal>
      </Prose>

      {/* CTA */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">Evaluating the technology?</H2>
          <Lead className="max-w-2xl mb-9">
            Start with the Instrument, then talk to us about an expert session on the full twin.
          </Lead>
          <Link href="/contact" className="btn-primary">
            Get in touch <span>→</span>
          </Link>
        </Reveal>
      </Prose>
    </main>
  );
}
