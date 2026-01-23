'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  Shield,
  Target,
  Zap,
  CheckCircle,
  Activity,
  Brain,
  FileText,
  Radio
} from 'lucide-react';
import { allCapabilityJourneys, CapabilityJourneyData } from '@/data/capability-journeys';

// Map journey slugs to icons and colors
const journeyConfig: Record<string, { icon: React.ComponentType<any>; color: string; bgColor: string; textColor: string }> = {
  'toxicity-risk': { 
    icon: AlertTriangle, 
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700'
  },
  'chemo': { 
    icon: Shield, 
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  'clinical-trials': { 
    icon: Target, 
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  'therapy-fit': { 
    icon: CheckCircle, 
    color: 'teal',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-700'
  },
  'pathway': { 
    icon: Activity, 
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
  'crispr-intelligence': { 
    icon: Brain, 
    color: 'indigo',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-700'
  },
  'agentic-emr': { 
    icon: FileText, 
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700'
  },
  'precision-rad': { 
    icon: Radio, 
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700'
  },
};

interface JourneyStepCardProps {
  step: any;
  variant: 'old' | 'new';
  index: number;
}

const JourneyStepCard: React.FC<JourneyStepCardProps> = ({ step, variant, index }) => {
  const isOld = variant === 'old';
  const Icon = step.icon || (isOld ? AlertTriangle : Zap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-xl p-6 shadow-lg border-2 ${
        isOld
          ? 'bg-red-50 border-red-200'
          : 'bg-green-50 border-green-200'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isOld ? 'bg-red-100' : 'bg-green-100'
        }`}>
          <Icon className={`w-6 h-6 ${isOld ? 'text-red-600' : 'text-green-600'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              isOld ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
            }`}>
              Step {step.number}
            </span>
            <span className={`text-xs font-medium ${
              isOld ? 'text-red-600' : 'text-green-600'
            }`}>
              {isOld ? 'Traditional' : 'CrisPRO'}
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h4>
          <p className="text-sm text-slate-600 mb-4">{step.description}</p>
        </div>
      </div>

      {/* Problems or Solutions */}
      {(step.problems || step.solutions) && (
        <div className="mt-4 space-y-2">
          {(isOld ? step.problems : step.solutions)?.slice(0, 3).map((item: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                isOld ? 'bg-red-500' : 'bg-green-500'
              }`} />
              <span className={`${isOld ? 'text-red-700' : 'text-green-700'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function CapabilityJourneySlider() {
  const [activeTab, setActiveTab] = useState<string>('toxicity-risk');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter out journeys that don't have proper data
  const availableJourneys = Object.entries(allCapabilityJourneys).filter(
    ([slug, journey]) => journey && journey.oldWaySteps && journey.oldWaySteps.length > 0
  );

  const activeJourney = allCapabilityJourneys[activeTab];
  const activeConfig = journeyConfig[activeTab] || journeyConfig['toxicity-risk'];

  if (!activeJourney) return null;

  // Create paired slides (old way + new way)
  const maxSteps = Math.max(activeJourney.oldWaySteps.length, activeJourney.newWaySteps.length);
  const slides = Array.from({ length: maxSteps }, (_, i) => ({
    old: activeJourney.oldWaySteps[i] || null,
    new: activeJourney.newWaySteps[i] || null,
    index: i
  }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  const Icon = activeConfig.icon;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Activity className="w-4 h-4" />
            CAPABILITY JOURNEYS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            From Traditional Challenges to AI-Powered Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Explore CrisPRO capabilities for healthcare
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {availableJourneys.map(([slug, journey]) => {
              const config = journeyConfig[slug] || journeyConfig['toxicity-risk'];
              const TabIcon = config.icon;
              const isActive = activeTab === slug;

              return (
                <motion.button
                  key={slug}
                  onClick={() => handleTabChange(slug)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? `${config.bgColor} ${config.textColor} shadow-lg scale-105`
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="text-sm">{journey.title.replace(' Journey', '').replace('The ', '')}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Journey Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{activeJourney.title}</h3>
            <p className="text-slate-600">{activeJourney.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentSlide}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Old Way Card */}
                {slides[currentSlide].old && (
                  <JourneyStepCard
                    step={slides[currentSlide].old}
                    variant="old"
                    index={0}
                  />
                )}

                {/* New Way Card */}
                {slides[currentSlide].new && (
                  <JourneyStepCard
                    step={slides[currentSlide].new}
                    variant="new"
                    index={1}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `${activeConfig.bgColor} w-8`
                  : 'bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-sm text-slate-600">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </section>
  );
}


