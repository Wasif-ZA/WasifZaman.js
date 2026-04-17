import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.wasifzaman.tech";
const SITE_NAME = "Wasif Zaman";
const SITE_TITLE = "Wasif Zaman — Software Engineer · Sydney";
const SITE_DESC =
  "Software Engineer shipping AI products in Sydney. Currently building Korvo, an AI job-outreach SaaS. Open to graduate SWE roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Wasif Zaman",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: "Wasif Zaman", url: SITE_URL }],
  creator: "Wasif Zaman",
  keywords: [
    "Wasif Zaman",
    "Software Engineer",
    "Sydney",
    "Next.js",
    "AI",
    "Korvo",
    "Portfolio",
    "Neo-brutalist",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: "@wasifzaman",
  },
  icons: {
    icon: "/wz-icon.png",
    apple: "/wz-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
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
        {children}
      </body>
    </html>
  );
}
