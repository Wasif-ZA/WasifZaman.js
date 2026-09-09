import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "./lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Wasif Zaman",
    "Software Engineer",
    "Sydney",
    "Next.js",
    "TypeScript",
    "C++",
    "Python",
    "Macquarie University",
    "Graduate Software Engineer",
    "Web design Sydney",
  ],
  authors: [{ name: "Wasif Zaman", url: SITE_URL }],
  creator: "Wasif Zaman",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Wasif Zaman",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/wz-icon.png", apple: "/wz-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${geistMono.variable} grain antialiased`}>
        {children}
      </body>
    </html>
  );
}
