'use client';

import React from 'react';

export type ApproachComparison = {
  traditional: { label: string; cost: string }[];
  oracle: { label: string; cost: string }[];
};

export type BusinessImpact = {
  label: string;
  before: string;
  after: string;
};

type EnhancedComparisonProps = {
  title: string;
  productName: string;
  comparison: ApproachComparison;
  impact: BusinessImpact[];
  className?: string;
};

const EnhancedComparison: React.FC<EnhancedComparisonProps> = ({
  title,
  productName,
  comparison,
  impact,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <h4 className="font-bold text-white text-xl">{title}</h4>
        <p className="text-slate-300 text-sm">
          Comparing traditional workflows with {productName} acceleration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-6">
          <div className="font-semibold text-red-300 mb-4 text-lg">❌ Traditional</div>
          <div className="space-y-3">
            {comparison.traditional.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-red-900/30 border border-red-700/50 rounded">
                <span className="text-red-200 text-sm">{item.label}</span>
                <span className="text-red-300 font-mono font-bold text-sm">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-700/40 rounded-xl p-6">
          <div className="font-semibold text-green-300 mb-4 text-lg">✅ {productName}</div>
          <div className="space-y-3">
            {comparison.oracle.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-green-900/30 border border-green-700/50 rounded">
                <span className="text-green-200 text-sm">{item.label}</span>
                <span className="text-green-300 font-mono font-bold text-sm">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-6">
        <div className="font-semibold text-slate-200 mb-4 text-lg">📈 Quantified Impact</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impact.map((metric, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-slate-900/40 border border-slate-700/50 rounded">
              <span className="text-slate-300 text-sm">{metric.label}</span>
              <span className="text-green-400 font-bold text-sm">
                {metric.before} → {metric.after}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedComparison;


