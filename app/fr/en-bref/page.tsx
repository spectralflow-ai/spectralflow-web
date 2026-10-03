import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import LogoMark from "../../components/LogoMark";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import DuotonePhoto from "../../components/DuotonePhoto";
import GnssMap from "../../components/GnssMap";
import { Prose, Cinema, Eyebrow, H2, Lead, Body } from "../../components/kit";
import { CONTACT_EMAIL } from "../../lib/contact";
import {
  ADDRESS,
  ADDRESS_LINES,
  BRAND,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  PATENT_APPLICATIONS,
  RCS,
  REGISTERED,
  SITE_URL,
  getSource,
  type ContextSource, SHARE_IMAGE } from "../../lib/facts";
import {
  SUPPORTER_KINDS,
  supportersByKind,
  type Supporter,
  type SupporterKind,
} from "../../lib/supporters";
import { todayISO, upcomingEvents, type EventRole, type SiteEvent } from "../../lib/events";

/** Rebuilt daily so that past events leave the list. */
export const revalidate = 86400;

/**
 * /fr : Spectral Flow en bref. One page in French for French readers;
 * the rest of the site is in English. Names, dates and counts come from
 * the same sources as the English pages, formatted here in French.
 */

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

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const jour = (d: number) => (d === 1 ? "1er" : String(d));

/** "2026-04-02" becomes "2 avril 2026". */
function dateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${jour(d)} ${MOIS[m - 1]} ${y}`;
}

/** "October 2026" becomes "octobre 2026"; anything else is returned as is. */
function monthYearFr(label: string): string {
  const [m, y] = label.split(" ");
  const i = MONTHS_EN.indexOf(m);
  return i >= 0 && y ? `${MOIS[i]} ${y}` : label;
}

/** "October 2026" becomes "2026-10", for a <time> element. */
function monthYearIso(label: string): string | undefined {
  const [m, y] = label.split(" ");
  const i = MONTHS_EN.indexOf(m);
  return i >= 0 && y ? `${y}-${String(i + 1).padStart(2, "0")}` : undefined;
}

/** Event dates in French: "19 novembre 2026", "8 et 9 octobre 2026". */
function eventDatesFr(e: SiteEvent): string {
  if (e.start === e.end) return dateFr(e.start);
  const [y1, m1, d1] = e.start.split("-").map(Number);
  const [y2, m2, d2] = e.end.split("-").map(Number);
  if (y1 === y2 && m1 === m2) {
    return d2 === d1 + 1
      ? `${jour(d1)} et ${d2} ${MOIS[m2 - 1]} ${y2}`
      : `du ${jour(d1)} au ${d2} ${MOIS[m2 - 1]} ${y2}`;
  }
  return `du ${dateFr(e.start)} au ${dateFr(e.end)}`;
}

const AS_OF_FR = monthYearFr(FACTS_AS_OF);
const REGISTERED_FR = dateFr(REGISTERED);

/* ----- Metadata ------------------------------------------------------ */

const PAGE_PATH = "/fr/en-bref";
const TITLE = `${BRAND} en bref · Capteurs quantiques à diamant`;
const DESCRIPTION = fr(
  "Spectral Flow conçoit des capteurs quantiques à diamant. D'abord, une navigation sans GPS qui rend chaque position avec sa borne d'erreur."
);

/**
 * No hreflang pair: this page summarises the site in French, it is not
 * a translation of any English page.
 */
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    images: [SHARE_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_PATH,
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

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}${PAGE_PATH}#page`,
  url: `${SITE_URL}${PAGE_PATH}`,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#org` },
  mainEntity: { "@id": `${SITE_URL}/#org` },
};

/* ----- Content ------------------------------------------------------- */

const SECTIONS = [
  { id: "qui-nous-sommes", label: "Qui nous sommes" },
  { id: "le-probleme", label: "Le problème" },
  { id: "ce-que-nous-faisons", label: "Ce que nous faisons" },
  { id: "le-principe", label: "Le principe" },
  { id: "ou-nous-en-sommes", label: "Où nous en sommes" },
  { id: "reconnaissance", label: "Reconnaissance et adhésions" },
  { id: "contact", label: "Contact" },
];

