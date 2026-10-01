import {
  ADDRESS,
  BRAND,
  DESCRIPTOR,
  FACTS_AS_OF,
  FOUNDER,
  LEGAL_NAME,
  PATENT_DETAIL,
  RCS,
  REGISTERED_LABEL,
  SITE_URL,
  STAGE_LINE,
} from "../lib/facts";
import { NAV } from "../lib/nav";
import { SUPPORTERS } from "../lib/supporters";
import { POSTS } from "../lib/news";
import { EVENTS } from "../lib/events";

// A curated map for AI crawlers and answer engines (llmstxt.org convention).
// Served at /llms.txt. Built from the same sources as the pages.
export const dynamic = "force-static";

const BASE = SITE_URL;

export function GET() {
  const applications = NAV.find((s) => s.label === "Applications")?.links ?? [];
  const applicationLines = applications
    .map((l) => `- [${l.label}](${BASE}${l.href}): ${l.blurb ?? ""}`.trimEnd())
    .join("\n");

  const supportLines = SUPPORTERS.map((s) => `- ${s.statement}${s.since ? ` (${s.since})` : ""}.`).join("\n");
  const newsLines = POSTS.slice(0, 6)
    .map((p) => `- [${p.title}](${BASE}/news/${p.slug}) (${p.dateLabel}): ${p.excerpt}`)
    .join("\n");
  const eventLines = EVENTS.map(
    (e) => `- ${e.name}, ${e.city}, ${e.dateLabel}: ${e.role.toLowerCase()}.`
  ).join("\n");

  const body = `# ${BRAND}

> ${BRAND} (${LEGAL_NAME}) designs ${DESCRIPTOR.toLowerCase()}: magnetometers based on nitrogen-vacancy (NV) centres in diamond. Its first application is navigation you can trust without GPS: the instrument reads the Earth's magnetic field, matches it to a magnetic map and returns each position with its error bound.

The sensor works at room temperature and reads a full magnetic vector from the four crystal axes of diamond. It is passive: it reads the Earth's own field and needs no external signal. It completes an inertial unit; it does not replace it. A magnetic source placed nearby can disturb any magnetometer; the instrument is designed to detect that and say so.

Design work starts in simulation. The simulation is checked against a register of more than 100 published experimental results; quantitative validation covers the subset whose experimental conditions are documented well enough. Figures from the simulation are model-derived: still to be calibrated against hardware, and useful in relative terms.

## Key facts (as of ${FACTS_AS_OF})
- ${PATENT_DETAIL}
- ${STAGE_LINE}
- ${LEGAL_NAME}, registered ${REGISTERED_LABEL}, ${RCS}, ${ADDRESS.locality}, ${ADDRESS.country}.
- ${FOUNDER.role}: ${FOUNDER.name}.

## Support and memberships
${supportLines}

## Core pages
- [Home](${BASE}/): diamond quantum sensors; first, navigation you can trust without GPS.
- [Navigation](${BASE}/applications/navigation): the problem, the error bound, how magnetic navigation works, situations and FAQ.
- [Technology](${BASE}/technology): the principle, why diamond, simulation first.
- [Applications](${BASE}/applications): one diamond platform, many instruments.
- [Company](${BASE}/company): vision, where we stand, team, support and memberships, careers.
- [News](${BASE}/news): milestones and notes from the work.
- [Events](${BASE}/events): where to meet us.
- [Glossary](${BASE}/glossary): the terms of quantum navigation, explained.
- [Press kit](${BASE}/press): facts, boilerplate, logos and contact.
- [Mission demos](${BASE}/instrument): fly a simulated mission in the browser; every figure is model-derived.
- [En français](${BASE}/fr): ${BRAND} en bref.
- [Contact](${BASE}/contact): programme partners, laboratories, press.

## Applications
${applicationLines}

## Recent news
${newsLines}

## Events
${eventLines}

## Notes for citation
- The name is "${BRAND}", in two words. Descriptor: "${DESCRIPTOR}".
- Stage: designing and developing. Figures from the simulation are model-derived.
- Patents: "patent applications filed in 2026", or "patent-pending".
- Navigation is the first application of a diamond sensing platform.
- Performance figures are not published. Model-derived design targets are shared privately on request.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
