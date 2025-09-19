import type { Metadata } from "next";

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
// import FloatingToggleButton from "@/components/ui/FloatingToggleButton";
import { ThemeProvider } from "@/context/ThemeContext";
import { JsonLd, organizationSchema } from "@/components/SEO/JsonLd";

// Space Grotesk for headings - more technical and modern
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Inter for body text - clean and readable
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrisPRO: AI-Powered Metastasis Prevention & Oncology Co-Pilot",
  description: "CrisPRO is the world's first AI-powered metastasis prevention system. Our Oncology Co-Pilot offers VUS resolution, in silico therapeutic design, and predictive analytics.",
  keywords: "metastasis prevention, predictive oncology, AI cancer genomics, VUS resolution, in silico therapeutic design, oncology co-pilot, CRISPR, personalized medicine, Tempus alternatives",
  authors: [{ name: "CrisPRO Team" }],
  creator: "CrisPRO",
  publisher: "CrisPRO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://crispro.ai'), // Replace with your actual domain
  openGraph: {
    title: "CrisPRO: AI-Powered Metastasis Prevention System",
    description: "The world's first AI-powered metastasis prevention system. Transform cancer care from reactive to preventive with our Oncology Co-Pilot.",
    url: 'https://crispro.ai',
    siteName: 'CrisPRO',
    images: [
      {
        url: '/og-image.png', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'CrisPRO - AI-Powered Cancer Genomics Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CrisPRO:",
    description: "world's first AI-powered metastasis prevention system.",
    images: ['/og-image.png'], // You'll need to add this image
    creator: '@crispro_ai', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧬</text></svg>",
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual Google verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-background`}>
        <ThemeProvider>
          <Navbar />
          {/* <FloatingToggleButton href="/platform">
            Research Use Only
          </FloatingToggleButton> */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
