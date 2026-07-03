import type { Metadata } from "next";
import { PageHeader, Prose, Body } from "../components/kit";
import Instrument from "./Instrument";
import type { ProfileKey } from "./profiles";

export const metadata: Metadata = {
  title: "The Instrument · live digital twin",
  description:
    "Fly the SF100 navigation chain end to end, computed live on our digital twin: self-calibrating, source-separating, honest about its own confidence. All figures model-derived.",
};

export default async function InstrumentPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string }>;
}) {
  const sp = await searchParams;
  const initial: ProfileKey | null =
    sp.profile === "defence" || sp.profile === "space"
      ? sp.profile
      : null;

  return (
    <>
      <PageHeader
        eyebrow="The Instrument · live digital twin"
        title={<>Fly the sensor. In software.</>}
        intro="One diamond quantum sensor and one estimation chain, flying a full mission where satellites cannot help. Self-calibrating, source-separating, and honest about its own confidence. Every figure is model-derived, computed live on our digital twin."
      />
      <section className="hairline">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Instrument initial={initial} />
        </div>
      </section>
      <Prose>
        <Body className="max-w-2xl">
          This is the public layer of our engineering digital twin. The design
          engine, the device design rules and the full estimation stack are
          proprietary; the architecture and methods shown here are covered by
          patent applications filed in 2026. All figures are model-derived
          design targets. No hardware exists at this stage.
        </Body>
      </Prose>
    </>
  );
}
