import React from 'react';
import type { DeploymentModel } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  models: DeploymentModel[];
}

const DeploymentModels: React.FC<Props> = ({ models }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {models.map((m, i) => (
          <div key={i} className={`rounded-xl border p-6 bg-white`}>
            {m.icon && <div className="text-3xl mb-2">{m.icon}</div>}
            <h3 className={`font-semibold text-gray-900 ${getTextSize('text-lg')}`}>{m.title}</h3>
            <ul className={`mt-3 space-y-1 text-gray-700 ${getTextSize('text-sm')}`}>
              {m.features.map((f, j) => (<li key={j}>• {f}</li>))}
            </ul>
            <div className="mt-4 border-t pt-3">
              <div className={`font-medium text-gray-900 ${getTextSize('text-sm')}`}>{m.pricing}</div>
              <div className={`text-gray-600 ${getTextSize('text-sm')}`}>{m.ideal}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeploymentModels; 