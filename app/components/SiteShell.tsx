/**
 * The document every page is served in, shared by the two root layouts:
 * app/(en)/layout.tsx (every address outside /fr) and app/fr/layout.tsx, plus
 * app/global-not-found.tsx. Two root layouts let the served HTML carry the
 * right <html lang> in each language while every page stays static.
 */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Nav from "./Nav";
import Footer from "./Footer";
import { CONTACT_EMAIL } from "../lib/contact";
import {
  ADDRESS,
  BRAND,
  DESCRIPTOR,
  FOUNDER,
  LEGAL_NAME,
  LINKEDIN_URL,
  REGISTERED,
  SHARE_IMAGE,
  SITE_URL,
} from "../lib/facts";
import { SUPPORTERS } from "../lib/supporters";
import type { Lang } from "../lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${BRAND} · ${DESCRIPTOR} for navigation`;
const DESCRIPTION =
  "Spectral Flow designs diamond quantum sensors. The first application is navigation you can trust without GPS: the instrument reads the Earth's magnetic field and returns each position with its error bound.";

/** The site's share image (app/opengraph-image.tsx), named: no layout sits above both languages to inherit it from. */
const OG_IMAGE = { ...SHARE_IMAGE, type: "image/png" };

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${BRAND}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND,
  verification: { google: "oyPBoJQ-UcuzTdlAquK44i-meA0AANU_CIDZ7uHeIDw" },
  keywords: [
    "diamond quantum sensors",
    "NV centres in diamond",
    "quantum magnetometer",
    "magnetic navigation",
    "navigation without GPS",
    "GNSS-denied navigation",
    "alternative PNT",
    "quantum sensing",
  ],
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: BRAND,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const SITE_VIEWPORT: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

/** Programmes we are a member of, from the same source as the page blocks. */
const MEMBER_OF = SUPPORTERS.filter((s) => s.kind === "Member of").map((s) => ({
  "@type": "Organization",
  name: s.name,
}));

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: BRAND,
      legalName: LEGAL_NAME,
      description: DESCRIPTION,
      slogan: DESCRIPTOR,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      foundingDate: REGISTERED,
      foundingLocation: { "@type": "Place", name: `${ADDRESS.locality}, ${ADDRESS.country}` },
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        postalCode: ADDRESS.postalCode,
        addressLocality: ADDRESS.locality,
        addressCountry: ADDRESS.countryCode,
      },
      email: CONTACT_EMAIL,
      founder: { "@id": `${SITE_URL}/#founder` },
      knowsAbout: [
        "Diamond quantum sensors",
        "Nitrogen-vacancy centres in diamond",
        "Quantum magnetometry",
        "Magnetic navigation",
        "Navigation without GNSS",
        "Quantum sensing",
      ],
      memberOf: MEMBER_OF,
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: ["en", "fr"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.role,
      worksFor: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function SiteShell({
  lang,
  children,
}: Readonly<{
  lang: Lang;
  children: ReactNode;
}>) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg"
          style={{ background: "var(--accent)", color: "#FFFFFF" }}
        >
          Skip to content
        </a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
