import { VERTICALS_ORDERED } from "../lib/verticals";
import { PATENT_FAMILIES, PREPRINTS, VERTICALS } from "../lib/facts";

// A curated map for AI crawlers / answer engines (llmstxt.org convention).
// Served at /llms.txt. Built from the same sources of truth as the site.
export const dynamic = "force-static";

const BASE = "https://www.spectralflow.ai";

export function GET() {
  const verticalLines = VERTICALS_ORDERED.map(
    (v) => `- [${v.navLabel}](${BASE}/applications/${v.slug}): ${v.tagline}`
  ).join("\n");

  const body = `# SpectralFlow

> SpectralFlow (Spectral Flow SAS) is a European, sovereign deep-tech company designing NV-diamond (nitrogen-vacancy) quantum magnetometers that work out of the lab: room temperature, chip-scale and passive. Its first vertical is GPS-denied (magnetic) navigation.

SpectralFlow designs quantum sensors around nitrogen-vacancy centres in diamond, an atom-scale magnetometer that operates at room temperature, emits nothing, and survives vibration and radiation. The company follows an "NVIDIA model": it designs the sensor, the firmware and the calibration, and outsources fabrication. Its work is validated in software first, through a physics engine benchmarked against a registry of more than 100 published experimental results, and an end-to-end navigation digital twin. Every published figure is model-derived; no hardware exists at this stage (pre-prototype).

Key facts:
- ${PATENT_FAMILIES} patent families filed (before any public disclosure).
- ${VERTICALS} patented application verticals.
- ${PREPRINTS} public preprints on Zenodo (timestamped, DOI-referenced).
- Member of NVIDIA Inception. Based in Villefranche-sur-Mer, France. Incorporated 2026.

## Core pages
- [Home](${BASE}/): quantum sensing, out of the lab.
- [Technology](${BASE}/technology): the NV-diamond principle and the design-to-device approach.
- [Applications](${BASE}/applications): one sensing core across a family of verticals.
- [Company](${BASE}/company): vision, sovereignty thesis, founder Alexandre Papa.
- [News](${BASE}/news): milestones and insights.
- [Contact](${BASE}/contact): partnerships and investment.

## Applications (verticals)
${verticalLines}

## Tools
- [The Instrument](${BASE}/instrument): a live, public, in-browser navigation digital twin. Every figure model-derived.
- SpectralFlow Studio (studio.spectralflow.ai): the design and simulation engine.

## Notes for citation
- Stage: pre-prototype. Use "designing / developing / model-derived", not "builds / measured / demonstrated".
- GPS-denied navigation is SpectralFlow's first vertical; magnetic navigation is passive and cannot be jammed.
- Performance specifications are shared privately on request and are model-derived design targets.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
