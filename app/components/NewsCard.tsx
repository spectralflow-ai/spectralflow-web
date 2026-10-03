import Link from "next/link";
import type { Post, PostTag } from "../lib/news";

/** The kind of entry, in French (the English tag stays the key). */
const TAG_FR: Record<PostTag, string> = {
  Milestone: "Étape",
  Research: "Recherche",
  Insight: "Analyse",
  Event: "Événement",
};

/**
 * One news entry, linking to its article.
 *   card : boxed, for grids (home teaser, related posts)
 *   row  : hairline row, for the news index
 */
export default function NewsCard({
  post,
  variant = "card",
  headingLevel = 3,
  className = "",
  lang = "en",
}: {
  lang?: "en" | "fr";
  post: Post;
  variant?: "card" | "row";
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const fr = lang === "fr";
  const href = `${fr ? "/fr" : ""}/news/${post.slug}`;
  const read = fr ? "Lire" : "Read";
  const tag = fr ? TAG_FR[post.tag] : post.tag;

  const meta = (
    <p className="flex items-center gap-3">
      <span className="eyebrow" style={{ marginBottom: 0 }}>
        {tag}
      </span>
      <time dateTime={post.date} className="figure-label is-plain">
        {post.dateLabel}
      </time>
    </p>
  );

  if (variant === "row") {
    return (
      <article className={`hairline py-9 grid grid-cols-1 md:grid-cols-[0.45fr_1.55fr] gap-3 md:gap-12 ${className}`}>
        <div className="flex md:flex-col gap-3 md:gap-1.5">
          <span className="eyebrow">{tag}</span>
          <time dateTime={post.date} className="figure-label is-plain">
            {post.dateLabel}
          </time>
        </div>
        <div>
          <H className="text-xl font-semibold display mb-3">
            <Link
              href={href}
              className="transition-colors hover:text-[color:var(--accent)]"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </Link>
          </H>
          <p className="text-[15px] leading-7" style={{ color: "var(--muted)" }}>
            {post.excerpt}
          </p>
          <Link href={href} className="textlink mt-3" aria-label={`${read}${fr ? " : " : ": "}${post.title}`}>
            {read} <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className={`card relative p-6 md:p-7 h-full flex flex-col ${className}`}>
      {meta}
      <H className="text-lg font-semibold display mt-4 mb-3" style={{ color: "var(--text-primary)" }}>
        {/* The title link covers the whole card. */}
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </H>
      <p className="text-[15px] leading-7 flex-1" style={{ color: "var(--muted)" }}>
        {post.excerpt}
      </p>
      <span className="textlink mt-5" aria-hidden>
        {read} <span>→</span>
      </span>
    </article>
  );
}
