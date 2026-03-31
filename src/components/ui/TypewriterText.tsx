"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 40,
  deletingSpeed = 25,
  pauseDuration = 2500,
  className = '',
  cursorClassName = 'text-cyan-400',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentFullText = texts[textIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentFullText.length) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      } else {
        // Finished typing, pause then start deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, textIndex, isDeleting, isPaused, texts, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      {displayText}
      <span className={`${cursorClassName} animate-pulse`}>_</span>
    </span>
  );
};
