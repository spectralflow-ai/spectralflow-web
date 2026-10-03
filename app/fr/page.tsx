// fr-source: app/page.tsx sha256:7fc17699e8b22663
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import { getImageProps } from "next/image";
import Reveal from "../components/Reveal";
import Steps from "../components/Steps";
import MissionChart from "../components/MissionChart";
import ErrorBound from "../components/ErrorBound";
import DuotoneClip from "../components/DuotoneClip";
import DuotonePhoto from "../components/DuotonePhoto";
import DiamondPlate from "../components/DiamondPlate";
import HeroVideo from "../components/HeroVideo";
import SourceNote from "../components/SourceNote";
import GnssMap from "../components/GnssMap";
import NewsCard from "../components/NewsCard";
import EventCard from "../components/EventCard";
import Supporters from "../components/Supporters";
import VerticalIcon from "../components/VerticalIcon";
import { Prose, Cinema, Eyebrow, H2, Lead, Body } from "../components/kit";
import {
  BRAND,
  DESCRIPTOR,
  FACTS_AS_OF,
  LEGAL_NAME,
  ADDRESS,
  PATENT_DETAIL,
  REGISTERED_LABEL,
  SHARE_IMAGE,
  STAGE_LINE,
  getSource,
  type ContextSource,
} from "../lib/fr/facts";
import { latestPosts } from "../lib/fr/news";
import { todayISO, upcomingEvents } from "../lib/fr/events";
import { CTA_PROGRAMME, CTA_SIMULATION } from "../lib/fr/contact";
import type { ProfileKey } from "../instrument/profiles";

/* ----- Page metadata ------------------------------------------------- */

