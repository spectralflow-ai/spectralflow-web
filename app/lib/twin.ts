/**
 * Typed client for the SF100 twin compute API (Railway backend).
 * Base URL from NEXT_PUBLIC_TWIN_API; falls back to localhost in dev.
 * All figures returned are model-derived (digital twin).
 */
export const TWIN_API =
  process.env.NEXT_PUBLIC_TWIN_API ?? "http://127.0.0.1:8611";

export type Attack = ["gain" | "burst", number];

export interface Fix {
  t: number;
  x: number;
  y: number;
  err_m: number;
  bound_m: number;
  scale: number;
  withheld: boolean;
}

export interface Fault {
  kind: "gain" | "burst";
  t0: number;
  t1: number;
  mag: number;
}

export interface World {
  meta: {
    seed: number;
    slow_nT: number;
    t_end: number;
    attacks: Attack[];
    disclaimer: string;
  };
  map: { png_b64: string; extent_m: number };
  track: number[][][]; // segments of [x,y] points in map coordinates
  dr: { t: number[]; e: number[] };
  aided: { t: number[]; e: number[] };
  fixes: Fix[];
  faults: Fault[];
  metrics: {
    dr_end_m: number;
    fix_median_m: number;
    bounded_back_half_m: number;
    fixes_accepted: number;
    fixes_withheld: number;
  };
}

export interface ContactResult {
  track: number[][];
  truth: number[];
  est: number[];
  det: number;
  labels: { platform: string; contact: string };
  leak_nT: number;
  resolved: number;
  n: number;
  plat_std: number;
  prof: number[];
  pos_x: number[];
}

export interface CalibResult {
  before: number[];
  after: number[];
  rms_before: number;
  rms_after: number;
}

function attacksParam(attacks: Attack[]): string {
  return attacks.map(([k, t]) => `${k}:${t}`).join(",");
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${TWIN_API}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`twin api ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export function fetchWorld(
  seed: number,
  slow = 20,
  attacks: Attack[] = []
): Promise<World> {
  const a = attacks.length ? `&attacks=${attacksParam(attacks)}` : "";
  return getJSON<World>(`/api/world?seed=${seed}&slow=${slow}${a}`);
}

export function fetchContact(seed: number): Promise<ContactResult> {
  return getJSON<ContactResult>(`/api/contact?seed=${seed}`);
}

export function fetchCalib(eps: number, seed: number): Promise<CalibResult> {
  return getJSON<CalibResult>(`/api/calib?eps=${eps}&seed=${seed}`);
}
