import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CrisPRO.ai vs Ontada — Comparison',
  description: 'How CrisPRO.ai compares to Ontada for AI-driven oncology decision support: assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.',
  alternates: { canonical: '/comparison/ontada' },
  openGraph: { title: 'CrisPRO.ai vs Ontada — Comparison', description: 'How CrisPRO.ai compares to Ontada for AI-driven oncology decision support: assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.', url: 'https://crispro.ai/comparison/ontada', type: 'article' },
};

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">CrisPRO.ai vs Ontada</h1>
        <p className="text-zinc-400 text-lg mb-10">A frank comparison of two very different tools in the modern oncology stack.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Ontada does</h2>
        <p className="mb-4 leading-relaxed">Ontada is a oncology real-world evidence and clinical technology (McKesson). Its core offering is iKnowMed EHR data, RWE research services, and clinical-trial optimization. Ontada aggregates community-oncology data through the McKesson network and licenses it for research; their AI focus is descriptive and cohort-scale.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">What CrisPRO.ai does</h2>
        <p className="mb-4 leading-relaxed">CrisPRO.ai is an <Link href="/platform" className="text-cyan-400 hover:underline">AI-powered oncology co-pilot</Link> built around three specialized intelligences: <Link href="/products/oracle" className="text-cyan-400 hover:underline">Oracle</Link> for variant and regimen interpretation, <Link href="/products/forge" className="text-cyan-400 hover:underline">Forge</Link> for in-silico therapeutic design, and <Link href="/products/command-center" className="text-cyan-400 hover:underline">Scribe (Command Center)</Link> for evidence-linked clinical narrative.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">The core difference</h2>
        <p className="mb-4 leading-relaxed">CrisPRO.ai is patient-scale and mechanism-first. We do not compete for RWE licensing. We convert a single patient's molecular plus clinical picture into a mechanism-aligned plan with evidence links, live at the point of decision.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where they fit together</h2>
        <p className="mb-4 leading-relaxed">Use Ontada or iKnowMed to power your research strategy, and CrisPRO to power your per-patient reasoning. See our <Link href="/evidence" className="text-cyan-400 hover:underline">evidence page</Link> for validation results including 95.7% AUROC on ClinVar (n=53,210) and 73% VUS resolution in clinical validation.</p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Decision matrix</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><strong className="text-white">If you need the assay:</strong> Ontada (or another CGP provider). CrisPRO does not sequence.</li>
          <li><strong className="text-white">If you need mechanism-aligned reasoning</strong> on top of the assay output: CrisPRO.ai.</li>
          <li><strong className="text-white">If you need audit-ready narrative</strong> for tumor board, payer, or FDA: CrisPRO Scribe.</li>
          <li><strong className="text-white">If you need in-silico therapeutic design</strong> (CRISPR guide RNAs, regimen alternatives): CrisPRO Forge.</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Get started</h2>
        <p className="mb-6 leading-relaxed">Explore the <Link href="/case-studies" className="text-cyan-400 hover:underline">case studies</Link>, review <Link href="/validation" className="text-cyan-400 hover:underline">validation results</Link>, or <Link href="/contact" className="text-cyan-400 hover:underline">book a demo</Link> to see how CrisPRO layers onto your existing Ontada workflow.</p>
        <p className="mt-12 text-sm text-zinc-500"><Link href="/comparison" className="text-cyan-400 hover:underline">← Back to all comparisons</Link></p>
      </article>
    </main>
  );
}
