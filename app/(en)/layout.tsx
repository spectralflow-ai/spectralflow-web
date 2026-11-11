import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteShell, { SITE_METADATA, SITE_VIEWPORT } from "../components/SiteShell";

export const metadata: Metadata = SITE_METADATA;
export const viewport: Viewport = SITE_VIEWPORT;

/** Root layout of the English pages, every address outside /fr: the document is declared English. */
export default function EnglishRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
