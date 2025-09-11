'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Dna, TrendingUp, Shield, Activity, FileText } from 'lucide-react';
import { discriminativeMetrics, generativeMetrics, businessMetrics } from '@/data/metrics/core-metrics';
import { formatMetricValue } from '@/data/metrics';

// Generate metrics categories dynamically from existing data
const generateMetricsCategories = () => {
  const categories = [];

  // BRCA metrics
  const brcaGroup = discriminativeMetrics.find(m => m.id === 'oncology-specific');
  if (brcaGroup) {
    categories.push({
      slug: 'brca',
      title: brcaGroup.title,
      description: brcaGroup.description,
      icon: Target,
      color: 'blue',
      metrics: brcaGroup.benchmarks.slice(0, 3).map(b => 
        `${formatMetricValue(b.value.value, b.value.format, b.value.precision)} ${b.title}`
      )
    });
  }

  // SNV metrics
  const clinvarGroup = discriminativeMetrics.find(m => m.id === 'clinvar-coverage');
  if (clinvarGroup) {
    const codingSnv = clinvarGroup.benchmarks.find(b => b.title === 'Coding SNVs');
    const nonCodingSnv = clinvarGroup.benchmarks.find(b => b.title === 'Non-coding SNVs');
    
    categories.push({
      slug: 'snv',
      title: 'Single Nucleotide Variant Prediction',
      description: 'Comprehensive coverage of coding and non-coding SNVs',
      icon: Dna,
      color: 'teal',
      metrics: [
        codingSnv ? `${formatMetricValue(codingSnv.value.value, codingSnv.value.format, codingSnv.value.precision)} (Coding)` : '',
        nonCodingSnv ? `${formatMetricValue(nonCodingSnv.value.value, nonCodingSnv.value.format, nonCodingSnv.value.precision)} (Non-coding)` : '',
        'State-of-the-art performance'
      ].filter(Boolean)
    });
  }

  // Splice metrics
  const spliceGroup = discriminativeMetrics.find(m => m.id === 'splice-prediction');
  if (spliceGroup) {
    categories.push({
      slug: 'splice',
      title: spliceGroup.title,
      description: spliceGroup.description,
      icon: Activity,
      color: 'purple',
      metrics: spliceGroup.benchmarks.map(b => 
        `${formatMetricValue(b.value.value, b.value.format, b.value.precision)} ${b.title}`
      )
    });
  }

  // VUS metrics
  const vusGroup = businessMetrics.find(m => m.id === 'vus-resolution');
  if (vusGroup) {
    categories.push({
      slug: 'vus',
      title: vusGroup.title,
      description: vusGroup.description,
      icon: Shield,
      color: 'green',
      metrics: vusGroup.benchmarks.map(b => 
        `${formatMetricValue(b.value.value, b.value.format, b.value.precision)} ${b.title}`
      )
    });
  }

  // Generative AI metrics
  const genomeGroup = generativeMetrics.find(m => m.id === 'genome-generation');
  if (genomeGroup) {
    categories.push({
      slug: 'generative',
      title: 'Generative AI Performance',
      description: 'High-fidelity genome generation and epigenomic design',
      icon: FileText,
      color: 'indigo',
      metrics: genomeGroup.benchmarks.map(b => 
        `${formatMetricValue(b.value.value, b.value.format, b.value.precision)} ${b.title}`
      )
    });
  }

  // Business metrics
  categories.push({
    slug: 'business',
    title: 'Business Impact Metrics',
    description: 'Quantified value and efficiency gains',
    icon: TrendingUp,
    color: 'red',
    metrics: [
      '36x faster R&D',
      '60% time reduction', 
      'Predictable quality scaling'
    ]
  });

  return categories;
};

const metricsCategories = generateMetricsCategories();

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

export default function MetricsPage() {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Evidence & Metrics</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive performance metrics across discriminative and generative AI tasks, 
              grounded in peer-reviewed validation and transparent methodology.
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {metricsCategories.map((category, index) => {
              const IconComponent = category.icon;
              const theme = colorVariants[category.color as keyof typeof colorVariants];
              
              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/metrics/${category.slug}`}>
                    <div className={`relative overflow-hidden bg-white rounded-2xl p-8 border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-xl mb-6 ${theme.bg} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 ${theme.text}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Key Metrics */}
                      <div className="space-y-2">
                        {category.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                            <span className="text-gray-600">{metric}</span>
                          </div>
                        ))}
                      </div>

                      {/* Accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent} group-hover:h-2 transition-all duration-300`}></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
