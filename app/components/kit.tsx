import type { ReactNode } from "react";

/**
 * V4 section kit — every page is composed from five section types:
 *   Prose  — wide text on porcelain
 *   Cinema — scoped dark band where the product performs
 *   Plate  — an object presented on a quiet ground
 *   Strip  — logos / stats, hairline-bounded
 *   Steps  — scroll story (see Steps.tsx, client)
 * plus the type primitives below.
 */

const CONTAINER = "max-w-6xl mx-auto px-6 md:px-8";

export function Prose({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`hairline ${className}`}>
      <div className={`${CONTAINER} py-20 md:py-28`}>{children}</div>
    </section>
  );
}

export function Cinema({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`cinema hairline ${className}`}>
      <div className={`${CONTAINER} py-20 md:py-28`}>{children}</div>
    </section>
  );
}

export function Plate({
  children,
  caption,
  className = "",
}: {
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="plate p-6 md:p-10 flex items-center justify-center">{children}</div>
      {caption && <figcaption className="figure-label mt-4">{caption}</figcaption>}
    </figure>
  );
}

export function Strip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`hairline ${className}`}>
      <div className={`${CONTAINER} py-10`}>{children}</div>
    </section>
  );
}

/* ----- Type primitives --------------------------------------- */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow mb-3 ${className}`}>{children}</p>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`display text-3xl md:text-[2.6rem] font-semibold tracking-tight ${className}`}
      style={{ color: "var(--text-primary)" }}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-lg leading-relaxed ${className}`} style={{ color: "var(--text-secondary)" }}>
      {children}
    </p>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[15px] leading-7 ${className}`} style={{ color: "var(--muted)" }}>
      {children}
    </p>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{children}</strong>;
}

/** Page header band for inner routes. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="hairline">
      <div className={`${CONTAINER} pt-20 md:pt-28 pb-16`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="display text-4xl md:text-6xl font-semibold tracking-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>
        {intro && (
          <div className="max-w-2xl">
            <Lead>{intro}</Lead>
          </div>
        )}
      </div>
    </div>
  );
}
