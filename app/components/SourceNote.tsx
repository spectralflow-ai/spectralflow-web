import { getSource, type ContextSource } from "../lib/facts";
import { getSource as getSourceFr } from "../lib/fr/facts";

/**
 * A small source line under a quoted figure: organisation, date, title,
 * link. Pass a `source` (or its `sourceId` from facts.ts) to keep the
 * citation identical everywhere it appears, or the four fields directly.
 */
export default function SourceNote({
  source,
  sourceId,
  org,
  date,
  title,
  href,
  prefix = "Source",
  className = "",
  lang = "en",
}: {
  lang?: "en" | "fr";
  source?: ContextSource;
  sourceId?: string;
  org?: string;
  date?: string;
  title?: string;
  href?: string;
  prefix?: string;
  className?: string;
}) {
  const s = source ?? (sourceId ? (lang === "fr" ? getSourceFr : getSource)(sourceId) : undefined);
  const o = s?.org ?? org;
  const d = s?.dateLabel ?? date;
  const t = s?.title ?? title;
  const h = s?.href ?? href;
  if (!o && !t) return null;

  const label = t ? (lang === "fr" ? `« ${t} »` : `“${t}”`) : null;
  return (
    <p className={`source-note ${className}`}>
      {prefix}{lang === "fr" ? " : " : ": "}{o}
      {d && <>, {d}</>}
      {label && (
        <>
          {", "}
          {h ? (
            <a href={h} target="_blank" rel="noopener noreferrer">
              {label}
              <span aria-hidden> ↗</span>
              <span className="sr-only">{lang === "fr" ? " (s’ouvre dans un nouvel onglet)" : " (opens in a new tab)"}</span>
            </a>
          ) : (
            label
          )}
        </>
      )}
      .
    </p>
  );
}
