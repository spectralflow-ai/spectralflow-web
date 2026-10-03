import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Reveal from "../components/Reveal";
import ContactForm, { ContactFormStatic } from "../components/ContactForm";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import {
  CONTACT_EMAIL,
  CTA_CAREERS,
  CTA_DATASHEET,
  CTA_LAB,
  CTA_PRESS,
  CTA_PROGRAMME,
  CTA_SIMULATION,
} from "../lib/contact";
import { BRAND, LEGAL_NAME, ADDRESS, SITE_URL, SHARE_IMAGE } from "../lib/facts";
import { RESEARCH_PARTNERS_LINE } from "../lib/supporters";

const DESCRIPTION = `Talk to ${BRAND} about diamond quantum sensors: navigation programmes, research collaborations, the model-derived datasheet, expert simulation sessions, press and careers. Email ${CONTACT_EMAIL}.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Contact · ${BRAND}`,
    description: DESCRIPTION,
    url: "/contact",
    siteName: BRAND,
    locale: "en_GB",
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
  url: `${SITE_URL}/contact`,
  description: DESCRIPTION,
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
    eyebrow: "Programme partners",
    label: "Discuss a programme",
    href: CTA_PROGRAMME,
    body: "For navigation integrators and programme owners: feasibility and integration studies, and simulation sessions on your own scenarios.",
  },
  {
    eyebrow: "Research laboratories",
    label: "Propose a collaboration",
    href: CTA_LAB,
    body: RESEARCH_PARTNERS_LINE,
  },
  {
    eyebrow: "Model-derived datasheet",
    label: "Request the model-derived datasheet",
    href: CTA_DATASHEET,
    body: "Target specifications from our simulation, sent personally on request. Please include your professional affiliation.",
  },
  {
    eyebrow: "Expert simulation session",
    label: "Request an expert simulation session",
    href: CTA_SIMULATION,
    body: "The Instrument, our public mission demos, is open to everyone in the browser. Expert sessions go deeper, under agreement, on our full engineering simulation.",
  },
  {
    eyebrow: "Press",
    label: "Press enquiries",
    href: CTA_PRESS,
    body: (
      <>
        Facts and logos are in the{" "}
        <Link href="/press" className="textlink">
          press kit
        </Link>
        .
      </>
    ),
  },
  {
    eyebrow: "Careers",
    label: "Write to us",
    href: CTA_CAREERS,
    body: "We are a small team. In 2027 we will open internships in diamond nanofabrication and quantum sensing, and engineering roles.",
  },
];

/** Self-serve diligence: we expect to be checked, and the path is cleared. */
const CHECKS = [
  {
    t: "Fly the Instrument.",
    d: "A full mission in your browser, computed in simulation. Every figure labelled model-derived.",
    href: "/instrument",
    label: "Open the mission demos",
  },
  {
    t: "Read the method.",
    d: "Our simulation is checked against a validation register of more than a hundred published results; quantitative validation covers the subset whose experimental conditions are documented well enough, and the list is available. When the model and an experiment disagree, the experiment wins.",
    href: "/technology#simulation",
    label: "See simulation first",
  },
  {
    t: "Verify the company.",
    d: "A registered French SAS, with its details in the legal notice.",
    href: "/legal",
    label: "Read the legal notice",
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
        title={<>Let&rsquo;s talk.</>}
        intro={
          <>
            We are looking for programme partners: navigation integrators, research laboratories
            and investors who bring a programme. Tell us what you are working on; we reply
            personally.
          </>
        }
      />

      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <H2 className="mb-8">Reach out.</H2>
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
                <Eyebrow>Email</Eyebrow>
                <a href={`mailto:${CONTACT_EMAIL}`} className="textlink" style={LINK_STYLE}>
                  {CONTACT_EMAIL} <span style={{ color: "var(--accent)" }}>→</span>
                </a>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Company</Eyebrow>
                <Body>
                  {LEGAL_NAME}, {ADDRESS.locality}, {ADDRESS.country}.
                </Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div id="message" className="card p-7 md:p-8 md:sticky md:top-24">
              <H2 className="mb-6">Send a message.</H2>
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
          <Eyebrow>Before you write</Eyebrow>
          <H2 className="max-w-3xl mb-12">Check our work.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {CHECKS.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="hairline pt-6 h-full flex flex-col">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.t}
                </p>
                <Body>{c.d}</Body>
                <Link href={c.href} className="textlink mt-auto pt-4">
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
