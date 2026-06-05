import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import HeroVisual from "../components/HeroVisual";
import { Section, Eyebrow, H2, Lead, Body, PageHeader } from "../components/ui";

export const metadata: Metadata = {
  title: "Technology — SpectralFlow",
  description:
    "The NV-diamond principle and SpectralFlow's three proprietary bricks: SF-QSim (the simulation engine), SF-CORE (fab process) and the SF-100 sensor family.",
};

const BRICKS = [
  {
    tag: "SF-QSim — the engine",
    title: "Design the sensor in software",
    body: "A first-principles physics engine that predicts coherence and magnetic sensitivity across independent decoherence channels, from cryogenic to well above room temperature. It is the design layer that lets a lean team explore the parameter space before committing to the cleanroom.",
    cta: { href: "https://spectralflow.streamlit.app", label: "Open SpectralFlow Studio →" },
  },
  {
    tag: "SF-CORE — the process",
    title: "Turn physics into a manufacturable part",
    body: "Our proprietary fabrication and integration process engineers the diamond, the nitrogen-vacancy density and the optical readout into a repeatable, chip-scale sensing core — the bridge from a quantum effect to an industrial component.",
  },
  {
    tag: "SF-100 — the sensor family",
    title: "A sensor head, ready for the field",
    body: "Diamond, integrated optics and adaptive firmware packaged into a rugged, low-power sensor family. We follow the “NVIDIA model”: sell the design, firmware and calibration; outsource the fab.",
  },
];

export default function Technology() {
  return (
    <main>
      <PageHeader
        eyebrow="Technology"
        title={<>The physics, made<br className="hidden md:block" /> manufacturable.</>}
        intro="A nitrogen-vacancy centre in diamond is an atom-scale magnetometer that works in ambient conditions. SpectralFlow turns that physics into a product through three proprietary bricks."
      />

      {/* NV principle */}
      <Section bordered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>The NV-diamond principle</Eyebrow>
            <H2 className="mb-5">An atomic compass inside a crystal.</H2>
            <Body className="mb-4">
              A nitrogen-vacancy (NV) centre is a single atomic defect in the diamond lattice: a
              nitrogen atom beside a missing carbon. Its electronic spin responds to magnetic fields
              and can be initialised and read out optically — turning a beam of light into a
              precise magnetic measurement.
            </Body>
            <Body>
              Because the host is diamond, this quantum sensor survives where others cannot: at room
              temperature, under vibration and radiation, with no shielding and no cooling. That
              ruggedness is what moves quantum sensing out of the lab and into the field.
            </Body>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-8" style={{ animation: "float 9s ease-in-out infinite" }}>
              <HeroVisual />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Three bricks */}
      <Section bordered>
        <Reveal>
          <Eyebrow>Three proprietary bricks</Eyebrow>
          <H2 className="max-w-3xl mb-6">From simulation to sensor head.</H2>
          <Lead className="max-w-2xl mb-12">
            Each brick is independently defensible, and together they form a vertically integrated
            design-to-device pipeline.
          </Lead>
        </Reveal>
        <div className="flex flex-col gap-5">
          {BRICKS.map((b, i) => (
            <Reveal key={b.tag} delay={i * 80}>
              <div className="card p-7 md:p-9 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-6 md:gap-12">
                <div>
                  <p className="eyebrow mb-2">{b.tag}</p>
                  <p className="text-xl font-semibold display" style={{ color: "var(--text-primary)" }}>{b.title}</p>
                </div>
                <div>
                  <Body>{b.body}</Body>
                  {b.cta && (
                    <a href={b.cta.href} className="inline-flex items-center gap-2 text-sm font-medium mt-4" style={{ color: "var(--accent)" }}>
                      {b.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why it matters */}
      <Section bordered>
        <Reveal>
          <Eyebrow>Why room-temperature matters</Eyebrow>
          <H2 className="max-w-3xl mb-10">The constraints competitors live with, removed.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { t: "No cryogenics", d: "SQUIDs need liquid-helium cooling and magnetic shielding. Diamond needs neither — collapsing size, weight, power and cost." },
            { t: "No fragility", d: "Cold-atom interferometers are exquisite but delicate. Solid-state diamond holds coherence under shock, motion and launch loads." },
            { t: "No emission", d: "The sensor reads the ambient field passively. It radiates nothing — so it cannot be detected, jammed or spoofed." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="card p-6 h-full">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>{c.t}</p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <Link href="/applications" className="inline-flex items-center gap-2 text-sm font-medium mt-12" style={{ color: "var(--accent)" }}>
            Where we deploy it first <span>→</span>
          </Link>
        </Reveal>
      </Section>
    </main>
  );
}
