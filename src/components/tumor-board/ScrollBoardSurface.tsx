'use client';

// ============================================================================
// ScrollBoardSurface.tsx — long-scroll /tumor-board-scroll/ surface.
//
// Design: DNAHero first (full viewport), then each of the 5 engines as a
// full-width section separated by capability intro cards. Intended for
// walkthroughs where the reader wants the whole board in one continuous scroll.
//
// This intentionally does NOT use SurfaceTabs — it's the scroll counterpart
// to the tab-strip version. The tabs live on /tumor-board/.
// ============================================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Focus,
  Boxes,
  Beaker,
  Users,
  GitBranch,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';

import { CAPABILITY_REGISTRY, type CapabilityEntry } from '@/data/capability-registry';
import { CAPABILITY_DEPTH_WIRING } from '@/data/capability-depth-wiring';

import DNAHero from './shared/DNAHero';
import GateTierEngine from './engines/GateTierEngine';
import MultiAssetEngine from './engines/MultiAssetEngine';
import BiomarkerFailureEngine from './engines/BiomarkerFailureEngine';
import PopulationFunnelEngine from './engines/PopulationFunnelEngine';
import MechanismDivergenceEngine from './engines/MechanismDivergenceEngine';
import { useTheme } from '@/context/ThemeContext';

const ENGINE_ORDER: Array<{
  slug: string;
  icon: typeof Focus;
  Component: () => JSX.Element;
}> = [
  { slug: 'gate-tier-scoring', icon: Focus, Component: GateTierEngine },
  { slug: 'multi-asset-scoring', icon: Boxes, Component: MultiAssetEngine },
  { slug: 'biomarker-failure-prediction', icon: Beaker, Component: BiomarkerFailureEngine },
  { slug: 'population-funnel', icon: Users, Component: PopulationFunnelEngine },
  { slug: 'mechanism-divergence', icon: GitBranch, Component: MechanismDivergenceEngine },
];

function SectionIntro({
  index,
  cap,
  Icon,
  wiring,
}: {
  index: number;
  cap: CapabilityEntry;
  Icon: typeof Focus;
  wiring?: {
    substrateAxes: string[];
    substrateModalities: string[];
    substrateTiers: string[];
    governanceGuardrails: string[];
    headlineSubstrateSentence: string;
    headlineGovernanceSentence: string;
  };
}) {
  return (
    <section
      id={cap.slug}
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-6 mb-8"
      >
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 rounded border flex items-center justify-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
            <Icon className="w-7 h-7 text-cyan-400" />
          </div>
          <div className={`mt-2 text-center text-[10px] font-black tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-zinc-500'}`}>
            {String(index + 1).padStart(2, '0')} / {String(ENGINE_ORDER.length).padStart(2, '0')}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2">
            Capability {index + 1}
          </div>
          <h2 className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {cap.name}
          </h2>
          <p className={`text-[14px] leading-relaxed mb-6 max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
            {cap.oneLiner}
          </p>
          {wiring && (
            <div className="p-5 rounded border border-zinc-800 bg-zinc-950/40 max-w-4xl">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">
                Headline substrate
              </div>
              <p className="text-[12px] leading-relaxed text-zinc-200 mb-4">
                {wiring.headlineSubstrateSentence}
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-900">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                  Bound to
                </span>
                {wiring.substrateAxes.map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 text-[8px] font-black tracking-widest uppercase rounded-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  >
                    {a}
                  </span>
                ))}
                <span className="mx-2 h-4 w-px bg-zinc-800" />
                {wiring.substrateModalities.slice(0, 3).map((m) => (
                  <span
                    key={m}
                    className="px-2 py-0.5 text-[8px] font-black tracking-widest uppercase rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {m.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default function ScrollBoardSurface() {
  const { isDarkMode } = useTheme();
  return (
    <div className="bg-[#020408] text-zinc-400 font-mono">
      {/* fixed nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-cyan-400 transition-colors">
              CrisPRO · tumor board
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {ENGINE_ORDER.map(({ slug, icon: Icon }, i) => {
              const cap = CAPABILITY_REGISTRY.find((c) => c.slug === slug);
              return (
                <a
                  key={slug}
                  href={`#${slug}`}
                  className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  title={cap?.name}
                >
                  <Icon className="w-3 h-3" />
                  {String(i + 1).padStart(2, '0')}
                </a>
              );
            })}
            <span className="h-4 w-px bg-zinc-800" />
            <Link
              href="/tumor-board/"
              className="text-[9px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              Tab view
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* DNA hero */}
      <div className="pt-16">
        <DNAHero />
      </div>

      {/* engines flow */}
      {ENGINE_ORDER.map(({ slug, icon, Component }, i) => {
        const cap = CAPABILITY_REGISTRY.find((c) => c.slug === slug);
        const wiring = CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === slug);
        if (!cap) return null;
        return (
          <div key={slug}>
            <SectionIntro index={i} cap={cap} Icon={icon} wiring={wiring} />
            <div className="max-w-[1600px] mx-auto px-8 pb-16">
              <Component />
            </div>
          </div>
        );
      })}

      {/* closer */}
      <section className="max-w-[1600px] mx-auto px-8 py-24 border-t border-white/5 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-4">
          Board complete
        </div>
        <h2 className="text-3xl font-black uppercase tracking-[0.15em] text-white mb-4">
          Five capabilities. One substrate.
        </h2>
        <p className="text-[13px] leading-relaxed text-zinc-400 max-w-2xl mx-auto mb-8">
          Every gate, every asset comparison, every biomarker call, every funnel narrowing, and every divergence explanation reads from the same axes, modalities, tiers, and guardrails. Change the substrate — every engine updates. Change nothing — every engine is reproducible.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/governance/"
            className="px-6 py-3 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 hover:bg-zinc-800 transition-colors flex items-center gap-3"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Governance
          </Link>
          <Link
            href="/tumor-board/"
            className="px-6 py-3 rounded-sm border border-cyan-500/40 bg-cyan-500/10 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-3"
          >
            Tab view
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <a
          href="#top"
          className="mt-12 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-cyan-400 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <ArrowUp className="w-3 h-3" />
          Back to top
        </a>
      </section>
    </div>
  );
}
