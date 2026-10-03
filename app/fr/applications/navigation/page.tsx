// fr-source: app/applications/navigation/page.tsx sha256:3a635cbab2fde1af
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../../../components/Reveal";
import Steps from "../../../components/Steps";
import GnssMap from "../../../components/GnssMap";
import ErrorBound from "../../../components/ErrorBound";
import SourceNote from "../../../components/SourceNote";
import DuotonePhoto from "../../../components/DuotonePhoto";
import DuotoneClip from "../../../components/DuotoneClip";
import NewsCard from "../../../components/NewsCard";
import VerticalGlyph from "../../../components/VerticalGlyph";
import { Prose, Cinema, Plate, Eyebrow, H2, Lead, Body } from "../../../components/kit";
import { BRAND, SITE_URL } from "../../../lib/facts";
import {
  FACTS_AS_OF,
  PATENT_DETAIL,
  STAGE_LINE,
  getSource,
  type ContextSource,
} from "../../../lib/fr/facts";
import { getPost, type Post } from "../../../lib/fr/news";

/* ----- French typography --------------------------------------------- */

const NBSP = " ";
const NNBSP = " ";

/**
 * Typographic apostrophe, and the non-breaking spaces French typography
 * puts before : ; ? ! and %, inside guillemets and between thousands.
 * Source strings are written with plain spaces and apostrophes.
 */
