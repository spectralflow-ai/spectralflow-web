import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Section, Eyebrow, H2, Lead, Body, PageHeader } from "../components/ui";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Navigation in GPS-denied environments is SpectralFlow's first vertical (air, sea, space). Semiconductor metrology, life sciences and industry follow as patented verticals.",
};

const THEATRES = [
  { t: "Air", d: "Matchbox-sized and a handful of watts, riding on tactical UAVs. It corrects inertial drift by matching the Earth's magnetic map — so the platform keeps its heading the moment GPS is jammed or denied." },
  { t: "Sea", d: "Fully passive: nothing to detect, nothing to jam. Underwater navigation and magnetic-anomaly detection for submarines and AUVs, where satellite signals never reach." },
  { t: "Space", d: "Diamond is intrinsically radiation-hard. Attitude determination and orbital navigation that keep working where conventional magnetometers drift under cosmic radiation." },
];

const FUTURE = [
  { t: "Semiconductor metrology", d: "Non-perturbative imaging of next-generation chips and quantum processors at the nanoscale, without cryogenics." },
  { t: "Chip-scale NMR / pharma", d: "Miniature magnetic resonance for molecular analysis and quality control — bringing NMR out of the room and onto the bench." },
  { t: "ROS biosensing", d: "Quantum-grade magnetic sensing for reactive-oxygen-species and biological signals — a path toward tomorrow's diagnostics." },
  { t: "Ambient quantum computing", d: "Room-temperature spin control as a building block for quantum information in ambient conditions." },
];

export default function Applications() {
  return (
    <main>
      <PageHeader
        eyebrow="Applications"
        title={<>Navigation first.<br className="hidden md:block" /> A platform behind it.</>}
        intro="One sensing core reaches across a family of markets. We ship navigation in GPS-denied environments first; four further verticals are patented and activate in cascade as the science and the markets mature."
      />

      {/* Primary vertical */}
      <Section bordered>
        <Reveal>
          <Eyebrow>Vertical #1 — GPS-denied navigation</Eyebrow>
          <H2 className="max-w-3xl mb-6">One core. Three theatres.</H2>
          <Lead className="max-w-2xl mb-12">
            Inertial navigation drifts the moment satellites disappear. A passive magnetic
            reference that nobody can switch off closes that gap — in the air, under the sea and in
            orbit.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THEATRES.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="card p-7 h-full">
                <p className="eyebrow mb-3">{c.t}</p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Future verticals */}
      <Section bordered>
        <Reveal>
          <Eyebrow>The platform goes further</Eyebrow>
          <H2 className="max-w-3xl mb-6">The same quantum core, beyond navigation.</H2>
          <Lead className="max-w-2xl mb-12">
            A single sensing core — engineered diamond, integrated optics, adaptive firmware —
            unlocks a cascade of applications. Navigation ships first; the rest are patented and
            activate as each market matures.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FUTURE.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="card p-7 h-full">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>{c.t}</p>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bordered>
        <Reveal>
          <H2 className="max-w-2xl mb-6">Building toward a programme in your domain?</H2>
          <Lead className="max-w-2xl mb-9">
            We work with partners who need positioning and sensing where conventional technology
            stops. Tell us about the environment you operate in.
          </Lead>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg">
            Get in touch <span>→</span>
          </Link>
        </Reveal>
      </Section>
    </main>
  );
}
