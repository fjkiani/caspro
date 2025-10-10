import React from 'react';

interface SAEIntelligenceProps {
  data?: any;
}

const SAEIntelligence: React.FC<SAEIntelligenceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">SAE Intelligence</h3>
      <p className="text-gray-600">
        Sparse Autoencoder feature analysis for biological interpretation.
      </p>
      {data && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default SAEIntelligence;
