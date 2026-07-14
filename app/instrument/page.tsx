import type { Metadata } from "next";
import Instrument from "./Instrument";
import type { ProfileKey } from "./profiles";
import { MAILTO_TWIN_DEMO } from "../lib/contact";

export const metadata: Metadata = {
  title: "The Instrument · mission demos",
  description:
    "Mission demos computed live by our navigation digital twin: fly the SF100 chain end to end, self-calibrating, source-separating, honest about its own confidence. All figures model-derived.",
};

export default async function InstrumentPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string }>;
}) {
  const sp = await searchParams;
  const initial: ProfileKey | null =
    sp.profile === "defence" || sp.profile === "space" || sp.profile === "geo"
      ? sp.profile
      : null;

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
                The Instrument · mission demos
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
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.88rem",
              lineHeight: 1.55,
              margin: "0.4rem 0 0",
              maxWidth: "52rem",
            }}
          >
            These missions are the public window of our engineering digital
            twin. The full twin flies deeper scenarios in{" "}
            <a href={MAILTO_TWIN_DEMO} className="textlink">
              expert sessions
            </a>
            .
          </p>
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
            These mission demos are the public window of our engineering
            digital twin: curated scenarios, computed live by the same engine
            we design with. Expert sessions open the full twin on request, on
            your trajectories, your platforms, your threat models. The design
            engine, the device design rules and the full estimation stack are
            proprietary; the architecture and methods shown here are covered
            by patent applications filed in 2026. All figures are
            model-derived design targets. No hardware exists at this stage.
          </p>
          <p style={{ marginTop: "0.7rem" }}>
            <a href={MAILTO_TWIN_DEMO} className="textlink">
              Request an expert twin session <span>→</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
