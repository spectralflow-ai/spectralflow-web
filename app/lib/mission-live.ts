/**
 * Live source of the Instrument (?live=1, expert sessions): the public v2
 * routes of the compute API, which return the same relative, unitless model
 * as the mission files, so the interface keeps one data model. Loaded on
 * demand only: the public page never fetches this module.
 */
import { getJSON, type BreakdownLevel, type Contact, type Mission, type World } from "./twin";

/** The compute API (Cloud Run, europe-west1); NEXT_PUBLIC_INSTRUMENT_API overrides it. */
const API =
  process.env.NEXT_PUBLIC_INSTRUMENT_API ??
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8611"
    : "https://instrument-api-612035519476.europe-west1.run.app");

const SEED = 2;
const GRID = Array.from({ length: 20 }, (_, i) => 70 + 20 * i);

/** The API names its map by path; the deck needs a full URL. */
function withMap(w: World): World {
  return { ...w, map: /^https?:/.test(w.map) ? w.map : `${API}${w.map}` };
}

export async function loadLive(): Promise<Mission> {
  if (API === "") throw new Error("no compute backend on this build");
  const base = `${API}/v2/world?seed=${SEED}`;
  const nominal = withMap(await getJSON<World>(base));
  const cache = new Map<string, World>();
  const pending = new Map<string, Promise<World>>();
  const breakdown = getJSON<BreakdownLevel[]>(`${API}/v2/breakdown?seed=${SEED}`);
  const contact = getJSON<Contact>(`${API}/v2/contact`);
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
        p = getJSON<World>(`${base}&attack=${key}`)
          .then((w) => {
            const world = withMap(w);
            cache.set(key, world);
            return world;
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
