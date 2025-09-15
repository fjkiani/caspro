import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Fingerprint, Bot, FileClock, Globe, Building, Cpu, Search as SearchIcon, FlaskConical as FlaskIcon, Activity as ActivityIcon } from 'lucide-react';
import AccessibilityToggle from '../components/AccessibilityToggle';
import {
  HeroSection,
  ValuePillarsGrid,
  TwoLayerArchitectureVisual,
  AIEnginesGrid,
  SolutionsCards,
  DeploymentModels,
  TrustBadges,
  DataRoomPreviewGrid,
  CTABand,
  GuidedDesignPanel,
  DesignResultSummary,
  QCBadges,
  SequencePeaksViewer,
  PipelineGraph,
  RunLogPanel,
  ProvenancePanel,
  KPIStrip,
} from '../components/site';
import type { ValuePillar, AIEngineCard, SolutionCard, DeploymentModel } from '../types/site';
import { sampleDecks } from '../data/sampleDecks.ts';

const SiteHomePage: React.FC = () => {
  const navigate = useNavigate();

  const pillars: ValuePillar[] = [
    { icon: <Shield className="w-5 h-5 text-blue-600" />, title: 'Identity Layer (Auth0)', text: 'SSO, adaptive MFA, roles and orgs as source of truth for who.' },
    { icon: <Fingerprint className="w-5 h-5 text-cyan-600" />, title: 'Asset Control (Blockchain)', text: 'Smart-contract permissions and wallet mapping for what.' },
    { icon: <Bot className="w-5 h-5 text-orange-600" />, title: 'AI Engine Verification', text: 'Isolated execution, I/O signing, attestations, drift monitoring.' },
    { icon: <FileClock className="w-5 h-5 text-emerald-600" />, title: 'Immutable Audit', text: 'Tamper-proof logs, exportable reports, legal-grade provenance.' },
  ];

  const engines: AIEngineCard[] = [
    { name: 'Zeta Oracle', features: ['Variant interpretation', 'Signed outputs with timestamps', 'Dataset lineage and integrity'] },
    { name: 'Zeta Forge', features: ['Therapeutic candidate design', 'Run attestations and policy guardrails', 'Config fingerprints'] },
    { name: 'Zeta Boltz', features: ['3D structural validation', 'Binding affinity records on-chain', 'Anomaly/drift alerts'] },
  ];

  const solutions: SolutionCard[] = [
    { icon: <SearchIcon className="w-5 h-5 text-emerald-600" />, title: 'VUS Classification', points: ['Backlog processing', 'Pathogenic/Benign calls', 'Cryptographically signed results'] },
    { icon: <FlaskIcon className="w-5 h-5 text-emerald-600" />, title: 'In Silico R&D', points: ['Pre-clinical research digitally', 'Target validation and design', 'Comprehensive validation bundles'] },
    { icon: <ActivityIcon className="w-5 h-5 text-emerald-600" />, title: 'Precision Oncology', points: ['Model metastasis processes', 'Identify intervention points', 'Design targeted strategies'] },
  ];

  const models: DeploymentModel[] = [
    { title: 'Zeta Shield Cloud', icon: <Globe className="w-6 h-6 text-indigo-600" />, color: 'indigo', features: ['Multi-tenant SaaS', '99.99% uptime SLA', 'Global edge', 'Auto scaling'], pricing: 'Starting at $10K/month', ideal: 'Startups & Mid-size Biotechs' },
    { title: 'Zeta Shield Enterprise', icon: <Building className="w-6 h-6 text-purple-600" />, color: 'purple', features: ['Private cloud/VPC', 'Custom compliance', 'Dedicated support', 'On-prem option'], pricing: 'Custom enterprise pricing', ideal: 'Large Pharma & Fortune 500' },
    { title: 'Zeta Shield Embedded', icon: <Cpu className="w-6 h-6 text-cyan-600" />, color: 'cyan', features: ['API-first integration', 'White-label options', 'Custom workflows', 'Revenue sharing'], pricing: 'Per-transaction pricing', ideal: 'Platform Providers & VCs' },
  ];

  // Demo props for new blocks
  const guidedObjectives = [
    { type: 'peak', start: 20, end: 60, value: 1 as const },
    { type: 'peak', start: 120, end: 160, value: 0 as const },
    { type: 'tf', motif: 'CTCF', start: 80, end: 90, weight: 0.8 },
  ];
  const demoLength = 200;
  const demoPeaks = [
    { start: 20, end: 60, value: 1 },
    { start: 120, end: 160, value: 0.6 },
  ];
  const pipelineSteps = [
    { id: 'ingest', name: 'Ingest', status: 'done' as const },
    { id: 'analyze', name: 'Analyze', status: 'done' as const },
    { id: 'design', name: 'Design', status: 'running' as const },
    { id: 'validate', name: 'Validate', status: 'queued' as const },
  ];
  const runLines = [
    { ts: '12:01:02', level: 'info' as const, msg: 'Forge started with scorer=enformer beam=8' },
    { ts: '12:01:06', level: 'warn' as const, msg: 'Objective overlap detected; reweighting' },
    { ts: '12:01:10', level: 'info' as const, msg: 'Beam 3 improved AUROC to 0.842' },
  ];
  const kpis = [
    { label: 'Variants scored', value: 12843, delta: 4.2 },
    { label: 'Designs generated', value: 312, delta: 1.1 },
    { label: 'QC pass rate', value: '96.3%', delta: 0.7 },
    { label: 'Avg time/run', value: '2m 14s', delta: -3.4 },
  ];

  return (
    <div className="w-full bg-slate-900">
      <AccessibilityToggle />
      <HeroSection
        title="Secure AI R&D with asset-level control and verifiable trust"
        subtitle="Zeta Shield unifies Auth0 identity, blockchain permissions, AI engine verification, and immutable audit—so partners can trust every result."
        primaryCta={{ label: 'Request Access', href: '/request' }}
        secondaryCta={{ label: 'Explore Data Room', href: '/#data-room' }}
        badges={[{ label: 'SOC 2' }, { label: 'HIPAA' }, { label: 'GDPR' }, { label: 'ISO 27001' }]}
      />

      <ValuePillarsGrid pillars={pillars} />

      <TwoLayerArchitectureVisual
        identityTitle="Identity & Authentication (Auth0)"
        identityText="Auth0 is the authoritative source for user identity, roles, and orgs. Every user authenticates with MFA before any access."
        assetTitle="Asset-Level Access Control (Blockchain)"
        assetText="Smart contracts govern access to specific assets; every request is an on-chain event creating immutable audit."
      />

      <AIEnginesGrid engines={engines} />

      {/* Links to product pages */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button onClick={() => navigate('/site/oracle')} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
            <div className="text-sm font-semibold text-slate-800 mb-1">Oracle</div>
            <div className="text-xs text-slate-600">Variant impact, explainability, calibration</div>
          </button>
          <button onClick={() => navigate('/site/forge')} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
            <div className="text-sm font-semibold text-slate-800 mb-1">Forge</div>
            <div className="text-xs text-slate-600">Guided design, trajectory, candidates</div>
          </button>
          <button onClick={() => navigate('/site/command-center')} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
            <div className="text-sm font-semibold text-slate-800 mb-1">Command Center</div>
            <div className="text-xs text-slate-600">Pipeline, logs, KPIs, evidence, roles</div>
          </button>
          <button onClick={() => navigate('/composer')} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
            <div className="text-sm font-semibold text-slate-800 mb-1">Slide Composer</div>
            <div className="text-xs text-slate-600">Create custom presentations from modular decks</div>
          </button>
        </div>
      </section>

      <SolutionsCards solutions={solutions} />

      {/* Forge demo */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Forge: Guided Design</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GuidedDesignPanel objectives={guidedObjectives as any} scorer="enformer" beamWidth={8} tokensPerBp={4} />
            <SequencePeaksViewer length={demoLength} peaks={demoPeaks} variantPos={88} />
          </div>
          <div className="space-y-6">
            <DesignResultSummary auroc={0.861} compute={{ beamWidth: 8, tokensPerBp: 4 }} scorerVersion="enformer-2024.08" modelVersion="evo2-1m" seed={42} />
            <QCBadges synteny={0.93} pfamHitRate={0.88} dinucKL={0.12} />
          </div>
        </div>
      </section>

      {/* Command Center demo */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Command Center</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PipelineGraph steps={pipelineSteps as any} />
            <RunLogPanel lines={runLines as any} />
          </div>
          <div className="space-y-6">
            <KPIStrip items={kpis} />
            <ProvenancePanel model="evo2" modelVersion="1.0.0" scorer="enformer" scorerVersion="2024.08" seed={42} createdAt={new Date().toISOString()} />
          </div>
        </div>
      </section>

      <DeploymentModels models={models} />

      <section id="data-room" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Featured Decks</h2>
          <TrustBadges badges={[{ label: 'Executive Summaries' }]} />
        </div>
        <DataRoomPreviewGrid decks={sampleDecks} onOpen={(id) => navigate(`/deck/${id}`)} />
      </section>

      <CTABand
        title="Secure your AI R&D with verifiable trust"
        subtitle="Identity, asset control, AI verification, and immutable audit—deployed your way."
        primaryCta={{ label: 'Request Access', href: '/request' }}
        secondaryCta={{ label: 'Read Docs', href: '/docs' }}
      />
    </div>
  );
};

export default SiteHomePage; 
