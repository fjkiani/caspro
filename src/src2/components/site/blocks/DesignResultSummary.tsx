import React from 'react';

type Props = {
  auroc: number;
  compute: { beamWidth: number; tokensPerBp: number };
  scorerVersion: string;
  modelVersion: string;
  seed?: number;
  className?: string;
};

const chip = (text: string, title?: string) => (
  <span title={title} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">{text}</span>
);

const colorForAUROC = (a: number) => (a >= 0.9 ? 'text-green-500' : a >= 0.8 ? 'text-yellow-500' : 'text-red-500');

const DesignResultSummary: React.FC<Props> = ({ auroc, compute, scorerVersion, modelVersion, seed, className }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-slate-500">Match to target (AUROC)</div>
        <div className={`text-2xl font-bold ${colorForAUROC(auroc)}`} title="Higher is better; ≥0.90 indicates strong target adherence.">{auroc.toFixed(3)}</div>
      </div>
      <div className="flex gap-2 items-center">
        {chip(`beam:${compute.beamWidth}`, 'Search breadth (increase for quality)')}
        {chip(`tok/bp:${compute.tokensPerBp}`, 'Sampling budget per base pair (increase for quality)')}
        {chip(`scorer:${scorerVersion}`, 'Predictor version used for guidance')}
        {chip(`model:${modelVersion}`, 'Generation model and context window')}
        {seed !== undefined && chip(`seed:${seed}`, 'Random seed for reproducibility')}
      </div>
    </div>
  </div>
);

export default DesignResultSummary; 

 
 
 
 