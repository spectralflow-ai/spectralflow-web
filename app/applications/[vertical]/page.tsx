import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { Prose, Plate, Strip, Eyebrow, H2, Lead, Body, Strong, PageHeader } from "../../components/kit";
import VerticalGlyph from "../../components/VerticalGlyph";
import VerticalIcon from "../../components/VerticalIcon";
import {
  ADJACENT_VERTICALS,
  VERTICALS_ORDERED,
  getVertical,
  verticalHref,
} from "../../lib/verticals";
import { BRAND, SITE_URL } from "../../lib/facts";

/**
 * Navigation has a static route of its own (app/applications/navigation),
 * so only the other applications are generated here, and any other slug
 * is a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ADJACENT_VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) return {};
  const url = verticalHref(v.slug);
  const shareTitle = `${v.metaTitle} · ${BRAND}`;
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description: v.metaDescription,
      url,
      siteName: BRAND,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: v.metaDescription,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE_URL}/applications` },
      { "@type": "ListItem", position: 3, name: v.navLabel, item: `${SITE_URL}${verticalHref(v.slug)}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader eyebrow={v.eyebrow} title={v.title} intro={v.intro} />

      {/* Where this application stands, before anything else */}
      <Strip>
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
          <p className="figure-label shrink-0">Where we stand</p>
          <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
            <Strong>{v.horizon.label}.</Strong> {v.horizon.note}
          </p>
        </div>
      </Strip>

      {/* The domain, with its engraving */}
      <Prose>
        <Reveal>
          <Eyebrow>{v.teach.eyebrow}</Eyebrow>
          <H2 className="max-w-3xl mb-6">{v.teach.h}</H2>
          <Lead className="max-w-3xl mb-5">{v.teach.lead}</Lead>
          <Body className="max-w-3xl">{v.teach.body}</Body>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 max-w-3xl">
            <Plate caption={v.glyphCaption}>
              <VerticalGlyph slug={v.slug} />
            </Plate>
          </div>
        </Reveal>
      </Prose>

      {/* Why NV centres in diamond */}
      <Prose>
        <Reveal>
          <Eyebrow>{v.whyNV.eyebrow}</Eyebrow>
          <H2 className="max-w-3xl mb-12">{v.whyNV.h}</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {v.whyNV.points.map((c, i) => (
            <Reveal key={c.h} delay={i * 80}>
              <div className="hairline pt-6 h-full">
                <h3 className="font-semibold mb-2.5" style={{ color: "var(--text-primary)" }}>
                  {c.h}
                </h3>
                <Body>{c.p}</Body>
              </div>
            </Reveal>
          ))}
        </div>
      </Prose>

      {/* What carries over, and how the work would be done */}
      <Prose>
        {v.proof ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            <Reveal>
              <Eyebrow>{v.approach.eyebrow}</Eyebrow>
              <H2 className="mb-6">{v.approach.h}</H2>
              <Lead>{v.approach.body}</Lead>
            </Reveal>
            <Reveal delay={100}>
              <div className="card p-6 md:p-8 flex flex-col gap-3">
                <p className="figure-label">{v.proof.eyebrow}</p>
                <h3
                  className="display text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.proof.h}
                </h3>
                <Body>{v.proof.body}</Body>
                {v.proof.cta && (
                  <Link href={v.proof.cta.href} className="textlink pt-1">
                    {v.proof.cta.label} <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
            <Reveal>
              <Eyebrow>{v.approach.eyebrow}</Eyebrow>
              <H2>{v.approach.h}</H2>
            </Reveal>
            <Reveal delay={100}>
              <Lead>{v.approach.body}</Lead>
            </Reveal>
          </div>
        )}
      </Prose>

      {/* Questions, also published as FAQPage data */}
      <Prose id="faq">
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

      {/* Call to action */}
      <Prose>
        <Reveal>
          <H2 className="max-w-2xl mb-6">{v.cta.h}</H2>
          <Lead className="max-w-2xl mb-9">{v.cta.body}</Lead>
          <Link href="/contact" className="btn-primary">
            Get in touch <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Prose>

      {/* The other applications of the same platform */}
      <Prose>
        <Reveal>
          <Eyebrow>One diamond platform</Eyebrow>
          <H2 className="max-w-3xl mb-10">Other applications of the same diamond.</H2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 70} className="h-full">
              <Link
                href={verticalHref(o.slug)}
                className="card p-6 h-full flex flex-col gap-2.5 group"
              >
                <div className="flex items-center gap-2.5">
                  <VerticalIcon slug={o.slug} />
                  <h3 className="eyebrow">{o.navLabel}</h3>
                </div>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {o.tagline}
                </p>
                <p className="figure-label mt-auto pt-3">{o.horizon.label}</p>
                <span className="textlink" style={{ color: "var(--text-primary)" }}>
                  Explore <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10">
            <Link href="/applications" className="textlink">
              All applications <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Prose>
    </main>
  );
}
