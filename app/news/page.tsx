import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Prose, Body, PageHeader } from "../components/kit";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Behind the scenes at SpectralFlow: milestones and insights on NV-diamond quantum sensing and GPS-denied navigation.",
};

/**
 * Editorial entries. Keep these qualitative and confirmed — no
 * unverified specs, clients, financials, pipeline names or grant
 * submissions (see REBUILD_BRIEF_V4.md).
 */
const POSTS = [
  {
    tag: "Milestone",
    date: "July 2026",
    title: "The patent portfolio grows to fifteen families",
    excerpt:
      "Two more patent families were filed at the turn of June and July, bringing the portfolio to fifteen. One protects how the sensing architecture rejects the host platform's own magnetic interference on board; the other covers the onboard inference layer that turns the cleaned signal into navigation data the system can vouch for. Both were filed before any public disclosure, and the details stay confidential until publication.",
  },
  {
    tag: "Research",
    date: "June 2026",
    title: "A hundred anchors keep the engine honest",
    excerpt:
      "A physics engine is only as good as its confrontation with the literature. Every coherence prediction the engine makes is benchmarked against a registry of more than 100 published experimental results, curated anchor by anchor and re-checked as the model evolves. When the model and an experiment disagree, the experiment wins and the model changes.",
  },
  {
    tag: "Milestone",
    date: "June 2026",
    title: "The navigation digital twin is online",
    excerpt:
      "Before our first device is built, our sensor flies an end-to-end synthetic mission: magnetic terrain, a vehicle with its own interference, the full sensor model and the navigation filter. Every figure is honestly labelled model-derived, and our hardware milestones will be judged against the twin’s own predictions. The interactive twin is live; access is granted on request.",
  },
  {
    tag: "Insight",
    date: "June 2026",
    title: "They compensate. We measure.",
    excerpt:
      "Every magnetometer flying today is a lab instrument strapped onto a vehicle, corrected by external compensation models dating back to 1953. We took the opposite path: design the sensor for the vehicle from the first principle, so the measurement stays true under way, with the platform’s own magnetic noise rejected on board.",
  },
  {
    tag: "Research",
    date: "2026",
    title: "Eight preprints, in the open",
    excerpt:
      "Our modelling work is documented in eight public preprints on Zenodo: timestamped, DOI-referenced and citable. Publishing the reasoning behind the engine is part of how we build credibility, in the open, against the literature.",
  },
  {
    tag: "Milestone",
    date: "2026",
    title: "SpectralFlow joins NVIDIA Inception",
    excerpt:
      "We’re now a member of NVIDIA Inception, the programme supporting deep-tech startups. It strengthens our compute and ecosystem foundation as we scale the SF-QSim engine.",
  },
  {
    tag: "Insight",
    date: "2026",
    title: "Why GPS-denied navigation is the right first vertical",
    excerpt:
      "Satellite navigation is increasingly jammed, spoofed and denied. A passive magnetic reference that emits nothing and cannot be switched off is the missing layer, and it is exactly what NV-diamond is good at.",
  },
  {
    tag: "Insight",
    date: "2026",
    title: "Designing a quantum sensor in software, first",
    excerpt:
      "Before a sensor reaches the cleanroom, it lives in SF-QSim. Simulating coherence and sensitivity across decoherence channels lets a lean team explore the design space at deep-tech speed.",
  },
];

export default function News() {
  return (
    <main>
      <PageHeader
        eyebrow="News & Insights"
        title="From the bench."
        intro="Milestones and short notes on building NV-diamond quantum sensors."
      />

      <Prose>
        <div className="flex flex-col">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="hairline py-9 grid grid-cols-1 md:grid-cols-[0.45fr_1.55fr] gap-3 md:gap-12">
                <div className="flex md:flex-col gap-3 md:gap-1.5">
                  <span className="eyebrow">{p.tag}</span>
                  <span className="figure-label" style={{ letterSpacing: "0.04em", textTransform: "none" }}>
                    {p.date}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold display mb-3" style={{ color: "var(--text-primary)" }}>
                    {p.title}
                  </h2>
                  <Body>{p.excerpt}</Body>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="hairline pt-9 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Follow the build.
              </p>
              <Body>
                We share progress and insights regularly, keeping the same cadence we keep on{" "}
                <a
                  href="https://www.linkedin.com/company/spectralflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
                . Want the behind-the-scenes?
              </Body>
            </div>
            <Link href="/contact" className="btn-ghost shrink-0">
              Get in touch <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
