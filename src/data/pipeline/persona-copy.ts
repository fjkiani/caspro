import type { Persona } from '@/context/PersonaContext';

interface ProgramCardCopy {
  tabLabels: Record<'overview' | 'trials' | 'findings' | 'lessons' | 'value', string>;
  emptyTrials: string;
  emptyFindings: string;
  emptyLessons: string;
  ipValueTitle: string;
}

/**
 * PROGRAM_CARD_COPY — per-persona copy deck for the pipeline program card.
 *
 * Voice anchors:
 *   oncologist — clinical shorthand, precise nouns, no marketing
 *   patient    — plain English, explains acronyms in place
 *   pharma     — business-outcome framing, references receipt/audit posture
 *
 * NOTE: This deck powers copy + emphasis only. There is no visibility gate on
 * the pipeline (unlike /tumor-board), so every persona sees the same tabs.
 */
export const PROGRAM_CARD_COPY: Record<Persona, ProgramCardCopy> = {
  oncologist: {
    tabLabels: {
      overview: 'OVERVIEW',
      trials: 'TRIALS',
      findings: 'FINDINGS',
      lessons: 'LESSONS',
      value: 'VALUE',
    },
    emptyTrials: 'No trials in this program.',
    emptyFindings: 'No findings recorded.',
    emptyLessons: 'No transfer lessons recorded.',
    ipValueTitle: 'IP value',
  },
  patient: {
    tabLabels: {
      overview: 'ABOUT THIS PROGRAM',
      trials: 'STUDIES IN THIS PROGRAM',
      findings: 'WHAT WE LEARNED',
      lessons: 'WHAT THIS TEACHES US',
      value: 'WHY THIS MATTERS',
    },
    emptyTrials: 'No studies have been added to this program yet.',
    emptyFindings: 'No findings have been written up yet.',
    emptyLessons: 'No lessons have been written up yet.',
    ipValueTitle: 'Why this matters',
  },
  pharma: {
    tabLabels: {
      overview: 'PROGRAM',
      trials: 'TRIAL PORTFOLIO',
      findings: 'READOUTS',
      lessons: 'TRANSFER LEARNINGS',
      value: 'IP POSITION',
    },
    emptyTrials: 'No trials on ledger.',
    emptyFindings: 'No readouts logged.',
    emptyLessons: 'No transfer learnings logged.',
    ipValueTitle: 'IP position',
  },
};
