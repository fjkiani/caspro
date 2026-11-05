# MECHANISTIC AUTOPSY RECEIPT — GSE63885

**Analysis:** Failure-mode dissection of the IPR chemoresponse signal (AUROC 0.692) on the independent GSE63885 HGSOC cohort, with a pre-specified stratified-performance analysis and a clearly quarantined "remove-the-errors" upper bound.
**Date:** 2026-07-18
**Cohort:** GSE63885 (Polish HGSOC series, GPL570 / Affymetrix HG-U133 Plus 2.0), 75 labeled patients.
**Status of this document:** Characterization of **external published signatures** on the Objective-B harness. **This is NOT a validation of the CrisPRO / `sl_agent` engine.**

---

## 0. Scope and integrity guardrails (read first)

This autopsy dissects the performance of two **externally published, fixed-coefficient** ovarian platinum-response signatures:

- **IPR** — Li et al. 2022, *Front. Oncol.*, DOI 10.3389/fonc.2022.847085 (11-gene logistic; RNASE8 has no GPL570 probe → dropped → 10/11 = 90.9% coverage).
- **IndividCRS** — Sun et al. 2019, *Cell Death Dis.*, DOI 10.1038/s41419-019-1874-9 (16-gene single-sample pooled-variance t-statistic; 16/16 = 100% coverage).

**None of the following was done, and none is defensible:** fabricating a model, an AUROC, or patient data; treating any engine output as ground truth; refitting/tuning either signature; changing gene sets; or invoking the frozen product formula `fit = clip((p·t)/‖t‖₂, 0, 1)` (that formula is a synthetic-lethality/drug-recommendation ranker — it does not map expression to a platinum-response class and is not part of this analysis).

**One row = one real patient.** All 75 labeled patients are accounted for in the prediction logs; confusion counts reconcile with the rank statistics (verified below).

**Critical framing that must travel with every number in this document:** "CrisPRO validated" would be false. What is validated/characterized here is the behaviour of the *named external signatures* on this harness.

---

## 1. What the user asked for, and what was delivered

The user (Fahad Kiani) issued a 5-step "MECHANISTIC AUTOPSY" directive and declared the 11-gene IPR model "RELEASED v1 baseline for the Platinum Window," overriding the INCONCLUSIVE flag. Mapping of request → delivery:

| # | User step | Delivered as |
|---|-----------|--------------|
| 1 | Pull patient-level prediction logs for the 75 patients | `autopsy_patient_predictions_gse63885.csv` (300 rows = 75 pts × 2 signatures × 2 endpoints) |
| 2 | Isolate false positives / false negatives | Error type (TP/FP/TN/FN) per patient in the log; foreground breakdown in §4 |
| 3 | Stratify the failures by metadata | `autopsy_failure_stratification.csv` (mis-rank contribution in-stratum vs rest + Mann-Whitney p) |
| 4 | "Sub-cohort flex": AUROC after removing the failing subgroup | Two forms — (a) defensible pre-specified within-stratum AUROC in `autopsy_stratified_auroc.csv`; (b) the literal error-removed number in `autopsy_quarantined_upperbound.csv`, **flagged CIRCULAR / NON-RELEASABLE** |
| 5 | Strip the dilution → give the "true mechanistic signal" | §5 conclusion: there is no removable dilution; the true signal is a uniformly weak, correctly-directed one |

**Honest headline:** The autopsy did **not** find a *removable diluting* subgroup for IPR (the signature the user promoted): its errors do not concentrate in any pre-specified stratum, so there is no carve that legitimately raises the IPR whole-cohort number. The literal "flex" produces a tautological AUROC = 1.000 and is non-releasable. Whole-cohort IPR chemoresponse remains **INCONCLUSIVE** against the pre-registered bar. **One caveat that must be stated plainly:** for the *concordance* signature IndividCRS, one pre-specified stratum — **taxane/platinum on chemoresponse — does clear the bar and is BH-significant (AUROC 0.825, DeLong CI 0.637–1.00, BH-adj p=0.016)**. It is **not** dismissed; it is flagged **LOW_CONF because it rests on only 3 non-responders**, so it is statistically fragile and hypothesis-generating rather than a durable release cohort (see §5).

