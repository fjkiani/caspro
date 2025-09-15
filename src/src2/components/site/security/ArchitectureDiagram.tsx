import React from 'react';
import type { ArchitectureLayer } from '../../../types/site';

type Props = {
  layers: ArchitectureLayer[];
  className?: string;
};

const COLOR_MAP: Record<string, { card: string; border: string; text: string; dot: string }> = {
  violet: { card: 'bg-gradient-to-br from-violet-500/20 to-violet-600/20', border: 'border-violet-500/50', text: 'text-violet-400', dot: 'bg-violet-400' },
  blue: { card: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20', border: 'border-blue-500/50', text: 'text-blue-400', dot: 'bg-blue-400' },
  emerald: { card: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/50', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  indigo: { card: 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/20', border: 'border-indigo-500/50', text: 'text-indigo-400', dot: 'bg-indigo-400' },
  purple: { card: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20', border: 'border-purple-500/50', text: 'text-purple-400', dot: 'bg-purple-400' },
  cyan: { card: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20', border: 'border-cyan-500/50', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  amber: { card: 'bg-gradient-to-br from-amber-500/20 to-amber-600/20', border: 'border-amber-500/50', text: 'text-amber-400', dot: 'bg-amber-400' },
};

const ArchitectureDiagram: React.FC<Props> = ({ layers, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
    {layers.map((layer: ArchitectureLayer, i: number) => {
      const c = COLOR_MAP[(layer as any).color] || COLOR_MAP.blue;
      return (
        <div key={i} className={`${c.card} p-6 rounded-2xl border ${c.border}`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`${c.text}`}>{(layer as any).icon}</div>
            <h3 className={`text-xl font-bold ${c.text}`}>{layer.title}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {(layer.features as string[]).map((f: string, j: number) => (
              <li key={j} className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${c.dot} rounded-full`}></div>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);

export default ArchitectureDiagram; 