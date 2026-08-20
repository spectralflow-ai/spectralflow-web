import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL, CTA_DATASHEET, CTA_TWIN } from "../lib/contact";

const DESCRIPTION = `Talk to SpectralFlow about NV-diamond quantum sensors, partnerships and investment. Email ${CONTACT_EMAIL}.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · SpectralFlow",
    description: DESCRIPTION,
    url: "/contact",
  },
};

/** Self-serve diligence: we expect to be checked, and the path is cleared. */
const CHECKS = [
  {
    t: "Fly the Instrument.",
    d: "A full mission, computed live in your browser. Every figure labelled model-derived.",
    href: "/instrument",
    label: "Open the mission demos",
  },
  {
    t: "Read the method.",
    d: "More than 100 published experimental results behind the engine. When the model and an experiment disagree, the experiment wins.",
    href: "/technology#registry",
    label: "See the anchor registry",
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
      <PageHeader
        eyebrow="Contact"
        title={<>Let&rsquo;s talk.</>}
        intro={
          <>
            Investors, partners and prospective collaborators: we&rsquo;d like to hear from you.
            We&rsquo;re opening conversations with early backers as we develop NV-diamond quantum sensing.
          </>
        }
      />

      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <H2 className="mb-8">Reach out.</H2>
            <div className="flex flex-col gap-7">
              <div className="hairline pt-5">
                <Eyebrow>Predictive datasheet</Eyebrow>
                <Link href={CTA_DATASHEET} className="text-lg" style={{ color: "var(--accent)" }}>
                  Request the SF-100 predictive datasheet
                </Link>
                <Body className="mt-1">
                  Model-derived target specifications, sent personally on request; please include
                  your professional affiliation.
                </Body>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Navigation digital twin</Eyebrow>
                <Link href={CTA_TWIN} className="text-lg" style={{ color: "var(--accent)" }}>
                  Request an expert twin session
                </Link>
                <Body className="mt-1">
                  The Instrument, our public mission demos, is open to everyone in the browser.
                  Expert sessions go deeper, under agreement, on the full engineering twin.
                </Body>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Email</Eyebrow>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg" style={{ color: "var(--accent)" }}>
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>The engine</Eyebrow>
                <a href="https://studio.spectralflow.ai" className="text-lg" style={{ color: "var(--accent)" }}>
                  studio.spectralflow.ai
                </a>
                <Body className="mt-1">Explore SF-QSim, our simulation engine.</Body>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Company</Eyebrow>
                <Body>Spectral Flow SAS, France. European, sovereign deep tech.</Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-7 md:p-8">
              <H2 className="mb-6">Send a message.</H2>
              <Suspense fallback={null}>
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
