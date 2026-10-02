import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import NVDiagram, { NVAxes } from "../components/NVDiagram";
import DiamondPlate from "../components/DiamondPlate";
import Principle from "../components/Principle";
import { Prose, Eyebrow, H2, Lead, Body } from "../components/kit";
import { BRAND, SITE_URL, STAGE_LINE } from "../lib/facts";
import { CTA_SIMULATION } from "../lib/contact";
import { getPost } from "../lib/news";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/technology";
const META_TITLE = "Technology: NV centres in diamond";
const SHARE_TITLE = `${META_TITLE} · ${BRAND}`;
const DESCRIPTION =
  "How a diamond quantum sensor reads a magnetic field: the NV principle in three steps, why diamond, and why every design flies in simulation first.";

export const metadata: Metadata = {
  title: META_TITLE,
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

const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Technology", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

/* ----- What this means on a vehicle ---------------------------------- */

const ON_A_VEHICLE = [
  {
    t: "No cryogenics",
    d: "The NV centre works at room temperature, with no vacuum and no consumables.",
  },
  {
    t: "Survives the platform",
    d: "Shock, vibration, radiation: the sensing element is a solid crystal. We design the sensor head around it to ride on the vehicle.",
  },
  {
    t: "No external signal",
    d: "Passive: it reads the Earth's own field and needs no external signal. A magnetic source placed nearby can disturb a magnetometer. The instrument is designed to detect that and say so.",
  },
];

/* ----- What a vehicle asks of a magnetic sensor ---------------------- */

type Origin = "material" | "both" | "design";

const ORIGIN_LABEL: Record<Origin, string> = {
  material: "The material",
  both: "The material, then the head design",
  design: "The instrument design",
};

const REQUIREMENTS: { need: string; answer: string; origin: Origin }[] = [
  {
    need: "Run without cryogenics",
    answer: "Room temperature, nothing to refill.",
    origin: "material",
  },
  {
    need: "Ride through vibration and shock",
    answer: "A solid crystal, carried by the sensor head.",
    origin: "both",
  },
  {
    need: "Measure the field as a vector",
    answer: "Four crystal axes: the vector comes from the lattice.",
    origin: "material",
  },
  {
    need: "Keep the vehicle's own field out",
    answer: "The instrument rejects the platform's own magnetic field on board.",
    origin: "design",
  },
  {
    need: "Say how far each position can be trusted",
    answer: "Every fix comes with its error bound.",
    origin: "design",
  },
];

const REGISTER_POST = getPost("register-of-published-experiments");

const H3 = "display text-2xl md:text-3xl font-semibold tracking-tight";

export default function Technology() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(BREADCRUMB_JSON_LD) }}
      />

      {/* ===================== Header ===================== */}
      <div className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow>Technology</Eyebrow>
              <h1
                className="display text-4xl md:text-6xl font-semibold tracking-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                A quantum sensor in diamond, read with light.
              </h1>
              <Lead className="max-w-xl">
                A nitrogen-vacancy (NV) centre is a defect in diamond that behaves like a tiny
                compass you read with light. It works at room temperature, and the crystal lattice
                gives it a sense of direction. We design instruments around it, navigation first.
              </Lead>
            </div>
            <figure>
              <div className="plate p-6 md:p-10 flex items-center justify-center">
                <NVDiagram />
              </div>
              <figcaption className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                Schematic of the NV centre: a nitrogen atom beside a missing carbon in the crystal.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ===================== The principle ===================== */}
      <Prose id="principle">
        <Reveal>
          <Eyebrow>The principle</Eyebrow>
          <H2 className="max-w-3xl mb-6">How a diamond reads the Earth&apos;s magnetic field.</H2>
          <Lead className="max-w-2xl mb-12 md:mb-14">
            Three steps, from the map to the spin. No equations.
          </Lead>
        </Reveal>
        <Reveal delay={80}>
          <Principle />
        </Reveal>
        <Reveal delay={120}>
          <Link href="/applications/navigation#how" className="textlink mt-10">
            How this becomes navigation <span>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ===================== Why diamond ===================== */}
      <Prose id="diamond">
        <Reveal>
          <Eyebrow>Why diamond</Eyebrow>
          <H2 className="max-w-3xl mb-14">
            Room temperature. Survives the platform. Four crystal axes.
          </H2>
        </Reveal>
        <Reveal>
          <DiamondPlate aspect="21/9" sizes="(min-width: 1024px) 1100px, 100vw" className="mb-16" />
        </Reveal>

        <Reveal>
          <h3 className={`${H3} mb-10`} style={{ color: "var(--text-primary)" }}>
            What this means on a vehicle
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {ON_A_VEHICLE.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="hairline pt-6 h-full">
                <h4 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.t}
                </h4>
                <Body>{c.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h3 className={`${H3} mb-5`} style={{ color: "var(--text-primary)" }}>
              Four crystal axes: the vector comes from the lattice.
            </h3>
            <Body className="mb-4">
              In diamond, an NV centre points along one of four directions fixed by the crystal
              lattice. Each direction senses the part of the magnetic field that lies along it.
            </Body>
            <Body>Read together, they give the full vector: its strength and its direction.</Body>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <div className="plate p-6 md:p-10 flex items-center justify-center">
                <div className="w-full max-w-[420px]">
                  <NVAxes />
                </div>
              </div>
              <figcaption className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                An NV centre: a vacancy (dashed) with the nitrogen (blue) on one of its four bonds.
                NV centres point along these four directions.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Prose>

      {/* ===================== By requirement ===================== */}
      <Prose id="requirements">
        <Reveal>
          <Eyebrow>By requirement</Eyebrow>
          <H2 className="max-w-3xl mb-6">What a vehicle asks of a magnetic sensor.</H2>
          <Lead className="max-w-2xl mb-12">
            Others flew NV sensors before us. Diamond brings the first three answers, and how well
            it brings them depends on the material, which is part of our work. The last two depend
            on how the instrument is designed.
          </Lead>
        </Reveal>
        <Reveal delay={80}>
          <div
            className="hidden md:grid md:grid-cols-[1fr_1.35fr_0.75fr] gap-8 pb-4 figure-label"
            aria-hidden="true"
          >
            <span>The vehicle needs to</span>
            <span>How it is met</span>
            <span>Where it comes from</span>
          </div>
          <dl>
            {REQUIREMENTS.map((r) => (
              <div
                key={r.need}
                className="hairline py-6 grid grid-cols-1 md:grid-cols-[1fr_1.35fr_0.75fr] gap-2 md:gap-8"
              >
                <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {r.need}
                </dt>
                <dd className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                  {r.answer}
                </dd>
                <dd className="text-[15px] leading-7 font-medium" style={{ color: "var(--muted)" }}>
                  <span className="md:sr-only">From: </span>
                  {ORIGIN_LABEL[r.origin]}
                </dd>
              </div>
            ))}
          </dl>
          <div className="hairline pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
              Qualitative. Whatever depends on our design, the sensor head included, is design
              intent until shown on hardware.
            </p>
            <Link href="/company#where-we-stand" className="textlink shrink-0">
              Where we stand <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>

      {/* ===================== Simulation first ===================== */}
      <Prose id="simulation">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">
          <Reveal>
            <Eyebrow>Simulation first</Eyebrow>
            <H2 className="mb-6">Every design flies in simulation first.</H2>
            <Lead className="mb-8">
              Before any hardware, we simulate the whole chain: the magnetic terrain, a vehicle
              with its own magnetic field, the sensor and the navigation filter. A small team can
              compare designs this way before anything is fabricated.
            </Lead>
            <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              To be calibrated, useful in relative terms.
            </p>
            <Body>
              The simulation tells us which design is better, not what a prototype will measure.
              Its figures are labelled model-derived, and hardware measurements will calibrate it.
            </Body>
          </Reveal>

          <Reveal delay={120}>
            <div className="plate p-8 md:p-10 h-full flex flex-col">
              <p
                className="display text-6xl md:text-7xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                100+
              </p>
              <p className="mt-3 mb-6 font-semibold" style={{ color: "var(--text-primary)" }}>
                published experiments in our validation register
              </p>
              <p className="text-[15px] leading-7 mb-4" style={{ color: "var(--text-secondary)" }}>
                Quantitative validation covers the subset whose experimental conditions are
                documented well enough, and the list is available on request.
              </p>
              <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                When the model and an experiment disagree, the experiment wins and the model
                changes.
              </p>
              {REGISTER_POST && (
                <Link href={`/news/${REGISTER_POST.slug}`} className="textlink mt-auto pt-8">
                  How the register is kept <span>→</span>
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* ===================== Where we stand ===================== */}
      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <Reveal>
            <Eyebrow>Where we stand</Eyebrow>
            <h2
              className="display text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              {STAGE_LINE}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/instrument" className="btn-primary">
                Fly a mission
              </Link>
              <Link href={CTA_SIMULATION} className="btn-ghost">
                Request an expert session
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-3 md:items-end">
              <Link href="/company#where-we-stand" className="textlink">
                See the dated timeline <span>→</span>
              </Link>
              <Link href="/applications/navigation" className="textlink">
                Navigation, our first application <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Prose>
    </main>
  );
}
