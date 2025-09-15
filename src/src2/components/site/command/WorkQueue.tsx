import React from 'react';

type Run = { id: string; engine: 'oracle' | 'forge' | 'boltz'; status: 'queued' | 'running' | 'done' | 'error'; startedAt?: string; finishedAt?: string };

type Props = { runs: readonly Run[]; className?: string; title?: string };

const badge = (s: Run['status']) => {
  const map: Record<Run['status'], string> = { queued: 'bg-slate-100 text-slate-700', running: 'bg-amber-100 text-amber-700', done: 'bg-emerald-100 text-emerald-700', error: 'bg-red-100 text-red-700' };
  return <span className={`px-2 py-0.5 text-xs rounded ${map[s]}`}>{s}</span>;
};

const WorkQueue: React.FC<Props> = ({ runs, className, title = 'Work Queue' }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
    <div className="space-y-2">
      {runs.map((r) => (
        <div key={r.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-800 dark:text-slate-100">{r.id}</span>
            <span className="text-slate-500">{r.engine}</span>
          </div>
          <div className="flex items-center gap-3">
            {r.startedAt && <span className="text-xs text-slate-500">{r.startedAt}</span>}
            {badge(r.status)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WorkQueue; 
 
 
 