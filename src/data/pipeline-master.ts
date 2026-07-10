/**
 * pipeline-master.ts
 * SOURCE: crispro_master_pipeline.json vv1.0 (2026-06-30)
 * Do not edit by hand — regenerated from JSON by W2 codemod.
 */

export interface PipelineTrial {
  trial_id: string;
  nct: string;
  drug: string;
  phase: string;
  indication: string;
  status: string;
  outcome: string;
  primary_met: string | null;
  failure_mode: string;
  key_biomarker: string;
  sponsor: string;
  /**
   * Numeric fit-delta OR governance sentinel (`"QUARANTINED"`, `"MISSING"`).
   * PATH A locked 2026-04-28 — quarantined rows carry the sentinel string
   * per governance instead of a computed number.
   */
  delta: number | string | null;
  delta_status: string;
  published_source: string;
}

export interface PipelineKeyFinding {
  finding_id: string;
  title: string;
  description: string;
  source: string;
  verified: boolean;
  /** Optional annotation surfaced in the findings tab. */
  caveat?: string;
  /** Optional governance overlay (e.g. quarantined findings). */
  governance?: string;
}

export interface PipelineProgram {
  program_id: string;
  program_name: string;
  program_number: number;
  trial_count: number;
  headline: string;
  indication_focus: string;
  ip_value: string;
  admissibility: string;
  key_findings: PipelineKeyFinding[];
  transfer_lessons: string[];
  trials: PipelineTrial[];
}

export const PIPELINE_META = {
  "file_id": "crispro_master_pipeline",
  "file_version": "v1.0",
  "generated_date": "2026-06-30",
  "generated_by": "CrisPRO \u2014 Brenus Pharma Engagement",
  "admissibility": "external_safe_except_where_noted",
  "governance_status": {
    "formula": "PATH_A_LOCKED",
    "formula_signed": "2026-04-28",
    "remediation": "8D_remediation_approved_2026-04-28",
    "blocking_items": [
      {
        "id": "DL-07",
        "status": "QUARANTINED",
        "description": "DDR figure per 8D quarantine \u2014 publication-blocking"
      },
      {
        "id": "PC-02",
        "status": "PERMANENTLY_DOWNGRADED",
        "description": "retroactive_prediction_run.py delta reproduction failure"
      },
      {
        "id": "SC-001",
        "status": "ACTIVE_CONFLICT",
        "description": "HT29 BRAF V600E \u2014 blocks L4 CLEAN"
      }
    ]
  },
  "total_programs": 7,
  "total_trials_decoded": 42,
  "total_dataset_analyses": 3,
  "active_engagements": 2,
  "note": "GBM EscapeMap program (Program 7) is internal_only. Governance section is internal_only. All other sections are external_safe."
} as const;

export const PIPELINE_PLATFORM = {
  "name": "CrisPRO",
  "full_name": "CrisPRO \u2014 AI-Driven Oncology Trial Intelligence Platform",
  "tagline": "Metastasis-interception AI \u2014 decoding the 8 steps of cancer spread",
  "mission": "Identify the patient populations and biological conditions under which oncology trials succeed or fail \u2014 before they cost $300M.",
  "core_system": {
    "name": "Two-Layer Drug Failure Prediction System",
    "description": "CrisPRO evaluates every oncology program across two independent failure axes. A trial can fail at Layer 1 (wrong target), Layer 2 (wrong patients), or both. Most expensive failures are Layer 2 \u2014 the target is real, but the enrolled population cannot respond.",
    "layer_1": {
      "name": "Target Biology (Target-Lock Score)",
      "question": "Is this gene a real driver of the cancer step being targeted?",
      "threshold": "Target-Lock \u2265 0.35 = genuine driver",
      "method": "Multi-modal evidence synthesis: DepMap essentiality, in vivo CRISPR screens, patient expression data, mechanistic literature",
      "validated_on": [
        "CEACAM5 (CARMEN-LC03)",
        "ATR (ceralasertib/LATIFY)",
        "ZEB1 (OV EscapeMap)"
      ]
    },
    "layer_2": {
      "name": "Patient Selection (Mechanism Fit)",
      "question": "Are the right patients being enrolled? Are their genomic and molecular profiles matched to the trial's mechanism of action?",
      "method": "CrisPRO PATH A formula: fit = clip((p\u00b7t) / \u2016t\u2016\u2082, 0, 1) \u2014 normalized dot-product of patient vector p and trial vector t, clipped to [0,1]",
      "formula": "fit = clip((p\u00b7t) / \u2016t\u2016\u2082, 0, 1)",
      "formula_status": "PATH A \u2014 LOCKED 2026-04-28",
      "axes": [
        "ddr",
        "mapk",
        "pi3k",
        "vegf",
        "her2",
        "io",
        "efflux",
        "rss"
      ],
      "validated_on": [
        "LATIFY (ceralasertib + durvalumab, NCT05450692)",
        "CARMEN-LC03 (tusamitamab ravtansine, NCT04154956)",
        "BreAK CRC-001 (STC-1010, NCT06934538)"
      ]
    }
  },
  "failure_framework": {
    "name": "8D Failure Vector Framework",
    "description": "Every decoded trial is classified across 8 failure domains. The primary domain (highest weight) determines the root cause of failure. Secondary domains identify compounding factors.",
    "domains": [
      {
        "id": "D1",
        "name": "Biology",
        "description": "Target is not a genuine driver in the enrolled cancer type or stage. Gene is expressed but not functionally essential."
      },
      {
        "id": "D2",
        "name": "Selection",
        "description": "Patient population too broad \u2014 responder subgroup exists but is diluted by non-responders. Biomarker gate missing or set at wrong threshold."
      },
      {
        "id": "D3",
        "name": "Architecture",
        "description": "Trial design cannot detect the signal \u2014 single-arm, wrong endpoint, insufficient power, or missing stratification variable."
      },
      {
        "id": "D4",
        "name": "Timing",
        "description": "Drug administered at wrong disease stage \u2014 too early (target not yet active) or too late (resistance already established)."
      },
      {
        "id": "D5",
        "name": "Combination",
        "description": "Combination partner is antagonistic, redundant, or creates pharmacodynamic interference."
      },
      {
        "id": "D6",
        "name": "Resistance",
        "description": "Pre-existing or rapidly acquired resistance mechanism bypasses the targeted pathway."
      },
      {
        "id": "D7",
        "name": "Translational",
        "description": "Preclinical-to-clinical translation failure \u2014 archived tissue, expression heterogeneity, or species-specific biology."
      },
      {
        "id": "D8",
        "name": "Systemic",
        "description": "Safety signal, regulatory hold, or systemic toxicity terminates the program before efficacy can be assessed."
      }
    ]
  }
} as const;

