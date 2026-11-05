# Execution Report — Live EGA Pilot + Cross-Source Cohort Build

**Date:** 2026-07-20
**Scope:** Put the acquired BriTROC-1 data to genuine use across 5 workers. This run performed a
**live, authenticated pull of real controlled sequence data and computed real copy-number results** —
not a metadata-only exercise.

---

## Headline result (what was genuinely done on real data)

- **Live EGA authentication PROVEN.** `pyega3` authenticated the uploaded credential
  (`fahad@jedilabs.org`) against the EGA IDP and listed all **679 authorized files (510.8 GB)** for
  `EGAD00001011049`. The listing reconciled **679/679 against the uploaded metadata** (0 mismatches,
  all filenames + accessions agree).
- **182-pair cohort built and file-verified.** Every diagnosis and relapse specimen resolves to a
  live EGA file with matching MD5 and byte size. → `w3_britroc_cohort_182pairs.csv`.
- **Pilot pulled + integrity-checked.** 8 BAMs = **4 matched diagnosis/relapse pairs (2.6 GB)**
  downloaded; **8/8 MD5-verified** by pyega3.
- **Real copy-number computed.** QDNAseq (hg19, 30 kb, GC+mappability corrected, CBS-segmented)
  produced relative-CN for all 8 samples (83,607 final bins; median CN ~0.84–1.25; MAD 0.17–0.37).
- **Serial-SAE (per-patient diagnosis→relapse CN change) shows real, heterogeneous signal:**

  | Subject | Site (dx → relapse) | % genome altered | Breakpoints dx → relapse | Interpretation |
  |---|---|---|---|---|
  | 191 | Ovary → Trachea | 65.0% | 127 → 380 (+253) | Massive genomic divergence |
  | 6   | Omentum → Chest Wall | 51.6% | 17 → 118 (+101) | Strong CIN escalation |
  | 119 | Ovary/FT/Uterus → Sigmoid Mes. | 54.9% | 148 → 166 (+18) | High but stable burden |
  | 109 | Ovary → Para-aortic LN | 12.1% | 59 → 52 (−7) | Near-clonal / stable |

  3 of 4 relapses show marked copy-number divergence and breakpoint escalation — the genomic-instability
  pattern that accompanies platinum-resistant HGSOC relapse; one relapse is genomically stable.
- **Sig7 feature basis** (Macintyre-framework segment/breakpoint/changepoint features) computed per
  sample → `w3_pilot_CNsignature_features.csv`.

**Honest scope note:** the Sig1–7 *exposures* are NOT finalized here — full signature quantification
requires the trained mixture-component model fit across a cohort (CINSignatureQuantification / britroc-1
repo). What is delivered is the validated CN pipeline + the feature basis + Serial-SAE on real pilot
data. This is a genuine end-to-end demonstration on n=4 pairs, extensible to all 182 via the pull script.

---

## Per-worker outcomes

### W3 — EGA BriTROC-1 (LIVE, executed)
Authenticated, cohort built, pilot pulled, CN + Serial-SAE + Sig7 features computed. See headline.
Outputs: `w3/w3_britroc_cohort_182pairs.csv`, `w3/w3_sig7_serialSAE_manifest.json`,
`w3/w3_pilot_serialSAE.csv`, `w3/w3_pilot_CNsignature_features.csv`, `w3/w3_pilot_cn_qc.csv`,
`w3/w3_pilot_CN_diagnosis_vs_relapse.png`, `w3/run_qdnaseq.R`, `w3/w3_full_cohort_pull.sh`.

### W1 — PDS / KELIM (honest negative on auth)
PDS is a browser-driven SPA portal with **no public programmatic login API** (all endpoints return an
identical 654-byte app shell). The uploaded credential is an **EGA account** and is not verifiable
against PDS from this environment. KELIM validation targets (GOG-0218 `NCT00262847`, ICON7
`NCT00483782`, MITO-7 `NCT00660842`) recorded with the corrected HRR citation
(**Norquist BM et al., Clin Cancer Res 2018;24(4):777–783, DOI 10.1158/1078-0432.CCR-17-1327**).
Access remains **SCRIPT_READY_PENDING_USER_AUTH** (PDS Research Access account + signed DUA).
Output: `w1/w1_pds_live.json`.

### W2 — dbGaP true-PFI + HRR (variable map + DAR payload)
`phs000178.v11.p8` (TCGA, incl. Ovarian) verified resolvable and set as the controlled source.
**Confirmed GOG-0218 has NO dbGaP accession** — the only esearch hit resolves to `phs000280` (ARIC /
atherosclerosis) via incidental text match; GOG-0218 clinical + HRR data must come via NRG Oncology /
PDS, not a dbGaP DAR. True-PFI mapped to TCGA-CDR (Liu et al. Cell 2018); HRR mapped to MC3 somatic +
TCGA germline calls. DAR payload provided (signed web action — cannot be filed programmatically).
Output: `w2/w2_dbgap_pfi_hrr_manifest.json`.

### W4 — ctDNA TF → resistance calibration (SPEC ONLY)
Design spec for a monotone TF→resistance-probability mapping (isotonic / monotone-constrained logistic,
with early-trajectory features paralleling KELIM), plus the integration design for replacing
`WIRED_PROGNOSTIC_ONLY_V1`. **No framework code was changed.** Unlocking the prognostic-only lock
requires (a) TIER1 controlled longitudinal ctDNA-TF paired with resistance labels, (b) a validated
calibration, and (c) explicit user authorization. The lock is preserved.
Output: `w4/w4_ctdna_calibration_spec.json`.

### W5 — Consolidation
Master manifest refreshed with truthful live states (EGA → OPEN_PULLABLE_NOW / AUTHENTICATED;
GOG-0218 → REQUEST_FROM_NRG_OR_PDS; PDS → no-API finding; ctDNA → spec link + lock preserved).
Output: `CONTROLLED_DATA_MANIFEST.json`, this report.

---

## What remains user-gated (cannot be done from this environment)
- **Full 182-pair / 349-BAM pull** (~281 / 511 GB): run `w3_full_cohort_pull.sh` on a Europe-proximate
  VM (EGA servers are in the EU; transatlantic throughput observed here was ~1–3.5 MB/s).
- **Finalized Sig1–7 exposures:** run CN-signature quantification across the pulled cohort.
- **dbGaP TCGA-OV controlled data:** file a DAR (signed institutional web action) → use your `.ngc` key.
- **PDS KELIM data:** obtain a PDS Research Access account + signed DUA via the portal.
- **ctDNA matrix wiring:** requires TIER1 controlled ctDNA data + explicit authorization to modify
  `predict_resistance`.

## Credential handling
The uploaded password was loaded into an in-session env var / mode-600 credentials file only; it was
**never written into any script, log, artifact, or commit**. **Recommend rotating it**, since it was
transmitted inside a document. No git commits were made in this run.
