"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Principle: how a diamond reads a magnetic field, as a short lesson in
 * three steps.
 *   01 The Earth's field has a relief, and it has been mapped.
 *   02 Magnetic resonance read with light: green in, red out, and the red
 *      glow dips at microwave frequencies that the field shifts.
 *   03 Spin coherence: the spin keeps the beat set by the field.
 *
 * The laser green and the NV red appear in this component and nowhere
 * else on the site, in muted tones and without glow.
 *
 * The two small motions (the dips moving, the spin turning) are SVG
 * animations. Each drawing holds its first frame until it is on screen,
 * plays once in under five seconds, and stops on a still frame. A static
 * drawing replaces them when the visitor prefers reduced motion, and in
 * print.
 */

const LASER = "#3D7A57";
const GLOW = "#B5554B";
const INK = "var(--text-primary)";
const SEC = "var(--text-secondary)";
const MUT = "var(--muted)";
const BLUE = "var(--accent)";
const SURFACE = "var(--surface)";
const FONT = "var(--font-geist-sans)";

const MOTION = "motion-reduce:hidden print:hidden";
const STILL = "hidden motion-reduce:inline print:inline";

const f1 = (n: number) => n.toFixed(1);

/* ----- 02 : the red glow against microwave frequency ---------------- */

const PLOT = { x0: 46, x1: 304, step: 3, base: 128, depth: 30, w: 8, xc: 176 };

/** Two resonance dips, `split` px either side of the centre. */
function glowPath(split: number): string {
  const { x0, x1, step, base, depth, w, xc } = PLOT;
  const lor = (u: number) => (w * w) / (u * u + w * w);
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += step) {
    const y = base + depth * (lor(x - (xc - split)) + lor(x - (xc + split)));
    pts.push(`${pts.length ? "L" : "M"}${f1(x)} ${f1(y)}`);
  }
  return pts.join(" ");
}

const SPLIT_REF = 24;
const SPLIT_STILL = 46;
const SPLIT_MAX = 50;
const GLOW_REF = glowPath(SPLIT_REF);
const GLOW_STILL = glowPath(SPLIT_STILL);
const GLOW_PASS = [GLOW_REF, glowPath(SPLIT_MAX), GLOW_REF, GLOW_STILL].join(";");

/** A gentle wave between two x positions. */
function wave(xa: number, xb: number, y: number, amp: number, periods: number): string {
  const pts: string[] = [];
  const n = 48;
  for (let i = 0; i <= n; i++) {
    const x = xa + ((xb - xa) * i) / n;
    const v = y + amp * Math.sin((i / n) * periods * 2 * Math.PI);
    pts.push(`${i ? "L" : "M"}${f1(x)} ${f1(v)}`);
  }
  return pts.join(" ");
}

