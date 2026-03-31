'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ExternalLink } from 'lucide-react';

interface CapabilityPreviewProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  previewType: 'demo' | 'interactive' | 'static';
  metrics?: Array<{
    label: string;
    value: string;
    category: 'validation' | 'technical' | 'estimated';
  }>;
  features?: string[];
  status: 'live' | 'roadmap';
  color: string;
  bgColor: string;
  onPreview?: () => void;
}

export const CapabilityPreview: React.FC<CapabilityPreviewProps> = ({
  title,
  description,
  icon,
  href,
  previewType,
  metrics = [],
  features = [],
  status,
  color,
  bgColor,
  onPreview
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'live' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-orange-100 text-orange-700 border-orange-200';
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'validation': return '✓';
      case 'technical': return '⚡';
      case 'estimated': return '📊';
      default: return '•';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${bgColor}`} />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
              {status.toUpperCase()}
            </span>
            {previewType === 'interactive' && (
              <button
                onClick={onPreview}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                title="Preview"
              >
                <Play className="w-4 h-4 text-slate-600" />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="relative z-10 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {metrics.slice(0, 3).map((metric, index) => (
              <div key={index} className="text-center p-2 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">{getMetricIcon(metric.category)}</div>
                <div className="text-sm font-medium text-slate-900">{metric.value}</div>
                <div className="text-xs text-slate-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div className="relative z-10 mb-4">
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                +{features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="relative z-10 flex items-center justify-between">
        <a
          to={href}
          className={`flex items-center gap-2 text-sm font-medium ${color} hover:opacity-80 transition-opacity`}
        >
          Explore {title}
          <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
        </a>
        {previewType === 'demo' && (
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Play className="w-3 h-3" />
            Live Demo
          </span>
        )}
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};
