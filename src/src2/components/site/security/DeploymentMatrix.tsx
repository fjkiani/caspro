import React from 'react';
import type { DeploymentModel } from '../../../types/site';

type Props = {
  models: DeploymentModel[];
  className?: string;
};

const COLOR_MAP: Record<string, { card: string; border: string; text: string; dot: string }> = {
  indigo: { card: 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/20', border: 'border-indigo-500/50', text: 'text-indigo-400', dot: 'bg-indigo-400' },
  purple: { card: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20', border: 'border-purple-500/50', text: 'text-purple-400', dot: 'bg-purple-400' },
  cyan: { card: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20', border: 'border-cyan-500/50', text: 'text-cyan-400', dot: 'bg-cyan-400' },
};

const DeploymentMatrix: React.FC<Props> = ({ models, className = '' }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${className}`}>
    {models.map((m, i) => {
      const c = COLOR_MAP[(m as any).color] || COLOR_MAP.indigo;
      return (
        <div key={i} className={`${c.card} p-6 rounded-2xl border ${c.border}`}>
          <div className="text-center mb-4">
            <div className={`${c.text} mb-3`}>{(m as any).icon}</div>
            <h3 className={`text-xl font-bold ${c.text}`}>{m.title}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 mb-4">
            {(m.features as string[]).map((f: string, j: number) => (
              <li key={j} className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${c.dot} rounded-full`}></div>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 text-center">
            <p className="text-slate-900 dark:text-slate-200 font-semibold">{m.pricing}</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{m.ideal}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default DeploymentMatrix; 