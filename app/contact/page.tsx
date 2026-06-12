import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { Section, Eyebrow, H2, Body, PageHeader } from "../components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SpectralFlow about NV-diamond quantum sensors, partnerships and investment. Email alex@spectralflow.ai.",
};

export default function Contact() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&rsquo;s talk.</>}
        intro={
          <>
            Investors, partners and prospective collaborators — we&rsquo;d like to hear from you.
            We&rsquo;re courting early backers as we scale NV-diamond quantum sensing.
          </>
        }
      />

      <Section bordered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <H2 className="mb-6">Reach out.</H2>
            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow>Email</Eyebrow>
                <a href="mailto:alex@spectralflow.ai" className="text-lg" style={{ color: "var(--accent)" }}>
                  alex@spectralflow.ai
                </a>
              </div>
              <div>
                <Eyebrow>The engine</Eyebrow>
                <a href="https://studio.spectralflow.ai" className="text-lg" style={{ color: "var(--accent)" }}>
                  studio.spectralflow.ai
                </a>
                <Body className="mt-1">Explore SF-QSim, our simulation engine.</Body>
              </div>
              <div>
                <Eyebrow>Predictive datasheet</Eyebrow>
                <a
                  href="mailto:alex@spectralflow.ai?subject=SF-100%20predictive%20datasheet%20request"
                  className="text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  Request the SF-100 predictive datasheet
                </a>
                <Body className="mt-1">
                  Model-derived target specifications, sent personally on request — please include
                  your professional affiliation.
                </Body>
              </div>
              <div>
                <Eyebrow>Navigation digital twin</Eyebrow>
                <a
                  href="mailto:alex@spectralflow.ai?subject=Navigation%20digital%20twin%20%E2%80%94%20demo%20access%20request"
                  className="text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  Request demo access
                </a>
                <Body className="mt-1">The interactive twin is online; access is granted on request.</Body>
              </div>
              <div>
                <Eyebrow>Company</Eyebrow>
                <Body>SpectralFlow SAS — France. European, sovereign deep tech.</Body>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-7 md:p-8">
              <H2 className="mb-6">Send a message.</H2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
