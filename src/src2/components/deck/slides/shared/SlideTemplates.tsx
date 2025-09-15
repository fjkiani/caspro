import React from 'react';
import { createStandardSlide } from './SlideComponents';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

// 🎯 PERFORMANCE SLIDE TEMPLATE
export const createPerformanceSlide = (config: {
  title: string;
  metrics: Array<{
    value: string;
    label: string;
    trend: string;
    color: string;
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    metrics?: Array<{ value: string; label: string; }>;
  }>;
  validation?: {
    cancers?: number;
    variants?: number;
    cohorts?: number;
    correlation?: number;
  };
  summary?: string;
}) => createStandardSlide({
  title: config.title,
  subtitle: "Unmatched Performance",
  gradient: "from-yellow-400 via-orange-400 to-red-400",
  backgroundComponent: <DigitalSynapseBackground />,

  metrics: config.metrics.map(m => ({
    value: m.value,
    label: m.label,
    change: m.trend,
    color: m.color,
    status: 'excellent' as const
  })),

  features: config.features,

  content: config.validation ? (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-6 rounded-xl border border-slate-600">
        {/* <h4 className="text-xl font-bold text-green-400 mb-4">Real-World Validation Results</h4> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
         
        
          
         
        </div>
      </div>

      {config.summary && (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30">
          <h4 className="text-xl font-bold text-purple-400 mb-4">Measurably Superior Performance</h4>
          <p className="text-slate-300 leading-relaxed">{config.summary}</p>
        </div>
      )}
    </div>
  ) : null
});

// 🎯 BUSINESS SLIDE TEMPLATE
export const createBusinessSlide = (config: {
  title: string;
  valueProp: string;
  metrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  opportunities: Array<{
    title: string;
    value: string;
    description: string;
  }>;
}) => createStandardSlide({
  title: config.title,
  subtitle: "Business Impact",
  gradient: "from-green-400 via-blue-400 to-purple-400",
  backgroundComponent: <DigitalSynapseBackground />,

  metrics: config.metrics.map(m => ({
    value: m.value,
    label: m.label,
    change: m.description,
    color: "green" as const
  })),

  features: config.opportunities.map(opp => ({
    icon: "💰",
    title: opp.title,
    description: opp.description,
    metrics: [{ value: opp.value, label: "Opportunity" }]
  }))
});

// 🎯 SIMPLE CONTENT SLIDE TEMPLATE
export const createContentSlide = (config: {
  title: string;
  subtitle?: string;
  gradient?: string;
  content: React.ReactNode;
}) => createStandardSlide({
  title: config.title,
  subtitle: config.subtitle || "",
  gradient: config.gradient || "from-cyan-400 to-blue-400",
  backgroundComponent: <DigitalSynapseBackground />,
  content: config.content
});


