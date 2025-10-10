import React from 'react';

interface SPEFusionProps {
  data?: any;
}

const SPEFusion: React.FC<SPEFusionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">SPE Fusion</h3>
      <p className="text-gray-600">
        Single-cell Perturbation Effect fusion analysis for therapeutic design.
      </p>
      {data && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default SPEFusion;
