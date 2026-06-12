"use client";

/**
 * FieldFlow — the cinematic hero backdrop.
 * Thousands of particles advected along the field lines of a magnetic
 * dipole, drawn as fading trails on a full-bleed 2D canvas. The company's
 * own physics, used as visual matter.
 *
 * Engineering notes: plain canvas 2D (no shader risk), devicePixelRatio
 * capped at 2, pauses when offscreen or tab hidden, skipped entirely
 * under prefers-reduced-motion or on small screens.
 */

import { useEffect, useRef } from "react";

const N_PARTICLES = 1100;
const SPEED = 34; // px/s at DPR 1
const TRAIL_FADE = 0.075; // background alpha per frame — trail persistence

type P = { x: number; y: number; life: number; hue: 0 | 1 };

export default function FieldFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || small) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
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
      p.life = 3 + Math.random() * 6;
      p.hue = Math.random() < 0.82 ? 0 : 1; // mostly cyan, some violet
    }

    for (let i = 0; i < N_PARTICLES; i++) {
      const p: P = { x: 0, y: 0, life: 0, hue: 0 };
      parts.push(p);
    }

    // Dipole field at centre-right (where the diamond sits), moment tilted.
    function field(x: number, y: number): [number, number] {
      const cx = w * 0.66;
      const cy = h * 0.44;
      let rx = (x - cx) / (0.32 * Math.min(w, h));
      let ry = (y - cy) / (0.32 * Math.min(w, h));
      const r2 = rx * rx + ry * ry + 0.02;
      const r = Math.sqrt(r2);
      rx /= r;
      ry /= r;
      // dipole moment direction (tilted like the brand diamond)
      const mx = 0.45;
      const my = -0.89;
      const mdotr = mx * rx + my * ry;
      const bx = (3 * mdotr * rx - mx) / (r2 * r);
      const by = (3 * mdotr * ry - my) / (r2 * r);
      const mag = Math.hypot(bx, by) + 1e-6;
      return [bx / mag, by / mag];
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // fade previous frame -> trails
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      for (const p of parts) {
        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          seed(p);
          continue;
        }
        const [fx, fy] = field(p.x, p.y);
        const nx = p.x + fx * SPEED * dt;
        const ny = p.y + fy * SPEED * dt;

        // distance-based brightness: lines glow nearer the core
        const d = Math.hypot(p.x - w * 0.66, p.y - h * 0.44) / Math.min(w, h);
        const a = Math.max(0.05, 0.30 - d * 0.22);
        ctx!.strokeStyle =
          p.hue === 0 ? `rgba(0, 229, 255, ${a})` : `rgba(124, 92, 255, ${a * 0.9})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(nx, ny);
        ctx!.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= dt;
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    parts.forEach(seed);
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // pause when the hero scrolls out of view
    const io = new IntersectionObserver(
      ([e]) => {
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
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{
        // soft containment: fade the field toward the edges and the text column
        WebkitMaskImage:
          "radial-gradient(120% 90% at 62% 42%, #000 0%, rgba(0,0,0,0.75) 45%, transparent 78%)",
        maskImage:
          "radial-gradient(120% 90% at 62% 42%, #000 0%, rgba(0,0,0,0.75) 45%, transparent 78%)",
        opacity: 0.85,
      }}
    />
  );
}
