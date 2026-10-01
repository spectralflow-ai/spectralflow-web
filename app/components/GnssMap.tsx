"use client";

import { useState } from "react";

/**
 * Live GNSS interference map, loaded on request.
 *
 * Before the click: a vignette drawn here, in our own lines (Europe and the
 * Mediterranean, generic zones in faint blue). It is not a copy of any map
 * and carries no data. No third-party request is made until the visitor
 * asks for the live map. On small screens the live map opens in a new tab
 * instead, so the page keeps scrolling normally.
 *
 * The live map is GPSJAM by John Wiseman, credited under the frame.
 */

const LIVE_URL = "https://gpsjam.org/";
const IFRAME_TITLE = "GPSJAM: daily map of likely GNSS interference, by John Wiseman";

/* ----- The vignette: coarse coastlines, longitude and latitude --------- */

const LON0 = -11;
const LAT1 = 61;
const S = 12;
const KX = Math.cos((46 * Math.PI) / 180); // equirectangular, true at 46 N
const VB_W = Math.round((42 - LON0) * KX * S);
const VB_H = Math.round((LAT1 - 29.5) * S);

type LL = [number, number];

const px = ([lon, lat]: LL) => `${((lon - LON0) * KX * S).toFixed(1)} ${((LAT1 - lat) * S).toFixed(1)}`;
const line = (pts: LL[], close = false) =>
  `M${pts.map(px).join(" L")}${close ? " Z" : ""}`;

