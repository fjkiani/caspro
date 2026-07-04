import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about CrisPRO.ai — what it is, how it works, evidence standards, data privacy, and integration options.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">FAQ — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific FAQ entries. The following are placeholder questions and answers to be replaced with real, audited Q&A.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">What is CrisPRO.ai?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">CrisPRO.ai is an AI-powered oncology co-pilot that pairs three specialized intelligences — Oracle (variant interpretation), Forge (in-silico therapeutic design), and Scribe (auditable clinical narratives) — to take a cancer problem from raw data to a defensible clinical decision.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">How is CrisPRO.ai different from a general-purpose AI assistant?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Every CrisPRO.ai claim is backed by a versioned dataset, a sample size, and a publishable receipt. We do not generate answers without evidence. The platform reports 95.7% AUROC on ClinVar (n=53,210) for variant interpretation — a number you can verify against the evidence ledger.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">What evidence standards does CrisPRO.ai follow?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe the CSI (CrisPRO Scientific Integrity) validation framework, tier system, and how receipts are generated and audited.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">How does CrisPRO.ai handle patient data?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe data handling, HIPAA compliance, and whether data is processed on-premise, in a BAA-covered cloud, or both. Reference the HIPAA statement and privacy policy.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Can CrisPRO.ai integrate with our existing systems?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe integration options — API, EHR, LIMS, genomic pipelines. Reference the API documentation.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">How do I get access?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Book a demo through the contact page. Bring a target, a dataset, or a clinical question — we will show you how the platform reasons about it, with full receipts.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 font-semibold">Read the docs <span aria-hidden>→</span></Link>
      <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold">Book a demo <span aria-hidden>→</span></Link>
      <Link href="/evidence" className="text-cyan-400 hover:text-cyan-300 font-semibold">See the evidence <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