/** Counts written out in words in running text, as French style wants. */
const EN_LETTRES: Record<number, string> = { 16: "seize", 17: "dix-sept" };
const enLettres = (n: number) => EN_LETTRES[n] ?? String(n);

/** Split of the patent count, as in PATENT_DETAIL; printed only while it adds up. */
const PATENTS_UK = 16;
const PATENTS_FRANCE = 1;
const PATENT_SPLIT =
  PATENTS_UK + PATENTS_FRANCE === PATENT_APPLICATIONS
    ? ` : ${enLettres(PATENTS_UK)} demandes provisoires au Royaume-Uni et une en France`
    : "";
const PATENTS_SENTENCE = `${cap(enLettres(PATENT_APPLICATIONS))} demandes de brevet déposées en 2026${PATENT_SPLIT}.`;

const KEY_FACTS = [
  { k: "Société", v: `${LEGAL_NAME}, immatriculée le ${REGISTERED_FR}` },
  { k: "Siège", v: ADDRESS.locality },
  { k: "Première application", v: "La navigation sans GPS" },
  { k: "Propriété intellectuelle", v: `${PATENT_APPLICATIONS} demandes de brevet déposées en 2026` },
  { k: "Stade", v: "Prototype mobile conçu, assemblage à financer" },
];

const PROBLEM_POINTS = [
  {
    t: "Brouillé ou leurré",
    d: "Le brouillage noie le signal des satellites. Le leurrage le remplace par un faux signal, qui peut paraître parfaitement sain.",
  },
  {
    t: "La centrale inertielle dérive",
    d: "Privé de satellites, le véhicule se replie sur sa centrale inertielle, dont l'erreur grandit avec le temps, sans plus rien pour la corriger.",
  },
  {
    t: "Aucune mesure de l'erreur",
    d: "Sous leurrage, le récepteur peut afficher une position fausse sans alerte. La centrale estime sa propre dérive, mais aucune mesure extérieure ne vient la vérifier.",
  },
];

/** Third-party context figures, in French, keyed to the sources in facts.ts. */
const FIGURES = [
  {
    id: "iata-2025-safety-report",
    value: "+193 %",
    text: "de cas de leurrage GPS signalés en 2025 par rapport à 2023. Les cas de brouillage signalés ont augmenté de 67 %.",
    date: "9 mars 2026",
  },
  {
    id: "opsgroup-2024",
    value: "1 500",
    text: "vols leurrés par jour en août 2024, contre environ 300 en janvier.",
    date: "6 septembre 2024",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Mesurer",
    d: "Le capteur à diamant lit le champ magnétique de la Terre sous la forme d'un vecteur complet, à température ambiante.",
  },
  {
    n: "02",
    t: "Rejeter",
    d: "Le véhicule porte son propre champ magnétique : moteurs, courants, acier. L'instrument le rejette à bord.",
  },
  {
    n: "03",
    t: "Recaler",
    d: "La mesure ainsi nettoyée est comparée à une carte des anomalies magnétiques. Ce recalage corrige la dérive de la centrale inertielle.",
  },
  {
    n: "04",
    t: "Borner",
    d: "Chaque position vient avec sa borne d'erreur. Entre deux recalages, la centrale porte la position et la borne s'élargit.",
  },
];

const POINTS = [
  {
    t: "Il complète la centrale inertielle",
    d: "Il ne la remplace pas. La centrale donne une estimation continue ; chaque recalage magnétique ramène sa dérive.",
  },
  {
    t: "Passif",
    d: "Il lit le champ propre de la Terre et n'a besoin d'aucun signal extérieur. Une source magnétique placée à proximité peut perturber un magnétomètre : l'instrument est conçu pour le détecter et le dire.",
  },
  {
    t: "Une borne déclarée",
    d: "La borne est déclarée par l'instrument lui-même. La certification viendra avec un programme, sur la plateforme qui le porte.",
  },
];

