/**
 * auto-stubs.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Hydrates `TrialCaseFile` records for every NCT-bearing trial in
 * LEDGER_PROGRAMS that does not already have a hand-authored case file.
 *
 * Slug convention:
 *   - Named cases (5): human slugs (`latify`, `capri`, `ceacam5`,
 *     `berzosertib`, `adavosertib`). These win over the NCT-slug fallback.
 *   - Everything else: kebab-case NCT id (e.g. `nct04154956`, `epoc1603`).
 *
 * The `AUTO_TRIAL_CASE_FILES` export is merged with the hand-authored
 * registry in `./registry.ts` via a plain spread. Hand-authored records
 * appear LAST in the merge so they always take precedence.
 */

import type { TrialCaseFile } from './types';
import { LEDGER_PROGRAMS, type LedgerProgramTrial } from '../ledger-programs';
import { makeTrialCaseStub, slugifyTrial } from './stub-factory';

/** Slugs that already have hand-authored, canon-locked case files. */
const HAND_AUTHORED_SLUGS = new Set(['latify', 'ceacam5', 'capri', 'adavosertib', 'berzosertib']);

/**
 * NCT → hand-authored slug mapping. Prevents duplicate auto-stubs from
 * shadowing the hand-authored records (both slugs point to the same trial).
 */
const NCT_TO_HAND_SLUG: Record<string, string> = {
  NCT05450692: 'latify',
  NCT04154956: 'ceacam5',
  NCT03462342: 'capri',
  NCT03579316: 'adavosertib',
  NCT02595892: 'berzosertib',
};

interface CollectedTrial {
  trial: LedgerProgramTrial;
  programIndex: number;
  trialIndex: number;
}

function collectAutoStubs(): Record<string, TrialCaseFile> {
  const out: Record<string, TrialCaseFile> = {};
  let caseCounter = 6; // hand-authored files use 01–05; auto-stubs start at 06.

  LEDGER_PROGRAMS.forEach((program, programIndex) => {
    program.trials.forEach((trial, trialIndex) => {
      const nct = (trial.nctId ?? '').trim();

      // Skip: this NCT is already covered by a hand-authored record.
      if (nct && NCT_TO_HAND_SLUG[nct]) return;

      // Skip: benchmark rows have no NCT-shaped id and no dedicated slug page
      // (they render on the program hub, not on their own case route).
      if (program.preview === 'benchmark') return;

      // Compute slug.
      const slug = slugifyTrial(trial);
      if (!slug) return;
      if (HAND_AUTHORED_SLUGS.has(slug)) return; // safety net

      const caseNumber = String(caseCounter).padStart(2, '0');
      caseCounter += 1;

      out[slug] = makeTrialCaseStub(trial, {
        program,
        caseNumber,
        slug,
      });
    });
  });

  return out;
}

export const AUTO_TRIAL_CASE_FILES: Record<string, TrialCaseFile> = collectAutoStubs();

/** Ordered list of auto-generated slugs. */
export const AUTO_TRIAL_SLUGS = Object.keys(AUTO_TRIAL_CASE_FILES);
