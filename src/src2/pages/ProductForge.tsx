import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Forge as ForgeUI, SequencePeaksViewer, DesignResultSummary } from '../components/site';
import { GuidedDesignPanel } from '../components/site/blocks';
import { Arsenal, Dossier } from '../components/site/runx1';
import { ForgeAssets, ProcessStepper, InteractiveAnalysisPipeline, EnhancedDossierSummary, DemoFactory } from '../components/site/blocks';
import ForgeDesignChallenges from '../components/site/blocks/ForgeDesignChallenges';
import InSilicoValidation from '../components/site/blocks/InSilicoValidation';
import DossierSummary from '../components/site/blocks/DossierSummary';
import QCBadges from '../components/site/blocks/QCBadges';
import AccessibilityToggle from '../components/AccessibilityToggle';
import { forgeContent } from '../data/forgeContent';
import { forgeGenerativeAPIs } from '../data/forgeGenerativeAPIs';
import { toForgeNamespaceProps } from '../data/adapters/forge';
import { Scissors, Activity, Zap, Target, Download, FileCode, FileSpreadsheet } from 'lucide-react';
import { simulateGenerateOptimizedGuideRNA, simulateCrisprEfficacy, simulateChromatinAccessibility, simulateVariantImpact } from '../utils/simulations';
import { generateDynamicDossier } from '../data/dossierSummaries';

// Types for interactive state
type Objective = {
	type: 'peak' | 'tf';
	start: number;
	end: number;
	value?: number;
	motif?: string;
	weight?: number;
};

type Candidate = {
	id: string;
	score: number;
	qc: {
		synteny: number;
		dinucKL: number;
	};
	notes?: string;
	sequence?: string;
};