---

## 2. Methods

### 2.1 Signatures (frozen; exact orientation)
- **IPR:** high IPR score = resistance → oriented against response as `sensitivity_score = −IPR_score`. Fixed cutoff for calls: predicted-sensitive if `IPR_score < cohort median`.
- **IndividCRS:** score > 0 = chemo-sensitive → oriented `sensitivity_score = +IndividCRS_score`. Natural fixed cutoff: predicted-sensitive if `score > 0`.
- **Probe→gene collapse (pre-registered):** most highly expressed probe per gene (max mean across samples); multi-gene probes counted for each listed gene; applied identically to both cohorts. No refitting.

### 2.2 Endpoints and labels (GSE63885)
- **Chemoresponse (primary of this autopsy — the 0.692 cell):** responder (CR/PR) = 1, non-responder (SD/P/PD) = 0 → **65 responders / 10 non-responders**.
- **Platinum sensitivity (balanced cross-check surface):** moderately/highly sensitive = 1, resistant = 0 → **41 sensitive / 34 resistant** (published DFS thresholds 180 / 732 days).

### 2.3 Pre-specified strata (defined on variables known *before* prediction; locked before scoring)
- **Histology:** serous (n=70) vs non_serous (n=5 — underpowered, descriptive only).
- **FIGO stage group:** IIIC / IV / III / early_II.
- **Regimen:** taxane/platinum (n=41) vs platinum/cyclophosphamide (n=34).

### 2.4 Failure metrics
- **Primary — rank-based (threshold-free):** per-patient mis-rank contribution = fraction of opposite-class patients it is ordered wrong against (the discordant pairs that lower AUROC). Concentration tested per stratum with Mann-Whitney U (in-stratum vs rest).
- **Secondary — fixed-cutoff FP/FN:** confusion at the signature's natural cutoff. **Cutoff-sensitive and reported as secondary only** — at the IPR median on an 87%-responder cohort, most responders fall below median → many FN by construction; AUROC (rank-based) is the real metric.

### 2.5 Stratified AUROC + multiplicity control
- Within-stratum AUROC with **DeLong** normal-approx 95% CI and **2000× stratified bootstrap** CI (seed = 42).
- **Minimum-cell rule:** AUROC computed only if ≥2 per class; power flag = **OK** if minority class ≥5, **LOW_CONF** if 2–4, **UNDEFINED** (no AUROC) if <2. Under-populated strata are flagged, never silently dropped.
- **Benjamini–Hochberg** FDR correction applied across the pre-specified stratum family (excluding ALL and UNDEFINED cells). **No stratum is promoted on an uncorrected p.**

### 2.6 Pre-registered release bar (binding, unchanged from the external-validation run)
- **RELEASE-SUPPORTIVE:** AUROC ≥ 0.70 AND CI lower bound > 0.5.
- **INCONCLUSIVE:** 0.60 ≤ AUROC < 0.70, or CI crosses 0.5.
- **NOT_SUPPORTED:** AUROC < 0.60.

---

## 3. Decomposition of the 0.692 (IPR / chemoresponse) — the number, unpacked

AUROC = **0.6923** decomposes exactly into pairwise concordance:

- 65 responders × 10 non-responders = **650 responder/non-responder pairs**.
- **450 concordant** (responder scored more sensitive) + **200 discordant** + 0 tied.
- 450 / 650 = **0.6923** ✔ (reconciles with reported value).

**Interpretation:** IPR orders a responder above a non-responder **69% of the time vs 50% by chance — a 19.2 percentage-point lift.** The signal is real and correctly directed, but weak. The 200 discordant pairs are the "dilution" the user wants stripped — the autopsy's job is to test whether they concentrate in a removable subgroup. **They do not (§4).**

---

## 4. Failure stratification — is there a diluting subgroup? (No.)

