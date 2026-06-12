"use client";

/**
 * StepsScroll — scroll-driven storytelling for the navigation chain.
 * Left column pins while the four steps scroll by; the active step
 * lights up and the rail fills. Falls back gracefully on mobile
 * (simple stacked cards, no pinning).
 */

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    t: "Sense",
    d: "The NV-diamond reads the Earth's ambient magnetic field — a fixed, global signature that no one can switch off.",
  },
  {
    n: "02",
    t: "Reject",
    d: "The vehicle carries its own magnetic noise — motors, currents, ferrous masses. Our sensing architecture identifies and removes it on board, in real time.",
  },
  {
    n: "03",
    t: "Match",
    d: "Onboard firmware matches the cleaned reading against a magnetic map to resolve position and heading in real time.",
  },
  {
    n: "04",
    t: "Navigate",
    d: "It continuously corrects inertial drift — holding a true course with no satellites, no emissions, nothing to jam.",
  },
];

function Step({
  step,
  index,
  onActive,
}: {
  step: (typeof STEPS)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="min-h-[38vh] lg:min-h-[52vh] flex items-center">
      <motion.div
        className="card p-7 md:p-9 w-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderColor: inView ? "rgba(0,229,255,0.35)" : undefined,
          boxShadow: inView ? "0 0 40px -18px rgba(0,229,255,0.35)" : undefined,
        }}
      >
        <p className="font-mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          {step.n}
        </p>
        <p className="text-2xl font-semibold display mb-3" style={{ color: "var(--text-primary)" }}>
          {step.t}
        </p>
        <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
          {step.d}
        </p>
      </motion.div>
    </div>
  );
}

export default function StepsScroll() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
      {/* Pinned narrative column */}
      <div className="lg:sticky lg:top-28 self-start">
        <p className="eyebrow mb-3">How it works</p>
        <h2 className="display text-3xl md:text-5xl font-semibold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
          From the Earth&rsquo;s field
          <br />
          to a true heading.
        </h2>
        <p className="text-lg leading-relaxed max-w-md mb-10" style={{ color: "var(--text-secondary)" }}>
          Four stages, one chip-set — and the stage in the middle is the one
          nobody else does on board.
        </p>

        {/* Progress rail */}
        <div className="hidden lg:flex flex-col gap-0">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-4 py-2.5">
              <span
                className="h-2 w-2 rounded-full transition-all duration-500"
                style={{
                  background: i <= active ? "var(--accent)" : "rgba(255,255,255,0.15)",
                  boxShadow: i === active ? "0 0 12px rgba(0,229,255,0.8)" : "none",
                  transform: i === active ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-500"
                style={{ color: i === active ? "var(--text-primary)" : "var(--muted)" }}
              >
                {s.n} — {s.t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling steps */}
      <div>
        {STEPS.map((s, i) => (
          <Step key={s.n} step={s} index={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
