export type Objective =
	| { type: 'peak'; start: number; end: number; value: 0 | 1 }
	| { type: 'tf'; motif: string; start: number; end: number; weight?: number };

export type Constraint = { label: string; value: string };

export type TrajectoryPoint = { step: number; score: number };

export type Candidate = { id: string; score: number; qc: { synteny: number; dinucKL: number }; notes?: string };

// Import business transformation types from Oracle
import type { IndustryProblem, ValueProposition, TransformationSummary } from './oracleContent';

export const forgeContent = {
	about: {
		oneLiner: 'An agentic platform for designing cancer immunotherapies: from automated variant interpretation to in silico therapeutic validation.',
		purpose: 'Engineer therapeutic solutions once a target is validated (not just analysis).',
		inputs: ['Validated target', 'Genomic neighborhood/context', 'Simple objectives (peaks/TF occupancy)'],
		modalities: ['Gene correction blueprints (HDR arms)', 'Synthetic‑lethal payloads', 'Novel nanobody/protein inhibitors', 'Small‑molecule modulators'],
		outputs: ['Candidate portfolio with rationale and design parameters', 'QC badges (synteny, dinuc KL)', 'Search trajectory (score vs step)'],
		evo2Context: [
			'40B-parameter foundation model',
			'1M-token context window',
			'Zero-shot biological understanding',
			'Guided generative epigenomics'
		],
		benchmarks: ['ClinVar (calibration via Oracle linkage)', 'DART‑Eval (regulatory DNA tasks)'],
		linkages: ['Oracle → validated intelligence', 'Command Center → orchestration, provenance'],
	},
	objectives: [
		{ type: 'peak', start: 20, end: 60, value: 1 as const },
		{ type: 'tf', motif: 'CTCF', start: 80, end: 90, weight: 0.8 },
	] as const,
	constraints: [
		{ label: 'GC%', value: '40–60' },
		{ label: 'No homopolymers', value: 'length > 5 disallowed' },
	] as const,
	compute: { beamWidth: 8, tokensPerBp: 4 } as const,
	trajectory: Array.from({ length: 12 }, (_, i) => ({ step: i + 1, score: 0.6 + i * 0.03 })) as readonly TrajectoryPoint[],
	candidates: [
		{ id: 'FORGE-001', score: 0.861, qc: { synteny: 0.94, dinucKL: 0.10 }, notes: 'Meets objective tightly' },
		{ id: 'FORGE-002', score: 0.842, qc: { synteny: 0.92, dinucKL: 0.12 } },
	] as const,
	presets: [
		{ id: 'mito', name: 'Mitochondrial', description: 'Compact genome, specific chromatin features' },
		{ id: 'micro', name: 'Microbial', description: 'Bacterial promoter/terminator patterns' },
		{ id: 'yeast', name: 'Yeast segment', description: 'Eukaryotic chromatin objectives' },
	] as const,
	benchmarks: {
		clinicalPrediction: { noncodingSOTA: true, BRCA1_SOTA: true },
		guidedDesign: { aurocHighCompute: 0.90, scaling: 'predictable', note: 'inference-time compute predictably improves design quality' },
		mito: { geneCountsOK: true, af3Complexes: 'correct folds', syntenyPreserved: true },
		prokaryote: { pfamHitFraction: 0.70, vsEvo1: '>3x improvement', pLDDT: 'near‑natural' },
		naturalness: { dinucleotideDelta: 0.0, note: 'avoids pathological sequences' },
		capabilities: { ultraLongHomologyArms: true, multiComponentDesigns: true },
	},
	commands: [
		'Design a gene correction blueprint for RUNX1 (HDR arms ≥ 2 kb each)',
		'Forge a nanobody to inhibit ASXL1 protein',
		'Create a synthetic‑lethal payload targeting TP53‑/‑ context',
	] as const,
	caseStudies: {
		runx1: {
			challenge: 'Design high‑efficiency HDR correction for RUNX1 with ultra‑long homology arms',
			artifacts: {
				hdrBlueprint: { leftArmBp: 2000, rightArmBp: 2000, rationale: 'Longer arms improve HDR integration efficiency within the genomic neighborhood.' },
				guides: [{ id: 'gRUNX1‑001', pam: 'NGG', onTarget: 0.72, offTargetRisk: 'low' }],
				nanobody: { target: 'ASXL1', predictedAffinity: 'high', notes: 'Sequence proposed for wet‑lab validation' },
			},
			outcomes: ['Blueprint meets objectives in silico', 'Candidates pass synteny/naturalness QC', 'Ready for Command Center orchestration'],
		},
	},
	pipeline: {
		steps: [
			'Oracle: validate target and variants',
			'Forge: specify objectives and generate candidates',
			'Command Center: orchestrate runs, record provenance, prepare for validation',
		],
	},
	ipValue: {
		leadTimeCompression: 'years → hours (portfolio generation)',
		patentability: 'novel compositions of matter; documented rationale',
		portfolioDiversity: 'multiple candidate families per command',
	},
	agentic: {
		mission: 'Agentic design loop for cancer immunotherapies end‑to‑end.',
		autonomy: { level: 'co‑pilot', options: ['assist', 'co‑pilot', 'auto'] as const },
		loop: [
			'Perceive: Oracle VEP, cohort context',
			'Plan: synthesize objectives/constraints',
			'Act: guided generation with Evo2',
			'Evaluate: Enformer/Borzoi, AF3/ESMFold, VEPMetrics',
			'Reflect: revise objectives, reweight rewards',
			'Decide: thresholds met → handoff to Command Center',
		],
		tools: ['Evo2 (generate)', 'Enformer', 'Borzoi', 'AlphaFold 3', 'ESMFold', 'Oracle VEP', 'VEPMetrics'],
		policies: { rewardWeights: { targetMatch: 0.5, naturalness: 0.2, structurePlausibility: 0.2, safety: 0.1 }, hardConstraints: ['GC%', 'no‑homopolymers', 'viral‑generation‑guard'] },
		checkpoints: ['Objective review', 'QC review', 'Case handoff to Command Center'],
		successCriteria: { aurocTarget: 0.9, syntenyMin: 0.9, dinucKLMax: 0.15 },
	},
	immunotherapy: {
		presets: [
			{ id: 'neoantigen', name: 'Neoantigen design', params: { mhcAlleles: ['HLA‑A*02:01'], peptideLength: [8, 9, 10] } },
			{ id: 'car‑t', name: 'CAR‑T scFv', params: { epitopeSource: 'tumor cell surface', offTargetScan: true } },
			{ id: 'tcr', name: 'TCR binding', params: { mhcAlleles: ['HLA‑A*02:01'] } },
		] as const,
		validators: ['pMHC binding model (proxy)', 'immunogenicity proxy', 'off‑target scan'],
	},
	// Business transformation content for Forge
	transformation: {
		industryProblem: {
			title: 'The Design Bottleneck Crisis',
			metrics: [
				{ label: 'Design failure rate', value: '85%', subtitle: 'Therapeutic candidates fail in preclinical' },
				{ label: 'Design-to-candidate time', value: '18 months', subtitle: 'Traditional iterative design' },
				{ label: 'Cost per successful design', value: '$8M', subtitle: 'Including failed iterations' },
			],
			description: 'Most therapeutic failures occur because designs are based on intuition rather than systematic engineering. Teams waste years iterating on fundamentally flawed concepts.',
		} as IndustryProblem,
		valuePropositions: [
			{
				title: 'Engineer Multi-Modal Therapeutics with Guided Generation',
				description: 'Design complete therapeutic portfolios with predictable quality scaling using Evo2\'s guided generation capabilities.',
				comparison: {
					traditional: [
						{ label: '20+ design iterations', cost: '$4M' },
						{ label: '18 months to candidate', cost: '$8M total' },
						{ label: 'Random success rate', cost: '15% viable' },
					],
					oracle: [
						{ label: '3 guided iterations', cost: '$200K' },
						{ label: '2 weeks to portfolio', cost: '$300K total' },
						{ label: 'Predictable AUROC 0.9', cost: '90% viable' },
					],
				},
				impact: [
					{ label: 'Design iterations', before: '20+', after: '3' },
					{ label: 'Time to portfolio', before: '18 months', after: '2 weeks' },
					{ label: 'Success predictability', before: 'Random', after: '90% AUROC' },
					{ label: 'Cost reduction', before: 'baseline', after: '96% savings' },
				],
			},
			{
				title: 'Generate Ultra-Long Homology Arms for HDR Efficiency',
				description: 'Leverage 1M-token context to design ultra-long homology arms that dramatically improve HDR integration rates.',
				comparison: {
					traditional: [
						{ label: 'Short homology arms (500bp)', cost: '15% HDR rate' },
						{ label: 'Multiple delivery attempts', cost: '$2M' },
						{ label: 'Low integration efficiency', cost: '3 months delay' },
					],
					oracle: [
						{ label: 'Ultra-long arms (4kb)', cost: '85% HDR rate' },
						{ label: 'Single delivery success', cost: '$200K' },
						{ label: 'High integration efficiency', cost: 'On schedule' },
					],
				},
				impact: [
					{ label: 'HDR integration rate', before: '15%', after: '85%' },
					{ label: 'Delivery attempts', before: 'Multiple', after: 'Single' },
					{ label: 'Development timeline', before: '+3 months', after: 'On schedule' },
					{ label: 'Cost per success', before: '$13M', after: '$235K' },
				],
			},
			{
				title: 'Design Novel Therapeutic Proteins with Structural Validation',
				description: 'Generate bespoke nanobodies and therapeutic proteins with built-in structural plausibility validation.',
				comparison: {
					traditional: [
						{ label: 'Library screening', cost: '$3M' },
						{ label: '12 months optimization', cost: '$5M' },
						{ label: 'Structural unknowns', cost: 'High risk' },
					],
					oracle: [
						{ label: 'Rational design', cost: '$100K' },
						{ label: '4 weeks optimization', cost: '$200K' },
						{ label: 'AF3 structural validation', cost: 'Low risk' },
					],
				},
				impact: [
					{ label: 'Discovery approach', before: 'Random screening', after: 'Rational design' },
					{ label: 'Optimization time', before: '12 months', after: '4 weeks' },
					{ label: 'Structural risk', before: 'Unknown', after: 'AF3 validated' },
					{ label: 'Total cost', before: '$8M', after: '$300K' },
				],
			},
		] as ValueProposition[],
		summary: {
			title: 'Total Design Revolution',
			metrics: [
				{ label: 'Design cost reduction', value: '96%', subtitle: '$8M → $300K per program' },
				{ label: 'Time compression', value: '36x', subtitle: '18 months → 2 weeks' },
				{ label: 'Success predictability', value: '90%', subtitle: 'AUROC vs random chance' },
				{ label: 'Portfolio diversity', value: '10x', subtitle: 'Multiple families per command' },
			],
			description: 'Forge transforms therapeutic design from an art into an engineering discipline. Instead of hoping random iterations will work, teams can systematically engineer solutions with predictable outcomes and scientific confidence.',
		} as TransformationSummary,
	},
	audienceValue: {
		biotech: [
			'Specify simple objectives (peaks/motifs) and trade compute for quality before synthesis.',
			'QC candidates with Pfam/ESMFold‑aligned proxies and synteny/naturalness to reduce rework.',
		],
		oncologyClinicians: [
			'Preclinical prototyping: design regulatory edits with measurable target match and QC evidence.',
		],
		geneticTestingLabs: [
			'Design assay sequences/controls with constraint primitives; provenance and QC support validation.',
		],
		pharma: [
			'Compress lead identification with multi‑candidate portfolios and transparent design evidence.',
			'Integrate with Command Center for compliance, provenance, and review workflows.',
		],
		academia: [
			'Test ambitious hypotheses in silico across presets (mito, microbial, yeast) before wet‑lab spend.',
		],
		desci: [
			'Generate verifiable assets (designs + provenance) suitable for IP‑NFT or shared registries.',
		],
	},
} as const;

export type ForgeContent = typeof forgeContent; 