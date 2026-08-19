"use client";

/**
 * Page transitions : app-router template remounts on each navigation,
 * giving every page a quiet, confident entrance: fade + lift. The very
 * first document load renders plain (no hidden-at-SSR content, no LCP
 * cost); only client-side navigations animate. Honors
 * prefers-reduced-motion (opacity-only).
 */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

let navigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const animate = navigated;

  useEffect(() => {
    navigated = true;
  }, []);

  if (!animate) return <div>{children}</div>;

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
