'use client';

/**
 * Af3ProvenanceSurface.tsx — /ledger/af3-provenance/ persona-aware surface.
 *
 * Renders three cohort panels stacked vertically:
 *   1. BRM 7-step evo2 pipeline (real Modal run 20260328T070235Z)
 *   2. AFDB Cohort A (28 AFDB v2 protein monomers, protein doctrine)
 *   3. AF3 Cohort B (15 AF3 RNA-DNA guide-target complexes, RNA-DNA doctrine)
 *
 * Persona toggle: uses PersonaContext + usePersonaContent<T>.
 *   - oncologist → clinical/quantitative, patient-facing tumor-board voice
 *   - patient    → plain-language, care-relevant, no jargon
 *   - pharma     → doctrine + citation + rigor
 *
 * Data:
 *   getAllStepMetrics(), getStepScoresSorted() from '@/data/evo2/brm_pipeline'
 *   af3_15_guide_canonical.json (build-time import)
 *   afdb_28_protein_canonical.json (build-time import)
 */

import { Fragment, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePersonaContent, type PersonaCopyDeck } from '@/context/persona-content';
import {
  BRM_STEP_ORDER,
  BRM_STEP_LABEL,
  getRunInfo,
  getAllStepMetrics,
  getStepScoresSorted,
  type BrmStepSlug,
} from '@/data/evo2/brm_pipeline';
import guideCanonical from '@/data/af3/af3_15_guide_canonical.json';
import proteinCanonical from '@/data/af3/afdb_28_protein_canonical.json';

// ============================================================================
// Types
// ============================================================================

interface GuideRow {
  job_id: string;
  step: string;
  gene: string;
  plddt: number;
  iptm: number;
  fraction_disordered: number;
  has_clash: number;
  ranking_score: number;
  composite_confidence: number;
  rna_dna_verdict: string;
  ptm?: number;
  chain_iptm?: number[];
  chain_pair_iptm?: number[][];
  chain_ptm?: number[];
}

interface ProteinRow {
  gene: string;
  uniprot: string;
  n_residues: number;
  mean_plddt: number;
  median_plddt: number;
  min_plddt: number;
  max_plddt: number;
  pct_very_low_lt50: number;
  pct_low_50to70: number;
  pct_confident_70to90: number;
  pct_very_high_ge90: number;
  protein_doctrine_verdict: 'PASS' | 'IDR-HEAVY';
}

// ============================================================================
// Persona decks
// ============================================================================

// Page-level intro strip.
const PAGE_INTRO: PersonaCopyDeck<{ eyebrow: string; title: string; sub: string }> = {
  oncologist: {
    eyebrow: 'AF3 audit · your tumor-board decisions',
    title: 'Provenance of every structural claim behind BM01',
    sub: 'Two structural cohorts — the proteins your patient is mutating, and the guides the platform is proposing to target them — with the confidence numbers your team can read on rounds.',
  },
  patient: {
    eyebrow: 'How we know what we know',
    title: 'Where the 3D shapes and safety numbers come from',
    sub: 'Your care team looks at 3D maps of the proteins in your tumor before choosing a treatment. This page shows exactly which maps were used and how sure the model was — no black box.',
  },
  pharma: {
    eyebrow: 'AF3 provenance · two-cohort structural audit',
    title: 'Cohort A (AFDB v2 monomer) + Cohort B (AF3 3-chain complex)',
    sub: 'Doctrine badges show applied cutoffs (Jumper 2021 for Cohort A, Abramson 2024 for Cohort B). All numeric values traceable to files-on-disk in src/data/af3/ and src/data/evo2/. PATH A locked; PATH B not authorised.',
  },
};

