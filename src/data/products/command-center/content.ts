export type PipelineStep = { id: string; name: string; status: 'done' | 'running' | 'queued' | 'error'; startedAt?: string; finishedAt?: string };
export type RunLog = { ts: string; level: 'info' | 'warn' | 'error'; msg: string };
export type Run = { id: string; engine: 'oracle' | 'forge' | 'boltz'; status: 'queued' | 'running' | 'done' | 'error'; startedAt?: string; finishedAt?: string };
export type Evidence = { id: string; type: 'score' | 'design' | 'structure'; summary: string; link?: string };
export type KPIItem = { label: string; value: string | number; delta?: number };
export type Provenance = { model: string; modelVersion: string; scorer: string; scorerVersion: string; seed: number; createdAt: string; commit?: string };
export type Role = { name: string; capabilities: string[] };

export const commandCenterContent = {
  pipeline: {
    steps: [
      { id: 'ingest', name: 'Ingest', status: 'done', startedAt: '2025-08-10T12:00:00Z', finishedAt: '2025-08-10T12:01:10Z' },
      { id: 'analyze', name: 'Analyze', status: 'done', startedAt: '2025-08-10T12:01:11Z', finishedAt: '2025-08-10T12:03:00Z' },
      { id: 'design', name: 'Design', status: 'running', startedAt: '2025-08-10T12:03:05Z' },
      { id: 'validate', name: 'Validate', status: 'queued' },
    ] as PipelineStep[],
  },
  runs: [
    { id: 'RUN-124', engine: 'forge', status: 'running', startedAt: '12:03:05' },
    { id: 'RUN-123', engine: 'oracle', status: 'done', startedAt: '12:01:11', finishedAt: '12:03:00' },
    { id: 'RUN-122', engine: 'boltz', status: 'queued' },
  ] as Run[],
  logs: [
    { ts: '12:01:02', level: 'info', msg: 'Oracle: starting zero-shot scoring' },
    { ts: '12:03:05', level: 'info', msg: 'Forge: guided design started (beam=8, tokens/bp=4)' },
    { ts: '12:03:20', level: 'info', msg: 'Boltz queued' },
  ] as RunLog[],
  kpis: {
    items: [
      { label: 'Runs today', value: 48, delta: 6.2 },
      { label: 'Avg run time', value: '2m 18s', delta: -2.1 },
      { label: 'Evidence items', value: 128, delta: 3.4 },
      { label: 'Queue length', value: 5, delta: 1.0 },
    ] as KPIItem[],
  },
  provenance: {
    model: 'evo2', modelVersion: '1.0.0', scorer: 'enformer', scorerVersion: '2024.08', seed: 42, createdAt: new Date().toISOString(), commit: 'a1b2c3d'
  } as Provenance,
  evidence: [
    { id: 'EV-001', type: 'score', summary: 'Zeta Score −26,140.8 (pathogenic)' },
    { id: 'EV-002', type: 'design', summary: 'Gene correction HDR arms (2.1kb/2.3kb) with constraints' },
    { id: 'EV-003', type: 'structure', summary: 'Complex confidence 0.958 (AF3)' },
  ] as Evidence[],
  roles: [
    { name: 'Researcher', capabilities: ['view-evidence', 'queue-run'] },
    { name: 'Admin', capabilities: ['view-evidence', 'queue-run', 'manage-roles'] },
    { name: 'Partner', capabilities: ['view-evidence'] },
  ] as Role[],
} as const;

export type CommandCenterContent = typeof commandCenterContent; 
 
 
 
 
 
 
 
 