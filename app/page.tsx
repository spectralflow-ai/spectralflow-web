import Link from "next/link";
import HeroVisualSwitch from "./components/HeroVisualSwitch";
import Reveal from "./components/Reveal";
import MissionChart from "./components/MissionChart";
import StepsScroll from "./components/StepsScroll";
import Counter from "./components/Counter";
import { Section, Eyebrow, H2, Lead, Body } from "./components/ui";

export default function Home() {
  return (
    <main>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center">
          <div>
            <div className="flex flex-wrap gap-2.5 mb-7">
              <span className="pill">Member of NVIDIA Inception</span>
              <span className="pill">13 UK patents · 326 claims</span>
            </div>

            <h1 className="display text-5xl md:text-7xl xl:text-[5.4rem] font-semibold tracking-tight mb-7">
              <span className="text-gradient">Quantum sensing,</span>
              <br />
              out of the lab.
            </h1>

            <Lead className="max-w-xl mb-5">
              SpectralFlow designs and patents <strong style={{ color: "var(--text-primary)" }}>NV-diamond
              quantum sensors</strong> — extreme magnetic sensitivity at room temperature, in a
              chip-scale form factor.
            </Lead>
            <Body className="max-w-xl">
              Our first mission: resilient navigation where GPS is jammed, denied, or gone. We
              read the Earth&rsquo;s own magnetic field as an ultra-high-definition compass —
              passive, un-jammable, undetectable. Where cold atoms and SQUIDs stay too bulky,
              too cold, or too costly, diamond runs warm, small, and field-ready.
            </Body>

            <p className="eyebrow mt-6" style={{ opacity: 0.85 }}>
              Room temperature · Vibration-immune · No RF emission · Air · Sea · Space
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mt-9">
              <Link href="/technology" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg">
                Explore the technology <span>→</span>
              </Link>
              <a href="https://studio.spectralflow.ai" className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg">
                Open SpectralFlow Studio
              </a>
            </div>
          </div>

          <div className="relative">
            <HeroVisualSwitch />
          </div>
        </div>
      </section>

      {/* ===================== TRUST / ECOSYSTEM ===================== */}
      <div className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-7 flex flex-wrap items-center gap-x-10 gap-y-3 justify-center md:justify-between">
          {[
            "Member of NVIDIA Inception",
            "13 UK patents filed",
            "European · sovereign deep tech",
            "Room-temperature quantum",
          ].map((t) => (
            <span key={t} className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ========================= PROBLEM ========================= */}
      <Section bordered>
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            When GPS goes dark, everything that depends on it drifts.
          </H2>
          <Lead className="max-w-3xl">
            Satellite navigation is jammed, spoofed and denied across contested airspace, deep
            oceans and orbit. Inertial systems drift the moment the signal drops. The world needs a
            positioning reference that nobody can switch off — one that emits nothing and cannot be
            jammed.
          </Lead>
          <Body className="max-w-3xl mt-5">
            Magnetic navigation exists — but the magnetometers flying today are lab instruments
            strapped onto vehicles, corrected by external compensation models dating back to 1953.
            We design the sensor for the vehicle, not the lab.{" "}
            <strong style={{ color: "var(--text-primary)" }}>They compensate. We measure.</strong>
          </Body>
        </Reveal>
      </Section>

      {/* ========================= APPROACH ========================= */}
      <Section bordered>
        <Reveal>
          <Eyebrow>The approach</Eyebrow>
          <H2 className="max-w-3xl mb-6">A single quantum core. Engineered diamond.</H2>
          <Lead className="max-w-3xl mb-12">
            A nitrogen-vacancy centre in diamond is an atom-scale magnetometer that works in
            ambient conditions. We turn that physics into a manufacturable sensor — diamond,
            integrated optics, and adaptive firmware — designed in software before it ever reaches
            the cleanroom.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { t: "Room temperature", d: "No cryogenics, no shielded room. The sensor runs warm and field-ready, where SQUIDs and cold atoms cannot go." },
            { t: "Vibration-immune", d: "Solid-state diamond holds coherence under shock and motion — built for vehicles, hulls and launch loads." },
            { t: "Passive & silent", d: "It reads the ambient field and emits no RF. Nothing to detect, nothing to jam, nothing to spoof." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="card p-6 h-full">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>{c.t}</p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===================== HOW IT WORKS (scroll story) ===================== */}
      <Section bordered>
        <StepsScroll />
      </Section>

      {/* ===================== VERTICAL TEASER ===================== */}
      <Section bordered>
        <Reveal>
          <Eyebrow>Vertical #1 — Navigation</Eyebrow>
          <H2 className="max-w-3xl mb-6">One core. Three theatres.</H2>
          <Lead className="max-w-2xl mb-12">
            Navigation ships first. The same sensing core corrects inertial drift across air, sea
            and space — wherever satellites fail to reach.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { t: "Air", d: "Matchbox-sized, a handful of watts. Rides on tactical UAVs and holds heading by matching the Earth's magnetic map the moment GPS drops." },
            { t: "Sea", d: "Fully passive underwater navigation and magnetic-anomaly detection for submarines and AUVs, where satellite signals never reach." },
            { t: "Space", d: "Diamond is intrinsically radiation-hard — attitude and orbital navigation that keeps working under cosmic radiation." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="card p-6 h-full">
                <p className="eyebrow mb-3">{c.t}</p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <Link href="/applications" className="inline-flex items-center gap-2 text-sm font-medium mt-10" style={{ color: "var(--accent)" }}>
            See all applications <span>→</span>
          </Link>
        </Reveal>
      </Section>

      {/* ===================== PLATFORM TEASER ===================== */}
      <Section bordered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>The engine behind the sensor</Eyebrow>
            <H2 className="mb-5">SF-QSim — designed in software first.</H2>
            <Body className="mb-4">
              Our sensors are simulated before they reach the cleanroom. SF-QSim is a
              first-principles physics engine that predicts coherence and magnetic sensitivity
              across independent decoherence channels — the design layer that lets a lean team move
              at deep-tech speed.
            </Body>
            <a href="https://studio.spectralflow.ai" className="inline-flex items-center gap-2 text-sm font-medium mt-2" style={{ color: "var(--accent)" }}>
              Open SpectralFlow Studio <span>→</span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden" style={{ background: "var(--border)" }}>
              {[
                { value: 3, label: "Proprietary bricks" },
                { value: 5, label: "Patented verticals" },
                { value: 13, label: "UK patents filed" },
                { value: 326, label: "Claims" },
              ].map((s) => (
                <div key={s.label} className="p-7" style={{ background: "var(--surface)" }}>
                  <p className="text-4xl font-semibold display" style={{ color: "var(--accent)" }}>
                    <Counter value={s.value} />
                  </p>
                  <p className="font-mono text-xs mt-2" style={{ color: "var(--muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ===================== DIGITAL TWIN ===================== */}
      <Section bordered>
        <Reveal>
          <Eyebrow>The digital twin</Eyebrow>
          <H2 className="max-w-3xl mb-6">Our sensor already flies — in software.</H2>
          <Lead className="max-w-3xl mb-5">
            Before the first device is built, an end-to-end navigation digital twin flies the
            mission: a synthetic magnetic map, a vehicle with its own interference, the full
            sensor model and the navigation filter — every figure honestly labelled as
            model-derived.
          </Lead>
          <Body className="max-w-3xl mb-10">
            It is how we engineer, and how we intend to be measured: the twin&rsquo;s predictions
            are the targets our hardware milestones will be judged against. The interactive twin
            is online — access is granted on request.
          </Body>
        </Reveal>
        <Reveal delay={120}>
          <MissionChart />
        </Reveal>
        <Reveal delay={180}>
          <a
            href="mailto:alex@spectralflow.ai?subject=Navigation%20digital%20twin%20%E2%80%94%20demo%20access%20request"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg mt-8"
          >
            Request demo access <span>→</span>
          </a>
        </Reveal>
      </Section>

      {/* ===================== ECOSYSTEM ===================== */}
      <Section bordered>
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.4fr] gap-8 md:gap-12 items-center">
          <Reveal>
            {/* The badge ships on white; do not alter it */}
            <div className="rounded-xl bg-white p-6 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nvidia-inception-badge.svg" alt="Member of NVIDIA Inception" className="h-16 w-auto" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Ecosystem & trust</Eyebrow>
            <H2 className="mb-5">Building in good company.</H2>
            <Body className="max-w-xl">
              SpectralFlow is a member of NVIDIA Inception and works alongside public research
              institutions across the diamond, photonics and navigation value chains — a sovereign,
              European effort to take quantum sensing out of the lab.
            </Body>
            <Link href="/company" className="inline-flex items-center gap-2 text-sm font-medium mt-5" style={{ color: "var(--accent)" }}>
              About the company <span>→</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ========================= CLOSING CTA ========================= */}
      <Section bordered>
        <Reveal>
          <H2 className="max-w-3xl mb-6">European, sovereign deep tech.</H2>
          <Lead className="max-w-2xl mb-9">
            We design the sensor, the firmware and the calibration — and we take quantum out of the
            lab. We&rsquo;re courting partners and investors who want in early.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg">
              Get in touch <span>→</span>
            </Link>
            <a
              href="mailto:alex@spectralflow.ai?subject=SF-100%20predictive%20datasheet%20request"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg"
            >
              Request the predictive datasheet
            </a>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