export const PIPELINE_PROGRAMS: PipelineProgram[] = [
  {
    "program_id": "ATR_DDR",
    "program_name": "ATR/DDR Inhibitor Failure Corpus",
    "program_number": 1,
    "trial_count": 5,
    "headline": "5-trial ATR/DDR failure corpus with decoded selection failure modes \u2014 identifies the biomarker gate that all 3 completed trials missed and the responder subpopulations that existed within each failure.",
    "indication_focus": "Ovarian cancer (3 trials), NSCLC (1 trial), mixed solid tumors (1 trial) \u2014 ATR inhibitors and WEE1 inhibitors in DDR-deficient populations",
    "ip_value": "GLB set \u2014 6-trial IP valuation graveyard corpus. ATR/DDR contributes 4 of 6 GLB trials. Estimated decoded trial value: $1.95B in failed program investment.",
    "admissibility": "external_safe",
    "key_findings": [
      {
        "finding_id": "ATR-F1",
        "title": "RS-High is the ATR responder gate",
        "description": "Berzosertib (M6620) ORR 40% in RS-High vs 5% in RS-Low. Responders existed within the failed ITT population \u2014 the trial failed because RS-High patients were not pre-selected.",
        "source": "Yap et al. Cancer Discov 2020 (NCT02595892)",
        "verified": true
      },
      {
        "finding_id": "ATR-F2",
        "title": "PTEN-loss is the WEE1i resistance marker",
        "description": "Adavosertib (AZD1775) ORR 0% in PTEN-loss vs 23% in PTEN-intact; PFS HR 1.82 (PTEN-loss) vs 0.55 (PTEN-intact). PTEN status is a mandatory exclusion criterion for WEE1i programs.",
        "source": "Lheureux et al. Clin Cancer Res 2021 (NCT03579316)",
        "verified": true
      },
      {
        "finding_id": "ATR-F3",
        "title": "PARPi-naive status is the ATRi+PARPi responder gate",
        "description": "CAPRI: PARPi-naive ORR 36% vs post-PARPi ORR 4%; PFS HR 0.42 (PARPi-naive) vs 1.31 (post-PARPi). Prior PARPi exposure is a mandatory stratification variable for ATRi+PARPi combinations.",
        "source": "Yap et al. JCO 2023 (NCT03462342)",
        "verified": true
      },
      {
        "finding_id": "ATR-F4",
        "title": "LATIFY (ceralasertib + durvalumab) \u2014 QUARANTINED",
        "description": "Delta value conflict between patent filing and computation receipt. Vector version unresolved. Do not cite LATIFY delta in external outputs.",
        "source": "NCT05450692",
        "verified": false,
        "governance": "QUARANTINED \u2014 CT-03 blocker"
      }
    ],
    "transfer_lessons": [
      "Any ATR inhibitor program must pre-specify RS-High enrollment criterion",
      "Any WEE1 inhibitor program must exclude PTEN-loss patients",
      "ATRi + PARPi combinations must stratify by prior PARPi exposure",
      "ITT enrollment in DDR-deficient populations dilutes the responder signal by 5\u20138x"
    ],
    "trials": [
      {
        "trial_id": "Berzosertib (M6620) Phase I/II",
        "nct": "NCT02595892",
        "drug": "Berzosertib (M6620, ATRi) + gemcitabine",
        "phase": "I/II",
        "indication": "Ovarian cancer",
        "status": "COMPLETED",
        "outcome": "RS-High ORR 40% vs RS-Low ORR 5%",
        "primary_met": "SUBGROUP \u2014 ITT not powered for efficacy",
        "failure_mode": "D2 \u2014 Selection: RS-High patients not pre-selected; ITT diluted by non-responders",
        "key_biomarker": "Replication Stress (RS) score \u2014 High vs Low",
        "sponsor": "Merck KGaA / EMD Serono",
        "delta": 0.138,
        "delta_status": "DOCUMENTED_NOT_REPRODUCED",
        "published_source": "Yap et al. Cancer Discov 2020"
      },
      {
        "trial_id": "Adavosertib (AZD1775) Phase II",
        "nct": "NCT03579316",
        "drug": "Adavosertib (AZD1775, WEE1i) + gemcitabine",
        "phase": "II",
        "indication": "Ovarian cancer",
        "status": "COMPLETED",
        "outcome": "PTEN-intact ORR 23% vs PTEN-loss ORR 0%; PFS HR 0.55 (PTEN-intact) vs 1.82 (PTEN-loss)",
        "primary_met": "SUBGROUP \u2014 PTEN-intact only",
        "failure_mode": "D2 \u2014 Selection: PTEN-loss patients included; PTEN-loss is a resistance marker for WEE1i",
        "key_biomarker": "PTEN status (intact vs loss)",
        "sponsor": "AstraZeneca",
        "delta": 0.307,
        "delta_status": "DOCUMENTED_NOT_REPRODUCED",
        "published_source": "Lheureux et al. Clin Cancer Res 2021"
      },
      {
        "trial_id": "CAPRI Phase II",
        "nct": "NCT03462342",
        "drug": "Ceralasertib (ATRi) + olaparib (PARPi)",
        "phase": "II",
        "indication": "Ovarian cancer",
        "status": "COMPLETED",
        "outcome": "PARPi-naive ORR 36% vs post-PARPi ORR 4%; PFS HR 0.42 (PARPi-naive) vs 1.31 (post-PARPi)",
        "primary_met": "SUBGROUP \u2014 PARPi-naive only",
        "failure_mode": "D2 \u2014 Selection: prior PARPi exposure creates resistance; PARPi-naive status is mandatory stratification",
        "key_biomarker": "Prior PARPi exposure (naive vs exposed)",
        "sponsor": "AstraZeneca",
        "delta": 0.108,
        "delta_status": "DOCUMENTED_NOT_REPRODUCED",
        "published_source": "Yap et al. JCO 2023"
      },
      {
        "trial_id": "LATIFY",
        "nct": "NCT05450692",
        "drug": "Ceralasertib (ATRi) + durvalumab (anti-PD-L1)",
        "phase": "II",
        "indication": "NSCLC",
        "status": "COMPLETED",
        "outcome": "QUARANTINED \u2014 delta version conflict unresolved",
        "primary_met": "QUARANTINED",
        "failure_mode": "QUARANTINED \u2014 do not cite",
        "key_biomarker": "QUARANTINED",
        "sponsor": "AstraZeneca",
        "delta": "QUARANTINED",
        "delta_status": "QUARANTINED \u2014 CT-03 blocker: patent delta +0.366 vs receipt delta +0.2641",
        "published_source": "NCT05450692"
      },
      {
        "trial_id": "Ceralasertib + Olaparib Phase I/Ib",
        "nct": "NCT02264678",
        "drug": "Ceralasertib (ATRi) + olaparib (PARPi)",
        "phase": "I/Ib",
        "indication": "Mixed solid tumors",
        "status": "COMPLETED",
        "outcome": "MISSING \u2014 Patient B vector not defined; delta cannot be computed",
        "primary_met": "MISSING",
        "failure_mode": "MISSING \u2014 CT-04 blocker",
        "key_biomarker": "MISSING",
        "sponsor": "AstraZeneca",
        "delta": "MISSING",
        "delta_status": "MISSING \u2014 CT-04 blocker",
        "published_source": "NCT02264678"
      }
    ]
  },
  {
    "program_id": "CEACAM5",
    "program_name": "CEACAM5-Targeted Therapy Failure Corpus",
    "program_number": 2,
    "trial_count": 5,
    "headline": "5-trial CEACAM5 failure corpus spanning ADC (DM4, SN-38, Topo1i), bispecific T-cell engager, and EU-hold safety signal \u2014 with IHC threshold analysis, CRC-specific transfer lessons, and the definitive proof that CEACAM5 IHC is prognostic not predictive.",
    "indication_focus": "2L+ NSCLC (1 Phase III); 3L+ mCRC (3 trials); solid tumors including CRC (1 Phase I on EU hold)",
    "ip_value": "Sanofi pitch anchor \u2014 CEACAM5 two-gate patient selection framework (IHC \u226580% + IO permissiveness) applied to SAR445953 and SAR445877. Committed to Brenus repo SHA 993aecd.",
    "admissibility": "external_safe",
    "key_findings": [
      {
        "finding_id": "CEACAM5-F1",
        "title": "CEACAM5 IHC \u226550% threshold is prognostic, not predictive",
        "description": "CARMEN-LC03 (Phase III, N=389): PFS HR 1.14 (P=0.82) in CEACAM5 IHC \u226550% population. The threshold was set too low \u2014 \u226550% captures patients who express CEACAM5 but cannot respond to ADC therapy. CEACAM5 IHC is a marker of tumor identity, not drug sensitivity.",
        "source": "Besse et al. IASLC 2024 WCLC; Sanofi press release 2023-12-21",
        "verified": true
      },
      {
        "finding_id": "CEACAM5-F2",
        "title": "CEACAM5 IHC \u226580% shows directional OS benefit (post-hoc, underpowered)",
        "description": "CARMEN-LC03 post-hoc: CEACAM5 \u226580% OS HR=0.71 (CI not published). CEACAM5 50\u201379% PFS HR=1.38 (numerically harmful). The \u226580% threshold is the candidate predictive gate \u2014 but this is exploratory, underpowered, and CI not published. Must be labeled as trend, not established.",
        "source": "Besse et al. IASLC 2024 WCLC",
        "verified": true,
        "caveat": "Post-hoc, underpowered, CI not published. Label as trend only."
      },
      {
        "finding_id": "CEACAM5-F3",
        "title": "CEACAM5 IHC is not predictive at any threshold in CRC (PROCEADE-CRC-01)",
        "description": "PROCEADE-CRC-01 (N=40, 3L+ mCRC): ORR 7.5% confirmed; CEACAM5 IHC Spearman rho = \u22120.14 (P=0.4) \u2014 no correlation between IHC expression and response. The IHC threshold failure pattern from NSCLC does not resolve in CRC.",
        "source": "Nature Medicine 2025 (PMC12720031)",
        "verified": true
      },
      {
        "finding_id": "CEACAM5-F4",
        "title": "cCEA \u2265100 as a liquid biopsy proxy for CEACAM5 IHC \u226580%",
        "description": "Gazzah et al. (PMC12720031): cCEA \u2265100 ORR 41.7% (10/24) vs 8.1% (3/37), P=0.003 in CEACAM5 high-expressing NSCLC. IHC \u2194 cCEA Spearman \u03c1=0.43 (n=92). cCEA \u2194 cCEACAM5 \u03c1=0.99 (n=87). cCEA \u2265100 prevalence in HE patients: 40.3% (25/62). NOTE: All data from NSCLC \u2014 application to CRC is by inference.",
        "source": "Gazzah et al. PMC12720031 (NSCLC cohort)",
        "verified": true,
        "caveat": "NSCLC data only. CRC application is by inference. Must be labeled on every slide."
      },
      {
        "finding_id": "CEACAM5-F5",
        "title": "SGN-CEACAM5C EU clinical hold \u2014 VKG linker + Topo1i toxicity signal",
        "description": "NCT06131840 (tusamitamab sonditecan, SGN-CEACAM5C): EU clinical hold in France, Spain, Sweden, Netherlands. Shared VKG linker + Topo1i chemistry with discontinued PF-08046044 (terminated for toxicity). No efficacy data published. Competitive risk for the CEACAM5 ADC field.",
        "source": "NCT06131840 registry; EU regulatory communications",
        "verified": true
      },
      {
        "finding_id": "CEACAM5-F6",
        "title": "CEACAM5 CRC prevalence: 98.7% any-positivity; MSS CRC has HIGHER expression than MSI-H",
        "description": "Jansen et al. Cancers 2024 (DOI:10.3390/cancers16234052): 98.7% CEACAM5 any-positivity in colorectal adenocarcinomas (pan-tumor TMA). MMR deficiency \u2192 reduced CEA (P<0.0001) \u2014 MSS CRC has HIGHER CEACAM5 expression than MSI-H CRC. CRLM CEACAM5 positivity: 79% (Warmerdam et al. EJNMMI Res 2025).",
        "source": "Jansen et al. Cancers 2024; Warmerdam et al. EJNMMI Res 2025",
        "verified": true
      }
    ],
    "transfer_lessons": [
      "CEACAM5 IHC \u226580% is the candidate predictive threshold \u2014 \u226550% is insufficient",
      "cCEA \u2265100 ng/mL is a liquid biopsy proxy for IHC \u226580% (NSCLC data; CRC inference only)",
      "IO permissiveness (pTMB, TME immune infiltrate) must be the second gate \u2014 CEACAM5 expression alone is insufficient",
      "SN-38 payload (labetuzumab govitecan) fails in post-irinotecan patients \u2014 D1 biology failure",
      "On-target/off-tumor GI toxicity is a class risk for CEACAM5 bispecifics (cibisatamab: diarrhea 55.8%, colitis 13.5%)",
      "EU clinical hold on VKG linker + Topo1i chemistry creates regulatory risk for SGN-CEACAM5C class"
    ],
    "trials": [
      {
        "trial_id": "CARMEN-LC03",
        "nct": "NCT04154956",
        "drug": "Tusamitamab ravtansine (SAR408701) \u2014 anti-CEACAM5 ADC, DM4 payload",
        "phase": "III",
        "indication": "2L+ NSCLC",
        "status": "FAILED December 2023",
        "outcome": "PFS HR 1.14 (95% CI 0.86\u20131.51; P=0.8204) \u2014 primary endpoint not met. CEACAM5 50\u201379% PFS HR 1.38 (numerically harmful). CEACAM5 \u226580% OS HR 0.71 (post-hoc, CI not published).",
        "primary_met": "NO",
        "failure_mode": "D2 \u2014 Selection: IHC \u226550% threshold too low; archived tissue limitation (D7)",
        "key_biomarker": "CEACAM5 IHC \u2014 \u226550% enrolled; \u226580% shows directional benefit (post-hoc)",
        "sponsor": "Sanofi",
        "delta": null,
        "delta_status": "",
        "published_source": "Besse et al. IASLC 2024 WCLC; Sanofi press release 2023-12-21"
      },
      {
        "trial_id": "PROCEADE-CRC-01",
        "nct": "NCT05464030",
        "drug": "Precemtabart tocentecan (M9140) \u2014 anti-CEACAM5 ADC, exatecan payload",
        "phase": "I (Phase III planned)",
        "indication": "3L+ mCRC",
        "status": "ACTIVE",
        "outcome": "Confirmed ORR 7.5% (3/40); mPFS 5.9 months (95% CI 4.6\u20137.2). CEACAM5 IHC not predictive: Spearman rho = \u22120.14 (P=0.4). MTD 2.8 mg/kg Q3W.",
        "primary_met": "PARTIAL \u2014 ORR 7.5% in heavily pre-treated population",
        "failure_mode": "D2 \u2014 Selection: IHC not predictive at any threshold tested in CRC",
        "key_biomarker": "CEACAM5 IHC \u2014 not predictive (rho = \u22120.14, P=0.4)",
        "sponsor": "Immunomedics / Gilead",
        "delta": null,
        "delta_status": "",
        "published_source": "Nature Medicine 2025 (PMC12720031)"
      },
      {
        "trial_id": "Labetuzumab govitecan (IMMU-130)",
        "nct": "NCT01270698",
        "drug": "Anti-CEACAM5 ADC, SN-38 payload",
        "phase": "I/II",
        "indication": "3L+ mCRC",
        "status": "COMPLETED",
        "outcome": "ORR 1.2% (1/86 confirmed PR); mPFS 3.6 months; mOS 6.9 months",
        "primary_met": "NO",
        "failure_mode": "D1 \u2014 Biology: SN-38 payload = same mechanism as prior irinotecan therapy (topoisomerase I inhibition). Patients pre-treated with irinotecan cannot respond to SN-38 ADC.",
        "key_biomarker": "Prior irinotecan exposure (mandatory exclusion for SN-38 ADC)",
        "sponsor": "Immunomedics",
        "delta": null,
        "delta_status": "",
        "published_source": "Goldenberg et al. JCO 2020"
      },
      {
        "trial_id": "Cibisatamab + FAP-4-1BBL (BP42675)",
        "nct": "NCT04826003",
        "drug": "CEA-TCB bispecific T-cell engager + FAP-targeted 4-1BB agonist",
        "phase": "Ib",
        "indication": "3L+ MSS mCRC",
        "status": "COMPLETED",
        "outcome": "Confirmed ORR 13.5% (7/52; 95% CI 6\u201326); DCR 50%; confirmed CD8+ T-cell infiltration. On-target/off-tumor GI toxicity: diarrhea 55.8%, colitis 13.5%, fatal CMV colitis (1 patient).",
        "primary_met": "PARTIAL \u2014 ORR 13.5% with significant toxicity",
        "failure_mode": "D1 \u2014 Biology: on-target/off-tumor GI toxicity limits dose escalation and therapeutic window",
        "key_biomarker": "CEACAM5 expression (T-cell engager target); FAP expression (4-1BB agonist target)",
        "sponsor": "Roche/Genentech",
        "delta": null,
        "delta_status": "",
        "published_source": "Nature Medicine 2026"
      },
      {
        "trial_id": "Tusamitamab sonditecan (SGN-CEACAM5C)",
        "nct": "NCT06131840",
        "drug": "Anti-CEACAM5 ADC, Topo1i payload, VKG linker",
        "phase": "I",
        "indication": "Advanced solid tumors including CRC",
        "status": "EU CLINICAL HOLD 2026 \u2014 France, Spain, Sweden, Netherlands",
        "outcome": "No efficacy data published \u2014 EU hold before efficacy readout",
        "primary_met": "N/A \u2014 EU hold",
        "failure_mode": "D8 \u2014 Systemic: EU clinical hold. Shared VKG linker + Topo1i chemistry with discontinued PF-08046044 (terminated for toxicity).",
        "key_biomarker": "CEACAM5 expression",
        "sponsor": "Seagen / Pfizer",
        "delta": null,
        "delta_status": "",
        "published_source": "NCT06131840 registry; EU regulatory communications"
      }
    ]
  },
  {
    "program_id": "IO_CORE",
    "program_name": "MSS CRC Immunotherapy Core Failure Corpus",
    "program_number": 3,
    "trial_count": 7,
    "headline": "7-trial MSS CRC IO failure corpus \u2014 the definitive evidence base for why immunotherapy fails in MSS colorectal cancer and the 3 conditions under which it doesn't: non-liver-metastatic disease, pTMB \u226528, and immune-inflamed tumor microenvironment.",
    "indication_focus": "1L\u2013refractory MSS/pMMR metastatic CRC across 7 trials spanning vaccine, CPI, MEKi+CPI, and combination IO strategies",
    "ip_value": "Primary comparator corpus for BreAK CRC-001 (Brenus Pharma engagement). Defines the 3 conditions for IO benefit in MSS CRC and the 4 design gaps in BreAK CRC-001.",
    "admissibility": "external_safe",
    "key_findings": [
      {
        "finding_id": "IO-F1",
        "title": "Pharmacodynamic T-cell responses do not translate to clinical benefit in MSS CRC",
        "description": "GVAX (ORR 0% despite confirmed T-cell responses) and QUILT-2.004 (HR 1.061 despite CEA-specific T cells generated) both demonstrate that peripheral immune activation does not equal intratumoral effector function in MSS CRC.",
        "source": "Yarchoan et al. Cancer Med 2019; Redman et al. Oncologist 2022",
        "verified": true
      },
      {
        "finding_id": "IO-F2",
        "title": "MEK inhibition does not convert MSS CRC to immunogenic (Phase III confirmed)",
        "description": "IMblaze370 (Phase III, N=363): OS no significant difference across atezolizumab + cobimetinib vs atezolizumab vs regorafenib. MEK inhibition definitively fails to overcome MSS CRC immune exclusion.",
        "source": "Eng et al. Lancet Oncol 2019",
        "verified": true
      },
      {
        "finding_id": "IO-F3",
        "title": "pTMB \u226528 is the strongest IO enrichment signal in MSS CRC from a randomized trial",
        "description": "CO.26 pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022). pTMB median 15.3 mut/Mb (IQR 9.5\u201326.2). Tissue TMB \u226510 OS HR=0.71 (p=0.47) \u2014 NOT predictive. pTMB \u2194 tissue TMB Spearman r=0.13 (P=0.20).",
        "source": "Loree et al. Clin Cancer Res 2024 (PMID 38727700); Chen et al. JAMA Oncol 2020",
        "verified": true
      },
      {
        "finding_id": "IO-F4",
        "title": "Liver metastasis abolishes IO benefit \u2014 Pint=0.02 in randomized data",
        "description": "CO.26: liver-met PFS HR=1.39 (90% CI 1.02\u20131.90) vs no-LM PFS HR=0.54 (90% CI 0.35\u20130.96); Pint=0.02. REGONIVO US: 0/5 liver-met responders vs 22% NLM ORR (5/23). RIN: NLM ORR ~40% vs liver-met ORR ~5%.",
        "source": "Chen et al. JAMA Oncol 2020 (PMC10698621); Fakih et al. EClinicalMedicine 2023",
        "verified": true
      }
    ],
    "transfer_lessons": [],
    "trials": [
      {
        "trial_id": "QUILT-2.004",
        "nct": "NCT03050814",
        "drug": "AdCEA vaccine + avelumab + mFOLFOX6 + bevacizumab",
        "phase": "II",
        "indication": "1L MSS mCRC",
        "status": "TERMINATED for futility",
        "outcome": "PFS HR 1.061 (95% CI 0.380\u20132.966, p=0.91)",
        "primary_met": "NO",
        "failure_mode": "D1 \u2014 Biology (0.7); D2 \u2014 Selection (secondary)",
        "key_biomarker": "None identified",
        "sponsor": "ImmunGene/NantKwest",
        "delta": null,
        "delta_status": "",
        "published_source": "Redman et al. Oncologist 2022 (DOI: 10.1093/oncolo/oyab046)"
      },
      {
        "trial_id": "GRANITE GO-010",
        "nct": "NCT05141721",
        "drug": "Personalized neoantigen vaccine + nivolumab + ipilimumab + FP + bevacizumab (maintenance)",
        "phase": "II",
        "indication": "1L MSS mCRC maintenance",
        "status": "INTERIM \u2014 company bankrupt",
        "outcome": "HR 0.73 (90% CI 0.44\u20131.21) \u2014 CI crosses 1.0; ctDNA-low subgroup HR 0.50 (exploratory)",
        "primary_met": "INTERIM \u2014 CI crosses 1.0",
        "failure_mode": "D2 \u2014 Selection (0.6); D1 \u2014 Biology (secondary)",
        "key_biomarker": "Low baseline ctDNA (exploratory)",
        "sponsor": "Gritstone bio (Chapter 11 bankruptcy Oct 2024)",
        "delta": null,
        "delta_status": "",
        "published_source": "Hecht et al. JCO 2025 LBA13"
      },
      {
        "trial_id": "GVAX + Cyclophosphamide + Pembrolizumab",
        "nct": "NCT02981524",
        "drug": "Allogeneic whole-cell vaccine (GVAX) + low-dose cyclophosphamide + pembrolizumab",
        "phase": "II",
        "indication": "Refractory MSS mCRC",
        "status": "COMPLETED",
        "outcome": "ORR 0% (0/22) despite confirmed T-cell responses",
        "primary_met": "NO",
        "failure_mode": "D1 \u2014 Biology (0.8): pharmacodynamic dissociation \u2014 T-cell activation \u2260 tumor regression in MSS CRC",
        "key_biomarker": "None identified",
        "sponsor": "Johns Hopkins / MSD",
        "delta": null,
        "delta_status": "",
        "published_source": "Yarchoan et al. Cancer Med 2019 (DOI: 10.1002/cam4.2763)"
      },
      {
        "trial_id": "IMblaze370",
        "nct": "NCT02788279",
        "drug": "Atezolizumab + cobimetinib vs atezolizumab vs regorafenib",
        "phase": "III",
        "indication": "3L+ MSS mCRC",
        "status": "COMPLETED",
        "outcome": "OS no significant difference across all 3 arms \u2014 MEK inhibition definitively fails to convert MSS CRC to immunogenic",
        "primary_met": "NO",
        "failure_mode": "D1 \u2014 Biology (0.9): MEK inhibition insufficient to overcome MSS CRC immune exclusion",
        "key_biomarker": "None identified",
        "sponsor": "Roche/Genentech",
        "delta": null,
        "delta_status": "",
        "published_source": "Eng et al. Lancet Oncol 2019 (DOI: 10.1016/s1470-2045(19)30027-0)"
      },
      {
        "trial_id": "AtezoTRIBE",
        "nct": "NCT03721653",
        "drug": "FOLFOXIRI + bevacizumab \u00b1 atezolizumab",
        "phase": "III",
        "indication": "1L mCRC",
        "status": "COMPLETED",
        "outcome": "pMMR PFS HR 0.86 (95% CI 0.63\u20131.17) \u2014 NOT significant. Immunoscore-IC high subgroup HR ~0.50 (exploratory).",
        "primary_met": "NO (pMMR)",
        "failure_mode": "D2 \u2014 Selection (0.7): Immunoscore-IC high subgroup shows signal; unselected pMMR population dilutes it",
        "key_biomarker": "Immunoscore-IC (exploratory)",
        "sponsor": "GONO / Roche",
        "delta": null,
        "delta_status": "",
        "published_source": "Antoniotti et al. Lancet Oncol 2022 (DOI: 10.1016/s1470-2045(22)00274-1)"
      },
      {
        "trial_id": "MEDITREME",
        "nct": "NCT03202758",
        "drug": "Durvalumab + tremelimumab + mFOLFOX6",
        "phase": "II",
        "indication": "1L MSS mCRC",
        "status": "COMPLETED",
        "outcome": "mPFS 8.2 months; ORR 64.5% (uncontrolled \u2014 consistent with mFOLFOX6 alone). CD8-high + TGF-\u03b2-low subgroup showed better outcomes.",
        "primary_met": "UNCONTROLLED \u2014 cannot separate IO contribution from backbone",
        "failure_mode": "D3 \u2014 Architecture (0.8): single-arm design cannot prove IO adds value beyond mFOLFOX6",
        "key_biomarker": "CD8+ TIL density + TGF-\u03b2 expression (exploratory)",
        "sponsor": "AstraZeneca / GERCOR",
        "delta": null,
        "delta_status": "",
        "published_source": "Thibaudin et al. Nat Med 2023 (DOI: 10.1038/s41591-023-02497-z)"
      },
      {
        "trial_id": "CCTG CO.26",
        "nct": "NCT02870920",
        "drug": "Durvalumab + tremelimumab + BSC vs BSC",
        "phase": "II",
        "indication": "Refractory MSS mCRC",
        "status": "COMPLETED",
        "outcome": "OS HR 0.73 (90% CI 0.55\u20130.97, p=0.07) \u2014 marginal. pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022). Liver-met PFS HR=1.39 vs no-LM PFS HR=0.54; Pint=0.02.",
        "primary_met": "MARGINAL (p=0.07)",
        "failure_mode": "D2 \u2014 Selection (0.8): pTMB \u226528 and liver-met status are the critical stratification variables; unselected ITT dilutes signal",
        "key_biomarker": "pTMB \u226528 mut/Mb; liver metastasis status",
        "sponsor": "CCTG / AstraZeneca",
        "delta": null,
        "delta_status": "",
        "published_source": "Chen et al. JAMA Oncol 2020 (DOI: 10.1001/jamaoncol.2020.0910); Loree et al. Clin Cancer Res 2024 (PMID 38727700)"
      }
    ]
  },
  {
    "program_id": "IO_APPENDIX",
    "program_name": "MSS CRC Immunotherapy Supporting Evidence Corpus",
    "program_number": 4,
    "trial_count": 15,
    "headline": "15-trial supporting IO corpus covering MSI-H positive controls, liver metastasis stratification evidence, vaccine T-cell pharmacodynamic dissociation, and the ongoing Phase III landscape \u2014 providing the full boundary conditions for IO benefit in CRC.",
    "indication_focus": "CRC across all lines and MSI status \u2014 positive controls (MSI-H), liver metastasis stratification (REGONIVO, RIN), vaccine pharmacodynamics (PolyPEPI1018, GVAX+guadecitabine, PANVAC), TGF-\u03b2/VEGF combinations (MODUL, bintrafusp alfa), and ongoing Phase III (STELLAR-303)",
    "ip_value": "Supporting evidence for BreAK CRC-001 design gap analysis and the 3 conditions for IO benefit in MSS CRC.",
    "admissibility": "external_safe",
    "key_findings": [],
    "transfer_lessons": [],
    "trials": [
      {
        "trial_id": "KEYNOTE-177",
        "nct": "NCT02563002",
        "drug": "Pembrolizumab vs chemotherapy",
        "phase": "",
        "indication": "1L MSI-H mCRC",
        "status": "",
        "outcome": "PFS HR 0.60; OS HR 0.74 \u2014 POSITIVE. Definitive positive control for MSI-H.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "CheckMate 142",
        "nct": "NCT02060188",
        "drug": "Nivolumab \u00b1 ipilimumab",
        "phase": "",
        "indication": "MSS and MSI-H mCRC",
        "status": "",
        "outcome": "MSS cohort ORR 0% (n=74). MSI-H ORR 31% mono, 55% combo.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "REGONIVO (Japan)",
        "nct": "EPOC1603",
        "drug": "Regorafenib + nivolumab",
        "phase": "",
        "indication": "MSS mCRC (Japan)",
        "status": "",
        "outcome": "CRC cohort (n=24 MSS): ORR 33%, mPFS 6.3 months. All 8 responders had NO liver metastases.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "REGONIVO Phase 2 (US)",
        "nct": "NCT04126733",
        "drug": "Regorafenib + nivolumab",
        "phase": "",
        "indication": "MSS mCRC (US)",
        "status": "",
        "outcome": "ORR 7% (5/70). All 5 responders had NO liver metastases. Non-liver-met ORR 22% (5/23). Liver-met ORR 0% (0/5).",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "RIN (Regorafenib + Ipilimumab + Nivolumab)",
        "nct": "NCT04362839",
        "drug": "Regorafenib + ipilimumab + nivolumab",
        "phase": "",
        "indication": "MSS mCRC",
        "status": "",
        "outcome": "ORR 27.6% overall; NLM cohort ORR ~40%; liver-met ORR ~5%. Median OS 20 months in NLM cohort.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "MODUL Cohort 2",
        "nct": "NCT02291289",
        "drug": "Atezolizumab + bevacizumab maintenance",
        "phase": "",
        "indication": "1L pMMR mCRC maintenance",
        "status": "",
        "outcome": "PFS HR 1.04 (95% CI 0.77\u20131.40) \u2014 no benefit. OS HR 0.91 \u2014 no benefit. All biomarker subgroups negative.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "KEYNOTE-651 Cohorts B & D",
        "nct": "NCT03374254",
        "drug": "Pembrolizumab + mFOLFOX6 \u00b1 bevacizumab",
        "phase": "",
        "indication": "1L MSS mCRC",
        "status": "",
        "outcome": "Cohort B ORR 23% (1L, includes chemo response). Cohort D ORR 7%. No MSS-specific IO signal identified.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "CAMILLA CRC",
        "nct": "NCT03539822",
        "drug": "Camrelizumab + FOLFOX",
        "phase": "",
        "indication": "MSS mCRC",
        "status": "",
        "outcome": "ORR 27.6% (8/29 evaluable). Median OS 9.1 months. Post-hoc: patients without liver metastases had better outcomes.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "PolyPEPI1018",
        "nct": "NCT03391232",
        "drug": "Personalized peptide vaccine",
        "phase": "",
        "indication": "Refractory mCRC",
        "status": "",
        "outcome": "T-cell responses to \u22651 antigen in 100% of patients. No objective responses. Stable disease in some patients.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "GVAX + Guadecitabine",
        "nct": "NCT02998879",
        "drug": "GVAX + guadecitabine (DNMT inhibitor)",
        "phase": "",
        "indication": "Refractory mCRC",
        "status": "",
        "outcome": "No T-cell increase; no objective responses.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "PANVAC + DC vaccine",
        "nct": "NCT00103142",
        "drug": "PANVAC (CEA/MUC1 poxviral vaccine) + dendritic cell vaccine",
        "phase": "",
        "indication": "Refractory mCRC",
        "status": "",
        "outcome": "No OS benefit; T-cell responses >70% of patients.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "AMPLIFY-201",
        "nct": "NCT04853017",
        "drug": "mKRAS-specific neoantigen vaccine",
        "phase": "",
        "indication": "KRAS-mutant solid tumors including CRC",
        "status": "",
        "outcome": "ctDNA clearance in 3/5 CRC patients. mKRAS-specific T-cell responses confirmed.",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "PexaVec + Durvalumab \u00b1 Tremelimumab",
        "nct": "NCT02562755",
        "drug": "Pexastimogene devacirepvec (oncolytic vaccinia) + durvalumab \u00b1 tremelimumab",
        "phase": "",
        "indication": "MSS mCRC",
        "status": "",
        "outcome": "ORR 0% (0/21).",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "Bintrafusp Alfa in CRC",
        "nct": "NCT02517398",
        "drug": "Bintrafusp alfa (anti-PD-L1 + TGF-\u03b2 trap)",
        "phase": "",
        "indication": "Refractory CRC",
        "status": "",
        "outcome": "ORR 0% (n=30).",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      },
      {
        "trial_id": "STELLAR-303",
        "nct": "NCT05425940",
        "drug": "Zanzalintinib (XL092, MET/VEGFR2/AXL inhibitor) + atezolizumab vs regorafenib",
        "phase": "III",
        "indication": "3L+ MSS mCRC",
        "status": "ONGOING \u2014 no results available",
        "outcome": "",
        "primary_met": null,
        "failure_mode": "",
        "key_biomarker": "",
        "sponsor": "",
        "delta": null,
        "delta_status": "",
        "published_source": ""
      }
    ]
  },
  {
    "program_id": "HISTORICAL_BENCHMARKS",
    "program_name": "mFOLFOX6 \u00b1 Bevacizumab Backbone Benchmark Set",
    "program_number": 5,
    "trial_count": 6,
    "headline": "6-entry mFOLFOX6 \u00b1 bevacizumab backbone benchmark set \u2014 the control arm expectations for BreAK CRC-001 and any 1L MSS mCRC trial adding an investigational agent to standard chemotherapy.",
    "indication_focus": "",
    "ip_value": "",
    "admissibility": "external_safe",
    "key_findings": [],
    "transfer_lessons": [],
    "trials": []
  },
  {
    "program_id": "BREAK_CRC_001",
    "program_name": "BreAK CRC-001 \u2014 Active Phase I/II Trial Asset",
    "program_number": 6,
    "trial_count": 1,
    "headline": "BreAK CRC-001 \u2014 active Phase I/II trial of STC-1010 (DNFB-haptenated whole-cell vaccine) in 1L MSS mCRC with CrisPRO fit analysis, 4-gap design risk inventory, and 22-trial comparator context.",
    "indication_focus": "",
    "ip_value": "",
    "admissibility": "external_safe",
    "key_findings": [],
    "transfer_lessons": [],
    "trials": []
  },
  {
    "program_id": "GBM_ESCAPEMAP",
    "program_name": "GBM EscapeMap \u2014 EscapeMap War Board L8",
    "program_number": 7,
    "trial_count": 0,
    "headline": "3-dataset computational analysis of ZEB1/EMT upregulation as a GBM recurrence escape marker under Stupp treatment (TMZ + RT). Hypothesis not supported across three independent datasets.",
    "indication_focus": "",
    "ip_value": "",
    "admissibility": "INTERNAL_ONLY",
    "key_findings": [],
    "transfer_lessons": [],
    "trials": []
  }
];

