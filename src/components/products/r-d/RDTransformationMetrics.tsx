'use client';

import React from 'react';
import { Target, Zap, Shield, Clock, DollarSign, CheckCircle, TrendingUp } from 'lucide-react';
import MetricsShowcase, { Metric } from '../shared/MetricsShowcase';

export default function RDTransformationMetrics() {
  const rdMetrics: Metric[] = [
    {
      icon: Target,
      value: '95.7%',
      label: 'Target Validation AUROC',
      description: 'Zero-shot variant impact prediction on ClinVar benchmark',
      color: 'blue',
      progress: { value: 95.7, max: 100 }
    },
    {
      icon: Zap,
      value: '70%',
      label: 'Functional Coherence',
      description: 'Pfam-hit rate for generated therapeutic sequences',
      color: 'purple',
      progress: { value: 70, max: 100 }
    },
    {
      icon: Shield,
      value: '95.8%',
      label: 'Structural Confidence',
      description: 'Average confidence for validated 3D structures',
      color: 'orange',
      progress: { value: 95.8, max: 100 }
    },
    {
      icon: Clock,
      value: '1 week',
      label: 'Time to First Hit',
      description: 'vs 18 months traditional approach',
      color: 'teal'
    },
    {
      icon: DollarSign,
      value: '99.8%',
      label: 'Cost Reduction',
      description: '$2.5M → $3K per target validation',
      color: 'green'
    },
    {
      icon: CheckCircle,
      value: '100%',
      label: 'Validation Pass Rate',
      description: 'On all validation benchmarks',
      color: 'indigo'
    }
  ];

  return (
    <MetricsShowcase
      badge={{
        text: 'R&D TRANSFORMATION METRICS',
        icon: TrendingUp,
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-800'
      }}
      title="Transform Drug Development Economics"
      subtitle="Every metric validated with real-world performance. De-risk development before wet lab investment with in-silico validation."
      metrics={rdMetrics}
      cta={{
        primary: {
          text: 'Try Design Demo',
          onClick: () => window.location.href = '#rd-capabilities'
        },
        secondary: {
          text: 'View R&D Platform',
          onClick: () => window.location.href = '/products/r-d'
        }
      }}
    />
  );
}


