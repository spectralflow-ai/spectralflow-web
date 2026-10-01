import { ImageResponse } from "next/og";
import { BRAND, PATENT_LINE } from "./lib/facts";

export const alt = `${BRAND} · Diamond quantum sensors. First, navigation you can trust without GPS.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        {/* Brand row: the mark (ink diamond, blue point) and the name */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="34" height="34" viewBox="0 0 20 20">
            <rect x="4.4" y="4.4" width="11.2" height="11.2" rx="2.8" transform="rotate(45 10 10)" fill="#0B0F1A" />
            <circle cx="10" cy="10" r="2.1" fill="#0B5FFF" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>{BRAND}</div>
        </div>

        {/* Headline on two levels */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -3,
              color: "#0B0F1A",
            }}
          >
            Diamond quantum sensors<span style={{ color: "#0B5FFF" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              color: "#3F4654",
              marginTop: 18,
              maxWidth: 1000,
            }}
          >
            First, navigation you can trust without GPS.
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
