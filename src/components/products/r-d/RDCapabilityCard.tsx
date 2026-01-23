'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Activity, 
  Shield, 
  Gauge, 
  BookOpen, 
  FileText,
  CheckCircle
} from 'lucide-react';
import { RDCapabilityCard } from '@/data/products/rd-capabilities-data';

interface RDCapabilityCardProps {
  capability: RDCapabilityCard;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Activity,
  Shield,
  Gauge,
  BookOpen,
  FileText,
};

const colorClasses = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    text: 'text-blue-600',
    hover: 'hover:border-blue-300'
  },
  green: {
    bg: 'from-green-50 to-green-100',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    text: 'text-green-600',
    hover: 'hover:border-green-300'
  },
  orange: {
    bg: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    text: 'text-orange-600',
    hover: 'hover:border-orange-300'
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    text: 'text-purple-600',
    hover: 'hover:border-purple-300'
  },
  teal: {
    bg: 'from-teal-50 to-teal-100',
    border: 'border-teal-200',
    iconBg: 'bg-teal-100',
    text: 'text-teal-600',
    hover: 'hover:border-teal-300'
  },
  indigo: {
    bg: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    text: 'text-indigo-600',
    hover: 'hover:border-indigo-300'
  }
};

export default function RDCapabilityCardComponent({ 
  capability, 
  isActive, 
  onClick,
  index 
}: RDCapabilityCardProps) {
  const IconComponent = iconMap[capability.icon] || Target;
  const colors = colorClasses[capability.color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-2 transition-all duration-300 text-left
        ${isActive 
          ? `${colors.border} shadow-xl ring-2 ring-offset-2 ring-blue-500` 
          : `${colors.border} hover:shadow-lg cursor-pointer`
        }
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{capability.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            capability.status === 'validated' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {capability.status === 'validated' ? '✅ Validated' : '⚠️ Framework'}
          </span>
        </div>
      </div>

      <p className="text-slate-700 mb-4 leading-relaxed">{capability.description}</p>

      <div className="space-y-2 mb-4">
        <div className="text-sm font-semibold text-slate-900">{capability.metrics.primary}</div>
        {capability.metrics.secondary && (
          <div className="text-xs text-slate-600">{capability.metrics.secondary}</div>
        )}
      </div>

      {isActive && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Active</span>
          </div>
        </div>
      )}
    </motion.button>
  );
}
