# Brenus Repo Intelligence Report
**Document:** brenus_repo_intelligence_report.md  
**Date:** 2026-07-05  
**Workers:** W1 (vectors), W2 (Sanofi/8D), W3 (scientific), W4 (BD), W5 (governance)  
**Status:** SYNTHESIS COMPLETE — all 5 workers merged

---

## Executive Summary

The Brenus repo contains **200+ files** across 6 major work streams. This report synthesizes every vector, fit score, governance artifact, scientific output, and BD intelligence item found across the full repository. Five parallel workers excavated the repo; this document is the authoritative merged output.

**Key numbers at a glance:**
- **33 vector/score entries** across 7 governance states (W1)
- **24 anchor claims** verified in Sanofi dossier; 1 discrepancy resolved (W2)
- **13/36 panel genes** with zero somatic mutations in 1,879 brain met patients; AUROC=0.689 (W3)
- **33 pharma targets** ranked; top=Inhibrx (fit=4.5); 10 outreach strategies ready (W4)
- **5 open blockers**, 1 active scientific conflict (SC-001), 2 permanently quarantined artifacts (W5)

---

## 1. Vector Inventory (W1)

### 1.1 Governance Breakdown (33 entries)

| Status | Count | Description |
|--------|-------|-------------|
| LOCKED | 19 | Verified, signed, production-ready |
| APPROXIMATE | 8 | ATR/DDR trial vectors — exact values in trade-secret trial_moa_vectors.json |
| QUARANTINED | 1 | LATIFY delta (two conflicting values) |
| MISSING | 1 | NCT02264678 patient_B vector not defined |
| PARTIAL | 2 | DL-03, PC-05 — scores clean, narrative/design pending |
| CLEAN | 1 | CRC ranker (485 MSS TCGA patients) |
| SUPERSEDED_BY_V2 | 1 | Registry v1 |

### 1.2 Canonical Vectors (LOCKED)

**STC-1010 Trial Vector (two versions — important):**

| Version | Source | ddr | mapk | pi3k | vegf | her2 | io | efflux | rss | ‖t‖₂ | fit |
|---------|--------|-----|------|------|------|------|----|--------|-----|-------|-----|
| Ranker (correct) | canonical_vectors.py | 0.10 | 0.30 | 0.10 | 0.20 | 0.00 | 0.80 | 0.10 | 0.10 | 0.9000 | 0.6944 |
| KG v2 (BD materials) | KG v2 JSON | 0.10 | 0.30 | 0.10 | 0.30 | 0.05 | 0.80 | 0.10 | 0.10 | 0.9288 | 0.7375 |

The KG v2 version is a documented transcription error, governance-locked for BD materials only. The ranker version is correct for all computational work.

**IO CORE Patient Profiles (LOCKED, 7D):**

| Profile | Label | ddr | mapk | pi3k | vegf | her2 | io | efflux | ‖p‖₂ |
|---------|-------|-----|------|------|------|------|----|--------|-------|
| P_A | Liver-met NEG, IO-permissive | 0.10 | 0.70 | 0.20 | 0.30 | 0.00 | 0.40 | 0.05 | 0.8902 |
| P_B | Liver-met POS, IO-suppressed | 0.10 | 0.70 | 0.20 | 0.30 | 0.00 | 0.10 | 0.05 | 0.8016 |

**p_ref (DDR-dominant reference):** {ddr:0.88, mapk:0.12, pi3k:0.05, vegf:0.02} → ceiling=0.8898 under PATH A. This mathematically proves DL-07 (DDR mean=0.983) is impossible.

### 1.3 IO CORE Locked Scores (PATH A, locked 2026-05-04)

| Trial | fit_A | fit_B | Δ | Rank_A | Note |
|-------|-------|-------|---|--------|------|
| IMblaze370 (CORE-04) | 0.8262 | 0.6751 | 0.1511 | 1 | FALSE POSITIVE — Phase III negative |
| AtezoTRIBE (CORE-05) | 0.5843 | 0.3671 | 0.2172 | 2 | |
| QUILT-2.004 (CORE-01) | 0.5815 | 0.3553 | 0.2261 | 3 | Most similar to STC-1010 |
| GRANITE GO-010 (CORE-02) | 0.5411 | 0.2832 | 0.2579 | 4 | TIER2 — directional only |
| MEDITREME (CORE-06) | 0.5037 | 0.2089 | 0.2949 | 5 | |
| GVAX+CY+Pembro (CORE-03) | 0.4486 | 0.1495 | 0.2991 | 6 | |
| CCTG CO.26 (CORE-07) | 0.4000 | 0.1000 | 0.3000 | 7 | Pure IO — max liver-met sensitivity |

