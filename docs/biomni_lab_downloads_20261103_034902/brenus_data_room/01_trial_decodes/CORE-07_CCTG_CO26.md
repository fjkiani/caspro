# CORE-07 — CCTG CO.26
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## Header

| Field | Value |
|---|---|
| Trial name | CCTG CO.26 |
| NCT identifier | NCT02870920 |
| Sponsor | Canadian Cancer Trials Group (CCTG) |
| Phase | Randomized Phase II |
| Setting | Refractory mCRC (≥2 prior lines), ~90% MSS |
| Tier | **TIER1** — peer-reviewed, verified |
| Admissibility | VERIFIED — PMID 38727700 (Clin Cancer Res 2024); Chen et al. JAMA Oncol 2020 |
| Status | COMPLETED — modest OS signal; pTMB subgroup significant |
| Role in CrisPRO | **Calibration anchor** — highest Δ (0.3000); liver-met discrimination reference |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | OS |
| OS HR (ITT) | 0.73 (90% CI 0.55–0.97, p=0.07) — modest signal |
| Median OS — durvalumab + tremelimumab | 6.6 months |
| Median OS — BSC | 4.1 months |
| **pTMB ≥28 subgroup OS HR** | **0.34 (90% CI 0.18–0.63)** — significant signal |
| Non-liver-met subgroup OS HR | ~0.50 |
| Liver-met subgroup OS HR | ~0.90 |
| Tissue TMB | Not predictive |
| Verdict | **Modest ITT signal; pTMB-high and non-liver-met subgroups show separable biology** |

**Evidence level:** [PROVEN EFFICACY — SUBGROUP] — pTMB ≥28 subgroup OS HR 0.34 is statistically significant. ITT OS HR 0.73 is borderline (p=0.07). Tissue TMB is not predictive. pTMB threshold was not pre-specified — hypothesis-generating only.

**Failure domains:**
- **D2 Selection** — Broad enrollment diluted signal; liver-met subgroup (HR ~0.90) dilutes non-liver-met subgroup (HR ~0.50); pTMB-high is rare (~10-15% of MSS CRC)
- **D6 Interpretability** — pTMB ≥28 threshold was data-driven, not pre-specified; GuardantOMNI-specific assay; 2L+ population; not prospectively validated

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.00 | No DDR pathway targeting |
| mapk | 0.00 | No MAPK targeting |
| pi3k | 0.00 | No PI3K targeting |
| vegf | 0.00 | No anti-VEGF component |
| her2 | 0.00 | No HER2 targeting |
| io | 0.90 | Durvalumab (PD-L1) + tremelimumab (CTLA-4) — pure IO, dominant axis |
| efflux | 0.00 | Refractory but no efflux-specific targeting |

**Vector norm ‖t‖₂:** 0.9000

**Pure IO note:** CO.26 has the simplest trial vector in the comparator set — a single dominant axis (io=0.90) with all other axes at zero. This makes it the ideal calibration anchor: any change in the IO axis weight produces a proportional change in fit score, with no confounding from other axes.

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.4000** |
| fit_B (liver-met POS) | 0.1000 |
| Δ (fit_A − fit_B) | **0.3000** |
| Rank by fit_A | 7 of 7 (lowest) |
| Rank by Δ | **1 of 7 (highest)** |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** CO.26 has the lowest fit_A (0.4000) because the patient's MAPK=0.70 and VEGF=0.30 are entirely unmatched — CO.26 has no MAPK or VEGF axes. The highest delta (0.3000) is because a pure IO trial is maximally sensitive to IO-axis liver-met suppression. The delta is driven entirely by the io axis difference between P_A (io=0.40) and P_B (io=0.10).

**Why CO.26 is the calibration anchor:** The delta of 0.3000 represents the maximum possible liver-met discrimination signal for a pure IO trial in this patient population. Every other trial in the comparator set has a lower delta because their non-IO axes (MAPK, VEGF) partially offset the IO-axis liver-met sensitivity. CO.26 is the pure case — the upper bound of liver-met discrimination.

