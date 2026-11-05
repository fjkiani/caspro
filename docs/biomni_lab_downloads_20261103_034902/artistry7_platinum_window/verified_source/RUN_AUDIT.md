# ARTISTRY-7 Proxy Run Audit

Run date: `2026-03-10`

## Latest rerun after Fix 1 + Fix 2

Applied:

1. Study switch to larger cBioPortal cohorts
2. Published ovarian M2 macrophage risk signature replacing the old `M2_hi AND IL4_hi AND CD8_lo` gate

### `ov_tcga` rerun

- `n_samples_total_in_study`: `617`
- `n_samples_with_mrna_profile`: `307`
- `n_samples_after_serous_high_grade_filter`: `260`
- `n_samples_with_platinum_label`: `38`
- `CCNE1_AMP`: `49/260`
- `MBD4_SILENT`: `65/260`
- `DUPILUMAB_CANDIDATE`: `65/260`
- `METFORMIN_CANDIDATE`: `1/260`
- `tier1=0`, `tier2=1`, `neither=259`
- `logrank_p_value=0.5125`

### `hgsoc_tcga_gdc` rerun

- `n_samples_total_in_study`: `604`
- `n_samples_with_mrna_profile`: `427`
- `n_samples_after_serous_high_grade_filter`: `427`

**Survival / OS filter audit** (`hgsoc_tcga_gdc`, merged frame after histology filter, before `dropna(OS_MONTHS)`; from `data/km_tier_medians_receipt.json` / `stats_manifest.json` `survival_filter_audit`, run `2026-04-12`):

- `n_merged_after_histology`: `427`
- `n_os_months_present`: `426` (one sample missing `OS_MONTHS` after merge)
- `n_os_months_gt_zero`: `426`
- `n_os_status_present`: `427` (all rows have non-empty `OS_STATUS` text)
- `n_with_os_months_and_os_status`: `426`
- `n_with_both_and_os_months_gt_zero`: `426`
- `n_after_dropna_os_months` (KM / log-rank input): `426`
- `n_km_cohort_os_months_gt_zero`: `426`

- `n_samples_with_platinum_label`: `99`
- `CCNE1_AMP`: `80/427`
- `MBD4_SILENT`: `107/427`
- `DUPILUMAB_CANDIDATE`: `107/427`
- `METFORMIN_CANDIDATE`: `107/427`
- `TIER_1_TRIPLE=107`, `TIER_2_DUAL=107`, `TIER_3_NONE=213`
- `median_os_months_by_tier` (**Kaplan–Meier**, tier strata): `36.33`, `42.02`, `48.75` (`TIER_1`, `TIER_2`, `TIER_3`; receipt `data/km_tier_medians_receipt.json`; legacy raw medians `25.00`, `31.27`, `38.30` retained in manifest as `raw_median_os_months_by_tier`)
- `logrank_p_value=0.00382`

### Updated diagnosis

Fix 1 and Fix 2 worked in exactly one critical way:

- the **expression-backed cohort is no longer the main collapse point**
- the **dupilumab side is no longer sparse**

After the metformin branch replacement and continuous SPE scoring:

- `METFORMIN_CANDIDATE` no longer collapses
- the continuous SPE composite produces balanced strata by construction
- the KM separation is now statistically significant in the proxy cohort

That means the failure mode shifted twice across the debugging sequence:

1. original problem: expression subset + old dupilumab boolean gate
2. second problem: metformin boolean gate
3. current state: both major sparsity bottlenecks addressed in the proxy

This does **not** make the result clinically validated, but it does move the pipeline from "collapsing discovery scaffold" to "statistically usable hypothesis-generating proxy."

## What ran successfully

The pipeline executed cleanly with:

```bash
python3 scripts/artistry7_proxy/run_artistry7_proxy_pipeline.py
```

Generated outputs:

- `data/artistry7_proxy/ovarian_raw.csv`
- `data/artistry7_proxy/tme_scores.csv`
- `data/artistry7_proxy/metformin_scores.csv`
- `data/artistry7_proxy/crispro_lazarus_output.csv`
- `data/artistry7_proxy/km_tier_comparison.png`
- `data/artistry7_proxy/stats_manifest.json`
- `data/km_tier_medians_receipt.json`

## What the current run actually shows

From `data/artistry7_proxy/stats_manifest.json`:

- `n_samples_total_in_study`: `585`
- `n_samples_with_mrna_profile`: `113`
- `n_samples_after_serous_high_grade_filter`: `100`
- `n_samples_with_platinum_label`: `91`
- `n_samples_with_ccne1_cna`: `95`
- `tier_counts`: `neither=99`, `tier2=1`, `tier1=0`
- `median_os_months_by_tier`: `tier2=35.57`, `neither=55.36`
- `logrank_p_value`: `0.2257`

Direct inspection of `crispro_lazarus_output.csv`:

- `CCNE1_AMP`: `17/100`
- `MBD4_SILENT`: `25/100`
- `DUPILUMAB_CANDIDATE`: `1/100`
- `METFORMIN_CANDIDATE`: `5/100`
- Only non-`neither` sample: `TCGA-09-0369-01` (`tier2`)

## Bottom line

This run proves the pipeline is reproducible, but it does **not** yet produce a statistically meaningful ARTISTRY-7-style stratification result.

Why:

1. The expression-backed cohort collapses from `585` total TCGA-OV samples to `100` filtered samples.
2. In the original baseline, the immunologic proxy rule was the hard bottleneck:
   - `DUPILUMAB_CANDIDATE` was only `1/100`.
3. After Fix 1 + Fix 2, that bottleneck moved:
   - `DUPILUMAB_CANDIDATE` is now `107/427` in `hgsoc_tcga_gdc`
   - `METFORMIN_CANDIDATE` is now the hard bottleneck at `1/427`
4. The combinatorial rules therefore still have almost no power:
   - `tier1=0`
   - `tier2=1`
5. The survival comparison is not interpretable as evidence:
   - `log-rank p=0.2257`
   - only one non-baseline candidate sample

## Threshold stress test

I re-checked the rule prevalence with less strict percentile cutoffs:

- `75/25`: `dup=1`, `met=5`, `tier1=0`, `tier2=1`
- `67/33`: `dup=1`, `met=7`, `tier1=0`, `tier2=2`
- `60/40`: `dup=1`, `met=7`, `tier1=0`, `tier2=2`

Conclusion:

- This is **not just a threshold tuning problem**.
- The original `DUPILUMAB_CANDIDATE` proxy was the first collapse point.
- After replacing it with the published M2 risk score, the new collapse point is `METFORMIN_CANDIDATE`.

## What we need next

### 1. Expand the expression-backed cohort

The current run depends on a limited expression subset.

Needed:

- Pull expression from a broader TCGA-OV source, not just the small joined subset.
- Preserve the same sample IDs across expression, CNA, survival, and platinum labels.
- Re-run the proxy on the largest possible harmonized cohort.

### 2. Replace or relax the dupilumab proxy

Current rule:

- `M2_hi AND IL4_path_hi AND CD8_lo`

This is too sparse in the present cohort.

Needed:

- Test alternative TME signatures that better capture IL-4/IL-13 macrophage skewing in ovarian cancer.
- Consider a score-based rank instead of a three-boolean gate.
- Report candidate prevalence before locking the final rule.

Status after latest rerun:

- This item is largely addressed.
- The published M2-risk signature restored candidate prevalence to the expected top-quartile range.

### 3. Move from proxy-only stratification to a scored model

Current output is boolean-heavy.

Needed:

- Preserve raw TME and metabolic scores as continuous features.
- Add an aggregate combinatorial score rather than only `tier1/tier2/neither`.
- Use that score for ranking, then define bins after distribution review.

This is now the most important next move, because boolean overlap is throwing away the signal recovered by the M2-risk update.

### 4. Rebuild the metformin branch

Current issue:

- `METFORMIN_CANDIDATE` is effectively absent (`1/427` in the best current cohort)

Needed:

- Audit whether the `mTOR_hi AND AMPK_lo AND IGF1R_above_median` rule is biologically too strict for bulk ovarian RNA
- Convert the metabolic branch to a continuous score before re-thresholding
- Check whether the IGF1R condition is the main suppressor of prevalence

### 4. Separate "pipeline works" from "claim works"

What is now supported:

- The pipeline runs end-to-end.
- Public data can be harmonized into an ovarian proxy cohort.
- The current rule set is reproducible.

What is **not** supported yet:

- Any strong claim that the current ARTISTRY-7 proxy identifies a robust responder subgroup.
- Any publication-quality survival separation claim.

## Recommended next execution order

1. Broaden expression ingestion.
2. Recompute TME/metabolic features on the expanded cohort.
3. Benchmark multiple dupilumab/metformin rule variants for prevalence.
4. Rebuild tiering from continuous scores, not only boolean gates.
5. Re-run KM/log-rank only after candidate groups are large enough to matter.