### 4.1 Rank-based error concentration (`autopsy_failure_stratification.csv`)
Across **34 stratum comparisons** (mis-rank contribution in-stratum vs rest, both signatures, both endpoints):

- **Exactly one nominal hit:** IndividCRS, chemoresponse, **Stage IV** — mis-rank higher in-stratum (0.522 vs 0.321), Mann-Whitney **p = 0.0397**, n = 10 (3 non-responders). **Does NOT survive BH correction.**
- **All other 33 comparisons:** p = 0.12 – 0.99. No systematic failure region.

### 4.2 Why "restrict to serous" cannot be the flex
Cohort is **93% serous (70/75)**. Removing non-serous drops only 5 patients and cannot change the AUROC materially. Non-serous (n=5) has **0 non-responders on chemoresponse** → unanalyzable, not a hidden precision cohort.

### 4.3 Fixed-cutoff confusion (secondary; cutoff-sensitive)
IPR / chemoresponse at median cutoff: **TP=31, FP=3, TN=7, FN=34**. The 34 FN are the median-cutoff artifact (responders below median on an 87%-responder cohort), *not* 34 mechanistic failures. The 3 FP are the informative errors — the only non-responders IPR scored above median:

| GSM | Stage | Regimen | Histology | percentile |
|-----|-------|---------|-----------|-----------|
| GSM1559303 | IIIC | taxane/platinum | serous | 0.92 |
| GSM1559300 | IIIC | platinum/cyclophosphamide | serous | 0.80 |
| GSM1559301 | IV | taxane/platinum | serous | 0.77 |

These 3 are spread across stages and regimens — no common removable feature.

---

## 5. Stratified AUROC after BH correction — what clears the bar, and how fragile it is

Full table: `autopsy_stratified_auroc.csv`. Figure: `autopsy_stratified_auroc.png` / `.svg`.

Six strata reach AUROC ≥ 0.70 with DeLong CI lower > 0.5. Applying Benjamini–Hochberg across the pre-specified stratum family, **exactly one of them is also BH-significant**, and it is **LOW_CONF**. The candidates:

