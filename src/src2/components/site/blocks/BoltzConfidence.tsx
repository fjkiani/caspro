import React from 'react';
import { StatCard } from '../CrisproDeckPrimitives';

export type BoltzConfidenceProps = {
  title: string;
  description?: string;
  confidenceLabel?: string;
  confidenceValue: string;
  className?: string;
};

const BoltzConfidence: React.FC<BoltzConfidenceProps> = ({ title, description, confidenceLabel = 'Binding Confidence', confidenceValue, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center ${className}`}>
    <h3 className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-400 mb-2">{title}</h3>
    {description && <p className="text-slate-700 dark:text-slate-300 mb-4">{description}</p>}
    <div className="inline-block">
      <StatCard value={confidenceValue} label={confidenceLabel} />
    </div>
  </div>
);

export default BoltzConfidence; 