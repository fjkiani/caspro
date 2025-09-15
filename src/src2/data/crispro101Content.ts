export const crispro101Content = {
	oracle: {
		explain: {
			sequence: 'A'.repeat(200),
			variant: { pos: 88, ref: 'C', alt: 'T' },
			saeFeatures: [
				{ name: 'Exon boundary', start: 60, end: 68 },
				{ name: 'TF motif', start: 120, end: 130 },
			],
			deltaLLSeries: Array.from({ length: 60 }, (_, i) => ({ pos: 70 + i, delta: Math.sin(i / 6) })),
		},
		vepMetrics: {
			byClass: [
				{ name: 'Coding', auroc: 0.961, auprc: 0.933 },
				{ name: 'Noncoding', auroc: 0.924, auprc: 0.881 },
				{ name: 'Splice', auroc: 0.947, auprc: 0.902 },
			],
		},
		exemplarVariant: {
			id: 'BRCA1:c.123A>T',
			region: 'coding' as const,
			zeroShot: 0.872,
			supervised: 0.915,
			verdict: 'Pathogenic' as const,
			notes: 'Consistent with ClinVar; calibrated.',
		},
	},
	forge: {
		guided: {
			objectives: [
				{ type: 'peak', start: 20, end: 60, value: 1 as const },
				{ type: 'tf', motif: 'CTCF', start: 80, end: 90, weight: 0.8 },
			],
			scorer: 'enformer' as const,
			beamWidth: 8,
			tokensPerBp: 4,
		},
		peaks: {
			length: 200,
			peaks: [
				{ start: 20, end: 60, value: 1 },
				{ start: 120, end: 150, value: 0.7 },
			],
			variantPos: 88,
		},
		summary: {
			auroc: 0.861,
			compute: { beamWidth: 8, tokensPerBp: 4 },
			scorerVersion: 'enformer-2024.08',
			modelVersion: 'evo2-1m',
			seed: 42,
		},
		qc: { synteny: 0.93, pfamHitRate: 0.88, dinucKL: 0.12 },
	},
	boltz: {
		pipeline: {
			steps: [
				{ id: 'prep', name: 'Prep', status: 'done' as const },
				{ id: 'simulate', name: 'Simulate', status: 'running' as const },
				{ id: 'score', name: 'Score', status: 'queued' as const },
			],
		},
		runlog: {
			lines: [
				{ ts: '12:03:11', level: 'info' as const, msg: 'AF3 inference started' },
				{ ts: '12:03:20', level: 'info' as const, msg: 'Complex confidence: 0.958' },
			],
		},
		provenance: {
			model: 'evo2',
			modelVersion: '1.0.0',
			scorer: 'enformer',
			scorerVersion: '2024.08',
			seed: 42,
			createdAt: new Date().toISOString(),
		},
		kpi: {
			items: [
				{ label: 'Sim runs', value: 24, delta: 2.4 },
				{ label: 'High-confidence', value: '83%', delta: 1.3 },
			],
		},
	},
	overview: {
		crisisStats: [
			{ value: '>90%', label: 'Clinical Trial Failure Rate', className: 'text-white' },
			{ value: '$2.8B+', label: 'Cost Per Approved Drug', className: 'text-white' },
			{ value: '5-10', label: 'Years to a Candidate', className: 'text-white' },
		],
		kpis: {
			items: [
				{ label: 'Variants scored', value: 12843, delta: 4.2 },
				{ label: 'Designs generated', value: 312, delta: 1.1 },
				{ label: 'QC pass rate', value: '96.3%', delta: 0.7 },
				{ label: 'Avg time/run', value: '2m 14s', delta: -3.4 },
			],
		},
	},
} as const;

export type Crispro101Content = typeof crispro101Content; 