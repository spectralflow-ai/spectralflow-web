import type { Metadata } from "next";
import Link from "next/link";
import NewsCard from "../components/NewsCard";
import { Prose, Body, PageHeader } from "../components/kit";
import { BRAND, LINKEDIN_URL } from "../lib/facts";
import { POSTS, POST_TAGS, getPost, type Post, type PostTag } from "../lib/news";

const DESCRIPTION =
  "Milestones, events and insights from Spectral Flow: diamond quantum sensors, and navigation you can trust without GPS.";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${BRAND} · Diamond quantum sensors`,
};

export const metadata: Metadata = {
  title: "News",
  description: DESCRIPTION,
  alternates: {
    canonical: "/news",
    types: { "application/rss+xml": [{ url: "/news/feed.xml", title: `${BRAND} · News` }] },
  },
  openGraph: {
    title: `News · ${BRAND}`,
    description: DESCRIPTION,
    url: "/news",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `News · ${BRAND}`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const TAG_LABEL: Record<PostTag, string> = {
  Milestone: "Milestones",
  Event: "Events",
  Research: "Research",
  Insight: "Insights",
};

/* Featured entries, shown as cards above the full list. */
const FEATURED_SLUGS = ["first-mobile-prototype-designed", "contested-satellite-navigation"];
const FEATURED = FEATURED_SLUGS.map((slug) => getPost(slug)).filter((p): p is Post => Boolean(p));

/* The full list, grouped by month. POSTS is sorted newest first, so each
   month's entries are contiguous. */
type Month = { key: string; label: string; posts: Post[]; tags: PostTag[] };
const MONTHS: Month[] = POSTS.reduce<Month[]>((acc, p) => {
  const key = p.date.slice(0, 7);
  const last = acc[acc.length - 1];
  if (last && last.key === key) {
    last.posts.push(p);
    if (!last.tags.includes(p.tag)) last.tags.push(p.tag);
  } else {
    acc.push({ key, label: p.dateLabel, posts: [p], tags: [p.tag] });
  }
  return acc;
}, []);

/* Tag filter: radio inputs and CSS only, so the page stays static and
   works without JavaScript. Without :has() support, every post shows.
   A month with no entry of the chosen tag is hidden with its heading. */
const FILTER_ID = (t: string) => `news-tag-${t.toLowerCase()}`;
const TAGS_IN_USE = POST_TAGS.filter((t) => POSTS.some((p) => p.tag === t));

const FILTER_CSS = [
  `.news-filter label { border: 1px solid var(--border); background: var(--surface); color: var(--text-secondary); }`,
  `.news-filter label:hover { border-color: var(--border-strong); color: var(--text-primary); }`,
  `.news-filter input:checked + label { background: var(--text-primary); border-color: var(--text-primary); color: var(--background); }`,
  `.news-filter input:focus-visible + label { outline: 2px solid var(--accent); outline-offset: 2px; }`,
  `.news-filter .news-count { color: var(--muted); }`,
  `.news-filter input:checked + label .news-count { color: inherit; opacity: 0.7; }`,
  ...TAGS_IN_USE.flatMap((t) => [
    `.news-index:has(#${FILTER_ID(t)}:checked) [data-tag]:not([data-tag="${t}"]) { display: none; }`,
    `.news-index:has(#${FILTER_ID(t)}:checked) [data-tags]:not([data-tags~="${t}"]) { display: none; }`,
  ]),
].join("\n");

export default function News() {
  const options: { id: string; label: string; count: number }[] = [
    { id: FILTER_ID("all"), label: "All", count: POSTS.length },
    ...TAGS_IN_USE.map((t) => ({
      id: FILTER_ID(t),
      label: TAG_LABEL[t],
      count: POSTS.filter((p) => p.tag === t).length,
    })),
  ];

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: FILTER_CSS }} />

      <PageHeader
        eyebrow="Resources"
        title="News and insights."
        intro="Milestones, events and insights from our work on diamond quantum sensors. Each entry states the facts as of its date."
      />

      <Prose className="news-index">
        {FEATURED.length > 0 && (
          <div className="mb-16 md:mb-20">
            <h2 className="eyebrow mb-5">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FEATURED.map((p) => (
                <NewsCard key={p.slug} post={p} variant="card" headingLevel={3} />
              ))}
            </div>
          </div>
        )}

        <fieldset className="news-filter mb-6">
          <legend className="eyebrow">Show</legend>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            {options.map((o, i) => (
              <span key={o.id} className="inline-flex">
                <input
                  type="radio"
                  name="news-tag"
                  id={o.id}
                  className="sr-only"
                  defaultChecked={i === 0}
                />
                <label
                  htmlFor={o.id}
                  className="cursor-pointer select-none rounded-full px-4 py-1.5 text-[0.8rem] font-medium transition-colors"
                >
                  {o.label}
                  <span className="news-count ml-1.5">{o.count}</span>
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        <div>
          {MONTHS.map((m) => (
            <div key={m.key} data-tags={m.tags.join(" ")} className="pt-10">
              <h2 className="eyebrow mb-1">
                <time dateTime={m.key}>{m.label}</time>
              </h2>
              {m.posts.map((p) => (
                <div key={p.slug} data-tag={p.tag}>
                  <NewsCard post={p} variant="row" headingLevel={3} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="hairline pt-9 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>
              Follow our work.
            </h2>
            <Body>
              New entries also go to our{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[color:var(--text-primary)] transition-colors"
              >
                LinkedIn page
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              and to the{" "}
              <a
                href="/news/feed.xml"
                className="underline underline-offset-2 hover:text-[color:var(--text-primary)] transition-colors"
              >
                RSS feed
              </a>
              . Journalists will find facts, texts and logos in the press kit.
            </Body>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 shrink-0">
            <Link href="/events" className="textlink">
              Where to meet us <span>→</span>
            </Link>
            <Link href="/press" className="textlink">
              Press kit <span>→</span>
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in touch <span>→</span>
            </Link>
          </div>
        </div>
      </Prose>
    </main>
  );
}
