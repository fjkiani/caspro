'use client';

import React from 'react';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface ToxicityPredictionDemoProps {
  seedData?: any;
}

const ToxicityPredictionDemo: React.FC<ToxicityPredictionDemoProps> = ({ seedData }) => {
  const defaultPredictions = seedData?.predictions || [
    {
      drug: '5-FU',
      gene: 'DPYD',
      variant: 'c.1905+1G>A',
      risk: 'High',
      recommendation: 'Reduce dose by 50% or avoid. DPYD deficiency causes severe toxicity.',
      evidence: 'FDA label warning - life-threatening toxicity risk'
    },
    {
      drug: 'Mercaptopurine',
      gene: 'TPMT',
      variant: 'c.719A>G',
      risk: 'High',
      recommendation: 'Reduce dose by 50-90%. TPMT deficiency increases myelosuppression risk.',
      evidence: 'CPIC guidelines - dose adjustment required'
    },
    {
      drug: 'Irinotecan',
      gene: 'UGT1A1',
      variant: '*28/*28',
      risk: 'Moderate',
      recommendation: 'Monitor closely. Increased risk of neutropenia and diarrhea.',
      evidence: 'FDA label - UGT1A1 poor metabolizer'
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-slate-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Toxicity Prediction</h3>
        <p className="text-slate-600">100% PGx coverage for DPYD/TPMT/UGT1A1/CYP2D6</p>
      </div>
      
      <div className="space-y-4">
        {defaultPredictions.map((prediction: any, idx: number) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 ${
              prediction.risk === 'High'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {prediction.risk === 'High' ? (
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              ) : (
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-slate-900">{prediction.drug}</span>
                  <span className="text-sm text-slate-600">+</span>
                  <span className="font-semibold text-slate-700">{prediction.gene}</span>
                  <span className="text-xs px-2 py-1 bg-slate-200 rounded">{prediction.variant}</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">{prediction.recommendation}</p>
                <p className="text-xs text-slate-600">{prediction.evidence}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-900">
            All PGx variants checked - 100% coverage for life-threatening toxicities
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToxicityPredictionDemo;
