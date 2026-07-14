'use client';

/**
 * 5 SL-graded drugs. The anchor therapy is highlighted; drugs flagged
 * `falsified: true` are demoted with a rose overlay.
 *
 * Theme-aware. Mobile-safe (px-4 md:px-8; drug card is a fluid stack).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function RecommendedDrugsPanel() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const anchorName = patient.suggestedTherapy.value;

  const heading   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const sub       = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const anchorHi  = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const pathTag   = isDarkMode ? 'text-white/30' : 'text-zinc-400';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${heading}`}>Recommended SL drugs</h2>
          <p className={`mt-1 text-xs ${sub}`}>
            Anchor therapy: <span className={anchorHi}>{anchorName}</span> · 5 ranked
            confidences from the SL engine. Rucaparib is intentionally listed so the
            falsification arc has visible substrate.
          </p>
        </div>
        <span className={`font-mono text-[10px] ${pathTag}`}>recommended_drugs[]</span>
      </div>

      <div className="grid gap-3">
        {patient.recommendedDrugs.map((d) => {
          const pct = Math.round(d.confidence * 100);
          const anchor = d.drugName === anchorName;
          const falsified = d.falsified === true;
          return <DrugCard
            key={d.drugName}
            drug={d}
            pct={pct}
            anchor={anchor}
            falsified={falsified}
            isDarkMode={isDarkMode}
          />;
        })}
      </div>
    </section>
  );
}

function DrugCard({
  drug: d,
  pct,
  anchor,
  falsified,
  isDarkMode,
}: {
  drug: any;
  pct: number;
  anchor: boolean;
  falsified: boolean;
  isDarkMode: boolean;
}) {
  const cardBg = anchor
    ? isDarkMode
      ? 'border-cyan-400/40 bg-cyan-500/[0.05]'
      : 'border-indigo-300 bg-indigo-50'
    : falsified
      ? isDarkMode
        ? 'border-rose-400/30 bg-rose-500/[0.04]'
        : 'border-rose-200 bg-rose-50'
      : isDarkMode
        ? 'border-white/10 bg-white/[0.02]'
        : 'border-zinc-200 bg-zinc-50';

  const drugName = anchor
    ? isDarkMode ? 'text-cyan-200' : 'text-indigo-700'
    : isDarkMode ? 'text-white' : 'text-zinc-900';

  const targetChip = isDarkMode
    ? 'border-white/10 bg-black/40 text-white/60'
    : 'border-zinc-200 bg-zinc-100 text-zinc-600';

  const anchorChip = isDarkMode
    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200'
    : 'border-indigo-300 bg-indigo-100 text-indigo-800';

  const falsifiedChip = isDarkMode
    ? 'border-rose-400/40 bg-rose-500/10 text-rose-200'
    : 'border-rose-300 bg-rose-100 text-rose-800';

  const path = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const bar = isDarkMode ? 'bg-white/10' : 'bg-zinc-200';
  const barFill = anchor
    ? isDarkMode ? 'bg-cyan-400' : 'bg-indigo-500'
    : falsified
      ? isDarkMode ? 'bg-rose-400' : 'bg-rose-500'
      : isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500';
  const conf = isDarkMode ? 'text-white/85' : 'text-zinc-900';

  const falsBox = isDarkMode
    ? 'border-rose-400/25 bg-rose-500/[0.06] text-rose-100/80'
    : 'border-rose-200 bg-rose-100/60 text-rose-800';

  return (
    <div className={`rounded-lg border p-4 ${cardBg}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className={`text-lg font-semibold ${drugName}`}>{d.drugName}</span>
            <span
              className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${targetChip}`}
            >
              {d.targetPathway}
            </span>
            {anchor && (
              <span
                className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-widest ${anchorChip}`}
              >
                anchor
              </span>
            )}
            {falsified && (
              <span
                className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-widest ${falsifiedChip}`}
              >
                falsified · demote
              </span>
            )}
          </div>
          <div className={`mt-1 font-mono text-[10px] ${path}`}>{d.path}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32">
            <div className={`h-1.5 rounded ${bar}`}>
              <div className={`h-1.5 rounded ${barFill}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className={`font-mono text-sm ${conf}`}>{d.confidence.toFixed(2)}</div>
        </div>
      </div>
      {falsified && d.falsifiedReason && (
        <div className={`mt-3 rounded border p-3 text-[11px] leading-relaxed ${falsBox}`}>
          {d.falsifiedReason}
        </div>
      )}
    </div>
  );
}
