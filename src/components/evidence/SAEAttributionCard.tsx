'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';

interface AttributionData {
  featureId: string;
  description: string;
  deltaLL: number;
  impact: 'high' | 'medium' | 'low';
  baseline: number;
  variant: number;
}

const mockAttributionData: AttributionData[] = [
  {
    featureId: 'f_102',
    description: 'Exon Boundary',
    deltaLL: -12.5,
    impact: 'high',
    baseline: 0.82,
    variant: 0.23
  },
  {
    featureId: 'f_211',
    description: 'TF Motif (AP-1)',
    deltaLL: -8.2,
    impact: 'high',
    baseline: 0.67,
    variant: 0.31
  },
  {
    featureId: 'f_156',
    description: 'Secondary Structure',
    deltaLL: -3.1,
    impact: 'medium',
    baseline: 0.45,
    variant: 0.38
  },
  {
    featureId: 'f_089',
    description: 'Splice Site',
    deltaLL: -1.8,
    impact: 'low',
    baseline: 0.73,
    variant: 0.65
  }
];

const impactColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-orange-600 bg-orange-50 border-orange-200',
  low: 'text-yellow-600 bg-yellow-50 border-yellow-200'
};

const impactIcons = {
  high: AlertCircle,
  medium: TrendingDown,
  low: CheckCircle
};

export const SAEAttributionCard: React.FC = () => {
  const [selectedAttribution, setSelectedAttribution] = useState<AttributionData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return 'High Impact';
      case 'medium': return 'Medium Impact';
      case 'low': return 'Low Impact';
      default: return 'Unknown';
    }
  };

  const getDeltaLLColor = (deltaLL: number) => {
    if (deltaLL <= -8) return 'text-red-600';
    if (deltaLL <= -3) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Disruption Scores (ΔLL)
          </h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">
            {mockAttributionData.length}
          </div>
          <div className="text-xs text-slate-600">Features</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {mockAttributionData.filter(a => a.impact === 'high').length}
          </div>
          <div className="text-xs text-slate-600">High Impact</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">
            {mockAttributionData.reduce((sum, a) => sum + Math.abs(a.deltaLL), 0).toFixed(1)}
          </div>
          <div className="text-xs text-slate-600">Total ΔLL</div>
        </div>
      </div>

      {/* Attribution List */}
      <div className="space-y-3">
        {mockAttributionData
          .sort((a, b) => Math.abs(b.deltaLL) - Math.abs(a.deltaLL))
          .map((attribution, index) => {
            const ImpactIcon = impactIcons[attribution.impact];
            return (
              <motion.div
                key={attribution.featureId}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedAttribution?.featureId === attribution.featureId
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'bg-white border-slate-200'
                }`}
                onClick={() => setSelectedAttribution(attribution)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${impactColors[attribution.impact]}`}>
                      <ImpactIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {attribution.description}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {getImpactLabel(attribution.impact)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getDeltaLLColor(attribution.deltaLL)}`}>
                      {attribution.deltaLL.toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-600">ΔLL</div>
                  </div>
                </div>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-slate-200"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Baseline Score:</span>
                        <span className="ml-2 font-medium">{(attribution.baseline * 100).toFixed(0)}%</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Variant Score:</span>
                        <span className="ml-2 font-medium">{(attribution.variant * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 text-sm">Impact:</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              attribution.impact === 'high' ? 'bg-red-500' :
                              attribution.impact === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${Math.min(Math.abs(attribution.deltaLL) * 8, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
      </div>

      {/* Why Line */}
      {selectedAttribution && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h4 className="font-medium text-blue-900 mb-2">Why Line:</h4>
          <p className="text-blue-800 text-sm">
            Variant disrupts {selectedAttribution.description} with a ΔLL of {selectedAttribution.deltaLL.toFixed(1)}, 
            indicating {selectedAttribution.impact} functional impact on this biological feature.
          </p>
        </motion.div>
      )}

      {/* Key Insight */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-medium text-slate-900 mb-2">Key Insight:</h4>
        <p className="text-slate-700 text-sm">
          The ΔLL (Delta Log-Likelihood) score quantifies how much a variant disrupts each biological feature. 
          Negative values indicate disruption, with more negative values showing greater impact.
        </p>
      </div>
    </motion.div>
  );
};
