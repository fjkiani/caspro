import Link from 'next/link';
import EngineIndexClient from '@/components/engine/EngineIndexClient';

export const metadata = {
  title: 'Engines | CrisPRO.ai',
  description:
    'Platform engines — Target-Lock, mechanism alignment, synthetic lethality, PGx dosing, and evidence ledger.',
  alternates: { canonical: '/engine' },
};

export default function EngineIndexPage() {
  return (
    <>
      {/* Round-2 server-rendered intro (word count + text/HTML ratio) */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-zinc-300">
        <h2 className="text-4xl font-black tracking-tight text-white mb-4">
          CrisPRO Engines — mechanism-aligned oncology reasoning
        </h2>
        <p className="mb-4 leading-relaxed">
          The CrisPRO engines are the reasoning primitives inside{' '}
          <Link href="/platform" className="text-cyan-400 hover:underline">
            the CrisPRO.ai platform
          </Link>
          . Each engine focuses on a specific decision surface — target selection,
          mechanism alignment, safety and dosing, synthetic lethality — and each is
          auditable end-to-end.
        </p>
        <p className="mb-4 leading-relaxed">
          Engines compose. Oracle nominates targets and scores variants;{' '}
          <Link href="/engine/target-lock" className="text-cyan-400 hover:underline">
            Target Lock
          </Link>{' '}
          converts them into locked, defensible target picks; Safety and Safety-Dosing
          bring risk-benefit constraints into the loop; Synthetic Lethality opens
          combination-therapy space; Mechanism Alignment ties everything back to the
          biology of the tumor in front of you.
        </p>
        <p className="mb-4 leading-relaxed">
          See the{' '}
          <Link href="/products" className="text-cyan-400 hover:underline">
            products index
          </Link>{' '}
          for how the engines package into Oracle, Forge, and Scribe. See the{' '}
          <Link href="/evidence" className="text-cyan-400 hover:underline">
            evidence page
          </Link>{' '}
          for validation, and the{' '}
          <Link href="/case-studies" className="text-cyan-400 hover:underline">
            case studies
          </Link>{' '}
          for real-world use.
        </p>
      </section>
      <EngineIndexClient />
    </>
  );
}
