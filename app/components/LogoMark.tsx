import Image from "next/image";

export type Logo = {
  src: string;
  alt: string;
  /** Intrinsic size of the artwork, used for its aspect ratio. */
  width: number;
  height: number;
  /** Badges already supplied in one colour (NVIDIA) are shown as delivered. */
  tone?: "mono" | "original";
};

/**
 * A third-party logo at a common optical size: the height is fixed, and very
 * wide wordmarks are capped so that no mark dominates a row. Logos keep their
 * official colours.
 */
export default function LogoMark({
  logo,
  height = 40,
  maxWidth = 168,
  className = "",
}: {
  logo: Logo;
  height?: number;
  maxWidth?: number;
  className?: string;
}) {
  const ratio = logo.width / logo.height;
  const w = Math.min(Math.round(ratio * height), maxWidth);
  const h = Math.round(w / ratio);
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={w}
      height={h}
      className={`${logo.tone === "original" ? "" : "logo-mono"} ${className}`}
      style={{ width: w, height: h }}
      unoptimized
    />
  );
}
