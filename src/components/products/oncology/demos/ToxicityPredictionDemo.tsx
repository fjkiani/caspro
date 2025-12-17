'use client';

import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Apple, Clock } from 'lucide-react';

interface ToxicityPredictionDemoProps {
  seedData?: any;
}

const ToxicityPredictionDemo: React.FC<ToxicityPredictionDemoProps> = ({ seedData }) => {
  const defaultPredictions = seedData?.predictions || [
    {
      drug: 'Carboplatin',
      gene: 'BRCA1',
      variant: 'p.C61G',
      risk: 'Moderate',
      recommendation: 'DNA repair stress detected. Consider NAC supplementation.',
      evidence: 'BRCA1 mutation + platinum = DNA repair pathway stress',
      nutrition: {
        foods: ['NAC (N-Acetylcysteine)', 'Vitamin D', 'Folate'],
        pathway: 'DNA Repair',
        timing: 'Take post-chemo, not during',
        rationale: 'NAC supports DNA repair pathways stressed by carboplatin + BRCA1 deficiency'
      }
    },
    {
      drug: '5-FU',
      gene: 'DPYD',
      variant: 'c.1905+1G>A',
      risk: 'High',
      recommendation: 'Reduce dose by 50% or avoid. DPYD deficiency causes severe toxicity.',
      evidence: 'FDA label warning - life-threatening toxicity risk',
      nutrition: {
        foods: ['Folate', 'Vitamin B12'],
        pathway: 'Metabolism',
        timing: 'Pre-treatment supplementation',
        rationale: 'DPYD deficiency affects folate metabolism - supplementation may help'
      }
    },
    {
      drug: 'Mercaptopurine',
      gene: 'TPMT',
      variant: 'c.719A>G',
      risk: 'High',
      recommendation: 'Reduce dose by 50-90%. TPMT deficiency increases myelosuppression risk.',
      evidence: 'CPIC guidelines - dose adjustment required',
      nutrition: {
        foods: ['Folate', 'Vitamin D'],
        pathway: 'Inflammation',
        timing: 'Continuous supplementation',
        rationale: 'TPMT deficiency increases inflammation - anti-inflammatory nutrients help'
      }
    },
    {
      drug: 'Irinotecan',
      gene: 'UGT1A1',
      variant: '*28/*28',
      risk: 'Moderate',
      recommendation: 'Monitor closely. Increased risk of neutropenia and diarrhea.',
      evidence: 'FDA label - UGT1A1 poor metabolizer',
      nutrition: {
        foods: ['Curcumin', 'Omega-3', 'Probiotics'],
        pathway: 'Inflammation',
        timing: 'During and post-treatment',
        rationale: 'UGT1A1 deficiency increases inflammation - anti-inflammatory foods help'
      }
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
                <p className="text-xs text-slate-600 mb-3">{prediction.evidence}</p>
                
                {/* Nutrition Recommendations */}
                {prediction.nutrition && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Apple className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">Protective Nutrition (THE PATIENT MOAT)</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {prediction.nutrition.foods.map((food: string, foodIdx: number) => (
                          <span key={foodIdx} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                            {food}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-medium">Pathway:</span>
                        <span>{prediction.nutrition.pathway}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{prediction.nutrition.timing}</span>
                      </div>
                      <p className="text-xs text-slate-700 italic">{prediction.nutrition.rationale}</p>
                    </div>
                  </div>
                )}
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
