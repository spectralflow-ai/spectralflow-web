"use client";

/**
 * FlightDeck: one mission computed in simulation, on one screen: map +
 * error chart side by side, an event console, a compact mission log, a
 * debrief overlay, and the two-depth science layer one click away on every
 * panel. One attack per flight; Replay to try another.
 * All figures model-derived, and none is shown as a number: the public
 * layer reports events and counts only. Palette: ink, porcelain, greys and
 * the one cinema blue; series differ by line style (solid, dashed, dotted).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  loadMission,
  nextSlot,
  type AttackKind,
  type BreakdownLevel,
  type Contact,
  type Mission,
  type World,
} from "../lib/twin";
import { CTA_SIMULATION } from "../lib/contact";
import { PROFILES, type ProfileKey } from "./profiles";
import { getTopic, type TopicKey } from "./science";

const SPEED = 12; // mission seconds per wall second
const T_END = 600;
/** attacks open after the calibration prefix and close before the end */
const ATK_OPEN = 70;
const ATK_CLOSE = T_END - 150;

// SVG paints. The deck always sits in a .cinema band, so these mirror the
// cinema tokens (--accent, --text-primary, --muted) for attributes that
// take a plain colour.
const BLUE = "#6FA1FF"; // the one blue (cinema): our chain
const BLUE_SOFT = "rgba(111,161,255,0.38)";
const TXT = "#F4F5F2"; // porcelain on ink: events that need the eye
const GREY = "#AEB4C0"; // light grey: references (inertial alone)
const MUTED = "#828A9A";
// HTML text uses the tokens themselves.
const T_PRIMARY = "var(--text-primary)";
const T_SECONDARY = "var(--text-secondary)";
const T_MUTED = "var(--muted)";

/** Focusable elements inside a container, in tab order. */
function focusables(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

/** Keeps Tab and Shift+Tab inside a dialog. */
function trapTab(e: React.KeyboardEvent, root: HTMLElement | null) {
  if (e.key !== "Tab") return;
  const items = focusables(root);
  if (!items.length) return;
  const first = items[0];
  const lastItem = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || active === root)) {
    e.preventDefault();
    lastItem.focus();
  } else if (!e.shiftKey && active === lastItem) {
    e.preventDefault();
    first.focus();
  }
}

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

/** Renders a refs string, linking arXiv ids and DOIs to their public
 *  records. Everything else (books, patent mentions) stays plain text. */
function RefLinks({ text }: { text: string }) {
  const parts = text.split(/(arXiv:\d{4}\.\d{4,5}|10\.\d{4,}\/[^\s;,)]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        const arxiv = part.match(/^arXiv:(\d{4}\.\d{4,5})$/);
        const href = arxiv
          ? `https://arxiv.org/abs/${arxiv[1]}`
          : /^10\.\d{4,}\//.test(part)
            ? `https://doi.org/${part}`
            : null;
        if (!href) return part;
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {part}
          </a>
        );
      })}
    </>
  );
}

const ATTACKS: { kind: AttackKind; label: "atk1" | "atk2" | "atk3" }[] = [
  { kind: "gain", label: "atk1" },
  { kind: "burst", label: "atk2" },
  { kind: "spoof", label: "atk3" },
];

