import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Boltz API Reference",
  description: "Boltz-2 binding-affinity and folding endpoint reference on the CrisPRO.ai platform.",
  alternates: { canonical: "/docs/products/boltz" },
};


export default function BoltzProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Boltz</h1>
            <p className="text-slate-400">Structural Validation Engine</p>
          </div>
        </div>
        <p className="text-xl text-slate-300">
          3D structural validation and binding affinity prediction. Coming soon.
        </p>
      </div>

      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
        <p className="text-slate-400">
          Boltz provides structural validation for generated therapeutic designs using AlphaFold 3 and ESMFold.
        </p>
      </div>
    </div>
  );
}





