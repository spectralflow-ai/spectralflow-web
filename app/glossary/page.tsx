import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { BRAND, SITE_URL } from "../lib/facts";

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/glossary";
const DESCRIPTION =
  "Navigation without GPS and diamond quantum sensing in plain words: GNSS, jamming, spoofing, magnetic maps, NV centres, error bound.";

export const metadata: Metadata = {
  title: "Glossary",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: `Glossary · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Glossary · ${BRAND}`,
    description: DESCRIPTION,
  },
};

/* ----- Terms --------------------------------------------------------- */

type Term = {
  /** Anchor, permanent once published. */
  id: string;
  term: string;
  /** Expansion of an abbreviation, or another common name. */
  alt?: string;
  /** Plain text: the same string feeds the page and the structured data. */
  def: string;
  /** Other terms on this page, by id. */
  see?: string[];
  /** Where the site uses the term. */
  more?: { href: string; label: string };
};

type Group = { id: string; label: string; title: string; terms: Term[] };

const GROUPS: Group[] = [
  {
    id: "satellites",
    label: "Positioning",
    title: "When satellites cannot be trusted.",
    terms: [
      {
        id: "gnss",
        term: "GNSS",
        alt: "Global navigation satellite systems",
        def: "The global satellite positioning systems: GPS (United States), Galileo (Europe), GLONASS (Russia) and BeiDou (China). A receiver computes its position from the timing of signals broadcast by several satellites. The signals reach the ground very weak, which is why they can be drowned or imitated. In everyday speech, GPS often stands for all of them.",
        see: ["jamming", "spoofing", "pnt"],
      },
      {
        id: "pnt",
        term: "PNT",
        alt: "Positioning, navigation and timing",
        def: "The three services a satellite navigation system delivers at once: where you are, how you are moving, and what time it is. Alternative PNT covers the means that keep these services going when satellites cannot be used.",
        see: ["gnss", "magnetic-navigation"],
      },
      {
        id: "jamming",
        term: "Jamming",
        def: "Radio noise transmitted on satellite navigation frequencies, deliberately or not. It drowns the satellite signal: the receiver loses its position and, in general, knows that it has lost it.",
        see: ["spoofing", "gnss"],
        more: { href: "/applications/navigation#problem", label: "The problem" },
      },
      {
        id: "spoofing",
        term: "Spoofing",
        def: "Counterfeit satellite navigation signals, transmitted to replace the real ones. The receiver computes a position that looks healthy but is false, and it may have no way of telling.",
        see: ["jamming", "integrity"],
        more: { href: "/applications/navigation#problem", label: "The problem" },
      },
      {
        id: "inertial-navigation",
        term: "Inertial navigation",
        alt: "Inertial unit, INS",
        def: "Navigation from accelerometers and gyroscopes that measure the vehicle's own motion. It needs no outside signal and gives a smooth, continuous estimate, but its small errors add up: the position drifts further from the truth as time passes.",
        see: ["drift", "map-matching"],
      },
      {
        id: "drift",
        term: "Drift",
        def: "The error an inertial unit accumulates when nothing outside corrects it. A fix from another source, satellite or magnetic, pulls the estimate back. Our instrument completes the inertial unit, it does not replace it.",
        see: ["inertial-navigation", "magnetic-navigation"],
      },
    ],
  },
  {
    id: "field",
    label: "The Earth's field",
    title: "A map the Earth already carries.",
    terms: [
      {
        id: "earth-magnetic-field",
        term: "Earth's magnetic field",
        alt: "Geomagnetic field",
        def: "The field produced mainly by the Earth's liquid outer core, with smaller contributions from magnetised rocks in the crust and from electric currents high in the atmosphere and in near space. It is present everywhere, day and night, at sea and under water, with no transmitter. During a magnetic storm, driven by the Sun, the field varies quickly, which limits magnetic navigation of every kind.",
        see: ["magnetic-anomaly", "magnetometer"],
      },
      {
        id: "magnetic-anomaly",
        term: "Magnetic anomaly",
        def: "The part of the measured field that comes from magnetised rocks in the Earth's crust, once the field of the core is removed. It changes from one place to the next and stays stable over years, which makes it a fingerprint of the ground below.",
        see: ["magnetic-anomaly-map", "earth-magnetic-field"],
        more: { href: "/technology#principle", label: "The principle" },
      },
      {
        id: "magnetic-anomaly-map",
        term: "Magnetic anomaly map",
        def: "A map of the magnetic anomaly, compiled from airborne, marine and satellite surveys. Its detail and accuracy vary from one region to another. In magnetic navigation, the map, more than the sensor, sets the value of a fix.",
        see: ["magnetic-anomaly", "map-matching"],
      },
      {
        id: "map-matching",
        term: "Map matching",
        def: "Finding where a vehicle is by comparing what it measures along its path with a reference map of the same quantity. The idea is used with terrain height, with gravity and with the magnetic anomaly.",
        see: ["magnetic-navigation", "magnetic-anomaly-map"],
      },
      {
        id: "magnetic-navigation",
        term: "Magnetic navigation",
        alt: "Magnetic map-aided navigation, MagNav",
        def: "Navigation that matches the magnetic anomaly measured on board against an anomaly map, and uses each fix to correct the drift of the inertial unit. It is passive: it reads the Earth's own field and needs no external signal. A magnetic source placed nearby can disturb a magnetometer. Our instrument is designed to detect that and say so.",
        see: ["map-matching", "platform-magnetic-field", "error-bound"],
        more: { href: "/applications/navigation#how", label: "How it works" },
      },
      {
        id: "platform-magnetic-field",
        term: "Platform magnetic field",
        alt: "Vehicle interference",
        def: "The magnetic field a vehicle produces itself: its steel, its engines, its electrical currents. It changes as the vehicle turns and as its systems switch on and off, and it has to be removed before the Earth's field can be read. Our instrument is designed to reject it on board, in real time.",
        see: ["magnetic-navigation", "vector-magnetometer"],
      },
    ],
  },
  {
    id: "sensor",
    label: "The sensor",
    title: "A quantum sensor in diamond.",
    terms: [
      {
        id: "magnetometer",
        term: "Magnetometer",
        def: "An instrument that measures a magnetic field. Some magnetometers measure only its strength; a vector magnetometer also measures its direction.",
        see: ["vector-magnetometer", "quantum-sensing"],
      },
      {
        id: "vector-magnetometer",
        term: "Vector magnetometer",
        def: "A magnetometer that measures the three components of the field, and so its direction as well as its strength. In a diamond sensor, the full vector can come from the crystal lattice itself.",
        see: ["nv-centre", "diamond-lattice"],
        more: { href: "/technology#diamond", label: "Why diamond" },
      },
      {
        id: "quantum-sensing",
        term: "Quantum sensing",
        def: "Measurement that uses a quantum system as its probe, such as the spin of an electron, which behaves like a tiny magnet. A diamond quantum sensor reads the field from a resonance frequency: the stronger the field along the defect's axis, the further that frequency shifts.",
        see: ["nv-centre", "odmr"],
      },
      {
        id: "nv-centre",
        term: "NV centre",
        alt: "Nitrogen-vacancy centre",
        def: "A defect in the diamond crystal: a nitrogen atom next to a vacant site where a carbon atom is missing. It holds an electron spin that behaves like a tiny compass you read with light, at room temperature. NV centres lie along the four crystal axes of diamond, so together they give the full field vector.",
        see: ["odmr", "spin-coherence", "diamond-lattice"],
        more: { href: "/technology#principle", label: "The principle" },
      },
      {
        id: "diamond-lattice",
        term: "Diamond lattice",
        def: "The regular arrangement of carbon atoms in diamond, each bound to four neighbours. The lattice is stiff and transparent, which helps an NV centre keep its spin coherent at room temperature and lets it be read with visible light. Its bond directions set the four orientations an NV centre can take.",
        see: ["nv-centre", "vector-magnetometer"],
        more: { href: "/technology#diamond", label: "Why diamond" },
      },
      {
        id: "odmr",
        term: "ODMR",
        alt: "Optically detected magnetic resonance",
        def: "The way an NV centre is read. Green light sets its spin in a known state and makes it glow red. A microwave field is swept in frequency, and at resonance the red glow dips. The magnetic field shifts the frequencies of those dips, so measuring them measures the field. It is magnetic resonance, as in MRI, read with light.",
        see: ["nv-centre", "spin-coherence"],
        more: { href: "/technology#principle", label: "The principle" },
      },
      {
        id: "spin-coherence",
        term: "Spin coherence",
        def: "How long a spin keeps a well-defined rhythm, like a spinning top before it starts to wobble. The longer the coherence, the finer the field a sensor can resolve. It is limited by everything around the spin: other spins, impurities, strain in the crystal and its surface.",
        see: ["nv-centre", "diamond-lattice"],
      },
      {
        id: "room-temperature",
        term: "Room temperature",
        def: "Said of a sensor that works at the temperature around it. NV centres in diamond keep their spin properties at room temperature, so the sensor needs no cryogenic cooling and no consumables, which suits an instrument carried on a vehicle.",
        see: ["nv-centre", "diamond-lattice"],
        more: { href: "/technology#diamond", label: "Why diamond" },
      },
    ],
  },
  {
    id: "trust",
    label: "Trust",
    title: "How far to trust a position.",
    terms: [
      {
        id: "error-bound",
        term: "Error bound",
        def: "A limit, computed with each fix, that the position error is not expected to exceed, at a stated level of confidence. Not how accurate a system was on a good day: how wrong it can be right now. Our instrument is designed so that every fix comes with its error bound.",
        see: ["integrity", "drift"],
        more: { href: "/applications/navigation#bound", label: "The error bound" },
      },
      {
        id: "integrity",
        term: "Integrity",
        def: "The ability of a navigation system to warn in time when its output should not be trusted. In aviation it is a requirement in its own right, next to accuracy, continuity and availability. Our instrument is designed to say when not to trust it.",
        see: ["error-bound", "spoofing"],
        more: { href: "/applications/navigation#bound", label: "The error bound" },
      },
    ],
  },
  {
    id: "method",
    label: "How we work",
    title: "Simulation first.",
    terms: [
      {
        id: "simulation",
        term: "Simulation",
        def: "A computer model of the sensor, the vehicle, the map and the navigation chain, used to compare designs and to fly missions before hardware exists. For the sensor physics, our register covers more than a hundred published experimental results; quantitative comparison covers those whose experimental conditions are documented well enough. The model still has to be calibrated against our own hardware, and it is useful in relative terms: to compare options, not to promise a figure.",
        see: ["model-derived", "mission-demo"],
        more: { href: "/technology#simulation", label: "Simulation first" },
      },
      {
        id: "model-derived",
        term: "Model-derived",
        def: "Said of a figure that comes from simulation rather than from a measurement on hardware. Every figure in our mission demo is model-derived.",
        see: ["simulation", "mission-demo"],
      },
      {
        id: "mission-demo",
        term: "Mission demo",
        def: "A simulated mission flown in the browser: the vehicle, the magnetic terrain, the interference and the navigation chain, computed in simulation, with each position and its error bound.",
        see: ["simulation", "error-bound"],
        more: { href: "/instrument", label: "Fly a mission" },
      },
    ],
  },
];

