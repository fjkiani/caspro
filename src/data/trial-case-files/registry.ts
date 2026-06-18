import type { TrialCaseFile } from './types';
import { ADAVOSERTIB } from './trials/adavosertib';
import { BERZOSERTIB } from './trials/berzosertib';
import { CAPRI } from './trials/capri';
import { CEACAM5 } from './trials/ceacam5';
import { LATIFY } from './trials/latify';

export const TRIAL_CASE_FILES: Record<string, TrialCaseFile> = {
  latify: LATIFY,
  ceacam5: CEACAM5,
  adavosertib: ADAVOSERTIB,
  capri: CAPRI,
  berzosertib: BERZOSERTIB,
};

export const TRIAL_IDS = Object.keys(TRIAL_CASE_FILES) as Array<keyof typeof TRIAL_CASE_FILES>;
