import type { Metadata, Viewport } from "next";
import SiteShell, { SITE_METADATA, SITE_VIEWPORT } from "./components/SiteShell";
import NotFoundPage, { NOT_FOUND_METADATA } from "./components/NotFoundPage";
import { BRAND } from "./lib/facts";

/*
 * An address that matches no page. The site has two root layouts (app/(en)
 * and app/fr, for <html lang>), so there is no layout above every page: this
 * file is the whole document of the 404, the same as the English pages
 * (experimental.globalNotFound in next.config.ts).
 */
export const metadata: Metadata = {
  ...SITE_METADATA,
  ...NOT_FOUND_METADATA,
  title: `${NOT_FOUND_METADATA.title} · ${BRAND}`,
};
export const viewport: Viewport = SITE_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <SiteShell lang="en">
      <NotFoundPage />
    </SiteShell>
  );
}
