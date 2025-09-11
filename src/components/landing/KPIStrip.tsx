'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Shield } from 'lucide-react';
import { KPIMetric } from '@/data/landing/landing-data';

interface KPIStripProps {
  kpis: KPIMetric[];
}

const iconMap = {
  AUROC: Target,
  'Splice AUROC': TrendingUp,
  VUS: Shield
};

const KPIStrip: React.FC<KPIStripProps> = ({ kpis }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-8 py-6 px-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {kpis.map((kpi, index) => {
        const IconComponent = iconMap[kpi.label as keyof typeof iconMap] || Target;
        
        return (
          <motion.div
            key={kpi.label}
            className="flex items-center gap-3 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          >
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <IconComponent className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {typeof kpi.value === 'number' ? kpi.value.toFixed(3) : kpi.value}
                {kpi.unit && <span className="text-lg text-gray-600 ml-1">{kpi.unit}</span>}
              </div>
              <div className="text-sm text-gray-600 font-medium">{kpi.label}</div>
              {kpi.tooltip && (
                <div className="text-xs text-gray-500 mt-1 max-w-32">
                  {kpi.tooltip}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KPIStrip;
