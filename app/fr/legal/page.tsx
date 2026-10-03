// fr-source: app/legal/page.tsx sha256:8230038409eb17e4
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../../components/kit";
import { CONTACT_EMAIL } from "../../lib/contact";
import { ADDRESS, BRAND, FOUNDER, LEGAL_NAME, RCS } from "../../lib/facts";
import { FACTS_AS_OF, REGISTERED_LABEL, STAGE_LINE, SHARE_IMAGE } from "../../lib/fr/facts";

/** The stage, dated: it goes stale, so it always carries its date. */
const STAGE_DATED = `En ${FACTS_AS_OF}, ${STAGE_LINE.charAt(0).toLowerCase()}${STAGE_LINE.slice(1)}`;

const DESCRIPTION =
  "Mentions légales du site spectralflow.ai : Spectral Flow SAS, société par actions simplifiée de droit français.";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: DESCRIPTION,
  alternates: { canonical: "/fr/legal", languages: { en: "/legal", fr: "/fr/legal" } },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Mentions légales · ${BRAND}`,
    description: DESCRIPTION,
    url: "/fr/legal",
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Mentions légales · ${BRAND}`,
    description: DESCRIPTION,
  },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-3 hairline">
      <dt className="figure-label" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
        {label}
      </dt>
      <dd className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
        {children}
      </dd>
    </div>
  );
}

export default function Legal() {
  return (
    <main>
      <PageHeader
        eyebrow="Mentions légales"
        title="Mentions légales"
        intro="Publiées conformément au droit français (LCEN, art. 1-1)."
      />

      {/* Publisher */}
      <Prose>
        <Eyebrow>Éditeur du site</Eyebrow>
        <H2 className="mb-8">{LEGAL_NAME}</H2>
        <dl>
          <Row label="Dénomination">{BRAND}</Row>
          <Row label="Forme juridique">
            Société par actions simplifiée (SAS) de droit français
          </Row>
          <Row label="Capital social">10&#8239;000&nbsp;€</Row>
          <Row label="Siège social">
            {ADDRESS.street}, {ADDRESS.postalCode} {ADDRESS.locality}, {ADDRESS.country}
          </Row>
          <Row label="RCS / SIREN">
            {RCS}, immatriculée le {REGISTERED_LABEL}
          </Row>
          <Row label="Numéro de TVA intracommunautaire">FR&nbsp;71&nbsp;103&nbsp;022&nbsp;588 (assujettie à la TVA)</Row>
          <Row label="Directeur de la publication">{FOUNDER.name}, Président</Row>
          <Row label="Contact">
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
              {CONTACT_EMAIL}
            </a>
          </Row>
          <Row label="Téléphone">
            <a href="tel:+33664967360" style={{ color: "var(--accent)" }}>
              +33 6 64 96 73 60
            </a>
          </Row>
        </dl>
      </Prose>

      {/* Host */}
      <Prose>
        <Eyebrow>Hébergeur</Eyebrow>
        <H2 className="mb-8">Hébergement du site</H2>
        <dl>
          <Row label="Hébergeur">Vercel Inc.</Row>
          <Row label="Adresse">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</Row>
          <Row label="Téléphone">+1 559 288 7060</Row>
          <Row label="Site web">
            <a href="https://vercel.com" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </Row>
          <Row label="Service de calcul">
            Le service de calcul des missions de démonstration est hébergé par Google Cloud
            France SARL, 8 rue de Londres, 75009 Paris, France, téléphone +33 1 42 68
            53 00, sur des serveurs situés dans l’Union européenne&nbsp;:{" "}
            <a href="https://cloud.google.com" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
              cloud.google.com
            </a>
          </Row>
        </dl>
      </Prose>

      {/* IP */}
      <Prose>
        <Eyebrow>Propriété intellectuelle</Eyebrow>
        <H2 className="max-w-3xl mb-6">Contenus et marques</H2>
        <Body className="max-w-3xl mb-4">
          L’ensemble des contenus de ce site (textes, graphismes, schémas, logos et le nom {BRAND})
          est la propriété de {LEGAL_NAME} ou de ses concédants de licence, et il est protégé par le
          droit français et international de la propriété intellectuelle. Toute reproduction ou
          réutilisation, totale ou partielle, requiert une autorisation écrite préalable.
        </Body>
        <Body className="max-w-3xl">
          «&nbsp;Membre de <span lang="en">NVIDIA Inception</span>&nbsp;» désigne la participation
          au programme <span lang="en">NVIDIA Inception</span>&#8239;; le nom et le logo NVIDIA sont
          des marques de NVIDIA Corporation, utilisées avec autorisation. Cette mention n’implique
          aucun partenariat, aucun financement ni aucune caution de NVIDIA.
        </Body>
        <Body className="max-w-3xl mt-4">
          Les autres noms de programmes et d’organismes cités sur ce site, comme{" "}
          <span lang="en">Google for Startups</span>, Bpifrance et Tech Tour, appartiennent à leurs
          titulaires. Ils désignent une adhésion, une qualification ou une sélection, et
          n’impliquent aucune caution.
        </Body>
      </Prose>

      {/* Forward-looking disclaimer */}
      <Prose>
        <Eyebrow>Avertissement</Eyebrow>
        <H2 className="max-w-3xl mb-6">Informations prospectives et issues du modèle</H2>
        <Body className="max-w-3xl mb-4">
          {BRAND} est au stade de la conception. {STAGE_DATED} Les chiffres présentés sur ce site, y
          compris dans les missions de démonstration, sont{" "}
          <strong style={{ color: "var(--text-primary)" }}>issus du modèle</strong>&nbsp;: ils
          proviennent de la simulation, et non de mesures sur un appareil fabriqué. La simulation
          reste à calibrer sur le matériel et elle est utile en termes relatifs. Ces chiffres ne
          sont ni des mesures ni des spécifications, et ils peuvent évoluer à mesure que la
          technologie mûrit.
        </Body>
        <Body className="max-w-3xl">
          Rien sur ce site ne constitue une offre de titres financiers, un conseil en
          investissement ou une sollicitation à investir. Consultez notre{" "}
          <Link href="/fr/privacy" style={{ color: "var(--accent)" }}>
            politique de confidentialité
          </Link>{" "}
          pour savoir comment nous traitons les données personnelles.
        </Body>
      </Prose>
    </main>
  );
}
