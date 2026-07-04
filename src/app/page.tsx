import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroSlider } from '@/components/sections/mars/HeroSlider';
import HomepagePillars from '@/components/homepage/HomepagePillars';
import HomepageEngines from '@/components/homepage/HomepageEngines';
import HomepageEvidence from '@/components/homepage/HomepageEvidence';
import HomepageAudience from '@/components/homepage/HomepageAudience';
import HomepageCTA from '@/components/homepage/HomepageCTA';

/**
 * Homepage. Audit-driven rebuild:
 *   - Visible (sr-only) H1 so the root URL has exactly one heading-1.
 *   - Five indexable content sections beneath the hero slider so the
 *     homepage actually has content for Google and llms.txt consumers.
 *   - Internal links into every major cluster (pillars, engines,
 *     evidence, industries, contact) at depth 1.
 */

export const metadata: Metadata = {
  title: 'CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot',
  description:
    'CrisPRO.ai pairs Oracle, Forge, and Scribe — three specialized intelligences for variant interpretation, in-silico therapeutic design, and auditable clinical narratives. 95.7% AUROC on ClinVar (n=53,210).',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot',
    description:
      'Oracle, Forge, and Scribe — three specialized intelligences for cancer care. Mechanism-aligned, evidence-backed, audit-ready.',
    url: 'https://crispro.ai/',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] w-full overflow-x-hidden">
      <h1 className="sr-only">
        AI-Powered Metastasis Prevention &amp; Oncology Co-Pilot
      </h1>

      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" aria-hidden />}>
        <HeroSlider />
      </Suspense>

      <HomepagePillars />
      <HomepageEngines />
      <HomepageEvidence />
      <HomepageAudience />
      <HomepageCTA />
    </main>
  );
}
