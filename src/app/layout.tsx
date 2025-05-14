import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CasPro: Oncology Co-Pilot | AI-Powered Cancer Genomics Platform",
  description: "CasPro is an AI platform leveraging Evo2 and AlphaFold 3 for clinicians and researchers to analyze cancer genomics and design novel therapies.",
  keywords: "oncology, cancer genomics, AI platform, precision medicine, cancer therapy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
