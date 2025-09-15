import type { Crispro101Content } from '../crispro101Content';

export const toOracleBlocks = (c: Crispro101Content) => ([
	{ kind: 'oracle-explain', props: c.oracle.explain },
	{ kind: 'vep-metrics', props: c.oracle.vepMetrics },
	{ kind: 'variant-detail', props: c.oracle.exemplarVariant },
]);

export const toForgeBlocks = (c: Crispro101Content) => ([
	{ kind: 'forge-guided', props: c.forge.guided },
	{ kind: 'sequence-peaks', props: c.forge.peaks },
	{ kind: 'design-summary', props: c.forge.summary },
	{ kind: 'qc-badges', props: c.forge.qc },
]);

export const toBoltzBlocks = (c: Crispro101Content) => ([
	{ kind: 'pipeline', props: c.boltz.pipeline },
	{ kind: 'run-log', props: c.boltz.runlog },
	{ kind: 'provenance', props: c.boltz.provenance },
	{ kind: 'kpi-strip', props: c.boltz.kpi },
]); 
 
 
 
 