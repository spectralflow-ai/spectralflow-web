import type { Metadata } from "next";
import Link from "next/link";
import { getImageProps } from "next/image";
import Reveal from "./components/Reveal";
import Steps from "./components/Steps";
import MissionChart from "./components/MissionChart";
import ErrorBound from "./components/ErrorBound";
import DuotonePhoto from "./components/DuotonePhoto";
import HeroVideo from "./components/HeroVideo";
import SourceNote from "./components/SourceNote";
import GnssMap from "./components/GnssMap";
import NewsCard from "./components/NewsCard";
import EventCard from "./components/EventCard";
import Supporters from "./components/Supporters";
import VerticalIcon from "./components/VerticalIcon";
import { Prose, Cinema, Eyebrow, H2, Lead, Body } from "./components/kit";
import {
  BRAND,
  DESCRIPTOR,
  FACTS_AS_OF,
  LEGAL_NAME,
  ADDRESS,
  PATENT_DETAIL,
  REGISTERED_LABEL,
  STAGE_LINE,
  getSource,
  type ContextSource,
} from "./lib/facts";
import { NAV } from "./lib/nav";
import { latestPosts } from "./lib/news";
import { todayISO, upcomingEvents } from "./lib/events";
import { CTA_PROGRAMME, CTA_SIMULATION } from "./lib/contact";
import type { ProfileKey } from "./instrument/profiles";

/* ----- Page metadata ------------------------------------------------- */

const TITLE = `${BRAND} · ${DESCRIPTOR} for navigation`;
const DESCRIPTION =
  "Spectral Flow designs diamond quantum sensors. First, navigation you can trust without GPS: every position comes with its error bound.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Re-render once a day so the "Meet us" block drops events once they are past.
export const revalidate = 86400;

/* ----- Hero ------------------------------------------------------------ */

const HERO_ALT = "Aerial view of a tidal estuary.";

const heroLandscape = getImageProps({
  src: "/img/v3/hero-estuary-frame.webp",
  alt: HERO_ALT,
  width: 1920,
  height: 1080,
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
}).props;

const heroSmallLandscape = getImageProps({
  src: "/img/v3/estuary-21x9.webp",
  alt: HERO_ALT,
  width: 2560,
  height: 1097,
  sizes: "100vw",
}).props;

const heroPortrait = getImageProps({
  src: "/img/v3/estuary-portrait.webp",
  alt: HERO_ALT,
  width: 1200,
  height: 1607,
  sizes: "100vw",
}).props;

/*
 * The track over the estuary. Each SVG uses the pixel frame of its photo and
 * the same centred cover crop, so the line stays on the same ground at every
 * screen size. On landscape screens the track stays in the right part of the
 * photograph, clear of the text column down to 1024 px wide; below that it
 * is hidden. The line draws itself once, then the last fix appears and its
 * dashed bound tightens; the drawing itself lasts under five seconds. Where
 * the video may play, the still track starts later and waits while the
 * video is on its way (data-hold), so the two scenes never draw at once.
 * Reduced motion (the global rule strips animations) shows the finished
 * drawing.
 */
type Track = { viewBox: string; d: string; end: { x: number; y: number } };
const PORTRAIT_TRACK = {
  viewBox: "0 0 1200 1607",
  d: "M-20 560 C300 500 520 760 780 700",
  end: { x: 780, y: 700 },
};

/*
 * The moving background, for wide landscape screens only (see HeroVideo).
 * Its track uses the video frame: it comes in from the right edge over the
 * dark flats and stops short of the main channel, clear of the text column
 * down to 1024 px wide and above the pause button on very wide screens.
 * The camera drifts slowly, so the track does not follow any one channel.
 */
const HERO_VIDEO = {
  poster: "/img/v3/hero-estuary-frame.webp",
  sources: [
    { src: "/video/hero-estuary.webm", type: "video/webm" },
    { src: "/video/hero-estuary.mp4", type: "video/mp4" },
  ],
};
const HERO_VIDEO_TRACK = {
  viewBox: "0 0 1920 1080",
  d: "M1990 840 C1860 835 1770 800 1700 780 S1600 730 1540 720",
  end: { x: 1540, y: 720 },
};

