'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardSliderProps {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
}

const CardSlider: React.FC<CardSliderProps> = ({
  children,
  className = '',
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  slidesToShow = 1,
  slidesToScroll = 1
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    if (newIndex !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 500); // Increased transition time
    }
  };

  const nextSlide = () => {
    goToSlide(currentIndex + slidesToScroll);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - slidesToScroll);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalSlides > slidesToShow) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + slidesToScroll));
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, maxIndex, slidesToShow, slidesToScroll]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && totalSlides > slidesToShow) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + slidesToScroll));
      }, autoPlayInterval);
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Container */}
      <div 
        className="relative overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          animate={{
            x: `-${currentIndex * (100 / slidesToShow)}%`
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          style={{
            width: `${(totalSlides * 100) / slidesToShow}%`
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / totalSlides}%`
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > slidesToShow && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 touch-manipulation"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalSlides > slidesToShow && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(totalSlides / slidesToScroll) }).map((_, index) => {
            const dotIndex = index * slidesToScroll;
            return (
              <button
                key={index}
                onClick={() => goToSlide(dotIndex)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentIndex >= dotIndex && currentIndex < dotIndex + slidesToScroll
                    ? 'bg-blue-600 w-6'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardSlider;
