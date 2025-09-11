'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Target } from 'lucide-react';

interface AboutSectionProps {
  section: {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    keyPoints?: string[];
    metrics?: {
      label: string;
      value: string;
      description: string;
    }[];
    businessImpact?: string;
  };
  index: number;
}

const AboutSection: React.FC<AboutSectionProps> = ({ section, index }) => {
  const isEven = index % 2 === 0;
  const bgClass = isEven ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-blue-50';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-xl text-blue-600 font-semibold mb-6">{section.subtitle}</p>
            )}
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Key Points or Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            >
              {section.keyPoints && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Points</h3>
                  {section.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.metrics && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {section.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{metric.label}</span>
                          <span className="text-2xl font-bold text-blue-600">{metric.value}</span>
                        </div>
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Column: Business Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            >
              {section.businessImpact && (
                <div className="p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Business Impact</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{section.businessImpact}</p>
                </div>
              )}

              {/* Additional visual element */}
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-teal-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Research Use Only</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  All capabilities are designed for research purposes. Not intended for diagnostic or therapeutic decision-making without independent validation and regulatory review.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
