'use client';

/**
 * Why AK's completeness ceiling is 0.55 — discrete tests missing, confidence
 * capped. Numeric relationship is spelled out so the reviewer sees the same
 * rule the engine uses.
 *
 * Theme-aware. Mobile-safe (grid stacks to 1-col below md).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function MissingTestsPanel() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const compPct = Math.round(patient.completeness.completenessScore * 100);
  const capPct = Math.round(patient.completeness.confidenceCap * 100);

  const heading = isDarkMode ? 'text-white' : 'text-zinc-900';
  const sub     = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const pathTag = isDarkMode ? 'text-white/30' : 'text-zinc-400';

  const amberCard = isDarkMode
    ? 'border-amber-400/25 bg-amber-500/[0.05]'
    : 'border-amber-300 bg-amber-50';
  const amberEyebrow = isDarkMode ? 'text-amber-300' : 'text-amber-700';
  const testCard = isDarkMode
    ? 'border-white/10 bg-black/25'
    : 'border-zinc-200 bg-white';
  const testName = isDarkMode ? 'text-white' : 'text-zinc-900';
  const testWhy  = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const testUnlocks = isDarkMode ? 'text-white/70' : 'text-zinc-700';

  const unlocksChip = isDarkMode
    ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
    : 'border-amber-300 bg-amber-100 text-amber-800';

  const ledgerCard = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-zinc-50';
  const ledgerLabel = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const ledgerBar = isDarkMode ? 'bg-white/10' : 'bg-zinc-200';
  const ledgerPct = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const ledgerBody = isDarkMode ? 'text-white/55' : 'text-zinc-600';
  const capHi = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${heading}`}>Missing tests · confidence cap</h2>
          <p className={`mt-1 text-xs ${sub}`}>
            Tests unrecorded → completeness {compPct}% → confidence cap {capPct}%.
            Anchor SL still ships; cap is a trust ceiling, not a filter.
          </p>
        </div>
        <span className={`font-mono text-[10px] ${pathTag}`}>
          completeness.missing_tests[] · completeness.confidence_cap
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={`rounded-lg border p-4 md:col-span-2 ${amberCard}`}>
          <div className={`text-[10px] uppercase tracking-widest ${amberEyebrow}`}>
            Requested next
          </div>
          <ul className="mt-3 space-y-2">
            {patient.testsNeeded.map((t, i) => (
              <li key={i} className={`rounded border p-3 ${testCard}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-mono text-sm ${testName}`}>{t.test}</span>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${unlocksChip}`}
                  >
                    unlocks
                  </span>
                </div>
                <div className={`mt-1 text-xs ${testUnlocks}`}>{t.unlocks}</div>
                <div className={`mt-1 text-[11px] ${testWhy}`}>{t.why}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`rounded-lg border p-4 ${ledgerCard}`}>
          <div className={`text-[10px] uppercase tracking-widest ${ledgerLabel}`}>
            Confidence ledger
          </div>
          <div className="mt-3">
            <div className={`text-[10px] uppercase tracking-widest ${ledgerLabel}`}>
              Completeness
            </div>
            <div className={`mt-1 h-1.5 rounded ${ledgerBar}`}>
              <div className="h-1.5 rounded bg-amber-400" style={{ width: `${compPct}%` }} />
            </div>
            <div className={`mt-1 font-mono text-xs ${ledgerPct}`}>{compPct}%</div>
          </div>
          <div className="mt-4">
            <div className={`text-[10px] uppercase tracking-widest ${ledgerLabel}`}>
              Confidence cap
            </div>
            <div className={`mt-1 h-1.5 rounded ${ledgerBar}`}>
              <div
                className={`h-1.5 rounded ${isDarkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`}
                style={{ width: `${capPct}%` }}
              />
            </div>
            <div className={`mt-1 font-mono text-xs ${ledgerPct}`}>{capPct}%</div>
          </div>
          <p className={`mt-4 text-[11px] leading-relaxed ${ledgerBody}`}>
            Rule: any drug scoring above the cap is truncated in UI to the cap. Ceralasertib
            at 0.85 shows as <span className={capHi}>0.60</span> until HRD + TMB + RNA-seq
            land.
          </p>
        </div>
      </div>
    </section>
  );
}
