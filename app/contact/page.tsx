import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../components/kit";
import { CONTACT_EMAIL, MAILTO_DATASHEET, MAILTO_TWIN_DEMO } from "../lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to SpectralFlow about NV-diamond quantum sensors, partnerships and investment. Email ${CONTACT_EMAIL}.`,
};

export default function Contact() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&rsquo;s talk.</>}
        intro={
          <>
            Investors, partners and prospective collaborators: we&rsquo;d like to hear from you.
            We&rsquo;re courting early backers as we scale NV-diamond quantum sensing.
          </>
        }
      />

      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <H2 className="mb-8">Reach out.</H2>
            <div className="flex flex-col gap-7">
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
                <Eyebrow>Predictive datasheet</Eyebrow>
                <a
                  href={MAILTO_DATASHEET}
                  className="text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  Request the SF-100 predictive datasheet
                </a>
                <Body className="mt-1">
                  Model-derived target specifications, sent personally on request; please include
                  your professional affiliation.
                </Body>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Navigation digital twin</Eyebrow>
                <a
                  href={MAILTO_TWIN_DEMO}
                  className="text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  Request demo access
                </a>
                <Body className="mt-1">The interactive twin is online; access is granted on request.</Body>
              </div>
              <div className="hairline pt-5">
                <Eyebrow>Company</Eyebrow>
                <Body>SpectralFlow SAS, France. European, sovereign deep tech.</Body>
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
      </Prose>
    </main>
  );
}
