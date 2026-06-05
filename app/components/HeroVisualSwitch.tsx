"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroVisual from "./HeroVisual";

// Lazy-load the WebGL scene; never SSR it. SVG shows while it loads.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <HeroVisual />,
});

/**
 * Renders the interactive 3D hero on capable desktop viewports, and falls back
 * to the lightweight SVG visual on mobile or when the user prefers reduced
 * motion (brief: "Fallback static render for perf/mobile").
 */
export default function HeroVisualSwitch() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setUse3D(!reduced && !small);
  }, []);

  if (!use3D) {
    return (
      <div style={{ animation: "float 9s ease-in-out infinite" }}>
        <HeroVisual />
      </div>
    );
  }

  return (
    <div className="aspect-square w-full max-w-[460px] mx-auto">
      <Hero3D />
    </div>
  );
}
