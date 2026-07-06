import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import { Prose, Cinema, Eyebrow, H2, Lead, Body, PageHeader } from "../../components/kit";
import { CONTACT_EMAIL } from "../../lib/contact";

// Unlisted leave-behind for research conversations (life sciences).
// Not in the nav, not in the sitemap, noindex. Reachable only by its URL / QR.
export const metadata: Metadata = {
  title: "Life sciences",
  description:
    "The NV-diamond core, read two ways in biology: molecular binding by chip-scale NMR, and free-radical flux by relaxometry. A research direction we are developing. All figures model-derived.",
  robots: { index: false, follow: false },
};

const MAILTO_BIO = `mailto:${CONTACT_EMAIL}?subject=Biosensing%20collaboration`;

/* Two small schematics, drawn in the house palette (ink strokes, one blue). */
function NmrGlyph() {
  return (
    <svg viewBox="0 0 220 96" role="img" aria-label="Shallow NV reading a fluorinated molecule on the diamond surface" style={{ width: "100%", height: "auto" }}>
      <line x1="12" y1="66" x2="208" y2="66" style={{ stroke: "var(--text-primary)" }} strokeWidth="1.5" />
      <polygon points="72,66 84,78 72,90 60,78" fill="none" style={{ stroke: "var(--text-primary)" }} strokeWidth="1.5" />
      <circle cx="72" cy="78" r="2.4" style={{ fill: "var(--accent)" }} />
      <circle cx="134" cy="32" r="10" fill="none" style={{ stroke: "var(--text-primary)" }} strokeWidth="1.5" />
      <text x="134" y="36" fontSize="10" textAnchor="middle" style={{ fill: "var(--text-primary)" }}>F</text>
      <line x1="134" y1="42" x2="86" y2="72" style={{ stroke: "var(--accent)" }} strokeWidth="1.4" strokeDasharray="3 3" />
      <path d="M152 24 q10 8 0 16" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="1.3" />
    </svg>
  );
}

function RelaxGlyph() {
  return (
    <svg viewBox="0 0 220 96" role="img" aria-label="A nanodiamond inside a cell, its T1 shortened by nearby radicals" style={{ width: "100%", height: "auto" }}>
      <circle cx="66" cy="48" r="40" fill="none" style={{ stroke: "var(--text-primary)" }} strokeWidth="1.5" />
      <polygon points="62,44 70,52 62,60 54,52" fill="none" style={{ stroke: "var(--text-primary)" }} strokeWidth="1.5" />
      <circle cx="62" cy="52" r="1.9" style={{ fill: "var(--accent)" }} />
      <circle cx="86" cy="30" r="2.2" style={{ fill: "var(--text-primary)" }} />
      <circle cx="46" cy="34" r="2.2" style={{ fill: "var(--text-primary)" }} />
      <circle cx="92" cy="62" r="2.2" style={{ fill: "var(--text-primary)" }} />
      <circle cx="44" cy="66" r="2.2" style={{ fill: "var(--text-primary)" }} />
      <line x1="126" y1="30" x2="126" y2="80" style={{ stroke: "var(--text-primary)" }} strokeWidth="1" />
      <line x1="126" y1="80" x2="206" y2="80" style={{ stroke: "var(--text-primary)" }} strokeWidth="1" />
      <path d="M126 30 C150 30 150 78 204 78" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="1.6" />
      <text x="168" y="24" fontSize="9" style={{ fill: "var(--muted)" }}>T1</text>
    </svg>
  );
}

const WINDOWS = [
  {
    tag: "Chip-scale NMR",
    title: "Read a molecule bind",
    body: "A shallow NV reads the nuclear spins of a fluorinated molecule sitting on the surface. It reports binding and relaxation in the mass-limited, picolitre regime, where a conventional coil cannot reach. Demonstrated in the literature down to roughly a hundred molecules.",
    label: "¹⁹F · surface · mass-limited",
    glyph: <NmrGlyph />,
  },
  {
    tag: "Intracellular relaxometry",
    title: "See free-radical flux",
    body: "A fluorescent nanodiamond inside a living cell has its coherence shortened by the magnetic noise of nearby radicals. It tracks reactive-oxygen-species flux in real time, without consuming a probe, and reports a local flux in the micromolar regime, not an absolute concentration.",
    label: "ROS flux · µM regime",
    glyph: <RelaxGlyph />,
  },
];

