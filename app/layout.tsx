import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raspberry-pi-project-finder.com"),
  title: {
    default: "Raspberry Pi Project Finder",
    template: "%s | Raspberry Pi Project Finder"
  },
  description:
    "Find Raspberry Pi projects that fit your skill level, available parts, and goals. Stop guessing and start building projects you can actually finish.",
  applicationName: "Raspberry Pi Project Finder",
  keywords: [
    "Raspberry Pi",
    "maker projects",
    "DIY electronics",
    "project finder",
    "Raspberry Pi tutorials",
    "hobby electronics"
  ],
  openGraph: {
    type: "website",
    title: "Raspberry Pi Project Finder",
    description:
      "A curated search engine for Raspberry Pi builders. Filter by parts, skill level, and interests to get realistic projects with difficulty and parts lists.",
    url: "https://raspberry-pi-project-finder.com",
    siteName: "Raspberry Pi Project Finder"
  },
  twitter: {
    card: "summary_large_image",
    title: "Raspberry Pi Project Finder",
    description:
      "Skip the endless forum scrolling. Discover Raspberry Pi projects you can finish with the parts you already own."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} bg-[#0d1117] text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
