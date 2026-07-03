import Link from 'next/link';

/**
 * Three-pillar overview: Oracle (interpret), Forge (design), Scribe (narrate).
 * Static, server-rendered, no client deps — content-first SEO surface for
 * the homepage. Replaces the previous pure-visual hero slider as the
 * primary indexable content.
 */

interface Pillar {
  name: string;
  tagline: string;
  description: string;
  href: string;
}

const PILLARS: Pillar[] = [
  {
    name: 'Oracle',
    tagline: 'Resolve genetic uncertainty.',
    description:
      'Variant interpretation and clinical-intent inference. Resolve VUS noise with 95.7% AUROC against the ClinVar validation set (n = 53,210), so clinicians and researchers see the evidence behind every call.',
    href: '/platform/oracle-intelligence/',
  },
  {
    name: 'Forge',
    tagline: 'Design therapeutics in silico.',
    description:
      'Generative target engagement and mechanism alignment. Score candidate molecules against binding pockets, selectivity profiles, and 8D mechanism vectors before a single in-vivo cycle.',
    href: '/platform/forge-intelligence/',
  },
  {
    name: 'Scribe',
    tagline: 'Turn evidence into narrative.',
    description:
      'Auditable, citable clinical narratives. Every claim is traced to the underlying receipt — ready for the chart, the IRB submission, or the trial report.',
    href: '/platform/scribe-intelligence/',
  },
];

export default function HomepagePillars() {
  return (
    <section
      aria-labelledby="homepage-pillars-heading"
      className="bg-[#0A0A0F] border-t border-zinc-800/60 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400">
            Three intelligences. One platform.
          </p>
          <h2
            id="homepage-pillars-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Oracle, Forge, and Scribe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            CrisPRO.ai pairs three specialized intelligences to take a cancer
            problem from raw variant data to a defensible clinical decision.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.name}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-cyan-500/40 hover:bg-zinc-900/70"
            >
              <h3 className="text-xl font-bold text-white">{pillar.name}</h3>
              <p className="mt-1 text-sm font-medium text-cyan-300">{pillar.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {pillar.description}
              </p>
              <Link
                href={pillar.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 transition group-hover:text-cyan-300"
              >
                Explore {pillar.name}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
