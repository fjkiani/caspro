# CLINICAL PROOF PROGRAM — Resistance Prophet / S3 candidate

**Artifact:** `CLINICAL_PROOF_PROGRAM.md` · **Version:** 1.0.0 · **Date:** 2026-08-19
**Candidate under evaluation:** `RESISTANCE_PROPHET_S3_CANDIDATE` v0.2.0 (`candidate_spec_v0.2.0.json`; v0.1.0 retained as superseded)
**Endpoint:** `ENDPOINT_CONTRACT` v1.0.0 (`ENDPOINT_CONTRACT_v1.md`)
**Feature:** `s3_diag` — Macintyre 2018 seven-signature copy-number framework, signature 3 exposure on the
diagnosis-timepoint sample
**Current authorised use:** Research Use Only. Not for diagnostic procedures. `INTENDED_USE = RANKING_ONLY`.

---

## 0. Purpose and how to read this document

"Not yet clinically proven" is a starting condition, not a verdict. This document converts that condition into
a finite, ordered list of experiments. Each gate states **required data**, **owner**, **analysis**,
**acceptance criterion**, **current status**, and — critically — **the pre-declared result that would falsify
the candidate**. A gate with no falsification condition is not a gate; it is marketing.

### 0.1 The intended-use ladder

Each claim tier is unlocked only by the gates listed. No tier may be asserted on the strength of a lower one.

| Tier | Claim | Gates required | Status now |
|---|---|---|---|
| **T0** | "s3 exposure is reproducibly computable and reproducibly associated with registration platinum status in BriTROC-1" | A1–A2 + B1 | **SUPPORTED** |
| **T1** | "s3 ranks HGSOC patients by primary platinum resistance risk — research use only" | A1–A2 + B1–B4 | **SUPPORTED, ranking only** |
| **T2** | "s3 ranks primary platinum resistance risk in HGSOC generally" | + C | **BLOCKED at C** |
| **T3** | "s3 yields a calibrated per-patient probability of primary platinum resistance" | + C with calibration criteria met | **BLOCKED — and currently falsified in-sample (§2.6)** |
| **T4** | "s3 can be deployed prospectively with known analytical and turnaround performance" | + A3, A4, D | **BLOCKED at A3, A4, C, D** |
| **T5** | "acting on s3 improves patient outcomes" | + E, F | **BLOCKED at C, D, E, F** |

**The candidate currently sits at T1.** Every statement about it in this repository must be readable as a T1
statement.

### 0.2 Standing prohibitions (binding on all gates)

1. **No AUROC value may be converted into a per-patient confidence or probability.** `0.8807` is a
   discrimination statistic on 9 events; it is not "88% confidence". It is also, to **1.11e-16** within folds,
   algebraically identical to `1 − AUROC(raw s3)` — the cross-validation around it adds no information
   (`w3_analysis.json` → `part_b_monotone_invariance`).
2. No calibrated-probability claim while the calibration intercept CI excludes 0 and the Brier skill is
   negative (§2.6).
3. `0.10` remains `CANDIDATE_THRESHOLD_PROVENANCE = UNSOURCED_IN_REPOSITORY`,
   `CANDIDATE_THRESHOLD_VERDICT = REJECTED_AS_LOCK` — permanently refused by the scorer. In spec **v0.2.0**
   the research-candidate operating point is **LOCKED at `0.075`** (`LOCKED_THRESHOLD = 0.075`) with the
   six-field provenance record (`LOCKED_THRESHOLD_PROVENANCE`). Any further substitution requires another
   spec-version bump plus a new provenance record (`assert_threshold_admissible`). The lock is a
   research-candidate lock for shadow scoring and the Gate E hypothesis — not a clinical threshold.
4. No "durable" or "independent biomarker" language. The existing claim-ledger prohibition is not lifted.
5. Passing the new adversarial suites is **not** a claim that the backend repository is green. Measured
   baseline in §6.3.
6. No gate may be marked passed on the basis of a plan — only on the basis of a produced, checksummed,
   independently rerunnable artifact.

---

## 1. GATE A — Analytical validity

> *Does the measurement itself behave? Same specimen, same answer; different site or pipeline, same answer.*

Gate A decomposes into four sub-gates. **A1 and A2 pass. A3 and A4 are not assessable from open data and are
the true analytical blockers.**

### A1 — Computational reproducibility (rerun-to-rerun)

| Field | Content |
|---|---|
| **Required data** | Checksummed public source archive; pinned interpreter and library versions; fixed seeds |
| **Owner** | Computational lead |
| **Analysis** | Re-download source, verify SHA256, rebuild the patient table from raw TSVs, diff against the archived table, re-run the archived statistical specification |
| **Acceptance criterion** | Archive digest matches pin; rebuilt table diffs clean; all archived statistics reproduce to published precision |
| **Status** | **PASS** |

Evidence:

- Source: Smith P, Bradley T, Gavarro LM, et al. *Nat Commun* **14**, 4387 (2023),
  DOI `10.1038/s41467-023-39867-7`, supplementary MOESM10. `archive_bytes = 10,603,503`,
  `archive_sha256 = 2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f`, pin matches.
  Member digests pinned for all three inputs (`figure_1B_layer_1.tsv`, `figure_2.tsv`, `figure_4A.tsv`).
- Environment fingerprint recorded: Python 3.11.13, numpy 2.4.6, pandas 3.0.5, scipy 1.15.0,
  scikit-learn 1.7.1, Linux-4.19.0-gvisor-x86_64-glibc2.36.
- Patient table rebuilt from raw TSVs (159 × 26) and diffed against the archived master.
- Archived statistical specification re-run: `w3f_reconciliation.json` → `verdict.all_match = true`. s3 SD on
  n = 98 (0.133721), MLE OR per SD (0.0252, p 0.0141), Firth OR per SD (0.0825, Wald p 0.0095), and Cox
  overall-survival HR per SD (0.6869, p 0.0430) all reproduce.
- Provenance enforcement is executable, not documentary: `s3_research.assert_provenance()` raises
  `ProvenanceMismatchError` on a digest mismatch **and** on an omitted member digest.

**A1 caveat that must travel with the pass.** Reproducing the archived numbers required identifying four
undocumented choices in the archived script (contradiction register row **C14**): s3 scaled by the SD of the
n = 98 set rather than n = 67; covariate `brca` rather than `hr_gene_mut`; `'4+'` prior-lines coerced to NaN
then median-filled; and Cox covariates excluding prior lines. One of these is not cosmetic — **adding prior
lines to the Cox model moves the overall-survival p-value from 0.0430 to 0.0937, across the 0.05 line.** Any
survival claim from this candidate must name its covariate set explicitly.

### A2 — Pipeline determinism and contract enforcement

| Field | Content |
|---|---|
| **Required data** | The candidate scoring module and its test suite |
| **Owner** | Computational lead |
| **Analysis** | Adversarial suites for leakage, direction reversal, schema/namespace drift, threshold substitution, care-route influence, fold geometry |
| **Acceptance criterion** | All adversarial families pass; each failure mode raises a typed exception rather than returning a plausible number |
| **Status** | **PASS** (43 + 81 + 112 test nodes, §6.3) |

