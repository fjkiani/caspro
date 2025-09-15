import React from 'react';
import type { TransformationWorkflow } from '../../../types/transformation';
import StageTransformation from './StageTransformation';

export type WorkflowPipelineProps = {
  workflow: TransformationWorkflow;
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
    case 'oracle': return 'text-purple-400 border-purple-500/50';
    case 'forge': return 'text-orange-400 border-orange-500/50';
    case 'boltz': return 'text-blue-400 border-blue-500/50';
    default: return 'text-slate-400 border-slate-500/50';
  }
};

const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({ workflow, className = '' }) => {
  return (
    <div className={`space-y-12 ${className}`}>
      {/* Workflow Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">{workflow.title}</h2>
        <p className="text-lg text-slate-300 max-w-4xl mx-auto">{workflow.description}</p>
        
        {/* Product Pipeline Overview */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {workflow.products.map((product, i) => (
            <React.Fragment key={product}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getProductColor(product)} bg-slate-800/50`}>
                <span className="text-2xl">{getProductIcon(product)}</span>
                <span className="font-semibold capitalize">{product}</span>
              </div>
              {i < workflow.products.length - 1 && (
                <div className="text-2xl text-slate-400">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Workflow Stages */}
      <div className="space-y-16">
        {workflow.stages.map((stage, i) => (
          <div key={stage.id} className="relative">
            {/* Stage Number */}
            <div className="absolute -left-8 top-8 w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-full flex items-center justify-center text-white font-bold">
              {i + 1}
            </div>
            
            {/* Stage Content */}
            <StageTransformation stage={stage} />
            
            {/* Pipeline Arrow */}
            {i < workflow.stages.length - 1 && (
              <div className="flex justify-center mt-8">
                <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total Impact Summary */}
      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/50 rounded-xl p-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-green-300">Complete Workflow Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-green-400">{workflow.totalImpact.timeReduction}</div>
              <div className="text-green-300">Time Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-400">{workflow.totalImpact.costSavings}</div>
              <div className="text-green-300">Cost Savings</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-400">{workflow.totalImpact.successRate}</div>
              <div className="text-green-300">Success Rate</div>
            </div>
          </div>
          <p className="text-green-200 max-w-4xl mx-auto text-lg">
            {workflow.totalImpact.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPipeline; 