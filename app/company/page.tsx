import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Prose, Eyebrow, H2, Lead, Body, PageHeader } from "../components/kit";

export const metadata: Metadata = {
  title: "Company",
  description:
    "SpectralFlow SAS: European, sovereign deep tech building NV-diamond quantum sensors. Vision, sovereignty thesis, founder Alexandre Papa, NVIDIA Inception membership and 13 patent families.",
};

export default function Company() {
  return (
    <main>
      <PageHeader
        eyebrow="Company"
        title={
          <>
            Taking quantum
            <br className="hidden md:block" /> out of the lab.
          </>
        }
        intro="SpectralFlow SAS is a European deep-tech company designing, patenting and industrialising NV-diamond quantum sensors — room temperature, chip-scale, sovereign."
      />

      {/* Vision */}
      <Prose>
        <Reveal>
          <Eyebrow>Vision</Eyebrow>
          <H2 className="max-w-3xl mb-6">Quantum sensing should work in the field, not just the lab.</H2>
          <Lead className="max-w-3xl mb-4">
            The most powerful quantum sensors today are trapped behind cryostats, shielded rooms
            and optical tables. We believe the technology that wins is the one you can put on a
            drone, a hull or a satellite — rugged, low-power and ready to ship.
          </Lead>
          <Body className="max-w-3xl">
            We follow an &ldquo;NVIDIA model&rdquo;: design the sensor, the firmware and the
            calibration; outsource the fab. That keeps a lean team focused on the defensible
            intellectual property while scaling through partners.
          </Body>
        </Reveal>
      </Prose>

      {/* Sovereignty */}
      <Prose>
        <Reveal>
          <Eyebrow>Sovereignty thesis</Eyebrow>
          <H2 className="max-w-3xl mb-6">Critical sensing, built in Europe.</H2>
          <Lead className="max-w-3xl">
            Positioning and sensing in contested environments are strategic capabilities. They
            should not depend on foreign supply chains or signals anyone can switch off.
            SpectralFlow builds a sovereign, European alternative — designed, patented and owned on
            the continent.
          </Lead>
        </Reveal>
      </Prose>

      {/* Founder */}
      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr] gap-10 items-start">
          <Reveal>
            <div className="max-w-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder-alexandre-papa.jpg"
                alt="Alexandre Papa, founder of SpectralFlow"
                width={240}
                height={240}
                className="w-full aspect-square object-cover rounded-2xl"
                style={{ border: "1px solid var(--border)" }}
              />
              <p className="font-semibold mt-4" style={{ color: "var(--text-primary)" }}>
                Alexandre Papa
              </p>
              <p className="figure-label mt-1">Founder</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Founder</Eyebrow>
            <H2 className="mb-5">Alexandre Papa</H2>
            <Body className="mb-4">
              SpectralFlow was founded by Alexandre Papa, who moved from a finance and corporate
              background into deep tech, dedicating the last several years to quantum sensing. That
              path shapes how the company is run: rigorous on capital and execution, obsessive
              about the underlying physics.
            </Body>
            <Body>
              The conviction is simple — Europe has the science to lead in quantum sensing, and
              what it needs is a team that turns that science into manufacturable, field-ready
              products.
            </Body>
          </Reveal>
        </div>
      </Prose>

      {/* Ecosystem & memberships */}
      <Prose>
        <Reveal>
          <Eyebrow>Ecosystem & memberships</Eyebrow>
          <H2 className="max-w-3xl mb-12">In good company.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-x-12 gap-y-8 items-start">
          <Reveal>
            <div className="hairline pt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nvidia-inception-1c-blk.svg"
                alt="Member of NVIDIA Inception"
                className="h-14 w-auto opacity-80"
              />
              <p className="figure-label mt-5">Member of NVIDIA Inception (2026)</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hairline pt-8">
              <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                Scientific & industrial partners
              </p>
              <Body className="mb-4">
                We work with leading European research institutions and an industrial network
                across the diamond, photonics and navigation value chains. We name partners
                publicly only once collaborations are confirmed and cleared to share.
              </Body>
              <Body>
                Interested in a research or industrial collaboration?{" "}
                <Link href="/contact" style={{ color: "var(--accent)" }}>
                  Get in touch
                </Link>
                .
              </Body>
            </div>
          </Reveal>
        </div>
      </Prose>

      {/* Patents */}
      <Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Intellectual property</Eyebrow>
            <H2 className="mb-5">Thirteen patent families, filed before any disclosure.</H2>
            <Body>
              SpectralFlow&rsquo;s position is protected by a growing portfolio spanning the
              sensor, the fabrication process and the application verticals — covering the bricks
              that matter from physics to product, filed pre-emptively before any public
              disclosure.
            </Body>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden" style={{ background: "var(--border)" }}>
              {[
                { value: "13", label: "Patent families filed" },
                { value: "5", label: "Verticals covered" },
                { value: "3", label: "Proprietary bricks" },
                { value: "8", label: "Public preprints" },
              ].map((s) => (
                <div key={s.label} className="p-7" style={{ background: "var(--surface)" }}>
                  <p className="text-4xl font-semibold display" style={{ color: "var(--accent)" }}>
                    {s.value}
                  </p>
                  <p className="figure-label mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Prose>
    </main>
  );
}
