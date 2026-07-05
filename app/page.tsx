import Link from "next/link";
import FieldFlow from "./components/FieldFlow";
import Reveal from "./components/Reveal";
import MissionChart from "./components/MissionChart";
import Steps from "./components/Steps";
import Counter from "./components/Counter";
import PartnerStrip from "./components/PartnerStrip";
import { Prose, Cinema, Eyebrow, H2, Lead, Body, Strong } from "./components/kit";
import { MAILTO_DATASHEET, MAILTO_TWIN_DEMO } from "./lib/contact";
import { PATENT_FAMILIES, PREPRINTS, VERTICALS } from "./lib/facts";
import { VERTICALS_ORDERED } from "./lib/verticals";

const NAV_STEPS = [
  {
    n: "01",
    t: "Sense",
    d: "The NV-diamond reads the Earth's ambient magnetic field: a fixed, global signature that no one can switch off.",
  },
  {
    n: "02",
    t: "Reject",
    d: "The vehicle carries its own magnetic noise: motors, currents, ferrous masses. Our sensing architecture identifies and removes it on board, in real time.",
  },
  {
    n: "03",
    t: "Match",
    d: "Onboard firmware matches the cleaned reading against a magnetic map to resolve position and heading in real time.",
  },
  {
    n: "04",
    t: "Navigate",
    d: "It continuously corrects inertial drift, holding a true course with no satellites, no emissions, nothing to jam.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ===================== HERO — L'instrument =====================
          A near-nude typographic opening on porcelain. One living
          matter: the field-line engraving, drawing itself slowly
          behind the words. No object. The luxury is what we remove. */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <FieldFlow />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 pb-20 text-center">
          <Reveal>
            <h1 className="display text-[2.9rem] leading-[1.02] sm:text-7xl lg:text-[6.4rem] font-semibold tracking-tight">
              Quantum sensing,
              <br />
              out of the lab<span style={{ color: "var(--accent)" }}>.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-8"
              style={{ color: "var(--text-secondary)" }}
            >
              NV-diamond magnetometers designed for the vehicle, not the lab: room temperature,
              chip-scale, sovereign.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
              <Link href="/technology" className="btn-primary">
                Explore the technology <span>→</span>
              </Link>
              <a href={MAILTO_DATASHEET} className="textlink">
                Request the predictive datasheet <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden>
          <span className="figure-label">Scroll</span>
          <span
            className="block w-px h-9"
            style={{
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              animation: "pulse-soft 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ============== CINEMA — the product performs ==============
          The first scroll reveals the dark band: the living mission
          curve, where the claim becomes a trace. */}
      <Cinema>
        <Reveal>
          <Eyebrow>The digital twin</Eyebrow>
          <H2 className="max-w-3xl mb-6">Our sensor already flies. In software.</H2>
          <Lead className="max-w-3xl mb-5">
            Before the first device is built, an end-to-end navigation digital twin flies the
            mission: a synthetic magnetic map, a vehicle with its own interference, the full sensor
            model and the navigation filter. Every figure is honestly labelled as model-derived.
          </Lead>
          <Body className="max-w-3xl mb-10">
            It is how we engineer, and how we intend to be measured: the twin&rsquo;s predictions
            are the targets our hardware milestones will be judged against. The public layer is
            open to everyone, live, in your browser; deeper expert sessions on the full twin are
            granted on request.
          </Body>
        </Reveal>
        <Reveal delay={120}>
          <MissionChart />
        </Reveal>
        <Reveal delay={180}>
          <div className="flex items-center gap-6 flex-wrap mt-8">
            <Link href="/instrument" className="btn-primary">
              Fly the Instrument <span>→</span>
            </Link>
            <a href={MAILTO_TWIN_DEMO} className="textlink">
              Request an expert twin session <span>→</span>
            </a>
          </div>
        </Reveal>
      </Cinema>

      {/* ========================= PROBLEM ========================= */}
      <Prose>
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2 className="max-w-3xl mb-6">When GPS goes dark, everything that depends on it drifts.</H2>
          <Lead className="max-w-3xl">
            Satellite navigation is jammed, spoofed and denied across contested airspace, deep
            oceans and orbit. Inertial systems drift the moment the signal drops. The world needs a
            positioning reference that nobody can switch off: one that emits nothing and cannot be
            jammed.
          </Lead>
          <Body className="max-w-3xl mt-5">
            Magnetic navigation exists, but the magnetometers flying today are lab instruments
            strapped onto vehicles, corrected by external compensation models dating back to 1953.
            We design the sensor for the vehicle, not the lab.{" "}
            <Strong>They compensate. We measure.</Strong>
          </Body>
        </Reveal>
      </Prose>

      {/* ================= HOW IT WORKS (scroll story) ================= */}
      <Prose>
        <Steps
          eyebrow="How it works"
          title={
            <>
              From the Earth&rsquo;s field
              <br />
              to a true heading.
            </>
          }
          lead="Four stages, one chip-set. The stage in the middle is the one nobody else does on board."
          steps={NAV_STEPS}
        />
      </Prose>

      {/* ========================= APPROACH ========================= */}
      <Prose>
        <Reveal>
          <Eyebrow>The approach</Eyebrow>
          <H2 className="max-w-3xl mb-6">A single quantum core. Engineered diamond.</H2>
          <Lead className="max-w-3xl mb-14">
            A nitrogen-vacancy centre in diamond is an atom-scale magnetometer that works in
            ambient conditions. We are turning that physics into a manufacturable sensor: diamond,
            integrated optics and adaptive firmware, designed in software before any of it reaches
            the cleanroom.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {[
            {
              t: "Room temperature",
              d: "No cryogenics, no shielded room. The sensor runs warm and field-ready, where SQUIDs and cold atoms cannot go.",
            },
            {
              t: "Vibration-immune",
              d: "Solid-state diamond holds coherence under shock and motion, built for vehicles, hulls and launch loads.",
            },
            {
              t: "Passive & silent",
              d: "It reads the ambient field and emits no RF. Nothing to detect, nothing to jam, nothing to spoof.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="hairline pt-6 h-full">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.t}
                </p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* ===================== VERTICAL CHOOSER ===================== */}
      <Prose>
        <Reveal>
          <Eyebrow>One core, many worlds</Eyebrow>
          <H2 className="max-w-3xl mb-6">Find the world you came for.</H2>
          <Lead className="max-w-2xl mb-14">
            Navigation ships first. The same sensing core reaches into life sciences, industry and
            quantum information. Each vertical starts with the science of its domain, then our
            approach.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VERTICALS_ORDERED.map((v, i) => (
            <Reveal key={v.slug} delay={i * 80}>
              <Link
                href={`/applications/${v.slug}`}
                className="card p-6 md:p-7 h-full flex flex-col gap-2.5 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{v.navLabel}</p>
                  {v.flagship && <span className="pill">Ships first</span>}
                </div>
                <p className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                  {v.tagline}
                </p>
                <span className="textlink mt-auto pt-3">
                  Explore <span>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <Link href="/applications" className="textlink mt-12">
            All applications <span>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ===================== PLATFORM TEASER ===================== */}
      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>The engine behind the sensor</Eyebrow>
            <H2 className="mb-5">SF-QSim: designed in software first.</H2>
            <Body className="mb-4">
              Our sensors are simulated before they reach the cleanroom. SF-QSim is a
              first-principles physics engine that predicts coherence and magnetic sensitivity
              across independent decoherence channels. It is the design layer that lets a lean
              team move at deep-tech speed.
            </Body>
            <a href="https://studio.spectralflow.ai" className="textlink mt-2">
              Open SpectralFlow Studio <span>→</span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden" style={{ background: "var(--border)" }}>
              {[
                { value: PATENT_FAMILIES, suffix: "", label: "Patent families filed" },
                { value: VERTICALS, suffix: "", label: "Patented verticals" },
                { value: PREPRINTS, suffix: "", label: "Public preprints" },
                { value: 100, suffix: "+", label: "Experimental anchors behind the engine" },
              ].map((s) => (
                <div key={s.label} className="p-7" style={{ background: "var(--surface)" }}>
                  <p className="text-4xl font-semibold display" style={{ color: "var(--accent)" }}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="figure-label mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* ========================= CLOSING CTA ========================= */}
      <Prose>
        <Reveal>
          <H2 className="max-w-3xl mb-6">European, sovereign deep tech.</H2>
          <Lead className="max-w-2xl mb-9">
            We design the sensor, the firmware and the calibration. And we take quantum out of the
            lab. We&rsquo;re courting partners and investors who want in early.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href="/contact" className="btn-primary">
              Get in touch <span>→</span>
            </Link>
            <a href={MAILTO_DATASHEET} className="btn-ghost">
              Request the predictive datasheet
            </a>
          </div>
        </Reveal>
      </Prose>

      {/* ===================== IN GOOD COMPANY ===================== */}
      <PartnerStrip />
    </main>
  );
}
