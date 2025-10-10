'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Factory, Shield, Command } from 'lucide-react';

interface EngineShowcaseProps {
  engine: {
    id: string;
    name: string;
    description: string;
    subtext: string;
    icon: React.ComponentType<any>;
    gradientColor: string;
    metrics: Array<{
      label: string;
      value: string;
      description?: string;
    }>;
    capabilities: string[];
    keyFeatures: string[];
    businessImpact: string;
    href: string;
  };
  className?: string;
}

export default function EngineShowcase({ engine, className = '' }: EngineShowcaseProps) {
  const IconComponent = engine.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${engine.gradientColor}`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`text-2xl font-bold bg-gradient-to-r ${engine.gradientColor} bg-clip-text text-transparent mb-2`}>
            {engine.name}
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            {engine.description}
          </p>
          <p className="text-slate-500 text-sm mt-2">
            {engine.subtext}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {engine.metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-slate-600 mb-1">
              {metric.label}
            </div>
            {metric.description && (
              <div className="text-xs text-slate-500">
                {metric.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Capabilities */}
      <div className="mb-6">
        <h4 className="font-semibold text-slate-900 mb-3">Key Capabilities</h4>
        <div className="grid grid-cols-2 gap-2">
          {engine.capabilities.map((capability, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              {capability}
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="font-semibold text-slate-900 mb-3">Key Features</h4>
        <ul className="space-y-2">
          {engine.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Business Impact */}
      <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-2">Business Impact</h4>
        <p className="text-sm text-slate-600">{engine.businessImpact}</p>
      </div>

      {/* CTA */}
      <Link
        href={engine.href}
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200 group"
      >
        Explore {engine.name.split(':')[0]}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </motion.div>
  );
}




