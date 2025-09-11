'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { multipleMyelomaUseCase } from '@/data/use-cases/multiple-myeloma';
import { formatMetricValue } from '@/data/metrics';

const useCases = [
  {
    slug: 'multiple-myeloma',
    title: multipleMyelomaUseCase.title,
    description: multipleMyelomaUseCase.description,
    metrics: multipleMyelomaUseCase.specificFindings?.slice(0, 3).map(finding => ({
      title: finding.title,
      metrics: finding.metrics.slice(0, 2).map(m => 
        `${formatMetricValue(m.value.value, m.value.format, m.value.precision)} ${m.title}`
      )
    })) || []
  }
];

export default function UseCasesPage() {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Use Cases & Case Studies</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Real-world applications and validated results from our in-silico platform
            </p>
          </motion.div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/use-cases/${useCase.slug}`}>
                  <div className="relative overflow-hidden bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                      {useCase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Key Findings */}
                    <div className="space-y-4">
                      {useCase.metrics.map((finding, findingIndex) => (
                        <div key={findingIndex} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">{finding.title}</h4>
                          <div className="space-y-1">
                            {finding.metrics.map((metric, metricIndex) => (
                              <div key={metricIndex} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-gray-600">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 group-hover:h-2 transition-all duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}