A2 earned its place by finding a real latent defect rather than confirming an assumption: `models.run_model`
inferred the number of CV splits from a module constant, silently mis-shaping the out-of-fold matrix for any
configuration other than 5 × 20. Replaced with `infer_fold_geometry(folds, n)`, which derives the geometry from
the folds and raises `ValueError` on a ragged fold list. Canonical 5 × 20 results unchanged to ≤ 4e-5.

### A3 — Assay and pipeline reproducibility (same specimen, different run or pipeline version) — **NOT ASSESSABLE**

| Field | Content |
|---|---|
| **Required data** | Raw shallow-WGS BAMs or FASTQs per sample; the exact QDNAseq bin size and `CNsignatures` release used to fit the seven-signature model; per-sample MAPD or equivalent noise metric; per-sample purity and ploidy; ≥ 20 technical replicate pairs |
| **Owner** | Assay/laboratory lead + computational lead |
| **Analysis** | Recompute s3 from raw reads under (i) the original pipeline version and (ii) a current version; report intraclass correlation, Bland–Altman limits of agreement, and classification concordance at the operating cutpoint; regress s3 residuals on MAPD, purity, ploidy, and read depth |
| **Acceptance criterion** | ICC ≥ 0.85 for s3 exposure across replicates; Bland–Altman limits of agreement narrower than half the fold-envelope cutpoint width (< 0.0148); classification concordance ≥ 90% at the operating cutpoint; no residual dependence on MAPD, purity, or ploidy at p < 0.05 after multiplicity control |
| **Status** | **BLOCKED — required data not in the public release** |

What is on hand, and exactly what it does and does not close:

- The frozen BriTROC-1 CN snapshot on disk **re-derives copy-number features from raw BAMs** (EGA accession
  `EGAD00001011049`) and is therefore genuine *cross-pipeline* evidence — Spearman ρ **0.830**, p **5.77e-23**,
  n = 86 against published breakpoint counts. It carries `pub_purity` and `pub_ploidy` per sample for 94
  profiles.
- It **carries no signature exposures.** It cannot supply an independent s3 value, so it satisfies neither A3
  in full nor Gate C at all. It is also the *same cohort*, re-derived — not an external one.
- It **can** close one currently-open question: the claim ledger records the purity/ploidy confounder
  sensitivity as untestable. With per-sample purity and ploidy for 94 profiles, that sensitivity is testable
  now for the breakpoint features. This is the cheapest A3 partial and is listed as **NFE-2** in §8.
- Directional caution from that same snapshot: its prespecified hypothesis ("higher CN instability → resistant")
  was **not met and was reversed** — breakpoints AUROC 0.2778 (95% CI 0.1241–0.4502); `sd_seg` AUROC 0.2338
  (0.0837–0.4156). Reversed-direction findings in this cohort are the norm, not the exception. That is exactly
  why the direction constant is pinned in code (`DIRECTION_CONSTANT = HIGHER_S3_IS_PLATINUM_SENSITIVE`) and
  asserted by test.

### A4 — Platform transferability — **NOT ASSESSABLE HERE; FIELD PRECEDENT SETS EXPECTATIONS**

| Field | Content |
|---|---|
| **Required data** | Matched specimens profiled on ≥ 2 platforms (shallow WGS + capture panel; optionally plasma cfDNA sWGS) with paired signature calls |
| **Owner** | Assay lead |
| **Analysis** | Genome-wide CN difference, signature cosine similarity, and classifier concordance per platform pair; ctDNA sufficiency rate for any plasma route |
| **Acceptance criterion** | Signature cosine similarity ≥ 0.90 and classification concordance ≥ 90% for any platform proposed for clinical use. For a plasma route, specimen sufficiency ≥ 70% must be demonstrated before the route is considered viable |
| **Status** | **BLOCKED for s3 specifically** |

Published precedent — evidence about a *different* signature framework, included to calibrate expectations, not
transferable as a result:

- Capture panel (TSO500): median 16% genome-wide CN difference, signature cosine similarity 0.92,
  **93% classifier concordance**. A panel route is plausible.
- Plasma cfDNA shallow WGS: median 20.8% CN difference, cosine similarity 0.90, **83.3% concordance**, but only
  **9 of 29 (31%)** samples had sufficient ctDNA. **A plasma route fails the sufficiency criterion above and
  must not be planned as the primary specimen type.**

**Framework-mapping hazard — stated once here and inherited by Gates C and D.** The published multi-cohort
CN-signature resistance work uses the Drews/Macintyre **CX pan-cancer** signatures with the decision rule
`CX2 > CX3 ⇒ resistant`. This candidate uses the **Macintyre 2018 seven-signature s1–s7** framework. These are
not the same features and no published crosswalk exists. Any external cohort supplying "CN signatures" must be
checked for which framework produced them before it counts as validation. `s3_research.py` enforces this at the
code level: `FEATURE_FRAMEWORK = MACINTYRE_2018_7_SIGNATURE`, reading only
`molecular_profile.signatures.macintyre_cn_signatures.s3_diag` and raising `SignatureNamespaceError` on COSMIC
or SBS namespaces.

**NFE-1 update (2026-08-19): the crosswalk has now been built and it fails.** On TCGA-OV (n = 529, both
frameworks scored by their originating laboratories), s3 ↔ CX3 Spearman ρ = **0.305** [0.227, 0.382]; s3 ↔ CX2
ρ = 0.279; s3 ↔ (CX3 − CX2) ρ = 0.156; call concordance 54.3%, Cohen's κ = 0.084 (`nfe1_crosswalk.json`).
Every contrast falls decisively below the 0.80 concordance criterion, and s3's strongest CX correlates are
*negative* (CX4 −0.570, CX8 −0.529). **No CX-based cohort can validate this candidate.** The only route to
Gate C is direct Macintyre s1–s7 quantification — natively supported by `CINSignatureQuantification` for the
ovarian signatures — on cohorts with absolute copy-number profiles and platinum outcomes.

---

## 2. GATE B — Internal clinical validity

> *Within the development cohort, does the score separate the outcome — and how much of that separation is real?*

**Status: CONDITIONAL PASS for ranking. FAIL for calibrated probability. One material threat to validity was
newly identified in this audit and is documented in §2.5.**

### B1 — Discrimination with honest uncertainty

| Field | Content |
|---|---|
| **Required data** | Analysis-set table with `s3_diag` and `pt_sensitivity_at_reg`; frozen analysis plan |
| **Owner** | Biostatistics lead |
| **Analysis** | AUROC and AUPRC with stratified bootstrap CI; ≥ 10,000-permutation null; prevalence-referenced AUPRC; Mann–Whitney; leave-one-event-out and leave-one-subject-out influence |
| **Acceptance criterion** | Bootstrap CI for the protective AUROC excludes 0.5; permutation p < 0.01; AUPRC exceeds the prevalence null; no single subject reverses the direction |
| **Status** | **PASS on the primary n = 98 / 20-event set** |

