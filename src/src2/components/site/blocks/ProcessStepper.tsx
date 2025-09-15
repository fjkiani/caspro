import React from 'react';
import { StepArrow } from '../CrisproDeckPrimitives';

export type Step = {
  icon?: React.ComponentType<any> | React.ReactElement;
  title: string;
  description?: string;
  accent?: 'cyan' | 'purple' | 'orange' | 'red' | 'green' | 'sky' | 'blue';
};

const accentText: Record<string, string> = {
  cyan: 'text-cyan-600 dark:text-cyan-400',
  purple: 'text-purple-600 dark:text-purple-400',
  orange: 'text-orange-600 dark:text-orange-400',
  red: 'text-red-600 dark:text-red-400',
  green: 'text-green-600 dark:text-green-400',
  sky: 'text-sky-600 dark:text-sky-400',
  blue: 'text-blue-600 dark:text-blue-400',
};

export type ProcessStepperProps = {
  steps: Step[];
  direction?: 'row' | 'col';
  className?: string;
};

const StepCard: React.FC<Step> = ({ icon, title, description, accent = 'cyan' }) => (
  <div className="flex flex-col items-center text-center space-y-2">
    <div className={`w-14 h-14 rounded-full border-2 ${accentText[accent]} flex items-center justify-center`}> 
      {icon && (typeof icon === 'function' ? React.createElement(icon as any, { className: `${accentText[accent]} w-6 h-6` }) : <span className={`text-xl ${accentText[accent]}`}>{icon}</span>)}
    </div>
    <h4 className={`text-base md:text-lg font-bold ${accentText[accent]}`}>{title}</h4>
    {description && <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">{description}</p>}
  </div>
);

const ProcessStepper: React.FC<ProcessStepperProps> = ({ steps, direction = 'row', className = '' }) => (
  <div className={`flex ${direction === 'row' ? 'flex-col lg:flex-row' : 'flex-col'} items-center justify-center gap-6 ${className}`}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <StepCard {...s} />
        {i < steps.length - 1 && <StepArrow direction={direction === 'row' ? 'right' : 'down'} className="hidden lg:block" />}
      </React.Fragment>
    ))}
  </div>
);

export default ProcessStepper; 