const OFFERS = [
  {
    t: "Des programmes",
    d: "Nous proposons aux intégrateurs de navigation et aux maîtres d'œuvre de développer l'instrument pour une plateforme et une mission données, dans le cadre de leurs programmes.",
  },
  {
    t: "Des études de faisabilité et d'intégration",
    d: "Nous étudions, en simulation et avant tout matériel, si la navigation magnétique peut fonctionner sur votre plateforme, au-dessus de votre zone et pour votre profil de mission.",
  },
  {
    t: "Des sessions de simulation expertes",
    d: "Votre mission jouée de bout en bout dans notre simulation. Celle-ci est encore en cours de calibration : elle sert à comparer des options, pas à promettre un chiffre.",
  },
];

const PRINCIPLE = [
  {
    n: "01",
    t: "La Terre a une empreinte",
    d: "Les roches magnétiques du sous-sol déforment le champ terrestre, un peu différemment partout. Une partie de ce relief est cartographiée, souvent depuis des décennies.",
  },
  {
    n: "02",
    t: "Une résonance, lue à la lumière",
    d: "Le centre NV, un défaut du diamant, porte un spin qui résonne dans un champ magnétique, comme dans une IRM. Éclairé en vert, il brille en rouge, et cette lueur baisse à des fréquences micro-ondes que le champ déplace. La position de ces creux donne le champ.",
  },
  {
    n: "03",
    t: "Un spin qui garde la cadence",
    d: "Comme une toupie, le spin tourne autour du champ, à un rythme que le champ impose. Garder cette cadence s'appelle la cohérence : plus elle dure, plus la mesure est fine.",
  },
];

const WHY_DIAMOND = [
  "Température ambiante, sans refroidissement ni consommable.",
  "Un cristal solide, qui tient sur le véhicule.",
  "Quatre axes cristallins : le vecteur vient du réseau.",
];

/* ----- Where we stand ------------------------------------------------ */

type Status = "done" | "now" | "next";

type Milestone = {
  status: Status;
  when: string;
  dateTime?: string;
  title: ReactNode;
  body?: string;
  link?: { href: string; label: string };
};