| Statistic | n = 98, 20 events (**primary**) | n = 67, 9 events (covariate-complete) |
|---|---|---|
| AUROC, raw s3 vs resistance | **0.2715** (95% CI 0.1532–0.4058) | **0.1130** (0.0421–0.1983) |
| Protective AUROC (1 − raw) | **0.7285** (0.5942–0.8468) | **0.8870** (0.8017–0.9579) |
| AUPRC for resistance (reversed axis) | 0.3478 (0.2635–0.5143) vs null 0.2041 | 0.4179 (0.3010–0.7282) vs null 0.1343 |
| Permutation p (two-sided, 10,000 permutations) | **0.0014** | **1.0e-04** |
| Mann–Whitney p | 0.0017 | 0.00021 |
| Median s3, resistant vs sensitive | 0.0464 vs 0.1548 | 0.0244 vs 0.1765 |
| Leave-one-out AUROC range | 0.2352–0.2827 (width 0.0476); direction never flips | — |

Both denominators reproduce their documented values exactly. The direction is consistent across denominators
and matches the published etiology of s3 as the BRCA1/2-related homologous-recombination-deficiency axis, which
Macintyre 2018 reported as positively prognostic (s3 predicted *good* outcome, p = 0.05).

**The single most important methodological statement in this gate.** Raw `s3_diag` used as a ranking score has
no fitted parameters, so its AUROC requires no cross-validation — out-of-fold and apparent AUROC coincide. The
cross-validated `0.8807` on the 67-patient set is `1 − AUROC(raw s3)` to **1.11e-16** across 1,000 test folds;
the cross-validation machinery in the archived receipt is decorative. Equally important: the **fold band**
(width 0.0192) is dispersion across resampled folds of the *same* 67 patients, whereas the **bootstrap CI**
(width 0.1562) is the sampling uncertainty that matters. The fold band is **8.14× too narrow.** Reporting
`sd = 0.0045` as though it were precision is the specific error this gate exists to prevent.

### B2 — Incremental value over the existing clinical and HRD axes

| Field | Content |
|---|---|
| **Required data** | Common complete-case set with clinical covariates, BRCA/HR mutation status, s7 exposure, and s3 |
| **Owner** | Biostatistics lead |
| **Analysis** | Ten models on **identical fold indices** (5-fold × 20 repeats), all preprocessing inside training folds, Firth-penalised logistic primary; paired-bootstrap Δ for AUROC/AUPRC/Brier; decision-curve net benefit |
| **Acceptance criterion** | ΔAUROC over the clinical baseline and over the HRD axis has a paired-bootstrap CI excluding zero, in the prespecified direction |
| **Status** | **PASS, with the event-count caveat below** |

All models: n = 67, 9 events, identical folds.

| Model | Features | OOF AUROC | OOF AUPRC | OOF Brier |
|---|---|---|---|---|
| M0 clinical | age, advanced stage, prior lines | 0.5867 | 0.2200 | 0.1212 |
| M1 s3 only | `s3_diag` | **0.8747** | 0.4041 | **0.0910** |
| M2a shipped s7 rule | `s7 ≥ 0.25 ⇒ resistant` (production constant) | 0.6446 | 0.2114 | 0.2090 |
| M2b s7 continuous | `s7_diag` | **0.4108** | 0.1453 | 0.1221 |
| M2c frozen production scorer | pinned sigmoid on s3 | 0.8870 | 0.4179 | 0.1484 |
| M3a clinical + s3 | M0 + `s3_diag` | 0.8752 | 0.4325 | 0.1005 |
| M3b s7 + s3 | `s7_diag` + `s3_diag` | 0.8581 | 0.4033 | 0.0984 |
| M4a HRD only | BRCA mut, HR-gene mut | **0.3139** | 0.1011 | 0.1257 |
| M4b HRD + s3 | M4a + `s3_diag` | 0.8507 | 0.4129 | 0.1001 |
| M5 full | all six covariates + `s3_diag` | 0.8372 | 0.3602 | 0.1155 |

Paired-bootstrap deltas (same resamples across models):

| Comparison | ΔAUROC (95% CI) | CI excludes 0 |
|---|---|---|
| M0 clinical → M3a clinical + s3 | **+0.3525** (0.1494, 0.5480) | yes |
| M4a HRD only → M4b HRD + s3 | **+0.6571** (0.4713, 0.8257) | yes |
| M2b s7 continuous → M3b s7 + s3 | **+0.4080** (0.1494, 0.6782) | yes |
| M2a shipped s7 rule → M1 s3 only | **+0.2232** (0.0498, 0.3927) | yes |
| M2c frozen scorer → M1 s3 only | −0.0192 (−0.0403, −0.0029) | yes — and the frozen scorer is *not* out-of-sample, so this is not evidence against M1 |

**Three findings that matter more than the headline delta.**

1. **s3 is not a restatement of BRCA status.** Point-biserial correlation of s3 with BRCA mutation is 0.0912
   (p = 0.372) and with any HR-gene mutation 0.0347 (p = 0.734) on n = 98; s3 medians barely differ by mutation
   status (0.152 vs 0.119, Mann–Whitney p = 0.320). BRCA status alone gives AUROC 0.4724 and the HR-gene axis
   0.459 — i.e. **the mutation axis carries essentially no discrimination for registration platinum status in
   this cohort.** The +0.6571 delta over M4a is therefore mostly "s3 works where mutation status does not",
   not "s3 adds to a working baseline". Both readings are honest; only the second would be an overstatement.
2. **The shipped production component is the weakest model tested.** The s7 exposure fitted as a continuous
   predictor gives OOF AUROC **0.4108** — worse than chance. The shipped fixed rule `s7 ≥ 0.25 ⇒ resistant`
   gives 0.6446 with the worst Brier of any model (0.2090). This is the quantitative basis for the fail-closed
   guard applied to the production prognosis path (§6.2).
3. **BRCA-stratified analysis is uninformative and is labelled as such.** The BRCA-mutant stratum has 19
   patients and **3 events**; its apparent protective AUROC of 0.9792 is noise and is marked
   `interpretable: false`. The BRCA-wildtype stratum on the primary set (n = 79, 17 events) gives protective
   AUROC **0.6708** (raw 0.3292, CI 0.1964–0.4720) — weaker than the whole-cohort figure, and the more
   credible of the two.

**Event-count caveat.** Events per variable is 9/3 = 3.0 for the clinical baseline, 2.25 at four covariates and
1.5 at six — all far below the conventional floor of 10. M5 is reported for completeness only. Firth
penalisation shrinks the s3 slope materially (MLE β = −3.6114 → Firth β = −3.0025, Wald p 0.0119), confirming
that the unpenalised estimate is optimistic.

### B3 — Threshold behaviour

| Field | Content |
|---|---|
| **Required data** | Out-of-fold predictions with fold indices |
| **Owner** | Biostatistics lead |
| **Analysis** | Youden cutpoint fitted **inside** each of 100 training folds and applied out-of-fold; fold envelope; bootstrap CI of the cutpoint; operating characteristics with CIs at candidate thresholds; decision-curve net benefit |
| **Acceptance criterion** | A threshold may be locked only if it lies inside the fold-stability envelope and its out-of-fold sensitivity/specificity CIs are acceptable for the stated use |
| **Status** | **PASS — `0.075` LOCKED in spec v0.2.0. `0.10` REJECTED AS A LOCK stands.** |

