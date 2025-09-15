import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import type { APIDossierSummary, NextStepAction } from '../../../data/dossierSummaries';
import { ChevronRight, FileText, Lightbulb, ArrowRight, X } from 'lucide-react';

// A placeholder for the actual agentic demo components
const AgenticDemoPlaceholder = ({ title, onDismiss }: { title: string, onDismiss: () => void }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border-2 border-slate-700 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <button onClick={onDismiss} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
          <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </button>
      </div>
      <p className="text-slate-600 dark:text-slate-400">
        This is a placeholder for the "{title}" simulation. In a real scenario, this would be a fully interactive component demonstrating the platform's agentic capabilities.
      </p>
    </div>
  </div>
);


interface EnhancedDossierSummaryProps {
  dossier: APIDossierSummary;
  className?: string;
}

const EnhancedDossierSummary: React.FC<EnhancedDossierSummaryProps> = ({
  dossier,
  className = ''
}) => {
  const { getTextSize, getCardClass } = useAccessibility();
  const [activeDemo, setActiveDemo] = useState<{ title: string } | null>(null);

  const handleActionClick = (action: NextStepAction) => {
    if (action.type === 'trigger_demo' && action.payload) {
      setActiveDemo({ title: action.payload.title });
    }
  };

  const getStatusColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800 border-green-300',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      sky: 'bg-sky-100 text-sky-800 border-sky-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
      orange: 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  const getCheckpointColorClasses = (color: string) => {
    const colorMap = {
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      sky: 'text-sky-600 bg-sky-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <div className={`${getCardClass()} p-8 rounded-2xl border-2 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-2xl')} mb-2`}>
            📋 Analysis Dossier
          </h3>
          <h4 className={`font-semibold text-slate-700 dark:text-slate-300 ${getTextSize('text-xl')}`}>
            {dossier.assetId}
          </h4>
        </div>
        <div className={`px-4 py-2 rounded-lg border-2 font-semibold ${getTextSize('text-sm')} ${getStatusColorClasses(dossier.statusColor)}`}>
          {dossier.status}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${getTextSize('text-base')}`}>
          {dossier.description}
        </p>
      </div>

      {/* Checkpoints */}
      <div className="mb-8">
        <h5 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
          <FileText className="w-5 h-5" />
          Analysis Checkpoints
        </h5>
        <div className="space-y-3">
          {dossier.checkpoints.map((checkpoint, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCheckpointColorClasses(checkpoint.color || 'green')}`}>
                {checkpoint.icon && React.createElement(checkpoint.icon, { className: 'w-5 h-5' })}
              </div>
              <div className="flex-1">
                <div className={`font-semibold text-slate-900 dark:text-white ${getTextSize('text-base')}`}>
                  {checkpoint.label}
                </div>
                {checkpoint.detail && (
                  <div className={`text-slate-600 dark:text-slate-400 mt-1 ${getTextSize('text-sm')}`}>
                    {checkpoint.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Findings */}
      <div className="mb-8">
        <h5 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
          <Lightbulb className="w-5 h-5" />
          Key Findings
        </h5>
        <div className="space-y-2">
          {dossier.keyFindings.map((finding, index) => (
            <div key={index} className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
              <span className={`text-slate-700 dark:text-slate-300 ${getTextSize('text-sm')}`}>
                {finding}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Relevance */}
      {dossier.clinicalRelevance && (
        <div className="mb-8">
          <h5 className={`font-semibold text-slate-900 dark:text-white mb-3 ${getTextSize('text-lg')}`}>
            🏥 Clinical Relevance
          </h5>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className={`text-blue-800 dark:text-blue-200 ${getTextSize('text-sm')}`}>
              {dossier.clinicalRelevance}
            </p>
          </div>
        </div>
      )}

      {/* Next Steps -> Agentic Actions */}
      {dossier.nextSteps && dossier.nextSteps.length > 0 && (
        <div>
          <h5 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
            <ArrowRight className="w-5 h-5" />
            Agentic Next Steps
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dossier.nextSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(step)}
                className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 text-left hover:shadow-lg"
              >
                {step.icon && (
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                    {React.createElement(step.icon, { className: 'w-6 h-6' })}
                  </div>
                )}
                <span className={`font-semibold text-slate-800 dark:text-slate-200 ${getTextSize('text-sm')}`}>
                  {step.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeDemo && (
        <AgenticDemoPlaceholder
          title={activeDemo.title}
          onDismiss={() => setActiveDemo(null)}
        />
      )}
    </div>
  );
};

export default EnhancedDossierSummary; 