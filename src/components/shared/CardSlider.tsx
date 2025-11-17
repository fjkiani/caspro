'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardSliderProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  cardsToShow?: number; // Number of cards visible at once
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

function CardSlider<T = any>({
  items,
  renderCard,
  cardsToShow = 3,
  className = '',
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000
}: CardSliderProps<T>): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - cardsToShow);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && items.length > cardsToShow) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, items.length, cardsToShow, maxIndex]);

  return (
    <div className={`relative max-w-5xl mx-auto ${className}`}>
      {/* Navigation Arrows */}
      {showArrows && items.length > cardsToShow && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-slate-200 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-slate-200 ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
        </>
      )}

      {/* Slider Container - Show cards side-by-side, sliding */}
      <div className="overflow-hidden px-2 sm:px-4">
        <motion.div
          className="flex gap-2 sm:gap-3"
          animate={{
            x: `calc(-${currentIndex} * (100% / ${cardsToShow}))`
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40
          }}
          style={{
            width: `${items.length * (100 / cardsToShow)}%`
          }}
        >
          {items.map((item, index) => {
            if (!renderCard || typeof renderCard !== 'function') {
              console.error('renderCard is not a function');
              return null;
            }
            return (
              <div 
                key={index} 
                className="flex-shrink-0"
                style={{
                  width: `calc(100% / ${items.length} * ${cardsToShow})`,
                  padding: cardsToShow === 1 ? '0' : '0 0.25rem'
                }}
              >
                {renderCard(item, index)}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {showDots && items.length > cardsToShow && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: items.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 sm:w-10 bg-blue-600'
                  : 'w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardSlider;
