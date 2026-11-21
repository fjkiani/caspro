import { HOME_HERO } from '@/data/clinical-case-ui';

export type HeroOracleTagline = {
  /** Rotating suffix after the fixed prefix — keep short (subhead budget) */
  accent: string;
};

/** ≤8 words — homepage hero headline (canon: HOME_HERO) */
export const HERO_ORACLE_PREFIX = HOME_HERO.headline;

export const HERO_ORACLE_TAGLINES: HeroOracleTagline[] = [
  { accent: HOME_HERO.subhead },
  { accent: 'Name the responder before the drug debate starts.' },
  { accent: 'Block the mismatch. Prioritize the line that fits.' },
];
