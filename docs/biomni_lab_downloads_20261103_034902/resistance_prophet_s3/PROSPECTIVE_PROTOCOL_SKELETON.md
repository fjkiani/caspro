# PROSPECTIVE PROTOCOL SKELETON — Gate D silent validation of the S3 platinum-resistance ranking candidate

**Artifact:** `PROSPECTIVE_PROTOCOL_SKELETON.md` · **Version:** 0.2.0 (skeleton) · **Date:** 2026-08-19
**Status:** SKELETON. This is not a registerable protocol. It is the structure a registerable protocol must
fill, with every scientific parameter that is already determined pinned, and every parameter that requires a
site, a sponsor, or an ethics committee marked `[TO BE COMPLETED]`.
**Governing documents:** `CLINICAL_PROOF_PROGRAM.md` v1.0.0 (Gate D) · `candidate_spec_v0.2.0.json` ·
`ENDPOINT_CONTRACT_v1.md` v1.0.0 · `MODEL_CARD.md`

> **Nothing in this study returns a score to a treating clinician.** This is a *silent* validation. Scores are
> computed prospectively, sealed, and unsealed only at the prespecified analysis. Any protocol version that
> returns scores to care is a different study requiring Gate C completion first.

---

## 1. Administrative

| Field | Content |
|---|---|
| **Short title** | S3-SILENT: prospective silent validation of a copy-number-signature ranking score for primary platinum resistance in HGSOC |
| **Sponsor** | `[TO BE COMPLETED]` |
| **Principal investigator** | `[TO BE COMPLETED]` |
| **Participating sites** | `[TO BE COMPLETED]` — **must be ≥ 2 sites, and at least one site not involved in developing the candidate** |
| **Registration** | Prospectively registered before first enrolment (ClinicalTrials.gov or ISRCTN). Registration must precede accrual; a retrospectively registered study cannot satisfy Gate D |
| **Ethics** | `[TO BE COMPLETED]` — approval required before any specimen collection |
| **Reporting standard** | TRIPOD+AI for the prediction-model report; STARD for the diagnostic-accuracy components |
| **Protocol version control** | Any change to the score, feature namespace, direction constant, or threshold requires a `SPEC_VERSION` bump in `candidate_spec` and a protocol amendment. `assert_threshold_admissible()` enforces this in code |

---

## 2. Rationale and what this study is *not*

### 2.1 What is already established (do not re-litigate in the protocol)

- The feature `s3_diag` (Macintyre 2018 seven-signature framework, signature 3 exposure at diagnosis)
  discriminates registration platinum status in the BriTROC-1 development cohort: protective AUROC **0.7285**
  (95% CI 0.5942–0.8468) on n = 98 with 20 resistance events; permutation p = 0.0014.
- It adds discrimination over a clinical baseline (complete-case ΔAUROC **+0.3525**, 95% CI 0.1494–0.5480;
  **+0.1836**, 0.1563–0.2109 after within-fold multiple imputation on the full n = 98 — NFE-3) and over the
  BRCA/HR mutation axis (ΔAUROC **+0.6571**, 0.4713–0.8257) on identical folds.
- It is **not** a restatement of BRCA status: correlation of s3 with BRCA mutation is 0.0912 (p = 0.372), and
  BRCA status alone gives AUROC 0.4724 in this cohort.

### 2.2 What is explicitly unestablished, and therefore what this study must not assume

- **No external validity.** Gate C is BLOCKED; no framework-matched independent cohort with ≥ 50 events has
  been identified. *This study is therefore either (a) run after a Gate C attempt, or (b) run in parallel and
  explicitly labelled as the first out-of-development-cohort evidence.* Option (b) is acceptable but must be
  declared in the registration.
- **No calibration.** Brier skill against prevalence is **−0.2762**; the calibration intercept CI
  (−3.4144 to −0.8204) excludes 0. The study produces **ranks, not probabilities**.
- **Locked research-candidate threshold — carried, not re-derived.** Spec v0.2.0 locks
  `LOCKED_THRESHOLD = 0.075` (the Youden-grid optimum on the n = 98 development primary set, inside the
  100-fold in-fold envelope [0.0502, 0.0798] and the bootstrap cutpoint CI [0.0467, 0.2084]). `0.10` remains
  `REJECTED_AS_LOCK` (it lies outside the envelope and is grid-optimal only on the 67-patient set and only
  via a zero cell). The lock is a research-candidate operating point, not a clinical threshold; §6.3
  specifies how this protocol handles it.
