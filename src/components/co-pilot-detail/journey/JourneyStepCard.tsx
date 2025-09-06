'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface JourneyStepCardProps {
  step: {
    id: string;
    title: string;
    description: string;
    icon: any;
    variant: 'old' | 'new';
    problems?: string[];
    solutions?: string[];
  };
  onInView: (id: string) => void;
  isFirst: boolean;
}

const JourneyStepCard: React.FC<JourneyStepCardProps> = ({ step, onInView, isFirst }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isFirst && ref.current) {
      onInView(step.id);
    }
    if (!isFirst && isInView) {
      onInView(step.id);
    }
  }, [isInView, step.id, onInView, isFirst]);

  const Icon = step.icon;
  const isOldWay = step.variant === 'old';

  return (
    <div ref={ref} className="h-[100vh] flex items-center">
      <div className="w-full max-w-lg mx-auto relative">
        {/* HUD Corners */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${
          isOldWay ? 'border-red-500' : 'border-green-500'
        }`}></div>
        <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${
          isOldWay ? 'border-red-500' : 'border-green-500'
        }`}></div>
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${
          isOldWay ? 'border-red-500' : 'border-green-500'
        }`}></div>
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${
          isOldWay ? 'border-red-500' : 'border-green-500'
        }`}></div>

        {/* Main Card */}
        <motion.div 
          className={`p-6 rounded-xl border-2 backdrop-blur-sm shadow-2xl ${
            isOldWay 
              ? 'bg-red-50/80 border-red-200 shadow-red-100' 
              : 'bg-green-50/80 border-green-200 shadow-green-100'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isOldWay 
                ? 'bg-red-100 border-2 border-red-300' 
                : 'bg-green-100 border-2 border-green-300'
            }`}>
              <Icon className={`w-6 h-6 ${
                isOldWay ? 'text-red-600' : 'text-green-600'
              }`} />
            </div>
            <div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                isOldWay 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {isOldWay ? 'Traditional' : 'In-Silico'}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-1">{step.title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 mb-4 leading-relaxed">{step.description}</p>

          {/* Problems or Solutions */}
          {step.problems && step.problems.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Key Problems:
              </h4>
              <ul className="space-y-1">
                {step.problems.map((problem, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start">
                    <span className="text-red-400 mr-2 mt-1">•</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.solutions && step.solutions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Solutions:
              </h4>
              <ul className="space-y-1">
                {step.solutions.map((solution, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyStepCard;
