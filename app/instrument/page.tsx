import type { Metadata } from "next";
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
    sp.profile === "defence" || sp.profile === "space" ? sp.profile : null;

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 pb-1">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-4 flex-wrap">
              <h1
                style={{
                  fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Fly the sensor. In software.
              </h1>
              <p
                className="figure-label"
                style={{ color: "var(--accent)", margin: 0 }}
              >
                The Instrument · live digital twin
              </p>
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.8rem",
                margin: 0,
              }}
            >
              Every figure model-derived, computed live. No hardware exists at
              this stage.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <Instrument initial={initial} />
        </div>
      </section>
      <section className="hairline">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.85rem",
              maxWidth: "42rem",
              lineHeight: 1.6,
            }}
          >
            This is the public layer of our engineering digital twin. The
            design engine, the device design rules and the full estimation
            stack are proprietary; the architecture and methods shown here are
            covered by patent applications filed in 2026. All figures are
            model-derived design targets. No hardware exists at this stage.
          </p>
        </div>
      </section>
    </>
  );
}