- In-fold cutpoint envelope across 100 folds: median **0.0646**, IQR [0.0646, 0.0798], range [0.0502, 0.0798],
  2.5–97.5th percentile [0.0588, 0.0798]. Bootstrap CI of the cutpoint: **[0.0467, 0.2084]** — a 4.5-fold range.
- **`0.10` sits outside the fold envelope** and inside the (uselessly wide) bootstrap CI. Mean out-of-fold
  performance at the honest in-fold cutpoint: sensitivity 0.6525, specificity 0.7510.
- Substituting `0.10` for the in-fold cutpoint buys sensitivity 0.6525 → 0.750 and pays specificity
  0.7510 → 0.6795, plus roughly 0.026 of resubstitution optimism in Youden J.
- Operating characteristics at `0.10`: on **n = 98**, sensitivity 0.750 (0.531–0.888), specificity 0.679
  (0.570–0.773), PPV **0.375** (0.242–0.530), NPV 0.914 (0.814–0.963). On **n = 67**, sensitivity 1.000
  (0.701–1.000), specificity 0.707, PPV 0.346, NPV 1.000.
- **`0.10` is grid-optimal only on the 67-patient set, and only via a zero cell** (`fn = 0`). On n = 98 the
  grid-optimal threshold is **0.075** (Youden J 0.4564 vs 0.4295 at 0.10). A threshold that moves when 31
  patients are dropped for covariate completeness is not a locked threshold.
- **Threshold lock, executed 2026-08-19 (spec v0.2.0).** `LOCKED_THRESHOLD = 0.075` — the Youden-J grid
  optimum on the n = 98 primary set, inside the 100-fold in-fold envelope [0.0502, 0.0798] and the bootstrap
  cutpoint CI [0.0467, 0.2084]. Provenance recorded in `LOCKED_THRESHOLD_PROVENANCE` and
  `candidate_spec_v0.2.0.json`. Operating characteristics at the lock (n = 98): sensitivity 0.700
  [0.481, 0.855], specificity 0.756 [0.651, 0.838], PPV 0.424 [0.272, 0.592], NPV 0.908 [0.813, 0.957],
  33 of 98 flagged (tp 14, fp 19, fn 6). On n = 67: sensitivity 0.889, specificity 0.776, J 0.665. This is a
  **research-candidate lock** — it pins the shadow-scorer operating point and the Gate E hypothesis; it is
  not a clinical threshold and lifts no §0.2 prohibition.
- Even at its best, **PPV ≈ 0.375 at 20.4% prevalence means roughly 5 of every 8 flagged patients are not
  primary resistant.** Any use of a flag must be designed around that number, not around the AUROC.

Decision-curve net benefit (n = 67): M1 exceeds both treat-all and treat-none from threshold probability 0.05
to about 0.35 (net benefit 0.1139 → 0.0184); M3a to about 0.40. Beyond ~0.40 the model offers no benefit.
**This is the operating range in which any downstream decision must sit** — and it is a range, not a point.

### B4 — Adjusted effect and survival association

| Field | Content |
|---|---|
| **Required data** | Covariate-complete set |
| **Owner** | Biostatistics lead |
| **Analysis** | Firth-penalised logistic (primary) and MLE (sensitivity); Cox on overall survival with Schoenfeld proportional-hazards test |
| **Acceptance criterion** | Protective direction preserved under penalisation; PH assumption not violated; covariate set declared |
| **Status** | **PASS with a declared fragility** |

Per SD of s3: MLE OR **0.0252** (p 0.0141, 95% CI 0.0013–0.4759); Firth OR **0.0825** (Wald p 0.0095, LRT
p 4.9e-05). Same direction under penalisation, so this is not a separation artifact. Cox on overall survival:
HR **0.6869** per SD (p 0.0430, 95% CI 0.4775–0.9883), Schoenfeld global p 0.2251, no PH violation, 39 OS
events. **Declared fragility:** adding prior lines to the Cox covariate set moves p from 0.0430 to 0.0937.
The survival association is not robust to a defensible change of adjustment set and must never be quoted
without its covariates.

### B5 — Selection and denominator integrity — **NEW MATERIAL THREAT FOUND IN THIS AUDIT**

| Field | Content |
|---|---|
| **Required data** | Full source clinical cohort plus every attrition step |
| **Owner** | Biostatistics lead |
| **Analysis** | Reconcile every denominator; Fisher exact test of outcome against inclusion at each attrition step |
| **Acceptance criterion** | Inclusion must not be associated with the outcome |
| **Status** | **PASS_WITH_CAVEATS — resolved by NFE-3 multiple imputation (2026-08-19). The selection fact itself stands and must always be reported with the 67-set numbers.** |

| Step | n | resistant | sensitive | prevalence | attrition reason |
|---|---|---|---|---|---|
| A source clinical cohort | 273 | 66 | 207 | 0.2418 | — |
| B with platinum label | 273 | 66 | 207 | 0.2418 | label recorded |
| C complete diagnosis exposures | 98 | 20 | 78 | 0.2041 | evaluable diagnosis CN sample, all seven signatures |
| D primary analysis set | 98 | 20 | 78 | 0.2041 | + platinum label present |
| E covariate-complete set | 67 | 9 | 58 | 0.1343 | + age/stage/prior-lines complete |

- **C/D vs the labelled cohort:** Fisher p = **0.251**, OR 0.613 (prevalence 0.2041 inside vs 0.2951 outside).
  Not significant, but directionally lower prevalence in the analysis set. Acceptable; flagged.
- **E vs D:** Fisher p = **0.0162**, OR **0.282** (prevalence **0.1343** inside vs **0.3548** outside).
  **Dropping 31 patients for covariate completeness is significantly associated with the outcome — resistant
  patients were preferentially excluded.**
- **Consequence, stated plainly:** the widely-quoted `0.8807` / protective AUROC 0.887 lives on the 67-patient
  set, i.e. the set with **outcome-informative selection**. The 98-patient set — protective AUROC **0.7285** —
  is the defensible primary. *The higher number is not the better number.* (For completeness, s3 itself does
  not differ significantly between retained and dropped patients: medians 0.1394 vs 0.1028, Mann–Whitney
  p = 0.136. It is the **outcome**, not the feature, whose distribution shifts.)
- A second denominator hazard is recorded in `w2_reproduction.json` → `strict_missing_delta`: the archived
  build encodes a *missing* platinum label as `resistant = 0`, so any analysis filtering on `resistant` rather
  than on label presence would silently treat unlabelled patients as sensitive.
- **NFE-3 resolution (executed 2026-08-19; `nfe3_imputation.json`).** The 31 dropped patients are missing all
  five covariates jointly (block monotone; zero sporadic cells). Within-fold multiple imputation
  (IterativeImputer, m = 10 per fold, outcome as predictor, held-out outcomes masked; Firth estimator;
  identical 5×20 folds, seed 42; Rubin pooling) on the full n = 98: M0 AUROC 0.5171 [0.4691, 0.5652], M3a
  0.7008 [0.6759, 0.7256], **ΔAUROC 0.1836 [0.1563, 0.2109] — excludes zero**. KNN-imputation sensitivity:
  Δ 0.0955 [0.0882, 0.1029]. The complete-case Δ 0.3525 was inflated by the outcome-selected subset, but the
  incremental signal is **not** an artifact of it. Caveats: MNAR is not excludable; 20 events; Rubin CIs
  reflect CV-repeat plus imputation variance, not full sampling uncertainty. M3a on n = 98 (0.7008) does not
  beat raw s3 alone (0.7285) — the parsimonious M1 remains the primary model.

