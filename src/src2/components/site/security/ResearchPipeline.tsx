import React from 'react';
import ProcessStepper from '../blocks/ProcessStepper';
import type { Step } from '../blocks/ProcessStepper';

type Props = {
  steps: Step[];
  footerText?: string;
  className?: string;
};

const ResearchPipeline: React.FC<Props> = ({ steps, footerText, className }) => (
  <section className={className}>
    <ProcessStepper steps={steps} />
    {footerText && (
      <p className="text-slate-700 dark:text-slate-300 mt-6 text-center max-w-3xl mx-auto">{footerText}</p>
    )}
  </section>
);

export default ResearchPipeline;
