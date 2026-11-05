# ICGC ARGO — CN / resistance cohort expansion feasibility

**Status:** Research-use-only (RUO), hypothesis-generating. No efficacy claims.
**Audit date:** 2026-07-25. **Scope:** all 9 ARGO programs, read-only metadata + a verified controlled-data pull.
**Anchor context:** follow-through on the CN-resistance / BriTROC line — can ARGO add resistant, CN-comparable donors?

---

## Bottom line (decision-grade)

1. **ARGO controlled data IS accessible with the supplied credential.** Verified end-to-end: the Overture `score-client` (v5.11.0) resolved signed download URLs and pulled a controlled ASCAT copy-number file with a verified checksum. The correct gateway is `api.platform.icgc-argo.org/storage-api` (the platform GraphQL rejects this token — a different service). **This corrects the earlier reconnaissance verdict of "public-metadata-only," which tested the wrong endpoint.**

2. **"It's all resistant patients" is not supported as stated — but a real resistant sub-cohort exists.** ARGO is **179,956 files / 7,056 donors**, of which the vast majority are **primary tumour**. Using the only public resistance/relapse proxy (specimen_type ∈ {Metastatic, Recurrent}), there are **1,003 relapse-proxy donors**. Restricting to donors that also carry CN-comparable data yields a clean, pullable cohort of **608 distinct resistant-specimen donors / 1,140 CN objects**.

3. **There is NO dedicated ovarian program in ARGO.** The prior BriTROC/HGSOC resistance work has **no same-indication program match** here. POG-CA (BC Cancer Personalized OncoGenomics) is a pan-cancer program and *may* contain a small fraction of gynecologic/ovarian cases within its cohort — but this **cannot be confirmed or counted with the current API token**: `clinical__donor__primary_site` returns `__missing__` for all POG-CA files in the public index, `specimen_tissue_source` has no ovary/gynecologic category, and histology is empty/gated. So any ovarian sub-cohort claim (e.g. specific donor counts) is **not verifiable via API** with the credential held; confirming it would require DACO-authenticated clinical access (interactive login / JWT). Any use of ARGO here is therefore a **cross-tumour** methodology transfer (predominantly metastatic pan-cancer via POG-CA), not a same-indication replication.

4. **Detailed resistance labels (treatment response, progression, recurrence interval, survival) are GATED behind a login/JWT — the API token does not unlock them.** Measured this session: `clinicalData` and `programDonorSummary` return `403 / UNAUTHORIZED` with the token, and `self` returns `jwt malformed` (the API token is an opaque key, not the EGO JWT the clinical service requires). `response_to_treatment` is not even a queryable field on the public file-index schema. Note this is *not* an endpoint typo: the same token DOES authenticate the Score storage-api and pulls controlled molecular files — the boundary is molecular-files-yes / clinical-tables-no. The specimen-type proxy is a **provenance** signal, not a therapy-response label. (Caveat: the legacy *ICGC-DCC* access framework classed some clinical fields as "open"; that framework governs the old `dcc.icgc.org` portal, not ARGO, and does not apply to access via this token.)

   *Full specimen_type vocabulary used for the proxy (prefix-matched, so all sub-types are captured):* `Metastatic tumour`, `Metastatic tumour - metastasis to distant location`, `Metastatic tumour - metastasis local to lymph node`, `Metastatic tumour - additional metastatic`, and `Recurrent tumour`. The 1,003 relapse-proxy donor count therefore already includes every metastatic sub-type present in the index — it is not an undercount from missing sub-types.

5. **97.5% of ARGO files are controlled.** Any pull needs DACO approval + a live Score API token (30-day). Both are satisfied for the current session.

**Verdict:** ARGO is a **viable but partial, cross-tumour** source for CN-resistance cohort expansion. It can add ~**486 WGS-ASCAT resistant-specimen donors** with genome-wide CN comparable to the BriTROC work — but it cannot supply ovarian cases or public therapy-response labels. Recommended use: **cross-tumour CN-signature/instability transfer and method-generalization**, explicitly not same-indication resistance replication.

---

## What was measured

### Program inventory (sorted by relapse-proxy donors)

| Program | Context | Donors | Relapse-proxy donors | CN files | BAM files | % controlled |
|---|---|---:|---:|---:|---:|---:|
| POG-CA | Personalized OncoGenomics (Canada), metastatic pan-cancer | 931 | **807** | 1,218 | 4,244 | 100 |
| MONSTAR-JP | SCRUM/MONSTAR precision oncology (Japan) | 2,152 | 186 | 889 | 0 | 100 |
| P1000-US | Pediatric pan-cancer (US) | 275 | 5 | 50 | 999 | 100 |
| PACA-CA | Pancreatic (Canada) | 136 | 4 | 304 | 349 | 89.6 |
| APGI-AU | Pancreatic (Australia) | 97 | 1 | 96 | 290 | 91.1 |
| MUTO-INTL | Mutographs/IARC signatures | 2,659 | 0 | 2,850 | 5,318 | 100 |
| OCCAMS-GB | Esophageal adenocarcinoma (UK) | 400 | 0 | 826 | 813 | 89.0 |
| PTC-SA | Pediatric (South Africa) | 239 | 0 | 0 | 478 | 85.2 |
| LUCA-KR | Lung (Korea) | 167 | 0 | 60 | 334 | 86.0 |
| **Total** | | **7,056** | **1,003** | **6,293** | **12,825** | **97.5** |

