import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Comparison",
  description: "How CrisPRO.ai compares to general-purpose AI assistants and traditional variant interpretation tools — evidence backing, audit trails, and oncology specificity.",
  alternates: { canonical: "/comparison" },
};

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">CrisPRO.ai vs. alternatives</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific competitive comparison. The following is placeholder framing to be replaced with audited, factual comparison points.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">The landscape</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Cancer decision support tools fall into three broad categories: general-purpose AI assistants, traditional variant interpretation panels, and oncology-specific platforms like CrisPRO.ai. The differences matter — they determine whether a recommendation is defensible at the point of care.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">CrisPRO.ai vs. general-purpose AI assistants</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">General-purpose AI assistants can generate plausible-sounding clinical text, but they do not cite versioned datasets, they do not produce audit trails, and they are not trained on the oncology-specific evidence graph that CrisPRO.ai uses. CrisPRO.ai refuses to answer without evidence; general-purpose assistants typically do not.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add specific, factual comparison points if competitive data is available. Avoid unsubstantiated claims about named competitors.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">CrisPRO.ai vs. traditional variant interpretation</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Traditional variant interpretation relies on human curation against guidelines (ACMG/AMP, etc.). It is rigorous but slow, does not scale to cohort-level analysis, and does not connect variant calls to mechanism or therapeutic design. CrisPRO.ai automates the interpretation pipeline while preserving the evidence chain — and extends it into mechanism alignment and in-silico design.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add specific comparison points on throughput, cost, and concordance with manual curation if validation data is available.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">CrisPRO.ai vs. other oncology AI platforms</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ If there are named oncology AI competitors, add factual, evidence-backed comparison points here. If not, describe the category gap CrisPRO.ai fills.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">The bottom line</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">If you need a tool that produces defensible, evidence-backed, audit-ready cancer decision support — not plausible text — CrisPRO.ai is built for that. Bring your problem to a demo and compare side by side.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/products" className="text-cyan-400 hover:text-cyan-300 font-semibold">Explore products <span aria-hidden>→</span></Link>
      <Link href="/platform" className="text-cyan-400 hover:text-cyan-300 font-semibold">Tour the platform <span aria-hidden>→</span></Link>
      <Link href="/evidence" className="text-cyan-400 hover:text-cyan-300 font-semibold">See the evidence <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
