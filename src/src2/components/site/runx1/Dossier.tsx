import React from 'react';
import { Pill } from '../CrisproDeckPrimitives';

type Props = {
  dossier: { title: string; subtitle?: string }[];
  tiers: { title: string }[];
  text?: string;
  className?: string;
};

const Dossier: React.FC<Props> = ({ dossier, tiers, text, className }) => (
  <div className={`bg-white dark:bg-slate-800/70 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 ${className || ''}`}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {dossier.map((d, i) => (
        <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-slate-600 text-center">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{d.title}</h4>
          {d.subtitle && <p className="text-sm text-slate-600 dark:text-slate-300">{d.subtitle}</p>}
        </div>
      ))}
    </div>
    <div className="flex flex-col items-center gap-2 mb-6">
      {tiers.map((t, i) => (
        <React.Fragment key={i}>
          <Pill color={i === 0 ? 'red' as any : i === 1 ? 'yellow' as any : 'green' as any}>{t.title}</Pill>
          {i < tiers.length - 1 && <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-600" />}
        </React.Fragment>
      ))}
    </div>
    {text && <p className="text-slate-700 dark:text-slate-300 text-center">{text}</p>}
  </div>
);

export default Dossier; 