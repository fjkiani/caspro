import React from 'react';
import type { WorkflowStage } from '../../../types/transformation';
import { renderContextualComponent } from '../../../utils/componentRenderer';

export type StageTransformationProps = {
  stage: WorkflowStage;
  className?: string;
};

const getProductIcon = (product: string) => {
  switch (product) {
    case 'oracle': return '🔮';
    case 'forge': return '⚒️';
    case 'boltz': return '⚡';
    default: return '🧬';
  }
};

const getProductColor = (product: string) => {
  switch (product) {
    case 'oracle': return 'from-purple-900/20 to-purple-800/20 border-purple-700/50';
    case 'forge': return 'from-orange-900/20 to-orange-800/20 border-orange-700/50';
    case 'boltz': return 'from-blue-900/20 to-blue-800/20 border-blue-700/50';
    default: return 'from-slate-900/20 to-slate-800/20 border-slate-700/50';
  }
};

const getCapabilityIcon = (capability: string) => {
  switch (capability) {
    case 'prediction': return '🎯';
    case 'generation': return '🧬';
    case 'optimization': return '⚡';
    case 'analysis': return '🔍';
    default: return '🔬';
  }
};

const StageTransformation: React.FC<StageTransformationProps> = ({ stage, className = '' }) => {
  return (
    <div className={`bg-gradient-to-r ${getProductColor(stage.product)} border rounded-xl p-8 ${className}`}>
      {/* Stage Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{getProductIcon(stage.product)}</span>
          <div>
            <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
            <p className="text-slate-300">{stage.description}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full">
          <span className="text-lg">{getCapabilityIcon(stage.capability)}</span>
          <span className="text-sm font-medium text-slate-300 capitalize">{stage.capability}</span>
        </div>
      </div>

      {/* Stage Metrics */}
      {(stage.duration || stage.cost) && (
        <div className="flex gap-6 mb-6">
          {stage.duration && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">⏱️</span>
              <span className="text-slate-300">{stage.duration}</span>
            </div>
          )}
          {stage.cost && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">💰</span>
              <span className="text-slate-300">{stage.cost}</span>
            </div>
          )}
        </div>
      )}

      {/* Stage Components */}
      <div className="space-y-6 mb-8">
        {stage.components.map((componentConfig, i) => (
          <div key={i}>
            {renderContextualComponent(componentConfig)}
          </div>
        ))}
      </div>

      {/* Business Impact */}
      {stage.businessImpact.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Stage Impact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stage.businessImpact.map((impact, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-300">{impact.label}:</span>
                <div className="text-right">
                  <span className="text-green-400 font-semibold">{impact.before} → {impact.after}</span>
                  {impact.improvement && (
                    <div className="text-xs text-green-500">{impact.improvement}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StageTransformation; 