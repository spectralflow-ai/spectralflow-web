import { ImageResponse } from "next/og";

export const alt = "The Instrument · fly the SF100 on our live digital twin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pill = (text: string) => (
  <div
    style={{
      display: "flex",
      padding: "8px 18px",
      borderRadius: 999,
      border: "1px solid rgba(244,245,242,0.22)",
      color: "#AEB4C0",
      background: "rgba(255,255,255,0.04)",
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
          backgroundColor: "#0B0F1A",
          color: "#F4F5F2",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 26,
              height: 26,
              transform: "rotate(45deg)",
              borderRadius: 6,
              background: "#F4F5F2",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 99,
              background: "#6FA1FF",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#AEB4C0" }}>
            SpectralFlow · The Instrument
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            GPS is jammed. You still get home.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#8CA6D9",
              lineHeight: 1.35,
            }}
          >
            Fly a diamond quantum sensor through a full mission, attack it,
            and watch it refuse to be fooled. Live on our digital twin.
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {pill("navigation without GNSS")}
          {pill("noise as signal")}
          {pill("every figure model-derived")}
          {pill("spectralflow.ai/instrument")}
        </div>
      </div>
    ),
    { ...size }
  );
}
