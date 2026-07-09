'use client';

// ==============================================================================
// <VerticalSurface data=…/> — the shared no-scroll left-rail-tabbed surface
// used across every remaining W3 route:
//   • /patients/
//   • /industry/{biotech,genetic-testing,healthcare,research}/
//   • /products/{oncology,r-d,patient,command-center,boltz,forge,oracle}/
//   • /partners/{aacr,auth0,uc-berkeley}/
//   • /contact/
//
// Layout: h-screen flex flex-col overflow-hidden with ZetaNavbar + eyebrow strip
// + left-rail tab-list + right-pane active-section content. The linter marker
// <SurfaceTabs> wraps the whole tree.
//
// Data shape is deliberately generic — every consumer supplies a page-level
// title/eyebrow/subtitle plus an array of "sections" (rail entries). Each
// section carries its own body: paragraphs, bullets, metric cards, cross-link
// case studies, and an optional CTA. This is one component, many pages.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';

// ------------------------------------------------------------------------------
// Data shape — page-level and section-level
// ------------------------------------------------------------------------------

export interface VerticalMetric {
  label: string;
  value: string;
  footnote?: string;
}

export interface VerticalCaseStudy {
  slug?: string;          // when set → links into /ledger/<slug>/
  href?: string;          // when set (and slug not) → arbitrary link
  title: string;
  summary: string;
  keyMetric?: string;
}

export interface VerticalCta {
  label: string;
  href: string;
  helper?: string;
}

export interface VerticalSection {
  id: string;
  label: string;                    // short rail label
  eyebrow: string;                  // "Chapter 2 · What we return"
  headline: string;                 // one-line section headline
  Icon: LucideIcon;
  body: string[];                   // paragraphs
  bullets?: string[];               // optional bullet list under body
  metrics?: VerticalMetric[];       // 0-3 metric callouts (grid-cols-3)
  caseStudies?: VerticalCaseStudy[]; // 0-2 crosslink cards (grid-cols-2)
  cta?: VerticalCta;                // optional primary CTA button
}

export interface VerticalPageData {
  eyebrow: string;                  // top strip small caps
  title: string;                    // page H1
  subtitle: string;                 // page subline
  sections: VerticalSection[];      // rail entries
}

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// ------------------------------------------------------------------------------
// Component
// ------------------------------------------------------------------------------

interface Props {
  data: VerticalPageData;
  /** Optional link shown at the top-right of the strip (e.g. "See offering →") */
  headerLink?: { label: string; href: string };
}

