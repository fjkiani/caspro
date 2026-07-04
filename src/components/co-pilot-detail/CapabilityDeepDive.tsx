import React from 'react';
import Link from 'next/link';

/**
 * Shared page-generator for the 7 platform capability co-pilot pages.
 * All 7 /platform/{slug}/page.tsx render this component with their content object.
 *
 * IMPORTANT — illustrative outcome semantics:
 *   - Every outcome carries an `illustrative` flag.
 *   - Any outcome with `illustrative: true` is an INTERNAL TARGET, not a
 *     measured or peer-reviewed result. The component renders an amber badge
 *     on each such outcome + a section-level warning banner explaining what
 *     the numbers actually mean, plus a disclosure paragraph linking to
 *     /evidence and /metrics for measured numbers.
 *   - Do NOT quietly remove the badge or flip `illustrative` to false.
 *     If you have a measured source, cite it in the note and link out.
 */

export interface CapabilityDeepDiveContent {
  slug: string;
  title: string;
  tagline: string;
  audience: string;
  intro: string;
  howItWorks: { heading: string; body: string }[];
  outcomes: {
    metric: string;
    value: string;
    note?: string;
    illustrative?: boolean;
  }[];
  useCases: { headline: string; body: string }[];
  faq: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string; blurb: string }[];
  ctaLabel: string;
  ctaHref: string;
  featureList: string[];
}

export default function CapabilityDeepDive({
  content,
}: {
  content: CapabilityDeepDiveContent;
}) {
  const hasIllustrativeOutcomes = content.outcomes.some((o) => o.illustrative);

  return (
    <article className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-16 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-slate-800 underline underline-offset-2">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/platform" className="hover:text-slate-800 underline underline-offset-2">
                Platform
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-slate-700">
              {content.title.split(':')[0]}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-12 border-b border-slate-200 pb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
            {content.audience}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {content.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">{content.tagline}</p>
        </header>

        {/* Intro */}
        <section className="mb-12">
          <p className="text-lg text-slate-700 leading-relaxed">{content.intro}</p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How it works</h2>
          <div className="space-y-8">
            {content.howItWorks.map((step) => (
              <div key={step.heading} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.heading}
                </h3>
                <p className="text-slate-700 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes / metrics */}
        <section className="mb-14 bg-slate-900 text-slate-100 rounded-2xl p-8 md:p-12">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
            <h2 className="text-3xl font-bold">What we measure</h2>
            {hasIllustrativeOutcomes ? (
              <span
                className="inline-flex items-center gap-2 rounded bg-amber-300/10 border border-amber-300/50 px-3 py-1 text-xs uppercase tracking-widest text-amber-300"
                aria-label="Illustrative targets, not measured results"
              >
                <span aria-hidden>⚠</span>
                Illustrative targets
              </span>
            ) : null}
          </div>

          {hasIllustrativeOutcomes ? (
            <div
              role="note"
              className="mb-8 rounded-lg border border-amber-300/40 bg-amber-300/5 p-4 text-sm text-amber-200"
            >
              <p>
                The numbers below are internal <strong>targets</strong>, not measured
                or peer-reviewed results. Measured numbers with sample sizes and datasets
                live on{' '}
                <Link href="/benchmarks" className="underline underline-offset-2">
                  /benchmarks
                </Link>{' '}
                and in the evidence ledger at{' '}
                <Link href="/evidence" className="underline underline-offset-2">
                  /evidence
                </Link>
                .
              </p>
            </div>
          ) : null}

          <div className="grid md:grid-cols-3 gap-6">
            {content.outcomes.map((o) => (
              <div
                key={o.metric}
                className={`rounded-lg p-5 ${
                  o.illustrative
                    ? 'bg-slate-800/60 border border-amber-300/40'
                    : 'bg-slate-800/60'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <p className="text-sm uppercase tracking-widest text-blue-300">
                    {o.metric}
                  </p>
                  {o.illustrative ? (
                    <span
                      className="rounded bg-amber-300/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-300"
                      aria-label="Illustrative target"
                    >
                      Illustrative
                    </span>
                  ) : null}
                </div>
                <p className="text-2xl font-bold text-white mb-1">{o.value}</p>
                {o.note ? (
                  <p className="text-xs text-slate-400">{o.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Where it fits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.useCases.map((u) => (
              <div key={u.headline}>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {u.headline}
                </h3>
                <p className="text-slate-700 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently asked</h2>
          <dl className="space-y-6">
            {content.faq.map((f) => (
              <div
                key={f.question}
                className="border-b border-slate-200 pb-6 last:border-b-0"
              >
                <dt className="text-lg font-semibold text-slate-900 mb-2">
                  {f.question}
                </dt>
                <dd className="text-slate-700 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related capabilities */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Related capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.relatedLinks.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="block bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition"
              >
                <p className="text-base font-semibold text-slate-900 mb-2">
                  {r.label}
                </p>
                <p className="text-sm text-slate-600">{r.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclosure line — final footer of the article */}
        {hasIllustrativeOutcomes ? (
          <p className="mb-10 text-xs text-slate-500 border-t border-slate-200 pt-6 leading-relaxed">
            Outcome targets on this page are marked with an{' '}
            <span className="text-amber-600 font-semibold">Illustrative</span> badge
            when they describe an internal goal rather than a measured, peer-reviewed
            result. The measured Oracle numbers — ClinVar (95.7% AUROC, n=53,210),
            SpliceVarDB (82.5–82.6%, n=4,950), BRCA1 zero-shot (89.1%), and the
            1,000-patient clinical validation cohort — live on{' '}
            <Link href="/benchmarks" className="underline underline-offset-2">
              /benchmarks
            </Link>{' '}
            and in the evidence ledger at{' '}
            <Link href="/evidence" className="underline underline-offset-2">
              /evidence
            </Link>
            .
          </p>
        ) : null}

        {/* CTA */}
        <section className="text-center bg-blue-600 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Ready to see it live?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Book a demo. We&apos;ll walk you through {content.title.split(':')[0]}{' '}
            against your own case.
          </p>
          <Link
            href={content.ctaHref}
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            {content.ctaLabel}
          </Link>
        </section>
      </div>
    </article>
  );
}
