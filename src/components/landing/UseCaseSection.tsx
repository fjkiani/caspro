'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { multipleMyelomaUseCase } from '@/data/use-cases/multiple-myeloma';
import { formatMetricValue } from '@/data/metrics';

const UseCaseSection: React.FC = () => {
  const mmFindings = multipleMyelomaUseCase.specificFindings?.slice(0, 3) || [];
  const mmCapabilities = Object.entries(multipleMyelomaUseCase.metrics).slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Real Results: Multiple Myeloma</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            See how our platform transforms complex genomic data into actionable therapeutic guidance
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-lg font-semibold">
            <Target className="w-5 h-5" />
            Research Use Only - Validated Results
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Key Findings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Key Findings</h3>
            <div className="space-y-6">
              {mmFindings.map((finding, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">{finding.title}</h4>
                  <p className="text-gray-600 mb-4">{finding.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {finding.metrics.slice(0, 2).map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">{metric.title}</span>
                        <span className="text-lg font-bold text-blue-600">
                          {formatMetricValue(metric.value.value, metric.value.format, metric.value.precision)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Capabilities & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Performance Metrics</h3>
            <div className="space-y-6">
              {mmCapabilities.map(([category, metricGroups], index) => (
                <div key={category} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                    {category.replace('-', ' ')} AI
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {metricGroups.slice(0, 2).map((group, groupIndex) => 
                      group.benchmarks.slice(0, 1).map((benchmark, benchmarkIndex) => (
                        <div key={`${groupIndex}-${benchmarkIndex}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700 font-medium">{benchmark.title}</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/use-cases/multiple-myeloma"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <TrendingUp className="w-5 h-5" />
                View Full Case Study
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: Key Capabilities */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="inline-flex p-3 bg-blue-50 rounded-xl mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">VUS Explorer</h4>
              <p className="text-gray-600 text-sm">Four clear chips: Function, Regulatory, Essentiality, Chromatin</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="inline-flex p-3 bg-teal-50 rounded-xl mb-4">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Therapy Fit</h4>
              <p className="text-gray-600 text-sm">Ranked drug classes with confidence scores and rationale</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="inline-flex p-3 bg-green-50 rounded-xl mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Trials Co-Pilot</h4>
              <p className="text-gray-600 text-sm">50+ trials → 5-12 relevant with clear eligibility</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCaseSection;
