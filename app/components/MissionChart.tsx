"use client";

/**
 * MissionChart: the living mission curve, drawn as an instrument trace.
 * Inertial drift grows without bound (grey, dashed); the magnetically
 * aided track stays bounded (the one blue, solid). Draws itself when
 * scrolled into view, and appears at once under reduced motion.
 * Colours come from the theme tokens, so the chart reads the same on
 * porcelain and inside a cinema band.
 * Axes are deliberately qualitative: no public quantitative specs.
 * Under the md breakpoint the in-chart labels would shrink below reading
 * size, so they give way to an HTML legend under the chart.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";

// Geometry: viewBox 0..720 x 0..300, origin bottom-left at (50, 270)
const X0 = 50;
const Y0 = 270;
const W = 650;

const INERTIAL = "var(--muted)"; // grey, dashed: the reference that fails
const AIDED = "var(--accent)"; // the one blue, solid: our chain
const INERTIAL_DASH = "7 6";

function driftPoints(): [number, number][] {
  // error ~ t^1.4, growing to near top
  const pts: [number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    const x = X0 + (i / 100) * W;
    const y = Y0 - Math.pow(i / 100, 1.4) * 225;
    pts.push([x, y]);
  }
  return pts;
}

function boundedPoints(): [number, number][] {
  // follows drift until the first useful fix (~45%: innovation gating:
  // a fix is only accepted once it improves on the estimate), then a
  // bounded sawtooth: error re-grows between fixes, resets at each one.
  const pts: [number, number][] = [];
  const fixLevel = Y0 - 72; // bottom of the bounded band
  let lastFix = 0.45;
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const x = X0 + t * W;
    let y: number;
    if (t < 0.45) {
      y = Y0 - Math.pow(t, 1.4) * 225;
    } else {
      if (t - lastFix > 0.13) lastFix += 0.13;
      const since = t - lastFix;
      y = fixLevel - since * 190 + Math.sin(t * 40) * 1.5;
    }
    pts.push([x, y]);
  }
  return pts;
}

function toPath(pts: [number, number][]): string {
  return pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

const DRIFT_PTS = driftPoints();
const BOUNDED_PTS = boundedPoints();
const DRIFT = toPath(DRIFT_PTS);
const BOUNDED = toPath(BOUNDED_PTS);
const DRIFT_END = DRIFT_PTS[DRIFT_PTS.length - 1];
const BOUNDED_END = BOUNDED_PTS[BOUNDED_PTS.length - 1];

export default function MissionChart({ lang = "en" }: { lang?: "en" | "fr" } = {}) {
  const fr = lang === "fr";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  // the dashed curve is revealed through a growing clip, which keeps its
  // dash pattern intact (a path-length animation would overwrite it)
  const clipId = `mc-reveal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const show = inView || !!reduced;
  const t = (delay: number, duration: number) =>
    reduced ? { duration: 0 } : { delay, duration };

  return (
    <div ref={ref} className="card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          {fr ? "Erreur de position au cours d’une mission sans GNSS" : "Position error over a GNSS-denied mission"}
        </p>
        <p className="figure-label">{fr ? "Simulation · issu du modèle" : "Simulation · model-derived"}</p>
      </div>

      <svg
        viewBox="0 0 720 300"
        className="w-full h-auto"
        role="img"
        aria-label={
          fr
            ? "L’erreur de position de la seule centrale inertielle croît sans limite ; la navigation aidée par le champ magnétique reste bornée."
            : "Inertial-only position error grows without bound; magnetically aided navigation stays bounded."
        }
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x={X0 - 4}
              y={0}
              height={300}
              initial={{ width: 0 }}
              animate={show ? { width: W + 8 } : {}}
              transition={reduced ? { duration: 0 } : { duration: 2.4, ease: "easeInOut" }}
            />
          </clipPath>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={X0}
            x2={X0 + W}
            y1={Y0 - f * 240}
            y2={Y0 - f * 240}
            style={{ stroke: "var(--border)" }}
            strokeWidth="1"
          />
        ))}
        {/* axes */}
        <line x1={X0} x2={X0 + W} y1={Y0} y2={Y0} style={{ stroke: "var(--border-strong)" }} strokeWidth="1" />
        <line x1={X0} x2={X0} y1={Y0} y2={20} style={{ stroke: "var(--border-strong)" }} strokeWidth="1" />

        {/* bounded band */}
        <motion.rect
          x={X0}
          y={Y0 - 95}
          width={W}
          height={30}
          style={{ fill: "var(--accent-soft)" }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={t(2.0, 0.8)}
        />

        {/* drift curve: grey, dashed */}
        <path
          d={DRIFT}
          fill="none"
          clipPath={`url(#${clipId})`}
          style={{ stroke: INERTIAL }}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray={INERTIAL_DASH}
        />
        {/* bounded curve: blue, solid */}
        <motion.path
          d={BOUNDED}
          fill="none"
          style={{ stroke: AIDED }}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={
            reduced ? { duration: 0 } : { duration: 2.4, ease: "easeInOut", delay: 0.25 }
          }
        />

        {/* endpoints: where each story ends. The drift point sits dim
            and static; the aided point holds its bound, alive. */}
        <motion.circle
          cx={DRIFT_END[0]}
          cy={DRIFT_END[1]}
          r={3}
          style={{ fill: INERTIAL }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.6 } : {}}
          transition={t(2.4, 0.6)}
        />
        <motion.circle
          cx={BOUNDED_END[0]}
          cy={BOUNDED_END[1]}
          r={6}
          fill="none"
          style={{ stroke: AIDED }}
          strokeOpacity={0.3}
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={t(2.65, 0.6)}
        />
        <motion.circle
          cx={BOUNDED_END[0]}
          cy={BOUNDED_END[1]}
          r={3}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={t(2.65, 0.6)}
          style={{
            fill: AIDED,
            animation:
              inView && !reduced ? "pulse-soft 2.2s ease-in-out 3.4s infinite" : undefined,
          }}
        />

        {/* labels (md and up) */}
        <motion.g
          className="max-md:hidden"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={t(1.4, 0.6)}
        >
          <line
            x1={X0 + W - 232}
            x2={X0 + W - 212}
            y1={48}
            y2={48}
            style={{ stroke: INERTIAL }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 4"
          />
          <text
            x={X0 + W - 8}
            y={52}
            textAnchor="end"
            fontSize="13"
            style={{ fill: "var(--text-secondary)" }}
            fontFamily="var(--font-geist-sans)"
          >
            {fr ? "centrale inertielle seule · la dérive croît" : "inertial only · drift grows"}
          </text>
        </motion.g>
        <motion.g
          className="max-md:hidden"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={t(2.4, 0.6)}
        >
          <line
            x1={X0 + W - 232}
            x2={X0 + W - 212}
            y1={Y0 - 106}
            y2={Y0 - 106}
            style={{ stroke: AIDED }}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text
            x={X0 + W - 8}
            y={Y0 - 102}
            textAnchor="end"
            fontSize="13"
            style={{ fill: AIDED }}
            fontFamily="var(--font-geist-sans)"
          >
            {fr ? "aidée par le champ magnétique · bornée" : "magnetically aided · bounded"}
          </text>
        </motion.g>

        {/* axis captions (qualitative by design, md and up) */}
        <text
          className="max-md:hidden"
          x={X0 + W / 2}
          y={Y0 + 24}
          textAnchor="middle"
          fontSize="10"
          style={{ fill: "var(--muted)" }}
          fontFamily="var(--font-geist-sans)"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          {fr ? "TEMPS DE MISSION →" : "MISSION TIME →"}
        </text>
        <text
          className="max-md:hidden"
          x={16}
          y={Y0 / 2}
          textAnchor="middle"
          fontSize="10"
          style={{ fill: "var(--muted)" }}
          fontFamily="var(--font-geist-sans)"
          fontWeight="600"
          letterSpacing="0.15em"
          transform={`rotate(-90 16 ${Y0 / 2})`}
        >
          {fr ? "ERREUR DE POSITION →" : "POSITION ERROR →"}
        </text>
      </svg>

      {/* small screens: the same legend, at reading size */}
      <div
        aria-hidden
        className="md:hidden mt-4 flex flex-col gap-2 text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        <span className="inline-flex items-center gap-2.5">
          <svg width="24" height="8" viewBox="0 0 24 8">
            <line
              x1="1"
              x2="23"
              y1="4"
              y2="4"
              style={{ stroke: INERTIAL }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 4"
            />
          </svg>
          {fr ? "centrale inertielle seule · la dérive croît" : "inertial only · drift grows"}
        </span>
        <span className="inline-flex items-center gap-2.5">
          <svg width="24" height="8" viewBox="0 0 24 8">
            <line
              x1="1"
              x2="23"
              y1="4"
              y2="4"
              style={{ stroke: AIDED }}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          {fr ? "aidée par le champ magnétique · bornée" : "magnetically aided · bounded"}
        </span>
        <span className="figure-label mt-1">{fr ? "Erreur de position en fonction du temps de mission" : "Position error against mission time"}</span>
      </div>
    </div>
  );
}