Every number is receipt-backed in `argo_audit_ledger.json` (query + endpoint + timestamp). Integrity checks pass: per-program `file_access` sums equal totals; relapse donors ≤ total donors; program file counts sum to the 179,956 anchor.

**Note on MONSTAR-JP:** its relapse CN data is **FoundationOne F1CDx targeted-panel** (focal gene-level CN events only), **not** genome-wide segmentation — it is *not* CN-comparable to WGS-ASCAT and is reported separately.

### The pullable resistant-CN cohort (manifests built, ready to run)

| Tier | Content | Files | Size | Donors |
|---|---|---:|---:|---:|
| Tier 1 | Compact segmented CN calls (VCF) | 631 | 16.5 MB | 608 |
| Tier 2 | Full ASCAT bundles (TGZ: purity, ploidy, raw profiles, plots) | 509 | 27.6 GB | — |

Both are saved as object-id manifests (`*_relapse_cn_manifest.txt`) and detailed TSVs (`*_relapse_cn_objects.tsv`).

### What was actually downloaded and analyzed (Tier 1)

- **631 controlled CN VCFs pulled** (19 MB with indexes), all checksums verified.
- Parsed into per-sample genome-wide CN features:
  - **509 WGS-ASCAT samples / 486 donors** → `argo_resistant_cn_features_wgs.csv`
  - **122 F1CDx panel samples / 122 donors** → `argo_resistant_cn_features_panel.csv` (focal events only)
- Feature-extraction summary in `argo_cn_feature_extraction_summary.json` (0 failed files).

**Resistant-cohort CN signal (WGS-ASCAT, n=509 samples):** median fraction of genome altered **0.59**, median LOH fraction **0.24**, median length-weighted mean total copy number **2.78** (near-triploid), median 190 segments / 157 breakpoints. This is a high-instability, high-alteration profile consistent with advanced/metastatic disease — the same class of genome-wide allele-specific CN features used in the BriTROC work. See `argo_resistant_cn_landscape.png`.

---

## CN comparability to the BriTROC work

- **Directly comparable:** the 486 WGS-ASCAT donors carry `GT:TCN:MCN` genome-wide segments (total + minor copy number), from which the same features (fraction genome altered, gain/loss/LOH fractions, ploidy, breakpoint burden) are computed. GRCh38 vs the BriTROC hg19/QDNAseq recipe differs — harmonize on a common binning/segmentation before any joint modeling.
- **Not comparable:** the 122 F1CDx panel donors (targeted focal events); do not pool with WGS.
- **Tumour type differs:** metastatic pan-cancer (POG-CA) + pancreatic tails, **no ovarian**. Treat as cross-tumour transfer.

---

## Access requirements to go further

| Want | Requirement | Status |
|---|---|---|
| Public inventory / metadata | none | done |
| Controlled CN VCFs / ASCAT bundles | DACO approval + Score API token (30-day) | **satisfied** (verified pull) |
| Therapy-response / progression / survival labels | program membership / clinical-data access | **not available** (gated) |
| Ovarian resistance cases | — | **no dedicated program; unconfirmable via API** (primary_site/histology gated & `__missing__` in public index — would need DACO login to check for gynecologic cases in POG-CA) |

---

## Recommendation

- **Use ARGO for cross-tumour CN method generalization**, not same-indication resistance replication.
- **Best target: POG-CA** — 484 relapse-specimen WGS-ASCAT donors, 100% controlled, ASCAT CN present. Pull Tier 2 for that program if purity/ploidy-aware features are needed.
- **Do not claim treatment-resistance** for these donors from ARGO public fields; the label is specimen-provenance (metastatic/recurrent), and true response labels are gated. If response labels are required, pursue program-membership clinical access separately.
- **Keep the F1CDx panel cohort separate** from WGS in any analysis.

---

## Deliverables

- `argo_program_inventory.csv` — per-program donor/specimen/modality/access counts.
- `argo_resistance_annotation_availability.json` — public vs gated resistance fields, per-program counts.
- `argo_resistant_cn_features_wgs.csv` — genome-wide CN feature matrix (486 donors / 509 samples).
- `argo_resistant_cn_features_panel.csv` — F1CDx focal-event summary (122 donors).
- `argo_cn_feature_extraction_summary.json` — extraction provenance.
- `argo_resistant_cn_landscape.png` / `.svg` — CN alteration landscape figure.
- `argo_audit_ledger.json` — machine-readable, receipt-backed audit ledger.
- Relapse-CN manifests + TSVs (per program) for optional Tier-2 pulls.
