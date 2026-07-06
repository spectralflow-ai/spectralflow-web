/**
 * VerticalGlyph — one signature ink-engraving per application vertical, in the
 * site's drawing language (see NVDiagram): thin strokes, dashed for the quantum
 * part, one rare blue. The nitrogen-vacancy sensor is drawn identically across
 * verticals (a blue point inside its dashed detection volume) so the four pages
 * read as one series. All glyphs share a 480x240 (2:1) frame.
 *
 * No 3D, no glow. A drawing. Static (server component).
 */

import type { ReactNode } from "react";

const INK = "var(--text-secondary)";
const MUT = "var(--muted)";
const BORDER = "var(--border)";
const BORDERS = "var(--border-strong)";
const BLUE = "var(--accent)";
const FONT = "var(--font-geist-sans)";

const VB = "0 0 480 240";

/** The shared NV sensor: dashed detection volume + the one blue point. */
function NvSensor({ x, y, label }: { x: number; y: number; label?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="none" stroke={MUT} strokeWidth="1" strokeDasharray="2.5 3" />
      <circle cx={x} cy={y} r={4} fill={BLUE} />
      {label && (
        <text x={x + 15} y={y + 4} fontSize="10" fontWeight="600" fill={MUT} fontFamily={FONT}>
          {label}
        </text>
      )}
    </g>
  );
}