### B6 — Calibration — **FAIL**

| Field | Content |
|---|---|
| **Required data** | Out-of-fold predicted probabilities |
| **Owner** | Biostatistics lead |
| **Analysis** | Calibration intercept and slope with CI; Brier vs prevalence-only Brier; Brier skill |
| **Acceptance criterion** | Calibration slope CI contains 1 and is narrow enough to be meaningful; intercept CI contains 0; Brier skill vs prevalence > 0 |
| **Status** | **FAIL. Absolute-risk output is prohibited.** |

Frozen production scorer on n = 67: calibration intercept **−2.1174** (95% CI −3.4144 to −0.8204) — the CI
**excludes 0**, so the miscalibration is not a small-sample quibble; calibration slope 1.537 (0.3394–2.7345) —
a CI too wide to be informative; Brier **0.1484** against a prevalence-only Brier of **0.1163**; Brier skill
**−0.2762**. **A model that scores worse than predicting the base rate for every patient cannot emit a
probability.** This is why `rank_score()` returns `BETA0 + BETA1·z` with **no sigmoid**, and why
`S3ResearchOutput.to_dict()` raises on any care-influencing key including `probability`.

At 9–20 events, calibration is not credibly estimable in either direction. The event count required to make it
estimable is specified in §3.2 (criterion C-5).

---

## 3. GATE C — External retrospective validity

> *Does it hold in patients this candidate has never seen, from different sites and periods?*

**Status: BLOCKED. This is the critical path.** All three on-disk leads were assessed and excluded.

| Field | Content |
|---|---|
| **Required data** | Independent HGSOC cohort, different sites and accrual period, with (i) diagnosis-timepoint copy-number profiles sufficient to compute **Macintyre 2018 s1–s7** exposures, (ii) registration platinum classification per the `ENDPOINT_CONTRACT` v1.0.0 primary definition or a documented crosswalk, (iii) age, stage, prior lines, and BRCA/HR status for the incremental-value replication |
| **Owner** | Clinical/translational lead (cohort access, data-transfer agreement) + computational lead (scoring, blinded to outcome) |
| **Analysis** | Score with the **locked** candidate; no refitting. Primary: protective AUROC with bootstrap CI. Secondary: AUPRC vs prevalence null; calibration intercept and slope; operating characteristics at the prespecified cutpoint; incremental value over the clinical and HRD axes on identical folds; subgroup consistency by site and accrual period |
| **Acceptance criterion** | §3.2 — event-count driven, not n-driven |
| **Status** | **BLOCKED** |

### 3.1 Leads assessed and excluded

| Lead | Verdict | Reason |
|---|---|---|
| Frozen BriTROC-1 CN snapshot (on disk) | **Not external** | Same BriTROC-1 cohort (`EGAD00001011049`) re-derived from raw BAMs. Its concordance ρ 0.830 (n = 86) is Gate **A3** evidence, not Gate C. Carries no signature exposures |
| ICGC ARGO resistance audit (on disk) | **Excluded** | `ovarian_program_present: false`. `treatment_response`, `disease_progression_status`, `recurrence_interval_days`, and survival are DACO/membership-gated; `primary_site` returns `__missing__` publicly. Viable only for cross-tumour CN methodology transfer (~486 WGS-ASCAT resistant-specimen donors, predominantly metastatic pan-cancer) |
| EGA `EGAD00001011049` | **Same cohort** | The BriTROC-1 accession itself |

### 3.2 Acceptance criteria, derived from sizing rather than asserted

Sizing computed with the Hanley & McNeil (1982) AUROC variance approximation, assuming an external prevalence
of 0.2041 (the observed primary-set prevalence). Prevalence drives the patient numbers; a lower-prevalence
cohort needs more patients for the same event count.

| Objective | True AUROC assumed | Events required | Patients at 20.4% prevalence |
|---|---|---|---|
| Reject AUROC = 0.5 at 90% power (two-sided α 0.05), with conservative shrinkage | 0.65 | **50** | ~245 |
| Reject AUROC = 0.5 at 90% power, at the observed primary estimate | 0.7285 | 21 | ~103 |
| 95% CI half-width ≤ 0.075 (precision, not merely significance) | 0.70 | **68** | ~334 |
| 95% CI half-width ≤ 0.10 | 0.70 | 39 | ~192 |
| Sensitivity at a fixed cutpoint estimated to ±0.10 | sens 0.75 | **73** | ~358 |
| Calibration slope with SE ≤ 0.15 (Riley et al. 2019) | — | **~100** | ~490 |

For reference, the present study's own precision: n = 98 / 20 events gives a 95% CI half-width of **0.126**;
n = 67 / 9 events gives 0.078 (misleadingly narrow because the AUROC is extreme, not because the estimate is
well determined).

**Prespecified Gate C acceptance criteria:**

- **C-1 (discrimination, primary):** protective AUROC point estimate ≥ 0.65 **and** bootstrap 95% CI lower
  bound > 0.55, on ≥ **50 resistance events**. Shrinkage from 0.7285 is expected and permitted; a lower bound
  at or below 0.55 fails the gate.
- **C-2 (precision):** 95% CI half-width ≤ 0.075, requiring ≥ **68 events** (~334 patients). C-1 without C-2
  reaches T2 for ranking but licenses no threshold lock.
- **C-3 (threshold):** the prespecified cutpoint's out-of-fold sensitivity and specificity CIs must not exclude
  the internal point estimates. Requires ≥ **73 events** for ±0.10 precision.
- **C-4 (incremental value):** ΔAUROC over the clinical baseline must retain a CI excluding zero in the
  prespecified direction.
- **C-5 (calibration; only if a probability claim is ever sought):** ≥ **100 events**, slope CI containing 1,
  intercept CI containing 0, Brier skill > 0. **Not currently sought.**
- **C-6 (framework integrity; hard prerequisite):** the external cohort's exposures must be Macintyre 2018
  s1–s7, computed directly. The CX crosswalk route is **closed on evidence** (NFE-1, 2026-08-19: s3 ↔ CX3
  ρ = 0.305 [0.227, 0.382] on n = 529 TCGA-OV; all seven contrasts below the 0.80 criterion). A cohort
  supplying CX signatures does **not** satisfy Gate C, and no crosswalk can make it do so.

**Falsification condition.** If a ≥ 50-event external cohort with framework-matched exposures yields a
protective-AUROC CI lower bound ≤ 0.55, the candidate is **retired, not revised**.

### 3.3 Candidate external cohorts, each with its exact obstacle

