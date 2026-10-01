import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL } from "../lib/contact";
import {
  ADDRESS,
  BRAND,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  RCS,
  REGISTERED_LABEL,
  STAGE_LINE,
} from "../lib/facts";

/** The stage, dated: it goes stale, so it always carries its date. */
const STAGE_DATED = `As of ${FACTS_AS_OF}, ${STAGE_LINE.charAt(0).toLowerCase()}${STAGE_LINE.slice(1)}`;

const DESCRIPTION =
  "Legal notice (mentions légales) for spectralflow.ai: Spectral Flow SAS, a French société par actions simplifiée.";

export const metadata: Metadata = {
  title: "Legal notice",
  description: DESCRIPTION,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal notice · ${BRAND}`,
    description: DESCRIPTION,
    url: "/legal",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Legal notice · ${BRAND}`,
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
        eyebrow="Legal notice"
        title="Legal notice"
        intro="Mentions légales, published in accordance with French law (LCEN, art. 1-1)."
      />

      {/* Publisher */}
      <Prose>
        <Eyebrow>Site publisher · Éditeur</Eyebrow>
        <H2 className="mb-8">{LEGAL_NAME}</H2>
        <dl>
          <Row label="Company name">{BRAND}</Row>
          <Row label="Legal form">
            Société par actions simplifiée (SAS), French private limited company
          </Row>
          <Row label="Share capital">€10,000</Row>
          <Row label="Registered office">
            {ADDRESS.street}, {ADDRESS.postalCode} {ADDRESS.locality}, {ADDRESS.country}
          </Row>
          <Row label="RCS / SIREN">
            {RCS}, registered {REGISTERED_LABEL}
          </Row>
          <Row label="VAT number">FR&nbsp;71&nbsp;103&nbsp;022&nbsp;588 (VAT-registered)</Row>
          <Row label="Publication director">{FOUNDER.name}, Président</Row>
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
          <Row label="Host">Vercel Inc.</Row>
          <Row label="Address">440 N Barranca Ave #4133, Covina, CA 91723, United States</Row>
          <Row label="Telephone">+1 559 288 7060</Row>
          <Row label="Website">
            <a href="https://vercel.com" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </Row>
          <Row label="Compute service">
            The compute service behind the mission demos is hosted by Railway
            Corporation, 548 Market St PMB 68956, San Francisco, CA 94104, United
            States, telephone +1 415 707 7675:{" "}
            <a href="https://railway.com" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
              railway.com
            </a>
          </Row>
        </dl>
      </Prose>

      {/* IP */}
      <Prose>
        <Eyebrow>Intellectual property</Eyebrow>
        <H2 className="max-w-3xl mb-6">Content & trademarks</H2>
        <Body className="max-w-3xl mb-4">
          All content on this site (text, graphics, diagrams, logos and the {BRAND} name) is the
          property of {LEGAL_NAME} or its licensors and is protected under French and
          international intellectual-property law. Reproduction or reuse, in whole or in part,
          requires prior written permission.
        </Body>
        <Body className="max-w-3xl">
          &ldquo;Member of NVIDIA Inception&rdquo; refers to participation in the NVIDIA Inception
          program; the NVIDIA name and logo are trademarks of NVIDIA Corporation, used with
          permission. No partnership, funding or endorsement by NVIDIA is implied.
        </Body>
        <Body className="max-w-3xl mt-4">
          Other programme and organisation names mentioned on this site, such as Google for
          Startups, Bpifrance and Tech Tour, belong to their owners. They describe a membership, a
          qualification or a selection, and imply no endorsement.
        </Body>
      </Prose>

      {/* Forward-looking disclaimer */}
      <Prose>
        <Eyebrow>Disclaimer</Eyebrow>
        <H2 className="max-w-3xl mb-6">Forward-looking and model-derived information</H2>
        <Body className="max-w-3xl mb-4">
          {BRAND} is at the design stage. {STAGE_DATED} Figures shown on this site, including in
          the mission demos, are{" "}
          <strong style={{ color: "var(--text-primary)" }}>model-derived</strong>: they come from
          simulation, not from measurements on a manufactured device. The simulation is still to
          be calibrated against hardware and is useful in relative terms. These figures are
          neither measurements nor specifications, and may change as the technology matures.
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
