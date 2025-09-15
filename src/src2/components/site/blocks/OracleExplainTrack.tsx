import React from 'react';

export type SAEFeatureSpan = { name: string; start: number; end: number; score?: number };
export type DeltaLLPoint = { pos: number; delta: number };

type Props = {
  sequence: string;
  variant: { pos: number; ref: string; alt: string };
  saeFeatures: SAEFeatureSpan[];
  deltaLLSeries: DeltaLLPoint[];
  className?: string;
};

const barWidth = 2;

const OracleExplainTrack: React.FC<Props> = ({ sequence, variant, saeFeatures, deltaLLSeries, className }) => {
  const length = sequence.length;
  const bars = Array.from({ length }, (_, i) => ({ x: i }));

  return (
    <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
      <div className="mb-2 text-sm text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <span>Oracle Explain</span>
        <span className="font-mono text-xs">variant: {`${variant.ref}${variant.pos}>${variant.alt}`}</span>
      </div>
      <div className="h-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 rounded">
        {bars.map(b => (
          <div key={b.x} className="absolute bottom-0" style={{ left: b.x * barWidth, width: barWidth, height: 2, background: '#334155' }} />
        ))}
        {saeFeatures.map((f, i) => (
          <div key={i} className="absolute top-0 h-6 rounded-sm opacity-70"
               style={{ left: f.start * barWidth, width: Math.max(2, (f.end - f.start + 1) * barWidth), background: '#06b6d4' }}
               title={`${f.name} (${f.start}-${f.end})`} />
        ))}
        <div className="absolute top-0 bottom-0" style={{ left: variant.pos * barWidth, width: barWidth, background: '#ef4444', opacity: 0.7 }} />
      </div>
      <div className="mt-3 h-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 rounded">
        {deltaLLSeries.map((p, i) => (
          <div key={i} className="absolute bottom-0 bg-emerald-500/70" style={{ left: p.pos * barWidth, width: barWidth, height: Math.min(90, Math.abs(p.delta) * 10) }} />
        ))}
        <div className="absolute top-0 bottom-0" style={{ left: variant.pos * barWidth, width: barWidth, background: '#ef4444', opacity: 0.7 }} />
      </div>
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Top ribbon = learned features (exon/intron/TF). Bottom chart = Δ likelihood around the variant.</div>
    </div>
  );
};

export default OracleExplainTrack; 