# ENDPOINT_CONTRACT — v1.0.0

**Status:** LOCKED for this analysis · **Scope:** platinum-resistance endpoints for the S3 / Resistance
Prophet candidate · **Machine-readable form:** `ENDPOINT_CONTRACT_v1.json`

This contract exists because the alternative was to invent ground truth. It is explicitly **not** permitted
to derive the outcome from the predictor — no rule of the form `s3_diag < 0.10 ⇒ resistant` is used
anywhere in this program, and no such rule exists in any repository (`unsourced_numbers_forensic.md` §3).

---

## 1. Primary endpoint — `ENDPOINT_v1_PRIMARY`

| Field | Value |
|---|---|
| Name | `pt_sensitivity_at_reg` |
| Type | binary; `1 = platinum resistant`, `0 = platinum sensitive` |
| Source column | `pt_sensitivity_at_reg` in `figure_1B_layer_1.tsv` (all 273 patients) and `figure_2.tsv` (134 patients) |
| Source study | BriTROC-1; Smith P., Bradley T., Gavarró L.M. *et al.*, *Nat Commun* **14**, 4387 (2023), DOI 10.1038/s41467-023-39867-7 |
| Definition provenance | **Source-attributed, not independently adjudicated.** The label is the source study's own classification of platinum sensitivity at BriTROC-1 registration, following GCIG convention. This program does not re-adjudicate individual patients because the underlying dates are not released. |
| Assessment time origin | **Registration into BriTROC-1** (at relapse). |
| Predictor time origin | **Diagnosis** — `s3_diag` comes from the archival diagnosis specimen. |
| Temporal ordering | Predictor strictly precedes outcome assessment. Time from diagnosis to registration is available as the negative `time` value for `event == "diag"` in `figure_1B_layer_1.tsv`, and is reported as a descriptor. |
| Label concordance across the two source files | **134 / 134 identical** where both files carry the patient |

### Why this and not something else

It is the field the documented result (AUROC 0.2715 / protective 0.7285) was computed on, it is the field
the source study uses for "primary platinum resistant", and it is the only platinum-response field that
exists in the open data. Choosing anything else would require fabricating dates.

---

## 2. The five-class contract requested by the directive

| Class | Status | What is missing, exactly |
|---|---|---|
| `platinum_sensitive` | **DERIVABLE** | — (`pt_sensitivity_at_reg == "sensitive"`, n=207 of 273) |
| `primary_resistant` | **DERIVABLE** | — (`pt_sensitivity_at_reg == "resistant"`, n=66 of 273). Note this pools refractory and resistant. |
| `primary_refractory` | **`NOT_DERIVABLE_FROM_OPEN_DATA`** | Requires progression **during** platinum therapy or within 4 weeks of the last dose. Needs: date of last platinum dose; date of documented progression (RECIST 1.1 or GCIG CA-125); best overall response on the platinum line. None released. Refractory patients are therefore inside `primary_resistant`, which inflates the severity of that class heterogeneously. |
| `censored_before_assessable` | **`NOT_DERIVABLE_FROM_OPEN_DATA`** | Requires per-visit assessability status and date of first post-treatment assessment, plus date of death or last follow-up relative to that. Only overall survival time and vital status are released (`event == "os"`, `status ∈ {alive, deceased}`). |
| `indeterminate_missing` | **DERIVABLE ONLY AS "NOT LABELLED"** | In this cohort the class is empty: `figure_1B_layer_1.tsv` labels **all 273** patients, so `strict_n_missing_label = 0`. Genuine indeterminacy (e.g. CA-125-only progression without radiological confirmation) cannot be distinguished from a confident label because the adjudication inputs are not released. |

### Platinum-free interval — proven impossible, not assumed

