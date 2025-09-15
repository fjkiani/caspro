import React from 'react';
import type { TwoHitStep } from '../../../data/runx1Content';

const COLOR: Record<TwoHitStep['color'], string> = {
  green: 'bg-gradient-to-br from-green-400 to-emerald-600',
  yellow: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  orange: 'bg-gradient-to-br from-orange-500 to-red-600',
  red: 'bg-gradient-to-br from-red-600 to-red-900',
};

const TwoHitCell: React.FC<{ step: TwoHitStep }> = ({ step }) => (
  <div className="flex flex-col items-center group">
    <div className={`relative w-32 h-32 ${COLOR[step.color]} rounded-full flex items-center justify-center text-white shadow-2xl`}>
      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
      {step.icon && (
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-lg">{step.icon}</span>
        </div>
      )}
      <span className="text-sm font-bold z-10 text-center px-2" dangerouslySetInnerHTML={{ __html: step.titleHTML }}></span>
    </div>
    <div className="mt-4 bg-slate-100 dark:bg-slate-800/60 rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-600/50 backdrop-blur-sm">
      <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold text-center" dangerouslySetInnerHTML={{ __html: step.subtextHTML }}></p>
    </div>
  </div>
);

type Props = { steps: TwoHitStep[]; className?: string };

const TwoHitDiagram: React.FC<Props> = ({ steps, className }) => (
  <div className={`flex flex-col lg:flex-row items-center justify-center gap-8 ${className || ''}`}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <TwoHitCell step={s} />
        {i < steps.length - 1 && <div className="hidden lg:block w-16 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600" />}
      </React.Fragment>
    ))}
  </div>
);

export default TwoHitDiagram; 