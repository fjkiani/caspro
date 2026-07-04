import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Oncology Platform — CrisPRO.ai',
  description: 'CrisPRO.ai is an AI oncology platform that turns molecular and clinical data into mechanism-aligned, auditable decisions for cancer care.',
  alternates: { canonical: '/ai-oncology-platform' },
  openGraph: { title: 'AI Oncology Platform — CrisPRO.ai', description: 'CrisPRO.ai is an AI oncology platform that turns molecular and clinical data into mechanism-aligned, auditable decisions for cancer care.', url: 'https://crispro.ai/ai-oncology-platform', type: 'article' },
};

export default function ClusterPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-6">AI Oncology Platform</h1>
        <p className="text-zinc-400 text-lg mb-8">CrisPRO.ai is an AI oncology platform that turns molecular and clinical data into mechanism-aligned, auditable decisions for cancer care.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What is an AI oncology platform?</h2>
        <p className="mb-4 leading-relaxed">An AI oncology platform is a decision-support system that ingests structured molecular data (variants, transcripts, IHC), clinical data (staging, prior therapy, comorbidities), and evidence data (trials, literature) and converts them into mechanism-aligned recommendations at the point of care. CrisPRO.ai is an assay-agnostic AI oncology platform — we consume reports from any CGP vendor and produce deterministic, evidence-linked decisions.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why mechanism alignment matters</h2>
        <p className="mb-4 leading-relaxed">Most AI oncology tools stop at variant classification or trial matching. CrisPRO reasons about mechanism: which therapy hits the driver, which resistance clone is emerging, which regimen sequence maximizes durable response. Oracle scores variant impact and regimen fit; Forge proposes therapeutic strategies against emerging resistance; Scribe writes the audit-ready justification.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What differentiates CrisPRO.ai</h2>
        <p className="mb-4 leading-relaxed">Three things: (1) assay-agnostic — we work on top of Tempus, Foundation, Guardant, Caris, or any CGP output; (2) mechanism-first — every recommendation is tied to a mechanistic hypothesis with evidence provenance; (3) audit-ready — every decision has a Scribe-generated narrative with links to the exact trial data, guideline, or paper that justifies it.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Validation and evidence</h2>
        <p className="mb-4 leading-relaxed">CrisPRO Oracle intelligence has been benchmarked at 95.7% AUROC on ClinVar (n=53,210) for variant impact prediction, with 73% VUS resolution in clinical validation cohorts (n=1,000) and 82.5-82.6% AUROC on SpliceVarDB (n=4,950). Every claim is documented on the evidence ledger.</p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Related</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><Link href='/platform' className="text-cyan-400 hover:underline">Platform overview</Link></li>
          <li><Link href='/products/oncology' className="text-cyan-400 hover:underline">Oncology products</Link></li>
          <li><Link href='/products/oracle' className="text-cyan-400 hover:underline">Oracle intelligence</Link></li>
          <li><Link href='/products/forge' className="text-cyan-400 hover:underline">Forge intelligence</Link></li>
          <li><Link href='/products/command-center' className="text-cyan-400 hover:underline">Scribe (Command Center)</Link></li>
          <li><Link href='/evidence' className="text-cyan-400 hover:underline">Evidence and validation</Link></li>
          <li><Link href='/case-studies' className="text-cyan-400 hover:underline">Case studies</Link></li>
          <li><Link href='/comparison' className="text-cyan-400 hover:underline">vs. Tempus, Foundation, Guardant</Link></li>
        </ul>

        <p className="mt-12 text-sm text-zinc-500">
          Ready to see it in action?{" "}
          <Link href="/contact" className="text-cyan-400 hover:underline">Book a demo →</Link>
        </p>
      </article>
    </main>
  );
}
