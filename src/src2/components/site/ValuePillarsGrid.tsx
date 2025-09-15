import React from 'react';
import type { ValuePillar } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  pillars: ValuePillar[];
}

const ValuePillarsGrid: React.FC<Props> = ({ pillars }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
            {p.icon && <div className="text-2xl mb-2">{p.icon}</div>}
            <h3 className={`font-semibold text-gray-900 ${getTextSize('text-lg')}`}>{p.title}</h3>
            <p className={`mt-2 text-gray-600 ${getTextSize('text-sm')}`}>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuePillarsGrid; 