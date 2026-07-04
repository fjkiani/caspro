import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Variant Interpretation — CrisPRO.ai Oracle',
  description: 'AI-driven variant interpretation with Oracle — 95.7% AUROC on ClinVar (n=53,210), VUS resolution, and mechanism-aligned pathogenicity prediction.',
  alternates: { canonical: '/variant-interpretation' },
  openGraph: { title: 'AI Variant Interpretation — CrisPRO.ai Oracle', description: 'AI-driven variant interpretation with Oracle — 95.7% AUROC on ClinVar (n=53,210), VUS resolution, and mechanism-aligned pathogenicity prediction.', url: 'https://crispro.ai/variant-interpretation', type: 'article' },
};

export default function ClusterPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-6">Variant Interpretation</h1>
        <p className="text-zinc-400 text-lg mb-8">AI-driven variant interpretation with Oracle — 95.7% AUROC on ClinVar (n=53,210), VUS resolution, and mechanism-aligned pathogenicity prediction.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variant interpretation is where oncology bottlenecks</h2>
        <p className="mb-4 leading-relaxed">Every CGP report ends the same way: a list of variants, a mix of pathogenic, likely pathogenic, VUS, and benign, and a clinician who has to decide what to act on. VUS resolution is where care plans stall and where AI variant interpretation earns its keep.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Oracle scores variants</h2>
        <p className="mb-4 leading-relaxed">Oracle is a mechanism-aligned variant interpretation engine. It combines sequence-level features (missense predictors, splicing predictors, conservation), transcript-level features (isoform expression, tissue specificity), and functional features (essentiality, synthetic lethality) into a single per-variant score with a mechanistic rationale.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Validation results</h2>
        <p className="mb-4 leading-relaxed">Oracle has been benchmarked at 95.7% AUROC on ClinVar (n=53,210) for variant impact prediction, 73% VUS resolution in clinical validation (n=1,000 patients), and 82.5-82.6% AUROC on SpliceVarDB (n=4,950) for splice-variant impact. See the evidence page for full methodology and links to primary data.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Beyond classification: what to do with it</h2>
        <p className="mb-4 leading-relaxed">Oracle does not stop at pathogenic vs benign. Every variant score is tied to a mechanistic story — which pathway, which driver, which vulnerability. That story flows into Forge (design) and Scribe (narrative), so variant interpretation becomes actionable decision support instead of just a label.</p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Related</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><Link href='/products/oracle' className="text-cyan-400 hover:underline">Oracle intelligence</Link></li>
          <li><Link href='/products/oncology/resolve-genetic-uncertainty' className="text-cyan-400 hover:underline">Resolve genetic uncertainty</Link></li>
          <li><Link href='/evidence' className="text-cyan-400 hover:underline">Evidence and validation</Link></li>
          <li><Link href='/evidence/csi-validation' className="text-cyan-400 hover:underline">CSI validation</Link></li>
          <li><Link href='/platform' className="text-cyan-400 hover:underline">Platform overview</Link></li>
          <li><Link href='/case-studies' className="text-cyan-400 hover:underline">Case studies</Link></li>
        </ul>

        <p className="mt-12 text-sm text-zinc-500">
          Ready to see it in action?{" "}
          <Link href="/contact" className="text-cyan-400 hover:underline">Book a demo →</Link>
        </p>
      </article>
    </main>
  );
}