function fr(s: string): string {
  return s
    .replace(/'/g, "’")
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;?!%])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NNBSP}`);
}

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/fr/applications/navigation";
const EN_PATH = "/applications/navigation";
const META_TITLE = "Navigation sans GPS";
const SHARE_TITLE = fr(`La navigation qui sait de combien elle peut se tromper · ${BRAND}`);
/** Short enough for search results. */
const DESCRIPTION = fr(
  "Des magnétomètres quantiques à diamant pour la navigation, là où le positionnement par satellite n'est pas digne de confiance. Chaque position vient avec sa borne d'erreur."
);
/** Longer version for share cards. */
const SHARE_DESCRIPTION = fr(
  "Spectral Flow conçoit des magnétomètres quantiques à diamant pour la navigation, là où le positionnement par satellite n'est pas digne de confiance. L'instrument lit le champ magnétique de la Terre, le compare à une carte et rend chaque position avec sa borne d'erreur."
);
/** The English page's share image (its opengraph-image.tsx), named again here. */
const SHARE_IMAGE = {
  url: `${EN_PATH}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: fr(`${BRAND} · La navigation qui sait de combien elle peut se tromper.`),
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
    languages: { en: EN_PATH, fr: PAGE_PATH },
  },
  openGraph: {
    images: [SHARE_IMAGE],
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

/* ----- Content ------------------------------------------------------- */

const ON_THIS_PAGE = [
  { id: "problem", label: "Le problème" },
  { id: "bound", label: fr("La borne d'erreur") },
  { id: "how", label: "Comment ça marche" },
  { id: "situations", label: "Situations" },
  { id: "offer", label: "Ce que nous proposons" },
  { id: "faq", label: "Questions fréquentes" },
];

/** Third-party context figures shown next to the map (ids from facts.ts). */
const FIGURE_SOURCES = ["iata-2025-safety-report", "iata-agm-2026", "opsgroup-2024"];
const POLICY_SOURCE = "easa-eurocontrol-plan-2026";

const PROBLEM_POINTS = [
  {
    t: fr("Brouillé ou leurré"),
    d: fr(
      "Le brouillage noie le signal des satellites. Le leurrage le remplace par un faux signal, qui peut paraître parfaitement sain."
    ),
  },
  {
    t: fr("La centrale inertielle dérive"),
    d: fr(
      "Privé de satellites, le véhicule se replie sur sa centrale inertielle. Son erreur grandit dès que le signal est perdu."
    ),
  },
  {
    t: fr("Aucune vérification de l'erreur"),
    d: fr(
      "L'estimation que la centrale inertielle fait de sa propre erreur ne cesse de grandir, et sans référence extérieure rien ne peut la vérifier."
    ),
  },
];

const BOUND_POINTS = [
  {
    t: fr("Une position et sa borne"),
    d: fr(
      "Chaque recalage vient avec sa borne d'erreur : où se trouve le véhicule, et de combien cette position peut être fausse."
    ),
  },
  {
    t: fr("Intégrité"),
    d: fr(
      "L'instrument dit quand ne pas s'y fier, au lieu de transmettre une erreur avec assurance."
    ),
  },
  {
    t: fr("Déclarée par l'instrument"),
    d: fr(
      "La borne est déclarée par l'instrument lui-même. La certifier est l'affaire d'un programme, avec ses utilisateurs et l'autorité dont il relève."
    ),
  },
];

const HOW_STEPS = [
  {
    n: "01",
    t: "Mesurer",
    d: fr(
      "Le capteur à diamant lit le champ magnétique de la Terre sous la forme d'un vecteur complet, à température ambiante."
    ),
  },
  {
    n: "02",
    t: "Rejeter",
    d: fr(
      "Le véhicule porte son propre champ magnétique : moteurs, courants, acier. L'instrument le rejette à bord, en temps réel."
    ),
  },
  {
    n: "03",
    t: "Recaler",
    d: fr(
      "Les mesures nettoyées, prises le long de la trajectoire, sont comparées à une carte d'anomalies magnétiques. Le recalage corrige la dérive de la centrale inertielle."
    ),
  },
  {
    n: "04",
    t: "Borner",
    d: fr(
      "Chaque recalage vient avec sa borne d'erreur. Entre deux recalages, la centrale inertielle porte la position et la borne s'élargit."
    ),
  },
];

const HOW_POINTS = [
  {
    t: fr("Il complète la centrale inertielle"),
    d: fr(
      "La centrale inertielle donne une estimation lisse et continue. Chaque recalage magnétique ramène sa dérive."
    ),
  },
  {
    t: fr("Passif"),
    d: fr("Il lit le champ propre de la Terre et n'a besoin d'aucun signal extérieur."),
  },
  {
    t: fr("Fondé sur le diamant"),
    d: fr(
      "Température ambiante. Tient sur la plateforme. Quatre axes cristallins : le vecteur vient du réseau."
    ),
    link: { href: "/fr/technology#diamond", label: "Pourquoi le diamant" },
  },
];

type Situation = {
  label: string;
  title: string;
  body: string;
  status: string[];
  photo: { src: string; alt: string; position?: string };
  /** only where the clip loops cleanly; the photograph otherwise */
  clip?: { poster: string; sources: { src: string; type: string }[] };
  link?: { href: string; label: string };
};

/** Neutral order: survey and exploration, at sea, in the air, in space. */
const SITUATIONS: Situation[] = [
  {
    label: fr("Levés et prospection"),
    title: fr("Une position bornée pour chaque mesure."),
    body: fr(
      "Un levé magnétique aéroporté ne vaut que par la position de chaque mesure et le calme de la plateforme. L'instrument est conçu pour les deux : il rejette à bord le champ propre de l'aéronef et maintient chaque position dans sa borne, y compris là où le positionnement par satellite est perdu."
    ),
    status: [fr("Mission de démonstration disponible"), fr("Issu du modèle")],
    photo: {
      src: "/img/v3/survey-drone.webp",
      alt: fr("Un drone civil de levé volant à basse altitude au-dessus d'une plaine désertique."),
    },
    clip: { poster: "/video/situations/survey-v4-poster.webp", sources: [{ src: "/video/situations/survey-v4.webm", type: "video/webm" }, { src: "/video/situations/survey-v4.mp4", type: "video/mp4" }] },
    link: { href: "/instrument?profile=geo", label: fr("Piloter le levé (en anglais)") },
  },
  {
    label: fr("En mer"),
    title: fr("Hors de portée des satellites, toujours dans le champ."),
    body: fr(
      "Des navires signalent des interférences sur le positionnement par satellite dans plusieurs zones maritimes, et les drones qui surveillent les ports et les côtes en dépendent aussi. Sous l'eau, les signaux des satellites n'arrivent jamais. Le champ magnétique de la Terre, lui, les atteint tous."
    ),
    status: [fr("Dans notre périmètre de conception"), fr("Pas encore de mission de démonstration")],
    photo: {
      src: "/img/v3/port-drone.webp",
      alt: fr("Un navire de recherche traversant la haute mer, vu du dessus."),
    },
    clip: { poster: "/video/situations/sea-v3-poster.webp", sources: [{ src: "/video/situations/sea-v3.webm", type: "video/webm" }, { src: "/video/situations/sea-v3.mp4", type: "video/mp4" }] },
  },
  {
    label: fr("Dans les airs"),
    title: fr("À travers un espace aérien brouillé et leurré."),
    body: fr(
      "Avions et drones traversent des régions où les signaux des satellites sont brouillés ou leurrés. La signature magnétique du sol en dessous ne dépend d'aucun de ces signaux."
    ),
    status: [fr("Mission de démonstration disponible"), fr("Issu du modèle")],
    photo: {
      src: "/img/v3/air.webp",
      alt: fr("Un avion de ligne au-dessus des nuages, au crépuscule."),
    },
    clip: { poster: "/video/situations/air-v4-poster.webp", sources: [{ src: "/video/situations/air-v4.webm", type: "video/webm" }, { src: "/video/situations/air-v4.mp4", type: "video/mp4" }] },
    link: { href: "/instrument", label: fr("Piloter une mission (en anglais)") },
  },
  {
    label: fr("Dans l'espace"),
    title: fr("Au-delà de la portée de la navigation par satellite."),
    body: fr(
      "Aucun satellite de navigation ne tourne autour de Mars. Sa croûte garde par endroits un champ magnétique fossile, et notre mission de démonstration fait naviguer un éclaireur sur ce champ."
    ),
    status: [fr("Mission de démonstration disponible"), fr("Issu du modèle")],
    photo: {
      src: "/img/v3/smallsat.webp",
      alt: fr("Un petit engin spatial au-dessus d'une planète."),
    },
    clip: { poster: "/video/situations/space-v4-poster.webp", sources: [{ src: "/video/situations/space-v4.webm", type: "video/webm" }, { src: "/video/situations/space-v4.mp4", type: "video/mp4" }] },
    link: { href: "/instrument?profile=space", label: fr("Piloter l'éclaireur martien (en anglais)") },
  },
];

const OFFERS = [
  {
    t: fr("Des programmes"),
    d: fr(
      "Avec les intégrateurs de navigation et les maîtres d'œuvre, nous développons l'instrument pour votre plateforme et votre mission, au sein de votre programme."
    ),
  },
  {
    t: fr("Des études de faisabilité et d'intégration"),
    d: fr(
      "Nous étudions, en simulation et avant tout matériel, si la navigation magnétique peut fonctionner sur votre plateforme, au-dessus de votre zone et pour votre profil de mission."
    ),
  },
  {
    t: fr("Des sessions de simulation expertes"),
    d: fr(
      "Votre mission jouée de bout en bout dans notre simulation, avec nous. La simulation est encore en cours de calibration : elle est utile en relatif, pour comparer des options, pas pour promettre un chiffre."
    ),
  },
];

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

type FaqItem = { q: string; a: string; link?: { href: string; label: string } };

/**
 * Plain text on purpose: the same strings feed the page and the FAQPage
 * data. An optional link is shown on the page only.
 */
const FAQ: FaqItem[] = [
  {
    q: fr("Remplace-t-il le GNSS ?"),
    a: fr(
      "Non. Là où le positionnement par satellite fonctionne et reste digne de confiance, il demeure la référence. Notre instrument est conçu pour les cas où il ne l'est pas : brouillé, leurré ou hors de portée. Il est conçu pour fournir une seconde source de position, qui n'a besoin d'aucun signal extérieur, et pour dire de combien cette position peut être fausse."
    ),
  },
  {
    q: fr("Remplace-t-il la centrale inertielle ?"),
    a: fr(
      "Non. Il complète la centrale inertielle, il ne la remplace pas. La centrale inertielle donne une estimation lisse et continue, qui dérive avec le temps. Chaque recalage magnétique corrige cette dérive, et chaque recalage vient avec sa borne d'erreur."
    ),
  },
  {
    q: fr("Peut-il être leurré ?"),
    a: fr(
      "Il est passif : il lit le champ propre de la Terre et n'a besoin d'aucun signal extérieur. Cela ne le rend pas invulnérable. Une source magnétique placée à proximité peut perturber un magnétomètre. L'instrument est conçu pour le détecter et le dire. Dans notre mission de démonstration, vous pouvez jouer cette attaque vous-même."
    ),
    link: { href: "/instrument", label: fr("Jouer l'attaque dans la mission de démonstration (en anglais)") },
  },
  {
    q: fr("Qu'est-ce qui le limite ?"),
    a: fr(
      "D'abord la carte : un recalage magnétique ne vaut que ce que vaut la carte d'anomalies à laquelle il est comparé. Ensuite le véhicule, dont il faut rejeter proprement le champ magnétique. Et le Soleil : pendant une tempête magnétique, le champ lui-même bouge. Au-delà d'un seuil, davantage de sensibilité du capteur n'apporte plus grand-chose : l'erreur se loge dans le véhicule et dans la carte. Ce que le diamant apporte, c'est un vecteur complet issu du réseau cristallin, sur une plateforme en mouvement, à température ambiante. Nous travaillons aussi sur le véhicule et sur la carte."
    ),
  },
  {
    q: fr("Que vendez-vous aujourd'hui ?"),
    a: fr(
      "Des études et des travaux de programme, pas des unités. Nous proposons des études de faisabilité et d'intégration sur votre profil de mission et des sessions de simulation expertes, et nous cherchons des programmes à rejoindre avec des intégrateurs de navigation et des maîtres d'œuvre. Les unités viennent ensuite, issues de ces programmes."
    ),
  },
  {
    q: fr("Où en êtes-vous aujourd'hui ?"),
    a: fr(
      `En ${FACTS_AS_OF}, ${lowerFirst(STAGE_LINE)} Toute la chaîne de navigation est jouée de bout en bout en simulation, et chaque résultat que nous montrons est issu du modèle. ${PATENT_DETAIL}`
    ),
  },
];

const RELATED_POSTS = [
  "position-and-its-error-bound",
  "contested-satellite-navigation",
  "the-instrument-is-public",
];

/** JSON for a script tag, with "<" escaped. */
const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/* ----- Page ---------------------------------------------------------- */

function Point({ t, d, children }: { t: string; d: string; children?: ReactNode }) {
  return (
    <div className="hairline pt-6 h-full">
      <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
        {t}
      </h3>
      <Body>{d}</Body>
      {children}
    </div>
  );
}

export default function NavigationPage() {
  const figures = FIGURE_SOURCES.map((id) => getSource(id)).filter(
    (s): s is ContextSource => !!s
  );
  const policy = getSource(POLICY_SOURCE);
  const related = RELATED_POSTS.map((slug) => getPost(slug)).filter((p): p is Post => !!p);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/fr` },
      { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE_URL}/fr/applications` },
      { "@type": "ListItem", position: 3, name: "Navigation", item: `${SITE_URL}${PAGE_PATH}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }}
      />

      {/* ============================ HERO ============================ */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="hero-rise">
              <Eyebrow>Navigation sans GPS</Eyebrow>
              <h1
                className="display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.3rem] font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                La navigation qui sait de combien elle peut se tromper
                <span style={{ color: "var(--accent)" }}>.</span>
              </h1>
            </div>
            <div className="hero-rise" style={{ animationDelay: "140ms" }}>
              <Lead className="max-w-xl mt-7">
                {fr(
                  "Des magnétomètres quantiques à diamant pour la navigation, là où le positionnement par satellite n'est pas digne de confiance."
                )}
              </Lead>
              <Body className="max-w-xl mt-4">
                {fr(
                  "L'instrument lit le champ magnétique de la Terre, le compare à une carte et rend chaque position avec une borne d'erreur garantie."
                )}
              </Body>
            </div>
            <div className="hero-rise" style={{ animationDelay: "260ms" }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-9">
                <Link href="/instrument" hrefLang="en" className="btn-primary self-start">
                  Piloter une mission (en anglais) <span aria-hidden>→</span>
                </Link>
                <Link href="/fr/contact" className="textlink">
                  {fr("Parler d'un programme")} <span aria-hidden>→</span>
                </Link>
              </div>
              <p className="figure-label is-plain mt-9 max-w-xl">{STAGE_LINE}</p>
            </div>
          </div>

          <figure className="hero-rise" style={{ animationDelay: "200ms" }}>
            <div
              className="relative overflow-hidden rounded-[var(--radius)]"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <Image
                src="/img/v3/relief.webp"
                alt={fr(
                  "Courbes de niveau d'une carte d'anomalies magnétiques, traversées par un trajet bleu."
                )}
                width={2400}
                height={1800}
                sizes="(min-width: 1024px) 44vw, 100vw"
                preload
                className="block w-full h-auto"
              />
            </div>
            <figcaption className="figure-label is-plain mt-4">
              {fr("Illustration : un trajet à travers l'empreinte magnétique de la Terre.")}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* On this page */}
      <nav aria-label="Sur cette page" className="hairline">
        <ul className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex flex-wrap gap-x-7 gap-y-3">
          {ON_THIS_PAGE.map((j) => (
            <li key={j.id}>
              <a
                href={`#${j.id}`}
                className="text-sm font-medium transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                {j.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ========================= THE PROBLEM ========================= */}
      <Cinema id="problem">
        <Reveal>
          <Eyebrow>Le problème</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("La navigation par satellite est désormais un signal contesté.")}
          </H2>
          <Lead className="max-w-3xl">
            {fr(
              "Le brouillage et le leurrage de la navigation par satellite touchent désormais des régions entières autour des zones de conflit, parmi lesquelles la mer Baltique, la mer Noire, la Méditerranée orientale et le Moyen-Orient. La carte en direct ci-dessous est reconstruite chaque jour à partir des données des avions."
            )}
          </Lead>
          <SourceNote
            lang="fr"
            org={fr("EASA, bulletin d'information de sécurité 2022-02R4")}
            date="3 juillet 2026"
            title="Global Navigation Satellite System Outage and Alterations Leading to Communication / Navigation / Surveillance Degradation"
            href="https://ad.easa.europa.eu/blob/EASA_SIB_2022_02R4.pdf/SIB_2022-02R4_1"
            className="mt-4 max-w-3xl"
          />
        </Reveal>

        <Reveal delay={100}>
          <GnssMap className="mt-12" locale="fr" />
        </Reveal>

        {figures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            {figures.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div className="card p-6 md:p-7 h-full flex flex-col gap-5">
                  <p
                    className="text-lg leading-snug font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.figure}
                  </p>
                  <SourceNote lang="fr" source={s} className="mt-auto" />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {policy && (
          <Reveal>
            <div className="mt-8 max-w-3xl flex flex-col gap-2">
              <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                {policy.figure}
              </p>
              <SourceNote lang="fr" source={policy} />
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-20">
          {PROBLEM_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="display text-2xl md:text-3xl font-semibold tracking-tight mt-16 max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            {fr("Là où le GPS lâche, personne ne sait dire de combien la position est fausse.")}
          </p>
          <a href="#bound" className="textlink mt-6">
            {fr("La borne d'erreur")} <span aria-hidden>→</span>
          </a>
        </Reveal>
      </Cinema>

      {/* ======================== THE ERROR BOUND ======================== */}
      <Prose id="bound">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-end">
          <Reveal>
            <Eyebrow>{fr("La borne d'erreur")}</Eyebrow>
            <H2>{fr("Non pas la précision d'un bon jour : l'erreur possible, à l'instant.")}</H2>
          </Reveal>
          <Reveal delay={100}>
            <Lead>
              {fr(
                "Nous rendons chaque position avec sa borne d'erreur : le rayon dans lequel la position réelle est conçue pour rester, pour un risque annoncé."
              )}
            </Lead>
            <Body className="mt-4">
              {fr(
                "Entre deux recalages magnétiques, la borne s'élargit, à mesure que la centrale inertielle dérive. À chaque recalage, elle se resserre. Un système de guidage, un pilote ou un opérateur peut alors décider jusqu'où se fier à chaque position."
              )}
            </Body>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="plate p-6 md:p-10 mt-12">
            <ErrorBound
              labels={{
                others: "Une position seule",
                ours: fr("Une position avec sa borne d'erreur"),
                truth: fr("Trajectoire réelle"),
              }}
              note={fr("Illustration, pas des données.")}
              ariaLabel={fr(
                "Illustration : le long d'une même trajectoire, une position donnée seule s'écarte sans rien qui montre son erreur, tandis qu'une position donnée avec sa borne d'erreur reste dans un disque en pointillés qui s'élargit entre deux recalages magnétiques et se resserre à chaque recalage."
              )}
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-14">
          {BOUND_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* ========================= HOW IT WORKS ========================= */}
      <Prose id="how">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>Comment ça marche</Eyebrow>
            <H2 className="mb-6">
              {fr("La Terre a une empreinte magnétique, et elle est cartographiée.")}
            </H2>
            <Lead className="mb-5">
              {fr(
                "Les roches de la croûte terrestre portent une signature magnétique qui change d'un endroit à l'autre. Les services géologiques en ont cartographié une grande partie depuis des décennies, sur terre et en mer, à des résolutions variables."
              )}
            </Lead>
            <Body>
              {fr(
                "Un magnétomètre sensible lit le champ local. Comparées à la carte le long de la trajectoire, ses mesures indiquent au véhicule où il se trouve et corrigent la dérive de sa centrale inertielle. C'est le recalage sur carte magnétique."
              )}
            </Body>
          </Reveal>
          <Reveal delay={120}>
            <Plate
              caption={fr(
                "Les mesures prises le long de la trajectoire, comparées à la carte magnétique, donnent un recalage."
              )}
            >
              <div
                role="img"
                aria-label={fr(
                  "Un véhicule compare les mesures de son magnétomètre à une carte magnétique pour corriger sa position."
                )}
              >
                <div aria-hidden="true">
                  <VerticalGlyph slug="navigation" lang="fr" />
                </div>
              </div>
            </Plate>
          </Reveal>
        </div>

        <Reveal>
          <p
            className="display text-2xl md:text-3xl font-semibold tracking-tight mt-16 md:mt-20 max-w-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            La carte, plus que le capteur, fait la valeur. Nous travaillons sur les deux.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24">
          <Steps
            eyebrow="Quatre étapes"
            title={
              <>
                Du champ de la Terre
                <br />
                à un recalage borné.
              </>
            }
            lead="Il complète la centrale inertielle, il ne la remplace pas."
            steps={HOW_STEPS}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mt-16">
          {HOW_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d}>
                {p.link && (
                  <Link href={p.link.href} className="textlink mt-4">
                    {p.link.label} <span aria-hidden>→</span>
                  </Link>
                )}
              </Point>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* ========================== SITUATIONS ========================== */}
      <Prose id="situations">
        <Reveal>
          <Eyebrow>Situations</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Partout où le positionnement par satellite n'est pas digne de confiance.")}
          </H2>
          <Lead className="max-w-3xl mb-14">
            {fr(
              "Un instrument, quatre situations. Chacune dit clairement où elle en est : une mission de démonstration est une simulation, et tout ce qu'elle montre est issu du modèle."
            )}
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {SITUATIONS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 90} as="article" className="flex flex-col h-full">
              {s.clip ? (
                <DuotoneClip
                  poster={s.clip.poster}
                  sources={s.clip.sources}
                  alt={s.photo.alt}
                  aspect="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <DuotonePhoto
                  src={s.photo.src}
                  alt={s.photo.alt}
                  aspect="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  objectPosition={s.photo.position}
                />
              )}
              <p className="eyebrow mt-6 mb-2">{s.label}</p>
              <h3
                className="text-xl md:text-2xl font-semibold tracking-tight leading-snug mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {s.title}
              </h3>
              <Body>{s.body}</Body>
              <ul className="flex flex-wrap items-center gap-2 mt-5" aria-label={fr("État d'avancement")}>
                {s.status.map((st) => (
                  <li key={st} className="pill">
                    {st}
                  </li>
                ))}
              </ul>
              {s.link && (
                <Link href={s.link.href} hrefLang="en" className="textlink mt-5">
                  {s.link.label} <span aria-hidden>→</span>
                </Link>
              )}
            </Reveal>
          ))}
        </div>

      </Prose>

      {/* ========================= WHAT WE OFFER ========================= */}
      <Prose id="offer">
        <Reveal>
          <Eyebrow>Ce que nous proposons</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("D'abord un marché de programmes, ensuite des unités.")}
          </H2>
          <Lead className="max-w-3xl mb-14">
            {fr(
              "La navigation sans satellites s'achète par programmes avant de s'acheter à l'unité. C'est par là que nous commençons, avec les intégrateurs de navigation et les maîtres d'œuvre."
            )}
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFERS.map((o, i) => (
            <Reveal key={o.t} delay={i * 80}>
              <div className="card p-6 md:p-7 h-full flex flex-col gap-3">
                <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                  {o.t}
                </h3>
                <Body>{o.d}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mt-12">
            <Link href="/fr/contact" className="btn-primary self-start">
              {fr("Parler d'un programme")} <span aria-hidden>→</span>
            </Link>
            <p className="text-[15px] leading-7" style={{ color: "var(--muted)" }}>
              Les unités viennent ensuite, issues des programmes.
            </p>
          </div>
        </Reveal>
      </Prose>

      {/* ============================== FAQ ============================== */}
      <Prose id="faq">
        <Reveal>
          <Eyebrow>Questions fréquentes</Eyebrow>
          <H2 className="max-w-3xl mb-12">Questions et objections.</H2>
        </Reveal>
        <div className="flex flex-col">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="hairline py-8 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-3 md:gap-12">
                <h3
                  className="text-lg font-semibold tracking-tight leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {f.q}
                </h3>
                <div>
                  <Body>{f.a}</Body>
                  {f.link && (
                    <Link href={f.link.href} hrefLang="en" className="textlink mt-4">
                      {f.link.label} <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/fr/company#where-we-stand" className="textlink mt-8">
            {fr("Où nous en sommes, dates à l'appui")} <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ============================== NEWS ============================== */}
      {related.length > 0 && (
        <Prose>
          <Reveal>
            <Eyebrow>Actualités</Eyebrow>
            <H2 className="max-w-3xl mb-10">À lire aussi sur la navigation.</H2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <NewsCard post={p} lang="fr" />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/fr/news" className="textlink mt-10">
              Toutes les actualités <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </Prose>
      )}

      {/* =========================== FINAL CALL =========================== */}
      <Cinema>
        <Reveal>
          <Eyebrow>Prochaine étape</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Pilotez une mission. Puis parlez-nous de la vôtre.")}
          </H2>
          <Lead className="max-w-2xl mb-9">
            {fr(
              "La mission de démonstration fonctionne dans votre navigateur : une mission complète sans navigation par satellite, chaque chiffre issu du modèle. Si vous avez en tête une plateforme, une zone ou un programme, nous aimerions que vous nous en parliez."
            )}
          </Lead>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link href="/instrument" hrefLang="en" className="btn-primary self-start">
              Piloter une mission (en anglais) <span aria-hidden>→</span>
            </Link>
            <Link href="/fr/contact" className="btn-ghost self-start">
              Nous contacter
            </Link>
          </div>
          <p className="text-[15px] leading-7 mt-12" style={{ color: "var(--text-secondary)" }}>
            {fr("La navigation est la première application d'une plateforme à diamant unique.")}{" "}
            <Link href="/fr/applications" className="textlink">
              Voir les autres <span aria-hidden>→</span>
            </Link>
          </p>
        </Reveal>
      </Cinema>
    </main>
  );
}
