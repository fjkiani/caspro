/**
 * Multiple Myeloma: Component-Driven Architecture (FINAL DRY VERSION)
 * 
 * This is the FINAL DRY version of the Multiple Myeloma deck:
 * - Zero hard-coded content
 * - Maximum component reuse
 * - Professional styling and animations
 * - Based on validated mmdeck.md content
 * - Uses the same patterns as hereditary breast cancer
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Import the component factory and configuration
import { createComponentDrivenSlides } from '../../adapters/componentSlideFactory';
import { multipleMyelomaComponentDeckConfig } from '../../contentConfigs/multipleMyelomaComponentConfig';

// --- BRANDING COMPONENT ---
const Brand = () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
    {multipleMyelomaComponentDeckConfig.branding.company} {multipleMyelomaComponentDeckConfig.branding.icon}
  </div>
);

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ current, total, onSlideChange }: { current: number; total: number; onSlideChange: (index: number) => void }) => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.button
          key={i}
          onClick={() => onSlideChange(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i === current
              ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
              : 'bg-slate-600 hover:bg-slate-500'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  );
};

// --- NAVIGATION CONTROLS ---
const NavigationControls = ({ current, total, onPrevious, onNext, isPlaying, onTogglePlay }: {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
      <motion.button
        onClick={onPrevious}
        disabled={current === 0}
        className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={24} />
      </motion.button>
      
      <motion.button
        onClick={onTogglePlay}
        className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </motion.button>
      
      <motion.button
        onClick={onNext}
        disabled={current === total - 1}
        className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MultipleMyelomaComponentDrivenDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate slides using the component factory
  const slideComponents = createComponentDrivenSlides(multipleMyelomaComponentDeckConfig);
  const totalSlides = slideComponents.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      <ProgressBar current={currentSlide} total={totalSlides} onSlideChange={goToSlide} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {CurrentSlideComponent ? React.createElement(CurrentSlideComponent) : null}
        </motion.div>
      </AnimatePresence>

      <NavigationControls
        current={currentSlide}
        total={totalSlides}
        onPrevious={previousSlide}
        onNext={nextSlide}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      <Brand />
    </div>
  );
};

export default MultipleMyelomaComponentDrivenDeck;
