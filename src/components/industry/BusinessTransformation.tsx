'use client';

import React from 'react';
import { FactoryDemoShowcase } from '@/components/demos';
import { EnhancedComparison } from '@/components/demos';
import type { ValueProposition, TransformationSummary } from '@/data/industry/biotech-transformation-content';

export type BusinessTransformationProps = {
  productName: string;
  valuePropositions: ValueProposition[];
  summary: TransformationSummary;
  className?: string;
};

const BusinessTransformation: React.FC<BusinessTransformationProps> = ({
  productName,
  valuePropositions,
  summary,
  className = ''
}) => {
  // Select contextual demo based on value proposition title
  const getDemoForVP = (title: string): { type: 'factory' | 'legacy'; category?: string; scenario?: string; demo?: string } => {
    const isForge = productName.toLowerCase() === 'forge';

    // Clinical-specific mappings
    if (title.toLowerCase().includes('vus') || title.toLowerCase().includes('resolve') || title.toLowerCase().includes('ambiguity') || title.toLowerCase().includes('interpretation')) {
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'variantTriaging' };
    }
    if (title.toLowerCase().includes('resistance') || title.toLowerCase().includes('evolution') || title.toLowerCase().includes('prediction')) {
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'constructPrioritization' };
    }
    if (title.toLowerCase().includes('immunotherapy') || title.toLowerCase().includes('personalized') || title.toLowerCase().includes('neoantigen') || title.toLowerCase().includes('car-t')) {
      if (isForge) {
        return { type: 'factory' as const, category: 'biotechRnD', scenario: 'guidedSequenceGeneration' };
      }
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'variantTriaging' };
    }

    // Biotech-specific mappings  
    if (title.toLowerCase().includes('triage') || title.toLowerCase().includes('variants') || title.toLowerCase().includes('wet-lab')) {
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'variantTriaging' };
    }
    if (title.toLowerCase().includes('evidence') || title.toLowerCase().includes('constructs') || title.toLowerCase().includes('explain') || title.toLowerCase().includes('prioritize')) {
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'constructPrioritization' };
    }
    if (title.toLowerCase().includes('guide') || title.toLowerCase().includes('design') || title.toLowerCase().includes('scaling') || title.toLowerCase().includes('quality control')) {
      if (isForge) {
        return { type: 'factory' as const, category: 'biotechRnD', scenario: 'guidedSequenceGeneration' };
      }
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'guidedSequenceGeneration' };
    }
    if (title.toLowerCase().includes('complex loci') || title.toLowerCase().includes('long-context')) {
      return { type: 'factory' as const, category: 'biotechRnD', scenario: 'constructPrioritization' };
    }

    // Default to variant triaging
    return { type: 'factory' as const, category: 'biotechRnD', scenario: 'variantTriaging' };
  };

  return (
    <section className={`space-y-12 ${className}`}>
      {/* Value Propositions */}
      {valuePropositions.map((vp, index) => (
        <div key={index} className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-white">{vp.title}</h3>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">{vp.description}</p>
          </div>

          {/* Oracle / Forge Demo Showcase */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h4 className="text-xl font-semibold text-green-300">
                🧬 {productName} Annihilation of Uncertainty
              </h4>
              <p className="text-slate-400 text-sm">
                {productName.toLowerCase() === 'oracle'
                  ? 'Click "Run Demo" to see Oracle solve this problem step-by-step with discriminative AI endpoints'
                  : 'Click "Run Demo" to see Forge generate candidates step-by-step with generative AI endpoints'}
              </p>
            </div>
            <FactoryDemoShowcase demoConfig={getDemoForVP(vp.title)} />
          </div>

          {/* Enhanced Comparison - Traditional vs Oracle */}
          {vp.comparison && vp.impact && (
            <EnhancedComparison
              title={`Traditional vs ${productName} Approach`}
              productName={productName}
              comparison={vp.comparison}
              impact={vp.impact}
            />
          )}
        </div>
      ))}

      {/* Total Business Impact */}
      <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/50 rounded-xl p-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-green-300">{summary.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {summary.metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-green-400">{metric.value}</div>
                <div className="text-green-300">{metric.label}</div>
                <div className="text-xs text-green-400 mt-1">{metric.subtitle}</div>
              </div>
            ))}
          </div>
          <p className="text-green-200 max-w-4xl mx-auto text-lg">
            {summary.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessTransformation;
