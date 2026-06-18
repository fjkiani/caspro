'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==============================================================================
// GLITCH TYPEWRITER — cycles through headlines with a glitched typing effect
// Usage: <GlitchTypewriter lines={[{text, highlight}]} accentColor="text-cyan-400"
//          onLineChange={(idx) => setActiveIdx(idx)} />
// ==============================================================================

interface GlitchLine {
  text: string;
  highlight?: string;
}

interface GlitchTypewriterProps {
  lines: GlitchLine[];
  accentColor?: string;
  typingSpeed?: number;     // ms per character
  holdDuration?: number;    // ms to hold after fully typed
  glitchChars?: string;     // character set for glitch effect
  isDarkMode?: boolean;
  onLineChange?: (index: number) => void; // fires when the active line index changes
  /** When false, stops after the first line (no glitch cycle) */
  loop?: boolean;
}

const GLITCH_CHARS = '█▓▒░╔╗╚╝━│┃┄▀▄';

export const GlitchTypewriter: React.FC<GlitchTypewriterProps> = ({
  lines,
  accentColor = 'text-cyan-400',
  typingSpeed = 45,        // slowed from 35
  holdDuration = 6000,     // slowed from 4000
  glitchChars = GLITCH_CHARS,
  isDarkMode = true,
  onLineChange,
  loop = true,
}) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [displayHighlight, setDisplayHighlight] = useState('');
  const [phase, setPhase] = useState<'typing-text' | 'typing-highlight' | 'holding' | 'glitching'>('typing-text');
  const [glitchOverlay, setGlitchOverlay] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLine = lines[lineIdx % lines.length];

  // Notify parent when line changes
  useEffect(() => {
    onLineChange?.(lineIdx % lines.length);
  }, [lineIdx, lines.length, onLineChange]);

  // Typing effect
  useEffect(() => {
    if (phase === 'typing-text') {
      if (displayText.length < currentLine.text.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentLine.text.slice(0, displayText.length + 1));
          // Random glitch flash
          if (Math.random() > 0.75) {
            const g = Array.from({ length: 3 }, () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join('');
            setGlitchOverlay(g);
            setTimeout(() => setGlitchOverlay(''), 50);
          }
        }, typingSpeed + Math.random() * 25);
      } else {
        if (currentLine.highlight) {
          setPhase('typing-highlight');
        } else {
          setPhase('holding');
        }
      }
    }

    if (phase === 'typing-highlight' && currentLine.highlight) {
      if (displayHighlight.length < currentLine.highlight.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayHighlight(currentLine.highlight!.slice(0, displayHighlight.length + 1));
        }, typingSpeed + Math.random() * 20);
      } else {
        setPhase('holding');
      }
    }

    if (phase === 'holding') {
      if (!loop) return;
      timeoutRef.current = setTimeout(() => {
        setPhase('glitching');
      }, holdDuration);
    }

    if (phase === 'glitching') {
      const glitchDuration = 500;
      glitchIntervalRef.current = setInterval(() => {
        const len = currentLine.text.length + (currentLine.highlight?.length || 0);
        setGlitchOverlay(
          Array.from({ length: Math.min(len, 30) }, () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join('')
        );
      }, 50);

      timeoutRef.current = setTimeout(() => {
        if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
        setGlitchOverlay('');
        setDisplayText('');
        setDisplayHighlight('');
        setLineIdx(prev => (prev + 1) % lines.length);
        setPhase('typing-text');
      }, glitchDuration);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, displayText, displayHighlight, currentLine, lines.length, typingSpeed, holdDuration, glitchChars, loop]);

  // Cleanup glitch interval on unmount
  useEffect(() => {
    return () => {
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, []);

  // Reset on lines change
  useEffect(() => {
    setLineIdx(0);
    setDisplayText('');
    setDisplayHighlight('');
    setPhase('typing-text');
    setGlitchOverlay('');
  }, [lines]);

  const heading = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="relative min-h-[3em] sm:min-h-[4em]">
      <h2 className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight leading-snug [overflow-wrap:anywhere] ${heading}`}>
        {displayText}
        {phase === 'typing-text' && (
          <span className={`${accentColor} animate-pulse`}>█</span>
        )}
        {currentLine.highlight && displayHighlight && (
          <>
            {' '}
            <span className={accentColor}>
              {displayHighlight}
              {phase === 'typing-highlight' && (
                <span className="animate-pulse">█</span>
              )}
            </span>
          </>
        )}
      </h2>

      {/* Glitch overlay */}
      <AnimatePresence>
        {glitchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 pointer-events-none ${accentColor} text-sm sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight leading-snug overflow-hidden`}
            style={{ mixBlendMode: 'screen' }}
          >
            {glitchOverlay}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trial reference watermark */}
      {currentLine.text === displayText && (currentLine as any).trial && phase === 'holding' && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`block text-[8px] font-mono uppercase tracking-[0.3em] mt-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}
        >
          ref: {(currentLine as any).trial}
        </motion.span>
      )}
    </div>
  );
};
