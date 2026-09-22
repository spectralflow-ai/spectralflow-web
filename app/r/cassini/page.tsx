import type { Metadata } from "next";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../../components/kit";

// Unlisted page: the motivation video submitted with the CASSINI Business Accelerator
// application (EUSPA, autumn 2026 batch). Not in the nav, not in the sitemap, noindex,
// and /r/ is already disallowed in robots.ts. Reachable only by its URL.
export const metadata: Metadata = {
  title: "Application video",
  description: "Motivation video submitted with an accelerator application.",
  robots: { index: false, follow: false, nocache: true },
};

const VIDEO = "/r/spectralflow-cassini-2026.mp4";
const POSTER = "/r/spectralflow-cassini-2026.jpg";

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Application"
        title="Motivation video"
        intro="Alexandre Papa, founder of Spectral Flow. One minute and twenty seconds."
      />
      <Prose>
        <video
          controls
          playsInline
          preload="metadata"
          poster={POSTER}
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "2px" }}
        >
          <source src={VIDEO} type="video/mp4" />
          Your browser cannot play this video.{" "}
          <a href={VIDEO} download>
            Download the file
          </a>
          .
        </video>
        <div className="mt-8">
          <Eyebrow>If the player does not start</Eyebrow>
          <H2>
            <a href={VIDEO} download>
              Download the video
            </a>
          </H2>
          <Body>MP4, H.264, 1080p. About 25 MB.</Body>
        </div>
      </Prose>
    </>
  );
}