const ALL_TERMS = GROUPS.flatMap((g) => g.terms);
const TERM_BY_ID = new Map(ALL_TERMS.map((t) => [t.id, t]));
const INDEX = [...ALL_TERMS].sort((a, b) => a.term.localeCompare(b.term, "en"));

/* ----- Structured data ----------------------------------------------- */

const SET_ID = `${SITE_URL}${PAGE_PATH}#terms`;

const GLOSSARY_JSONLD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": SET_ID,
  name: `${BRAND} glossary`,
  description: DESCRIPTION,
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#org` },
  hasDefinedTerm: ALL_TERMS.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}${PAGE_PATH}#${t.id}`,
    name: t.term,
    ...(t.alt ? { alternateName: t.alt } : {}),
    description: t.def,
    url: `${SITE_URL}${PAGE_PATH}#${t.id}`,
    inDefinedTermSet: { "@id": SET_ID },
  })),
};

/* ----- Page ---------------------------------------------------------- */

function TermEntry({ t }: { t: Term }) {
  const related = (t.see ?? [])
    .map((id) => TERM_BY_ID.get(id))
    .filter((x): x is Term => !!x);

  return (
    <div id={t.id} className="hairline py-8 grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-3 md:gap-12">
      <dt>
        <a
          href={`#${t.id}`}
          className="font-semibold text-lg display transition-colors text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
        >
          {t.term}
        </a>
        {t.alt && (
          <span className="block text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {t.alt}
          </span>
        )}
      </dt>
      <dd className="max-w-2xl">
        <Body>{t.def}</Body>
        {(related.length > 0 || t.more) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {related.length > 0 && (
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                See also{" "}
                {related.map((r, i) => (
                  <span key={r.id}>
                    {i > 0 && ", "}
                    <a
                      href={`#${r.id}`}
                      className="underline underline-offset-2 decoration-[color:var(--border-strong)] transition-colors hover:text-[color:var(--text-primary)]"
                    >
                      {r.term}
                    </a>
                  </span>
                ))}
              </p>
            )}
            {t.more && (
              <Link href={t.more.href} className="textlink">
                {t.more.label} <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        )}
      </dd>
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOSSARY_JSONLD) }}
      />

      <PageHeader
        eyebrow="Glossary"
        title="The terms of quantum navigation."
        intro="From satellite jamming to the spin of a defect in diamond: the words we use, defined in plain terms. Each entry links to related terms and to the page where we use it."
      />

      {/* Index */}
      <nav aria-label="Terms in this glossary" className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6">
          <p className="figure-label mb-3">All terms, A to Z</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {INDEX.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="text-sm transition-colors text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                  {t.term}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {GROUPS.map((g) => (
        <Prose id={g.id} key={g.id}>
          <div className="mb-6">
            <Eyebrow>{g.label}</Eyebrow>
            <H2 className="max-w-3xl">{g.title}</H2>
          </div>
          <dl>
            {g.terms.map((t) => (
              <TermEntry key={t.id} t={t} />
            ))}
          </dl>
        </Prose>
      ))}

      <Prose>
        <div className="max-w-2xl">
          <Eyebrow>Missing a term?</Eyebrow>
          <Body className="mb-5">
            Tell us which word stopped you, and we will add it.
          </Body>
          <Link href="/contact" className="textlink">
            Write to us <span aria-hidden>→</span>
          </Link>
        </div>
      </Prose>
    </main>
  );
}
