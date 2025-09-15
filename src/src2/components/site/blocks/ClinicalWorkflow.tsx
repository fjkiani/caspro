import React from 'react';

export type WorkflowStep = {
  title: string;
  description: string;
  duration: string;
  outcome: string;
  status: 'uncertain' | 'actionable' | 'optimized';
  icon?: string;
};

export type ClinicalWorkflowProps = {
  title: string;
  subtitle?: string;
  traditional: WorkflowStep[];
  oracle: WorkflowStep[];
  className?: string;
};

const getStatusColor = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'uncertain': return 'border-red-700/50 bg-red-900/20 text-red-200';
    case 'actionable': return 'border-green-700/50 bg-green-900/20 text-green-200';
    case 'optimized': return 'border-cyan-700/50 bg-cyan-900/20 text-cyan-200';
    default: return 'border-slate-700 bg-slate-800 text-slate-200';
  }
};

const getStatusIcon = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'uncertain': return '❓';
    case 'actionable': return '✅';
    case 'optimized': return '🎯';
    default: return '⚪';
  }
};

const WorkflowTimeline: React.FC<{ steps: WorkflowStep[]; title: string }> = ({ steps, title }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className={`p-4 rounded-xl border ${getStatusColor(step.status)}`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">
              {step.icon || getStatusIcon(step.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{step.title}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                  {step.duration}
                </span>
              </div>
              <p className="text-sm opacity-90 mb-2">{step.description}</p>
              <div className="text-xs font-medium">
                Outcome: <span className="font-normal">{step.outcome}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClinicalWorkflow: React.FC<ClinicalWorkflowProps> = ({
  title,
  subtitle,
  traditional,
  oracle,
  className = ''
}) => {
  const totalTraditionalTime = traditional.reduce((acc, step) => {
    const weeks = parseInt(step.duration.match(/\d+/)?.[0] || '0');
    return acc + weeks;
  }, 0);

  const totalOracleTime = oracle.reduce((acc, step) => {
    const time = step.duration.toLowerCase();
    if (time.includes('day')) return acc + (parseInt(time.match(/\d+/)?.[0] || '0') / 7);
    if (time.includes('week')) return acc + parseInt(time.match(/\d+/)?.[0] || '0');
    if (time.includes('month')) return acc + (parseInt(time.match(/\d+/)?.[0] || '0') * 4);
    return acc;
  }, 0);

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WorkflowTimeline steps={traditional} title="Traditional Clinical Workflow" />
        <WorkflowTimeline steps={oracle} title="Oracle-Powered Workflow" />
      </div>

      {/* Summary Comparison */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Workflow Transformation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-red-400">{totalTraditionalTime} weeks</div>
            <div className="text-red-300">Traditional Timeline</div>
            <div className="text-xs text-red-400 mt-1">Uncertain outcomes</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-4xl">→</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{Math.round(totalOracleTime)} weeks</div>
            <div className="text-green-300">Oracle Timeline</div>
            <div className="text-xs text-green-400 mt-1">Actionable outcomes</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-cyan-400">
            {Math.round(totalTraditionalTime / totalOracleTime)}x faster with {Math.round((1 - totalOracleTime / totalTraditionalTime) * 100)}% time reduction
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalWorkflow; 