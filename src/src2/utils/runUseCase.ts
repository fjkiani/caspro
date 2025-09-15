export type UseCaseStepId =
	| 'variant_impact'
	| 'protein_functional_change'
	| 'chromatin_accessibility'
	| 'gene_essentiality'
	| 'crispr_efficacy'
	| 'splice_impact'
	| 'drug_target_interaction'
	| 'immunogenicity'
	| 'generate_optimized_guide_rna'
	| 'generate_repair_template'
	| 'generate_therapeutic_protein'
	| 'cancer_hallmarks'
	| 'personalized_therapy';

export type UseCaseStep = {
	id: UseCaseStepId;
	title: string;
	input: (ctx: any) => any;
	runMode?: 'simulate' | 'live';
	simulate?: (input: any) => Promise<any>;
};

export type UseCase = {
	id: string;
	name: string;
	summary: string;
	seed: Record<string, any>;
	steps: UseCaseStep[];
	dossierApi: UseCaseStepId;
};

export type UseCaseContext = {
	seed: Record<string, any>;
	outputs: Record<string, { input: any; output: any; processingSteps?: any[]; insights?: string[]; evidence?: any; provenance?: string }>;
};

export async function runUseCase(useCase: UseCase, adapters: Partial<Record<UseCaseStepId, (input: any) => Promise<any>>> = {}): Promise<UseCaseContext> {
	const ctx: UseCaseContext = { seed: useCase.seed, outputs: {} };
	for (const step of useCase.steps) {
		const input = step.input(ctx);
		const exec = step.runMode === 'live' ? adapters[step.id] : step.simulate ?? adapters[step.id];
		if (!exec) {
			ctx.outputs[step.id] = { input, output: { ok: true } };
			continue;
		}
		const res = await exec(input);
		const output = res && typeof res === 'object' && 'output' in res ? (res as any).output : res;
		ctx.outputs[step.id] = {
			input,
			output,
			processingSteps: (res as any)?.processingSteps,
			insights: (res as any)?.insights,
			evidence: (res as any)?.evidence,
			provenance: (res as any)?.provenance,
		};
	}
	return ctx;
} 