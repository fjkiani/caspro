'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  technical?: string;
  scientific?: string;
  business?: string;
  features?: string[];
  index?: number;
  className?: string;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  title,
  description,
  icon: IconComponent,
  color = 'blue',
  technical,
  scientific,
  business,
  features = [],
  index = 0,
  className = ''
}) => {
  const theme = colorVariants[color];

  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 border-2 ${theme.border} shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${theme.bg}`}>
          <IconComponent className={`w-8 h-8 ${theme.text}`} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      
      {(technical || scientific || business) && (
        <div className="space-y-4 mb-6">
          {technical && (
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Technical:</h5>
              <p className="text-sm text-gray-600">{technical}</p>
            </div>
          )}
          {scientific && (
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Scientific:</h5>
              <p className="text-sm text-gray-600">{scientific}</p>
            </div>
          )}
          {business && (
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Business:</h5>
              <p className="text-sm text-gray-600">{business}</p>
            </div>
          )}
        </div>
      )}
      
      {features.length > 0 && (
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">Features:</h5>
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CapabilityCard;
