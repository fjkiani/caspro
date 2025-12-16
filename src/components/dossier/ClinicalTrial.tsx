import React from 'react';

interface ClinicalTrialProps {
  data?: any;
}

const ClinicalTrial: React.FC<ClinicalTrialProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-purple-600 text-lg">🔬</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Clinical Trial Intelligence</h3>
          <p className="text-slate-600">AI-powered trial matching with mechanism-based eligibility</p>
        </div>
      </div>

      {data?.trials && (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 mb-3">Matched Clinical Trials</h4>
          {data.trials.map((trial: any, index: number) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-2">
                      {trial.nct}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      trial.status === 'Recruiting' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trial.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">{trial.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">High-fit DDR deficient ovarian carcinoma trial</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {Math.round(trial.fit * 100)}%
                  </div>
                  <div className="text-xs text-slate-600">Mechanism Fit</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <span className="mr-4">📍 Within 50 miles</span>
                  <span>⚡ Phase 2</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.summary && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-3">Trial Matching Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xl font-bold text-slate-800">{data.summary.totalMatches}</div>
              <div className="text-xs text-slate-600">Total Matches</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl font-bold text-green-600">{data.summary.highFit}</div>
              <div className="text-xs text-green-700">High Fit (90%+)</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-bold text-blue-600">{data.summary.within50Miles}</div>
              <div className="text-xs text-blue-700">Within 50 Miles</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-xl font-bold text-purple-600">
                {data.trials?.filter((t: any) => t.status === 'Recruiting').length || 0}
              </div>
              <div className="text-xs text-purple-700">Actively Recruiting</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalTrial;