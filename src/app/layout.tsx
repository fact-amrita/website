import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forensic Analysis Club & Triage",
  description: "Welcome to the Forensic Analysis Club & Triage, from Amrita Vishwa Vidyapeetham - Chennai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <SpeedInsights />
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
