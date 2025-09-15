import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import {
  SPEIntroSlide,
  SPEAchievementSlide,
  SPEForCliniciansSlide,
  SPEForBiotechsSlide,
  SPEFrameworkSlide,
  SPEDifferentiatorsSlide,
  SPEEvidenceDoctrineSlide,
  SPEMultipleMyelomaSlide,
  SPEOvarianCancerSlide,
  SPEMelanomaSlide,
  SPEClinicalValidationSlide,
  SPEFusionEnginePerformanceSlide
} from './slides/SPE_Slides';

// Simple Navigation Controls
const NavigationControls = ({
  onPrev,
  onNext,
  isPlaying,
  onTogglePlay,
  current,
  total,
  slides
}: {
  onPrev: () => void;
  onNext: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  current: number;
  total: number;
  slides: any[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700"
  >
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPrev}
      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300"
    >
      <ChevronLeft size={20} />
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onTogglePlay}
      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300"
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onNext}
      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300"
    >
      <ChevronRight size={20} />
    </motion.button>
  </motion.div>
);

// Placeholder slides for remaining content
const PlaceholderSlide = ({ title, slideNumber }: { title: string, slideNumber: number }) => (
  <motion.section
    key={`slide${slideNumber}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
  >
    <div className="relative z-10 w-full max-w-6xl space-y-12">
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
        {title}
      </h1>
      <p className="text-2xl md:text-3xl font-light text-slate-300">
        Coming Soon - Slide {slideNumber}
      </p>
      <div className="mt-8 p-6 bg-slate-700/50 rounded-xl border border-slate-600">
        <p className="text-lg text-slate-300">
          This slide is being refactored from the monolithic SPE deck file.
          The content will be extracted and modularized.
        </p>
      </div>
    </div>
  </motion.section>
);

const SPEFrameworkDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slides in order - focused on accuracy and technical validation
  const slides = [
    SPEIntroSlide,                    // Slide 1: Introduction
    SPEAchievementSlide,             // Slide 2: The Achievement
    SPEForCliniciansSlide,           // Slide 3: For Clinicians
    SPEForBiotechsSlide,             // Slide 4: For Biotechs
    SPEFrameworkSlide,               // Slide 5: S/P/E Framework Details
    SPEDifferentiatorsSlide,         // Slide 6: CrisPRO Differentiators
    SPEFusionEnginePerformanceSlide, // Slide 7: Fusion Engine Unmatched Performance
    SPEEvidenceDoctrineSlide,        // Slide 8: Evidence Doctrine
    SPEMultipleMyelomaSlide,         // Slide 9: Multiple Myeloma Case Study
    SPEOvarianCancerSlide,           // Slide 10: Ovarian Cancer Case Study
    SPEMelanomaSlide,                // Slide 11: Melanoma Case Study
    SPEClinicalValidationSlide       // Slide 12: Clinical Validation Results
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const CurrentSlide = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      <CurrentSlide />

      {/* Navigation Controls */}
      <NavigationControls
        onPrev={prevSlide}
        onNext={nextSlide}
        isPlaying={false}
        onTogglePlay={() => {}}
        current={currentSlide}
        total={slides.length}
        slides={slides.map((_, index) => ({ id: index, title: `Slide ${index + 1}` }))}
      />

      {/* Slide Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 right-8 z-30 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700"
      >
        <span className="text-slate-300 font-mono text-sm">
          {String(currentSlide + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
        </span>
      </motion.div>
    </div>
  );
};

export default SPEFrameworkDeck;
