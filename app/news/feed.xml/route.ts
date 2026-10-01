import { BRAND, LEGAL_NAME, SITE_URL, getSource, type ContextSource } from "../../lib/facts";
import { POSTS, type Post } from "../../lib/news";

// RSS 2.0 feed of the news, served at /news/feed.xml. Built from the same
// source as the pages.
export const dynamic = "force-static";

const FEED_URL = `${SITE_URL}/news/feed.xml`;
const NEWS_URL = `${SITE_URL}/news`;

/** Escape text for XML element content and attributes. */
const xml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Escape text for HTML inside CDATA (apostrophes stay as typed). */
const html = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RFC 822 date at noon UTC, so the calendar day is the same in every time zone of Europe. */
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);

/** Full text of a post as HTML, for content:encoded, in the order of the page. */
function contentHtml(post: Post): string {
  const parts: string[] = [];

  for (const para of post.body) parts.push(`<p>${html(para)}</p>`);

  const sources = (post.sources ?? [])
    .map((id) => getSource(id))
    .filter((s): s is ContextSource => Boolean(s));
  for (const s of sources) {
    parts.push(
      `<p><strong>${html(s.figure)}</strong><br/>Source: ${html(s.org)}, ${html(s.dateLabel)}, <a href="${html(
        s.href
      )}">${html(s.title)}</a>.</p>`
    );
  }

  if (post.visual === "gnss-map") {
    parts.push(
      `<p><a href="${html(abs(`/news/${post.slug}`))}">The article page includes a live map of likely GNSS interference (GPSJAM, by John Wiseman).</a></p>`
    );
  }
  if (post.cta) {
    parts.push(`<p><a href="${html(abs(post.cta.href))}">${html(post.cta.label)}</a></p>`);
  }

  // CDATA cannot contain its own terminator.
  return parts.join("\n").replace(/]]>/g, "]]&gt;");
}

function item(post: Post): string {
  const url = `${SITE_URL}/news/${post.slug}`;
  return [
    "    <item>",
    `      <title>${xml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${rfc822(post.date)}</pubDate>`,
    `      <category>${xml(post.tag)}</category>`,
    `      <description>${xml(post.excerpt)}</description>`,
    `      <content:encoded><![CDATA[${contentHtml(post)}]]></content:encoded>`,
    "    </item>",
  ].join("\n");
}

export function GET() {
  // The feed changes when a post is published or updated, not at each build.
  const lastBuild = POSTS.reduce((m, p) => {
    const d = p.updated && p.updated > p.date ? p.updated : p.date;
    return d > m ? d : m;
  }, POSTS[0]?.date ?? "2026-01-01");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xml(`${BRAND} · News`)}</title>
    <link>${NEWS_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
    <description>${xml(
      `Milestones, events and insights from ${BRAND}: diamond quantum sensors, and navigation you can trust without GPS.`
    )}</description>
    <language>en-gb</language>
    <copyright>${xml(`© ${LEGAL_NAME}`)}</copyright>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${POSTS.map(item).join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
