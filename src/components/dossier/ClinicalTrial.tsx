import React from 'react';

interface ClinicalTrialProps {
  data?: any;
}

const ClinicalTrial: React.FC<ClinicalTrialProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Clinical Trial</h3>
      <p className="text-gray-600">
        Clinical trial design and outcome predictions.
      </p>
      {data && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default ClinicalTrial;