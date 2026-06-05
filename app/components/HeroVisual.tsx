/**
 * HeroVisual — abstract NV-diamond lattice with a glowing nitrogen-vacancy
 * centre, an orbiting spin marker and animated magnetic field lines. Pure
 * SVG/CSS: light, mobile-safe, respects prefers-reduced-motion. Designed as a
 * swappable slot — a @react-three/fiber render can replace this later without
 * touching callers.
 */
export default function HeroVisual({ className = "" }: { className?: string }) {
  const cols = 6;
  const rows = 5;
  const gap = 60;
  const ox = 40;
  const oy = 40;
  const nodes: { x: number; y: number; nv: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const stagger = r % 2 === 0 ? 0 : gap / 2;
      nodes.push({ x: ox + c * gap + stagger, y: oy + r * gap, nv: r === 2 && c === 2 });
    }
  }
  const nv = nodes.find((n) => n.nv)!;

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* Rotating conic glow behind the lattice */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "78%",
          aspectRatio: "1",
          backgroundImage:
            "conic-gradient(from 0deg, rgba(0,229,255,0.22), rgba(124,92,255,0.10), rgba(0,229,255,0.22), rgba(124,92,255,0.10), rgba(0,229,255,0.22))",
          filter: "blur(34px)",
          opacity: 0.7,
          animation: "spin-slow 26s linear infinite",
        }}
      />

      <svg viewBox="0 0 420 360" className="relative w-full h-auto" role="presentation">
        <defs>
          <radialGradient id="nvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#00E5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bondGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.5" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Lattice (bonds + carbon nodes), breathing slowly */}
        <g style={{ transformOrigin: "210px 180px", animation: "latticeBreathe 16s ease-in-out infinite" }}>
          <g stroke="url(#bondGrad)" strokeWidth="1">
            {nodes.map((a, i) =>
              nodes.slice(i + 1).map((b, j) => {
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d > gap * 0.95) return null;
                return <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} opacity={0.35} />;
              })
            )}
          </g>
          {nodes.map((n, i) =>
            n.nv ? null : (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r="3.2"
                fill="#A7AEC2"
                opacity="0.65"
                style={{ animation: `pulse-glow 4s ease-in-out infinite`, animationDelay: `${(i % 7) * 0.4}s` }}
              />
            )
          )}
        </g>

        {/* Magnetic field lines sweeping through the lattice */}
        <g fill="none" stroke="#00E5FF" strokeWidth="1.2" opacity="0.55">
          {[0, 1, 2].map((k) => (
            <path
              key={k}
              d={`M -20 ${120 + k * 50} C 120 ${60 + k * 50}, 300 ${200 + k * 40}, 440 ${110 + k * 55}`}
              strokeDasharray="4 7"
              style={{ animation: `dashflow 6s linear infinite`, animationDelay: `${k * 0.8}s` }}
            />
          ))}
        </g>

        {/* Orbiting spin marker around the NV centre */}
        <g style={{ transformOrigin: `${nv.x}px ${nv.y}px`, animation: "spin-slow 11s linear infinite" }}>
          <circle cx={nv.x + 72} cy={nv.y} r="3.5" fill="#7C5CFF">
            <animate attributeName="r" values="3;4.5;3" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* NV centre */}
        <circle cx={nv.x} cy={nv.y} r="46" fill="url(#nvGlow)" filter="url(#soft)" style={{ animation: "pulse-glow 3s ease-in-out infinite" }} />
        <circle cx={nv.x} cy={nv.y} r="6.5" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>

      <style>{`
        @keyframes dashflow { to { stroke-dashoffset: -110; } }
        @keyframes latticeBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }
      `}</style>
    </div>
  );
}
