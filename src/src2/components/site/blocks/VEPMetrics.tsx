import React from 'react';

type Row = { name: string; auroc: number; auprc?: number };

type Props = {
  byClass: Row[];
  title?: string;
  className?: string;
};

const fmt = (n?: number) => (typeof n === 'number' ? n.toFixed(3) : '—');

const VEPMetrics: React.FC<Props> = ({ byClass, title = 'Variant Prediction Performance', className }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{title}</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-600 dark:text-slate-300">
            <th className="px-2 py-1">Class</th>
            <th className="px-2 py-1">AUROC</th>
            <th className="px-2 py-1">AUPRC</th>
          </tr>
        </thead>
        <tbody>
          {byClass.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
              <td className="px-2 py-1 text-slate-800 dark:text-slate-100">{r.name}</td>
              <td className="px-2 py-1 font-mono">{fmt(r.auroc)}</td>
              <td className="px-2 py-1 font-mono">{fmt(r.auprc)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default VEPMetrics; 

 