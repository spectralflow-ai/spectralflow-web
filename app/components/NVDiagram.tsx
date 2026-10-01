/**
 * NVDiagram : a static ink engraving of the nitrogen-vacancy centre:
 * a triangular lattice of carbon sites, one nitrogen substitution
 * (the one blue) beside one missing atom (the vacancy). No 3D, no
 * glow : a drawing, in the engraving language of the site.
 */

const SPACING = 52;
const COLS = 7;
const ROWS = 5;
const X0 = 36;
const Y0 = 40;

type Site = { x: number; y: number; row: number; col: number };

const sites: Site[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    sites.push({
      x: X0 + c * SPACING + (r % 2 === 1 ? SPACING / 2 : 0),
      y: Y0 + r * SPACING * 0.87,
      row: r,
      col: c,
    });
  }
}

// the defect pair, near the centre
const V = sites.find((s) => s.row === 2 && s.col === 3)!;
const N = sites.find((s) => s.row === 2 && s.col === 2)!;

const isV = (s: Site) => s === V;
const isN = (s: Site) => s === N;

// triangular-lattice bonds: right neighbour + the two below
function neighbours(s: Site): Site[] {
  const out: Site[] = [];
  const right = sites.find((t) => t.row === s.row && t.col === s.col + 1);
  if (right) out.push(right);
  const dc = s.row % 2 === 1 ? [0, 1] : [-1, 0];
  for (const d of dc) {
    const below = sites.find((t) => t.row === s.row + 1 && t.col === s.col + d);
    if (below) out.push(below);
  }
  return out;
}

export default function NVDiagram() {
  return (
    <svg
      viewBox="0 0 410 250"
      className="w-full h-auto"
      role="img"
      aria-labelledby="nv-diagram-title"
    >
      <title id="nv-diagram-title">
        A schematic crystal lattice with one nitrogen atom beside one missing carbon: the
        nitrogen-vacancy centre.
      </title>
      {/* bonds */}
      {sites.flatMap((s) =>
        neighbours(s).map((t) => (
          <line
            key={`${s.row}-${s.col}-${t.row}-${t.col}`}
            x1={s.x}
            y1={s.y}
            x2={t.x}
            y2={t.y}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray={isV(s) || isV(t) ? "2 4" : undefined}
          />
        ))
      )}

      {/* carbon sites */}
      {sites.map((s) => {
        if (isV(s)) {
          return (
            <circle
              key={`${s.row}-${s.col}`}
              cx={s.x}
              cy={s.y}
              r={7}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="2.5 3"
            />
          );
        }
        if (isN(s)) {
          return <circle key={`${s.row}-${s.col}`} cx={s.x} cy={s.y} r={5.5} fill="var(--accent)" />;
        }
        return (
          <circle key={`${s.row}-${s.col}`} cx={s.x} cy={s.y} r={3} fill="var(--border-strong)" />
        );
      })}

      {/* labels */}
      <text
        x={N.x}
        y={N.y - 14}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--accent)"
        fontFamily="var(--font-geist-sans)"
      >
        N
      </text>
      <text
        x={V.x}
        y={V.y - 14}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--text-secondary)"
        fontFamily="var(--font-geist-sans)"
      >
        V
      </text>
    </svg>
  );
}

/* ----- The four directions ----------------------------------------------- */

/**
 * NVAxes : one NV centre seen in three dimensions. The vacancy sits at
 * the centre with its four bonds to neighbouring sites; the nitrogen
 * (the one blue) occupies one of them. Because the nitrogen can sit on
 * any of the four bonds, NV centres in a crystal point along four fixed
 * directions, and each senses the part of the field along it. An ink
 * arrow stands for the magnetic field. Static drawing.
 */

type Vec3 = [number, number, number];

const AX_CENTRE = { x: 180, y: 138 };
const AX_SCALE = 92;
const AX_TILT = (20 * Math.PI) / 180;
const LEG = Math.sqrt(8) / 3;

// Tetrahedral bond directions, y up: one straight up, three below.
const BONDS: Vec3[] = [
  [0, 1, 0],
  ...[60, 180, 300].map((d): Vec3 => {
    const a = (d * Math.PI) / 180;
    return [LEG * Math.cos(a), -1 / 3, LEG * Math.sin(a)];
  }),
];

