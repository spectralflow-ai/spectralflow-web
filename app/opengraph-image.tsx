import { ImageResponse } from "next/og";

export const alt = "SpectralFlow — Quantum sensing, out of the lab.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pill = (text: string, accent = false) => (
  <div
    style={{
      display: "flex",
      padding: "8px 18px",
      borderRadius: 999,
      border: accent ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,255,255,0.16)",
      color: accent ? "#00E5FF" : "#A7AEC2",
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
          backgroundColor: "#05050A",
          backgroundImage:
            "radial-gradient(900px 600px at 85% -10%, rgba(0,229,255,0.20), transparent 60%), radial-gradient(700px 500px at 5% 110%, rgba(124,92,255,0.18), transparent 60%)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 30,
              height: 30,
              transform: "rotate(45deg)",
              borderRadius: 7,
              backgroundImage: "linear-gradient(135deg, #00E5FF, #7C5CFF)",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>SpectralFlow</div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#00E5FF" }}>
            Quantum sensing,
          </div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            out of the lab.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#A7AEC2", marginTop: 28, maxWidth: 920, lineHeight: 1.35 }}>
            NV-diamond quantum sensors for navigation where GPS is jammed or denied — room
            temperature, chip-scale, un-jammable.
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22 }}>
          {pill("Member of NVIDIA Inception", true)}
          {pill("13 UK patents")}
          {pill("European · sovereign")}
        </div>
      </div>
    ),
    { ...size }
  );
}
