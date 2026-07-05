import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";
import { VERTICALS_ORDERED } from "../lib/verticals";
import { VERTICALS } from "../lib/facts";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "One NV-diamond sensing core across a family of verticals: GPS-denied navigation ships first, with life sciences, semiconductor metrology and ambient quantum computing behind it. Five patented verticals.",
};

export default function Applications() {
  const [flagship, ...rest] = VERTICALS_ORDERED;

  return (
    <main>
      <PageHeader
        eyebrow="Applications"
        title={
          <>
            One core.
            <br className="hidden md:block" /> A family of verticals.
          </>
        }
        intro={`A single sensing core (engineered diamond, integrated optics, adaptive firmware) reaches across a family of markets. We ship GPS-denied navigation first; the platform extends into life sciences, industry and quantum information. ${VERTICALS} verticals are patented and activate as each science and market matures.`}
      />

      {/* Flagship */}
      <Prose>
        <Reveal>
          <Link
            href={`/applications/${flagship.slug}`}
            className="card block p-8 md:p-12 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 items-end">
              <div>
                <p className="eyebrow mb-3">{flagship.eyebrow}</p>
                <h2
                  className="display text-3xl md:text-[2.4rem] font-semibold tracking-tight mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {flagship.title}
                </h2>
                <Body className="max-w-xl">{flagship.tagline}</Body>
              </div>
              <div className="md:text-right">
                <span className="textlink">
                  Explore navigation <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </Prose>

      {/* The rest of the platform */}
      <Prose>
        <Reveal>
          <Eyebrow>The platform goes further</Eyebrow>
          <H2 className="max-w-3xl mb-6">The same quantum core, beyond navigation.</H2>
          <Lead className="max-w-2xl mb-14">
            Each vertical starts with the science of its domain, then our approach. Navigation ships
            first; the rest are patented and activate as each market matures.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((v, i) => (
            <Reveal key={v.slug} delay={i * 80}>
              <Link
                href={`/applications/${v.slug}`}
                className="card p-6 md:p-7 h-full flex flex-col gap-2.5 group"
              >
                <p className="eyebrow">{v.navLabel}</p>
                <p className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                  {v.tagline}
                </p>
                <span className="textlink mt-auto pt-3">
                  Explore <span>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* CTA */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">Building toward a programme in your domain?</H2>
          <Lead className="max-w-2xl mb-9">
            We work with partners who need positioning and sensing where conventional technology
            stops. Tell us about the environment you operate in.
          </Lead>
          <Link href="/contact" className="btn-primary">
            Get in touch <span>→</span>
          </Link>
        </Reveal>
      </Prose>
    </main>
  );
}
