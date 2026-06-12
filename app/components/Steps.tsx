"use client";

/**
 * Steps — the kit's scroll story, stripped to the essentials.
 * A pinned narrative column on the left; on the right the steps pass
 * by as quiet numbered blocks separated by hairlines — no cards.
 * Falls back to a simple stacked list on mobile.
 */

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type StepItem = { n: string; t: string; d: string };

function Step({
  step,
  index,
  onActive,
}: {
  step: StepItem;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="min-h-[34vh] lg:min-h-[46vh] flex items-center">
      <motion.div
        className="w-full py-10 hairline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: inView ? 1 : 0.45, transition: "opacity 0.5s ease" }}
      >
        <p
          className="display text-5xl md:text-6xl font-semibold mb-5"
          style={{ color: inView ? "var(--accent)" : "var(--border-strong)" }}
        >
          {step.n}
        </p>
        <p className="text-2xl font-semibold display mb-3" style={{ color: "var(--text-primary)" }}>
          {step.t}
        </p>
        <p className="text-[15px] leading-7 max-w-md" style={{ color: "var(--text-secondary)" }}>
          {step.d}
        </p>
      </motion.div>
    </div>
  );
}

export default function Steps({
  eyebrow,
  title,
  lead,
  steps,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  steps: StepItem[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
      {/* Pinned narrative column */}
      <div className="lg:sticky lg:top-28 self-start">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2
          className="display text-3xl md:text-5xl font-semibold tracking-tight mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
        {lead && (
          <p className="text-lg leading-relaxed max-w-md mb-10" style={{ color: "var(--text-secondary)" }}>
            {lead}
          </p>
        )}

        {/* Progress rail */}
        <div className="hidden lg:flex flex-col gap-0">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-4 py-2.5">
              <span
                className="h-2 w-2 rounded-full transition-all duration-500"
                style={{
                  background: i <= active ? "var(--accent)" : "var(--border-strong)",
                  transform: i === active ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span
                className="figure-label transition-colors duration-500"
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
        {steps.map((s, i) => (
          <Step key={s.n} step={s} index={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
