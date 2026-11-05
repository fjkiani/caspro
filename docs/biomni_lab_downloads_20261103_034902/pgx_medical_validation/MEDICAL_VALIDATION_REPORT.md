# Independent Medical Validation Report
## Pharmacogenomic Dosing-Guidance Publication (`publications/05-pgx-dosing-guidance`)

**Validation type:** Independent re-derivation of load-bearing quantitative claims from the primary
literature and current pharmacogenomics guidelines, plus an internal-consistency audit across all shipped
receipts and prose files, with overstated/incorrect claims corrected in place on a review branch.

**Critical definitions.** Throughout this report, **"validated" / "SUPPORTED" means the claim was
independently reproduced from its cited primary source** — it does **not** mean the claim is clinically
proven. All results are **research-use-only (RUO)**; nothing here implies regulatory clearance or
prospective clinical proof. No new clinical data, synthetic patients, or fabricated values were generated;
this is an audit of already-authored claims.

**Adjudication rule.** Where the manuscript body and the summary/audit files disagree, the more
conservative, evidence-consistent statement is treated as correct and the overstated one is corrected
toward it.

---

## 1. Headline verdict

| Area | Verdict |
|------|---------|
| Core efficacy/toxicity statistics (PREPARE 83.1% RRR; CYP2C19 4.28×; negative controls) | **SUPPORTED** — reproduced exactly from the primary papers |
| Tier-2 heuristic screen performance in the **manuscript body** (§3.3) | **SUPPORTED** — 100% sensitivity / 10% specificity / 40% PPV reproduced exactly |
| Toxicity-prediction **specificity "100% (53/53)"** in README / index / SME summary | **OVERSTATED (HIGH)** — contradicts the package's own receipt (specificity is *not estimable*) |
| Toxicity **sensitivity "100% (6/6)"** as a single headline | **OVERSTATED (HIGH)** — fuses two different metrics/cohorts |
| TPMT \*3A case labeled **"EXACT"** CPIC match | **OVERSTATED (MEDIUM)** — is within-range, and the cited CPIC range is mis-stated |
| Nguyen cohort metadata + pretreatment-vs-reactive significance | **DISCREPANT (MEDIUM)** — conflicting author metadata; a non-significant contrast |
| Safety-Gate "prevents trial failures 87.5%" marked "✅ VALIDATED" in the audit summary | **OVERSTATED (MEDIUM)** — it is a projection (the repo's own tier table says so) |
| CPIC concordance 100% (10/10) | **SUPPORTED but thin** — small denominator, mostly Normal-Metabolizer full-dose calls |
| DPYD/TPMT guideline citations | **SUPPORTED with currency note** — cited versions are superseded; the specific calls still hold |
| "83% of variants lack CPIC coverage" | **SUPPORTED** — correctly framed as coverage, not performance |

**Bottom line.** The scientific core of the paper — the genotype-guided efficacy and toxicity signals drawn
from PREPARE, the CYP2C19 clopidogrel cohort, and Nguyen — is sound and independently reproducible. The
problems are concentrated in the **summary/audit/README layer**, where a real Tier-2 sensitivity count was
fused with a non-existent specificity to produce an impossible "100% sensitivity / 100% specificity"
headline, and where a projection and a within-range CPIC match were labeled as fully validated/exact. These
are correctable wording/labeling errors, not failures of the underlying analysis.

---

## 2. Load-bearing statistics — independent re-derivation (Stream A)

All three core statistics were recomputed **from the raw source-table counts** (not from the shipped
receipts) using Fisher's exact test and exact/asymptotic confidence intervals, then confirmed against the
open-access primary papers.

### 2.1 PREPARE actionable-carrier toxicity reduction — **SUPPORTED**
- **Claim:** 83.1% RRR (34.8% → 5.9%), Fisher p = 0.054.
- **Recomputed:** control 8/23 (34.8%), intervention 1/17 (5.9%) → **RRR = 0.8309**, **Fisher p = 0.0536**,
  OR 0.1 (exact 95% CI 0.013–1.052).
- **Primary source:** PREPARE gastrointestinal-cancer secondary analysis, **PMID 39641926 / PMC11624585**,
  Table 2 — reports adjusted **OR 0.1 (0.0–0.8), p = .04**. The paper's adjusted framing is significant; the
  package cites the more conservative Fisher p = 0.054. Retaining the conservative value is appropriate.
- **Note:** n = 563 is a **secondary-analysis subset** of the 1,232 enrolled; the manuscript describes it as
  a secondary analysis correctly.

### 2.2 PREPARE nonactionable negative controls — **SUPPORTED**
- **Claim:** 15.3% vs 16.0%, p = 0.904, 523 negative controls.
- **Recomputed:** control 46/288 (16.0%), intervention 36/235 (15.3%) → **RRR = 0.041**, **Fisher p = 0.904**
  (n = 523). Confirmed against PMC11624585 Table 2. Correctly used as negative-control (specificity) evidence.

### 2.3 CYP2C19 clopidogrel ischemic-event risk — **SUPPORTED**
- **Claim:** 4.28× higher risk in PM/IM (20.2% vs 4.7%), p = 6.7×10⁻⁴.
- **Recomputed:** EM 5/106 (4.7%), PM/IM 21/104 (20.2%) → **RR = 4.281 (95% CI 1.677–10.926)**,
  **Fisher p = 6.7×10⁻⁴**.
- **Primary source:** NCVC Genome Registry large-artery-atherosclerosis stroke cohort,
  **PMID 40944685 / PMC12673833**, Table 4; paper reports univariate **HR 4.34 (1.61–11.36)** and
  multivariate **HR 5.26 (1.87–14.56)**.
- **Note:** The full study is 369 LAA-stroke patients (from 1,612 screened); **n = 210 is correctly the
  clopidogrel-treated subset** (EM 106 + PM/IM 104). The manuscript uses CYP2C19 as an outcome-association
  signal, not as a dosing-concordance case — appropriate.

### 2.4 Nguyen DPYD cohort — **DISCREPANT (context + metadata)**
- **Non-significant contrast (MEDIUM).** The "51.6% RRR toxicity" for **pretreatment vs reactive** genotyping
  is a descriptive contrast that is **not statistically significant** (recomputed RRR 0.509, **Fisher p =
  0.13** toxicity; p = 0.061 hospitalization; pretreatment n = 16, reactive n = 11). The paper's
  **significant** result is **reactive vs wild-type** (multivariable **OR 3.57, 95% CI 1.02–12.49, p = .029**
  toxicity; **OR 9.59, 2.70–34.04, p = .001** hospitalization). The manuscript body (line 392) correctly
  cites the significant OR; the descriptive RRR must not be presented as a significant effect anywhere.
- **Metadata conflict (MEDIUM).** The same paper (**PMID 38935897 / PMC11371106 / DOI 10.1200/PO.23.00623**)
  is described two ways: `receipts/nguyen_dpyd_validation.json` is **correct** (first author **Nguyen DG**;
  senior author **Jai N. Patel**; Atrium Health Levine Cancer Institute; prospective observational cohort),
  whereas `reports/case_studies_data.json` (CS001) lists **"Patel JN" as first author** (he is the senior/last
  author), a wrong title, and mislabels the design as a "real-world implementation study." Corrected.
- **Minor (LOW).** Hospitalization RRR is 60.7% in one receipt and 60.9% in another; recomputed value is
  **0.607**. Harmonized.

---

## 3. Sensitivity / specificity — the headline error (Stream B)

This is the **highest-severity** finding. There are **two distinct clinical metrics** in the package, computed
on **different case subsets**, plus a **third, separate** table-level actionability metric. The README/index
headline **fuses** them into an impossible "100% sensitivity / 100% specificity."

| Metric | Cohort (n) | Confusion | Sensitivity | Specificity | Source |
|--------|-----------|-----------|-------------|-------------|--------|
| **Metric 1 — clinical-evaluable** | drug present **AND** known outcome (n = 6) | tp 4, fn 2, tn 0, fp 0 | **0.667** (Wilson 30.0–90.3%) | **Not estimable** (0 confirmed negatives) | `reports/clinical_validation_audit.json` |
| **Metric 2 — Tier-2 heuristic screen** | scorable heuristic cases (n = 16) | tp 6, fn 0, tn 1, fp 9 | **100%** (61.0–100%) | **10%** (1/10; 1.8–40.4%) | MANUSCRIPT.md §3.3 |
| **Separate — PREPARE actionability classification** | 523 nonactionable | — | 100% (40/40) | 100% (523/523) **table-level classification concordance**, *not* clinical prediction | `reports/prepare_outcome_validation.json` |

**The error.** `README.md` (lines 19–20, 73), `PUBLICATION_PACKAGE_INDEX.md` (52–53), and
`docs/SME_EXECUTIVE_SUMMARY.md` (21) advertise **"Toxicity Sensitivity 100% (6/6)"** paired with
**"Specificity 100% (53/53)"** and "zero false positives." This is invalid because:
1. The **"6/6" sensitivity count comes from Metric 2** (n = 16), while the **clinical-evaluable sensitivity is
   0.667** (4/6). Presenting "100% (6/6)" as *the* toxicity sensitivity conflates the two.
2. The **"53/53 specificity" does not exist.** The package's **own receipt**
   (`reports/clinical_validation_audit.json`) sets `toxicity_specificity = null` and states: *"If
   toxicity_negative_n is 0, specificity cannot be estimated clinically from this cohort."* The 53 cases are
   **`tox_unknown`** (outcome not established), not confirmed true negatives.
3. Metric 2's real specificity is **10%**, not 100%.

**Distinct, and *not* wrong: "actionability specificity 100% (523/523)."** This is a **table-level
actionability-classification-concordance** metric (nonactionable genotypes correctly classified as
nonactionable) and is honestly scoped in the receipt and in `VALIDATION_SUMMARY_FIGURES.md` ("table-level, not
patient-level prediction"). It is retained, with a clarifier so it is not mistaken for clinical
toxicity-prediction specificity.

**The manuscript body is accurate.** MANUSCRIPT.md §3.3 reports the honest Tier-2 profile (100% sensitivity,
10% specificity, 40% PPV, n = 16) and justifies the high-sensitivity/low-specificity design against accepted
screening paradigms (mammography ~85%/90%, PSA ~86%/33%, FOBT ~74%/96%). The corrections bring the summary
layer into line with the body.

---

## 4. CPIC concordance and guideline currency (Stream C)

- **CPIC concordance 100% (10/10) — SUPPORTED but thin.** The 10 matched calls are 9 DPYD + 1 TPMT; only ~3
  are actionable dose-reduction calls (the rest are Normal Metabolizer → full dose, near-trivial). The DPYD
  **REDUCE_50** calls for c.2846A>T and c.1903A>G intermediate metabolizers are concordant with CPIC. The
  claim is true but low-powered; a note to that effect is added.
- **TPMT \*3A case (LIT-TPMT-001) — OVERSTATED (MEDIUM).** (a) \*3A/\*1 = **Intermediate Metabolizer** is the
  correct phenotype. (b) The CPIC mercaptopurine IM recommendation is a **starting-dose range of 30–80% of
  normal** (both the 2018 and 2025/26 versions), **not "REDUCE_30_70"** — the cited range is mis-stated. (c)
  The system's **REDUCE_50 is within** the CPIC range, so it is clinically defensible, but labeling it
  **"EXACT"** is incorrect; it is a within-range point approximation. Corrected to **"WITHIN_RANGE"** with the
  range fixed to **30–80%**.
- **Guideline currency (notes):**
  - **DPYD** cited as *2017 Update (PMID 29152729)* is **superseded** by the Jan-2024 and Jul-2026 updates
    (HapB3 / c.1129-5923C>G reclassified to activity score 0.75 → 75% starting dose). **None of the 10 cases
    involve HapB3**, so the calls stand.
  - **TPMT** cited as *2018 Update (PMID 30447069)* is **superseded** by the 2025/2026 update (PMID 41618934 /
    doi 10.1002/cpt.70209), which adds a compound TPMT/NUDT15 IM phenotype; the **IM range is still 30–80%**.
  - **UGT1A1** (2016, PMID 26818858) remains current; the UGT1A1 cases are all ClinVar-bridge (no CPIC dosing
    claim depends on them).
  - **CYP2C19-clopidogrel** current guideline is the 2022 update (PMID 35034351); the manuscript uses CYP2C19
    as an outcome association (PM/IM higher risk), the direction of which matches CPIC.

---

## 5. Internal consistency and evidence-tier framing (Stream D)

- **"83% of variants lack CPIC coverage" (49/59) — SUPPORTED.** Every instance is framed as a **coverage**
  statement ("no guideline available" / "CPIC gap"), never as a performance metric. No change.
- **Safety-Gate "prevents trial failures / 87.5%" — OVERSTATED (MEDIUM).** The manuscript abstract/body and
  the repo's own `reports/EVIDENCE_TIER_TABLE.md` correctly call this a **projection** (applying PREPARE
  intervention-arm rates to the control arm; PREPARE *succeeded* and was not a failed trial; retrospective,
  prospective, and RCT tiers are explicitly "Not Done"). However, `CLINICAL_VALIDATION_AUDIT.md` marks Claim E
  **"✅ VALIDATED"** (lines 27, 187, 241) and `OUTCOME_LINKED_BREAKTHROUGHS.md` (line 137) calls it
  "receipt-backed." These are corrected to **PROJECTION** to match the manuscript and the tier table. (The
  hypothetical "NCT#, 6/30 terminated, 5/6 flagged" text in EVIDENCE_TIER_TABLE.md is explicitly an *"Expected
  Output (If Done)"* template, not a claimed result — left as-is.)
- **ClinVar bridge (49/49).** The receipt already states this validates **retrieval coverage, not dosing
  correctness**; that framing is preserved.

---

## 6. Corrections applied (in place, on the review branch)

Every edit below is logged in `reports/medical_validation_ledger.json` with the claim id, source location,
claimed value, recomputed value, verdict, citation, and corrective action.

| # | File(s) | Change |
|---|---------|--------|
| B1 | `README.md` (20, 73), `PUBLICATION_PACKAGE_INDEX.md` (53), `docs/SME_EXECUTIVE_SUMMARY.md` (21) | Replace toxicity "Specificity 100% (53/53)" / "zero false positives" with **"Not estimable from this cohort (0 confirmed toxicity-negative evaluable cases; 53 outcome-unknown)."** |
| B2 | `README.md` (19), `PUBLICATION_PACKAGE_INDEX.md` (52), `VALIDATION_SUMMARY_FIGURES.md` (242) | Disambiguate the two sensitivity metrics: clinical-evaluable **0.667 (4/6)** vs Tier-2 heuristic **100% (6/6) with 10% specificity, 40% PPV**. |
| B4 | `VALIDATION_SUMMARY_FIGURES.md` (244), `OUTCOME_LINKED_BREAKTHROUGHS.md` (54) | Keep 523/523 but clarify it is **actionability-classification concordance (table-level), not clinical toxicity-prediction specificity**. |
| C2 | `docs/CPIC_ALIGNMENT_SUMMARY.md` (41), `reports/CPIC_CONCORDANCE_REPORT.md` (44), `reports/cpic_concordance_report.json` (128) | "EXACT" → **"WITHIN_RANGE"**; "30–70%" / "REDUCE_30_70" → **"30–80% of normal starting dose"**. |
| D1 | `CLINICAL_VALIDATION_AUDIT.md` (27, 241, 248), `OUTCOME_LINKED_BREAKTHROUGHS.md` (137) | Safety-Gate Claim E relabeled **PROJECTION** (not "✅ VALIDATED"), consistent with EVIDENCE_TIER_TABLE.md. |
| A5/A6 | `reports/case_studies_data.json` (CS001) | Fix Nguyen metadata: first author **Nguyen DG** (Patel JN = senior author); design **prospective observational cohort**; hospitalization RRR harmonized to **0.607**. |
| C3/C4 | `reports/CPIC_CONCORDANCE_REPORT.md` | Add **currency notes**: DPYD 2017 and TPMT 2018 citations superseded; specific calls unaffected. |

No fabricated data was introduced; RUO framing is preserved throughout; the honest
prognostic-vs-predictive and projection framing is retained.

---

## 7. Residual limitations (unchanged by this validation)

- **Table-level PREPARE data.** The negative-control analysis validates the outcome logic, not variant-by-variant
  patient-level ingestion.
- **Small evaluable cohorts.** Clinical-evaluable n = 6 and Tier-2 n = 16 yield wide confidence intervals; the
  actionable-carrier PREPARE signal is promising but underpowered (borderline p).
- **Projection, not prevention.** The trial-failure-prevention claim is a projection; retrospective,
  prospective, and RCT evidence tiers remain "Not Done."
- **Reconstructed Nguyen patient-level data.** Where used, Nguyen patient-level values are reconstructed from
  published aggregate statistics; this must remain disclosed.
- **RUO.** Nothing here is clinically proven or regulatory-cleared.

---

*Machine-readable per-claim ledger: `reports/medical_validation_ledger.json`. All statistics were recomputed
from primary-source table counts with Fisher's exact test and exact/Wilson confidence intervals.*