const COASTS: { pts: LL[]; close?: boolean }[] = [
  // Atlantic and North Sea coast, then the southern Baltic to the Gulf of Finland
  {
    pts: [
      [-5.6, 36.0], [-6.3, 36.5], [-8.0, 37.0], [-9.0, 37.0], [-9.5, 38.7], [-8.7, 41.2],
      [-9.3, 42.9], [-8.4, 43.4], [-5.7, 43.6], [-3.8, 43.5], [-1.6, 43.5], [-1.2, 45.5],
      [-1.2, 46.2], [-2.2, 47.2], [-4.6, 48.4], [-2.0, 48.7], [-1.6, 49.7], [0.1, 49.5],
      [1.1, 49.9], [1.9, 51.0], [2.9, 51.2], [4.1, 51.9], [4.8, 53.0], [6.8, 53.4],
      [8.7, 53.9], [8.4, 55.5], [10.6, 57.7], [10.2, 56.2], [9.7, 55.6], [10.1, 54.4],
      [10.9, 54.0], [12.1, 54.2], [14.3, 53.9], [15.6, 54.2], [18.6, 54.4], [20.0, 54.9],
      [21.1, 55.7], [21.0, 56.5], [21.6, 57.4], [22.6, 57.75], [24.1, 57.0], [24.5, 58.4],
      [24.75, 59.45], [28.0, 59.4], [30.3, 59.9], [28.7, 60.6], [25.0, 60.15], [23.0, 59.8],
      [22.2, 60.45], [21.4, 61.2],
    ],
  },
  // Sweden and Norway
  {
    pts: [
      [17.3, 61.6], [17.2, 60.7], [18.9, 59.3], [16.8, 58.6], [16.4, 56.7], [15.6, 56.1],
      [13.2, 55.4], [12.9, 55.6], [12.7, 56.0], [11.9, 57.7], [10.7, 59.0], [8.0, 58.1],
      [5.7, 58.9], [5.3, 60.4], [5.0, 61.6],
    ],
  },
  // Great Britain
  {
    close: true,
    pts: [
      [-5.7, 50.05], [-4.1, 50.35], [-2.4, 50.6], [-0.1, 50.8], [1.35, 51.1], [0.9, 51.5],
      [1.3, 51.95], [1.75, 52.5], [1.0, 52.95], [0.3, 52.9], [0.1, 53.6], [-0.4, 54.3],
      [-1.4, 55.0], [-3.0, 56.0], [-2.9, 56.45], [-2.1, 57.15], [-2.0, 57.7], [-4.0, 57.6],
      [-3.1, 58.45], [-5.0, 58.6], [-6.0, 57.3], [-5.5, 56.4], [-5.6, 55.3], [-5.0, 54.7],
      [-3.5, 54.9], [-3.0, 54.0], [-3.0, 53.4], [-4.5, 53.3], [-4.1, 52.4], [-5.3, 51.9],
      [-4.0, 51.6], [-2.7, 51.5], [-4.5, 51.0],
    ],
  },
  // Ireland
  {
    close: true,
    pts: [
      [-6.0, 53.3], [-6.3, 52.2], [-8.5, 51.6], [-10.2, 51.8], [-9.9, 52.6], [-9.0, 53.2],
      [-10.0, 54.2], [-8.3, 55.2], [-6.0, 55.2], [-5.5, 54.4],
    ],
  },
  // The Mediterranean, around from Gibraltar to the Atlantic coast of Morocco
  {
    pts: [
      [-5.6, 36.0], [-4.4, 36.7], [-2.4, 36.8], [-1.0, 37.6], [-0.5, 38.3], [-0.3, 39.5],
      [0.8, 40.7], [2.2, 41.4], [3.3, 42.3], [3.0, 42.7], [3.9, 43.5], [5.4, 43.3],
      [6.0, 43.1], [7.3, 43.7], [8.9, 44.4], [9.8, 44.1], [10.3, 43.5], [10.5, 42.9],
      [12.3, 41.7], [13.5, 41.2], [14.3, 40.8], [14.8, 40.6], [15.6, 40.0], [16.0, 38.9],
      [15.65, 38.1], [16.1, 38.0], [17.1, 39.1], [17.2, 40.45], [18.35, 39.8], [18.5, 40.15],
      [17.95, 40.65], [16.9, 41.1], [16.2, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1],
      [12.3, 45.4], [13.8, 45.65], [13.9, 44.85], [14.4, 45.3], [15.2, 44.1], [16.4, 43.5],
      [18.1, 42.65], [19.1, 42.1], [19.45, 41.3], [19.5, 40.45], [20.0, 39.7], [20.75, 38.95],
      [21.7, 38.25], [21.7, 37.0], [22.1, 36.9], [22.5, 36.4], [23.1, 36.45], [22.8, 37.55],
      [23.7, 37.95], [24.0, 37.65], [23.6, 38.5], [22.9, 39.35], [22.9, 40.6], [23.8, 40.0],
      [24.4, 40.9], [25.9, 40.85], [26.4, 40.2], [26.2, 39.5], [26.7, 38.5], [27.4, 37.0],
      [28.3, 36.8], [29.1, 36.6], [30.7, 36.85], [32.0, 36.5], [32.8, 36.0], [34.6, 36.8],
      [36.2, 36.6], [35.8, 35.5], [35.85, 34.4], [35.5, 33.9], [35.0, 32.8], [34.75, 32.05],
      [34.4, 31.5], [32.3, 31.25], [29.9, 31.2], [27.2, 31.35], [23.9, 32.1], [20.1, 32.1],
      [19.5, 30.6], [16.6, 31.2], [15.1, 32.4], [13.2, 32.9], [11.1, 33.2], [10.1, 33.9],
      [10.8, 34.75], [10.8, 35.8], [11.05, 37.05], [10.2, 36.8], [9.9, 37.3], [7.8, 36.9],
      [3.05, 36.75], [-0.6, 35.7], [-2.9, 35.3], [-5.3, 35.9], [-5.8, 35.8], [-6.8, 34.0],
      [-7.6, 33.6], [-9.3, 32.3], [-9.8, 30.4],
    ],
  },
  // The Black Sea
  {
    close: true,
    pts: [
      [29.0, 41.2], [28.0, 41.6], [27.5, 42.5], [27.9, 43.2], [28.65, 44.15], [29.7, 45.2],
      [30.7, 46.5], [31.8, 46.6], [32.5, 45.4], [33.5, 44.6], [34.2, 44.5], [35.4, 45.0],
      [36.5, 45.3], [37.8, 44.7], [39.7, 43.6], [41.6, 41.6], [39.7, 41.0], [36.3, 41.3],
      [35.1, 42.0], [33.0, 41.9], [31.8, 41.45], [29.9, 41.15],
    ],
  },
  // The Sea of Azov
  {
    close: true,
    pts: [[35.4, 45.3], [35.0, 45.9], [37.0, 47.1], [39.2, 47.2], [38.2, 46.4], [37.8, 45.6], [36.6, 45.3]],
  },
  // Islands
  { close: true, pts: [[9.4, 43.0], [9.5, 42.0], [9.2, 41.4], [8.6, 41.7], [8.6, 42.5]] },
  { close: true, pts: [[9.2, 41.2], [9.8, 40.8], [9.6, 39.2], [9.0, 39.0], [8.4, 39.0], [8.2, 40.6]] },
  { close: true, pts: [[12.4, 38.0], [13.4, 38.2], [15.5, 38.3], [15.1, 37.0], [14.3, 36.7], [12.5, 37.6]] },
  { close: true, pts: [[23.5, 35.6], [24.5, 35.4], [26.3, 35.3], [26.2, 35.0], [24.7, 35.1], [23.5, 35.3]] },
  { close: true, pts: [[32.3, 35.0], [33.0, 35.4], [34.6, 35.7], [34.0, 35.0], [33.0, 34.6]] },
  { close: true, pts: [[2.4, 39.6], [3.4, 39.85], [3.2, 39.3], [2.6, 39.45]] },
];

