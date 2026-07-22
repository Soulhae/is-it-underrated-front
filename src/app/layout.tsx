import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is It Underrated? - Discover Hidden Gems on Steam",
  description: "Is It Underrated? is a data-driven platform that identifies high-quality, underrated games on Steam. Our proprietary algorithm analyzes reviews, popularity, and community engagement to recommend hidden gems that deserve more attention.",
  keywords: [
    "Is It Underrated?",
    "Steam",
    "Underrated Games",
    "Hidden Gems",
    "Game Recommendations",
    "Game Discovery",
    "Video Games",
    "Gaming Community",
    "Game Reviews",
    "Game Analysis",
  ],
  authors: [{ name: "Benjamín Herrera Arancibia", url: "https://github.com/Soulhae" }],
  creator: "Benjamín Herrera Arancibia",
  openGraph: {
    type: "website",
    title: "Is It Underrated? - Discover Hidden Gems on Steam",
    description: "Discover high-quality, underrated Steam games using our data-driven algorithm.",
    url: "https://is-it-underrated.vercel.app",
    siteName: "Is It Underrated?",
    images: [
      {
        url: "https://is-it-underrated.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Is It Underrated? Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is It Underrated? - Discover Hidden Gems on Steam",
    description: "Discover high-quality, underrated Steam games using our data-driven algorithm.",
    images: ["https://is-it-underrated.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
