import React from 'react';
import { TwoColumn, StatCard } from '../CrisproDeckPrimitives';

export type OracleScoreProps = {
  left: { title: string; value: string; subtitle?: string };
  right: { title: string; value: string; subtitle?: string };
  score: { title: string; value: string };
  className?: string;
};

const Panel: React.FC<{ title: string; value: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, value, subtitle, align = 'center' }) => (
  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 h-full">
    <div className={`text-${align} w-full`}>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 my-2">{value}</p>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>}
    </div>
  </div>
);

const OracleScore: React.FC<OracleScoreProps> = ({ left, right, score, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <TwoColumn>
        <Panel title={left.title} value={left.value} subtitle={left.subtitle} />
        <Panel title={right.title} value={right.value} subtitle={right.subtitle} />
      </TwoColumn>
      <div className="mt-8">
        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{score.title}</p>
          <StatCard value={score.value} label="Zeta Score" className="mx-auto inline-block bg-transparent border-none p-0" />
        </div>
      </div>
    </div>
  );
};

export default OracleScore; 