### 1.4 ATR/DDR Approximate Vectors (APPROXIMATE — exact values in trial_moa_vectors.json)

| Trial | Patient A | Patient B | Documented Δ | Status |
|-------|-----------|-----------|--------------|--------|
| Berzosertib (NCT02595892) | RS-Low (ddr=0.20) | RS-High (ddr=0.55) | 0.138 | DOCUMENTED_NOT_REPRODUCED |
| Adavosertib (NCT03579316) | PTEN-intact (ddr=0.60) | PTEN-loss (pi3k=0.80) | 0.307 | DOCUMENTED_NOT_REPRODUCED |
| CAPRI (NCT03462342) | Pre-PARPi (ddr=0.70) | Post-PARPi (+efflux=0.40) | 0.108 | DOCUMENTED_NOT_REPRODUCED |
| LATIFY (NCT05450692) | STK11-loss (io=0.75) | STK11-intact (io=0.10) | 0.366 / 0.2641 | QUARANTINED (CT-03) |
| NCT02264678 | PARPi-naïve (ddr=0.70) | NOT STATED | None | MISSING (CT-04) |

**Critical discrepancy (W1 finding):** Berzosertib patient_A vector differs between `retroactive_prediction_run.py` (fit_A=0.2030) and `path_a_recomputation_lock_v1.md §5` (fit_A=0.8839). Two documents use different patient vector definitions for the same trial — governance inconsistency requiring resolution.

### 1.5 CRC Ranker Results (CLEAN, commit c9d9a72)

| Cohort | n | STC-1010 mean fit | Δ vs best | recall@3 | MRR | Rank-1 rate |
|--------|---|-------------------|-----------|----------|-----|-------------|
| Unselected MSS | 485 | 0.5605 | −0.1647 | 0.5876 | 0.3112 | 1.9% |
| TMB ≥25 mut/Mb | 9 | 0.8644 | +0.143 | 1.000 | 1.000 | 100% |

IO crossover (STC-1010 beats PRIME): TMB ≈ 30.1 mut/Mb (io=0.44).

---

## 2. Sanofi Dossier + 8D Audit (W2)

### 2.1 Stress Test Verdict
**"SOURCE OF TRUTH ESTABLISHED — ALL FILES CLEAN"**

- 24 anchor claims verified; 1 discrepancy found and resolved
- Resolved: pTMB CI was 95% CI 0.16–0.73 (old error) in 2 files → corrected to **90% CI 0.18–0.63** (PMID 38727700)
- 5/5 cross-file consistency checks passed

### 2.2 Single Source of Truth (Key Values)

| Claim | Authoritative Value | Source |
|-------|---------------------|--------|
| pTMB CI | 90% CI 0.18–0.63 | PMID 38727700 |
| pTMB HR | 0.34 (p=0.022) | PMID 38727700 |
| CO.26 liver-met HR | 1.39 (90% CI 1.02–1.90, Pint=0.02) | PMC10698621 Table 2 |
| CO.26 no-LM HR | 0.54 (90% CI 0.35–0.96, Pint=0.02) | PMC10698621 Table 2 |
| AtezoTRIBE Pint | 0.990 | Antoniotti Lancet Oncol 2022 |
| REGONIVO liver-met | 0/5 responders | NCT04126733 |
| CRC CEACAM5 any-pos | 98.7% | Jansen 2024 DOI:10.3390/cancers16234052 |
| CRLM CEACAM5 | 79% | Warmerdam 2025 DOI:10.1186/s13550-025-01354-z |
| cCEA ≥100 ORR | 41.7% vs 8.1% (P=0.003) | PMC12720031 (NSCLC only) |
| IHC-cCEA Spearman ρ | 0.43 | PMC12720031 |
| CEACAM5 ≥80% fraction | 0.28 (NSCLC proxy — CRC replacement pending) | OA-08 |
| Pool at ≥80% IHC | 13,090 patients/yr (US) | 46,750 × 0.28 |
| CARMEN-LC03 ≥80% OS HR | 0.71 (post-hoc trend) | Besse IASLC 2024 WCLC |

### 2.3 8D Remediation Log (Key Items)

