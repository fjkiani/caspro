'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface EvidenceBadgeProps {
  tier: string;
  confidence: number;
  category: string;
  title: string;
  description: string;
  citations: number;
  lastUpdated: string;
  index?: number;
  className?: string;
}

const getTierColor = (tier: string) => {
  if (!tier) {
    return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' };
  }
  
  const tierLower = tier.toLowerCase();
  if (tierLower.includes('tier 1') || tierLower.includes('1')) {
    return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', badge: 'bg-green-100 text-green-700' };
  }
  if (tierLower.includes('tier 2') || tierLower.includes('2')) {
    return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' };
  }
  if (tierLower.includes('tier 3') || tierLower.includes('3')) {
    return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' };
  }
  
  // Default fallback
  return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' };
};

const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  tier,
  confidence,
  category,
  title,
  description,
  citations,
  lastUpdated,
  index = 0,
  className = ''
}) => {
  const theme = getTierColor(tier) || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' };

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 border-2 ${theme.border} shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`inline-flex p-3 rounded-xl ${theme.bg}`}>
            <ShieldCheck className={`w-6 h-6 ${theme.text}`} />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.badge}`}>
            {tier}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-900">
            {(confidence * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-slate-600">Confidence</div>
        </div>
      </div>
      
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{category}</span>
        <div className="flex items-center gap-4">
          <span>{citations} citations</span>
          <span>{lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EvidenceBadge;
