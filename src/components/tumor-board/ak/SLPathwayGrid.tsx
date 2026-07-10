'use client';

import { usePatient } from '@/context/PatientContext';
/**
 * SL pathway grid — 2 columns of substrate:
 *  left  = broken pathways (BER, CHECKPOINT, UNKNOWN) with disruption scores
 *  right = essential backups (ATR, WEE1, HR, PARP) with lineage grounding
 */
export default function SLPathwayGrid() {
  const patient = usePatient();

  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">SL pathway map</h2>
          <p className="mt-1 text-xs text-white/50">
            Detection <span className="text-emerald-300">DETECTED</span> · {patient.doubleHit.description} · method{' '}
            <span className="font-mono text-white/70">{patient.slProvenance.detectionMethod}</span>
          </p>
        </div>
        <span className="font-mono text-[10px] text-white/30">
          synthetic_lethality.broken_pathways[] · essential_pathways[]
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Column
          title="Broken pathways"
          subtitle="Double-hit + secondary damage"
          tone="danger"
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
  rows,
}: {
  title: string;
  subtitle: string;
  tone: 'danger' | 'opportunity';
  rows: { id: string; head: string; tag: string; sub: string; path: string }[];
}) {
  const border = tone === 'danger' ? 'border-rose-400/30' : 'border-emerald-400/30';
  const tagStyle =
    tone === 'danger'
      ? 'border-rose-400/40 bg-rose-500/10 text-rose-200'
      : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200';
  return (
    <div className={`rounded-lg border ${border} bg-white/[0.02] p-4`}>
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">{title}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded border border-white/10 bg-black/30 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-sm text-white">{r.head}</span>
              <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${tagStyle}`}>
                {r.tag}
              </span>
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-white/70">{r.sub}</div>
            <div className="mt-1 font-mono text-[9px] text-white/30">{r.path}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