export default function VerticalSurface({ data, headerLink }: Props) {
  const { isDarkMode } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSection = data.sections[activeIdx];

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900';
  const rail = isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-slate-200 bg-white/70';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const body = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 h-full min-h-0">
        <header className="shrink-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${label}`}>{activeSection.eyebrow}</p>
          <h2 className="mt-1.5 text-xl md:text-2xl lg:text-3xl font-black tracking-tight uppercase leading-tight">
            {activeSection.headline}
          </h2>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-3">
          {activeSection.body.map((p, i) => (
            <p key={i} className={`text-sm md:text-base leading-relaxed ${value}`}>
              {p}
            </p>
          ))}

          {activeSection.bullets && activeSection.bullets.length > 0 && (
            <ul className="space-y-2 pt-1">
              {activeSection.bullets.map((b, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm leading-relaxed ${value}`}>
                  <CheckCircle2
                    className={`h-4 w-4 mt-1 shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {activeSection.metrics && activeSection.metrics.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(activeSection.metrics.length, 3)} gap-3 shrink-0`}>
            {activeSection.metrics.map((m) => (
              <div key={m.label} className={`rounded-lg border p-3.5 ${box}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${label}`}>{m.label}</p>
                <p className={`mt-1.5 text-sm font-bold ${value}`}>{m.value}</p>
                {m.footnote && <p className={`mt-1 text-[10px] italic ${muted}`}>{m.footnote}</p>}
              </div>
            ))}
          </div>
        )}

        {activeSection.caseStudies && activeSection.caseStudies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
            {activeSection.caseStudies.map((cs, i) => {
              const href = cs.slug ? `/ledger/${cs.slug}/` : cs.href || '#';
              const External = !cs.slug && cs.href && /^https?:/.test(cs.href);
              return (
                <Link
                  key={i}
                  href={href}
                  target={External ? '_blank' : undefined}
                  rel={External ? 'noreferrer' : undefined}
                  className={`rounded-lg border p-3.5 transition-colors ${box} ${
                    isDarkMode ? 'hover:border-cyan-500/40' : 'hover:border-indigo-300'
                  }`}
                >
                  <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${label}`}>
                    {cs.slug ? 'Case study · Ledger' : 'Reference'}
                  </p>
                  <h4 className={`mt-1.5 text-sm font-bold leading-snug ${value}`}>{cs.title}</h4>
                  <p className={`mt-1.5 text-xs leading-relaxed ${muted}`}>{cs.summary}</p>
                  {cs.keyMetric && <p className={`mt-2 text-[11px] font-mono ${value}`}>{cs.keyMetric}</p>}
                  <p className={`mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${label}`}>
                    {cs.slug ? 'Open the receipt' : 'Open reference'}
                    {External ? <ExternalLink className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        {activeSection.cta && (
          <div className={`shrink-0 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3.5 ${box}`}>
            <div className="min-w-0">
              <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${label}`}>Next step</p>
              <p className={`mt-1 text-sm font-bold ${value}`}>{activeSection.cta.label}</p>
              {activeSection.cta.helper && <p className={`mt-0.5 text-xs ${muted}`}>{activeSection.cta.helper}</p>}
            </div>
            <Link
              href={activeSection.cta.href}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Go
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    );
  }, [activeSection, box, isDarkMode, label, muted, value]);

  return (
    <SurfaceTabs>
      <main className={`h-screen flex flex-col overflow-hidden transition-colors ${shell}`}>
        <ZetaNavbar />

        <div className={`shrink-0 border-b ${rail}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>{data.eyebrow}</p>
                <h1 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase">{data.title}</h1>
                <p className={`mt-1 text-xs md:text-sm leading-relaxed max-w-4xl ${muted}`}>{data.subtitle}</p>
              </div>
              {headerLink && (
                <Link
                  href={headerLink.href}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {headerLink.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 md:grid-cols-[240px_1fr] gap-0">
            <nav className={`border-r ${rail} p-3 flex flex-col gap-1.5 overflow-y-auto`}>
              {data.sections.map((s, i) => {
                const Icon = s.Icon;
                const active = i === activeIdx;
                const activeStyle = isDarkMode
                  ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-900';
                const idleStyle = isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`text-left rounded-lg border px-3 py-2.5 transition-all ${
                      active ? activeStyle : idleStyle
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${
                          active
                            ? isDarkMode
                              ? 'bg-cyan-500/30 text-cyan-100'
                              : 'bg-indigo-500/20 text-indigo-800'
                            : isDarkMode
                              ? 'bg-zinc-900 text-zinc-500'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 md:p-6 min-h-0 h-full">{body}</div>
          </div>
        </section>

        {/* Engine deep-dive rail — added w7d. Persistent across every rail-section on
            every industry / product / partner / patient page routed through
            VerticalSurface. */}
        <footer className={`shrink-0 border-t ${rail}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>Engine deep dives</span>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/engine/target-lock/scroll"
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'border-zinc-800 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                }`}
              >
                Target-Lock · Brain-Met · Scroll
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/engine/target-lock/tabs"
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'border-zinc-800 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                }`}
              >
                Target-Lock · Tabs
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/engine/synthetic-lethality/scroll"
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'border-zinc-800 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                }`}
              >
                SL · MBD4 · Scroll
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/engine/synthetic-lethality/tabs"
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'border-zinc-800 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                }`}
              >
                SL · MBD4 · Tabs
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </SurfaceTabs>
  );
}
