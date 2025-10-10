'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { deckRegistry, DeckMetadata, getDeckById } from '@/data/decks/deck-registry';

interface DeckViewerProps {
  initialDeckId?: string;
  onDeckChange?: (deck: DeckMetadata) => void;
  showControls?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const DeckViewer: React.FC<DeckViewerProps> = ({
  initialDeckId,
  onDeckChange,
  showControls = true,
  autoPlay = false,
  autoPlayInterval = 5000
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(initialDeckId || deckRegistry[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSlide, setCurrentSlide] = useState(0);

  const selectedDeck = getDeckById(selectedDeckId);
  const DeckComponent = selectedDeck?.component;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !selectedDeck?.slideCount) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % selectedDeck.slideCount!);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, selectedDeck?.slideCount, autoPlayInterval]);

  // Handle deck change
  const handleDeckChange = (deckId: string) => {
    setSelectedDeckId(deckId);
    setCurrentSlide(0);
    setIsPlaying(false);
    setIsDropdownOpen(false);
    
    const newDeck = getDeckById(deckId);
    if (newDeck && onDeckChange) {
      onDeckChange(newDeck);
    }
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedDeck?.slideCount) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          setCurrentSlide(prev => (prev + 1) % selectedDeck.slideCount!);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide(prev => (prev - 1 + selectedDeck.slideCount!) % selectedDeck.slideCount!);
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setCurrentSlide(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDeck?.slideCount, isFullscreen, isPlaying]);

  if (!selectedDeck || !DeckComponent) {
    return (
      <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Deck Not Found</h2>
          <p className="text-slate-400">The selected deck could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-slate-900 text-white font-sans ${isFullscreen ? 'h-screen' : 'h-screen'}`}>
      {/* Header with Deck Selector and Controls */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between p-4">
            {/* Deck Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
              >
                <span className="text-2xl">{selectedDeck.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{selectedDeck.title}</div>
                  <div className="text-sm text-slate-400">{selectedDeck.description}</div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50"
                  >
                    <div className="p-2">
                      {deckRegistry.map((deck) => (
                        <button
                          key={deck.id}
                          onClick={() => handleDeckChange(deck.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            deck.id === selectedDeckId 
                              ? 'bg-slate-700' 
                              : 'hover:bg-slate-700'
                          }`}
                        >
                          <span className="text-xl">{deck.icon}</span>
                          <div className="text-left flex-1">
                            <div className="font-semibold">{deck.title}</div>
                            <div className="text-sm text-slate-400">{deck.description}</div>
                            <div className="flex gap-1 mt-1">
                              {deck.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          {deck.slideCount && (
                            <div className="text-xs text-slate-500">
                              {deck.slideCount} slides
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              {selectedDeck.slideCount && selectedDeck.slideCount > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              )}

              {/* Reset */}
              {selectedDeck.slideCount && selectedDeck.slideCount > 1 && (
                <button
                  onClick={() => setCurrentSlide(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                  title="Reset to first slide"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Slide Progress Bar */}
          {selectedDeck.slideCount && selectedDeck.slideCount > 1 && (
            <div className="px-4 pb-2">
              <div className="w-full bg-slate-700 rounded-full h-1">
                <motion.div
                  className="bg-cyan-400 h-1 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentSlide + 1) / selectedDeck.slideCount) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Slide {currentSlide + 1} of {selectedDeck.slideCount}</span>
                <span>Press ← → or Space to navigate • F for fullscreen • P to play/pause</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deck Content */}
      <div className={`w-full ${showControls ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDeckId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <DeckComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DeckViewer;



