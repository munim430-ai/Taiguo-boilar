import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Henan Taiguo Boiler Products",
  description: "Exclusive digital gateway for Henan Taiguo Boiler Products.",
};

import { RegionProvider } from "@/contexts/RegionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased font-sans">
        <RegionProvider>
          {children}
        </RegionProvider>
      </body>
    </html>
  );
}
