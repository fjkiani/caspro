import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/SEO/JsonLd";
import NavigationLoader from "@/components/ui/NavigationLoader";

// Space Grotesk for headings — technical, modern.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Inter for body text — clean, readable.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot",
    template: "%s | CrisPRO.ai",
  },
  description:
    "CrisPRO.ai — AI-powered metastasis prevention. Variant interpretation, in-silico therapeutic design, and mechanism-aligned oncology decisions.",
  keywords:
    "metastasis prevention, predictive oncology, AI cancer genomics, VUS resolution, in silico therapeutic design, oncology co-pilot, CRISPR, personalized medicine, precision oncology",
  authors: [{ name: "CrisPRO.ai" }],
  creator: "CrisPRO.ai",
  publisher: "CrisPRO.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://crispro.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot",
    description:
      "The AI-powered metastasis prevention platform. VUS resolution, in silico therapeutic design, and a deterministic oncology Co-Pilot.",
    url: 'https://crispro.ai',
    siteName: 'CrisPRO.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CrisPRO.ai — AI-Powered Cancer Genomics Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot",
    description:
      "VUS resolution, in silico therapeutic design, and predictive oncology analytics — from CrisPRO.ai.",
    images: ['/og-image.png'],
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
    ],
    shortcut: '/favicon.svg',
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  ...(GOOGLE_VERIFICATION
    ? { verification: { google: GOOGLE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`light-mode ${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-background`}>
        <ThemeProvider>
          <AccessibilityProvider>
            <NavigationLoader />
            <div className="flex-grow flex flex-col min-h-0">
              {children}
            </div>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
