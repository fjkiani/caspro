/**
 * data/ledger-programs.ts
 *
 * SINGLE SOURCE OF TRUTH for the CrisPRO Ledger.
 *
 * Data provenance:
 *   - Source: crispro_master_pipeline.json (external-safe corpus, 2026-06-18)
 *   - The active engagement program is loaded here in VAGUE form only.
 *   - Findings gated by governance are replaced with a placeholder.
 *
 * Editing rules and forbidden values are enforced by
 * caspro-lint/forbidden_values.py on every commit.  See
 * caspro-lint/README.md for the catalog.
 *
 * Persona overlay (D15):
 *   - Each program carries a persona-varied header via `personaCopy`
 *     over LedgerProgramCopyFields (name, headline, indicationFocus, ipValue).
 *   - transferLessons[] carries an optional persona-varied array via
 *     `transferLessonsByPersona`. Read via getLedgerTransferLessons(program,
 *     persona), which falls back to the English root array.
 *   - `keyFindings[].description` and `trials[].primaryResult` remain
 *     in canonical technical form. Adapting the raw statistical evidence
 *     (HR / OS / PFS / p-values / PMIDs) to plain English risks losing
 *     numeric precision; that pass is deferred to a dedicated later chunk.
 *   - Access at read sites via personaField(entry, key, persona) from
 *     src/lib/persona-copy-guards; English fallback keeps existing
 *     consumers working.
 */

import type { PersonaOverlay } from '@/lib/persona-copy-guards';
import type { Persona } from '@/context/PersonaContext';

export type LedgerProgramFinding = {
  id: string;
  title: string;
  description: string;
  source: string;
};

export type LedgerProgramTrial = {
  nctId?: string | null;
  trialName?: string | null;
  drug?: string | null;
  sponsor?: string | null;
  indication?: string | null;
  phase?: string | null;
  status?: string | null;
  primaryResult?: string;
  primaryMet?: string;
};

export interface LedgerProgramCopyFields {
  name: string;
  headline: string;
  indicationFocus: string;
  ipValue: string;
}

export type LedgerProgram = LedgerProgramCopyFields & {
  programId: string;
  slug: string;
  order: number;
  preview: 'ddr' | 'target' | 'io' | 'benchmark' | 'active';
  gated: boolean;
  keyFindings: LedgerProgramFinding[];
  transferLessons: string[];
  /**
   * Optional persona-specific overrides for the transferLessons array.
   * When set for a persona, that persona's array replaces the English
   * root wholesale (arrays are not merged position-by-position — the
   * lesson count may differ across personas). Missing personas fall
   * back to the outer `transferLessons` array.
   */
  transferLessonsByPersona?: Partial<Record<Persona, string[]>>;
  trials: LedgerProgramTrial[];
  personaCopy?: PersonaOverlay<LedgerProgramCopyFields>;
};

