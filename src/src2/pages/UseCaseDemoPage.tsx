import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { discriminativeUseCases } from '../data/useCases/discriminative';
import type { UseCase } from '../utils/runUseCase';
import { InteractiveAnalysisPipeline, EnhancedDossierSummary } from '../components/site/blocks';
import { generateDynamicDossier } from '../data/dossierSummaries';
import { simulateVariantImpact, simulateProteinFunctionalChange, simulateChromatinAccessibility, simulateGeneEssentiality, simulateCrisprEfficacy } from '../utils/simulations';

const UseCaseDemoPage: React.FC = () => {
	const { id } = useParams();
	const useCase = useMemo<UseCase | undefined>(() => discriminativeUseCases.find(u => u.id === id), [id]);
	const [ctx, setCtx] = useState<any | null>(null);
	const [isRunning, setIsRunning] = useState(false);
	const [currentStep, setCurrentStep] = useState<number>(-1);

	if (!useCase) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<h1 className="text-2xl font-bold">Use‑case not found</h1>
				<p className="text-slate-500">Unknown id: {id}</p>
			</div>
		);
	}

	const start = async () => {
		setIsRunning(true);
		setCtx({ seed: useCase.seed, outputs: {} });
		setCurrentStep(0);
		const adapters = {
			variant_impact: simulateVariantImpact,
			protein_functional_change: simulateProteinFunctionalChange,
			chromatin_accessibility: simulateChromatinAccessibility,
			gene_essentiality: simulateGeneEssentiality,
			crispr_efficacy: simulateCrisprEfficacy,
		};
		// step-by-step execution
		const outputs: any = {};
		for (let i = 0; i < useCase.steps.length; i++) {
			const step = useCase.steps[i];
			const input = step.input({ seed: useCase.seed, outputs });
			const exec = adapters[step.id as keyof typeof adapters];
			const res = exec ? await exec(input) : { output: { ok: true } };
			const output = res && typeof res === 'object' && 'output' in res ? (res as any).output : res;
			outputs[step.id] = {
				input,
				output,
				processingSteps: (res as any)?.processingSteps,
				insights: (res as any)?.insights,
				evidence: (res as any)?.evidence,
				provenance: (res as any)?.provenance,
			};
			setCtx({ seed: useCase.seed, outputs: { ...outputs } });
			setCurrentStep(i);
			await new Promise(r => setTimeout(r, 300));
		}
		setIsRunning(false);
		setCurrentStep(useCase.steps.length - 1);
	};

	const stepsForPipeline = useCase.steps.map((s, idx) => ({
		id: s.id,
		name: s.title,
		endpoint: `/${s.id}`,
		icon: (() => () => null)(),
		status: (currentStep < 0 ? 'pending' : idx < currentStep ? 'completed' : idx === currentStep && isRunning ? 'running' : (ctx ? 'completed' : 'pending')) as 'running' | 'completed' | 'pending',
		color: idx === 0 ? 'blue' : idx === 1 ? 'red' : 'orange',
		duration: '—',
		inputData: ctx?.outputs?.[s.id]?.input ?? {},
		processingSteps: ctx?.outputs?.[s.id]?.processingSteps ?? [],
		outputData: ctx?.outputs?.[s.id]?.output ?? {},
		insights: ctx?.outputs?.[s.id]?.insights ?? [],
		evidence: ctx?.outputs?.[s.id]?.evidence,
		provenance: ctx?.outputs?.[s.id]?.provenance
	}));

	const dossier = ctx ? generateDynamicDossier(useCase.dossierApi, ctx.outputs[useCase.dossierApi], ctx.outputs[useCase.dossierApi]?.input) : null;

	return (
		<div className="max-w-6xl mx-auto p-6 space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">{useCase.name}</h1>
				<button onClick={start} disabled={isRunning} className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold">
					{isRunning ? 'Running…' : 'Run Use‑Case Demo'}
				</button>
			</div>

			<p className="text-slate-600">{useCase.summary}</p>

			{/* Explanatory context */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="md:col-span-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl p-4">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What will run</h3>
					<ol className="list-decimal pl-6 text-slate-700 dark:text-slate-300 space-y-1">
						{useCase.steps.map((s) => (
							<li key={s.id}><span className="font-medium">{s.title}</span> → endpoint <code>/{s.id}</code></li>
						))}
					</ol>
				</div>
				<div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl p-4">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Inputs</h3>
					<pre className="text-xs text-slate-700 dark:text-slate-200 overflow-auto">{JSON.stringify(useCase.seed, null, 2)}</pre>
				</div>
			</div>

			<InteractiveAnalysisPipeline
				variant={`${useCase.seed.gene ?? ''}:${useCase.seed.variant ?? ''}`}
				steps={stepsForPipeline}
				currentStep={currentStep}
			/>

			{ctx && dossier && <EnhancedDossierSummary dossier={dossier} />}
		</div>
	);
};

export default UseCaseDemoPage; 