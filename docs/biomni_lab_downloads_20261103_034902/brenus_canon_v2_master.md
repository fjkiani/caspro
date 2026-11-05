# Brenus / STC-1010 / BreAK CRC-001 — Engine-Safe Canon v2
## Downstream-Safe Rewrite Package | PhD Verification Agent

**Version:** 2.0
**Date:** 2026-04-28
**Supersedes:** `brenus_crispro_master.md` (v1, prior agent canon — contains errors documented below)
**Base artifact:** `brenus_verified_claim_ledger_v1.md` (2026-04-27) — sole evidentiary source for this document
**Policy:** Every claim in this document is traceable to a directly retrieved primary source. No claim inherits a label from prior agent canon without re-verification.

---

## HOW TO USE THIS DOCUMENT

This document is the **single authoritative reference** for all downstream agents, outreach drafts, strategy memos, and CrisPRO positioning materials related to Brenus Pharma / STC-1010 / BreAK CRC-001.

### Notation System

| Tag | Meaning | Downstream use |
|-----|---------|----------------|
| `[VERIFIED]` | Directly retrieved from primary source (registry, peer-reviewed publication) | Safe to assert as fact with source citation |
| `[CROSS_REFERENCED]` | Confirmed by ≥2 independent sources | Safe to assert with dual citation |
| `[COMPANY_CLAIM]` | Appears only in company-controlled sources (website, press release) | Must be attributed to company; never presented as independently verified fact |
| `[PROVISIONAL]` | Plausible but not confirmed in retrieved primary sources | Must be flagged as unconfirmed; do not assert as fact |
| `[BLOCKED]` | Not retrievable in this session; source failed or paywalled | Do not assert; flag as unknown |
| `[CORRECTED]` | Prior agent canon contained an error; this document has the correct value | Prior value must not be used |

### Hard Stops for Downstream Agents

The following claims **must not be asserted as facts** in any downstream output:

1. **Human cell line identity for STC-1010** (HCT116, HT29, LoVo, or any specific names) — `[BLOCKED]` pending ASCO 2023 e14661 retrieval
2. **"Over 200 cancer-related proteins"** as a verified scientific finding — `[COMPANY_CLAIM]` only
3. **NCT02853604** as the AdCEA+avelumab trial identifier — `[CORRECTED]`; correct NCT is NCT03050814
4. **HR 1.02 (0.65–1.60)** for NCT03050814 — `[CORRECTED]`; correct HR is 1.061 (0.380–2.966), p=0.91
5. **NCT03050814 as a positive precedent** — `[CORRECTED]`; trial was TERMINATED for futility
6. **BreAK CRC-001 as MSS-only** — `[CORRECTED]`; MSI-H arm (2A-2) is registered
7. **Any human clinical efficacy data for STC-1010** — `[BLOCKED]`; trial started 2025-06-17, no results posted
8. **Alzeeb et al. 2024 as evidence of human STC-1010 efficacy** — paper uses murine surrogate only; authors explicitly state human translation is unvalidated
9. **n=6 / 100% DCR / DTH response data** — `[BLOCKED]`; these figures originate from BusinessWire/BioSpace press releases and AACR 2026 abstract CT051, all of which failed retrieval in the PhD verification session. They must not be asserted as factual baselines without explicit `[BLOCKED — source not retrieved]` tagging.

---

## PART I — BREAK CRC-001 PROTOCOL FACTS

*Source: NCT06934538, ClinicalTrials.gov API v2, last update 2025-12-19* `[VERIFIED]`

### 1.1 Core Identifiers

| Field | Value | Confidence |
|-------|-------|------------|
| NCT identifier | NCT06934538 | `[VERIFIED]` |
| Sponsor study ID | BreAK CRC-001 | `[VERIFIED]` |
| Lead sponsor | Brenus Pharma (Industry class) | `[VERIFIED]` |
| Official title | "Open Label, Multicenter, Dose-escalation and Cohort-expansion Phase I/IIA Trial of STC-1010, an Immunotherapy, in Patients With Unresectable Locally Advanced or Metastatic Colorectal Cancer (CRC) - BreAK CRC Trial" | `[VERIFIED]` |
| Phase | Phase I / Phase IIA (sequential) | `[VERIFIED]` |
| Study type | Interventional, non-randomized, sequential | `[VERIFIED]` |
| Masking | Open-label (NONE) | `[VERIFIED]` |
| FDA-regulated drug | Yes (IND filed) | `[VERIFIED]` |
| DMC oversight | Yes | `[VERIFIED]` |

### 1.2 Trial Arms — CRITICAL: THREE ARMS REGISTERED

> ⚠️ **CORRECTION C-001:** Prior agent canon described BreAK CRC-001 as MSS-only. This is INCORRECT. Three arms are registered.

| Arm | Label | Population | Status |
|-----|-------|------------|--------|
| Phase 1 | Dose escalation | BRAF WT, KRAS mutated, unresectable stage IIIC (T4b) or stage IV CRC | Registered |
| Phase 2A Arm 2A-1 | MSS expansion | BRAF WT, KRAS mutated, MSS/pMMR | Registered |
| Phase 2A Arm 2A-2 | MSI-H expansion | BRAF WT, KRAS mutated, MSI-H | Registered |

