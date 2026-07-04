import Link from 'next/link';
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
      {/* Round-2: server-rendered depth block for word count + text-HTML ratio */}
      <section
        data-role="homepage-depth-block"
        className="bg-[#0A0A0F] py-16 border-t border-zinc-900"
      >
        <div className="mx-auto max-w-4xl px-6 text-zinc-300">
          <h2 className="text-2xl font-bold text-white mb-4">
            About CrisPRO.ai — mechanism-aligned oncology co-pilot
          </h2>
          <p className="mb-4 leading-relaxed">
            CrisPRO.ai is an AI-powered oncology co-pilot built to make cancer care
            deterministic, mechanism-aligned, and audit-ready. We do not sequence tumors —
            we sit above the sequencing report, ingest structured molecular and clinical
            data from any vendor (Tempus, Foundation Medicine, Guardant, Caris, or your own
            in-house pipeline), and produce actionable, evidence-linked decisions.
          </p>
          <p className="mb-4 leading-relaxed">
            Three specialized intelligences power the platform.{' '}
            <Link href="/products/oracle" className="text-cyan-400 hover:underline">
              Oracle
            </Link>{' '}
            interprets variants, transcripts, and biomarkers with a mechanistic rationale
            for every score.{' '}
            <Link href="/products/forge" className="text-cyan-400 hover:underline">Forge</Link>{' '}
            designs in-silico interventions — CRISPR guide RNAs, therapeutic
            alternatives, and combination strategies — grounded in the target biology.{' '}
            <Link href="/products/command-center" className="text-cyan-400 hover:underline">
              Scribe (Command Center)
            </Link>{' '}
            writes the audit-ready narrative, with every claim linked to its exact source:
            trial data, guideline, published paper, or internal validation study.
          </p>
          <p className="mb-4 leading-relaxed">
            The result is a workflow where every recommendation is defensible in front of
            a tumor board, a payer, or the FDA — and where the clinician, researcher, or
            biotech operator sees the full evidence chain, not a black box. See our{' '}
            <Link href="/evidence" className="text-cyan-400 hover:underline">
              evidence and validation page
            </Link>{' '}
            for benchmarking data (95.7% AUROC on ClinVar, n=53,210), our{' '}
            <Link href="/case-studies" className="text-cyan-400 hover:underline">
              case studies
            </Link>{' '}
            for real-world application, or our{' '}
            <Link href="/comparison" className="text-cyan-400 hover:underline">
              comparison pages
            </Link>{' '}
            for how CrisPRO fits alongside the major precision-oncology platforms.
          </p>
          <p className="leading-relaxed">
            CrisPRO.ai serves clinical, research, and industry customers. Explore{' '}
            <Link href="/products/oncology" className="text-cyan-400 hover:underline">
              oncology products
            </Link>
            , the{' '}
            <Link href="/platform" className="text-cyan-400 hover:underline">
              platform overview
            </Link>
            , our{' '}
            <Link href="/research" className="text-cyan-400 hover:underline">
              research
            </Link>{' '}
            program, or{' '}
            <Link href="/contact" className="text-cyan-400 hover:underline">
              contact the team
            </Link>{' '}
            for a demo.
          </p>
        </div>
      </section>


      <HomepageEngines />
      <HomepageEvidence />
      <HomepageAudience />
            {/* Round-2: research highlights block — reduces crawl depth for deep manuscripts/artifacts */}
      <section
        data-role="homepage-research-highlights"
        className="bg-[#0A0A0F] py-16 border-t border-zinc-900"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-white mb-4">Latest research</h2>
          <p className="text-zinc-400 mb-6">
            Highlights from the CrisPRO research ledger — brought to the top so search
            engines and crawlers can reach them within one click.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li>
              <Link href="/research/blog/platinum-window-hypothesis-part-2" className="text-cyan-400 hover:underline">
                Platinum-Window Hypothesis — Part 2
              </Link>
              <span className="block text-sm text-zinc-500">Who is the system failing most, and why?</span>
            </li>
            <li>
              <Link href="/research/blog/platinum-window-hypothesis-part-4" className="text-cyan-400 hover:underline">
                Platinum-Window Hypothesis — Part 4
              </Link>
              <span className="block text-sm text-zinc-500">2,500 patients just told us the same thing.</span>
            </li>
            <li>
              <Link href="/research/blog/gbm" className="text-cyan-400 hover:underline">
                Building the Brain Metastasis Framework — GBM
              </Link>
              <span className="block text-sm text-zinc-500">Studying glioblastoma trial failures.</span>
            </li>
            <li>
              <Link href="/research/blog/stc-1010-guide" className="text-cyan-400 hover:underline">
                CrisPRO for the Next STC-1010 Program
              </Link>
              <span className="block text-sm text-zinc-500">Guided by CrisPRO.</span>
            </li>
            <li>
              <Link href="/manuscripts" className="text-cyan-400 hover:underline">
                All manuscripts
              </Link>
              <span className="block text-sm text-zinc-500">Peer-reviewed and preprint archive.</span>
            </li>
            <li>
              <Link href="/evidence" className="text-cyan-400 hover:underline">
                Evidence ledger
              </Link>
              <span className="block text-sm text-zinc-500">95.7% AUROC on ClinVar (n=53,210).</span>
            </li>
          </ul>
        </div>
      </section>

      <HomepageCTA />
    </main>
  );
}
