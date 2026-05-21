export type HeroOracleTagline = {
  /** Rotating suffix after the fixed prefix */
  accent: string;
};

/** Fixed on screen — only the accent line below animates */
export const HERO_ORACLE_PREFIX = 'Precision Computional Oncology';

export const HERO_ORACLE_TAGLINES: HeroOracleTagline[] = [
  {
    accent: 'that de-risks your entire cohort before the trial even begins.',
  },
  {
    accent: 'that eliminates guesswork patients, doctors and pharma.',
  },
  {
    accent: 'that matches patients to trials based on biology — not eligibility.',
  },
  {
    accent: 'that tells you which patients will respond — before the first dose.',
  },
  {
    accent: 'that re-routes treatment the moment the tumor starts to escape.',
  },
  {
    accent: 'that would have caught all three Phase III failures — with timestamped receipts.',
  },
  {
    accent: 'in silico: every claim traces to a published paper. Nothing fabricated.',
  },
  {
    accent: 'before you spend $300 million finding out the hard way.',
  },
  {
    accent: 'that finds responders before enrollment — not after the trial fails.',
  },
  {
    accent: 'that validates against 78,000 women in PLCO — without sequencing a single patient.',
  },
];
