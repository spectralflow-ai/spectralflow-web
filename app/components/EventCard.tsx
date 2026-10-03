import Link from "next/link";
import LogoMark from "./LogoMark";
import type { EventRole, SiteEvent } from "../lib/events";

/** Our role at the event, in French. */
const ROLE_FR: Record<EventRole, string> = {
  Pitching: "Présentation",
  Speaking: "Intervention",
  Attending: "Participation",
  Exhibiting: "Exposant",
};

/**
 * One event: dates, place, our role, a short line and the ask.
 * Pass `today` (ISO yyyy-mm-dd) to mark past events as such.
 */
export default function EventCard({
  event,
  today,
  headingLevel = 3,
  contactHref = "/contact",
  lang = "en",
  className = "",
}: {
  event: SiteEvent;
  today?: string;
  headingLevel?: 2 | 3;
  /** Where the ask points. */
  contactHref?: string;
  lang?: "en" | "fr";
  className?: string;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const past = today ? event.end < today : false;

  return (
    <article className={`card p-6 md:p-7 h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="figure-label is-plain">
          <time dateTime={event.start}>{event.dateLabel}</time>
        </p>
        <span className="pill">{lang === "fr" ? (past ? "Passé" : ROLE_FR[event.role]) : past ? "Past" : event.role}</span>
      </div>

      {event.logo && (
        <div className="mt-5 h-11 flex items-center">
          <LogoMark logo={event.logo} height={40} maxWidth={150} />
        </div>
      )}

      <H className="text-lg font-semibold display mt-4" style={{ color: "var(--text-primary)" }}>
        {event.name}
      </H>
      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
        {event.city}, {event.venue}
      </p>

      <p className="text-[15px] leading-7 mt-4 flex-1" style={{ color: "var(--muted)" }}>
        {event.blurb}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {!past && event.ask && (
          <Link href={contactHref} className="textlink">
            {event.ask} <span aria-hidden>→</span>
          </Link>
        )}
        {event.href && (
          <a
            href={event.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
          >
            {lang === "fr" ? "Page de l’événement" : "Event page"} <span aria-hidden>↗</span>
            <span className="sr-only">{lang === "fr" ? " (s’ouvre dans un nouvel onglet)" : " (opens in a new tab)"}</span>
          </a>
        )}
      </div>
    </article>
  );
}
