'use client';

/**
 * Top strip of every AK tumor-board surface. Patient identity, contract
 * version, completeness bar, MSI/PD-L1/ER chips, missing-data callout.
 * No log-stream rail — the surface is content-first.
 */
import { usePatient } from '@/context/PatientContext';
export default function AKBundleHeader({ compact = false }: { compact?: boolean }) {
  const patient = usePatient();

  const pct = Math.round(patient.completeness.completenessScore * 100);
  const capPct = Math.round(patient.completeness.confidenceCap * 100);

  return (
    <header className="border-b border-white/10 bg-black/40 py-6">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-8">
        {/* Row 1 — identity */}
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="text-xs uppercase tracking-[0.24em] text-white/40">
              Tumor Board
            </span>
            <h1 className="text-2xl font-semibold text-white">
              Patient {patient.meta.patientId} · L1 bundle
            </h1>
            <span className="rounded border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cyan-300">
              {patient.meta.contractVersion}
            </span>
          </div>
          <div className="font-mono text-[11px] text-white/40">
            {patient.meta.generatedAt} · Levels [
            {patient.meta.requestedLevels.join(', ')}]
          </div>
        </div>

        {!compact && (
          <p className="max-w-3xl text-xs text-white/50">
            {patient.meta.demoDisclaimer}
          </p>
        )}

        {/* Row 2 — completeness + biomarker chips */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.24em] text-white/40">
              <span>Completeness</span>
              <span>Confidence cap {capPct}%</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-white">{pct}%</span>
              <span className="text-xs text-white/50">L1 score</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/10">
              <div
                className="h-full bg-cyan-400/70"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-white/40">
              Missing: {patient.completeness.missing.join(' · ')}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">
              Tumor context
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip
                label="MSI"
                value={patient.tumorContext.msiStatus}
                tone="neutral"
              />
              <Chip
                label="PD-L1"
                value={`${patient.tumorContext.pdL1Status} · CPS ${patient.tumorContext.pdL1Cps}`}
                tone="positive"
              />
              <Chip
                label="ER"
                value={`${patient.tumorContext.erStatus} · ${patient.tumorContext.erPercent}%`}
                tone="neutral"
              />
            </div>
            <div className="mt-3 font-mono text-[10px] text-white/30">
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
}: {
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warn';
}) {
  const styles = {
    positive: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
    neutral: 'border-white/20 bg-white/[0.03] text-white/80',
    warn: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
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
