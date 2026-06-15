import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL } from "../lib/contact";

export const metadata: Metadata = {
  title: "Legal notice",
  description:
    "Legal notice (mentions légales) for spectralflow.ai — Spectral Flow SAS, a French société par actions simplifiée.",
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

/* TODO LEGAL — placeholders to confirm with the founder / legal counsel
   before this page is pushed live. Format kept unmistakable on purpose. */
const TBC = (what: string) => (
  <span style={{ color: "var(--accent)", fontWeight: 600 }}>[À COMPLÉTER : {what}]</span>
);

export default function Legal() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal notice"
        title="Legal notice"
        intro="Mentions légales — published in accordance with French law (LCEN, art. 6 III)."
      />

      {/* Publisher */}
      <Prose>
        <Eyebrow>Site publisher · Éditeur</Eyebrow>
        <H2 className="mb-8">Spectral Flow SAS</H2>
        <dl>
          <Row label="Company name">Spectral Flow</Row>
          <Row label="Legal form">
            Société par actions simplifiée (SAS) — French private limited company
          </Row>
          <Row label="Share capital">€10,000</Row>
          <Row label="Registered office">
            14 avenue de Grande Bretagne, 06230 Villefranche-sur-Mer, France
          </Row>
          <Row label="RCS / SIREN">
            RCS Nice 103 022 588 — registered 27 March 2026
          </Row>
          <Row label="VAT number">
            FR&nbsp;71&nbsp;103&nbsp;022&nbsp;588 {TBC("confirmer : assujetti, ou franchise en base TVA art. 293 B CGI")}
          </Row>
          <Row label="Publication director">Alexandre Papa, Président</Row>
          <Row label="Contact">
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
              {CONTACT_EMAIL}
            </a>
          </Row>
        </dl>
      </Prose>

      {/* Host */}
      <Prose>
        <Eyebrow>Hosting · Hébergeur</Eyebrow>
        <H2 className="mb-8">Where this site is hosted</H2>
        <dl>
          <Row label="Host">{TBC("nom de l'hébergeur — p.ex. Vercel Inc.")}</Row>
          <Row label="Address">{TBC("adresse de l'hébergeur")}</Row>
          <Row label="Contact">{TBC("site / téléphone de l'hébergeur")}</Row>
        </dl>
      </Prose>

      {/* IP */}
      <Prose>
        <Eyebrow>Intellectual property</Eyebrow>
        <H2 className="max-w-3xl mb-6">Content & trademarks</H2>
        <Body className="max-w-3xl mb-4">
          All content on this site — text, graphics, diagrams, logos and the SpectralFlow name —
          is the property of Spectral Flow SAS or its licensors and is protected under French and
          international intellectual-property law. Reproduction or reuse, in whole or in part,
          requires prior written permission.
        </Body>
        <Body className="max-w-3xl">
          &ldquo;Member of NVIDIA Inception&rdquo; refers to participation in the NVIDIA Inception
          program; the NVIDIA name and logo are trademarks of NVIDIA Corporation, used with
          permission. No partnership, funding or endorsement by NVIDIA is implied.
        </Body>
      </Prose>

      {/* Forward-looking disclaimer */}
      <Prose>
        <Eyebrow>Disclaimer</Eyebrow>
        <H2 className="max-w-3xl mb-6">Forward-looking and model-derived information</H2>
        <Body className="max-w-3xl mb-4">
          SpectralFlow is at the design and pre-prototype stage. Performance figures presented on
          this site are <strong style={{ color: "var(--text-primary)" }}>model-derived design
          targets</strong>, not measured results from a manufactured device. They describe the
          objectives of our design work and may change as the technology matures.
        </Body>
        <Body className="max-w-3xl">
          Nothing on this site constitutes an offer of securities, investment advice, or a
          solicitation to invest. See our{" "}
          <Link href="/privacy" style={{ color: "var(--accent)" }}>
            privacy policy
          </Link>{" "}
          for how we handle personal data.
        </Body>
      </Prose>
    </main>
  );
}
