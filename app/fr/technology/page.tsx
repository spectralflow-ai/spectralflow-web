// fr-source: app/technology/page.tsx sha256:3c8a8e7fe649a4b4
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import NVDiagram, { NVAxes } from "../../components/NVDiagram";
import DiamondPlate from "../../components/DiamondPlate";
import Principle from "../../components/Principle";
import { Prose, Eyebrow, H2, Lead, Body } from "../../components/kit";
import { BRAND, SITE_URL, STAGE_LINE, SHARE_IMAGE } from "../../lib/fr/facts";
import { CTA_SIMULATION } from "../../lib/fr/contact";
import { getPost } from "../../lib/fr/news";
import { frHref, languages } from "../../lib/i18n";

/* ----- French typography --------------------------------------------- */

const NBSP = "\u00A0";
const NNBSP = "\u202F";

/**
 * Typographic apostrophe, and the non-breaking spaces French typography
 * puts before : ; ? ! and %, inside guillemets and between thousands.
 * Source strings are written with plain spaces and apostrophes.
 */
function fr(s: string): string {
  return s
    .replace(/'/g, "\u2019")
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;?!%])/g, `${NNBSP}$1`)
    .replace(/\u00AB /g, `\u00AB${NBSP}`)
    .replace(/ \u00BB/g, `${NBSP}\u00BB`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NNBSP}`);
}

/* ----- Metadata ------------------------------------------------------ */

const EN_PATH = "/technology";
const PAGE_PATH = "/fr/technology";
const META_TITLE = fr("Technologie : les centres NV du diamant");
const SHARE_TITLE = `${META_TITLE} · ${BRAND}`;
const DESCRIPTION = fr(
  "Comment un capteur quantique à diamant lit un champ magnétique : le principe du centre NV en trois temps, pourquoi le diamant, et pourquoi chaque conception passe d'abord par la simulation."
);

export const metadata: Metadata = {
  title: META_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH, languages: languages(EN_PATH) },
  openGraph: {
    images: [SHARE_IMAGE],
    title: SHARE_TITLE,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
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
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}${frHref("/")}` },
    { "@type": "ListItem", position: 2, name: "Technologie", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

/* ----- What this means on a vehicle ---------------------------------- */

const ON_A_VEHICLE = [
  {
    t: "Sans cryogénie",
    d: "Le centre NV fonctionne à température ambiante, sans vide ni consommable.",
  },
  {
    t: "Tient sur la plateforme",
    d: "Chocs, vibrations, rayonnements : l'élément sensible est un cristal solide. Nous concevons la tête de mesure autour de lui, pour l'embarquer sur le véhicule.",
  },
  {
    t: "Aucun signal extérieur",
    d: "Passif : il lit le champ propre de la Terre et n'a besoin d'aucun signal extérieur. Une source magnétique placée à proximité peut perturber un magnétomètre. L'instrument est conçu pour le détecter et le dire.",
  },
];

/* ----- What a vehicle asks of a magnetic sensor ---------------------- */

type Origin = "material" | "both" | "design";

const ORIGIN_LABEL: Record<Origin, string> = {
  material: "Le matériau",
  both: "Le matériau, puis la conception de la tête",
  design: "La conception de l'instrument",
};

const REQUIREMENTS: { need: string; answer: string; origin: Origin }[] = [
  {
    need: "Fonctionner sans cryogénie",
    answer: "Température ambiante, rien à remplir.",
    origin: "material",
  },
  {
    need: "Supporter vibrations et chocs",
    answer: "Un cristal solide, porté par la tête de mesure.",
    origin: "both",
  },
  {
    need: "Mesurer le champ comme un vecteur",
    answer: "Quatre axes cristallins : le vecteur vient du réseau.",
    origin: "material",
  },
  {
    need: "Écarter le champ propre du véhicule",
    answer: "L'instrument rejette à bord le champ magnétique propre de la plateforme.",
    origin: "design",
  },
  {
    need: "Dire jusqu'où chaque position est fiable",
    answer: "Chaque recalage vient avec sa borne d'erreur.",
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
              <Eyebrow>Technologie</Eyebrow>
              <h1
                className="display text-4xl md:text-6xl font-semibold tracking-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {fr("Un capteur quantique dans le diamant, lu à la lumière.")}
              </h1>
              <Lead className="max-w-xl">
                {fr(
                  "Un centre azote-lacune (NV) est un défaut du diamant qui se comporte comme une minuscule boussole que l'on lit à la lumière. Il fonctionne à température ambiante, et le réseau cristallin lui donne le sens de l'orientation. Nous concevons des instruments autour de lui, en commençant par la navigation."
                )}
              </Lead>
            </div>
            <figure>
              <div className="plate p-6 md:p-10 flex items-center justify-center">
                <NVDiagram lang="fr" />
              </div>
              <figcaption className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                {fr(
                  "Schéma du centre NV : un atome d'azote à côté d'un atome de carbone manquant dans le cristal."
                )}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ===================== The principle ===================== */}
      <Prose id="principle">
        <Reveal>
          <Eyebrow>Le principe</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Comment un diamant lit le champ magnétique de la Terre.")}
          </H2>
          <Lead className="max-w-2xl mb-12 md:mb-14">
            {fr("Trois temps, de la carte au spin. Aucune équation.")}
          </Lead>
        </Reveal>
        <Reveal delay={80}>
          <Principle lang="fr" />
        </Reveal>
        <Reveal delay={120}>
          <Link href={frHref("/applications/navigation#how")} className="textlink mt-10">
            {fr("Comment le principe devient navigation")} <span>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* ===================== Why diamond ===================== */}
      <Prose id="diamond">
        <Reveal>
          <Eyebrow>Pourquoi le diamant</Eyebrow>
          <H2 className="max-w-3xl mb-14">
            {fr("Température ambiante. Tient sur la plateforme. Quatre axes cristallins.")}
          </H2>
        </Reveal>
        <Reveal>
          <DiamondPlate
            lang="fr"
            caption={fr(
              "Image d'illustration : une plaque de diamant, avec les quatre axes cristallins selon lesquels pointent les centres NV."
            )}
            aspect="21/9"
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="mb-16"
          />
        </Reveal>

        <Reveal>
          <h3 className={`${H3} mb-10`} style={{ color: "var(--text-primary)" }}>
            {fr("Ce que cela change sur un véhicule")}
          </h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {ON_A_VEHICLE.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="hairline pt-6 h-full">
                <h4 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {fr(c.t)}
                </h4>
                <Body>{fr(c.d)}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h3 className={`${H3} mb-5`} style={{ color: "var(--text-primary)" }}>
              {fr("Quatre axes cristallins : le vecteur vient du réseau.")}
            </h3>
            <Body className="mb-4">
              {fr(
                "Dans le diamant, un centre NV s'oriente selon l'une des quatre directions fixées par le réseau cristallin. Chaque direction capte la part du champ magnétique qui lui est parallèle."
              )}
            </Body>
            <Body>
              {fr("Lues ensemble, elles donnent le vecteur complet : son intensité et sa direction.")}
            </Body>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <div className="plate p-6 md:p-10 flex items-center justify-center">
                <div className="w-full max-w-[420px]">
                  <NVAxes lang="fr" />
                </div>
              </div>
              <figcaption className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                {fr(
                  "Un centre NV : une lacune (en pointillés), avec l'azote (en bleu) sur l'une de ses quatre liaisons. Les centres NV pointent selon ces quatre directions."
                )}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Prose>

      {/* ===================== By requirement ===================== */}
      <Prose id="requirements">
        <Reveal>
          <Eyebrow>Par exigence</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Ce qu'un véhicule demande à un capteur magnétique.")}
          </H2>
          <Lead className="max-w-2xl mb-12">
            {fr(
              "D'autres ont fait voler des capteurs NV avant nous. Le diamant apporte les trois premières réponses, et leur qualité dépend du matériau, qui fait partie de notre travail. Les deux dernières dépendent de la conception de l'instrument."
            )}
          </Lead>
        </Reveal>
        <Reveal delay={80}>
          <div
            className="hidden md:grid md:grid-cols-[1fr_1.35fr_0.75fr] gap-8 pb-4 figure-label"
            aria-hidden="true"
          >
            <span>{fr("Le véhicule doit")}</span>
            <span>{fr("Comment on y répond")}</span>
            <span>{fr("D'où cela vient")}</span>
          </div>
          <dl>
            {REQUIREMENTS.map((r) => (
              <div
                key={r.need}
                className="hairline py-6 grid grid-cols-1 md:grid-cols-[1fr_1.35fr_0.75fr] gap-2 md:gap-8"
              >
                <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {fr(r.need)}
                </dt>
                <dd className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                  {fr(r.answer)}
                </dd>
                <dd className="text-[15px] leading-7 font-medium" style={{ color: "var(--muted)" }}>
                  <span className="md:sr-only">{fr("Origine : ")}</span>
                  {fr(ORIGIN_LABEL[r.origin])}
                </dd>
              </div>
            ))}
          </dl>
          <div className="hairline pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
              {fr(
                "Qualitatif. Tout ce qui dépend de notre conception, tête de mesure comprise, reste une intention de conception tant qu'il n'est pas démontré sur le matériel."
              )}
            </p>
            <Link href={frHref("/company#where-we-stand")} className="textlink shrink-0">
              {fr("Où nous en sommes")} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>

      {/* ===================== Simulation first ===================== */}
      <Prose id="simulation">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">
          <Reveal>
            <Eyebrow>{fr("La simulation d'abord")}</Eyebrow>
            <H2 className="mb-6">{fr("Chaque conception passe d'abord par la simulation.")}</H2>
            <Lead className="mb-8">
              {fr(
                "Avant tout matériel, nous simulons toute la chaîne : le relief magnétique, un véhicule avec son propre champ magnétique, le capteur et le filtre de navigation. Une petite équipe peut ainsi comparer des conceptions avant que rien ne soit fabriqué."
              )}
            </Lead>
            <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              {fr("À calibrer, utile en relatif.")}
            </p>
            <Body>
              {fr(
                "La simulation nous dit quelle conception est la meilleure, pas ce que mesurera un prototype. Ses chiffres sont marqués « issus du modèle », et les mesures sur le matériel la calibreront."
              )}
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
                {fr("expériences publiées dans notre registre de validation")}
              </p>
              <p className="text-[15px] leading-7 mb-4" style={{ color: "var(--text-secondary)" }}>
                {fr(
                  "La validation quantitative porte sur celles dont les conditions expérimentales sont assez bien documentées, et la liste est disponible sur demande."
                )}
              </p>
              <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                {fr(
                  "Quand le modèle et une expérience divergent, l'expérience l'emporte et le modèle change."
                )}
              </p>
              {REGISTER_POST && (
                <Link href={frHref(`/news/${REGISTER_POST.slug}`)} className="textlink mt-auto pt-8">
                  {fr("Comment le registre est tenu")} <span>→</span>
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
            <Eyebrow>{fr("Où nous en sommes")}</Eyebrow>
            <h2
              className="display text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              {fr(STAGE_LINE)}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/instrument" hrefLang="en" className="btn-primary">
                {fr("Piloter une mission (en anglais)")}
              </Link>
              <Link href={CTA_SIMULATION} className="btn-ghost">
                {fr("Demander une session experte")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-3 md:items-end">
              <Link href={frHref("/company#where-we-stand")} className="textlink">
                {fr("Voir la chronologie datée")} <span>→</span>
              </Link>
              <Link href={frHref("/applications/navigation")} className="textlink">
                {fr("La navigation, notre première application")} <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Prose>
    </main>
  );
}
