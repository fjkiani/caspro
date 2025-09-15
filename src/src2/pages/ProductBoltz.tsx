import React from 'react';
import { KPIStrip } from '../components/site/blocks';
import { boltzContent } from '../data/boltzContent';

const ProductBoltz: React.FC = () => (
  <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
    <KPIStrip items={boltzContent.kpis.items} />
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
      <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Recent simulations</div>
      <div className="space-y-2">
        {boltzContent.runs.map(r => (
          <div key={r.id} className="text-sm flex items-center justify-between">
            <div className="font-mono text-slate-800 dark:text-slate-100">{r.id}</div>
            <div className="text-slate-600 dark:text-slate-300">{r.input}</div>
            <div className="font-mono">{r.complexConfidence.toFixed(3)}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductBoltz; 