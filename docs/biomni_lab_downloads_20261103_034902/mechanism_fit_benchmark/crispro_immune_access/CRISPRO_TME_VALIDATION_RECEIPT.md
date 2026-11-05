# CRISPRO IMMUNE_ACCESS ("Stromal Cage") — In-House TME Validation Receipt

**Generated:** 2026-07-18 19:53 UTC
**Analyst:** Biomni (on-disk expression + locked clinical labels)
**Scope:** Direct application of the frozen ARTISTRY-7 `IMMUNE_ACCESS` formula to two independent, publicly-derived ovarian-cancer cohorts (GSE30161, GSE63885) to test whether the proprietary Stromal-Cage score separates real clinical endpoints.

---

## 1. Headline verdict

**NOT-SUPPORTED across all three prespecified endpoints and both scaling conventions.**

The frozen `IMMUNE_ACCESS` score does **not** discriminate platinum sensitivity or chemoresponse in either cohort. Every AUROC (9 configurations) falls below the pre-registered RELEASE-SUPPORTIVE bar, and every bootstrap/DeLong confidence interval crosses 0.5. One configuration (GSE63885 chemoresponse) runs **below chance** (AUROC 0.37), i.e. higher IMMUNE_ACCESS trended toward *worse* response — the opposite of the mechanistic hypothesis.

> **Reproducibility ≠ validity.** The `IMMUNE_ACCESS` computation is fully deterministic (recompute delta = 0.00e+00) and the upstream TCGA prognostic signal reproduces to 10 decimals. Neither fact makes the score a validated predictive biomarker. Determinism was measured; predictive separation was not achieved. This deliverable is **not** labeled "production-ready."

---

## 2. Frozen formula (verified against `run_artistry7_proxy_pipeline.py`)

```
IMMUNE_ACCESS = 0.40 · TCELL_GPS  −  0.35 · MYELOID_FLOOD  −  0.25 · STROMAL_CAGE
```

| Module | Weight | Genes |
|---|---|---|
| TCELL_GPS | +0.40 | CXCL9, CXCL10, CXCL11, CXCR3 |
| MYELOID_FLOOD | −0.35 | CCL2, CCL5, CCL7, CCR2 |
| STROMAL_CAGE | −0.25 | CXCL12, CXCR4, FAP, ACTA2, POSTN |

13 genes total. **Primary scaling (vault-faithful):** each gene z-scored within cohort, then module means, then weighted sum — this reproduces the verified `_signature_score` behavior. **Sensitivity scaling:** raw log2 module means ("formula-literal"). Both reported.

All 13 genes mapped to a GPL570 probe in **both** cohorts (100% mapping; hard-checked, would fail loudly otherwise).

---

## 3. Cohorts, endpoints, and class polarity

| Endpoint | Cohort | Definition | Positive class | n pos / n neg | Dropped (NA) |
|---|---|---|---|---|---|
| **Primary** — platinum sensitivity | GSE63885 | resistant vs {moderately + highly} sensitive (DFS-based, source labels) | sensitive | 41 / 34 | 26 |
| **Secondary** — chemoresponse | GSE63885 | CR/PR vs SD/P | CR/PR (responder) | 65 / 10 | 26 |
| **Secondary** — platinum sensitivity | GSE30161 | PFI < 180 d = resistant, **censoring-aware** | sensitive | 44 / 9 | 5 |

Polarity fixed so that higher IMMUNE_ACCESS = better immune access = hypothesized better outcome; AUROCs are reported honestly (values <0.5 are not silently flipped). Labels for GSE63885 reuse the project's previously locked derivations verbatim. GSE30161 censoring-aware rule: relapsed & PFI<180 → resistant; relapsed & PFI≥180 or censored & PFI≥180 → sensitive; censored & PFI<180 → excluded (indeterminate). Naive (no censoring exclusion) counts: 48 sensitive / 10 resistant.

---

## 4. Results (all configurations)

