import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteShell, { SITE_METADATA, SITE_VIEWPORT } from "../components/SiteShell";

export const metadata: Metadata = SITE_METADATA;
export const viewport: Viewport = SITE_VIEWPORT;

/** Root layout of every page under /fr: the whole document is declared French. */
export default function FrenchRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteShell lang="fr">{children}</SiteShell>;
}
