'use client';

import React from 'react';
import { CheckCircle, Target, Clock, Shield, Search, Globe, TrendingUp } from 'lucide-react';
import MetricsShowcase, { Metric } from '../shared/MetricsShowcase';

export default function HealthcareMOATMetrics() {
  const moatMetrics: Metric[] = [
    {
      icon: CheckCircle,
      value: '73%',
      label: 'VUS Resolution',
      description: 'Uncertain → Actionable in same day',
      color: 'green',
      progress: { value: 73, max: 100 }
    },
    {
      icon: Target,
      value: '100%',
      label: 'Top-5 Drug Accuracy',
      description: 'Validated on 17 patients',
      color: 'blue'
    },
    {
      icon: Clock,
      value: '6 months',
      label: 'Early Resistance Detection',
      description: 'Before imaging confirmation',
      color: 'orange'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'PGx Coverage',
      description: 'DPYD/TPMT/UGT1A1/CYP2D6',
      color: 'purple'
    },
    {
      icon: Search,
      value: '96.6%',
      label: 'Trial Match Accuracy',
      description: 'Mechanism-based matching',
      color: 'teal'
    },
    {
      icon: Globe,
      value: 'Universal',
      label: 'Any Cancer Type',
      description: 'Not just ovarian',
      color: 'indigo'
    }
  ];

  return (
    <MetricsShowcase
      badge={{
        text: 'MOAT CAPABILITIES',
        icon: TrendingUp,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800'
      }}
      title="Transform Clinical Decision-Making"
      subtitle="Every MOAT capability validated with real-world performance metrics. Complete care plans in minutes, not months."
      metrics={moatMetrics}
      cta={{
        primary: {
          text: 'Try Complete Care Plan Demo',
          onClick: () => window.location.href = '#moat-capabilities'
        },
        secondary: {
          text: 'View MOAT Evidence',
          onClick: () => window.location.href = '/evidence'
        }
      }}
    />
  );
}


