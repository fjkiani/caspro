'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface DeckSlide {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface DeckViewerProps {
  slides: DeckSlide[];
  title: string;
  description: string;
  className?: string;
}

const DeckViewer: React.FC<DeckViewerProps> = ({ 
  slides, 
  title, 
  description, 
  className = '' 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && isFullscreen) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000); // 8 seconds per slide
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isFullscreen, currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        case 'p':
        case 'P':
          togglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <>
      {/* Preview Section */}
      <div className={`bg-white py-16 ${className}`}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Slide Preview */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="aspect-video bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative group cursor-pointer" onClick={toggleFullscreen}>
                {/* Preview of first slide */}
                <div className="w-full h-full">
                  {slides[0].content}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-semibold mb-2">Click to start presentation</p>
                    <p className="text-white/80 text-sm">Full screen experience</p>
                  </div>
                </div>
              </div>
              
              {/* Slide Counter */}
              <div className="mt-6 text-center text-gray-500">
                {slides.length} slides • 8 min presentation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
              <button
                onClick={prevSlide}
                className="p-2 hover:bg-white/10 text-white rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-white text-sm font-medium px-3">
                {currentSlide + 1} / {slides.length}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-2 hover:bg-white/10 text-white rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-full h-full bg-white">
                {slides[currentSlide].content}
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeckViewer;
