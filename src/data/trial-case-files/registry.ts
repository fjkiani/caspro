import type { TrialCaseFile } from './types';
import { ADAVOSERTIB } from './trials/adavosertib';
import { BERZOSERTIB } from './trials/berzosertib';
import { CAPRI } from './trials/capri';
import { CEACAM5 } from './trials/ceacam5';
import { LATIFY } from './trials/latify';
import { AUTO_TRIAL_CASE_FILES } from './auto-stubs';

/**
 * Hand-authored, canon-locked case files. These are the 5 named programs
 * whose numeric fits are gated but whose narrative fields are fully curated.
 */
const HAND_AUTHORED_CASE_FILES: Record<string, TrialCaseFile> = {
  latify: LATIFY,
  ceacam5: CEACAM5,
  adavosertib: ADAVOSERTIB,
  capri: CAPRI,
  berzosertib: BERZOSERTIB,
};

/**
 * Full trial case file registry.
 *
 * Merge order: auto-stubs first, hand-authored last. Hand-authored wins on
 * any slug collision (defence-in-depth in addition to the collision check
 * inside `auto-stubs.ts`).
 */
export const TRIAL_CASE_FILES: Record<string, TrialCaseFile> = {
  ...AUTO_TRIAL_CASE_FILES,
  ...HAND_AUTHORED_CASE_FILES,
};

/** All trial IDs (slugs) — hand-authored + auto-stub. */
export const TRIAL_IDS = Object.keys(TRIAL_CASE_FILES) as Array<keyof typeof TRIAL_CASE_FILES>;

/** Just the 5 hand-authored slugs, in canonical order. */
export const HAND_AUTHORED_TRIAL_IDS: readonly string[] = [
  'latify',
  'ceacam5',
  'adavosertib',
  'capri',
  'berzosertib',
] as const;
