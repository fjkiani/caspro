'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';

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
    <section className={`py-12 sm:py-16 lg:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-4 sm:mb-6">{section.subtitle}</p>
            )}
            <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
              {section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left Column: Key Points or Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            >
              {section.keyPoints && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Key Points</h3>
                  {section.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.metrics && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {section.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm sm:text-base font-semibold text-gray-800">{metric.label}</span>
                          <span className="text-xl sm:text-2xl font-bold text-blue-600">{metric.value}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{metric.description}</p>
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
                <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Business Impact</h3>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{section.businessImpact}</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
