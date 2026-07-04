import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quickstart Guide",
  description: "Get up and running with the CrisPRO.ai API in minutes. Authentication, your first request, and recommended next steps.",
  alternates: { canonical: "/docs/quickstart" },
};

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
        <p className="text-xl text-slate-400">
          Get up and running with CrisPRO.ai APIs in minutes
        </p>
      </div>

      <div className="space-y-6">
        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">1. Get Your API Key</h2>
          <p className="text-slate-300 mb-4">
            Sign up for a CrisPRO.ai account and generate your API key from the dashboard.
          </p>
          <div className="p-4 bg-slate-900 rounded-lg">
            <code className="text-sm text-slate-300">
              API_KEY=your_api_key_here
            </code>
          </div>
        </section>

        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">2. Make Your First Request</h2>
          <p className="text-slate-300 mb-4">
            Try the Predict Variant Impact endpoint:
          </p>
          <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
            <pre className="text-sm text-slate-300">
{`curl -X POST https://api.crispro.ai/predict_variant_impact \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "predict_variant_impact",
    "variant": "chr17:43044295:A>T",
    "gene": "BRCA1"
  }'`}
            </pre>
          </div>
        </section>

        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">3. Explore the APIs</h2>
          <p className="text-slate-300 mb-4">
            Browse our API documentation to discover all available endpoints:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><a href="/docs/api/predict-variant-impact" className="text-blue-400 hover:underline">Predict Variant Impact</a></li>
            <li><a href="/docs/api/predict-gene-essentiality" className="text-blue-400 hover:underline">Predict Gene Essentiality</a></li>
            <li><a href="/docs/api/generate-optimized-guide-rna" className="text-blue-400 hover:underline">Generate Guide RNA</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}





