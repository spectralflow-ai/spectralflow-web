/**
 * Data layer of the Instrument. The interface sees one data model, whatever
 * the source:
 *  - by default, mission files served with the site (public/instrument/data);
 *  - with ?live=1 (expert sessions), the public v2 routes of the compute
 *    API, which return the same model (mission-live.ts, loaded on demand
 *    only).
 * Positions are in map coordinates (0..1, y downward), errors and bounds are
 * divided by one fixed reference of the world; two figures give the physical
 * scale of the simulated mission (metres per unit of error, side of the
 * synthetic map). All of it is model-derived, computed in simulation.
 */

/** Mission files shipped with the site. */
const DATA_DIR = "/instrument/data";
const SEED = 2;
const TIMEOUT_MS = 7000;

export type AttackKind = "gain" | "burst" | "spoof";
export const ATTACK_KINDS: AttackKind[] = ["gain", "burst", "spoof"];

/** A position fix, shown from its instant `t` on. */
export interface Fix {
  t: number;
  x: number;
  y: number;
  /** error, relative */
  e: number;
  /** stated bound, relative */
  b: number;
  withheld: boolean;
  in_bound: boolean;
}

export interface Ring {
  x: number;
  y: number;
  r: number;
  /** instant the ring is shown from */
  t: number;
}

export interface MissionEvent {
  kind: AttackKind;
  t0: number;
  t1: number;
  /** spoof only */
  detected?: boolean;
  ring?: Ring;
}

export interface Counts {
  accepted: number;
  withheld: number;
  in_bound: number;
}

export interface World {
  /** image URL of the map */
  map: string;
  /** map units per unit of relative error: draws a bound on the map */
  k: number;
  /** metres per unit of relative error (the largest inertial drift) */
  unit_m: number;
  /** side of the synthetic map, in metres */
  map_m: number;
  t: number[];
  inertial: number[];
  aided: number[];
  /** segments of [x, y], map frame */
  track: [number, number][][];
  fixes: Fix[];
  events: MissionEvent[];
  counts: Counts;
}

export interface BreakdownLevel {
  key: "inertial" | "raw_mag" | "ai_chain" | "full";
  rel: number;
}

export interface Contact {
  pos: number[];
  prof: number[];
  leak: number;
}

export interface Mission {
  live: boolean;
  nominal: World;
  /** attack instants on offer, per kind, ascending */
  slots: Record<AttackKind, number[]>;
  /** the attacked world, when already in hand */
  attackNow(kind: AttackKind, t0: number): World | null;
  /** the attacked world, resolved from the files or computed live */
  attack(kind: AttackKind, t0: number): Promise<World>;
  breakdown: Promise<BreakdownLevel[]>;
  contact: Promise<Contact>;
}

/** First attack instant on offer at or after `t`, or null. */
export function nextSlot(
  m: Mission,
  kind: AttackKind,
  t: number
): number | null {
  return m.slots[kind].find((s) => s >= t - 1e-6) ?? null;
}

/* ── fetch with a deadline and one more try ─────────────────────────── */

async function fetchOnce(url: string): Promise<Response> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function getJSON<T>(url: string): Promise<T> {
  try {
    return (await (await fetchOnce(url)).json()) as T;
  } catch {
    return (await (await fetchOnce(url)).json()) as T;
  }
}

/** Resolves once the image is in the cache, or after the deadline anyway. */
function preload(src: string): Promise<void> {
  if (typeof Image === "undefined") return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(resolve, TIMEOUT_MS);
    img.onload = img.onerror = () => {
      clearTimeout(timer);
      resolve();
    };
    img.src = src;
  });
}

/* ── static source: the mission files ───────────────────────────────── */

type Leg = Pick<World, "aided" | "fixes" | "events" | "counts">;
interface Pack {
  map: string;
  k: number;
  unit_m: number;
  map_m: number;
  t: number[];
  inertial: number[];
  track: [number, number][][];
  nominal: Leg;
  attacks: Record<AttackKind, Record<string, Leg>>;
  breakdown: BreakdownLevel[];
  contact: Contact;
}

async function loadStatic(): Promise<Mission> {
  const pack = await getJSON<Pack>(`${DATA_DIR}/s${SEED}.json`);
  const map = `${DATA_DIR}/${pack.map}`;
  await preload(map);
  const shared = {
    map,
    k: pack.k,
    unit_m: pack.unit_m,
    map_m: pack.map_m,
    t: pack.t,
    inertial: pack.inertial,
    track: pack.track,
  };
  const slots = {} as Record<AttackKind, number[]>;
  for (const k of ATTACK_KINDS) {
    slots[k] = Object.keys(pack.attacks[k] ?? {})
      .map(Number)
      .sort((a, b) => a - b);
  }
  const attackNow = (kind: AttackKind, t0: number): World | null => {
    const leg = pack.attacks[kind]?.[String(t0)];
    return leg ? { ...shared, ...leg } : null;
  };
  return {
    live: false,
    nominal: { ...shared, ...pack.nominal },
    slots,
    attackNow,
    attack: async (kind, t0) => {
      const w = attackNow(kind, t0);
      if (!w) throw new Error("attack not on offer");
      return w;
    },
    breakdown: Promise.resolve(pack.breakdown),
    contact: Promise.resolve(pack.contact),
  };
}

/** The mission, from the files by default, from the API when `live`. */
export async function loadMission(live: boolean): Promise<Mission> {
  if (!live) return loadStatic();
  const { loadLive } = await import("./mission-live");
  return loadLive();
}
