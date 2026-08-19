import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getVertical } from "../../lib/verticals";
import { PATENT_FAMILIES } from "../../lib/facts";

export const alt = "SpectralFlow · Applications";
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
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 26,
              height: 26,
              transform: "rotate(45deg)",
              borderRadius: 6,
              background: "#0B0F1A",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>SpectralFlow</div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 1000,
              color: "#0B0F1A",
            }}
          >
            {v.metaTitle}
            <span style={{ color: "#0B5FFF" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#3F4654",
              marginTop: 28,
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            {v.tagline}
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22 }}>
          {pill("Member of NVIDIA Inception")}
          {pill(`${PATENT_FAMILIES} patent families`)}
        </div>
      </div>
    ),
    { ...size }
  );
}
