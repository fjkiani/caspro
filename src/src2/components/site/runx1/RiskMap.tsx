import React from 'react';
import type { RiskPrediction } from '../../../data/runx1Content';

const levelColor: Record<RiskPrediction['level'], string> = {
  high: 'text-red-500',
  medium: 'text-orange-500',
  low: 'text-yellow-500',
};

type Props = {
  knownThreat: { title: string; subtext: string };
  aiCore: { title: string };
  predictions: RiskPrediction[];
  className?: string;
};

const RiskMap: React.FC<Props> = ({ knownThreat, aiCore, predictions, className }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-center ${className || ''}`}>
    <div className="flex flex-col items-center space-y-2 p-6 rounded-2xl border bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
      <div className="text-4xl">🧬</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{knownThreat.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm">{knownThreat.subtext}</p>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div className="text-8xl">🧠</div>
        <div className="absolute inset-0 -m-4 border-2 border-cyan-400/50 rounded-full animate-ping"></div>
      </div>
      <h3 className="text-xl font-bold text-cyan-500">{aiCore.title}</h3>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Predicted Mutations</h3>
      {predictions.map((p, i) => (
        <div key={i} className="bg-white dark:bg-slate-800/50 p-3 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="font-medium text-slate-900 dark:text-slate-200">{p.name}</span>
          <span className={`font-mono ${levelColor[p.level]}`}>{p.risk}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RiskMap; 