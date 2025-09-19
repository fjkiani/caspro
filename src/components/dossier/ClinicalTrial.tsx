'use client';

import React from 'react';
import { CheckCircle, Target, Award, Users, FileText, BarChart3 } from 'lucide-react';
import { ClinicalTrialMatch as ClinicalTrialData } from '@/data/dossier/types';

interface ClinicalTrialProps {
  data: ClinicalTrialData;
}

const ClinicalTrial: React.FC<ClinicalTrialProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h3>
        <p className="text-slate-600">{data.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eligibility Assessment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Eligibility Assessment
          </h4>
          
          <div className="space-y-3">
            {data.eligibility.map((criterion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700">{criterion.criterion}</span>
                </div>
                <span className="text-sm font-bold text-green-700">
                  {criterion.status}
                  {criterion.confidence && ` (${(criterion.confidence * 100).toFixed(1)}%)`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trial Recommendations */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Trial Recommendations
          </h4>
          
          <div className="space-y-3">
            {data.recommendations.map((trial, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                trial.likelihood === 'LIKELY' ? 'bg-blue-50 border-blue-200' :
                trial.likelihood === 'POTENTIAL' ? 'bg-yellow-50 border-yellow-200' :
                'bg-purple-50 border-purple-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${
                    trial.likelihood === 'LIKELY' ? 'text-blue-700' :
                    trial.likelihood === 'POTENTIAL' ? 'text-yellow-700' :
                    'text-purple-700'
                  }`}>{trial.trial}</span>
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${
                    trial.likelihood === 'LIKELY' ? 'bg-green-100 text-green-700' :
                    trial.likelihood === 'POTENTIAL' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>{trial.likelihood}</span>
                </div>
                <div className={`text-xs ${
                  trial.likelihood === 'LIKELY' ? 'text-blue-600' :
                  trial.likelihood === 'POTENTIAL' ? 'text-yellow-600' :
                  'text-purple-600'
                }`}>{trial.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Perfect Clinical Trial */}
      <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300">
        <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          {data.conclusion.title}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
          {data.conclusion.points.map((point, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-green-700 mb-2">{point}</div>
              <div className="text-sm text-green-600">
                {point === 'Smaller' && 'No need for hundreds of patients hoping for signal'}
                {point === 'Faster' && 'Targeted enrollment accelerates timeline'}
                {point === 'Cheaper' && 'Smaller trials save millions in operational costs'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-green-200 rounded-lg text-center">
          <p className="text-green-800 font-bold text-lg">
            {data.conclusion.finalVerdict}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        {data.actions.map((action, index) => (
          action.link ? (
            <a 
              key={index}
              href={action.link}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              {index === 0 && <Users className="w-4 h-4" />}
              {index === 1 && <FileText className="w-4 h-4" />}
              {index === 2 && <BarChart3 className="w-4 h-4" />}
              {action.label}
            </a>
          ) : (
            <button key={index} className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors">
              {index === 1 && <FileText className="w-4 h-4" />}
              {index === 2 && <BarChart3 className="w-4 h-4" />}
              {action.label}
            </button>
          )
        ))}
      </div>

      {/* Research Use Notice */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800 font-medium">
          <strong>Research Use Only:</strong> {data.researchUseNotice}
        </p>
      </div>
    </div>
  );
};

export default ClinicalTrial;

