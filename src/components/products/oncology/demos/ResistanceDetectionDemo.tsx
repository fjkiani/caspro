'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';

interface ResistanceDetectionDemoProps {
  seedData?: any;
}

const ResistanceDetectionDemo: React.FC<ResistanceDetectionDemoProps> = ({ seedData }) => {
  const defaultSignals = seedData?.signals || [
    {
      marker: 'CA-125 Kinetics',
      trend: 'Rising',
      value: '45 → 67 → 89 U/mL',
      timeframe: '3 weeks',
      risk: 'High',
      interpretation: 'Exponential rise suggests treatment resistance. Consider switching therapy.',
      earlyWarning: '3-6 weeks before imaging confirmation'
    },
    {
      marker: 'ctDNA: MAPK Pathway',
      trend: 'New Mutation',
      value: 'NF1 p.R1276* detected',
      timeframe: '2 weeks',
      risk: 'High',
      interpretation: 'NF1 loss-of-function mutation suggests platinum resistance via MAPK pathway activation.',
      earlyWarning: '4 weeks before clinical progression'
    },
    {
      marker: 'DIS3 Mutation',
      trend: 'Emerging',
      value: 'DIS3 p.Q525* (VAF: 2.1%)',
      timeframe: '1 week',
      risk: 'Moderate',
      interpretation: 'DIS3 mutation associated with 2.08x mortality risk. Monitor closely.',
      earlyWarning: '5-6 weeks before treatment failure'
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-slate-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Resistance Detection</h3>
        <p className="text-slate-600">3-6 weeks earlier than imaging confirmation</p>
      </div>
      
      <div className="space-y-4">
        {defaultSignals.map((signal: any, idx: number) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 ${
              signal.risk === 'High'
                ? 'bg-red-50 border-red-200'
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {signal.trend === 'Rising' || signal.trend === 'New Mutation' ? (
                <TrendingUp className="w-5 h-5 text-red-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900">{signal.marker}</span>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3 h-3" />
                    <span>{signal.earlyWarning}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-slate-700">{signal.value}</span>
                  <span className="text-xs px-2 py-1 bg-slate-200 rounded">{signal.timeframe}</span>
                </div>
                <p className="text-sm text-slate-700 mb-1">{signal.interpretation}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${
                    signal.risk === 'High'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {signal.risk} Risk
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Validation Data Section */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-300 rounded-lg">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Validated Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1">Relative Risk</div>
            <div className="text-lg font-bold text-slate-900">1.97x</div>
            <div className="text-xs text-slate-600">MAPK/NF1 mutations</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1">Validated Patients</div>
            <div className="text-lg font-bold text-slate-900">469</div>
            <div className="text-xs text-slate-600">TCGA ovarian cancer</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1">Resistance Rates</div>
            <div className="text-sm font-semibold text-slate-900">28.6% vs 14.5%</div>
            <div className="text-xs text-slate-600">Mutated vs Wildtype</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Reference:</span> MAPK pathway mutations (KRAS, NRAS, BRAF, NF1) = 2x platinum resistance risk. 
            Validated on 469 TCGA ovarian cancer patients (RR=1.97, p&lt;0.05).
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            Early detection enables intervention 3-6 weeks before treatment failure
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResistanceDetectionDemo;
