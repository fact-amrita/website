import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding to Member | Forensic Analysis Club & Triage",
  description: "Welcome to the Forensic Analysis Club & Triage, from Amrita Vishwa Vidyapeetham - Chennai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
