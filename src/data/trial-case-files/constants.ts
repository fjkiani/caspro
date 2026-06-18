import type { TwoLayerPrediction, VectorAxisMeta } from './types';

export const VECTOR_AXIS_META: VectorAxisMeta[] = [
  { key: 'ddr', label: 'DDR', fullName: 'DNA Damage Response' },
  { key: 'mapk', label: 'MAPK', fullName: 'RAS/MAPK Signaling' },
  { key: 'pi3k', label: 'PI3K', fullName: 'PI3K/AKT/mTOR Pathway' },
  { key: 'io', label: 'IO', fullName: 'Immune Checkpoint / TME' },
  { key: 'vegf', label: 'VEGF', fullName: 'VEGF Angiogenesis' },
  { key: 'her2', label: 'HER2', fullName: 'HER2/ERBB2 Amplification' },
  { key: 'efflux', label: 'EFFLUX', fullName: 'Drug Efflux / Prior Resistance' },
  { key: 'rss', label: 'RSS', fullName: 'Replication Stress Saturation' },
];

export const TWO_LAYER_TABLE: TwoLayerPrediction[] = [
  { layer1: 'HIGH', layer2: 'HIGH', prediction: 'ENROLL — real target, right patients', isTarget: false },
  { layer1: 'HIGH', layer2: 'LOW', prediction: 'TARGET IS REAL, TRIAL WILL FAIL — wrong patient selection', isTarget: true },
  { layer1: 'LOW', layer2: 'HIGH', prediction: 'Wrong target — trial will fail', isTarget: false },
  { layer1: 'LOW', layer2: 'LOW', prediction: 'Full failure', isTarget: false },
];

export const TWO_LAYER_THESIS =
  'In precision oncology, the failure mode is not target biology — the failure mode is patient selection. ' +
  'A tool that accurately predicts target validity (Layer 1) but cannot stratify responders from non-responders (Layer 2) ' +
  'will correctly identify real targets while failing to prevent $300M+ Phase III losses.';
