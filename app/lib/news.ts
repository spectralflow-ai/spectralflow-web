/**
 * News: the single source for the news index, each /news/[slug] article,
 * the RSS feed, the sitemap and the home page teaser.
 *
 * Only entries that are publishable the day they are committed live here.
 * Slugs are permanent: never rename one once published.
 * A post states the facts as of its date: its text is written out in full
 * here rather than built from live constants, so it does not change when
 * the facts do. Later facts go in a dated "Update" line.
 */

export type PostTag = "Milestone" | "Research" | "Insight" | "Event";

export type Post = {
  /** Permanent kebab-case identifier, used in the URL. */
  slug: string;
  /** Publication date, ISO yyyy-mm-dd (used for sorting, feeds and JSON-LD). */
  date: string;
  /** Date as printed on the page. */
  dateLabel: string;
  tag: PostTag;
  title: string;
  /** One or two sentences for cards and meta descriptions. */
  excerpt: string;
  /** Article paragraphs, in order. */
  body: string[];
  cta?: { href: string; label: string };
  /** Date of the last dated update to the text, ISO yyyy-mm-dd. */
  updated?: string;
  /**
   * Third-party context figures printed with the article, by id in
   * CONTEXT_SOURCES (lib/facts.ts). Each is shown with its source.
   */
  sources?: string[];
  /** An illustration printed after the body. */
  visual?: "gnss-map";
};

/**
 * Day the October 2026 entries go online, ISO yyyy-mm-dd. It is their
 * publication date in the feed and the structured data: set it to the
 * day of release.
 */
const OCTOBER_2026_RELEASE = "2026-10-01";

