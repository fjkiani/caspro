// ============================================================================
// ch02-evidence-hierarchy.ts — Chapter 2: The Evidence Hierarchy (4 tiers)
//
// Public-safe rewrite of PhD KB Ch.1.2 (The Evidence Hierarchy).
// Public example preserved: MBD4-LOF + gemcitabine (PMID 35428381).
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_02_EVIDENCE_HIERARCHY: ResearchChapter = {
  slug: 'evidence-hierarchy',
  order: 2,
  title: 'The evidence hierarchy',
  subtitle: 'A four-tier grading system for every synthetic-lethal claim on the platform',
  readMinutes: 7,
  publicAnchors: [
    'MBD4-LOF + gemcitabine (PMID 35428381)',
    'CDK2 + CCNE1 amplification (DepMap Cohen’s d ≈ −0.72)',
    'ATR / WEE1 in BER-deficient tumours',
  ],
  sections: [
    {
      heading: 'Why a hierarchy',
      body: [
        'A rigorous four-tier evidence hierarchy classifies the confidence level of any SL interaction. Each tier has strict entry criteria that determine both the scientific confidence and the clinical actionability of the finding. The hierarchy is designed to prevent premature clinical recommendations while surfacing the maximum information available to a tumour board or trial designer.',
      ],
    },
    {
      heading: 'VALIDATED — the highest bar',
      body: [
        'A VALIDATED tier assignment requires convergent evidence across multiple experimental modalities AND clinical confirmation. Every VALIDATED claim on the platform is manually signed off against these three criteria — the platform never auto-assigns this tier.',
        '**Canonical example: MBD4-LOF + gemcitabine (PMID 35428381).** MBD4 is a DNA glycosylase involved in base-excision repair (BER) of G:T mismatches arising from 5-methylcytosine deamination. Loss-of-function mutations in MBD4 impair BER, creating a vulnerability to cytidine analogs (gemcitabine, decitabine, azacitidine) that incorporate into DNA and require BER for removal.',
        '**Evidence chain for MBD4 + gemcitabine:**',
        '- *In vitro:* isogenic MBD4-KO vs MBD4-WT cell lines show >10-fold sensitivity differential to gemcitabine (IC50 ratio). Rescue experiments with re-expressed wild-type MBD4 restore resistance, confirming on-target mechanism.',
        '- *In vivo:* patient-derived xenograft (PDX) models carrying MBD4 frameshift mutations show complete tumour regression with gemcitabine monotherapy at clinically relevant doses.',
        '- *Clinical:* at least one documented patient with MBD4-LOF ovarian cancer achieved partial response to gemcitabine-based therapy after platinum resistance.',
      ],
    },
    {
      heading: 'STRONG — multi-modal convergence',
      body: [
        'STRONG tier requires convergent evidence from at least two independent experimental modalities with quantitative thresholds met. The most common pathway to STRONG is CRISPR dependency data (DepMap) plus pharmacologic screen data (PRISM or GDSC), where both show statistically significant selective effects in the relevant genetic context.',
        '**Quantitative thresholds for STRONG:**',
        '- CRISPR dependency (DepMap): Wilcoxon rank-sum test p < 0.05 after FDR correction, Cohen’s d ≥ 0.5 (medium effect size).',
        '- Pharmacologic (PRISM/GDSC): Delta AUC or IC50 fold-change ≥ 2.0 between mutant and wild-type contexts. FDR < 0.10.',
        '- In vitro + in vivo: isogenic in-vitro validation plus any in-vivo confirmation (xenograft, PDX, transgenic) qualifies regardless of DepMap/PRISM data.',
        '**Canonical example: CDK2 dependency in CCNE1-amplified cell lines** — DepMap Cohen’s d ≈ −0.72, plus in-vitro CDK2 inhibitor sensitivity in the same genetic context.',
      ],
    },
    {
      heading: 'MECHANISTIC — pathway logic',
      body: [
        'MECHANISTIC tier is assigned when computational analysis, pathway logic, or expression data provide a plausible SL hypothesis, but no direct experimental validation exists. This tier is explicitly designed to surface hypotheses worth testing, not to make clinical recommendations.',
        'A guardrail in the platform: the system will never assign "not supported" to an axis that has a non-empty mechanism field. If pathway logic provides a rationale, the minimum tier is MECHANISTIC. This ensures no biologically coherent hypothesis is suppressed — it simply receives the appropriate confidence label.',
        '**Canonical example:** ATR or WEE1 inhibitor sensitivity in tumours with impaired base-excision repair — supported by pathway logic (replication stress from unrepaired base damage) and expression covariation, without direct clinical receipts.',
      ],
    },
    {
      heading: 'INSUFFICIENT — the honest label',
      body: [
        'INSUFFICIENT applies when fewer than two independent modalities meet threshold, or when the strongest modality is expression-association alone. INSUFFICIENT claims are not surfaced as actionable — they are held in the audit queue for re-evaluation as evidence accumulates.',
        'Publishing the INSUFFICIENT label is as important as publishing VALIDATED: it is the honest way to say we know about a hypothesis but do not yet have the evidence to act on it.',
      ],
    },
  ],
  keyInsight:
    'VALIDATED is never auto-assigned. Every VALIDATED claim on the platform is signed off by a curator against the three-modality bar. The hierarchy exists precisely so that the platform never overclaims what it knows.',
  linksIntoDepth: {
    axes: ['ddr', 'rss'],
    modalities: ['clinical', 'in-vitro-functional', 'in-vivo', 'crispr-dependency'],
    tiers: ['validated', 'strong', 'mechanistic', 'insufficient'],
    capabilities: ['biomarker-failure-prediction'],
  },
};
