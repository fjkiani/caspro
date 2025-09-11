'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Search, FileText, ArrowRight, Zap } from 'lucide-react';

interface WorkflowStepProps {
  step: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
    details: string[];
    outputs: string[];
  };
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const WorkflowStep: React.FC<WorkflowStepProps> = ({ step, isActive, isCompleted, index }) => {
  const IconComponent = step.icon;
  const theme = colorVariants[step.color];

  return (
    <motion.div
      className="relative flex items-start gap-8"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Step Icon */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
          isCompleted 
            ? 'bg-green-500 border-green-500 text-white' 
            : isActive 
              ? `${theme.bg} ${theme.border} ${theme.text} border-4` 
              : 'bg-gray-100 border-gray-300 text-gray-400'
        }`}>
          {isCompleted ? (
            <CheckCircle className="w-8 h-8" />
          ) : (
            <IconComponent className="w-8 h-8" />
          )}
        </div>
        
        {/* Step Number */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
          {step.id}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        className={`flex-1 p-8 rounded-2xl border-2 transition-all duration-500 ${
          isActive 
            ? `${theme.border} shadow-xl scale-105` 
            : isCompleted 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-white'
        }`}
        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
          {isActive && (
            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-4 h-4" />
              Active
            </motion.div>
          )}
          {isCompleted && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
        
        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Process Details
            </h4>
            <ul className="space-y-2">
              {step.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Expected Outputs
            </h4>
            <ul className="space-y-2">
              {step.outputs.map((output, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <ArrowRight className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkflowStep;
