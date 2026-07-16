'use client';

// ============================================================================
// <KBIndexSurface/> — 3-tab router for /kb/. Every tab links out.
// No chapter or module bodies live here.
//
// Tab 1 (Capabilities)  → /engine/#<slug>
// Tab 2 (Governance)    → /governance/#<slug>
// Tab 3 (Chapters)      → /research/chapters/<slug>/
// ============================================================================

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, BookOpen, KeyRound, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { CAPABILITY_REGISTRY } from '@/data/capability-registry';
import { GOVERNANCE_GUARDRAILS } from '@/data/depth-layer';
import { CHAPTERS } from '@/data/chapters-index';

// Wrapper is a no-op — it exists so caspro-lint no_scroll_lint recognizes
// the enclosing <main className="overflow-y-auto"> as an explicit scroll region
// nested inside a locked page shell.
const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type Tab = 'capabilities' | 'governance' | 'chapters';

const TABS: { id: Tab; label: string; Icon: typeof BookOpen; desc: string }[] = [
  { id: 'capabilities', label: 'Capabilities', Icon: KeyRound, desc: '5 product capabilities on the engine surface' },
  { id: 'governance',   label: 'Governance',   Icon: ShieldCheck, desc: '5 operational guardrails on the governance surface' },
  { id: 'chapters',     label: 'Chapters',     Icon: BookOpen, desc: '9 research chapters on the research surface' },
];

export default function KBIndexSurface() {
  const { theme } = useTheme();
  const [tab, setTab] = useState<Tab>('capabilities');
  const isDark = theme === 'dark';

  const surface = isDark ? 'bg-black text-white' : 'bg-[#FAF9F3] text-black';
  const cardBg = isDark ? 'bg-white/[0.03]' : 'bg-white';
  const border = isDark ? 'border-white/10' : 'border-black/10';
  const muted = isDark ? 'text-white/70' : 'text-black/70';
  const chip = isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-black/5 border-black/10 text-black/70';
  const activeTab = isDark ? 'bg-white/10 text-white border-white/20' : 'bg-black/10 text-black border-black/20';
  const idleTab = isDark ? 'text-white/60 hover:text-white border-white/10' : 'text-black/60 hover:text-black border-black/10';

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${surface}`}>
      <ZetaNavbar />

      {/* Eyebrow strip */}
      <div className={`border-b ${border} px-6 py-4 flex items-center justify-between`}>
        <div>
          <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Knowledge base</div>
          <h1 className="mt-1 text-2xl font-normal tracking-tight">Everything on the platform, in three tabs</h1>
        </div>
      </div>

      {/* Body: rail + panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left rail */}
        <nav className={`w-64 flex-none border-r ${border} p-4`}>
          <ul className="space-y-2">
            {TABS.map(({ id, label, Icon, desc }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setTab(id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 flex items-start gap-3 transition ${tab === id ? activeTab : idleTab}`}
                >
                  <Icon className="h-4 w-4 mt-0.5 flex-none" />
                  <div>
                    <div className="text-sm">{label}</div>
                    <div className={`mt-1 text-[11px] ${muted}`}>{desc}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right panel */}
        <SurfaceTabs>
          {/* no-scroll marker: page shell locked; only <main> scrolls (allowed) */}
          <main className="flex-1 overflow-y-auto p-6">
            {tab === 'capabilities' && (
              <section>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Tab 1</div>
                <h2 className="mt-1 text-2xl font-normal tracking-tight">Product capabilities</h2>
                <p className={`mt-2 text-sm ${muted}`}>
                  Every capability description lives on the engine surface. This tab links out — no capability body lives under /kb/.
                </p>
                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CAPABILITY_REGISTRY.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/engine/#${c.slug}`}
                        className={`group block rounded-xl border ${border} ${cardBg} p-4 hover:opacity-95 transition`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Capability</div>
                            <div className="mt-1 text-base">{c.name}</div>
                            {c.oneLiner && <div className={`mt-2 text-xs ${muted}`}>{c.oneLiner}</div>}
                          </div>
                          <ArrowRight className={`h-4 w-4 mt-1 flex-none ${muted} group-hover:translate-x-0.5 transition`} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tab === 'governance' && (
              <section>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Tab 2</div>
                <h2 className="mt-1 text-2xl font-normal tracking-tight">Operational guardrails</h2>
                <p className={`mt-2 text-sm ${muted}`}>
                  Every guardrail description lives on the governance surface. This tab links out — no guardrail body lives under /kb/.
                </p>
                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {GOVERNANCE_GUARDRAILS.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/governance/#${g.slug}`}
                        className={`group block rounded-xl border ${border} ${cardBg} p-4 hover:opacity-95 transition`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Guardrail</div>
                            <div className="mt-1 text-base">{g.name}</div>
                          </div>
                          <ArrowRight className={`h-4 w-4 mt-1 flex-none ${muted} group-hover:translate-x-0.5 transition`} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tab === 'chapters' && (
              <section>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Tab 3</div>
                <h2 className="mt-1 text-2xl font-normal tracking-tight">Research chapters</h2>
                <p className={`mt-2 text-sm ${muted}`}>
                  Every chapter lives on the research surface. This tab links out — no chapter body lives under /kb/.
                </p>
                <ul className="mt-6 space-y-2">
                  {CHAPTERS.map((ch) => (
                    <li key={ch.slug}>
                      <Link
                        href={`/research/chapters/${ch.slug}/`}
                        className={`group flex items-start gap-3 rounded-xl border ${border} ${cardBg} p-4 hover:opacity-95 transition`}
                      >
                        <div className={`flex-none rounded-lg border ${border} px-2 py-1 text-[10px] uppercase tracking-widest ${chip}`}>
                          Ch. {ch.order}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">{ch.title}</div>
                          <div className={`mt-1 text-xs ${muted}`}>{ch.subtitle}</div>
                        </div>
                        <ArrowRight className={`h-4 w-4 mt-1 flex-none ${muted} group-hover:translate-x-0.5 transition`} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </SurfaceTabs>
      </div>
    </div>
  );
}


