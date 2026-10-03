// fr-source: app/company/page.tsx sha256:ad75813744f9ecbc
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import Supporters from "../../components/Supporters";
import DuotonePhoto from "../../components/DuotonePhoto";
import LogoMark from "../../components/LogoMark";
import VerticalIcon from "../../components/VerticalIcon";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../../components/kit";
import {
  ADDRESS,
  BRAND,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  PATENT_APPLICATIONS,
  PATENT_DETAIL,
  RCS,
  REGISTERED_LABEL,
  SITE_URL,
  STAGE_LINE, SHARE_IMAGE } from "../../lib/fr/facts";
import { NAV } from "../../lib/nav";
import { getPost } from "../../lib/fr/news";
import {
  RESEARCH_PARTNERS_LINE,
  SUPPORTER_KINDS,
  sinceLine,
  supportersByKind,
} from "../../lib/fr/supporters";
import { VERTICALS_CONTENT } from "../../lib/fr/verticals";
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

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ----- Metadata ------------------------------------------------------ */

const EN_PATH = "/company";
const PAGE_PATH = "/fr/company";
const DESCRIPTION = fr(
  "Spectral Flow conçoit des capteurs quantiques à diamant, la navigation d'abord. Où nous en sommes, le fondateur, soutiens et adhésions, demandes de brevet et carrières."
);

export const metadata: Metadata = {
  title: "Société",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH, languages: languages(EN_PATH) },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Société · ${BRAND}`,
    description: DESCRIPTION,
    url: PAGE_PATH,
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Société · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}${PAGE_PATH}#page`,
  url: `${SITE_URL}${PAGE_PATH}`,
  name: `Société · ${BRAND}`,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#org` },
  mainEntity: { "@id": `${SITE_URL}/#org` },
};

/* ----- On this page ------------------------------------------------- */

const SECTIONS = [
  { id: "vision", label: "Vision" },
  { id: "where-we-stand", label: "Où nous en sommes" },
  { id: "team", label: "Équipe" },
  { id: "support", label: "Soutiens et adhésions" },
  { id: "patents", label: "Brevets" },
  { id: "careers", label: "Carrières" },
];

/* ----- Applications, from the menu ----------------------------------- */

/** One line per application card on this page, keyed by route slug. */
const APPLICATION_LINE: Record<string, string> = {
  navigation: "Un positionnement fiable sans GPS.",
  "life-sciences": "La résonance magnétique sur de petits échantillons, et la signature magnétique des cellules.",
  semiconductors: "Voir les chemins du courant et les défauts enfouis, sans dommage.",
  "quantum-computing": "Le contrôle des spins à température ambiante.",
};

/**
 * The menu gives the order and the addresses; the French label of each
 * application comes from the translated applications data.
 */
const APPLICATIONS = (NAV.find((s) => s.label === "Applications")?.links ?? []).map((l) => {
  const slug = l.href.split("/").pop() ?? "";
  const label = VERTICALS_CONTENT.find((v) => v.slug === slug)?.navLabel ?? l.label;
  return { label, href: frHref(l.href), slug, line: APPLICATION_LINE[slug] };
});

/** The link goes to a page in English. */
const hrefLangOf = (href: string) => (href.startsWith("/fr") || href.startsWith("#") ? undefined : "en");

/* ----- Where we stand ------------------------------------------------ */

type Status = "done" | "now" | "next";

type Milestone = {
  status: Status;
  /** Printed date; omitted for undated steps, which show their status only. */
  when?: string;
  /** Machine-readable month (yyyy-mm), when the step is dated. */
  dateTime?: string;
  title: string;
  body?: string;
  link?: { href: string; label: string };
};

/** Link to a news article, only if the article exists. */
function newsLink(slug: string, label: string): Milestone["link"] {
  return getPost(slug) ? { href: frHref(`/news/${slug}`), label } : undefined;
}

