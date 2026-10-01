"use client";

import { useEffect, useRef } from "react";

/**
 * The error bound, as a quiet illustration (not data).
 *
 * One vehicle follows a path. Two position estimates travel with it:
 *   - "everyone else": a point, with nothing to say how far it has drifted;
 *   - ours: a point at the centre of a dashed disc, the bound, that widens
 *     as confidence fades and tightens at each magnetic fix. The true
 *     position always stays inside the disc.
 *
 * Reduced motion, or no JavaScript, shows one fixed, representative frame.
 * Works on porcelain and inside a cinema band (reads the colour tokens).
 */

// The drawing lives in y 55..255 of a 640-wide frame.
const VIEWBOX = "0 55 640 200";
const LOOP_MS = 8000;
const STATIC_T = 0.72;
const FIXES_PER_LOOP = 4;
const TRAIL = 48;

// The path: one cubic Bezier across the frame.
const P0 = { x: 40, y: 220 };
const P1 = { x: 210, y: 40 };
const P2 = { x: 400, y: 290 };
const P3 = { x: 600, y: 96 };
const PATH_D = `M${P0.x} ${P0.y} C${P1.x} ${P1.y} ${P2.x} ${P2.y} ${P3.x} ${P3.y}`;

type Pt = { x: number; y: number };

function bezier(t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * P0.x + b * P1.x + c * P2.x + d * P3.x,
    y: a * P0.y + b * P1.y + c * P2.y + d * P3.y,
  };
}

function normal(t: number): Pt {
  const u = 1 - t;
  const dx = 3 * u * u * (P1.x - P0.x) + 6 * u * t * (P2.x - P1.x) + 3 * t * t * (P3.x - P2.x);
  const dy = 3 * u * u * (P1.y - P0.y) + 6 * u * t * (P2.y - P1.y) + 3 * t * t * (P3.y - P2.y);
  const len = Math.hypot(dx, dy) || 1;
  return { x: -dy / len, y: dx / len };
}

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Everything drawn for one moment `t` in [0, 1). */
function frame(t: number) {
  const truth = bezier(t);
  const n = normal(t);

  // A position on its own: drift that only grows, and nothing to show it.
  const drift = 3 + 62 * Math.pow(t, 1.5) + 4 * Math.sin(t * 17);
  const other = { x: truth.x + n.x * drift, y: truth.y + n.y * drift };

  // Ours: the bound widens between fixes and tightens at each one.
  const phase = (t * FIXES_PER_LOOP) % 1;
  const grow = phase < 0.86 ? smooth(phase / 0.86) : 1 - smooth((phase - 0.86) / 0.14);
  const r = 13 + 21 * grow;
  // The estimate wanders around the truth by less than the bound, so the
  // disc drawn around the estimate always contains the true position.
  const wander = 0.45 * r;
  const ours = {
    x: truth.x + n.x * wander * Math.sin(t * 23) + 0.3 * wander * Math.cos(t * 31),
    y: truth.y + n.y * wander * Math.sin(t * 23) + 0.3 * wander * Math.sin(t * 29),
  };
  return { truth, other, ours, r };
}

