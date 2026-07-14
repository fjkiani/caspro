'use client';

// ==============================================================================
// HOME AUDIENCE ROUTER — the caspro.ai front door.
//
// No-scroll (h-screen overflow-hidden). Layout:
//   • Sticky top strip = eyebrow + cure headline + subhead (single-viewport)
//   • Audience tab strip (3 tabs: Pharma & BD · Oncologists & KOLs · Investors)
//   • Right pane = <AudienceSurface data=…/> for the active audience
//
// Framing: "CrisPRO is the key to the lock." Every audience gets the same
// answer to a different question: precision oncology using multi-modal
// computational biology at the mechanism-alignment layer.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Building2, Users, TrendingUp, ArrowRight, KeyRound } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { AUDIENCE_REGISTRY, CURE_FRAMING, type AudienceEntry } from '@/data/audience-registry';
import AudienceSurface from '@/components/audience/AudienceSurface';

type AudienceSlug = AudienceEntry['slug'];

const AUDIENCE_ICON: Record<AudienceSlug, typeof Building2> = {
  'pharma-bd': Building2,
  oncologists: Users,
  investors: TrendingUp,
};

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function AudienceTab({
  audience,
  active,
  onClick,
  isDarkMode,
}: {
  audience: AudienceEntry;
  active: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}) {
  const Icon = AUDIENCE_ICON[audience.slug];
  const activeStyle = isDarkMode
    ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100 shadow-[0_0_18px_-6px_rgba(34,211,238,0.4)]'
    : 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm';
  const idleStyle = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
        active ? activeStyle : idleStyle
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span className="truncate">{audience.name}</span>
    </button>
  );
}

export default function HomeAudienceRouter() {
  const { isDarkMode } = useTheme();
  const [activeSlug, setActiveSlug] = useState<AudienceSlug>('pharma-bd');

  const activeAudience = useMemo(
    () => AUDIENCE_REGISTRY.find((a) => a.slug === activeSlug)!,
    [activeSlug]
  );

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900';
  const railBg = isDarkMode ? 'border-zinc-900' : 'border-slate-200';
  const eyebrowColor = isDarkMode ? 'text-cyan-500' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <SurfaceTabs>
      <main className={`h-screen flex flex-col overflow-hidden transition-colors ${shell}`}>
        <ZetaNavbar />

        {/* Sticky top strip — cure framing */}
        <div className={`shrink-0 border-b ${railBg}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 md:py-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${eyebrowColor}`}>
              {CURE_FRAMING.eyebrow}
            </p>
            <h1 className="mt-1.5 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
              {CURE_FRAMING.headline}
            </h1>
            <p className={`mt-2 text-sm md:text-base leading-relaxed max-w-4xl ${muted}`}>
              {CURE_FRAMING.subhead}
            </p>

            {/* Audience tab strip */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mr-1 ${eyebrowColor}`}>
                <KeyRound className="h-3.5 w-3.5 inline-block mr-1 align-[-2px]" aria-hidden />
                You are
              </span>
              {AUDIENCE_REGISTRY.map((aud) => (
                <AudienceTab
                  key={aud.slug}
                  audience={aud}
                  active={activeSlug === aud.slug}
                  onClick={() => setActiveSlug(aud.slug)}
                  isDarkMode={isDarkMode}
                />
              ))}

              <Link
                href="/engine/"
                className={`ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                See the 5 capabilities
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right pane — active audience surface */}
        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 py-4 md:py-5">
            <div
              className={`h-full rounded-xl border overflow-hidden ${
                isDarkMode ? 'border-zinc-900 bg-zinc-950/40' : 'border-slate-200 bg-white/70'
              }`}
            >
              <AudienceSurface data={activeAudience} />
            </div>
          </div>
        </section>
      </main>
    </SurfaceTabs>
  );
}
