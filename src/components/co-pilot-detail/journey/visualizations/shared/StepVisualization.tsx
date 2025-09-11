'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { JourneyStep } from '@/data/capability-journeys';
import VisualContainer from './VisualContainer';
import DataFlow from './DataFlow';
import InfoCard from './InfoCard';
import { 
  Dna, Cpu, FileText, GitBranch, Database, 
  Stethoscope, Pill, Beaker, Layers, 
  Activity, BarChart3, AlertTriangle, CheckCircle, TrendingUp, Target, Clock, Users, DollarSign, Zap
} from 'lucide-react';

interface StepVisualizationProps {
  step: JourneyStep;
  variant: 'old' | 'new';
}

const StepVisualization: React.FC<StepVisualizationProps> = ({ step, variant }) => {
  const isOldWay = variant === 'old';
  const Icon = step.icon;
  
  return (
    <motion.div 
      className={`p-6 rounded-2xl border-2 backdrop-blur-sm shadow-2xl ${
        isOldWay 
          ? 'bg-gradient-to-br from-red-50 via-red-100/50 to-red-50 border-red-200 shadow-red-100' 
          : 'bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 border-green-200 shadow-green-100'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <motion.div 
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
            isOldWay 
              ? 'bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300' 
              : 'bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300'
          }`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
        >
          <Icon className={`w-8 h-8 ${
            isOldWay ? 'text-red-600' : 'text-green-600'
          }`} />
        </motion.div>
        <div>
          <motion.span 
            className={`text-sm font-bold px-4 py-2 rounded-full shadow-sm ${
              isOldWay 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isOldWay ? 'Traditional Way' : 'In-Silico Way'}
          </motion.span>
          <motion.h3 
            className="text-2xl font-bold text-slate-800 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {step.title}
          </motion.h3>
        </div>
      </div>

      {/* Enhanced Description */}
      <motion.p 
        className="text-lg text-slate-700 mb-6 leading-relaxed font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {step.description}
      </motion.p>

      {/* Enhanced Problems Section */}
      {step.problems && step.problems.length > 0 && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-red-700">Critical Problems</h4>
          </div>
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-200">
            <ul className="space-y-3">
              {step.problems.map((problem, idx) => {
                // Extract statistics from the problem text
                const hasStats = /\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months/.test(problem);
                const isAlarming = /40%|50\+|2-3|weeks|days|hours|failures|missed|delayed|wasted/.test(problem);
                
                return (
                  <motion.li 
                    key={idx} 
                    className={`flex items-start space-x-3 ${
                      hasStats ? 'bg-white/60 p-3 rounded-lg border border-red-200' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + (idx * 0.1) }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      isAlarming ? 'bg-red-500 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span className={`${
                      hasStats ? 'text-base font-semibold' : 'text-base'
                    } text-slate-700 leading-relaxed`}>
                      {problem.split(/(\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months)/).map((part, partIdx) => {
                        if (/\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months/.test(part)) {
                          return (
                            <span key={partIdx} className="font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Enhanced Solutions Section */}
      {step.solutions && step.solutions.length > 0 && (
        <motion.div 
          className="space-y-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-green-700">AI-Powered Solutions</h4>
          </div>
          <div className="bg-green-50/50 rounded-xl p-4 border border-green-200">
            <ul className="space-y-3">
              {step.solutions.map((solution, idx) => {
                // Extract statistics from the solution text
                const hasStats = /\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC/.test(solution);
                const isImpressive = /95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses/.test(solution);
                
                return (
                  <motion.li 
                    key={idx} 
                    className={`flex items-start space-x-3 ${
                      hasStats ? 'bg-white/60 p-3 rounded-lg border border-green-200' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + (idx * 0.1) }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      isImpressive ? 'bg-green-500 animate-pulse' : 'bg-green-400'
                    }`}></div>
                    <span className={`${
                      hasStats ? 'text-base font-semibold' : 'text-base'
                    } text-slate-700 leading-relaxed`}>
                      {solution.split(/(\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses)/).map((part, partIdx) => {
                        if (/\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses/.test(part)) {
                          return (
                            <span key={partIdx} className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepVisualization;
