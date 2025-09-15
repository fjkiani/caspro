/**
 * Component-Driven Slide Factory
 * 
 * This factory creates sophisticated slides by leveraging existing components
 * and patterns, eliminating hard-coding and maximizing reusability.
 */

import React from 'react';
import { motion } from 'framer-motion';

// Import existing sophisticated components
import ZetaOracleInAction from '../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../components/deck/slides/ZetaForgeTwoColumn';
import DigitalSynapseBackground from '../../components/site/blocks/DigitalSynapseBackground';
import UseCaseSlideTemplate from '../../components/deck/slides/shared/UseCaseSlideTemplate';
import { createHeroIntroSlide } from '../../components/deck/slides/shared/SlideLayouts';
import PathwayContent from '../../components/slides/content/PathwayContent';

// Import content adapters
import { toOracleBlocks } from './crispro101';
import { toForgeBlocks } from './crispro101';

// Types for slide configurations
interface SlideConfig {
  type: 'hero' | 'two-hit-hypothesis' | 'oracle-vus' | 'forge-design' | 'clinical-impact' | 'use-case-json';
  data: any;
  styling?: {
    backgroundClass?: string;
    titleClassName?: string;
    gradient?: string;
  };
}

interface ComponentSlideFactoryConfig {
  title: string;
  subtitle: string;
  slides: SlideConfig[];
  branding?: {
    company: string;
    icon: string;
  };
}

// Brand component factory
const createBrandComponent = (config: { company: string; icon: string }) => () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
    {config.company} {config.icon}
  </div>
);

