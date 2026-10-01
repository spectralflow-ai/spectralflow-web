/**
 * Content of the applications section: the hub at /applications and one
 * page per application at /applications/<slug>.
 *
 * Navigation has its own product page (a static route). Its entry here is
 * a summary only: it feeds the hub and the cross-links between
 * applications, and its full text lives on the navigation page.
 * Each FAQ is also published as FAQPage structured data, so every answer
 * must stand on its own and stay exact.
 */

import { STAGE_LINE } from "./facts";

export type Beat = { h: string; p: string };
export type Faq = { q: string; a: string };

/** What every application shows on the hub and in cross-links. */
export type Vertical = {
  slug: string;
  /** Short label for menus, hubs and cards. */
  navLabel: string;
  /** Display order; navigation comes first. */
  order: number;
  /** The first application, with its own product page. */
  flagship?: boolean;
  /** Headline on the hub and on the application page. */
  title: string;
  /** One line for hub and cross-link cards. */
  tagline: string;
  /** Short introduction, on the hub and as the page intro. */
  intro: string;
  /** Where this application stands, shown on every card and page. */
  horizon: { label: string; note: string };
  /** Caption under the engraving. */
  glyphCaption: string;
};

/** An application served by the dynamic route, with its full page text. */
export type ApplicationPage = Vertical & {
  eyebrow: string;
  metaTitle: string;
  /** About 155 characters, where it stands included. */
  metaDescription: string;
  /** The domain, explained on its own terms. */
  teach: { eyebrow: string; h: string; lead: string; body: string };
  /** Why NV centres in diamond fit this domain. */
  whyNV: { eyebrow: string; h: string; points: Beat[] };
  /** What carries over from our work. */
  approach: { eyebrow: string; h: string; body: string };
  /** Optional block shown beside the approach: how the work would be done. */
  proof?: { eyebrow: string; h: string; body: string; cta?: { href: string; label: string } };
  cta: { h: string; body: string };
  faq: Faq[];
};

const NAVIGATION: Vertical = {
  slug: "navigation",
  navLabel: "Navigation",
  order: 1,
  flagship: true,
  title: "Navigation you can trust without GPS.",
  tagline: "A magnetic reference read from the Earth's own field, with an error bound on every fix.",
  intro:
    "Where satellite positioning fails, nobody can say how wrong the position is. Our instrument reads the Earth's magnetic field, matches it against a map to correct the inertial unit, and returns each fix with its error bound. Navigation is the first application we are developing.",
  horizon: {
    label: "First application",
    note: STAGE_LINE,
  },
  glyphCaption: "The field read on board, matched against a magnetic map, gives a position fix.",
};