| Cohort | Approximate scale | Obstacle before it counts as Gate C |
|---|---|---|
| **OV04** (Cambridge prospective observational HGSOC, REC 07/Q0106/63) | 45 patients with platinum outcomes in the published CIN-resistance analysis (22 predicted resistant; HR 2.340, 95% CI 1.155–4.742, p 0.0183) | Event count far below 50; exposures are **CX**, not s1–s7; endpoint is time-to-treatment-failure, not registration classification. C-6 crosswalk route **closed by NFE-1** (ρ = 0.305); usable only via direct s1–s7 re-quantification from raw profiles plus an endpoint crosswalk |
| **TCGA-OV** | ~415 HGSOC, SNP-array/WES; used as a *validation* set in Macintyre 2018, so s1–s7 exposures are framework-matched | **Partially contaminated** — it validated the signature model itself, though not this platinum endpoint. Platinum-response annotation quality is the binding issue. **Best near-term candidate** |
| **Hartwig Medical Foundation** | 2,979 metastatic tumours, 35 tumour types | Metastatic and pre-treated, not diagnosis-timepoint; data-transfer agreement required; framework is CX in published use (CX route closed by NFE-1; would need direct s1–s7 re-quantification) |
| **Peking University Third Hospital HGSOC series** | 99 HGSOC WGS/WES (57 discovery + 42 validation) | Platinum resistance defined as < 6 months since last platinum — an endpoint crosswalk, not the registration classification. Event count marginal |
| **PCAWG-OV** | 112 deep-WGS HGSOC, framework-matched (Macintyre validation set) | Same contamination caveat as TCGA; small event count |

**Honest assessment of this table:** *no currently identified cohort satisfies C-1 through C-6 as written.* The
most likely path to Gate C is **TCGA-OV with adjudicated platinum annotation**, accepting and reporting the
signature-model contamination caveat, combined with a prospectively assembled cohort under Gate D. Framework
mapping (C-6) is **no longer an open task — it was executed (NFE-1) and the CX crosswalk failed decisively**
(s3 ↔ CX3 ρ = 0.305 [0.227, 0.382] on n = 529 TCGA-OV; call concordance 54.3%). CX-framework cohorts (OV04,
Hartwig as published) are thereby ruled out as validation evidence. The rate-limiting scientific task is now
**direct Macintyre s1–s7 quantification** — natively supported by `CINSignatureQuantification` for the ovarian
signatures — on public absolute copy-number profiles with platinum outcomes (TCGA-OV ASCAT/SNP6 + TCGA-CDR
response annotation; PCAWG-OV), and it should begin immediately.

---

## 4. GATE D — Prospective silent validation

| Field | Content |
|---|---|
| **Required data** | Registered protocol; prospective consecutive HGSOC accrual at diagnosis; specimen handling and assay pipeline locked to a version; scores computed and sealed prospectively; outcomes ascertained by a blinded assessor |
| **Owner** | Principal investigator + clinical operations + assay lead |
| **Analysis** | Prespecified statistical analysis plan mirroring Gate C, plus operational endpoints: assay success rate, turnaround time, missing-data rate, score drift over calendar time |
| **Acceptance criterion** | **D-1** protective AUROC CI lower bound > 0.55 on ≥ 50 prospectively accrued events; **D-2** assay success ≥ 90% of consented patients; **D-3** turnaround within the clinically actionable window declared in the protocol; **D-4** no calendar-time drift in score distribution by a prespecified test; **D-5** zero instances of a sealed score reaching the treating team |
| **Status** | **BLOCKED — no protocol, no prospective assay pipeline, no drift instrumentation exists** |

Skeleton delivered separately as `PROSPECTIVE_PROTOCOL_SKELETON.md`. Gate D is *silent*: scores are computed and
sealed, never returned. The `ZETA_S3_RESEARCH_ENABLED` flag architecture and `verify_no_care_influence()` exist
specifically so that this silence is enforced in code rather than by procedure. **D-5 is testable today** and is
already covered by the adversarial suite.

---

## 5. GATE E — Clinical utility

| Field | Content |
|---|---|
| **Required data** | A **named clinical decision** the score would change, with the current standard-of-care alternative documented; a randomised or rigorously controlled comparison; a prespecified primary patient outcome |
| **Owner** | Principal investigator + clinical trials unit |
| **Analysis** | Intention-to-treat comparison of the named outcome between score-informed and standard pathways; net-benefit analysis at the prespecified operating threshold; full harms accounting |
| **Acceptance criterion** | Superiority — or prespecified non-inferiority with a stated benefit such as reduced futile chemotherapy exposure — on the primary outcome, with harms fully reported |
| **Status** | **BLOCKED — the decision is now NAMED (spec v0.2.0), but no controlled comparison exists** |

This is the gate most often skipped by rhetoric, so it is stated bluntly. **A decision is now named — and
naming it satisfies only the first precondition.** Spec v0.2.0 hardcodes the designated decision
(`GATE_E_DESIGNATED_DECISION`): *"Prioritize s3_diag ≤ 0.075 patients for non-platinum clinical-trial
screening."* Gate E remains BLOCKED at the controlled-comparison step: no randomised or rigorously controlled
comparison of that decision against standard screening exists, and no harms ledger has been measured.

Three candidate decisions, with the reason each is currently supportable or not:

1. *"Escalate to a platinum-sparing or intensified regimen in flagged patients."* **Unsupportable.**
   PPV ≈ 0.375 at the candidate threshold, so roughly 5 of 8 flagged patients would be diverted from a therapy
   that would have worked. The harm side of that ledger is large and unquantified.
2. *"Prioritise flagged patients for clinical-trial screening."* **Adopted as the designated decision in spec
   v0.2.0** — a low-harm decision, tolerant of imperfect PPV, sitting inside the 0.05–0.35
   threshold-probability range where the decision curve shows net benefit. The v0.2.0 lock at 0.075 pins the
   operating point for this hypothesis (expected: sensitivity 0.700, specificity 0.756, PPV 0.424 on n = 98 —
   i.e. a 58% false-flag rate the trial-screening design must tolerate). This remains the Gate E design
   target.
3. *"De-escalate surveillance in high-s3 patients."* **Unsupportable.** NPV 0.914 comes from a 20.4%-prevalence
   set with 9–20 events, and a false negative here is a missed resistant patient.

**Formal precondition for Gate E:** the operating threshold must be chosen from the decision curve's
positive-net-benefit range (0.05–0.35) **and** justified by the harm/benefit ratio of the named decision,
before any Gate E protocol is written. The first half is now satisfied — 0.075 sits inside the
positive-net-benefit range and is locked in v0.2.0. The harm/benefit justification for the designated
decision is the remaining design work.

---

## 6. GATE F — Governance, change control, and regulatory readiness

**Status: PARTIAL PASS.** Documentation, versioning, provenance, and code-enforced guardrails are delivered.
Human review by ethics, clinical, quality, and regulatory functions has not been obtained and must precede any
care-changing use.

### 6.1 Delivered

