import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { CONTACT_EMAIL } from "./lib/contact";
import { PATENT_FAMILIES } from "./lib/facts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "SpectralFlow · Quantum Sensing, Out of the Lab";
const DESCRIPTION = `NV-diamond magnetometers for resilient navigation where GPS is jammed or denied: room temperature, chip-scale, designed for the vehicle, not the lab. Sovereign European deep tech. ${PATENT_FAMILIES} patent families filed.`;

const SITE_URL = "https://www.spectralflow.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · SpectralFlow",
  },
  description: DESCRIPTION,
  applicationName: "SpectralFlow",
  keywords: [
    "NV-diamond",
    "quantum sensing",
    "magnetometer",
    "GPS-denied navigation",
    "inertial navigation",
    "deep tech",
    "sovereign",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "SpectralFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "SpectralFlow",
      legalName: "Spectral Flow SAS",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: DESCRIPTION,
      foundingDate: "2026",
      foundingLocation: { "@type": "Country", name: "France" },
      email: CONTACT_EMAIL,
      founder: { "@id": `${SITE_URL}/#founder` },
      knowsAbout: [
        "NV-diamond quantum sensors",
        "Magnetometry",
        "GPS-denied navigation",
        "Magnetic navigation",
        "Quantum sensing",
        "Chip-scale NMR",
        "Quantum biosensing",
        "Semiconductor failure analysis",
      ],
      memberOf: { "@type": "Organization", name: "NVIDIA Inception" },
      sameAs: ["https://www.linkedin.com/company/spectralflow"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SpectralFlow",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Alexandre Papa",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
        <Analytics />
      </body>
    </html>
  );
}
