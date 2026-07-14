'use client';

/**
 * Top strip of every AK tumor-board surface. Patient identity, contract
 * version, completeness bar, MSI/PD-L1/ER chips, missing-data callout.
 * No log-stream rail — the surface is content-first.
 *
 * Theme-aware (dark tokens preserved; light tokens use zinc/indigo).
 * Mobile-safe (px-4 → md:px-8, chips stay wrap-safe).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function AKBundleHeader({ compact = false }: { compact?: boolean }) {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const pct = Math.round(patient.completeness.completenessScore * 100);
  const capPct = Math.round(patient.completeness.confidenceCap * 100);

  // Color tokens
  const shell = isDarkMode
    ? 'border-b border-white/10 bg-black/40'
    : 'border-b border-zinc-200 bg-white';
  const eyebrow = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const title   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const versionChip = isDarkMode
    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
    : 'border-indigo-300 bg-indigo-50 text-indigo-700';
  const mono    = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const disclaimer = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const card    = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-zinc-50';
  const cardLabel = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const cardStat  = isDarkMode ? 'text-white' : 'text-zinc-900';
  const cardSub   = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const bar       = isDarkMode ? 'bg-white/10' : 'bg-zinc-200';
  const barFill   = isDarkMode ? 'bg-cyan-400/70' : 'bg-indigo-500';
  const missing   = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const pathText  = isDarkMode ? 'text-white/30' : 'text-zinc-400';

  return (
    <header className={`py-6 ${shell}`}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 md:px-8">
        {/* Row 1 — identity */}
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-4">
            <span className={`text-xs uppercase tracking-[0.24em] ${eyebrow}`}>
              Tumor Board
            </span>
            <h1 className={`text-xl md:text-2xl font-semibold ${title}`}>
              Patient {patient.meta.patientId} · L1 bundle
            </h1>
            <span
              className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${versionChip}`}
            >
              {patient.meta.contractVersion}
            </span>
          </div>
          <div className={`font-mono text-[11px] ${mono}`}>
            {patient.meta.generatedAt} · Levels [
            {patient.meta.requestedLevels.join(', ')}]
          </div>
        </div>

        {!compact && patient.meta.demoDisclaimer && (
          <p className={`max-w-3xl text-xs ${disclaimer}`}>
            {patient.meta.demoDisclaimer}
          </p>
        )}

        {/* Row 2 — completeness + biomarker chips */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className={`rounded-lg border p-4 ${card}`}>
            <div
              className={`flex items-baseline justify-between text-[10px] uppercase tracking-[0.24em] ${cardLabel}`}
            >
              <span>Completeness</span>
              <span>Confidence cap {capPct}%</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-3xl font-semibold ${cardStat}`}>{pct}%</span>
              <span className={`text-xs ${cardSub}`}>L1 score</span>
            </div>
            <div className={`mt-2 h-1.5 overflow-hidden rounded ${bar}`}>
              <div className={`h-full ${barFill}`} style={{ width: `${pct}%` }} />
            </div>
            <div className={`mt-2 text-[11px] ${missing}`}>
              Missing: {patient.completeness.missing.join(' · ')}
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${card}`}>
            <div className={`text-[10px] uppercase tracking-[0.24em] ${cardLabel}`}>
              Tumor context
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip
                label="MSI"
                value={patient.tumorContext.msiStatus}
                tone="neutral"
                isDarkMode={isDarkMode}
              />
              <Chip
                label="PD-L1"
                value={`${patient.tumorContext.pdL1Status} · CPS ${patient.tumorContext.pdL1Cps}`}
                tone="positive"
                isDarkMode={isDarkMode}
              />
              <Chip
                label="ER"
                value={`${patient.tumorContext.erStatus} · ${patient.tumorContext.erPercent}%`}
                tone="neutral"
                isDarkMode={isDarkMode}
              />
            </div>
            <div className={`mt-3 font-mono text-[10px] ${pathText}`}>
              {patient.tumorContext.path}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Chip({
  label,
  value,
  tone,
  isDarkMode,
}: {
  label: string;
  value: string | undefined;
  tone: 'positive' | 'neutral' | 'warn';
  isDarkMode: boolean;
}) {
  const styles = isDarkMode
    ? {
        positive: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
        neutral: 'border-white/20 bg-white/[0.03] text-white/80',
        warn: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
      }[tone]
    : {
        positive: 'border-emerald-300 bg-emerald-50 text-emerald-800',
        neutral: 'border-zinc-300 bg-zinc-100 text-zinc-800',
        warn: 'border-amber-300 bg-amber-100 text-amber-800',
      }[tone];
  return (
    <div className={`rounded border px-3 py-1.5 ${styles}`}>
      <div className="text-[10px] uppercase tracking-widest opacity-60">
        {label}
      </div>
      <div className="mt-0.5 text-xs font-medium">{value}</div>
    </div>
  );
}
