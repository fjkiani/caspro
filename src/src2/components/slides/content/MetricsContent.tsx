import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MetricsData } from '../../../types/slides.js';

interface MetricsContentProps {
  data: MetricsData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const MetricsContent: React.FC<MetricsContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-4xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getGridClass = () => {
    switch (data.layout) {
      case 'list':
        return 'space-y-4';
      case 'dashboard':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'good':
        return 'border-green-500 bg-green-50 text-green-900';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900';
      case 'danger':
        return 'border-red-500 bg-red-50 text-red-900';
      default:
        return 'border-gray-300 bg-white text-gray-900';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'stable':
        return <Minus className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const renderMetric = (metric: any, index: number) => {
    if (data.layout === 'list') {
      return (
        <div
          key={index}
          className={`
            flex items-center justify-between p-4 rounded-lg border
            ${getStatusColor(metric.status)}
          `}
        >
          <div className="flex-1">
            <h4 className="font-semibold">{metric.label}</h4>
            {metric.description && (
              <p className="text-sm opacity-75 mt-1">{metric.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {metric.value}
              {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
            </span>
            {getTrendIcon(metric.trend)}
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className={`
          p-6 rounded-lg border text-center
          ${getStatusColor(metric.status)}
        `}
      >
        <div className="flex items-center justify-center mb-2">
          <h4 className="font-semibold text-lg">{metric.label}</h4>
          {getTrendIcon(metric.trend) && (
            <div className="ml-2">{getTrendIcon(metric.trend)}</div>
          )}
        </div>
        <div className="text-3xl font-bold mb-2">
          {metric.value}
          {metric.unit && <span className="text-lg ml-1">{metric.unit}</span>}
        </div>
        {metric.description && (
          <p className="text-sm opacity-75">{metric.description}</p>
        )}
      </div>
    );
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{data.title}</h3>
      )}
      
      <div className={getGridClass()}>
        {data.metrics.map((metric, index) => renderMetric(metric, index))}
      </div>
    </div>
  );
};

export default MetricsContent; 