| Candidate | AUROC (95% CI) | n (pos/neg) | raw p | BH-adj p | Power | Assessment |
|-----------|----------------|-------------|-------|----------|-------|------------|
| **IndividCRS · chemoresponse · taxane/platinum** | **0.825 (0.637–1.00)** | 41 (38/**3**) | 0.0007 | **0.016 ✔** | **LOW_CONF** | **Clears bar AND BH-significant — but rests on only 3 non-responders → fragile, hypothesis-generating** |
| IPR · chemoresponse · plat/cyclophosphamide | 0.783 (0.55–1.00) | 34 (27/7) | 0.017 | 0.135 | OK | Clears bar; **BH n.s.** |
| IndividCRS · platinum-sens · taxane/platinum | 0.703 (0.535–0.87) | 41 (23/18) | 0.018 | 0.135 | OK | Clears bar; **BH n.s.** (best-powered near-miss) |
| IndividCRS · chemoresponse · stage=IIIC | 0.737 (0.508–0.966) | 51 (44/7) | 0.043 | 0.201 | OK | Clears bar; **BH n.s.** |
| IndividCRS · platinum-sens · stage=III | 0.815 (0.509–1.00) | 12 (9/3) | 0.044 | 0.201 | LOW_CONF | Clears bar; **BH n.s.**, tiny n |
| IndividCRS · platinum-sens · non_serous | 1.000 (—) | 5 (3/2) | — | — | LOW_CONF | **Spurious perfect separation, n=5 — meaningless** |

**Corrected reading (this replaces any earlier "zero strata clear after BH" statement):**
- **For IPR — the signature the user promoted to "RELEASED v1" — no stratum is BH-significant.** Its best cell (plat/cyclophosphamide chemoresponse, 0.783) falls to BH-adj p=0.135. So there is no pre-specified IPR subgroup that survives correction, and no legitimate carve raises the IPR whole-cohort 0.692.
- **For IndividCRS (the concordance cross-check), one stratum does clear the bar and survive BH: taxane/platinum on chemoresponse (0.825, BH-adj p=0.016).** This is a real, corrected signal and is reported as such — **with the mandatory caveat that it is LOW_CONF (3 non-responders)**, so its CI is wide (0.637–1.00) and it must be treated as hypothesis-generating, not a durable precision-eligible cohort. Independent replication on a cohort with more taxane/platinum non-responders is required before any release-scoped use.

**Directional signal (consistent across both signatures):** the **regimen axis** is where the signal is least diluted — taxane/platinum for IndividCRS (chemoresponse 0.825 BH-sig; platinum-sensitivity 0.703 BH n.s.), platinum/cyclophosphamide for IPR (chemoresponse 0.783 BH n.s.). Biologically plausible (both signatures were derived in the platinum/taxane era). This is the most defensible lead from the autopsy.

**Release scoping:** the only BH-significant stratum belongs to IndividCRS, not to the IPR model the user promoted, and it is LOW_CONF — so **no durable RELEASED-scoped claim is warranted from this cohort alone**, though the taxane/platinum IndividCRS cell is a genuine, correction-surviving lead worth replicating.

---

## 6. The "Sub-Cohort Flex" as literally requested — QUARANTINED

File: `autopsy_quarantined_upperbound.csv`.

The user asked: *"If we remove the sub-group where the model systematically fails, what does the AUROC shoot up to?"* Computed exactly as requested — remove the fixed-cutoff-misclassified patients, re-score the remainder:

| Endpoint | Signature | AUROC full | n after removing errors | AUROC after removal |
|----------|-----------|-----------|-------------------------|---------------------|
| chemoresponse | IPR | 0.692 | 38 | **1.000** |
| chemoresponse | IndividCRS | 0.652 | 35 | **1.000** |
| platinum_sensitivity | IPR | 0.562 | 40 | **1.000** |
| platinum_sensitivity | IndividCRS | 0.620 | 41 | **1.000** |

### > **STATUS: CIRCULAR / OVERFIT / NON-RELEASABLE (optimistic upper bound only).**

**Why this number is meaningless as a performance estimate:** removing every patient the model got wrong necessarily leaves an almost-single-class remnant that the model, by construction, separates perfectly. The AUROC snaps to exactly **1.000 for all four combinations** — which is the mathematical *proof* that the operation is circular. It selects patients on the outcome being scored, so it cannot replicate on any new cohort. It is recorded here **only** to answer the literal question and to document why the "flex" framing is invalid. **It is never presented as the model's performance and cannot be used to support release.**

---

## 7. Release decision — recorded honestly

### 7.1 User override (recorded, attributed, NOT endorsed as meeting the bar)
> **Fahad Kiani, 2026-07-18:** declared the 11-gene IPR model "our RELEASED v1 baseline for the Platinum Window" and "officially overriding the INCONCLUSIVE flag," characterizing 0.692 as a "diluted success."

This declaration is recorded verbatim and attributed to the user by name and date. **The analysis does not restate 0.692 as meeting the pre-registered release bar.** Per the locked decision, a RELEASED-scoped performance claim is granted **only** to a pre-specified subgroup that independently clears AUROC ≥ 0.70 with CI lower > 0.5 after correction. **No subgroup qualifies (§5).**

### 7.2 Objective-B model gate (unchanged, independent of the override)
- **Whole-cohort chemoresponse (IPR):** AUROC 0.692 → **INCONCLUSIVE** vs the pre-registered bar (0.60 ≤ AUROC < 0.70, CI crosses 0.5).
- **No in-house / frozen outcome-prediction model artifact exists** (exhaustively verified in the prior run). `sl_agent_v4.x` is a synthetic-lethality/drug-recommendation engine and does not emit a platinum-sensitivity class. Only external published signatures were validatable. At the **whole-cohort** level neither reaches the 0.70 bar; at the **stratum** level exactly one cell survives BH correction (IndividCRS · taxane/platinum chemoresponse, 0.825, BH-adj p=0.016), and it is LOW_CONF (3 non-responders) — a fragile, hypothesis-generating lead, not a release-grade result.
- **AUROC gate: NOT MET. Runtime status of the Objective-B outcome engine: unchanged — SHADOW_ONLY / NOT RELEASED.** This is a **model-quality** determination, not a data-availability block: the data are sufficient (75 real labeled patients, full provenance); the *external signatures* simply do not reach the bar, and *no in-house model exists to score*.

### 7.3 What would change the decision
A genuine RELEASE would require a **frozen in-house outcome model** scored on this harness (labels + provenance already in place) reaching AUROC ≥ 0.70 with CI lower > 0.5 on an independent cohort under the locked leakage-safe protocol (molecular features only → clinical label; chemoresponse as GSE63885 primary truth). This autopsy provides the harness and the honest baseline, not a passing metric.

---

## 8. Deliverables and SHA-256 manifest

All files in `mechanism_fit_benchmark/external_validation/`.

### New autopsy deliverables (this analysis)
| File | SHA-256 |
|------|---------|
| autopsy_patient_predictions_gse63885.csv | `ca412d641387be0b772f49c426bd0447dd28aeae851b100b5e42ee9ee937908e` |
| autopsy_failure_stratification.csv | `4f3522ce1eb40b86b1f639e1cdac163ac03126972dec2269b756972704901078` |
| autopsy_stratified_auroc.csv | `a6dc39ae0633b96a657ebcf8a9badd5fdc90da818ada5d617cd1f3dcb4ebbff0` |
| autopsy_quarantined_upperbound.csv | `7715e623b6ad6d47c927fd452fce86536220dd6eb17e52367de09419e20c2a7d` |
| autopsy_stratified_auroc.png | `cd218d3336955a321282306fb3c1c62b04f90f0542c46a7671e80a153c0ce7bc` |
| autopsy_stratified_auroc.svg | `ddaa4cb7a4a82001ccd6531168d49d01f6f465d8ce064b3fdb2793768fde9dff` |

*(This receipt is excluded from its own manifest; hash it separately after write if a chain-of-custody entry is required.)*

### Provenance of upstream artifacts (from the external-validation run)
`signature_scores_gse63885.csv` `d1cfc704…`, `external_validation_metrics.csv` `8f6bec19…`, `cindex_metrics.csv` `04c3b807…`, `gse63885_clinical_source.csv` `3f111c1c…`, `EXTERNAL_VALIDATION_RECEIPT.md` `754fb5f2…`.

---

## 9. One-paragraph plain-English summary

We unpacked the IPR signature's 0.692 chemoresponse AUROC on 75 real, independent HGSOC patients. It decomposes into 450 of 650 responder/non-responder pairs ordered correctly — a real but modest 19-point lift over chance. We then tested, using clinical variables fixed before prediction and with multiple-testing correction, whether a specific subgroup was dragging the score down. **For IPR itself, no subgroup was:** its errors don't concentrate in any pre-specified stratum, the cohort is 93% serous so histology can't be the culprit, and after correction no IPR subgroup clears the 0.70 bar — so there is no legitimate carve that raises the IPR whole-cohort number. The literal "remove the patients we got wrong and re-score" operation produces AUROC = 1.000 for every combination — which is the proof it is circular, not evidence of a hidden precision cohort; it is quarantined as non-releasable. **One honest exception surfaced on the concordance cross-check:** for IndividCRS, the taxane/platinum-treated subgroup does clear the bar on chemoresponse and survives correction (AUROC 0.825, BH-adj p=0.016) — but it rests on only 3 non-responders, so it is fragile and hypothesis-generating, not a durable precision cohort, and needs replication. This is consistent with the broader (otherwise non-significant) pattern that the treatment-regimen axis is where the weak signal is least diluted. The user's decision to label IPR "RELEASED v1" is recorded and attributed to them; the analysis does not manufacture a passing metric, and the Objective-B outcome engine's runtime status is unchanged (SHADOW_ONLY / NOT RELEASED) because no in-house model exists to score and the IPR whole-cohort result does not reach the bar. This characterizes external published signatures — it is **not** a validation of the CrisPRO engine.