function Resonance() {
  const cx = 160;
  const cy = 62;
  const d = 26;
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Green light enters a diamond and red light comes out, while microwaves drive the defect. Below, the red glow plotted against microwave frequency shows two dips. The dashed curve is a weaker field; in a stronger field the dips move apart."
      data-motion=""
    >
      {/* microwaves */}
      <text x={cx} y={12} textAnchor="middle" fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        microwaves
      </text>
      <path d={wave(cx - 24, cx + 24, 26, 4, 3)} fill="none" stroke={MUT} strokeWidth="1.6" />

      {/* green light in */}
      <text x={12} y={50} fontSize="13" fontWeight="600" fill={LASER} fontFamily={FONT}>
        green light
      </text>
      <line x1={12} y1={cy} x2={cx - d - 10} y2={cy} stroke={LASER} strokeWidth="2.2" />
      <polygon points={`${cx - d - 12},${cy - 5} ${cx - d - 12},${cy + 5} ${cx - d - 2},${cy}`} fill={LASER} />

      {/* the diamond and its defect */}
      <polygon
        points={`${cx},${cy - d} ${cx + d},${cy} ${cx},${cy + d} ${cx - d},${cy}`}
        fill={SURFACE}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={cy} r={5} fill={BLUE} />

      {/* red light out */}
      {[-18, 0, 18].map((dy) => (
        <line
          key={dy}
          x1={cx + d + 6}
          y1={cy + dy * 0.3}
          x2={cx + d + 62}
          y2={cy + dy}
          stroke={GLOW}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
      <text x={cx + d + 68} y={cy + 4} fontSize="13" fontWeight="600" fill={GLOW} fontFamily={FONT}>
        red glow
      </text>

      {/* the plot */}
      <text x={PLOT.x0} y={110} fontSize="13" fontWeight="600" fill={GLOW} fontFamily={FONT}>
        red glow
      </text>
      <text x={PLOT.x1} y={110} textAnchor="end" fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        the field moves the dips
      </text>
      <line x1={40} y1={118} x2={40} y2={178} stroke="var(--border-strong)" strokeWidth="1" />
      <line x1={40} y1={178} x2={PLOT.x1 - 4} y2={178} stroke="var(--border-strong)" strokeWidth="1" />
      <polygon points={`${PLOT.x1 - 6},174 ${PLOT.x1 - 6},182 ${PLOT.x1 + 2},178`} fill="var(--border-strong)" />
      <text x={PLOT.x1} y={195} textAnchor="end" fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        microwave frequency
      </text>

      {/* reference: a weaker field, with its legend */}
      <path d={GLOW_REF} fill="none" stroke={MUT} strokeWidth="1.2" strokeDasharray="3 4" />
      <line x1={44} y1={190.5} x2={62} y2={190.5} stroke={MUT} strokeWidth="1.2" strokeDasharray="3 4" />
      <text x={68} y={195} fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        weaker field
      </text>

      {/* the field changes, the dips move */}
      <g className={MOTION}>
        <path d={GLOW_REF} fill="none" stroke={GLOW} strokeWidth="2.2" strokeLinejoin="round">
          <animate
            attributeName="d"
            values={GLOW_PASS}
            keyTimes="0;0.36;0.72;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            dur="4.6s"
            fill="freeze"
          />
        </path>
      </g>
      <g className={STILL}>
        <path d={GLOW_STILL} fill="none" stroke={GLOW} strokeWidth="2.2" strokeLinejoin="round" />
        {[-1, 1].map((s) => {
          const xa = PLOT.xc + s * (SPLIT_REF + 2);
          const xb = PLOT.xc + s * (SPLIT_STILL - 4);
          return (
            <g key={s}>
              <line x1={xa} y1={169} x2={xb - s * 4} y2={169} stroke={MUT} strokeWidth="1.2" />
              <polygon points={`${xb - s * 5},${165} ${xb - s * 5},${173} ${xb + s * 2},${169}`} fill={MUT} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ----- 03 : the spin turns around the field, and keeps the beat ----- */

const TOP = { px: 64, py: 106, ex: 64, ey: 40, rx: 32, ry: 8 };
const onCone = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: TOP.ex + TOP.rx * Math.cos(a), y: TOP.ey + TOP.ry * Math.sin(a) };
};
const STILL_DEG = 30;
const TURN_DEG = 720 + STILL_DEG;
const TURN_STEP = 15;
const CONE_PTS = Array.from({ length: TURN_DEG / TURN_STEP + 1 }, (_, i) => onCone(i * TURN_STEP));
const CONE_X = CONE_PTS.map((p) => f1(p.x)).join(";");
const CONE_Y = CONE_PTS.map((p) => f1(p.y)).join(";");
const STILL_TIP = onCone(STILL_DEG);
const TURN_DUR = "4.5s";

const BEAT = { x0: 24, x1: 300, y: 166, amp: 20, tau: 95, period: 30 };
const envelope = (x: number) => BEAT.amp * Math.exp(-(x - BEAT.x0) / BEAT.tau);

function beatPath(): string {
  const pts: string[] = [];
  for (let x = BEAT.x0; x <= BEAT.x1; x += 1.5) {
    const y = BEAT.y - envelope(x) * Math.cos(((x - BEAT.x0) / BEAT.period) * 2 * Math.PI);
    pts.push(`${pts.length ? "L" : "M"}${f1(x)} ${f1(y)}`);
  }
  return pts.join(" ");
}

function envelopePath(sign: 1 | -1): string {
  const pts: string[] = [];
  for (let x = BEAT.x0; x <= BEAT.x1; x += 6) {
    pts.push(`${pts.length ? "L" : "M"}${f1(x)} ${f1(BEAT.y - sign * envelope(x))}`);
  }
  return pts.join(" ");
}

const BEAT_D = beatPath();
const ENV_UP = envelopePath(1);
const ENV_DOWN = envelopePath(-1);

function Coherence() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="A spin drawn as an arrow turning around the direction of the magnetic field, like a spinning top. Below, its oscillation over time stays regular at first, then fades: that fading is the loss of coherence."
      data-motion=""
    >
      {/* the field direction */}
      <line x1={TOP.px} y1={TOP.py} x2={TOP.px} y2={22} stroke={MUT} strokeWidth="1.2" strokeDasharray="3 4" />
      <polygon points={`${TOP.px - 4},${24} ${TOP.px + 4},${24} ${TOP.px},${15}`} fill={MUT} />
      <text x={TOP.px + 9} y={22} fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        field
      </text>

      {/* the cone the spin sweeps */}
      <ellipse
        cx={TOP.ex}
        cy={TOP.ey}
        rx={TOP.rx}
        ry={TOP.ry}
        fill="none"
        stroke={MUT}
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <circle cx={TOP.px} cy={TOP.py} r={2.5} fill={INK} />

      <g className={MOTION}>
        <line x1={TOP.px} y1={TOP.py} x2={STILL_TIP.x} y2={STILL_TIP.y} stroke={BLUE} strokeWidth="2.2">
          <animate attributeName="x2" values={CONE_X} dur={TURN_DUR} fill="freeze" />
          <animate attributeName="y2" values={CONE_Y} dur={TURN_DUR} fill="freeze" />
        </line>
        <circle cx={STILL_TIP.x} cy={STILL_TIP.y} r={4.5} fill={BLUE}>
          <animate attributeName="cx" values={CONE_X} dur={TURN_DUR} fill="freeze" />
          <animate attributeName="cy" values={CONE_Y} dur={TURN_DUR} fill="freeze" />
        </circle>
      </g>
      <g className={STILL}>
        <line x1={TOP.px} y1={TOP.py} x2={STILL_TIP.x} y2={STILL_TIP.y} stroke={BLUE} strokeWidth="2.2" />
        <circle cx={STILL_TIP.x} cy={STILL_TIP.y} r={4.5} fill={BLUE} />
      </g>

      <text x={122} y={48} fontSize="13" fontWeight="600" fill={INK} fontFamily={FONT}>
        the spin, like a top,
      </text>
      <text x={122} y={65} fontSize="13" fontWeight="500" fill={SEC} fontFamily={FONT}>
        turns around the field,
      </text>
      <text x={122} y={82} fontSize="13" fontWeight="500" fill={SEC} fontFamily={FONT}>
        faster when it is stronger
      </text>

      {/* keeping the beat, then losing it */}
      <text x={BEAT.x0} y={136} fontSize="13" fontWeight="600" fill={SEC} fontFamily={FONT}>
        keeps the beat
      </text>
      <text x={BEAT.x1} y={136} textAnchor="end" fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        loses it
      </text>
      <path d={ENV_UP} fill="none" stroke={MUT} strokeWidth="1" strokeDasharray="3 4" />
      <path d={ENV_DOWN} fill="none" stroke={MUT} strokeWidth="1" strokeDasharray="3 4" />
      <path d={BEAT_D} fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinejoin="round" />
      <text x={BEAT.x1} y={196} textAnchor="end" fontSize="13" fontWeight="500" fill={MUT} fontFamily={FONT}>
        time
      </text>
    </svg>
  );
}

/* ----- 01 : the magnetic relief, and a route across it --------------- */

function Fingerprint() {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio: "16/10", border: "1px solid var(--border)", background: "var(--background)" }}
      >
        <Image
          src="/img/v3/relief.webp"
          alt="Contour lines of a magnetic relief, with a blue route crossing it."
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
          style={{ objectPosition: "62% 58%" }}
        />
      </div>
      <figcaption className="figure-label is-plain mt-3">
        Illustration: a magnetic relief, and a route across it.
      </figcaption>
    </figure>
  );
}

/* ----- The lesson ---------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    title: "The Earth has a fingerprint",
    text: "Magnetic rocks in the crust distort the Earth's field, a little differently everywhere. Much of that relief has been mapped, from the air and at sea, more finely in some places than in others.",
    media: <Fingerprint />,
  },
  {
    n: "02",
    title: "Resonance, as in MRI",
    text: "An NV centre, a defect in diamond, carries a spin that microwaves drive into resonance, as in an MRI scanner. Green light in, red light out: the red glow dips at the resonance frequencies, and the field shifts them. Where the dips sit gives the field.",
    media: <Resonance />,
  },
  {
    n: "03",
    title: "Spin coherence",
    text: "Like a spinning top, the spin turns around the field, faster when the field is stronger. Keeping that beat is called coherence: the longer it lasts, the finer the measurement.",
    media: <Coherence />,
  },
];

export default function Principle({
  headingLevel = 3,
  className = "",
}: {
  /** Level of each step's title, under the section's own heading. */
  headingLevel?: 3 | 4;
  className?: string;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const drawings = Array.from(root.querySelectorAll<SVGSVGElement>("svg[data-motion]"));
    // Hold each drawing on its first frame until it is on screen.
    for (const svg of drawings) {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const svg = e.target as SVGSVGElement;
          io.unobserve(svg);
          svg.setCurrentTime(0);
          svg.unpauseAnimations();
        }
      },
      { threshold: 0.6 }
    );
    drawings.forEach((svg) => io.observe(svg));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={listRef} className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {STEPS.map((s) => (
        <li key={s.n} className="card p-6 md:p-7 flex flex-col">
          <p className="figure-label mb-5" aria-hidden="true">
            {s.n}
          </p>
          <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start lg:block">
            <div className="max-w-[420px] mb-6 md:mb-0 lg:mb-7">{s.media}</div>
            <div>
              <Heading
                className="display text-2xl font-semibold tracking-tight mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="sr-only">Step {Number(s.n)}: </span>
                {s.title}
              </Heading>
              <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                {s.text}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
