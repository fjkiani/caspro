import React from 'react';
import type { ComparisonData } from '../../../types/slides.js';

interface ComparisonContentProps {
  data: ComparisonData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const ComparisonContent: React.FC<ComparisonContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-6xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getItemStatusColor = (status?: string) => {
    switch (status) {
      case 'advantage':
        return 'border-green-500/30 bg-green-50';
      case 'disadvantage':
        return 'border-red-500/30 bg-red-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const getItemStatusBadge = (status?: string) => {
    switch (status) {
      case 'advantage':
        return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">✓ Advantage</span>;
      case 'disadvantage':
        return <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">✗ Limitation</span>;
      default:
        return null;
    }
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{data.title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.items.map((item, index) => (
          <div
            key={index}
            className={`
              p-6 rounded-xl border shadow-lg text-left space-y-4
              ${getItemStatusColor(item.status)}
            `}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
              {getItemStatusBadge(item.status)}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{item.description}</p>

            {/* Pros */}
            {item.pros && item.pros.length > 0 && (
              <div>
                <h5 className="font-semibold text-green-700 mb-2">Advantages:</h5>
                <ul className="space-y-1">
                  {item.pros.map((pro, proIndex) => (
                    <li key={proIndex} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {item.cons && item.cons.length > 0 && (
              <div>
                <h5 className="font-semibold text-red-700 mb-2">Limitations:</h5>
                <ul className="space-y-1">
                  {item.cons.map((con, conIndex) => (
                    <li key={conIndex} className="flex items-start text-sm">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metrics */}
            {item.metrics && Object.keys(item.metrics).length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Key Metrics:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(item.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonContent; 