import React from 'react';
import type { ComponentConfig } from '../types/transformation';
import { multiModalContexts } from '../data/multiModalContexts';

// Import enhanced multi-modal components
import { 
  EssentialityChart, 
  ProteinDeltaCard, 
  AccessibilityTrack,
  OracleScore,
  GuidedDesignPanel,
  SequencePeaksViewer,
  OracleExplainTrack
} from '../components/site/blocks';

// Business context wrapper components
const BusinessContextHeader: React.FC<{
  title: string;
  description: string;
  problem: string;
  solution: string;
  product: string;
}> = ({ title, description, problem, solution, product }) => (
  <div className="space-y-4 mb-6">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">
        {product === 'oracle' ? '🔮' : product === 'forge' ? '⚒️' : '⚡'}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="p-3 bg-red-900/20 border border-red-700/50 rounded">
        <div className="font-medium text-red-300 mb-1">Problem:</div>
        <div className="text-red-200">{problem}</div>
      </div>
      <div className="p-3 bg-green-900/20 border border-green-700/50 rounded">
        <div className="font-medium text-green-300 mb-1">Solution:</div>
        <div className="text-green-200">{solution}</div>
      </div>
    </div>
  </div>
);

const BusinessImpactMetrics: React.FC<{
  impact: string;
  metrics: Array<{ label: string; value: string; subtitle: string; improvement?: string }>;
}> = ({ impact, metrics }) => (
  <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
    <div className="text-sm font-medium text-slate-200 mb-3">{impact}</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {metrics.map((metric, i) => (
        <div key={i} className="flex justify-between items-center">
          <span className="text-xs text-slate-400">{metric.label}:</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-green-400">{metric.value}</div>
            <div className="text-xs text-slate-500">{metric.subtitle}</div>
            {metric.improvement && (
              <div className="text-xs text-green-500">{metric.improvement}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced multi-modal components with context awareness
const EnhancedEssentialityChart: React.FC<{
  context: 'biotech' | 'clinical';
  story: string;
  product: 'oracle' | 'forge' | 'boltz';
}> = ({ context, story, product }) => {
  const config = multiModalContexts.geneEssentiality[context]?.[story];
  
  if (!config) {
    return <div className="text-red-400">Configuration not found for {context}/{story}</div>;
  }

  return (
    <div className="space-y-6">
      <BusinessContextHeader 
        title={config.title}
        description={config.description}
        problem={config.businessContext.problem}
        solution={config.businessContext.solution}
        product={product}
      />
      
      <EssentialityChart series={config.data.contexts || []} />
      
      <BusinessImpactMetrics 
        impact={config.businessContext.impact}
        metrics={config.businessContext.metrics}
      />
    </div>
  );
};

const EnhancedProteinDeltaCard: React.FC<{
  context: 'biotech' | 'clinical';
  story: string;
  product: 'oracle' | 'forge' | 'boltz';
}> = ({ context, story, product }) => {
  const config = multiModalContexts.proteinFunctionalChange[context]?.[story];
  
  if (!config) {
    return <div className="text-red-400">Configuration not found for {context}/{story}</div>;
  }

  return (
    <div className="space-y-6">
      <BusinessContextHeader 
        title={config.title}
        description={config.description}
        problem={config.businessContext.problem}
        solution={config.businessContext.solution}
        product={product}
      />
      
      <ProteinDeltaCard {...config.data} />
      
      <BusinessImpactMetrics 
        impact={config.businessContext.impact}
        metrics={config.businessContext.metrics}
      />
    </div>
  );
};

const EnhancedAccessibilityTrack: React.FC<{
  context: 'biotech' | 'clinical';
  story: string;
  product: 'oracle' | 'forge' | 'boltz';
}> = ({ context, story, product }) => {
  const config = multiModalContexts.chromatinAccessibility[context]?.[story];
  
  if (!config) {
    return <div className="text-red-400">Configuration not found for {context}/{story}</div>;
  }

  return (
    <div className="space-y-6">
      <BusinessContextHeader 
        title={config.title}
        description={config.description}
        problem={config.businessContext.problem}
        solution={config.businessContext.solution}
        product={product}
      />
      
      <AccessibilityTrack tracks={[config.data]} />
      
      <BusinessImpactMetrics 
        impact={config.businessContext.impact}
        metrics={config.businessContext.metrics}
      />
    </div>
  );
};

// Component renderer function
export const renderContextualComponent = (config: ComponentConfig): React.ReactElement => {
  const { type, context, story, data, props } = config;

  switch (type) {
    case 'geneEssentiality':
      return (
        <EnhancedEssentialityChart 
          context={context as 'biotech' | 'clinical'}
          story={story}
          product={props?.product || 'oracle'}
        />
      );
      
    case 'proteinFunctionalChange':
      return (
        <EnhancedProteinDeltaCard 
          context={context as 'biotech' | 'clinical'}
          story={story}
          product={props?.product || 'oracle'}
        />
      );
      
    case 'chromatinAccessibility':
      return (
        <EnhancedAccessibilityTrack 
          context={context as 'biotech' | 'clinical'}
          story={story}
          product={props?.product || 'oracle'}
        />
      );
      
    case 'oracleScore':
      return <OracleScore {...data} {...props} />;
      
    case 'guidedDesign':
      return <GuidedDesignPanel {...data} {...props} />;
      
    case 'sequencePeaks':
      return <SequencePeaksViewer {...data} {...props} />;
      
    case 'explainTrack':
      return <OracleExplainTrack {...data} {...props} />;
      
    default:
      return <div className="text-yellow-400">Unknown component type: {type}</div>;
  }
};