const MILESTONES: Milestone[] = [
  {
    status: "done",
    when: "Avril 2026",
    dateTime: "2026-04",
    title: `${LEGAL_NAME} immatriculée`,
  },
  {
    status: "done",
    when: "Juin 2026",
    dateTime: "2026-06",
    title: "Simulation de navigation mise en service",
    body: "Notre capteur, tel que conçu, effectue des missions complètes en simulation, du relief magnétique jusqu'au filtre de navigation. La simulation reste à calibrer sur le matériel, et tous les résultats sont issus du modèle.",
    link: newsLink("navigation-simulation-online", "À propos de la simulation"),
  },
  {
    status: "done",
    when: "Juin 2026",
    dateTime: "2026-06",
    title: "Membre de NVIDIA Inception et du programme Google for Startups Cloud",
  },
  {
    status: "done",
    when: "Juillet 2026",
    dateTime: "2026-07",
    title: "Missions de démonstration ouvertes à tous",
    body: "Chacun peut piloter une mission dans son navigateur, sans créer de compte.",
    link: { href: "/instrument", label: "Piloter une mission (en anglais)" },
  },
  {
    status: "done",
    when: "Juillet 2026",
    dateTime: "2026-07",
    title: "Qualifiée Deeptech par Bpifrance",
    link: newsLink("qualified-deeptech-bpifrance", "À propos de la qualification"),
  },
  {
    status: "done",
    when: "Septembre 2026",
    dateTime: "2026-09",
    title: "Dix-septième demande de brevet, déposée en France",
    link: { href: "#patents", label: "Demandes de brevet" },
  },
  {
    status: "now",
    when: cap(FACTS_AS_OF),
    /** The same month as FACTS_AS_OF: update both together. */
    dateTime: "2026-10",
    title: "Premier prototype mobile conçu",
    body: "Le capteur, l'électronique qui le pilote et le lit, et la mécanique qui les porte sur un véhicule en mouvement.",
    link: newsLink("first-mobile-prototype-designed", "À propos du prototype"),
  },
  {
    status: "next",
    title: "Assemblage et premiers essais",
    body: "Premières mesures sur le prototype assemblé, puis essais en mouvement.",
  },
];

const STATUS_LABEL: Record<Status, string> = {
  done: "Fait",
  now: "Maintenant",
  next: "À venir",
};

function Dot({ status }: { status: Status }) {
  const base = "absolute left-0 top-[0.3rem] block h-[11px] w-[11px] rounded-full";
  if (status === "now") {
    return (
      <span
        aria-hidden
        className={base}
        style={{ background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }}
      />
    );
  }
  if (status === "next") {
    return (
      <span
        aria-hidden
        className={base}
        style={{ background: "var(--background)", border: "1.5px dashed var(--border-strong)" }}
      />
    );
  }
  return <span aria-hidden className={base} style={{ background: "var(--text-primary)" }} />;
}

/* ----- The company on paper ----------------------------------------- */

const ON_PAPER: { k: string; v: ReactNode }[] = [
  {
    k: "Entité juridique",
    v: `${LEGAL_NAME}, société par actions simplifiée`,
  },
  { k: "Registre du commerce", v: fr(RCS) },
  { k: "Immatriculée le", v: REGISTERED_LABEL },
  { k: "Siège social", v: `${ADDRESS.locality}, ${ADDRESS.country}` },
  { k: "Président", v: FOUNDER.name },
];

/* ----- Support and memberships --------------------------------------- */

/**
 * The labelled blocks of the shared Supporters component (variant "full",
 * no heading, no research line), drawn here from the French data because
 * the component prints the English module. Block labels as on /fr/en-bref.
 */
const KIND_FR: Record<string, string> = {
  Recognised: "Qualification",
  "Pre-incubated at": "Pré-incubation",
  "Member of": "Adhésions",
  "Selected for": "Sélection",
};