/*
 * The video is much brighter than the photograph on its left side, under
 * the text. This veil sits on the video only, on top of the shared scrims,
 * and is shaped per width so that the text keeps its contrast on the
 * brightest frames while the sky and the right side stay light. From
 * 1024 px, a second layer follows the text column rather than the screen,
 * for the end of the longest title line.
 */
const heroInk = (pct: number) => `color-mix(in srgb, var(--background) ${pct}%, transparent)`;
const HERO_COL = "max(0px, 50% - 36rem)";
const HERO_TITLE_INK = `linear-gradient(90deg,transparent calc(${HERO_COL} + 30rem),${heroInk(40)} calc(${HERO_COL} + 40rem),${heroInk(40)} calc(${HERO_COL} + 47rem),transparent calc(${HERO_COL} + 58rem))`;
const heroVeil = (stops: [number, number][], from: number, to: number, extra?: string) => `
background:${extra ? `${extra},` : ""}linear-gradient(90deg,${stops.map(([a, x]) => `${heroInk(a)} ${x}%`).join(",")});
-webkit-mask-image:linear-gradient(to bottom,transparent ${from}%,#000 ${to}%);
mask-image:linear-gradient(to bottom,transparent ${from}%,#000 ${to}%)`;
const HERO_VEIL_CSS = `
.sf-hero-veil{${heroVeil([[12, 0], [22, 30], [54, 42], [62, 50], [70, 60], [72, 70], [68, 100]], 10, 35)}}
@media (min-width:1024px){.sf-hero-veil{${heroVeil([[12, 0], [22, 30], [52, 42], [60, 52], [56, 60], [34, 67], [0, 76]], 4, 28, HERO_TITLE_INK)}}}
@media (min-width:1280px){.sf-hero-veil{${heroVeil([[12, 0], [18, 30], [44, 40], [50, 50], [26, 57], [0, 68]], 5, 36, HERO_TITLE_INK)}}}
`;

const HERO_CSS = `
.sf-hero-path{stroke-dasharray:1 1;stroke-dashoffset:0;animation:sf-hero-draw 2.8s cubic-bezier(.65,0,.35,1) .45s both}
.sf-hero-fix{transform-box:fill-box;transform-origin:center;animation:sf-hero-fix .7s cubic-bezier(.22,1,.36,1) 3.1s both}
.sf-hero-bound{transform-box:fill-box;transform-origin:center;animation:sf-hero-bound 1.4s cubic-bezier(.22,1,.36,1) 3.3s both}
.sf-hero-scale{transform-box:fill-box;transform-origin:center}
.sf-hero-portrait .sf-hero-path{stroke-width:6}
@media (min-width:640px){
.sf-hero-portrait .sf-hero-path{stroke-width:3.6}
.sf-hero-portrait .sf-hero-scale{transform:scale(.62)}
}
@media (min-width:768px) and (min-height:480px) and (orientation:landscape) and (prefers-reduced-motion:no-preference){
.sf-hero-still .sf-hero-path{animation-delay:1.95s}
.sf-hero-still .sf-hero-fix{animation-delay:4.6s}
.sf-hero-still .sf-hero-bound{animation-delay:4.8s}
}
.sf-hero-still[data-hold] :is(.sf-hero-path,.sf-hero-fix,.sf-hero-bound){animation-play-state:paused}
@keyframes sf-hero-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes sf-hero-fix{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
@keyframes sf-hero-bound{from{transform:scale(1.6)}to{transform:none}}
${HERO_VEIL_CSS}`;

