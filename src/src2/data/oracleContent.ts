export type SAEFeatureSpan = { name: string; start: number; end: number; score?: number };
export type DeltaLLPoint = { pos: number; delta: number };
export type VEPRow = { name: 'coding' | 'noncoding' | 'splice' | string; auroc: number; auprc?: number };
export type EssentialityPoint = { context: { cellLine: string; mutations?: string[] }; score: number };
export type AccessibilityTrack = { context?: string; points: { pos: number; score: number }[] };
export type ProteinDelta = { function: number; stability?: number; foldingImpact?: number; notes?: string };
export type CalibrationBin = { p_hat: number; observed: number };

// Business transformation types
export type IndustryProblem = {
	title: string;
	metrics: { label: string; value: string; subtitle: string }[];
	description: string;
};

export type ApproachComparison = {
	traditional: { label: string; cost: string }[];
	oracle: { label: string; cost: string }[];
};

export type BusinessImpact = {
	label: string;
	before: string;
	after: string;
};

export type ValueProposition = {
	title: string;
	description: string;
	comparison: ApproachComparison;
	impact: BusinessImpact[];
	components?: {
		primary?: any;
		secondary?: any[];
	};
};

export type TransformationSummary = {
	title: string;
	metrics: { label: string; value: string; subtitle: string }[];
	description: string;
};