**All three arms require:** BRAF wild-type AND KRAS-mutated disease `[VERIFIED]`
**BRAF mutation is Exclusion Criterion #7** — explicitly stated in registry `[VERIFIED]`

### 1.3 Intervention

STC-1010 + immunostimulant (IS) regimen (low-dose cyclophosphamide + GM-CSF) + SOC (mFOLFOX6 with or without bevacizumab) `[VERIFIED]`

- Bevacizumab is **optional** ("with or without") — not mandatory `[VERIFIED]`
- Arm-level bevacizumab assignment: `[BLOCKED]` — protocol document not publicly available

### 1.4 Endpoints

| Phase | Primary Endpoint | Source |
|-------|-----------------|--------|
| Phase I | Safety/MTD/RP2D; CTCAE v5; 28-day DLT window | `[VERIFIED]` NCT06934538 |
| Phase IIA | PFS rate at 12 months from STC-1010+IS initiation; proportion alive without progression (CR/PR/SD) per RECIST 1.1 | `[VERIFIED]` NCT06934538 |

**Phase I immune monitoring endpoint:** DTH score assessed at 1, 24, 48, 72h post-first injection; then after 4th, 8th, and every boost `[VERIFIED]`

**Phase IIA secondary endpoints:** CBR, ORR, DOR, PFS (median), OS, metastases resection rate `[VERIFIED]`

**Exploratory endpoints:** Biomarkers in blood and tumor biopsies at T0, 1m, 2m, 6m, 12m, and at progression (up to 24 months) `[VERIFIED]`

### 1.5 Key Eligibility

