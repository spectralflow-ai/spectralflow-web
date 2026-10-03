// fr-source: app/news/[slug]/page.tsx sha256:2ff931ffd2c17731
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "../../../components/NewsCard";
import SourceNote from "../../../components/SourceNote";
import GnssMap from "../../../components/GnssMap";
import { Lead } from "../../../components/kit";
import { BRAND, SITE_URL } from "../../../lib/facts";
import { getSource, type ContextSource } from "../../../lib/fr/facts";
import { POST_SLUGS } from "../../../lib/news";
import { getPost, relatedPosts, type Post, type PostTag } from "../../../lib/fr/news";
import { frHref } from "../../../lib/i18n";

const CONTAINER = "max-w-6xl mx-auto px-6 md:px-8";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${BRAND} · Capteurs quantiques à diamant`,
};

/** The tag of one entry, as printed. */
const TAG_FR: Record<PostTag, string> = {
  Milestone: "Étape",
  Event: "Événement",
  Research: "Recherche",
  Insight: "Analyse",
};

/* Month names, so that a date label reads in French whatever the data says. */
const MOIS: Record<string, string> = {
  January: "janvier",
  February: "février",
  March: "mars",
  April: "avril",
  May: "mai",
  June: "juin",
  July: "juillet",
  August: "août",
  September: "septembre",
  October: "octobre",
  November: "novembre",
  December: "décembre",
};

/** "October 2026" becomes "octobre 2026"; a label already in French is returned as is. */
const moisFr = (label: string) => label.replace(/\b[A-Z][a-z]+\b/g, (m) => MOIS[m] ?? m);

export const dynamicParams = false;

/** The slugs are the English ones: one French article per English article. */
export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/fr/news/${post.slug}`;
  return {
    // The layout appends the brand to every title: skip it when the title already opens with it.
    title: post.title.startsWith(BRAND) ? { absolute: post.title } : post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: { en: `/news/${post.slug}`, fr: url },
      types: {
        "application/rss+xml": [{ url: "/news/feed.xml", title: `${BRAND} · Actualités (en anglais)` }],
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: BRAND,
      locale: "fr_FR",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: TAG_FR[post.tag],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [OG_IMAGE.url],
    },
  };
}

/** Absolute URL for JSON-LD. */
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** JSON for a script tag: no "<" can close the tag early. */
const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

function articleJsonLd(post: Post) {
  const url = abs(`/fr/news/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        articleBody: post.body.join("\n\n"),
        articleSection: TAG_FR[post.tag],
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "fr",
        url,
        mainEntityOfPage: url,
        image: [abs(OG_IMAGE.url)],
        author: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: BRAND, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#org`,
          name: BRAND,
          logo: { "@type": "ImageObject", url: abs("/icon.svg") },
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: abs("/fr") },
          { "@type": "ListItem", position: 2, name: "Actualités", item: abs("/fr/news") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sources = (post.sources ?? [])
    .map((id) => getSource(id))
    .filter((s): s is ContextSource => Boolean(s));
  const related = relatedPosts(post.slug, 3);
  const external = post.cta?.href.startsWith("http");
  // Internal links go to the French page when there is one; the others stay in English.
  const ctaHref = post.cta ? frHref(post.cta.href) : "";
  const ctaInEnglish = !external && !ctaHref.startsWith("/fr");
  // Said once: aloud on the Instrument (as the style guide asks), to screen readers elsewhere.
  const ctaSaysEnglish = /anglais/i.test(post.cta?.label ?? "");
  const ctaInstrument = ctaHref.startsWith("/instrument") && !ctaSaysEnglish;
  const ctaEnglishHint = ctaInEnglish && !ctaSaysEnglish && !ctaHref.startsWith("/instrument");
  // The first paragraph is the standfirst; the excerpt is kept for cards, metadata and the feed.
  const [lead, ...rest] = post.body;
  const hasBody = rest.length > 0 || sources.length > 0 || post.visual === "gnss-map" || Boolean(post.cta);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(articleJsonLd(post)) }} />

      <article>
        {/* Header: back link, tag and date, title, standfirst */}
        <header className="hairline">
          <div className={`${CONTAINER} pt-16 md:pt-24 pb-12 md:pb-16`}>
            <p className="mb-10">
              <Link
                href="/fr/news"
                className="text-sm font-medium transition-colors hover:text-[color:var(--text-primary)]"
                style={{ color: "var(--muted)" }}
              >
                <span aria-hidden>← </span>Toutes les actualités
              </Link>
            </p>

            <p className="flex flex-wrap items-center gap-3 mb-5">
              <span className="eyebrow">{TAG_FR[post.tag]}</span>
              <span aria-hidden className="figure-label is-plain">
                ·
              </span>
              <time dateTime={post.date} className="figure-label is-plain">
                {moisFr(post.dateLabel)}
              </time>
            </p>

            <h1
              className="display text-[2.1rem] md:text-[3.25rem] font-semibold tracking-tight max-w-4xl mb-7"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h1>

            {lead && (
              <div className="max-w-2xl">
                <Lead>{lead}</Lead>
              </div>
            )}
          </div>
        </header>

        {/* Body, then the figures it introduces, then the map */}
        {hasBody && (
          <div className="hairline">
            <div className={`${CONTAINER} py-14 md:py-20 flex flex-col gap-14 md:gap-16`}>
              {rest.length > 0 && (
                <div className="max-w-2xl">
                  {rest.map((para, i) => (
                    <p
                      key={i}
                      className="text-[17px] leading-8 mb-6 last:mb-0"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {sources.length > 0 && (
                <section aria-labelledby="figures-heading">
                  <h2 id="figures-heading" className="eyebrow mb-6">
                    Les chiffres, avec leurs sources
                  </h2>
                  <ul
                    className={`grid grid-cols-1 gap-4 md:gap-5 ${
                      sources.length === 2 || sources.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"
                    }`}
                  >
                    {sources.map((s) => (
                      <li key={s.id} className="card p-6 md:p-7 flex flex-col justify-between gap-5">
                        <p
                          className="text-lg leading-snug font-semibold tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.figure}
                        </p>
                        <SourceNote source={s} lang="fr" />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {post.visual === "gnss-map" && (
                <section aria-labelledby="map-heading">
                  <h2 id="map-heading" className="eyebrow mb-5">
                    Carte en direct des interférences probables
                  </h2>
                  <GnssMap locale="fr" />
                </section>
              )}

              {post.cta && (
                <div>
                  {external ? (
                    <a href={post.cta.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      {post.cta.label} <span aria-hidden>↗</span>
                      <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                    </a>
                  ) : (
                    <Link
                      href={ctaHref}
                      hrefLang={ctaInEnglish ? "en" : undefined}
                      className="btn-ghost"
                    >
                      {post.cta.label}
                      {ctaInstrument && " (en anglais)"}
                      {ctaEnglishHint && <span className="sr-only"> (en anglais)</span>}{" "}
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="hairline">
          <div className={`${CONTAINER} py-16 md:py-24`}>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2
                id="related-heading"
                className="display text-2xl md:text-3xl font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Autres actualités
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href="/fr/news" className="textlink">
                  Toutes les actualités <span>→</span>
                </Link>
                <a href="/news/feed.xml" hrefLang="en" className="textlink">
                  Flux RSS<span className="sr-only"> (en anglais)</span> <span>→</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <NewsCard key={p.slug} post={p} variant="card" headingLevel={3} lang="fr" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
