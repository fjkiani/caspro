'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { brcaMetrics, brcaOverview } from '@/data/metrics/brca-metrics';
import { codingSnvMetrics, nonCodingSnvMetrics, snvOverview } from '@/data/metrics/snv-metrics';
import { spliceMetrics, spliceOverview } from '@/data/metrics/splice-metrics';
import { vusMetrics, vusOverview } from '@/data/metrics/vus-metrics';
import MetricCard from '@/components/metrics/MetricCard';

interface MetricPageProps {
  params: {
    metricSlug: string;
  };
}

const metricData = {
  'brca': {
    metrics: [brcaMetrics],
    overview: brcaOverview
  },
  'snv': {
    metrics: [codingSnvMetrics, nonCodingSnvMetrics],
    overview: snvOverview
  },
  'splice': {
    metrics: [spliceMetrics],
    overview: spliceOverview
  },
  'vus': {
    metrics: [vusMetrics],
    overview: vusOverview
  }
};

export default function MetricPage({ params }: MetricPageProps) {
  const { metricSlug } = params;
  const data = metricData[metricSlug as keyof typeof metricData];

  if (!data) {
    notFound();
  }

  const { metrics, overview } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{overview.title}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              {overview.subtitle}
            </p>
            <p className="text-lg text-gray-700 max-w-5xl mx-auto">
              {overview.description}
            </p>
          </motion.div>

          {/* Key Concepts */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {overview.keyConcepts.map((concept, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full mb-4"></div>
                  <p className="text-gray-700 font-medium">{concept}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Clinical Significance */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Clinical Significance</h3>
              <p className="text-gray-700 leading-relaxed">{overview.clinicalSignificance}</p>
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Methodology</h3>
              <p className="text-gray-700 leading-relaxed">{overview.methodology}</p>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {metrics.map((metricGroup) => 
                metricGroup.benchmarks.map((benchmark, index) => (
                  <MetricCard
                    key={`${benchmark.title}-${index}`}
                    metric={benchmark}
                    index={index}
                  />
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
