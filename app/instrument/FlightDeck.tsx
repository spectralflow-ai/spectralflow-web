"use client";

/**
 * FlightDeck V2: the SF100 story computed live on the Railway twin backend.
 * One mission on one screen: map + error chart side by side, live inertial
 * vs aided readouts, an event console, a compact mission log, a debrief
 * overlay, and the two-depth science layer one click away on every panel.
 * All figures model-derived.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchAblation,
  fetchWorld,
  type AblationResult,
  type Attack,
  type World,
} from "../lib/twin";
import { PROFILES, type ProfileKey } from "./profiles";
import { getTopic, type TopicKey } from "./science";

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

function fmtM(v: number): string {
  return v >= 950 ? `${(v / 1000).toFixed(1)} km` : `${Math.round(v)} m`;
}

/** Linear interpolation of a sampled curve at mission time t. */
function valAt(ts: number[], es: number[], t: number): number {
  if (!ts.length) return 0;
  if (t <= ts[0]) return es[0];
  for (let i = 1; i < ts.length; i++) {
    if (ts[i] >= t) {
      const f = (t - ts[i - 1]) / (ts[i] - ts[i - 1] || 1);
      return es[i - 1] + f * (es[i] - es[i - 1]);
    }
  }
  return es[es.length - 1];
}

