import type { ForgeContent } from '../forgeContent';

export const toForgeBlocksExtended = (f: ForgeContent) => ([
	{ kind: 'forge-guided', props: { objectives: f.objectives, scorer: 'enformer', beamWidth: f.compute.beamWidth, tokensPerBp: f.compute.tokensPerBp } },
	{ kind: 'sequence-peaks', props: { length: 200, peaks: f.objectives.filter(o => o.type === 'peak').map(p => ({ start: (p as any).start, end: (p as any).end, value: (p as any).value || 1 })), variantPos: 88 } },
	{ kind: 'design-summary', props: { auroc: f.candidates[0]?.score || 0.85, compute: f.compute, scorerVersion: 'enformer-2024.08', modelVersion: 'evo2-1m', seed: 42 } },
]);

export const toForgeNamespaceProps = (f: ForgeContent) => ({
	objectiveList: { objectives: f.objectives, constraints: f.constraints },
	trajectory: { series: f.trajectory },
	candidateTable: { candidates: f.candidates },
	presets: { presets: f.presets },
	constraints: { constraints: f.constraints },
}); 
 
 
 
 