# Copy-Number Arm — HGSOC Platinum-Resistance Replication + ZetaBridge KG Enrichment

**Classification:** Research Use Only / hypothesis-generating. No clinical or regulatory claim.
**Session:** 11 · **Generated:** 2026-07-24 · **Anchor manuscript:** Serial SAE (Systematic Aberration Engine) pathway-score draft.

---

## 1. What was asked and what was actually done

The task was to **acquire the real datasets** needed to test the HGSOC platinum-resistance hypothesis, run the test **on the modality the data actually is**, and **enrich the ZetaBridge knowledge graph** with everything extracted, using all five workers.

Both on-target sources reachable through the ZetaBridge broker are **DNA copy-number**, not RNA:
- **BriTROC-1** (`EGAD00001011049`): shallow-WGS, 679 samples (385 diagnosis + 294 relapse HGSOC).
- **MSK-SPECTRUM** (`syn25569736`): WGS copy-number / mutation panels (`panel_cna`) on 40 patients.

The expression Serial SAE score is therefore **not computable** from this data and was not computed (that would be invalid). The test run is the **copy-number arm** of the hypothesis — CN signatures, breakpoint burden, purity/ploidy, CCNE1 amplification, HRD-gene loss vs platinum resistance — which is the same modality as the one prior positive result (BriTROC-1 signature 7 at relapse).

### Acquisition reality (not a limitation — the processing spec)
The ZetaBridge broker is **metadata-only**. `/api/sources/ega/file/{id}` returns `{"action":"file_metadata",...}`, and the broker's full 34-endpoint OpenAPI has **no download / stream / byte-range route**. The 679 BriTROC-1 sWGS BAMs (511 GB) cannot be pulled through the broker, and the broker was **not bypassed** with pasted credentials (it exists precisely to avoid that). No BAM download was fabricated. Instead, **file-level provenance for all 679 files** (accession, MD5, bytes, timepoint, phenotype) was harvested into the KG as `AcquisitionReceipt` nodes, and the CN analyses use the already-acquired open-access BriTROC CN objects and the MSK KG `panel_cna`.

---

## 2. Pre-set criterion (frozen, honest)

> The pre-specified direction (**CN instability / HRD-gene loss / CCNE1 amplification → platinum-resistant**) holds with **AUROC > 0.5 and bootstrap 95% CI excluding 0.5** in **≥ 2 independent cohorts**, with effect sizes + CIs. Non-replication, opposite direction, and fragility are reported exactly.

Statistics: AUROC (resistant vs sensitive), 2000-iteration bootstrap 95% CI (seed 42), Mann-Whitney / Wilcoxon p, BH-FDR across the feature family per cohort, EPV reported per cohort (flag EPV < 10). No cross-validated multivariate ML (insufficient events).

---

## 3. Results by cohort

### 3.1 BriTROC-1 — CN signatures (shallow-WGS, sig1–7 at relapse)
N = 40 · resistant = 3 · **EPV = 3**

| Feature | AUROC | 95% CI | Wilcoxon p | q (BH) | Direction | Meets criterion |
|---|---|---|---|---|---|---|
| **sig7 (relapse)** | **0.874** | **[0.75, 0.973]** | **0.035** | 0.245 | predicted | **Yes (fragile)** |
| sig6 (relapse) | 0.703 | [0.50, 0.875] | 0.240 | 0.336 | predicted | No (CI touches 0.5) |
| sig4 (relapse) | 0.730 | [0.359, 1.00] | 0.192 | 0.336 | predicted | No |
| sig2 (relapse) | 0.451 | [0.154, 0.703] | 0.797 | 0.797 | opposite | No |
| sig1 (relapse) | 0.306 | [0.051, 0.532] | 0.296 | 0.345 | opposite | No |
| sig5 (relapse) | 0.279 | [0.118, 0.539] | 0.206 | 0.336 | opposite | No |
| sig3 (relapse) | 0.252 | [0.026, 0.539] | 0.175 | 0.336 | opposite | No |

**sig7 at relapse is the only feature meeting the threshold** (AUROC 0.874, CI excludes 0.5). It reproduces the prior positive **in tendency**, but rests on **only 3 resistant patients (EPV = 3)**, is **not significant after BH-FDR (q = 0.245)**, and is high-variance. It must not be over-read.

### 3.2 BriTROC-1 — absolute copy-number (breakpoint burden / purity / ploidy / TP53 freq)
N = **167** · resistant = 12 · **EPV = 12** (a larger, less fragile test on the same cohort)

| Feature | AUROC | 95% CI | Mann-Whitney p | q (BH) | Direction | Meets criterion |
|---|---|---|---|---|---|---|
| ploidy (mean) | 0.651 | [0.493, 0.802] | 0.083 | 0.415 | predicted | No (CI crosses 0.5) |
| purity (mean) | 0.398 | [0.201, 0.617] | 0.239 | 0.426 | opposite | No |
| breakpoints (mean) | 0.401 | [0.254, 0.553] | 0.256 | 0.426 | **opposite** | No |
| tp53freq (mean) | 0.444 | [0.244, 0.660] | 0.525 | 0.525 | opposite | No |
| breakpoints (max) | 0.445 | [0.297, 0.601] | 0.525 | 0.525 | **opposite** | No |

On the **larger-N** test, genome-wide **breakpoint burden trends opposite** the resistance prediction (AUROC 0.40–0.45), and no absolute-CN feature meets the criterion. Ploidy leans positive but its CI crosses 0.5 and is not significant. **This does not support CN instability predicting primary platinum resistance.**

