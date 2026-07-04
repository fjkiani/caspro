import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Drug Discovery Platform — CrisPRO.ai',
  description: 'Mechanism-aligned AI drug discovery — target selection, in-silico therapeutic design, and evidence-linked prioritization for oncology and biotech R&D.',
  alternates: { canonical: '/ai-drug-discovery' },
  openGraph: { title: 'AI Drug Discovery Platform — CrisPRO.ai', description: 'Mechanism-aligned AI drug discovery — target selection, in-silico therapeutic design, and evidence-linked prioritization for oncology and biotech R&D.', url: 'https://crispro.ai/ai-drug-discovery', type: 'article' },
};

export default function ClusterPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-6">AI Drug Discovery</h1>
        <p className="text-zinc-400 text-lg mb-8">Mechanism-aligned AI drug discovery — target selection, in-silico therapeutic design, and evidence-linked prioritization for oncology and biotech R&D.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mechanism-first target selection</h2>
        <p className="mb-4 leading-relaxed">Most AI drug discovery pipelines start from a target list and screen chemistry against it. CrisPRO.ai reverses that. Oracle scores which target is the right target given the disease biology, patient population, and competitive landscape. Only then does Forge propose therapeutic design against it — the drug is a consequence of the mechanism.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Oracle: target and variant scoring</h2>
        <p className="mb-4 leading-relaxed">Oracle interprets variants and transcripts, projects onto essentiality/synthetic-lethality maps, and returns a ranked target list with a mechanistic story and evidence links. This is the discovery bottleneck we solve for biotech R&D: which target is worth screening.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Forge: in-silico therapeutic design</h2>
        <p className="mb-4 leading-relaxed">Forge takes the target and designs against it — CRISPR guide RNAs for functional validation, small-molecule scaffolds for chemistry starting points, or biologic strategies with epitope/paratope reasoning. Every design is tagged with confidence, off-mechanism risk, and the evidence chain.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why it works for oncology biotech R&D</h2>
        <p className="mb-4 leading-relaxed">Cancer drug discovery is target-limited, not chemistry-limited. Mechanism-aligned target selection with per-target evidence traceability is what lets small biotechs punch above their weight. CrisPRO.ai is that reasoning layer.</p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Related</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><Link href='/drug-development' className="text-cyan-400 hover:underline">Drug development</Link></li>
          <li><Link href='/products/forge' className="text-cyan-400 hover:underline">Forge intelligence</Link></li>
          <li><Link href='/products/oracle' className="text-cyan-400 hover:underline">Oracle intelligence</Link></li>
          <li><Link href='/platform' className="text-cyan-400 hover:underline">Platform overview</Link></li>
          <li><Link href='/research' className="text-cyan-400 hover:underline">Research</Link></li>
          <li><Link href='/evidence' className="text-cyan-400 hover:underline">Evidence</Link></li>
        </ul>

        <p className="mt-12 text-sm text-zinc-500">
          Ready to see it in action?{" "}
          <Link href="/contact" className="text-cyan-400 hover:underline">Book a demo →</Link>
        </p>
      </article>
    </main>
  );
}
