// Generic Slide Deck Builder
// This file creates slide decks from template definitions and content configurations

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import { SLIDE_TEMPLATES, type SlideTemplateType } from './slideTemplates';

// ===== INTERFACES =====

export interface SlideDefinition {
  template: SlideTemplateType;
  content: any;
  title: string;
}

export interface DeckConfig {
  id: string;
  name: string;
  description: string;
  slides: SlideDefinition[];
}

// ===== REUSABLE COMPONENTS =====

const Brand = () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
    CrisPRO.ai 🧬
  </div>
);

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

const NavigationControls = ({ onPrev, onNext, isPlaying, onTogglePlay, current, total }: { 
  onPrev: () => void; 
  onNext: () => void; 
  isPlaying: boolean; 
  onTogglePlay: () => void; 
  current: number; 
  total: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6 bg-slate-800/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-slate-700 shadow-xl"
    >
      <motion.button
        onClick={onPrev}
        className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200"
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        onClick={onTogglePlay}
        className={`p-3 rounded-xl transition-all duration-200 ${
          isPlaying
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </motion.button>

      <motion.button
        onClick={onNext}
        className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200"
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={24} />
      </motion.button>

      <div className="text-sm text-slate-400 font-medium">
        {current + 1} / {total}
      </div>
    </motion.div>
  );
};

// ===== GENERIC SLIDE DECK COMPONENT =====

export const createSlideDeck = (config: DeckConfig) => {
  const SlideDeckComponent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto-play functionality
    useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % config.slides.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [isPlaying, config.slides.length]);

    const handleSlideChange = (index: number) => {
      setCurrentSlide(index);
      setIsPlaying(false);
    };

    const handlePrev = () => {
      setCurrentSlide((prev) => (prev - 1 + config.slides.length) % config.slides.length);
      setIsPlaying(false);
    };

    const handleNext = () => {
      setCurrentSlide((prev) => (prev + 1) % config.slides.length);
      setIsPlaying(false);
    };

    const handleTogglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    const currentSlideDef = config.slides[currentSlide];
    const SlideTemplate = SLIDE_TEMPLATES[currentSlideDef.template];

    return (
      <div className="w-full h-screen bg-slate-900 relative overflow-hidden">
        {/* Progress Bar */}
        <ProgressBar 
          current={currentSlide} 
          total={config.slides.length} 
          onSlideChange={handleSlideChange} 
        />

        {/* Main Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <SlideTemplate content={currentSlideDef.content} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <NavigationControls
          onPrev={handlePrev}
          onNext={handleNext}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          current={currentSlide}
          total={config.slides.length}
        />

        {/* Brand */}
        <Brand />

        {/* Slide Title Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-8 z-20"
        >
          <h2 className="text-2xl font-bold text-white/90 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
            {currentSlideDef.title}
          </h2>
        </motion.div>
      </div>
    );
  };

  return SlideDeckComponent;
};

// ===== DECK FACTORY =====

export const createDeckFromConfig = (config: DeckConfig) => {
  return {
    id: config.id,
    name: config.name,
    description: config.description,
    component: createSlideDeck(config)
  };
};