| Item | Original Claim | Repair | Remaining Blocker |
|------|---------------|--------|-------------------|
| LOG-01 (DL-01/PC-01/CT-05) | "Provisional filed" | → DRAFT label | USPTO filing receipt |
| LOG-02 (DL-06/PC-07) | Priority date 2026-02-22 as legal fact | → PENDING USPTO receipt | USPTO filing receipt |
| LOG-03 (DL-02/PC-02) | Script runs in ~2 sec, identical results | → PERMANENTLY DOWNGRADED | Not upgradeable |

### 2.4 Sanofi Dossier File Inventory (37 files)
Primary deliverables (7), validation layer (4), superseded (2), 8D audit (11), source of truth (1), stress test (1), formula governance (11).

---

## 3. Scientific Outputs (W3)

### 3.1 Brain Metastasis Manuscript (v2, May 2026)

**Title:** "Multi-Modal Functional Genomics Reveals Epigenetic Drivers of Brain Metastasis Invisible to Mutation-Centric Panels"  
**Target journal:** Cancer Cell | **Status:** Ready for co-author review

**Cohort:** MSK-MET (n=1,879 confirmed brain metastasis patients)  
**Panel:** 36 genes from 5 evidence streams (CRISPRa, ATAC-seq, transcriptomics, AlphaFold3, Evo2)

**Key finding:** 13/36 panel genes with strongest functional evidence have **zero somatic mutations** in 1,879 patients — structural blind spot in mutation-centric paradigm.

