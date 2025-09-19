'use client';

import React from 'react';
import { Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { ExecutiveSummary as ExecutiveSummaryData } from '@/data/dossier/types';

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryData;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Evidence 1: Catastrophic Functional Error */}
        <div className="bg-white p-6 rounded-xl border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h4 className="font-bold text-red-800 text-lg">Evidence 1: Catastrophic Functional Error</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Pathogenicity Verdict</span>
              <span className="text-xl font-bold text-red-700">{data.catastrophicError.verdict}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Confidence (ClinVar AUROC)</span>
              <span className="text-xl font-bold text-red-700">{(data.catastrophicError.confidence * 100).toFixed(1)}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Delta Log-Likelihood</span>
              <span className="text-xl font-bold text-red-700">
                {data.catastrophicError.deltaLogLikelihood}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800 font-medium">
              <strong>{data.catastrophicError.api}</strong> {data.catastrophicError.evidence}
            </p>
          </div>
        </div>

        {/* Evidence 2: Critical Dependency */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h4 className="font-bold text-green-800 text-lg">Evidence 2: Critical Dependency</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Gene Essentiality</span>
              <span className="text-xl font-bold text-green-700">{data.criticalDependency.geneEssentiality}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Synthetic Lethality</span>
              <span className="text-xl font-bold text-green-700">{data.criticalDependency.syntheticLethality ? 'Confirmed' : 'Negative'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">DepMap Correlation</span>
              <span className="text-xl font-bold text-green-700">{data.criticalDependency.depMapCorrelation}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              <strong>{data.criticalDependency.api}</strong> {data.criticalDependency.evidence}
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Conclusion */}
      <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border-2 border-purple-300">
        <h4 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          {data.conclusion.title}
        </h4>
        <p className="text-purple-800 font-medium">
            {data.conclusion.details}
        </p>
      </div>
    </div>
  );
}

export default ExecutiveSummary;

