// fr-source: app/lib/nav.ts sha256:075edc09e6bcff2e
// Traduit à la main (menu court) : corriger l’anglais, puis reporter ici et mettre à jour l’empreinte.
// Les liens vont vers la page française quand elle existe, vers l’anglaise sinon (signalée « en anglais »).

import { LINKEDIN_URL } from "../facts";
import { frHref } from "../i18n";
import type { NavLink, NavSection } from "../nav";

const EN = " En anglais.";

export const NAV: NavSection[] = [
  {
    label: "Navigation",
    href: frHref("/applications/navigation"),
    links: [
      {
        label: "Le problème",
        href: frHref("/applications/navigation#problem"),
        blurb: "Là où le positionnement par satellite échoue, et pourquoi c’est grave.",
      },
      {
        label: "La borne d’erreur",
        href: frHref("/applications/navigation#bound"),
        blurb: "Chaque recalage dit de combien il peut se tromper.",
      },
      {
        label: "Le fonctionnement",
        href: frHref("/applications/navigation#how"),
        blurb: "Le champ magnétique terrestre, mesuré et comparé à une carte.",
      },
      {
        label: "Situations",
        href: frHref("/applications/navigation#situations"),
        blurb: "Relevé, en mer, dans les airs et dans l’espace.",
      },
      {
        label: "Questions fréquentes",
        href: frHref("/applications/navigation#faq"),
        blurb: "Des réponses franches aux objections habituelles.",
      },
    ],
  },
  {
    label: "Technologie",
    href: frHref("/technology"),
    links: [
      {
        label: "Le principe",
        href: frHref("/technology#principle"),
        blurb: "Une résonance dans le diamant, lue par la lumière.",
      },
      {
        label: "Pourquoi le diamant",
        href: frHref("/technology#diamond"),
        blurb: "Température ambiante, robustesse, un vecteur donné par le cristal.",
      },
      {
        label: "La simulation d’abord",
        href: frHref("/technology#simulation"),
        blurb: "Conçu en simulation, confronté aux expériences publiées.",
      },
      {
        label: "Où nous en sommes",
        href: frHref("/company#where-we-stand"),
        blurb: "Ce qui est fait et ce qui vient, daté.",
      },
    ],
  },
  {
    label: "Applications",
    href: frHref("/applications"),
    links: [
      {
        label: "Navigation",
        href: frHref("/applications/navigation"),
        blurb: "Un positionnement fiable sans GPS.",
      },
      {
        label: "Sciences du vivant",
        href: "/applications/life-sciences",
        blurb: "La résonance magnétique sur de petits échantillons, et la signature magnétique des cellules." + EN,
      },
      {
        label: "Semi-conducteurs et industrie",
        href: "/applications/semiconductors",
        blurb: "Chemins de courant et défauts enfouis, vus par leur champ magnétique." + EN,
      },
      {
        label: "Informatique quantique",
        href: "/applications/quantum-computing",
        blurb: "Le contrôle des spins à température ambiante." + EN,
      },
    ],
  },
  {
    label: "Ressources",
    links: [
      { label: "Actualités", href: frHref("/news"), blurb: "Les étapes et les notes du travail." },
      { label: "Événements", href: frHref("/events"), blurb: "Où nous rencontrer prochainement." },
      { label: "Glossaire", href: "/glossary", blurb: "Les termes de la navigation quantique, expliqués." + EN },
      { label: "Dossier de presse", href: "/press", blurb: "Faits, présentation, logos et contact." + EN },
      { label: "Missions de démonstration", href: "/instrument", blurb: "Pilotez une mission simulée dans votre navigateur." + EN },
    ],
  },
  {
    label: "Société",
    href: frHref("/company"),
    links: [
      { label: "À propos", href: frHref("/company"), blurb: "Une plateforme diamant, de nombreux instruments." },
      { label: "Équipe", href: frHref("/company#team"), blurb: "Qui conçoit l’instrument." },
      {
        label: "Soutiens et adhésions",
        href: frHref("/company#support"),
        blurb: "Reconnaissances, adhésions et sélections.",
      },
      { label: "Carrières", href: frHref("/company#careers"), blurb: "Stages et postes à partir de 2027." },
      { label: "Contact", href: frHref("/contact"), blurb: "Programmes, laboratoires, presse." },
      { label: "En bref", href: "/fr/en-bref", blurb: "Spectral Flow sur une page." },
      { label: "In English", href: "/", blurb: "The site in English." },
    ],
  },
];

/** L’appel à l’action à droite de l’en-tête (l’Instrument est en anglais). */
export const NAV_CTA: NavLink = { label: "Piloter l’Instrument", href: "/instrument" };

/** Liens du pied de page seulement, après les colonnes du menu. */
export const FOOTER_EXTRA: NavLink[] = [
  { label: "Outils (en anglais)", href: "/tools" },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "Mentions légales", href: frHref("/legal") },
  { label: "Confidentialité", href: frHref("/privacy") },
];
