import React from 'react';
import { PipelineGraph, RunLogPanel, ProvenancePanel, KPIStrip } from '../components/site/blocks';
import { Command } from '../components/site';
import { commandCenterContent } from '../data/commandCenterContent';

const ProductCommandCenter: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PipelineGraph steps={commandCenterContent.pipeline.steps as any} />
        <RunLogPanel lines={commandCenterContent.logs as any} />
      </div>
      <div className="space-y-6">
        <KPIStrip items={commandCenterContent.kpis.items} />
        <ProvenancePanel {...commandCenterContent.provenance} />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Command.WorkQueue runs={commandCenterContent.runs} />
      <Command.EvidencePanel items={commandCenterContent.evidence} />
    </div>
    <Command.RoleMatrix roles={commandCenterContent.roles} />
  </div>
);

export default ProductCommandCenter; 