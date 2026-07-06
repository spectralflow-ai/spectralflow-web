"use client";

/**
 * FieldFlow V4 : the engraving.
 * The only living matter in the hero: field lines of a magnetic dipole,
 * drawn slowly as a very pale ink engraving across the full width,
 * BEHIND the typography. No object, no glow : a drawing that breathes.
 *
 * Engineering notes: plain canvas 2D, devicePixelRatio capped at 2,
 * pauses when offscreen or tab hidden, skipped entirely under
 * prefers-reduced-motion or on small screens (the typography stands
 * alone there).
 */

import { useEffect, useRef } from "react";

const N_PARTICLES = 750;
const SPEED = 17; // px/s at DPR 1 : slow, deliberate
const TRAIL_FADE = 0.006; // per-frame erase : lines persist, the drawing builds

type P = { x: number; y: number; life: number; blue: boolean };

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

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // barely-there erase : the engraving accumulates, then breathes
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "source-over";

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
        const a = Math.max(0.015, 0.085 - d * 0.06);
        ctx!.strokeStyle = p.blue
          ? `rgba(11, 95, 255, ${a * 1.6})`
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
