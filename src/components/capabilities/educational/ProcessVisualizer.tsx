'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, CheckCircle } from 'lucide-react';
import { ProcessVisualizerData } from '@/types/educational-capability';

interface ProcessVisualizerProps {
  data: ProcessVisualizerData;
  className?: string;
}

export default function ProcessVisualizer({ data, className = '' }: ProcessVisualizerProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (data.layout === 'horizontal') {
    return (
      <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-teal-50 to-cyan-50 ${className}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
          >
            {data.title}
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {data.steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  onClick={() => data.interactive && setActiveStep(activeStep === step.number ? null : step.number)}
                  className={`flex flex-col items-center text-center cursor-pointer transition-all ${
                    data.interactive ? 'hover:scale-105' : ''
                  } ${activeStep === step.number ? 'scale-110' : ''}`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-lg transition-all ${
                    activeStep === step.number
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white ring-4 ring-teal-300'
                      : 'bg-white text-teal-600 border-4 border-teal-300'
                  }`}>
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 max-w-[200px]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-[200px]">
                    {step.description}
                  </p>
                  {data.interactive && activeStep === step.number && step.details && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 bg-white rounded-lg p-4 shadow-lg border-2 border-teal-200 max-w-[300px]"
                    >
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="text-sm mb-2">
                          <span className="font-semibold text-slate-900">{detail.label}:</span>
                          <span className="text-slate-600 ml-2">{detail.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
                {index < data.steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-teal-500 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (data.layout === 'cascade') {
    return (
      <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-teal-50 to-cyan-50 ${className}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
          >
            {data.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => data.interactive && setActiveStep(activeStep === step.number ? null : step.number)}
                className={`p-4 bg-slate-50 rounded-lg text-center hover:bg-cyan-50 transition-colors border border-slate-200 hover:border-cyan-300 cursor-pointer ${
                  activeStep === step.number ? 'ring-2 ring-teal-500 bg-cyan-50' : ''
                }`}
              >
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {step.stepNumber || step.number}
                </div>
                <h5 className="font-bold text-teal-700 mb-2">{step.title}</h5>
                <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                {data.interactive && activeStep === step.number && step.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-xs text-slate-500"
                  >
                    {step.details.map((detail, idx) => (
                      <div key={idx}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Vertical/Timeline layout (default)
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-teal-50 to-cyan-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
        >
          {data.title}
        </motion.h2>

        <div className="relative pl-8">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-300"></div>

          {data.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 top-2 -ml-2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow-md"></div>

              {/* Step Content */}
              <div className="ml-10 pl-8 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-teal-600">Step {step.number}</span>
                  <h4 className="font-semibold text-slate-900">{step.title}</h4>
                </div>
                <p className="text-slate-600 mb-2">{step.description}</p>
                {step.details && step.details.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="text-sm mb-1">
                        <span className="font-semibold text-slate-900">{detail.label}:</span>
                        <span className="text-slate-600 ml-2">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {step.visual && (
                  <div className="mt-4">
                    {step.visual}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

