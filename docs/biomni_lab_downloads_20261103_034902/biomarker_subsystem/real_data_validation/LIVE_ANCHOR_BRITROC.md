# Live Data Anchoring — BriTROC-1 open-access re-pull (no cache, no burned credential)

**Date:** 2026-07-23  **Compute:** US-East (Virginia).  **Source:** open-access only.

## What was pulled LIVE (this run, not cache)
- **Zenodo record 8304868** (`britroc_1_additional_data.zip`, **1,356,068,166 B**, verified size + valid ZIP, 1,351 entries) — pre-processed absolute copy-number layer named in the BRITROC-1 landscape repo README as the open-access CN deposit.
- Objects loaded live: `britroc_30kb_ds_absCopyNumber.rds` (QDNAseqCopyNumbers: **83,607 bins x 283 samples**, assays `copynumber`+`segmented`, pheno `purity/ploidy/TP53freq/PATIENT_ID`), plus **380 per-sample clonality CSVs** (`ploidy,purity,clonality,TP53cn,expected_TP53_AF`).
- Paper: Nat Commun 2023 (PMID 37474499, DOI 10.1038/s41467-023-39867-7).
- **No EGA credential used.** The raw BAMs remain EGA-gated; the burned password (flagged 'Rotate' in SECRET_EXPOSURE_INVENTORY.md §B) was NOT transmitted.

## Reconciliation of session artifacts against LIVE data

| Session claim (from cache/memory) | Live open-access finding | Verdict |
|---|---|---|
| Subject 191 = `IM_280 -> JBLAB-4944`, +253 breakpoints, dispersed CIN | `IM_280` clonality file is **empty (no powered fit)** — sample FAILED CN fitting, hence ABSENT from the final 283-sample CN object. Relapse `JBLAB-4944` fit cleanly (ploidy 4.3, purity 1.0, TP53cn 2.9). | **PARTIAL / CAVEAT** — the dx sample underlying the +253 story has no usable live CN fit |
| Subject 109 = `IM_109`, 12.1% genome-altered | `IM_109` **does not exist** in any of the 380 live clonality files nor the CN object | **UNVERIFIED** — identifier absent from live open-access data |
| Subject 6 (+101 delta) | `IM_6` present, clean fit (ploidy 2.5, purity 0.94); live segmented breakpoints = 34 (single sample) | present; delta not reproduced (pairing/definition differ) |
| Subject 260 (75->135, +60) | `IM_260` present, clean fit (ploidy 2.1, purity 0.75); live breakpoints = 174 | present; count differs from session |
| Subject 119 (148->166, +18) | `IM_119` present, clean fit (ploidy 5.1/4.1, purity 0.77/0.56); live breakpoints = 189 | present; count differs from session |
| Cohort = 182 dx/relapse pairs | Live: **167 unique patients, 283 samples, 73 with >=2 samples**; two ID namespaces (`IM_*`, `JBLAB-*`) | structurally consistent; exact pair count differs by layer |

## Honest conclusions
1. **Live re-anchoring succeeded technically** — 1.36 GB open-access CN data pulled fresh, loaded, and recomputed on US compute with no credential and no cache.
2. **The session's exact breakpoint deltas do NOT reproduce** from the live segmented matrix under a generic within-chromosome change definition. The cohort breakpoint distribution is sane (median 157, consistent with high-CIN HGSOC), so the live pipeline is sound — the mismatch is in **sample pairing + breakpoint definition**, which the session artifacts did not pin to a reproducible spec.
3. **Two of five session subject IDs are problematic against live data:** `IM_280` (Subj 191) has no usable live CN fit; `IM_109` (Subj 109) is absent entirely. The Subject-191 dispersed-CIN narrative therefore rests on a dx sample that failed QC in the published open-access pipeline — a caveat the cached analysis omitted.
4. **What remains EGA-gated:** the raw BAMs for the 177 not-computed subjects. These require a ROTATED EGA credential installed into the environment (never pasted in chat). Queued, not run.

## Files (this run)
- `live_breakpoints_all.csv` — live breakpoint count for all 283 CN-object samples (+purity/ploidy/TP53freq/PATIENT_ID)
- `live_sample_names.txt` — 283 live CN-object sample IDs
- clonality CSVs for the session subjects pulled and inspected live
