'use client';

import React from 'react';
import { useAccessibilityFallback } from '@/hooks/useAccessibilityFallback';

interface AIEngineCard {
  name: string;
  features: string[];
  icon?: React.ReactNode;
}

interface AIEnginesGridProps {
  engines: AIEngineCard[];
  className?: string;
}

const AIEnginesGrid: React.FC<AIEnginesGridProps> = ({ engines, className = '' }) => {
  const { getTextSize } = useAccessibilityFallback();
  
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engines.map((e, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-6 bg-white hover:shadow-lg transition-shadow">
            {e.icon && <div className="text-2xl mb-3">{e.icon}</div>}
            <h3 className={`font-semibold text-slate-900 ${getTextSize('text-lg')} mb-3`}>{e.name}</h3>
            <ul className={`mt-3 space-y-1 text-slate-700 ${getTextSize('text-sm')}`}>
              {e.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIEnginesGrid;