export default function FlightDeck({
  profile,
  focusOnOpen = false,
  live = false,
}: {
  profile: ProfileKey;
  /** move keyboard focus to the cold open (set when a visitor chose the
   *  mission in the chooser, not on a deep link) */
  focusOnOpen?: boolean;
  /** expert sessions (?live=1): computed by the API instead of the files */
  live?: boolean;
}) {
  const P = PROFILES[profile];

  // the mission data: loaded once, before the first flight can start
  const [mission, setMission] = useState<Mission | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadNonce, setLoadNonce] = useState(0);
  useEffect(() => {
    let alive = true;
    loadMission(live)
      .then((m) => alive && setMission(m))
      .catch(() => alive && setLoadFailed(true));
    return () => {
      alive = false;
    };
  }, [live, loadNonce]);

  // debrief material, resolved as soon as the mission is in hand
  const [abl, setAbl] = useState<BreakdownLevel[] | null>(null);
  const [ablFailed, setAblFailed] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => {
    if (!mission) return;
    let alive = true;
    mission.breakdown
      .then((b) => alive && setAbl(b))
      .catch(() => alive && setAblFailed(true));
    mission.contact
      .then((c) => alive && setContact(c))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [mission]);

  // one attack per flight: the attacked world replaces the nominal one.
  // Its instant sits on the next point of the grid, and everything shown
  // before that instant is identical in both worlds.
  const [attack, setAttack] = useState<{
    kind: AttackKind;
    t0: number;
    world: World;
  } | null>(null);
  const [pending, setPending] = useState<AttackKind | null>(null);
  const [attackFailed, setAttackFailed] = useState(false);
  const flight = useRef(0);
  const world: World | null = attack?.world ?? mission?.nominal ?? null;

  const [t, setT] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lastAttack, setLastAttack] = useState<AttackKind | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [topic, setTopic] = useState<TopicKey | null>(null);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);
  const coldCtaRef = useRef<HTMLButtonElement>(null);
  const debriefRef = useRef<HTMLDivElement>(null);

  // playback clock: never runs without a world to show
  const hasWorld = !!world;
  useEffect(() => {
    if (!playing || !hasWorld) return;
    last.current = 0;
    const tick = (now: number) => {
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
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, hasWorld]);

  const inWindow = t >= ATK_OPEN && t <= ATK_CLOSE;
  const canAttack = !!mission && !attack && !pending && inWindow;
  const slotFor = (kind: AttackKind) =>
    mission ? nextSlot(mission, kind, t) : null;
  const launch = (kind: AttackKind) => {
    if (!canAttack || !mission) return;
    const t0 = slotFor(kind);
    if (t0 === null || t0 > ATK_CLOSE) return;
    setLastAttack(kind);
    setReviewing(false);
    setAttackFailed(false);
    const ready = mission.attackNow(kind, t0);
    if (ready) {
      setAttack({ kind, t0, world: ready });
      return;
    }
    // computed live: the clock waits for the attacked world, so nothing
    // already on screen can change when it lands
    const id = flight.current;
    const wasPlaying = playing;
    setPlaying(false);
    setPending(kind);
    mission
      .attack(kind, t0)
      .then((w) => {
        if (flight.current !== id) return;
        setAttack({ kind, t0, world: w });
        setPending(null);
        if (wasPlaying) setPlaying(true);
      })
      .catch(() => {
        if (flight.current !== id) return;
        setPending(null);
        setLastAttack(null);
        setAttackFailed(true);
        if (wasPlaying) setPlaying(true);
      });
  };

  const reset = () => {
    flight.current += 1;
    setAttack(null);
    setPending(null);
    setAttackFailed(false);
    setLastAttack(null);
    setReviewing(false);
    setT(0.001);
    setPlaying(true);
  };

  const log = useMemo(
    () => (world ? buildLog(world, P, !!contact) : []),
    [world, P, contact]
  );
  const phase = useMemo(
    () => [...P.phases].reverse().find(([p0]) => t >= p0)?.[1] ?? "",
    [t, P]
  );
  const landed = t >= T_END && !!world;
  // the final state stays on screen a moment before the debrief opens
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!landed) return;
    const id = window.setTimeout(() => setHeld(true), 1500);
    return () => {
      window.clearTimeout(id);
      setHeld(false);
    };
  }, [landed]);
  // one of the three overlays (cold open, debrief, science modal) is up:
  // the deck behind it leaves the tab order via `inert`.
  const debriefOpen = landed && held && !reviewing;
  const overlayOpen = !started || debriefOpen || topic !== null;

  // keyboard focus follows the overlays, so it is never left on an
  // element that has just gone inert
  useEffect(() => {
    if (focusOnOpen) coldCtaRef.current?.focus({ preventScroll: true });
  }, [focusOnOpen]);
  useEffect(() => {
    if (debriefOpen) debriefRef.current?.focus({ preventScroll: true });
  }, [debriefOpen]);

  // one line of state under the attack buttons
  const status = attack
    ? "One attack per flight · Replay to try another"
    : pending
      ? "computing your attack live in simulation…"
      : attackFailed
        ? "That attack could not be computed just now · try again"
        : t < ATK_OPEN
          ? `attacks open at ${fmtClock(ATK_OPEN)} · one per flight`
          : t > ATK_CLOSE
            ? "attack window closed · Replay to try one"
            : "one attack per flight";

  // debrief headline: no claim the data does not carry
  const headline = (() => {
    if (!world) return "";
    const c = world.counts;
    if (c.in_bound < c.accepted) return P.headlinePlain;
    if (!attack) return P.headline;
    if (attack.kind === "spoof") {
      const ev = world.events.find((e) => e.kind === "spoof");
      return ev?.detected ? P.headlineSpoof : P.headlineHeld;
    }
    if (c.withheld < 1) return P.headlineHeld;
    const n =
      c.withheld === 1 ? `one ${P.fixWord[0]}` : `${c.withheld} ${P.fixWord[1]}`;
    return P.headlineAttacked.replace("{n}", n);
  })();
  const shellRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  const toggleFullscreen = () => {
    const el = shellRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.().catch(() => undefined);
  };
  // keys: F toggles full screen; in full screen, Space plays or pauses,
  // R replays, 1 2 3 launch the attack (one per flight)
  const keyActions = useRef<{
    launch: (k: AttackKind) => void;
    reset: () => void;
    toggle: () => void;
    play: () => void;
  } | null>(null);
  useEffect(() => {
    keyActions.current = {
      launch,
      reset,
      toggle: toggleFullscreen,
      play: () => setPlaying((p) => !p),
    };
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const a = keyActions.current;
      const target = e.target as HTMLElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.altKey) return;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key === "f" || e.key === "F") {
        a.toggle();
        return;
      }
      if (document.fullscreenElement !== shellRef.current) return;
      if (e.key === " ") {
        e.preventDefault();
        a.play();
      } else if (e.key === "r" || e.key === "R") a.reset();
      else if (e.key === "1") a.launch("gain");
      else if (e.key === "2") a.launch("burst");
      else if (e.key === "3") a.launch("spoof");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const coldSub = `${P.coldSub} ${
    live ? "Computed live in simulation" : "Computed in simulation"
  }; every figure model-derived.`;
  const preparing = !mission;

  return (
    <MotionConfig reducedMotion="user">
    <div
      ref={shellRef}
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
        className="deck-top"
        inert={overlayOpen}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div className="deck-clock">
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "1.3rem",
              color: T_PRIMARY,
              lineHeight: 1,
            }}
          >
            {fmtClock(t)}
          </div>
          <div className="figure-label" style={{ marginTop: 4, color: BLUE }}>
            {landed && !held ? "Mission complete" : phase}
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={T_END}
          step={5}
          value={t}
          disabled={!world || !!pending}
          onChange={(e) => {
            setPlaying(false);
            setT(Number(e.target.value));
          }}
          style={{ width: "100%", accentColor: BLUE }}
          aria-label="mission timeline"
          aria-valuetext={fmtClock(t)}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-ghost"
            style={{ padding: "0.45rem 0.9rem" }}
            disabled={!world || !!pending || t >= T_END}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className="btn-ghost"
            style={{ padding: "0.45rem 0.9rem" }}
            disabled={!world}
            onClick={reset}
          >
            Replay
          </button>
          <button
            className="btn-ghost deck-fs"
            style={{ padding: "0.45rem 0.8rem" }}
            onClick={toggleFullscreen}
            aria-pressed={fullscreen}
            title={fullscreen ? "Exit full screen (F)" : "Full screen (F)"}
          >
            {fullscreen ? "Exit full screen" : "Full screen"}
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
              disabled={!world || !!pending}
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
      <div
        className="deck-panels"
        inert={overlayOpen}
        style={{ flex: 1, minHeight: 0 }}
      >
        <MapPanel
          world={world}
          t={t}
          title={P.mapTitle}
          profile={profile}
          onTopic={setTopic}
        />
        <ErrorPanel world={world} t={t} profile={profile} onTopic={setTopic} />
      </div>

      {/* bottom strip: console | mission log */}
      <div className="deck-bottom" inert={overlayOpen}>
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
            {ATTACKS.map(({ kind, label }) => {
              const chosen = attack?.kind === kind || pending === kind;
              return (
                <button
                  key={kind}
                  className="btn-ghost"
                  aria-pressed={chosen}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderStyle: chosen ? "solid" : "dashed",
                    ...(chosen
                      ? { opacity: 1, borderColor: BLUE, cursor: "default" }
                      : {}),
                  }}
                  disabled={!canAttack || slotFor(kind) === null}
                  onClick={() => launch(kind)}
                >
                  {P[label]}
                </button>
              );
            })}
            <Chip k="attack_gain" profile={profile} onOpen={setTopic} />
            <Chip k="attack_burst" profile={profile} onOpen={setTopic} />
            <Chip k="spoofing" profile={profile} onOpen={setTopic} />
          </div>
          <span
            className="figure-label"
            role="status"
            style={{ color: attack ? BLUE : T_MUTED }}
          >
            {status}
          </span>
          {lastAttack ? (
            <motion.div
              className="deck-impact"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ minHeight: 0, overflow: "hidden" }}
            >
              <span className="figure-label" style={{ color: BLUE }}>
                {P.impactKicker} ·{" "}
              </span>
              <span
                style={{ color: T_PRIMARY, fontWeight: 500, fontSize: "0.85rem" }}
              >
                {P.impact[lastAttack].title}.
              </span>{" "}
              <span style={{ color: T_SECONDARY, fontSize: "0.82rem" }}>
                {P.impact[lastAttack].body}
              </span>
            </motion.div>
          ) : (
            <span className="figure-label" style={{ color: T_MUTED }}>
              {P.consoleIdle}
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
          role="dialog"
          aria-labelledby="deck-coldopen-title"
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
              id="deck-coldopen-title"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 650,
                color: T_PRIMARY,
                margin: "0 0 0.7rem",
                letterSpacing: "-0.02em",
              }}
            >
              {P.coldTitle}
            </h2>
            <p
              style={{
                color: T_SECONDARY,
                fontSize: "0.95rem",
                lineHeight: 1.65,
                margin: "0 0 1.4rem",
              }}
            >
              {coldSub}
            </p>
            {loadFailed && !mission ? (
              <div
                role="alert"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <p style={{ color: T_PRIMARY, fontSize: "0.9rem", margin: 0 }}>
                  {live
                    ? "The live computation did not answer in time. It may be a network hiccup on your side or ours."
                    : "The mission could not be loaded. Check the connection and try again."}
                </p>
                <button
                  ref={coldCtaRef}
                  className="btn-primary"
                  onClick={() => {
                    setLoadFailed(false);
                    setLoadNonce((n) => n + 1);
                  }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <button
                ref={coldCtaRef}
                className="btn-primary"
                disabled={preparing}
                aria-busy={preparing}
                onClick={() => {
                  if (!mission) return;
                  setStarted(true);
                  setPlaying(true);
                }}
              >
                {preparing ? "Preparing the mission…" : P.coldCta}
              </button>
            )}
          </div>
        </div>
      )}

      {/* debrief overlay */}
      {debriefOpen && world && (
        <motion.div
          role="dialog"
          aria-labelledby="deck-debrief-title"
          className="deck-debrief"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: "absolute",
            zIndex: 30,
            background: "rgba(9,12,21,0.95)",
            backdropFilter: "blur(6px)",
            borderRight: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            padding: "1.4rem 1.5rem 0",
          }}
        >
          <div
            ref={debriefRef}
            tabIndex={-1}
            style={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              outline: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              id="deck-debrief-title"
              className="figure-label"
              style={{ color: BLUE }}
            >
              Mission debrief · every figure model-derived
            </div>
            <p
              style={{
                color: T_PRIMARY,
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                fontWeight: 600,
                lineHeight: 1.45,
                margin: "0.7rem 0 0",
              }}
            >
              {headline}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "1rem 0 1.3rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                color: T_SECONDARY,
                fontSize: "0.95rem",
              }}
            >
              <li>
                <strong style={{ color: BLUE, fontWeight: 600 }}>
                  {world.counts.accepted}
                </strong>{" "}
                {world.counts.accepted === 1 ? "fix accepted" : "fixes accepted"}
                {world.counts.in_bound === world.counts.accepted &&
                  world.counts.accepted > 0 &&
                  (world.counts.accepted === 1
                    ? ", within its bound"
                    : ", every one within its bound")}
              </li>
              {world.counts.withheld > 0 && (
                <li>
                  <strong style={{ color: TXT, fontWeight: 600 }}>
                    {world.counts.withheld}
                  </strong>{" "}
                  withheld by the self-check, while the vehicle flew on its
                  inertial unit
                </li>
              )}
            </ul>
            <Waterfall abl={abl} failed={ablFailed} />
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                flexWrap: "wrap",
                alignItems: "center",
                position: "sticky",
                bottom: 0,
                marginTop: "auto",
                padding: "0.9rem 0 1.2rem",
                background: "rgba(9,12,21,0.95)",
              }}
            >
              <a href={CTA_SIMULATION} className="btn-primary">
                Request an expert simulation session <span>→</span>
              </a>
              <button className="btn-ghost" onClick={reset}>
                Replay
              </button>
              <button
                className="btn-ghost"
                onClick={() => setReviewing(true)}
              >
                Review the flight
              </button>
            </div>
            <p
              style={{
                color: T_SECONDARY,
                fontSize: "0.85rem",
                lineHeight: 1.55,
                margin: "1.1rem 0 0",
                maxWidth: 620,
              }}
            >
              One attack per flight: Replay to try another. Expert sessions
              run deeper scenarios, on your own trajectories and platforms.
            </p>
          </div>
        </motion.div>
      )}

      {/* science modal */}
      {topic && (
        <ScienceModal
          key={topic}
          k={topic}
          profile={profile}
          onClose={() => setTopic(null)}
        />
      )}

      <style>{`
        .deck-debrief {
          top: 0;
          left: 0;
          bottom: 0;
          width: min(46%, 560px);
        }
        .deck-shell:fullscreen {
          height: calc(100vh / 1.12) !important;
          max-height: none !important;
          border-radius: 0 !important;
          zoom: 1.12;
        }
        .deck-shell:fullscreen .deck-chip,
        .deck-shell:fullscreen .deck-impact {
          display: none !important;
        }
        .deck-panels {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
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
        .deck-clock { min-width: 130px; }
        .wf-row {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 2fr);
          gap: 0.7rem;
          align-items: center;
        }
        @media (max-width: 560px) {
          .wf-row { grid-template-columns: 1fr; gap: 0.3rem; }
        }
        @media (max-width: 899px) {
          .deck-debrief { right: 0; width: auto; }
          .deck-fs { display: none; }
          .deck-panels { grid-template-columns: 1fr; }
          .deck-bottom { grid-template-columns: 1fr; }
          .map-box { width: 100% !important; height: auto !important; }
          .err-box { flex: none !important; height: 220px; }
          .deck-clock { min-width: 0; }
          .deck-top {
            grid-template-columns: 1fr auto;
          }
          .deck-top input[type="range"] {
            grid-column: 1 / -1;
            order: 3;
          }
        }
      `}</style>
    </div>
    </MotionConfig>
  );
}

