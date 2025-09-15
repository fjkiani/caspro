import React from 'react';
import type { AIEngineCard } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  engines: AIEngineCard[];
}

const AIEnginesGrid: React.FC<Props> = ({ engines }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {engines.map((e, i) => (
          <div key={i} className={`rounded-xl border p-6 bg-white`}>
            {e.icon && <div className="text-2xl mb-3">{e.icon}</div>}
            <h3 className={`font-semibold text-gray-900 ${getTextSize('text-lg')}`}>{e.name}</h3>
            <ul className={`mt-3 space-y-1 text-gray-700 ${getTextSize('text-sm')}`}>
              {e.features.map((f, j) => (
                <li key={j}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIEnginesGrid; 