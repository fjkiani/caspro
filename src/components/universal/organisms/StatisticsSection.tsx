'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { StatisticsData, Statistic } from '@/types/universal-content';

interface StatisticsSectionProps {
  data: StatisticsData;
  className?: string;
}

const StatisticCard: React.FC<{ stat: Statistic; index: number }> = ({ stat, index }) => {
  const getTrendIcon = () => {
    switch (stat.trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Minus;
      default: return BarChart3;
    }
  };

  const getTrendColor = () => {
    switch (stat.trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
      default: return 'text-slate-600';
    }
  };

  const getCardColor = (color?: string) => {
    const colors = {
      red: 'from-red-50 to-red-100 border-red-200',
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      green: 'from-green-50 to-green-100 border-green-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      pink: 'from-pink-50 to-pink-100 border-pink-200',
      default: 'from-slate-50 to-slate-100 border-slate-200'
    };
    return colors[color as keyof typeof colors] || colors.default;
  };

  const TrendIcon = getTrendIcon();
  const cardColorClass = getCardColor(stat.color);

  return (
    <motion.div
      className={`bg-gradient-to-br ${cardColorClass} border-2 rounded-lg p-6 shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {stat.label}
          </h3>
          <div className="text-3xl font-bold text-slate-800">
            {stat.value}
          </div>
        </div>
        {stat.trend && (
          <div className={`${getTrendColor()}`}>
            <TrendIcon className="w-6 h-6" />
          </div>
        )}
      </div>
      
      {stat.description && (
        <p className="text-sm text-slate-700 leading-relaxed">
          {stat.description}
        </p>
      )}
    </motion.div>
  );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ data, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      {(data.title || data.subtitle) && (
        <div className="text-center">
          {data.title && (
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <p className="text-slate-600">{data.subtitle}</p>
          )}
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.statistics.map((stat, index) => (
          <StatisticCard
            key={stat.id}
            stat={stat}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection; 