const ProductForge: React.FC = () => {
	const [simStep, setSimStep] = useState<number>(0);
	const [auroc, setAuroc] = useState<number>(forgeContent.candidates[0]?.score || 0.85);
	const p = toForgeNamespaceProps(forgeContent);

	// Interactive state
	const [objectives, setObjectives] = useState<Objective[]>([...forgeContent.objectives] as Objective[]);
	const [selectedPreset, setSelectedPreset] = useState<string>('');
	const [selectedCandidate, setSelectedCandidate] = useState<string>('');
	const [isDesigning, setIsDesigning] = useState(false);

	// Pipeline state
	const [pipelineSteps, setPipelineSteps] = useState<any[]>([]);
	const [currentPipelineStep, setCurrentPipelineStep] = useState<number>(-1);
	const [designDossier, setDesignDossier] = useState<any | null>(null);
	
	// Generated candidates state - dynamic based on analysis results
	const [generatedCandidates, setGeneratedCandidates] = useState<any[]>([]);
	// Track the current selected challenge
	const [currentChallenge, setCurrentChallenge] = useState<any | null>(null);

	// Animate pipeline steps sequentially
	const playSteps = async (stepsToPlay: any[]) => {
		// Initialize all steps as pending
		const pending = stepsToPlay.map(s => ({ ...s, status: 'pending' as const }));
		setPipelineSteps(pending);
		setCurrentPipelineStep(-1);
		for (let i = 0; i < pending.length; i++) {
			// Mark running
			setPipelineSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
			setCurrentPipelineStep(i);
			// Compute simulated duration from processing steps
			const totalMs = Array.isArray(pending[i].processingSteps) && pending[i].processingSteps.length > 0
				? pending[i].processingSteps.reduce((acc: number, p: any) => acc + (p.duration || 600), 0)
				: 1200;
			await new Promise(r => setTimeout(r, Math.min(totalMs, 4000))); // cap for UX
			// Mark completed
			setPipelineSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'completed' } : s));
		}
	};

	const series = useMemo(() => {
		// Dynamic series based on current objectives and simulation step
		const baseScore = auroc;
		return Array.from({ length: 12 }, (_, i) => ({ 
			step: i + 1, 
			score: Math.min(0.95, baseScore + (objectives.length * 0.01) + (simStep > i ? 0.01 * (i + 1) : 0))
		}));
	}, [simStep, auroc, objectives.length]);

	const runDesignDemo = async (challenge?: any) => {
		setIsDesigning(true);
		// Reset pipeline state
		setPipelineSteps([]);
		setCurrentPipelineStep(0);
		setDesignDossier(null);
		setGeneratedCandidates([]);

		// Seed inputs based on current objectives
		const defaultLocus = `chr17:${objectives.find(o => o.type === 'peak')?.start || 43044295}-${objectives.find(o => o.type === 'peak')?.end || 43044395}`;
		const locus = challenge?.position || defaultLocus;
		const targetGene = challenge?.gene || 'BRCA1';
		const pam = 'NGG';

		const candidates: any[] = [];
		const stepsToRun: any[] = [];

		// Branch pipelines by challenge type
		if (challenge?.designType === 'hdr_template') {
			const { simulateGenerateRepairTemplate, simulatePredictHDREfficiency } = await import('../utils/simulations');
			const hdr = await simulateGenerateRepairTemplate({ locus, mutation: challenge?.target, homology_arm_length: 4000 });
			const hdrStep = {
				id: 'generate_repair_template',
				name: 'Design HDR Repair Template',
				endpoint: '/generate_repair_template',
				icon: Activity,
				status: 'pending',
				color: 'purple',
				duration: '—',
				inputData: { locus, mutation: challenge?.target, homology_arm_length: 4000 },
				processingSteps: hdr.processingSteps || [],
				outputData: hdr.output,
				insights: hdr.insights || [],
				evidence: hdr.evidence,
				provenance: hdr.provenance
			};
			stepsToRun.push(hdrStep);
			// Extract template candidates
			if (hdr.output?.templates) {
				hdr.output.templates.forEach((tpl: any, i: number) => {
					candidates.push({
						id: `hdr_${i + 1}`,
						type: 'HDR Template',
						name: `HDR-${String(i + 1).padStart(3, '0')}`,
						sequence: tpl.sequence,
						score: tpl.likelihood || 0.8,
						qc: {
							synteny: 0.92,
							dinucKL: 0.15,
							gcContent: tpl.qc?.gc_content || 0.5,
							pamCompatibility: 1
						},
						metrics: {
							contextLength: '1M tokens',
							trainingData: '9.3T tokens',
							resolution: 'Single nucleotide',
							architecture: 'StripedHyena2'
						},
						designContext: { locus, designGoal: 'HDR correction', mutation: challenge?.target }
					});
				});
			}
			// HDR-specific validation step
			const hdrVal = await simulatePredictHDREfficiency({ template: (hdr.output as any)?.templates?.[0]?.sequence, locus });
			const hdrValStep = { id: 'predict_hdr_efficiency', name: 'Predict HDR Efficiency', endpoint: '/predict_hdr_efficiency', icon: Activity, status: 'pending', color: 'green', duration: '—', inputData: { locus }, processingSteps: hdrVal.processingSteps || [], outputData: hdrVal.output, insights: hdrVal.insights || [], evidence: hdrVal.evidence, provenance: hdrVal.provenance } as any;
			stepsToRun.push(hdrValStep);
		} else if (challenge?.designType === 'therapeutic_protein') {
			const { simulateGenerateTherapeuticProtein } = await import('../utils/simulations');
			const tp = await simulateGenerateTherapeuticProtein({ target: challenge?.target, gene: targetGene, num_candidates: 3 });
			const tpStep = {
				id: 'generate_therapeutic_protein',
				name: 'Generate Therapeutic Proteins',
				endpoint: '/generate_therapeutic_protein',
				icon: Activity,
				status: 'pending',
				color: 'green',
				duration: '—',
				inputData: { target: challenge?.target, gene: targetGene },
				processingSteps: tp.processingSteps || [],
				outputData: tp.output,
				insights: tp.insights || [],
				evidence: tp.evidence,
				provenance: tp.provenance
			};
			stepsToRun.push(tpStep);
			if (tp.output?.candidates) {
				tp.output.candidates.forEach((cand: any, i: number) => {
					candidates.push({
						id: `prot_${i + 1}`,
						type: 'Protein',
						name: `Protein-${String(i + 1).padStart(3, '0')}`,
						sequence: cand.protein,
						score: cand.function_score || 0.85,
						qc: { synteny: 0.9, dinucKL: 0.2, gcContent: 0.5, pamCompatibility: 1 },
						metrics: { structureScore: cand.structure_score || 0.8 },
						designContext: { target: challenge?.target, gene: targetGene }
					});
				});
			}
		} else if (challenge?.designType === 'regulatory_element') {
			const { simulateDesignEpigenomicPattern } = await import('../utils/simulations');
			const ep = await simulateDesignEpigenomicPattern({ pattern: 'open_closed_open', length: 4000 });
			const epStep = {
				id: 'design_epigenomic_patterns',
				name: 'Design Epigenomic Patterns',
				endpoint: '/design_epigenomic_patterns',
				icon: Zap,
				status: 'pending',
				color: 'blue',
				duration: '—',
				inputData: { pattern: 'open_closed_open', length: 4000 },
				processingSteps: ep.processingSteps || [],
				outputData: ep.output,
				insights: ep.insights || [],
				evidence: ep.evidence,
				provenance: ep.provenance
			};
			stepsToRun.push(epStep);
			candidates.push({ id: 'promoter_1', type: 'promoter', name: 'Regulatory-Design-001', sequence: ep.output?.designed_sequence || '', score: ep.output?.pattern_match_auroc || 0.88, qc: { synteny: 0.9, dinucKL: 0.18, gcContent: 0.5, pamCompatibility: 1 }, metrics: { auroc: ep.output?.pattern_match_auroc || 0.88 }, designContext: { pattern: 'open_closed_open' } });
		} else {
			// Guide RNA branch: include efficacy + safety
			const gen = await simulateGenerateOptimizedGuideRNA({ locus, pam, goal: 'knockout', num_candidates: 5, objectives: objectives.length });
			const eff = await simulateCrisprEfficacy({ guide_sequence: gen.output?.guides?.[0]?.sequence, pam_sequence: 'TGG', target_gene: targetGene });
			const step1 = { id: 'generate_optimized_guide_rna', name: 'Generate Optimized Guides', endpoint: '/generate_optimized_guide_rna', icon: Scissors, status: 'pending', color: 'purple', duration: '—', inputData: { locus, pam, goal: 'knockout', objectives: objectives.length }, processingSteps: gen.processingSteps || [], outputData: gen.output, insights: gen.insights || [], evidence: gen.evidence, provenance: gen.provenance } as any;
			const step2 = { id: 'predict_crispr_spacer_efficacy', name: 'Predict Guide Efficacy', endpoint: '/predict_crispr_spacer_efficacy', icon: Scissors, status: 'pending', color: 'green', duration: '—', inputData: { guide_sequence: gen.output?.guides?.[0]?.sequence, pam_sequence: 'TGG' }, processingSteps: eff.processingSteps || [], outputData: eff.output, insights: eff.insights || [], evidence: eff.evidence, provenance: eff.provenance } as any;
			stepsToRun.push(step1, step2);
			// Extract gRNA candidates
			if (gen.output?.guides) {
				gen.output.guides.forEach((guide: any, i: number) => {
					candidates.push({ id: `guide_${i + 1}`, type: 'Guide RNA', name: `gRNA-${String(i + 1).padStart(3, '0')}`, sequence: guide.sequence, score: guide.efficiency || (0.85 + Math.random() * 0.1), qc: { synteny: guide.off_targets === 0 ? 0.98 : Math.max(0.7, 0.98 - (guide.off_targets * 0.05)), dinucKL: 0.12 + Math.random() * 0.08, gcContent: 0.45 + Math.random() * 0.15, pamCompatibility: guide.pam ? 0.95 : 0.75 }, metrics: { contextLength: '1M tokens', trainingData: '9.3T tokens', resolution: 'Single nucleotide', architecture: 'StripedHyena2' }, designContext: { locus, pam, designGoal: 'knockout' } });
				});
			}
		}

		// Common steps only for guide RNA branch
		if (!challenge || challenge.designType === 'guide_rna') {
			const acc = await simulateChromatinAccessibility({ genomic_region: locus, cell_type: 'MCF7' });
			const safety = await simulateVariantImpact({});
			const stepAcc = { id: 'predict_chromatin_accessibility', name: 'Check Chromatin Accessibility', endpoint: '/predict_chromatin_accessibility', icon: Zap, status: 'pending', color: 'orange', duration: '—', inputData: { genomic_region: locus, cell_type: 'MCF7' }, processingSteps: acc.processingSteps || [], outputData: acc.output, insights: acc.insights || [], evidence: acc.evidence, provenance: acc.provenance } as any;
			const stepSafety = { id: 'predict_variant_impact', name: 'Off‑Target Safety Snapshot', endpoint: '/predict_variant_impact', icon: Target, status: 'pending', color: 'blue', duration: '—', inputData: { candidate: candidates?.[0]?.sequence || '' }, processingSteps: safety.processingSteps || [], outputData: safety.output, insights: safety.insights || [], evidence: safety.evidence, provenance: safety.provenance } as any;
			stepsToRun.push(stepAcc, stepSafety);
		}

		// Play all steps sequentially so Completed list shows the full pipeline
		await playSteps(stepsToRun);

		setGeneratedCandidates(candidates);
		setIsDesigning(false);
	};

	const handleSimulate = () => {
		// Keep existing UI animation
		let step = 0;
		const id = setInterval(() => {
			step += 1;
			setSimStep(step);
			setAuroc(prev => Math.min(0.9, prev + 0.005));
			if (step >= 12) clearInterval(id);
		}, 250);
		// Start step‑by‑step demo flow
		runDesignDemo();
	};

	// Interactive handlers
	const handleObjectivesChange = (newObjectives: Objective[]) => {
		setObjectives(newObjectives);
		// Update AUROC based on objectives complexity
		setAuroc(Math.min(0.95, 0.75 + (newObjectives.length * 0.03)));
	};

	const handlePresetSelect = (preset: any) => {
		setSelectedPreset(preset.id);
		// Auto-populate objectives based on preset
		const presetObjectives: Objective[] = [
			{ type: 'peak', start: 100, end: 200, value: 0.8 },
			{ type: 'tf', motif: 'CREB', start: 150, end: 170, weight: 1.0 }
		];
		setObjectives(presetObjectives);
		setAuroc(0.82);
		// Auto-run design
		setTimeout(() => runDesignDemo(), 500);
	};

	const handleCandidateSelect = (candidate: any) => {
		setSelectedCandidate(candidate.id);
	};

	const handleExportCandidate = (candidate: any, format: 'fasta' | 'json' | 'csv') => {
		const data = format === 'fasta' 
			? `>${candidate.id}\n${candidate.sequence || 'ATCGATCGATCGATCG'}`
			: format === 'json'
			? JSON.stringify(candidate, null, 2)
			: `ID,Score,Synteny,DinucKL,Notes\n${candidate.id},${candidate.score},${candidate.qc.synteny},${candidate.qc.dinucKL},${candidate.notes || ''}`;
		
		const blob = new Blob([data], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${candidate.id}.${format}`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleAnalyzeCandidate = (candidate: any) => {
		console.log('Analyzing candidate:', candidate);
		// Could trigger detailed analysis pipeline
	};

	const best = forgeContent.candidates[0];

	// Process steps for the enhanced stepper
	const processSteps = [
		{ 
			title: 'Oracle Validates', 
			description: 'SOTA variant prediction provides therapeutic confidence',
			accent: 'cyan' as const
		},
		{ 
			title: 'Forge Designs', 
			description: 'Guided generation creates multi-modal therapeutics',
			accent: 'purple' as const
		},
		{ 
			title: 'Command Center Orchestrates', 
			description: 'Provenance tracking and validation workflows',
			accent: 'orange' as const
		},
	];

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100">
			<div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
				{/* Accessibility Toggle */}
				<div className="flex justify-end">
					<AccessibilityToggle />
				</div>

				{/* Hero Section with Context */}
				<section className="text-center space-y-6">
					<h1 className="text-5xl font-bold text-white">Forge</h1>
					<p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
						{forgeContent.about.oneLiner}
					</p>
					<div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
						{forgeContent.about.evo2Context.map((context, i) => (
							<span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full font-medium text-slate-200">
								{context}
							</span>
						))}
					</div>
				</section>

				{/* Design Challenges - Click to Design */}
				<ForgeDesignChallenges onDesignStarted={(challenge) => {
					// Auto-populate objectives based on challenge
					const challengeObjectives: Objective[] = challenge.designType === 'guide_rna' 
						? [{ type: 'peak', start: 80, end: 120, value: 1 }]
						: [{ type: 'peak', start: 60, end: 140, value: 1 }];
					setObjectives(challengeObjectives);
					// Track and trigger selected challenge demo
					setCurrentChallenge(challenge);
					setTimeout(() => runDesignDemo(challenge), 500);
				}} />

				{/* Generative AI Demo Factory */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">5 Generative AI Endpoints</h2>
						<p className="text-lg text-slate-300 max-w-3xl mx-auto">
							Zero-shot therapeutic design. Each endpoint addresses specific design challenges with state-of-the-art generative capabilities, from CRISPR guides to therapeutic proteins.
						</p>
					</div>
					<DemoFactory apiDemos={forgeGenerativeAPIs} />
				</section>

				{/* In-Silico Validation */}
				<InSilicoValidation sequences={generatedCandidates.map((c:any, i:number)=>({ id: c.id, name: c.name, type: c.type === 'Guide RNA' ? 'guide_rna' : c.type === 'HDR Template' ? 'hdr_template' : c.type === 'Protein' ? 'protein' : 'promoter', sequence: c.sequence, description: c.type }))} onValidationComplete={(results) => {
					console.log('Validation completed:', results);
					// Could trigger additional workflows based on validation results
				}} />

				{/* Use Cases Link */}
				<section className="text-center py-12">
					<div className="space-y-6">
						<h2 className="text-3xl font-semibold text-white">Ready for Complete Workflows?</h2>
						<p className="text-lg text-slate-300 max-w-2xl mx-auto">
							Explore end-to-end use cases that combine multiple generative endpoints 
							for comprehensive therapeutic design pipelines.
						</p>
						<Link 
							to="/site/forge/use-cases" 
							className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
						>
							🧬 Explore Forge Use Cases
						</Link>
					</div>
				</section>

				{/* Enhanced Process Flow */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">The Agentic Design Loop</h2>
						<p className="text-lg text-slate-300 max-w-3xl mx-auto">
							{forgeContent.agentic.mission}
						</p>
					</div>
					<ProcessStepper steps={processSteps} />
					
					{/* Agentic Loop Details */}
					<div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
						<h3 className="text-xl font-semibold text-white mb-6">Autonomous Design Process</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{forgeContent.agentic.loop.map((step, i) => (
								<div key={i} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
											{i + 1}
										</div>
										<h4 className="font-medium text-white">
											{step.split(':')[0]}
										</h4>
									</div>
									<p className="text-sm text-slate-300">
										{step.split(':')[1]?.trim()}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Interactive Design Interface */}
				<section className="space-y-8" data-section="design-interface">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Interactive Design Studio</h2>
						<p className="text-lg text-slate-300">
							Specify your objectives and watch Forge generate optimized sequences with real-time feedback.
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<ForgeUI.ObjectiveList 
								{...p.objectiveList}
								objectives={objectives as any}
								onObjectivesChange={handleObjectivesChange}
								onRunDesign={runDesignDemo}
								editable={true}
							/>
							<GuidedDesignPanel 
								onSimulate={handleSimulate} 
								objectives={objectives as any} 
								scorer="enformer" 
								beamWidth={forgeContent.compute.beamWidth} 
								tokensPerBp={forgeContent.compute.tokensPerBp}
								readOnly={false}
							/>
							<SequencePeaksViewer 
								length={200} 
								peaks={objectives.filter(o => o.type === 'peak').map((pp: any) => ({ 
									start: pp.start, 
									end: pp.end, 
									value: pp.value || 1 
								}))} 
								variantPos={88} 
							/>
						</div>
						<div className="space-y-6">
							<DesignResultSummary 
								auroc={auroc} 
								compute={forgeContent.compute} 
								scorerVersion="enformer-2024.08" 
								modelVersion="evo2-1m" 
								seed={42} 
							/>
							{best && (
								<QCBadges 
									synteny={best.qc.synteny} 
									pfamHitRate={forgeContent.benchmarks.prokaryote.pfamHitFraction} 
									dinucKL={best.qc.dinucKL} 
								/>
							)}
							<ForgeUI.TrajectoryGraph series={series as any} />
							<ForgeUI.PresetsPanel 
								{...p.presets}
								onPresetSelect={handlePresetSelect}
								selectedPreset={selectedPreset}
								interactive={true}
							/>
						</div>
					</div>

					{/* Step-by-Step Pipeline */}
					{pipelineSteps.length > 0 && (
						<div className="space-y-6">
							<InteractiveAnalysisPipeline
								variant={currentChallenge ? `${currentChallenge.gene}:${currentChallenge.id}` : "BRCA1:design"}
								steps={pipelineSteps}
								currentStep={currentPipelineStep}
							/>
							{designDossier && (
								<div className="mt-4">
									<EnhancedDossierSummary dossier={designDossier} />
								</div>
							)}
						</div>
					)}
				</section>

				{/* Dynamic Generated Candidates */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">
							{generatedCandidates.length > 0 ? 'Generated Candidates' : 'Generated Candidates'}
						</h2>
						{generatedCandidates.length > 0 ? (
							<p className="text-lg text-slate-300">
								🧬 {generatedCandidates.length} candidates generated from latest analysis • Powered by Evo2 (40B params)
							</p>
						) : (
							<p className="text-lg text-slate-300">
								Run a design challenge or demo to generate therapeutic candidates
							</p>
						)}
					</div>

					{generatedCandidates.length > 0 ? (
						<div className="space-y-6">
							{/* Dynamic Candidates Grid */}
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{generatedCandidates.map((candidate) => (
									<div
										key={candidate.id}
										className={`group p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
											selectedCandidate === candidate.id
												? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20'
												: 'border-slate-700 hover:border-purple-400 bg-slate-800'
										}`}
										onClick={() => handleCandidateSelect(candidate)}
									>
										{/* Header */}
										<div className="flex items-center justify-between mb-4">
											<div>
												<h3 className="font-bold text-white text-lg">{candidate.name}</h3>
												<p className="text-purple-400 text-sm font-medium">{candidate.type}</p>
											</div>
											<div className="text-right">
												<div className="text-2xl font-bold text-green-400">
													{(candidate.score * 100).toFixed(1)}%
												</div>
												<p className="text-slate-400 text-xs">Efficacy</p>
											</div>
										</div>

										{/* Sequence */}
										<div className="mb-4">
											<p className="text-slate-400 text-xs mb-1">Sequence:</p>
											<div className="bg-slate-900 rounded p-2 font-mono text-green-400 text-xs break-all">
												{candidate.sequence.length > 50 
													? `${candidate.sequence.substring(0, 50)}...`
													: candidate.sequence
												}
											</div>
										</div>

										{/* Evo2 Metrics */}
										<div className="mb-4">
											<p className="text-slate-400 text-xs mb-2">Evo2 Performance Metrics:</p>
											<div className="grid grid-cols-2 gap-2 text-xs">
												<div>
													<span className="text-slate-500">Zero-shot:</span>
													<span className="text-cyan-300 ml-1 font-medium">
														{candidate.metrics.predictedEfficacy}
													</span>
												</div>
												<div>
													<span className="text-slate-500">Off-targets:</span>
													<span className="text-cyan-300 ml-1 font-medium">
														{candidate.metrics.offTargetSites}
													</span>
												</div>
												<div className="col-span-2">
													<span className="text-slate-500">Architecture:</span>
													<span className="text-cyan-300 ml-1 font-medium">
														{candidate.metrics.architecture}
													</span>
												</div>
											</div>
										</div>

										{/* QC Badges */}
										<div className="flex flex-wrap gap-2 mb-4">
											<span className={`px-2 py-1 rounded text-xs font-medium ${
												candidate.qc.synteny > 0.9 ? 'bg-green-900/30 text-green-300' : 'bg-yellow-900/30 text-yellow-300'
											}`}>
												Synteny: {(candidate.qc.synteny * 100).toFixed(0)}%
											</span>
											<span className="px-2 py-1 rounded text-xs font-medium bg-blue-900/30 text-blue-300">
												GC: {(candidate.qc.gcContent * 100).toFixed(0)}%
											</span>
											{candidate.qc.pamCompatibility && (
												<span className="px-2 py-1 rounded text-xs font-medium bg-purple-900/30 text-purple-300">
													PAM: {(candidate.qc.pamCompatibility * 100).toFixed(0)}%
												</span>
											)}
										</div>

										{/* Action Buttons */}
										<div className="flex gap-2">
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleExportCandidate(candidate, 'fasta');
												}}
												className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors"
											>
												Export FASTA
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleAnalyzeCandidate(candidate);
												}}
												className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-medium transition-colors"
											>
												Deep Analysis
											</button>
										</div>
									</div>
								))}
							</div>

							{/* Evo2 Summary */}
							<div className="bg-slate-800 border border-slate-600 rounded-2xl p-6">
								<h3 className="font-bold text-white mb-4 text-lg">🧬 Run Summary (Powered by Evo2)</h3>
								<div className="space-y-3 text-sm">
									<p className="text-slate-300">
										<strong>Challenge:</strong> {currentChallenge ? currentChallenge.title : 'BRCA1 Knockout Design'}
									</p>
									<p className="text-slate-300">
										<strong>Pipeline:</strong> {pipelineSteps.map(s => s.name).join(' → ')}
									</p>
									<p className="text-slate-300">
										<strong>Artifacts Generated:</strong> {generatedCandidates.length} {generatedCandidates.length === 1 ? 'candidate' : 'candidates'}
									</p>
									{generatedCandidates.length > 0 && (
										<p className="text-slate-300">
											<strong>Top Candidate:</strong> {generatedCandidates[0].name} • Score: {(generatedCandidates[0].score * 100).toFixed(1)}%
										</p>
									)}
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
									<div>
										<p className="text-slate-400">Model Scale:</p>
										<p className="text-white font-medium">40B params • 1M context</p>
									</div>
									<div>
										<p className="text-slate-400">Training Scope:</p>
										<p className="text-white font-medium">9.3T tokens • All domains of life</p>
									</div>
									<div>
										<p className="text-slate-400">Foundation → Application:</p>
										<p className="text-white font-medium">Evo2 engine + CrisPRO orchestration</p>
									</div>
								</div>
								<p className="text-slate-300 mt-4 text-sm">
									<strong>Reference:</strong> Brixi et al., "Genome modeling and design across all domains of life with Evo 2" (2024)
								</p>
							</div>
						</div>
					) : (
						<ForgeUI.CandidateTable 
							{...p.candidateTable}
							onCandidateSelect={handleCandidateSelect}
							onExportCandidate={handleExportCandidate}
							onAnalyzeCandidate={handleAnalyzeCandidate}
							selectedCandidate={selectedCandidate}
							interactive={true}
						/>
					)}

					<ForgeUI.ConstraintPanel {...p.constraints} />
				</section>

				{/* RUNX1 Case Study with Arsenal */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Victory Demonstrated: RUNX1 Conquest</h2>
						<p className="text-lg text-slate-300">
							{forgeContent.caseStudies.runx1.challenge}
						</p>
					</div>
					
					<Arsenal 
						input="Validated RUNX1 Pathogenic Variant"
						processTitle="Multi-Modal Forge"
						outputs={['HDR Blueprint (4kb arms)', 'Guide RNA (gRUNX1-001)', 'ASXL1 Nanobody']}
					/>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<Dossier 
							dossier={[
								{ title: 'HDR Blueprint', subtitle: `${forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.leftArmBp + forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.rightArmBp} bp arms` },
								{ title: 'Guide Efficiency', subtitle: `${forgeContent.caseStudies.runx1.artifacts.guides[0].onTarget} on-target` },
								{ title: 'Nanobody Affinity', subtitle: forgeContent.caseStudies.runx1.artifacts.nanobody.predictedAffinity },
							]}
							tiers={[
								{ title: 'Design Complete' },
								{ title: 'QC Validated' },
								{ title: 'Ready for Command Center' },
							]}
							text={forgeContent.caseStudies.runx1.artifacts.hdrBlueprint.rationale}
						/>
						
						<DossierSummary 
							assetId="Asset: CS-RUNX1-GC-001"
							status="Ready for Wet-Lab"
							checkpoints={forgeContent.caseStudies.runx1.outcomes.map(outcome => ({ label: outcome }))}
							description="Complete multi-modal therapeutic portfolio with provenance and QC validation."
						/>
					</div>
				</section>

				{/* Forge Assets Showcase */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">Our Unfair Advantage</h2>
					<ForgeAssets 
						input="Validated Pathogenic Threat"
						mission="Engineer Multi-Modal Therapeutics"
						assets={forgeContent.about.modalities.map(modality => ({ 
							icon: <span>🧬</span>, 
							label: modality 
						}))}
						advantageTitle="Our Unfair Advantage:"
						advantageHighlight="40B Parameter Evo2"
						advantageDescription="1M token context window sees the entire genomic neighborhood. Zero-shot biological understanding ensures design plausibility."
						forgeHeader="This enables us to forge:"
						forgeText="Ultra-long homology arms, multi-component designs, and novel therapeutic proteins impossible for smaller models."
					/>
				</section>

				{/* Immunotherapy Specialization */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Immunotherapy Specialization</h2>
						<p className="text-lg text-slate-300">
							Pre-configured workflows for cancer immunotherapy design
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{forgeContent.immunotherapy.presets.map((preset, i) => (
							<div key={i} className="p-6 bg-slate-800 border border-slate-700 rounded-xl">
								<h3 className="text-lg font-semibold text-white mb-3">{preset.name}</h3>
								<div className="space-y-2 text-sm text-slate-300">
									{Object.entries(preset.params).map(([key, value]) => (
										<div key={key} className="flex justify-between">
											<span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
											<span className="font-mono text-xs text-slate-400">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* IP Value Proposition */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">Business Impact</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="p-8 bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-green-300 mb-2">Lead Time</h3>
							<p className="text-3xl font-black text-green-100">{forgeContent.ipValue.leadTimeCompression.split('→')[1].trim()}</p>
							<p className="text-green-400 mt-2">Portfolio generation time</p>
						</div>
						<div className="p-8 bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-purple-300 mb-2">IP Value</h3>
							<p className="text-lg font-semibold text-purple-100">Novel Compositions</p>
							<p className="text-purple-400 mt-2">{forgeContent.ipValue.patentability}</p>
						</div>
						<div className="p-8 bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-2xl">
							<h3 className="text-2xl font-bold text-blue-300 mb-2">Portfolio</h3>
							<p className="text-lg font-semibold text-blue-100">Multiple Families</p>
							<p className="text-blue-400 mt-2">{forgeContent.ipValue.portfolioDiversity}</p>
						</div>
					</div>
				</section>

				{/* Validation & Benchmarks */}
				<section className="space-y-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-semibold text-white">Scientific Validation</h2>
						<p className="text-lg text-slate-300 max-w-3xl mx-auto">
							Forge's capabilities are validated across multiple domains and use cases, ensuring reliable performance for therapeutic design.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
						<div className="p-6 rounded-xl border border-cyan-700/50 bg-gradient-to-br from-cyan-900/30 to-cyan-800/30">
							<div className="font-bold text-cyan-300 mb-3 text-lg">Clinical Prediction</div>
							<div className="space-y-2 text-cyan-200">
								<div>Non-coding variants: <span className="font-semibold">SOTA</span></div>
								<div>BRCA1 classification: <span className="font-semibold">SOTA</span></div>
							</div>
							<div className="text-cyan-400 mt-3 text-xs">Foundation for therapeutic confidence</div>
						</div>
						<div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
							<div className="font-bold text-white mb-3 text-lg">Guided Design</div>
							<div className="space-y-2 text-slate-200">
								<div>AUROC (high compute): <span className="font-semibold">{forgeContent.benchmarks.guidedDesign.aurocHighCompute}</span></div>
								<div>Scaling: <span className="font-semibold">Predictable</span></div>
							</div>
							<div className="text-slate-400 mt-3 text-xs">{forgeContent.benchmarks.guidedDesign.note}</div>
						</div>
						<div className="p-6 rounded-xl border border-slate-600 bg-slate-800">
							<div className="font-bold text-white mb-3 text-lg">Generation Quality</div>
							<div className="space-y-2 text-slate-200">
								<div>Mitochondria: <span className="font-semibold">Functional</span></div>
								<div>Prokaryote Pfam: <span className="font-semibold">{Math.round(forgeContent.benchmarks.prokaryote.pfamHitFraction * 100)}%</span></div>
								<div>Naturalness: <span className="font-semibold">Preserved</span></div>
							</div>
						</div>
					</div>
				</section>

				{/* Audience Value */}
				<section className="space-y-8">
					<h2 className="text-3xl font-semibold text-white text-center">How This Transforms Your Work</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Object.entries(forgeContent.audienceValue).map(([audience, benefits]) => (
							<div key={audience} className="p-6 rounded-xl border border-slate-600 bg-slate-800">
								<div className="font-bold text-white mb-4 text-lg capitalize">
									{audience.replace(/([A-Z])/g, ' $1').trim()}
								</div>
								<ul className="list-disc list-inside text-slate-200 space-y-2 text-sm">
									{benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default ProductForge; 