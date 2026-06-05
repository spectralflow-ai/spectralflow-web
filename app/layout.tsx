import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
  "NV-diamond magnetometers for resilient navigation where GPS is jammed or denied — room temperature, miniature, un-jammable. Sovereign deep tech. 13 UK patents filed.";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
