import Link from 'next/link';
import { BENCHMARKS, BENCHMARK_LICENSE, BENCHMARK_METHODOLOGY_STEPS, FEATURED_BENCHMARKS } from '@/data/benchmarks';
import { BreadcrumbListJsonLd } from '@/components/SEO/BreadcrumbListJsonLd';
import { DatasetJsonLd } from '@/components/SEO/DatasetJsonLd';
import { HowToJsonLd } from '@/components/SEO/HowToJsonLd';
import RelatedLinks from '@/components/shared/RelatedLinks';

/**
 * /benchmarks — Oracle discriminative performance, one source of truth for the
 * public numbers we cite everywhere else (Contact section partner benefits,
 * unifiedEvidenceData.hero.keyMetrics, Oracle showcase).
 *
 * JSON-LD: BreadcrumbList + Dataset + HowTo (methodology). All emitted via
 * plain <script> tags (never next/script beforeInteractive).
 */

const SITE_URL = 'https://crispro.ai';

export default function BenchmarksPage() {
  const datasetVariables = BENCHMARKS.map((b) => ({
    name: b.name,
    value: b.value,
    description: `${b.description} Dataset: ${b.dataset}${
      b.sampleSize ? `, n=${b.sampleSize.toLocaleString()}` : ''
    }.`,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <BreadcrumbListJsonLd
        id="benchmarks-breadcrumb-jsonld"
        items={[
          { name: 'Home', item: SITE_URL },
          { name: 'Benchmarks', item: `${SITE_URL}/benchmarks` },
        ]}
      />
      <DatasetJsonLd
        id="benchmarks-dataset-jsonld"
        name="CrisPRO Oracle public benchmarks"
        description="Public discriminative benchmarks for CrisPRO Oracle across ClinVar, SpliceVarDB, and the BRCA1 saturation-mutagenesis cohort. All numbers reported are held-out or zero-shot."
        url={`${SITE_URL}/benchmarks`}
        license={BENCHMARK_LICENSE}
        creator="CrisPRO.ai"
        keywords={['variant interpretation', 'ClinVar', 'SpliceVarDB', 'BRCA1', 'zero-shot', 'AUROC']}
        measurementTechnique="Zero-shot AUROC on frozen public validation cohorts"
        variableMeasured={datasetVariables}
        distribution={[
          { encodingFormat: 'application/json', contentUrl: `${SITE_URL}/benchmarks/data.json` },
        ]}
        dateModified="2026-07-04"
      />
      <HowToJsonLd
        id="benchmarks-howto-jsonld"
        name="How CrisPRO publishes benchmark numbers"
        description="The four-step process by which every benchmark number on this page is produced and posted."
        steps={BENCHMARK_METHODOLOGY_STEPS.map((s) => ({
          name: s.name,
          text: s.text,
        }))}
      />

      <div className="mx-auto max-w-5xl px-4 py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-white underline underline-offset-2">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-slate-200">
              Benchmarks
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Benchmarks: Oracle discriminative performance
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            The public numbers we cite everywhere else on the site — ClinVar,
            SpliceVarDB, BRCA1, plus the SOTA subset numbers. All values are
            zero-shot or held-out. The raw data is available at{' '}
            <Link href="/benchmarks/data.json" className="text-cyan-400 underline underline-offset-2">
              /benchmarks/data.json
            </Link>{' '}
            under CC BY 4.0.
          </p>
        </header>

        <section aria-labelledby="featured-heading" className="mb-16">
          <h2 id="featured-heading" className="text-2xl font-semibold mb-6">
            Featured benchmarks
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {FEATURED_BENCHMARKS.map((b) => (
              <article
                key={b.id}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{b.name}</h3>
                  <span
                    className="rounded bg-slate-800 px-2 py-1 text-xs uppercase tracking-wide text-slate-300"
                    aria-label={`Badge: ${b.badge}`}
                  >
                    {b.badge}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold text-cyan-400">{b.value}</p>
                <p className="mt-3 text-sm text-slate-400">
                  {b.dataset}
                  {b.sampleSize ? ` — n=${b.sampleSize.toLocaleString()}` : ''}
                </p>
                <p className="mt-4 text-slate-300">{b.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="all-heading" className="mb-16">
          <h2 id="all-heading" className="text-2xl font-semibold mb-6">
            All benchmarks
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wide">
                <tr>
                  <th scope="col" className="px-4 py-3">Metric</th>
                  <th scope="col" className="px-4 py-3">Value</th>
                  <th scope="col" className="px-4 py-3">Dataset</th>
                  <th scope="col" className="px-4 py-3">n</th>
                  <th scope="col" className="px-4 py-3">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {BENCHMARKS.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-medium">{b.name}</td>
                    <td className="px-4 py-3 text-cyan-400">{b.value}</td>
                    <td className="px-4 py-3 text-slate-300">{b.dataset}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {b.sampleSize ? b.sampleSize.toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-slate-800 px-2 py-1 text-xs uppercase text-slate-300">
                        {b.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="methodology-heading" className="mb-16">
          <h2 id="methodology-heading" className="text-2xl font-semibold mb-6">
            Methodology
          </h2>
          <ol className="space-y-4">
            {BENCHMARK_METHODOLOGY_STEPS.map((step, idx) => (
              <li
                key={step.name}
                className="rounded-lg border border-slate-800 bg-slate-900/40 p-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-cyan-400 font-mono text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold">{step.name}</h3>
                </div>
                <p className="mt-2 text-slate-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="related-heading" className="mb-16">
          <h2 id="related-heading" className="text-2xl font-semibold mb-4">
            Related
          </h2>
          <ul className="space-y-2 text-slate-300">
            <li>
              →{' '}
              <Link href="/platform/oracle-intelligence" className="text-cyan-400 underline underline-offset-2">
                Oracle: variant interpretation
              </Link>{' '}
              — the discriminative engine these numbers describe.
            </li>
            <li>
              →{' '}
              <Link href="/evidence" className="text-cyan-400 underline underline-offset-2">
                Evidence ledger
              </Link>{' '}
              — the same numbers, in their downstream clinical-tier context.
            </li>
            <li>
              →{' '}
              <Link href="/glossary" className="text-cyan-400 underline underline-offset-2">
                Glossary
              </Link>{' '}
              — AUROC, zero-shot, VUS, tier definitions.
            </li>
            <li>
              →{' '}
              <Link href="/api/oracle.json" className="text-cyan-400 underline underline-offset-2">
                /api/oracle.json
              </Link>{' '}
              — machine-readable capability + benchmark manifest.
            </li>
          </ul>
        </section>

        <p className="text-xs text-slate-500">
          Benchmark values under {' '}
          <a
            href={BENCHMARK_LICENSE}
            className="underline underline-offset-2 hover:text-slate-300"
            rel="license noopener"
            target="_blank"
          >
            CC BY 4.0
          </a>
          . Last verified 2026-07-04.
        </p>
        <RelatedLinks route="/benchmarks" />
      </div>
    </main>
  );
}
