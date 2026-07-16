'use client';

// ==============================================================================
// HOME AUDIENCE ROUTER — Release A rewrite.
// Three-tab audience router: Pharma & biotech · Oncologists & tumor boards ·
// Patients & caregivers. Investors demoted from primary router to /investors
// footer link (existing route preserved).
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  HeartPulse,
  Users,
  ArrowRight,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import {
  HOME_AUDIENCE_REGISTRY,
  HOME_FRAMING,
  type HomeAudienceEntry,
} from '@/data/home-audience-registry';

type AudienceSlug = HomeAudienceEntry['slug'];

const AUDIENCE_ICON: Record<AudienceSlug, typeof Building2> = {
  pharma: Building2,
  oncologists: Users,
  patients: HeartPulse,
};

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function AudienceTab({
  audience,
  active,
  onClick,
  isDarkMode,
}: {
  audience: HomeAudienceEntry;
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
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] md:text-xs font-bold uppercase tracking-wider transition-all ${
        active ? activeStyle : idleStyle
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="truncate">{audience.name}</span>
    </button>
  );
}

function AudiencePane({ audience, isDarkMode }: { audience: HomeAudienceEntry; isDarkMode: boolean }) {
  const shell = isDarkMode ? 'bg-zinc-950/40 text-zinc-100' : 'bg-white/80 text-slate-900';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const bulletColor = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const btnPrimary = isDarkMode
    ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20'
    : 'border-indigo-400 bg-indigo-50 text-indigo-900 hover:bg-indigo-100';
  const btnSecondary = isDarkMode
    ? 'border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60'
    : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100';

  return (
    <div className={`h-full rounded-xl border overflow-hidden ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'} ${shell}`}>
      <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto min-h-0">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{audience.question}</p>
        <h2 className="mt-1.5 text-xl md:text-2xl lg:text-3xl font-black tracking-tight uppercase leading-tight">
          {audience.headline}
        </h2>
        <p className={`mt-3 text-sm md:text-base leading-relaxed ${muted}`}>{audience.body}</p>

        <ul className="mt-4 space-y-2">
          {audience.bullets.map((b, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm leading-relaxed ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
              <ArrowRight className={`h-4 w-4 mt-1 shrink-0 ${bulletColor}`} aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={audience.productHref}
            data-testid={`home-cta-product-${audience.slug}`}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${btnPrimary}`}
          >
            {audience.productLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href={audience.personaHref}
            data-testid={`home-cta-persona-${audience.slug}`}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${btnSecondary}`}
          >
            {audience.personaLabel}
          </Link>
          <Link
            href={audience.demoHref}
            data-testid={`home-cta-demo-${audience.slug}`}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${btnSecondary}`}
          >
            {audience.demoLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className={`mt-6 rounded-lg border border-dashed p-3 text-[11px] ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-slate-300 text-slate-500'}`}>
          <strong className="uppercase tracking-[0.2em]">Evidence state:</strong> Educational research substrate. Every claim on the CrisPRO site traces to a receipt row on the public ledger. Not a clinical decision support tool. Not a validated companion diagnostic.
        </div>
      </div>
    </div>
  );
}

export default function HomeAudienceRouter() {
  const { isDarkMode } = useTheme();
  const [activeSlug, setActiveSlug] = useState<AudienceSlug>('pharma');
  const activeAudience = useMemo(
    () => HOME_AUDIENCE_REGISTRY.find((a) => a.slug === activeSlug)!,
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

        <div className={`shrink-0 border-b ${railBg}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 md:py-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${eyebrowColor}`}>
              {HOME_FRAMING.eyebrow}
            </p>
            <h1 className="mt-1.5 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
              {HOME_FRAMING.headline}
            </h1>
            <p className={`mt-2 text-sm md:text-base leading-relaxed max-w-4xl ${muted}`}>
              {HOME_FRAMING.subhead}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mr-1 ${eyebrowColor}`}>
                <KeyRound className="h-3.5 w-3.5 inline-block mr-1 align-[-2px]" aria-hidden />
                You are
              </span>
              {HOME_AUDIENCE_REGISTRY.map((aud) => (
                <AudienceTab
                  key={aud.slug}
                  audience={aud}
                  active={activeSlug === aud.slug}
                  onClick={() => setActiveSlug(aud.slug)}
                  isDarkMode={isDarkMode}
                />
              ))}
              <Link
                href="/platform"
                data-testid="home-cta-platform"
                className={`ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                See the intelligence layer
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 py-4 md:py-5">
            <AudiencePane audience={activeAudience} isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* Release-A substrate disclaimer strip. Same text as VerticalSurface + Footer. */}
        <div className={`shrink-0 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
          <div className={`max-w-7xl mx-auto w-full px-4 sm:px-6 py-2 text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            <span className="font-black uppercase tracking-[0.2em]">Research Use Only</span>
            <span> · Educational research substrate · Every finding is traced to a public source and evidence tier · CrisPRO does not provide clinical decision support, does not deliver treatment directives, and is not a companion diagnostic · The oncology team remains the decision owner</span>
          </div>
        </div>
      </main>
    </SurfaceTabs>
  );
}
