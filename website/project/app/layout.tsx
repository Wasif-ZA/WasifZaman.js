import type { Metadata } from "next";
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
const TITLE = "Wasif Zaman — AI & Software Engineer";
const DESCRIPTION =
  "Software Engineer in Sydney shipping AI-powered products. Neo-brutalist portfolio — Next.js, TypeScript, Supabase, and the Claude API. Open to junior & graduate SWE roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Wasif Zaman",
    "Software Engineer",
    "Sydney",
    "Next.js",
    "TypeScript",
    "AI",
    "Claude API",
    "Supabase",
    "Neo-brutalist",
    "Portfolio",
  ],
  authors: [{ name: "Wasif Zaman", url: SITE_URL }],
  creator: "Wasif Zaman",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Wasif Zaman",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/wz-icon.png",
    apple: "/wz-icon.png",
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
        {children}
      </body>
    </html>
  );
}
