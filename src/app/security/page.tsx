import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Security",
  description: "CrisPRO.ai security posture — HIPAA compliance, data encryption, access controls, audit logging, and the security overview.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-white mb-8">Security — CrisPRO.ai</h1>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Company-specific security documentation. The following is placeholder copy to be replaced with the real security posture, certifications, and policies.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Security at CrisPRO.ai</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">CrisPRO.ai handles sensitive clinical and genomic data. Security is not a feature — it is a precondition for the platform existing. The following describes our security posture, compliance framework, and data handling policies.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">HIPAA compliance</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe HIPAA compliance status — whether a BAA is available, what PHI is handled, and how it is protected. Reference the HIPAA statement page.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Data encryption</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe encryption at rest and in transit, key management, and any customer-managed key options.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Access controls</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe authentication, role-based access control, and how access is provisioned and deprovisioned.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Audit logging</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe what is logged, how long logs are retained, and how customers can access audit logs for their data.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Infrastructure</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe the hosting environment, any certifications (SOC 2, ISO 27001), and disaster recovery posture.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Data retention and deletion</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe data retention policies, customer deletion rights, and how deletion is verified.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Responsible disclosure</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">{"{{ Describe the vulnerability disclosure policy and how to report security issues.}}"}</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-3">Questions?</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">For security-specific questions, contact the team directly. For detailed compliance documentation, see the security overview and HIPAA statement.</p>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 border-t border-zinc-800 pt-8">
          <Link href="/security-overview" className="text-cyan-400 hover:text-cyan-300 font-semibold">Security overview <span aria-hidden>→</span></Link>
      <Link href="/hipaa-statement" className="text-cyan-400 hover:text-cyan-300 font-semibold">HIPAA statement <span aria-hidden>→</span></Link>
      <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 font-semibold">Privacy policy <span aria-hidden>→</span></Link>
        </nav>
      </div>
    </main>
  );
}
