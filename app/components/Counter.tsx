"use client";

/**
 * Animated number : counts up when scrolled into view.
 *
 * Hand-rolled rather than driven by the animation library: a count-up
 * needs an eased interpolation, not spring physics, and this component
 * sits on pages where the library is otherwise unused.
 */

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Initialise to the real value so SSR ships the true figure.
  const [display, setDisplay] = useState(() => value.toString());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      setDisplay(Math.round(easeOut(t) * value).toString());
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setDisplay("0");
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
