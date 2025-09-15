import React from 'react';
import type { CTAButton } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  title: string;
  subtitle?: string;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
}

const CTABand: React.FC<Props> = ({ title, subtitle, primaryCta, secondaryCta }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className={`font-semibold ${getTextSize('text-xl')}`}>{title}</h3>
          {subtitle && <p className={`opacity-80 ${getTextSize('text-sm')}`}>{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <a href={primaryCta.href} className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} className="inline-flex items-center px-5 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10">
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABand; 