import React from 'react';

type Objective =
  | { type: 'peak'; start: number; end: number; value: 0 | 1 }
  | { type: 'tf'; motif: string; start: number; end: number; weight?: number };

type Props = {
  objectives: Objective[];
  scorer: 'enformer' | 'borzoi';
  beamWidth: number;
  tokensPerBp: number;
  readOnly?: boolean;
  className?: string;
  onSimulate?: () => void;
};

const tag = (text: string, title?: string) => (
  <span title={title} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">{text}</span>
);

const GuidedDesignPanel: React.FC<Props> = ({ objectives, scorer, beamWidth, tokensPerBp, readOnly = true, className, onSimulate }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Guided Design</h4>
      <div className="flex gap-2 items-center">
        {tag(`scorer: ${scorer}`, 'Predictor used for guidance (Enformer/Borzoi)')}
        {tag(`beam: ${beamWidth}`, 'Search breadth (higher → better match, slower)')}
        {tag(`tokens/bp: ${tokensPerBp}`, 'Sampling budget per base pair (higher → better adherence)')}
        {onSimulate && (
          <button onClick={onSimulate} className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-600 text-white hover:bg-blue-500">Simulate</button>
        )}
      </div>
    </div>
    <div className="space-y-2">
      {objectives.map((o, i) => (
        <div key={i} className="text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
          {o.type === 'peak' ? tag('peak', 'Open/closed chromatin target window') : tag('tf', 'Transcription factor motif placement/avoidance')}
          <span className="font-mono">{o.type === 'peak' ? `${o.start}-${o.end} = ${o.value}` : `${o.motif} @ ${o.start}-${o.end}`}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
      More compute → higher match. Use presets for Draft/Review/Ready quality.
      <div className="mt-2 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded">
        <div className="h-1 bg-green-500 rounded" style={{ width: `${Math.min(100, (beamWidth * tokensPerBp) / 1.5 * 10)}%` }} />
      </div>
    </div>
    {readOnly && <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Read‑only preview (interactive on website).</div>}
  </div>
);

export default GuidedDesignPanel; 
