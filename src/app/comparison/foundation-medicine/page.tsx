import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CrisPRO.ai vs Foundation Medicine — Comparison',
  description: 'How CrisPRO.ai compares to Foundation Medicine for AI-driven oncology decision support: assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.',
  alternates: { canonical: '/comparison/foundation-medicine' },
  openGraph: { title: 'CrisPRO.ai vs Foundation Medicine — Comparison', description: 'How CrisPRO.ai compares to Foundation Medicine for AI-driven oncology decision support: assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.', url: 'https://crispro.ai/comparison/foundation-medicine', type: 'article' },
};

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">CrisPRO.ai vs Foundation Medicine</h1>
        <p className="text-zinc-400 text-lg mb-10">A frank comparison of two very different tools in the modern oncology stack.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Foundation Medicine does</h2>
        <p className="mb-4 leading-relaxed">Foundation Medicine is a comprehensive genomic profiling and companion-diagnostic sequencing. Its core offering is FoundationOne family of assays plus curated variant knowledge. Foundation Medicine is a Roche subsidiary anchored in CGP assays and companion diagnostics with a curated knowledgebase optimized for report generation.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What CrisPRO.ai does</h2>
        <p className="mb-4 leading-relaxed">CrisPRO.ai is an <Link href="/platform" className="text-cyan-400 hover:underline">AI-powered oncology co-pilot</Link> built around three specialized intelligences: <Link href="/products/oracle" className="text-cyan-400 hover:underline">Oracle</Link> for variant and regimen interpretation, <Link href="/products/forge" className="text-cyan-400 hover:underline">Forge</Link> for in-silico therapeutic design, and <Link href="/products/command-center" className="text-cyan-400 hover:underline">Scribe (Command Center)</Link> for evidence-linked clinical narrative.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">The core difference</h2>
        <p className="mb-4 leading-relaxed">CrisPRO.ai does not compete with the assay. We read Foundation reports (and any other CGP output) and add mechanism reasoning, in-silico therapeutic design (Forge), and audit-ready narrative (Scribe).</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where they fit together</h2>
        <p className="mb-4 leading-relaxed">Pair Foundation reports with CrisPRO to move from variant classification to mechanism-aligned intervention design. See our <Link href="/evidence" className="text-cyan-400 hover:underline">evidence page</Link> for validation results including 95.7% AUROC on ClinVar (n=53,210) and 73% VUS resolution in clinical validation.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Decision matrix</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><strong className="text-white">If you need the assay:</strong> Foundation Medicine (or another CGP provider). CrisPRO does not sequence.</li>
          <li><strong className="text-white">If you need mechanism-aligned reasoning</strong> on top of the assay output: CrisPRO.ai.</li>
          <li><strong className="text-white">If you need audit-ready narrative</strong> for tumor board, payer, or FDA: CrisPRO Scribe.</li>
          <li><strong className="text-white">If you need in-silico therapeutic design</strong> (CRISPR guide RNAs, regimen alternatives): CrisPRO Forge.</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Get started</h2>
        <p className="mb-6 leading-relaxed">Explore the <Link href="/case-studies" className="text-cyan-400 hover:underline">case studies</Link>, review <Link href="/validation" className="text-cyan-400 hover:underline">validation results</Link>, or <Link href="/contact" className="text-cyan-400 hover:underline">book a demo</Link> to see how CrisPRO layers onto your existing Foundation Medicine workflow.</p>
        <p className="mt-12 text-sm text-zinc-500"><Link href="/comparison" className="text-cyan-400 hover:underline">← Back to all comparisons</Link></p>
      </article>
    </main>
  );
}
