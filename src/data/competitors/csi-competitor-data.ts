// Shared competitor data for CSI-focused comparisons
// Used by CSIMoatSection and CompetitionSection

export const csiCompetitorData = {
  'Foundation Medicine': {
    assessment: 'Static HRD snapshots - one-time test, no evolution tracking',
    weaknesses: [
      'Static HRD snapshots',
      'One-time test',
      'No treatment history tracking',
      'No evolution tracking',
      'No post-treatment profiling'
    ]
  },
  'Guardant Health': {
    assessment: 'Liquid biopsy monitoring - detection-focused, not predictive',
    weaknesses: [
      'Detection-focused approach',
      'Monitoring specialization',
      'Reactive framework',
      'No continuous chemosensitivity tracking'
    ]
  }
};

export const crisproAdvantages = [
  'Continuous chemosensitivity re-estimation',
  'Multimodal integration (DDR + timing + kinetics)',
  'Full treatment-interval history',
  'Post-treatment pathway profiling',
  'Longitudinal tracking across lines'
];
