'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, BookOpen, Stethoscope } from 'lucide-react';
import { SummaryData } from '@/types/universal-content';

interface SummarySectionProps {
  data: SummaryData;
  className?: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ data, className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      {data.title && (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            {data.title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Takeaways */}
        <motion.div
          className="bg-white rounded-lg shadow-lg border-2 border-green-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h4 className="text-xl font-semibold text-slate-900">Key Takeaways</h4>
          </div>
          <div className="space-y-4">
            {data.keyTakeaways.map((takeaway, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">{takeaway}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        {data.nextSteps && data.nextSteps.length > 0 && (
          <motion.div
            className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <ArrowRight className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-xl font-semibold text-slate-900">Next Steps</h4>
            </div>
            <div className="space-y-3">
              {data.nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Related Topics */}
      {data.relatedTopics && data.relatedTopics.length > 0 && (
        <motion.div
          className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
            <h4 className="text-xl font-semibold text-slate-900">Related Topics</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.relatedTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-purple-700 font-medium">{topic}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clinical Relevance */}
      {data.clinicalRelevance && (
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg border-2 border-orange-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-start space-x-3">
            <Stethoscope className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Clinical Relevance
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {data.clinicalRelevance}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SummarySection; 