const MILESTONES: Milestone[] = [
  {
    status: "done",
    when: "Avril 2026",
    dateTime: "2026-04",
    title: fr(`${LEGAL_NAME} immatriculée`),
  },
  {
    status: "done",
    when: "Juin 2026",
    dateTime: "2026-06",
    title: "Simulation de navigation mise en service",
    body: "Notre capteur, tel que conçu, effectue des missions complètes en simulation, du relief magnétique jusqu'au filtre de navigation. La simulation reste à calibrer sur le matériel, et tous les résultats sont issus du modèle.",
  },
  {
    status: "done",
    when: "Juin 2026",
    dateTime: "2026-06",
    title: (
      <>
        Membre de <span lang="en">NVIDIA Inception</span> et du programme{" "}
        <span lang="en">Google for Startups Cloud</span>
      </>
    ),
  },
  {
    status: "done",
    when: "Juillet 2026",
    dateTime: "2026-07",
    title: "Démonstrations de mission ouvertes à tous",
    body: "Chacun peut lancer une mission dans son navigateur, sans créer de compte.",
    link: { href: "/instrument", label: "Essayer une mission" },
  },
  {
    status: "done",
    when: "Juillet 2026",
    dateTime: "2026-07",
    title: "Qualifiée Deeptech par Bpifrance",
  },
  {
    status: "done",
    when: "Septembre 2026",
    dateTime: "2026-09",
    title: "Dix-septième demande de brevet, déposée en France",
    body: `${PATENTS_SENTENCE} Leur contenu n'est pas public.`,
  },
  {
    status: "now",
    when: cap(AS_OF_FR),
    dateTime: monthYearIso(FACTS_AS_OF),
    title: "Premier prototype mobile conçu",
    body: "Son assemblage commence dès que son financement est confirmé.",
  },
  {
    status: "next",
    when: "Ensuite",
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

/* ----- Recognition and memberships ----------------------------------- */

const KIND_FR: Record<SupporterKind, string> = {
  Recognised: "Qualification",
  "Pre-incubated at": "Pré-incubation",
  "Member of": "Adhésions",
  "Selected for": "Sélection",
};

/** French wording of each entry in supporters.ts, keyed by name. */
const STATEMENT_FR: Record<string, ReactNode> = {
  Bpifrance: "Qualifiée Deeptech par Bpifrance",
  "Incubateur Provence Côte d'Azur": "Pré-incubée à l'Incubateur Provence Côte d'Azur",
  QuIC: (
    <>
      Membre de QuIC, le consortium européen de l&apos;industrie quantique (<span lang="en">European Quantum Industry Consortium</span>)
    </>
  ),
  "NVIDIA Inception": (
    <>
      Membre de <span lang="en">NVIDIA Inception</span>
    </>
  ),
  "Google for Startups Cloud Program": (
    <>
      Membre du programme <span lang="en">Google for Startups Cloud</span>
    </>
  ),
  "Tech Tour Quantum & Defence 2026": (
    <>
      Sélectionnée pour présenter son projet au{" "}
      <span lang="en">Tech Tour Quantum &amp; Defence 2026</span>, à Berlin
    </>
  ),
};

const LOGO_ALT_FR: Record<string, string> = {
  "NVIDIA Inception": "Membre de NVIDIA Inception",
};

function sinceFr(s: Supporter): string | null {
  if (!s.since) return null;
  const m = monthYearFr(s.since);
  return s.kind === "Selected for" ? cap(m) : `Depuis ${m}`;
}

/* ----- Events -------------------------------------------------------- */

const ROLE_FR: Record<EventRole, string> = {
  Pitching: "Nous y présentons Spectral Flow.",
  Attending: "Nous y serons.",
  Speaking: "Nous y intervenons.",
  Exhibiting: "Nous y exposons.",
};

const COUNTRY_FR: Record<string, string> = {
  Germany: "Allemagne",
  France: "France",
};

/** Event names already in French; the others are marked as English. */
const EVENT_NAME_FR = new Set(["rencontres-du-spatial-region-sud-2026"]);

/* ----- Small parts --------------------------------------------------- */

function Point({ t, d }: { t: string; d: string }) {
  return (
    <div className="hairline pt-6 h-full">
      <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
        {fr(t)}
      </h3>
      <Body>{fr(d)}</Body>
    </div>
  );
}

function SourceFr({ source, date }: { source: ContextSource; date: string }) {
  return (
    <p className="source-note mt-4">
      {fr(`Source : ${source.org}, ${date}, `)}
      <a href={source.href} target="_blank" rel="noopener noreferrer" hrefLang="en">
        {`«${NBSP}`}
        <span lang="en">{source.title}</span>
        {`${NBSP}»`}
        <span aria-hidden> ↗</span>
        <span className="sr-only">{fr(" (en anglais, s'ouvre dans un nouvel onglet)")}</span>
      </a>
      .
    </p>
  );
}

/* ----- Page ---------------------------------------------------------- */

export default function EnBref() {
  const figures = FIGURES.map((f) => ({ ...f, source: getSource(f.id) })).filter(
    (f): f is (typeof FIGURES)[number] & { source: ContextSource } => !!f.source
  );
  const events = upcomingEvents(todayISO());

  return (
    <main lang="fr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />

      {/* ============================ HERO ============================ */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-14 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-rise">
                <Eyebrow>{fr(`${BRAND} en bref`)}</Eyebrow>
                <h1
                  className="display text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem] font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Capteurs quantiques à diamant.
                  <span
                    className="block mt-2 font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {fr("D'abord, une navigation fiable sans GPS.")}
                  </span>
                </h1>
              </div>
              <div className="hero-rise" style={{ animationDelay: "140ms" }}>
                <Lead className="max-w-xl mt-7">
                  {fr(
                    "Nous lisons le champ magnétique de la Terre avec des défauts atomiques du diamant, et nous rendons une position avec une borne d'erreur garantie."
                  )}
                </Lead>
                <Body className="max-w-xl mt-4">
                  {fr(
                    `${BRAND} est une société française, installée à ${ADDRESS.locality}. Cette page résume qui nous sommes, le problème que nous traitons et où nous en sommes. Le reste du site est en anglais.`
                  )}
                </Body>
              </div>
              <div
                className="hero-rise flex flex-wrap gap-3 mt-9"
                style={{ animationDelay: "260ms" }}
              >
                <a href="#contact" className="btn-primary">
                  {fr("Nous écrire")} <span aria-hidden>→</span>
                </a>
                <Link href="/instrument" hrefLang="en" className="btn-ghost">
                  Essayer une mission
                  <span className="sr-only">{fr(" (en anglais)")}</span>
                </Link>
              </div>
            </div>

            <figure className="hero-rise" style={{ animationDelay: "200ms" }}>
              <div
                className="relative overflow-hidden rounded-[var(--radius)]"
                style={{
                  aspectRatio: "4/3",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                }}
              >
                <Image
                  src="/img/v3/relief.webp"
                  alt={fr("Courbes de niveau tracées à l'encre, traversées par un trait bleu.")}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "60% 55%" }}
                />
              </div>
              <figcaption className="figure-label is-plain mt-3">
                {fr("Illustration : un relief magnétique, et une route qui le traverse.")}
              </figcaption>
            </figure>
          </div>

          {/* Key facts */}
          <div className="hairline mt-14 pt-8">
            <p className="figure-label is-plain mb-5">{fr(`Situation en ${AS_OF_FR}`)}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6">
              {KEY_FACTS.map((f) => (
                <div key={f.k}>
                  <dt className="figure-label">{fr(f.k)}</dt>
                  <dd
                    className="text-[15px] leading-6 mt-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {fr(f.v)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

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

      {/* ======================= QUI NOUS SOMMES ======================= */}
      <Prose id="qui-nous-sommes">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Qui nous sommes</Eyebrow>
            <H2 className="mb-6">
              {fr("Partis du capteur, nous avons cherché où il valait le plus : la navigation.")}
            </H2>
            <Lead>
              {fr(
                `${BRAND} conçoit des capteurs quantiques fondés sur les centres NV du diamant. Un centre NV est un défaut du cristal : un atome d'azote placé à côté d'une lacune, c'est-à-dire d'un atome de carbone manquant. On l'interroge avec de la lumière. Il fonctionne à température ambiante.`
              )}
            </Lead>
          </Reveal>
          <Reveal delay={100}>
            <Body className="mb-4">
              {fr(
                "Nous commençons par la navigation : un instrument conçu pour lire le champ magnétique de la Terre et rendre chaque position avec sa borne d'erreur. Le même cœur de mesure peut servir d'autres instruments, qui suivront chacun à son rythme."
              )}
            </Body>
            <Body>
              {fr(
                "Nous concevons la tête de mesure, l'électronique et le logiciel ; nous achetons la matière et les composants ; nous confions la fabrication à des partenaires spécialisés."
              )}
            </Body>
          </Reveal>
        </div>

        {/* Founder */}
        <Reveal>
          <div className="hairline mt-14 pt-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
            <div>
              <DuotonePhoto
                src="/founder-alexandre-papa.jpg"
                alt={`${FOUNDER.name}, fondateur de ${BRAND}`}
                width={170}
                height={170}
                sizes="176px"
                className="w-40 md:w-44"
              />
              <h3 className="font-semibold mt-4" style={{ color: "var(--text-primary)" }}>
                {FOUNDER.name}
              </h3>
              <p className="figure-label is-plain mt-1">{fr("Fondateur et président")}</p>
            </div>
            <div className="max-w-2xl">
              <Body className="mb-4">
                {fr(
                  `${FOUNDER.name} a fondé ${BRAND} à ${ADDRESS.locality}. Il a passé vingt-cinq ans dans la finance et les opérations : adjoint au directeur financier d'un groupe de 11 000 personnes, puis directeur financier de transition de sociétés plus petites. Ce parcours lui a appris que les problèmes les plus difficiles se logent aux frontières entre disciplines.`
                )}
              </Body>
              <Body className="mb-4">
                {fr(
                  `En novembre 2025, il lit ses premiers articles sur les capteurs quantiques à diamant. Il ne se demande pas ce que ces capteurs savent faire, mais où ils valent le plus. La réponse est la navigation. ${LEGAL_NAME} est immatriculée le ${REGISTERED_FR}.`
                )}
              </Body>
              <Body>
                {fr(
                  "Sa règle vient de l'histoire de l'aviation : pas de Concorde. Chaque instrument doit aussi avoir un sens économique."
                )}
              </Body>
            </div>
          </div>
        </Reveal>

        {/* Research laboratories */}
        <Reveal>
          <div className="hairline mt-10 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">Laboratoires de recherche</h3>
            <Body className="max-w-2xl">
              {fr(
                "Nous travaillons avec les meilleurs laboratoires de recherche européens, en croissance et nanofabrication du diamant, en photonique et en physique du spin. Leurs noms sont communiqués sur demande."
              )}
            </Body>
          </div>
        </Reveal>
      </Prose>

      {/* ========================= LE PROBLÈME ========================= */}
      <Cinema id="le-probleme">
        <Reveal>
          <Eyebrow>{fr("Le problème")}</Eyebrow>
          <H2 className="max-w-4xl mb-6">
            {fr("Là où le GPS lâche, personne ne sait dire de combien la position est fausse.")}
          </H2>
          <Lead className="max-w-3xl">
            {fr(
              "Le brouillage et le leurrage du GPS et des autres systèmes de positionnement par satellite (GNSS) sont devenus quotidiens dans plusieurs régions du monde. Le besoin est le même pour les levés et la prospection, en mer, dans les airs et dans l'espace : partout où le positionnement par satellite manque ou n'est pas digne de confiance."
            )}
          </Lead>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mt-12">
          {PROBLEM_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>

        {figures.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {figures.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 100} className="card p-7 md:p-8">
                <p
                  className="display text-5xl md:text-6xl tabular-nums"
                  style={{ color: "var(--text-primary)" }}
                >
                  {fr(f.value)}
                </p>
                <p className="text-[15px] leading-7 mt-3" style={{ color: "var(--text-secondary)" }}>
                  {fr(f.text)}
                </p>
                <SourceFr source={f.source} date={f.date} />
              </Reveal>
            ))}
          </ul>
        )}

        {/* Today's interference map, live */}
        <Reveal>
          <div className="hairline mt-14 pt-10 max-w-3xl">
            <h3 className="font-semibold text-lg mb-2.5" style={{ color: "var(--text-primary)" }}>
              {fr("Les interférences du jour")}
            </h3>
            <Body>
              {fr(
                "La carte ci-dessous est établie chaque jour par GPSJAM, un site tiers en anglais, à partir des données de précision de navigation que transmettent les avions. Elle se charge d'elle-même quand vous approchez de cette section."
              )}
            </Body>
          </div>
        </Reveal>
        <Reveal delay={100}>
          {/* The component prints the argument sentence itself, and hides it
              when the drawing replaces the live map. */}
          <GnssMap className="mt-8" locale="fr" />
        </Reveal>
      </Cinema>

      {/* ===================== CE QUE NOUS FAISONS ===================== */}
      <Prose id="ce-que-nous-faisons">
        <Reveal>
          <Eyebrow>Ce que nous faisons</Eyebrow>
          <H2 className="max-w-4xl mb-6">
            {fr("Non pas la précision d'un bon jour : l'erreur possible, à l'instant.")}
          </H2>
          <Lead className="max-w-3xl">
            {fr(
              "Notre instrument est conçu pour lire le champ magnétique de la Terre, le comparer à une carte et rendre chaque position avec sa borne d'erreur."
            )}
          </Lead>
        </Reveal>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="card p-6 h-full">
              <p className="figure-label is-plain" aria-hidden>
                {s.n}
              </p>
              <h3 className="font-semibold text-lg mt-3 mb-2" style={{ color: "var(--text-primary)" }}>
                {fr(s.t)}
              </h3>
              <Body>{fr(s.d)}</Body>
            </Reveal>
          ))}
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mt-14">
          {POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Point t={p.t} d={p.d} />
            </Reveal>
          ))}
        </div>

        {/* What we offer */}
        <Reveal>
          <div className="hairline mt-16 pt-10">
            <p className="eyebrow mb-3">Ce que nous proposons</p>
            <h3
              className="display text-2xl md:text-3xl font-semibold tracking-tight max-w-3xl mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              {fr("D'abord un marché de programmes, ensuite des unités.")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {OFFERS.map((o) => (
                <div key={o.t}>
                  <h4 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {fr(o.t)}
                  </h4>
                  <Body>{fr(o.d)}</Body>
                </div>
              ))}
            </div>
            <p className="mt-9">
              <Link href="/fr/applications/navigation" className="textlink">
                {fr("La navigation en détail")} <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </Reveal>
      </Prose>

      {/* ========================== LE PRINCIPE ======================== */}
      <Prose id="le-principe">
        <Reveal>
          <Eyebrow>Le principe</Eyebrow>
          <H2 className="max-w-3xl mb-6">
            {fr("Lire le champ magnétique avec un défaut du diamant, en trois temps.")}
          </H2>
        </Reveal>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {PRINCIPLE.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 80} className="plate p-7 h-full">
              <p className="figure-label is-plain" aria-hidden>
                {p.n}
              </p>
              <h3 className="font-semibold text-lg mt-3 mb-2" style={{ color: "var(--text-primary)" }}>
                {fr(p.t)}
              </h3>
              <Body>{fr(p.d)}</Body>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="hairline mt-14 pt-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-3 md:gap-12">
            <h3 className="eyebrow">Pourquoi le diamant</h3>
            <div>
              <ul className="flex flex-col gap-2">
                {WHY_DIAMOND.map((w) => (
                  <li key={w} className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                    {fr(w)}
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <Link href="/fr/technology#principle" className="textlink">
                  {fr("Le principe en détail")} <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
          </div>
        </Reveal>
      </Prose>

      {/* ====================== OÙ NOUS EN SOMMES ====================== */}
      <Prose id="ou-nous-en-sommes">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>{fr("Où nous en sommes")}</Eyebrow>
            <H2 className="mb-6">{fr("Ce qui est fait, et ce qui vient.")}</H2>
            <Lead className="mb-5">
              {fr(
                "Notre premier prototype mobile est conçu ; son assemblage commence dès que son financement est confirmé."
              )}
            </Lead>
            <Body className="mb-6">
              {fr(
                "Toute la chaîne de navigation est jouée de bout en bout en simulation, et chaque résultat que nous montrons est issu du modèle."
              )}
            </Body>
            <p className="figure-label is-plain">{fr(`Situation en ${AS_OF_FR}`)}</p>
          </Reveal>

          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px"
              style={{ background: "var(--border-strong)" }}
            />
            <ol className="relative" aria-label={fr(`Étapes, situation en ${AS_OF_FR}`)}>
              {MILESTONES.map((m, i) => (
                <Reveal
                  as="li"
                  key={`${m.when}-${i}`}
                  delay={i * 50}
                  className="relative pl-9 pb-9 last:pb-0"
                >
                  <Dot status={m.status} />
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="figure-label is-plain">
                      {m.dateTime ? <time dateTime={m.dateTime}>{m.when}</time> : m.when}
                    </span>
                    {m.status === "now" ? (
                      <span className="figure-label" style={{ color: "var(--accent)" }}>
                        {STATUS_LABEL.now}
                      </span>
                    ) : (
                      <span className="sr-only">{STATUS_LABEL[m.status]}</span>
                    )}
                  </p>
                  <h3
                    className="font-semibold text-[17px] leading-snug mt-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {typeof m.title === "string" ? fr(m.title) : m.title}
                  </h3>
                  {m.body && <Body className="mt-1.5 max-w-xl">{fr(m.body)}</Body>}
                  {m.link && (
                    <Link href={m.link.href} hrefLang="en" className="textlink mt-2">
                      {fr(m.link.label)} <span aria-hidden>→</span>
                      <span className="sr-only">{fr(" (en anglais)")}</span>
                    </Link>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Prose>

      {/* ================ RECONNAISSANCE ET ADHÉSIONS ================== */}
      <Prose id="reconnaissance">
        <Reveal>
          <H2 className="max-w-3xl mb-10">{fr("Reconnaissance et adhésions.")}</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SUPPORTER_KINDS.map((kind, i) => {
            const items = supportersByKind(kind);
            if (items.length === 0) return null;
            return (
              <Reveal key={kind} delay={i * 80} className="h-full">
                <div className="card p-6 md:p-7 h-full">
                  <h3 className="eyebrow mb-5">{fr(KIND_FR[kind])}</h3>
                  <ul className="flex flex-col gap-6">
                    {items.map((s) => {
                      const statement = STATEMENT_FR[s.name] ?? <span lang="en">{s.statement}</span>;
                      return (
                        <li key={s.name}>
                          {s.logo && (
                            <div className="mb-3">
                              <LogoMark
                                logo={{ ...s.logo, alt: LOGO_ALT_FR[s.name] ?? s.logo.alt }}
                                height={40}
                                maxWidth={170}
                              />
                            </div>
                          )}
                          <p
                            className="text-[15px] leading-6 font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {s.href ? (
                              <a
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {statement}
                              </a>
                            ) : (
                              statement
                            )}
                          </p>
                          {sinceFr(s) && <p className="figure-label is-plain mt-1">{fr(sinceFr(s) as string)}</p>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Prose>

      {/* =========================== CONTACT =========================== */}
      <Cinema id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <H2 className="mb-6">{fr("Nous cherchons des partenaires de programme.")}</H2>
            <Lead className="max-w-xl mb-9">
              {fr(
                "Intégrateurs de navigation, laboratoires de recherche, investisseurs qui apportent un programme : écrivez-nous, en français si vous le souhaitez."
              )}
            </Lead>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                {fr(`Écrire à ${CONTACT_EMAIL}`)}
              </a>
              <Link href="/fr/contact" className="btn-ghost">
                {fr("Formulaire de contact")}
              </Link>
            </div>
            <p className="text-sm leading-6 mt-10" style={{ color: "var(--muted)" }}>
              {fr(`${LEGAL_NAME} · ${RCS} · ${ADDRESS_LINES[0]}, ${ADDRESS_LINES[1]}`)}
              <br />
              <Link
                href="/fr/legal"
                className="underline underline-offset-2 hover:text-[var(--text-primary)]"
              >
                {fr("Mentions légales")}
              </Link>
            </p>
          </Reveal>

          {events.length > 0 && (
            <Reveal delay={100}>
              <p className="eyebrow mb-5">Nous rencontrer</p>
              <ul className="flex flex-col gap-4">
                {events.map((e) => (
                  <li key={e.slug} className="card p-6">
                    <p className="figure-label is-plain">
                      <time dateTime={e.start}>{cap(eventDatesFr(e))}</time>
                    </p>
                    <h3
                      className="font-semibold text-lg mt-2"
                      style={{ color: "var(--text-primary)" }}
                      lang={EVENT_NAME_FR.has(e.slug) ? undefined : "en"}
                    >
                      {e.name}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                      {fr(`${e.city} (${COUNTRY_FR[e.country] ?? e.country}), ${e.venue}`)}
                    </p>
                    <Body className="mt-3">{fr(`${ROLE_FR[e.role]} Retrouvez-nous à ${e.city}.`)}</Body>
                    {e.href && (
                      <a
                        href={e.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        hrefLang="en"
                        className="textlink mt-3"
                      >
                        {fr("Site de l'événement")} <span aria-hidden>↗</span>
                        <span className="sr-only">{fr(" (en anglais, s'ouvre dans un nouvel onglet)")}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Cinema>
    </main>
  );
}
