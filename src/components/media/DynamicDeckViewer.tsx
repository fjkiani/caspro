'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [deck, setDeck] = useState<DeckMetadata | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
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

  const setExpanded = useCallback(async (next: boolean) => {
    if (next) {
      setIsExpanded(true);
      try {
        await containerRef.current?.requestFullscreen?.();
      } catch {
        /* fixed overlay still works on mobile where Fullscreen API is limited */
      }
      return;
    }

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        /* ignore */
      }
    }
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!deck?.slideCount) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          setCurrentSlide((prev) => (prev + 1) % deck.slideCount!);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide((prev) => (prev - 1 + deck.slideCount!) % deck.slideCount!);
          break;
        case 'Escape':
          if (isExpanded) {
            e.preventDefault();
            void setExpanded(false);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          void setExpanded(!isExpanded);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck, isExpanded, isPlaying, setExpanded]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || !deck?.slideCount) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deck.slideCount!);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, deck?.slideCount]);

  if (!deck) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center max-w-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">{media.title}</h2>
          {media.excerpt && <p className="text-xl text-slate-300 mb-8">{media.excerpt}</p>}
          <p className="text-slate-400 mb-4">
            Deck &quot;{media.deckSlug || media.deckId}&quot; not found in registry.
          </p>
        </div>
      </div>
    );
  }

  const DeckComponent = deck.component;
  const controlsPad = showControls ? (deck.slideCount && deck.slideCount > 1 ? 'pt-[7.25rem] sm:pt-24' : 'pt-14 sm:pt-16') : '';

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-slate-900 text-white font-sans ${
        isExpanded
          ? 'fixed inset-0 z-[9999] h-[100dvh]'
          : embedded
            ? 'h-[min(72vh,640px)] min-h-[420px] max-h-[min(85vh,900px)] overflow-hidden rounded-xl [&_main]:!h-full [&_main]:min-h-0'
            : 'min-h-screen'
      }`}
    >
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between gap-2 p-3 sm:p-4 max-w-7xl mx-auto">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-lg truncate">{deck.title}</div>
              <div className="text-xs sm:text-sm text-slate-400 truncate hidden sm:block">{deck.description}</div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {deck.slideCount && deck.slideCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(0)}
                    className="hidden sm:inline-flex p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                    title="Reset"
                    aria-label="Reset to first slide"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => void setExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-cyan-700/80 hover:bg-cyan-600 rounded-lg border border-cyan-500/40 transition-colors text-[10px] sm:text-xs font-black uppercase tracking-wider"
                title={isExpanded ? 'Exit fullscreen' : 'Expand deck'}
                aria-label={isExpanded ? 'Exit fullscreen' : 'Expand deck to fullscreen'}
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                ) : (
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                )}
                <span className="hidden min-[420px]:inline">{isExpanded ? 'Exit' : 'Expand'}</span>
              </button>
            </div>
          </div>

          {deck.slideCount && deck.slideCount > 1 && (
            <div className="px-3 sm:px-4 pb-2 max-w-7xl mx-auto">
              <div className="w-full bg-slate-700 rounded-full h-1">
                <motion.div
                  className="bg-cyan-400 h-1 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentSlide + 1) / deck.slideCount) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 mt-1 gap-2">
                <span>
                  Slide {currentSlide + 1} of {deck.slideCount}
                </span>
                <span className="hidden sm:inline">← → navigate • F expand • P play</span>
                <span className="sm:hidden">Swipe or use arrows</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={`w-full h-full min-h-0 ${controlsPad}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={deck.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full min-h-0 overflow-auto"
          >
            <DeckComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
