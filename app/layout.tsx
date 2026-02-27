import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-dosis"
});

export const metadata: Metadata = {
  title: "Marv's Repos",
  description: "Interactive repository catalog with live search and physics-based layout."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dosis.variable} min-h-screen bg-mesh text-primary antialiased`}>{children}</body>
    </html>
  );
}
