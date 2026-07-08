'use client';

// ============================================================================
// <GovernanceSurface/> — /governance/ long-form page.
// Sourced entirely from src/data/depth-layer.ts + capability-depth-wiring.ts
// so drift between /governance/ and /engine/ is impossible.
// ============================================================================

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, FileText, Ban, GitCommit } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import {
  GOVERNANCE_GUARDRAILS,
  PUBLIC_MANDATORY_DISCLOSURES,
  PUBLIC_PROHIBITED_CLAIMS,
} from '@/data/depth-layer';
import { CAPABILITY_DEPTH_WIRING } from '@/data/capability-depth-wiring';
import { CAPABILITY_REGISTRY } from '@/data/capability-registry';

const guardrailIcon: Record<string, typeof Lock> = {
  'ranker-version-lock': Lock,
  'ranker-variant-prohibition': Ban,
  'admissibility-policy': FileText,
  'forbidden-string-audit': ShieldCheck,
  'reproducibility-lock': GitCommit,
};

export default function GovernanceSurface() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const surface = isDark ? 'bg-black text-white' : 'bg-[#FAF9F3] text-black';
  const muted = isDark ? 'text-white/70' : 'text-black/70';
  const border = isDark ? 'border-white/10' : 'border-black/10';
  const chip = isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-black/5 border-black/10 text-black/70';
  const accent = isDark ? 'border-[#E9ED4C]/40 bg-[#E9ED4C]/5' : 'border-[#75A025]/40 bg-[#75A025]/5';

  return (
    <div className={`min-h-screen ${surface}`}>
      <ZetaNavbar />

      {/* Header */}
      <header className={`border-b ${border}`}>
        <div className="mx-auto max-w-4xl px-6 pt-10 pb-8">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${chip}`}>
            <ShieldCheck className="h-3 w-3" /> Governance
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            The commitments that back every capability output.
          </h1>
          <p className={`mt-3 text-lg ${muted}`}>
            Five operational guardrails, two mandatory disclosures, four prohibited claims. Every capability on the platform inherits this substrate — the substrate is not a marketing statement, it is a set of hard rules the release process enforces.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">

        {/* Section 1: Guardrails */}
        <section id="guardrails">
          <div className="mb-6">
            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Section 1</div>
            <h2 className="mt-2 text-3xl font-normal tracking-tight">Operational guardrails</h2>
            <p className={`mt-2 text-sm ${muted}`}>
              Every capability output inherits every guardrail listed here. A capability that cannot meet a guardrail is not admissible on the platform.
            </p>
          </div>
          <ol className="space-y-4">
            {GOVERNANCE_GUARDRAILS.map((g) => {
              const Icon = guardrailIcon[g.slug] ?? ShieldCheck;
              return (
                <li key={g.slug} id={g.slug} className={`rounded-xl border ${border} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-none rounded-lg border ${border} p-2`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-normal tracking-tight">{g.name}</h3>
                      <div className="mt-3 space-y-3 text-sm">
                        <div>
                          <div className={`text-[10px] uppercase tracking-widest ${muted}`}>What it locks</div>
                          <p className={`mt-1 leading-relaxed ${muted}`}>{g.whatItLocks}</p>
                        </div>
                        <div>
                          <div className={`text-[10px] uppercase tracking-widest ${muted}`}>What we tell partners</div>
                          <p className={`mt-1 leading-relaxed ${muted}`}>{g.publicDisclosure}</p>
                        </div>
                        <div>
                          <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Receipt location</div>
                          <p className={`mt-1 leading-relaxed font-mono text-xs ${muted}`}>{g.receiptLocation}</p>
                        </div>
                        <div>
                          <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Applies to</div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {g.appliesToCapabilities.map((slug) => {
                              const cap = CAPABILITY_REGISTRY.find((c) => c.slug === slug);
                              if (!cap) return null;
                              return (
                                <Link
                                  key={slug}
                                  href={`/engine/#${slug}`}
                                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest hover:opacity-90 ${chip}`}
                                >
                                  {cap.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Section 2: Mandatory disclosures */}
        <section id="disclosures">
          <div className="mb-6">
            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Section 2</div>
            <h2 className="mt-2 text-3xl font-normal tracking-tight">Mandatory disclosures</h2>
            <p className={`mt-2 text-sm ${muted}`}>
              Statements the platform surfaces alongside every output that could be misread as a stronger claim than it is.
            </p>
          </div>
          <ul className="space-y-4">
            {PUBLIC_MANDATORY_DISCLOSURES.map((d, i) => (
              <li key={i} className={`rounded-xl border p-5 ${accent}`}>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Disclosure {i + 1}</div>
                <p className="mt-2 text-sm leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Prohibited claims */}
        <section id="prohibited">
          <div className="mb-6">
            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Section 3</div>
            <h2 className="mt-2 text-3xl font-normal tracking-tight">Prohibited claims</h2>
            <p className={`mt-2 text-sm ${muted}`}>
              Claims the platform will never make. Publishing this list is part of the discipline: the commitments are as important as the capabilities.
            </p>
          </div>
          <ul className="space-y-3">
            {PUBLIC_PROHIBITED_CLAIMS.map((c, i) => (
              <li key={i} className={`rounded-xl border ${border} p-4 flex items-start gap-3`}>
                <Ban className={`h-4 w-4 flex-none mt-1 ${muted}`} />
                <p className="text-sm leading-relaxed">{c}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Per-capability governance map */}
        <section id="per-capability">
          <div className="mb-6">
            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Section 4</div>
            <h2 className="mt-2 text-3xl font-normal tracking-tight">Per-capability governance map</h2>
            <p className={`mt-2 text-sm ${muted}`}>
              Every capability is validated against the guardrails listed here. The map is the wiring between the capability catalogue and the governance substrate — a capability without a wiring entry cannot ship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAPABILITY_DEPTH_WIRING.map((w) => {
              const cap = CAPABILITY_REGISTRY.find((c) => c.slug === w.capabilitySlug);
              if (!cap) return null;
              return (
                <Link
                  key={w.capabilitySlug}
                  href={`/engine/#${w.capabilitySlug}`}
                  className={`group rounded-xl border ${border} p-5 hover:opacity-95`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-normal tracking-tight">{cap.name}</h3>
                      <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
                        {w.headlineGovernanceSentence}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {w.governanceGuardrails.map((slug) => {
                          const g = GOVERNANCE_GUARDRAILS.find((x) => x.slug === slug);
                          if (!g) return null;
                          return (
                            <span key={slug} className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${chip}`}>
                              {g.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 flex-none mt-1 ${muted} group-hover:translate-x-0.5 transition`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom cross-links */}
        <section className={`rounded-xl border ${border} p-6`}>
          <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Related</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/engine/" className={`rounded-lg border ${border} p-4 hover:opacity-95`}>
              <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Engine</div>
              <div className="mt-1 text-sm">Product capabilities</div>
            </Link>
            <Link href="/research/chapters/" className={`rounded-lg border ${border} p-4 hover:opacity-95`}>
              <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Research</div>
              <div className="mt-1 text-sm">Nine chapters</div>
            </Link>
            <Link href="/ledger/" className={`rounded-lg border ${border} p-4 hover:opacity-95`}>
              <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Ledger</div>
              <div className="mt-1 text-sm">Decoded programs</div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
