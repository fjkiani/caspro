import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Case Studies",
  description: "CrisPRO.ai case studies — how biotech, genetic testing labs, and health systems use the platform to resolve variants, design therapeutics, and support…",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">Case Studies — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific case studies. The following is placeholder copy to be replaced with real, permission-cleared customer stories.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">How CrisPRO.ai is used in practice</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">The platform is deployed across biotech R&D, genetic testing labs, and health systems. Each engagement starts with a real problem — a target, a dataset, a clinical question — and produces a defensible, evidence-backed output.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Biotech R&D: pipeline triage</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe a specific (anonymized or permission-cleared) biotech engagement. What was the problem? What did CrisPRO.ai do? What was the outcome — candidates triaged, time saved, cost avoided?}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">A biotech R&D team used CrisPRO.ai to triage a pipeline of candidate targets before committing to in-vivo work. The engine stack scored each candidate against mechanism alignment, resistance liability, and safety/dosing risk — keeping only the candidates that survived a mechanism-aligned audit.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Genetic testing lab: VUS resolution</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe a specific lab engagement. What was the VUS backlog size? How did Oracle reduce it? What was the concordance with manual curation?}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">A genetic testing lab integrated Oracle into their variant interpretation workflow to reduce a growing VUS backlog. Oracle resolved variants with 95.7% AUROC against the ClinVar validation set (n=53,210), with full audit trails from raw VCF to sign-out-ready narrative.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Health system: point-of-decision support</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe a specific health system engagement. What was the clinical question? How did CrisPRO.ai support the oncologist&#39;s decision? What was the audit trail outcome?}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">A health system deployed CrisPRO.ai as a point-of-decision co-pilot for oncologists. The platform provided patient-specific mechanism reasoning with full audit trails from raw VCF to chart-ready narrative — supporting, not replacing, the oncologist&#39;s judgment.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Academic research: cohort-level analysis</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe a specific academic engagement. What was the research question? How did CrisPRO.ai support the analysis? Was it published?}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">An academic research group used CrisPRO.ai to run mechanism-aligned hypothesis tests across a whole cohort, producing reproducible, citable results ready for the manuscript appendix.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/proof" className="text-cyan-400 hover:text-cyan-300 font-semibold">Proof ledger <span aria-hidden>→</span></Link>
      <Link href="/evidence" className="text-cyan-400 hover:text-cyan-300 font-semibold">Evidence platform <span aria-hidden>→</span></Link>
      <Link href="/use-cases" className="text-cyan-400 hover:text-cyan-300 font-semibold">Use cases <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
