'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface DemoConfig {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  primaryColor: string;
  accentColor: string;
}

export interface BaseInteractiveDemoProps {
  config: DemoConfig;
  children: ReactNode;
  className?: string;
  educationalContent?: {
    title: string;
    points: string[];
  };
}

const BaseInteractiveDemo: React.FC<BaseInteractiveDemoProps> = ({
  config,
  children,
  className = '',
  educationalContent
}) => {
  const { title, subtitle, icon: Icon, iconColor, primaryColor, accentColor } = config;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-white rounded-xl p-6 shadow-lg border border-slate-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${primaryColor} rounded-lg`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Educational Footer */}
      {educationalContent && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="font-medium text-slate-900 mb-2">{educationalContent.title}</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            {educationalContent.points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

// Predefined color schemes for consistency
export const demoColorSchemes = {
  blue: {
    primaryColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    accentColor: 'blue'
  },
  green: {
    primaryColor: 'bg-green-100',
    iconColor: 'text-green-600',
    accentColor: 'green'
  },
  orange: {
    primaryColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    accentColor: 'orange'
  },
  purple: {
    primaryColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    accentColor: 'purple'
  },
  red: {
    primaryColor: 'bg-red-100',
    iconColor: 'text-red-600',
    accentColor: 'red'
  }
};

// Reusable progress bar component
export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'red' | 'orange' | 'purple';
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  delay?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 1,
  color = 'blue',
  label,
  showPercentage = true,
  animated = true,
  delay = 0
}) => {
  const percentage = (value / max) * 100;
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  };

  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-medium">{percentage.toFixed(1)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-3">
        <motion.div
          className={`h-3 rounded-full ${colorClasses[color]}`}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, delay }}
        />
      </div>
    </div>
  );
};

// Reusable prediction badge component
export interface PredictionBadgeProps {
  prediction: string;
  type?: 'pathogenic' | 'benign' | 'disrupts' | 'normal' | 'positive' | 'negative';
  confidence?: number;
  icon?: LucideIcon;
}

export const PredictionBadge: React.FC<PredictionBadgeProps> = ({
  prediction,
  type,
  confidence,
  icon: Icon
}) => {
  const getColors = (predictionType: string) => {
    switch (predictionType) {
      case 'pathogenic':
      case 'disrupts':
      case 'positive':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'benign':
      case 'normal':
      case 'negative':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getColors(type || prediction)}`}>
      <div className="flex items-center gap-1">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{prediction.charAt(0).toUpperCase() + prediction.slice(1)}</span>
        {confidence && <span className="text-xs ml-1">({(confidence * 100).toFixed(0)}%)</span>}
      </div>
    </div>
  );
};

// Reusable analysis loading component
export interface AnalysisLoadingProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'orange' | 'purple';
  duration?: number;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  title,
  subtitle,
  icon: Icon,
  color = 'blue',
  duration = 2
}) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', subtitle: 'text-blue-700', progress: 'bg-blue-600', progressBg: 'bg-blue-200', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', subtitle: 'text-green-700', progress: 'bg-green-600', progressBg: 'bg-green-200', icon: 'text-green-600' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', subtitle: 'text-orange-700', progress: 'bg-orange-600', progressBg: 'bg-orange-200', icon: 'text-orange-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', subtitle: 'text-purple-700', progress: 'bg-purple-600', progressBg: 'bg-purple-200', icon: 'text-purple-600' }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </motion.div>
        <div>
          <div className={`font-medium ${colors.text}`}>{title}</div>
          <div className={`text-sm ${colors.subtitle}`}>{subtitle}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className={`w-full ${colors.progressBg} rounded-full h-2`}>
          <motion.div
            className={`${colors.progress} h-2 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BaseInteractiveDemo;