### 3.3 MSK-SPECTRUM — WGS `panel_cna` (landscape only)
N = 40 specimens · **resistance labels in KG = 0** → **association not runnable**

CN landscape assembled: **CCNE1 amplified in 6/40**; HRD-gene loss burden distributed 0–6 across the cohort. No per-specimen platinum-response labels exist in the KG layer, and **no SPECTRUM clinical/outcome table is reachable via the broker** — the referenced Synapse IDs resolve to Datasets / Files / Folders (mpIF, scRNA, H&E, Bulk WGS, MSK-IMPACT, `cna.tsv`, `cohort.maf`, `segments.seg`), none queryable for labels. Landscape is reported; **no association or label was fabricated.**

### 3.4 PDS solid-tumor safety warehouse — not applicable
92 trials / 16,865 patients across 15 solid-tumor types, **zero ovarian/gyn arm** → cannot serve as an HGSOC external control. Mined value: **13 genomic↔adverse-event toxicity hypothesis edges** (RUO) — these were re-derived and confirmed present, but all 13 already existed in the base KG, so they added no net-new edges this session (see §5).

*See `cn_arm_forest.png` for the AUROC forest plot across all BriTROC-1 CN features with bootstrap CIs.*

---

## 4. Verdict

**Copy-number arm: the ≥2-independent-cohort criterion is NOT met.**

- There is effectively **one labeled HGSOC cohort with copy-number data (BriTROC-1)**, examined two ways. Only **one feature in one feature family** (sig7 at relapse) meets the pre-set threshold, and it is **fragile (EPV = 3, not FDR-significant)**.
- The **independent, larger-N absolute-CN test on the same cohort** (breakpoint burden, N = 167, EPV = 12) **does not support** the hypothesis and trends **opposite**.
- **MSK-SPECTRUM** has copy-number data but **no reachable resistance labels**, so it cannot be the required second labeled cohort.
- **PDS** has no ovarian arm.

The copy-number resistance-*prediction* claim **does not replicate beyond a single fragile signal** — consistent with the anchor manuscript's own honest verdict. Genuinely testing it requires a second **outcome-labeled** HGSOC copy-number cohort (e.g. MSK-SPECTRUM clinical metadata if it can be exposed, HERCULES, or a prospective series), and a byte-transfer path for the BriTROC-1 BAMs if sample-level sWGS-derived CN features are wanted beyond the published objects.

---

## 5. ZetaBridge KG enrichment (byproduct of acquisition)

The KG is scaffolding + provenance; it was **appended to, not repaired**. Everything extracted this session was minted with full `source_receipts` following the repo mint schema, then merged into a new session-stamped snapshot with idempotent dedup.

| | Entities | Edges |
|---|---|---|
| Base (session 10) | 26,312 | 98,609 |
| **Session 11 (enriched)** | **27,044** | **99,340** |
| Net new | **+732** | **+731** |

**New entity types:** `AcquisitionReceipt` (679 — full BriTROC-1 EGA file provenance with MD5/bytes), `CNFeatureProfile` (40 — MSK per-specimen CN), `ResistanceAssociation` (12 — 7 BriTROC signatures + 5 BriTROC absolute-CN, each carrying AUROC/CI/p/EPV), `DataVault` (1 — EGA dataset node).
**New edge relations (net-new = 731):** `acquired_from_vault` (679), `cn_feature_associates_resistance` (12 — all 7 signature + 5 absolute-CN edges retained), `specimen_has_cn_profile` (40).
**Integrity:** 0 entity-ID collisions; 13 duplicate `(source, relation, target)` edges correctly deduplicated. Those 13 were worker-4's `genomic_ae_hypothesis` genomic↔AE bridges, **all of which already existed in the base KG from a prior session** — so worker-4 confirmed/re-minted them but added **0 net-new bridge edges** (base and session 11 both hold 92). All CN sig-feature and breakpoint edges were retained (none deduped). New edges verified to anchor to **real pre-existing scaffold nodes** (MSK biospecimens, `cohort:britroc1_hgsoc`, PDS AE terms).
**Neo4j replay:** command **staged, not executed** (no target/creds provided).

---

## 6. Deliverables (filenames)

- `CN_RESISTANCE_REPLICATION.md` — this report.
- `cn_resistance_verdict.json` — machine-readable per-cohort results + verdict.
- `zeta_entities_s11.json` / `zeta_edges_s11.json` — enriched KG snapshot (27,044 / 99,340).
- `SESSION11_MANIFEST.json` — KG delta, dedup counts, graph QC, staged Neo4j replay.
- `acquisition_receipts.json` — all 679 EGA file receipts (accession, MD5, bytes, transfer status).
- `cn_arm_forest.png` / `cn_arm_forest.svg` — CN-arm AUROC forest plot.
- `britroc_cn_result.json`, `britroc_cn_signature_assoc.csv`, `britroc_breakpoint_assoc.csv`, `msk_cn_features.csv`, `msk_cn_result.json`, `pds_mining_result.json`, `worker3_result.json` — per-worker feature artifacts.

## 7. Boundaries honored

No fabrication (nulls reported as nulls; unlabeled cohorts reported as unlabeled). No git commit/push. No raw secrets echoed; the broker key used is burned in-transcript and **must be rotated** after this session. The KG was enriched, never "repaired." All five workers used.
