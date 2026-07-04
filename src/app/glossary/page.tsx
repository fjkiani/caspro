import Link from 'next/link';
import {
  GLOSSARY_BY_CATEGORY,
  GLOSSARY_TERMS,
  GLOSSARY_TERM_MAP,
} from '@/data/glossary';
import { BreadcrumbListJsonLd } from '@/components/SEO/BreadcrumbListJsonLd';
import { DefinedTermSetJsonLd } from '@/components/SEO/DefinedTermSetJsonLd';
import RelatedLinks from '@/components/shared/RelatedLinks';

/**
 * /glossary — DefinedTermSet + BreadcrumbList JSON-LD, plus one section per
 * category. Terms link to each other via seeAlso, and out to /platform + /evidence.
 *
 * The JSON-LD is emitted via plain <script> — never next/script beforeInteractive.
 */

const SITE_URL = 'https://crispro.ai';

export default function GlossaryPage() {
  const definedTerms = GLOSSARY_TERMS.map((t) => ({
    name: t.name,
    description: t.short,
    termCode: t.termCode,
    url: `${SITE_URL}/glossary#${t.slug}`,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <BreadcrumbListJsonLd
        id="glossary-breadcrumb-jsonld"
        items={[
          { name: 'Home', item: SITE_URL },
          { name: 'Glossary', item: `${SITE_URL}/glossary` },
        ]}
      />
      <DefinedTermSetJsonLd
        id="glossary-defined-term-set-jsonld"
        name="CrisPRO.ai glossary"
        description="Glossary of CrisPRO.ai terms across variant interpretation, AI methodology, clinical evidence, oncology mechanism, and the CrisPRO platform."
        url={`${SITE_URL}/glossary`}
        terms={definedTerms}
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
              Glossary
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Glossary
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            {GLOSSARY_TERMS.length} terms across five categories — variant
            interpretation, AI methodology, clinical evidence, oncology
            mechanism, and the CrisPRO platform.
          </p>
        </header>

        <section aria-labelledby="toc-heading" className="mb-16">
          <h2 id="toc-heading" className="text-xl font-semibold mb-4">
            Categories
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {GLOSSARY_BY_CATEGORY.map((group) => (
              <li key={group.category}>
                <Link
                  href={`#category-${group.category}`}
                  className="text-cyan-400 underline underline-offset-2"
                >
                  {group.label}
                </Link>
                <span className="text-slate-500 text-sm"> ({group.terms.length})</span>
              </li>
            ))}
          </ul>
        </section>

        {GLOSSARY_BY_CATEGORY.map((group) => (
          <section
            key={group.category}
            id={`category-${group.category}`}
            aria-labelledby={`category-${group.category}-heading`}
            className="mb-16"
          >
            <h2
              id={`category-${group.category}-heading`}
              className="text-2xl font-semibold mb-6 border-b border-slate-800 pb-2"
            >
              {group.label}
            </h2>
            <dl className="space-y-8">
              {group.terms.map((term) => (
                <div key={term.slug} id={term.slug} className="scroll-mt-16">
                  <dt className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xl font-semibold text-slate-100">
                      {term.name}
                    </span>
                    {term.termCode && term.termCode !== term.name && (
                      <code className="text-sm text-cyan-400 bg-slate-900 px-2 py-0.5 rounded">
                        {term.termCode}
                      </code>
                    )}
                  </dt>
                  <dd className="mt-3 text-slate-300 leading-relaxed max-w-3xl">
                    {term.long}
                  </dd>
                  {(term.seeAlso?.length || term.externalRef) && (
                    <dd className="mt-3 text-sm text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                      {term.seeAlso?.length ? (
                        <span>
                          See also:{' '}
                          {term.seeAlso.map((slug, idx) => {
                            const linked = GLOSSARY_TERM_MAP[slug];
                            if (!linked) return null;
                            return (
                              <span key={slug}>
                                <Link
                                  href={`#${slug}`}
                                  className="text-cyan-400 hover:underline underline-offset-2"
                                >
                                  {linked.name}
                                </Link>
                                {idx < (term.seeAlso!.length - 1) ? ', ' : ''}
                              </span>
                            );
                          })}
                        </span>
                      ) : null}
                      {term.externalRef ? (
                        <a
                          href={term.externalRef.url}
                          target="_blank"
                          rel="noopener"
                          className="text-cyan-400 hover:underline underline-offset-2"
                        >
                          {term.externalRef.label} ↗
                        </a>
                      ) : null}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ))}

        <section aria-labelledby="related-heading" className="mb-16 border-t border-slate-800 pt-10">
          <h2 id="related-heading" className="text-2xl font-semibold mb-4">
            Related
          </h2>
          <ul className="space-y-2 text-slate-300">
            <li>
              →{' '}
              <Link href="/benchmarks" className="text-cyan-400 underline underline-offset-2">
                Benchmarks
              </Link>{' '}
              — where the AUROC and dataset numbers come from.
            </li>
            <li>
              →{' '}
              <Link href="/platform" className="text-cyan-400 underline underline-offset-2">
                Platform
              </Link>{' '}
              — the Co-Pilot components (AgenticEMR, Chemo, Trials, Therapy Fit, Toxicity Risk, Immunotherapy, Pathway).
            </li>
            <li>
              →{' '}
              <Link href="/evidence" className="text-cyan-400 underline underline-offset-2">
                Evidence ledger
              </Link>{' '}
              — how the tiers and badges above are populated per case.
            </li>
          </ul>
        </section>
        <RelatedLinks route="/glossary" />
      </div>
    </main>
  );
}
