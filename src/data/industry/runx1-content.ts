import type { TwoHitStep, RiskPrediction } from '@/components/industry/runx1';

export const runx1Content = {
  hero: {
    title: 'The RUNX1 Conquest',
    subtitle: 'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
  },
  twoHit: {
    steps: [
      { titleHTML: 'Healthy<br/>Cell', subtextHTML: 'Normal RUNX1', color: 'green' as const },
      { titleHTML: 'First<br/>Hit', subtextHTML: 'Inherited RUNX1<br/>Mutation', color: 'yellow' as const, icon: '🧬' },
      { titleHTML: 'Second<br/>Hit', subtextHTML: 'Acquired Somatic<br/>Mutation', color: 'orange' as const, icon: '💥' },
      { titleHTML: 'Leukemic<br/>Cell', subtextHTML: 'Full-Blown<br/>Leukemia', color: 'red' as const },
    ] as TwoHitStep[],
    caption: "The 'two-hit' model explains disease progression; our approach starts with first-principles understanding of this pathway.",
  },
  riskMap: {
    knownThreat: { title: 'Known Genetic Risk', subtext: 'RUNX1 (First Hit)' },
    aiCore: { title: 'Oracle Analysis' },
    predictions: [
      { name: 'ASXL1', risk: '(-15k Risk)', level: 'high' as const },
      { name: 'TET2', risk: '(-12k Risk)', level: 'high' as const },
      { name: 'DNMT3A', risk: '(-9k Risk)', level: 'medium' as const },
    ] as RiskPrediction[],
    caption: 'We simulate likely evolutionary paths to design therapies that remain effective under resistance.',
  },
  arsenal: {
    input: 'Input: Disease Map',
    processTitle: 'Forge Engine',
    outputs: ['Gene Correction', 'Clone Elimination', 'Novel Biologics'],
    caption: 'Forge moves from analysis to creation: multi-pronged strategy generated entirely in silico.',
  },
} as const;

export type Runx1Content = typeof runx1Content;