const APPLICATION_PAGES: ApplicationPage[] = [
  {
    slug: "life-sciences",
    navLabel: "Life sciences",
    order: 2,
    eyebrow: "Applications · Life sciences",
    title: "Diamond sensors for molecules and living cells.",
    tagline: "Chip-scale NMR of molecules, and the magnetic noise of free radicals in living cells.",
    intro:
      "The NV centres we develop for navigation can also read biology, in two ways: nuclear magnetic resonance of molecules on a diamond surface, and relaxometry, which follows free-radical activity inside living cells.",
    horizon: {
      label: "Research direction",
      note: "No product today. Work here would start with research partners, after navigation.",
    },
    metaTitle: "Life sciences: chip-scale NMR and quantum biosensing",
    metaDescription:
      "NV centres in diamond for life sciences: chip-scale NMR of molecules at a surface, and relaxometry in living cells. A research direction for Spectral Flow.",
    glyphCaption:
      "One NV sensor, two reads: a molecule at the diamond surface, and radical noise inside a cell.",
    teach: {
      eyebrow: "The domain",
      h: "Molecules at a surface, and the magnetic noise of a living cell.",
      lead:
        "Two different measurements share one diamond sensor. One reads chemistry at a surface. The other follows free-radical activity inside a cell.",
      body:
        "Chip-scale NMR brings nuclear magnetic resonance down to a sensor on a chip. NV centres close to the diamond surface pick up the nuclear spins of molecules sitting on it, in samples too small for a conventional coil. Relaxometry works differently. A fluorescent nanodiamond inside a living cell loses its spin polarisation faster when free radicals nearby add magnetic noise. Following that change over time gives a view of radical activity without consuming a chemical probe.",
    },
    whyNV: {
      eyebrow: "Why diamond",
      h: "Where coils and dyes reach their limits.",
      points: [
        {
          h: "Small samples",
          p: "The signal comes from molecules right at the diamond surface, in volumes far too small for a conventional coil.",
        },
        {
          h: "Inside living cells",
          p: "Nanodiamonds are reported to be well tolerated by many cell types and are not used up by the measurement, so the same cell can be followed over time.",
        },
        {
          h: "No dye to bleach",
          p: "The sensor reads a magnetic signal directly. It does not rely on a dye that fades or reacts.",
        },
        {
          h: "Room temperature",
          p: "No cryogenics. The measurement runs at ambient conditions.",
        },
      ],
    },
    approach: {
      eyebrow: "What carries over",
      h: "Better diamond, and a reading that states its uncertainty.",
      body:
        "Two parts of our navigation work apply here: the diamond material, whose quality sets the limit of every measurement made with it, and software that turns a noisy optical signal into a value with its uncertainty.",
    },
    proof: {
      eyebrow: "How we would work",
      h: "Joint research, after navigation.",
      body:
        "Work here would be joint research with laboratories in diamond fabrication, surface chemistry and NMR. It comes after navigation, our first application.",
    },
    cta: {
      h: "Research in NMR, structural biology or cell biology?",
      body:
        "If a measurement in your laboratory is limited by sample size or by the probe, we would like to hear about it.",
    },
    faq: [
      {
        q: "What is chip-scale NMR?",
        a: "Chip-scale NMR brings nuclear magnetic resonance down to a sensor on a chip. With nitrogen-vacancy centres in diamond, it reads the nuclear spins of molecules at or near the diamond surface, in sample volumes far too small for a conventional inductive coil.",
      },
      {
        q: "What is quantum biosensing with nanodiamonds?",
        a: "Fluorescent nanodiamonds that contain nitrogen-vacancy centres can act as magnetic sensors inside living cells. In relaxometry, magnetic noise from nearby free radicals shortens the spin relaxation time of the NV centres. Researchers use this to follow changes in radical activity over time, without consuming a chemical probe.",
      },
      {
        q: "Does nanodiamond relaxometry measure a concentration?",
        a: "Not directly. It senses magnetic noise near the sensor, which reflects radical activity around it. The signal is best read as a relative change over time, not as an absolute concentration.",
      },
      {
        q: "Does Spectral Flow sell life-science instruments?",
        a: "No. Life sciences is a research direction for Spectral Flow, to be pursued with research partners. Its first application is navigation without GPS.",
      },
    ],
  },
  {
    slug: "semiconductors",
    navLabel: "Semiconductors & industry",
    order: 3,
    eyebrow: "Applications · Semiconductors & industry",
    title: "See the current inside the chip.",
    tagline: "Magnetic imaging of buried current paths and defects, at room temperature.",
    intro:
      "As chips stack into 2.5D and 3D packages, the faults that matter hide in layers that light and electrons struggle to reach. A quantum diamond microscope images the magnetic field of the current itself, at room temperature, with a measurement that does not alter the part.",
    horizon: {
      label: "Adjacent market",
      note: "The same physics as navigation, used for imaging. No instrument offered today.",
    },
    metaTitle: "Semiconductor failure analysis and industrial inspection",
    metaDescription:
      "Diamond quantum microscopy for failure analysis and inspection: magnetic images of buried current paths and defects. An adjacent market for Spectral Flow.",
    glyphCaption: "A layer of NV centres images the magnetic field of a buried current path.",
    teach: {
      eyebrow: "The domain",
      h: "The faults that matter are buried.",
      lead:
        "Advanced packaging stacks silicon into dense 2.5D and 3D structures. When a part fails, the defect is often several layers down, hard to reach with optical and electron methods.",
      body:
        "Every current creates a magnetic field, and that field passes through layers that block light. Imaging it shows where the current actually flows, and where it should not. A quantum diamond microscope maps those fields across a surface, turning a magnetic image into a picture of buried current paths, shorts and defects. The same principle applies to industrial inspection, where many hidden flaws in welds, batteries and critical parts change the local magnetic field.",
    },
    whyNV: {
      eyebrow: "Why diamond",
      h: "A magnetic picture of where the current flows.",
      points: [
        {
          h: "Non-destructive measurement",
          p: "It images the field the part produces when powered. The measurement itself does not alter the part. Some samples still need preparation to bring the sensor close.",
        },
        {
          h: "A whole area at once",
          p: "A thin layer of NV centres images a field of view in one go, rather than scanning point by point.",
        },
        {
          h: "Room temperature",
          p: "No cryogenics and no vacuum, so it can sit in an ordinary analysis laboratory.",
        },
        {
          h: "Static fields too",
          p: "It reads static and slowly varying fields, which methods based on induced currents do not see directly.",
        },
      ],
    },
    approach: {
      eyebrow: "What carries over",
      h: "The same diamond and readout, used for imaging.",
      body:
        "Magnetic imaging of chips with diamond has been shown in research laboratories, and instruments of this kind already exist. What we would bring is what we develop for navigation: the diamond material, its optical readout, and software that gives each value with its uncertainty.",
    },
    cta: {
      h: "Failure analysis or inspection where conventional methods stop?",
      body:
        "We would like to hear from teams in advanced packaging, energy storage and critical-parts inspection. Tell us what you need to see.",
    },
    faq: [
      {
        q: "What is a quantum diamond microscope?",
        a: "A quantum diamond microscope uses a thin layer of nitrogen-vacancy centres in diamond to image magnetic fields across a surface. Because every electrical current produces a magnetic field, it can map where current flows, at room temperature, with a measurement that does not alter the sample.",
      },
      {
        q: "How does it find defects inside a chip?",
        a: "Magnetic fields pass through the layers of a package that block light. By imaging the field of a powered chip, the microscope shows where current actually flows, which reveals shorts, opens and buried defects. The farther a current lies from the diamond, the coarser its image, so depth sets what can be resolved.",
      },
      {
        q: "What can it inspect beyond semiconductors?",
        a: "The same principle applies to non-destructive testing: many hidden flaws in welds, batteries and critical metal parts change the local magnetic field in a way a diamond sensor can read, including static fields.",
      },
      {
        q: "Does Spectral Flow sell a diamond microscope?",
        a: "No. Semiconductors and industry are an adjacent market for the diamond material and readout that Spectral Flow develops for navigation, its first application.",
      },
    ],
  },
  {
    slug: "quantum-computing",
    navLabel: "Quantum computing",
    order: 4,
    eyebrow: "Applications · Quantum computing",
    title: "Spin control at room temperature.",
    tagline: "The NV spin as a building block for quantum information, controlled at room temperature.",
    intro:
      "The nitrogen-vacancy spin we read for sensing can also be prepared and read out with light, and controlled with microwaves, at room temperature. That makes it a candidate building block for quantum information.",
    horizon: {
      label: "Longer horizon",
      note: "A research direction we follow. No product today.",
    },
    metaTitle: "Quantum information with diamond spins",
    metaDescription:
      "The NV spin in diamond is read out with light and controlled with microwaves, at room temperature. A longer-horizon research direction for Spectral Flow.",
    glyphCaption:
      "An NV electron spin coupled to a neighbouring nuclear spin: a small register at room temperature.",
    teach: {
      eyebrow: "The domain",
      h: "Many qubits have to be kept cold.",
      lead:
        "Several leading qubit platforms run a fraction of a degree above absolute zero, inside dilution refrigerators. That cooling adds cost and complexity.",
      body:
        "A nitrogen-vacancy centre in diamond behaves differently. Its electron spin can be prepared and read out with light, and controlled with microwaves, at room temperature. Coupled to nearby nuclear spins, it forms a small quantum register. Scaling that register to many connected qubits is still an open research problem, and most work on linking NV qubits over distance is done at cryogenic temperatures.",
    },
    whyNV: {
      eyebrow: "Why diamond",
      h: "What helps sensing also helps information.",
      points: [
        {
          h: "Read with light",
          p: "The spin is prepared and read out optically, the same mechanism our sensors rely on.",
        },
        {
          h: "Coherent at room temperature",
          p: "It keeps a coherent spin state at room temperature, without a dilution refrigerator.",
        },
        {
          h: "A local register",
          p: "Nearby nuclear spins extend a single centre into a small quantum register.",
        },
        {
          h: "Shared foundation",
          p: "Coherence is the common thread: the material work that improves our sensors also matters here.",
        },
      ],
    },
    approach: {
      eyebrow: "What carries over",
      h: "The material and the spin control carry over.",
      body:
        "We follow quantum information as a research direction. The diamond material and the spin control that our sensors need carry over to it, and we keep track of the field.",
    },
    cta: {
      h: "Exploring room-temperature spin control?",
      body: "If NV spins are part of your research, we would like to hear about it.",
    },
    faq: [
      {
        q: "Can nitrogen-vacancy centres be used as qubits?",
        a: "Yes. The electron spin of a nitrogen-vacancy centre in diamond can be prepared and read out optically, controlled with microwaves, and coupled to nearby nuclear spins to form a small quantum register. NV centres are an established platform for research in quantum sensing, quantum networking and quantum information.",
      },
      {
        q: "What does room-temperature quantum computing mean?",
        a: "It refers to quantum hardware that runs without cryogenic cooling. Several qubit platforms need temperatures close to absolute zero. A single NV spin and its nearby nuclear spins can be controlled at room temperature, which is why diamond is studied for this. Scaling to many connected qubits at room temperature remains an open research question.",
      },
      {
        q: "Where is quantum computing on Spectral Flow's roadmap?",
        a: "It is a longer-horizon research direction, not a product. Spectral Flow's first application is navigation without GPS; the diamond material and spin control it requires carry over to quantum information over time.",
      },
    ],
  },
];

/** Every application, navigation first. */
export const VERTICALS_CONTENT: Vertical[] = [NAVIGATION, ...APPLICATION_PAGES];

export const VERTICALS_ORDERED: Vertical[] = [...VERTICALS_CONTENT].sort((a, b) => a.order - b.order);

export const VERTICAL_SLUGS = VERTICALS_ORDERED.map((v) => v.slug);

/** The first application, navigation. */
export const FLAGSHIP_VERTICAL: Vertical = NAVIGATION;

/** Applications after navigation, served by the dynamic route. */
export const ADJACENT_VERTICALS: ApplicationPage[] = [...APPLICATION_PAGES].sort(
  (a, b) => a.order - b.order
);

/** An application page served by the dynamic route (navigation has its own). */
export function getVertical(slug: string): ApplicationPage | undefined {
  return APPLICATION_PAGES.find((v) => v.slug === slug);
}

export function verticalHref(slug: string): string {
  return `/applications/${slug}`;
}
