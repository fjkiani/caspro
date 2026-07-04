import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "API Use Cases",
  description: "CrisPRO.ai API use cases — variant interpretation, mechanism alignment, therapeutic design, and evidence retrieval via REST endpoints.",
  alternates: { canonical: "/api-use-cases" },
};

export default function ApiUseCasesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">API Use Cases — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific API use cases. The following is placeholder copy to be replaced with real endpoint examples and integration patterns.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">What the CrisPRO.ai API does</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">The CrisPRO.ai API exposes the platform&#39;s three intelligences — Oracle, Forge, and Scribe — as REST endpoints. You can submit a variant, a target, or a clinical question and receive a structured, evidence-backed response with full audit trails.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Use case: variant interpretation at scale</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Submit a VCF or a list of variants to the Oracle endpoint and receive interpreted calls with confidence scores, evidence citations, and audit trails. Use this for batch VUS resolution, cohort-level analysis, or integration into a LIMS workflow.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add a code example showing the API request and response format for variant interpretation.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Use case: mechanism alignment for drug discovery</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Submit a candidate target and a candidate molecule to the Forge endpoint and receive a mechanism alignment score, binding pocket analysis, and selectivity profile. Use this to triage a pipeline before in-vivo work.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add a code example showing the API request and response format for mechanism alignment.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Use case: clinical narrative generation</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Submit a patient context and a clinical question to the Scribe endpoint and receive a chart-ready, auditable narrative with full evidence citations. Use this to support — not replace — the oncologist&#39;s documentation workflow.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add a code example showing the API request and response format for narrative generation.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Use case: evidence retrieval</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Query the evidence ledger directly to retrieve validation receipts, dataset metadata, and performance metrics. Use this to verify any claim the platform makes.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add a code example showing the API request and response format for evidence retrieval.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Getting started</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Read the quickstart guide for authentication, your first request, and response schemas. The API uses standard API keys with scoped permissions.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 font-semibold">API documentation <span aria-hidden>→</span></Link>
      <Link href="/products" className="text-cyan-400 hover:text-cyan-300 font-semibold">Products <span aria-hidden>→</span></Link>
      <Link href="/platform" className="text-cyan-400 hover:text-cyan-300 font-semibold">Platform <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