type Site = { x: number; y: number; r: number; c: number };
function lattice(x0: number, y0: number, spacing: number, cols: number, rows: number, maxX: number) {
  const sites: Site[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      sites.push({ x: x0 + c * spacing + (r % 2 ? spacing / 2 : 0), y: y0 + r * spacing * 0.74, r, c });
  const at = (r: number, c: number) => sites.find((s) => s.r === r && s.c === c);
  const bonds: ReactNode[] = [];
  sites.forEach((s) => {
    const right = at(s.r, s.c + 1);
    if (right && right.x < maxX) bonds.push(<line key={`br${s.r}-${s.c}`} x1={s.x} y1={s.y} x2={right.x} y2={right.y} stroke={BORDER} strokeWidth="1" />);
    const dc = s.r % 2 ? [0, 1] : [-1, 0];
    dc.forEach((d) => {
      const b = at(s.r + 1, s.c + d);
      if (b && b.x < maxX && b.x > 8) bonds.push(<line key={`bb${s.r}-${s.c}-${d}`} x1={s.x} y1={s.y} x2={b.x} y2={b.y} stroke={BORDER} strokeWidth="1" />);
    });
  });
  return { sites, at, bonds };
}

function hexagon(cx: number, cy: number, R: number, key: string) {
  const lines: ReactNode[] = [];
  for (let i = 0; i < 6; i++) {
    const a1 = Math.PI / 6 + i * (Math.PI / 3);
    const a2 = Math.PI / 6 + (i + 1) * (Math.PI / 3);
    lines.push(
      <line key={`${key}-${i}`} x1={cx + R * Math.cos(a1)} y1={cy + R * Math.sin(a1)} x2={cx + R * Math.cos(a2)} y2={cy + R * Math.sin(a2)} stroke={INK} strokeWidth="1.2" />
    );
  }
  return lines;
}

/* ---------- Life sciences: two reads of one sensor ---------- */
function LifeSciences() {
  const { sites, at, bonds } = lattice(25, 138, 30, 8, 2, 232);
  const nv = at(0, 3)!;
  const mx = 150, my = 54;
  // relaxometry
  const cx = 358, cy = 118, nvx = 342, nvy = 128;
  const radicals = [[386, 78], [300, 82], [396, 150], [300, 158], [360, 168], [318, 62]];
  const ix = 402, iy = 176, iw = 58, ih = 40;
  let decay = `M ${ix} ${iy}`;
  for (let i = 1; i <= 36; i++) {
    const t = i / 36;
    decay += ` L ${(ix + t * iw).toFixed(1)} ${(iy + (ih - 6) * (1 - Math.exp(-3.2 * t))).toFixed(1)}`;
  }
  return (
    <svg viewBox={VB} className="w-full h-auto" role="img" aria-label="One NV sensor read two ways: the fluorine of a molecule bound at the diamond surface, and the radical noise inside a living cell.">
      {/* NMR scene */}
      {bonds}
      {sites.map((s) => (s === nv ? null : s.x < 232 ? <circle key={`d${s.r}-${s.c}`} cx={s.x} cy={s.y} r="2.3" fill={BORDERS} /> : null))}
      <line x1="20" y1="118" x2="222" y2="118" stroke={INK} strokeWidth="1.3" />
      <text x="22" y="110" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>SURFACE</text>
      {hexagon(mx, my, 13, "hex")}
      <line x1={mx} y1={my - 13} x2={mx} y2={my - 22} stroke={INK} strokeWidth="1.2" />
      <text x={mx} y={my - 25} textAnchor="middle" fontSize="11" fontWeight="600" fill={BLUE} fontFamily={FONT}>¹⁹F</text>
      <path d={`M ${mx + 21} ${my - 6} A 21 21 0 1 1 ${mx + 19} ${my + 9}`} fill="none" stroke={MUT} strokeWidth="1" strokeDasharray="2 3" />
      <line x1={mx - 4} y1={my + 14} x2={nv.x + 4} y2={nv.y - 11} stroke={BLUE} strokeWidth="1.3" strokeDasharray="3 4" />
      <NvSensor x={nv.x} y={nv.y} label="NV" />
      {/* divider */}
      <line x1="240" y1="30" x2="240" y2="210" stroke={BORDER} strokeWidth="1" />
      {/* relaxometry scene */}
      <ellipse cx={cx} cy={cy} rx="100" ry="80" fill="none" stroke={INK} strokeWidth="1.2" />
      <text x="266" y="46" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>CELL</text>
      {radicals.map((p, i) => (
        <g key={`r${i}`}>
          <circle cx={p[0]} cy={p[1]} r="2.4" fill={BORDERS} />
          {i % 2 === 0 && <circle cx={p[0]} cy={p[1]} r="5.5" fill="none" stroke={MUT} strokeWidth="0.8" strokeDasharray="1.5 2.5" />}
        </g>
      ))}
      <text x="404" y="72" fontSize="10" fontWeight="600" fill={MUT} fontFamily={FONT}>ROS</text>
      <NvSensor x={nvx} y={nvy} label="NV" />
      <line x1={ix} y1={iy - ih + 6} x2={ix} y2={iy} stroke={INK} strokeWidth="0.9" />
      <line x1={ix} y1={iy} x2={ix + iw} y2={iy} stroke={INK} strokeWidth="0.9" />
      <path d={decay} fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      <text x={ix} y={iy - ih + 2} fontSize="8.5" fontWeight="600" fill={MUT} fontFamily={FONT}>T1 ↓</text>
    </svg>
  );
}

/* ---------- Semiconductors: a buried current path, imaged ---------- */
function Semiconductors() {
  const layers = [150, 176, 202];
  // current path: down a via, along a buried layer, up, with a defect node
  const path = "M 150 96 L 150 176 L 300 176 L 300 150 L 360 150";
  const arcs = [10, 18, 26];
  return (
    <svg viewBox={VB} className="w-full h-auto" role="img" aria-label="An NV sensor above a stacked chip images the magnetic field of a buried current path.">
      {/* NV sensing plane above the chip */}
      <line x1="60" y1="96" x2="420" y2="96" stroke={INK} strokeWidth="1.2" />
      <text x="60" y="88" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>NV SENSING PLANE</text>
      {[110, 170, 230, 290, 350].map((x) => (
        <circle key={`s${x}`} cx={x} cy={96} r="2.6" fill={BLUE} />
      ))}
      {/* chip stack */}
      {layers.map((y, i) => (
        <rect key={`l${i}`} x="120" y={y - 9} width="240" height="18" rx="3" fill="none" stroke={INK} strokeWidth="1.1" />
      ))}
      {/* current path */}
      <path d={path} fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* field lines around a segment */}
      {arcs.map((r) => (
        <g key={`a${r}`}>
          <path d={`M ${225} ${176 - r} A ${r} ${r} 0 0 1 ${225} ${176 + r}`} fill="none" stroke={MUT} strokeWidth="0.8" strokeDasharray="2 3" />
        </g>
      ))}
      <text x="248" y="150" fontSize="10" fontWeight="600" fill={BLUE} fontFamily={FONT}>current</text>
      <text x="196" y="150" fontSize="9" fill={MUT} fontFamily={FONT}>field</text>
      <text x="128" y="224" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>2.5D / 3D PACKAGE</text>
    </svg>
  );
}