**Apex driver — BACE1:**
- CRISPRa LFC: +7.28 (highest in panel)
- Expression: 685 RPM (brain met) vs 4.4 RPM (ECM) = **156-fold upregulated**
- Somatic mutations in 1,879 patients: **0**
- Mechanism: BBB extravasation via APP cleavage
- Repurposing opportunity: BACE1 inhibitors (extensive Alzheimer's Phase II/III safety data)

**Zero-mutation genes (13):** BACE1, NOM1, MMP9, MMP2, CLDN5, CCL2, TWIST1, ICAM1, FAM72A, VEGFB, ATP10D, SLC25A32, BACE2

### 3.2 Evo2 Zero-Shot Scores (Key Variants)

| Variant | n patients | Δll | Mechanism | Interpretation |
|---------|-----------|-----|-----------|----------------|
| KRAS G12C | 95 | −0.148 | GOF (covalent target) | Near-neutral — exploits conserved switch |
| KRAS G12D | 57 | +0.152 | GOF | Tolerated |
| KRAS G12V | 48 | +0.259 | GOF | Tolerated |
| EGFR L858R | 69 | +0.088 | GOF | Tolerated — disrupts autoinhibition |
| PIK3CA H1047R | 76 | −0.615 | GOF | Disruptive — charge reversal at conserved site |
| TP53 R175H | 33 | −0.622 | LOF | Strongly disruptive |
| TP53 G245D | 9 | −0.626 | LOF | Strongly disruptive |
| TP53 R248W | 17 | +0.099 | LOF | Benign-like (DNA contact, not structural) |
| CCND1 E279* | — | −1.264 | LOF | Most disruptive in cohort |
| BRCA1 E1526* | — | −1.258 | LOF | Second most disruptive |

**Variant distribution (n=1,150):** Disruptive (<−0.5): 89 (7.7%) | Uncertain: 1,020 (88.7%) | Benign-like (>+0.5): 41 (3.6%)

### 3.3 AUROC Performance

| Signal | AUROC | 95% CI |
|--------|-------|--------|
| Composite (class-aware) | **0.689** | [0.447, 0.900] |
| TSG subpanel | **0.833** | [0.375, 1.000] |
| ONC subpanel | 0.619 | [0.306, 0.901] |
| CRISPRa alone (|LFC|) | 0.656 | [0.405, 0.882] |
| Evo2 alone | 0.578 | [0.338, 0.811] |
| Signed CRISPRa LFC | 0.39 | — |

AUPRC=0.831 | P@3=1.00 | P@5=0.80 | P@10=0.90  
Evo2 ↔ CRISPRa Pearson r=0.016 (orthogonal — independent biological axes)

### 3.4 Class-Aware Composite Weights

| Class | CRISPRa |LFC| | ATAC | Evo2 | Denominator |
|-------|------------|------|------|-------------|
| TSG | 0.60 | 0.20 | 0.15 | 0.95 |
| ONC | 0.25 | 0.35 | 0.20 | 0.80 |

---

## 4. BD Intelligence (W4)

### 4.1 CrisPRO Target Ranking (33 companies)

| Rank | Company | Drug | Target | Tier | Fit | Hook |
|------|---------|------|--------|------|-----|------|
| 1 | Inhibrx Biosciences | Ozekibart (INBRX-109) + FOLFIRI | DR5 | 2 | 4.5 | RAS/RAF-agnostic responses — no predictive biomarker |
| 2 | Agenus | BOT/BAL | CTLA-4+PD-1 | 2 | 4.25 | TARIO-2 partnership — prospective validation gap |
| 3 | Daiichi Sankyo/AZ | T-DXd (ENHERTU) | HER2 | 1 | 4.0 | HER2 IHC necessary but not sufficient |
| 4 | AstraZeneca | Durvalumab combos | PD-L1 | 1 | 3.75 | CO.26 liver-met signal — prospective validation |
| 5 | Merus B.V. | Petosemtamab (MCLA-158) | EGFR×LGR5 | 2 | 4.75 | LGR5 biomarker gap |
| 5 | Oncolytics Biotech | Pelareorep + Bev + FOLFIRI | Oncolytic virus | 3 | 4.75 | Biomarker gap for oncolytic response |
| 7 | Mirati/BMS | Adagrasib + Cetuximab | KRAS G12C | 1 | 3.5 | Co-mutation landscape |
| 7 | Amgen | Sotorasib + Panitumumab | KRAS G12C | 1 | 3.5 | Co-mutation landscape |
| 9 | Roche/Genentech | Atezolizumab + chemo | PD-L1 | 1 | 3.25 | IMblaze370 false-positive governance |
| 10 | BioNTech/Roche | Autogene cevumeran | Neoantigen mRNA | 3 | 4.25 | Neoantigen prediction gap |

All 10 outreach strategies: status=outreach-ready, posture=gap-hook, channel=linkedin-first.

### 4.2 YC Progress Ledger (as of 2026-05-17)

- **Application submitted:** 2026-05-04
- **Live pharma partner:** Brenus Pharma (active Phase I/II CRC trial)
- **Trial failure ledger:** $2B+ decoded across 8 programs; 6 repurposable assets identified
- **Pipeline:** 42-lead qualified from AACR 2026; AstraZeneca in active discussions
- **Decoded failures:** CheckMate 143/498/548 (~$500M), AVAglio/RTOG 0825 (~$400M), AZ EGFR inhibitors (~$300M), IMblaze370 (~$300M), ACT IV (~$200M)

---

## 5. Governance (W5)

### 5.1 Lane Status (as of 2026-05-13)

| Lane | Status | Key Blocker |
|------|--------|-------------|
| L1 Corporate Dossier | ✅ CLEAN | — |
| L2 Trial Protocol | ✅ CLEAN | B-002 (GMP, non-blocking) |
| L3 Comparator Trials | ✅ CLEAN (lifted 2026-05-09) | — |
| L4 Biomarker Biology | ⛔ QUARANTINED | SC-001 (HT29 BRAF V600E conflict) |
| L5 CrisPRO Fit-Gap | 🟡 PARTIAL (lifted 2026-05-09) | DL-07 + PC-02 still quarantined |
| L6 Outreach Drafting | 🔴 BLOCKED | L5 not CLEAN |
| L7 SL Engine | ✅ CLEAN | — |
| L8 EscapeMap War Board | 🟡 ACTIVE | EM-03/04/05 BLOCKED_PENDING_ACCESS (human DARs) |

### 5.2 Open Blockers

| ID | Domain | Status | Resolution Path |
|----|--------|--------|----------------|
| B-002 | Clinical GMP manufacturing parameters | BLOCKED | Brenus data room / IND CMC |
| B-003 | Clinical efficacy data | PARTIALLY CLOSED — PRESS-RELEASE-ONLY | Peer-reviewed publication |
| B-004 | Bevacizumab arm assignment | PROVISIONAL | Protocol document from Brenus |
| B-006 | HT29 BRAF V600E conflict resolution | BLOCKED | Brenus internal data |
| SC-001 | HT29 BRAF V600E vs BRAF WT eligibility | ACTIVE CONFLICT | Cannot resolve without Brenus data |

**B-003 confirmed data (PRESS-RELEASE-ONLY):** n=6, DCR=100%, 0 DLTs, ~6mo follow-up, 1L MSS mCRC, AACR 2026 CT051 (BusinessWire Apr 14, 2026).  
**Hard rule:** DCR 100% in n=6 is indistinguishable from mFOLFOX6 ± bev SOC (~80–90% DCR). Do not cite as efficacy evidence.

### 5.3 Permanently Quarantined Artifacts

| Artifact | Reason | Resolution |
|----------|--------|-----------|
| DL-07 (DDR mean=0.983) | Mathematically impossible under PATH A (ceiling=0.8898) | Publication-blocking — Figure 2 provenance unknown |
| PC-02 (script reproducibility) | retroactive_prediction_run.py not clean | PERMANENTLY DOWNGRADED — not upgradeable |

### 5.4 Key Governance Decisions

| Date | Decision | Authority |
|------|---------|-----------|
| 2026-04-28 | PATH A formula signed as production ranker | Fahad Kiani |
| 2026-04-28 | 8D remediation approved; immediate downgrades applied | Fahad Kiani |
| 2026-04-28 | PC-02 permanently downgraded | Fahad Kiani |
| 2026-05-09 | LIFT-001: CT-01/CT-02 CLEAN, DL-03/PC-05 PARTIAL | Fahad Kiani |

### 5.5 EscapeMap War Board Status

- **OV anchor:** ANCHOR_CANDIDATE (GSE140082, ZEB1 HR=1.48, p=0.006)
- **GBM ZEB1:** PERMANENTLY CLOSED
- **CRC access tracks:** 3 tracks DRAFT_COMPLETE (dbGaP phs003428, Vivli, Alliance N0147) — human DARs required

---

## 6. Critical Discrepancies Requiring Human Resolution

| # | Discrepancy | Files | Impact |
|---|-------------|-------|--------|
| 1 | **Berzosertib patient_A vector** — fit_A=0.2030 (retroactive_prediction_run.py) vs fit_A=0.8839 (path_a_recomputation_lock_v1.md §5) | Two governance documents | Governance inconsistency — which vector is authoritative? |
| 2 | **DL-07 Figure 2 DDR mean=0.983** — mathematically impossible under PATH A (ceiling=0.8898) | Figure 2, trial registry | Publication-blocking — Figure 2 provenance unknown |
| 3 | **LATIFY delta** — +0.366 (patent) vs +0.2641 (receipt) | Two documents | QUARANTINED (CT-03) — B-03 unresolved |
| 4 | **SC-001 HT29 BRAF V600E** — vaccine contains BRAF V600E cell line; trial enrolls BRAF WT only | NCT06934538 + ASCO 2023 e14661 | ACTIVE CONFLICT — requires Brenus internal data |
| 5 | **STC-1010 trial vector** — canonical_vectors.py (vegf=0.20, her2=0.00) vs KG v2 (vegf=0.30, her2=0.05) | Two files | Documented transcription error — KG v2 locked for BD only |

---

## 7. Repo Structure Summary

| Directory | Contents | Status |
|-----------|----------|--------|
| `engagements/brenus/` | All Brenus work (200+ files) | Primary workspace |
| `engagements/brenus/outputs/sanofi_dossier/` | 37 Sanofi dossier files | CLEAN (stress test passed) |
| `engagements/brenus/formula_governance/` | PATH A decision, quarantine lift, recomputation lock | LOCKED |
| `engagements/brenus/scientific_outputs/` | Brain met manuscript v2, CEACAM5 decode, franchise matrix | ACTIVE |
| `engagements/brenus/evidence_wall/` | Trial autopsy, contradiction ledger v3, biomarker timing matrix | ACTIVE |
| `engagements/brenus/escape_map/` | OV/GBM/CRC escape maps, ZEB1 figures, access tracks | ACTIVE |
| `engagements/brenus/canon_reconciliation/` | Blocker ledger live, migration queue, downstream artifact map | ACTIVE |
| `master_intelligence/` | 33-target ranking CSV, priority matrix PNG | ACTIVE |
| `engagements/yc/` | YC progress ledger (2026-05-17) | ACTIVE |
| `engagements/foghorn/` | Foghorn Therapeutics engagement (separate) | ACTIVE |
| `engagements/` (10 pharma) | Inhibrx, Agenus, Daiichi Sankyo, AZ, BioNTech, Amgen, Mirati/BMS, Oncolytics, Roche, Merus | outreach-ready |
| `data/pds/` | TCGA COADREAD cohort, N0147 KM curves, patient_ak MBD4 manuscript | ACTIVE |
| `grounding_audit/` | Grounding receipt table v3, CEACAM5 fault log, MDC gate architecture | ACTIVE |

---

*Generated by 5-worker parallel synthesis. All values sourced from files read in this session. No values reconstructed from memory.*