// Panel 1 — BRM 7-step evo2 pipeline.
const PANEL_EVO2_INTRO: PersonaCopyDeck<{ heading: string; body: string }> = {
  oncologist: {
    heading: 'Panel 1 — seven-step brain-met pipeline',
    body: 'The engine scored 29 candidate genes across seven cascade steps for BM01. Step 5 (cns_colonization) is the decision point — PIK3CA, KMT2C, and TP53 rank top-3 there. These are the genes your patient is mutating, in the biology that actually seeds the brain.',
  },
  patient: {
    heading: 'What the platform actually predicts',
    body: 'The care platform looks at each of the seven biological steps a cancer needs to pass to reach the brain, and asks which genes in your specific tumor are the strongest drivers at each step. This isn\'t a guess — every number comes from a real model run, saved with a timestamp.',
  },
  pharma: {
    heading: 'Cohort 0 — evo2 e2e pipeline (7 steps, 29 candidates)',
    body: 'Real Modal GPU run (crispro-evo2-v9 · A100), seed 42, use_enformer=true, 20 pos / 9 neg. Every step\'s AUROC/AUPRC/P@3/npos is stored in brm_pipeline_20260328T070235Z.json. Reproducibility claim on the retroactive-prediction script itself is downgraded (PC-02, permanent).',
  },
};

// Panel 2 — AFDB Cohort A (28 protein monomers).
const PANEL_COHORT_A_INTRO: PersonaCopyDeck<{ heading: string; body: string; verdict: string }> = {
  oncologist: {
    heading: 'Panel 2 — protein 3D confidence, 28 relevant targets',
    body: 'These are the proteins your patient\'s tumor is mutating. AlphaFold gives a per-residue confidence score (pLDDT). A low pLDDT usually means the region is naturally disordered (IDR), not that the model is wrong. BRCA1 sits at mean 41.59 because most of BRCA1 IS disordered — that is biology, not a bug.',
    verdict: '21 of 28 proteins pass the ≥70 pLDDT floor. The 7 IDR-heavy ones (BRCA1, ABL1, VEGFA, SMARCA4, BCR, TWIST1, ESR1) are the transcription-factor and scaffold proteins — expected.',
  },
  patient: {
    heading: 'Reading the 3D confidence map',
    body: 'These are 3D shapes of the proteins your treatment is designed around. Some parts look blurry in the map. That is not a mistake. Some proteins have naturally floppy regions that keep changing shape — the model is honestly telling you it can\'t pin them down. The reliable parts, which are the ones your care team looks at, are shown clearly.',
    verdict: 'For 21 out of 28 proteins, most of the shape is reliable enough to use. For the other 7, most of the protein is naturally floppy — that\'s biology, and your care team knows to work around it.',
  },
  pharma: {
    heading: 'Cohort A — AFDB v2 protein monomers (n=28)',
    body: 'Doctrine: pLDDT ≥70 per Jumper 2021 Nature. Verdict per-protein at mean-pLDDT. Confidence bands (Varadi 2022): <50 = very low (likely IDR / unresolved), 50–70 = low, 70–90 = confident, ≥90 = very high (atomic accuracy).',
    verdict: '21/28 PASS (mean pLDDT ≥70). 7/28 IDR-HEAVY (mean pLDDT <70): BRCA1 41.59, ABL1 63.37, VEGFA 63.91, SMARCA4 64.02, BCR 64.78, TWIST1 66.31, ESR1 66.43. All 7 are documented native-IDR-heavy proteins per DisProt and MobiDB. This is biology, not model failure.',
  },
};

