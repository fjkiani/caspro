import type { OracleContent } from '../oracleContent';

export const toExplainBlocks = (c: OracleContent) => ([
	{ kind: 'oracle-explain', props: c.explain },
	{ kind: 'vep-metrics', props: c.vepMetrics },
	{ kind: 'variant-detail', props: (c.useCases?.hereditaryBreastCancer?.examples?.[0] as any) || { id: 'VARIANT', region: 'coding', zeroShot: 0.5, verdict: 'Uncertain' } },
]);

export const toCalibration = (c: OracleContent) => ([
	{ kind: 'calibration-plot', props: { bins: c.calibration.bins, ece: c.calibration.ece } },
	{ kind: 'delta-ll-hist', props: { values: c.distributions.deltaLL } },
]);

export const toEssentialityChart = (c: OracleContent) => ([
	{ kind: 'essentiality-chart', props: { series: c.essentialitySeries } },
]);

export const toAccessibilityTrack = (c: OracleContent) => ([
	{ kind: 'accessibility-track', props: { tracks: c.accessibilityTracks } },
]);

export const toProteinDeltaCard = (c: OracleContent) => ([
	{ kind: 'protein-delta', props: c.proteinDelta },
]);

export const toOracleBlocksExtended = (c: OracleContent) => ([
	...toExplainBlocks(c),
	...toEssentialityChart(c),
	...toAccessibilityTrack(c),
	...toProteinDeltaCard(c),
	...toCalibration(c),
]); 