"use client";

/**
 * Instrument: the mission chooser plus the flight deck. Reads ?profile=
 * for deep-linked audience sends; otherwise shows the neutral chooser.
 */
import { useState } from "react";
import { PROFILES, type ProfileKey } from "./profiles";
import FlightDeck from "./FlightDeck";

export default function Instrument({ initial }: { initial: ProfileKey | null }) {
  const [profile, setProfile] = useState<ProfileKey | null>(initial);

  if (!profile) {
    return (
      <div>
        <p
          className="figure-label"
          style={{ color: "var(--muted)", marginBottom: "1.5rem" }}
        >
          Choose your mission · the physics is the same, the story is yours
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1rem",
          }}
        >
          {(Object.keys(PROFILES) as ProfileKey[]).map((k) => {
            const p = PROFILES[k];
            return (
              <button
                key={k}
                className="card"
                onClick={() => {
                  setProfile(k);
                  const url = new URL(window.location.href);
                  url.searchParams.set("profile", k);
                  window.history.replaceState({}, "", url);
                }}
                style={{
                  textAlign: "left",
                  padding: "1.6rem",
                  cursor: "pointer",
                }}
              >
                <div className="figure-label" style={{ color: "var(--accent)" }}>
                  {p.chooserKicker}
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    margin: "0.4rem 0 0.6rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {p.chooserTitle}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {p.chooserBody}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.5rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p className="figure-label" style={{ color: "var(--muted)", margin: 0 }}>
          {PROFILES[profile].chooserTitle} · live on the digital twin
        </p>
        <button
          className="textlink"
          onClick={() => setProfile(null)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span>⇄</span>
          <span>Change mission</span>
        </button>
      </div>
      <FlightDeck profile={profile} />
    </div>
  );
}
