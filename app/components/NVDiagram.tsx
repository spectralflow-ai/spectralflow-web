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
      aria-label="A diamond lattice with one nitrogen atom beside one missing carbon: the nitrogen-vacancy centre."
    >
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
        fontSize="11"
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
        fontSize="11"
        fontWeight="600"
        fill="var(--muted)"
        fontFamily="var(--font-geist-sans)"
      >
        V
      </text>
    </svg>
  );
}
