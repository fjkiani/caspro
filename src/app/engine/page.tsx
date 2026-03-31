import Link from 'next/link';
import { getActiveEngines } from '@/data/engine-registry';

export default function EngineIndexPage() {
  const engines = getActiveEngines();

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white pb-12 px-6 pt-2">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Engine Index</h1>
        <p className="text-zinc-400 mb-8">Open any engine view directly.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {engines.map((engine) => (
            <Link
              key={engine.id}
              href={engine.route}
              className="rounded border border-zinc-800 bg-zinc-950/40 p-5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/80 mb-2">
                {engine.layer} · {engine.id}
              </div>
              <div className="text-lg font-black mb-2">{engine.label}</div>
              <div className="text-sm text-zinc-400">{engine.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
