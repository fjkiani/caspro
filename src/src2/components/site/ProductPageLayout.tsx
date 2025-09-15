import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface ProductHeroProps {
  title: string;
  subtitle: string;
  badge?: {
    icon: string;
    text: string;
    color: string;
  };
  metrics?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  contextTags?: string[];
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

interface ProductPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ 
  title, 
  subtitle, 
  badge, 
  metrics, 
  contextTags 
}) => {
  const { getTextSize } = useAccessibility();

  return (
    <section className="text-center space-y-12 py-8">
      <div className="space-y-8">
        {badge && (
          <div className={`inline-flex items-center gap-4 px-6 py-3 bg-${badge.color}-900/40 border border-${badge.color}-600/60 rounded-full`}>
            <span className={getTextSize('text-3xl')}>{badge.icon}</span>
            <span className={`text-${badge.color}-200 font-semibold ${getTextSize('text-xl')}`}>{badge.text}</span>
          </div>
        )}
        
        <h1 className={`font-bold text-white ${getTextSize('text-7xl')}`}>{title}</h1>
        <p className={`text-slate-200 max-w-5xl mx-auto leading-relaxed font-medium ${getTextSize('text-3xl')}`}>
          {subtitle}
        </p>
      </div>
      
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className={`font-black text-cyan-400 mb-2 ${getTextSize('text-5xl')}`}>{metric.value}</div>
              <div className={`text-cyan-200 font-semibold mb-2 ${getTextSize('text-xl')}`}>{metric.label}</div>
              <div className={`text-slate-300 ${getTextSize('text-base')}`}>{metric.description}</div>
            </div>
          ))}
        </div>
      )}

      {contextTags && (
        <div className="flex flex-wrap justify-center gap-4">
          {contextTags.map((context, i) => (
            <span key={i} className={`px-6 py-3 bg-slate-800 border border-slate-600 rounded-full font-semibold text-slate-200 ${getTextSize('text-lg')}`}>
              {context}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = "" 
}) => {
  const { getTextSize } = useAccessibility();

  return (
    <section className={`space-y-12 py-8 ${className}`}>
      <div className="text-center space-y-6">
        <h2 className={`font-bold text-white ${getTextSize('text-5xl')}`}>{title}</h2>
        {subtitle && (
          <p className={`text-slate-200 max-w-5xl mx-auto leading-relaxed font-medium ${getTextSize('text-2xl')}`}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

export const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {children}
      </div>
    </div>
  );
};

export default ProductPageLayout; 