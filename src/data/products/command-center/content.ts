// Command Center Orchestration Engine
// Real content from src2 - workflow orchestration, provenance tracking, and evidence aggregation

export type PipelineStep = { id: string; name: string; status: 'done' | 'running' | 'queued' | 'error'; startedAt?: string; finishedAt?: string };
export type RunLog = { ts: string; level: 'info' | 'warn' | 'error'; msg: string };
export type Run = { id: string; engine: 'oracle' | 'forge' | 'boltz'; status: 'queued' | 'running' | 'done' | 'error'; startedAt?: string; finishedAt?: string };
export type Evidence = { id: string; type: 'score' | 'design' | 'structure'; summary: string; link?: string };
export type KPIItem = { label: string; value: string | number; delta?: number };
export type Provenance = { model: string; modelVersion: string; scorer: string; scorerVersion: string; seed: number; createdAt: string; commit?: string };
export type Role = { name: string; capabilities: string[] };

export const commandCenterContent = {
  about: {
    oneLiner: 'The central nervous system of our entire in silico war machine',
    purpose: 'Agentic, end-to-end platform that transforms researchers from hypothesis to IND-ready asset',
    coreConcept: 'Command Center is the orchestrator of our entire in silico conquest. It executes state-managed, multi-stage kill chains from unvalidated hypothesis to de-risked, IND-ready therapeutic assets.',
    mission: 'Transform researchers from process managers to strategic commanders through automated in silico conquest'
  },
  
  // Real kill chain states from doctrine
  killChain: {
    states: [
      { id: 'queued', name: 'QUEUED', description: 'Mission defined and awaiting resources', status: 'done' },
      { id: 'indexing', name: 'INDEXING', description: 'Zeta Index Triumvirate Threat Assessment - GO/NO-GO verdict', status: 'done' },
      { id: 'forging', name: 'FORGING', description: 'Zeta Forge multi-modal therapeutic arsenal design', status: 'running' },
      { id: 'validating', name: 'VALIDATING', description: 'Zeta Boltz structural validation and efficacy simulation', status: 'queued' },
      { id: 'aggregating', name: 'AGGREGATING', description: 'Intelligence reports gathered into Therapeutic Dossier', status: 'queued' },
      { id: 'complete', name: 'COMPLETE', description: 'Final Therapeutic Dossier generated - Victory achieved', status: 'queued' }
    ]
  },
  
  // Real API endpoints from doctrine
  apiEndpoints: {
    campaigns: {
      create: 'POST /v1/campaigns',
      status: 'GET /v1/campaigns/{campaign_id}/status',
      dossier: 'GET /v1/campaigns/{campaign_id}/dossier',
      list: 'GET /v1/campaigns'
    },
    description: 'RESTful API for managing complete therapeutic campaign lifecycle'
  },
  
  // Legacy pipeline for backward compatibility
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
    model: 'evo2', 
    modelVersion: '1.0.0', 
    scorer: 'enformer', 
    scorerVersion: '2024.08', 
    seed: 42, 
    createdAt: new Date().toISOString(), 
    commit: 'a1b2c3d'
  } as Provenance,
  
  evidence: [
    { id: 'EV-001', type: 'score', summary: 'Zeta Score −26,140.8 (pathogenic)' },
    { id: 'EV-002', type: 'design', summary: 'Gene correction HDR arms (2.1kb/2.3kb) with constraints' },
    { id: 'EV-003', type: 'structure', summary: 'Complex confidence 0.958 (AF3)' },
  ] as Evidence[],
  
  // Zeta Shield security architecture from doctrine
  zetaShield: {
    humanLayer: {
      provider: 'Okta',
      description: 'Top-level permissions defined by roles in Okta',
      roles: [
        { name: 'Researcher', description: 'Launch and view own campaigns' },
        { name: 'Clinical Lead', description: 'View all campaigns for their indication' },
        { name: 'Admin', description: 'Manage users and system settings' }
      ]
    },
    assetLayer: {
      provider: 'Blockchain',
      description: 'Granular access to specific therapeutic assets via smart contracts',
      features: [
        'Cryptographic wallet access to campaign_ids',
        'Ruthlessly precise, auditable control over IP',
        'Asset-level permissions for RUNX1-nanobody-003 type assets'
      ]
    }
  },
  
  // Real business use cases from doctrine
  businessUseCases: [
    {
      id: 'target-validation-service',
      title: 'Target Validation as a Service',
      description: 'Biotech provides potential targets; we return ranked list of validated dossiers',
      value: 'Eliminate months of target validation uncertainty'
    },
    {
      id: 'lead-generation',
      title: 'In Silico Lead Generation', 
      description: 'Partner has validated target; we deliver portfolio of novel, patent-worthy candidates',
      value: 'Accelerate lead discovery from months to days'
    },
    {
      id: 'full-rd',
      title: 'Full In Silico R&D',
      description: 'Execute entire kill chain from unvalidated target to IND-ready asset',
      value: 'Complete therapeutic development in silico'
    }
  ],
  
  // CrisPRO Studio Mission Control UI
  missionControl: {
    name: 'CrisPRO Studio',
    description: 'Mission Control interface for campaign management',
    features: [
      'Kanban-style board showing active campaigns and kill chain stages',
      'Detailed campaign view with real-time logs and parameters',
      'Interactive dossier viewer for completed campaigns',
      'WebSocket connection for live operational logs'
    ]
  },
  
  // Legacy roles for backward compatibility
  roles: [
    { name: 'Researcher', capabilities: ['view-evidence', 'queue-run'] },
    { name: 'Admin', capabilities: ['view-evidence', 'queue-run', 'manage-roles'] },
    { name: 'Partner', capabilities: ['view-evidence'] },
  ] as Role[],
} as const;

export type CommandCenterContent = typeof commandCenterContent;