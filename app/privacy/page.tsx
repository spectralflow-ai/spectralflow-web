import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL } from "../lib/contact";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy (politique de confidentialité) for spectralflow.ai — how Spectral Flow SAS handles personal data under the GDPR.",
};

const TBC = (what: string) => (
  <span style={{ color: "var(--accent)", fontWeight: 600 }}>[À COMPLÉTER : {what}]</span>
);

export default function Privacy() {
  return (
    <main>
      <PageHeader
        eyebrow="Privacy policy"
        title="Privacy policy"
        intro="Politique de confidentialité — how we collect and handle personal data, in accordance with the EU General Data Protection Regulation (GDPR)."
      />

      <Prose>
        <Eyebrow>Data controller</Eyebrow>
        <H2 className="max-w-3xl mb-6">Who is responsible</H2>
        <Body className="max-w-3xl">
          The data controller is <strong style={{ color: "var(--text-primary)" }}>Spectral Flow
          SAS</strong>, 14 avenue de Grande Bretagne, 06230 Villefranche-sur-Mer, France. For any
          question about your data, contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>What we collect & why</Eyebrow>
        <H2 className="max-w-3xl mb-6">Data, purpose and legal basis</H2>
        <Body className="max-w-3xl mb-4">
          <strong style={{ color: "var(--text-primary)" }}>Contact &amp; access requests.</strong>{" "}
          When you email us or use a form on this site (general contact, predictive-datasheet or
          digital-twin access requests), we process the data you provide — typically your name,
          email address, professional affiliation and your message — for the sole purpose of
          responding to your request and managing the relationship that follows. Legal basis:
          our legitimate interest in answering inbound enquiries, and the steps taken at your
          request prior to any agreement.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={{ color: "var(--text-primary)" }}>Technical logs.</strong> Our host may
          process standard technical data (e.g. IP address, browser, timestamps) to deliver and
          secure the site. Legal basis: legitimate interest in the security and proper operation
          of the site.
        </Body>
        <Body className="max-w-3xl">
          <strong style={{ color: "var(--text-primary)" }}>Cookies &amp; analytics.</strong>{" "}
          {TBC("confirmer : ce site n'utilise pas de cookies de suivi / d'analytics — sinon décrire l'outil et la base légale (consentement)")}
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Retention & sharing</Eyebrow>
        <H2 className="max-w-3xl mb-6">How long, and with whom</H2>
        <Body className="max-w-3xl mb-4">
          We keep enquiry data only as long as needed to handle your request and our subsequent
          relationship, then archive or delete it. We do not sell personal data. It may be
          processed by our service providers (e.g. email and hosting) acting on our instructions,
          some of which may operate outside the EU under appropriate safeguards.
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Your rights</Eyebrow>
        <H2 className="max-w-3xl mb-6">Access, rectification, erasure</H2>
        <Body className="max-w-3xl mb-4">
          Under the GDPR you have the right to access, rectify, erase, restrict or object to the
          processing of your personal data, and the right to data portability. To exercise these
          rights, contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </Body>
        <Body className="max-w-3xl">
          If you believe your rights are not respected, you may lodge a complaint with the French
          data-protection authority, the CNIL (
          <a href="https://www.cnil.fr" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </Body>
      </Prose>

      <Prose>
        <Body className="max-w-3xl">
          See also our{" "}
          <Link href="/legal" style={{ color: "var(--accent)" }}>
            legal notice
          </Link>
          . This policy may be updated; the current version governs.
        </Body>
      </Prose>
    </main>
  );
}
