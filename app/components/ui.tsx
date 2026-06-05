import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  bordered = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? "hairline" : ""} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <p className="eyebrow mb-3" style={muted ? { color: "var(--muted)" } : undefined}>
      {children}
    </p>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`display text-3xl md:text-4xl font-semibold tracking-tight ${className}`} style={{ color: "var(--text-primary)" }}>
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
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display text-4xl md:text-6xl font-semibold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        {intro && <div className="max-w-2xl"><Lead>{intro}</Lead></div>}
      </div>
    </div>
  );
}