export const PIPELINE_EXTERNAL_PROGRAMS: PipelineProgram[] =
  PIPELINE_PROGRAMS.filter((p) => p.admissibility === 'external_safe');

export const PIPELINE_INTERNAL_PROGRAMS: PipelineProgram[] =
  PIPELINE_PROGRAMS.filter((p) => p.admissibility !== 'external_safe');

export const PIPELINE_ACTIVE_ENGAGEMENTS = [
  {
    "engagement_id": "BRENUS_PHARMA",
    "counterparty": "Brenus Pharma",
    "counterparty_type": "pharma",
    "status": "ACTIVE",
    "engagement_start": "2026 (ongoing)",
    "anchor_program": "STC-1010 / BreAK CRC-001 (NCT06934538)",
    "anchor_indication": "1L MSS/pMMR metastatic CRC",
    "agent_streams_completed": 6,
    "deliverables_produced": [
      "Agent 1: Brenus Corporate & Program Dossier (diligence-grade)",
      "Agent 2: BreAK CRC-001 Trial Protocol Reconstruction & Signal Dilution Analysis",
      "Agent 3: MSS CRC IO Comparator Trials (22-trial corpus)",
      "Agent 4: Biomarker Biology Map (6-domain MSS CRC suppression landscape)",
      "Agent 5: CrisPRO Fit-Gap Assessment for BreAK CRC-001",
      "Agent 6: Outreach drafting (CTEP, Vivli, Alliance)"
    ],
    "crispro_fit_score": 0.7375,
    "crispro_fit_label": "MODERATE-HIGH alignment",
    "key_contacts": {
      "CEO": "Paul Bravetti (PharmD, HEC)",
      "CSO": "Benoit Pinteur (PharmD)",
      "Lead_Clinical_Advisor": "Alexander Eggermont (MD, PhD)",
      "Innovation_Manager": "George Alzeeb (PhD \u2014 presenting author Alzeeb et al. 2024)",
      "Scientific_Board_Chair": "Pr Fran\u00e7ois Ghiringhelli (MD, PhD, CGFL)"
    },
    "company_facts": {
      "legal_name": "BRENUS PHARMA",
      "SIREN": "802549030",
      "HQ": "Lyon, France",
      "legal_creation": "12 May 2014",
      "operational_founding": "~2020 (under Bravetti leadership)",
      "total_raised": "\u20ac30M",
      "investors": [
        "Noshaq",
        "Angelor",
        "InvestSud",
        "UI Investissement",
        "Cr\u00e9dit Agricole Cr\u00e9ation"
      ]
    }
  },
  {
    "engagement_id": "SANOFI_PITCH",
    "counterparty": "Sanofi",
    "counterparty_type": "pharma",
    "status": "PITCH_SUBMITTED",
    "pitch_date": "2026-05-29",
    "pitch_deadline": "2026-07-01 (finalist pitch event)",
    "pitch_focus": "CEACAM5 two-layer patient selection decode + SAR445877/SAR445953 patient selection packages + 10-archetype MSS CRC ESCAPE table",
    "repo_sha": "4de4297",
    "deliverables_submitted": [
      "CrisPRO_Sanofi_PitchDeck_v1.pptx (12 slides, 290 KB)",
      "crispro_sanofi_pitch_anchor_v1.mdc (415 lines, governance PASS, SHA 993aecd)",
      "escape_map_mss_crc_archetypes_v1.png (10-archetype ESCAPE map)",
      "SANOFI_EXECUTIVE_PITCH_SCRIPT.md (5-minute verbal pitch script)"
    ],
    "sanofi_assets_decoded": [
      "SAR445953 (CEACAM5-Topo1 ADC, NCT06131840)",
      "SAR445877 (PD1\u00d7IL-15 fusion, NCT07500298)",
      "CARMEN-LC03 (tusamitamab ravtansine, NCT04154956 \u2014 retrospective decode)"
    ],
    "killer_hook": "Sanofi's NCT07500298 (SAR445877 + mFOLFOX6 + bev in 1L MSS mCRC) uses the identical backbone as BreAK CRC-001. CrisPRO can decode Sanofi's patient selection problem before their trial reads out."
  }
] as const;