/* ---------- Quantum computing: an NV spin register ---------- */
function QuantumComputing() {
  const { sites, at, bonds } = lattice(150, 96, 34, 5, 3, 356);
  const nv = at(1, 2)!;
  const nuc = at(1, 3)!; // a neighbouring nuclear spin
  return (
    <svg viewBox={VB} className="w-full h-auto" role="img" aria-label="A nitrogen-vacancy electron spin coupled to a neighbouring nuclear spin: a small quantum register in diamond.">
      {bonds}
      {sites.map((s) => (s === nv || s === nuc ? null : <circle key={`d${s.r}-${s.c}`} cx={s.x} cy={s.y} r="2.5" fill={BORDERS} />))}
      {/* coupling between electron and nuclear spin */}
      <line x1={nv.x} y1={nv.y} x2={nuc.x} y2={nuc.y} stroke={MUT} strokeWidth="1" strokeDasharray="2 3" />
      {/* nuclear spin */}
      <circle cx={nuc.x} cy={nuc.y} r="6" fill="none" stroke={INK} strokeWidth="1.3" />
      <path d={`M ${nuc.x + 12} ${nuc.y - 5} A 12 12 0 1 1 ${nuc.x + 10} ${nuc.y + 8}`} fill="none" stroke={MUT} strokeWidth="0.9" strokeDasharray="2 3" />
      <text x={nuc.x + 2} y={nuc.y - 14} fontSize="9.5" fontWeight="600" fill={MUT} fontFamily={FONT}>¹³C</text>
      {/* NV electron spin (the sensor motif = the same blue object) */}
      <NvSensor x={nv.x} y={nv.y} label="NV" />
      {/* optical control cue */}
      <line x1={nv.x - 40} y1={nv.y - 40} x2={nv.x - 12} y2={nv.y - 12} stroke={BLUE} strokeWidth="1.3" />
      <path d={`M ${nv.x - 12} ${nv.y - 12} l -8 1 l 3 -7 z`} fill={BLUE} />
      <text x="150" y="196" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>ROOM-TEMPERATURE SPIN REGISTER</text>
    </svg>
  );
}

/* ---------- Navigation: match a reading to the magnetic map ---------- */
function Navigation() {
  // magnetic-anomaly profile (the map)
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = 40 + (i / 60) * 400;
    const y = 176 + Math.sin(i * 0.5) * 10 + Math.sin(i * 0.17) * 16;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const vx = 300, mapY = 176 + Math.sin(37 * 0.5) * 10 + Math.sin(37 * 0.17) * 16;
  return (
    <svg viewBox={VB} className="w-full h-auto" role="img" aria-label="A vehicle matches its magnetometer reading against a magnetic map to fix position and hold a true heading.">
      {/* magnetic map */}
      <path d={pts.join(" ")} fill="none" stroke={INK} strokeWidth="1.3" />
      <text x="40" y="212" fontSize="8.5" letterSpacing="1.2" fill={MUT} fontFamily={FONT}>MAGNETIC MAP</text>
      {/* vehicle */}
      <path d={`M ${vx - 12} 70 L ${vx + 12} 78 L ${vx - 12} 86 Z`} fill="none" stroke={INK} strokeWidth="1.3" />
      {/* measured reading dropping to the map (the match) */}
      <line x1={vx} y1={88} x2={vx} y2={mapY - 6} stroke={BLUE} strokeWidth="1.3" strokeDasharray="3 4" />
      <circle cx={vx} cy={mapY} r="4" fill={BLUE} />
      <text x={vx + 8} y={mapY - 8} fontSize="9.5" fontWeight="600" fill={BLUE} fontFamily={FONT}>fix</text>
      {/* heading */}
      <line x1={vx + 16} y1={78} x2={vx + 74} y2={78} stroke={BLUE} strokeWidth="1.6" />
      <path d={`M ${vx + 74} 78 l -9 -4 l 0 8 z`} fill={BLUE} />
      <text x={vx + 30} y={68} fontSize="9.5" fontWeight="600" fill={BLUE} fontFamily={FONT}>heading</text>
    </svg>
  );
}

const GLYPHS: Record<string, () => ReactNode> = {
  "life-sciences": LifeSciences,
  semiconductors: Semiconductors,
  "quantum-computing": QuantumComputing,
  navigation: Navigation,
};

export default function VerticalGlyph({ slug }: { slug: string }) {
  const G = GLYPHS[slug];
  return G ? <G /> : null;
}
