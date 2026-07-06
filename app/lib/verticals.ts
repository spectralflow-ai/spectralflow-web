/**
 * Vertical application pages : single source of truth for /applications/<slug>.
 *
 * Discipline (see REBUILD_BRIEF_V4.md): pedagogy first, allusive on our approach,
 * NEVER the ruptures (no tensor / 4-chip / inference internals / recipes / perf
 * numbers). Everything model-derived and pre-prototype. Partners unnamed until cleared.
 * The FAQ blocks double as AI-citability (GEO) surface: keep answers self-contained,
 * factual and quotable.
 */

export type Beat = { h: string; p: string };
export type Faq = { q: string; a: string };

export type Vertical = {
  slug: string;
  navLabel: string; // short label for hubs / sub-nav
  order: number; // navigation is the flagship (1)
  flagship?: boolean;
  eyebrow: string;
  title: string; // page H1
  tagline: string; // one-line, used on the hub card
  intro: string; // page intro + meta description seed
  metaTitle: string;
  metaDescription: string;
  // Beat 1 : teach the domain (neutral, citable)
  teach: { eyebrow: string; h: string; lead: string; body: string };
  // Beat 2 : why NV-diamond fits here
  whyNV: { eyebrow: string; h: string; points: Beat[] };
  // Beat 3 : our approach (allusive; mechanism, never recipe)
  approach: { eyebrow: string; h: string; body: string };
  // Beat 4 : proof / tools (optional live tool link)
  proof?: { eyebrow: string; h: string; body: string; cta?: { href: string; label: string } };
  // Beat 5 : CTA copy
  cta: { h: string; body: string };
  faq: Faq[];
};

