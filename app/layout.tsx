import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raspberry Pi Project Finder",
  description: "Discover Raspberry Pi projects matching your interests, skill level, and available components."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">{children}</body>
    </html>
  );
}