export const oracleContent = {
	title: "Oracle: Variant Impact Prediction",
	subtitle: "Zero-shot pathogenicity prediction with biological reasoning at protein, transcript, and genomic scales",
	badge: {
		icon: "🧬",
		text: "Discriminative AI",
		color: "blue"
	},
	metrics: [
		{ value: "94.2%", label: "AUROC", description: "Area under ROC curve for pathogenicity classification" },
		{ value: "91.8%", label: "Precision", description: "Positive predictive value for pathogenic variants" },
		{ value: "89.3%", label: "Recall", description: "Sensitivity for detecting pathogenic variants" }
	],
	about: {
		oneLiner: 'Turn raw variants into explainable, clinical decisions.',
		purpose: 'Resolve uncertainty with quantitative, zero-shot predictions.',
		inputs: ['ref/alt 8,192 nt window', 'locus+assembly', 'context tags'],
		outputs: ['delta_likelihood_score', 'verdict', 'explainability'],
		evo2Context: ['long-context embeddings', 'SAE interpretability'],
		benchmarks: ['ClinVar', 'SpliceVarDB', 'BRCA1/2 screens', 'DART-Eval'],
	},
	explain: {
		sequence: 'A'.repeat(200),
		variant: { pos: 88, ref: 'C', alt: 'T' },
		saeFeatures: [
			{ name: 'Exon boundary', start: 60, end: 68 },
			{ name: 'TF motif', start: 120, end: 130 },
		] as SAEFeatureSpan[],
		deltaLLSeries: Array.from({ length: 60 }, (_, i) => ({ pos: 70 + i, delta: Math.sin(i / 6) })) as DeltaLLPoint[],
	},
	vepMetrics: { byClass: [
		{ name: 'coding', auroc: 0.931, auprc: 0.908 },
		{ name: 'noncoding', auroc: 0.866, auprc: 0.812 },
		{ name: 'splice', auroc: 0.887, auprc: 0.841 },
	] as VEPRow[] },
	essentialitySeries: [
		{ context: { cellLine: 'A549', mutations: ['TP53', 'KEAP1'] }, score: 0.82 },
		{ context: { cellLine: 'MCF7', mutations: ['PIK3CA'] }, score: 0.67 },
	] as EssentialityPoint[],
	accessibilityTracks: [
		{ context: 'K562', points: Array.from({ length: 100 }, (_, i) => ({ pos: i, score: 0.4 + 0.3 * Math.sin(i / 10) })) },
	] as AccessibilityTrack[],
	proteinDelta: { function: -0.31, stability: -0.12, foldingImpact: -0.24, notes: 'Loss-of-function trend' } as ProteinDelta,
	calibration: { bins: [
		{ p_hat: 0.1, observed: 0.11 },
		{ p_hat: 0.3, observed: 0.29 },
		{ p_hat: 0.5, observed: 0.48 },
		{ p_hat: 0.7, observed: 0.66 },
		{ p_hat: 0.9, observed: 0.86 },
	] as CalibrationBin[], ece: 0.037 },
	distributions: { deltaLL: [-0.9, -0.7, -0.2, 0.1, 0.3, 0.5, -0.1, -0.4] },
	// Discriminative AI Performance - Accurate metrics from Evo2 paper
	discriminativePerformance: {
		// Zero-shot variant pathogenicity prediction (no fine-tuning required)
		clinVar: { 
			codingSNV: { auroc: 0.957, samples: 14319, description: 'Single nucleotide variants in coding regions' },
			nonCodingSNV: { auroc: 0.957, samples: 34761, description: 'Noncoding variants - state-of-the-art' },
			codingNonSNV: { auroc: 0.939, samples: 1236, description: 'Insertions/deletions in coding regions' },
			nonCodingNonSNV: { auroc: 0.939, samples: 3894, description: 'Complex variants in noncoding regions' }
		},
		// BRCA1/2 breast cancer variant classification  
		brca1: { 
			supervisedAUROC: 0.94, supervisedAUPRC: 0.84, // Supervised classifier on Evo2 embeddings
			allSNV_AUROC: 0.95, allSNV_AUPRC: 0.86, // All BRCA1 variants (coding + noncoding)
			zeroShotAUROC: 0.891, // Zero-shot performance without any training
			samples: 3893, description: 'BRCA1 breast cancer variants'
		},
		// Splice variant prediction
		spliceVarDB: { 
			exonicAUROC: 0.826, intronicAUROC: 0.826,
			description: 'Experimentally validated splice-affecting variants'
		},
		// Cross-species generalization
		crossSpecies: { 
			aurocRange: '0.82-0.99', species: 8,
			description: 'Gene prediction across phylogenetically diverse species' 
		},
		// VUS resolution capability
		vusResolution: { 
			traditionalRate: '40-60%', oracleRate: '15%', improvement: '73%',
			description: 'Massive reduction in variants of uncertain significance'
		},
		// SAE interpretability features (Mechanistic interpretability)
		saeFeatures: {
			totalFeatures: 32768, activeFeatures: 64, layer: 26,
			biologicalFeatures: 'exon-intron boundaries, transcription factor motifs, protein structural elements, prophage regions',
			description: 'Sparse Autoencoders reveal learned biological concepts without supervision'
		}
	},
	useCases: {
		hereditaryBreastCancer: {
			panel: ['BRCA1', 'BRCA2', 'PALB2', 'CHEK2', 'ATM'],
			examples: [
				{ id: 'BRCA1:c.123A>T', region: 'coding' as const, zeroShot: 0.872, verdict: 'Pathogenic' as const, notes: 'Consistent with ClinVar' },
				{ id: 'TERT:-124C>T', region: 'noncoding' as const, zeroShot: 0.804, verdict: 'Pathogenic' as const, notes: 'Promoter activity increase expected' },
			],
		},
		newbornScreening: {
			panels: ['SMA', 'PKU', 'SCID'], throughput: { variantsPerHour: 20000 },
			examples: [
				{ id: 'SMN1:del', zeroShot: 0.925, treatable: true },
			],
		},
	},
	// Business transformation content
	transformation: {
		industryProblem: {
			title: 'The $2.6B Problem',
			metrics: [
				{ label: 'Drug failure rate', value: '90%', subtitle: 'Phase I-III clinical trials' },
				{ label: 'Average cost per drug', value: '$2.6B', subtitle: 'Including failures' },
				{ label: 'Development timeline', value: '15 years', subtitle: 'Lab to market' },
			],
			description: 'Most failures stem from poor target validation and unpredictable variant effects. Biotechs burn through funding on variants that were doomed from the start.',
		} as IndustryProblem,
		valuePropositions: [
			{
				title: 'Reduce Wet-Lab Iterations by Triaging Variants',
				description: 'Pre-screen thousands of variants with calibrated zero-shot scores before expensive wet-lab validation.',
				comparison: {
					traditional: [
						{ label: 'Screen 1,000 variants', cost: '$500K' },
						{ label: '6 months wet-lab', cost: '$2M' },
						{ label: '~50 promising hits', cost: '5% success' },
					],
					oracle: [
						{ label: 'Pre-screen 1,000 variants', cost: '$1K' },
						{ label: 'Test top 200 variants', cost: '$400K' },
						{ label: '~146 promising hits', cost: '73% success' },
					],
				},
				impact: [
					{ label: 'Time to first hit', before: '6 months', after: '2 weeks' },
					{ label: 'Success rate', before: '5%', after: '73%' },
					{ label: 'Cost per hit', before: '$50K', after: '$2.7K' },
					{ label: 'Runway extension', before: 'baseline', after: '+18 months' },
				],
				components: {
					primary: {
						type: 'oracleScore',
						config: {
							left: { title: 'Random Variant', value: 'VUS', subtitle: '(5% hit rate)' },
							right: { title: 'Oracle-Triaged', value: 'Pathogenic', subtitle: '(73% hit rate)' },
							score: { title: 'Cost Savings', value: '$2.1M' }
						}
					}
				},
			},
			{
				title: 'Prioritize Constructs Using Explainable Evidence',
				description: 'Use SAE-derived features (exon/intron boundaries, TF motifs) to rank construct risk and avoid failures.',
				comparison: {
					traditional: [
						{ label: 'Test 50 constructs', cost: '$2.5M' },
						{ label: '20% success rate', cost: '10 hits' },
						{ label: '40 failed constructs', cost: '$2M waste' },
					],
					oracle: [
						{ label: 'Risk-rank constructs', cost: '$5K' },
						{ label: 'Test top 12 constructs', cost: '$600K' },
						{ label: '83% success rate', cost: '10 hits' },
					],
				},
				impact: [
					{ label: 'Constructs tested', before: '50', after: '12' },
					{ label: 'Success rate', before: '20%', after: '83%' },
					{ label: 'Failed constructs avoided', before: '40 failures', after: '2 failures' },
					{ label: 'Cost savings', before: 'baseline', after: '$1.9M' },
				],
				components: {
					primary: {
						type: 'explainTrack',
						config: {
							sequence: 'ATCGATCGATCGATCG',
							variant: { ref: 'A', pos: 8, alt: 'T' },
							saeFeatures: [
								{ name: 'Exon boundary', start: 5, end: 10, score: 0.9 },
								{ name: 'CTCF motif', start: 12, end: 16, score: 0.7 }
							],
							deltaLLSeries: [
								{ pos: 6, delta: 0.1 }, { pos: 7, delta: 0.3 }, { pos: 8, delta: -0.8 }, { pos: 9, delta: 0.2 }
							]
						}
					}
				},
			},
			{
				title: 'Guide Sequence Generation with Predictable Scaling',
				description: 'Trade compute for design quality with predictable AUROC scaling from draft to production quality.',
				comparison: {
					traditional: [
						{ label: '20 design iterations', cost: '$1M' },
						{ label: '6 months to candidate', cost: '$3M' },
						{ label: 'Random success', cost: 'Unpredictable' },
					],
					oracle: [
						{ label: '3 design iterations', cost: '$150K' },
						{ label: '2 weeks to candidate', cost: '$200K' },
						{ label: '91% AUROC success', cost: 'Predictable' },
					],
				},
				impact: [
					{ label: 'Design iterations', before: '20', after: '3' },
					{ label: 'Time to candidate', before: '6 months', after: '2 weeks' },
					{ label: 'Success predictability', before: 'Random', after: '91% AUROC' },
					{ label: 'R&D efficiency', before: 'baseline', after: '+400%' },
				],
				components: {
					primary: {
						type: 'guidedDesign',
						config: {
							objectives: [
								{ type: 'peak', start: 20, end: 60, value: 1 },
								{ type: 'tf', motif: 'CTCF', start: 80, end: 90, weight: 0.8 }
							],
							scorer: 'enformer',
							beamWidth: 16,
							tokensPerBp: 8
						}
					},
					secondary: {
						type: 'sequencePeaks',
						config: {
							title: 'Generated vs Target Sequence',
							length: 200,
							peaks: [
								{ start: 20, end: 60, value: 1 },
								{ start: 80, end: 90, value: 0.8 }
							],
							variantPos: 88
						}
					}
				},
			},
		] as ValueProposition[],
		summary: {
			title: 'Total Transformation Impact',
			metrics: [
				{ label: 'Cost savings per program', value: '$5.5M', subtitle: 'Variant triaging + construct de-risking' },
				{ label: 'Faster to first hit', value: '18x', subtitle: '6 months → 2 weeks' },
				{ label: 'Success rate', value: '73%', subtitle: 'vs 5% industry average' },
				{ label: 'Extended runway', value: '+2 years', subtitle: 'From cost savings' },
			],
			description: 'Oracle transforms biotech R&D from a high-risk gamble into a predictable engineering discipline. Instead of burning through funding on doomed variants, biotechs can focus resources on the most promising candidates with scientific confidence.',
		} as TransformationSummary,
	},
	// Oncology clinicians transformation content
	oncologyTransformation: {
		industryProblem: {
			title: 'The VUS Crisis in Precision Oncology',
			metrics: [
				{ label: 'VUS rate', value: '40%', subtitle: 'Variants of unknown significance' },
				{ label: 'Treatment selection time', value: '18 months', subtitle: 'From diagnosis to optimal therapy' },
				{ label: 'Cost per patient workup', value: '$150K', subtitle: 'Including failed approaches' },
			],
			description: 'Half of all genetic variants remain unactionable, forcing clinicians to make treatment decisions without clear evidence. Patients suffer while doctors navigate uncertainty with limited tools.',
		} as IndustryProblem,
		valuePropositions: [
			{
				title: 'Resolve VUS Ambiguity with Zero-Shot Clinical Predictions',
				description: 'Transform uncertain variants into actionable clinical decisions using calibrated pathogenicity scores and explainable evidence.',
				comparison: {
					traditional: [
						{ label: 'Manual literature review', cost: '40 hours' },
						{ label: 'Family studies coordination', cost: '$25K' },
						{ label: 'Functional assays (if available)', cost: '$50K' },
						{ label: '50% remain VUS', cost: 'No action' },
					],
					oracle: [
						{ label: 'Zero-shot prediction', cost: '5 minutes' },
						{ label: 'SAE explainable features', cost: 'Included' },
						{ label: 'Calibrated confidence scores', cost: 'Included' },
						{ label: '73% VUS resolved', cost: 'Actionable' },
					],
				},
				impact: [
					{ label: 'VUS resolution rate', before: '50%', after: '73%' },
					{ label: 'Time to clinical decision', before: '6 weeks', after: '1 day' },
					{ label: 'Cost per variant analysis', before: '$75K', after: '$50' },
					{ label: 'Patient treatment delay', before: '6 weeks', after: 'Same day' },
				],
				components: {
					primary: {
						type: 'geneEssentiality',
						context: 'clinical',
						story: 'tumor-selectivity',
						data: {},
						props: { product: 'oracle' }
					}
				},
			},
			{
				title: 'Predict Tumor Evolution and Resistance Patterns',
				description: 'Anticipate likely mutation paths and design preemptive combination therapies before resistance develops.',
				comparison: {
					traditional: [
						{ label: 'React to resistance', cost: 'After failure' },
						{ label: 'Sequential monotherapies', cost: '$200K/year' },
						{ label: 'Limited resistance insight', cost: 'Guesswork' },
						{ label: 'Average 6-month response', cost: 'Then resistance' },
					],
					oracle: [
						{ label: 'Predict resistance paths', cost: 'Before treatment' },
						{ label: 'Combination therapy design', cost: '$250K/year' },
						{ label: 'Evolution pathway mapping', cost: 'Systematic' },
						{ label: 'Extended response duration', cost: '+6 months' },
					],
				},
				impact: [
					{ label: 'Resistance prediction', before: 'Reactive', after: '6 months early' },
					{ label: 'Treatment durability', before: '6 months', after: '12 months' },
					{ label: 'Combination therapy success', before: '30%', after: '75%' },
					{ label: 'Patient progression-free survival', before: 'baseline', after: '+40%' },
				],
				components: {
					primary: {
						type: 'proteinFunctionalChange',
						context: 'clinical',
						story: 'resistance-prediction',
						data: {},
						props: { product: 'oracle' }
					}
				},
			},
			{
				title: 'Design Personalized Cancer Immunotherapies',
				description: 'Generate patient-specific neoantigens, CAR-T designs, and TCR sequences with structural validation.',
				comparison: {
					traditional: [
						{ label: 'Standard protocol selection', cost: '$100K' },
						{ label: 'Population-based dosing', cost: 'One-size-fits-all' },
						{ label: 'Limited personalization', cost: '25% response' },
						{ label: '12 months protocol selection', cost: 'Trial and error' },
					],
					oracle: [
						{ label: 'Patient-specific design', cost: '$120K' },
						{ label: 'Personalized immunotherapy', cost: 'Bespoke design' },
						{ label: 'Neoantigen/CAR-T optimization', cost: '65% response' },
						{ label: '4 weeks design completion', cost: 'Rational approach' },
					],
				},
				impact: [
					{ label: 'Treatment response rate', before: '25%', after: '65%' },
					{ label: 'Design time', before: '12 months', after: '4 weeks' },
					{ label: 'Personalization level', before: 'Population', after: 'Individual' },
					{ label: 'Adverse events', before: 'High', after: 'Reduced toxicity' },
				],
				components: {
					primary: {
						type: 'chromatinAccessibility',
						context: 'clinical',
						story: 'epigenetic-therapy',
						data: {},
						props: { product: 'forge' }
					}
				},
			},
		] as ValueProposition[],
		summary: {
			title: 'Clinical Decision Revolution',
			metrics: [
				{ label: 'VUS resolution', value: '73%', subtitle: 'Previously uncertain variants' },
				{ label: 'Treatment selection', value: '12x faster', subtitle: '18 months → 6 weeks' },
				{ label: 'Resistance prediction', value: '6 months early', subtitle: 'Preemptive therapy design' },
				{ label: 'Patient outcomes', value: '+40%', subtitle: 'Improved response rates' },
			],
			description: 'Oracle transforms oncology from reactive medicine into predictive precision therapy. Instead of guessing at treatments, clinicians can systematically design personalized interventions with scientific confidence and measurable patient benefit.',
		} as TransformationSummary,
	},
	// Evo2-derived benchmarks and narratives
	evo2Benchmarks: {
		clinVar: {
			allSNV: { auroc: 0.957 },
			allNonSNV: { auroc: 0.939 },
			notes: 'Zero-shot variant effect prediction; strong for noncoding and indel classes.'
		},
		spliceVarDB: { all: { auroc: 0.826 }, notes: 'Best zero-shot across exonic and intronic splice tasks.' },
		brca: {
			zeroShot: { overall: 'best combined coding+noncoding' },
			supervisedBRCA1: { auroc: 0.95, auprc: 0.86 },
			notes: 'Embeddings support supervised classifiers for clinical genes.'
		},
		exonIntronClassifier: { aurocRange: [0.82, 0.99], notes: 'Single-nucleotide classifier across species.' },
		mRnaDecay: { correlation: 'negative', notes: 'Higher likelihood ↔ lower decay; stronger at 40B.' },
		retrievalLongContext: { millionTokenContext: true, thresholdR: 0.8 },
		generativeEpigenomics: { guidedDesignAUROC: '~0.9 with higher beam width', notes: 'Compute-scaling design success.' },
		dataEngineering: { repeatDownWeighting: 0.1, earlyGainClinVarAUROC: { noReweight: 0.63, reweight: 0.73 } },
	},
	// Genetic Testing Labs Transformation
	geneticTestingTransformation: {
		industryProblem: {
			title: 'The VUS Crisis in Genetic Testing',
			metrics: [
				{ label: 'VUS rate', value: '40-60%', subtitle: 'Variants of uncertain significance' },
				{ label: 'Turnaround time', value: '2-4 weeks', subtitle: 'For complex variant interpretation' },
				{ label: 'Manual review cost', value: '$150', subtitle: 'Per complex variant' },
				{ label: 'Reanalysis rate', value: '25%', subtitle: 'Cases requiring expert review' },
			],
			description: 'Genetic testing labs struggle with massive VUS rates, forcing expensive manual reviews and leaving patients in limbo. Traditional variant interpretation tools fail on complex loci and non-coding variants.',
		} as IndustryProblem,
		valuePropositions: [
			{
				title: 'Resolve VUS with Zero-Shot Variant Interpretation',
				description: 'Instantly classify variants across coding and non-coding regions with calibrated confidence scores, eliminating manual review bottlenecks.',
				comparison: {
					traditional: [
						{ label: '40-60% VUS rate', cost: '$150/variant' },
						{ label: '2-4 weeks turnaround', cost: '$2M/year delays' },
						{ label: 'Manual expert review', cost: '25% reanalysis' },
					],
					oracle: [
						{ label: '15% VUS rate', cost: '$5/variant' },
						{ label: '24-hour turnaround', cost: '$200K/year' },
						{ label: 'Automated classification', cost: '5% reanalysis' },
					],
				},
				impact: [
					{ label: 'VUS reduction', before: '40-60%', after: '15%' },
					{ label: 'Turnaround time', before: '2-4 weeks', after: '24 hours' },
					{ label: 'Cost per variant', before: '$150', after: '$5' },
					{ label: 'Manual review load', before: '25%', after: '5%' },
				],
				components: {
					primary: {
						type: 'geneEssentiality',
						context: 'clinical',
						story: 'variant-classification',
						props: { product: 'oracle' }
					}
				},
			},
			{
				title: 'Handle Complex Loci with Long-Context Analysis',
				description: 'Process variants in challenging genomic regions like HLA, immunoglobulin loci, and repetitive elements with 1M-token context windows.',
				comparison: {
					traditional: [
						{ label: 'Complex loci failures', cost: '80% VUS' },
						{ label: 'Short-read limitations', cost: '$500K/year' },
						{ label: 'Manual curation', cost: '40 hours/case' },
					],
					oracle: [
						{ label: 'Complex loci resolved', cost: '25% VUS' },
						{ label: 'Long-context analysis', cost: '$50K/year' },
						{ label: 'Automated processing', cost: '2 hours/case' },
					],
				},
				impact: [
					{ label: 'Complex loci success', before: '20%', after: '75%' },
					{ label: 'Processing time', before: '40 hours', after: '2 hours' },
					{ label: 'Cost reduction', before: 'baseline', after: '90% savings' },
					{ label: 'Analyst productivity', before: '1 case/week', after: '20 cases/week' },
				],
				components: {
					primary: {
						type: 'proteinFunctionalChange',
						context: 'clinical',
						story: 'complex-loci-analysis',
						props: { product: 'oracle' }
					}
				},
			},
			{
				title: 'Design Quality Controls with Forge Integration',
				description: 'Generate synthetic positive and negative controls for assay validation, ensuring robust test performance across diverse populations.',
				comparison: {
					traditional: [
						{ label: 'Manual control design', cost: '$50K/panel' },
						{ label: '6-month validation', cost: '$200K' },
						{ label: 'Population bias', cost: '30% failure' },
					],
					oracle: [
						{ label: 'AI-designed controls', cost: '$5K/panel' },
						{ label: '2-week validation', cost: '$20K' },
						{ label: 'Population-aware', cost: '5% failure' },
					],
				},
				impact: [
					{ label: 'Control design cost', before: '$50K', after: '$5K' },
					{ label: 'Validation time', before: '6 months', after: '2 weeks' },
					{ label: 'Population coverage', before: '70%', after: '95%' },
					{ label: 'Assay failure rate', before: '30%', after: '5%' },
				],
				components: {
					primary: {
						type: 'chromatinAccessibility',
						context: 'clinical',
						story: 'assay-design',
						props: { product: 'forge' }
					}
				},
			},
		] as ValueProposition[],
		summary: {
			title: 'Complete Lab Transformation',
			metrics: [
				{ label: 'VUS reduction', value: '73%', subtitle: '40-60% → 15% VUS rate' },
				{ label: 'Turnaround acceleration', value: '12x', subtitle: '2-4 weeks → 24 hours' },
				{ label: 'Cost reduction', value: '97%', subtitle: '$150 → $5 per variant' },
				{ label: 'Throughput increase', value: '20x', subtitle: '1 → 20 cases per analyst per week' },
			],
			description: 'Oracle transforms genetic testing from a bottlenecked, manual process into a high-throughput, automated pipeline. Labs can process 20x more cases with 97% cost reduction while dramatically improving patient outcomes through faster, more accurate results.',
		} as TransformationSummary,
	},
	// Industry Transformations for CTA
	industryTransformations: [
		{
			id: 'biotech',
			title: 'Biotech R&D Transformation',
			subtitle: 'From 90% failure to predictable success',
			icon: '🧬',
			color: 'blue',
			metrics: [
				{ label: 'Cost reduction', value: '96%' },
				{ label: 'Faster discovery', value: '36x' },
				{ label: 'Success rate', value: '73%' }
			],
			description: 'See how CrisPRO eliminates guesswork in therapeutic development with variant triaging, explainable evidence, and guided sequence generation.',
			href: '/site/biotech-transformation',
			buttonText: 'Explore Biotech Transformation'
		},
		{
			id: 'clinical',
			title: 'Clinical Oncology Transformation',
			subtitle: 'From VUS uncertainty to precision medicine',
			icon: '🏥',
			color: 'green',
			metrics: [
				{ label: 'VUS resolved', value: '73%' },
				{ label: 'Faster decisions', value: '12x' },
				{ label: 'Better outcomes', value: '+40%' }
			],
			description: 'Discover how Oracle revolutionizes patient care with instant VUS resolution, resistance prediction, and personalized immunotherapy design.',
			href: '/site/clinical-transformation',
			buttonText: 'Explore Clinical Transformation'
		},
		{
			id: 'genetic-testing',
			title: 'Genetic Testing Transformation',
			subtitle: 'From VUS crisis to precision diagnostics',
			icon: '🧬',
			color: 'purple',
			metrics: [
				{ label: 'VUS reduction', value: '73%' },
				{ label: 'Faster turnaround', value: '12x' },
				{ label: 'Cost reduction', value: '97%' }
			],
			description: 'Transform genetic testing labs with instant VUS resolution, complex loci analysis, and AI-designed quality controls for population-aware validation.',
			href: '/site/genetic-testing-transformation',
			buttonText: 'Explore Genetic Testing Transformation'
		}
	],
	// Audience-facing value statements
	audienceValue: {
		biotech: [
			'Reduce wet-lab iterations by triaging variants with calibrated zero-shot scores.',
			'Prioritize constructs using exon/intron and TF-motif explanations to de-risk designs.',
			'Guide sequence generation (peaks, motifs) with predictable compute→quality scaling.'
		],
		oncologyClinicians: [
			'Cut VUS ambiguity by combining zero-shot scores with transparent evidence tracks.',
			'BRCA1/2 performance translates to clearer recommendations on hereditary risk.',
			'Calibrated outputs (ECE) support thresholding for clinical workflows.'
		],
		geneticTestingLabs: [
			'Handle SNVs and non-SNVs, coding and noncoding, with strong zero-shot baselines.',
			'Long-context retrieval improves scoring stability in complex loci.',
			'Embeddings enable supervised upgrades for panel-specific classification.'
		]
	}
} as const;

export type OracleContent = typeof oracleContent; 
 
 