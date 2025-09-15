'use client';

import React from 'react';
import EvidenceBackbone from './EvidenceBackbone';
import { discriminativeMetrics } from '@/data/metrics/core-metrics';
import { MetricBenchmark } from '@/data/metrics/types';

const EvidenceMetrics: React.FC = () => {
  // Extract a curated list of metrics to display
  const metricsToShow: MetricBenchmark[] = [
    discriminativeMetrics.find(g => g.id === 'clinvar-coverage')?.benchmarks[1], // Non-coding SNVs
    discriminativeMetrics.find(g => g.id === 'oncology-specific')?.benchmarks[1], // BRCA1 Supervised (All SNVs)
    discriminativeMetrics.find(g => g.id === 'clinvar-coverage')?.benchmarks[2], // Coding Non-SNVs
    discriminativeMetrics.find(g => g.id === 'splice-prediction')?.benchmarks[0], // Exonic Splice
  ].filter((m): m is MetricBenchmark => !!m);

  return <EvidenceBackbone metrics={metricsToShow} />;
};

export default EvidenceMetrics;