export const LEDGER_PROGRAMS: LedgerProgram[] = [
  {
    programId: "CEACAM5",
    slug: "ceacam5",
    order: 1,
    name: "CEACAM5-Targeted Therapy Failure Corpus",
    headline: "5-trial CEACAM5 failure corpus spanning ADC (DM4, SN-38, Topo1i), bispecific T-cell engager, and EU-hold safety signal \u2014 with IHC threshold analysis, CRC-specific transfer lessons, and the definitive proof that CEACAM5 IHC is prognostic not predictive.",
    indicationFocus: "2L+ NSCLC (1 Phase III); 3L+ mCRC (3 trials); solid tumors including CRC (1 Phase I on EU hold)",
    ipValue: "Sanofi pitch anchor \u2014 CEACAM5 two-gate patient selection framework (IHC \u226580% + IO permissiveness) applied to SAR445953 and SAR445877. Committed to Brenus repo SHA 993aecd.",
    preview: "target",
    gated: false,
    personaCopy: {
      patient: {
        name: "Why drugs aimed at the CEACAM5 marker have been failing",
        headline: "Five clinical trials in patients tried to hit a tumor marker called CEACAM5 with different kinds of drugs. All five failed. The pattern that comes out of these failures: the test used to pick patients was picking too many people. When the test bar is raised (only patients with very high CEACAM5 on the tumor), a signal starts to appear. This corpus explains why the earlier trials could not find that signal.",
        indicationFocus: "Failed CEACAM5 drug trials in second-line non-small-cell lung cancer (one large Phase III), third-line-or-later metastatic colon cancer (three trials), and other solid tumors including colon cancer (one Phase I paused in Europe over safety).",
        ipValue: "This corpus explains a two-step patient-picking rule for CEACAM5: only patients whose tumors have very high CEACAM5 AND whose tumors look immune-friendly enough. It is the anchor for pitching Sanofi on the SAR445953 and SAR445877 programs.",
      },
      pharma: {
        name: "CEACAM5-directed franchise failure corpus",
        headline: "Five-trial CEACAM5 franchise failure corpus spanning ADC (DM4, SN-38, Topo1i payloads), CEA-TCB bispecific, and EU-hold safety class-signal. Includes IHC-threshold audit, CRC-transfer read, and the audit-trail-grade finding that CEACAM5 IHC is prognostic, not predictive \u2014 the substrate call every CEACAM5 franchise needs to derisk.",
        indicationFocus: "2L+ NSCLC (1 Phase III), 3L+ mCRC (3 trials), advanced solid tumors including CRC (1 Phase I on EU clinical hold) \u2014 pan-histology CEACAM5 franchise footprint.",
        ipValue: "Sanofi franchise pitch anchor. Two-gate patient-selection framework (CEACAM5 IHC \u226580% + IO permissiveness) applied to SAR445953 and SAR445877 CDx pathway. Committed to Brenus repo SHA 993aecd \u2014 franchise-audit receipt on the trail.",
      },
    },
    keyFindings: [
      {
        id: "CEACAM5-F1",
        title: "CEACAM5 IHC \u226550% threshold is prognostic, not predictive",
        description: "CARMEN-LC03 (Phase III, N=389): PFS HR 1.14 (P=0.82) in CEACAM5 IHC \u226550% population. The threshold was set too low \u2014 \u226550% captures patients who express CEACAM5 but cannot respond to ADC therapy. CEACAM5 IHC is a marker of tumor identity, not drug sensitivity.",
        source: "Besse et al. IASLC 2024 WCLC; Sanofi press release 2023-12-21",
      },
      {
        id: "CEACAM5-F2",
        title: "CEACAM5 IHC \u226580% shows directional OS benefit (post-hoc, underpowered)",
        description: "CARMEN-LC03 post-hoc: CEACAM5 \u226580% OS HR=0.71 (CI not published). CEACAM5 50\u201379% PFS HR=1.38 (numerically harmful). The \u226580% threshold is the candidate predictive gate \u2014 but this is exploratory, underpowered, and CI not published. Must be labeled as trend, not established.",
        source: "Besse et al. IASLC 2024 WCLC",
      },
      {
        id: "CEACAM5-F3",
        title: "CEACAM5 IHC is not predictive at any threshold in CRC (PROCEADE-CRC-01)",
        description: "PROCEADE-CRC-01 (N=40, 3L+ mCRC): ORR 7.5% confirmed; CEACAM5 IHC Spearman rho = \u22120.14 (P=0.4) \u2014 no correlation between IHC expression and response. The IHC threshold failure pattern from NSCLC does not resolve in CRC.",
        source: "Nature Medicine 2025 (PMC12720031)",
      },
      {
        id: "CEACAM5-F4",
        title: "cCEA \u2265100 as a liquid biopsy proxy for CEACAM5 IHC \u226580%",
        description: "Gazzah et al. (PMC12720031): cCEA \u2265100 ORR 41.7% (10/24) vs 8.1% (3/37), P=0.003 in CEACAM5 high-expressing NSCLC. IHC \u2194 cCEA Spearman \u03c1=0.43 (n=92). cCEA \u2194 cCEACAM5 \u03c1=0.99 (n=87). cCEA \u2265100 prevalence in HE patients: 40.3% (25/62). NOTE: All data from NSCLC \u2014 application to CRC ",
        source: "Gazzah et al. PMC12720031 (NSCLC cohort)",
      },
      {
        id: "CEACAM5-F5",
        title: "SGN-CEACAM5C EU clinical hold \u2014 VKG linker + Topo1i toxicity signal",
        description: "NCT06131840 (tusamitamab sonditecan, SGN-CEACAM5C): EU clinical hold in France, Spain, Sweden, Netherlands. Shared VKG linker + Topo1i chemistry with discontinued PF-08046044 (terminated for toxicity). No efficacy data published. Competitive risk for the CEACAM5 ADC field.",
        source: "NCT06131840 registry; EU regulatory communications",
      },
      {
        id: "CEACAM5-F6",
        title: "CEACAM5 CRC prevalence: 98.7% any-positivity; MSS CRC has HIGHER expression than MSI-H",
        description: "Jansen et al. Cancers 2024 (DOI:10.3390/cancers16234052): 98.7% CEACAM5 any-positivity in colorectal adenocarcinomas (pan-tumor TMA). MMR deficiency \u2192 reduced CEA (P<0.0001) \u2014 MSS CRC has HIGHER CEACAM5 expression than MSI-H CRC. CRLM CEACAM5 positivity: 79% (Warmerdam et al. EJN",
        source: "Jansen et al. Cancers 2024; Warmerdam et al. EJNMMI Res 2025",
      },
    ],
    transferLessons: [
      "CEACAM5 IHC \u226580% is the candidate predictive threshold \u2014 \u226550% is insufficient",
      "cCEA \u2265100 ng/mL is a liquid biopsy proxy for IHC \u226580% (NSCLC data; CRC inference only)",
      "IO permissiveness (pTMB, TME immune infiltrate) must be the second gate \u2014 CEACAM5 expression alone is insufficient",
      "SN-38 payload (labetuzumab govitecan) fails in post-irinotecan patients \u2014 D1 biology failure",
      "On-target/off-tumor GI toxicity is a class risk for CEACAM5 bispecifics (cibisatamab: diarrhea 55.8%, colitis 13.5%)",
      "EU clinical hold on VKG linker + Topo1i chemistry creates regulatory risk for SGN-CEACAM5C class",
    ],
    transferLessonsByPersona: {
      patient: [
        "For a CEACAM5-targeted drug to have a real chance, the tumor must have a very high amount of CEACAM5 on it (called IHC \u226580%). A middle level (\u226550%) is not enough.",
        "There is a blood test (cCEA \u2265100 ng/mL) that can stand in for the tumor test. This has been shown in lung cancer patients so far; whether it holds in colon cancer is still an assumption.",
        "A high CEACAM5 level on the tumor is not enough by itself \u2014 the tumor also has to look immune-friendly (a signal called pTMB, plus immune cells inside the tumor). Both conditions have to be true.",
        "One earlier drug in this class (labetuzumab govitecan, with an SN-38 chemistry payload) did NOT work in patients whose colon cancer had already been treated with irinotecan. That is a design-level failure of the drug\u2019s biology in that setting.",
        "A different kind of CEACAM5 drug (bispecifics like cibisatamab) has a known side-effect risk of gut inflammation \u2014 diarrhea and colitis \u2014 because CEACAM5 is also on normal gut cells.",
        "European regulators put one drug in this class (SGN-CEACAM5C) on a temporary hold, which flags a regulatory risk for similar drugs.",
      ],
      pharma: [
        "CEACAM5 IHC \u226580% is the candidate franchise-fit predictive threshold; \u226550% is non-admissible on the substrate call.",
        "cCEA \u2265100 ng/mL is a liquid-biopsy proxy for the IHC \u226580% franchise-fit gate \u2014 NSCLC evidence base; CRC transfer is currently an OPEN_ASSUMPTION on the audit trail.",
        "IO-permissiveness (pTMB, TME immune infiltrate) is the mandatory second franchise-fit gate; single-gate CEACAM5-expression selection is non-admissible.",
        "SN-38 payload (labetuzumab govitecan) fails post-irinotecan \u2014 D1-biology franchise failure. The CDx pathway needs to route around post-irinotecan populations for SN-38 payload chemistries.",
        "On-target/off-tumor GI toxicity is a franchise-risk class-signal for CEACAM5 bispecifics (cibisatamab: diarrhea 55.8%, colitis 13.5%) \u2014 tolerability posture must front-load in CDx design.",
        "EU clinical hold on VKG linker + Topo1i chemistry (SGN-CEACAM5C) is an active franchise-regulatory-risk audit item on the class.",
      ],
    },
    trials: [
      {
        nctId: "NCT04154956",
        trialName: "CARMEN-LC03",
        drug: "Tusamitamab ravtansine (SAR408701) \u2014 anti-CEACAM5 ADC, DM4 payload",
        sponsor: "Sanofi",
        indication: "2L+ NSCLC",
        phase: "III",
        status: "FAILED December 2023",
        primaryResult: "PFS HR 1.14 (95% CI 0.86\u20131.51; P=0.8204) \u2014 primary endpoint not met. CEACAM5 50\u201379% PFS HR 1.38 (numerically harmful). CEACAM5 \u226580% OS HR 0.71 (post-hoc, CI not published).",
        primaryMet: "NO",
      },
      {
        nctId: "NCT05464030",
        trialName: "PROCEADE-CRC-01",
        drug: "Precemtabart tocentecan (M9140) \u2014 anti-CEACAM5 ADC, exatecan payload",
        sponsor: "Immunomedics / Gilead",
        indication: "3L+ mCRC",
        phase: "I (Phase III planned)",
        status: "ACTIVE",
        primaryResult: "Confirmed ORR 7.5% (3/40); mPFS 5.9 months (95% CI 4.6\u20137.2). CEACAM5 IHC not predictive: Spearman rho = \u22120.14 (P=0.4). MTD 2.8 mg/kg Q3W.",
        primaryMet: "PARTIAL \u2014 ORR 7.5% in heavily pre-treated population",
      },
      {
        nctId: "NCT01270698",
        trialName: "Labetuzumab govitecan (IMMU-130)",
        drug: "Anti-CEACAM5 ADC, SN-38 payload",
        sponsor: "Immunomedics",
        indication: "3L+ mCRC",
        phase: "I/II",
        status: "COMPLETED",
        primaryResult: "ORR 1.2% (1/86 confirmed PR); mPFS 3.6 months; mOS 6.9 months",
        primaryMet: "NO",
      },
      {
        nctId: "NCT04826003",
        trialName: "Cibisatamab + FAP-4-1BBL (BP42675)",
        drug: "CEA-TCB bispecific T-cell engager + FAP-targeted 4-1BB agonist",
        sponsor: "Roche/Genentech",
        indication: "3L+ MSS mCRC",
        phase: "Ib",
        status: "COMPLETED",
        primaryResult: "Confirmed ORR 13.5% (7/52; 95% CI 6\u201326); DCR 50%; confirmed CD8+ T-cell infiltration. On-target/off-tumor GI toxicity: diarrhea 55.8%, colitis 13.5%, fatal CMV colitis (1 patient).",
        primaryMet: "PARTIAL \u2014 ORR 13.5% with significant toxicity",
      },
      {
        nctId: "NCT06131840",
        trialName: "Tusamitamab sonditecan (SGN-CEACAM5C)",
        drug: "Anti-CEACAM5 ADC, Topo1i payload, VKG linker",
        sponsor: "Seagen / Pfizer",
        indication: "Advanced solid tumors including CRC",
        phase: "I",
        status: "EU CLINICAL HOLD 2026 \u2014 France, Spain, Sweden, Netherlands",
        primaryResult: "No efficacy data published \u2014 EU hold before efficacy readout",
        primaryMet: "N/A \u2014 EU hold",
      },
    ],
  },
  {
    programId: "IO_CORE",
    slug: "mss-crc-io-core",
    order: 2,
    name: "MSS CRC Immunotherapy Core Failure Corpus",
    headline: "7-trial MSS CRC IO failure corpus \u2014 the definitive evidence base for why immunotherapy fails in MSS colorectal cancer and the 3 conditions under which it doesn't: non-liver-metastatic disease, pTMB \u226528, and immune-inflamed tumor microenvironment.",
    indicationFocus: "1L\u2013refractory MSS/pMMR metastatic CRC across 7 trials spanning vaccine, CPI, MEKi+CPI, and combination IO strategies",
    ipValue: "Primary comparator corpus for the active 1L MSS mCRC vaccine engagement. Defines the 3 conditions for IO benefit in MSS CRC and the 4 design gaps in the active 1L MSS mCRC vaccine engagement.",
    preview: "io",
    gated: false,
    personaCopy: {
      patient: {
        name: "Why immunotherapy has not worked for the common form of colon cancer",
        headline: "Immunotherapy has been a big success for many cancers \u2014 but for the most common kind of colon cancer, called MSS, it usually does not work. Seven clinical trials tried different ways to fix that, and most of them failed. Looking at all seven together, three specific conditions matter for a patient to benefit: their cancer must NOT have spread to the liver, the tumor must carry a lot of mutations (a specific blood-test signal called pTMB above 28), and the tumor must already look 'immune-active' when examined. Without those three, immunotherapy in this cancer is unlikely to help.",
        indicationFocus: "Failed immunotherapy trials for the common (MSS/pMMR) form of colon cancer that has spread \u2014 across first-line, later-line, and refractory settings. Includes vaccine, checkpoint-inhibitor, MEK-inhibitor combos, and multi-drug immunotherapy combinations.",
        ipValue: "This is the primary comparator library for the active vaccine trial partner. It defines the three conditions under which immunotherapy CAN work in MSS colon cancer, and the four design gaps in the current vaccine trial.",
      },
      pharma: {
        name: "MSS mCRC IO franchise-failure corpus",
        headline: "Seven-trial MSS mCRC IO franchise-failure corpus \u2014 audit-trail-grade evidence base for MSS-CRC IO non-response, with three franchise-fit conditions extracted from convergent trial evidence: non-liver-metastatic anatomy, pTMB \u226528 gate, and immune-inflamed TME substrate.",
        indicationFocus: "1L through refractory MSS/pMMR mCRC across 7 trials \u2014 vaccine, CPI, MEKi+CPI, and combination IO strategies. Pan-line-of-therapy IO franchise footprint.",
        ipValue: "Primary comparator corpus for the active 1L MSS mCRC vaccine franchise engagement. Defines the three franchise-fit conditions for IO benefit in MSS CRC and the four design-gap-derisk items on the active franchise audit trail.",
      },
    },
    keyFindings: [
      {
        id: "IO-F1",
        title: "Pharmacodynamic T-cell responses do not translate to clinical benefit in MSS CRC",
        description: "GVAX (ORR 0% despite confirmed T-cell responses) and QUILT-2.004 (HR 1.061 despite CEA-specific T cells generated) both demonstrate that peripheral immune activation does not equal intratumoral effector function in MSS CRC.",
        source: "Yarchoan et al. Cancer Med 2019; Redman et al. Oncologist 2022",
      },
      {
        id: "IO-F2",
        title: "MEK inhibition does not convert MSS CRC to immunogenic (Phase III confirmed)",
        description: "IMblaze370 (Phase III, N=363): OS no significant difference across atezolizumab + cobimetinib vs atezolizumab vs regorafenib. MEK inhibition definitively fails to overcome MSS CRC immune exclusion.",
        source: "Eng et al. Lancet Oncol 2019",
      },
      {
        id: "IO-F3",
        title: "pTMB \u226528 is the strongest IO enrichment signal in MSS CRC from a randomized trial",
        description: "CO.26 pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022). pTMB median 15.3 mut/Mb (IQR 9.5\u201326.2). Tissue TMB \u226510 OS HR=0.71 (p=0.47) \u2014 NOT predictive. pTMB \u2194 tissue TMB Spearman r=0.13 (P=0.20).",
        source: "Loree et al. Clin Cancer Res 2024 (PMID 38727700); Chen et al. JAMA Oncol 2020",
      },
      {
        id: "IO-F4",
        title: "Liver metastasis abolishes IO benefit \u2014 Pint=0.02 in randomized data",
        description: "CO.26: liver-met PFS HR=1.39 (90% CI 1.02\u20131.90) vs no-LM PFS HR=0.54 (90% CI 0.35\u20130.96); Pint=0.02. REGONIVO US: 0/5 liver-met responders vs 22% NLM ORR (5/23). RIN: NLM ORR ~40% vs liver-met ORR ~5%.",
        source: "Chen et al. JAMA Oncol 2020 (PMC10698621); Fakih et al. EClinicalMedicine 2023",
      },
    ],
    transferLessons: [
    ],
    trials: [
      {
        nctId: "NCT03050814",
        trialName: "QUILT-2.004",
        drug: "AdCEA vaccine + avelumab + mFOLFOX6 + bevacizumab",
        sponsor: "ImmunGene/NantKwest",
        indication: "1L MSS mCRC",
        phase: "II",
        status: "TERMINATED for futility",
        primaryResult: "PFS HR 1.061 (95% CI 0.380\u20132.966, p=0.91)",
        primaryMet: "NO",
      },
      {
        nctId: "NCT05141721",
        trialName: "GRANITE GO-010",
        drug: "Personalized neoantigen vaccine + nivolumab + ipilimumab + FP + bevacizumab (maintenance)",
        sponsor: "Gritstone bio (Chapter 11 bankruptcy Oct 2024)",
        indication: "1L MSS mCRC maintenance",
        phase: "II",
        status: "INTERIM \u2014 company bankrupt",
        primaryResult: "HR 0.73 (90% CI 0.44\u20131.21) \u2014 CI crosses 1.0; ctDNA-low subgroup HR 0.50 (exploratory)",
        primaryMet: "INTERIM \u2014 CI crosses 1.0",
      },
      {
        nctId: "NCT02981524",
        trialName: "GVAX + Cyclophosphamide + Pembrolizumab",
        drug: "Allogeneic whole-cell vaccine (GVAX) + low-dose cyclophosphamide + pembrolizumab",
        sponsor: "Johns Hopkins / MSD",
        indication: "Refractory MSS mCRC",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "ORR 0% (0/22) despite confirmed T-cell responses",
        primaryMet: "NO",
      },
      {
        nctId: "NCT02788279",
        trialName: "IMblaze370",
        drug: "Atezolizumab + cobimetinib vs atezolizumab vs regorafenib",
        sponsor: "Roche/Genentech",
        indication: "3L+ MSS mCRC",
        phase: "III",
        status: "COMPLETED",
        primaryResult: "OS no significant difference across all 3 arms \u2014 MEK inhibition definitively fails to convert MSS CRC to immunogenic",
        primaryMet: "NO",
      },
      {
        nctId: "NCT03721653",
        trialName: "AtezoTRIBE",
        drug: "FOLFOXIRI + bevacizumab \u00b1 atezolizumab",
        sponsor: "GONO / Roche",
        indication: "1L mCRC",
        phase: "III",
        status: "COMPLETED",
        primaryResult: "pMMR PFS HR 0.86 (95% CI 0.63\u20131.17) \u2014 NOT significant. Immunoscore-IC high subgroup HR ~0.50 (exploratory).",
        primaryMet: "NO (pMMR)",
      },
      {
        nctId: "NCT03202758",
        trialName: "MEDITREME",
        drug: "Durvalumab + tremelimumab + mFOLFOX6",
        sponsor: "AstraZeneca / GERCOR",
        indication: "1L MSS mCRC",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "mPFS 8.2 months; ORR 64.5% (uncontrolled \u2014 consistent with mFOLFOX6 alone). CD8-high + TGF-\u03b2-low subgroup showed better outcomes.",
        primaryMet: "UNCONTROLLED \u2014 cannot separate IO contribution from backbone",
      },
      {
        nctId: "NCT02870920",
        trialName: "CCTG CO.26",
        drug: "Durvalumab + tremelimumab + BSC vs BSC",
        sponsor: "CCTG / AstraZeneca",
        indication: "Refractory MSS mCRC",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "OS HR 0.73 (90% CI 0.55\u20130.97, p=0.07) \u2014 marginal. pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022). Liver-met PFS HR=1.39 vs no-LM PFS HR=0.54; Pint=0.02.",
        primaryMet: "MARGINAL (p=0.07)",
      },
    ],
  },
  {
    programId: "ATR_DDR",
    slug: "atr-ddr",
    order: 3,
    name: "ATR/DDR Inhibitor Failure Corpus",
    headline: "5-trial ATR/DDR failure corpus with decoded selection failure modes \u2014 identifies the biomarker gate that all 3 completed trials missed and the responder subpopulations that existed within each failure.",
    indicationFocus: "Ovarian cancer (3 trials), NSCLC (1 trial), mixed solid tumors (1 trial) \u2014 ATR inhibitors and WEE1 inhibitors in DDR-deficient populations",
    ipValue: "GLB set \u2014 6-trial IP valuation graveyard corpus. ATR/DDR contributes 4 of 6 GLB trials. Estimated decoded trial value: $1.95B in failed program investment.",
    preview: "ddr",
    gated: false,
    personaCopy: {
      patient: {
        name: "Trials of DNA-repair-blocking drugs that failed \u2014 but had real responders hidden inside",
        headline: "Five clinical trials tested drugs that block a cancer's DNA-repair machinery. On paper, each trial looked like a failure \u2014 the tumors overall did not respond. But when we look inside each trial, there are patients who DID respond very well. The pattern: the trials enrolled the wrong patients. In each trial, there is a specific patient signal (a biomarker) that the trial should have used to pick who to enroll. Without that filter, the responders got hidden in a bigger group of non-responders.",
        indicationFocus: "Failed trials in ovarian cancer (three trials), non-small-cell lung cancer (one trial), and mixed solid tumors (one trial) \u2014 all testing drugs that block a specific DNA-repair enzyme called ATR, or a related one called WEE1.",
        ipValue: "This is the graveyard set \u2014 six trials that together represent about $1.95 billion in failed drug-program investment. This corpus is used to explain to pharma partners how a better patient-picking rule could have made these trials succeed.",
      },
      pharma: {
        name: "ATR/DDR franchise-failure corpus",
        headline: "Five-trial ATR/DDR franchise-failure corpus with decoded selection-failure modes \u2014 identifies the biomarker gate that all three completed trials missed and the responder subpopulations hidden inside each ITT failure. Audit-trail-grade franchise substrate call.",
        indicationFocus: "Ovarian (3), NSCLC (1), mixed solid tumors (1) \u2014 ATR and WEE1 inhibitor franchises in DDR-deficient substrate populations.",
        ipValue: "GLB set \u2014 six-trial IP-valuation graveyard corpus. ATR/DDR contributes 4 of 6 GLB trials. Estimated decoded franchise value: $1.95B in failed program investment. Franchise-audit anchor for ATR/DDR substrate re-underwrite.",
      },
    },
    keyFindings: [
      {
        id: "ATR-F1",
        title: "RS-High is the ATR responder gate",
        description: "Berzosertib (M6620) ORR 40% in RS-High vs 5% in RS-Low. Responders existed within the failed ITT population \u2014 the trial failed because RS-High patients were not pre-selected.",
        source: "Yap et al. Cancer Discov 2020 (NCT02595892)",
      },
      {
        id: "ATR-F2",
        title: "PTEN-loss is the WEE1i resistance marker",
        description: "Adavosertib (AZD1775) ORR 0% in PTEN-loss vs 23% in PTEN-intact; PFS HR 1.82 (PTEN-loss) vs 0.55 (PTEN-intact). PTEN status is a mandatory exclusion criterion for WEE1i programs.",
        source: "Lheureux et al. Clin Cancer Res 2021 (NCT03579316)",
      },
      {
        id: "ATR-F3",
        title: "PARPi-naive status is the ATRi+PARPi responder gate",
        description: "CAPRI: PARPi-naive ORR 36% vs post-PARPi ORR 4%; PFS HR 0.42 (PARPi-naive) vs 1.31 (post-PARPi). Prior PARPi exposure is a mandatory stratification variable for ATRi+PARPi combinations.",
        source: "Yap et al. JCO 2023 (NCT03462342)",
      },
      {
        id: "ATR-F4",
        title: "Ceralasertib + durvalumab (ATRi + PD-L1) \u2014 under continued analysis",
        description: "This trial is under continued canon-alignment review. On-page display is deferred until governance clears the delta magnitude for external publication.",
        source: "Under review",
      },
    ],
    transferLessons: [
      "Any ATR inhibitor program must pre-specify RS-High enrollment criterion",
      "Any WEE1 inhibitor program must exclude PTEN-loss patients",
      "ATRi + PARPi combinations must stratify by prior PARPi exposure",
      "ITT enrollment in DDR-deficient populations dilutes the responder signal by 5\u20138x",
    ],
    transferLessonsByPersona: {
      patient: [
        "Any future trial of an ATR-blocking drug must decide upfront which patients count as \u201chigh replication stress\u201d (a specific tumor property) and only enroll those patients. Not deciding upfront is why the earlier trials failed.",
        "Any future trial of a WEE1-blocking drug must leave out patients whose tumors have lost the PTEN gene \u2014 those tumors do not respond and dilute the result.",
        "For trials combining ATR- and PARP-blockers, patients who have already tried PARP-blockers behave differently and need to be tracked in a separate group; not doing so mixes two very different biologies.",
        "If a trial enrolls all comers in a DNA-repair-defective population instead of picking the specific responders, the small responder signal gets diluted by a factor of 5 to 8 \u2014 which turns a real positive result into a failed trial on paper.",
      ],
      pharma: [
        "Franchise-audit rule for ATR inhibitor programs: replication-stress-high (RS-High) enrollment is a pre-specified admissibility gate. Without it the franchise-fit call is non-admissible on the audit trail.",
        "Franchise-audit rule for WEE1 inhibitor programs: PTEN-loss populations are excluded on the substrate call. PTEN-loss dilutes the franchise-fit signal on the audit trail.",
        "ATRi + PARPi combination franchises stratify by prior PARPi exposure on the franchise-fit matrix; unstratified enrollment mixes two distinct substrate biologies on the audit trail.",
        "ITT enrollment in DDR-deficient substrate dilutes the responder signal by 5\u20138\u00d7 on the franchise-fit read \u2014 a positive substrate call at the responder level renders negative at the ITT-level franchise footprint.",
      ],
    },
    trials: [
      {
        nctId: "NCT02595892",
        trialName: "Berzosertib (M6620) Phase I/II",
        drug: "Berzosertib (M6620, ATRi) + gemcitabine",
        sponsor: "Merck KGaA / EMD Serono",
        indication: "Ovarian cancer",
        phase: "I/II",
        status: "COMPLETED",
        primaryResult: "RS-High ORR 40% vs RS-Low ORR 5%",
        primaryMet: "SUBGROUP \u2014 ITT not powered for efficacy",
      },
      {
        nctId: "NCT03579316",
        trialName: "Adavosertib (AZD1775) Phase II",
        drug: "Adavosertib (AZD1775, WEE1i) + gemcitabine",
        sponsor: "AstraZeneca",
        indication: "Ovarian cancer",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "PTEN-intact ORR 23% vs PTEN-loss ORR 0%; PFS HR 0.55 (PTEN-intact) vs 1.82 (PTEN-loss)",
        primaryMet: "SUBGROUP \u2014 PTEN-intact only",
      },
      {
        nctId: "NCT03462342",
        trialName: "CAPRI Phase II",
        drug: "Ceralasertib (ATRi) + olaparib (PARPi)",
        sponsor: "AstraZeneca",
        indication: "Ovarian cancer",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "PARPi-naive ORR 36% vs post-PARPi ORR 4%; PFS HR 0.42 (PARPi-naive) vs 1.31 (post-PARPi)",
        primaryMet: "SUBGROUP \u2014 PARPi-naive only",
      },
      {
        nctId: "NCT05450692",
        trialName: "LATIFY",
        drug: "Ceralasertib (ATRi) + durvalumab (anti-PD-L1)",
        sponsor: "AstraZeneca",
        indication: "NSCLC",
        phase: "II",
        status: "COMPLETED",
        primaryResult: "QUARANTINED \u2014 delta version conflict unresolved",
        primaryMet: "QUARANTINED",
      },
      {
        nctId: "NCT02264678",
        trialName: "Ceralasertib + Olaparib Phase I/Ib",
        drug: "Ceralasertib (ATRi) + olaparib (PARPi)",
        sponsor: "AstraZeneca",
        indication: "Mixed solid tumors",
        phase: "I/Ib",
        status: "COMPLETED",
        primaryResult: "MISSING \u2014 Patient B vector not defined; delta cannot be computed",
        primaryMet: "MISSING",
      },
    ],
  },
  {
    programId: "IO_APPENDIX",
    slug: "mss-crc-io-supporting",
    order: 4,
    name: "MSS CRC Immunotherapy Supporting Evidence Corpus",
    headline: "15-trial supporting IO corpus covering MSI-H positive controls, liver metastasis stratification evidence, vaccine T-cell pharmacodynamic dissociation, and the ongoing Phase III landscape \u2014 providing the full boundary conditions for IO benefit in CRC.",
    indicationFocus: "CRC across all lines and MSI status \u2014 positive controls (MSI-H), liver metastasis stratification (REGONIVO, RIN), vaccine pharmacodynamics (PolyPEPI1018, GVAX+guadecitabine, PANVAC), TGF-\u03b2/VEGF combinations (MODUL, bintrafusp alfa), and ongoing Phase III (STELLAR-303)",
    ipValue: "Supporting evidence for the active 1L MSS mCRC vaccine engagement design gap analysis and the 3 conditions for IO benefit in MSS CRC.",
    preview: "io",
    gated: false,
    personaCopy: {
      patient: {
        name: "Supporting evidence for what does and does not work with immunotherapy in colon cancer",
        headline: "Fifteen additional colon-cancer trials that fill in the picture around immunotherapy. Some are positive controls (trials in the rarer MSI-high type where immunotherapy DOES work). Others explore the liver-metastasis question in more detail, the disconnect between what a vaccine does to blood immune cells versus what happens inside the tumor, and combinations with other drugs. Together with the core failure corpus, this gives the full map of when immunotherapy in colon cancer is likely to help and when it is not.",
        indicationFocus: "Colon cancer across all treatment lines and both MSI types. Includes trials where immunotherapy works (MSI-high controls), trials that show how the location of the tumor's spread matters (REGONIVO, RIN), vaccine trials where the immune system responded in the blood but not in the tumor (PolyPEPI1018, GVAX + guadecitabine, PANVAC), and combinations with TGF-\u03b2 or VEGF blockers.",
        ipValue: "Supporting evidence for the design-gap review of the active vaccine trial partner, and for the three conditions under which immunotherapy CAN work in this cancer.",
      },
      pharma: {
        name: "MSS CRC IO franchise-supporting evidence corpus",
        headline: "15-trial IO franchise-supporting corpus \u2014 boundary conditions for IO in CRC: MSI-H positive-control franchises, liver-metastasis stratification receipts, vaccine-PD-dissociation audit, TGF-\u03b2/VEGF combo franchise reads, and the ongoing Phase III landscape.",
        indicationFocus: "CRC across all treatment lines and MSI status. Includes MSI-H positive-control franchises (KEYNOTE-177, CheckMate 142), liver-metastasis stratification substrate (REGONIVO US + JP, RIN), vaccine-PD-dissociation audit (PolyPEPI1018, GVAX+guadecitabine, PANVAC), TGF-\u03b2/VEGF combo franchises (MODUL, bintrafusp alfa), and ongoing Phase III (STELLAR-303).",
        ipValue: "Franchise-audit supporting evidence for the active 1L MSS mCRC vaccine engagement's design-gap read, and for the three franchise-fit conditions for IO benefit in MSS CRC.",
      },
    },
    keyFindings: [
    ],
    transferLessons: [
    ],
    trials: [
      {
        nctId: "NCT02563002",
        trialName: "KEYNOTE-177",
        drug: "Pembrolizumab vs chemotherapy",
        sponsor: '',
        indication: "1L MSI-H mCRC",
        phase: '',
        status: '',
        primaryResult: "PFS HR 0.60; OS HR 0.74 \u2014 POSITIVE. Definitive positive control for MSI-H.",
        primaryMet: "",
      },
      {
        nctId: "NCT02060188",
        trialName: "CheckMate 142",
        drug: "Nivolumab \u00b1 ipilimumab",
        sponsor: '',
        indication: "MSS and MSI-H mCRC",
        phase: '',
        status: '',
        primaryResult: "MSS cohort ORR 0% (n=74). MSI-H ORR 31% mono, 55% combo.",
        primaryMet: "",
      },
      {
        nctId: "EPOC1603",
        trialName: "REGONIVO (Japan)",
        drug: "Regorafenib + nivolumab",
        sponsor: '',
        indication: "MSS mCRC (Japan)",
        phase: '',
        status: '',
        primaryResult: "CRC cohort (n=24 MSS): ORR 33%, mPFS 6.3 months. All 8 responders had NO liver metastases.",
        primaryMet: "",
      },
      {
        nctId: "NCT04126733",
        trialName: "REGONIVO Phase 2 (US)",
        drug: "Regorafenib + nivolumab",
        sponsor: '',
        indication: "MSS mCRC (US)",
        phase: '',
        status: '',
        primaryResult: "ORR 7% (5/70). All 5 responders had NO liver metastases. Non-liver-met ORR 22% (5/23). Liver-met ORR 0% (0/5).",
        primaryMet: "",
      },
      {
        nctId: "NCT04362839",
        trialName: "RIN (Regorafenib + Ipilimumab + Nivolumab)",
        drug: "Regorafenib + ipilimumab + nivolumab",
        sponsor: '',
        indication: "MSS mCRC",
        phase: '',
        status: '',
        primaryResult: "ORR 27.6% overall; NLM cohort ORR ~40%; liver-met ORR ~5%. Median OS 20 months in NLM cohort.",
        primaryMet: "",
      },
      {
        nctId: "NCT02291289",
        trialName: "MODUL Cohort 2",
        drug: "Atezolizumab + bevacizumab maintenance",
        sponsor: '',
        indication: "1L pMMR mCRC maintenance",
        phase: '',
        status: '',
        primaryResult: "PFS HR 1.04 (95% CI 0.77\u20131.40) \u2014 no benefit. OS HR 0.91 \u2014 no benefit. All biomarker subgroups negative.",
        primaryMet: "",
      },
      {
        nctId: "NCT03374254",
        trialName: "KEYNOTE-651 Cohorts B & D",
        drug: "Pembrolizumab + mFOLFOX6 \u00b1 bevacizumab",
        sponsor: '',
        indication: "1L MSS mCRC",
        phase: '',
        status: '',
        primaryResult: "Cohort B ORR 23% (1L, includes chemo response). Cohort D ORR 7%. No MSS-specific IO signal identified.",
        primaryMet: "",
      },
      {
        nctId: "NCT03539822",
        trialName: "CAMILLA CRC",
        drug: "Camrelizumab + FOLFOX",
        sponsor: '',
        indication: "MSS mCRC",
        phase: '',
        status: '',
        primaryResult: "ORR 27.6% (8/29 evaluable). Median OS 9.1 months. Post-hoc: patients without liver metastases had better outcomes.",
        primaryMet: "",
      },
      {
        nctId: "NCT03391232",
        trialName: "PolyPEPI1018",
        drug: "Personalized peptide vaccine",
        sponsor: '',
        indication: "Refractory mCRC",
        phase: '',
        status: '',
        primaryResult: "T-cell responses to \u22651 antigen in 100% of patients. No objective responses. Stable disease in some patients.",
        primaryMet: "",
      },
      {
        nctId: "NCT02998879",
        trialName: "GVAX + Guadecitabine",
        drug: "GVAX + guadecitabine (DNMT inhibitor)",
        sponsor: '',
        indication: "Refractory mCRC",
        phase: '',
        status: '',
        primaryResult: "No T-cell increase; no objective responses.",
        primaryMet: "",
      },
      {
        nctId: "NCT00103142",
        trialName: "PANVAC + DC vaccine",
        drug: "PANVAC (CEA/MUC1 poxviral vaccine) + dendritic cell vaccine",
        sponsor: '',
        indication: "Refractory mCRC",
        phase: '',
        status: '',
        primaryResult: "No OS benefit; T-cell responses >70% of patients.",
        primaryMet: "",
      },
      {
        nctId: "NCT04853017",
        trialName: "AMPLIFY-201",
        drug: "mKRAS-specific neoantigen vaccine",
        sponsor: '',
        indication: "KRAS-mutant solid tumors including CRC",
        phase: '',
        status: '',
        primaryResult: "ctDNA clearance in 3/5 CRC patients. mKRAS-specific T-cell responses confirmed.",
        primaryMet: "",
      },
      {
        nctId: "NCT02562755",
        trialName: "PexaVec + Durvalumab \u00b1 Tremelimumab",
        drug: "Pexastimogene devacirepvec (oncolytic vaccinia) + durvalumab \u00b1 tremelimumab",
        sponsor: '',
        indication: "MSS mCRC",
        phase: '',
        status: '',
        primaryResult: "ORR 0% (0/21).",
        primaryMet: "",
      },
      {
        nctId: "NCT02517398",
        trialName: "Bintrafusp Alfa in CRC",
        drug: "Bintrafusp alfa (anti-PD-L1 + TGF-\u03b2 trap)",
        sponsor: '',
        indication: "Refractory CRC",
        phase: '',
        status: '',
        primaryResult: "ORR 0% (n=30).",
        primaryMet: "",
      },
      {
        nctId: "NCT05425940",
        trialName: "STELLAR-303",
        drug: "Zanzalintinib (XL092, MET/VEGFR2/AXL inhibitor) + atezolizumab vs regorafenib",
        sponsor: '',
        indication: "3L+ MSS mCRC",
        phase: "III",
        status: "ONGOING \u2014 no results available",
        primaryResult: "",
        primaryMet: "",
      },
    ],
  },
  {
    programId: "HISTORICAL_BENCHMARKS",
    slug: "mfolfox6-benchmarks",
    order: 5,
    name: "mFOLFOX6 \u00b1 Bevacizumab Backbone Benchmark Set",
    headline: "6-entry mFOLFOX6 \u00b1 bevacizumab backbone benchmark set \u2014 the control arm expectations for the active 1L MSS mCRC vaccine engagement and any 1L MSS mCRC trial adding an investigational agent to standard chemotherapy.",
    indicationFocus: "mFOLFOX6 \u00b1 bevacizumab benchmark set (1L MSS mCRC)",
    ipValue: "Control arm expectations for any 1L MSS mCRC trial",
    preview: "benchmark",
    gated: false,
    personaCopy: {
      patient: {
        name: "How well standard chemotherapy already works in this cancer",
        headline: "Six trials in the same kind of colon cancer, all using the standard chemotherapy of the field (called mFOLFOX6, sometimes with an added drug called bevacizumab). These trials tell us what the current baseline is: how long patients typically live, how often the tumor shrinks, how long the treatment holds. Any new drug added to this chemotherapy has to beat these numbers to matter \u2014 that is what a partner needs to know before adding their drug to this backbone.",
        indicationFocus: "The standard chemotherapy backbone (mFOLFOX6, sometimes with bevacizumab) tested in first-line MSS colon cancer that has spread.",
        ipValue: "The control-arm reference point for any first-line MSS colon-cancer trial that adds a new drug to standard chemotherapy \u2014 including the active vaccine engagement.",
      },
      pharma: {
        name: "mFOLFOX6 \u00b1 bev backbone benchmark set",
        headline: "Six-entry mFOLFOX6 \u00b1 bevacizumab backbone benchmark set \u2014 control-arm expectations for the active 1L MSS mCRC vaccine franchise engagement and for any 1L MSS mCRC trial adding an investigational agent to standard chemotherapy backbone. Franchise-audit-grade benchmark set.",
        indicationFocus: "mFOLFOX6 \u00b1 bevacizumab benchmark set for 1L MSS mCRC franchise footprint.",
        ipValue: "Control-arm expectation reference for any 1L MSS mCRC franchise trial adding an investigational agent to standard chemotherapy backbone \u2014 franchise-audit anchor for backbone-competition risk.",
      },
    },
    keyFindings: [
    ],
    transferLessons: [
    ],
    trials: [
      {
        nctId: "TRIBE2 control arm",
        trialName: "TRIBE2 control arm",
        drug: "mFOLFOX6 + bev \u2192 FOLFIRI + bev",
        sponsor: "\u2014",
        indication: "Unresectable mCRC; 64% RAS-mutant",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS 9.8 mo (95% CI 9.0\u201310.5) \u00b7 ORR 50% \u00b7 mOS 22.5 mo",
        primaryMet: "",
      },
      {
        nctId: "BECOME (bev arm)",
        trialName: "BECOME (bev arm)",
        drug: "mFOLFOX6 + bev",
        sponsor: "\u2014",
        indication: "RAS-mutant; liver-limited only",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS 9.5 mo \u00b7 ORR 54.5% \u00b7 mOS 25.7 mo",
        primaryMet: "",
      },
      {
        nctId: "NO16966 (FOLFOX4+bev arm)",
        trialName: "NO16966 (FOLFOX4+bev arm)",
        drug: "FOLFOX4 + bev",
        sponsor: "\u2014",
        indication: "1L mCRC",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS ~9.4 mo \u00b7 ORR ~38% \u00b7 mOS 21.0 mo",
        primaryMet: "",
      },
      {
        nctId: "OPTIMOX1 (FOLFOX4 arm)",
        trialName: "OPTIMOX1 (FOLFOX4 arm)",
        drug: "FOLFOX4 (no bev)",
        sponsor: "\u2014",
        indication: "1L mCRC",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS ~9.0 mo \u00b7 ORR ~58.5% \u00b7 mOS ~19.4 mo",
        primaryMet: "",
      },
      {
        nctId: "WJOG4407G (mFOLFOX6+bev arm)",
        trialName: "WJOG4407G (mFOLFOX6+bev arm)",
        drug: "mFOLFOX6 + bev",
        sponsor: "\u2014",
        indication: "Japanese 1L mCRC",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS ~11.7 mo \u00b7 ORR ~64% \u00b7 mOS ~31.4 mo",
        primaryMet: "",
      },
      {
        nctId: "QUILT-2.004 (design precedent)",
        trialName: "QUILT-2.004 (design precedent)",
        drug: "mFOLFOX6 + bev + AdCEA vaccine + avelumab",
        sponsor: "\u2014",
        indication: "1L MSS mCRC",
        phase: "\u2014",
        status: "BENCHMARK",
        primaryResult: "mPFS HR 1.061 \u2014 TERMINATED \u00b7 ORR N/A (terminated) \u00b7 mOS N/A (terminated)",
        primaryMet: "",
      },
    ],
  },
  {
    programId: "BREAK_CRC_001",
    slug: "active-mss-crc-engagement",
    order: 6,
    name: "Active Engagement \u2014 1L MSS mCRC Vaccine Program",
    headline: "Active mechanism-alignment engagement supporting a Phase I/II 1L MSS mCRC vaccine trial. Fit analysis, design-risk inventory, and 22-trial comparator context. Client name, drug name, and program specifics are gated.",
    indicationFocus: "1L MSS/pMMR metastatic CRC (client program)",
    ipValue: "Confidential engagement \u2014 anchored on the CrisPRO mechanism alignment layer applied to a live 1L MSS mCRC vaccine program.",
    preview: "active",
    gated: true,
    personaCopy: {
      patient: {
        name: "Live work \u2014 first-line vaccine trial in colon cancer",
        headline: "Right now, CrisPRO is actively helping a Phase I/II clinical trial that is testing a vaccine in first-line MSS colon cancer. We are checking whether the biology of the trial's design is likely to work, listing the specific risks in the design, and comparing it against 22 other trials in the same space. The client's name, the drug's name, and the specific numbers are confidential.",
        indicationFocus: "First-line MSS colon cancer that has spread \u2014 a live partner trial.",
        ipValue: "Confidential engagement. The value CrisPRO brings is the mechanism-alignment layer applied to a live vaccine program \u2014 does the trial design make biological sense, what should be added, what should be dropped.",
      },
      pharma: {
        name: "Active franchise engagement \u2014 1L MSS mCRC vaccine",
        headline: "Active franchise-alignment engagement supporting a Phase I/II 1L MSS mCRC vaccine trial. Mechanism-fit read, four-gap design-risk inventory, and 22-trial franchise comparator context. Client name, asset name, and franchise specifics are gated under NDA.",
        indicationFocus: "1L MSS/pMMR mCRC (client franchise) \u2014 confidential live engagement.",
        ipValue: "Confidential franchise engagement \u2014 anchored on the CrisPRO mechanism-alignment audit layer applied to a live 1L MSS mCRC vaccine franchise. Franchise-audit-grade receipt trail under NDA.",
      },
    },
    keyFindings: [
      {
        id: "ACTIVE-F1",
        title: "Mechanism alignment fit computed under confidentiality",
        description: "Fit against the 1L MSS mCRC vaccine target vector yields a MODERATE alignment consistent with the underlying IO-restrictive biology of this indication. Specific fit values are gated.",
        source: "Internal engagement \u2014 details gated",
      },
      {
        id: "ACTIVE-F2",
        title: "4-gap design-risk inventory delivered",
        description: "Design gaps identified across immune-inflamed selection, liver-metastasis stratification, on-treatment PD readouts, and IO permissiveness. Deliverable is under NDA.",
        source: "Internal engagement \u2014 details gated",
      },
    ],
    transferLessons: [
      "Vaccine programs in MSS CRC must layer immune-permissiveness selection on top of tumor-antigen presentation",
      "Historical mFOLFOX6 \u00b1 bevacizumab benchmarks constrain the plausible efficacy window",
      "Liver-metastatic subsets consistently underperform non-liver subsets in MSS CRC IO trials",
    ],
    transferLessonsByPersona: {
      patient: [
        "A vaccine for MSS colon cancer has to do two things, not one \u2014 the vaccine has to teach the immune system about the tumor, AND the tumor has to be in a state where the immune system can actually enter it. Only doing the first is not enough.",
        "Standard chemotherapy in this cancer already produces a known survival window. A new drug added on top has to beat that window to matter \u2014 that sets a realistic bar for the trial.",
        "Patients whose colon cancer has spread to the liver do worse with immunotherapy than patients whose cancer has spread elsewhere. Trials in this space should track those two groups separately.",
      ],
      pharma: [
        "Vaccine franchises in MSS CRC layer IO-permissiveness selection ON TOP of tumor-antigen presentation. Antigen-only franchise-fit is non-admissible on the substrate call.",
        "Historical mFOLFOX6 \u00b1 bevacizumab benchmarks constrain the plausible efficacy window on the franchise-audit trail \u2014 any 1L MSS mCRC franchise addition has to clear the backbone benchmark ceiling.",
        "Liver-metastatic substrate consistently underperforms non-liver substrate in MSS CRC IO franchises \u2014 franchise-fit stratification requires liver-vs-non-liver split on the audit trail.",
      ],
    },
    trials: [
    ],
  },
];

export function getLedgerProgram(slug: string): LedgerProgram | null {
  return LEDGER_PROGRAMS.find((p) => p.slug === slug) ?? null;
}

/**
 * Return the transferLessons array for a program under the requested
 * persona. Falls back to the English root (outer `transferLessons`)
 * when no persona-specific array is present. Consumers should call
 * this instead of reading `program.transferLessons` directly on any
 * persona-aware surface.
 */
export function getLedgerTransferLessons(
  program: LedgerProgram,
  persona: Persona,
): string[] {
  return program.transferLessonsByPersona?.[persona] ?? program.transferLessons;
}
