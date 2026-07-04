import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comparison — CrisPRO.ai vs Precision Oncology Platforms',
  description: 'How CrisPRO.ai compares to the major precision-oncology platforms — assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.',
  alternates: { canonical: '/comparison' },
  openGraph: { title: 'Comparison — CrisPRO.ai vs Precision Oncology Platforms', description: 'How CrisPRO.ai compares to the major precision-oncology platforms — assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.', url: 'https://crispro.ai/comparison', type: 'article' },
};

export default function ComparisonIndexPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-6">CrisPRO.ai vs the field</h1>
        <p className="text-zinc-400 text-lg mb-8">How CrisPRO.ai compares to the major precision-oncology platforms — assay-agnostic reasoning, mechanism alignment, and audit-ready narrative.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where CrisPRO.ai sits</h2>
        <p className="mb-4 leading-relaxed">CrisPRO.ai is not a sequencing assay, an EHR, or an RWD marketplace. It is the mechanism-aligned reasoning layer that sits on top of all of them. We ingest molecular data from <Link href="/comparison/tempus" className="text-cyan-400 hover:underline">Tempus</Link>, <Link href="/comparison/foundation-medicine" className="text-cyan-400 hover:underline">Foundation Medicine</Link>, <Link href="/comparison/guardant-health" className="text-cyan-400 hover:underline">Guardant Health</Link>, <Link href="/comparison/caris-life-sciences" className="text-cyan-400 hover:underline">Caris</Link>, or any other CGP vendor, and clinical data from <Link href="/comparison/flatiron-health" className="text-cyan-400 hover:underline">Flatiron</Link> or <Link href="/comparison/ontada" className="text-cyan-400 hover:underline">Ontada</Link>, and produce mechanism-aligned decisions with <Link href="/products/oracle" className="text-cyan-400 hover:underline">Oracle</Link>, <Link href="/products/forge" className="text-cyan-400 hover:underline">Forge</Link>, and <Link href="/products/command-center" className="text-cyan-400 hover:underline">Scribe</Link>.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Detailed comparisons</h2>
        <ul className="list-disc pl-6 space-y-3 mb-8">
            <li><Link href='/comparison/tempus' className="text-cyan-400 hover:underline">CrisPRO.ai vs Tempus AI</Link> — sequencing-driven precision medicine and life sciences data platform.</li>
            <li><Link href='/comparison/foundation-medicine' className="text-cyan-400 hover:underline">CrisPRO.ai vs Foundation Medicine</Link> — comprehensive genomic profiling and companion-diagnostic sequencing.</li>
            <li><Link href='/comparison/guardant-health' className="text-cyan-400 hover:underline">CrisPRO.ai vs Guardant Health</Link> — liquid-biopsy sequencing and MRD monitoring.</li>
            <li><Link href='/comparison/flatiron-health' className="text-cyan-400 hover:underline">CrisPRO.ai vs Flatiron Health</Link> — oncology EHR and real-world evidence for research and pharma.</li>
            <li><Link href='/comparison/caris-life-sciences' className="text-cyan-400 hover:underline">CrisPRO.ai vs Caris Life Sciences</Link> — molecular profiling and AI-driven biomarker discovery.</li>
            <li><Link href='/comparison/ontada' className="text-cyan-400 hover:underline">CrisPRO.ai vs Ontada</Link> — oncology real-world evidence and clinical technology (McKesson).</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">See it in action</h2>
        <p className="mb-4 leading-relaxed">Explore our <Link href="/case-studies" className="text-cyan-400 hover:underline">case studies</Link>, review the <Link href="/evidence" className="text-cyan-400 hover:underline">evidence and validation</Link> (95.7% AUROC on ClinVar, n=53,210), or <Link href="/contact" className="text-cyan-400 hover:underline">book a demo</Link>.</p>
      </article>
    </main>
  );
}
