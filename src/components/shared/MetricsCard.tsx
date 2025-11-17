'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface MetricsCardData {
  id: string;
  title: string;
  subtitle: string;
  description?: string; // Optional description paragraph
  metrics: Array<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red' | 'orange';
  href: string;
  icon?: React.ReactNode;
}

interface MetricsCardProps {
  data: MetricsCardData;
  index: number;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', accent: 'bg-orange-500' }
};

const MetricsCard: React.FC<MetricsCardProps> = ({ data, index }) => {
  const theme = colorVariants[data.color];

  return (
    <Link href={data.href} className="block w-full">
      <motion.div
        className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 group h-full w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        {/* Title - Centered */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          {data.title}
        </h3>

        {/* Subtitle/Description - Centered */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          {data.subtitle}
        </p>

        {/* Metrics - ROI Style: Large value on top, label below - 2x2 grid, centered */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 sm:mb-12">
          {data.metrics.map((metric, metricIndex) => {
            // Cycle through colors for each metric box (green, blue, purple, orange)
            const metricColors = ['green', 'blue', 'purple', 'orange'] as const;
            const metricColor = metricColors[metricIndex % metricColors.length];
            const metricTheme = colorVariants[metricColor];
            
            return (
              <div 
                key={metricIndex} 
                className={`p-4 bg-white rounded-xl border-2 ${metricTheme.border} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`text-2xl sm:text-3xl font-bold ${metricTheme.text} mb-1`}>
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  {metric.unit && <span className="text-gray-500 ml-1 text-sm">{metric.unit}</span>}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button - Centered */}
        <div className="flex justify-center">
          <div className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 ${theme.bg} ${theme.text} rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all duration-300 group/btn`}>
            View Details
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MetricsCard;

