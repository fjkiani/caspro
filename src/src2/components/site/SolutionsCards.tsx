import React from 'react';
import type { SolutionCard } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  solutions: SolutionCard[];
}

const SolutionsCards: React.FC<Props> = ({ solutions }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((s, i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-6 bg-white">
            {s.icon && <div className="text-2xl mb-3">{s.icon}</div>}
            <h3 className={`font-semibold text-gray-900 ${getTextSize('text-lg')}`}>{s.title}</h3>
            <ul className={`mt-3 space-y-1 text-gray-700 ${getTextSize('text-sm')}`}>
              {s.points.map((p, j) => (
                <li key={j}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionsCards; 