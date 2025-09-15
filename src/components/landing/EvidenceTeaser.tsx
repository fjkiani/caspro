'use client';

import React from 'react';
import EvidenceBackbone from '../insilico/EvidenceBackbone/EvidenceBackbone';
import { discriminativeMetrics, businessMetrics } from '@/data/metrics/core-metrics';
import { MetricBenchmark } from '@/data/metrics/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const EvidenceTeaser: React.FC = () => {
  const metricsToShow: MetricBenchmark[] = [
    discriminativeMetrics.find(g => g.id === 'oncology-specific')?.benchmarks.find(b => b.slug === 'brca1-supervised-all'),
    businessMetrics.find(g => g.id === 'vus-resolution')?.benchmarks.find(b => b.slug === 'vus-resolution-rate'),
    discriminativeMetrics.find(g => g.id === 'clinvar-coverage')?.benchmarks.find(b => b.slug === 'non-coding-snv'),
  ].filter((m): m is MetricBenchmark => !!m);

  return (
    <div className="relative">
      <EvidenceBackbone 
        metrics={metricsToShow}
        title="The Evidence"
        description="Our in-silico research framework is grounded in peer-reviewed validation and transparent methodology. Explore some of our key performance benchmarks."
        showDisclaimer={false} 
      />
      <div className="absolute bottom-8 right-8">
        <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg position-center">
          Explore the Full Story <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default EvidenceTeaser;
