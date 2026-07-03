import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Pricing",
  description: "CrisPRO.ai pricing — engagement models for biotech R&D, genetic testing labs, health systems, and academic research. Book a demo for a tailored quote.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">Pricing — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific pricing narrative. Describe engagement models, tiers, and how pricing is structured. The following is placeholder copy to be replaced.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">CrisPRO.ai is priced by engagement model, not by a flat SaaS tier — because the value of deterministic, evidence-backed cancer decision support depends on what you are trying to do with it.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Engagement models</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">**Biotech R&D.** Per-program licensing for the engine stack (Target Lock, Mechanism Alignment, Synthetic Lethality, Safety/Dosing). Pricing scales with the number of concurrent programs and the depth of evidence integration required.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Indicative per-program range or &quot;contact for quote&quot; — whichever the business prefers to publish.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">**Genetic testing labs.** Per-variant or per-case pricing for Oracle interpretation, with volume tiers. Integration support is included.</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Indicative per-case range or &quot;contact for quote&quot;.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">**Health systems.** Enterprise licensing tied to oncologist seats and integration scope (EHR, LIMS, genomic data pipelines).</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Indicative seat-based range or &quot;contact for quote&quot;.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">**Academic research.** Subsidized or grant-supported access for published research. Contact us with your study design.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">What is included</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Every engagement includes access to the evidence ledger, full audit trails from raw input to chart-ready narrative, and the CSI validation receipts backing every claim. No black boxes.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Getting a quote</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Book a demo and bring a target, a dataset, or a clinical question. We will scope the engagement against your actual problem and return a tailored quote — usually within 48 hours.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold">Book a demo <span aria-hidden>→</span></Link>
      <Link href="/products" className="text-cyan-400 hover:text-cyan-300 font-semibold">Explore products <span aria-hidden>→</span></Link>
      <Link href="/platform" className="text-cyan-400 hover:text-cyan-300 font-semibold">Tour the platform <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
