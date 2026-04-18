'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Minimize2, Play, Pause } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { getDeckById, getDeckBySlug, DeckMetadata } from '@/data/decks/deck-registry';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicDeckViewerProps {
  media: MediaItem;
  showControls?: boolean;
  /** When true (e.g. blog embed), avoid full-viewport height so the deck fits inside article layout. */
  embedded?: boolean;
}

export default function DynamicDeckViewer({ media, showControls = true, embedded = false }: DynamicDeckViewerProps) {
  const [deck, setDeck] = useState<DeckMetadata | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Try to load deck by slug first, then by ID
    let foundDeck: DeckMetadata | undefined;
    
    if (media.deckSlug) {
      foundDeck = getDeckBySlug(media.deckSlug);
    }

    if (!foundDeck && media.deckId) {
      foundDeck = getDeckById(media.deckId);
    }

    if (foundDeck) {
      setDeck(foundDeck);
    }
  }, [media.deckSlug, media.deckId, media.title]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!deck?.slideCount) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          setCurrentSlide(prev => (prev + 1) % deck.slideCount!);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide(prev => (prev - 1 + deck.slideCount!) % deck.slideCount!);
          break;
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck, isFullscreen, isPlaying]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || !deck?.slideCount) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % deck.slideCount!);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, deck?.slideCount]);

  // Fullscreen handling
  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [isFullscreen]);

  if (!deck) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center max-w-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">{media.title}</h2>
          {media.excerpt && (
            <p className="text-xl text-slate-300 mb-8">{media.excerpt}</p>
          )}
          <p className="text-slate-400 mb-4">
            Deck "{media.deckSlug || media.deckId}" not found in registry.
          </p>
          <p className="text-sm text-slate-500">
            Available decks: {['safety', 'efficacy', 'trials', 'r-and-d', 'crispro-101', 'metastasis'].join(', ')}
          </p>
        </div>
      </div>
    );
  }

  const DeckComponent = deck.component;

  return (
    <div
      className={`w-full bg-slate-900 text-white font-sans ${
        isFullscreen ? 'fixed inset-0 z-50' : embedded ? 'min-h-[min(70vh,640px)] max-h-[min(85vh,900px)]' : 'min-h-screen'
      }`}
    >
      {/* Controls */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold text-lg">{deck.title}</div>
                <div className="text-sm text-slate-400">{deck.description}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {deck.slideCount && deck.slideCount > 1 && (
                <>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setCurrentSlide(0)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                    title="Reset"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Slide Progress */}
          {deck.slideCount && deck.slideCount > 1 && (
            <div className="px-4 pb-2 max-w-7xl mx-auto">
              <div className="w-full bg-slate-700 rounded-full h-1">
                <motion.div
                  className="bg-cyan-400 h-1 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentSlide + 1) / deck.slideCount) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Slide {currentSlide + 1} of {deck.slideCount}</span>
                <span>← → to navigate • F for fullscreen • P to play/pause</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deck Content */}
      <div className={`w-full ${showControls ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={deck.id}
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
    </div>
  );
}
