import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { Section, Eyebrow, H2, Body, PageHeader } from "../components/ui";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Behind the scenes at SpectralFlow — milestones and insights on NV-diamond quantum sensing and GPS-denied navigation.",
};

/**
 * Editorial entries. Keep these qualitative and confirmed — no unverified
 * specs, clients, financials or pipeline names (see REDESIGN_BRIEF.md).
 */
const POSTS = [
  {
    tag: "Milestone",
    date: "2026",
    title: "SpectralFlow joins NVIDIA Inception",
    excerpt:
      "We&rsquo;re now a member of NVIDIA Inception, the programme supporting deep-tech startups — a step that strengthens our compute and ecosystem foundation as we scale the SF-QSim engine.",
  },
  {
    tag: "Insight",
    date: "2026",
    title: "Why GPS-denied navigation is the right first vertical",
    excerpt:
      "Satellite navigation is increasingly jammed, spoofed and denied. A passive magnetic reference that emits nothing and cannot be switched off is the missing layer — and it is exactly what NV-diamond is good at.",
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
        intro="Milestones and short notes on building NV-diamond quantum sensors — the same cadence we keep on LinkedIn."
      />

      <Section bordered>
        <div className="flex flex-col gap-4">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card p-7 md:p-9 grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] gap-4 md:gap-12">
                <div className="flex md:flex-col gap-3 md:gap-2">
                  <span className="eyebrow">{p.tag}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{p.date}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold display mb-3" style={{ color: "var(--text-primary)" }}>
                    {p.title}
                  </h2>
                  <Body>
                    <span dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                  </Body>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="card p-8 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Follow the build.</p>
              <Body>We share progress and insights regularly. Want the behind-the-scenes?</Body>
            </div>
            <Link href="/contact" className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg shrink-0">
              Get in touch →
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
