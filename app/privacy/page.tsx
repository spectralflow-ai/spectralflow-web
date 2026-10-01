import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL } from "../lib/contact";
import { ADDRESS, BRAND, LEGAL_NAME } from "../lib/facts";

const DESCRIPTION = `Privacy policy (politique de confidentialité) for spectralflow.ai: how ${LEGAL_NAME} handles personal data under the GDPR.`;

export const metadata: Metadata = {
  title: "Privacy policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy policy · ${BRAND}`,
    description: DESCRIPTION,
    url: "/privacy",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy policy · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const strong = { color: "var(--text-primary)" } as const;

export default function Privacy() {
  return (
    <main>
      <PageHeader
        eyebrow="Privacy policy"
        title="Privacy policy"
        intro="Politique de confidentialité: how we collect and handle personal data, in accordance with the EU General Data Protection Regulation (GDPR)."
      />

      <Prose>
        <Eyebrow>Data controller</Eyebrow>
        <H2 className="max-w-3xl mb-6">Who is responsible</H2>
        <Body className="max-w-3xl">
          The data controller is <strong style={strong}>{LEGAL_NAME}</strong>, {ADDRESS.street},{" "}
          {ADDRESS.postalCode} {ADDRESS.locality}, {ADDRESS.country}. For any question about your
          data, contact{" "}
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
          <strong style={strong}>Contact and requests.</strong> When you email us or use the
          contact form (general enquiries, programme, laboratory, press or careers enquiries,
          requests for the model-derived datasheet or an expert simulation session), we process
          the data you provide, typically your name, email address, organisation and message, for
          the sole purpose of answering you and managing the relationship that follows. Legal
          basis: our legitimate interest in answering inbound enquiries, and steps taken at your
          request before any agreement.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>How the form is delivered.</strong> Messages sent through the
          form are passed to our mailbox by Resend, a service of Plus Five Five, Inc. (United States), an email
          delivery service acting on our instructions. If the form cannot send, your own email
          client opens with the message prepared, and nothing passes through Resend.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Technical logs.</strong> Our host, Vercel Inc. (United States),
          may process standard technical data (for example IP address, browser and timestamps)
          to deliver and secure the site.
          Legal basis: our legitimate interest in the security and proper operation of the site.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Mission demos.</strong> When you open the Instrument, your
          browser connects to our compute service, hosted by Railway Corporation (United States), which
          computes each simulated mission. That service receives your IP address and standard
          technical data needed to answer the request. You do not type any personal data into
          the demos, and we do not use these requests to identify visitors.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Live GNSS interference map.</strong> Some pages offer a live map
          from gpsjam.org, a third-party site by John Wiseman. Nothing is requested from
          gpsjam.org until you click to load the map; before that, the page shows a drawing made
          by us. When you click, your browser loads gpsjam.org inside the page, and gpsjam.org,
          together with any service that site itself uses, receives your IP address and standard
          technical data under its own terms. On small screens the map opens on gpsjam.org in a
          new tab instead.
        </Body>
        <Body className="max-w-3xl">
          <strong style={strong}>Cookies and audience measurement.</strong> This site uses no
          audience measurement, no advertising or tracking cookies, and does not profile visitors.
          Fonts and images are served from this site itself. Only strictly necessary cookies
          required for the site to be served securely may be set by our host. No consent banner is
          therefore required; should we add audience measurement, this policy will be updated
          first and consent requested where the law requires it.
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Retention & sharing</Eyebrow>
        <H2 className="max-w-3xl mb-6">How long, and with whom</H2>
        <Body className="max-w-3xl mb-4">
          We keep enquiry data while we handle your request and the relationship that follows,
          and no longer than three years after our last exchange; then we delete it. We do not
          sell personal data. It may be processed by our service providers (hosting, compute and
          email delivery, named above) acting on our instructions. Some of them operate outside the
          European Union, in particular in the United States; such transfers rely on the safeguards provided by the GDPR, such as the EU-US
          Data Privacy Framework or the European Commission&rsquo;s standard contractual
          clauses.
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
