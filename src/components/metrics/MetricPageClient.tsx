'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

import { formatMetricValue } from '@/data/metrics';
import { MetricBenchmark, MetricGroup } from '@/data/metrics/types';
import { UseCaseMetrics } from '@/data/metrics/types';

type MetricPageClientProps = {
  metricData: UseCaseMetrics;
};

const MetricBenchmarkCard: React.FC<{ benchmark: MetricBenchmark; index: number }> = ({ benchmark, index }) => {
    return (
      <motion.div
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{benchmark.title}</h3>
          {benchmark.isStateOfTheArt && (
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">SOTA</span>
          )}
        </div>
        <div className="text-4xl font-bold text-slate-900 mb-2">
          {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
        </div>
        <p className="text-slate-600 mb-4">{benchmark.description}</p>
        <div className="text-sm text-slate-500">
          <strong>Dataset:</strong> {benchmark.dataset} ({benchmark.sampleSize.toLocaleString()} samples)
        </div>
      </motion.div>
    );
};
  
const MetricGroupDisplay: React.FC<{ group: MetricGroup }> = ({ group }) => {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{group.title}</h2>
        <p className="text-slate-600 mb-6">{group.description}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.benchmarks.map((benchmark, index) => (
            <MetricBenchmarkCard key={benchmark.title} benchmark={benchmark} index={index} />
          ))}
        </div>
      </div>
    );
};

export default function MetricPageClient({ metricData }: MetricPageClientProps) {
    const allMetricGroups = [
        ...metricData.metrics.discriminative,
        ...metricData.metrics.generative,
        ...metricData.metrics.business,
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/metrics" className="text-blue-600 font-semibold mb-4 inline-block">&larr; Back to All Metrics</Link>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{metricData.title}</h1>
                    <p className="text-xl text-slate-700">{metricData.description}</p>
                </motion.div>

                {/* Core Metrics Display */}
                <div className="max-w-7xl mx-auto">
                    {allMetricGroups.map(group => (
                        <MetricGroupDisplay key={group.id} group={group} />
                    ))}
                </div>

                {/* Additional Details */}
                {(metricData.whyItMatters || metricData.delivered || metricData.howToRead) && (
                    <section className="mt-20 py-16 bg-white rounded-3xl shadow-xl border border-slate-200">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid md:grid-cols-3 gap-12">
                                {metricData.whyItMatters && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle className="text-green-500" />Why It Matters</h3>
                                        <ul className="space-y-2 text-slate-600">
                                            {metricData.whyItMatters.map(item => <li key={item}>&bull; {item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {metricData.delivered && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp className="text-blue-500" />What We Deliver</h3>
                                        <ul className="space-y-2 text-slate-600">
                                            {metricData.delivered.map(item => <li key={item}>&bull; {item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {metricData.howToRead && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="text-purple-500" />How to Read These Metrics</h3>
                                        <ul className="space-y-2 text-slate-600">
                                            {metricData.howToRead.map(item => <li key={item}>&bull; {item}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
