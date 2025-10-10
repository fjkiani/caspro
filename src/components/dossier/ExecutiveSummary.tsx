import React from 'react';

interface ExecutiveSummaryProps {
  data?: any;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Executive Summary</h3>
      <p className="text-gray-600">
        Comprehensive variant analysis and therapeutic design for BRCA1 pathogenic variant.
      </p>
      {data && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
