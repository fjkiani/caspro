import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { metricsRegistry } from '@/data/metrics/registry';
import MetricPageClient from '@/components/metrics/MetricPageClient';

type MetricPageParams = {
  params: {
    metricSlug: string;
  };
};

export async function generateMetadata({ params }: MetricPageParams): Promise<Metadata> {
  const metricData = metricsRegistry[params.metricSlug];

  if (!metricData) {
    return {
      title: 'Metric Not Found'
    };
  }

  return {
    title: `${metricData.title} | CrisPRO.ai Metrics`,
    description: metricData.description,
  };
}

export default function MetricDetailPage({ params }: MetricPageParams) {
  const { metricSlug } = params;
  const metricData = metricsRegistry[metricSlug];

  if (!metricData) {
    notFound();
  }

  return <MetricPageClient metricData={metricData} />;
}
