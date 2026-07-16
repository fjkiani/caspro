'use client';

/**
 * SL pathway grid — 2 columns of substrate:
 *  left  = broken pathways (BER, CHECKPOINT, UNKNOWN) with disruption scores
 *  right = essential backups (ATR, WEE1, HR, PARP) with lineage grounding
 *
 * Theme-aware (dark tokens preserved; light tokens use zinc/rose/emerald)
 * Mobile-safe (px-4 → md:px-8, grid stays 1-col below md).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function SLPathwayGrid() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const heading   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const sub       = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const detected  = isDarkMode ? 'text-emerald-300' : 'text-emerald-700';
  const monoLabel = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const pathTag   = isDarkMode ? 'text-white/30' : 'text-zinc-400';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${heading}`}>SL pathway map</h2>
          <p className={`mt-1 text-xs ${sub}`}>
            Detection <span className={detected}>DETECTED</span> ·{' '}
            {patient.doubleHit?.description ?? 'no double-hit detected'} · method{' '}
            <span className={`font-mono ${monoLabel}`}>
              {patient.slProvenance.detectionMethod}
            </span>
          </p>
        </div>
        <span className={`font-mono text-[10px] ${pathTag}`}>
          synthetic_lethality.broken_pathways[] · essential_pathways[]
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Column
          title="Broken pathways"
          subtitle="Double-hit + secondary damage"
          tone="danger"
          isDarkMode={isDarkMode}
          rows={patient.brokenPathways.map((p) => ({
            id: p.pathwayId,
            head: p.pathwayId,
            tag: p.status,
            sub: `${p.genesAffected.join(', ')} · disruption ${p.disruptionScore.toFixed(3)}`,
            path: p.path,
          }))}
        />
        <Column
          title="Essential backup dependencies"
          subtitle="Where the tumor must lean when BER + checkpoint fail"
          tone="opportunity"
          isDarkMode={isDarkMode}
          rows={patient.essentialPathways.map((p) => ({
            id: p.pathwayId,
            head: p.pathwayId,
            tag: `disruption ${p.disruptionScore.toFixed(2)}`,
            sub: p.description,
            path: p.path,
          }))}
        />
      </div>
    </section>
  );
}

function Column({
  title,
  subtitle,
  tone,
  isDarkMode,
  rows,
}: {
  title: string;
  subtitle: string;
  tone: 'danger' | 'opportunity';
  isDarkMode: boolean;
  rows: { id: string; head: string; tag: string; sub: string; path: string }[];
}) {
  const border = isDarkMode
    ? tone === 'danger' ? 'border-rose-400/30' : 'border-emerald-400/30'
    : tone === 'danger' ? 'border-rose-200' : 'border-emerald-200';
  const wrapBg = isDarkMode
    ? 'bg-white/[0.02]'
    : tone === 'danger' ? 'bg-rose-50' : 'bg-emerald-50';
  const tagStyle = isDarkMode
    ? tone === 'danger'
      ? 'border-rose-400/40 bg-rose-500/10 text-rose-200'
      : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
    : tone === 'danger'
      ? 'border-rose-300 bg-rose-100 text-rose-800'
      : 'border-emerald-300 bg-emerald-100 text-emerald-800';
  const headLabel = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const subLabel  = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const rowBox    = isDarkMode
    ? 'border-white/10 bg-black/30'
    : 'border-zinc-200 bg-white';
  const rowHead   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const rowBody   = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const rowPath   = isDarkMode ? 'text-white/30' : 'text-zinc-400';

  return (
    <div className={`rounded-lg border ${border} ${wrapBg} p-4`}>
      <div className="mb-3">
        <div className={`text-[10px] uppercase tracking-[0.24em] ${headLabel}`}>
          {title}
        </div>
        <div className={`text-xs ${subLabel}`}>{subtitle}</div>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className={`rounded border p-3 ${rowBox}`}>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`font-mono text-sm ${rowHead}`}>{r.head}</span>
              <span
                className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${tagStyle}`}
              >
                {r.tag}
              </span>
            </div>
            <div className={`mt-1 text-[12px] leading-relaxed ${rowBody}`}>{r.sub}</div>
            <div className={`mt-1 font-mono text-[9px] ${rowPath}`}>{r.path}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
