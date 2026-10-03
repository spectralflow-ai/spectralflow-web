// fr-source: app/applications/page.tsx sha256:31b40026f6063da4
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import VerticalIcon from "../../components/VerticalIcon";
import VerticalGlyph from "../../components/VerticalGlyph";
import { Prose, Cinema, Plate, Eyebrow, H2, Lead, Body, PageHeader } from "../../components/kit";
import {
  ADJACENT_VERTICALS,
  FLAGSHIP_VERTICAL,
  VERTICALS_ORDERED,
  verticalHref,
} from "../../lib/fr/verticals";
import { BRAND, SITE_URL, SHARE_IMAGE } from "../../lib/fr/facts";
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

/** The link goes to a page in English. */
const hrefLangOf = (href: string) => (href.startsWith("/fr") ? undefined : "en");

/** "Explore …" needs each application's article in French; keyed by slug. */
const EXPLORE_FR: Record<string, string> = {
  "life-sciences": "les sciences du vivant",
  semiconductors: "les semi-conducteurs et l'industrie",
  "quantum-computing": "l'informatique quantique",
};

/* ----- Metadata ------------------------------------------------------ */

const EN_PATH = "/applications";
const PAGE_PATH = "/fr/applications";
const SHARE_TITLE = `Applications · ${BRAND}`;
const DESCRIPTION = fr(
  "Capteurs quantiques à diamant, la navigation d'abord. Puis les sciences du vivant, les semi-conducteurs et l'informatique quantique, sur le même diamant, chacune avec son état d'avancement."
);

export const metadata: Metadata = {
  title: "Applications",
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

/** Navigation situations. */
const SITUATIONS = ["Levés et prospection", "En mer", "Dans les airs", "Dans l'espace"];

/** What every application shares. */
const SHARED = [
  {
    h: "Le diamant",
    p: "Le matériau fixe la limite de chaque instrument qui en est fait. Nous y travaillons avec des laboratoires de recherche en croissance et nanofabrication du diamant.",
  },
  {
    h: "La lecture",
    p: "Le spin NV se lit à la lumière : du vert en entrée, du rouge en sortie, et des micro-ondes pour trouver la résonance. La même lecture sert toutes les applications.",
  },
  {
    h: "Le logiciel",
    p: "Chaque valeur vient avec son incertitude, et nos conceptions sont éprouvées en simulation avant d'être fabriquées.",
  },
];

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}${frHref("/")}` },
    { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

const ITEMLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Applications",
  itemListElement: VERTICALS_ORDERED.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: fr(v.navLabel),
    url: `${SITE_URL}${verticalHref(v.slug)}`,
  })),
};

export default function Applications() {
  const nav = FLAGSHIP_VERTICAL;
  const navHref = verticalHref(nav.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }}
      />

      <PageHeader
        eyebrow="Applications"
        title={
          <>
            Une plateforme diamant.
            <br className="hidden md:block" /> {fr("La navigation d'abord.")}
          </>
        }
        intro={fr(
          "Les centres azote-lacune du diamant mesurent les champs magnétiques à température ambiante. Nous développons cette capacité d'abord pour la navigation. Le même diamant, la même lecture et le même logiciel s'étendent à d'autres domaines, et chacun, ci-dessous, indique où nous en sommes."
        )}
      />

      {/* First application: navigation */}
      <Cinema id="navigation">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <VerticalIcon slug={nav.slug} />
              <p className="eyebrow">{fr(nav.horizon.label)}</p>
            </div>
            <H2 className="max-w-xl mb-6">{fr(nav.title)}</H2>
            <Lead className="max-w-xl mb-8">{fr(nav.intro)}</Lead>

            <p className="figure-label mb-3">Situations</p>
            <ul className="flex flex-wrap gap-2 mb-8" aria-label="Situations de navigation">
              {SITUATIONS.map((s) => (
                <li key={s}>
                  <Link
                    href={`${navHref}#situations`}
                    className="pill inline-block hover:underline underline-offset-4"
                  >
                    {fr(s)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hairline pt-5 mb-9 max-w-xl">
              <p className="figure-label mb-2">{fr("Où nous en sommes")}</p>
              <Body>{fr(nav.horizon.note)}</Body>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={navHref} className="btn-primary">
                {fr("Découvrir la navigation")} <span aria-hidden>→</span>
              </Link>
              <Link href="/instrument" hrefLang="en" className="btn-ghost">
                {fr("Piloter une mission (en anglais)")}
              </Link>
            </div>
            <Link href={`${navHref}#problem`} className="textlink mt-6">
              {fr("Voir la carte des interférences du jour")} <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Plate caption={fr(nav.glyphCaption)}>
              <VerticalGlyph slug={nav.slug} lang="fr" />
            </Plate>
          </Reveal>
        </div>
      </Cinema>

      {/* One diamond platform: the other applications */}
      <Prose id="platform">
        <Reveal>
          <Eyebrow>{fr("Au-delà de la navigation")}</Eyebrow>
          <H2 className="max-w-3xl mb-6">{fr("Une plateforme diamant, d'autres mesures.")}</H2>
          <Lead className="max-w-3xl mb-14">
            {fr(
              "Les centres NV réagissent aux champs magnétiques et aux spins des atomes voisins. Le diamant, la lecture optique et le logiciel que nous développons se transposent aux instruments scientifiques et au contrôle non destructif, des marchés qui viennent après la navigation. L'information quantique est un sujet de recherche à plus long terme."
            )}
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mb-16">
          {SHARED.map((s, i) => (
            <Reveal key={s.h} delay={i * 80}>
              <div className="hairline pt-6 h-full">
                <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {fr(s.h)}
                </h3>
                <Body>{fr(s.p)}</Body>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADJACENT_VERTICALS.map((v, i) => {
            const href = verticalHref(v.slug);
            return (
              <Reveal key={v.slug} delay={i * 80} className="h-full">
                <Link
                  href={href}
                  hrefLang={hrefLangOf(href)}
                  className="card p-6 md:p-7 h-full flex flex-col gap-3 group"
                >
                  <div className="flex items-center gap-2.5">
                    <VerticalIcon slug={v.slug} />
                    <p className="eyebrow">{fr(v.navLabel)}</p>
                  </div>
                  <h3
                    className="display text-xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {fr(v.title)}
                  </h3>
                  <Body>{fr(v.tagline)}</Body>
                  <div className="hairline pt-4 mt-auto">
                    <p className="figure-label mb-1.5">{fr(v.horizon.label)}</p>
                    <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                      {fr(v.horizon.note)}
                    </p>
                  </div>
                  <span className="textlink pt-1" style={{ color: "var(--text-primary)" }}>
                    {fr(`Découvrir ${EXPLORE_FR[v.slug] ?? v.navLabel.toLowerCase()}`)}{" "}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Prose>

      {/* Call to action */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">{fr("Vous travaillez sur l'une de ces mesures ?")}</H2>
          <Lead className="max-w-2xl mb-9">
            {fr(
              "Nous cherchons des partenaires de programme en navigation, et des laboratoires de recherche intéressés par les autres applications. Dites-nous ce que vous avez besoin de mesurer."
            )}
          </Lead>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={frHref("/contact")} className="btn-primary">
              {fr("Nous écrire")} <span aria-hidden>→</span>
            </Link>
            <Link href={frHref("/technology")} className="textlink">
              {fr("Comment fonctionne le capteur")} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
