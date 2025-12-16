import React from 'react';

interface SAEIntelligenceProps {
  data?: any;
}

const SAEIntelligence: React.FC<SAEIntelligenceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-blue-600 text-lg">🧠</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">SAE Intelligence Analysis</h3>
          <p className="text-slate-600">Sparse Autoencoder feature attribution for biological interpretation</p>
        </div>
      </div>

      {data?.biomarkers && (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 mb-3">Molecular Biomarker Analysis</h4>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.biomarkers).map(([key, value]: [string, any]) => (
              <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 uppercase">{key}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    value.status === 'TMB-High' || value.status === 'Candidate' ? 'bg-green-500' :
                    value.status === 'MSS' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="text-lg font-bold text-slate-800 mb-1">
                  {typeof value === 'object' ? value.value || value.status || value.score : value}
                </div>
                {value.confidence && (
                  <div className="text-xs text-slate-600">
                    Confidence: {(value.confidence * 100).toFixed(1)}%
                  </div>
                )}
                <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: value.confidence ? `${value.confidence * 100}%` : '85%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.resistance && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-3">Resistance Pattern Analysis</h4>
          <div className="space-y-3">
            {Object.entries(data.resistance).map(([gene, info]: [string, any]) => (
              <div key={gene} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🧬</span>
                  <div>
                    <div className="font-medium text-slate-800">{gene.toUpperCase()}</div>
                    <div className="text-sm text-slate-600">
                      {info.mutation} → {info.resistance || info.pathway || 'Analyzed'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-red-700">
                    {info.sensitivity ? `${info.sensitivity}% sensitivity` : 'Resistance detected'}
                  </div>
                  {info.confidence && (
                    <div className="text-xs text-slate-600">
                      {(info.confidence * 100).toFixed(1)}% confidence
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.dataProcessed && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-3">Data Processing Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{data.dataProcessed.ngsFiles}</div>
              <div className="text-sm text-green-700">NGS Files</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{data.dataProcessed.clinicalNotes}</div>
              <div className="text-sm text-blue-700">Clinical Notes</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{data.dataProcessed.pathologyReports}</div>
              <div className="text-sm text-purple-700">Pathology Reports</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SAEIntelligence;
