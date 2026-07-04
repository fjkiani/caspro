import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Team",
  description: "The CrisPRO.ai team — oncologists, ML researchers, and software engineers building deterministic, evidence-backed cancer decision support.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">Team — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific team narrative. Describe the founding story, leadership backgrounds, and scientific advisory board. The following is placeholder copy to be replaced.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">CrisPRO.ai is built by a team that sits at the intersection of clinical oncology, machine learning, and software engineering. Our founding team has shipped production AI systems at scale and practiced oncology at major academic medical centers — we built CrisPRO.ai because the tools we needed did not exist.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Leadership</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Founder/CEO name and bio — 2-3 sentences covering clinical or research background and motivation for founding CrisPRO.ai.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ CTO/Scientific lead name and bio — 2-3 sentences covering ML research background and prior system-building experience.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Scientific advisory</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ List 3-5 scientific advisors with institutional affiliations and one-line expertise summary each.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Engineering</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Brief description of the engineering team&#39;s background — distributed systems, clinical data, ML infrastructure.}}"}</p>
      <p className="text-zinc-400 leading-relaxed mb-4">We are hiring across research, engineering, and clinical roles. If the problem of deterministic, evidence-backed cancer decision support resonates, we would like to talk.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/about" className="text-cyan-400 hover:text-cyan-300 font-semibold">About CrisPRO.ai <span aria-hidden>→</span></Link>
      <Link href="/careers" className="text-cyan-400 hover:text-cyan-300 font-semibold">Open roles <span aria-hidden>→</span></Link>
      <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold">Contact the team <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