// Two-Hit Hypothesis component factory (extracted from runx1.tsx pattern)
const createTwoHitHypothesisSlide = (config: {
  title: string;
  subtitle: string;
  steps: Array<{
    title: string;
    subtext: string;
    colorClass: string;
    mutationIcon?: string;
    animationClass?: string;
  }>;
  backgroundClass?: string;
}) => {
  const TwoHitDiagramCell = ({ title, subtext, colorClass, mutationIcon, animationClass }: any) => (
    <div className="flex flex-col items-center group">
      <div className={`relative w-32 h-32 ${colorClass} rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform group-hover:scale-110 ${animationClass || ''}`}>
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
        {mutationIcon && (
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg">{mutationIcon}</span>
          </div>
        )}
        <span className="text-sm font-bold z-10 text-center px-2" dangerouslySetInnerHTML={{__html: title}}></span>
      </div>
      <div className="mt-4 bg-slate-800/60 rounded-lg px-4 py-2 border border-slate-600/50 backdrop-blur-sm">
        <p className="text-slate-200 text-sm font-semibold text-center" dangerouslySetInnerHTML={{__html: subtext}}></p>
      </div>
    </div>
  );

  return () => (
    <div className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${config.backgroundClass || 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900'}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
            {config.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            {config.subtitle}
          </p>
        </motion.div>

        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-600/50">
          <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
            {config.steps.map((step, index) => (
              <React.Fragment key={index}>
                <TwoHitDiagramCell {...step} />
                {index < config.steps.length - 1 && (
                  <div className="flex items-center justify-center mx-4">
                    <div className="hidden lg:flex items-center">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600"></div>
                      <div className="w-0 h-0 border-l-6 border-r-0 border-t-3 border-b-3 border-l-slate-500 border-t-transparent border-b-transparent ml-1"></div>
                    </div>
                    <div className="lg:hidden">
                      <div className="h-12 w-0.5 bg-gradient-to-b from-slate-400 to-slate-600"></div>
                      <div className="w-0 h-0 border-t-6 border-b-0 border-l-3 border-r-3 border-t-slate-500 border-l-transparent border-r-transparent mt-1"></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Oracle VUS Resolution slide factory
const createOracleVUSSlide = (config: {
  title: string;
  subtitle: string;
  demoData: {
    left: { title: string; value: string; subtitle: string };
    right: { title: string; value: string; subtitle: string };
    score: { title: string; value: string };
  };
  metrics: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  backgroundClass?: string;
}) => () => (
  <div className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${config.backgroundClass || 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900'}`}>
    <div className="relative z-10 max-w-7xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
          {config.title}
        </h1>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto">
          {config.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VUS Resolution Demo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-2xl font-semibold text-slate-200 mb-6">Variant Analysis</h3>
          <ZetaOracleInAction {...config.demoData} />
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-2xl font-semibold text-slate-200 mb-6">Performance Metrics</h3>
          <div className="space-y-4">
            {config.metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-slate-400">{metric.label}</span>
                <span className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Forge Therapeutic Design slide factory
const createForgeDesignSlide = (config: {
  title: string;
  subtitle: string;
  column1: {
    input: string;
    mission: string;
    assets: Array<{ icon: any; label: string }>;
  };
  column2: {
    title: string;
    highlight: string;
    description: string;
    infoHeader: string;
    infoText: string;
  };
  backgroundClass?: string;
}) => () => (
  <div className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${config.backgroundClass || 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900'}`}>
    <div className="relative z-10 max-w-7xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          {config.title}
        </h1>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto">
          {config.subtitle}
        </p>
      </motion.div>

      <ZetaForgeTwoColumn
        column1={config.column1}
        column2={config.column2}
      />
    </div>
  </div>
);

// Clinical Impact slide factory
const createClinicalImpactSlide = (config: {
  title: string;
  subtitle: string;
  benefits: Array<{
    icon: any;
    color: string;
    text: string;
  }>;
  nextSteps: Array<{
    title: string;
    description: string;
    color: string;
  }>;
  backgroundClass?: string;
}) => () => (
  <div className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${config.backgroundClass || 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900'}`}>
    <div className="relative z-10 max-w-7xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4">
          {config.title}
        </h1>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto">
          {config.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Clinical Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-2xl font-semibold text-slate-200 mb-6">Clinical Benefits</h3>
          <div className="space-y-4">
            {config.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 bg-${benefit.color}-500/20 rounded-full flex items-center justify-center mr-3`}>
                  {React.createElement(benefit.icon, { className: `w-4 h-4 text-${benefit.color}-400` })}
                </div>
                <span className="text-slate-300">{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-2xl font-semibold text-slate-200 mb-6">Next Steps</h3>
          <div className="space-y-4">
            {config.nextSteps.map((step, index) => (
              <div key={index} className="text-slate-300">
                <div className={`font-semibold text-${step.color}-400 mb-2`}>{index + 1}. {step.title}</div>
                <div className="text-sm text-slate-400">{step.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Main factory function
export const createComponentDrivenSlides = (config: ComponentSlideFactoryConfig) => {
  const Brand = config.branding ? createBrandComponent(config.branding) : () => null;

  return config.slides.map((slideConfig, index) => {
    switch (slideConfig.type) {
      case 'hero':
        return createHeroIntroSlide(slideConfig.data);
      
      case 'two-hit-hypothesis':
        return createTwoHitHypothesisSlide(slideConfig.data);
      
      case 'oracle-vus':
        return createOracleVUSSlide(slideConfig.data);
      
      case 'forge-design':
        return createForgeDesignSlide(slideConfig.data);
      
      case 'clinical-impact':
        return createClinicalImpactSlide(slideConfig.data);
      
      case 'use-case-json':
        return () => (
          <UseCaseSlideTemplate
            {...slideConfig.data}
          />
        );
      
      default:
        return () => (
          <div className="w-full h-screen flex items-center justify-center bg-slate-900">
            <div className="text-center">
              <h1 className="text-4xl text-red-400 mb-4">Unknown Slide Type</h1>
              <p className="text-slate-400">Type: {slideConfig.type}</p>
            </div>
          </div>
        );
    }
  });
};

// Export individual factories for direct use
export {
  createTwoHitHypothesisSlide,
  createOracleVUSSlide,
  createForgeDesignSlide,
  createClinicalImpactSlide
};