| cohort | endpoint | scaling | probe | n_pos | n_neg | AUROC | Boot CI lo | Boot CI hi | DeLong p | Fisher TIER p | C-index | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GSE63885 | platinum_sensitivity | z | cached | 41 | 34 | 0.5488 | 0.4218 | 0.6772 | 0.4740 | 1.0000 | 0.5115 | NOT-SUPPORTED |
| GSE63885 | platinum_sensitivity | raw | cached | 41 | 34 | 0.5789 | 0.4469 | 0.7023 | 0.2388 | 0.1647 | 0.5251 | NOT-SUPPORTED |
| GSE63885 | chemoresponse | z | cached | 65 | 10 | 0.3738 | 0.1923 | 0.5754 | 0.2249 | 0.5063 | — | NOT-SUPPORTED |
| GSE63885 | chemoresponse | raw | cached | 65 | 10 | 0.4462 | 0.2784 | 0.6200 | 0.5566 | 1.0000 | — | NOT-SUPPORTED |
| GSE30161 | platinum_sensitivity_censaware | z | cached | 44 | 9 | 0.5354 | 0.2374 | 0.7955 | 0.8151 | 1.0000 | 0.6237 | NOT-SUPPORTED |
| GSE30161 | platinum_sensitivity_censaware | raw | cached | 44 | 9 | 0.5657 | 0.2702 | 0.8308 | 0.6609 | 1.0000 | 0.6449 | NOT-SUPPORTED |
| GSE63885 | platinum_sensitivity | z | locked_shared | 41 | 34 | 0.5825 | 0.4569 | 0.7052 | 0.2143 | — | — | NOT-SUPPORTED |
| GSE63885 | chemoresponse | z | locked_shared | 65 | 10 | 0.4062 | 0.2277 | 0.6016 | 0.3570 | — | — | NOT-SUPPORTED |
| GSE30161 | platinum_sensitivity_censaware | z | locked_shared | 44 | 9 | 0.5126 | 0.2348 | 0.7879 | 0.9337 | — | — | NOT-SUPPORTED |

**C-index** for the continuous score vs time-to-event: GSE63885 DFS C-index = 0.5115 (n=75, 70 events); GSE30161 PFI C-index = 0.6237 (z) / 0.6449 (raw), n≈54 — the only values that drift above 0.6, but on 9 resistant patients with a Fisher TIER p = 1.0 (no categorical separation) and a bootstrap AUROC CI spanning 0.24–0.80.

---

## 5. Pre-registered decision rule (unchanged from prior project work)

- **RELEASE-SUPPORTIVE** = AUROC ≥ 0.70 **AND** CI-lower > 0.5
- **INCONCLUSIVE** = 0.60 ≤ AUROC < 0.70, or CI crosses 0.5
- **NOT-SUPPORTED** = AUROC < 0.60

Verdict is assigned using the **bootstrap** lower bound (primary for small/imbalanced classes). Nine of nine configurations → **NOT-SUPPORTED** (all AUROC < 0.60 except two GSE63885 raw/locked configs at 0.58, whose CIs still cross 0.5).

---

## 6. TIER_1A_ACCESSIBLE vs TIER_1B_CAGED (per-cohort median split, z)

- **GSE30161** (median = 0.0062): {'TIER_1B_CAGED': 29, 'TIER_1A_ACCESSIBLE': 29}
- **GSE63885** (median = 0.0102): {'TIER_1A_ACCESSIBLE': 51, 'TIER_1B_CAGED': 50}

No 2×2 TIER split reached significance against any endpoint (Fisher exact p ≥ 0.16; most p = 1.0).

---

## 7. Probe robustness (sensitivity analysis)

Only **2 of the 13** IMMUNE_ACCESS genes pick a different GPL570 probe across the two cohorts — **CXCL11** and **CXCR3** (both TCELL_GPS). Re-scoring with a single shared probe per gene (highest pooled-mean expression, locked across cohorts) moved AUROCs by ≤ 0.034:

