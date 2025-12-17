'use client';

import React from 'react';
import { FactoryDemoShowcase, EnhancedComparison } from '@/components/demos';

export type IndustryProblem = {
  title: string;
  description: string;
  impacts: Array<{ metric: string; value: string; context: string }>;
};

export type ValueProposition = {
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string; improvement: string }>;
  capabilities: string[];
  demo?: {
    type: 'factory' | 'comparison';
    category?: string;
    scenario?: string;
  };
};

export type TransformationSummary = {
  tagline: string;
  keyBenefits: string[];
  cta: {
    primary: { text: string; link: string };
    secondary?: { text: string; link: string };
  };
};

export type BusinessTransformationProps = {
  productName: string;
  industryProblem: IndustryProblem;
  valuePropositions: ValueProposition[];
  summary: TransformationSummary;
  components?: {
    explainTrack?: any;
    guidedDesign?: any;
    sequencePeaks?: any;
  };
  className?: string;
};

const BusinessTransformation: React.FC<BusinessTransformationProps> = ({
  productName,
  industryProblem,
  valuePropositions,
  summary,
  className = ''
}) => {
  return (
    <section className={`space-y-16 ${className}`}>
      {/* Industry Problem Section */}
      <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-700/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-4">{industryProblem.title}</h2>
        <p className="text-lg text-slate-300 mb-6">{industryProblem.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryProblem.impacts.map((impact, idx) => (
            <div key={idx} className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
              <div className="text-2xl font-black text-red-400 mb-1">{impact.value}</div>
              <div className="text-red-300 font-medium mb-1">{impact.metric}</div>
              <div className="text-sm text-red-200">{impact.context}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Propositions */}
      {valuePropositions.map((vp, index) => (
        <div key={index} className="space-y-8">
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">{vp.title}</h3>
            <p className="text-lg text-slate-300 mb-6">{vp.description}</p>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {vp.metrics.map((metric, idx) => (
                <div key={idx} className="bg-green-900/30 border border-green-700/50 rounded-xl p-4">
                  <div className="text-2xl font-black text-green-400 mb-1">{metric.value}</div>
                  <div className="text-green-300 font-medium mb-1">{metric.label}</div>
                  <div className="text-sm text-green-200">{metric.improvement}</div>
                </div>
              ))}
            </div>
            
            {/* Key Capabilities */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-white">Key Capabilities:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {vp.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Demo Integration */}
          {vp.demo && vp.demo.type === 'factory' && vp.demo.category && vp.demo.scenario && (
            <div className="my-8">
              <FactoryDemoShowcase
                category={vp.demo.category}
                scenario={vp.demo.scenario}
                productName={productName}
              />
            </div>
          )}

          {vp.demo && vp.demo.type === 'comparison' && (
            <div className="my-8">
              <EnhancedComparison
                title={`${vp.title} Comparison`}
                subtitle="Traditional vs AI-Powered Approach"
              />
            </div>
          )}
        </div>
      ))}

      {/* Summary CTA Section */}
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{summary.tagline}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {summary.keyBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4">
              <p className="text-blue-200 font-medium">{benefit}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={summary.cta.primary.link}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
          >
            {summary.cta.primary.text}
          </a>
          {summary.cta.secondary && (
            <a 
              href={summary.cta.secondary.link}
              className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors"
            >
              {summary.cta.secondary.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessTransformation;

