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

export const metadata: Metadata = {
  title: "Wasif Zaman - AI & Web Developer",
  description: "Software Engineer creating raw & robust digital experiences. Specializing in Next.js, AI integration, and Neo-Brutalist design.",
  openGraph: {
    title: "Wasif Zaman - AI & Web Developer",
    description: "Software Engineer creating raw & robust digital experiences.",
    url: "https://www.wasifzaman.tech", // Placeholder - adjust if actual domain is known
    siteName: "Wasif Zaman",
    images: [
      {
        url: "/wz-icon.png", // Using the new icon as a placeholder OG image
        width: 800,
        height: 800,
        alt: "Wasif Zaman AI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
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