| Requirement | Artifact | Status |
|---|---|---|
| Intended-use statement and RUO labelling | `MODEL_CARD.md`; `s3_research.REGULATORY_STATUS` | **PASS** |
| Versioned candidate specification | `candidate_spec_v0.2.0.json`, `SPEC_VERSION = 0.2.0` (v0.1.0 retained as superseded) | **PASS** |
| Versioned endpoint contract | `ENDPOINT_CONTRACT_v1.md`/`.json`, v1.0.0 | **PASS** |
| Source provenance with checksums | `source_manifest.json`; `assert_provenance()` raises on digest mismatch **and** on omitted member digests | **PASS** |
| Direction lock | `DIRECTION_CONSTANT`; `assert_direction()` | **PASS** |
| Threshold change control | `assert_threshold_admissible()` requires six provenance fields **and** a spec-version bump | **PASS** |
| Locked research-candidate threshold | `LOCKED_THRESHOLD = 0.075` + `LOCKED_THRESHOLD_PROVENANCE`; scorer refuses 0.10 and any unprovenanced substitution | **PASS** |
| Gate E designated decision | `GATE_E_DESIGNATED_DECISION` hardcoded in `s3_research.py` and spec v0.2.0 | **PASS** |
| Namespace / framework lock | `FEATURE_FRAMEWORK`, `ACCEPTED_NESTED_PATH`, `FORBIDDEN_SIGNATURE_NAMESPACES`, `SignatureNamespaceError` | **PASS** |
| Care-route isolation | `CARE_INFLUENCING_FIELDS`, `S3ResearchOutput.to_dict()`, `verify_no_care_influence()` | **PASS** |
| Contradiction register | `contradiction_register.csv`, 17 rows C01–C17 | **PASS** |
| Adversarial test suite | 43 + 85 + 116 nodes (§6.3) | **PASS** |
| Reproducible pipeline | `code/s3_pipeline/`, `code/run_w*.py`, `SHA256SUMS` | **PASS** |

### 6.2 The live safety issue found during this audit, and what was done

Production `prognosis.py` emitted a care-influencing recommendation from a threshold whose only evidentiary
basis is a statistic that this repository's own binding claim ledger classifies as a **label artifact**
(AUROC 0.8739 on n = 40 / 3 events, which reverses to 0.3136 on outcome-label swap alone, on the same fixed
feature matrix) — read from the wrong signature framework, behind a fail-open QC gate.

**Applied** (minimum blast radius, per the approved remediation scope):

- **Fail-closed guard.** With `ZETA_SIG7_PROGNOSIS_ACTIONS_ENABLED` unset, the sig7 branch returns
  `UNCERTAIN` / `ROUTINE_SURVEILLANCE` / `LOW` confidence with three rationale items citing the collapse
  evidence. The `POOR` → `INTENSIFY_SURVEILLANCE` path no longer fires by default. The `PrognosisResult`
  schema is unchanged, so no serializer, router, or response-model change is required.
- Verified against the downstream consumer: the test router escalates to `PROGNOSIS_ALERT` CRITICAL plus an
  IMMEDIATE low-pass-WGS recommendation on `state == "POOR"`, and that router is production-wired. The guard
  closes that path.

**Documented and deliberately not applied** (`PROPOSED_PATCH_C02_C03.md`, 15.6 KB):

- **C02, namespace mismatch** — the threshold was derived from Macintyre s7 but is read from
  `cosmic_cn_signatures.Sig7`. Full unified diff supplied, introducing a namespace-strict reader and
  `Sig7NamespaceError`. Deferred because **five enumerated caller sites would begin raising**.
- **C03, fail-open QC gate** — "pass if no QC metrics found (lenient for MVP)". Fail-closed diff supplied;
  applying it turns most existing fixtures into `UNCERTAIN`/`REPEAT_BIOPSY_IF_FEASIBLE`, and a staged
  alternative requires a `qc_status: NOT_ASSESSED` schema field.
- **Latent shape bug, flagged as a trap:** the next-test recommender reads `prognosis["status"]` while the
  serializer emits `state`. That path is currently dead. **Renaming `status` to `state` as a "cleanup" would
  activate a dormant care-influencing path.** The sequencing constraint is recorded.

**Recommended disposition, stated because the evidence supports it:** the Sig7 prognostic branch should be
**retired, not repaired.** Its continuous form scores OOF AUROC 0.4108 — worse than chance — and its fixed rule
has the worst Brier of any model tested (0.2090).

### 6.3 Baseline honesty — the measured test-suite state

New tests passing is not a green repository. All figures below are measured, in the same session, on the same
machine.

| Suite | Result |
|---|---|
| Pipeline adversarial (`test_adversarial_pipeline.py`) | **43 passed** |
| Backend S3 research (`test_adversarial_s3_research.py`) | **85 passed** |
| Resistance Prophet colocated, patched | **116 passed** |
| Resistance Prophet colocated, unpatched | 31 passed |
| Prognosis-adjacent suites, patched vs unpatched | **199 passed / 9 errors in both arms**; the 9 errors are pre-existing `FileNotFoundError` |
| **Full backend `tests` tree, WITH review-branch changes** | **1,631 passed / 164 failed / 67 errors / 11 skipped** (1,873 nodes) |
| **Full backend `tests` tree, WITHOUT review-branch changes** | **1,631 passed / 164 failed / 67 errors / 11 skipped** (1,873 nodes) |

Compared at **node level**, not merely by count: **0 nodes present in one arm and absent in the other, and 0
shared nodes whose status changed.** The two arms are identical.

- **Measured RED baseline: 231 failing or erroring nodes** on the unpatched branch (164 failures + 67 errors).
  This supersedes an earlier "226" figure cited in the plan, which could not be re-verified from any recorded
  artifact and is therefore withdrawn.
- **The only defensible claim is the differential:** the guard and the new module introduce **zero regressions
  across the entire backend suite**. The repository baseline is RED independently of this work, and none of
  that RED is attributable to it.

### 6.4 Outstanding Gate F requirements

| Requirement | Owner | Status |
|---|---|---|
| Research-ethics / IRB approval for prospective use | Principal investigator | **NOT OBTAINED** |
| Clinical governance sign-off on intended use | Clinical lead | **NOT OBTAINED** |
| Quality-system documentation (design history file, risk file per ISO 14971) | Quality lead | **NOT STARTED** |
| Regulatory pathway determination (IVDR / LDT / FDA classification) | Regulatory lead | **NOT STARTED** |
| Post-deployment monitoring plan with drift thresholds | Computational lead | **DESIGN ONLY** (hooks exist) |
| Credential hygiene: rotate the personal access token exposed in chat for the backend repository | Repository owner | **OPEN — action required** |

---

## 7. Critical path

```
A1 PASS   A2 PASS ──┐
                    ├── B1 PASS   B2 PASS   B3 PASS (0.075 LOCKED v0.2.0; 0.10 rejected)   B4 PASS
A3 BLOCK  A4 BLOCK ─┘   B5 PASS_WITH_CAVEATS (NFE-3)     B6 FAIL
   │                                 │
   │  needs raw sWGS BAMs,           │  T1 reached: ranking, research use only
   │  pipeline version, per-sample   │
   │  MAPD / purity / ploidy         │
   └───────────────┬─────────────────┘
                   ▼
   C BLOCKED — no framework-matched external cohort with >= 50 events
              NFE-1 crosswalk EXECUTED and FAILED (s3<->CX3 rho 0.305, n=529)
              rate-limiting task: direct Macintyre s1-s7 quantification (TCGA-OV / PCAWG-OV)
                   ▼
   D BLOCKED — needs registered protocol + version-locked prospective assay
                   ▼
   E BLOCKED — decision NAMED in v0.2.0 (trial-screening prioritisation at s3 <= 0.075)
              needs a controlled comparison + harms ledger
                   ▼
   F PARTIAL — artifacts complete; ethics / clinical / quality / regulatory review not obtained
```

