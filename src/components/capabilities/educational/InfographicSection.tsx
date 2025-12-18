'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Table, TrendingUp, GitBranch } from 'lucide-react';
import { InfographicSectionData } from '@/types/educational-capability';

interface InfographicSectionProps {
  data: InfographicSectionData;
  className?: string;
}

export default function InfographicSection({ data, className = '' }: InfographicSectionProps) {
  const getIcon = () => {
    switch (data.type) {
      case 'table':
        return <Table className="w-6 h-6" />;
      case 'comparison':
        return <BarChart3 className="w-6 h-6" />;
      case 'metrics':
        return <TrendingUp className="w-6 h-6" />;
      case 'flow':
        return <GitBranch className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const renderTable = () => {
    if (data.type !== 'table' || !data.data || !Array.isArray(data.data)) return null;
    
    const headers = Object.keys(data.data[0] || {});
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-300">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-semibold text-slate-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, rowIdx) => (
              <motion.tr
                key={rowIdx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: rowIdx * 0.1 }}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                {headers.map((header, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 text-slate-700">
                    {row[header]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderComparison = () => {
    if (data.type !== 'comparison' || !data.data) return null;
    
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {data.data.left && (
          <div className="bg-slate-100 rounded-xl p-6 border-2 border-slate-300">
            <h4 className="font-semibold text-slate-900 mb-4">{data.data.left.title}</h4>
            <ul className="space-y-2">
              {data.data.left.items?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-red-500">❌</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.data.right && (
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-400">
            <h4 className="font-semibold text-green-900 mb-4">{data.data.right.title}</h4>
            <ul className="space-y-2">
              {data.data.right.items?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-600">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderMetrics = () => {
    if (data.type !== 'metrics' || !data.data || !Array.isArray(data.data)) return null;
    
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {data.data.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 text-center"
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {metric.value}
            </div>
            <div className="text-sm font-semibold text-slate-900 mb-1">
              {metric.label}
            </div>
            {metric.description && (
              <div className="text-xs text-slate-600 mt-2">
                {metric.description}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderFlow = () => {
    if (data.type !== 'flow' || !data.data) return null;
    
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {data.data.steps?.map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 text-center min-w-[200px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto mb-3">
                {step.number || idx + 1}
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.description}</p>
            </motion.div>
            {idx < (data.data.steps?.length || 0) - 1 && (
              <div className="text-2xl text-blue-500 font-bold hidden md:block">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {getIcon()}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Infographic Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200"
        >
          {data.type === 'table' && renderTable()}
          {data.type === 'comparison' && renderComparison()}
          {data.type === 'metrics' && renderMetrics()}
          {data.type === 'flow' && renderFlow()}
          {data.visual && (
            <div className="mt-8">
              {data.visual}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

