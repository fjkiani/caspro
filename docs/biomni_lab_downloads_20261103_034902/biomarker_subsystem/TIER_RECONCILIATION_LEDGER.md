# Tier-Reconciliation Ledger — Biomarker Subsystem Self-Audit

**Purpose.** For every signal in the prognostic/diagnostic biomarker subsystem, this ledger records
the *original* tier, the tier *earned* by a clean code re-execution, the direction of change
(UP / DOWN / HOLD), the receipt backing it, and a one-line rationale. Tiers move only where a
re-run earns it; genuine nulls stay null; and where a re-run reveals a *problem* with a prior
result, the tier moves down.

**Tier rule (applied uniformly).**
- **STRONG** — strict signal in ≥2 independent cohorts (C-index 95% CI excludes 0.5 **and** HR 95% CI excludes 1).
- **CONSIDER** — strict signal in ≥1 independent cohort, PH caveat noted.
- **discovery_only** — below that bar after a fair, adequately-powered test.

**Audit scope.** All four w1–w4 pipelines were re-executed against the MetaGxOvarian curated cohort
collection (26 cohorts; those with n ≥ 40 and events ≥ 15 kept as adequate-power). The consensusOV
classifier — previously not re-runnable — was installed from source and **fully re-executed** in
this pass. Two bugs in the first-pass audit harness (degenerate `unique_patient_ID` row-naming; a
glmnet-object stdout/JSON coupling) were found and fixed; corrected results reproduce the original
per-cohort numbers.

---

## Ledger

| # | Signal | Category | Original tier | Re-audit tier | Direction | Receipt |
|---|--------|----------|---------------|---------------|-----------|---------|
| 1 | Riester 3-gene prognostic score | Prognostic | discovery_only (replicated 1-of-2) | **discovery_only** | **HOLD** (independence-corrected) | `w2_prognostic_replication_reaudit.json` |
| 2 | DDR panel prognostic scan | Prognostic (scan) | discovery_only (near-null) | **CONSIDER** | **UP** | `w4_baseline_scan_reaudit.json` |
| 3 | PI3K/mTOR panel prognostic scan | Prognostic (scan) | discovery_only (near-null) | discovery_only | **HOLD** (confirmed null; modality-limited) | `w4_baseline_scan_reaudit.json` |
| 4 | consensusOV molecular subtype | Diagnostic | discovery_only (descriptive) | discovery_only | **HOLD** (now RE-EXECUTED) | `w3_diagnostic_REEXEC.json` |
| 5 | Dispersed-CIN architecture + PTEN | Resistance (real-data) | hypothesis_generating / Consider | hypothesis_generating / Consider | **HOLD** (verified, companion) | `w5_realdata_cin_reaudit.json` |

---

## Rationale and receipts, per signal

### 1. Riester 3-gene prognostic score — discovery_only → discovery_only (HOLD, independence-corrected)
The frozen-coefficient score (NUAK1 = 0.093836, TGFBR2 = 0.075434, LOX = 0.00072) was applied
without refitting to all 15 adequate-power independent cohorts.
- **The single strict signal is GSE9891** — C-index 0.625 (95% CI 0.569–0.681, p = 1.2e-05),
  HR 1.36 (95% CI 1.13–1.63). It reproduces exactly.
- **But GSE9891 (Tothill 2008) was part of the Riester development compendium**, and *all 15
  adequate-power cohorts predate the 2014 signature* (they are curatedOvarianData-era GEO/ArrayExpress
  series; the successor resource, MetaGxOvarian, shares those cohorts). There is therefore **no
  fully-independent cohort** in which the score produces a strict signal.
- The leakage is at the **feature-selection** level: coefficients were re-fit cleanly on TCGA, but
  the 19 *genes* were originally selected by Riester using a compendium that included GSE9891, so a
  strict signal in GSE9891 partly reflects that the panel was optimized on data containing GSE9891.
- **Decision (corrected downward vs. an earlier draft):** absent an independent strict signal, the
  honest tier is **discovery_only**. The consistent weak-positive lean across the majority of
  cohorts (12/15 with C-index > 0.5, CIs crossing 0.5) is reported as directionally supportive
  but not sufficient for Consider.

### 2. DDR panel scan — discovery_only → CONSIDER (UP)
The in-house DDR panel (unsupervised mean-z score, not outcome-fitted) was scanned across 17
adequate-power cohorts (originally 4).
- **Strict signal in GSE17260** — C-index 0.611 (95% CI 0.521–0.702, p = 0.016), HR 1.61
  (95% CI 1.15–2.25, p = 0.005) — a cohort not in the original 4-cohort scan.
