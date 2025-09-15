import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  identityTitle: string;
  identityText: string;
  assetTitle: string;
  assetText: string;
}

const TwoLayerArchitectureVisual: React.FC<Props> = ({ identityTitle, identityText, assetTitle, assetText }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-orange-200 rounded-xl p-6 bg-orange-50">
          <div className={`text-orange-600 font-semibold ${getTextSize('text-base')}`}>{identityTitle}</div>
          <p className={`mt-2 text-gray-700 ${getTextSize('text-sm')}`}>{identityText}</p>
        </div>
        <div className="border border-cyan-200 rounded-xl p-6 bg-cyan-50">
          <div className={`text-cyan-600 font-semibold ${getTextSize('text-base')}`}>{assetTitle}</div>
          <p className={`mt-2 text-gray-700 ${getTextSize('text-sm')}`}>{assetText}</p>
        </div>
      </div>
    </section>
  );
};

export default TwoLayerArchitectureVisual; 