**What the score does NOT mean:** CO.26 is not a better trial than QUILT-2.004. The delta ranking is a discrimination test, not a quality ranking. CO.26's low fit_A reflects mechanism mismatch with the patient profile, not clinical inferiority.

---

## Decode Narrative

CO.26 is the most important trial in the comparator set for understanding liver-met stratification in MSS CRC IO.

The ITT result (OS HR 0.73, p=0.07) is borderline — not significant by conventional thresholds, but a real signal in a refractory population where BSC is the comparator. The pTMB ≥28 subgroup (OS HR 0.34) is the strongest biomarker signal in MSS CRC IO to date. It identifies a rare but responsive subgroup — approximately 10-15% of MSS CRC patients — who have sufficient mutational burden to generate T-cell responses that checkpoint blockade can sustain.

But the liver-met finding is the most important output from CO.26 for BreAK CRC-001.

Non-liver-metastatic patients: OS HR ~0.50. Liver-metastatic patients: OS HR ~0.90. The difference is not subtle. Patients without liver metastases showed meaningful IO benefit. Patients with liver metastases showed essentially no benefit. This is not a statistical artifact — it is a biological signal that has been replicated across REGONIVO, RIN, and AtezoTRIBE.

The mechanism is understood. Liver metastases siphon activated CD8+ T cells and induce their apoptosis via FasL-expressing macrophages (Yu et al. Nat Med 2021). This creates systemic immune tolerance that is not tumor-intrinsic — it is a host-organ mechanism. No amount of T-cell priming overcomes it if the liver is actively eliminating the primed T cells.

**The pTMB caveat:** The pTMB ≥28 threshold was not pre-specified. It was identified post-hoc using GuardantOMNI liquid biopsy in a 2L+ population. The threshold is approximately 3× the standard TMB-H cutoff (≥10 mut/Mb). It has not been prospectively validated. Tissue TMB was not predictive in CO.26 — only plasma TMB showed the signal. This distinction matters: pTMB and tissue TMB are not interchangeable.

---

## BreAK CRC-001 Implication

**Single actionable lesson — GAP-01 CRITICAL:** BreAK CRC-001's failure to pre-specify liver-met status as a stratification variable replicates the exact design gap that limited CO.26's interpretability. The CO.26 non-liver-met subgroup HR ~0.50 is the strongest available evidence that liver-met stratification is the highest-leverage design variable for IO in MSS mCRC. BreAK CRC-001 must address GAP-01 — either by stratifying enrollment by liver-met status or by pre-specifying liver-met status as the primary subgroup analysis. Without this, any BreAK CRC-001 result will face the same interpretability challenge that CO.26 faced.

**Secondary implication:** pTMB ≥28 mut/Mb [HYPOTHESIS-GENERATING — P-006, Pint=0.070, GuardantOMNI-specific, 2L+ population] should be pre-specified as an exploratory biomarker in Phase IIa. Tissue TMB is permanently closed as a predictive biomarker in MSS CRC (V-014).

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 |
| Primary OS source | Chen et al. JAMA Oncol 2020 (DOI 10.1001/jamaoncol.2020.0910) |
| pTMB source | Loree et al. Clin Cancer Res 2024 (DOI 10.1158/1078-0432.ccr-24-0268); PMID 38727700 |
| Liver mets source | Chen et al. JAMA Netw Open 2023 (DOI 10.1001/jamanetworkopen.2023.46094) |
| Evidence level | PROVEN EFFICACY — SUBGROUP (pTMB ≥28); PHARMACODYNAMIC ACTIVITY (ITT) |
| Calibration anchor | YES — highest Δ (0.3000); liver-met discrimination reference |
| BLOCKED fields | None in this file |
| PATH B | Not used |
