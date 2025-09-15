import React from 'react';
import type { PricingTier } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  tiers: PricingTier[];
}

const PricingTiers: React.FC<Props> = ({ tiers }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <div key={i} className={`rounded-xl border ${t.featured ? 'border-blue-500' : 'border-gray-200'} p-6 bg-white`}>
            <div className={`font-semibold text-gray-900 ${getTextSize('text-lg')}`}>{t.title}</div>
            <div className={`mt-1 text-gray-900 ${getTextSize('text-xl')}`}>{t.price}</div>
            {t.description && <div className={`mt-1 text-gray-600 ${getTextSize('text-sm')}`}>{t.description}</div>}
            <ul className={`mt-3 space-y-1 text-gray-700 ${getTextSize('text-sm')}`}>
              {t.features.map((f, j) => (<li key={j}>• {f}</li>))}
            </ul>
            <div className="mt-4">
              <a href={t.cta.href} className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                {t.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingTiers; 