/** Screen position of a 3D direction, seen slightly from above. */
function onScreen(v: Vec3, length = 1) {
  const [x, y, z] = v;
  const yv = y * Math.cos(AX_TILT) - z * Math.sin(AX_TILT);
  const depth = y * Math.sin(AX_TILT) + z * Math.cos(AX_TILT);
  const r1 = (n: number) => Math.round(n * 10) / 10;
  return {
    x: r1(AX_CENTRE.x + AX_SCALE * length * x),
    y: r1(AX_CENTRE.y - AX_SCALE * length * yv),
    depth,
  };
}

const ATOMS = BONDS.map((b, i) => ({ ...onScreen(b), nitrogen: i === 0 }));

const FIELD: Vec3 = (() => {
  const v: Vec3 = [-0.7, 0.45, 0.55];
  const n = Math.hypot(...v);
  return [v[0] / n, v[1] / n, v[2] / n];
})();
const FIELD_TIP = onScreen(FIELD, 1.7);
const FIELD_DIR = (() => {
  const dx = FIELD_TIP.x - AX_CENTRE.x;
  const dy = FIELD_TIP.y - AX_CENTRE.y;
  const n = Math.hypot(dx, dy);
  return { x: dx / n, y: dy / n };
})();

export function NVAxes() {
  const c = AX_CENTRE;
  const t = FIELD_TIP;
  const u = FIELD_DIR;
  const head = 9;
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const base = { x: r1(t.x - u.x * head), y: r1(t.y - u.y * head) };
  const side = { x: r1(-u.y * 4.5), y: r1(u.x * 4.5) };
  // Back sites first, so nearer ones are drawn over them.
  const ordered = [...ATOMS].sort((a, b) => a.depth - b.depth);

  return (
    <svg
      viewBox="20 24 250 184"
      className="w-full h-auto"
      role="img"
      aria-labelledby="nv-axes-title"
    >
      <title id="nv-axes-title">
        One NV centre in three dimensions: a vacancy at the centre, bonded to four neighbouring
        sites, with the nitrogen on one of them. NV centres point along these four directions. An
        arrow shows the magnetic field.
      </title>

      {/* bonds */}
      {ordered.map((a, i) => (
        <line
          key={`b${i}`}
          x1={c.x}
          y1={c.y}
          x2={a.x}
          y2={a.y}
          stroke={a.nitrogen ? "var(--text-primary)" : "var(--text-secondary)"}
          strokeWidth={a.depth < -0.5 ? 0.9 : 1.3}
          opacity={a.depth < -0.5 ? 0.55 : 1}
        />
      ))}

      {/* the magnetic field */}
      <line
        x1={c.x}
        y1={c.y}
        x2={base.x}
        y2={base.y}
        stroke="var(--text-primary)"
        strokeWidth="1.5"
      />
      <polygon
        points={`${t.x},${t.y} ${base.x + side.x},${base.y + side.y} ${base.x - side.x},${base.y - side.y}`}
        fill="var(--text-primary)"
      />
      <text
        x={t.x + 2}
        y={t.y - 11}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--text-secondary)"
        fontFamily="var(--font-geist-sans)"
      >
        magnetic field
      </text>

      {/* neighbouring sites */}
      {ordered.map((a, i) =>
        a.nitrogen ? (
          <circle key={`a${i}`} cx={a.x} cy={a.y} r={6.5} fill="var(--accent)" />
        ) : (
          <circle
            key={`a${i}`}
            cx={a.x}
            cy={a.y}
            r={a.depth < -0.5 ? 4 : 5}
            fill="var(--border-strong)"
            opacity={a.depth < -0.5 ? 0.6 : 1}
          />
        )
      )}

      {/* the vacancy */}
      <circle
        cx={c.x}
        cy={c.y}
        r={8}
        fill="var(--surface-2)"
        stroke="var(--muted)"
        strokeWidth="1"
        strokeDasharray="2.5 3"
      />

      {/* labels */}
      <text
        x={ATOMS[0].x + 13}
        y={ATOMS[0].y + 4}
        fontSize="11"
        fontWeight="600"
        fill="var(--accent)"
        fontFamily="var(--font-geist-sans)"
      >
        N
      </text>
      <text
        x={c.x + 14}
        y={c.y - 8}
        fontSize="11"
        fontWeight="600"
        fill="var(--text-secondary)"
        fontFamily="var(--font-geist-sans)"
      >
        V
      </text>
    </svg>
  );
}