const TITLE = `${BRAND} · ${DESCRIPTOR} pour la navigation`;
const DESCRIPTION =
  "Spectral Flow conçoit des capteurs quantiques à diamant. D’abord, une navigation fiable sans GPS : chaque position vient avec sa borne d’erreur.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/fr", languages: { en: "/", fr: "/fr" } },
  openGraph: {
    images: [SHARE_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: "/fr",
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Re-render once a day so the "Meet us" block drops events once they are past.
export const revalidate = 86400;

/* ----- French typography ------------------------------------------------ */

/** A month label opens a line with a capital, and runs on in lower case. */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/* ----- Hero ------------------------------------------------------------ */

const HERO_ALT = "Vue aérienne d’un estuaire à marée.";

const heroLandscape = getImageProps({
  src: "/img/v3/hero-estuary-pp.webp",
  alt: HERO_ALT,
  width: 1920,
  height: 1080,
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
}).props;

/*
 * The track over the estuary. The still photograph is the first frame of the
 * video at every screen size, so both tracks use the video frame and its
 * centred cover crop, and the line stays on the same ground whether the
 * photograph or the video is showing. On landscape screens the track stays
 * in the right part of the frame, clear of the text column down to 1024 px
 * wide; below that it is hidden. On portrait screens, where the frame is
 * cropped to its middle, it comes in from the left edge over the bright
 * sea and stops on the dark flats. The line draws itself once, then the last fix
 * appears and its dashed bound tightens; the drawing itself lasts under five
 * seconds. Reduced motion (the global rule strips animations) shows the
 * finished drawing.
 */
type Track = { viewBox: string; d: string; end: { x: number; y: number } };
const PORTRAIT_TRACK = {
  viewBox: "0 0 1920 1080",
  d: "M-40 452 C300 446 640 462 860 540 S960 590 1000 596",
  end: { x: 1000, y: 596 },
};

/*
 * The moving background (see HeroVideo), at every screen size; small or
 * portrait screens get a lighter 960 px file. The landscape track comes in
 * from the right edge over the dark flats and stops short of the main
 * channel, clear of the text column down to 1024 px wide and above the
 * pause button on very wide screens. The clip plays forward then back,
 * eased at both turns (the version the founder validated on 01/10), so the
 * track does not follow any one channel.
 */
const HERO_VIDEO = {
  poster: "/img/v3/hero-estuary-pp.webp",
  sources: [
    { src: "/video/hero-estuary-pp.webm", type: "video/webm" },
    { src: "/video/hero-estuary-pp.mp4", type: "video/mp4" },
  ],
  smallSources: [
    { src: "/video/hero-estuary-pp-960.webm", type: "video/webm" },
    { src: "/video/hero-estuary-pp-960.mp4", type: "video/mp4" },
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
.sf-hero-portrait .sf-hero-path{stroke-width:4.4}
@media (min-width:640px){
.sf-hero-portrait .sf-hero-path{stroke-width:3}
.sf-hero-portrait .sf-hero-scale{transform:scale(.7)}
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
          <img {...heroLandscape} alt={HERO_ALT} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <HeroVideo
          sources={HERO_VIDEO.sources}
          smallSources={HERO_VIDEO.smallSources}
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
          stroke={4.4}
          dot={10}
          bound={52}
          dash="9 9"
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
              Capteurs quantiques à diamant.
            </span>
            <span
              className="block font-normal tracking-[-0.02em] text-[1.5rem] leading-[1.15] mt-2 sm:text-[2rem] sm:mt-3 lg:text-[2.75rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              D’abord, une navigation fiable sans GPS.
            </span>
          </h1>
          <p
            className="hero-rise text-[1.0625rem] md:text-lg leading-relaxed max-w-[34rem] mt-6 md:mt-8"
            style={{ color: "var(--text-secondary)", animationDelay: "160ms" }}
          >
            Nous lisons le champ magnétique de la Terre avec des défauts atomiques du diamant, et nous
            rendons une position avec une borne d’erreur garantie.
          </p>
          <div
            className="hero-rise flex flex-wrap items-center gap-x-7 gap-y-4 mt-8 md:mt-10"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/instrument" hrefLang="en" className="btn-primary">
              Piloter une mission (en anglais) <span aria-hidden>→</span>
            </Link>
            <Link href="/fr/applications/navigation" className="textlink">
              Voir le fonctionnement <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- The problem ------------------------------------------------------ */

type HomeSituation = {
  title: string;
  text: string;
  src: string;
  alt: string;
  clip?: { poster: string; sources: { src: string; type: string }[] };
};

const SITUATIONS: HomeSituation[] = [
  {
    title: "Dans les airs",
    text: "Chaque jour, des avions traversent des zones de brouillage et de leurrage. Les équipages ont besoin de savoir jusqu’où se fier à la position affichée sur leurs écrans.",
    src: "/img/v3/air.webp",
    alt: "Un avion de ligne au-dessus d’une couche de nuages.",
    clip: { poster: "/video/situations/air-v4-poster.webp", sources: [{ src: "/video/situations/air-v4.webm", type: "video/webm" }, { src: "/video/situations/air-v4.mp4", type: "video/mp4" }] },
  },
  {
    title: "En mer et au port",
    text: "Les navires, et les drones qui surveillent les ports et les côtes, dépendent du positionnement par satellite. Quand il fait défaut, il leur faut une référence qu’ils emportent avec eux.",
    src: "/img/v3/port-drone.webp",
    alt: "Un navire de recherche qui traverse la pleine mer, vu du dessus.",
    clip: { poster: "/video/situations/sea-v3-poster.webp", sources: [{ src: "/video/situations/sea-v3.webm", type: "video/webm" }, { src: "/video/situations/sea-v3.mp4", type: "video/mp4" }] },
  },
  {
    title: "Dans l’espace",
    text: "En orbite, on ne peut pas toujours compter sur le positionnement par satellite. Autour de Mars, il n’y en a aucun : un engin spatial doit déterminer seul où il se trouve.",
    src: "/img/v3/smallsat.webp",
    alt: "Illustration d’un petit satellite en orbite au-dessus de la Terre.",
    clip: { poster: "/video/situations/space-v4-poster.webp", sources: [{ src: "/video/situations/space-v4.webm", type: "video/webm" }, { src: "/video/situations/space-v4.mp4", type: "video/mp4" }] },
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
    big: "+193 %",
    text: "Les cas de brouillage signalés ont augmenté de 67 % en 2025 par rapport à 2023, et les cas de leurrage GPS signalés de 193 %.",
  },
  {
    id: "opsgroup-2024",
    big: "1 500",
    text: "En août 2024, environ 1 500 vols par jour étaient leurrés, contre environ 300 en janvier.",
  },
];

const FIGURE_SOURCES = FIGURES.map((f) => ({ ...f, source: getSource(f.id) })).filter(
  (f): f is Figure & { source: ContextSource } => !!f.source
);

/* ----- How it works ----------------------------------------------------- */

const NAV_STEPS = [
  {
    n: "01",
    t: "Mesurer",
    d: "Des capteurs à diamant lisent le champ magnétique de la Terre. La croûte terrestre y ajoute une empreinte qui change d’un endroit à l’autre et que cartographient les levés magnétiques. Passif : l’instrument lit le champ propre de la Terre et n’a besoin d’aucun signal extérieur.",
  },
  {
    n: "02",
    t: "Rejeter",
    d: "Moteurs, courants et acier donnent à chaque véhicule son propre champ magnétique. L’instrument est conçu pour rejeter à bord, en temps réel, le champ magnétique propre de la plateforme.",
  },
  {
    n: "03",
    t: "Recaler",
    d: "La mesure ainsi nettoyée est comparée à la carte magnétique de la zone pour recaler la position.",
  },
  {
    n: "04",
    t: "Borner",
    d: "Chaque recalage vient avec sa borne d’erreur, pour que le système de navigation sache jusqu’où s’y fier.",
  },
];

/* ----- Why diamond: the four crystal axes -------------------------------- */

const DIAMOND_POINTS = [
  {
    t: "Température ambiante.",
    d: "Ni cryogénie, ni chauffage, ni consommable.",
  },
  {
    t: "Tient sur la plateforme.",
    d: "Le diamant est un cristal dur et stable. Le capteur est conçu pour les vibrations et les chocs d’un véhicule en mouvement.",
  },
  {
    t: "Quatre axes cristallins.",
    d: "Le vecteur vient du réseau : les centres NV s’alignent sur les quatre directions de liaison du cristal, et ensemble ils donnent la direction du champ en plus de son intensité.",
  },
];



/* ----- The Instrument: mission profiles, in neutral order --------------- */

const MISSION_PROFILES: { key: ProfileKey; kicker: string; title: string; text: string }[] = [
  {
    key: "geo",
    kicker: "Levés et prospection",
    title: "Levé aéroporté",
    text: "Pilotez une ligne de levé magnétique qui garde sa position sans navigation par satellite.",
  },
  {
    key: "defence",
    kicker: "Dans les airs",
    title: "Vol sans GPS",
    text: "Pilotez un tronçon de vol sous brouillage du positionnement par satellite, puis injectez des pannes dans votre propre instrument.",
  },
  {
    key: "space",
    kicker: "Dans l’espace",
    title: "Éclaireur martien",
    text: "Pilotez un éclaireur au-dessus de Mars, où il n’existe aucune navigation par satellite.",
  },
];

/* ----- Where we stand --------------------------------------------------- */

type Milestone = { date: string; title: string; text: string; state: "done" | "now" | "next" };

const MILESTONES: Milestone[] = [
  {
    date: REGISTERED_LABEL,
    title: "Société immatriculée",
    text: `${LEGAL_NAME}, ${ADDRESS.locality}, ${ADDRESS.country}.`,
    state: "done",
  },
  {
    date: "Juillet 2026",
    title: "Missions de démonstration ouvertes à tous",
    text: "Une mission complète dans le navigateur, chaque chiffre issu du modèle.",
    state: "done",
  },
  {
    date: "Juillet 2026",
    title: "Qualification Deeptech",
    text: "Qualifiée Deeptech par Bpifrance.",
    state: "done",
  },
  {
    date: "Septembre 2026",
    title: "Dix-septième demande de brevet",
    text: PATENT_DETAIL,
    state: "done",
  },
  {
    date: cap(FACTS_AS_OF),
    title: "Prototype conçu",
    text: STAGE_LINE,
    state: "now",
  },
  {
    date: "Ensuite",
    title: "Assemblage, puis premières mesures",
    text: "Assemblage du premier prototype mobile, puis ses premières mesures.",
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
              {m.state === "now" ? `${m.date} · Maintenant` : m.date}
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

/**
 * The applications of the "Applications" menu section (lib/nav.ts), in its
 * order, worded in French here. Only navigation has a French page; the
 * others link to their English page.
 */
const PLATFORM: { label: string; href: string; blurb?: string; slug: string; en?: boolean }[] = [
  {
    label: "Navigation",
    href: "/fr/applications/navigation",
    blurb: "Un positionnement fiable sans GPS.",
    slug: "navigation",
  },
  {
    label: "Sciences du vivant",
    href: "/applications/life-sciences",
    blurb: "La résonance magnétique sur de petits échantillons, et la signature magnétique des cellules.",
    slug: "life-sciences",
    en: true,
  },
  {
    label: "Semi-conducteurs et industrie",
    href: "/applications/semiconductors",
    blurb: "Chemins de courant et défauts enfouis, vus par leur champ magnétique.",
    slug: "semiconductors",
    en: true,
  },
  {
    label: "Informatique quantique",
    href: "/applications/quantum-computing",
    blurb: "Le contrôle des spins à température ambiante.",
    slug: "quantum-computing",
    en: true,
  },
];

/* ----- Page ------------------------------------------------------------- */

export default function Accueil() {
  const today = todayISO();
  const posts = latestPosts(3);
  const events = upcomingEvents(today).slice(0, 3);

  return (
    <main lang="fr">
      <Hero />

      {/* ========================= THE PROBLEM ========================= */}
      <Cinema id="problem">
        <Reveal>
          <Eyebrow>Le problème</Eyebrow>
          <H2 className="max-w-4xl mb-6">
            Là où le GPS lâche, personne ne sait dire de combien la position est fausse.
          </H2>
          <Lead className="max-w-3xl">
            Le brouillage et le leurrage de la navigation par satellite sont en hausse. Quand le signal
            est perdu, la centrale inertielle continue seule et dérive. Quand il est leurré, le récepteur
            peut suivre une fausse position.
          </Lead>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mt-14">
          {SITUATIONS.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 90}>
              {/* a clip only where it loops cleanly; a still photograph otherwise */}
              {s.clip ? (
                <DuotoneClip
                  poster={s.clip.poster}
                  sources={s.clip.sources}
                  alt={s.alt}
                  aspect="4/3"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              ) : (
                <DuotonePhoto src={s.src} alt={s.alt} aspect="4/3" sizes="(min-width: 768px) 33vw, 100vw" />
              )}
              <h3 className="text-lg font-semibold display mt-5" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <Body className="mt-2">{s.text}</Body>
            </Reveal>
          ))}
        </ul>
        <p className="figure-label is-plain mt-6">Images d’illustration.</p>

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
              <SourceNote source={f.source} lang="fr" className="mt-4 max-w-md" />
            </div>
          ))}
        </div>

        {/* The daily interference map, live, beside the sentence that turns it
            towards our question. */}
        <Reveal className="mt-14">
          <div className="card relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] overflow-hidden">
            <GnssMap variant="compact" locale="fr" />
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <p className="eyebrow mb-3">Cartographié chaque jour</p>
              <p
                className="text-xl md:text-[1.4rem] leading-snug font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                La carte montre où des avions ont perdu confiance dans le positionnement par satellite.
                Elle ne peut pas montrer de combien chaque position était fausse.
              </p>
              <p className="text-[15px] leading-7 mt-3" style={{ color: "var(--muted)" }}>
                C’est la question à laquelle notre instrument est conçu pour répondre.
              </p>
              <Link href="/fr/applications/navigation#problem" className="textlink mt-6 self-start">
                Pourquoi c’est important <span aria-hidden>→</span>
              </Link>
              <p className="source-note mt-5">
                La carte est établie à partir des rapports ADS-B des avions. Données d’un tiers, pas
                celles de Spectral Flow.
              </p>
            </div>
          </div>
        </Reveal>
      </Cinema>

      {/* ======================== THE ERROR BOUND ======================== */}
      <Prose id="bound">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>La borne d’erreur</Eyebrow>
            <H2 className="mb-6">
              Non pas la précision d’un bon jour&nbsp;: l’erreur possible, à l’instant.
            </H2>
            <Lead className="mb-4">Chaque recalage vient avec sa borne d’erreur.</Lead>
            <Body className="max-w-xl">
              Entre deux recalages magnétiques, la borne s’élargit, et à chaque recalage elle se
              resserre. L’intégrité passe en premier&nbsp;: l’instrument dit quand ne pas lui faire
              confiance, pour que le système qu’il alimente puisse décider de la conduite à tenir.
            </Body>
            <Link href="/fr/applications/navigation#bound" className="textlink mt-7">
              En savoir plus sur la borne d’erreur <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="plate p-5 md:p-8">
              <ErrorBound
                labels={{
                  others: "Une position seule",
                  ours: "Une position avec sa borne d’erreur",
                  truth: "Trajectoire réelle",
                }}
                note="Illustration, pas des données."
                ariaLabel={"Illustration : sur la même trajectoire, une position donnée seule s’éloigne sans rien qui montre son erreur, tandis qu’une position donnée avec sa borne d’erreur reste dans un disque en pointillés qui s’élargit entre deux recalages magnétiques et se resserre à chaque recalage."}
              />
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* ========================= HOW IT WORKS ========================= */}
      <Prose id="how">
        <Steps
          eyebrow="Le fonctionnement"
          title="Du champ terrestre à un recalage borné."
          lead="Quatre étapes, à bord. L’instrument complète la centrale inertielle, il ne la remplace pas."
          steps={NAV_STEPS}
        />
        <Reveal>
          <div className="hairline mt-10 pt-10 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-5 md:gap-12 items-baseline">
            <p
              className="display text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Ils compensent. Nous mesurons.
            </p>
            <Body className="max-w-xl">
              La navigation magnétique modélise depuis longtemps le champ propre du véhicule à partir
              d’un vol de calibration, puis le soustrait. Notre instrument est conçu pour rejeter aussi
              ce champ à bord, en temps réel, afin qu’il reste moins à corriger pour le modèle.
            </Body>
          </div>
        </Reveal>
      </Prose>

      {/* ========================= WHY DIAMOND ========================= */}
      <Prose id="diamond">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <Eyebrow>Pourquoi le diamant</Eyebrow>
              <H2 className="mb-6">Des défauts atomiques du diamant, lus à la lumière.</H2>
              <Lead className="max-w-xl mb-10">
                Un centre azote-lacune (NV) est un défaut du diamant qui se comporte comme une minuscule
                boussole que l’on lit avec de la lumière.
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
              <Link href="/fr/technology#principle" className="textlink mt-6">
                Le principe, en trois temps <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <DiamondPlate
              lang="fr"
              caption={"Image d’illustration : une plaque de diamant, avec les quatre axes cristallins selon lesquels pointent les centres NV."}
            />
          </Reveal>
        </div>
      </Prose>

      {/* ======================== THE INSTRUMENT ======================== */}
      <Cinema id="instrument">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-10">
          <Reveal>
            <Eyebrow>Missions de démonstration</Eyebrow>
            <H2 className="mb-6">Pilotez une mission.</H2>
            <Lead>
              Nos missions de démonstration jouent toute la chaîne de navigation en simulation, en
              direct dans votre navigateur&nbsp;: une carte magnétique, un véhicule avec ses propres
              perturbations, le capteur et le filtre de navigation.
            </Lead>
          </Reveal>
          <Reveal delay={90}>
            <Body>
              Injectez des pannes, voyez l’instrument les signaler, et lisez le bilan de mission. Chaque
              chiffre est issu du modèle&nbsp;: une simulation encore à calibrer sur le matériel, utile
              en relatif. Aucun compte à créer.
            </Body>
          </Reveal>
        </div>

        <Reveal>
          <MissionChart lang="fr" />
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {MISSION_PROFILES.map((p, i) => (
            <Reveal key={p.key} as="li" delay={i * 80}>
              <Link
                href={`/instrument?profile=${p.key}`}
                hrefLang="en"
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
                  Piloter cette mission<span className="sr-only"> (en anglais)</span>{" "}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 mt-10">
            <Link href="/instrument" hrefLang="en" className="btn-primary self-start">
              Piloter l’Instrument (en anglais) <span aria-hidden>→</span>
            </Link>
            <Link href={CTA_SIMULATION} className="textlink">
              Demander une session de simulation experte <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Cinema>

      {/* ======================== WHERE WE STAND ======================== */}
      <Prose id="where-we-stand">
        <Reveal>
          <Eyebrow>Où nous en sommes</Eyebrow>
          <H2 className="max-w-3xl mb-6">De la simulation à un premier prototype mobile.</H2>
          <Lead className="max-w-2xl">
            Ce qui est fait, et ce qui vient. Chaque chiffre de performance que nous montrons aujourd’hui
            est issu du modèle, obtenu en simulation.
          </Lead>
          <p className="figure-label is-plain mt-10 mb-8">Situation en {low(FACTS_AS_OF)}</p>
        </Reveal>
        <Reveal delay={80}>
          <Timeline />
        </Reveal>
        <Reveal>
          <Link href="/fr/company#where-we-stand" className="textlink mt-10">
            Où nous en sommes, en détail <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ========================= ONE PLATFORM ========================= */}
      <Prose id="platform">
        <Reveal>
          <Eyebrow>Une plateforme</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            Une plateforme diamant, de nombreux instruments. La navigation d’abord.
          </H2>
          <Lead className="max-w-2xl mb-12">
            La navigation est le premier instrument. Son cœur, des spins du diamant lus à la lumière,
            peut servir d’autres domaines&nbsp;: les sciences du vivant, l’inspection des
            semi-conducteurs et l’informatique quantique.
          </Lead>
        </Reveal>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORM.map((v, i) => (
            <Reveal key={v.href} as="li" delay={i * 70}>
              <Link
                href={v.href}
                hrefLang={v.en ? "en" : undefined}
                className="card p-6 h-full flex flex-col gap-3"
              >
                <span className="flex items-center justify-between gap-3">
                  <VerticalIcon slug={v.slug} />
                  {i === 0 && <span className="pill">Première</span>}
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
                  Découvrir{v.en && <span className="sr-only"> (en anglais)</span>}{" "}
                  <span aria-hidden>→</span>
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
              <Eyebrow>Actualités</Eyebrow>
              <H2>Dernières actualités</H2>
            </div>
            <Link href="/fr/news" className="textlink">
              Toutes les actualités <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="h-full">
              <NewsCard post={p} lang="fr" />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-8">
              <div>
                <Eyebrow>Événements</Eyebrow>
                <h2
                  className="display text-2xl md:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Nous rencontrer
                </h2>
              </div>
              <Link href="/fr/events" className="textlink">
                Tous les événements <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((e, i) => (
                <Reveal key={e.slug} delay={i * 80} className="h-full">
                  <EventCard event={e} today={today} contactHref="/fr/contact" lang="fr" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Body>
              Aucune date publique pour le moment.{" "}
              <Link href="/fr/contact" className="textlink">
                Nous écrire <span aria-hidden>→</span>
              </Link>
            </Body>
          )}
        </div>
      </Prose>

      {/* ============ RECOGNITIONS, MEMBERSHIPS AND SELECTIONS ============ */}
      <section aria-label="Reconnaissances, adhésions et sélections">
        <Supporters
          variant="strip"
          id="support"
          heading="Reconnaissances, adhésions et sélections"
          showResearchLine
          lang="fr"
        />
      </section>

      {/* ========================= CLOSING CALL ========================= */}
      <Prose id="work-with-us">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <H2 className="max-w-3xl mb-6">Travaillons ensemble.</H2>
          <Lead className="max-w-2xl mb-9">
            Nous cherchons des partenaires de programme&nbsp;: intégrateurs de navigation, laboratoires
            de recherche et investisseurs qui apportent un programme.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href={CTA_PROGRAMME} className="btn-primary self-start">
              Nous contacter <span aria-hidden>→</span>
            </Link>
            <Link href="/instrument" hrefLang="en" className="btn-ghost self-start">
              Piloter une mission (en anglais)
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
