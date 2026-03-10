'use client';

import React from 'react';
import { Target, Clock, DollarSign, TrendingUp, Shield, Zap, TrendingDown } from 'lucide-react';
import MetricsShowcase, { Metric } from '../shared/MetricsShowcase';

export default function BiotechTransformationMetrics() {
  const biotechMetrics: Metric[] = [
    {
      icon: Clock,
      value: '72x',
      label: 'Target Validation Speed',
      description: '18 months → 1 week acceleration',
      color: 'blue',
      progress: { value: 72, max: 100 }
    },
    {
      icon: DollarSign,
      value: '99.8%',
      label: 'Cost Reduction',
      description: '$2.5M → $3K per target validation',
      color: 'green',
      progress: { value: 99.8, max: 100 }
    },
    {
      icon: TrendingUp,
      value: '6x',
      label: 'Success Rate Improvement',
      description: '15% → 90% validated targets',
      color: 'purple',
      progress: { value: 90, max: 100 }
    },
    {
      icon: TrendingDown,
      value: '88%',
      label: 'False Discovery Reduction',
      description: '85% → 10% false positives',
      color: 'orange',
      progress: { value: 88, max: 100 }
    },
    {
      icon: Target,
      value: '95.7%',
      label: 'Target Validation AUROC',
      description: 'Zero-shot variant impact prediction',
      color: 'teal',
      progress: { value: 95.7, max: 100 }
    },
    {
      icon: Shield,
      value: '73%',
      label: 'Variant Success Rate',
      description: 'vs 5% industry average',
      color: 'indigo',
      progress: { value: 73, max: 100 }
    }
  ];

  return (
    <MetricsShowcase
      badge={{
        text: 'BIOTECH TRANSFORMATION METRICS',
        icon: TrendingUp,
        bgColor: 'bg-cyan-100',
        textColor: 'text-cyan-800'
      }}
      title="Transform Drug Development Economics"
      subtitle="Every metric validated with real-world biotech R&D performance. De-risk development before wet lab investment with in-silico validation."
      metrics={biotechMetrics}
      cta={{
        primary: {
          text: 'Try R&D Demo',
          onClick: () => window.location.href = '#biotech-capabilities'
        },
        secondary: {
          text: 'View Biotech Platform',
          onClick: () => window.location.href = '/products/research'
        }
      }}
    />
  );
}