function HeroTrack({
  track,
  stroke,
  dot,
  bound,
  dash,
  className,
}: {
  track: Track;
  stroke: number;
  dot: number;
  bound: number;
  dash: string;
  className: string;
}) {
  const { x, y } = track.end;
  return (
    <svg
      viewBox={track.viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      focusable="false"
    >
      <path
        className="sf-hero-path"
        d={track.d}
        pathLength={1}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <g className="sf-hero-scale">
        <g className="sf-hero-fix">
          <circle
            className="sf-hero-bound"
            cx={x}
            cy={y}
            r={bound}
            fill="var(--accent)"
            fillOpacity={0.1}
            stroke="var(--accent)"
            strokeWidth={stroke * 0.8}
            strokeDasharray={dash}
          />
          <circle cx={x} cy={y} r={dot} fill="var(--accent)" />
        </g>
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="cinema relative isolate flex flex-col overflow-hidden min-h-[calc(100svh-4rem)] landscape:justify-end"
    >
      <style href="sf-hero" precedence="default">
        {HERO_CSS}
      </style>

      {/* Photograph, video, track and scrims. Portrait screens stack the
          photograph above the text; landscape screens set the text over its
          left side. */}
      <div className="relative portrait:flex-1 portrait:min-h-[16rem] landscape:absolute landscape:inset-0">
        <div className="duotone" style={{ position: "absolute", inset: 0 }}>
          <picture>
            <source media="(orientation: portrait)" srcSet={heroPortrait.srcSet} sizes="100vw" />
            <source media="(max-width: 767px)" srcSet={heroSmallLandscape.srcSet} sizes="100vw" />
            <img {...heroLandscape} alt={HERO_ALT} className="absolute inset-0 h-full w-full object-cover" />
          </picture>
        </div>

        <HeroVideo
          sources={HERO_VIDEO.sources}
          poster={HERO_VIDEO.poster}
          veilClassName=""
          still={null}
          track={null}
        />
        {/* The still frame is the first frame of the video: one veil and one
            track serve both, so nothing changes when the video takes over. */}
        <div
          aria-hidden
          className="absolute inset-0 sf-hero-veil hidden [@media(min-width:768px)_and_(orientation:landscape)]:block"
        />
        <HeroTrack
          track={HERO_VIDEO_TRACK}
          stroke={2.4}
          dot={6.5}
          bound={37}
          dash="6.5 6.5"
          className="portrait:hidden max-lg:hidden [@media(max-height:479px)]:hidden"
        />
        <HeroTrack
          track={PORTRAIT_TRACK}
          stroke={6}
          dot={14}
          bound={72}
          dash="12 12"
          className="sf-hero-portrait landscape:hidden"
        />

        <div
          aria-hidden
          className="absolute inset-0 portrait:hidden"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--background) 90%, transparent) 0%, color-mix(in srgb, var(--background) 82%, transparent) 30%, color-mix(in srgb, var(--background) 55%, transparent) 48%, color-mix(in srgb, var(--background) 18%, transparent) 64%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/4 portrait:hidden"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 landscape:hidden"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 72%, transparent) 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 portrait:-mt-20 portrait:pb-14 landscape:pt-28 landscape:pb-16 lg:landscape:pb-24">
        <div className="max-w-[44rem]">
          <h1 id="hero-title" className="display hero-rise">
            <span
              className="block text-[clamp(2.1rem,9.4vw,2.5rem)] leading-[1.02] sm:text-[3.6rem] lg:text-[5.2rem]"
              style={{ color: "var(--text-primary)" }}
            >
              Diamond quantum sensors.
            </span>
            <span
              className="block font-normal tracking-[-0.02em] text-[1.5rem] leading-[1.15] mt-2 sm:text-[2rem] sm:mt-3 lg:text-[2.75rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              First, navigation you can trust without GPS.
            </span>
          </h1>
          <p
            className="hero-rise text-[1.0625rem] md:text-lg leading-relaxed max-w-[34rem] mt-6 md:mt-8"
            style={{ color: "var(--text-secondary)", animationDelay: "160ms" }}
          >
            We read the Earth&apos;s magnetic field with atomic-scale defects in diamond, and return a
            position with a guaranteed error bound.
          </p>
          <div
            className="hero-rise flex flex-wrap items-center gap-x-7 gap-y-4 mt-8 md:mt-10"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/instrument" className="btn-primary">
              Fly a mission <span aria-hidden>→</span>
            </Link>
            <Link href="/applications/navigation" className="textlink">
              See how it works <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- The problem ------------------------------------------------------ */

