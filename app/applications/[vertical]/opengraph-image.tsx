import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getVertical } from "../../lib/verticals";
import { BRAND, DESCRIPTOR } from "../../lib/facts";

export const alt = `${BRAND} · Applications of ${DESCRIPTOR.toLowerCase()}`;
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

export default async function Og({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) notFound();

  const headline = v.title.replace(/\.$/, "");

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

        {/* Application and headline */}
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
            {`Applications · ${v.navLabel}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2,
              maxWidth: 1000,
              color: "#0B0F1A",
            }}
          >
            {headline}
            <span style={{ color: "#0B5FFF" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#3F4654",
              marginTop: 26,
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            {v.tagline}
          </div>
        </div>

        {/* Footer pills: where this application stands, and the membership */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22 }}>
          {pill(`Where we stand: ${v.horizon.label}`)}
          {pill("Member of NVIDIA Inception")}
        </div>
      </div>
    ),
    { ...size }
  );
}
