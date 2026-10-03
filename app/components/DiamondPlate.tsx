import Image from "next/image";

/**
 * A diamond plate on its holder, in ink duotone, with the four crystal axes
 * along which NV centres point drawn over it. The overlay uses the pixel
 * frame of the photograph and the same centred cover crop, so the axes stay
 * on the plate at every size.
 */

const W = 2048;
const H = 1143;
const CX = 1024;
const CY = 522;

export default function DiamondPlate({
  aspect = "16/10",
  sizes = "(min-width: 768px) 50vw, 100vw",
  caption,
  className = "",
  lang = "en",
}: {
  lang?: "en" | "fr";
  aspect?: string;
  sizes?: string;
  /** Default: the caption of the language; null hides it. */
  caption?: string | null;
  className?: string;
}) {
  const text =
    caption === undefined
      ? lang === "fr"
        ? "Image d’illustration : une plaque de diamant, avec les quatre axes cristallins selon lesquels pointent les centres NV."
        : "Illustrative image: a diamond plate, with the four crystal axes along which NV centres point."
      : caption;
  return (
    <figure className={className}>
      <div className="duotone rounded-[var(--radius)]" style={{ aspectRatio: aspect }}>
        <Image
          src="/img/v3/diamond-plate.webp"
          alt={
            lang === "fr"
              ? "Une petite plaque carrée de diamant posée sur un porte-échantillon sombre."
              : "A small square diamond plate resting on a dark sample holder."
          }
          fill
          sizes={sizes}
          className="object-cover"
        />
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
          focusable="false"
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: 2 }}
        >
          <g stroke="#6FA1FF" strokeLinecap="round" fill="none">
            <line x1={CX - 420} y1={CY} x2={CX + 420} y2={CY} strokeWidth={4} />
            <line x1={CX} y1={CY - 360} x2={CX} y2={CY + 360} strokeWidth={4} />
            <line
              x1={CX - 300}
              y1={CY - 300}
              x2={CX + 300}
              y2={CY + 300}
              strokeWidth={4}
              strokeDasharray="18 18"
            />
            <line
              x1={CX - 300}
              y1={CY + 300}
              x2={CX + 300}
              y2={CY - 300}
              strokeWidth={4}
              strokeDasharray="18 18"
            />
          </g>
          <circle cx={CX} cy={CY} r={16} fill="#6FA1FF" />
        </svg>
      </div>
      {text && <figcaption className="figure-label is-plain mt-4">{text}</figcaption>}
    </figure>
  );
}