function trail(t: number, pick: "other" | "ours"): string {
  const pts: string[] = [];
  const t0 = Math.max(0, t - 0.6);
  for (let i = 0; i <= TRAIL; i++) {
    const ti = t0 + ((t - t0) * i) / TRAIL;
    const p = frame(ti)[pick];
    pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function ErrorBound({
  labels = {
    others: "A position on its own",
    ours: "Spectral Flow: a position and how wrong it can be",
    truth: "True path",
  },
  note = "Illustration, not data.",
  ariaLabel = "Illustration: along the same path, a position given on its own drifts away with nothing to show its error, while a position given with its error bound stays inside a dashed disc that widens between magnetic fixes and tightens at each fix.",
  className = "",
}: {
  labels?: { others: string; ours: string; truth: string };
  note?: string | null;
  ariaLabel?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const otherDot = useRef<SVGCircleElement>(null);
  const otherTrail = useRef<SVGPolylineElement>(null);
  const oursDot = useRef<SVGCircleElement>(null);
  const oursDisc = useRef<SVGCircleElement>(null);
  const oursTrail = useRef<SVGPolylineElement>(null);
  const truthDot = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = false;
    let start = 0;
    let offset = STATIC_T * LOOP_MS;

    const draw = (t: number) => {
      const f = frame(t);
      otherDot.current?.setAttribute("cx", f.other.x.toFixed(1));
      otherDot.current?.setAttribute("cy", f.other.y.toFixed(1));
      oursDot.current?.setAttribute("cx", f.ours.x.toFixed(1));
      oursDot.current?.setAttribute("cy", f.ours.y.toFixed(1));
      oursDisc.current?.setAttribute("cx", f.ours.x.toFixed(1));
      oursDisc.current?.setAttribute("cy", f.ours.y.toFixed(1));
      oursDisc.current?.setAttribute("r", f.r.toFixed(1));
      truthDot.current?.setAttribute("cx", f.truth.x.toFixed(1));
      truthDot.current?.setAttribute("cy", f.truth.y.toFixed(1));
      otherTrail.current?.setAttribute("points", trail(t, "other"));
      oursTrail.current?.setAttribute("points", trail(t, "ours"));
    };

    const tick = (now: number) => {
      if (!start) start = now - offset;
      const t = ((now - start) % LOOP_MS) / LOOP_MS;
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (start) offset = (performance.now() - start) % LOOP_MS;
      start = 0;
    };

    const sync = () => {
      const run = visible && !reduced.matches && !document.hidden;
      if (run && !raf) {
        raf = requestAnimationFrame(tick);
      } else if (!run && raf) {
        stop();
      }
      if (reduced.matches) draw(STATIC_T);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.1 }
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, []);

  // First render (server, no JavaScript, reduced motion): the fixed frame.
  const f = frame(STATIC_T);

  return (
    <figure ref={wrapRef} className={className}>
      <svg
        viewBox={VIEWBOX}
        className="w-full h-auto block"
        role="img"
        aria-label={ariaLabel}
      >
        {/* True path */}
        <path
          d={PATH_D}
          fill="none"
          stroke="var(--text-primary)"
          strokeOpacity="0.28"
          strokeWidth="1.25"
        />

        {/* A position on its own: trail and a bare point */}
        <polyline
          ref={otherTrail}
          points={trail(STATIC_T, "other")}
          fill="none"
          stroke="var(--muted)"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
        />
        <circle ref={otherDot} cx={f.other.x} cy={f.other.y} r="4.5" fill="var(--muted)" />

        {/* Ours: trail, the bound, and the point inside it */}
        <polyline
          ref={oursTrail}
          points={trail(STATIC_T, "ours")}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle
          ref={oursDisc}
          cx={f.ours.x}
          cy={f.ours.y}
          r={f.r}
          fill="var(--accent)"
          fillOpacity="0.07"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <circle ref={oursDot} cx={f.ours.x} cy={f.ours.y} r="4.5" fill="var(--accent)" />

        {/* True position: a small open ring */}
        <circle
          ref={truthDot}
          cx={f.truth.x}
          cy={f.truth.y}
          r="3"
          fill="none"
          stroke="var(--text-primary)"
          strokeOpacity="0.7"
          strokeWidth="1.25"
        />
      </svg>

      <figcaption className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-x-7 gap-y-2.5">
        <span className="flex items-center gap-2.5 figure-label is-plain">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <circle cx="7" cy="7" r="3.5" fill="var(--muted)" />
          </svg>
          {labels.others}
        </span>
        <span className="flex items-center gap-2.5 figure-label is-plain">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <circle cx="7" cy="7" r="6" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeDasharray="2.5 2" />
            <circle cx="7" cy="7" r="2.6" fill="var(--accent)" />
          </svg>
          {labels.ours}
        </span>
        <span className="flex items-center gap-2.5 figure-label is-plain">
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
            <path d="M1 10 C6 2, 12 12, 17 4" fill="none" stroke="var(--text-primary)" strokeOpacity="0.4" strokeWidth="1.25" />
          </svg>
          {labels.truth}
        </span>
        {note && <span className="figure-label is-plain sm:ml-auto">{note}</span>}
      </figcaption>
    </figure>
  );
}
