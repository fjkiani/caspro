import Link from 'next/link';
import { ENGINE_REGISTRY } from '@/data/engine-registry';

/**
 * Server-rendered engines grid for the homepage. Uses the existing engine
 * registry (single source of truth) and shows every `active` engine with a
 * canonical link.
 *
 * Crawl benefit: previously the homepage had zero links to /engine/*. This
 * surfaces every engine landing page at depth 1 from the root.
 */

export default function HomepageEngines() {
  const engines = ENGINE_REGISTRY.filter((e) => e.active);

  return (
    <section
      aria-labelledby="homepage-engines-heading"
      className="bg-[#06070C] border-t border-zinc-800/60 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-400">
            The engines
          </p>
          <h2
            id="homepage-engines-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Specialized engines for every step of the cancer kill chain
          </h2>
          <p className="mt-4 max-w-2xl text-base text-zinc-400">
            Each engine has a single job. Together they lock targets, align
            mechanism, manage safety, and verify outcomes — the way an
            oncologist already reasons, just deterministic and at scale.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {engines.map((engine) => (
            <li
              key={engine.slug}
              className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-amber-500/40 hover:bg-zinc-900/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                  {engine.layer} · {engine.id}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  {engine.status}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-white">
                <Link href={engine.route} className="hover:text-amber-300">
                  {engine.label}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {engine.desc}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                {engine.keyMetric}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/engine/"
            className="inline-flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-amber-300 transition hover:bg-amber-500 hover:text-black"
          >
            See the full engine stack
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