`figure_1B_layer_1.tsv` contains exactly five columns: `britroc_number`, `pt_sensitivity_at_reg`,
`status`, `event`, `time`. `event` takes exactly two values: `diag` (273 rows, negative times = days
before registration) and `os` (273 rows). There is **no progression event, no PFS, no PFI, and no
treatment date** in any released file. `figure_2.tsv` adds `day_diff` (7.7–186.7, with NA) and
`num_lines`, neither of which is a platinum-free interval.

**A PFI-based endpoint (the 6-month convention) cannot be reconstructed from these data at any level of
effort.** It requires two dates that were never published.

### Exact fields that would unblock the full five-class contract

1. `date_last_platinum_dose` (per platinum line)
2. `date_documented_progression` + `progression_basis` ∈ {RECIST 1.1, GCIG CA-125, clinical, symptomatic}
3. `best_overall_response` on the platinum line
4. `assessability_status` per scheduled assessment + `date_first_post_treatment_assessment`
5. `date_treatment_completion` and `reason_for_discontinuation`
6. `n_platinum_cycles_received`

With (1) and (2) alone, PFI and therefore `primary_refractory` / `platinum_sensitive` become derivable.
(4) is required for `censored_before_assessable`.

---

## 3. Denominator reconciliation

From `denominator_reconciliation.csv`:

| Stage | n | resistant | sensitive | prevalence |
|---|---|---|---|---|
| A source clinical cohort | 273 | 66 | 207 | 0.2418 |
| B with platinum label | 273 | 66 | 207 | 0.2418 |
| C complete diagnosis-stage exposures | 98 | 20 | 78 | 0.2041 |
| D primary analysis set | 98 | 20 | 78 | 0.2041 |
| E covariate-complete subset | 67 | 9 | 58 | 0.1343 |

**Selection tests.**
Labelled cohort → set98: Fisher exact OR 0.6125, **p = 0.2511**; prevalence 0.2041 in vs 0.2951 out.
Requiring an evaluable diagnosis specimen is not detectably outcome-selective.
set98 → set67: Fisher exact OR 0.2821, **p = 0.0162**; prevalence 0.1343 in vs **0.3548** out.
**Requiring covariate completeness is non-random with respect to the outcome.** It removed resistant
patients preferentially.

`s3_diag` itself is not detectably different between retained and dropped patients (medians 0.1394 vs
0.1028, Mann-Whitney p = 0.1360).

**Consequence, binding on every downstream report:** the **primary denominator is n=98 / 20 events**.
Results at n=67 / 9 events — which includes the CV receipt's 0.8807 and every adjusted model — carry the
selection warning wherever they are quoted.

---

## 4. Prespecified alternative definitions, retained for sensitivity only

| ID | Definition | Status | Standing warning |
|---|---|---|---|
| `ALT_A_rclass` | RECIST-derived response classification used in the OBL#2 audit | Available for a 40–47 patient subset only | **This is the label that manufactured a false positive.** On the identical 40-patient `s7_rel` feature matrix, AUROC = 0.8739 under `rclass` and **0.3136** under `pt_sensitivity_at_reg`. Any result computed under `ALT_A_rclass` must be reported side by side with the same analysis under the primary endpoint. |
| `ALT_B_pfi_6mo` | Platinum-free interval < 6 months | **`NOT_DERIVABLE_FROM_OPEN_DATA`** | Requires fields 1 and 2 of §2. Reserved for a future controlled-access analysis. |
| `ALT_C_os_surrogate` | Overall survival from registration | Available (`event == "os"`, 39 events in the n=67 set) | Not a platinum-response endpoint. Used only as a secondary biological-plausibility check, never as the resistance label. Adjusted Cox HR/SD 0.6869, p 0.043, Schoenfeld global p 0.2251. |

---

## 5. Change control

Any change to §1 or §3 is a **major** version bump of this contract and invalidates every downstream
performance figure computed under v1. Adding a class in §2 as data becomes available is a **minor** bump.
The contract hash is recorded in `SHA256SUMS` and the adversarial suite asserts that the endpoint
definition used at scoring time matches the contract version recorded in `candidate_spec_v0.1.0.json`.