export default function Company() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />

      <PageHeader
        eyebrow="Société"
        title={
          <>
            Une plateforme diamant,
            <br className="hidden md:block" /> de nombreux instruments.
          </>
        }
        intro={fr(
          "Spectral Flow conçoit des capteurs quantiques fondés sur les centres azote-lacune du diamant. La navigation vient d'abord : des positions fiables sans GPS, chacune avec sa borne d'erreur."
        )}
      />

      {/* On this page */}
      <nav aria-label="Sur cette page" className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm transition-colors text-[var(--muted)] hover:text-[var(--text-primary)]"
                >
                  {fr(s.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Vision */}
      <Prose id="vision">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Vision</Eyebrow>
            <H2 className="mb-6">{fr("La navigation d'abord, puis d'autres instruments.")}</H2>
            <Lead className="mb-5">
              {fr(
                "Un centre azote-lacune est un défaut du diamant qui se comporte comme une minuscule boussole que l'on lit à la lumière. Il fonctionne à température ambiante, et le même cœur de mesure peut servir des instruments très différents."
              )}
            </Lead>
            <Body className="mb-4">
              {fr(
                "Nous commençons par la navigation : un instrument conçu pour lire le champ magnétique de la Terre et rendre chaque position avec sa borne d'erreur. Le même diamant peut aussi servir les sciences du vivant, les semi-conducteurs et l'industrie, et l'informatique quantique. Ces applications suivent la navigation, chacune à son rythme."
              )}
            </Body>
            <Body>
              {fr(
                "Nous concevons le capteur, son électronique et son logiciel, avec des laboratoires de recherche européens."
              )}
            </Body>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPLICATIONS.map((a, i) => (
              <Reveal as="li" key={a.href} delay={i * 80}>
                <Link
                  href={a.href}
                  hrefLang={hrefLangOf(a.href)}
                  className="card p-6 h-full flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <VerticalIcon slug={a.slug} />
                    {i === 0 && <span className="figure-label is-plain">{fr("Première application")}</span>}
                  </div>
                  <h3
                    className="font-semibold text-lg mt-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {fr(a.label)}
                  </h3>
                  {a.line && <Body>{fr(a.line)}</Body>}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Prose>

      {/* Where we stand */}
      <Prose id="where-we-stand">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>{fr("Où nous en sommes")}</Eyebrow>
            <H2 className="mb-6">{fr("Ce qui est fait, et ce qui vient.")}</H2>
            <Lead className="mb-6">{fr(STAGE_LINE)}</Lead>
            <p className="figure-label is-plain">{fr(`Situation en ${FACTS_AS_OF}`)}</p>
          </Reveal>

          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px"
              style={{ background: "var(--border-strong)" }}
            />
            <ol className="relative" aria-label={fr(`Étapes, situation en ${FACTS_AS_OF}`)}>
              {MILESTONES.map((m, i) => (
                <Reveal
                  as="li"
                  key={`${m.when ?? m.status}-${m.title}`}
                  delay={i * 50}
                  className="relative pl-9 pb-9 last:pb-0"
                >
                  <Dot status={m.status} />
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {m.when && (
                      <span className="figure-label is-plain">
                        {m.dateTime ? <time dateTime={m.dateTime}>{m.when}</time> : m.when}
                      </span>
                    )}
                    {m.status === "done" ? (
                      <span className="sr-only">{STATUS_LABEL.done}</span>
                    ) : (
                      <span
                        className="figure-label"
                        style={{ color: m.status === "now" ? "var(--accent)" : "var(--muted)" }}
                      >
                        {STATUS_LABEL[m.status]}
                      </span>
                    )}
                  </p>
                  <h3
                    className="font-semibold text-[17px] leading-snug mt-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {fr(m.title)}
                  </h3>
                  {m.body && <Body className="mt-1.5 max-w-xl">{fr(m.body)}</Body>}
                  {m.link && (
                    <Link href={m.link.href} hrefLang={hrefLangOf(m.link.href)} className="textlink mt-2">
                      {fr(m.link.label)} <span aria-hidden>→</span>
                    </Link>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Prose>

      {/* Team */}
      <Prose id="team">
        <Reveal>
          <Eyebrow>Équipe</Eyebrow>
          <H2 className="max-w-3xl mb-12">
            {fr("Un fondateur venu de l'entreprise, qui travaille avec des laboratoires de recherche.")}
          </H2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <Reveal>
            <DuotonePhoto
              src="/founder-alexandre-papa.jpg"
              alt={`${FOUNDER.name}, fondateur de ${BRAND}`}
              width={170}
              height={170}
              sizes="160px"
              className="w-40"
            />
            <h3 className="font-semibold mt-4" style={{ color: "var(--text-primary)" }}>
              {FOUNDER.name}
            </h3>
            <p className="figure-label is-plain mt-1">{fr(FOUNDER.role)}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-2xl">
              <Lead className="mb-5">
                {fr(`${FOUNDER.name} a fondé ${BRAND} à ${ADDRESS.locality}, sur la Côte d'Azur.`)}
              </Lead>
              <Body className="mb-4">
                {fr(
                  "Il a passé vingt-cinq ans dans la finance et les opérations : adjoint au directeur financier d'un groupe de 11 000 personnes, puis directeur financier de transition de sociétés plus petites. Ce parcours lui a appris que les problèmes les plus difficiles se logent aux frontières entre disciplines."
                )}
              </Body>
              <Body className="mb-4">
                {fr(
                  "En novembre 2025, il lit ses premiers articles sur les capteurs quantiques à diamant. Il ne se demande pas ce que ces capteurs savent faire, mais où ils valent le plus. La réponse est la navigation."
                )}
              </Body>
              <Body>
                {fr(
                  "Sa règle vient de l'histoire de l'aviation : pas de Concorde. Chaque instrument doit aussi avoir un sens économique."
                )}
              </Body>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="hairline mt-14 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">Laboratoires de recherche</h3>
            <div className="max-w-2xl">
              <Body className="mb-3">{fr(RESEARCH_PARTNERS_LINE)}</Body>
              <Link href={frHref("/contact")} className="textlink">
                {fr("Laboratoires, écrivez-nous")} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="hairline mt-10 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">{fr("Identité de la société")}</h3>
            <div className="max-w-2xl">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                {ON_PAPER.map((r) => (
                  <div key={r.k}>
                    <dt className="figure-label is-plain">{fr(r.k)}</dt>
                    <dd className="text-[15px] leading-7 mt-1" style={{ color: "var(--text-secondary)" }}>
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Body className="mt-7">
                {fr(
                  "L'ensemble des informations sur la société et sur son hébergement figure dans nos"
                )}{" "}
                <Link href={frHref("/legal")} className="underline underline-offset-2 hover:text-[var(--text-primary)]">
                  {fr("mentions légales")}
                </Link>
                .
              </Body>
            </div>
          </div>
        </Reveal>
      </Prose>

      {/* Support and memberships */}
      <Prose id="support">
        <Reveal>
          <Eyebrow>{fr("Soutiens et adhésions")}</Eyebrow>
          <H2 className="max-w-3xl mb-10">{fr("Reconnaissances, adhésions et sélections.")}</H2>
        </Reveal>
        <Reveal delay={80}>
          <Supporters variant="full" heading={null} showResearchLine={false} lang="fr" />
        </Reveal>
      </Prose>

      {/* Patents */}
      <Prose id="patents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Brevets</Eyebrow>
            <H2 className="mb-6">{fr("Brevets en instance.")}</H2>
            <Body className="mb-5 max-w-lg">
              {fr(`${PATENT_DETAIL} Leur contenu n'est pas public.`)}
            </Body>
            <p className="figure-label is-plain">{fr(`Situation en ${FACTS_AS_OF}`)}</p>
          </Reveal>
          <Reveal delay={100}>
            <dl
              className="rounded-[var(--radius)] p-7 md:p-9"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-col-reverse gap-3">
                <dt className="figure-label is-plain">{fr("Demandes de brevet déposées en 2026")}</dt>
                <dd
                  className="display text-5xl md:text-6xl tabular-nums"
                  style={{ color: "var(--text-primary)" }}
                >
                  {PATENT_APPLICATIONS}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Prose>

      {/* Careers */}
      <Prose id="careers">
        <Reveal>
          <Eyebrow>{fr("Carrières")}</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Stages et postes d'ingénieur, à partir de 2027.")}
          </H2>
          <Lead className="max-w-2xl">
            {fr(
              "Nous sommes une petite équipe. En 2027, nous ouvrirons des stages en nanofabrication du diamant et en capteurs quantiques, ainsi que des postes d'ingénieur. Nous accueillons aussi les candidatures spontanées de chercheurs et de postdoctorants dont les travaux sont proches des nôtres : croissance et nanofabrication du diamant, physique du spin, photonique et navigation magnétique."
            )}{" "}
            <Link
              href={frHref("/contact")}
              className="underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-current"
              style={{ color: "var(--accent)" }}
            >
              {fr("Écrivez-nous")}
            </Link>
            .
          </Lead>
        </Reveal>
      </Prose>

      {/* Press */}
      <Prose>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <Eyebrow>Presse</Eyebrow>
              <H2 className="max-w-2xl mb-4">{fr(`Vous écrivez sur ${BRAND} ?`)}</H2>
              <Body className="max-w-xl">
                {fr(
                  "Les faits, le texte de présentation, le logo à télécharger et un contact presse, au même endroit."
                )}
              </Body>
            </div>
            <Link href="/press" hrefLang="en" className="btn-ghost">
              {fr("Ouvrir le dossier de presse")} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
