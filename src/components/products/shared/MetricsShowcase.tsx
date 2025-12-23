'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface Metric {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'teal' | 'orange' | 'indigo' | 'red' | 'yellow';
  progress?: {
    value: number;
    max?: number;
  };
}

export interface MetricsShowcaseProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
    bgColor?: string;
    textColor?: string;
  };
  title: string;
  subtitle?: string;
  metrics: Metric[];
  cta?: {
    primary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

export default function MetricsShowcase({
  badge,
  title,
  subtitle,
  metrics,
  cta,
  className = ''
}: MetricsShowcaseProps) {
  const BadgeIcon = badge?.icon;

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 ${badge.bgColor || 'bg-purple-100'} ${badge.textColor || 'text-purple-800'} px-4 py-2 rounded-full text-sm font-semibold mb-6`}
            >
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              {badge.text}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const colorClasses = {
              blue: { bg: 'from-blue-50 to-white', border: 'border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', valueColor: 'text-blue-600', hover: 'hover:bg-blue-200' },
              purple: { bg: 'from-purple-50 to-white', border: 'border-purple-100', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', valueColor: 'text-purple-600', hover: 'hover:bg-purple-200' },
              green: { bg: 'from-green-50 to-white', border: 'border-green-100', iconBg: 'bg-green-100', iconColor: 'text-green-600', valueColor: 'text-green-600', hover: 'hover:bg-green-200' },
              teal: { bg: 'from-teal-50 to-white', border: 'border-teal-100', iconBg: 'bg-teal-100', iconColor: 'text-teal-600', valueColor: 'text-teal-600', hover: 'hover:bg-teal-200' },
              orange: { bg: 'from-orange-50 to-white', border: 'border-orange-100', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', valueColor: 'text-orange-600', hover: 'hover:bg-orange-200' },
              indigo: { bg: 'from-indigo-50 to-white', border: 'border-indigo-100', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', valueColor: 'text-indigo-600', hover: 'hover:bg-indigo-200' },
              red: { bg: 'from-red-50 to-white', border: 'border-red-100', iconBg: 'bg-red-100', iconColor: 'text-red-600', valueColor: 'text-red-600', hover: 'hover:bg-red-200' },
              yellow: { bg: 'from-yellow-50 to-white', border: 'border-yellow-100', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', valueColor: 'text-yellow-600', hover: 'hover:bg-yellow-200' },
            };
            const colors = colorClasses[metric.color];

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className={`bg-gradient-to-br ${colors.bg} p-8 rounded-2xl shadow-lg border ${colors.border} hover:shadow-xl transition-all duration-300 group`}
              >
                <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:${colors.hover} transition-colors`}>
                  <Icon className={`w-8 h-8 ${colors.iconColor}`} />
                </div>

                <div className="mb-4">
                  <div className={`text-3xl font-bold ${colors.valueColor} mb-2`}>
                    {metric.value}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Progress indicator */}
                {metric.progress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>{metric.label}</span>
                      <span>{metric.progress.value}{metric.progress.max ? `/${metric.progress.max}` : '%'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.progress.value / (metric.progress.max || 100)) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-1000`}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        {cta && (cta.primary || cta.secondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            {subtitle && (
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta.primary && (
                <button
                  onClick={cta.primary.onClick}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {cta.primary.text}
                </button>
              )}
              {cta.secondary && (
                <button
                  onClick={cta.secondary.onClick}
                  className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
                >
                  {cta.secondary.text}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}


