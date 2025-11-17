import type { ColorClasses } from '../types';

/**
 * Get color classes for a given color name
 */
export const getColorClasses = (color: string): ColorClasses => {
  const colorMap: Record<string, ColorClasses> = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500' },
    green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500' },
    orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500' },
    cyan: { bg: 'bg-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500' },
    teal: { bg: 'bg-teal-600', text: 'text-teal-400', border: 'border-teal-500' },
  };
  return colorMap[color] || colorMap.blue;
};

/**
 * Get status color classes for variant status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'VUS': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
    case 'Pathogenic': return 'text-red-400 bg-red-900/30 border-red-700/50';
    case 'Likely Pathogenic': return 'text-orange-400 bg-orange-900/30 border-orange-700/50';
    case 'Benign': return 'text-green-400 bg-green-900/30 border-green-700/50';
    default: return 'text-gray-400 bg-gray-900/30 border-gray-700/50';
  }
};