// Panel 3 — AF3 Cohort B (15 RNA-DNA guide-target complexes).
const PANEL_COHORT_B_INTRO: PersonaCopyDeck<{ heading: string; body: string; verdict: string }> = {
  oncologist: {
    heading: 'Panel 3 — guide RNA to target DNA, 15 complexes',
    body: 'For each cascade step, the engine proposes guide RNAs that would target the top gene. These aren\'t proteins — they\'re RNA-DNA-DNA three-chain complexes. AF3\'s protein confidence bar (pLDDT ≥70, iPTM ≥0.50) does not apply here. The right cut for RNA-DNA is looser (pLDDT ≥50, iPTM ≥0.30).',
    verdict: 'All 15 guides pass RNA-DNA acceptance. If you accidentally apply the protein cut, all 15 fail — which would send you back to picking guides by hand. That is what happens when the wrong doctrine is applied.',
  },
  patient: {
    heading: 'The guide molecules the platform proposes',
    body: 'The platform proposes small guide molecules that would help direct treatment to exactly the right place. Each proposal is checked against a 3D model before it can be used. The check is different for guides than for proteins — the standards are calibrated to the type of molecule, not one-size-fits-all.',
    verdict: 'All 15 guide proposals pass the safety checks that apply to this type of molecule. None of them are used unless they pass.',
  },
  pharma: {
    heading: 'Cohort B — AF3 3-chain guide-target complex (n=15)',
    body: 'Doctrine: pLDDT ≥50, iPTM ≥0.30 per Abramson 2024 Nature. 3 chains: A = 96-nt guide RNA (20-nt spacer + 76-nt tracrRNA), B = 60-bp target DNA strand 1, C = 60-bp target DNA strand 2. chain_pair_iptm decomposes the interface: dsDNA duplex (B↔C) ≈ 0.44 (canonical B-form), RNA-DNA R-loop interfaces (A↔B, A↔C) ≈ 0.20–0.23 (transient in vivo). Pulling those into a single iPTM lands at 0.33–0.38 across the cohort.',
    verdict: '15/15 PASS RNA-DNA cut. 0/15 PASS if the protein cut is misapplied. The two-cohort separation is the point: applying the wrong doctrine hides a real biological signal behind a formatting error.',
  },
};

// Bottom governance strip.
const GOVERNANCE_STRIP: PersonaCopyDeck<string> = {
  oncologist: 'Every number on this page traces to a file on disk. If a claim can\'t be traced, it is not shown.',
  patient: 'Nothing on this page is a demo mockup. Every value comes from a real model run saved with a date and version.',
  pharma: 'PATH A locked as production ranker (fit = clip((p·t) / ‖t‖₂, 0, 1)). PATH B not authorised. DL-07 (DDR 0.983 Figure 2) quarantined. LATIFY delta values (+0.366 / +0.2641) quarantined pending vector version resolution. PC-02 permanently downgraded. Provenance verified via engagements/brenus/tests/overlay_verification.py.',
};

// ============================================================================
// Component
// ============================================================================

