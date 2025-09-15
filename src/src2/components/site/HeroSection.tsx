import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import type { CTAButton, TrustBadge } from '../../types/site';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
  badges?: TrustBadge[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, primaryCta, secondaryCta, badges = [] }) => {
  const { getTextSize } = useAccessibility();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className={`font-extrabold text-gray-900 ${getTextSize('text-4xl')}`}>{title}</h1>
        <p className={`mt-4 text-gray-600 ${getTextSize('text-xl')}`}>{subtitle}</p>
        <div className="mt-8 flex items-center gap-3">
          <a href={primaryCta.href} className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} className="inline-flex items-center px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              {secondaryCta.label}
            </a>
          )}
        </div>
        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                {b.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection; 