const SITUATIONS = [
  {
    title: "In the air",
    text: "Aircraft cross areas of jamming and spoofing every day. Crews need to know how far to trust the position on their screens.",
    src: "/img/v3/air.webp",
    alt: "An airliner flying above a layer of cloud.",
  },
  {
    title: "At sea and in port",
    text: "Vessels, and the drones that survey ports and coasts, rely on satellite positioning. When it fails, they need a reference they carry with them.",
    src: "/img/v3/port-drone.webp",
    alt: "A fixed-wing drone flying over a container port, with vessels at the quay.",
  },
  {
    title: "In space",
    text: "In orbit, satellite positioning cannot always be counted on. Around Mars there is none at all: a spacecraft has to work out where it is on its own.",
    src: "/img/v3/smallsat.webp",
    alt: "Illustration of a small satellite in orbit above the Earth.",
  },
];

/**
 * Two third-party figures, each printed with its source. `text` keeps to
 * the source's own terms and period; it was checked against the document.
 */
type Figure = { id: string; big: string; text: string };

const FIGURES: Figure[] = [
  {
    id: "iata-2025-safety-report",
    big: "+193%",
    text: "Reported jamming events rose 67% in 2025 compared with 2023, and reported GPS spoofing incidents 193%.",
  },
  {
    id: "opsgroup-2024",
    big: "1,500",
    text: "By August 2024, about 1,500 flights a day were being spoofed, up from about 300 in January.",
  },
];

const FIGURE_SOURCES = FIGURES.map((f) => ({ ...f, source: getSource(f.id) })).filter(
  (f): f is Figure & { source: ContextSource } => !!f.source
);

/* ----- How it works ----------------------------------------------------- */

const NAV_STEPS = [
  {
    n: "01",
    t: "Sense",
    d: "Diamond sensors read the Earth's magnetic field. The crust adds a fingerprint to it that changes from place to place and is mapped by magnetic surveys. Passive: the instrument reads the Earth's own field and needs no external signal.",
  },
  {
    n: "02",
    t: "Reject",
    d: "Motors, currents and steel give every vehicle a magnetic field of its own. The instrument is designed to reject the platform's own magnetic field on board, in real time.",
  },
  {
    n: "03",
    t: "Match",
    d: "The cleaned reading is matched against the magnetic map of the area to fix the position.",
  },
  {
    n: "04",
    t: "Bound",
    d: "Every fix comes with its error bound, so the navigation system knows how far to trust it.",
  },
];

/* ----- Why diamond: the four crystal axes -------------------------------- */

const DIAMOND_POINTS = [
  {
    t: "Room temperature.",
    d: "No cryogenics, no heating, no consumables.",
  },
  {
    t: "Survives the platform.",
    d: "Diamond is a hard, stable crystal. The sensor is designed for the vibration and shock of a moving vehicle.",
  },
  {
    t: "Four crystal axes.",
    d: "The vector comes from the lattice: NV centres line up with the four bond directions of the crystal, and together they give the direction of the field as well as its strength.",
  },
];

/*
 * Schematic: the four bond directions of the diamond lattice (a tetrahedron
 * seen at an angle) and one magnetic field vector, computed once.
 */
