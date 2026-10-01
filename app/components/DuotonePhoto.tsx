import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A photograph in ink duotone (never raw colour), on next/image.
 * Give `aspect` (e.g. "16/9") for a responsive frame filled by the image,
 * or `width` and `height` for a fixed intrinsic size. `alt` is required:
 * pass "" only for a purely decorative image.
 */
export default function DuotonePhoto({
  src,
  alt,
  credit,
  caption,
  aspect,
  width,
  height,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  rounded = true,
  objectPosition = "center",
  className = "",
}: {
  src: string;
  alt: string;
  /** Printed under the image as a figure label, e.g. "NASA/JPL-Caltech". */
  credit?: string;
  caption?: ReactNode;
  aspect?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  const radius = rounded ? "rounded-[var(--radius)]" : "";
  const useFill = !!aspect || !width || !height;

  return (
    <figure className={className}>
      <div
        className={`duotone ${radius}`}
        style={useFill ? { aspectRatio: aspect ?? "16/9" } : undefined}
      >
        {useFill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="block w-full h-auto"
            style={{ objectPosition }}
          />
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-col gap-1">
          {caption && (
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {caption}
            </span>
          )}
          {credit && <span className="figure-label is-plain">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
