import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function OracleProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Oracle</h1>
            <p className="text-slate-400">Discriminative AI Engine</p>
          </div>
        </div>
        <p className="text-xl text-slate-300">
          Zero-shot variant impact prediction with biological reasoning. Powered by Evo2.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Performance</h2>
          <ul className="space-y-2 text-slate-300">
            <li>95.7% AUROC on ClinVar</li>
            <li>94% AUROC on BRCA1/2</li>
            <li>73% VUS resolution rate</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Capabilities</h2>
          <ul className="space-y-2 text-slate-300">
            <li>Variant pathogenicity prediction</li>
            <li>Gene essentiality analysis</li>
            <li>Protein function prediction</li>
            <li>Chromatin accessibility</li>
            <li>CRISPR efficacy prediction</li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
        <div className="space-y-3">
          {[
            { name: 'Predict Variant Impact', href: '/docs/api/predict-variant-impact' },
            { name: 'Predict Gene Essentiality', href: '/docs/api/predict-gene-essentiality' },
            { name: 'Predict Protein Function', href: '/docs/api/predict-protein-functionality-change' },
            { name: 'Predict Chromatin Access', href: '/docs/api/predict-chromatin-accessibility' },
            { name: 'CRISPR Efficacy', href: '/docs/api/predict-crispr-spacer-efficacy' },
          ].map((endpoint) => (
            <Link
              key={endpoint.href}
              href={endpoint.href}
              className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-colors"
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



