'use client';

import React from 'react';

interface DataFlowProps {
  variant: 'old' | 'new';
  type: 'confused' | 'connected' | 'timeline' | 'chart';
  data?: any;
}

const DataFlow: React.FC<DataFlowProps> = ({ variant, type, data }) => {
  const isOldWay = variant === 'old';
  const baseColor = isOldWay ? 'red' : 'green';
  
  const renderConfusedFlow = () => (
    <div className="space-y-3">
      <div className="flex justify-center space-x-2">
        <div className={`w-6 h-6 bg-${baseColor}-200 rounded-full`}></div>
        <div className={`w-6 h-6 bg-${baseColor}-200 rounded-full`}></div>
        <div className={`w-6 h-6 bg-${baseColor}-200 rounded-full`}></div>
      </div>
      <div className={`h-2 bg-${baseColor}-200 rounded w-3/4 mx-auto`}></div>
      <div className={`h-2 bg-${baseColor}-200 rounded w-1/2 mx-auto`}></div>
      <div className={`h-2 bg-${baseColor}-200 rounded w-2/3 mx-auto`}></div>
    </div>
  );
  
  const renderConnectedFlow = () => (
    <div className="space-y-3">
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className={`w-8 h-8 text-${baseColor}-500 mx-auto mb-2`}>
            {data?.leftIcon}
          </div>
          <div className={`w-12 h-2 bg-${baseColor}-200 rounded`}></div>
        </div>
        <div className="text-center">
          <div className={`w-8 h-8 text-${baseColor}-500 mx-auto mb-2`}>
            {data?.rightIcon}
          </div>
          <div className={`w-12 h-2 bg-${baseColor}-200 rounded`}></div>
        </div>
      </div>
      <div className={`h-1 bg-${baseColor}-300 rounded w-3/4 mx-auto`}></div>
      <div className={`h-1 bg-${baseColor}-300 rounded w-1/2 mx-auto`}></div>
    </div>
  );
  
  const renderTimeline = () => (
    <div className="space-y-3">
      <div className="flex justify-center space-x-3">
        {[1, 2, 3].map((num) => (
          <div key={num} className="text-center">
            <div className={`w-10 h-10 bg-${baseColor}-200 rounded-full flex items-center justify-center mb-2`}>
              <span className={`text-${baseColor}-600 font-bold text-sm`}>{num}</span>
            </div>
            <div className={`w-8 h-2 bg-${baseColor}-200 rounded`}></div>
          </div>
        ))}
      </div>
      <div className={`h-1 bg-${baseColor}-300 rounded w-3/4 mx-auto`}></div>
    </div>
  );
  
  const renderChart = () => (
    <div className="space-y-3">
      <div className="flex justify-center items-end space-x-2 h-16">
        {isOldWay ? (
          // Declining chart
          <>
            <div className={`w-6 h-12 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-8 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-4 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-2 bg-${baseColor}-200 rounded-t`}></div>
          </>
        ) : (
          // Sustained chart
          <>
            <div className={`w-6 h-12 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-12 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-12 bg-${baseColor}-200 rounded-t`}></div>
            <div className={`w-6 h-12 bg-${baseColor}-200 rounded-t`}></div>
          </>
        )}
      </div>
      <div className={`h-1 bg-${baseColor}-300 rounded w-3/4 mx-auto`}></div>
    </div>
  );
  
  const renderFlow = () => {
    switch (type) {
      case 'confused':
        return renderConfusedFlow();
      case 'connected':
        return renderConnectedFlow();
      case 'timeline':
        return renderTimeline();
      case 'chart':
        return renderChart();
      default:
        return renderConfusedFlow();
    }
  };
  
  return <div>{renderFlow()}</div>;
};

export default DataFlow;