- **No assay reproducibility data.** Gate A3 is BLOCKED. This protocol must *generate* it (§5.4), because
  without it a prospective score has unknown measurement error.

---

## 3. Objectives and endpoints

### 3.1 Primary objective

Estimate, prospectively and without refitting, the discrimination of the locked S3 candidate for the primary
platinum-resistance endpoint in consecutively accrued, newly diagnosed HGSOC.

**Primary endpoint:** protective AUROC of the sealed `rank_score` against `pt_sensitivity_at_reg` as defined in
`ENDPOINT_CONTRACT` v1.0.0, with stratified bootstrap 95% CI.

**Primary success criterion (Gate D-1):** point estimate ≥ 0.65 **and** bootstrap 95% CI lower bound > 0.55, on
≥ **50** accrued resistance events.

**Primary falsification criterion:** a CI lower bound ≤ 0.55 on ≥ 50 events **retires the candidate**. This is
stated in the protocol so that a null result is publishable and non-negotiable.

### 3.2 Secondary objectives

| # | Objective | Endpoint | Criterion |
|---|---|---|---|
| S1 | Precision of discrimination | 95% CI half-width of the protective AUROC | ≤ 0.075 (requires ≥ 68 events) |
| S2 | Incremental value over standard clinical variables | ΔAUROC vs a model of age, stage, prior lines, on identical folds, paired bootstrap | CI excludes zero in the prespecified direction |
| S3 | Incremental value over BRCA/HR status | ΔAUROC vs the mutation axis | CI excludes zero in the prespecified direction |
| S4 | Operating characteristics at the locked cutpoint 0.075 | sensitivity, specificity, PPV, NPV with CIs | Sensitivity and specificity CIs must not exclude the development point estimates at the lock (0.700 / 0.756 on n = 98); the honest in-fold estimates (0.6525 / 0.7510) are reported as a secondary reference |
| S5 | Calibration (**exploratory only**) | calibration intercept and slope with CI; Brier skill | Reported, not tested. Interpretation prohibited below 100 events |
| S6 | Overall-survival association | Cox HR per SD of s3 with a **prespecified, fully declared** covariate set | Reported with covariates named. *Rationale:* the development-cohort Cox p moved 0.0430 → 0.0937 on an adjustment-set change |

### 3.3 Operational endpoints (co-primary for deployment readiness)

| # | Endpoint | Criterion |
|---|---|---|
| O1 | Assay success rate | ≥ 90% of consented patients yield an evaluable s3 value (Gate D-2) |
| O2 | Turnaround time, specimen receipt → sealed score | Within the clinically actionable window declared at §6.5 (Gate D-3) |
| O3 | Score distribution drift over calendar time | No drift by the prespecified test at §6.6 (Gate D-4) |
| O4 | Care-influence breaches | **Zero** instances of a sealed score reaching the treating team (Gate D-5) |
| O5 | Missing-data rate for endpoint ascertainment | ≤ 5% of enrolled patients with unascertainable platinum status |

---

## 4. Design and population

### 4.1 Design

Prospective, multi-site, **observational, silent** (non-interventional) cohort study. Consecutive accrual. No
randomisation. No treatment assignment influenced by the study. Blinded outcome ascertainment.

### 4.2 Eligibility

**Inclusion**

