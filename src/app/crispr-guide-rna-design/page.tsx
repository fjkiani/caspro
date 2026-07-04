import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CRISPR Guide RNA Design — CrisPRO.ai Forge',
  description: 'AI-driven CRISPR guide RNA design and optimization with Forge — on-target efficiency, off-target scoring, and mechanism-linked target selection.',
  alternates: { canonical: '/crispr-guide-rna-design' },
  openGraph: { title: 'CRISPR Guide RNA Design — CrisPRO.ai Forge', description: 'AI-driven CRISPR guide RNA design and optimization with Forge — on-target efficiency, off-target scoring, and mechanism-linked target selection.', url: 'https://crispro.ai/crispr-guide-rna-design', type: 'article' },
};

export default function ClusterPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20 text-zinc-200">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-6">CRISPR Guide RNA Design</h1>
        <p className="text-zinc-400 text-lg mb-8">AI-driven CRISPR guide RNA design and optimization with Forge — on-target efficiency, off-target scoring, and mechanism-linked target selection.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">The problem with generic guide RNA design</h2>
        <p className="mb-4 leading-relaxed">Standard CRISPR guide RNA design tools score guides on cut efficiency and off-target risk in isolation. They do not know whether the target you selected is the right target for the biology in front of you. In oncology, that matters — knocking out an off-mechanism gene wastes a screen slot and generates confounding data.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Forge designs guides</h2>
        <p className="mb-4 leading-relaxed">Forge starts from the mechanism. Oracle nominates and scores the target given the tumor driver and vulnerability profile. Forge then designs the guide RNA library against that target with per-guide efficiency scoring, three off-target scoring models, and synthetic-lethality/paralog awareness. Every guide is linked back to the mechanistic rationale for the target.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Guide RNA optimization pipeline</h2>
        <p className="mb-4 leading-relaxed">The Forge guide RNA design pipeline covers PAM selection, target-site scoring across published models, off-target enumeration with mismatch-position weighting, GC content and secondary-structure filtering, and library balancing for pooled screens. Guides can be exported to synthesis vendors with barcodes and metadata.</p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where to see it in action</h2>
        <p className="mb-4 leading-relaxed">See our engine pages for live examples of guide design against real oncology targets. The evidence ledger documents cross-validation performance on published CRISPR screen datasets.</p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Related</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><Link href='/products/forge' className="text-cyan-400 hover:underline">Forge intelligence</Link></li>
          <li><Link href='/genome-editing' className="text-cyan-400 hover:underline">Genome editing</Link></li>
          <li><Link href='/engine/target-lock' className="text-cyan-400 hover:underline">Target Lock engine</Link></li>
          <li><Link href='/platform' className="text-cyan-400 hover:underline">Platform overview</Link></li>
          <li><Link href='/evidence' className="text-cyan-400 hover:underline">Evidence</Link></li>
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