| Criterion | Value | Confidence |
|-----------|-------|------------|
| Age | 18–75 years; PS=0 required if >70 | `[VERIFIED]` |
| ECOG PS | ≤1 | `[VERIFIED]` |
| Disease | Unresectable locally advanced (stage IIIC T4b) or metastatic (stage IV) CRC adenocarcinoma | `[VERIFIED]` |
| Line of therapy | First-line (treatment-naïve for metastatic disease) | `[VERIFIED]` |
| Prior adjuvant | Allowed if >6 months since end of adjuvant and first relapse | `[VERIFIED]` |
| KRAS | Mutated (required) | `[VERIFIED]` |
| BRAF | Wild-type (required); BRAF mutation = Exclusion #7 | `[VERIFIED]` |
| Active autoimmune disease | Exclusion (RA, lupus, Crohn's, UC) | `[VERIFIED]` |
| Prior IO for advanced disease | Excluded for Phase I and Arm 2A-1; ALLOWED for Arm 2A-2 | `[VERIFIED]` |

### 1.6 Timeline and Sites

| Field | Value | Confidence |
|-------|-------|------------|
| Actual start date | 2025-06-17 | `[VERIFIED]` |
| Estimated primary completion | June 2028 | `[VERIFIED]` |
| Estimated study completion | June 2029 | `[VERIFIED]` |
| Overall status (as of 2025-12-19) | RECRUITING | `[VERIFIED]` |
| Results posted | No (hasResults=false) | `[VERIFIED]` |

**Recruiting sites (as of 2025-12-19):** Institut Bergonié (Bordeaux), CGFL (Dijon), Hospices Civils de Lyon, Institut du Cancer de Montpellier, Institut Gustave Roussy (Villejuif) — all France `[VERIFIED]`

**Not yet recruiting:** Centre Léon Bérard (Lyon), CHU Poitiers, Institut Jules Bordet (Brussels), Johns Hopkins (Baltimore, US) `[VERIFIED]`

---

## PART II — NCT03050814 COMPARATOR TRIAL FACTS

*Source: NCT03050814, ClinicalTrials.gov API v2 + results module* `[VERIFIED]`

> ⚠️ **CORRECTION C-002:** Prior agent canon (Agent 3) cited NCT02853604 as this trial's identifier. That is INCORRECT. The correct identifier is NCT03050814.

### 2.1 Core Identifiers

| Field | Value | Confidence |
|-------|-------|------------|
| NCT identifier | NCT03050814 | `[VERIFIED]` `[CORRECTED from NCT02853604]` |
| Trial name | QUILT-2.004 | `[VERIFIED]` |
| Official title | "A Randomized Phase II Trial of Standard of Care Alone or in Combination With Ad-CEA Vaccine and Avelumab in Patients With Previously Untreated Metastatic or Unresectable Colorectal Cancer" | `[VERIFIED]` |
| Sponsor | National Cancer Institute (NCI/NIH) | `[VERIFIED]` |
| PI | Julius Y. Strauss MD | `[VERIFIED]` |
| Sites | NIH Clinical Center (Bethesda); Lombardi Comprehensive Cancer Center (Washington DC) | `[VERIFIED]` |

### 2.2 Status — TERMINATED NEGATIVE TRIAL

> ⚠️ **CORRECTION C-006:** Prior agent canon framed NCT03050814 as a positive design precedent. This is INCORRECT. The trial was TERMINATED for futility.

| Field | Value | Confidence |
|-------|-------|------------|
| Overall status | TERMINATED | `[VERIFIED]` |
| Reason for termination | "Terminated after an unplanned interim efficacy analysis" | `[VERIFIED]` verbatim from registry |
| Actual completion date | 2021-08-25 | `[VERIFIED]` |
| Enrollment | n=30 (10 Arm A, 16 Arm B, 4 screen failures not assigned) | `[VERIFIED]` |
| Target enrollment | 70 evaluable randomized subjects | `[VERIFIED]` |

### 2.3 Primary Endpoint Result

> ⚠️ **CORRECTION C-003:** Prior session summary cited HR 1.02 (95% CI 0.65–1.60). This is INCORRECT. Correct values are from the registry results module.

| Arm | Median PFS | 95% CI | Confidence |
|-----|-----------|--------|------------|
| Arm A (SOC alone) | 8.8 months | 3.3–17.0 months | `[VERIFIED]` |
| Arm B (SOC + Ad-CEA + avelumab) | 10.1 months | 3.6–16.1 months | `[VERIFIED]` |
| **HR (Arm B vs. Arm A)** | **1.061** | **0.380–2.966** | `[VERIFIED]` `[CORRECTED]` |
| **p-value (log-rank)** | **0.91** | — | `[VERIFIED]` `[CORRECTED]` |

**Interpretation:** No PFS benefit for the vaccine+ICI arm. Wide CI reflects small n=26 treated patients. **This is a negative result.**

### 2.4 Population

- MSI-H/dMMR patients **explicitly excluded** `[VERIFIED]`
- Population is MSS/pMMR — directly analogous to BreAK CRC-001 Arm 2A-1 `[VERIFIED]`

### 2.5 Design Precedent Value (What Remains Valid)

The following design elements from NCT03050814 retain precedent value despite the negative efficacy outcome:

| Element | Value | Confidence |
|---------|-------|------------|
| Safety lead-in structure | 6 evaluable subjects; ≤1 DLT threshold before full randomization | `[VERIFIED]` |
| Bevacizumab sequencing | Bevacizumab administered Day 2 (after vaccine/avelumab Day 1) | `[VERIFIED]` |
| Oxaliplatin dose in combination arm | 68 mg/m² (Arm B) vs. 85 mg/m² (Arm A) — reduced in combination arm | `[VERIFIED]` |

**Critical caveat:** Design precedent value is limited to structural elements only. The negative efficacy outcome (HR 1.061, p=0.91, terminated for futility) must be disclosed whenever this trial is cited.

### 2.6 Safety

| Metric | Arm A (n=10) | Arm B (n=16) | Confidence |
|--------|-------------|-------------|------------|
| Deaths on study | 1/10 | 1/16 | `[VERIFIED]` |
| Serious AEs | 9/10 | 10/16 | `[VERIFIED]` |
| Any AE | 10/10 | 16/16 | `[VERIFIED]` |

High SAE rate in both arms reflects advanced mCRC population, not necessarily treatment-related.

---

## PART III — STC-1010 PRECLINICAL BIOLOGY

*Source: Alzeeb et al. 2024, Frontiers in Oncology, DOI 10.3389/fonc.2024.1427428* `[VERIFIED]`

### 3.1 CRITICAL SCOPE LIMITATION

> ⚠️ **This paper reports a MURINE SURROGATE VACCINE, not the clinical STC-1010 product.**

The authors explicitly state:
> *"Although the results in mouse models are promising, predicting efficacy in patients requires exploration in different models due to the use of a murine surrogate in syngeneic models. Human vaccines based on STC technology should be tested in alternative models, such as ex vivo immune response activation tests, to better assess biological and clinical responses."*

**This caveat must be preserved verbatim in any downstream scientific summary.**

### 3.2 Cell Lines Used

> ⚠️ **CORRECTION C-005:** Prior agent canon (Agent 5 Gap 1) attributed human cell lines HCT116, HT29, LoVo to STC-1010. Alzeeb et al. 2024 uses **exclusively murine cell lines**. Human cell line identity for the clinical product is `[BLOCKED]`.

| Cell Line | Species | Origin | Catalog | Role in Vaccine |
|-----------|---------|--------|---------|----------------|
| CT26 | Murine | BALB/c colon tumor | ATCC CRL-2639 | Primary vaccine line (1CL and 3CL) |
| CMT-93 | Murine | Rectal carcinoma | ECACC 89111413 | 3CL vaccine component |
| LTPA | Murine | Pancreatic adenocarcinoma | ATCC CRL-2389 | 3CL vaccine component (shared TAA rationale) |
| MC38 | Murine | Colon carcinoma | Kerafast | Challenge model (anti-PD-1 resistant) |

**Human cell line identity for clinical STC-1010:** `[BLOCKED]` — requires ASCO 2023 abstract e14661 or equivalent primary source. HCT116/HT29/LoVo attribution is `[PROVISIONAL]` only.

**Note on HT29:** HT29 carries BRAF V600E mutation. If HT29 is confirmed as a clinical vaccine line, this would create a scientific inconsistency with the trial's BRAF wild-type eligibility requirement (Exclusion Criterion #7 of NCT06934538). This inconsistency cannot be resolved until B-001 is unblocked.

### 3.3 Manufacturing Parameters (Murine Surrogate Only)

| Parameter | Value | Confidence |
|-----------|-------|------------|
| Hapten | DNFB (dinitrofluorobenzene) at 12.7 µg/mL for 30 min | `[VERIFIED]` |
| Physical stressors | 10 Gy irradiation + 42°C/37°C thermal stress (1h/14h) | `[VERIFIED]` |
| Final inactivation | 25 Gy irradiation | `[VERIFIED]` |
| Formulation | 10×10⁶ cells/mL in EBSS + 80 g/L sucrose; frozen at -80°C | `[VERIFIED]` |
| IS regimen (preclinical) | Cyclophosphamide 15 mg/kg IP D-1; mGM-CSF 5 µg SC with vaccine | `[VERIFIED]` |

**Clinical GMP parameters:** `[BLOCKED]` — not disclosed in any retrieved source.

### 3.4 Efficacy Results (Murine Models Only)

| Study | Model | Key Result | p-value | n/group | Confidence |
|-------|-------|-----------|---------|---------|------------|
| Study A (1CL) | CT26 subcutaneous, BALB/c | IS+CT26-SH: 100 mm³ vs. 238 mm³ control at D20 | p<0.0003 (Student's t) | 9–10 | `[VERIFIED]` |
| Study A survival | CT26 subcutaneous | IS+CT26-SH vs. control | p=0.0046 (log-rank) | 9–10 | `[VERIFIED]` |
| Study B (3CL vs. 1CL) | CT26 subcutaneous | IS+3CL-SH: 150 mm³ vs. 341 mm³ (1CL) at D24 | p=0.0002 (Student's t) | 18–20 | `[VERIFIED]` |
| Study B mOS | CT26 subcutaneous | IS+3CL-SH: 38 days vs. 31.5 days (1CL) | p=0.05 (log-rank) | 18–20 | `[VERIFIED]` |
| Study C survival | MC38 anti-PD-1 resistant | IS+3CL-SH vs. control | p=0.00368 (log-rank) | 15 | `[VERIFIED]` |
| Study C responders | MC38 anti-PD-1 resistant | 60% responders; 1 complete response | — | 15 | `[VERIFIED]` |
| Study C CD8+ | MC38 anti-PD-1 resistant | Increased CD8+ T cell infiltration | p=0.045 | 15 | `[VERIFIED]` |
| Study C M1 macrophage | MC38 anti-PD-1 resistant | Increased M1 macrophage infiltration | p=0.02 | 15 | `[VERIFIED]` |

**Model limitations:** CT26 is MSS analog but has higher mutational burden than human MSS CRC. MC38 is MSI-H analog in mice — not MSS. Neither model recapitulates liver metastasis-induced systemic immune tolerance.

### 3.5 Proteomics (Murine Surrogate Only)

| Finding | Value | Confidence |
|---------|-------|------------|
| Proteins shared across all 3 lines | 32% of identified proteins | `[VERIFIED]` |
| Cell-line-specific proteins | 44% of total identified proteins | `[VERIFIED]` |
| CT26-SH unique proteins | 429 | `[VERIFIED]` |
| CMT-93-SH unique proteins | 423 | `[VERIFIED]` |
| LTPA-SH unique proteins | 986 | `[VERIFIED]` |
| CT26 proteins shared with 3CL-SH vaccine | 1,196 | `[VERIFIED]` |

**These are MURINE proteome numbers.** Human vaccine proteome is not reported in this paper.

### 3.6 Safety (Murine Only)

76-mouse, 8-week toxicity study with repeated SC vaccine + mGM-CSF + IP cyclophosphamide: no treatment-related deaths, no test item-related clinical signs, no local reactions, no effects on body weight or food consumption `[VERIFIED]`. Murine safety data only — does not constitute human safety evidence.

### 3.7 Conflict of Interest

Fully funded by Brenus Pharma. Co-authors Gongora, Limagne, Apetoh, Ghiringhelli declared as Brenus Pharma consultants `[VERIFIED]`. Disclosed and standard for industry-funded research; does not invalidate findings but must be noted in any diligence summary.

---

## PART IV — COMPANY PLATFORM CLAIMS

*Source: Brenus Pharma Science & Innovation page (brenus-pharma.com/science-innovation/)* `[COMPANY_CLAIM]`

> All claims in this section are from company-controlled sources only. None are independently verified in retrieved peer-reviewed literature. Tag as `[COMPANY_CLAIM]` in all downstream outputs.

| Claim | Verbatim | Confidence |
|-------|---------|------------|
| Human cell lines used in clinical product | "Selection of well-characterized allogeneic human cell lines that reflect the heterogeneity of the targeted indication and represent patient diversity — including key mutations and different phenotypic profiles." | `[COMPANY_CLAIM]` |
| Antigen count | "Stimulation by standards of care and physical stressors to reveal over 200 cancer-related proteins." | `[COMPANY_CLAIM]` — not sourced to peer-reviewed publication |
| Hapten identity | "Hapten: Dinitrofluorobenzene (DNFB)" | `[CROSS_REFERENCED]` — confirmed by Alzeeb et al. 2024 |
| Carrier | "Carrier: Cancer Related Proteins (CRP)" | `[COMPANY_CLAIM]` |
| Manufacturing | "Standardized & Scalable manufacturing process. GMP ready & specifically replicable to other solid tumors." | `[COMPANY_CLAIM]` |
| Patent | "Platform & Product worldwide patented." | `[COMPANY_CLAIM]` |
| Pipeline | STC-1010: CRC, PDAC, HCC; STC-1020: Ovarian cancer | `[COMPANY_CLAIM]` — only CRC has a registered trial |

**Note on "200+ proteins":** Alzeeb et al. 2024 reports murine proteome numbers in the hundreds to thousands per cell line (e.g., 429 unique to CT26-SH, 986 unique to LTPA-SH) but does not use the "200+" framing. The "200+" figure is not sourced to any peer-reviewed publication and must not be tagged `[VERIFIED]` in any downstream output.

---

## PART V — CONTRADICTION RESOLUTION LOG

All six contradictions from Ledger v1.0 are documented here with resolution status.

### C-001 — MSI-H Arm Existence
| Field | Value |
|-------|-------|
| Severity | HIGH |
| Prior canon claim | BreAK CRC-001 targets MSS patients only |
| Verified finding | Three arms registered: Phase 1, Arm 2A-1 (MSS), Arm 2A-2 (MSI-H) |
| Source | NCT06934538 API v2 `[VERIFIED]` |
| Resolution | **RESOLVED** — Part I §1.2 of this document |
| Files corrected | Agent 2 (already correct); Agent 5 (corrected 2026-04-28) |
| Files requiring review | `brenus_crispro_master.md` (prior scaffold — superseded by this document) |

### C-002 — Wrong NCT Number
| Field | Value |
|-------|-------|
| Severity | HIGH |
| Prior canon claim | Agent 3 cited NCT02853604 as the AdCEA+avelumab trial |
| Verified finding | Correct identifier is NCT03050814 (QUILT-2.004) |
| Source | NCT03050814 API v2 `[VERIFIED]` |
| Resolution | **RESOLVED** — Agent 3 corrected 2026-04-28; Part II §2.1 of this document |
| Files corrected | `MSS_CRC_IO_comparator_trials_agent3.md` |

### C-003 — Wrong HR Values
| Field | Value |
|-------|-------|
| Severity | MEDIUM |
| Prior canon claim | NCT03050814 PFS HR = 1.02 (95% CI 0.65–1.60) |
| Verified finding | HR = 1.061 (95% CI 0.380–2.966), p=0.91 |
| Source | NCT03050814 results module, ClinicalTrials.gov API v2 `[VERIFIED]` |
| Resolution | **RESOLVED** — Agent 3 corrected 2026-04-28; Part II §2.3 of this document |
| Files corrected | `MSS_CRC_IO_comparator_trials_agent3.md` |

### C-004 — "200+ Antigens" Incorrectly Tagged [VERIFIED]
| Field | Value |
|-------|-------|
| Severity | MEDIUM |
| Prior canon claim | Agent 5 line 83 tagged "200+ antigens" as `[VERIFIED]` |
| Verified finding | "Over 200 cancer-related proteins" appears only on Brenus company website; no peer-reviewed source uses this figure |
| Source | Brenus website `[COMPANY_CLAIM]`; Alzeeb et al. 2024 `[VERIFIED]` (does not use "200+" framing) |
| Resolution | **RESOLVED** — Agent 5 corrected 2026-04-28; Part IV of this document |
| Files corrected | `crispro_fitgap_brenus_agent5.md` (Gap 1, Guardrail 4, resistance mapping section) |

### C-005 — Human Cell Line Identity Misattributed
| Field | Value |
|-------|-------|
| Severity | HIGH |
| Prior canon claim | Agent 5 Gap 1 stated HCT116, HT29, LoVo are used in STC-1010 |
| Verified finding | Alzeeb et al. 2024 uses exclusively murine lines (CT26, CMT-93, LTPA, MC38). Human line identity is `[BLOCKED]` pending ASCO 2023 e14661 |
| Source | Alzeeb et al. 2024 `[VERIFIED]`; Brenus website `[COMPANY_CLAIM]` (confirms human lines used but does not name them) |
| Resolution | **RESOLVED in framing** — Agent 5 Gap 1 rewritten 2026-04-28; Part III §3.2 of this document. **Underlying blocker B-001 remains open.** |
| Files corrected | `crispro_fitgap_brenus_agent5.md` |

### C-006 — NCT03050814 Framed as Positive Precedent
| Field | Value |
|-------|-------|
| Severity | MEDIUM |
| Prior canon claim | NCT03050814 described as a positive design precedent for vaccine+ICI+mFOLFOX6+bev in 1L MSS mCRC |
| Verified finding | Trial TERMINATED for futility at interim. HR 1.061, p=0.91. No PFS benefit. |
| Source | NCT03050814 results module `[VERIFIED]` |
| Resolution | **RESOLVED** — Agent 3 corrected 2026-04-28; Part II §2.2–2.3 of this document. Design precedent value (structural elements only) preserved in Part II §2.5. |
| Files corrected | `MSS_CRC_IO_comparator_trials_agent3.md` |

---

## PART VI — OPEN BLOCKERS

These items remain unresolved. Downstream agents must not assert claims in these areas without explicit `[BLOCKED]` or `[PROVISIONAL]` tagging.

### B-001 — Human Cell Line Identity for Clinical STC-1010
- **What is blocked:** Specific human CRC cell line names used in the clinical product
- **Why blocked:** ASCO 2023 abstract e14661 not retrieved (paywall/resolver failure); Brenus website confirms human lines used but does not name them
- **Impact:** Cannot verify KRAS/BRAF mutation status of vaccine cell lines; cannot assess patient-population representativeness; HT29 BRAF V600E inconsistency cannot be resolved
- **Resolution path:** Direct retrieval of ASCO 2023 abstract e14661 or Brenus data room disclosure under NDA/CDA
- **Current confidence:** `[PROVISIONAL]` for human line use; `[BLOCKED]` for specific line identity

### B-002 — Clinical GMP Manufacturing Parameters
- **What is blocked:** Clinical batch size, cell concentration, irradiation dose, haptenation concentration, formulation for human product
- **Why blocked:** Not disclosed in any retrieved source
- **Resolution path:** Brenus data room / IND filing
- **Current confidence:** `[BLOCKED]`

### B-003 — Human Clinical Efficacy/Safety Data for STC-1010
- **What is blocked:** All human clinical efficacy and safety data for STC-1010. This includes any preliminary signals (n=6, 100% DCR, DTH responses) referenced in prior agent canon — those claims originate from BusinessWire/BioSpace press releases and AACR 2026 abstract CT051, which were not directly retrieved in the PhD verification session (BusinessWire blocked by Akamai; BioSpace ASCO 2024 returned 404). Per ledger policy, no claim from a blocked source is inherited.
- **Why blocked:** BreAK CRC-001 started 2025-06-17; hasResults=false in registry (NCT06934538 `[VERIFIED]`); no peer-reviewed clinical publication exists; all press-release/abstract sources failed retrieval in this session.
- **Impact:** Any preliminary clinical signals referenced only in blocked press-release or abstract sources remain `[BLOCKED]` and must not be asserted in downstream outputs. Do not use n=6, 100% DCR, or DTH response data as a factual baseline without explicit `[BLOCKED — source not retrieved]` tagging.
- **Resolution path:** Direct retrieval of AACR 2026 abstract CT051 or BusinessWire press releases (currently Akamai-blocked); or interim data from Brenus under NDA/CDA; or await peer-reviewed publication.
- **Current confidence:** `[BLOCKED]`

### B-004 — Bevacizumab Arm Assignment in BreAK CRC-001
- **What is blocked:** Which arms receive bevacizumab; rationale for optionality
- **Why blocked:** Protocol document not publicly available; registry states "with or without" only
- **Resolution path:** Protocol document from Brenus
- **Current confidence:** `[PROVISIONAL]`

### B-005 — ASCO 2024 Abstract-Specific Claims
- **What is blocked:** Any claims specific to ASCO 2024 abstract content (BioSpace/BusinessWire blocked by 404/Akamai)
- **Why blocked:** Retrieval failed in PhD verification session
- **Resolution path:** Direct abstract retrieval from ASCO meeting library or Brenus-provided materials
- **Current confidence:** `[BLOCKED]` for ASCO 2024 abstract-specific claims

---

## PART VII — ENGINE-ROUTABLE CLAIM SUMMARY TABLE

This table is the machine-ingestible reference. All 49 claims are listed with their canonical confidence label. Downstream agents should use this table to look up any claim before asserting it.

| claim_id | claim_text (abbreviated) | confidence | engine_routable | corrected_from |
|----------|--------------------------|------------|-----------------|----------------|
| A-001 | NCT = NCT06934538 | VERIFIED | yes | — |
| A-002 | Sponsor ID = BreAK CRC-001 | VERIFIED | yes | — |
| A-003 | Sponsor = Brenus Pharma (industry) | VERIFIED | yes | — |
| A-004 | Phase I/IIA open-label multicenter | VERIFIED | yes | — |
| A-005 | Two-part design; ~21–33 Ph1; ~57–60 Ph2A; total 90 | VERIFIED | yes | — |
| A-006 | Three arms: Ph1, 2A-1 (MSS), 2A-2 (MSI-H) | VERIFIED | yes | C-001: prior canon said MSS-only |
| A-007 | All arms: BRAF WT, KRAS mutated | VERIFIED | yes | — |
| A-008 | BRAF mutation = exclusion criterion #7 | VERIFIED | yes | — |
| A-009 | Intervention: STC-1010 + IS (CP+GMCSF) + mFOLFOX6 ± bev | VERIFIED | yes | — |
| A-010 | Ph1 primary: safety/MTD/RP2D, CTCAE v5, 28-day window | VERIFIED | yes | — |
| A-011 | Ph2A primary: PFS rate at 12 months, RECIST 1.1 | VERIFIED | yes | — |
| A-012 | Ph2A secondary: CBR, ORR, DOR, PFS, OS, resection rate | VERIFIED | yes | — |
| A-013 | Exploratory: biomarkers blood+biopsy at T0/1m/2m/6m/12m/Tprog | VERIFIED | yes | — |
| A-014 | Eligibility: age 18–75, ECOG ≤1, 1L, KRAS/BRAF required | VERIFIED | yes | — |
| A-015 | Active autoimmune disease = exclusion | VERIFIED | yes | — |
| A-016 | Start 2025-06-17; primary completion 2028-06; RECRUITING | VERIFIED | yes | — |
| A-017 | 5 French sites recruiting; 4 sites not yet recruiting incl. JHU | VERIFIED | yes | — |
| A-018 | FDA-regulated drug; DMC oversight | VERIFIED | yes | — |
| A-019 | Ph1 immune endpoint: DTH at 1/24/48/72h post-injection | VERIFIED | yes | — |
| B-001 | NCT03050814 = QUILT-2.004, randomized Ph2, Ad-CEA+avelumab | VERIFIED | yes | C-002: prior cited NCT02853604 |
| B-002 | Sponsor NCI/NIH; PI Julius Strauss; sites NIH+Lombardi | VERIFIED | yes | — |
| B-003 | TERMINATED at interim for futility; completion 2021-08-25 | VERIFIED | yes | C-006: prior framed as positive precedent |
| B-004 | n=30 enrolled (10 Arm A, 16 Arm B, 4 screen failures) | VERIFIED | yes | — |
| B-005 | PFS: Arm A 8.8m, Arm B 10.1m; HR 1.061 (0.380–2.966); p=0.91 | VERIFIED | yes | C-003: prior cited HR 1.02 (0.65–1.60) |
| B-006 | MSI-H/dMMR excluded from NCT03050814 | VERIFIED | yes | — |
| B-007 | Arm B: Ad-CEA Day1, avelumab Day1, bev Day2, oxali 68mg/m² Day2 | VERIFIED | yes | — |
| B-008 | Safety lead-in: 6 subjects, ≤1 DLT threshold | VERIFIED | yes | — |
| B-009 | SAEs: 9/10 Arm A, 10/16 Arm B; deaths 1/10, 1/16 | VERIFIED | yes | — |
| C-001 | Alzeeb 2024: MURINE lines only (CT26, CMT-93, LTPA, MC38) | VERIFIED | yes | C-005: prior attributed human lines |
| C-002 | LTPA (pancreatic) included for shared TAA rationale | VERIFIED | yes | — |
| C-003 | Hapten = DNFB 12.7 µg/mL 30 min | VERIFIED | yes | — |
| C-004 | Stressors: 10 Gy + 42°C/37°C; final 25 Gy; -80°C EBSS+sucrose | VERIFIED | yes | — |
| C-005 | IS: CP 15 mg/kg IP D-1; mGM-CSF 5 µg SC with vaccine | VERIFIED | yes | — |
| C-006 | Study A: IS+CT26-SH 100mm³ vs 238mm³ control, p<0.0003 | VERIFIED | yes | — |
| C-007 | Study B: IS+3CL-SH 150mm³ vs 341mm³ 1CL, p=0.0002; mOS 38 vs 31.5d | VERIFIED | yes | — |
| C-008 | Study C: MC38-PD1R survival p=0.00368; 60% responders; CD8+ p=0.045 | VERIFIED | yes | — |
| C-009 | Proteomics: 32% shared; 44% cell-line-specific; 1196 CT26-shared | VERIFIED | yes | — |
| C-010 | Safety: 76-mouse 8-week tox study — no treatment-related findings | VERIFIED | yes | — |
| C-011 | Authors' caveat: murine surrogate ≠ clinical product | VERIFIED | yes | — |
| C-012 | Fully Brenus-funded; 4 co-authors are Brenus consultants | VERIFIED | yes | — |
| D-001 | Human cell lines used in clinical product (company states) | COMPANY_CLAIM | yes | — |
| D-002 | "Over 200 cancer-related proteins" | COMPANY_CLAIM | yes | C-004: prior tagged [VERIFIED] |
| D-003 | Hapten = DNFB; carrier = CRP | CROSS_REFERENCED | yes | — |
| D-004 | GMP ready; scalable; worldwide patented | COMPANY_CLAIM | yes | — |
| D-005 | Pipeline: CRC, PDAC, HCC (STC-1010); ovarian (STC-1020) | COMPANY_CLAIM | yes | — |
| X-001 | Human cell line identity for STC-1010 (HCT116/HT29/LoVo) | BLOCKED | no | B-001 open |
| X-002 | Clinical GMP manufacturing parameters | BLOCKED | no | B-002 open |
| X-003 | Human clinical efficacy/safety data for STC-1010 | BLOCKED | no | B-003 open |
| X-004 | Bevacizumab arm assignment in BreAK CRC-001 | PROVISIONAL | no | B-004 open |
| X-005 | ASCO 2024 abstract-specific claims | BLOCKED | no | B-005 open |

---

## PART VIII — FILE STATUS REGISTRY

| File | Status | Action Required |
|------|--------|----------------|
| `brenus_canon_v2_master.md` | **THIS DOCUMENT — AUTHORITATIVE** | None |
| `brenus_verified_claim_ledger_v1.md` | COMPLETE — base artifact for this document | Read-only reference |
| `break_crc001_trial_analysis_agent2.md` | VERIFIED CORRECT — MSI-H arm already documented | No correction needed |
| `MSS_CRC_IO_comparator_trials_agent3.md` | CORRECTED 2026-04-28 — NCT, HR, framing fixed | Inline correction markers present |
| `crispro_fitgap_brenus_agent5.md` | CORRECTED 2026-04-28 — antigen tag and Gap 1 rewritten | Inline correction markers present |
| `brenus_crispro_master.md` | SUPERSEDED — contains errors C-001 through C-006 | Do not use; refer to this document |
| `brenus_scientific_anchor_alzeeb2024.md` | NEEDS REVIEW — may contain inherited labels | Cross-check against Part III of this document |
| `brenus_corporate_dossier_agent1.md` | NEEDS REVIEW — may contain "200+ antigens" as [VERIFIED] | Cross-check D-002 tag |
| `biomarker_biology_map_agent4.md` | NEEDS REVIEW — mechanistic hypotheses; no factual errors identified | Low priority |
| `internal_strategy_memo_agent6.md` | OUT OF SCOPE for PhD verification | Strategy document; not a factual claim source |
| `outreach_email_brenus_agent6.md` | OUT OF SCOPE for PhD verification | Outreach document; not a factual claim source |

---

## PART IX — DIFF LOG: CANON v1 → CANON v2

| Change ID | Type | Location | v1 Value | v2 Value | Evidence |
|-----------|------|----------|----------|----------|---------|
| DIFF-001 | Factual correction | Agent 3 Tier 3 table, NCT column | NCT02853604 | NCT03050814 | NCT03050814 API v2 |
| DIFF-002 | Factual correction | Agent 3 Tier 3 table, Top-Line Result | HR 1.02 (0.65–1.60) | HR 1.061 (0.380–2.966), p=0.91 | NCT03050814 results module |
| DIFF-003 | Framing correction | Agent 3 Tier 3 table, Trial Name/Status | Positive design precedent | TERMINATED for futility; negative result | NCT03050814 results module |
| DIFF-004 | Tag correction | Agent 5 Gap 1, antigen claim | [VERIFIED — Agent 1] | [COMPANY_CLAIM — Brenus website only] | Alzeeb et al. 2024 (does not use "200+" framing) |
| DIFF-005 | Tag correction | Agent 5 Guardrail 4 | [VERIFIED — Agent 1] | [COMPANY_CLAIM] | Same as DIFF-004 |
| DIFF-006 | Tag correction | Agent 5 resistance mapping section | ">200-antigen target panel" (unqualified) | "antigen target panel" (qualifier removed) | Same as DIFF-004 |
| DIFF-007 | Content rewrite | Agent 5 Gap 1 full text | Human lines "never publicly disclosed"; HCT116/HT29/LoVo implied | Alzeeb 2024 uses murine lines only; human line identity BLOCKED; HCT116/HT29/LoVo PROVISIONAL pending e14661 | Alzeeb et al. 2024 |
| DIFF-008 | Scope correction | All documents | BreAK CRC-001 = MSS-only trial | BreAK CRC-001 has three arms: Ph1, 2A-1 (MSS), 2A-2 (MSI-H) | NCT06934538 API v2 |
| DIFF-009 | New entry | Part VII claim table | Not present | X-001 through X-005 (BLOCKED/PROVISIONAL claims) | Ledger v1.0 Blockers B-001–B-005 |
| DIFF-010 | Blocker correction | Part VI B-003; Hard Stop #9 | "beyond n=6 press-release-only preliminary signals" (implicitly asserted n=6/DCR/DTH as baseline) | All human clinical data BLOCKED; n=6/DCR/DTH explicitly named as blocked-source data; Hard Stop #9 added | Ledger v1.0 policy: no claim from blocked source inherited; BusinessWire/BioSpace/AACR CT051 all failed retrieval |

---

*End of Canon v2 — 2026-04-28*
*PhD Verification Agent | CrisPRO Brenus Diligence Package*
*Next action: Retrieve ASCO 2023 abstract e14661 to resolve B-001 (human cell line identity)*
