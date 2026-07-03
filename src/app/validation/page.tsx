import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Validation",
  description: "CrisPRO.ai validation methodology — CSI framework, dataset standards, AUROC metrics, and the evidence ledger backing every claim.",
  alternates: { canonical: "/validation" },
};

export default function ValidationPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">Validation — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific validation methodology. The following is placeholder copy to be replaced with the real CSI framework documentation.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">The CSI validation framework</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">CrisPRO.ai does not make claims without evidence. Every metric, every performance number, and every clinical recommendation is backed by a CrisPRO Scientific Integrity (CSI) validation receipt — a versioned, auditable record of the dataset, methodology, and result.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Headline validation results</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">**ClinVar variant interpretation.** 95.7% AUROC against the ClinVar validation set (n=53,210). Tier: Supported. This is the headline number for Oracle&#39;s variant interpretation engine.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">**VUS resolution.** 73% resolution rate on a clinical validation set (n=1,000). Tier: Supported. This measures Oracle&#39;s ability to reclassify variants of uncertain significance.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">**SpliceVarDB splice prediction.** 82.5-82.6% AUROC on SpliceVarDB (n=4,950). Tier: Supported. This is the splice variant prediction benchmark.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Add or correct these numbers from the actual evidence ledger. The above are extracted from the unified evidence data and should be verified against the source.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">How receipts work</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe the receipt format — what fields it contains, how it is versioned, how it is audited, and where users can inspect it.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Dataset standards</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe the dataset inclusion criteria, versioning policy, and how datasets are selected for validation.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Independent verification</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe whether CrisPRO.ai validation has been independently verified, published, or peer-reviewed. If not, state that clearly.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">Every receipt is inspectable in the evidence ledger. We do not ask you to trust the numbers — we ask you to verify them.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/evidence" className="text-cyan-400 hover:text-cyan-300 font-semibold">Evidence platform <span aria-hidden>→</span></Link>
      <Link href="/research" className="text-cyan-400 hover:text-cyan-300 font-semibold">Research <span aria-hidden>→</span></Link>
      <Link href="/manuscripts" className="text-cyan-400 hover:text-cyan-300 font-semibold">Manuscripts <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
