'use client';

import React from 'react';

type Props = { 
  function: number; 
  stability?: number; 
  foldingImpact?: number; 
  notes?: string; 
  className?: string; 
  title?: string;
};

const badge = (v?: number) => {
  if (typeof v !== 'number') return null;
  const up = v >= 0;
  return <span className={`ml-2 text-xs ${up ? 'text-emerald-400' : 'text-red-400'}`}>{up ? '▲' : '▼'} {Math.abs(v).toFixed(2)}</span>;
};

const ProteinDeltaCard: React.FC<Props> = ({ function: func, stability, foldingImpact, notes, className, title = 'Protein functional change' }) => (
  <div className={`w-full rounded-xl border border-slate-700 p-4 bg-slate-800 ${className || ''}`}>
    <div className="mb-2 text-sm font-semibold text-slate-100">{title}</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-3 rounded border border-slate-700 bg-slate-900/50">
        <div className="text-xs text-slate-400">Function</div>
        <div className="font-mono text-slate-100">{func.toFixed(3)}{badge(func)}</div>
      </div>
      <div className="p-3 rounded border border-slate-700 bg-slate-900/50">
        <div className="text-xs text-slate-400">Stability</div>
        <div className="font-mono text-slate-100">{typeof stability === 'number' ? stability.toFixed(3) : '—'}{badge(stability)}</div>
      </div>
      <div className="p-3 rounded border border-slate-700 bg-slate-900/50">
        <div className="text-xs text-slate-400">Folding</div>
        <div className="font-mono text-slate-100">{typeof foldingImpact === 'number' ? foldingImpact.toFixed(3) : '—'}{badge(foldingImpact)}</div>
      </div>
    </div>
    {notes && <div className="mt-3 text-sm text-slate-300">{notes}</div>}
  </div>
);

export default ProteinDeltaCard;

