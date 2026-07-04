import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * /platform layout. Each child /platform/{slug} route sets its OWN
 * `title: 'FooBar: ...'` as a raw string, which suppresses the root layout
 * `title.template` — that is intentional. Child capability pages already
 * carry a rich standalone title that reads well without the " | CrisPRO.ai"
 * suffix.
 *
 * This layout applies ONLY to /platform (index). The bare "Platform" that
 * previously rendered failed the 15-char minimum in the title-length audit.
 *
 * We use `title.absolute` here so the root `title.template` ("%s | CrisPRO.ai")
 * does NOT double-suffix our already-suffixed string.
 */

export const metadata: Metadata = {
  title: {
    absolute: 'Platform: Oracle, Forge, and Scribe Co-Pilots | CrisPRO.ai',
  },
  description:
    'The CrisPRO.ai platform: Oracle, Forge, and Scribe intelligence working together as your oncology Co-Pilot.',
  alternates: { canonical: '/platform' },
  openGraph: {
    title: 'Platform: Oracle, Forge, and Scribe Co-Pilots',
    description:
      'The CrisPRO.ai platform: Oracle, Forge, and Scribe intelligence working together as your oncology Co-Pilot.',
    url: 'https://crispro.ai/platform',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform: Oracle, Forge, and Scribe Co-Pilots',
    description:
      'Oracle (variant interpretation), Forge (in silico design), and Scribe (clinical narrative) — the CrisPRO Co-Pilot.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
