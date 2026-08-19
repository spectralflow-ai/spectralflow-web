"use client";

/**
 * FieldFlow V4 : the engraving.
 * The only living matter in the hero: field lines of a magnetic dipole,
 * drawn slowly as a very pale ink engraving across the full width,
 * BEHIND the typography. No object, no glow : a drawing that breathes.
 *
 * Engineering notes: plain canvas 2D, devicePixelRatio capped at 2,
 * pauses when offscreen or tab hidden. The drawing is pre-warmed with
 * synchronous, time-boxed steps so the fade-in reveals an engraving
 * already in progress. Small screens and prefers-reduced-motion get a
 * one-shot static engraving : no rAF loop, zero battery cost. On fine
 * pointers, strokes near the cursor bite a little deeper.
 */

import { useEffect, useRef, useState } from "react";

const N_PARTICLES = 750;
const SPEED = 17; // px/s at DPR 1 : slow, deliberate
const TRAIL_FADE = 0.006; // per-frame erase : lines persist, the drawing builds
const PREWARM_STEPS = 400; // animated : the reveal finds a drawing in progress
const PREWARM_BUDGET_MS = 80; // hard cap : a large DPR-2 canvas stops early
const STATIC_STEPS = 900; // static : the finished engraving, drawn once
const STATIC_BUDGET_MS = 200;
const CURSOR_RADIUS = 140; // px : reach of the cursor's extra ink

type P = { x: number; y: number; life: number; blue: boolean };

export default function FieldFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Live media queries : react to a reduced-motion flip or the 768px
    // boundary without a reload (the change listener re-runs the effect).
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallMq = window.matchMedia("(max-width: 767px)");
    const onMqChange = () => setTick((t) => t + 1);
    reducedMq.addEventListener("change", onMqChange);
    smallMq.addEventListener("change", onMqChange);
    const removeMqListeners = () => {
      reducedMq.removeEventListener("change", onMqChange);
      smallMq.removeEventListener("change", onMqChange);
    };

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;
    if (!canvas || !ctx) return removeMqListeners;

    // Static mode : small screens and reduced motion get the engraving
    // pre-rendered once, then no animation loop at all.
    const staticMode = reducedMq.matches || smallMq.matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let intersecting = false;
    let last = performance.now();

    const parts: P[] = [];

    function resize() {
      const c = canvasRef.current;
      if (!c || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
    }

    function seed(p: P) {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.life = 4 + Math.random() * 8;
      p.blue = Math.random() < 0.06; // the one blue, rare
    }

    for (let i = 0; i < N_PARTICLES; i++) {
      parts.push({ x: 0, y: 0, life: 0, blue: false });
    }

    // Dipole centred under the headline, moment tilted : the lines arc
    // across the full width of the page.
    function field(x: number, y: number): [number, number] {
      const cx = w * 0.5;
      const cy = h * 0.56;
      let rx = (x - cx) / (0.42 * Math.min(w, h));
      let ry = (y - cy) / (0.42 * Math.min(w, h));
      const r2 = rx * rx + ry * ry + 0.02;
      const r = Math.sqrt(r2);
      rx /= r;
      ry /= r;
      const mx = 0.34;
      const my = -0.94;
      const mdotr = mx * rx + my * ry;
      const bx = (3 * mdotr * rx - mx) / (r2 * r);
      const by = (3 * mdotr * ry - my) / (r2 * r);
      const mag = Math.hypot(bx, by) + 1e-6;
      return [bx / mag, by / mag];
    }

    // One integration step : erase pass + every particle advances and
    // leaves its segment. Shared by the live loop and the pre-warm.
    function advance(dt: number) {
      // barely-there erase : the engraving accumulates, then breathes
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "source-over";

      const ptr = pointerRef.current;
      for (const p of parts) {
        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          seed(p);
          continue;
        }
        const [fx, fy] = field(p.x, p.y);
        const nx = p.x + fx * SPEED * dt;
        const ny = p.y + fy * SPEED * dt;

        // fine ink hairlines, fainter far from the centre
        const d = Math.hypot(p.x - w * 0.5, p.y - h * 0.56) / Math.min(w, h);
        let a = Math.max(0.015, 0.085 - d * 0.06);
        if (ptr) {
          // strokes near a fine pointer bite a little deeper
          const pd = Math.hypot(p.x - ptr.x, p.y - ptr.y);
          if (pd < CURSOR_RADIUS) {
            a = Math.min(a * (1 + 0.9 * (1 - pd / CURSOR_RADIUS) ** 2), 0.16);
          }
        }
        ctx!.strokeStyle = p.blue
          ? `rgba(11, 95, 255, ${Math.min(a * 1.6, 0.16)})`
          : `rgba(11, 15, 26, ${a})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(nx, ny);
        ctx!.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= dt;
      }
    }

    // Synchronous pre-warm, time-boxed so it can never stall the main
    // thread visibly : on slow devices or big canvases it simply runs
    // fewer steps and the drawing finishes maturing live (or stays a
    // slightly younger engraving in static mode).
    function prewarm(steps: number, budgetMs: number) {
      const t0 = performance.now();
      for (let i = 0; i < steps; i++) {
        advance(0.016);
        if (performance.now() - t0 > budgetMs) break;
      }
    }

    resize();
    parts.forEach(seed);

    if (staticMode) {
      prewarm(STATIC_STEPS, STATIC_BUDGET_MS);
      const onStaticResize = () => {
        resize();
        parts.forEach(seed);
        prewarm(STATIC_STEPS, STATIC_BUDGET_MS);
      };
      window.addEventListener("resize", onStaticResize);
      return () => {
        window.removeEventListener("resize", onStaticResize);
        removeMqListeners();
      };
    }

    prewarm(PREWARM_STEPS, PREWARM_BUDGET_MS);

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      advance(dt);
      raf = requestAnimationFrame(frame);
    }

    last = performance.now();
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Cursor proximity : fine pointers only (reduced motion never gets
    // here), position kept in a ref, no re-renders.
    const parent = canvas.parentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointerRef.current = null;
    };
    if (parent && finePointer) {
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerleave", onPointerLeave);
    }

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && intersecting) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([e]) => {
        intersecting = e.isIntersecting;
        if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (e.isIntersecting && !running && !document.hidden) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (parent && finePointer) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
      pointerRef.current = null;
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      removeMqListeners();
    };
  }, [tick]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{
        // fade toward the edges; the drawing stays a backdrop
        WebkitMaskImage:
          "radial-gradient(110% 95% at 50% 52%, #000 0%, rgba(0,0,0,0.8) 50%, transparent 82%)",
        maskImage:
          "radial-gradient(110% 95% at 50% 52%, #000 0%, rgba(0,0,0,0.8) 50%, transparent 82%)",
        animation: "fade-in-slow 2.6s ease-out both",
      }}
    />
  );
}
