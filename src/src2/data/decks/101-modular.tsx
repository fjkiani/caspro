import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideRenderer } from '../../components/slides/SlideRenderer';

// Import our modular slide composer
import { 
  SLIDE_SOURCES, 
  PREDEFINED_COMPOSITIONS, 
  getComposedDeck,
  composeCustomDeck,
  getAllSlidesMetadata,
  type SlideSelection 
} from '../adapters/slideComposer';

//================================================================================
// MODULAR SLIDE DECK MANAGER
// Pick and choose slides from any of our modular decks
//================================================================================

interface ModularDeckProps {
  initialMode?: keyof typeof PREDEFINED_COMPOSITIONS;
  customSelections?: SlideSelection[];
}

const ModularDeck: React.FC<ModularDeckProps> = ({ 
  initialMode = 'quick-demo',
  customSelections 
}) => {
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlideSelector, setShowSlideSelector] = useState(false);
  
  // Get current slides based on mode or custom selections
  const getCurrentSlides = () => {
    if (customSelections) {
      return composeCustomDeck(customSelections);
    }
    return getComposedDeck(currentMode);
  };
  
  const currentSlides = getCurrentSlides();
  const currentSlideData = currentSlides[currentSlide];
  
  // Navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextSlide();
      else if (event.key === 'ArrowLeft') prevSlide();
      else if (event.key === 'm' || event.key === 'M') {
        // Cycle through predefined compositions
        const modes = Object.keys(PREDEFINED_COMPOSITIONS) as Array<keyof typeof PREDEFINED_COMPOSITIONS>;
        const currentIndex = modes.indexOf(currentMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setCurrentMode(modes[nextIndex]);
        setCurrentSlide(0);
      }
      else if (event.key === 's' || event.key === 'S') {
        // Toggle slide selector
        setShowSlideSelector(!showSlideSelector);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMode, showSlideSelector]);
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 overflow-hidden relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-50 bg-slate-800/90 backdrop-blur rounded-lg p-4 border border-slate-700">
        <div className="flex flex-col gap-3">
          {/* Mode Selector */}
          <select
            value={currentMode}
            onChange={(e) => {
              setCurrentMode(e.target.value as keyof typeof PREDEFINED_COMPOSITIONS);
              setCurrentSlide(0);
            }}
            className="bg-slate-800 text-slate-200 px-3 py-1 rounded text-sm border border-slate-600"
          >
            {Object.keys(PREDEFINED_COMPOSITIONS).map(mode => (
              <option key={mode} value={mode}>
                {mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                ({getComposedDeck(mode as keyof typeof PREDEFINED_COMPOSITIONS).length} slides)
              </option>
            ))}
          </select>
          
          {/* Slide Counter */}
          <div className="text-xs text-slate-400">
            Slide {currentSlide + 1} of {currentSlides.length}
          </div>
          
          {/* Current Slide Info */}
          <div className="text-xs text-slate-400 max-w-xs">
            <div className="font-medium">{currentSlideData?.title}</div>
            <div className="text-slate-500">{currentSlideData?.subtitle}</div>
          </div>
        </div>
      </div>
      
      {/* Slide Selector Panel */}
      {showSlideSelector && (
        <div className="absolute top-4 right-4 z-50 bg-slate-800/95 backdrop-blur rounded-lg p-4 border border-slate-700 max-w-md max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold mb-3">Available Slides</h3>
          <div className="space-y-2">
            {Object.entries(SLIDE_SOURCES).map(([source, slides]) => (
              <div key={source} className="border-b border-slate-600 pb-2">
                <h4 className="font-medium text-cyan-400 capitalize mb-1">
                  {source.replace('-', ' ')}
                </h4>
                {slides.map((slide, index) => (
                  <button
                    key={`${source}-${index}`}
                    onClick={() => {
                      // This is a demo - in a real app, this would add to custom selections
                      console.log(`Selected: ${source} slide ${index}`);
                    }}
                    className="block w-full text-left p-2 hover:bg-slate-700 rounded text-xs"
                  >
                    <div className="font-medium">{slide.title}</div>
                    <div className="text-slate-400 truncate">{slide.subtitle}</div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <div className="absolute bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={prevSlide}
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded border border-slate-600 text-sm"
        >
          ← Previous
        </button>
        <button
          onClick={nextSlide}
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded border border-slate-600 text-sm"
        >
          Next →
        </button>
      </div>
      
      {/* Keyboard Shortcuts */}
      <div className="absolute bottom-4 right-4 z-50 text-xs text-slate-500">
        <div>← → Navigate | M: Mode | S: Selector</div>
      </div>
      
      {/* Main Slide Display */}
      <AnimatePresence mode="wait">
        {currentSlideData && (
          <SlideRenderer 
            key={`${currentMode}-${currentSlide}`} 
            slideData={currentSlideData} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModularDeck;

// Export the composer functions for external use
export {
  SLIDE_SOURCES,
  PREDEFINED_COMPOSITIONS,
  getComposedDeck,
  composeCustomDeck,
  getAllSlidesMetadata,
  type SlideSelection
};

