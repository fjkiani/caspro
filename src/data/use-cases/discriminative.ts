import type { UseCase } from '../../utils/runUseCase';
import { simulateVariantImpact, simulateProteinFunctionalChange, simulateChromatinAccessibility, simulateGeneEssentiality, simulateCrisprEfficacy } from '../../utils/simulations';

export const hereditaryBreastCancer: UseCase = {
	id: 'hereditary_breast_cancer',
	name: 'Hereditary Breast Cancer Triage',
	summary: 'End‑to‑end triage of BRCA1 variant with downstream context and actionability.',
	seed: { gene: 'BRCA1', variant: 'c.5266dupC', pos: 'chr17:43044295' },
	steps: [
		{
			id: 'variant_impact',
			title: 'Variant Impact Prediction',
			input: (ctx) => ({ gene: ctx.seed.gene, variant: ctx.seed.variant, genomic_position: ctx.seed.pos }),
			runMode: 'simulate'
		},
		{
			id: 'protein_functional_change',
			title: 'Protein Function Analysis',
			input: (ctx) => ({ protein: ctx.seed.gene, variant: ctx.seed.variant }),
			runMode: 'simulate'
		},
		{
			id: 'chromatin_accessibility',
			title: 'Chromatin Context',
			input: (ctx) => ({ genomic_region: ctx.seed.pos, tissue_context: 'breast_tissue' }),
			runMode: 'simulate'
		}
	],
	dossierApi: 'variant_impact'
};

export const oncogeneActivation: UseCase = {
	id: 'oncogene_activation',
	name: 'Oncogene Activation Assessment',
	summary: 'Assess activating mutations in oncogenes and their downstream functional impacts.',
	seed: { gene: 'KRAS', variant: 'G12C', pos: 'chr12:25398285' },
	steps: [
		{
			id: 'variant_impact',
			title: 'Variant Impact Prediction',
			input: (ctx) => ({ gene: ctx.seed.gene, variant: ctx.seed.variant, genomic_position: ctx.seed.pos }),
			runMode: 'simulate'
		},
		{
			id: 'protein_functional_change',
			title: 'Protein Function Analysis',
			input: (ctx) => ({ protein: ctx.seed.gene, variant: ctx.seed.variant }),
			runMode: 'simulate'
		}
	],
	dossierApi: 'variant_impact'
};

export const therapeuticTargeting: UseCase = {
	id: 'therapeutic_targeting',
	name: 'Therapeutic Targeting Strategy',
	summary: 'Evaluate gene essentiality and context for selecting therapeutic targets.',
	seed: { gene: 'KRAS', contextA: 'KRAS-mutant NSCLC', contextB: 'Normal lung' },
	steps: [
		{
			id: 'gene_essentiality',
			title: 'Gene Essentiality by Context',
			input: (ctx) => ({ gene: ctx.seed.gene, contexts: [{ cell_line: ctx.seed.contextA }, { cell_line: ctx.seed.contextB }] }),
			runMode: 'simulate'
		}
	],
	dossierApi: 'gene_essentiality'
};

export const discriminativeUseCases = [hereditaryBreastCancer, oncogeneActivation, therapeuticTargeting]; 