import { Command } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Command Center Documentation",
  description: "Operator console for orchestrating CrisPRO.ai engines, Co-Pilots, and evidence flows.",
  alternates: { canonical: "/docs/products/command-center" },
};


export default function CommandCenterProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Command className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Command Center</h1>
            <p className="text-slate-400">Orchestration Engine</p>
          </div>
        </div>
        <p className="text-xl text-slate-300">
          Workflow orchestration with provenance tracking. Coming soon.
        </p>
      </div>

      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
        <p className="text-slate-400">
          Command Center provides complete workflow orchestration, provenance tracking, and evidence aggregation for therapeutic development pipelines.
        </p>
      </div>
    </div>
  );
}