**Sequencing note.** Gate C is the binding constraint. Its former rate-limiting *scientific* task (C-6, the
framework crosswalk) is **done and negative** — NFE-1 closed the CX route, so external validation must use
direct Macintyre s1–s7 quantification with no crosswalk assumption. Gate A3's cheapest partial — the
purity/ploidy sensitivity using the frozen snapshot's per-sample purity and ploidy — is also available now.
Both should precede any external data-acquisition effort, because both change what an external cohort needs
to supply.

---

## 8. Next falsifiable experiments, in priority order

Each is falsifiable: a stated result would count *against* the candidate.

**NFE-1 — Framework crosswalk (criterion C-6). EXECUTED 2026-08-19 — CRITERION NOT MET; CX route CLOSED.**
Executed on TCGA-OV (n = 529; both frameworks scored by their originating laboratories; BriTROC-1
segment-level profiles are access-controlled and were substituted — recorded in `nfe1_crosswalk.json`):
s3 ↔ CX3 Spearman ρ = **0.305** [0.227, 0.382]; s3 ↔ CX2 ρ = 0.279; s3 ↔ (CX3 − CX2) ρ = 0.156; call
concordance 54.3%, Cohen's κ = 0.084. All seven contrasts fall decisively below the 0.80 criterion; s3's
strongest CX correlates are *negative* (CX4 −0.570, CX8 −0.529). **The falsifier fired:** no CX-based
cohort — OV04, Hartwig, and most of the current literature — can validate this candidate, and the Gate C plan
is rewritten around direct s1–s7 quantification only (see NFE-4). Artifacts: `nfe1_crosswalk.json`,
`tables/nfe1_crosswalk_concordance.csv`, `figures/fig5_framework_crosswalk.png`, `code/crosswalk_s3_to_cx.py`
(input SHA256s pinned in the output).

**NFE-2 — Purity/ploidy confounding (Gate A3 partial).**
Using the 94 re-derived BAM profiles that carry published purity and ploidy, regress the CN features on purity
and ploidy and test whether the outcome association survives adjustment.
*Falsifier:* if the association is fully explained by purity or ploidy, the apparent signal is a
specimen-quality artifact. This also closes the claim-ledger row currently recorded as untestable.

**NFE-3 — Selection-bias sensitivity for B5. EXECUTED 2026-08-19 — signal survives; B5 → PASS_WITH_CAVEATS.**
Within-fold multiple imputation (IterativeImputer, m = 10 per fold, outcome as predictor, held-out outcomes
masked; Firth estimator; identical folds; Rubin pooling) on the full n = 98: **ΔAUROC 0.1836
[0.1563, 0.2109] — excludes zero** (KNN sensitivity: 0.0955 [0.0882, 0.1029]). The complete-case Δ 0.3525 was
inflated by outcome-selective exclusion, but the signal is not an artifact of it. Caveats: MNAR not
excludable; 20 events. M3a on n = 98 (0.7008) does not beat raw s3 alone (0.7285) — M1 remains primary.
Artifacts: `nfe3_imputation.json`, `tables/nfe3_imputation_incremental_value.csv`,
`code/run_nfe3_imputation.py`.

**NFE-4 — External discrimination on TCGA-OV (first Gate C attempt; now the decisive experiment).**
With the CX crosswalk closed by NFE-1, this is the route: compute Macintyre s1–s7 exposures **directly** on
TCGA-OV absolute copy-number profiles (ASCAT/SNP6; `CINSignatureQuantification` supports the ovarian
signatures natively — no crosswalk assumption), join to adjudicated platinum response (TCGA-CDR), and score
the locked candidate; report protective AUROC with bootstrap CI against criterion C-1, disclosing the
signature-model contamination caveat. PCAWG-OV is the second framework-matched source.
*Falsifier:* a CI lower bound ≤ 0.55 retires the candidate.

**NFE-5 — Retire-or-repair decision on the Sig7 prognosis branch.**
Formally evaluate the shipped `s7 ≥ 0.25` rule against the measured OOF AUROC 0.4108 (continuous) and 0.6446
(fixed rule) and decide. *Falsifier for repair:* if a namespace-corrected, QC-gated s7 reader still yields OOF
AUROC < 0.6 on the diagnosis timepoint, the branch is retired rather than patched.

---

## 9. Gate status summary

| Gate | Status | Binding gap |
|---|---|---|
| **A1** computational reproducibility | **PASS** | Four undocumented archived-script choices now documented (C14); the Cox covariate set must always be declared |
| **A2** pipeline determinism | **PASS** | — |
| **A3** assay / pipeline reproducibility | **BLOCKED** | Raw sWGS BAMs, pipeline version, per-sample MAPD / purity / ploidy, ≥ 20 replicate pairs |
| **A4** platform transferability | **BLOCKED** | Matched multi-platform specimens. A plasma route already fails sufficiency (31%) |
| **B1** discrimination | **PASS** | Primary is n = 98; protective AUROC 0.7285 (0.5942–0.8468) |
| **B2** incremental value | **PASS** | 9 events; EPV 1.5–3.0; the deltas are largely "works where mutation status does not" |
| **B3** threshold | **PASS — `0.075` LOCKED (spec v0.2.0); `0.10` REJECTED** | PPV 0.424 at the lock; research-candidate lock only |
| **B4** adjusted / survival effect | **PASS with declared fragility** | Cox p 0.0430 → 0.0937 on a defensible adjustment-set change |
| **B5** selection integrity | **PASS_WITH_CAVEATS (NFE-3)** | 67-set inclusion is outcome-associated (Fisher p = 0.0162); imputed n = 98 ΔAUROC 0.184 [0.156, 0.211] excludes zero; MNAR not excludable |
| **B6** calibration | **FAIL** | Brier skill −0.2762; intercept CI excludes 0. Probability output prohibited |
| **C** external retrospective | **BLOCKED** | No framework-matched cohort with ≥ 50 events. NFE-1 crosswalk FAILED (ρ = 0.305); route is direct Macintyre quantification (NFE-4) |
| **D** prospective silent | **BLOCKED** | No protocol, assay lock, or drift instrumentation |
| **E** clinical utility | **BLOCKED** | Decision NAMED (v0.2.0): prioritise s3 ≤ 0.075 patients for non-platinum trial screening. No controlled comparison exists |
| **F** governance | **PARTIAL PASS** | Ethics / clinical / quality / regulatory review not obtained; token rotation open |

**Disposition.** The candidate is a reproducible internal signal that adds discrimination over the clinical and
mutation-based axes in its development cohort, and it is authorised for research ranking only (T1). It is not a
diagnostic. NFE-1 has answered the framework question negatively — Gate C is **not** reachable through any
CX-framework cohort — so the next decision-relevant experiment is **NFE-4**: direct Macintyre s1–s7
quantification on TCGA-OV with adjudicated platinum response, the first real Gate C attempt.
