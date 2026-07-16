/**
 * stub-factory.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Produces a minimum-viable, vague-safe `TrialCaseFile` from a
 * `LedgerProgramTrial` plus program context. Used to hydrate the 27 net-new
 * NCTs listed in LEDGER_PROGRAMS that do not have a hand-authored case file.
 *
 * Governance policy (2026-07-07 vague-safe canon):
 *   - All numeric fits are set to the gated sentinel (-1). Components render
 *     `<MoaGlyphStrip />` in place of numeric readouts (via `isCosineGated`).
 *   - VectorAxes are sentinel zeros — biology is only in the narrative fields.
 *   - `moaGlyphs` are DERIVED from the program preview class (io / ddr /
 *     target / benchmark / active), not per-trial. This keeps the stub
 *     within canon (no per-trial biology encoded).
 *   - `publishedReadout` / `verdict` are DERIVED from `primaryMet` +
 *     `primaryResult` — again narrative, not numeric.
 */

import type {
  ArtifactEntry,
  MoaGlyphRow,
  PublishedReadout,
  TrialCaseFile,
  TrialVerdict,
  VectorAxes,
} from './types';
import type { LedgerProgram, LedgerProgramTrial } from '../ledger-programs';

const ZEROS: VectorAxes = { ddr: 0, mapk: 0, pi3k: 0, io: 0, vegf: 0, her2: 0, efflux: 0, rss: 0 };

// ─── slug helpers ──────────────────────────────────────────────────────────

