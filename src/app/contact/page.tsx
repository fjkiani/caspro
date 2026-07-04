import ContactClient from './ContactClient';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">
          Contact CrisPRO.ai
        </h1>
        <p className="text-zinc-400 text-lg mb-10">
          Book a demo, ask about pricing, or start a research collaboration.
        </p>

        <section className="mb-10 space-y-4 text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white mb-2">Who we serve</h2>
          <p>
            CrisPRO.ai serves three groups of customers: <strong>clinical teams</strong>{' '}
            (oncologists, tumor boards, molecular pathologists) who need mechanism-aligned
            decision support and audit-ready narrative;{' '}
            <strong>research teams</strong> (translational oncology, in-silico biology,
            trial matching) who need target selection and evidence traceability at scale;
            and{' '}
            <strong>industry teams</strong> (biotech, pharma R&D, diagnostics) who need
            variant interpretation, therapeutic design, and validation infrastructure they
            can build on.
          </p>
          <p>
            Every conversation starts with a demo tailored to your workflow. Bring a
            sample report from your existing sequencing vendor — Tempus, Foundation
            Medicine, Guardant, Caris, or in-house — and we will show how{' '}
            <Link href="/products/oracle" className="text-cyan-400 hover:underline">
              Oracle
            </Link>
            ,{' '}
            <Link href="/products/forge" className="text-cyan-400 hover:underline">
              Forge
            </Link>
            , and{' '}
            <Link href="/products/command-center" className="text-cyan-400 hover:underline">
              Scribe
            </Link>{' '}
            turn it into a mechanism-aligned plan.
          </p>
          <h2 className="text-2xl font-bold text-white mb-2 mt-6">How to reach us</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Demo requests:</strong> use the form below or email{' '}
              <a href="mailto:fahad@crispro.ai" className="text-cyan-400 hover:underline">
                fahad@crispro.ai
              </a>
              .
            </li>
            <li>
              <strong>Pricing and access model:</strong> see the{' '}
              <Link href="/pricing" className="text-cyan-400 hover:underline">
                pricing page
              </Link>{' '}
              or ask us — we tailor to seat count, data volume, and use case.
            </li>
            <li>
              <strong>Research collaboration:</strong> review our{' '}
              <Link href="/research" className="text-cyan-400 hover:underline">
                research
              </Link>{' '}
              and{' '}
              <Link href="/manuscripts" className="text-cyan-400 hover:underline">
                manuscripts
              </Link>{' '}
              before reaching out.
            </li>
            <li>
              <strong>Security &amp; compliance questions:</strong> start at{' '}
              <Link href="/security" className="text-cyan-400 hover:underline">
                security overview
              </Link>{' '}
              and{' '}
              <Link href="/hipaa-statement" className="text-cyan-400 hover:underline">
                HIPAA statement
              </Link>
              .
            </li>
          </ul>
          <p>
            For general questions about who we are and what we do, see{' '}
            <Link href="/about" className="text-cyan-400 hover:underline">
              About CrisPRO.ai
            </Link>{' '}
            and the{' '}
            <Link href="/platform" className="text-cyan-400 hover:underline">
              platform overview
            </Link>
            .
          </p>
        </section>

        <ContactClient />
      </div>
    </main>
  );
}
