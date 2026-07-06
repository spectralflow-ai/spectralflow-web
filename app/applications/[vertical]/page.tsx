import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { Prose, Plate, Eyebrow, H2, Lead, Body, PageHeader } from "../../components/kit";
import VerticalGlyph from "../../components/VerticalGlyph";
import {
  VERTICAL_SLUGS,
  VERTICALS_ORDERED,
  getVertical,
} from "../../lib/verticals";

const GLYPH_CAPTION: Record<string, string> = {
  navigation: "Matching a magnetometer reading to the magnetic map to hold a true heading.",
  "life-sciences": "One NV sensor, two reads: a molecule at the diamond surface, and radical noise inside a cell.",
  semiconductors: "An NV sensor images the magnetic field of a buried current path, non-destructively.",
  "quantum-computing": "An NV electron spin coupled to a neighbouring nuclear spin: a room-temperature register.",
};

export function generateStaticParams() {
  return VERTICAL_SLUGS.map((vertical) => ({ vertical }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) return {};
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: `/applications/${v.slug}` },
    openGraph: {
      title: `${v.metaTitle} · SpectralFlow`,
      description: v.metaDescription,
      url: `/applications/${v.slug}`,
      type: "article",
    },
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) notFound();

  const others = VERTICALS_ORDERED.filter((o) => o.slug !== v.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader eyebrow={v.eyebrow} title={v.title} intro={v.intro} />

      {/* Beat 1 : teach the domain, with the signature engraving under it */}
      <Prose>
        <Reveal>
          <Eyebrow>{v.teach.eyebrow}</Eyebrow>
          <H2 className="max-w-3xl mb-6">{v.teach.h}</H2>
          <Lead className="max-w-3xl mb-5">{v.teach.lead}</Lead>
          <Body className="max-w-3xl">{v.teach.body}</Body>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 max-w-3xl">
            <Plate caption={GLYPH_CAPTION[v.slug]}>
              <VerticalGlyph slug={v.slug} />
            </Plate>
          </div>
        </Reveal>
      </Prose>

      {/* Beat 2 : why NV-diamond */}
      <Prose>
        <Reveal>
          <Eyebrow>{v.whyNV.eyebrow}</Eyebrow>
          <H2 className="max-w-3xl mb-12">{v.whyNV.h}</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {v.whyNV.points.map((c, i) => (
            <Reveal key={c.h} delay={i * 80}>
              <div className="hairline pt-6 h-full">
                <p className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.h}
                </p>
                <Body>{c.p}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* Beat 3 : our approach (allusive) */}
      <Prose>
        <Reveal>
          <Eyebrow>{v.approach.eyebrow}</Eyebrow>
          <H2 className="max-w-3xl mb-6">{v.approach.h}</H2>
          <Lead className="max-w-3xl">{v.approach.body}</Lead>
        </Reveal>
      </Prose>

      {/* Beat 4 : proof / tools (optional) */}
      {v.proof && (
        <Prose>
          <Reveal>
            <Eyebrow>{v.proof.eyebrow}</Eyebrow>
            <H2 className="max-w-3xl mb-6">{v.proof.h}</H2>
            <Lead className="max-w-3xl mb-8">{v.proof.body}</Lead>
            {v.proof.cta && (
              <Link href={v.proof.cta.href} className="btn-primary">
                {v.proof.cta.label} <span>→</span>
              </Link>
            )}
          </Reveal>
        </Prose>
      )}

      {/* FAQ : pedagogy + AI-citability */}
      <Prose>
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <H2 className="max-w-3xl mb-12">The basics, answered.</H2>
        </Reveal>
        <div className="flex flex-col">
          {v.faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div className="hairline py-8 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-3 md:gap-12">
                <h3 className="text-lg font-semibold display" style={{ color: "var(--text-primary)" }}>
                  {f.q}
                </h3>
                <Body>{f.a}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* Beat 5 : CTA */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">{v.cta.h}</H2>
          <Lead className="max-w-2xl mb-9">{v.cta.body}</Lead>
          <Link href="/contact" className="btn-primary">
            Get in touch <span>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* Cross-links to other verticals (internal linking) */}
      <Prose>
        <Reveal>
          <Eyebrow>The platform goes further</Eyebrow>
          <H2 className="max-w-3xl mb-10">One core, other worlds.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 70}>
              <Link
                href={`/applications/${o.slug}`}
                className="card p-6 h-full flex flex-col gap-2 group"
              >
                <p className="eyebrow">{o.navLabel}</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {o.tagline}
                </p>
                <span className="textlink mt-auto pt-3">
                  Explore <span>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Prose>
    </main>
  );
}
