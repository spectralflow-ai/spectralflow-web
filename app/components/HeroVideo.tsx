"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

/**
 * HeroVideo : the moving background of the home hero.
 *
 * The still photograph stays the first thing painted. The video is only
 * mounted on wide landscape screens, when the visitor has not asked for
 * reduced motion or reduced data, and only once the page has loaded, so it
 * never competes with the photograph. It fades in once it actually plays.
 * It pauses when the hero leaves the screen or the tab is hidden, and a
 * small button lets the visitor stop it (WCAG 2.2.2).
 *
 * Playback is driven by script only (no autoplay attribute), so a pause,
 * whether asked by the visitor or by the page, always holds.
 *
 * The server and the first client render are identical (no video), so
 * hydration never differs; the video arrives on a later render.
 */

const QUERY =
  "(min-width: 768px) and (min-height: 480px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)";

/** How long the still track waits for the video before drawing anyway. */
const HOLD_MS = 3500;

type Connection = EventTarget & { saveData?: boolean };

function connection(): Connection | undefined {
  return (navigator as Navigator & { connection?: Connection }).connection;
}

let mql: MediaQueryList | null = null;
function query(): MediaQueryList {
  if (!mql) mql = window.matchMedia(QUERY);
  return mql;
}

function subscribe(onChange: () => void) {
  const mq = query();
  const c = connection();
  mq.addEventListener("change", onChange);
  c?.addEventListener?.("change", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    c?.removeEventListener?.("change", onChange);
  };
}

const getSnapshot = () => query().matches && !connection()?.saveData;
const getServerSnapshot = () => false;

function subscribeLoad(onChange: () => void) {
  window.addEventListener("load", onChange);
  return () => window.removeEventListener("load", onChange);
}
const getLoaded = () => document.readyState === "complete";
const getServerLoaded = () => false;

const FADE = "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)";

export default function HeroVideo({
  sources,
  poster,
  veilClassName,
  still,
  track,
}: {
  /** In order of preference. */
  sources: { src: string; type: string }[];
  poster: string;
  /** Ink veil laid over the video only, for the legibility of the text. */
  veilClassName: string;
  /**
   * Drawn over the still photograph; fades out when the video shows. Its
   * wrapper carries `sf-hero-still`, and `data-hold` while the video may
   * still arrive, so its animation can wait.
   */
  still: ReactNode;
  /** Drawn over the video; mounted when the video shows, so it draws then. */
  track: ReactNode;
}) {
  const allowed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const loaded = useSyncExternalStore(subscribeLoad, getLoaded, getServerLoaded);
  const [playedOnce, setPlayedOnce] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the video is unmounted (rotation, settings), fade in again next
  // time. If the visitor had paused it, it comes back paused on its first
  // frame, with the button to play it.
  const [wasAllowed, setWasAllowed] = useState(allowed);
  if (allowed !== wasAllowed) {
    setWasAllowed(allowed);
    if (!allowed && !userPaused) setPlayedOnce(false);
  }

  const mounted = allowed && loaded;
  const shown = mounted && playedOnce;
  // Hidden behind the video, the still track stays where it is.
  const hold = allowed && (shown || !gaveUp);

  // The still track waits for the video, but not for ever.
  useEffect(() => {
    if (!allowed) return;
    const t = window.setTimeout(() => setGaveUp(true), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [allowed]);

  useEffect(() => {
    const v = videoRef.current;
    if (!mounted || !v) return;
    // Autoplay policies look at the property; set it before any play().
    v.muted = true;
    v.defaultMuted = true;

    // The first observer callback always comes, and decides.
    let inView = false;
    const sync = () => {
      const run = inView && !document.hidden && !userPaused;
      if (run) {
        if (v.paused) {
          v.play().catch((e: unknown) => {
            // A pause interrupting play() is expected; anything else means
            // the browser will not play it, so the photograph stays.
            if ((e as { name?: string })?.name !== "AbortError") setGaveUp(true);
          });
        }
      } else {
        v.pause();
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [mounted, userPaused]);

  return (
    <>
      <div
        aria-hidden
        className="sf-hero-still absolute inset-0"
        data-hold={hold ? "" : undefined}
        style={{ opacity: shown ? 0 : 1, transition: FADE }}
      >
        {still}
      </div>

      {mounted && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: shown ? 1 : 0, transition: FADE }}
        >
          <div className="duotone" style={{ position: "absolute", inset: 0 }}>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={poster}
              preload="metadata"
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              onPlaying={() => setPlayedOnce(true)}
              onError={() => setGaveUp(true)}
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
          </div>
          <div className={`absolute inset-0 ${veilClassName}`} />
          {shown && track}
        </div>
      )}

      {shown && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play the background video" : "Pause the background video"}
          className="absolute z-20 bottom-5 right-5 md:right-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--background)_55%,transparent)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
          style={{ animation: "fade-in-slow 0.6s ease-out 0.6s both" }}
        >
          {userPaused ? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden focusable="false">
              <path d="M3 1.6v8.8L10.2 6z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden focusable="false">
              <rect x="2.4" y="1.6" width="2.4" height="8.8" rx="0.6" fill="currentColor" />
              <rect x="7.2" y="1.6" width="2.4" height="8.8" rx="0.6" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