export const PIPELINE_WHAT_WE_IDENTIFIED = [
  {
    "finding_id": "WI-01",
    "title": "The IHC Threshold Failure Pattern \u2014 CEACAM5",
    "description": "CEACAM5 IHC \u226550% is prognostic, not predictive. The \u226580% threshold is the candidate predictive gate. This pattern \u2014 setting the IHC threshold too low \u2014 is the primary reason CARMEN-LC03 (Phase III, N=389) failed despite CEACAM5 being a genuine target. The same pattern is at risk of repeating in PROCEADE-CRC-01 (CRC, Phase I) where IHC is not predictive at any threshold tested.",
    "quantitative_anchor": "CARMEN-LC03: PFS HR 1.14 (P=0.82) at IHC \u226550%; CEACAM5 \u226580% OS HR=0.71 (post-hoc, underpowered). PROCEADE-CRC-01: IHC Spearman rho=\u22120.14 (P=0.4).",
    "programs": [
      "CEACAM5"
    ],
    "actionable_for": [
      "SAR445953",
      "Any CEACAM5-targeted program in CRC or NSCLC"
    ]
  },
  {
    "finding_id": "WI-02",
    "title": "Liver Metastasis Abolishes IO Benefit in MSS CRC \u2014 Pint=0.02",
    "description": "Liver metastasis is the single most important stratification variable for IO trials in MSS CRC. CO.26 (randomized): liver-met PFS HR=1.39 vs no-LM PFS HR=0.54; Pint=0.02. REGONIVO US: 0/5 liver-met responders vs 22% NLM ORR. RIN: NLM ORR ~40% vs liver-met ORR ~5%. Every IO trial in MSS CRC that does not pre-specify liver metastasis as a stratification variable is at risk of diluting the NLM signal.",
    "quantitative_anchor": "CO.26 Pint=0.02; REGONIVO US 0/5 liver-met responders; RIN NLM ORR ~40% vs liver-met ~5%.",
    "programs": [
      "IO_CORE",
      "IO_APPENDIX",
      "BREAK_CRC_001"
    ],
    "actionable_for": [
      "BreAK CRC-001 (GAP-01 CRITICAL)",
      "Any 1L MSS mCRC IO trial"
    ]
  },
  {
    "finding_id": "WI-03",
    "title": "pTMB \u226528 is the Strongest IO Enrichment Signal in MSS CRC from Randomized Data",
    "description": "CO.26 pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022) \u2014 the strongest IO signal in MSS CRC from a randomized trial. Tissue TMB \u226510 OS HR=0.71 (p=0.47) \u2014 NOT predictive. pTMB \u2194 tissue TMB Spearman r=0.13 (P=0.20) \u2014 plasma TMB is not a proxy for tissue TMB. pTMB median 15.3 mut/Mb (IQR 9.5\u201326.2).",
    "quantitative_anchor": "pTMB \u226528 OS HR=0.34 (90% CI 0.18\u20130.63, p=0.022). CI NOTE: 90% CI 0.18\u20130.63 is the authoritative value (field standard for Phase II IO trials in MSS CRC). Published abstract also reports 95% CI 0.13\u20130.85.",
    "programs": [
      "IO_CORE",
      "BREAK_CRC_001"
    ],
    "actionable_for": [
      "BreAK CRC-001 (GAP-02 HIGH)",
      "Any MSS CRC IO trial",
      "Sanofi SAR445877 (NCT07500298)"
    ]
  },
  {
    "finding_id": "WI-04",
    "title": "RS-High is the ATR Responder Gate \u2014 8x ORR Difference",
    "description": "Berzosertib (M6620) ORR 40% in RS-High vs 5% in RS-Low \u2014 an 8x difference. Responders existed within the failed ITT population. The trial failed because RS-High patients were not pre-selected. This is the canonical example of a D2 Selection failure where the target is real but the patient gate is missing.",
    "quantitative_anchor": "RS-High ORR 40% vs RS-Low ORR 5% (Yap et al. Cancer Discov 2020, NCT02595892).",
    "programs": [
      "ATR_DDR"
    ],
    "actionable_for": [
      "Any ATR inhibitor program",
      "DDR-targeted programs in ovarian cancer"
    ]
  },
  {
    "finding_id": "WI-05",
    "title": "PTEN-Loss is the WEE1i Resistance Marker \u2014 ORR 0% vs 23%",
    "description": "Adavosertib (AZD1775) ORR 0% in PTEN-loss vs 23% in PTEN-intact; PFS HR 1.82 (PTEN-loss) vs 0.55 (PTEN-intact). PTEN status is a mandatory exclusion criterion for WEE1i programs. Including PTEN-loss patients in a WEE1i trial guarantees ITT dilution.",
    "quantitative_anchor": "PTEN-intact ORR 23% vs PTEN-loss ORR 0%; PFS HR 0.55 vs 1.82 (Lheureux et al. Clin Cancer Res 2021, NCT03579316).",
    "programs": [
      "ATR_DDR"
    ],
    "actionable_for": [
      "Any WEE1 inhibitor program",
      "DDR-targeted programs in ovarian cancer"
    ]
  },
  {
    "finding_id": "WI-06",
    "title": "OV ZEB1 is a Bevacizumab-Arm Prognostic Marker \u2014 HR=2.500 at Median Split",
    "description": "ZEB1 expression is a prognostic marker in the bevacizumab arm of ovarian cancer trials. Continuous Cox: HR=1.4803 (95% CI [1.1188, 1.9586], p=0.006042, c-stat=0.6444). Median split: HR=2.500 (95% CI [1.322, 4.727], log-rank p=0.0036, FDR=0.0499). Arm interaction: HR=1.243 (p=0.246) \u2014 PROGNOSTIC_NOT_ARM_SPECIFIC.",
    "quantitative_anchor": "HR=1.4803 (continuous Cox); HR=2.500 (median split, FDR=0.0499). Arm interaction p=0.246 \u2014 prognostic, not bevacizumab-specific.",
    "programs": [
      "BREAK_CRC_001"
    ],
    "actionable_for": [
      "Ovarian cancer bevacizumab programs",
      "ZEB1-targeted programs"
    ],
    "admissibility": "external_safe \u2014 EscapeMap OV vectors"
  },
  {
    "finding_id": "WI-07",
    "title": "M2 Stratum Beneficial Median OS \u2014 34.4 Months",
    "description": "M2 stratum calibration: GEO 74.0% vs published 73.9% (within 0.1%). M2 stratum beneficial median OS: 34.4 months (95% CI 32.7\u201338.8), p=9.52\u00d710\u207b\u2075. Mandatory wording: 'Preparatory M2-bevacizumab biomarker panel for downstream descriptive and conditioning analyses \u2014 not a validated prognostic signature until dbGaP-linked patient-level outcomes are available.' (LOCKED 2026-05-12)",
    "quantitative_anchor": "M2 beneficial median OS 34.4 months (CI 32.7\u201338.8), p=9.52\u00d710\u207b\u2075.",
    "programs": [
      "BREAK_CRC_001"
    ],
    "admissibility": "external_safe with mandatory wording"
  },
  {
    "finding_id": "WI-08",
    "title": "cCEA \u2265100 as Liquid Biopsy Proxy for CEACAM5 IHC \u226580%",
    "description": "IHC \u2194 cCEA Spearman \u03c1=0.43 (n=92). cCEA \u2194 cCEACAM5 \u03c1=0.99 (n=87) \u2014 near-redundant. cCEA \u2265100 ORR 41.7% (10/24) vs 8.1% (3/37), P=0.003 in CEACAM5 high-expressing NSCLC. cCEA \u2265100 prevalence in HE patients: 40.3% (25/62). CAVEAT: All data from NSCLC (NCT02187848). Application to CRC is by inference only.",
    "quantitative_anchor": "cCEA \u2265100 ORR 41.7% vs 8.1% (P=0.003); IHC \u2194 cCEA \u03c1=0.43 (Gazzah et al. PMC12720031).",
    "programs": [
      "CEACAM5"
    ],
    "actionable_for": [
      "SAR445953 patient selection",
      "Any CEACAM5 program seeking liquid biopsy enrollment gate"
    ],
    "caveat": "NSCLC data only. CRC application is by inference. Must be labeled on every slide."
  },
  {
    "finding_id": "WI-09",
    "title": "Pharmacodynamic Dissociation \u2014 T-Cell Responses \u2260 Clinical Benefit in MSS CRC",
    "description": "GVAX (ORR 0% despite confirmed T-cell responses in 100% of patients), QUILT-2.004 (HR 1.061 despite CEA-specific T cells generated), PolyPEPI1018 (T-cell responses in 100% of patients, no objective responses), PANVAC (T-cell responses >70%, no OS benefit). Peripheral immune activation does not equal intratumoral effector function in MSS CRC. This is the most important lesson for any vaccine program in this indication.",
    "quantitative_anchor": "GVAX ORR 0% (n=22); QUILT-2.004 HR 1.061; PolyPEPI1018 100% T-cell response rate, 0% ORR.",
    "programs": [
      "IO_CORE",
      "IO_APPENDIX",
      "BREAK_CRC_001"
    ],
    "actionable_for": [
      "STC-1010 / BreAK CRC-001",
      "Any vaccine program in MSS CRC"
    ]
  },
  {
    "finding_id": "WI-10",
    "title": "SAR445877 Backbone Match \u2014 Sanofi Running the Same Trial as BreAK CRC-001",
    "description": "Sanofi's NCT07500298 (SAR445877, PD1\u00d7IL-15 fusion + mFOLFOX6 + bevacizumab, 1L MSS mCRC, N=41 planned, start date 2026-09-03) uses the identical backbone as BreAK CRC-001. CrisPRO can decode Sanofi's patient selection problem before their trial reads out \u2014 and position STC-1010's ICD mechanism as the differentiated approach.",
    "quantitative_anchor": "NCT07500298: SAR445877 + mFOLFOX6 + bev, 1L MSS mCRC, N=41, start 2026-09-03.",
    "programs": [
      "CEACAM5",
      "BREAK_CRC_001"
    ],
    "actionable_for": [
      "Sanofi BD pitch",
      "BreAK CRC-001 competitive positioning"
    ]
  }
] as const;

/** NCT → slug candidate (used to link pipeline trials to /ledger/{slug}/) */
export function nctToLedgerSlug(nct: string): string {
  return (nct || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}
