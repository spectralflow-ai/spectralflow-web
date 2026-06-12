"use client";

/**
 * MissionChart — the company's core claim as a living element.
 * An animated SVG: inertial drift grows unbounded (red) while the
 * magnetically-aided track stays bounded (cyan sawtooth). Draws itself
 * when scrolled into view. Axes are deliberately qualitative — no
 * public quantitative specs (see REDESIGN_BRIEF).
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Geometry: viewBox 0..720 x 0..300, origin bottom-left at (50, 270)
const X0 = 50;
const Y0 = 270;
const W = 650;

function driftPath(): string {
  // error ~ t^1.4, growing to near top
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = X0 + (i / 100) * W;
    const y = Y0 - Math.pow(i / 100, 1.4) * 225;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function boundedPath(): string {
  // follows drift until the first useful fix (~45% — innovation gating:
  // a fix is only accepted once it improves on the estimate), then a
  // bounded sawtooth: error re-grows between fixes, resets at each one.
  const pts: string[] = [];
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
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const DRIFT = driftPath();
const BOUNDED = boundedPath();

export default function MissionChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Position error over a GNSS-denied mission
        </p>
        <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "var(--muted)" }}>
          Digital twin · model-derived
        </p>
      </div>

      <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Inertial-only position error grows without bound; magnetically aided navigation stays bounded.">
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={X0} x2={X0 + W} y1={Y0 - f * 240} y2={Y0 - f * 240} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* axes */}
        <line x1={X0} x2={X0 + W} y1={Y0} y2={Y0} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1={X0} x2={X0} y1={Y0} y2={20} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

        {/* bounded band */}
        <motion.rect
          x={X0}
          y={Y0 - 95}
          width={W}
          height={30}
          fill="rgba(46,230,168,0.07)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.0, duration: 0.8 }}
        />

        {/* drift curve */}
        <motion.path
          d={DRIFT}
          fill="none"
          stroke="#f87171"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        {/* bounded curve */}
        <motion.path
          d={BOUNDED}
          fill="none"
          stroke="#2ee6a8"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.25 }}
        />

        {/* labels */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.6 }}>
          <text x={X0 + W - 8} y={52} textAnchor="end" fontSize="13" fill="#f87171" fontFamily="var(--font-geist-mono)">
            inertial only — drift grows
          </text>
        </motion.g>
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.4, duration: 0.6 }}>
          <text x={X0 + W - 8} y={Y0 - 102} textAnchor="end" fontSize="13" fill="#2ee6a8" fontFamily="var(--font-geist-mono)">
            magnetically aided — bounded
          </text>
        </motion.g>

        {/* axis captions (qualitative by design) */}
        <text x={X0 + W / 2} y={Y0 + 24} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-geist-mono)" letterSpacing="0.15em">
          MISSION TIME →
        </text>
        <text x={16} y={Y0 / 2} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-geist-mono)" letterSpacing="0.15em" transform={`rotate(-90 16 ${Y0 / 2})`}>
          POSITION ERROR →
        </text>
      </svg>
    </div>
  );
}
