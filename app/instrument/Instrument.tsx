"use client";

/**
 * Instrument: the mission chooser plus the flight deck. Reads ?profile=
 * for deep-linked audience sends; otherwise shows the neutral chooser.
 */
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { PROFILES, PROFILE_ORDER, type ProfileKey } from "./profiles";

const FlightDeck = dynamic(() => import("./FlightDeck"), {
  ssr: false,
  loading: () => (
    <div
      className="card"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="figure-label">Preparing the mission</p>
    </div>
  ),
});

export default function Instrument() {
  const sp = useSearchParams();
  const q = sp.get("profile");
  const initial =
    q === "defence" || q === "space" || q === "geo" ? (q as ProfileKey) : null;
  const [profile, setProfile] = useState<ProfileKey | null>(initial);
  // true once the visitor picks a mission here: the deck then takes focus
  const [chosen, setChosen] = useState(false);

  if (!profile) {
    return (
      <div>
        <h2
          className="figure-label"
          style={{ color: "var(--muted)", marginBottom: "1.5rem" }}
        >
          Choose your mission · the physics is the same, the story is yours
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1rem",
          }}
        >
          {PROFILE_ORDER.map((k) => {
            const p = PROFILES[k];
            return (
              <button
                key={k}
                className="card"
                onClick={() => {
                  setProfile(k);
                  setChosen(true);
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
                <span
                  className="figure-label block"
                  style={{ color: "var(--accent)" }}
                >
                  {p.chooserKicker}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    margin: "0.4rem 0 0.6rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {p.chooserTitle}
                </span>
                <span
                  className="block"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                  }}
                >
                  {p.chooserBody}
                </span>
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
          {PROFILES[profile].chooserTitle} · mission demo · computed live in
          simulation
        </p>
        <button
          className="textlink"
          onClick={() => {
            setProfile(null);
            const url = new URL(window.location.href);
            url.searchParams.delete("profile");
            window.history.replaceState({}, "", url);
          }}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span>⇄</span>
          <span>Change mission</span>
        </button>
      </div>
      <FlightDeck profile={profile} focusOnOpen={chosen} />
    </div>
  );
}
