import React from 'react';

type Props = {
  id: string;
  region: 'coding' | 'noncoding' | 'splice';
  zeroShot: number;
  supervised?: number;
  verdict: 'Pathogenic' | 'Benign' | 'Uncertain';
  notes?: string;
  className?: string;
};

const badge = (text: string, color: string) => (
  <span className={`px-2 py-0.5 text-xs rounded-full ${color}`}>{text}</span>
);

const VariantDetailCard: React.FC<Props> = ({ id, region, zeroShot, supervised, verdict, notes, className }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{id}</div>
      <div className="flex gap-2">
        {badge(region, 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200')}
        {badge(verdict, verdict === 'Pathogenic' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' : verdict === 'Benign' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300')}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-3 rounded border border-slate-100 dark:border-slate-700">
        <div className="text-xs text-slate-500 mb-1">Zero‑shot score</div>
        <div className="font-mono">{zeroShot.toFixed(3)}</div>
      </div>
      <div className="p-3 rounded border border-slate-100 dark:border-slate-700">
        <div className="text-xs text-slate-500 mb-1">Supervised score</div>
        <div className="font-mono">{typeof supervised === 'number' ? supervised.toFixed(3) : '—'}</div>
      </div>
    </div>
    {notes && <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">{notes}</div>}
  </div>
);

export default VariantDetailCard; 