export const VERTICALS_CONTENT: Vertical[] = [
  {
    slug: "navigation",
    navLabel: "Navigation",
    order: 1,
    flagship: true,
    eyebrow: "Vertical #1 · GPS-denied navigation",
    title: "Navigation where GPS cannot reach.",
    tagline: "A passive magnetic reference nobody can switch off, for air, sea and space.",
    intro:
      "Satellite navigation is jammed, spoofed and denied across contested airspace, deep oceans and orbit. A passive magnetic reference that emits nothing and cannot be switched off closes the gap. It is the vertical we ship first.",
    metaTitle: "GPS-denied navigation",
    metaDescription:
      "SpectralFlow designs NV-diamond magnetometers for GPS-denied (magnetic) navigation across air, sea and space: passive, unjammable, room temperature and chip-scale. Vertical #1.",
    teach: {
      eyebrow: "The domain",
      h: "When satellites go dark, inertial systems drift.",
      lead:
        "Most vehicles fall back on inertial navigation when GPS is lost. Inertial systems accumulate error the moment the signal drops, and the drift only grows with time.",
      body:
        "Magnetic navigation offers a different reference. The Earth's crust has a fixed magnetic signature that varies from place to place, a map that no adversary can switch off. A sensitive magnetometer reads the local field and matches it against that map to fix position and heading. Because it only listens, it emits nothing, so there is nothing to detect, jam or spoof.",
    },
    whyNV: {
      eyebrow: "Why NV-diamond",
      h: "A magnetometer built for the vehicle, not the lab.",
      points: [
        { h: "Room temperature", p: "No cryogenics and no shielded room, so it runs field-ready where SQUIDs and cold atoms cannot go." },
        { h: "Passive and silent", p: "It reads the ambient field and radiates no RF. Nothing to detect, nothing to jam, nothing to spoof." },
        { h: "Vector and solid-state", p: "A single solid-state core holds coherence under shock and motion, on drones, hulls and launch loads." },
        { h: "Radiation-hard", p: "Diamond is intrinsically radiation-tolerant, which keeps the sensor working in orbit and on re-entry." },
      ],
    },
    approach: {
      eyebrow: "Our approach",
      h: "We measure, where others compensate.",
      body:
        "Every magnetometer flying today is a lab instrument strapped onto a vehicle, corrected by external compensation models dating back to 1953. We take the opposite path: a sensing architecture that identifies and removes the vehicle's own magnetic noise on board, in real time, so the measurement stays true under way. The cleaned reading is matched to a magnetic map to hold heading and correct inertial drift, continuously, with no satellites in the loop.",
    },
    proof: {
      eyebrow: "See it fly",
      h: "The sensor already flies. In software.",
      body:
        "Before the first device is built, an end-to-end navigation digital twin flies the mission: a synthetic magnetic map, a vehicle with its own interference, the full sensor model and the navigation filter. Every figure is honestly labelled model-derived. The public layer runs live in your browser.",
      cta: { href: "/instrument", label: "Fly the Instrument" },
    },
    cta: {
      h: "Positioning where conventional technology stops?",
      body: "We work with partners who need resilient navigation in contested air, sea and space. Tell us about the environment you operate in.",
    },
    faq: [
      {
        q: "What is GPS-denied navigation?",
        a: "GPS-denied navigation is positioning and heading without satellite signals, in places where GPS is jammed, spoofed or physically unavailable such as contested airspace, underwater and orbit. It relies on references a vehicle carries or senses locally, such as inertial systems and magnetic-field maps, rather than on an external signal.",
      },
      {
        q: "How does magnetic navigation (MagNav) work?",
        a: "The Earth's crustal magnetic field forms a fixed spatial pattern. A sensitive magnetometer measures the local field and matches it against a stored magnetic map to estimate position and heading, and to correct the drift of an inertial system. Because the sensor only listens, the method is passive and cannot be jammed.",
      },
      {
        q: "Why use NV-diamond rather than other magnetometers?",
        a: "Nitrogen-vacancy (NV) centres in diamond sense magnetic fields at room temperature, with no cryogenics or shielding, in a small solid-state package that survives vibration and radiation. That ruggedness is what lets a quantum-grade magnetometer leave the laboratory and ride on a vehicle.",
      },
      {
        q: "Can a magnetic navigation sensor be jammed or detected?",
        a: "No. The sensor is passive: it reads the ambient magnetic field and emits no radio-frequency energy. There is no signal to jam or spoof, and nothing to detect, which is the core advantage over satellite navigation in contested environments.",
      },
    ],
  },
  {
    slug: "life-sciences",
    navLabel: "Life sciences",
    order: 2,
    eyebrow: "Vertical · Life sciences",
    title: "Two quantum reads of the living world.",
    tagline: "Chip-scale NMR of molecules, and the magnetic signature of living cells.",
    intro:
      "The same NV-diamond core reads biology two different ways: molecular binding by chip-scale magnetic resonance, and free-radical activity by relaxometry inside living cells. Both sit on a material almost no one has explored. A direction we are developing with research partners.",
    metaTitle: "Life sciences: chip-scale NMR & quantum biosensing",
    metaDescription:
      "NV-diamond quantum sensing for life sciences: chip-scale NMR of molecules and relaxometry of free-radical (ROS) activity in living cells, at room temperature. A research direction SpectralFlow is developing.",
    teach: {
      eyebrow: "The domain",
      h: "Molecular binding, and the noise of a living cell.",
      lead:
        "Two distinct physics, one diamond core. One reads chemistry; one reads a window on free-radical activity.",
      body:
        "Chip-scale NMR miniaturises nuclear magnetic resonance: a shallow sensor reads the nuclear spins of a molecule sitting on a surface, reporting binding and relaxation in the mass-limited, picolitre regime where a conventional coil cannot reach. Relaxometry works differently: a fluorescent nanodiamond inside a living cell has its coherence shortened by the magnetic noise of nearby radicals, tracking reactive-oxygen-species flux in real time, without consuming a probe.",
    },
    whyNV: {
      eyebrow: "Why NV-diamond",
      h: "Where coils and dyes cannot go.",
      points: [
        { h: "Mass-limited", p: "The sensor is strong exactly where a coil is weak: on a surface, in a picolitre, near a single molecule." },
        { h: "Inside living cells", p: "A biocompatible nanodiamond sits inside a cell and reports without being consumed, so the same cell can be watched over time." },
        { h: "Label-free flux", p: "It senses a magnetic signature directly, reporting a local flux rather than requiring a chemical label." },
        { h: "Room temperature", p: "No cryogenics: the physics runs at ambient conditions, on the bench." },
      ],
    },
    approach: {
      eyebrow: "Our approach",
      h: "A better sensing element, and an honest readout.",
      body:
        "We bring two layers the field is missing. A coherence-certified nanodiamond, whose properties are specified rather than left to chance, lifts every measurement above it. And a readout layer turns a noisy sensor trace into a reading with honest uncertainty, rather than a curve fitted by hand. We say what the physics allows, and we are explicit about what it does not: relaxometry senses a magnetic flux, not a chemical assay.",
    },
    proof: {
      eyebrow: "Where we are",
      h: "Pre-prototype, and collaborative by design.",
      body:
        "The strongest version of this is built with the research ecosystem: we bring the design engine and the readout; academic partners in diamond fabrication, surface chemistry and structural NMR bring the cleanroom and the biological ground truth. The recipes and the engine stay ours; the science is joint. Every figure is model-derived.",
    },
    cta: {
      h: "A research or industrial collaboration in life sciences?",
      body: "We work with groups in structural biology, diamond fabrication and surface chemistry. Tell us what you are trying to measure.",
    },
    faq: [
      {
        q: "What is chip-scale NMR?",
        a: "Chip-scale NMR miniaturises nuclear magnetic resonance from a room-sized instrument to a sensor on a chip. Using nitrogen-vacancy centres in diamond, it reads the nuclear spins of molecules in very small, mass-limited volumes such as a surface layer or a picolitre of sample, a regime that is out of reach for conventional inductive coils.",
      },
      {
        q: "What is quantum biosensing with nanodiamonds?",
        a: "Fluorescent nanodiamonds containing nitrogen-vacancy centres act as quantum sensors inside living cells. Through T1 relaxometry, the sensor's coherence is shortened by the magnetic noise of nearby paramagnetic radicals, letting researchers track reactive-oxygen-species (ROS) activity in real time, without consuming a chemical probe.",
      },
      {
        q: "Does nanodiamond relaxometry measure an absolute concentration?",
        a: "No. It senses a local magnetic flux from radical activity, best understood as a flux or variation in the micromolar regime rather than an absolute nanomolar concentration. Treating the signal as a flux, and being explicit about that, is what keeps the measurement honest.",
      },
      {
        q: "Why is NV-diamond suited to life-science sensing?",
        a: "NV-diamond works at room temperature, is biocompatible, and is strongest in the mass-limited regime, on a surface, in a picolitre, or inside a single cell, where conventional NMR coils and consumable fluorescent dyes cannot operate.",
      },
    ],
  },
  {
    slug: "semiconductors",
    navLabel: "Semiconductors & industry",
    order: 3,
    eyebrow: "Vertical · Semiconductors & industry",
    title: "See the current inside the chip.",
    tagline: "Non-destructive magnetic imaging of buried defects and current paths.",
    intro:
      "As chips stack into 2.5D and 3D packages, the faults that matter hide in buried layers that light and electrons cannot reach. A quantum magnetic microscope images the current itself, non-destructively, at room temperature.",
    metaTitle: "Semiconductor metrology & industrial inspection",
    metaDescription:
      "NV-diamond quantum microscopy for semiconductor failure analysis and industrial non-destructive testing: non-perturbative magnetic imaging of buried current paths and defects, at room temperature.",
    teach: {
      eyebrow: "The domain",
      h: "The faults that matter are buried.",
      lead:
        "Advanced packaging stacks silicon into dense 2.5D and 3D structures. When something fails, the defect is often several layers down, invisible to optical and electron methods.",
      body:
        "A magnetic field passes through the package that light cannot. Every current in a chip creates a magnetic field around it, so imaging that field reveals where the current actually flows, and where it should not. A quantum diamond microscope maps those fields at the micron scale, non-destructively, turning a magnetic image into a picture of buried current paths, shorts and defects. The same principle extends to industrial inspection, where sub-surface flaws in welds, batteries and critical parts carry a magnetic signature.",
    },
    whyNV: {
      eyebrow: "Why NV-diamond",
      h: "A microscope that does not perturb what it measures.",
      points: [
        { h: "Non-destructive", p: "It images the field the chip already produces, without contact and without opening the package." },
        { h: "Sub-micron", p: "A dense sensing layer resolves current paths at the micron scale, in buried layers." },
        { h: "Room temperature", p: "No cryogenics and no vacuum, so it fits an analysis lab or a production line." },
        { h: "DC-capable", p: "It reads static and low-frequency fields, a regime where many inspection methods are blind." },
      ],
    },
    approach: {
      eyebrow: "Our approach",
      h: "From a lab demonstration to a robust instrument.",
      body:
        "The physics of magnetic chip imaging is proven in the laboratory. Our work is to turn it into a rugged instrument: a nanofabricated sensing head and the embedded electronics around it, so the measurement is repeatable outside a physics bench. The differentiator is the material and the readout, not a one-off demonstration.",
    },
    cta: {
      h: "Failure analysis or inspection where conventional methods stop?",
      body: "We work with partners in advanced packaging, energy and critical-parts inspection. Tell us what you need to see.",
    },
    faq: [
      {
        q: "What is a diamond quantum microscope?",
        a: "A diamond quantum microscope uses a dense layer of nitrogen-vacancy centres in diamond to image magnetic fields across a surface. Because every electrical current produces a magnetic field, the instrument can map current flow and magnetic features at the micron scale, at room temperature and without contact.",
      },
      {
        q: "How does it find defects inside a chip?",
        a: "Magnetic fields pass through the layers of a chip package that block light. By imaging the field a powered chip produces, the microscope reconstructs where current actually flows, revealing shorts, opens and buried defects non-destructively, even in stacked 2.5D and 3D packages.",
      },
      {
        q: "What can it inspect beyond semiconductors?",
        a: "The same magnetic-imaging principle applies to industrial non-destructive testing: sub-surface flaws, corrosion and fatigue in welds, batteries and critical metal parts all carry a magnetic signature that a diamond sensor can read, including at DC where eddy-current methods are weak.",
      },
      {
        q: "Why does room-temperature operation matter here?",
        a: "Room-temperature operation means no cryogenics and no vacuum chamber, so the instrument can sit in a failure-analysis lab or on a production line rather than in a specialised physics facility, which is what makes quantum magnetic imaging practical for industry.",
      },
    ],
  },
  {
    slug: "quantum-computing",
    navLabel: "Quantum computing",
    order: 4,
    eyebrow: "Vertical · Ambient quantum computing",
    title: "Coherent spin, at room temperature.",
    tagline: "NV spin control as a building block for ambient quantum information.",
    intro:
      "The same nitrogen-vacancy spin we read for sensing can be initialised, controlled and read out optically, at room temperature. That makes it a candidate building block for quantum information without cryogenics. This is a longer-horizon, patented direction.",
    metaTitle: "Ambient quantum computing",
    metaDescription:
      "Room-temperature NV-diamond spin control as a building block for ambient quantum information: a longer-horizon, patented direction for SpectralFlow.",
    teach: {
      eyebrow: "The domain",
      h: "Most qubits need to be kept cold.",
      lead:
        "Leading quantum processors run at millikelvin temperatures inside dilution refrigerators. That cost and complexity is one of the barriers between quantum computing and everyday deployment.",
      body:
        "A nitrogen-vacancy centre in diamond is different: its electronic spin can be initialised, coherently controlled and read out with light, at room temperature. Coupled to nearby nuclear spins, it forms a small, optically addressable quantum register that holds coherence in ambient conditions. That is why NV-diamond is studied as a route to quantum information, and to quantum networking, that does not depend on cryogenics.",
    },
    whyNV: {
      eyebrow: "Why NV-diamond",
      h: "The properties that help sensing help information.",
      points: [
        { h: "Optically addressable", p: "The spin is initialised and read out with light, the same mechanism our sensors rely on." },
        { h: "Ambient coherence", p: "It holds a coherent spin state at room temperature, without a dilution refrigerator." },
        { h: "A local register", p: "Nearby nuclear spins extend a single centre into a small quantum register." },
        { h: "Shared foundation", p: "Coherence engineering is the common thread between our sensors and this longer-horizon direction." },
      ],
    },
    approach: {
      eyebrow: "Our approach",
      h: "A patented direction, honestly staged.",
      body:
        "The coherence engineering that makes our sensors precise is the same discipline that makes NV a candidate for ambient quantum information. We treat it as a longer-horizon, patented direction rather than a near-term product: the material and control know-how compounds across everything we build, and we are explicit about the stage.",
    },
    cta: {
      h: "Exploring ambient quantum information?",
      body: "If room-temperature spin control is on your roadmap, we are interested in the right research conversations.",
    },
    faq: [
      {
        q: "Can nitrogen-vacancy centres be used as qubits?",
        a: "Yes. The electronic spin of a nitrogen-vacancy (NV) centre in diamond can be initialised, coherently controlled and read out optically, and it can be coupled to nearby nuclear spins to form a small quantum register. NV centres are an established platform for quantum sensing, quantum networking and quantum-information research.",
      },
      {
        q: "What does room-temperature quantum computing mean?",
        a: "It refers to quantum-information hardware that operates without cryogenic cooling. Most qubit platforms need millikelvin temperatures, whereas NV-diamond spins remain coherent and controllable at room temperature, which is why they are studied as a route to quantum information in ambient conditions.",
      },
      {
        q: "Where is ambient quantum computing on SpectralFlow's roadmap?",
        a: "It is a longer-horizon, patented direction rather than a near-term product. SpectralFlow's first vertical is GPS-denied navigation; the coherence and control know-how developed for sensing compounds toward this direction over time.",
      },
    ],
  },
];

export const VERTICAL_SLUGS = VERTICALS_CONTENT.map((v) => v.slug);

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS_CONTENT.find((v) => v.slug === slug);
}

export const VERTICALS_ORDERED = [...VERTICALS_CONTENT].sort((a, b) => a.order - b.order);
