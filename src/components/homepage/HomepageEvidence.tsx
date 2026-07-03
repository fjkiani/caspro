import Link from 'next/link';
import { unifiedEvidenceData } from '@/data/evidence/unified-evidence-data';

/**
 * Validated-by-evidence section. Pulls the top three hero metrics from
 * `unifiedEvidenceData` so the numbers shown on the homepage are the same
 * numbers the evidence ledger publishes — no two-source-of-truth drift.
 */

export default function HomepageEvidence() {
  const metrics = unifiedEvidenceData.hero.keyMetrics.slice(0, 3);

  return (
    <section
      aria-labelledby="homepage-evidence-heading"
      className="bg-[#0A0A0F] border-t border-zinc-800/60 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
            Validated by evidence
          </p>
          <h2
            id="homepage-evidence-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Receipts, not promises.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Every CrisPRO.ai claim is backed by a versioned dataset, a sample
            size, and a publishable receipt. Three of the headline numbers
            we&apos;ve built the platform around:
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                {m.dataset}
              </p>
              <p className="mt-3 text-4xl font-black tabular-nums text-white">
                {m.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">
                {m.label}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                {m.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                n = {m.sampleSize.toLocaleString()} · {m.tier} · {m.badge}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/manuscripts/"
            className="inline-flex items-center gap-2 rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
          >
            Read the manuscripts
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/evidence/csi-validation/"
            className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
          >
            CSI validation receipts
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
