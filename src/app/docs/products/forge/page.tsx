import Link from 'next/link';
import { Beaker, ArrowRight } from 'lucide-react';

export default function ForgeProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Beaker className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Forge</h1>
            <p className="text-slate-400">Generative AI Engine</p>
          </div>
        </div>
        <p className="text-xl text-slate-300">
          Agentic therapeutic design for cancer immunotherapies. Generate optimized guide RNAs, repair templates, and therapeutic proteins.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Performance</h2>
          <ul className="space-y-2 text-slate-300">
            <li>70% Pfam-hit rate</li>
            <li>100% AlphaFold 3 validation</li>
            <li>90% design quality AUROC</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Capabilities</h2>
          <ul className="space-y-2 text-slate-300">
            <li>Guide RNA optimization</li>
            <li>HDR repair template generation</li>
            <li>Regulatory element design</li>
            <li>Therapeutic protein engineering</li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
        <div className="space-y-3">
          {[
            { name: 'Generate Guide RNA', href: '/docs/api/generate-optimized-guide-rna' },
            { name: 'Generate Repair Template', href: '/docs/api/generate-repair-template' },
            { name: 'Generate Regulatory Element', href: '/docs/api/generate-regulatory-element' },
            { name: 'Generate Therapeutic Protein', href: '/docs/api/generate-therapeutic-protein' },
          ].map((endpoint) => (
            <Link
              key={endpoint.href}
              href={endpoint.href}
              className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors"
            >
              <span className="text-slate-300">{endpoint.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}





