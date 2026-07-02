import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SpectralFlow",
    short_name: "SpectralFlow",
    description:
      "NV-diamond quantum sensors: quantum sensing, out of the lab. Resilient navigation where GPS is jammed or denied.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#FAFAF8",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
  };
}