const AXES = (() => {
  const yaw = (30 * Math.PI) / 180;
  const pitch = (-28 * Math.PI) / 180;
  const scale = 118 / Math.sqrt(3);
  const cx = 200;
  const cy = 150;
  const project = ([x, y, z]: [number, number, number]) => {
    const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
    const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const y1 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
    return { x: cx + scale * x1, y: cy - scale * y1 };
  };
  const tips = (
    [
      [1, 1, 1],
      [1, -1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
    ] as [number, number, number][]
  ).map(project);
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const b: [number, number, number] = [-0.7, 0.65, 0.3];
  const n = Math.hypot(...b);
  const len = Math.sqrt(3);
  const field = project([(b[0] / n) * len, (b[1] / n) * len, (b[2] / n) * len]);
  const center = { x: cx, y: cy };
  const dx = field.x - center.x;
  const dy = field.y - center.y;
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const head = [
    `${field.x.toFixed(1)},${field.y.toFixed(1)}`,
    `${(field.x - 10 * ux - 4.5 * uy).toFixed(1)},${(field.y - 10 * uy + 4.5 * ux).toFixed(1)}`,
    `${(field.x - 10 * ux + 4.5 * uy).toFixed(1)},${(field.y - 10 * uy - 4.5 * ux).toFixed(1)}`,
  ].join(" ");
  return { tips, edges, center, field, shaft: { x: field.x - 8 * ux, y: field.y - 8 * uy }, head };
})();

function CrystalAxes() {
  const { tips, edges, center, field, shaft, head } = AXES;
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-auto max-w-[26rem]"
      role="img"
      aria-label="Schematic: the four bond directions of the diamond lattice meet at one point, with one magnetic field vector drawn in blue between them."
    >
      {edges.map(([a, b]) => (
        <line
          key={`e${a}${b}`}
          x1={tips[a].x}
          y1={tips[a].y}
          x2={tips[b].x}
          y2={tips[b].y}
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      ))}
      {tips.map((t, i) => (
        <line
          key={`a${i}`}
          x1={center.x}
          y1={center.y}
          x2={t.x}
          y2={t.y}
          stroke="var(--text-secondary)"
          strokeWidth="1.4"
        />
      ))}
      {tips.map((t, i) => (
        <circle
          key={`t${i}`}
          cx={t.x}
          cy={t.y}
          r="4.5"
          fill="var(--surface-2)"
          stroke="var(--text-secondary)"
          strokeWidth="1.2"
        />
      ))}
      <line
        x1={center.x}
        y1={center.y}
        x2={shaft.x}
        y2={shaft.y}
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon points={head} fill="var(--accent)" />
      <circle cx={center.x} cy={center.y} r="4.5" fill="var(--accent)" />
      <text
        x={field.x + 10}
        y={field.y + 6}
        fontSize="15"
        fontWeight="600"
        fill="var(--accent)"
        fontFamily="var(--font-geist-sans)"
      >
        B
      </text>
    </svg>
  );
}

/* ----- The Instrument: mission profiles, in neutral order --------------- */

const MISSION_PROFILES: { key: ProfileKey; kicker: string; title: string; text: string }[] = [
  {
    key: "geo",
    kicker: "Survey and exploration",
    title: "Airborne survey",
    text: "Fly a magnetic survey line that keeps its position without satellite navigation.",
  },
  {
    key: "defence",
    kicker: "In the air",
    title: "Flight without GPS",
    text: "Fly a leg with satellite positioning jammed, then inject faults into your own instrument.",
  },
  {
    key: "space",
    kicker: "In space",
    title: "Mars scout",
    text: "Fly a scout over Mars, where there is no satellite navigation at all.",
  },
];

/* ----- Where we stand --------------------------------------------------- */

type Milestone = { date: string; title: string; text: string; state: "done" | "now" | "next" };

const MILESTONES: Milestone[] = [
  {
    date: REGISTERED_LABEL,
    title: "Company registered",
    text: `${LEGAL_NAME}, ${ADDRESS.locality}, ${ADDRESS.country}.`,
    state: "done",
  },
  {
    date: "July 2026",
    title: "Mission demos open to all",
    text: "A full mission in the browser, every figure model-derived.",
    state: "done",
  },
  {
    date: "July 2026",
    title: "Deeptech qualification",
    text: "Qualified as a deeptech company by Bpifrance.",
    state: "done",
  },
  {
    date: "September 2026",
    title: "Seventeenth patent application",
    text: PATENT_DETAIL,
    state: "done",
  },
  {
    date: FACTS_AS_OF,
    title: "Prototype designed",
    text: STAGE_LINE,
    state: "now",
  },
  {
    date: "Next",
    title: "Assembly, then first measurements",
    text: "Assembly of the first mobile prototype, then its first measurements.",
    state: "next",
  },
];