export default function Af3ProvenanceSurface() {
  const { isDarkMode } = useTheme();
  const intro = usePersonaContent(PAGE_INTRO);
  const evo2Intro = usePersonaContent(PANEL_EVO2_INTRO);
  const cohortAIntro = usePersonaContent(PANEL_COHORT_A_INTRO);
  const cohortBIntro = usePersonaContent(PANEL_COHORT_B_INTRO);
  const govStrip = usePersonaContent(GOVERNANCE_STRIP);

  const runInfo = useMemo(() => getRunInfo(), []);
  const allSteps = useMemo(() => getAllStepMetrics(), []);
  const cnsTop3 = useMemo(() => getStepScoresSorted('cns_colonization').slice(0, 3), []);

  const proteins = (proteinCanonical.proteins as ProteinRow[]);
  const guides = (guideCanonical.guides as GuideRow[]);

  const bg = isDarkMode ? 'bg-[#020408]' : 'bg-[#FAF9F3]';
  const text = isDarkMode ? 'text-zinc-200' : 'text-slate-900';
  const dim = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const border = isDarkMode ? 'border-zinc-800' : 'border-zinc-300';
  const card = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200';

  return (
    <div className={`min-h-screen ${bg} ${text} font-mono`}>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

        {/* Header */}
        <header className="space-y-3">
          <div className={`text-[10px] font-black uppercase tracking-[0.35em] ${dim}`}>
            {intro?.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {intro?.title}
          </h1>
          <p className={`text-sm md:text-base ${dim} max-w-3xl leading-relaxed font-sans`}>
            {intro?.sub}
          </p>
          <div className="flex gap-3 pt-3">
            <Link
              href="/engine/target-lock/workspace"
              className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black px-3 py-1.5 border ${border} hover:bg-zinc-900 hover:text-zinc-100 transition-colors`}
            >
              Interactive workspace <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="/ledger/decode-wall"
              className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black px-3 py-1.5 border ${border} hover:bg-zinc-900 hover:text-zinc-100 transition-colors`}
            >
              Decode wall <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Panel 1 — evo2 pipeline */}
        <Panel
          badge={{ label: 'brm 7-step · evo2', tone: 'neutral', isDark: isDarkMode }}
          heading={evo2Intro?.heading ?? ''}
          body={evo2Intro?.body ?? ''}
        >
          <div className="grid gap-2">
            <div className={`text-[10px] uppercase tracking-widest ${dim}`}>Run metadata</div>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 text-xs ${dim}`}>
              <MetaCell label="timestamp" value={runInfo.timestamp} />
              <MetaCell label="seed" value={String(runInfo.seed)} />
              <MetaCell label="n genes" value={String(runInfo.nGenes)} />
              <MetaCell label="enformer" value={runInfo.useEnformer ? 'true' : 'false'} />
            </div>
          </div>

          <div className="mt-6 grid gap-1.5">
            <div className={`text-[10px] uppercase tracking-widest ${dim}`}>Seven steps</div>
            <table className={`w-full text-xs ${border} border`}>
              <thead className={`${dim}`}>
                <tr>
                  <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Step</th>
                  <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">AUROC</th>
                  <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">AUPRC</th>
                  <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">P@3</th>
                  <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">n pos</th>
                </tr>
              </thead>
              <tbody>
                {allSteps.map((s) => (
                  <tr
                    key={s.slug}
                    className={`border-t ${border} ${s.slug === 'cns_colonization' ? 'bg-emerald-500/5' : ''}`}
                  >
                    <td className="px-2 py-1.5">
                      {BRM_STEP_LABEL[s.slug as BrmStepSlug] ?? s.slug}
                      {s.slug === 'cns_colonization' && (
                        <span className="ml-2 text-[9px] uppercase tracking-widest text-emerald-500">decision point</span>
                      )}
                    </td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{s.auroc?.toFixed(4) ?? '—'}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{s.auprc?.toFixed(4) ?? '—'}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{s.precisionAt3?.toFixed(2) ?? '—'}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{s.nPos ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cnsTop3.length > 0 && (
            <div className="mt-6 grid gap-1.5">
              <div className={`text-[10px] uppercase tracking-widest ${dim}`}>
                cns_colonization — top 3 (decision-point cut)
              </div>
              <div className="grid gap-1">
                {cnsTop3.map((g) => (
                  <div
                    key={g.gene}
                    className={`flex justify-between items-center border ${border} px-3 py-2 text-xs`}
                  >
                    <span className="font-black uppercase tracking-widest">{g.gene}</span>
                    <span className="tabular-nums">{g.calibratedScore.toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Panel>

        {/* Panel 2 — AFDB Cohort A */}
        <Panel
          badge={{ label: 'cohort A · protein monomer · pLDDT ≥70 · Jumper 2021', tone: 'protein', isDark: isDarkMode }}
          heading={cohortAIntro?.heading ?? ''}
          body={cohortAIntro?.body ?? ''}
          verdict={cohortAIntro?.verdict}
        >
          <ProteinTable proteins={proteins} isDark={isDarkMode} />
        </Panel>

        {/* Panel 3 — AF3 Cohort B */}
        <Panel
          badge={{ label: 'cohort B · RNA-DNA · pLDDT ≥50 · iPTM ≥0.30 · Abramson 2024', tone: 'rna_dna', isDark: isDarkMode }}
          heading={cohortBIntro?.heading ?? ''}
          body={cohortBIntro?.body ?? ''}
          verdict={cohortBIntro?.verdict}
        >
          <GuideTable guides={guides} isDark={isDarkMode} />
        </Panel>

        {/* Governance strip */}
        <footer className={`border-t ${border} pt-6 space-y-2`}>
          <div className={`text-[10px] uppercase tracking-[0.35em] ${dim}`}>Governance</div>
          <p className={`text-xs ${dim} font-sans max-w-4xl leading-relaxed`}>
            {govStrip}
          </p>
        </footer>
      </div>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function Panel({
  badge,
  heading,
  body,
  verdict,
  children,
}: {
  badge: { label: string; tone: 'protein' | 'rna_dna' | 'neutral'; isDark: boolean };
  heading: string;
  body: string;
  verdict?: string;
  children: React.ReactNode;
}) {
  const toneColor =
    badge.tone === 'protein'
      ? 'text-[#0279EE]'
      : badge.tone === 'rna_dna'
        ? 'text-[#75A025]'
        : 'text-zinc-500';
  const toneBg =
    badge.tone === 'protein'
      ? 'bg-[#0279EE]/10 border-[#0279EE]/30'
      : badge.tone === 'rna_dna'
        ? 'bg-[#75A025]/10 border-[#75A025]/30'
        : `bg-transparent border-zinc-500/30`;

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        <span
          className={`inline-block text-[9px] font-black uppercase tracking-[0.3em] px-2 py-1 border ${toneBg} ${toneColor}`}
        >
          {badge.label}
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">{heading}</h2>
        <p className={`text-sm max-w-3xl leading-relaxed font-sans ${badge.isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          {body}
        </p>
      </div>
      {children}
      {verdict && (
        <div
          className={`mt-4 border-l-2 pl-3 py-2 text-xs font-sans leading-relaxed ${
            badge.tone === 'protein'
              ? 'border-[#0279EE] text-[#0279EE]/90'
              : badge.tone === 'rna_dna'
                ? 'border-[#75A025] text-[#75A025]/90'
                : 'border-zinc-500'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mr-2">Verdict</span>
          {verdict}
        </div>
      )}
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-zinc-700/40 px-2 py-1.5">
      <div className="text-[8px] uppercase tracking-widest opacity-60">{label}</div>
      <div className="text-xs tabular-nums">{value}</div>
    </div>
  );
}

function ProteinTable({ proteins, isDark }: { proteins: ProteinRow[]; isDark: boolean }) {
  const border = isDark ? 'border-zinc-800' : 'border-zinc-300';
  const dim = isDark ? 'text-zinc-500' : 'text-slate-500';
  return (
    <div className="grid gap-1.5">
      <div className={`text-[10px] uppercase tracking-widest ${dim}`}>28 proteins, sorted by mean pLDDT ascending</div>
      <div className="overflow-x-auto">
        <table className={`w-full text-xs ${border} border`}>
          <thead className={dim}>
            <tr>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Gene</th>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">UniProt</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">n res</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">mean pLDDT</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">% &lt;50</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">% ≥90</th>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {proteins.map((p) => {
              const idr = p.protein_doctrine_verdict === 'IDR-HEAVY';
              return (
                <tr key={p.uniprot} className={`border-t ${border}`}>
                  <td className="px-2 py-1 font-black">{p.gene}</td>
                  <td className={`px-2 py-1 ${dim}`}>{p.uniprot}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{p.n_residues}</td>
                  <td className={`px-2 py-1 text-right tabular-nums ${idr ? 'text-rose-500 font-bold' : ''}`}>
                    {p.mean_plddt.toFixed(2)}
                  </td>
                  <td className="px-2 py-1 text-right tabular-nums">{p.pct_very_low_lt50.toFixed(1)}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{p.pct_very_high_ge90.toFixed(1)}</td>
                  <td className="px-2 py-1">
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 ${
                        idr ? 'bg-rose-500/10 text-rose-500' : 'bg-[#0279EE]/10 text-[#0279EE]'
                      }`}
                    >
                      {p.protein_doctrine_verdict}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GuideTable({ guides, isDark }: { guides: GuideRow[]; isDark: boolean }) {
  const [expanded, setExpanded] = useState<string | null>('fold_meta_micrometastasis_formation_cxcr4_06');
  const border = isDark ? 'border-zinc-800' : 'border-zinc-300';
  const dim = isDark ? 'text-zinc-500' : 'text-slate-500';
  return (
    <div className="grid gap-1.5">
      <div className={`text-[10px] uppercase tracking-widest ${dim}`}>
        15 guides, sorted by composite structural_confidence descending
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full text-xs ${border} border`}>
          <thead className={dim}>
            <tr>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Gene</th>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Step</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">pLDDT</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">iPTM</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">Composite</th>
              <th className="text-left px-2 py-1 font-normal uppercase tracking-widest">Verdict</th>
              <th className="text-right px-2 py-1 font-normal uppercase tracking-widest">Chain</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g) => (
              <Fragment key={g.job_id}>
                <tr className={`border-t ${border}`}>
                  <td className="px-2 py-1 font-black">{g.gene}</td>
                  <td className={`px-2 py-1 ${dim}`}>{g.step}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{g.plddt.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{g.iptm.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{g.composite_confidence.toFixed(3)}</td>
                  <td className="px-2 py-1">
                    <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-[#75A025]/10 text-[#75A025]">
                      {g.rna_dna_verdict}
                    </span>
                  </td>
                  <td className="px-2 py-1 text-right">
                    <button
                      onClick={() => setExpanded((cur) => (cur === g.job_id ? null : g.job_id))}
                      className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest opacity-70 hover:opacity-100"
                    >
                      {expanded === g.job_id ? (
                        <>
                          hide <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          matrix <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                {expanded === g.job_id && g.chain_pair_iptm && (
                  <tr key={`${g.job_id}-detail`} className={`border-t ${border} bg-black/20`}>
                    <td colSpan={7} className="px-4 py-3">
                      <div className={`text-[9px] uppercase tracking-widest ${dim} mb-2`}>
                        chain_pair_iptm — 3x3 matrix (A = RNA guide, B/C = target DNA strands)
                      </div>
                      <div className="inline-block">
                        <table className="text-xs tabular-nums">
                          <thead>
                            <tr>
                              <th></th>
                              <th className="px-3 py-1 text-right font-normal opacity-70">A (RNA)</th>
                              <th className="px-3 py-1 text-right font-normal opacity-70">B (DNA1)</th>
                              <th className="px-3 py-1 text-right font-normal opacity-70">C (DNA2)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {['A (RNA)', 'B (DNA1)', 'C (DNA2)'].map((label, i) => (
                              <tr key={label}>
                                <td className="px-3 py-1 text-left opacity-70">{label}</td>
                                {g.chain_pair_iptm![i].map((v, j) => (
                                  <td
                                    key={j}
                                    className={`px-3 py-1 text-right ${
                                      v >= 0.4
                                        ? 'text-[#75A025] font-bold'
                                        : v >= 0.2
                                          ? 'text-[#E9ED4C]'
                                          : 'opacity-70'
                                    }`}
                                  >
                                    {v.toFixed(2)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className={`mt-3 text-[10px] ${dim} max-w-2xl font-sans leading-relaxed`}>
                        dsDNA duplex interface (B ↔ C) at 0.44 — AF3 correctly models canonical B-form
                        DNA. RNA-DNA R-loop interfaces (A ↔ B, A ↔ C) at 0.20–0.23 — the guide RNA is a
                        flexible scaffold and R-loops are transient, so AF3 assigns them lower
                        confidence. This is expected biology, not model failure.
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