- **Why the Riester independence concern does not apply the same way:** this is a *de-novo* canonical
  gene panel, not a literature signature whose features were selected on these cohorts. There is no
  feature-selection leakage from GSE17260 into the panel definition, so a strict signal there is a
  legitimate discovery.
- **Documented counter-signal:** PMID17290060 trends inverse (C-index 0.400, HR 0.73, p = 0.017).
- **Decision:** a genuine single-cohort strict signal ⇒ **CONSIDER**, held below Strong by the
  inverse cohort and the single-cohort limitation.

### 3. PI3K/mTOR panel scan — discovery_only → discovery_only (HOLD, confirmed null; modality-limited)
Same 17-cohort extension.
- **Strict signal in 0/17.** C-indexes scatter around 0.5; PMID17290060 is significantly *inverse*
  (C-index 0.383, p = 0.0014) — no stable prognostic direction.
- **Modality reconciliation (important, but not an upgrade):** this panel is a **bulk,
  cross-sectional, 13-gene mRNA mean-z score**. It is a fundamentally different measurement from the
  companion study's **single-patient, relapse-acquired, structural PTEN copy-number loss** (Subject
  260, relative CN 0.967 → 0.692). A structural loss in one patient is (i) a DNA-level event that a
  bulk mRNA average need not reflect, and (ii) diluted 1/13 within the panel score. So the expression
  null and the structural nomination are **not in conflict** — they interrogate different layers of
  biology. This is a reason the bulk-expression panel is the *wrong instrument* for a PTEN-loss
  hypothesis, not evidence that the panel secretly works.
- **Decision:** the unsupervised bulk-expression panel carries no reproducible prognostic signal ⇒
  **discovery_only (confirmed null)**. Reported as a null; the structural PTEN signal lives in the
  companion study, at its own tier.

### 4. consensusOV molecular subtype — discovery_only → discovery_only (HOLD, now RE-EXECUTED)
- **The classifier was re-executed.** `genefu` and `consensusOV` were installed from the authors'
  GitHub source (`bhklab/*`) after confirming both were removed from the current Bioconductor release
  repository; the random-forest consensus classifier then ran on all 536 TCGA samples.
- **Fresh results:** subtype fractions DIF 0.297 / IMR 0.274 / MES 0.237 / PRO 0.192 (sum = 1.000).
- **Composition confound confirmed on the freshly-computed calls:** percent_tumor_cells differs by
  subtype at Kruskal–Wallis p = 4.9e-06 and percent_stromal_cells at p = 2.8e-07 (percent_normal
  n.s., p = 0.23); the **MES** subtype mean tumor purity (76.1%) is the clear low outlier against
  81–83% for the other subtypes.
- **Cross-cohort stability:** total-variation distance of subtype fractions vs TCGA = 0.031 (GSE9891),
  0.077 (GSE32062).
- **Decision:** reproducible *per-patient* subtype calls, but the MES call tracks low tumour purity /
  high stroma — so it remains a **composition-confounded descriptive** classification, not a
  validated biology-only diagnostic. Tier unchanged (discovery_only / descriptive). **The prior
  "classifier not re-executable" reproducibility caveat is removed** — it now runs, and the re-run
  reproduces the confound.

### 5. Dispersed-CIN architecture + PTEN nomination — HOLD (verified, companion)
All derived quantities reproduce from receipts: 5-subject architecture; Subject 260 PTEN neutral→loss
(0.967 → 0.692); the three breakpoint quantities (raw Δ = 60, net-gained = 66, signed-sum = 60)
internally consistent; QC exact. This is the **companion dispersed-CIN study** (already hardened);
cross-referenced, **not merged**. It supplies the structural PTEN event that the bulk PI3K/mTOR
expression panel cannot capture — the two are complementary modalities. Honest ceiling: ~0.1× sWGS
resolves large CNA architecture only, not chromothripsis at SV resolution.

---

## Net effect on the manuscript

- **One earned upgrade:** the DDR panel moves discovery_only → **Consider** (strict single-cohort
  signal, de-novo panel with no feature-selection leakage).
- **One correction downward:** the Riester score returns to **discovery_only** because its only
  strict signal comes from a cohort used to develop the signature and no independent OV cohort is
  available in this resource — an integrity correction the audit surfaced.
- **One confirmed null, reconciled across modalities:** the PI3K/mTOR bulk-expression panel stays
  discovery_only; the reason it misses the companion PTEN loss is a modality mismatch, stated
  explicitly rather than used to inflate the panel.
- **One diagnostic, now fully re-executed:** consensusOV runs, reproduces, and remains
  composition-confounded/descriptive; the reproducibility caveat is retired.
- **Nothing is labeled clinically validated.**
