import React from 'react';

type Props = {
  synteny: number; // 0..1
  pfamHitRate: number; // 0..1
  dinucKL: number; // small is good
  className?: string;
};

const pill = (label: string, value: string, title?: string, color?: string) => (
  <div title={title} className={`px-3 py-1 rounded-full ${color || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'} text-xs`}>
    <span className="font-semibold mr-1">{label}</span>{value}
  </div>
);

const QCBadges: React.FC<Props> = ({ synteny, pfamHitRate, dinucKL, className }) => {
  const synColor = synteny >= 0.9 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : synteny >= 0.8 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  const pfamColor = pfamHitRate >= 0.7 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : pfamHitRate >= 0.5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  const klColor = dinucKL <= 0.15 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : dinucKL <= 0.25 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {pill('Synteny', `${(synteny * 100).toFixed(0)}%`, 'Genome-layout similarity to natural reference (0–1). Higher is better.', synColor)}
      {pill('Pfam hits', `${(pfamHitRate * 100).toFixed(0)}%`, 'Fraction of predicted proteins with domain hits.', pfamColor)}
      {pill('Dinuc KL', dinucKL.toFixed(2), 'Local sequence statistics vs reference genome; lower is more natural.', klColor)}
    </div>
  );
};

export default QCBadges; 
 
 
 
 