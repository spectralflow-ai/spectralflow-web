"use client";

/**
 * FlightDeck (V3 MVP) — the SF100 story, computed live on the Railway twin
 * backend and played back in the browser. One mission, real-time playback,
 * a scrubbable timeline, a mission log, and an event console where the user
 * perturbs the instrument and the mission is recomputed on the server.
 * All figures model-derived.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fetchWorld, type World, type Attack } from "../lib/twin";
import { PROFILES, type ProfileKey } from "./profiles";

const SPEED = 12; // mission seconds per wall second
const T_END = 600;

const BLUE = "#6FA1FF";
const RED = "#D08770";
const TEAL = "#5BBD8B";
const TXT = "#F4F5F2";
const MUTED = "#828A9A";

type LogKind = "ok" | "bad" | "info" | "contact";
interface LogRow {
  t: number;
  kind: LogKind;
  text: string;
}

function fmtClock(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `T+${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function FlightDeck({ profile }: { profile: ProfileKey }) {
  const P = PROFILES[profile];
  const [seed, setSeed] = useState(1);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [lastAttack, setLastAttack] = useState<"gain" | "burst" | null>(null);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);

  // fetch world whenever seed or attacks change
  useEffect(() => {
    let live = true;
    setLoading(true);
    fetchWorld(seed, 20, attacks)
      .then((w) => {
        if (live) {
          setWorld(w);
          setLoading(false);
        }
      })
      .catch(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [seed, attacks]);

  // playback clock
  const tick = useCallback(
    (now: number) => {
      if (last.current) {
        const dt = (now - last.current) / 1000;
        setT((prev) => {
          const next = prev + dt * SPEED;
          if (next >= T_END) {
            setPlaying(false);
            return T_END;
          }
          return next;
        });
      }
      last.current = now;
      raf.current = requestAnimationFrame(tick);
    },
    []
  );
  useEffect(() => {
    if (playing) {
      last.current = 0;
      raf.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf.current);
    }
  }, [playing, tick]);

  const attack = (kind: "gain" | "burst") => {
    if (attacks.length >= 3 || t > T_END - 150) return;
    setAttacks((a) => [...a, [kind, Math.round(t * 10) / 10]]);
    setLastAttack(kind);
  };

  const reset = () => {
    setAttacks([]);
    setLastAttack(null);
    setT(0.001);
    setPlaying(true);
  };
  const newWorld = () => {
    setSeed(Math.floor(Math.random() * 90000) + 10);
    reset();
  };

  const log = useMemo(() => (world ? buildLog(world, P) : []), [world, P]);
  const phase = useMemo(
    () => [...P.phases].reverse().find(([p0]) => t >= p0)?.[1] ?? "",
    [t, P]
  );

  return (
    <div className="cinema" style={{ borderRadius: 20, overflow: "hidden" }}>
      <div style={{ padding: "clamp(1rem,3vw,2rem)" }}>
        {/* top bar: clock, timeline, transport */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "1.4rem",
                color: TXT,
                lineHeight: 1,
              }}
            >
              {fmtClock(t)}
            </div>
            <div className="figure-label" style={{ marginTop: 4, color: BLUE }}>
              {phase}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={T_END}
            step={5}
            value={t}
            onChange={(e) => {
              setPlaying(false);
              setT(Number(e.target.value));
            }}
            style={{ width: "100%", accentColor: BLUE }}
            aria-label="mission timeline"
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn-ghost"
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "Pause" : t >= T_END ? "Replay" : "Play"}
            </button>
            <button
              className="btn-ghost"
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => {
                setPlaying(false);
                setT(T_END);
              }}
            >
              Skip
            </button>
          </div>
        </div>

        {/* the two living panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.25fr)",
            gap: "1rem",
          }}
          className="deck-grid"
        >
          <MapPanel world={world} t={t} title={P.mapTitle} loading={loading} />
          <ErrorPanel world={world} t={t} />
        </div>

        {/* event console */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          <button
            className="btn-ghost"
            style={{ padding: "0.55rem 1.1rem", borderColor: "#5A3328" }}
            disabled={attacks.length >= 3 || t > T_END - 150}
            onClick={() => attack("gain")}
          >
            {P.atk1}
          </button>
          <button
            className="btn-ghost"
            style={{ padding: "0.55rem 1.1rem", borderColor: "#5A3328" }}
            disabled={attacks.length >= 3 || t > T_END - 150}
            onClick={() => attack("burst")}
          >
            {P.atk2}
          </button>
          <span className="figure-label" style={{ color: MUTED }}>
            {attacks.length === 0
              ? P.consoleIdle
              : `${attacks.length} event${
                  attacks.length > 1 ? "s" : ""
                } live · ${3 - attacks.length} remaining · watch the self-check`}
          </span>
        </div>

        {/* impact card */}
        {lastAttack && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: "1rem 1.2rem", marginTop: "0.9rem" }}
          >
            <div className="figure-label" style={{ color: BLUE }}>
              {P.impactKicker}
            </div>
            <p
              style={{
                color: TXT,
                fontWeight: 500,
                margin: "0.3rem 0 0.35rem",
              }}
            >
              {P.impact[lastAttack].title}
            </p>
            <p style={{ color: "#9AA2B1", fontSize: "0.9rem", margin: 0 }}>
              {P.impact[lastAttack].body}
            </p>
          </motion.div>
        )}

        {/* mission log */}
        <div className="figure-label" style={{ margin: "1.1rem 0 0.4rem" }}>
          Mission log
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {log
            .filter((r) => r.t <= t)
            .slice(-6)
            .reverse()
            .map((r, i) => (
              <LogLine key={i} row={r} />
            ))}
        </div>

        {/* debrief actions when landed */}
        {t >= T_END && world && (
          <div style={{ marginTop: "1.4rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <Metric
                label="Bounded error, back half"
                value={`${world.metrics.bounded_back_half_m.toFixed(0)} m`}
              />
              <Metric
                label="Inertial alone would be"
                value={`${world.metrics.dr_end_m.toFixed(0)} m`}
              />
              <Metric
                label="Fixes accepted / withheld"
                value={`${world.metrics.fixes_accepted} / ${world.metrics.fixes_withheld}`}
              />
            </div>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={reset}>
                Replay this world
              </button>
              <button className="btn-ghost" onClick={newWorld}>
                New world
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .deck-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── panels ─────────────────────────────────────────────────────────── */

function MapPanel({
  world,
  t,
  title,
  loading,
}: {
  world: World | null;
  t: number;
  title: string;
  loading: boolean;
}) {
  const ext = world?.map.extent_m ?? 1;
  const nShow = world ? Math.max(0.01, Math.min(t / T_END, 1)) : 0;
  return (
    <div className="card" style={{ padding: "0.9rem", position: "relative" }}>
      <div className="figure-label" style={{ marginBottom: "0.5rem" }}>
        {title}
      </div>
      <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
        {world && (
          <img
            src={`data:image/png;base64,${world.map.png_b64}`}
            alt="anomaly map"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
              opacity: loading ? 0.5 : 1,
              transition: "opacity 0.3s",
            }}
          />
        )}
        {world && (
          <svg
            viewBox={`0 0 ${ext} ${ext}`}
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {world.track.map((seg, si) => {
              const cut = Math.floor(seg.length * nShow);
              const pts = seg.slice(0, Math.max(2, cut));
              if (pts.length < 2) return null;
              return (
                <polyline
                  key={si}
                  points={pts.map((p) => `${p[0]},${ext - p[1]}`).join(" ")}
                  fill="none"
                  stroke={TXT}
                  strokeWidth={ext / 260}
                  opacity={0.85}
                />
              );
            })}
            {world.fixes
              .filter((f) => f.t <= t)
              .map((f, i) => (
                <circle
                  key={i}
                  cx={f.x}
                  cy={ext - f.y}
                  r={ext / 90}
                  fill={f.withheld ? RED : BLUE}
                  stroke="#0B0F1A"
                  strokeWidth={ext / 600}
                />
              ))}
          </svg>
        )}
      </div>
    </div>
  );
}

function ErrorPanel({ world, t }: { world: World | null; t: number }) {
  const W = 720;
  const H = 300;
  const X0 = 54;
  const Y0 = 268;
  const plotW = W - X0 - 16;
  const plotH = Y0 - 24;
  const yMax = useMemo(() => {
    if (!world) return 300;
    const m = Math.max(...world.dr.e, ...world.aided.e, 100);
    return m * 1.1;
  }, [world]);

  const px = (tt: number) => X0 + (tt / T_END) * plotW;
  const py = (e: number) => Y0 - (e / yMax) * plotH;

  const path = (ts: number[], es: number[]) => {
    const pts: string[] = [];
    for (let i = 0; i < ts.length; i++) {
      if (ts[i] > t) break;
      pts.push(`${i === 0 ? "M" : "L"}${px(ts[i]).toFixed(1)},${py(es[i]).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <div className="card" style={{ padding: "0.9rem" }}>
      <div className="figure-label" style={{ marginBottom: "0.5rem" }}>
        Position error
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        <line x1={X0} x2={X0 + plotW} y1={Y0} y2={Y0} stroke="rgba(255,255,255,0.18)" />
        <line x1={X0} x2={X0} y1={Y0} y2={20} stroke="rgba(255,255,255,0.18)" />
        {world?.faults.map((f, i) => (
          <rect
            key={i}
            x={px(f.t0)}
            y={20}
            width={px(f.t1) - px(f.t0)}
            height={Y0 - 20}
            fill={RED}
            opacity={0.08}
          />
        ))}
        {world && (
          <>
            <path d={path(world.dr.t, world.dr.e)} fill="none" stroke={RED} strokeWidth={2.2} strokeLinecap="round" />
            <path d={path(world.aided.t, world.aided.e)} fill="none" stroke={BLUE} strokeWidth={2.6} strokeLinecap="round" />
            {world.fixes
              .filter((f) => f.t <= t)
              .map((f, i) => (
                <g key={i}>
                  {!f.withheld && (
                    <line
                      x1={px(f.t)}
                      x2={px(f.t)}
                      y1={py(f.err_m)}
                      y2={py(f.bound_m)}
                      stroke="#2E4470"
                      strokeWidth={3}
                    />
                  )}
                  {f.withheld ? (
                    <g stroke={RED} strokeWidth={2}>
                      <line x1={px(f.t) - 4} x2={px(f.t) + 4} y1={py(f.err_m) - 4} y2={py(f.err_m) + 4} />
                      <line x1={px(f.t) - 4} x2={px(f.t) + 4} y1={py(f.err_m) + 4} y2={py(f.err_m) - 4} />
                    </g>
                  ) : (
                    <circle cx={px(f.t)} cy={py(f.err_m)} r={3.5} fill={BLUE} />
                  )}
                </g>
              ))}
          </>
        )}
        <text x={X0 + 8} y={38} fontSize={12} fill={RED} fontFamily="var(--font-geist-sans)">
          inertial only · drift grows
        </text>
        <text x={X0 + 8} y={54} fontSize={12} fill={BLUE} fontFamily="var(--font-geist-sans)">
          with magnetic fixes · bounded
        </text>
        <text x={X0 + plotW / 2} y={Y0 + 24} textAnchor="middle" fontSize={10} fill={MUTED} letterSpacing="0.15em">
          MISSION TIME →
        </text>
      </svg>
    </div>
  );
}

function LogLine({ row }: { row: LogRow }) {
  const color =
    row.kind === "bad" ? "#D8A08C" : row.kind === "contact" ? "#8CCBAA" : "#9AA2B1";
  const bg =
    row.kind === "bad" ? "#1A1210" : row.kind === "contact" ? "#0F1B16" : "#0E1420";
  const bar =
    row.kind === "bad" ? RED : row.kind === "contact" ? TEAL : "#2E4470";
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.78rem",
        padding: "0.32rem 0.7rem",
        borderLeft: `2px solid ${bar}`,
        borderRadius: "0 8px 8px 0",
        background: bg,
        color,
      }}
    >
      <span style={{ color: MUTED, marginRight: "0.7rem" }}>
        {fmtClock(row.t)}
      </span>
      {row.text}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: "0.8rem 1rem" }}>
      <div className="figure-label">{label}</div>
      <div
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "1.4rem",
          color: TXT,
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ── log builder ────────────────────────────────────────────────────── */
function buildLog(
  world: World,
  P: (typeof PROFILES)[ProfileKey]
): LogRow[] {
  const rows: LogRow[] = [
    { t: 0, kind: "ok", text: P.evTakeoff },
    { t: 150, kind: "info", text: P.evInterf },
  ];
  for (const f of world.faults) {
    rows.push({ t: f.t0, kind: "bad", text: `EVENT · ${P.atkNames[f.kind]} injected` });
  }
  for (const f of world.fixes) {
    rows.push(
      f.withheld
        ? {
            t: f.t,
            kind: "bad",
            text: "SELF-CHECK · fix withheld · navigation continues on inertial",
          }
        : {
            t: f.t,
            kind: "ok",
            text: `FIX ACCEPTED · error ${f.err_m.toFixed(0)} m · bound ${f.bound_m.toFixed(0)} m`,
          }
    );
  }
  rows.push({ t: 430, kind: "info", text: P.evContactHint });
  rows.push({ t: 490, kind: "contact", text: P.evContact });
  return rows.sort((a, b) => a.t - b.t);
}
