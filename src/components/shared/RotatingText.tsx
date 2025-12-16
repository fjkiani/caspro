'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  gradient?: string;
}

/**
 * Reusable rotating text component for hero sections
 * Used for dynamic, attention-grabbing headlines
 * Example: <RotatingText texts={["CURE", "Engineer", "Discover"]} />
 */
export const RotatingText: React.FC<RotatingTextProps> = ({ 
  texts, 
  interval = 2500, 
  className = '',
  gradient
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  if (texts.length === 0) return null;
  if (texts.length === 1) {
    return (
      <span className={className}>
        {texts[0]}
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={gradient || ''}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