1. Age ≥ 18 years.
2. Histologically confirmed high-grade serous ovarian, fallopian tube, or primary peritoneal carcinoma.
3. Newly diagnosed, treatment-naive at the time of specimen collection (**diagnosis timepoint is a hard
   requirement** — the candidate is defined on `s3_diag`, the diagnosis-sample exposure, and the frozen
   scorer's pinned constants `mu = 0.176743`, `sd = 0.138041` were derived on diagnosis samples).
4. Planned first-line platinum-based chemotherapy.
5. Platinum response assessable per the `ENDPOINT_CONTRACT` v1.0.0 primary definition — i.e. sufficient
   follow-up and assessment to classify registration platinum status.
6. Recorded FIGO stage.
7. Written informed consent, including consent to sealed computational analysis with no return of results.

**Exclusion**

1. Stage I disease (excluded in the analogous published resistance analyses; the resistance endpoint is
   ill-defined at very low event risk).
2. Non-high-grade-serous histology.
3. Fewer than 3 planned platinum cycles, or platinum discontinued < 28 days after initiation for reasons
   unrelated to disease (renders time-to-failure non-calculable).
4. Prior systemic therapy for this malignancy.
5. Insufficient tumour material for shallow whole-genome sequencing at the pre-specified minimum input.

### 4.3 Sample-size and accrual plan

Derived from the Hanley & McNeil (1982) AUROC variance approximation. The **event count** is the binding
quantity; patient numbers follow from prevalence.

| Target | Events | Evaluable patients at 20.4% prevalence | Specimens collected at ≥ 90% assay success | Approached at 80% consent `[assumption — confirm per site]` |
|---|---|---|---|---|
| **D-1 minimum** (reject 0.5 at 90% power, assuming shrinkage to AUROC 0.65) | **50** | 245 | 273 | 342 |
| **S1 precision** (95% CI half-width ≤ 0.075 at AUROC 0.70) | **68** | 334 | 371 | 464 |
| S4 threshold precision (sensitivity to ±0.10) | 73 | 358 | 398 | 498 |
| S5 calibration (SE of slope ≤ 0.15; **not** a study objective) | ~100 | 490 | 545 | 681 |

**Recommended enrolment target: 371 specimens collected (≈ 334 evaluable, ≈ 68 events)**, which satisfies both
D-1 and S1. Falling short at 245 evaluable still permits a D-1 determination but licenses no threshold lock.

**Prevalence assumption and its risk.** 20.4% is the observed prevalence in the development analysis set; the
source clinical cohort prevalence was 24.2%. If site prevalence is materially lower, patient targets rise
proportionally. **An interim event-count check at 50% of planned accrual is mandatory (§6.7)** — with
reallocation of accrual, never with relaxation of the event target.

### 4.4 Accrual feasibility

`[TO BE COMPLETED]` — annual incident HGSOC per site, historical consent rate, historical specimen adequacy
rate. **A protocol that cannot reach 50 events within the sponsor's horizon should not open**; a
40-event study cannot satisfy D-1 and would produce another underpowered receipt.

---

## 5. Specimen handling and assay

### 5.1 Specimen

Diagnostic tumour tissue (biopsy or surgical), formalin-fixed or fresh-frozen per site SOP, collected before
first platinum exposure. `[TO BE COMPLETED: minimum tumour content, minimum DNA input, fixation window.]`

**Plasma cfDNA is explicitly excluded as a primary specimen type.** Published precedent for the related CN
signature framework showed only **9 of 29 (31%)** plasma samples had sufficient ctDNA — far below the ≥ 70%
sufficiency criterion in Gate A4. A plasma sub-study may be nested as exploratory, powered only to estimate
the sufficiency rate.

### 5.2 Assay

Shallow whole-genome sequencing with copy-number calling and seven-signature exposure derivation.

`[TO BE COMPLETED and then FROZEN before first enrolment:]`
- target depth and QDNAseq bin size
- `CNsignatures` release and the exact seven-signature model version used to derive exposures
- per-sample QC metric definitions and pass thresholds (MAPD or equivalent, purity, ploidy)

**This freeze is not optional.** The candidate is defined on a specific signature framework
(`FEATURE_FRAMEWORK = MACINTYRE_2018_7_SIGNATURE`), and `s3_research.py` raises `SignatureNamespaceError` on
COSMIC or SBS namespaces. A protocol that does not name the signature model version cannot produce a
framework-matched exposure.

### 5.3 QC gating — fail closed

Samples failing prespecified QC are recorded as **NOT EVALUABLE** and contribute to the O1 assay-success
denominator. They are **not** imputed and **not** scored.

*Provenance of this requirement:* the production QC gate was found to be fail-open ("pass if no specific QC
metrics found"), which allows an unqualified specimen to receive a confident-looking output. That defect is
documented in `PROPOSED_PATCH_C02_C03.md` and must not be reproduced in a prospective assay.

### 5.4 Embedded analytical-validity sub-study (closes Gate A3)

Because Gate A3 is BLOCKED, this protocol must generate the missing analytical data:

1. **Technical replicates:** ≥ 20 specimens processed in duplicate through independent library preparation and
   sequencing runs. Report ICC for the s3 exposure, Bland–Altman limits of agreement, and classification
   concordance at the analysis cutpoint. **Acceptance: ICC ≥ 0.85; concordance ≥ 90%.**
2. **Noise and composition sensitivity:** regress s3 on per-sample MAPD, purity, ploidy, and depth.
   **Acceptance: no residual dependence at p < 0.05 after multiplicity control.**
3. **Cross-site reproducibility:** ≥ 10 specimens exchanged and processed at ≥ 2 sites.
4. **Pipeline-version reproducibility:** all specimens re-scored under one subsequent pipeline version; report
   concordance.

**These are not optional add-ons.** Without item 2, a positive primary result cannot be distinguished from a
specimen-quality artifact — which is exactly the failure mode identified in the development cohort, where
re-derived copy-number instability features showed a *reversed* association with resistance
(breakpoints AUROC 0.2778, 95% CI 0.1241–0.4502).

---

## 6. Statistical analysis plan

The SAP is frozen and version-controlled before first enrolment. Analysis code is committed with a checksum
before the database lock.

### 6.1 Scoring

Score with the **locked** candidate. **No refitting, no recalibration, no feature reselection, no threshold
re-optimisation on prospective data.** `rank_score(s3_diag) = BETA0 + BETA1·z` with pinned
`mu = 0.1767425892802721`, `sd = 0.13804070487798628`, `BETA0 = −1.5244530417837185`,
`BETA1 = −2.349692574868657`. **No sigmoid is applied** — the output is a rank score, not a probability.

Direction is asserted in code before any analysis:
`DIRECTION_CONSTANT = HIGHER_S3_IS_PLATINUM_SENSITIVE`. `assert_direction()` must pass.

### 6.2 Primary analysis

Protective AUROC with stratified bootstrap 95% CI (≥ 2,000 resamples, seed recorded). Permutation null with
≥ 10,000 label permutations. AUPRC reported against the observed-prevalence null. Mann–Whitney as a
distribution-free companion.

**Reporting prohibition, restated:** the AUROC is not converted into a per-patient probability or confidence
under any circumstance. Any "fold band" or repeated-CV standard deviation is reported *only* alongside the
bootstrap CI, with the ratio stated — in development the fold band was **8.14× narrower** than the bootstrap
CI, and reporting it alone is the single most misleading available presentation of this result.

### 6.3 Threshold handling — the protocol carries the v0.2.0 locked operating point

Spec v0.2.0 locks `LOCKED_THRESHOLD = 0.075` with a six-field provenance record; `0.10` is permanently
`REJECTED_AS_LOCK`. Accordingly, this study:

1. Treats **0.075 as the prespecified primary operating point** and reports its operating characteristics
   (sensitivity, specificity, PPV, NPV with CIs) against secondary objective S4 — declared in the SAP before
   unsealing. Development point estimates at the lock (n = 98): sensitivity 0.700, specificity 0.756,
   PPV 0.424, NPV 0.908.
2. Reports the full ROC and the operating characteristics of the **median of the development in-fold
   envelope, 0.0646**, and of **0.10** (the unsourced legacy candidate) as **prespecified secondary/audit
   cutpoints, labelled as such**, purely so that the historical numbers are auditable.
3. Derives a prospective cutpoint envelope by the same in-fold procedure and compares it to the development
   envelope [0.0502, 0.0798]. If the prospective envelope excludes 0.075, that is a reportable
   threshold-stability finding, not a licence to re-fit.
4. **May not substitute or re-fit the threshold.** Any change requires a `SPEC_VERSION` bump plus the
   six-field provenance record enforced by `assert_threshold_admissible()` — i.e. a new candidate version and
   a protocol amendment, never an in-study edit.

**PPV expectation, stated in advance so it is not a surprise at analysis:** at the development operating point,
PPV was ≈ 0.375 at 20.4% prevalence — roughly **5 of every 8 flagged patients are not primary resistant**. The
protocol's discussion section must interpret any flag against that base rate.

### 6.4 Sealing and blinding

- Scores are written to an append-only sealed store with a per-record checksum and timestamp, accessible only
  to the unblinded statistician after database lock.
- Treating clinicians, site investigators, and the outcome assessor have **no access**, by system permission,
  not by instruction.
- Outcome ascertainment is performed by an assessor blinded to the score.
- **Enforced in code, not by policy:** `research_enabled()` gates all scoring behind
  `ZETA_S3_RESEARCH_ENABLED`; `S3ResearchOutput.to_dict()` raises on any care-influencing key
  (`probability`, `risk_level`, `urgency`, `action_recommendation`, `recommended_actions`,
  `treatment_recommendation`, `next_line_options`, `prognosis`, `confidence`, `confidence_cap`, `state`);
  `verify_no_care_influence()` runs as a release gate. **Endpoint O4 is therefore continuously testable, not
  retrospectively audited.**
- Any breach of O4 is a reportable protocol deviation and is enumerated in the primary publication.

### 6.5 Turnaround

`[TO BE COMPLETED]` — declare the clinically actionable window *before* enrolment, justified by the interval
between diagnostic specimen availability and first-line treatment decision at the participating sites. A
turnaround target set after seeing the data is not an endpoint.

### 6.6 Drift monitoring (endpoint O3)

Split accrual into calendar quartiles. Prespecified test: Kruskal–Wallis on the `rank_score` distribution
across quartiles, plus a Kolmogorov–Smirnov comparison of the first versus last quartile. Report the mean and
SD of the input `s3_diag` per quartile against the pinned `mu`/`sd`. Prespecified action threshold for
investigation: any quartile mean deviating from the pinned `mu` by more than 1 pinned SD.

### 6.7 Interim monitoring

One administrative interim at 50% of planned accrual, examining **only**: event count against projection,
assay success rate (O1), missing-endpoint rate (O5), and O4 breaches. **The primary endpoint is not analysed at
interim and no efficacy stopping rule exists** — this is an observational silent study, so there is no
alpha-spending problem, and there is also no license to peek.

### 6.8 Handling of missing data

- Missing s3 (assay failure): **not imputed**; counted against O1.
- Missing endpoint: counted against O5; primary analysis restricted to ascertained patients, with a tipping-point
  sensitivity analysis.
- Missing covariates for secondary objectives S2/S3: **within-fold multiple imputation on the full evaluable
  set**, not complete-case restriction. *Rationale, and this is a finding rather than a preference:* in the
  development cohort, complete-case restriction from 98 to 67 patients was **significantly associated with the
  outcome** (Fisher p = 0.0162, prevalence 0.1343 inside vs 0.3548 outside). Complete-case analysis is a known
  bias source for this exact feature set and is prohibited as the primary approach.

---

## 7. Governance and data management

| Item | Requirement | Status |
|---|---|---|
| Ethics approval | Before any specimen collection | `[TO BE COMPLETED]` |
| Prospective registration | Before first enrolment | `[TO BE COMPLETED]` |
| Data-transfer / data-processing agreements | Per site | `[TO BE COMPLETED]` |
| Frozen SAP with checksum | Before database lock | Template in §6 |
| Frozen assay pipeline version | Before first enrolment | `[TO BE COMPLETED]` (§5.2) |
| Sealed-score store with per-record checksums | Before first score | Architecture exists (§6.4) |
| Change control on the candidate | `SPEC_VERSION` bump + provenance record; enforced by `assert_threshold_admissible()` | **In place** |
| Risk file (ISO 14971) | Before any care-influencing use | **NOT STARTED** |
| Regulatory pathway determination | Before any care-influencing use | **NOT STARTED** |
| Publication commitment | Primary result published regardless of direction; falsification criterion (§3.1) published in the registration | **Required** |

---

## 8. Relationship to the other gates

| Gate | This protocol's role |
|---|---|
| **A1, A2** | Already passed; this protocol inherits the pinned provenance and contract enforcement |
| **A3** | **Closed by the §5.4 sub-study** — technical replicates, noise/purity/ploidy sensitivity, cross-site and cross-version reproducibility |
| **A4** | Partially addressed if a panel comparison is nested; the plasma route is excluded as primary (§5.1) |
| **B** | Development-cohort evidence; not re-litigated here |
| **C** | **Not substituted for.** If Gate C remains blocked, this study is declared the first out-of-development-cohort evidence in the registration. The framework-crosswalk experiment (NFE-1) has been executed and the CX route is closed (s3 ↔ CX3 ρ = 0.305); retrospective external cohorts can contribute only via direct Macintyre s1–s7 quantification (NFE-4) |
| **D** | **This protocol is Gate D** |
| **E** | Out of scope. Gate E requires a controlled interventional comparison of the designated decision (named in spec v0.2.0: prioritise s3 ≤ 0.075 patients for non-platinum trial screening). This protocol supplies the operating characteristics that a Gate E design would need |
| **F** | Supplies the ethics, registration, SAP-freeze, and change-control artifacts that Gate F currently lacks |

---

## 9. Deliberate omissions

The following are *not* in this skeleton, by design, and their absence is not an oversight:

1. **A re-fitted threshold.** The protocol carries the v0.2.0 lock (0.075) and may not substitute or re-fit it in-study (§6.3).
2. **A probability output.** Calibration failed in development (Brier skill −0.2762) (§2.2).
3. **A treatment-decision rule.** That is Gate E, and Gate E has no named decision yet.
4. **An "AI/ML" framing.** The candidate is a single-feature rank score with four pinned constants. Describing
   it otherwise would misstate the object under study.
5. **Site names, dates, and accrual figures.** These require a sponsor and cannot be invented.