export default function FlightDeck({ profile }: { profile: ProfileKey }) {
  const P = PROFILES[profile];
  const [seed, setSeed] = useState(2);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);
  const [t, setT] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lastAttack, setLastAttack] = useState<
    "gain" | "burst" | "spoof" | null
  >(null);
  const [reviewing, setReviewing] = useState(false);
  const [topic, setTopic] = useState<TopicKey | null>(null);
  const [abl, setAbl] = useState<AblationResult | null>(null);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);

  // level-by-level breakdown, fetched once the mission is over
  const landedNow = t >= T_END && !!world;
  useEffect(() => {
    if (!landedNow) return;
    let live = true;
    setAbl(null);
    fetchAblation(seed, 20, attacks)
      .then((a) => live && setAbl(a))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [landedNow, seed, attacks]);

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
  const tick = useCallback((now: number) => {
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
  }, []);
  useEffect(() => {
    if (playing) {
      last.current = 0;
      raf.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf.current);
    }
  }, [playing, tick]);

  // attacks open after the 60 s calibration prefix (server clamps too)
  const canAttack = attacks.length < 3 && t >= 70 && t <= T_END - 150;
  const attack = (kind: "gain" | "burst" | "spoof") => {
    if (!canAttack) return;
    setAttacks((a) => [...a, [kind, Math.round(t * 10) / 10]]);
    setLastAttack(kind);
    setReviewing(false);
  };

  const reset = () => {
    setAttacks([]);
    setLastAttack(null);
    setReviewing(false);
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
  const landed = t >= T_END && !!world;

  return (
    <div
      className="cinema deck-shell"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(0.8rem,1.6vw,1.4rem)",
        gap: "0.8rem",
      }}
    >
      {/* top bar: clock, timeline, transport */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 130 }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "1.3rem",
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
            style={{ padding: "0.45rem 0.9rem" }}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Pause" : t >= T_END ? "Replay" : "Play"}
          </button>
          {landed && reviewing ? (
            <button
              className="btn-ghost"
              style={{ padding: "0.45rem 0.9rem" }}
              onClick={() => setReviewing(false)}
            >
              Debrief
            </button>
          ) : (
            <button
              className="btn-ghost"
              style={{ padding: "0.45rem 0.9rem" }}
              onClick={() => {
                setPlaying(false);
                setT(T_END);
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* the two living panels */}
      <div className="deck-panels" style={{ flex: 1, minHeight: 0 }}>
        <MapPanel
          world={world}
          t={t}
          title={P.mapTitle}
          loading={loading}
          profile={profile}
          onTopic={setTopic}
        />
        <ErrorPanel world={world} t={t} profile={profile} onTopic={setTopic} />
      </div>

      {/* bottom strip: console | mission log */}
      <div className="deck-bottom">
        <div
          className="card"
          style={{
            padding: "0.7rem 0.9rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-ghost"
              style={{ padding: "0.45rem 0.9rem", borderColor: "#5A3328" }}
              disabled={!canAttack}
              onClick={() => attack("gain")}
            >
              {P.atk1}
            </button>
            <button
              className="btn-ghost"
              style={{ padding: "0.45rem 0.9rem", borderColor: "#5A3328" }}
              disabled={!canAttack}
              onClick={() => attack("burst")}
            >
              {P.atk2}
            </button>
            <button
              className="btn-ghost"
              style={{ padding: "0.45rem 0.9rem", borderColor: "#2E4A3F" }}
              disabled={!canAttack}
              onClick={() => attack("spoof")}
            >
              {P.atk3}
            </button>
            <Chip k="attack_gain" profile={profile} onOpen={setTopic} />
            <Chip k="attack_burst" profile={profile} onOpen={setTopic} />
            <Chip k="spoofing" profile={profile} onOpen={setTopic} />
            <Chip k="fleet" profile={profile} onOpen={setTopic} />
          </div>
          {lastAttack ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ minHeight: 0, overflow: "hidden" }}
            >
              <span className="figure-label" style={{ color: BLUE }}>
                {P.impactKicker} ·{" "}
              </span>
              <span
                style={{ color: TXT, fontWeight: 500, fontSize: "0.85rem" }}
              >
                {P.impact[lastAttack].title}.
              </span>{" "}
              <span style={{ color: "#9AA2B1", fontSize: "0.82rem" }}>
                {P.impact[lastAttack].body}
              </span>
            </motion.div>
          ) : (
            <span className="figure-label" style={{ color: MUTED }}>
              {attacks.length === 0
                ? P.consoleIdle
                : `${attacks.length} event${
                    attacks.length > 1 ? "s" : ""
                  } live · ${3 - attacks.length} remaining · watch the self-check`}
            </span>
          )}
        </div>

        <div
          className="card"
          style={{
            padding: "0.7rem 0.9rem",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.4rem",
            }}
          >
            <span className="figure-label">Mission log</span>
            <Chip k="contact" profile={profile} onOpen={setTopic} />
            <Chip k="calibration" profile={profile} onOpen={setTopic} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto",
              minHeight: 0,
              flex: 1,
              maxHeight: 120,
            }}
          >
            {log
              .filter((r) => r.t <= t)
              .reverse()
              .map((r, i) => (
                <LogLine key={i} row={r} />
              ))}
          </div>
        </div>
      </div>

      {/* cold open */}
      {!started && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            background: "rgba(8,11,19,0.9)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 650,
                color: TXT,
                margin: "0 0 0.7rem",
                letterSpacing: "-0.02em",
              }}
            >
              {P.coldTitle}
            </h2>
            <p
              style={{
                color: "#AEB4C0",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                margin: "0 0 1.4rem",
              }}
            >
              {P.coldSub}
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setStarted(true);
                setPlaying(true);
              }}
            >
              {P.coldCta}
            </button>
          </div>
        </div>
      )}

      {/* debrief overlay */}
      {t >= T_END && world && !reviewing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            background: "rgba(9,12,21,0.88)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              width: "100%",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          >
            <div className="figure-label" style={{ color: BLUE }}>
              Mission debrief · every figure model-derived
            </div>
            <p
              style={{
                color: TXT,
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                fontWeight: 600,
                lineHeight: 1.45,
                margin: "0.7rem 0 0",
              }}
            >
              {P.headline.replace(
                "{pct}",
                world.metrics.drift_removed_pct.toFixed(0)
              )}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: "0.75rem",
                margin: "1rem 0 1.2rem",
              }}
            >
              <Metric
                label="Inertial drift removed"
                value={`${world.metrics.drift_removed_pct.toFixed(0)}%`}
                tone={TEAL}
              />
              <Metric
                label="Bounded error, back half"
                value={fmtM(world.metrics.bounded_back_half_m)}
              />
              <Metric
                label="Inertial alone would be"
                value={fmtM(world.metrics.dr_end_m)}
                tone={RED}
              />
              <Metric
                label="Fixes accepted / withheld"
                value={`${world.metrics.fixes_accepted} / ${world.metrics.fixes_withheld}`}
              />
            </div>
            <Waterfall abl={abl} />
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button className="btn-primary" onClick={reset}>
                Replay this world
              </button>
              <button className="btn-ghost" onClick={newWorld}>
                New world
              </button>
              <button
                className="btn-ghost"
                onClick={() => setReviewing(true)}
              >
                Review the flight
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* science modal */}
      {topic && (
        <ScienceModal
          k={topic}
          profile={profile}
          onClose={() => setTopic(null)}
        />
      )}

      <style>{`
        .deck-panels {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 0.8rem;
        }
        .deck-bottom {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 0.8rem;
        }
        @media (min-width: 900px) {
          .deck-shell {
            height: clamp(520px, calc(100dvh - 235px), 860px);
          }
        }
        @media (max-width: 899px) {
          .deck-panels { grid-template-columns: 1fr; }
          .deck-bottom { grid-template-columns: 1fr; }
          .map-box { width: 100% !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
}

/* ── the product waterfall ──────────────────────────────────────────── */

const LEVEL_META: Record<
  string,
  { label: string; color: string }
> = {
  inertial: { label: "IMU alone · gyro + accelerometer drift", color: RED },
  raw_mag: {
    label: "+ a bare magnetometer · classical MagNav",
    color: "#C89B6B",
  },
  ai_chain: {
    label: "+ SF100 tensor array · separation & self-check",
    color: BLUE,
  },
  full: { label: "+ fusion observers · the product", color: TEAL },
};

function Waterfall({ abl }: { abl: AblationResult | null }) {
  if (!abl) {
    return (
      <p
        className="figure-label"
        style={{ color: MUTED, margin: "0 0 1.1rem" }}
      >
        computing the level-by-level breakdown, four full recomputations of
        this exact world...
      </p>
    );
  }
  const ref = Math.max(...abl.levels.map((l) => l.median_back_m), 1);
  return (
    <div style={{ margin: "0 0 1.2rem" }}>
      <div className="figure-label" style={{ marginBottom: "0.5rem" }}>
        Where the performance comes from
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {abl.levels.map((l) => {
          const meta = LEVEL_META[l.key];
          const w = Math.max((l.median_back_m / ref) * 100, 1.2);
          return (
            <div
              key={l.key}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px,290px) 1fr 70px",
                gap: "0.7rem",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#9AA2B1", fontSize: "0.78rem" }}>
                {meta.label}
              </span>
              <div
                style={{
                  height: 8,
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 0.7 }}
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background: meta.color,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: meta.color,
                  fontSize: "0.82rem",
                  textAlign: "right",
                }}
              >
                {fmtM(l.median_back_m)}
              </span>
            </div>
          );
        })}
      </div>
      <p
        className="figure-label"
        style={{ color: MUTED, marginTop: "0.45rem" }}
      >
        median position error, back half of the flight · same world, each
        level fully recomputed · the array is also what creates the
        integrity signal the observers rely on, and the detection channel
      </p>

      <div className="figure-label" style={{ margin: "0.9rem 0 0.5rem" }}>
        And swap only the sensor · same corridor, nominal leg
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <SwapBar
          label="conventional vector array · 200 pT/√Hz, thermal drift"
          value={abl.envelope.conventional.median_back_m}
          reference={abl.envelope.conventional.median_back_m}
          color="#C89B6B"
        />
        <SwapBar
          label="SF100 diamond array · quantum-stable reference"
          value={abl.envelope.sf100.median_back_m}
          reference={abl.envelope.conventional.median_back_m}
          color={TEAL}
        />
      </div>
      <p
        className="figure-label"
        style={{ color: MUTED, marginTop: "0.45rem" }}
      >
        the conventional stand-in is generous (premium compact array); its
        scale-factor and offset drift leak the 47 µT Earth field into the
        very band the map lives in · the chain withheld{" "}
        {abl.envelope.conventional_withheld} of {abl.envelope.n_fixes} of
        its fixes as untrustworthy
      </p>
    </div>
  );
}

function SwapBar({
  label,
  value,
  reference,
  color,
}: {
  label: string;
  value: number;
  reference: number;
  color: string;
}) {
  const w = Math.max((value / Math.max(reference, 1)) * 100, 1.2);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(180px,290px) 1fr 70px",
        gap: "0.7rem",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#9AA2B1", fontSize: "0.78rem" }}>{label}</span>
      <div
        style={{
          height: 8,
          borderRadius: 99,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 0.7 }}
          style={{ height: "100%", borderRadius: 99, background: color }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          color,
          fontSize: "0.82rem",
          textAlign: "right",
        }}
      >
        {fmtM(value)}
      </span>
    </div>
  );
}

/* ── science chips + modal ──────────────────────────────────────────── */

function Chip({
  k,
  profile,
  onOpen,
}: {
  k: TopicKey;
  profile: ProfileKey;
  onOpen: (k: TopicKey) => void;
}) {
  const t = getTopic(k, profile);
  return (
    <button
      onClick={() => onOpen(k)}
      style={{
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 999,
        padding: "0.1rem 0.6rem",
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        color: MUTED,
        background: "rgba(255,255,255,0.03)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      &#9432; {t.short}
    </button>
  );
}

function ScienceModal({
  k,
  profile,
  onClose,
}: {
  k: TopicKey;
  profile: ProfileKey;
  onClose: () => void;
}) {
  const t = getTopic(k, profile);
  const [deep, setDeep] = useState(false);
  useEffect(() => setDeep(false), [k]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(5,8,15,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          maxWidth: 620,
          width: "100%",
          maxHeight: "82dvh",
          overflowY: "auto",
          padding: "1.4rem 1.6rem",
          background: "#0E1420",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "baseline",
          }}
        >
          <p
            style={{
              color: TXT,
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: 0,
            }}
          >
            {t.title}
          </p>
          <button
            onClick={onClose}
            aria-label="close"
            style={{
              background: "none",
              border: "none",
              color: MUTED,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ✕
          </button>
        </div>
        <p
          style={{
            color: "#C7CCD6",
            fontSize: "0.92rem",
            lineHeight: 1.6,
            margin: "0.7rem 0 0.9rem",
          }}
        >
          {t.simple}
        </p>
        {deep ? (
          <div>
            <div className="figure-label" style={{ color: BLUE }}>
              The actual science
            </div>
            {t.deep.split("\n\n").map((par, i) => (
              <p
                key={i}
                style={{
                  color: "#9AA2B1",
                  fontSize: "0.86rem",
                  lineHeight: 1.6,
                  margin: "0.6rem 0",
                }}
              >
                {par}
              </p>
            ))}
            <p
              style={{
                color: MUTED,
                fontSize: "0.76rem",
                marginTop: "0.8rem",
              }}
            >
              References: {t.refs}
            </p>
          </div>
        ) : (
          <button className="btn-ghost" onClick={() => setDeep(true)}>
            Go deeper · the actual science
          </button>
        )}
      </motion.div>
    </div>
  );
}

/* ── panels ─────────────────────────────────────────────────────────── */

function MapPanel({
  world,
  t,
  title,
  loading,
  profile,
  onTopic,
}: {
  world: World | null;
  t: number;
  title: string;
  loading: boolean;
  profile: ProfileKey;
  onTopic: (k: TopicKey) => void;
}) {
  const ext = world?.map.extent_m ?? 1;
  const nShow = world ? Math.max(0.01, Math.min(t / T_END, 1)) : 0;
  return (
    <div
      className="card"
      style={{
        padding: "0.7rem 0.9rem",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.45rem",
          flexWrap: "wrap",
        }}
      >
        <span className="figure-label">{title}</span>
        <Chip k="map" profile={profile} onOpen={onTopic} />
        <Chip k="tensor" profile={profile} onOpen={onTopic} />
      </div>
      <div
        className="map-box"
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          aspectRatio: "1 / 1",
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
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
              display: "block",
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
                  strokeWidth={1.6}
                  vectorEffect="non-scaling-stroke"
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
            {world.faults
              .filter(
                (f) =>
                  f.kind === "spoof" &&
                  f.detected &&
                  f.ring &&
                  f.t_cpa !== undefined &&
                  t >= f.t_cpa + 20
              )
              .map((f, i) => (
                <g key={`ring${i}`}>
                  <circle
                    cx={f.ring!.x}
                    cy={ext - f.ring!.y}
                    r={f.ring!.r}
                    fill={TEAL}
                    fillOpacity={0.07}
                    stroke={TEAL}
                    strokeWidth={1.4}
                    strokeDasharray="6 5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={f.ring!.x}
                    cy={ext - f.ring!.y}
                    r={ext / 140}
                    fill={TEAL}
                  />
                </g>
              ))}
          </svg>
        )}
      </div>
    </div>
  );
}

function ErrorPanel({
  world,
  t,
  profile,
  onTopic,
}: {
  world: World | null;
  t: number;
  profile: ProfileKey;
  onTopic: (k: TopicKey) => void;
}) {
  const W = 720;
  const H = 300;
  const X0 = 10;
  const Y0 = 292;
  const YT = 8;
  const plotW = W - X0 - 10;
  const yMax = useMemo(() => {
    if (!world) return 300;
    return Math.max(150, Math.max(...world.aided.e) * 1.3);
  }, [world]);

  const px = (tt: number) => X0 + (tt / T_END) * plotW;
  const py = (e: number) => Math.max(Y0 - (e / yMax) * (Y0 - YT), YT);

  const path = (ts: number[], es: number[]) => {
    const pts: string[] = [];
    for (let i = 0; i < ts.length; i++) {
      if (ts[i] > t) break;
      pts.push(
        `${i === 0 ? "M" : "L"}${px(ts[i]).toFixed(1)},${py(es[i]).toFixed(1)}`
      );
    }
    return pts.join(" ");
  };

  const eDr = world ? valAt(world.dr.t, world.dr.e, t) : 0;
  const eAid = world ? valAt(world.aided.t, world.aided.e, t) : 0;

  return (
    <div
      className="card"
      style={{
        padding: "0.7rem 0.9rem",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
          marginBottom: "0.45rem",
          flexWrap: "wrap",
        }}
      >
        <span className="figure-label">Position error</span>
        <Readout color={RED} label="inertial only" value={fmtM(eDr)} />
        <Readout color={BLUE} label="with magnetic fixes" value={fmtM(eAid)} />
        <span style={{ flex: 1 }} />
        <Chip k="drift" profile={profile} onOpen={onTopic} />
        <Chip k="selfcheck" profile={profile} onOpen={onTopic} />
        <Chip k="recursive" profile={profile} onOpen={onTopic} />
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "absolute",
            inset: 0,
          }}
        >
          {/* frame + quarter gridlines */}
          <line
            x1={X0}
            x2={X0 + plotW}
            y1={Y0}
            y2={Y0}
            stroke="rgba(255,255,255,0.18)"
            vectorEffect="non-scaling-stroke"
          />
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={X0}
              x2={X0 + plotW}
              y1={Y0 - f * (Y0 - YT)}
              y2={Y0 - f * (Y0 - YT)}
              stroke="rgba(255,255,255,0.06)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {world?.faults.map((f, i) => (
            <rect
              key={i}
              x={px(f.t0)}
              y={YT}
              width={px(Math.min(f.t1, T_END)) - px(f.t0)}
              height={Y0 - YT}
              fill={f.kind === "spoof" ? TEAL : RED}
              opacity={0.07}
            />
          ))}
          {world && (
            <>
              <path
                d={path(world.aided.t, world.aided.e)}
                fill="none"
                stroke={BLUE}
                strokeWidth={2.4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* dashed reference drawn on top: still visible when the
                  aided track falls back onto pure inertial */}
              <path
                d={path(world.dr.t, world.dr.e)}
                fill="none"
                stroke={RED}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="7 5"
                vectorEffect="non-scaling-stroke"
                opacity={0.95}
              />
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
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                    {f.withheld ? (
                      <g
                        stroke={RED}
                        strokeWidth={2}
                        vectorEffect="non-scaling-stroke"
                      >
                        <line
                          x1={px(f.t) - 5}
                          x2={px(f.t) + 5}
                          y1={py(f.err_m) - 5}
                          y2={py(f.err_m) + 5}
                          vectorEffect="non-scaling-stroke"
                        />
                        <line
                          x1={px(f.t) - 5}
                          x2={px(f.t) + 5}
                          y1={py(f.err_m) + 5}
                          y2={py(f.err_m) - 5}
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    ) : (
                      <line
                        x1={px(f.t)}
                        x2={px(f.t)}
                        y1={py(f.err_m)}
                        y2={py(f.err_m) + 0.01}
                        stroke={BLUE}
                        strokeWidth={7}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                  </g>
                ))}
            </>
          )}
        </svg>
      </div>
      <div
        className="figure-label"
        style={{
          color: MUTED,
          marginTop: "0.35rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>mission time →</span>
        <span>
          gridline every {fmtM(yMax / 4)} · red curve continues off scale
          {world ? ` to ${fmtM(world.metrics.dr_end_m)}` : ""}
        </span>
      </div>
    </div>
  );
}

function Readout({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.4rem",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 99,
          background: color,
          display: "inline-block",
          alignSelf: "center",
        }}
      />
      <span className="figure-label" style={{ color: MUTED }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          color,
          fontSize: "0.95rem",
        }}
      >
        {value}
      </span>
    </span>
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
        fontSize: "0.72rem",
        padding: "0.26rem 0.6rem",
        borderLeft: `2px solid ${bar}`,
        borderRadius: "0 8px 8px 0",
        background: bg,
        color,
        flexShrink: 0,
      }}
    >
      <span style={{ color: MUTED, marginRight: "0.6rem" }}>
        {fmtClock(row.t)}
      </span>
      {row.text}
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="card" style={{ padding: "0.8rem 1rem" }}>
      <div className="figure-label">{label}</div>
      <div
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "1.35rem",
          color: tone ?? TXT,
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
    { t: 90, kind: "info", text: "FILTER · first window: acquiring map lock" },
    { t: 150, kind: "info", text: P.evInterf },
  ];
  for (const f of world.faults) {
    rows.push({
      t: f.t0,
      kind: "bad",
      text: `EVENT · ${P.atkNames[f.kind]} injected`,
    });
    if (f.fleet) {
      rows.push({
        t: f.t0 + 45,
        kind: f.fleet === "coincident" ? "contact" : "info",
        text: f.fleet === "coincident" ? P.fleetCoincident : P.fleetLocal,
      });
    }
    if (f.kind === "spoof" && f.detected && f.t_cpa) {
      rows.push({ t: f.t_cpa - 12, kind: "info", text: P.spoofSearching });
      rows.push({
        t: f.t_cpa + 20,
        kind: "contact",
        text: P.spoofDetected
          .replace("{det}", (f.det ?? 0).toFixed(0))
          .replace("{range}", (f.range_m ?? 0).toFixed(0)),
      });
    }
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