/* ── the product waterfall ──────────────────────────────────────────── */

const LEVEL_META: Record<
  string,
  { label: string; color: string }
> = {
  inertial: { label: "IMU alone · gyro + accelerometer drift", color: MUTED },
  raw_mag: {
    label: "+ a magnetometer without on-board rejection",
    color: GREY,
  },
  ai_chain: {
    label: "+ on-board rejection and self-check",
    color: BLUE_SOFT,
  },
  full: { label: "+ fusion observers · the full chain", color: BLUE },
};

function Waterfall({
  abl,
  failed,
}: {
  abl: BreakdownLevel[] | null;
  failed: boolean;
}) {
  if (failed) {
    return (
      <p
        className="figure-label"
        style={{ color: T_MUTED, margin: "0 0 1.1rem" }}
      >
        the level-by-level breakdown could not be computed just now
      </p>
    );
  }
  if (!abl) {
    return (
      <p
        className="figure-label"
        style={{ color: T_MUTED, margin: "0 0 1.1rem" }}
      >
        computing the level-by-level breakdown, four full recomputations of
        this exact world...
      </p>
    );
  }
  const ref = Math.max(...abl.map((l) => l.rel), 1e-6);
  return (
    <div style={{ margin: "0 0 1.2rem" }}>
      <div className="figure-label" style={{ marginBottom: "0.5rem" }}>
        Where the gain comes from, level by level
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {abl.map((l) => {
          const meta = LEVEL_META[l.key];
          const w = Math.max((l.rel / ref) * 100, 1.2);
          return (
            <div key={l.key} className="wf-row">
              <span style={{ color: T_SECONDARY, fontSize: "0.78rem" }}>
                {meta.label}
              </span>
              <div
                aria-hidden
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
            </div>
          );
        })}
      </div>
      <p
        className="figure-label"
        style={{ color: T_MUTED, marginTop: "0.45rem" }}
      >
        error remaining in the back half of the flight · shorter is better ·
        the same flight without attack, each level recomputed in simulation
      </p>
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
      className="deck-chip"
      onClick={() => onOpen(k)}
      aria-label={`${t.short}, science note: ${t.title}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        minHeight: 24,
        border: "1px solid var(--border-strong)",
        borderRadius: 999,
        padding: "0.1rem 0.6rem",
        fontSize: "0.7rem",
        letterSpacing: "0.04em",
        color: T_MUTED,
        background: "rgba(255,255,255,0.03)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden>&#9432;</span>
      {t.short}
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
  // a new topic remounts the modal (keyed by topic), so depth starts closed
  const [deep, setDeep] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  // dialog focus: move it to the card on mount, hand it back on close
  useEffect(() => {
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    cardRef.current?.focus();
    return () => trigger?.focus();
  }, []);
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
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deck-science-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => trapTab(e, cardRef.current)}
        className="card"
        style={{
          maxWidth: 620,
          width: "100%",
          maxHeight: "82dvh",
          overflowY: "auto",
          padding: "1.4rem 1.6rem",
          background: "var(--surface)",
          outline: "none",
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
            id="deck-science-title"
            style={{
              color: T_PRIMARY,
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: 0,
            }}
          >
            {t.title}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              color: T_MUTED,
              cursor: "pointer",
              fontSize: "1rem",
              minWidth: 24,
              minHeight: 24,
            }}
          >
            ✕
          </button>
        </div>
        <p
          style={{
            color: T_SECONDARY,
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
                  color: T_SECONDARY,
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
                color: T_MUTED,
                fontSize: "0.76rem",
                marginTop: "0.8rem",
              }}
            >
              References: <RefLinks text={t.refs} />
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

/** Width over height of the map band: the track crosses the whole map. */
const MAP_ASPECT = 2.2;

const EVENT_LABEL: Record<AttackKind, string> = {
  gain: "gain fault",
  burst: "burst",
  spoof: "emitter",
};

/** The part of the track flown by time t, segments in time order. */
function trackUpTo(track: [number, number][][], t: number) {
  const total = track.reduce((n, s) => n + s.length, 0);
  let left = Math.round(total * Math.max(0, Math.min(t / T_END, 1)));
  const out: [number, number][][] = [];
  for (const seg of track) {
    if (left <= 0) break;
    const n = Math.min(seg.length, left);
    if (n >= 2) out.push(seg.slice(0, n));
    left -= n;
  }
  return out;
}

function MapPanel({
  world,
  t,
  title,
  profile,
  onTopic,
}: {
  world: World | null;
  t: number;
  title: string;
  profile: ProfileKey;
  onTopic: (k: TopicKey) => void;
}) {
  // the box takes the room it is given; the map is cropped to it, never
  // stretched: a band of the square map, centred on the track
  const boxRef = useRef<HTMLDivElement>(null);
  const [aspect, setAspect] = useState(MAP_ASPECT);
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setAspect(Math.max(1, width / height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const trackMid = useMemo(() => {
    if (!world) return 0.5;
    const ys = world.track.flat().map((p) => p[1]);
    return (Math.min(...ys) + Math.max(...ys)) / 2;
  }, [world]);
  const bandH = Math.min(1, 1 / aspect);
  const y0 = Math.min(Math.max(trackMid - bandH / 2, 0), 1 - bandH);

  const drawn = world ? trackUpTo(world.track, t) : [];
  const lastSeg = drawn[drawn.length - 1];
  const head = lastSeg ? lastSeg[lastSeg.length - 1] : null;
  const shown = world ? world.fixes.filter((f) => f.t <= t) : [];
  let latest = -1;
  shown.forEach((f, i) => {
    if (!f.withheld) latest = i;
  });

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
        <Chip k="rejection" profile={profile} onOpen={onTopic} />
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.6rem",
        }}
      >
        <div
          ref={boxRef}
          className="map-box"
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100%",
            aspectRatio: `${MAP_ASPECT} / 1`,
            overflow: "hidden",
            borderRadius: 8,
            background: "var(--surface-2)",
          }}
        >
          {world && (
            <div
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: `${aspect * 100}%`,
                top: `${-y0 * aspect * 100}%`,
              }}
            >
              {/* one image per mission, already sized: next/image adds nothing */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={world.map}
                alt="Synthetic magnetic anomaly map of the mission area, with the flight track, the position fixes and their error bounds drawn over it"
                width={600}
                height={600}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  filter: "grayscale(1) brightness(1.2) contrast(1.05)",
                }}
              />
              <svg
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                {drawn.map((seg, si) => (
                  <polyline
                    key={si}
                    points={seg.map((p) => `${p[0]},${p[1]}`).join(" ")}
                    fill="none"
                    stroke={TXT}
                    strokeWidth={1.6}
                    vectorEffect="non-scaling-stroke"
                    opacity={0.85}
                  />
                ))}
                {/* each accepted fix with its error bound, the latest one held */}
                {shown.map((f, i) =>
                  f.withheld ? null : (
                    <circle
                      key={`b${i}`}
                      cx={f.x}
                      cy={f.y}
                      r={f.b * world.k}
                      fill={BLUE}
                      fillOpacity={i === latest ? 0.12 : 0}
                      stroke={BLUE}
                      strokeOpacity={i === latest ? 0.95 : 0.3}
                      strokeWidth={1.3}
                      strokeDasharray="3 3"
                      vectorEffect="non-scaling-stroke"
                    />
                  )
                )}
                {shown.map((f, i) =>
                  f.withheld ? (
                    <g
                      key={`f${i}`}
                      stroke={TXT}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    >
                      <line
                        x1={f.x - 0.006}
                        x2={f.x + 0.006}
                        y1={f.y - 0.006}
                        y2={f.y + 0.006}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={f.x - 0.006}
                        x2={f.x + 0.006}
                        y1={f.y + 0.006}
                        y2={f.y - 0.006}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ) : (
                    <circle
                      key={`f${i}`}
                      cx={f.x}
                      cy={f.y}
                      r={1 / 170}
                      fill={BLUE}
                    />
                  )
                )}
                {world.events
                  .filter(
                    (f) =>
                      f.kind === "spoof" && f.detected && f.ring && t >= f.ring.t
                  )
                  .map((f, i) => (
                    <g key={`ring${i}`}>
                      <circle
                        cx={f.ring!.x}
                        cy={f.ring!.y}
                        r={f.ring!.r}
                        fill={TXT}
                        fillOpacity={0.06}
                        stroke={TXT}
                        strokeWidth={1.4}
                        strokeDasharray="1.5 4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle
                        cx={f.ring!.x}
                        cy={f.ring!.y}
                        r={1 / 220}
                        fill={TXT}
                      />
                    </g>
                  ))}
                {head && (
                  <circle
                    cx={head[0]}
                    cy={head[1]}
                    r={1 / 140}
                    fill={TXT}
                    stroke="#0B0F1A"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem 1rem",
          }}
        >
          <Readout color={TXT} label="track" />
          <Readout color={BLUE} variant="ring" label="fix and its error bound" />
          <Readout color={TXT} variant="cross" label="withheld fix" />
        </div>
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
  // the inertial curve tops out at 1 by construction: the scale never moves
  const yMax = 1.05;

  const px = (tt: number) => X0 + (tt / T_END) * plotW;
  const py = (e: number) => Y0 - (Math.min(e, yMax) / yMax) * (Y0 - YT);

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

  // the bound stated at each accepted fix, held until the next fix
  const steps: { t0: number; t1: number; b: number }[] = [];
  if (world) {
    world.fixes.forEach((f, i) => {
      if (f.withheld || f.t > t) return;
      const next = world.fixes[i + 1]?.t ?? T_END;
      const t1 = Math.min(next, t);
      if (t1 > f.t) steps.push({ t0: f.t, t1, b: f.b });
    });
  }
  let stepPath = "";
  steps.forEach((s, i) => {
    const joined = i > 0 && Math.abs(steps[i - 1].t1 - s.t0) < 1e-6;
    stepPath += joined
      ? ` V${py(s.b).toFixed(1)} H${px(s.t1).toFixed(1)}`
      : ` M${px(s.t0).toFixed(1)},${py(s.b).toFixed(1)} H${px(s.t1).toFixed(1)}`;
  });

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
          gap: "0.45rem 0.9rem",
          marginBottom: "0.45rem",
          flexWrap: "wrap",
        }}
      >
        <span className="figure-label">Position error</span>
        <Readout color={GREY} variant="dashed" label="inertial only" />
        <Readout color={BLUE} label="with magnetic fixes" />
        <Readout color={BLUE} variant="dotted" label="error bound" />
        <Readout color={TXT} variant="cross" label="withheld fix" />
        <span style={{ flex: 1 }} />
        <Chip k="drift" profile={profile} onOpen={onTopic} />
        <Chip k="selfcheck" profile={profile} onOpen={onTopic} />
        <Chip k="recursive" profile={profile} onOpen={onTopic} />
      </div>
      <div
        className="err-box"
        style={{ flex: 1, minHeight: 0, position: "relative" }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Position error over the mission, on a relative scale. Inertial only, dashed, keeps growing. With magnetic fixes, solid, stays low. The dotted steps are the error bound stated at each accepted fix, and the error stays under them. Crosses mark withheld fixes."
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "absolute",
            inset: 0,
          }}
        >
          <line
            x1={X0}
            x2={X0 + plotW}
            y1={Y0}
            y2={Y0}
            stroke="rgba(255,255,255,0.18)"
            vectorEffect="non-scaling-stroke"
          />
          {world?.events.map((f, i) => (
            <rect
              key={i}
              x={px(f.t0)}
              y={YT}
              width={px(Math.min(f.t1, T_END)) - px(f.t0)}
              height={Y0 - YT}
              fill={f.kind === "spoof" ? BLUE : TXT}
              opacity={f.kind === "spoof" ? 0.08 : 0.05}
            />
          ))}
          {/* the bound: a light band under each stated value */}
          {steps.map((s, i) => (
            <rect
              key={`band${i}`}
              x={px(s.t0)}
              y={py(s.b)}
              width={px(s.t1) - px(s.t0)}
              height={Y0 - py(s.b)}
              fill={BLUE}
              opacity={0.07}
            />
          ))}
          {stepPath && (
            <path
              d={stepPath}
              fill="none"
              stroke={BLUE}
              strokeWidth={1.6}
              strokeDasharray="2 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.9}
            />
          )}
          {world && (
            <>
              <path
                d={path(world.t, world.aided)}
                fill="none"
                stroke={BLUE}
                strokeWidth={2.4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={path(world.t, world.inertial)}
                fill="none"
                stroke={GREY}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="7 5"
                vectorEffect="non-scaling-stroke"
                opacity={0.95}
              />
              {world.fixes
                .filter((f) => f.t <= t)
                .map((f, i) =>
                  f.withheld ? (
                    <g
                      key={i}
                      stroke={TXT}
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    >
                      <line
                        x1={px(f.t) - 5}
                        x2={px(f.t) + 5}
                        y1={py(f.e) - 5}
                        y2={py(f.e) + 5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={px(f.t) - 5}
                        x2={px(f.t) + 5}
                        y1={py(f.e) + 5}
                        y2={py(f.e) - 5}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ) : (
                    <line
                      key={i}
                      x1={px(f.t)}
                      x2={px(f.t)}
                      y1={py(f.e)}
                      y2={py(f.e) + 0.01}
                      stroke={BLUE}
                      strokeWidth={7}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  )
                )}
            </>
          )}
        </svg>
        {/* event names, in HTML so that the stretched chart does not distort them */}
        {world?.events
          .filter((f) => f.t0 <= t)
          .map((f, i) => (
            <span
              key={`lab${i}`}
              className="figure-label"
              style={{
                position: "absolute",
                top: 2,
                left: `${(px(f.t0) / W) * 100}%`,
                paddingLeft: 4,
                color: T_MUTED,
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {EVENT_LABEL[f.kind]}
            </span>
          ))}
      </div>
      <div
        className="figure-label"
        style={{
          color: T_MUTED,
          marginTop: "0.35rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>mission time →</span>
        <span>relative scale · model-derived</span>
      </div>
    </div>
  );
}

function Readout({
  color,
  label,
  variant = "line",
}: {
  color: string;
  label: string;
  /** legend swatch, drawn like the mark it names */
  variant?: "line" | "dashed" | "dotted" | "ring" | "cross";
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
      <svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        aria-hidden
        style={{ alignSelf: "center", flexShrink: 0 }}
      >
        {variant === "ring" ? (
          <>
            <circle
              cx="9"
              cy="5"
              r="4"
              fill={color}
              fillOpacity={0.12}
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <circle cx="9" cy="5" r="1.4" fill={color} />
          </>
        ) : variant === "cross" ? (
          <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
            <line x1="5.5" x2="12.5" y1="1.5" y2="8.5" />
            <line x1="5.5" x2="12.5" y1="8.5" y2="1.5" />
          </g>
        ) : (
          <line
            x1="1"
            x2="17"
            y1="5"
            y2="5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={
              variant === "dashed" ? "4 3" : variant === "dotted" ? "1 3" : undefined
            }
          />
        )}
      </svg>
      <span className="figure-label" style={{ color: T_MUTED }}>
        {label}
      </span>
    </span>
  );
}

function LogLine({ row }: { row: LogRow }) {
  const color =
    row.kind === "bad" || row.kind === "contact" ? T_PRIMARY : T_SECONDARY;
  const bg =
    row.kind === "bad"
      ? "rgba(244,245,242,0.06)"
      : row.kind === "contact"
        ? "rgba(111,161,255,0.09)"
        : "var(--surface)";
  const bar =
    row.kind === "bad" ? TXT : row.kind === "contact" ? BLUE : BLUE_SOFT;
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
      <span style={{ color: T_MUTED, marginRight: "0.6rem" }}>
        {fmtClock(row.t)}
      </span>
      {row.text}
    </div>
  );
}


/* ── log builder ────────────────────────────────────────────────────── */
function buildLog(
  world: World,
  P: (typeof PROFILES)[ProfileKey],
  withContact: boolean
): LogRow[] {
  const rows: LogRow[] = [
    { t: 0, kind: "ok", text: P.evTakeoff },
    { t: 90, kind: "info", text: "FILTER · first window: acquiring map lock" },
    { t: 150, kind: "info", text: P.evInterf },
  ];
  for (const f of world.events) {
    rows.push({
      t: f.t0,
      kind: "bad",
      text: `EVENT · ${P.atkNames[f.kind]} injected`,
    });
    // the detection lines exist only when the source was detected
    if (f.kind === "spoof" && f.detected && f.ring) {
      rows.push({ t: f.ring.t - 32, kind: "info", text: P.spoofSearching });
      rows.push({ t: f.ring.t, kind: "contact", text: P.spoofDetected });
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
            text: f.in_bound ? "FIX ACCEPTED · within its bound" : "FIX ACCEPTED",
          }
    );
  }
  if (withContact) {
    rows.push({ t: 430, kind: "info", text: P.evContactHint });
    rows.push({ t: 490, kind: "contact", text: P.evContact });
  }
  return rows.sort((a, b) => a.t - b.t);
}