const COAST_PATHS = COASTS.map((c) => line(c.pts, c.close));

/* Generic zones: soft clusters of cells, no data. */
const HEX_R = 7.5;
function hexPath(cx: number, cy: number, r = HEX_R) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function cluster(center: LL, rings: number, seed: number) {
  const [cx, cy] = px(center).split(" ").map(Number);
  const dx = HEX_R * Math.sqrt(3);
  const dy = HEX_R * 1.5;
  const cells: { d: string; o: number }[] = [];
  for (let q = -rings; q <= rings; q++) {
    for (let r = -rings; r <= rings; r++) {
      const dist = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
      if (dist > rings) continue;
      // Deterministic thinning so each cluster has an irregular edge.
      const h = Math.abs(Math.sin((q + 3.1) * 12.9898 + (r + 1.7) * 78.233 + seed) * 43758.5453) % 1;
      if (dist === rings && h < 0.45) continue;
      const x = cx + dx * (q + r / 2);
      const y = cy + dy * r;
      cells.push({ d: hexPath(x, y), o: dist === 0 ? 0.34 : dist === 1 ? 0.24 : 0.13 });
    }
  }
  return cells;
}

const ZONES = [
  ...cluster([21.5, 57.2], 3, 1),
  ...cluster([33.5, 45.2], 3, 2),
  ...cluster([34.3, 34.0], 2, 3),
];

function Vignette() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden
      focusable="false"
    >
      <g fill="none" stroke="var(--text-primary)" strokeOpacity="0.32" strokeWidth="0.9" strokeLinejoin="round">
        {COAST_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="0.6">
        {ZONES.map((z, i) => (
          <path key={i} d={z.d} fill="var(--accent)" fillOpacity={z.o} />
        ))}
      </g>
    </svg>
  );
}

export default function GnssMap({
  showArgument = true,
  className = "",
}: {
  /** Print the sentence that turns the map towards our question. */
  showArgument?: boolean;
  className?: string;
}) {
  const [live, setLive] = useState(false);

  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden rounded-[var(--radius)] aspect-[4/3] md:aspect-[16/9]"
        style={{ border: "1px solid var(--border)", background: "var(--surface-2)" }}
      >
        {live ? (
          <iframe
            src={LIVE_URL}
            title={IFRAME_TITLE}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        ) : (
          <>
            <Vignette />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <button
                type="button"
                onClick={() => setLive(true)}
                className="btn-primary hidden md:inline-flex"
              >
                Load today&apos;s live map
              </button>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary md:hidden"
              >
                Open the live map <span aria-hidden>↗</span>
                <span className="sr-only"> (opens gpsjam.org in a new tab)</span>
              </a>
              <span className="figure-label is-plain">Illustration. The live map loads from gpsjam.org.</span>
            </div>
          </>
        )}
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 max-w-3xl">
        <p className="source-note">
          Live map:{" "}
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
            GPSJAM
          </a>{" "}
          by John Wiseman, built from aircraft ADS-B navigation-accuracy reports. Red cells mean many
          aircraft reported low accuracy, usually but not always caused by interference. Third-party
          data, not Spectral Flow&apos;s.
        </p>
        {showArgument && (
          <p className="text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
            The map shows where aircraft lost confidence in satellite positioning. It cannot show how
            wrong each position was. That is the question our instrument is designed to answer.
          </p>
        )}
      </figcaption>
    </figure>
  );
}