| endpoint | cached AUROC | locked AUROC | Δ |
|---|---|---|---|
| GSE63885 platinum_sensitivity | 0.5488 | 0.5825 | 0.0337 |
| GSE63885 chemoresponse | 0.3738 | 0.4062 | 0.0324 |
| GSE30161 platinum_sensitivity | 0.5354 | 0.5126 | 0.0228 |

**Conclusion:** the NOT-SUPPORTED verdict is invariant to probe selection. No probe choice rescues the signal.

### Full gene→probe map (cached, per-cohort most-expressed)
| gene | probe_GSE30161 | probe_GSE63885 | same_probe |
| --- | --- | --- | --- |
| ACTA2 | 200974_at | 200974_at | True |
| CCL2 | 216598_s_at | 216598_s_at | True |
| CCL5 | 1555759_a_at | 1555759_a_at | True |
| CCL7 | 208075_s_at | 208075_s_at | True |
| CCR2 | 206978_at | 206978_at | True |
| CXCL10 | 204533_at | 204533_at | True |
| CXCL11 | 210163_at | 211122_s_at | **False** |
| CXCL12 | 209687_at | 209687_at | True |
| CXCL9 | 203915_at | 203915_at | True |
| CXCR3 | 217119_s_at | 207681_at | **False** |
| CXCR4 | 217028_at | 217028_at | True |
| FAP | 209955_s_at | 209955_s_at | True |
| POSTN | 210809_s_at | 210809_s_at | True |

---

## 8. Statistical methods

- **AUROC** on the continuous IMMUNE_ACCESS score (primary readout).
- **95% CI:** DeLong (parametric) **and** 2000× stratified (class-preserving) bootstrap; bootstrap is primary for small/imbalanced classes.
- **p-value:** DeLong two-sided vs AUROC = 0.5.
- **Categorical TIER split:** Fisher exact on the 2×2 (TIER_1A/1B × endpoint).
- **C-index:** lifelines `concordance_index` (continuous score vs time-to-event with event flags).
- **Determinism:** recompute-delta on IMMUNE_ACCESS_z = 0.00e+00.

---

## 9. Limitations (material)

1. **Discovery / association only — not a predictive-biomarker test.** Neither cohort received nemvaleukin (or any IO agent tied to the mechanism). This measures whether the TME score tracks platinum/chemo outcome at all; it cannot establish drug-benefit prediction.
2. **No prespecified analysis plan** existed before these two cohorts were scored; framing is exploratory.
3. **Small and imbalanced classes:** GSE30161 has only 9 platinum-resistant patients; GSE63885 chemoresponse has only 10 non-responders. Confidence intervals are correspondingly wide (events-per-variable is low), so a truly null score and an underpowered test are not distinguishable from these data alone — but nothing here provides positive support.
4. **Prognostic ≠ predictive.** The upstream TCGA-OV signal that reproduces to 10 decimals is a 3-tier prognostic log-rank in an untreated cohort; it does not transfer to platinum-response prediction here.
5. Public GEO-derived labels; platinum-sensitivity definitions differ slightly between the two source series (DFS-threshold vs PFI-threshold).

---

## 10. Deliverables & SHA-256 manifest

| file | bytes | SHA-256 |
|---|---|---|
| crispro_patient_scores_gse30161.csv | 12178 | `93fe66ebe677c8ce6b60805b53825f898e5aa9c09bd82ba422fea53cc0b8a440` |
| crispro_patient_scores_gse63885.csv | 21972 | `6c053be14b229b381b6285dbc15cbf4e4f46d12b51919c2695eaf9db6a7a2fc2` |
| crispro_tme_validation_metrics.csv | 1235 | `4f87bd91100e7e16c31021b7498bdf8a01eea094ee28eec57765cf75d4470d0d` |
| crispro_tme_roc_curves.png | 160115 | `b32c832ce60ff6ab7346820b5db6d508d9b596042b59fe8421323c72712a3cf6` |
| crispro_tme_roc_curves.svg | 43739 | `2929e70107697e002023b5f06bda322e387641e819fc3a9079200defd9bb7115` |

*(SHA-256 computed over the finalized files on 2026-07-18.)*
