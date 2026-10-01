import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "../../components/NewsCard";
import SourceNote from "../../components/SourceNote";
import GnssMap from "../../components/GnssMap";
import { Lead } from "../../components/kit";
import { BRAND, SITE_URL, getSource, type ContextSource } from "../../lib/facts";
import { POST_SLUGS, getPost, relatedPosts, type Post } from "../../lib/news";

const CONTAINER = "max-w-6xl mx-auto px-6 md:px-8";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${BRAND} · Diamond quantum sensors`,
};

export const dynamicParams = false;

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
  const url = `/news/${post.slug}`;
  return {
    // The layout appends the brand to every title: skip it when the title already opens with it.
    title: post.title.startsWith(BRAND) ? { absolute: post.title } : post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": [{ url: "/news/feed.xml", title: `${BRAND} · News` }] },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: BRAND,
      locale: "en_GB",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.tag,
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
  const url = abs(`/news/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        articleBody: post.body.join("\n\n"),
        articleSection: post.tag,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "en",
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
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "News", item: abs("/news") },
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
                href="/news"
                className="text-sm font-medium transition-colors hover:text-[color:var(--text-primary)]"
                style={{ color: "var(--muted)" }}
              >
                <span aria-hidden>← </span>All news
              </Link>
            </p>

            <p className="flex flex-wrap items-center gap-3 mb-5">
              <span className="eyebrow">{post.tag}</span>
              <span aria-hidden className="figure-label is-plain">
                ·
              </span>
              <time dateTime={post.date} className="figure-label is-plain">
                {post.dateLabel}
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
                    The figures, with their sources
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
                        <SourceNote source={s} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {post.visual === "gnss-map" && (
                <section aria-labelledby="map-heading">
                  <h2 id="map-heading" className="eyebrow mb-5">
                    Live map of likely interference
                  </h2>
                  <GnssMap />
                </section>
              )}

              {post.cta && (
                <div>
                  {external ? (
                    <a href={post.cta.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      {post.cta.label} <span aria-hidden>↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={post.cta.href} className="btn-ghost">
                      {post.cta.label} <span aria-hidden>→</span>
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
                More news
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href="/news" className="textlink">
                  All news <span>→</span>
                </Link>
                <a href="/news/feed.xml" className="textlink">
                  RSS feed <span>→</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <NewsCard key={p.slug} post={p} variant="card" headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
