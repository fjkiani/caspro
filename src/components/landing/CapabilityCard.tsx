'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Shield, Activity, Dna, Search, Pill } from 'lucide-react';
;
import { CapabilityCard as CapabilityCardType } from '@/data/landing/landing-data';
import Link from 'next/link';

interface CapabilityCardProps {
  capability: CapabilityCardType;
  index: number;
}

const iconMap = {
  Pill,
  Search,
  Activity,
  Target,
  Dna,
  Shield
};

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, index }) => {
  const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || Activity;
  const theme = colorVariants[capability.color || 'blue'];

  return (
    <motion.div
      className={`relative overflow-hidden bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Icon */}
      <div className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${theme.bg} group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.text}`} />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
        {capability.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
        {capability.subtitle}
      </p>

      {/* KPIs */}
      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-1 gap-1 sm:gap-2">
          {capability.kpis.map((kpi, kpiIndex) => (
            <div key={kpiIndex} className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-500 font-medium">{kpi.label}:</span>
              <span className="font-bold text-gray-800">
                {typeof kpi.value === 'number' ? kpi.value.toFixed(3) : kpi.value}
                {kpi.unit && <span className="text-gray-500 ml-1">{kpi.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-1 sm:space-y-2">
        {capability.actions.map((action, actionIndex) => (
          <Link
            key={actionIndex}
            href={action.href}
            className={`group/btn flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 ${theme.bg} ${theme.text} rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-300`}
          >
            {action.label}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        ))}
      </div>

      {/* Accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent} group-hover:h-2 transition-all duration-300`}></div>
    </motion.div>
  );
};

export default CapabilityCard;
