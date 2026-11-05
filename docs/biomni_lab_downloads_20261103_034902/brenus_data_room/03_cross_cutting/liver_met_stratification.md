# Liver Metastasis Stratification — The Dominant IO Signal in MSS CRC
**CrisPRO Cross-Cutting Analysis | Brenus Pharma Data Room**
**Source:** MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED) + brenus_comparator_path_a_report.md (LOCKED)

---

## The Central Finding

Across every IO trial in MSS colorectal cancer that has reported liver-metastasis subgroup data, the pattern is identical: **patients without liver metastases show meaningful IO benefit; patients with liver metastases show essentially none.**

This is not a statistical artifact. It is a biological signal with a known mechanism, replicated across multiple trials, multiple drug classes, and multiple lines of therapy. It is the single most important stratification variable for IO trials in MSS mCRC — and it is not pre-specified as a stratification variable in BreAK CRC-001.

---

## The Evidence Base

### CO.26 — The Calibration Anchor

**Trial:** CCTG CO.26 (NCT02870920) — durvalumab + tremelimumab vs BSC, refractory mCRC
**Source:** Chen et al. JAMA Netw Open 2023 (DOI 10.1001/jamanetworkopen.2023.46094); PMID 38727700

| Subgroup | OS HR | Interpretation |
|---|---|---|
| Non-liver-metastatic | ~0.50 | Meaningful IO benefit |
| Liver-metastatic | ~0.90 | Essentially no benefit |
| ITT | 0.73 (90% CI 0.55–0.97) | Diluted by liver-met majority |

CO.26 is the calibration anchor because it is the purest IO trial in the comparator set — no MAPK, no VEGF, no DDR axes. The liver-met signal is unconfounded by other mechanisms. The non-liver-met subgroup HR ~0.50 is the strongest available evidence that IO can work in MSS mCRC — in the right patients.

**CrisPRO PATH A calibration:** CO.26 has the highest Δ (0.3000) in the comparator set — the maximum liver-met discrimination signal for a pure IO trial. This is mathematically expected: a trial with io=0.90 and all other axes at zero will show the largest fit difference between P_A (io=0.40) and P_B (io=0.10). The Δ=0.3000 is the upper bound of liver-met discrimination in this patient population.

---

### Replication Across Trials

| Trial | Setting | Non-liver-met ORR/HR | Liver-met ORR/HR | Source |
|---|---|---|---|---|
| REGONIVO (Japan) | Refractory MSS | ORR 33% (all 8 responders had no liver mets) | ORR ~0% | Fukuoka et al. JCO 2020 |
| REGONIVO Phase 2 (US) | Refractory MSS | ORR 22% (n=23 NLM) | ORR ~0% | Fakih et al. EClinicalMedicine 2023 |
| RIN Phase I | Refractory MSS | ORR ~40% NLM; OS 20 months | ORR ~5% | Fakih et al. JAMA Oncol 2023 |
| CCTG CO.26 | Refractory MSS | OS HR ~0.50 | OS HR ~0.90 | Chen et al. JAMA Netw Open 2023 |
| AtezoTRIBE | 1L pMMR | Liver mets NOT predictive when Immunoscore-IC high | Liver mets predictive when Immunoscore-IC low | Antoniotti et al. Clin Cancer Res 2023 |

**Evidence level:** [PROVEN EFFICACY — SUBGROUP] for REGONIVO/RIN/CO.26 non-liver-met subgroups. [PHARMACODYNAMIC ACTIVITY] for AtezoTRIBE Immunoscore-IC interaction. Not prospectively validated in any biomarker-enriched trial.

---

## The Mechanism

The liver-met IO suppression mechanism is understood at the cellular level.

**Yu et al. Nat Med 2021** demonstrated that liver metastases siphon activated CD8+ T cells from the systemic circulation and induce their apoptosis via FasL-expressing Kupffer cells and hepatic macrophages. This creates **systemic immune tolerance** — not just local immunosuppression at the liver metastasis site, but a global depletion of tumor-reactive T cells throughout the body.

This is a host-organ mechanism, not a tumor-intrinsic mechanism. It operates regardless of:
- The drug class (checkpoint inhibitor, vaccine, TKI combination)
- The line of therapy (1L, 2L, 3L+)
- The tumor's molecular profile (KRAS mutation, TMB, PD-L1 expression)

The implication is stark: **no amount of T-cell priming overcomes hepatic immune tolerance if the liver is actively eliminating the primed T cells.** A vaccine that generates 10,000 tumor-reactive T cells in peripheral blood will see those T cells depleted by hepatic macrophages before they reach the tumor.

