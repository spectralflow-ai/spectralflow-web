import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { CONTACT_EMAIL } from "./lib/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "SpectralFlow — Quantum Sensing, Out of the Lab";
const DESCRIPTION =
  "NV-diamond magnetometers for resilient navigation where GPS is jammed or denied — room temperature, chip-scale, designed for the vehicle, not the lab. Sovereign European deep tech. 13 patent families filed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://spectralflow.ai"),
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

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SpectralFlow",
  legalName: "Spectral Flow SAS",
  url: "https://spectralflow.ai",
  logo: "https://spectralflow.ai/icon.svg",
  description: DESCRIPTION,
  foundingLocation: { "@type": "Country", name: "France" },
  email: CONTACT_EMAIL,
  knowsAbout: [
    "NV-diamond quantum sensors",
    "Magnetometry",
    "GPS-denied navigation",
    "Quantum sensing",
  ],
  memberOf: { "@type": "Organization", name: "NVIDIA Inception" },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
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