const ENTRIES: Post[] = [
  /* ----- October 2026 ---------------------------------------------- */
  {
    slug: "member-of-quic",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Milestone",
    title: "Spectral Flow joins QuIC, the European Quantum Industry Consortium",
    excerpt:
      "Spectral Flow is now a member of QuIC, the association of Europe's quantum technology industry.",
    body: [
      "Spectral Flow is now a member of QuIC, the European Quantum Industry Consortium. QuIC brings together the companies and research organisations that build Europe's quantum technology industry.",
      "Membership gives us a seat in its working groups, where the industry discusses standards, roadmaps and the uses of quantum sensing.",
    ],
    cta: { href: "/company#support", label: "Recognitions and memberships" },
  },
  {
    slug: "first-mobile-prototype-designed",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Milestone",
    title: "Our first mobile prototype is designed",
    excerpt:
      "The design of our first mobile prototype is complete. Assembly starts once funding is confirmed.",
    body: [
      "The design of our first mobile prototype is complete: the sensor, the electronics that drive and read it, and the mechanics that carry them on a moving vehicle.",
      "Its first job is to check, under the constraints of an instrument that moves, that nothing has been forgotten on the way from simulation to hardware.",
      "The navigation software has already flown complete missions in simulation. Here the software waits for the hardware, not the other way round.",
      "Assembly starts once funding is confirmed. Then come the first measurements, and tests on the move.",
    ],
    cta: { href: "/company#where-we-stand", label: "Where we stand" },
  },
  {
    slug: "selected-tech-tour-quantum-defence-berlin",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Event",
    title: "Selected to pitch at Tech Tour Quantum & Defence in Berlin",
    excerpt:
      "Spectral Flow has been selected to pitch at Tech Tour Quantum & Defence 2026, in Berlin on 8 and 9 October.",
    body: [
      "Spectral Flow has been selected to pitch at Tech Tour Quantum & Defence 2026, held in Berlin on 8 and 9 October.",
      "Tech Tour brings selected start-ups together with investors and industrial groups. We will present navigation you can trust without GPS: an instrument designed to read the Earth's magnetic field and return each position with its error bound.",
      "We are looking for programme partners: navigation integrators, research laboratories and investors who bring a programme. If you are in Berlin, ask us for the live mission demo.",
    ],
    cta: { href: "/contact", label: "Meet us in Berlin" },
  },
  {
    slug: "seventeen-patent-applications",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Milestone",
    title: "Seventeen patent applications filed in 2026",
    excerpt: "In September 2026 we filed a further patent application, in France.",
    body: [
      "In September 2026 we filed a further patent application, in France.",
      "That makes seventeen patent applications filed in 2026: sixteen UK provisional and one French. The content of the new application stays confidential until publication.",
    ],
    cta: { href: "/company#patents", label: "Our patent applications" },
  },
  {
    slug: "position-and-its-error-bound",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Insight",
    title: "A position is only as good as its error bound",
    excerpt:
      "Magnetic navigation has already flown. The next step is an instrument that tells the vehicle, at every instant, how wrong its position can be.",
    body: [
      "Magnetic navigation has already flown. Several teams have shown that reading the Earth's magnetic field can correct a vehicle's position without satellites. The question is no longer whether it works.",
      "The open question is trust. A position on its own leaves the pilot, or the autopilot, to guess how far to rely on it. What matters is not how accurate the system was on a good day. It is how wrong the position can be right now.",
      "Civil aviation already works this way with satellite navigation. For an instrument approach, the receiver computes a protection level: a bound that its position error should exceed only with a very small, specified probability. The approach is available only when that bound fits the operation. Magnetic navigation needs the same discipline.",
      "We design our instrument around that idea. Every fix comes with its error bound, computed at every instant. Integrity: the instrument says when not to trust it.",
      "It completes the inertial unit, it does not replace it. Between fixes, the inertial unit carries the position; each magnetic fix corrects it and comes with its bound.",
      "The bound is declared by the instrument itself. Certifying it is the work of a programme, with its users and its authority. Until our first prototype is assembled and tested, what we show is model-derived, from simulation.",
    ],
    cta: { href: "/instrument", label: "Fly a mission" },
  },
  {
    slug: "contested-satellite-navigation",
    date: OCTOBER_2026_RELEASE,
    dateLabel: "October 2026",
    tag: "Insight",
    title: "Satellite navigation is contested every day",
    excerpt:
      "Jamming and spoofing of satellite positioning are part of everyday flight operations in several regions. The figures, with their sources, and what they mean for navigation.",
    sources: [
      "iata-2025-safety-report",
      "iata-agm-2026",
      "opsgroup-2024",
      "easa-eurocontrol-plan-2026",
    ],
    body: [
      "Jamming and spoofing of satellite positioning are part of everyday flight operations in several regions. Aircraft are where this interference is best documented, because crews and airlines report it.",
      "Two forms dominate. Jamming drowns the signal, so the receiver loses its position. Spoofing replaces the signal with a false one, so the receiver keeps a position that is wrong.",
      "Reports come in every day, and European aviation treats the problem as lasting rather than passing. The figures below come from aviation's own publications, each with its source.",
      "Satellite navigation will remain essential. What changes is that a vehicle can no longer take its position for granted. Spoofing is the harder case: the receiver does not always know it is being deceived.",
      "That is the problem we work on. Our instrument is designed to correct a vehicle's position without satellites, using the Earth's magnetic field. Passive: it reads the Earth's own field and needs no external signal. It completes the inertial unit, it does not replace it.",
      "Every fix comes with its error bound: not how accurate the position was on a good day, but how wrong it can be right now.",
      "A magnetic source placed nearby can disturb a magnetometer. The instrument is designed to detect that and say so.",
    ],
    visual: "gnss-map",
    cta: { href: "/applications/navigation", label: "How our navigation works" },
  },

  /* ----- July 2026 ------------------------------------------------- */
  {
    slug: "esa-estec-quantum-workshop",
    date: "2026-07-09",
    dateLabel: "July 2026",
    tag: "Event",
    title: "Spectral Flow at ESA's quantum workshop at ESTEC",
    excerpt:
      "We joined ESA's Quantum Technologies for Space Exploration workshop at ESTEC in Noordwijk, with the European quantum sensing community.",
    body: [
      "We joined ESA's Quantum Technologies for Space Exploration workshop at ESTEC in Noordwijk, alongside the European quantum sensing community.",
      "Between sessions, our mission demo ran live on laptops around the room: a full mission without satellite navigation, recomputed in the browser, every figure labelled model-derived.",
      "Our message to the roadmap discussion was simple: for exploration autonomy, integrity matters as much as sensitivity. An instrument must know when to distrust itself.",
      "A compact sensor designed to reject the spacecraft's own magnetic field on board could reduce the boom length and the magnetic-cleanliness effort that missions still pay for today.",
    ],
    cta: { href: "/instrument?profile=space", label: "Fly the space profile" },
  },
  {
    slug: "sixteen-patent-applications",
    date: "2026-07-07",
    dateLabel: "July 2026",
    tag: "Milestone",
    title: "Sixteen patent applications filed",
    excerpt:
      "Three patent applications were filed in ten days at the turn of June and July, bringing the total to sixteen UK provisional applications.",
    body: [
      "Three patent applications were filed in ten days at the turn of June and July, bringing the total to sixteen UK provisional applications.",
      "Among them, one covers how the sensing architecture rejects the host platform's own magnetic interference on board. Another covers the onboard layer that turns the cleaned signal into navigation data the system can vouch for. The details are not public.",
      "Update, October 2026: a seventeenth application, filed in France, followed in September.",
    ],
    updated: OCTOBER_2026_RELEASE,
  },
  {
    slug: "qualified-deeptech-bpifrance",
    date: "2026-07-06",
    dateLabel: "July 2026",
    tag: "Milestone",
    title: "Qualified as a deeptech company by Bpifrance",
    excerpt:
      "Spectral Flow is now qualified as a deeptech company by Bpifrance, the French public investment bank.",
    body: [
      "Spectral Flow is now qualified as a deeptech company by Bpifrance, the French public investment bank.",
      "Bpifrance qualifies a company as deeptech on four criteria: a close link with research, high barriers to entry set by hard technological problems, a strongly differentiating advantage, and a long and complex path to market.",
      "The qualification opens access to France's deeptech support ecosystem as we develop our first prototype.",
    ],
  },
  {
    slug: "the-instrument-is-public",
    date: "2026-07-04",
    dateLabel: "July 2026",
    tag: "Milestone",
    title: "The Instrument is public: fly a mission in your browser",
    excerpt: "Our mission demos are now open to everyone, in the browser, with no account needed.",
    body: [
      "Our mission demos are now open to everyone, in the browser, with no account needed. Fly a full mission where satellites cannot help, inject attacks on your own instrument and see how it flags them.",
      "Every figure is recomputed live, the debrief shows what each layer contributes, and the science behind each panel is one click away. Every number is labelled model-derived: this is a simulation, still to be calibrated against hardware, and useful in relative terms.",
    ],
    cta: { href: "/instrument", label: "Fly the Instrument" },
  },
  {
    slug: "register-of-published-experiments",
    date: "2026-07-02",
    dateLabel: "July 2026",
    tag: "Research",
    title: "More than a hundred published experiments keep our simulation honest",
    excerpt:
      "Our simulation is checked against a register of more than a hundred published experimental results.",
    body: [
      "A simulation is only as good as its confrontation with the literature. Ours is checked against a register of more than a hundred published experimental results, curated one by one and re-checked as the model evolves.",
      "Quantitative validation covers the subset whose experimental conditions are documented well enough, and the list is available on request. When the model and an experiment disagree, the experiment wins and the model changes.",
    ],
  },

  /* ----- June 2026 ------------------------------------------------- */
  {
    slug: "navigation-simulation-online",
    date: "2026-06-12",
    dateLabel: "June 2026",
    tag: "Milestone",
    title: "Our navigation simulation is online",
    excerpt:
      "Before our first prototype is assembled, our sensor design flies complete missions in simulation.",
    body: [
      "Before our first prototype is assembled, our sensor design flies complete missions in simulation: magnetic terrain, a vehicle with its own interference, the sensor model and the navigation filter, end to end.",
      "Every figure is labelled model-derived. The simulation still has to be calibrated against hardware and is useful in relative terms: it sets the design targets our hardware programme works towards. Expert simulation sessions are available on request.",
    ],
    cta: { href: "/instrument", label: "Fly a mission" },
  },
  {
    slug: "they-compensate-we-measure",
    date: "2026-06-12",
    dateLabel: "June 2026",
    tag: "Insight",
    title: "Rejecting the vehicle's own field, on board",
    excerpt:
      "Magnetometers flying today are corrected by compensation models fitted to each vehicle. We design our sensor to reject the platform's own field on board as well.",
    body: [
      "Magnetometers flying today are usually corrected by compensation models fitted to each vehicle, a method with a long record in airborne survey.",
      "We add a second line of defence: a sensor designed to reject the platform's own magnetic field on board, so that less is left for the model to correct.",
    ],
  },
  {
    slug: "joins-nvidia-inception",
    date: "2026-06-05",
    dateLabel: "June 2026",
    tag: "Milestone",
    title: "Spectral Flow joins NVIDIA Inception",
    excerpt: "We are now a member of NVIDIA Inception, NVIDIA's programme for start-ups.",
    body: ["We are now a member of NVIDIA Inception, NVIDIA's programme for start-ups."],
    cta: { href: "/company#support", label: "Support and memberships" },
  },
  {
    slug: "why-navigation-first",
    date: "2026-06-05",
    dateLabel: "June 2026",
    tag: "Insight",
    title: "Why navigation without GPS is our first application",
    excerpt:
      "Satellite navigation is increasingly jammed, spoofed and denied. A passive magnetic reference adds a layer that does not depend on satellites.",
    body: [
      "Satellite navigation is increasingly jammed, spoofed and denied. A passive magnetic reference, which reads the Earth's own field and needs no external signal, adds a layer that does not depend on satellites.",
      "Measuring weak magnetic fields as a full vector, at room temperature, is what nitrogen-vacancy centres in diamond do well.",
    ],
  },
  {
    slug: "designing-in-software-first",
    date: "2026-06-05",
    dateLabel: "June 2026",
    tag: "Insight",
    title: "Designing a quantum sensor in software, first",
    excerpt: "Before a sensor reaches the cleanroom, it lives in our simulation.",
    body: [
      "Before a sensor reaches the cleanroom, it lives in our simulation. Modelling coherence and sensitivity across decoherence channels lets a small team explore the design space quickly and choose what to fabricate.",
      "The simulation still needs calibration against hardware. We use it to compare designs, not to promise numbers.",
    ],
  },
];

/** All posts, newest first. Posts sharing a date keep their order above. */
export const POSTS: Post[] = [...ENTRIES].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function latestPosts(n: number): Post[] {
  return POSTS.slice(0, Math.max(0, n));
}

export const POST_SLUGS = POSTS.map((p) => p.slug);

/** Tags in display order, as used by the news index filter. */
export const POST_TAGS: PostTag[] = ["Milestone", "Event", "Research", "Insight"];

/**
 * Posts to suggest under an article: same tag first, newest first, then
 * the most recent of the rest.
 */
export function relatedPosts(slug: string, n = 3): Post[] {
  const post = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  if (!post) return others.slice(0, n);
  const sameTag = others.filter((p) => p.tag === post.tag);
  const rest = others.filter((p) => p.tag !== post.tag);
  return [...sameTag, ...rest].slice(0, Math.max(0, n));
}
