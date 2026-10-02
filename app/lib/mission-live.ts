/**
 * Live source of the Instrument (?live=1, expert sessions): the compute API,
 * normalised on arrival by the same rules the mission files were written
 * with, so the interface keeps one data model. Loaded on demand only: the
 * public page never fetches this module.
 */
import {
  getJSON,
  type AttackKind,
  type BreakdownLevel,
  type Contact,
  type Fix,
  type Mission,
  type MissionEvent,
  type World,
} from "./twin";

/** Base URL from NEXT_PUBLIC_TWIN_API; falls back to localhost in dev only. */
const TWIN_API =
  process.env.NEXT_PUBLIC_TWIN_API ??
  (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8611" : "");

const SEED = 2;
/** A fix exists only once its window has closed. */
const REVEAL = 30;
const RING_DELAY = 20;
/** Bounds beyond this are off any scale the deck draws. */
const B_CAP = 2;
const GRID = Array.from({ length: 20 }, (_, i) => 70 + 20 * i);

/** Rounds the exact binary value, half away from zero. */
function rnd(v: number, n: number): number {
  return Number(v.toFixed(n)) + 0;
}

interface RawFix {
  t: number;
  x: number;
  y: number;
  err_m: number;
  bound_m: number;
  withheld: boolean;
}
interface RawFault {
  kind: AttackKind;
  t0: number;
  t1: number;
  detected?: boolean;
  t_cpa?: number;
  ring?: { x: number; y: number; r: number };
}
interface RawWorld {
  map: { png_b64: string; extent_m: number };
  track: number[][][];
  dr: { t: number[]; e: number[] };
  aided: { t: number[]; e: number[] };
  fixes: RawFix[];
  faults: RawFault[];
}
interface RawBreakdown {
  levels: { key: BreakdownLevel["key"]; median_back_m: number }[];
}
interface RawContact {
  prof: number[];
  pos_x: number[];
  leak_nT: number;
}

export function normalizeWorld(raw: RawWorld): Omit<World, "map"> {
  const scale = Math.max(...raw.dr.e) || 1;
  const ext = raw.map.extent_m || 1;
  const px = (x: number) => rnd(x / ext, 4);
  const py = (y: number) => rnd(1 - y / ext, 4);
  const fixes: Fix[] = raw.fixes.map((f) => ({
    t: rnd(f.t + REVEAL, 1),
    x: px(f.x),
    y: py(f.y),
    e: rnd(Math.min(f.err_m / scale, B_CAP), 3),
    b: rnd(Math.min(f.bound_m / scale, B_CAP), 3),
    withheld: !!f.withheld,
    in_bound: f.err_m <= f.bound_m,
  }));
  const events: MissionEvent[] = raw.faults.map((f) => {
    const ev: MissionEvent = {
      kind: f.kind,
      t0: rnd(f.t0, 1),
      t1: rnd(f.t1, 1),
    };
    if (f.kind === "spoof") {
      const det = !!f.detected && !!f.ring && f.t_cpa != null;
      ev.detected = det;
      if (det && f.ring && f.t_cpa != null) {
        ev.ring = {
          x: px(f.ring.x),
          y: py(f.ring.y),
          r: rnd(f.ring.r / ext, 4),
          t: rnd(f.t_cpa + RING_DELAY, 1),
        };
      }
    }
    return ev;
  });
  const acc = fixes.filter((f) => !f.withheld);
  return {
    t: raw.dr.t.map((v) => rnd(v, 1)),
    inertial: raw.dr.e.map((v) => rnd(v / scale, 3)),
    aided: raw.aided.e.map((v) => rnd(v / scale, 3)),
    track: raw.track.map((seg) =>
      seg.map((p) => [px(p[0]), py(p[1])] as [number, number])
    ),
    fixes,
    events,
    counts: {
      accepted: acc.length,
      withheld: fixes.length - acc.length,
      in_bound: acc.filter((f) => f.in_bound).length,
    },
  };
}

export function normalizeBreakdown(raw: RawBreakdown): BreakdownLevel[] {
  const ref =
    raw.levels.find((l) => l.key === "inertial")?.median_back_m || 1;
  return raw.levels.map((l) => ({
    key: l.key,
    rel: rnd(l.median_back_m / ref, 2),
  }));
}

export function normalizeContact(raw: RawContact): Contact {
  const m = Math.min(raw.prof.length, raw.pos_x.length);
  const prof = raw.prof.slice(0, m);
  const pos = raw.pos_x.slice(0, m);
  const pk = Math.max(...prof.map(Math.abs)) || 1;
  const xk = Math.max(...pos.map(Math.abs)) || 1;
  return {
    pos: pos.map((v) => rnd(v / xk, 3)),
    prof: prof.map((v) => rnd(v / pk, 3)),
    leak: rnd(Math.abs(raw.leak_nT) / pk, 3),
  };
}

function liveWorld(raw: RawWorld): World {
  return {
    map: `data:image/png;base64,${raw.map.png_b64}`,
    ...normalizeWorld(raw),
  };
}

export async function loadLive(): Promise<Mission> {
  if (TWIN_API === "") throw new Error("no compute backend on this build");
  const base = `${TWIN_API}/api/world?seed=${SEED}&slow=20`;
  const nominal = liveWorld(await getJSON<RawWorld>(base));
  const cache = new Map<string, World>();
  const pending = new Map<string, Promise<World>>();
  const breakdown = getJSON<RawBreakdown>(
    `${TWIN_API}/api/ablation?seed=${SEED}&slow=20`
  ).then(normalizeBreakdown);
  const contact = getJSON<RawContact>(`${TWIN_API}/api/contact?seed=1`).then(
    normalizeContact
  );
  // handled where they are shown; this only avoids an unhandled rejection
  breakdown.catch(() => {});
  contact.catch(() => {});
  return {
    live: true,
    nominal,
    slots: { gain: GRID, burst: GRID, spoof: GRID },
    attackNow: (kind, t0) => cache.get(`${kind}:${t0}`) ?? null,
    attack: (kind, t0) => {
      const key = `${kind}:${t0}`;
      const hit = cache.get(key);
      if (hit) return Promise.resolve(hit);
      let p = pending.get(key);
      if (!p) {
        p = getJSON<RawWorld>(`${base}&attacks=${key}`)
          .then((raw) => {
            const w = liveWorld(raw);
            cache.set(key, w);
            return w;
          })
          .finally(() => pending.delete(key));
        pending.set(key, p);
      }
      return p;
    },
    breakdown,
    contact,
  };
}
