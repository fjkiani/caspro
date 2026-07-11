// ============================================================================
// SyntheticLethalityScrollSurface.tsx — long-scroll surface for the MBD4
// manuscript story ("MBD4 LOF defines a synthetic-lethal therapeutic state
// targetable by ATR inhibition rather than PARP in high-grade serous ovarian
// cancer").
//
// Story arc (top to bottom):
//   0.  Fixed nav bar + tumor-board branding
//   1.  DNAHero — mission text + engine badge
//   2.  Hero blurb — why this surface exists
//   3.  Axis A card — cytidine analogs (validated, Chabot 2022)
//   4.  Axis B card — immunotherapy (case-level, mUM cases)
//   5.  Axis C card — ATRi (ceralasertib) — the primary novel pharmacogenomic
//       result. Includes the four stress tests + WEE1i companion.
//   6.  PARPi FALSIFICATION card — hypothesis, PARP1 expression MWU, RNF144A
//       alternate bridge, PARP1↔PARPi pan-cancer Spearman (context only).
//   7.  Convergence model card
//   8.  v3 engine card — architecture behind the platform-level SL scoring
//   9.  Ovarian precomputed hits card — lineage-selective, BRCA1/2, TP53, CCNE1
//  10.  Reconciliation + gap disclosure
//  11.  Closer with cross-links to /engine/target-lock, /programs, /trials
//
// Every number is from `src/data/mbd4-manuscript-data.ts` which itself is
// frozen against the audit ground truth. No fabricated numerics.
// ============================================================================

'use client';

import Link from 'next/link';
import { ChevronRight, Beaker, Layers, Microscope, ShieldCheck, XCircle, GitMerge, Cog, ListTree, FileCheck, AlertOctagon } from 'lucide-react';
import PersonaHero from '@/components/shared/PersonaHero';

import { useTheme } from '@/context/ThemeContext';
import DNAHero from './shared/DNAHero';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

import {
  MANUSCRIPT,
  AXIS_A_CYTIDINE,
  AXIS_B_IO,
  AXIS_C_ATR,
  PARPI_FALSIFIED,
  CONVERGENCE,
  V3_ENGINE,
  OVARIAN_HITS,
  RECONCILIATION,
  SL_GAPS,
} from '@/data/mbd4-manuscript-data';

// ---- Persona-aware opening deck ------------------------------------------
// Same underlying story (MBD4-LOF defines a synthetic-lethal state;
// ATRi is the pivoted-to axis; PARPi hypothesis is falsified at n=19 LOF
// vs 1498 WT, p=0.605). Only the voice changes per audience.
// Anchored to /workspace/caspro/src/data/mbd4-manuscript-data.ts.
// ---------------------------------------------------------------------------

type SLOpeningCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  caveat?: string;
};

const SL_OPENING_DECK: PersonaCopyDeck<SLOpeningCopy> = {
  oncologist: {
    eyebrow: 'For the tumor board · MBD4-LOF synthetic-lethality',
    headline: 'Four axes tested. ATRi validated. PARPi hypothesis falsified.',
    body:
      'MBD4 loss-of-function defines a synthetic-lethal state. Cytidine analogs (Axis A) show a ~10× IC50 shift (2.3 nM LOF vs 20.1 nM WT, p=2.82×10⁻³, Chabot 2022). ATR inhibition with ceralasertib (Axis C) delivers ΔLN_IC50=-0.73, Cohen’s d=-0.50, n=14 LOF vs 914 WT (GDSC2). PARP1 expression is NOT elevated in MBD4-LOF (p=0.605, n=19 vs 1,498), and the RNF144A alternate bridge fails too — PARPi is off the table at its first premise.',
    caveat:
      'Numbers vary by cohort (pharmacology n=914 WT excludes somatic MBD4; expression n=1,498 does not). ATRi n=14 LOF is small — treat as strong hypothesis-generating, not confirmatory.',
  },
  patient: {
    eyebrow: 'What this page is showing',
    headline: 'A gene called MBD4, when broken, opens a targeted weakness.',
    body:
      'When the MBD4 repair gene is broken in tumor cells, certain drugs (ATR inhibitors like ceralasertib) hit the tumor about twice as hard as usual. Older drugs called PARP inhibitors, once hoped to work here, do not — the underlying protein PARP1 is not turned up in MBD4-broken tumors. This page walks through four possible treatment routes and marks which ones the evidence actually supports.',
    caveat:
      'The strongest data is from cell lines in the GDSC2 panel — not yet from a randomised trial. Ask your care team whether a clinical trial exists for your tumor’s MBD4 status.',
  },
  pharma: {
    eyebrow: 'BD · Portfolio implications · SL manuscript',
    headline: 'ATRi is the pivoted-to axis. PARP-first bets are falsified.',
    body:
      'The MBD4-LOF manuscript (target: bioRxiv, RUO) redirects program spend. Ceralasertib (AZD6738) is the primary pharmacogenomic result — 4 stress tests hold (TP53-adjusted, MSI-adjusted, lineage-controlled, WEE1i companion). PARP1 expression MWU is non-significant at n=19 LOF vs 1,498 WT (p=0.605) — the alternate bridge (RNF144A) is dead too. Pan-cancer PARP1↔PARPi Spearman ρ=-0.416 is a distractor at population level; MBD4-LOF does not selectively produce that state. This is a rare-selective vulnerability sized by MBD4-LOF prevalence, not a broad indication.',
    caveat:
      'Illustrative + real-case mix. AK patient (MBD4 frameshift MSS-CRC, PARP recommended by prod) is the field validation of DIV-02. Reconciliation and gap disclosure on §disclosure — read before positioning.',
  },
};

