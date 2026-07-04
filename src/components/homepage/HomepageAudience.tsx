import Link from 'next/link';

/**
 * Audience routing surface: four industry tiles giving every visitor a
 * one-click path to the page that speaks their language. Static, server-
 * rendered, deep-links into `/industries/*` (which are already in the
 * sitemap). Helps depth-1 internal link velocity to those clusters.
 */

interface AudienceTile {
  audience: string;
  headline: string;
  problem: string;
  href: string;
}

const TILES: AudienceTile[] = [
  {
    audience: 'Biotech R&D',
    headline: 'Triage your pipeline before the bench.',
    problem:
      'Score targets, mechanisms, and resistance liabilities in silico — keep only the candidates that survive a mechanism-aligned audit.',
    href: '/industries/biotech/',
  },
  {
    audience: 'Genetic testing labs',
    headline: 'Resolve VUS with publishable receipts.',
    problem:
      'Plug Oracle into your variant interpretation workflow and cut VUS backlog without changing your LIMS or your sign-out path.',
    href: '/industries/genetic-testing/',
  },
  {
    audience: 'Health systems',
    headline: 'Give every oncologist a co-pilot.',
    problem:
      'Patient-specific mechanism reasoning at the point of decision, with full audit trails from raw VCF to chart-ready narrative.',
    href: '/industries/healthcare/',
  },
  {
    audience: 'Academic research',
    headline: 'Run mechanism-aligned hypothesis tests at scale.',
    problem:
      'Variant-to-mechanism inference across whole cohorts. Reproducible, citable, and ready for the manuscript appendix.',
    href: '/industries/research/',
  },
];

export default function HomepageAudience() {
  return (
    <section
      aria-labelledby="homepage-audience-heading"
      className="bg-[#06070C] border-t border-zinc-800/60 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fuchsia-400">
            Who CrisPRO.ai is for
          </p>
          <h2
            id="homepage-audience-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Built for the teams that actually move cancer care forward.
          </h2>
        </header>

        <ul className="grid gap-5 md:grid-cols-2">
          {TILES.map((tile) => (
            <li
              key={tile.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-fuchsia-500/40 hover:bg-zinc-900/70"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-400">
                {tile.audience}
              </p>
              <h3 className="mt-3 text-xl font-bold text-white">
                <Link href={tile.href} className="hover:text-fuchsia-300">
                  {tile.headline}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {tile.problem}
              </p>
              <Link
                href={tile.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300"
              >
                Industry guide
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
