'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import UniversalButton from '../atoms/UniversalButton';
import { ProcessData, ProcessStep } from '@/types/universal-content';

interface ProcessStepsProps {
  data: ProcessData;
  className?: string;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ data, className = '' }) => {
  const [activeStep, setActiveStep] = useState<number | null>(data.interactive ? 0 : null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2000); // milliseconds

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying || !data.interactive) return;

    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev === null) return 0;
        return prev >= data.steps.length - 1 ? 0 : prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, data.steps.length, data.interactive]);

  const getStepColors = (step: ProcessStep, index: number) => {
    const isActive = activeStep === index;
    const color = step.color || 'blue';
    
    const colors = {
      blue: {
        bg: isActive ? 'bg-blue-500' : 'bg-blue-100',
        text: isActive ? 'text-white' : 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-50 to-blue-100'
      },
      red: {
        bg: isActive ? 'bg-red-500' : 'bg-red-100',
        text: isActive ? 'text-white' : 'text-red-600',
        border: 'border-red-200',
        gradient: 'from-red-50 to-red-100'
      },
      green: {
        bg: isActive ? 'bg-green-500' : 'bg-green-100',
        text: isActive ? 'text-white' : 'text-green-600',
        border: 'border-green-200',
        gradient: 'from-green-50 to-green-100'
      },
      purple: {
        bg: isActive ? 'bg-purple-500' : 'bg-purple-100',
        text: isActive ? 'text-white' : 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-50 to-purple-100'
      },
      orange: {
        bg: isActive ? 'bg-orange-500' : 'bg-orange-100',
        text: isActive ? 'text-white' : 'text-orange-600',
        border: 'border-orange-200',
        gradient: 'from-orange-50 to-orange-100'
      }
    };

    return colors[color as keyof typeof colors] || colors.blue;
  };

  const HorizontalLayout = () => (
    <div className="space-y-8">
      {/* Steps */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {data.steps.map((step, index) => {
            const colors = getStepColors(step, index);
            const isActive = activeStep === index;
            
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`relative flex flex-col items-center cursor-pointer ${data.interactive ? 'hover:scale-105' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => data.interactive && setActiveStep(index)}
                  whileHover={data.interactive ? { scale: 1.05 } : {}}
                >
                  {/* Step Number Circle */}
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${colors.bg} ${colors.text} ${colors.border} shadow-lg`}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  {/* Step Title */}
                  <div className="mt-3 text-center max-w-24">
                    <h4 className={`font-semibold text-sm ${isActive ? colors.text.replace('text-', 'text-') : 'text-slate-700'}`}>
                      {step.title}
                    </h4>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < data.steps.length - 1 && (
                  <motion.div
                    className="flex-1 flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index + 0.5) * 0.1 }}
                  >
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Details */}
      <AnimatePresence mode="wait">
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg border-2 border-slate-200"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Step {data.steps[activeStep].number}: {data.steps[activeStep].title}
                </h3>
                <p className="text-slate-700 mb-4">
                  {data.steps[activeStep].description}
                </p>
                {data.steps[activeStep].details && (
                  <div className="text-sm text-slate-600">
                    <strong>Details:</strong> {data.steps[activeStep].details}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {data.steps[activeStep].mechanism && (
                  <div>
                    <strong className="text-slate-800">Mechanism:</strong>
                    <p className="text-slate-600 text-sm mt-1">{data.steps[activeStep].mechanism}</p>
                  </div>
                )}
                {data.steps[activeStep].duration && (
                  <div>
                    <strong className="text-slate-800">Duration:</strong>
                    <p className="text-slate-600 text-sm mt-1">{data.steps[activeStep].duration}</p>
                  </div>
                )}
                {data.steps[activeStep].location && (
                  <div>
                    <strong className="text-slate-800">Location:</strong>
                    <p className="text-slate-600 text-sm mt-1">{data.steps[activeStep].location}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const VerticalLayout = () => (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
      
      <div className="space-y-8">
        {data.steps.map((step, index) => {
          const colors = getStepColors(step, index);
          const isActive = activeStep === index;
          
          return (
            <motion.div
              key={step.id}
              className={`relative flex items-start space-x-6 cursor-pointer ${data.interactive ? 'hover:bg-slate-50' : ''} p-4 rounded-lg transition-all duration-200`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => data.interactive && setActiveStep(index)}
            >
              {/* Step Number Circle */}
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${colors.bg} ${colors.text} ${colors.border} shadow-lg`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.2 }}
              >
                {step.number}
              </motion.div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold text-lg mb-2 ${isActive ? colors.text : 'text-slate-800'}`}>
                  {step.title}
                </h4>
                <p className="text-slate-700 mb-3">
                  {step.description}
                </p>
                
                {(step.details || step.mechanism) && (
                  <div className="space-y-2 text-sm">
                    {step.details && (
                      <div className="text-slate-600">
                        <strong>Details:</strong> {step.details}
                      </div>
                    )}
                    {step.mechanism && (
                      <div className="text-slate-600">
                        <strong>Mechanism:</strong> {step.mechanism}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const CircularLayout = () => {
    const radius = 120;
    const centerX = 150;
    const centerY = 150;
    
    return (
      <div className="relative w-300 h-300 mx-auto">
        <svg width="300" height="300" className="absolute inset-0">
          {/* Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
        
        {data.steps.map((step, index) => {
          const angle = (index / data.steps.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const colors = getStepColors(step, index);
          const isActive = activeStep === index;
          
          return (
            <motion.div
              key={step.id}
              className={`absolute w-16 h-16 cursor-pointer ${data.interactive ? 'hover:scale-110' : ''}`}
              style={{
                left: x - 32,
                top: y - 32,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => data.interactive && setActiveStep(index)}
              whileHover={data.interactive ? { scale: 1.1 } : {}}
            >
              <motion.div
                className={`w-full h-full rounded-full flex items-center justify-center font-bold text-lg border-2 ${colors.bg} ${colors.text} ${colors.border} shadow-lg`}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.2 }}
              >
                {step.number}
              </motion.div>
              
              {/* Step Title */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <div className={`text-xs font-medium ${isActive ? colors.text : 'text-slate-700'} whitespace-nowrap`}>
                  {step.title}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Center Details */}
        <AnimatePresence mode="wait">
          {activeStep !== null && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-slate-200 max-w-48 text-center">
                <h4 className="font-semibold text-sm mb-2">
                  {data.steps[activeStep].title}
                </h4>
                <p className="text-xs text-slate-600">
                  {data.steps[activeStep].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

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

      {/* Interactive Controls */}
      {data.interactive && (
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <UniversalButton
            variant={isPlaying ? 'secondary' : 'primary'}
            color="blue"
            icon={isPlaying ? Pause : Play}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </UniversalButton>
          
          <UniversalButton
            variant="outline"
            color="slate"
            icon={RotateCcw}
            onClick={() => {
              setActiveStep(0);
              setIsPlaying(false);
            }}
          >
            Reset
          </UniversalButton>

          <div className="flex items-center space-x-2">
            <UniversalButton
              variant="ghost"
              size="sm"
              color="slate"
              icon={ChevronLeft}
              disabled={activeStep === 0}
              onClick={() => setActiveStep(Math.max(0, (activeStep || 0) - 1))}
            ><></></UniversalButton>
            <span className="text-sm text-slate-600">
              {(activeStep || 0) + 1} / {data.steps.length}
            </span>
            <UniversalButton
              variant="ghost"
              size="sm"
              color="slate"
              icon={ChevronRight}
              disabled={activeStep === data.steps.length - 1}
              onClick={() => setActiveStep(Math.min(data.steps.length - 1, (activeStep || 0) + 1))}
            ><></></UniversalButton>
          </div>
        </div>
      )}

      {/* Process Visualization */}
      {data.layout === 'vertical' && <VerticalLayout />}
      {data.layout === 'circular' && <CircularLayout />}
      {(!data.layout || data.layout === 'horizontal') && <HorizontalLayout />}
    </div>
  );
};

export default ProcessSteps; 