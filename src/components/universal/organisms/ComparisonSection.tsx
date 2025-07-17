'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Info } from 'lucide-react';
import { ComparisonData, ComparisonItem } from '@/types/universal-content';

interface ComparisonSectionProps {
  data: ComparisonData;
  className?: string;
}

const ComparisonCard: React.FC<{ 
  item: ComparisonItem; 
  index: number; 
  layout: string;
  isSelected?: boolean;
  onSelect?: () => void;
}> = ({ item, index, layout, isSelected = false, onSelect }) => {
  const getColor = (color?: string) => {
    const colors = {
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', accent: 'bg-orange-500' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
      default: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', accent: 'bg-slate-500' }
    };
    return colors[color as keyof typeof colors] || colors.default;
  };

  const colorScheme = getColor(item.color);

  if (layout === 'table') {
    return (
      <tr 
        className={`border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200 ${
          isSelected ? 'bg-blue-50' : ''
        }`}
        onClick={onSelect}
      >
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${colorScheme.accent}`}></div>
            <div>
              <div className="font-semibold text-slate-900">{item.title}</div>
              {item.role && (
                <div className="text-sm text-slate-500">{item.role}</div>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-slate-700">
          {item.description}
        </td>
        <td className="px-6 py-4">
          <ul className="text-sm text-slate-600 space-y-1">
            {item.features.slice(0, 3).map((char, i) => (
              <li key={i} className="flex items-center space-x-2">
                <Check className="w-3 h-3 text-green-500" />
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  }

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg border-2 ${colorScheme.border} p-6 cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${colorScheme.accent} mr-3`}></div>
        <h4 className={`text-lg font-semibold ${colorScheme.text}`}>
          {item.title}
        </h4>
        {item.role && (
          <span className={`ml-auto px-3 py-1 text-sm rounded-full ${colorScheme.bg} ${colorScheme.text}`}>
            {item.role}
          </span>
        )}
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-slate-700 mb-4 text-sm leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Characteristics */}
      <div className="space-y-3">
        <h5 className="font-medium text-slate-900">Key Characteristics:</h5>
        <ul className="space-y-2">
          {item.features.map((char, i) => (
            <li key={i} className="flex items-start space-x-2 text-sm">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{char}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Advantages/Disadvantages */}
      {(item.advantages || item.disadvantages) && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          {item.advantages && (
            <div className="mb-3">
              <h6 className="font-medium text-green-700 mb-2">Advantages:</h6>
              <ul className="space-y-1">
                {item.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs">
                    <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.disadvantages && (
            <div>
              <h6 className="font-medium text-red-700 mb-2">Disadvantages:</h6>
              <ul className="space-y-1">
                {item.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs">
                    <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const SideBySideLayout: React.FC<{ data: ComparisonData }> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {data.items.map((item, index) => (
        <React.Fragment key={item.id}>
          <ComparisonCard
            item={item}
            index={index}
            layout="side_by_side"
            isSelected={selectedItems.has(item.id)}
            onSelect={() => toggleSelection(item.id)}
          />
          {index === 0 && data.items.length === 2 && (
            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white rounded-full p-3 shadow-lg border-2 border-slate-200">
                <ArrowRight className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const TableLayout: React.FC<{ data: ComparisonData }> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Key Features
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.items.map((item, index) => (
            <ComparisonCard
              key={item.id}
              item={item}
              index={index}
              layout="table"
              isSelected={selectedItems.has(item.id)}
              onSelect={() => toggleSelection(item.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CardsLayout: React.FC<{ data: ComparisonData }> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.items.map((item, index) => (
        <ComparisonCard
          key={item.id}
          item={item}
          index={index}
          layout="cards"
          isSelected={selectedItems.has(item.id)}
          onSelect={() => toggleSelection(item.id)}
        />
      ))}
    </div>
  );
};

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ data, className = '' }) => {
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

      {/* Comparison Content */}
      <div className="relative">
        {data.layout === 'table' && <TableLayout data={data} />}
        {data.layout === 'cards' && <CardsLayout data={data} />}
        {(!data.layout || data.layout === 'side_by_side') && <SideBySideLayout data={data} />}
      </div>

      {/* Summary */}
      {data.items.length > 2 && (
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Comparison Summary
              </h4>
              <p className="text-blue-700 text-sm">
                Click on items above to select and compare them. Each item has unique characteristics 
                that make it suitable for different scenarios and applications.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparisonSection; 