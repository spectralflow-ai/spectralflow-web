"use client";

/**
 * Page transitions : app-router template remounts on each navigation,
 * giving every page a quiet, confident entrance: fade + lift + a touch
 * of blur clearing. Honors prefers-reduced-motion (framer-motion reads
 * it natively for transforms; we also shorten to opacity-only).
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