const LAYERS = [
  {
    tag: "The material",
    title: "A coherence-certified nanodiamond",
    body: "A passivated nanodiamond whose coherence targets are specified per batch by our design engine, validated against 43 published measurements at R²(log) 0.984. A better sensing element lifts every measurement above it: the dynamic range of relaxometry, the molecular floor of surface NMR. Model-derived targets; no hardware exists at this stage.",
  },
  {
    tag: "The readout",
    title: "An inference layer for noisy traces",
    body: "The hard part of relaxometry is pulling a reliable signal out of a noisy trace. Our estimation stack turns that trace into a reading with honest uncertainty and an out-of-distribution flag, rather than a curve fitted by hand. The methods are covered by patent applications filed in 2026.",
  },
  {
    tag: "The proof, in design",
    title: "A first NV measurement of a binding constant",
    body: "We are designing a phase-0 demonstrator: the first NV-NMR measurement of a fluorinated fragment’s dissociation constant on a protein, benchmarked against the literature. Falsifiable, and never done on an NV sensor.",
  },
];

export default function BioLeaveBehind() {
  return (
    <main>
      <PageHeader
        eyebrow="Life sciences"
        title={
          <>
            Two quantum reads
            <br className="hidden md:block" /> of biology.
          </>
        }
        intro="The same NV-diamond core we design for navigation reads living systems two ways: one is chemistry, one is a window on free-radical activity. Both sit on a material almost no one has explored. This is the direction we are developing, and where we look for research partners."
      />

      {/* Two windows */}
      <Prose>
        <Reveal>
          <Eyebrow>One sensor, two windows</Eyebrow>
          <H2 className="max-w-3xl mb-6">Molecular binding, and the noise of living cells.</H2>
          <Lead className="max-w-2xl mb-14">
            Two distinct physics, one diamond core. We say what each one can read, and we are
            explicit about what it cannot.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WINDOWS.map((w, i) => (
            <Reveal key={w.tag} delay={i * 90}>
              <div className="card h-full p-6 md:p-8 flex flex-col gap-4">
                <p className="eyebrow">{w.tag}</p>
                <div className="plate p-4">{w.glyph}</div>
                <p className="text-xl font-semibold display" style={{ color: "var(--text-primary)" }}>
                  {w.title}
                </p>
                <Body>{w.body}</Body>
                <p className="figure-label mt-auto">{w.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <Body className="mt-8 max-w-2xl">
            Relaxometry senses a magnetic flux, not a chemical assay. That honesty is the point: it
            is what earns trust with a biologist who has been burned by false positives.
          </Body>
        </Reveal>
      </Prose>

      {/* The opening : cinema band */}
      <Cinema>
        <Reveal>
          <Eyebrow>The opening</Eyebrow>
          <H2 className="max-w-3xl mb-6">The CVD-nanofabricated nanodiamond is a near-blank page.</H2>
          <Lead className="max-w-2xl">
            Almost every nanodiamond result today uses milled HPHT material of uncertain coherence.
            The CVD-nanofabricated, surface-engineered nanodiamond is barely in the literature. That
            gap is where the first-of-kind results live.
          </Lead>
        </Reveal>
      </Cinema>

      {/* What we're building */}
      <Prose>
        <Reveal>
          <Eyebrow>What we are developing</Eyebrow>
          <H2 className="max-w-3xl mb-6">Two layers no one has put together.</H2>
          <Lead className="max-w-2xl mb-14">
            We do not win by repeating a physics demonstration. We bring the sensing element and the
            readout the field is missing, plus a falsifiable first.
          </Lead>
        </Reveal>
        <div className="flex flex-col">
          {LAYERS.map((b, i) => (
            <Reveal key={b.tag} delay={i * 80}>
              <div className="hairline py-9 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-5 md:gap-12">
                <div>
                  <p className="eyebrow mb-2">{b.tag}</p>
                  <p className="text-xl font-semibold display" style={{ color: "var(--text-primary)" }}>
                    {b.title}
                  </p>
                </div>
                <div>
                  <Body>{b.body}</Body>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* Collaboration */}
      <Prose>
        <Reveal>
          <Eyebrow>Built with the research ecosystem</Eyebrow>
          <H2 className="max-w-3xl mb-6">We design; partners fabricate, functionalise, measure.</H2>
          <Lead className="max-w-2xl mb-8">
            The strongest version of this is collaborative. We bring the design engine and the
            inference layer; academic partners in diamond fabrication, NV science and structural NMR
            bring the cleanroom, the surface chemistry and the biological ground truth. The result is
            a shared, publishable record and validated hardware. The recipes and the engine stay
            ours; the science is joint.
          </Lead>
          <a href={MAILTO_BIO} className="btn-primary">
            Talk to us about a bio collaboration
          </a>
        </Reveal>
      </Prose>

      {/* Honest footer */}
      <section className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10">
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            SpectralFlow is at pre-prototype stage. Every figure here is a model-derived design
            target; no hardware exists yet. Sensitivity regimes follow what the physics allows, not
            marketing. The architecture and methods are covered by patent applications filed in 2026.
          </p>
        </div>
      </section>
    </main>
  );
}