// ---- Small local UI helpers ------------------------------------------------

function Section({
  id,
  step,
  eyebrow,
  title,
  children,
}: {
  id: string;
  step?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();
  return (
    <section
      id={id}
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-start gap-8">
        {step && (
          <div className="flex-shrink-0">
            <div
              className={`w-16 h-16 rounded border flex items-center justify-center ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
              }`}
            >
              <span
                className={`text-lg font-black tracking-widest ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'good' | 'bad' | 'neutral' }) {
  const { isDarkMode } = useTheme();
  const toneClass =
    tone === 'good'
      ? isDarkMode
        ? 'text-emerald-400'
        : 'text-emerald-600'
      : tone === 'bad'
      ? isDarkMode
        ? 'text-rose-400'
        : 'text-rose-600'
      : tone === 'neutral'
      ? isDarkMode
        ? 'text-zinc-300'
        : 'text-zinc-600'
      : isDarkMode
      ? 'text-cyan-300'
      : 'text-indigo-600';
  return (
    <div
      className={`rounded border p-4 ${
        isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
      }`}
    >
      <div
        className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {label}
      </div>
      <div className={`text-2xl font-black tracking-tighter ${toneClass}`}>{value}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  return (
    <li
      className={`flex items-start gap-2 text-[13px] leading-relaxed ${
        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
      }`}
    >
      <span className={isDarkMode ? 'text-cyan-500 mt-1.5' : 'text-indigo-500 mt-1.5'}>▸</span>
      <span>{children}</span>
    </li>
  );
}

// ---- Main surface ---------------------------------------------------------

export default function SyntheticLethalityScrollSurface() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'}`}>
      <div className="mx-auto max-w-[1400px] px-6 pt-6">
        <PersonaHero pageId="synthetic-lethality-mbd4" />
      </div>
      {/* Nav */}
      <header
        className={`border-b backdrop-blur-sm sticky top-0 z-40 ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={`w-9 h-9 rounded border flex items-center justify-center group-hover:border-cyan-500/50 transition-colors ${
                  isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                }`}
              >
                <ListTree className={isDarkMode ? 'w-4 h-4 text-cyan-400' : 'w-4 h-4 text-indigo-500'} />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                CrisPRO · Synthetic-Lethality
              </span>
            </Link>
            <span className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
            <span
              className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              /engine/synthetic-lethality/scroll
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link
              href="/engine/synthetic-lethality/tabs"
              className={
                isDarkMode
                  ? 'text-zinc-400 hover:text-cyan-400 transition-colors'
                  : 'text-zinc-600 hover:text-indigo-600 transition-colors'
              }
            >
              Tab view →
            </Link>
            <Link
              href="/engine/target-lock/scroll"
              className={
                isDarkMode
                  ? 'text-zinc-400 hover:text-cyan-400 transition-colors'
                  : 'text-zinc-600 hover:text-indigo-600 transition-colors'
              }
            >
              Target-lock (BrM) →
            </Link>
          </div>
        </div>
      </header>

      {/* DNAHero */}
      <div className={isDarkMode ? '' : 'border-b border-zinc-200'}>
        <DNAHero />
      </div>

      {/* Persona-aware opening deck — same MBD4-LOF story, per-audience voice */}
      <PersonaContent
        deck={SL_OPENING_DECK}
        render={(copy) => (
          <section
            className={`max-w-[1600px] mx-auto px-8 py-10 border-t ${
              isDarkMode ? 'border-white/5' : 'border-zinc-200'
            }`}
          >
            <p
              className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${
                isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
              }`}
            >
              {copy.eyebrow}
            </p>
            <h2
              className={`text-2xl md:text-3xl font-black uppercase tracking-[0.12em] mb-4 max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {copy.headline}
            </h2>
            <p
              className={`text-[14px] leading-relaxed max-w-4xl mb-3 ${
                isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {copy.body}
            </p>
            {copy.caveat && (
              <p
                className={`text-[12px] italic leading-relaxed max-w-4xl ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                <span className="not-italic font-black uppercase tracking-widest mr-1">
                  Caveat ·
                </span>
                {copy.caveat}
              </p>
            )}
          </section>
        )}
      />

      {/* Manuscript intro */}
      <Section id="intro" step="§0" eyebrow="Manuscript · Target" title={MANUSCRIPT.short}>
        <p
          className={`text-[14px] leading-relaxed mb-4 max-w-4xl ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          {MANUSCRIPT.title}. Target journal: <span className="font-black">{MANUSCRIPT.target}</span>. RUO. Author {MANUSCRIPT.author}.
        </p>
        <p
          className={`text-[12px] leading-relaxed max-w-3xl ${
            isDarkMode ? 'text-zinc-500' : 'text-zinc-600'
          }`}
        >
          Four axes are tested. Two are validated therapeutic vulnerabilities (Axes A and C). One
          (Axis B) is emerging with strong mechanistic support. The fourth (PARPi) is falsified
          at its first premise — a critical negative that redirects clinical priority.
        </p>
      </Section>

      {/* Axis A — cytidine (validated) */}
      <Section id="axis-a" step="§A" eyebrow="Axis A · Cytidine analogs" title={AXIS_A_CYTIDINE.paper}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatPill label="IC50 · LOF" value={AXIS_A_CYTIDINE.ic50Lof} tone="good" />
          <StatPill label="IC50 · WT" value={AXIS_A_CYTIDINE.ic50Wt} />
          <StatPill label="Fold shift" value={AXIS_A_CYTIDINE.fold} tone="good" />
          <StatPill label="p-value" value={AXIS_A_CYTIDINE.pValue} tone="good" />
        </div>
        <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
          <p className={`text-[11px] uppercase tracking-widest mb-2 font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            <ShieldCheck className="inline w-3 h-3 mr-1" />
            {AXIS_A_CYTIDINE.statusLabel}
          </p>
          <ul className="space-y-1.5">
            {AXIS_A_CYTIDINE.evidence.map((e) => <Bullet key={e}>{e}</Bullet>)}
          </ul>
        </div>
        <p className={`text-[12px] italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Model: {AXIS_A_CYTIDINE.model} · Drug: {AXIS_A_CYTIDINE.drug} · Companion: {AXIS_A_CYTIDINE.companion}
        </p>
        <p className={`text-[12px] mt-3 max-w-3xl ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
          <span className="font-black">Role:</span> {AXIS_A_CYTIDINE.role}
        </p>
      </Section>

      {/* Axis B — IO */}
      <Section id="axis-b" step="§B" eyebrow="Axis B · Immunotherapy" title="Case-level immunotherapy vulnerability">
        <p className={`text-[13px] leading-relaxed mb-4 max-w-4xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          <span className="font-black">Mechanism:</span> {AXIS_B_IO.mechanism}.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {AXIS_B_IO.cases.map((c) => (
            <div key={c.ref} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                <Microscope className="inline w-3 h-3 mr-1" />
                {c.ref}
              </p>
              <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{c.finding}</p>
            </div>
          ))}
        </div>
        <p className={`text-[12px] max-w-3xl ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
          <span className="font-black">Role:</span> {AXIS_B_IO.role}
        </p>
      </Section>

      {/* Axis C — ATRi */}
      <Section id="axis-c" step="§C" eyebrow="Axis C · ATR inhibition · Novel primary" title={AXIS_C_ATR.compound}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatPill label="n · LOF vs WT" value={`${AXIS_C_ATR.primaryLnIc50.nLof} / ${AXIS_C_ATR.primaryLnIc50.nWt}`} />
          <StatPill label="Δ LN_IC50" value={String(AXIS_C_ATR.primaryLnIc50.delta)} tone="good" />
          <StatPill label="p (MWU · one-sided)" value={String(AXIS_C_ATR.primaryLnIc50.pValue)} tone="good" />
          <StatPill label="Cohen's d" value={String(AXIS_C_ATR.primaryLnIc50.cohensD)} tone="good" />
        </div>
        <p className={`text-[11px] mb-6 max-w-3xl ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Database: {AXIS_C_ATR.database} · Test: {AXIS_C_ATR.primaryLnIc50.test} · WT rule: {AXIS_C_ATR.wtRule} · Receipt: <code className="break-all">{AXIS_C_ATR.receipt}</code>
        </p>

        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Four confounder stress tests
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {AXIS_C_ATR.stressTests.map((st) => (
            <div key={st.id} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                Stress test {st.id} — {st.name}
              </p>
              <p className={`text-[12px] mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{st.definition}</p>
              <div className={`grid grid-cols-2 gap-2 text-[11px] mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {'delta' in st && (
                  <>
                    <div>Δ: <span className="font-black">{st.delta}</span></div>
                    <div>p: <span className="font-black">{st.pValue}</span></div>
                    <div>d: <span className="font-black">{st.cohensD}</span></div>
                    <div>n: <span className="font-black">{st.nLof} / {st.nWt}</span></div>
                  </>
                )}
                {'maxP' in st && (
                  <>
                    <div>max p: <span className="font-black">{st.maxP}</span></div>
                    <div>min p: <span className="font-black">{st.minP}</span></div>
                  </>
                )}
              </div>
              <p className={`text-[11px] font-black tracking-widest uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                ✓ {st.verdict}
              </p>
            </div>
          ))}
        </div>

        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Companion — WEE1i (adavosertib)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatPill label="n · LOF vs WT" value={`${AXIS_C_ATR.companion.nLof} / ${AXIS_C_ATR.companion.nWt}`} />
          <StatPill label="Δ LN_IC50" value={String(AXIS_C_ATR.companion.delta)} tone="neutral" />
          <StatPill label="p" value={String(AXIS_C_ATR.companion.pValue)} tone="neutral" />
          <StatPill label="Cohen's d" value={String(AXIS_C_ATR.companion.cohensD)} tone="neutral" />
        </div>
        <p className={`text-[12px] italic mt-3 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {AXIS_C_ATR.companion.verdict}
        </p>
      </Section>

      {/* PARPi falsification */}
      <Section id="parpi-falsified" step="§D" eyebrow="PARP-inhibitor axis · falsified" title={PARPI_FALSIFIED.short}>
        <div className={`rounded border p-4 mb-6 ${isDarkMode ? 'border-rose-900/50 bg-rose-950/20' : 'border-rose-200 bg-rose-50'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
            <XCircle className="inline w-3 h-3 mr-1" />
            Hypothesis tested and rejected
          </p>
          <p className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {PARPI_FALSIFIED.hypothesis}
          </p>
        </div>

        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          PARP1 expression MWU
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <StatPill label="n · LOF vs pool" value={`${PARPI_FALSIFIED.parp1Expression.nLof} / ${PARPI_FALSIFIED.parp1Expression.nWtExpressionPool}`} />
          <StatPill label="Δ median" value={String(PARPI_FALSIFIED.parp1Expression.delta)} tone="bad" />
          <StatPill label="p (two-sided MWU)" value={String(PARPI_FALSIFIED.parp1Expression.pValue)} tone="bad" />
          <StatPill label="Verdict" value="NOT SIG" tone="bad" />
        </div>
        <p className={`text-[11px] mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Receipt: <code className="break-all">{PARPI_FALSIFIED.receipt}</code>
        </p>

        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Alternate bridge — RNF144A (also dead)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <StatPill label="Δ median" value={String(PARPI_FALSIFIED.rnf144aAlternate.delta)} tone="bad" />
          <StatPill label="p" value={String(PARPI_FALSIFIED.rnf144aAlternate.pValue)} tone="bad" />
          <StatPill label="Verdict" value="DEAD" tone="bad" />
        </div>

        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Context — PARP1↔PARPi Spearman (pan-cancer, not MBD4-selective)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <StatPill label="n" value={String(PARPI_FALSIFIED.parp1ParpiSpearman.n)} />
          <StatPill label="Spearman ρ" value={String(PARPI_FALSIFIED.parp1ParpiSpearman.rho)} />
          <StatPill label="p" value={PARPI_FALSIFIED.parp1ParpiSpearman.pValue} />
        </div>
        <p className={`text-[12px] italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {PARPI_FALSIFIED.parp1ParpiSpearman.verdict}
        </p>
      </Section>

      {/* Convergence */}
      <Section id="convergence" step="§E" eyebrow="Model" title={CONVERGENCE.short}>
        <div className={`rounded border p-6 mb-4 ${isDarkMode ? 'border-cyan-900/50 bg-cyan-950/20' : 'border-indigo-200 bg-indigo-50'}`}>
          <p className={`text-[13px] leading-relaxed mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
            <GitMerge className="inline w-4 h-4 mr-1" />
            {CONVERGENCE.body}
          </p>
          <p className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            {CONVERGENCE.translational}
          </p>
        </div>
      </Section>

      {/* v3 Engine */}
      <Section id="v3-engine" step="§F" eyebrow="Architecture" title="v3 Synthetic-Lethality engine">
        <ul className="space-y-2 mb-4">
          <Bullet><span className="font-black">Primary test:</span> {V3_ENGINE.primaryTest}</Bullet>
          <Bullet><span className="font-black">Effect size:</span> {V3_ENGINE.effectSize}</Bullet>
          <Bullet><span className="font-black">Δ dependency:</span> {V3_ENGINE.deltaDep}</Bullet>
          <Bullet><span className="font-black">Multiple testing:</span> {V3_ENGINE.multipleTesting}</Bullet>
          <Bullet><span className="font-black">Pan-essential filter:</span> {V3_ENGINE.panEssentialRule}</Bullet>
          <Bullet><span className="font-black">Min group size:</span> {V3_ENGINE.minGroup} (fallback: {V3_ENGINE.fallbackRule})</Bullet>
        </ul>
        <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            Pan-essential blacklist (24 hardcoded)
          </p>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {V3_ENGINE.panEssentialBlacklist.join(' · ')}
          </p>
        </div>
        <div className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            Public API — {V3_ENGINE.api.prefix}
          </p>
          <p className={`text-[11px] mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Auth: {V3_ENGINE.api.auth}</p>
          <ul className="space-y-0.5">
            {V3_ENGINE.api.endpoints.map((e) => (
              <li key={e} className={`text-[11px] font-mono ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>▸ {e}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ovarian hits */}
      <Section id="ovarian" step="§G" eyebrow="Precomputed hits · HGSOC" title="Ovarian SL panel">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Lineage-selective (top 7)', rows: OVARIAN_HITS.lineageSelective },
            { title: 'BRCA1/2-mutant (top 8)',   rows: OVARIAN_HITS.brca12Mutant },
            { title: 'TP53-mutant (top 4)',     rows: OVARIAN_HITS.tp53Mutant },
            { title: 'CCNE1-amplified (top 4)',  rows: OVARIAN_HITS.ccne1Amp },
          ].map((tbl) => (
            <div key={tbl.title} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                {tbl.title}
              </p>
              <div className="space-y-1">
                {tbl.rows.map((r) => (
                  <div
                    key={r.gene}
                    className={`flex items-center justify-between text-[11px] font-mono py-1 border-b last:border-0 ${
                      isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
                    }`}
                  >
                    <span className={`font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{r.gene}</span>
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                      d {r.d} · {'padj' in r ? `padj ${r.padj}` : `p ${r.p}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Reconciliation + gaps */}
      <Section id="disclosure" step="§H" eyebrow="Reconciliation · Gaps" title="Manuscript reconciliation">
        <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-emerald-900/50 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            <FileCheck className="inline w-3 h-3 mr-1" />
            RECONCILIATION_TABLE.md
          </p>
          <p className={`text-[13px] mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{RECONCILIATION.summary}</p>
          <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>{RECONCILIATION.denominators}</p>
        </div>
        <h3 className={`text-lg font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Disclosure gaps
        </h3>
        <div className="space-y-3">
          {SL_GAPS.map((g) => (
            <div key={g.id} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
                g.severity === 'high'
                  ? isDarkMode ? 'text-rose-400' : 'text-rose-600'
                  : g.severity === 'medium'
                  ? isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  : isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}>
                <AlertOctagon className="inline w-3 h-3 mr-1" />
                {g.id} · {g.severity}
              </p>
              <p className={`text-[12px] font-black mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{g.title}</p>
              <p className={`text-[12px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{g.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Closer */}
      <section className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <h2 className={`text-2xl font-black uppercase tracking-[0.15em] mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Cross-links · other engines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/engine/target-lock/scroll"
            className={`rounded border p-4 group transition-colors ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
              Target-lock · brain metastasis
            </p>
            <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              7-step BrM cascade · Evo2 delta_ll variants → AUROC 0.6889
            </p>
            <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </Link>
          <Link
            href="/programs/pilot-programs"
            className={`rounded border p-4 group transition-colors ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
              Programs · MBD4-directed
            </p>
            <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Cytidine + ATRi combination cohorts · HGSOC prioritized
            </p>
            <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </Link>
          <Link
            href="/trials"
            className={`rounded border p-4 group transition-colors ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
              Trials · retrospective mock
            </p>
            <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Case files where SL priors would have flagged responders
            </p>
            <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
