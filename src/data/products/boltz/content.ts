export type SimulationRun = { id: string; input: string; complexConfidence: number; notes?: string };

export const boltzContent = {
  runs: [
    { id: 'BOLTZ-001', input: 'QVQLQESGGGL...', complexConfidence: 0.958, notes: 'Meets threshold' },
    { id: 'BOLTZ-002', input: 'QVQLEGG...', complexConfidence: 0.921 },
  ] as SimulationRun[],
  kpis: {
    items: [
      { label: 'Sim runs', value: 24, delta: 2.4 },
      { label: 'High-confidence', value: '83%', delta: 1.3 },
    ],
  },
} as const;

export type BoltzContent = typeof boltzContent; 
 
 
 
 