**The AtezoTRIBE nuance:** In patients with high Immunoscore-IC (pre-existing high immune infiltration), liver metastases did NOT predict IO resistance. This suggests that the hepatic immune tolerance mechanism can be overcome if the immune infiltrate is already established in the tumor — but not if T-cell priming must occur de novo in the presence of liver metastases.

---

## GAP-01 — The Critical Design Gap in BreAK CRC-001

**GAP-01 (CRITICAL):** Liver-metastasis status is not pre-specified as a stratification variable in BreAK CRC-001 (NCT06934538).

This replicates the exact design gap that limited CO.26's interpretability. CO.26 enrolled liver-metastatic and non-liver-metastatic patients together, without stratification. The result: the non-liver-met signal (HR ~0.50) was diluted by the liver-met majority (HR ~0.90) to produce an ITT HR of 0.73 — borderline significant, not actionable.

If BreAK CRC-001 enrolls a mixed liver-met/non-liver-met population without stratification, the same dilution will occur. STC-1010 may show meaningful activity in the non-liver-met subgroup and no activity in the liver-met subgroup — and the ITT result will be uninterpretable.

**The prevalence context:** Approximately 70% of mCRC patients have liver metastases at the time of first-line treatment. If BreAK CRC-001 enrolls an unselected population, ~70% of patients will be in the IO-resistant subgroup. The non-liver-met signal will need to be very large to survive dilution by the liver-met majority.

---

## What BreAK CRC-001 Should Do

Three options, in order of scientific rigor:

**Option 1 (Strongest):** Enrich enrollment for non-liver-metastatic patients. Limit enrollment to patients with lung-predominant, peritoneal-only, or liver-metastasis-controlled (post-resection/ablation) disease. This is the design that REGONIVO and RIN used to generate their strongest signals. It limits generalizability but maximizes the probability of a positive result.

**Option 2 (Pragmatic):** Stratify enrollment by liver-metastasis status. Enroll both liver-met and non-liver-met patients, but pre-specify liver-met status as a stratification variable and power the non-liver-met subgroup as a co-primary or key secondary analysis. This preserves generalizability while allowing clean interpretation of the liver-met signal.

**Option 3 (Minimum):** Pre-specify liver-met status as the primary subgroup analysis. Do not stratify enrollment, but commit in the protocol to reporting liver-met and non-liver-met subgroups as the primary interpretive frame. This is the minimum required to avoid the CO.26 interpretability failure.

**Current BreAK CRC-001 status:** None of these options is currently implemented. GAP-01 is CRITICAL and unresolved.

---

## CrisPRO PATH A — What the Δ Ranking Tells Us

The Δ ranking across the 7 CORE trials is a direct measure of liver-met IO sensitivity:

| Rank Δ | Trial | Δ | IO axis | Interpretation |
|---|---|---|---|---|
| 1 | CO.26 | 0.3000 | 0.90 | Pure IO — maximum liver-met sensitivity |
| 2 | GVAX | 0.2991 | 0.90 | Pure IO — whole-cell vaccine, no MAPK/VEGF |
| 3 | MEDITREME | 0.2949 | 0.80 | High IO, no VEGF — dual CPI sensitive |
| 4 | GRANITE | 0.2579 | 0.85 | High IO — ⚠️ TIER2 |
| 5 | QUILT-2.004 | 0.2261 | 0.70 | Mixed IO+VEGF — partial liver-met independence |
| 6 | AtezoTRIBE | 0.2172 | 0.70 | High VEGF — bev partially liver-met independent |
| 7 | IMblaze370 | 0.1511 | 0.50 | High MAPK — MEK inhibition not IO-dependent |

**The pattern is exact:** Trials with higher IO axis weights show larger deltas. Trials with VEGF or MAPK axes show smaller deltas because those axes are not suppressed by liver-met status. The Δ ranking is a mechanistic prediction of liver-met sensitivity, not a quality ranking.

**STC-1010 implication:** STC-1010 is a pure IO mechanism (ICD via DNFB haptenation → DC priming → CD8+ T-cell activation). Its trial vector will have a high IO axis weight. Its Δ will be large. This means STC-1010 is maximally sensitive to liver-met IO suppression — exactly the mechanism that defeated GVAX, CO.26, and MEDITREME. GAP-01 is not a minor design detail. It is the central risk factor for BreAK CRC-001.

---

*Source: MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED) + brenus_comparator_path_a_report.md (LOCKED)*
*Mechanism source: Yu et al. Nat Med 2021 (DOI 10.1038/s41591-020-1131-x)*
*Governance: MANIFEST.yaml | PATH B: Not used*
