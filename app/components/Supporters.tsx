import Image from "next/image";
import { Strip } from "./kit";
import {
  RESEARCH_PARTNERS_LINE,
  SUPPORTER_KINDS,
  supportersByKind,
  type Supporter,
} from "../lib/supporters";

/**
 * Recognitions, memberships and selections, each labelled by the nature
 * of the relationship. Official artwork is shown unmodified where we hold
 * it (NVIDIA Inception); every other entry is text.
 *
 *   strip : one quiet band for the home page
 *   full  : labelled blocks for the Company page
 */

function Badge({ s, height }: { s: Supporter; height: number }) {
  if (!s.logo) return null;
  const width = Math.round((s.logo.width / s.logo.height) * height);
  return (
    <Image
      src={s.logo.src}
      alt={s.logo.alt}
      width={width}
      height={height}
      className="w-auto"
      style={{ height }}
      unoptimized
    />
  );
}

function StripItem({ s }: { s: Supporter }) {
  const item = s.logo ? (
    <Badge s={s} height={44} />
  ) : (
    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
      {s.statement}
    </span>
  );
  return (
    <li className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
      <span className="figure-label">{s.kind}</span>
      {s.href ? (
        <a href={s.href} target="_blank" rel="noopener noreferrer">
          {item}
        </a>
      ) : (
        item
      )}
    </li>
  );
}

export default function Supporters({
  variant = "strip",
  heading,
  id,
  className = "",
  showResearchLine,
}: {
  variant?: "strip" | "full";
  /** Eyebrow above the strip, or the block title in full. Pass null to hide it. */
  heading?: string | null;
  id?: string;
  className?: string;
  /** Print the research-partners sentence. Defaults to true in full, false in strip. */
  showResearchLine?: boolean;
}) {
  const withResearch = showResearchLine ?? variant === "full";

  if (variant === "strip") {
    const title = heading === undefined ? "Support and memberships" : heading;
    const all = SUPPORTER_KINDS.flatMap((k) => supportersByKind(k));
    return (
      <div id={id}>
        <Strip className={className}>
          {title && <p className="eyebrow mb-7 text-center">{title}</p>}
          <ul className="flex flex-wrap items-end justify-center gap-x-12 gap-y-8">
            {all.map((s) => (
              <StripItem key={s.name} s={s} />
            ))}
          </ul>
          {withResearch && (
            <p className="text-sm text-center max-w-xl mx-auto mt-8" style={{ color: "var(--muted)" }}>
              {RESEARCH_PARTNERS_LINE}
            </p>
          )}
        </Strip>
      </div>
    );
  }

  return (
    <div id={id} className={className}>
      {heading && (
        <p className="eyebrow mb-6">{heading}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUPPORTER_KINDS.map((kind) => {
          const items = supportersByKind(kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} className="card p-6 md:p-7" aria-label={kind}>
              <p className="eyebrow mb-5">{kind}</p>
              <ul className="flex flex-col gap-6">
                {items.map((s) => (
                  <li key={s.name}>
                    {s.logo && (
                      <div className="mb-3">
                        <Badge s={s} height={52} />
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
                    <p className="figure-label is-plain mt-1">
                      {s.kind === "Selected for" ? s.since : `Since ${s.since}`}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      {withResearch && (
        <p className="text-[15px] leading-7 mt-8 max-w-2xl" style={{ color: "var(--muted)" }}>
          {RESEARCH_PARTNERS_LINE}
        </p>
      )}
    </div>
  );
}
