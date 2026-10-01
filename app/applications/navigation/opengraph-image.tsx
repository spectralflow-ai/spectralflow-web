import { ImageResponse } from "next/og";
import { BRAND, DESCRIPTOR, PATENT_LINE } from "../../lib/facts";

export const alt = `${BRAND} · Navigation that knows how wrong it can be.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "Navigation that knows how wrong it can be".split(" ");

const pill = (text: string) => (
  <div
    style={{
      display: "flex",
      padding: "8px 18px",
      borderRadius: 999,
      border: "1px solid rgba(11,15,26,0.16)",
      color: "#3F4654",
      background: "#FFFFFF",
    }}
  >
    {text}
  </div>
);

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#FAFAF8",
          color: "#0B0F1A",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row: the mark (ink diamond, blue point), the name and the descriptor */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="34" height="34" viewBox="0 0 20 20">
            <rect x="4.4" y="4.4" width="11.2" height="11.2" rx="2.8" transform="rotate(45 10 10)" fill="#0B0F1A" />
            <circle cx="10" cy="10" r="2.1" fill="#0B5FFF" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>{BRAND}</div>
          <div style={{ display: "flex", fontSize: 24, color: "#6A7180" }}>{DESCRIPTOR}</div>
        </div>

        {/* Section label and headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#6A7180",
              marginBottom: 22,
            }}
          >
            Navigation without GPS
          </div>
          {/* One span per word so the blue full stop wraps with the last word. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.5,
              maxWidth: 1020,
              color: "#0B0F1A",
            }}
          >
            {HEADLINE.map((w, i) => (
              <span key={i} style={{ display: "flex", marginRight: i < HEADLINE.length - 1 ? 20 : 0 }}>
                {w}
                {i === HEADLINE.length - 1 && <span style={{ color: "#0B5FFF" }}>.</span>}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#3F4654",
              marginTop: 28,
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            Diamond quantum magnetometers for navigation where satellite positioning cannot be trusted.
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22 }}>
          {pill("Member of NVIDIA Inception")}
          {pill(PATENT_LINE)}
        </div>
      </div>
    ),
    { ...size }
  );
}
