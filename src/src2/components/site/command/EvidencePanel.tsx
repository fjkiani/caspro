import React from 'react';

type Evidence = { id: string; type: 'score' | 'design' | 'structure'; summary: string; link?: string };

type Props = { items: readonly Evidence[]; className?: string; title?: string };

const color = (t: Evidence['type']) => t === 'score' ? 'text-cyan-600' : t === 'design' ? 'text-purple-600' : 'text-orange-600';

const EvidencePanel: React.FC<Props> = ({ items, className, title = 'Evidence' }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
    <div className="space-y-2">
      {items.map((e) => (
        <div key={e.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${color(e.type)}`}>{e.type}</span>
            <span className="text-slate-700 dark:text-slate-200">{e.summary}</span>
          </div>
          {e.link && <a className="text-xs text-blue-600 hover:underline" href={e.link}>open</a>}
        </div>
      ))}
    </div>
  </div>
);

export default EvidencePanel; 
