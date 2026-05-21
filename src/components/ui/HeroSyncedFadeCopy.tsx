'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import type { HeadlineEntry } from '@/data/hero-headlines';
import { HERO_ORACLE_PREFIX } from '@/data/hero-oracle-taglines';
import {
  type HeroSyncSpeed,
  heroSyncTiming,
  HERO_SYNC_SPEED_LABELS,
} from '@/data/hero-synced-timing';

const GLITCH_CHARS = '█▓▒░│┃';

type Phase = 'fade-in' | 'hold' | 'glitch-out' | 'fade-next';

export type HeroSyncedTagline = {
  accent: string;
};

type HeroSyncedFadeCopyProps = {
  taglines: HeroSyncedTagline[];
  gateLines: HeadlineEntry[];
  isDarkMode?: boolean;
  gateLabel?: string;
  defaultSpeed?: HeroSyncSpeed;
};

function glitchSnippet(len: number, max = 22): string {
  const n = Math.min(Math.max(len, 12), max);
  return Array.from(
    { length: n },
    () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
  ).join('');
}

export function HeroSyncedFadeCopy({
  taglines,
  gateLines,
  isDarkMode = true,
  gateLabel = 'ACTIVE GATE',
  defaultSpeed = 'slow',
}: HeroSyncedFadeCopyProps) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('fade-in');
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState<HeroSyncSpeed>(defaultSpeed);
  const [accentGlitch, setAccentGlitch] = useState('');
  const [gateGlitch, setGateGlitch] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timing = useMemo(() => heroSyncTiming(speed), [speed]);

  const tagline = taglines[idx % taglines.length];
  const gate = gateLines[idx % gateLines.length];
  const motionKey = `${idx % taglines.length}-${idx % gateLines.length}-${idx}`;

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    timeoutRef.current = null;
    glitchIntervalRef.current = null;
  }, []);

  const schedule = useCallback(
    (fn: () => void, ms: number) => {
      clearTimers();
      timeoutRef.current = setTimeout(fn, ms);
    },
    [clearTimers],
  );

  const stopGlitch = useCallback(() => {
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    glitchIntervalRef.current = null;
    setAccentGlitch('');
    setGateGlitch('');
  }, []);

  const startGlitchBurst = useCallback(() => {
    stopGlitch();
    const tick = () => {
      setAccentGlitch(glitchSnippet(tagline.accent.length));
      setGateGlitch(glitchSnippet(gate.text.length + (gate.highlight?.length ?? 0)));
    };
    tick();
    glitchIntervalRef.current = setInterval(tick, timing.glitchTickMs);
  }, [tagline.accent.length, gate.text, gate.highlight, timing.glitchTickMs, stopGlitch]);

  useEffect(() => {
    if (paused) {
      clearTimers();
      stopGlitch();
      return;
    }

    const { holdMs, fadeMs, glitchMs } = timing;

    if (phase === 'fade-in') {
      stopGlitch();
      schedule(() => setPhase('hold'), fadeMs);
      return clearTimers;
    }

    if (phase === 'hold') {
      schedule(() => {
        setPhase('glitch-out');
        startGlitchBurst();
      }, holdMs);
      return clearTimers;
    }

    if (phase === 'glitch-out') {
      schedule(() => {
        stopGlitch();
        setPhase('fade-next');
      }, glitchMs);
      return clearTimers;
    }

    if (phase === 'fade-next') {
      schedule(() => {
        setIdx((i) => i + 1);
        setPhase('fade-in');
      }, fadeMs);
      return clearTimers;
    }
  }, [
    phase,
    paused,
    schedule,
    clearTimers,
    timing,
    startGlitchBurst,
    stopGlitch,
  ]);

  useEffect(
    () => () => {
      clearTimers();
      stopGlitch();
    },
    [clearTimers, stopGlitch],
  );

  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const gatePanel = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/50'
    : 'border-slate-200 bg-transparent';
  const ctrlBtn = isDarkMode
    ? 'border-zinc-700 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/40'
    : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-500';
  const speedActive = isDarkMode
    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
    : 'bg-slate-900 border-slate-900 text-white';
  const speedIdle = isDarkMode
    ? 'border-transparent text-zinc-500 hover:text-zinc-200'
    : 'border-transparent text-slate-500 hover:text-slate-800';

  const fadeSec = timing.fadeMs / 1000;
  const showGlitch = phase === 'glitch-out';
  const textOpacity =
    phase === 'hold' ? 1 : phase === 'fade-in' ? 1 : phase === 'glitch-out' ? 0.92 : 0;

  const glitchOverlayClass = isDarkMode
    ? 'opacity-50 text-cyan-400/80'
    : 'opacity-40 text-slate-400';

  return (
    <div className="w-full max-w-2xl space-y-3 sm:space-y-4">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h1
            className={`text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] uppercase min-w-0 flex-1 ${heading}`}
          >
            {HERO_ORACLE_PREFIX}
          </h1>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div
              className={`inline-flex items-center rounded border overflow-hidden text-[7px] sm:text-[8px] font-black uppercase tracking-[0.12em] ${isDarkMode ? 'border-zinc-700' : 'border-slate-300'}`}
              role="group"
              aria-label="Animation speed"
            >
              {(['slow', 'normal', 'fast'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSpeed(preset)}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 border-r last:border-r-0 transition-colors ${
                    speed === preset ? speedActive : speedIdle
                  } ${isDarkMode ? 'border-zinc-700' : 'border-slate-200'}`}
                >
                  {HERO_SYNC_SPEED_LABELS[preset]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume hero copy' : 'Pause hero copy'}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded border transition-colors ${ctrlBtn}`}
            >
              {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span className="hidden min-[400px]:inline">{paused ? 'Play' : 'Pause'}</span>
            </button>
          </div>
        </div>

        <div className="relative min-h-[3.5rem] sm:min-h-[4rem] md:min-h-[4.75rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={`accent-${motionKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: textOpacity }}
              transition={{ duration: fadeSec, ease: 'easeInOut' }}
              className={`relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight leading-snug uppercase [overflow-wrap:anywhere] ${accent}`}
            >
              {tagline.accent}
            </motion.p>
          </AnimatePresence>
          {showGlitch && accentGlitch && (
            <span
              className={`absolute left-0 top-0 z-20 pointer-events-none font-black uppercase text-base sm:text-lg md:text-xl lg:text-2xl leading-snug ${glitchOverlayClass}`}
              style={isDarkMode ? { mixBlendMode: 'screen' } : undefined}
              aria-hidden
            >
              {accentGlitch}
            </span>
          )}
        </div>
      </div>

      <div className={`border rounded-sm px-3 py-3 sm:px-5 sm:py-4 ${gatePanel}`}>
        <div className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-2 sm:mb-3 ${muted}`}>
          {gateLabel}
        </div>

        <div className="relative min-h-[6rem] sm:min-h-[7rem] md:min-h-[7.75rem] lg:min-h-[8.25rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`gate-${motionKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: textOpacity }}
              transition={{ duration: fadeSec, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 z-10"
            >
              <p
                className={`text-[13px] sm:text-sm md:text-base lg:text-[17px] font-black tracking-tight leading-relaxed [overflow-wrap:anywhere] ${heading}`}
              >
                {gate.text}
                {gate.highlight ? (
                  <>
                    {' '}
                    <span className={accent}>{gate.highlight}</span>
                  </>
                ) : null}
              </p>
              <div className="h-4 sm:h-5 mt-1.5 sm:mt-2">
                {gate.trial && phase === 'hold' ? (
                  <span
                    className={`block text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] ${muted}`}
                  >
                    ref: {gate.trial}
                  </span>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
          {showGlitch && gateGlitch && (
            <div
              className={`absolute inset-x-0 top-0 z-20 pointer-events-none text-[13px] sm:text-sm md:text-base font-black leading-relaxed ${glitchOverlayClass}`}
              style={isDarkMode ? { mixBlendMode: 'screen' } : undefined}
              aria-hidden
            >
              {gateGlitch}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
