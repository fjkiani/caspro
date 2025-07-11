'use client';

import { motion } from 'framer-motion';
import { Hallmark } from '@/data/learn/oncology-101/hallmarks-data';

interface HallmarkCardProps {
  hallmark: Hallmark;
  index: number;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'core':
      return 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100';
    case 'emerging':
      return 'bg-purple-50 border-purple-200 hover:bg-purple-100';
    case 'enabling':
      return 'bg-amber-50 border-amber-200 hover:bg-amber-100';
    default:
      return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
  }
};

const getCategoryTextColor = (category: string) => {
  switch (category) {
    case 'core':
      return 'text-cyan-800';
    case 'emerging':
      return 'text-purple-800';
    case 'enabling':
      return 'text-amber-800';
    default:
      return 'text-gray-800';
  }
};

export const HallmarkCard: React.FC<HallmarkCardProps> = ({ hallmark, index }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${getCategoryColor(hallmark.category)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Category Badge */}
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryTextColor(hallmark.category)} bg-white bg-opacity-70`}>
          {hallmark.category.charAt(0).toUpperCase() + hallmark.category.slice(1)}
        </div>
        
        {/* Title */}
        <h4 className={`text-lg font-semibold ${getCategoryTextColor(hallmark.category)}`}>
          {hallmark.title}
        </h4>
        
        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {hallmark.description}
        </p>
        
        {/* Details (if available) */}
        {hallmark.details && (
          <motion.div
            className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
          >
            {hallmark.details}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 