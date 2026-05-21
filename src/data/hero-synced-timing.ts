export type HeroSyncSpeed = 'slow' | 'normal' | 'fast';

/** Base timings (ms) — multiplied by speed preset */
export const HERO_SYNC_TIMING_BASE = {
  holdMs: 7800,
  fadeMs: 1100,
  glitchMs: 720,
  glitchTickMs: 42,
} as const;

export const HERO_SYNC_SPEED_MULTIPLIER: Record<HeroSyncSpeed, number> = {
  slow: 1.55,
  normal: 1,
  fast: 0.62,
};

export function heroSyncTiming(speed: HeroSyncSpeed) {
  const m = HERO_SYNC_SPEED_MULTIPLIER[speed];
  return {
    holdMs: Math.round(HERO_SYNC_TIMING_BASE.holdMs * m),
    fadeMs: Math.round(HERO_SYNC_TIMING_BASE.fadeMs * m),
    glitchMs: Math.round(HERO_SYNC_TIMING_BASE.glitchMs * m),
    glitchTickMs: Math.round(HERO_SYNC_TIMING_BASE.glitchTickMs * m),
  };
}

export const HERO_SYNC_SPEED_LABELS: Record<HeroSyncSpeed, string> = {
  slow: 'Slow',
  normal: 'Normal',
  fast: 'Fast',
};
