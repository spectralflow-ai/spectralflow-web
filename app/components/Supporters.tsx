import { Strip } from "./kit";
import LogoMark from "./LogoMark";
import {
  RESEARCH_PARTNERS_LINE,
  SUPPORTER_KINDS,
  sinceLine,
  supportersByKind,
  type Supporter,
} from "../lib/supporters";
import {
  RESEARCH_PARTNERS_LINE as RESEARCH_PARTNERS_LINE_FR,
  supportersByKind as supportersByKindFr,
} from "../lib/fr/supporters";
import type { SupporterKind } from "../lib/supporters";

/** The nature of each relationship, in French (the English kind stays the key). */
const KIND_FR: Record<SupporterKind, string> = {
  Recognised: "Qualification",
  "Pre-incubated at": "Pré-incubation",
  "Member of": "Adhésion",
  "Selected for": "Sélection",
};
const kindLabel = (k: SupporterKind, lang: "en" | "fr") => (lang === "fr" ? KIND_FR[k] : k);

/**
 * Recognitions, memberships and selections, each labelled by the nature
 * of the relationship, each with its logo.
 *
 *   strip : one quiet band for the home page
 *   full  : labelled blocks for the Company page
 */

function StripItem({ s, lang }: { s: Supporter; lang: "en" | "fr" }) {
  const item = s.logo ? (
    <LogoMark logo={s.logo} height={36} maxWidth={150} />
  ) : (
    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
      {s.statement}
    </span>
  );
  return (
    <li className="flex flex-col items-center gap-3 text-center">
      <span className="figure-label">{kindLabel(s.kind, lang)}</span>
      <div className="h-10 flex items-center" title={s.statement}>
        {s.href ? (
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.statement}>
            {item}
          </a>
        ) : (
          item
        )}
      </div>
    </li>
  );
}

export default function Supporters({
  variant = "strip",
  heading,
  id,
  className = "",
  showResearchLine,
  lang = "en",
}: {
  lang?: "en" | "fr";
  variant?: "strip" | "full";
  /** Eyebrow above the strip, or the block title in full. Pass null to hide it. */
  heading?: string | null;
  id?: string;
  className?: string;
  /** Print the research-partners sentence. Defaults to true in full, false in strip. */
  showResearchLine?: boolean;
}) {
  const withResearch = showResearchLine ?? variant === "full";
  const byKind = lang === "fr" ? supportersByKindFr : supportersByKind;
  const researchLine = lang === "fr" ? RESEARCH_PARTNERS_LINE_FR : RESEARCH_PARTNERS_LINE;

  if (variant === "strip") {
    const title =
      heading === undefined
        ? lang === "fr"
          ? "Reconnaissances, adhésions et sélections"
          : "Recognitions, memberships and selections"
        : heading;
    const all = SUPPORTER_KINDS.flatMap((k) => byKind(k));
    return (
      <div id={id}>
        <Strip className={className}>
          {title && <h2 className="eyebrow mb-8 text-center">{title}</h2>}
          <ul className="flex flex-wrap items-start justify-center gap-x-14 gap-y-9">
            {all.map((s) => (
              <StripItem lang={lang} key={s.name} s={s} />
            ))}
          </ul>
          {withResearch && (
            <p className="text-sm text-center max-w-xl mx-auto mt-9" style={{ color: "var(--muted)" }}>
              {researchLine}
            </p>
          )}
        </Strip>
      </div>
    );
  }

  return (
    <div id={id} className={className}>
      {heading && <p className="eyebrow mb-6">{heading}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {SUPPORTER_KINDS.map((kind) => {
          const items = byKind(kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} className="card p-6 md:p-7" aria-label={kindLabel(kind, lang)}>
              <p className="eyebrow mb-5">{kindLabel(kind, lang)}</p>
              <ul className="flex flex-col gap-7">
                {items.map((s) => {
                  const since = sinceLine(s);
                  return (
                    <li key={s.name}>
                      {s.logo && (
                        <div className="mb-3 h-11 flex items-center">
                          <LogoMark logo={s.logo} height={40} maxWidth={170} />
                        </div>
                      )}
                      <p className="text-[15px] leading-6 font-medium" style={{ color: "var(--text-primary)" }}>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {s.statement}
                          </a>
                        ) : (
                          s.statement
                        )}
                      </p>
                      {since && <p className="figure-label is-plain mt-1">{since}</p>}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
      {withResearch && (
        <p className="text-[15px] leading-7 mt-8 max-w-2xl" style={{ color: "var(--muted)" }}>
          {researchLine}
        </p>
      )}
    </div>
  );
}