function MilestoneDot({ state }: { state: Milestone["state"] }) {
  if (state === "now") {
    return (
      <span
        aria-hidden
        className="absolute left-0 top-[3px] xl:top-0 h-[11px] w-[11px] rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }}
      />
    );
  }
  if (state === "next") {
    return (
      <span
        aria-hidden
        className="absolute left-0 top-[3px] xl:top-0 h-[11px] w-[11px] rounded-full border border-dashed"
        style={{ borderColor: "var(--accent)", background: "var(--background)" }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="absolute left-[1px] top-[4px] xl:top-[1px] h-[9px] w-[9px] rounded-full"
      style={{ background: "var(--text-primary)" }}
    />
  );
}

function Timeline() {
  return (
    // Vertical below 1280 px, so that each milestone keeps a readable
    // measure; six columns from there up.
    <ol className="grid grid-cols-1 max-w-2xl xl:max-w-none xl:grid-cols-6 gap-x-6">
      {MILESTONES.map((m, i) => {
        const last = i === MILESTONES.length - 1;
        // The segment that leads to the next milestone is dashed when that
        // milestone is still ahead.
        const rail = `1px ${MILESTONES[i + 1]?.state === "next" ? "dashed" : "solid"} var(--border-strong)`;
        return (
          <li key={`${m.date}-${m.title}`} className="relative pl-8 pb-9 xl:pl-0 xl:pb-0 xl:pt-9 xl:pr-2">
            {!last && (
              <>
                <span
                  aria-hidden
                  className="absolute left-[5px] top-4 bottom-0 xl:hidden"
                  style={{ borderLeft: rail }}
                />
                <span
                  aria-hidden
                  className="absolute hidden xl:block left-4 -right-6 top-[5px]"
                  style={{ borderTop: rail }}
                />
              </>
            )}
            <MilestoneDot state={m.state} />
            <p className="figure-label is-plain" style={m.state === "now" ? { color: "var(--accent)" } : undefined}>
              {m.state === "now" ? `${m.date} · Now` : m.date}
            </p>
            <p className="font-semibold mt-1.5 leading-snug" style={{ color: "var(--text-primary)" }}>
              {m.title}
            </p>
            <p className="text-sm leading-6 mt-1.5" style={{ color: "var(--muted)" }}>
              {m.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/* ----- One platform ----------------------------------------------------- */

const PLATFORM = (NAV.find((s) => s.label === "Applications")?.links ?? []).map((l) => ({
  ...l,
  slug: l.href.split("/").pop() ?? "",
}));

/* ----- Page ------------------------------------------------------------- */

export default function Home() {
  const today = todayISO();
  const posts = latestPosts(3);
  const events = upcomingEvents(today).slice(0, 3);

  return (
    <main>
      <Hero />

      {/* ========================= THE PROBLEM ========================= */}
      <Cinema id="problem">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2 className="max-w-4xl mb-6">Where GPS fails, nobody can say how wrong the position is.</H2>
          <Lead className="max-w-3xl">
            Jamming and spoofing of satellite navigation are on the rise. When the signal is lost, the
            inertial unit carries on alone and drifts. When it is spoofed, the receiver can follow a
            false position.
          </Lead>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mt-14">
          {SITUATIONS.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 90}>
              <DuotonePhoto
                src={s.src}
                alt={s.alt}
                aspect="4/3"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <h3 className="text-lg font-semibold display mt-5" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <Body className="mt-2">{s.text}</Body>
            </Reveal>
          ))}
        </ul>
        <p className="figure-label is-plain mt-6">Illustrative images.</p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px mt-14 rounded-[var(--radius)] overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          {FIGURE_SOURCES.map((f) => (
            <div key={f.id} className="p-7 md:p-9" style={{ background: "var(--background)" }}>
              <p
                className="display text-5xl md:text-6xl tabular-nums"
                style={{ color: "var(--text-primary)" }}
              >
                {f.big}
              </p>
              <p className="text-[15px] leading-7 mt-4 max-w-md" style={{ color: "var(--text-secondary)" }}>
                {f.text}
              </p>
              <SourceNote source={f.source} className="mt-4 max-w-md" />
            </div>
          ))}
        </div>

        {/* The daily interference map, live, beside the sentence that turns it
            towards our question. */}
        <Reveal className="mt-14">
          <div className="card relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] overflow-hidden">
            <GnssMap variant="compact" />
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <p className="eyebrow mb-3">Mapped every day</p>
              <p
                className="text-xl md:text-[1.4rem] leading-snug font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                The map shows where aircraft lost confidence in satellite positioning. It cannot show
                how wrong each position was.
              </p>
              <p className="text-[15px] leading-7 mt-3" style={{ color: "var(--muted)" }}>
                That is the question our instrument is designed to answer.
              </p>
              <Link href="/applications/navigation#problem" className="textlink mt-6 self-start">
                Why it matters <span aria-hidden>→</span>
              </Link>
              <p className="source-note mt-5">
                The map is built from aircraft ADS-B reports. Third-party data, not Spectral Flow&apos;s.
              </p>
            </div>
          </div>
        </Reveal>
      </Cinema>

      {/* ======================== THE ERROR BOUND ======================== */}
      <Prose id="bound">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>The error bound</Eyebrow>
            <H2 className="mb-6">
              Not how accurate you were on a good day: how wrong you can be right now.
            </H2>
            <Lead className="mb-4">Every fix comes with its error bound.</Lead>
            <Body className="max-w-xl">
              Between magnetic fixes the bound widens, and at each fix it tightens again. Integrity
              comes first: the instrument says when not to trust it, so the system it feeds can decide
              what to do.
            </Body>
            <Link href="/applications/navigation#bound" className="textlink mt-7">
              More on the error bound <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="plate p-5 md:p-8">
              <ErrorBound
                labels={{
                  others: "A position on its own",
                  ours: "A position with its error bound",
                  truth: "True path",
                }}
                ariaLabel="Illustration: along the same path, a position given on its own drifts away with nothing to show its error, while a position given with its error bound stays inside a dashed disc that widens between magnetic fixes and tightens at each fix."
              />
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* ========================= HOW IT WORKS ========================= */}
      <Prose id="how">
        <Steps
          eyebrow="How it works"
          title="From the Earth's field to a bounded fix."
          lead="Four steps, on board. It completes the inertial unit, it does not replace it."
          steps={NAV_STEPS}
        />
        <Reveal>
          <div className="hairline mt-10 pt-10 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-5 md:gap-12 items-baseline">
            <p
              className="display text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              They compensate. We measure.
            </p>
            <Body className="max-w-xl">
              Magnetic navigation has long modelled the vehicle&apos;s own field from a calibration
              flight, then subtracted it. Our instrument is designed to reject the vehicle&apos;s field on
              board as well, in real time, so that less is left for the model to correct.
            </Body>
          </div>
        </Reveal>
      </Prose>

      {/* ========================= WHY DIAMOND ========================= */}
      <Prose id="diamond">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <Eyebrow>Why diamond</Eyebrow>
              <H2 className="mb-6">Atomic-scale defects in diamond, read with light.</H2>
              <Lead className="max-w-xl mb-10">
                A nitrogen-vacancy centre is a defect in diamond that behaves like a tiny compass you
                read with light.
              </Lead>
            </Reveal>
            <ul className="flex flex-col">
              {DIAMOND_POINTS.map((p, i) => (
                <Reveal key={p.t} as="li" delay={i * 80}>
                  <div className="hairline py-5">
                    <p className="font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                      {p.t}
                    </p>
                    <Body className="max-w-xl">{p.d}</Body>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal>
              <Link href="/technology#principle" className="textlink mt-6">
                The principle, in three steps <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <figure>
              <div className="plate p-6 md:p-10 flex items-center justify-center">
                <CrystalAxes />
              </div>
              <figcaption className="figure-label is-plain mt-4">
                Schematic: four crystal axes, one field vector.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Prose>

      {/* ======================== THE INSTRUMENT ======================== */}
      <Cinema id="instrument">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-10">
          <Reveal>
            <Eyebrow>Mission demos</Eyebrow>
            <H2 className="mb-6">Fly a mission.</H2>
            <Lead>
              Our mission demos fly the whole navigation chain in simulation, live in your browser: a
              magnetic map, a vehicle with its own interference, the sensor and the navigation filter.
            </Lead>
          </Reveal>
          <Reveal delay={90}>
            <Body>
              Inject faults, see the instrument flag them, and read the debrief. Every figure is
              model-derived: a simulation still to be calibrated against hardware, useful in relative
              terms. No account needed.
            </Body>
          </Reveal>
        </div>

        <Reveal>
          <MissionChart />
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {MISSION_PROFILES.map((p, i) => (
            <Reveal key={p.key} as="li" delay={i * 80}>
              <Link
                href={`/instrument?profile=${p.key}`}
                className="card p-6 md:p-7 h-full flex flex-col gap-2"
              >
                <span className="eyebrow">{p.kicker}</span>
                <h3 className="text-lg font-semibold display" style={{ color: "var(--text-primary)" }}>
                  {p.title}
                </h3>
                <span className="text-[15px] leading-7 flex-1" style={{ color: "var(--muted)" }}>
                  {p.text}
                </span>
                <span className="textlink mt-3">
                  Fly this mission <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 mt-10">
            <Link href="/instrument" className="btn-primary self-start">
              Fly the Instrument <span aria-hidden>→</span>
            </Link>
            <Link href={CTA_SIMULATION} className="textlink">
              Ask for an expert simulation session <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Cinema>

      {/* ======================== WHERE WE STAND ======================== */}
      <Prose id="where-we-stand">
        <Reveal>
          <Eyebrow>Where we stand</Eyebrow>
          <H2 className="max-w-3xl mb-6">From simulation to a first mobile prototype.</H2>
          <Lead className="max-w-2xl">
            What is done, and what comes next. Every performance figure we show today is
            model-derived, from simulation.
          </Lead>
          <p className="figure-label is-plain mt-10 mb-8">As of {FACTS_AS_OF}</p>
        </Reveal>
        <Reveal delay={80}>
          <Timeline />
        </Reveal>
        <Reveal>
          <Link href="/company#where-we-stand" className="textlink mt-10">
            Where we stand, in detail <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ========================= ONE PLATFORM ========================= */}
      <Prose id="platform">
        <Reveal>
          <Eyebrow>One platform</Eyebrow>
          <H2 className="max-w-3xl mb-6">One diamond platform, many instruments. Navigation first.</H2>
          <Lead className="max-w-2xl mb-12">
            Navigation is the first instrument. Its core, spins in diamond read with light, can serve
            other fields too: life sciences, semiconductor inspection and quantum computing.
          </Lead>
        </Reveal>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORM.map((v, i) => (
            <Reveal key={v.href} as="li" delay={i * 70}>
              <Link href={v.href} className="card p-6 h-full flex flex-col gap-3">
                <span className="flex items-center justify-between gap-3">
                  <VerticalIcon slug={v.slug} />
                  {i === 0 && <span className="pill">First</span>}
                </span>
                <h3 className="font-semibold text-lg display mt-1" style={{ color: "var(--text-primary)" }}>
                  {v.label}
                </h3>
                {v.blurb && (
                  <span className="text-[15px] leading-7 flex-1" style={{ color: "var(--muted)" }}>
                    {v.blurb}
                  </span>
                )}
                <span className="textlink mt-2">
                  Explore <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Prose>

      {/* ======================== NEWS AND EVENTS ======================== */}
      <Prose id="news">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-10">
            <div>
              <Eyebrow>News</Eyebrow>
              <H2>Latest news</H2>
            </div>
            <Link href="/news" className="textlink">
              All news <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="h-full">
              <NewsCard post={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-8">
              <div>
                <Eyebrow>Events</Eyebrow>
                <h2
                  className="display text-2xl md:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Meet us
                </h2>
              </div>
              <Link href="/events" className="textlink">
                All events <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((e, i) => (
                <Reveal key={e.slug} delay={i * 80} className="h-full">
                  <EventCard event={e} today={today} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Body>
              No public dates right now.{" "}
              <Link href="/contact" className="textlink">
                Write to us <span aria-hidden>→</span>
              </Link>
            </Body>
          )}
        </div>
      </Prose>

      {/* ============ RECOGNITIONS, MEMBERSHIPS AND SELECTIONS ============ */}
      <section aria-label="Recognitions, memberships and selections">
        <Supporters
          variant="strip"
          id="support"
          heading="Recognitions, memberships and selections"
          showResearchLine
        />
      </section>

      {/* ========================= CLOSING CALL ========================= */}
      <Prose id="work-with-us">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <H2 className="max-w-3xl mb-6">Work with us.</H2>
          <Lead className="max-w-2xl mb-9">
            We are looking for programme partners: navigation integrators, research laboratories and
            investors who bring a programme.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href={CTA_PROGRAMME} className="btn-primary self-start">
              Get in touch <span aria-hidden>→</span>
            </Link>
            <Link href="/instrument" className="btn-ghost self-start">
              Fly a mission
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
