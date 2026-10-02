"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * A short illustrative clip in ink duotone, on the frame of a DuotonePhoto.
 * The poster (first frame) is painted first. The clip is fetched only when
 * the frame comes near the screen and plays while it is visible. Each file is
 * built as a seamless loop (a dissolve inside the file, or a slowed
 * back-and-forth), so the native loop never shows a cut and the motion never
 * stops. Reduced motion or data saving: the poster alone.
 */

const QUERY = "(prefers-reduced-motion: no-preference)";
const FADE_MS = 900;

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getSnapshot() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection?.saveData;
  return window.matchMedia(QUERY).matches && !saveData;
}
const getServerSnapshot = () => false;

export default function DuotoneClip({
  poster,
  sources,
  alt,
  aspect = "16/9",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: {
  poster: string;
  /** In order of preference. */
  sources: { src: string; type: string }[];
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const motionOk = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [shown, setShown] = useState(false);

  // fetch the clip only when the frame comes near the screen
  useEffect(() => {
    const el = frameRef.current;
    if (!motionOk || !el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOk, near]);

  // play while visible; the file loops on itself
  useEffect(() => {
    const v = videoRef.current;
    const el = frameRef.current;
    if (!near || !v || !el) return;
    v.muted = true;
    let visible = false;
    const play = () => {
      if (visible && !document.hidden) v.play().catch(() => undefined);
    };
    const onPlaying = () => setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.intersectionRatio >= 0.3;
        if (visible) play();
        else v.pause();
      },
      { threshold: [0, 0.3] }
    );
    const onVis = () => (document.hidden ? v.pause() : play());
    v.addEventListener("playing", onPlaying);
    document.addEventListener("visibilitychange", onVis);
    io.observe(el);
    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [near]);

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        className="duotone rounded-[var(--radius)]"
        style={{ aspectRatio: aspect }}
      >
        <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover" />
        {motionOk && near && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: shown ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </div>
    </figure>
  );
}