/** Turn an NCT / trial name into a URL slug: lowercase, hyphenate. */
export function slugifyTrial(trial: LedgerProgramTrial): string {
  const src = (trial.nctId ?? trial.trialName ?? 'trial').toString();
  return src
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── tone / verdict derivation ─────────────────────────────────────────────

type Tone = 'negative' | 'positive' | 'mixed' | 'gated';

function deriveTone(primaryMet: string, status: string | null | undefined): Tone {
  const m = (primaryMet ?? '').toUpperCase();
  const s = (status ?? '').toUpperCase();
  if (s.includes('QUARANTINE') || s.includes('MISSING') || s.includes('HOLD') || m.includes('QUARANTINED') || m.includes('MISSING')) return 'gated';
  if (m === 'NO' || m.startsWith('NO ') || s.includes('FAILED') || s.includes('TERMINATED')) return 'negative';
  if (m === 'YES' || m.includes('POSITIVE')) return 'positive';
  if (m.includes('SUBGROUP') || m.includes('PARTIAL') || m.includes('MARGINAL') || m.includes('INTERIM') || m.includes('UNCONTROLLED')) return 'mixed';
  return 'gated';
}

function deriveVerdictLabel(tone: Tone, primaryMet: string): string {
  const m = (primaryMet ?? '').toUpperCase();
  if (tone === 'gated') return 'UNDER_CANON_REVIEW';
  if (tone === 'positive') return 'POSITIVE_CONTROL';
  if (tone === 'negative') return m.includes('TERMINATED') ? 'TRIAL_TERMINATED' : 'PRIMARY_ENDPOINT_MISSED';
  if (tone === 'mixed') {
    if (m.includes('SUBGROUP')) return 'RESPONDER_SUBGROUP_IDENTIFIED';
    if (m.includes('UNCONTROLLED')) return 'UNCONTROLLED_SIGNAL';
    if (m.includes('INTERIM')) return 'INTERIM_INCONCLUSIVE';
    return 'MIXED_READOUT';
  }
  return 'ANALYSIS_PENDING';
}

// ─── preview-class → MoA glyph pattern ─────────────────────────────────────
// Governance-safe: patterns are per-CLASS, not per-trial. This encodes only
// the axis relevance for the class of intervention, not trial-specific biology.

type PreviewClass = LedgerProgram['preview'];

function glyphsForPreview(preview: PreviewClass): MoaGlyphRow[] {
  switch (preview) {
    case 'io':
      return [
        { axis: 'io', direction: 'responder', magnitude: 'strong', note: 'IO axis is the intended lever for this program class.' },
        { axis: 'ddr', direction: 'non-responder', magnitude: 'minimal' },
        { axis: 'vegf', direction: 'responder', magnitude: 'moderate', note: 'VEGF axis engaged for IO-permissive TME conversion (bev / regorafenib combos).' },
        { axis: 'mapk', direction: 'non-responder', magnitude: 'minimal' },
        { axis: 'rss', direction: 'non-responder', magnitude: 'trace' },
      ];
    case 'ddr':
      return [
        { axis: 'ddr', direction: 'responder', magnitude: 'strongest', note: 'DDR axis is the intended lever for this program class.' },
        { axis: 'rss', direction: 'responder', magnitude: 'strong', note: 'Replication-stress axis governs sensitivity to DDR blockade.' },
        { axis: 'io', direction: 'non-responder', magnitude: 'minimal' },
        { axis: 'her2', direction: 'non-responder', magnitude: 'trace' },
        { axis: 'efflux', direction: 'non-responder', magnitude: 'trace' },
      ];
    case 'target':
      // ADC / bispecific / targeted class → HER2/efflux axes carry class-level relevance.
      return [
        { axis: 'her2', direction: 'responder', magnitude: 'strongest', note: 'Target-expression axis is the intended lever for this ADC / bispecific class.' },
        { axis: 'io', direction: 'responder', magnitude: 'moderate', note: 'IO-permissive TME needed for bispecific T-cell engagement.' },
        { axis: 'efflux', direction: 'non-responder', magnitude: 'moderate', note: 'Payload efflux resistance is the primary class-level failure axis.' },
        { axis: 'vegf', direction: 'non-responder', magnitude: 'minimal' },
        { axis: 'rss', direction: 'non-responder', magnitude: 'trace' },
      ];
    case 'benchmark':
      // Cytotoxic backbone — all axes minimal-to-trace; benchmark cell is expectations-only.
      return [
        { axis: 'ddr', direction: 'responder', magnitude: 'moderate', note: 'Cytotoxic backbone engages the DDR axis broadly.' },
        { axis: 'vegf', direction: 'responder', magnitude: 'moderate', note: 'Anti-angiogenic component contributes when bev is on-board.' },
        { axis: 'io', direction: 'non-responder', magnitude: 'trace' },
        { axis: 'her2', direction: 'non-responder', magnitude: 'trace' },
        { axis: 'rss', direction: 'non-responder', magnitude: 'trace' },
      ];
    case 'active':
    default:
      // Active engagement / gated — glyphs remain deliberately vague.
      return [
        { axis: 'io', direction: 'responder', magnitude: 'moderate', note: 'Axis relevance surfaced through canon; specifics gated.' },
        { axis: 'ddr', direction: 'responder', magnitude: 'minimal' },
        { axis: 'her2', direction: 'non-responder', magnitude: 'trace' },
        { axis: 'vegf', direction: 'non-responder', magnitude: 'trace' },
        { axis: 'rss', direction: 'non-responder', magnitude: 'trace' },
      ];
  }
}

// ─── main factory ──────────────────────────────────────────────────────────

export interface StubFactoryContext {
  program: LedgerProgram;
  /** Case-file ordinal for this stub (used as `caseNumber`). */
  caseNumber: string;
  /** Existing slug when overriding auto-slug (e.g. keyword-based slugs). */
  slug?: string;
}

export function makeTrialCaseStub(
  trial: LedgerProgramTrial,
  ctx: StubFactoryContext,
): TrialCaseFile {
  const { program, caseNumber } = ctx;
  const slug = ctx.slug ?? slugifyTrial(trial);

  const tone = deriveTone(trial.primaryMet ?? '', trial.status);
  const verdictLabel = deriveVerdictLabel(tone, trial.primaryMet ?? '');

  const publishedReadout: PublishedReadout = {
    headlineLabel: tone === 'positive' ? 'The Positive Control:'
      : tone === 'negative' ? 'The Published Readout:'
      : tone === 'mixed' ? 'The Split Readout:'
      : 'Under Canon Review:',
    headlineValue: (trial.primaryResult ?? '').slice(0, 120) || 'Result gated pending canon reconciliation',
    tone,
    endpointLabel: 'Primary Endpoint',
    endpointValue: (trial.primaryMet ?? '').slice(0, 60) || 'gated',
  };

  const verdict: TrialVerdict = {
    label: verdictLabel,
    tone,
    caption: tone === 'gated'
      ? 'Delta magnitude / responder archetype under continued canon review.'
      : `${program.name}: transfer lessons applied to Brenus BREAK-CRC-001 comparator context.`,
  };

  const artifacts: ArtifactEntry[] = [
    {
      doc: 'Ledger Program Reference',
      path: `${program.programId} · ${program.slug}`,
      type: 'md',
      status: 'VERIFIED',
      summary: `Trial catalogued under ${program.name}. See program record for full transfer lessons.`,
    },
    ...(trial.nctId ? [{
      doc: 'Trial Registry',
      path: `${trial.nctId} · ${trial.trialName ?? '—'}`,
      type: 'md' as const,
      status: 'VERIFIED' as const,
      summary: `Sponsor: ${trial.sponsor ?? '—'}. Phase: ${trial.phase ?? '—'}. Indication: ${trial.indication ?? '—'}.`,
    }] : []),
  ];

  const rootCauseSummary = (trial.primaryResult ?? '').trim() || 'Primary result under canon review.';

  return {
    id: slug,
    caseNumber,
    trialId: trial.nctId ?? slug.toUpperCase(),
    sponsor: trial.sponsor ?? '—',
    phase: trial.phase ?? '—',
    cancer: trial.indication ?? '—',
    drug: trial.drug ?? '—',
    comparator: '—',
    enrolled: 0,
    primaryEndpoint: rootCauseSummary,
    title: `${trial.trialName ?? trial.nctId ?? 'Trial'} — ${program.name}`,
    drugLine: `${trial.drug ?? '—'} // ${trial.sponsor ?? '—'} ${trial.phase ?? ''}`.trim(),
    sources: [
      `${trial.nctId ?? '—'} — ${trial.trialName ?? '—'}`,
      `Ledger program: ${program.name}`,
    ],
    rootCause: {
      summary: rootCauseSummary,
      failureKeyword: verdictLabel,
      statusQuo: `${program.indicationFocus}`,
      statusQuoLabel: 'Program Context',
      intercept: program.transferLessons[0] ?? 'Transfer lesson under canon review',
      interceptLabel: 'Transfer Lesson',
    },
    responderLabel: 'Responder archetype — see program transfer lessons',
    nonResponderLabel: 'Non-responder archetype — see program transfer lessons',
    responderVector: ZEROS,
    nonResponderVector: ZEROS,
    trialVector: ZEROS,
    cosineResponder: -1,
    cosineITT: -1,
    deltaImpact: 'gated',
    vectorFlags: [],
    scores: [
      { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
      { label: 'Published readout', value: (trial.primaryResult ?? '').slice(0, 40) || 'gated', subtext: 'Public source', color: 'rose' },
      { label: 'Framework tier', value: 'Ledger corpus', subtext: program.programId, color: 'cyan' },
      { label: 'Program', value: program.name.slice(0, 40), subtext: `${program.slug}`, color: 'cyan' },
    ],
    engineRun: {
      trialsScored: 0,
      responderScore: -1,
      responderRank: 0,
      nonResponderScore: -1,
      nonResponderRank: 0,
      delta: -1,
      receiptFile: 'Under continued canon review',
      receiptDate: 'gated',
    },
    gates: [
      { id: 1, label: 'Gate 1', condition: 'Under continued canon review', result: 'gated', pass: false },
      { id: 2, label: 'Gate 2', condition: 'Under continued canon review', result: 'gated', pass: false },
      { id: 3, label: 'Gate 3', condition: 'Under continued canon review', result: 'gated', pass: false },
    ],
    gatesSummary: 'Gates gated under canon review',
    biologySummary: `Trial catalogued under ${program.name}. See program transfer lessons for class-level biology and Brenus BREAK-CRC-001 comparator implications.`,
    biologyCascade: program.transferLessons.length > 0
      ? program.transferLessons.slice(0, 6).map((t) => `→ ${t}`)
      : ['Transfer lessons under canon review'],
    playbook: [
      { title: 'Program context', desc: program.headline.slice(0, 200) },
      { title: 'Transfer lesson', desc: program.transferLessons[0] ?? 'Under canon review' },
      { title: 'Comparator context', desc: 'See BREAK-CRC-001 comparator matrix for trial-vs-active program analysis.' },
      { title: 'Governance', desc: 'Delta magnitude / responder cosine gated pending canon reconciliation.' },
    ],
    artifacts,
    commercial: {
      targetPopulation: '—',
      populationUnit: 'Program context',
      annualSavings: '—',
      savingsUnit: 'Under canon review',
      closingStatement: `See ${program.name} program page for commercial framing.`,
    },
    diagnosticLog: [
      { time: '', message: `Stub generated from LEDGER_PROGRAMS · ${program.programId}. Numeric fits gated.`, level: 'info' },
    ],
    oneLiner: (trial.primaryResult ?? '').slice(0, 200) || `${trial.trialName ?? trial.nctId ?? 'Trial'} catalogued under ${program.name}.`,
    validationTier: 'Ledger corpus stub',
    validationStrength: 'Narrative-only — numeric fits gated',
    publishedReadout,
    verdict,
    moaGlyphs: glyphsForPreview(program.preview),
  };
}
