// fr-source: app/contact/page.tsx sha256:2501aa103e1e7b88
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Reveal from "../../components/Reveal";
import ContactForm, { ContactFormStatic } from "../../components/ContactForm";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../../components/kit";
import {
  CONTACT_EMAIL,
  CTA_CAREERS,
  CTA_DATASHEET,
  CTA_LAB,
  CTA_PRESS,
  CTA_PROGRAMME,
  CTA_SIMULATION,
} from "../../lib/fr/contact";
import { BRAND, LEGAL_NAME, ADDRESS, SITE_URL } from "../../lib/facts";
import { SHARE_IMAGE } from "../../lib/fr/facts";
import { RESEARCH_PARTNERS_LINE } from "../../lib/fr/supporters";

const DESCRIPTION = `Parlez avec ${BRAND} des capteurs quantiques à diamant : programmes de navigation, collaborations de recherche, fiche technique issue du modèle, sessions de simulation expertes, presse et recrutement. Écrivez à ${CONTACT_EMAIL}.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/fr/contact", languages: { en: "/contact", fr: "/fr/contact" } },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Contact · ${BRAND}`,
    description: DESCRIPTION,
    url: "/fr/contact",
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Contact · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact · ${BRAND}`,
  url: `${SITE_URL}/fr/contact`,
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  about: {
    "@type": "Organization",
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.locality,
      addressCountry: ADDRESS.countryCode,
    },
  },
};

/** A contact link set in ink, with the one blue on the arrow. */
const LINK_STYLE = { color: "var(--text-primary)", fontSize: "1.05rem" } as const;

/** Who writes to us, and where each reason lands in the form. */
const CHANNELS: {
  eyebrow: string;
  label: string;
  href: string;
  body: React.ReactNode;
}[] = [
  {
    eyebrow: "Partenaires de programme",
    label: "Parler d’un programme",
    href: CTA_PROGRAMME,
    body: "Pour les intégrateurs de navigation et les responsables de programme : études de faisabilité et d’intégration, et sessions de simulation sur vos propres scénarios.",
  },
  {
    eyebrow: "Laboratoires de recherche",
    label: "Proposer une collaboration",
    href: CTA_LAB,
    body: RESEARCH_PARTNERS_LINE,
  },
  {
    eyebrow: "Fiche technique issue du modèle",
    label: "Demander la fiche technique issue du modèle",
    href: CTA_DATASHEET,
    body: "Les spécifications visées, tirées de notre simulation, envoyées personnellement sur demande. Merci d’indiquer votre rattachement professionnel.",
  },
  {
    eyebrow: "Session de simulation experte",
    label: "Demander une session de simulation experte",
    href: CTA_SIMULATION,
    body: "L’Instrument, nos missions de démonstration publiques, est ouvert à tous dans le navigateur. Les sessions expertes vont plus loin, dans le cadre d’un accord, sur notre simulation d’ingénierie complète.",
  },
  {
    eyebrow: "Presse",
    label: "Demandes de la presse",
    href: CTA_PRESS,
    body: (
      <>
        Les faits et les logos sont dans le{" "}
        <Link href="/press" hrefLang="en" className="textlink">
          dossier de presse
          <span className="sr-only"> (en anglais)</span>
        </Link>
        .
      </>
    ),
  },
  {
    eyebrow: "Recrutement",
    label: "Nous écrire",
    href: CTA_CAREERS,
    body: "Nous sommes une petite équipe. En 2027, nous ouvrirons des stages en nanofabrication du diamant et en capteurs quantiques, ainsi que des postes d’ingénieur.",
  },
];

/** Self-serve diligence: we expect to be checked, and the path is cleared. */
const CHECKS = [
  {
    t: "Piloter l’Instrument.",
    d: "Une mission complète dans votre navigateur, calculée en simulation. Chaque chiffre est signalé comme issu du modèle.",
    href: "/instrument",
    label: "Ouvrir les missions de démonstration (en anglais)",
  },
  {
    t: "Lire la méthode.",
    d: "Notre simulation est confrontée à un registre de validation de plus d’une centaine de résultats publiés ; la validation quantitative porte sur ceux dont les conditions expérimentales sont assez bien documentées, et la liste est disponible. Quand le modèle et une expérience divergent, l’expérience l’emporte.",
    href: "/fr/technology#simulation",
    label: "Voir « La simulation d’abord »",
  },
  {
    t: "Vérifier la société.",
    d: "Une SAS française immatriculée, dont les informations figurent dans les mentions légales.",
    href: "/fr/legal",
    label: "Lire les mentions légales",
  },
];

export default function Contact() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PAGE_JSONLD).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        eyebrow="Contact"
        title="Parlons-en."
        intro={
          <>
            Nous cherchons des partenaires de programme&nbsp;: intégrateurs de navigation,
            laboratoires de recherche et investisseurs qui apportent un programme. Dites-nous sur
            quoi vous travaillez&#8239;; nous répondons personnellement.
          </>
        }
      />

      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <H2 className="mb-8">Nous joindre.</H2>
            <div className="flex flex-col gap-7">
              {CHANNELS.map((c) => (
                <div key={c.eyebrow} className="hairline pt-5">
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                  <Link href={`${c.href}#message`} className="textlink" style={LINK_STYLE}>
                    {c.label} <span style={{ color: "var(--accent)" }}>→</span>
                  </Link>
                  <Body className="mt-1">{c.body}</Body>
                </div>
              ))}
              <div className="hairline pt-5">
                <Eyebrow>Courriel</Eyebrow>
                <a href={`mailto:${CONTACT_EMAIL}`} className="textlink" style={LINK_STYLE}>
                  {CONTACT_EMAIL} <span style={{ color: "var(--accent)" }}>→</span>
                </a>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Société</Eyebrow>
                <Body>
                  {LEGAL_NAME}, {ADDRESS.locality}, {ADDRESS.country}.
                </Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div id="message" className="card p-7 md:p-8 md:sticky md:top-24">
              <H2 className="mb-6">Envoyer un message.</H2>
              <Suspense fallback={<ContactFormStatic />}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* Self-serve diligence */}
      <Prose>
        <Reveal>
          <Eyebrow>Avant de nous écrire</Eyebrow>
          <H2 className="max-w-3xl mb-12">Vérifiez notre travail.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {CHECKS.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="hairline pt-6 h-full flex flex-col">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.t}
                </p>
                <Body>{c.d}</Body>
                <Link
                  href={c.href}
                  hrefLang={c.href.startsWith("/fr") ? undefined : "en"}
                  className="textlink mt-auto pt-4"
                >
                  {c.label} <span>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>
    </main>
  );
}
