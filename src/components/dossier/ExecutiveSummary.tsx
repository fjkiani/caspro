import React from 'react';

interface ExecutiveSummaryProps {
  data?: any;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-teal-600 text-lg">📋</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Unified Care Plan</h3>
          <p className="text-slate-600">Complete patient care orchestration with regulatory-ready documentation</p>
        </div>
      </div>

      {data?.carePlan && (
        <div className="space-y-6">
          {/* Patient Overview */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Patient Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {data.carePlan.patient && (
              <div><span className="font-medium">Patient:</span> {data.carePlan.patient}</div>
            )}
              {data.carePlan.diagnosis && (
                <div><span className="font-medium">Diagnosis:</span> {data.carePlan.diagnosis}</div>
              )}
              {data.carePlan.stage && (
                <div><span className="font-medium">Stage:</span> {data.carePlan.stage}</div>
              )}
              <div><span className="font-medium">Status:</span> Active Treatment</div>
            </div>
          </div>

          {/* Recommended Treatment */}
          {data.carePlan.recommendedTherapy && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">✓</span>
                </span>
                Recommended Treatment Plan
              </h4>
              <p className="text-green-700 font-medium mb-2">{data.carePlan.recommendedTherapy}</p>
              <div className="text-sm text-green-600">
                Based on molecular profile analysis and evidence-based guidelines
              </div>
            </div>
          )}

          {/* Monitoring Schedule */}
          {data.carePlan.monitoring && Object.keys(data.carePlan.monitoring).length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="text-blue-600 mr-2">📅</span>
                Monitoring Schedule
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(data.carePlan.monitoring).map(([test, schedule]) => (
                  <div key={test} className="flex justify-between">
                    <span className="text-blue-700 capitalize">{test}:</span>
                    <span className="text-blue-600 font-medium">{String(schedule)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Support */}
          {(data.carePlan.nutrition || data.carePlan.clinicalTrials || data.carePlan.nextSteps) && (
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                <span className="text-orange-600 mr-2">🤝</span>
                Integrated Support Services
              </h4>
              <div className="space-y-2 text-sm">
                {data.carePlan.nutrition && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-orange-700">{data.carePlan.nutrition}</span>
                  </div>
                )}
                {data.carePlan.clinicalTrials && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-orange-700">{data.carePlan.clinicalTrials}</span>
                  </div>
                )}
                {data.carePlan.nextSteps && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-orange-700">{data.carePlan.nextSteps}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Export Options */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
              <span className="mr-2">📄</span>
              Export Care Plan PDF
            </button>
            <button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
              <span className="mr-2">📋</span>
              Copy to EHR
            </button>
          </div>
        </div>
      )}

      {!data?.carePlan && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-slate-400 text-2xl">⏳</span>
          </div>
          <h4 className="font-semibold text-slate-800 mb-2">Care Plan Generation in Progress</h4>
          <p className="text-slate-600 text-sm">Integrating all clinical intelligence layers...</p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
