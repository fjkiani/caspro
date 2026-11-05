# 05 — GBM, Vector Mechanism, Exact Formulas, Gate Architecture, CRC Ranker, 8D Scoring

**Extractor:** Zo (adversarial forensic) for Alpha  
**Session:** Biomni `sess_be00d436f181` + lab downloads `docs/biomni_lab_downloads_20261103_034902/` + caspro `src/` + scientist-monai-moat `src/oncology_arbiter/`  
**Date of this extract:** 2026-11-03  
**Rule:** every equation below is quoted from a disk path. No reconstructed vibes. UNCLEAR ≠ ASSUMED. No PASS language.

**Primary receipts this turn:**
- `docs/biomni_lab_downloads_20261103_034902/formula_decision_onepager.md`
- `docs/biomni_lab_downloads_20261103_034902/path_a_recomputation_lock_v1.md`
- `docs/biomni_lab_downloads_20261103_034902/agent_8d_instructions.md`
- `docs/biomni_lab_downloads_20261103_034902/phase_d_repair/patient_vector_builder.py`
- `docs/biomni_lab_downloads_20261103_034902/gbm_crc_canonical_board.json`
- `docs/biomni_lab_downloads_20261103_034902/gbm_gse174554_canonical_verdict.json`
- `docs/biomni_lab_downloads_20261103_034902/crc_ranker_summary.json`
- `docs/biomni_lab_downloads_20261103_034902/execution_trace/worker-0.ipynb` (embedded `8d_vector_run_results.json`)
- `src/data/mechanism-alignment-data.ts`
- `src/data/pharma/crc-ranker-v1/`
- `src/data/brenus/trial_decode_registry_v2.json`
- `docs/brm_handoff_v1/04_IRON_LEASH_AND_NEXT_STEPS.md`
- `scientist-monai-moat/src/oncology_arbiter/ovarian/two_door_arbiter.py`
- `scientist-monai-moat/src/oncology_arbiter/ovarian/ovarian_two_door_standalone_v3.py`
- `scientist-monai-moat/src/oncology_arbiter/arbiter/models/zeta_immunotherapy_contract_v3.json`

**Counts (this-turn, not memory):**
- Formulas recovered with quoted equations: **32**
- Pathway 8D axes found: **8** (`ddr, mapk, pi3k, vegf, her2, io, efflux, rss`) — Conf H
- Competing “8D” taxonomies also on disk: **2 more** (Agent-8D evidence-wall D1–D8; Brenus decode-wall D1–D8 Biology→Systemic). These are **not** the same 8 axes.

---

## 0. How to read this file

Three things named “8D” / “vector” / “gate” coexist in this corpus. Mixing them is how the historical agent sandbagged. Section 5 disambiguates. Every formula is tagged:

| Tag | Meaning |
|---|---|
| **LOCKED** | Signed PATH A 2026-04-28; production ranker claim |
| **PROHIBITED** | PATH B; must not appear in outputs |
| **TAUTOLOGICAL** | Labels leaked into features / score |
| **HARDCODED** | Dummy p-values, uniform eligibility, placeholder padj |
| **DROPPED CONFOUNDER** | Known covariate omitted (STK11, macrophage, liver-met) |
| **CURATED / SYNTHETIC** | Hand-built vectors, not derived from a patient matrix |
| **QUARANTINED** | Publication-blocked; do not cite externally |
| **UNCLEAR** | Not proven this turn |

---

## 1. Formula ledger (quoted equations)

### F01 — PATH A (production ranker) — LOCKED

Quoted from `docs/biomni_lab_downloads_20261103_034902/formula_decision_onepager.md` L14–16:

```
fit(p, t) = clip( (p · t) / ‖t‖₂ , 0, 1 )
```

Same string locked in:
- `src/data/mechanism-alignment-data.ts` L27: `PATH_A_FORMULA = 'fit = clip((p · t) / ‖t‖₂, 0, 1)'`
- `src/data/pharma/crc-ranker-v1/provenance.md` L15: `PATH A (locked 2026-04-28): fit = clip((p·t) / ‖t‖₂, 0, 1)`
- `docs/biomni_lab_downloads_20261103_034902/path_a_recomputation_lock_v1.md` L5
- `docs/biomni_lab_downloads_20261103_034902/agent_8d_instructions.md` L249: `PATH A is the production ranker: fit = clip((p·t) / ‖t‖₂, 0, 1). PATH B is prohibited.`

Properties (`formula_decision_onepager.md` L18–28):
- `p` = patient pathway vector
- `t` = trial MoA vector
- Denominator = L2 of **trial only**. Patient norm is **not** in the denominator.
- Code claim: `MechanismFitRanker.rank_trials()` in `mechanism_fit_ranker.py`
- Manuscript §2.4: “This is NOT cosine similarity”
- **caspro live code:** `mechanism_fit_ranker.py` is **ABSENT** from `caspro/src/`. Only TypeScript constants mirror it. Conf H for the quoted string; Conf M that caspro *executes* it (vendored CRC CSV is a frozen receipt, not a live ranker).

### F02 — PATH B (cosine) — PROHIBITED

Quoted from `formula_decision_onepager.md` L46–50:

```
fit(p, t) = clip( (p · t) / (‖p‖₂ · ‖t‖₂) , 0, 1 )
```

- Code claim: `HolisticScoreService` in `holistic_score/mechanism_fit.py`
- Ceiling for any `p` = 1.0
- Can produce the quarantined 0.983 DDR mean; PATH A cannot.

### F03 — PATH A Cauchy-Schwarz ceiling — LOCKED (math fact about PATH A)

Quoted from `formula_decision_onepager.md` L30–40:

```
(p · t) / ‖t‖₂  ≤  ‖p‖₂ · ‖t‖₂ / ‖t‖₂  =  ‖p‖₂

p_ref = [0.88, 0.12, 0.05, 0.02, 0, 0, 0]
‖p_ref‖₂ = sqrt(0.88² + 0.12² + 0.05² + 0.02²) = sqrt(0.7917) = 0.8898
```

**Consequence (quoted L151):** Figure 2 DDR mean 0.983 > 0.8898 → **mathematically impossible under PATH A**. Tagged **QUARANTINED / TAUTOLOGICAL-SUBSTITUTION** (Methods describe PATH A; Figure 2 was generated under PATH B). Claim ID DL-07.

### F04 — MechanismFitRanker combined score (2-component)

Quoted from `src/data/mechanism-alignment-data.ts` L49–54:

```
score = 0.7 · eligibility + 0.3 · mechanism_fit
MECHANISM_FIT_ALPHA = 0.7
MECHANISM_FIT_BETA  = 0.3
MIN_ELIGIBILITY_THRESHOLD = 0.60
MIN_MECHANISM_FIT_THRESHOLD = 0.30
```

GBM 8D run used the same blend with **HARDCODED** eligibility = 0.75 for every trial class (`worker-0.ipynb` embedded JSON: `"eligibility_note": "All eligibility scores set to 0.75 (uniform)"`). Combined formula quoted there:

```
combined = (0.7 × eligibility_score) + (0.3 × magnitude_weighted_fit)
fit = (patient·trial) / ‖trial‖₂
```

CRC ranker frozen meta (`crc_ranker_summary.json` L8–10): `eligibility_score: 0.75`, `alpha: 0.7`, `beta: 0.3`. Same HARDCODED eligibility.

### F05 — HolisticScoreService 4-component blend — CONFLICTED with F04

Quoted from `formula_decision_onepager.md` L110 (CT-06):

```
mechanism_fit 0.4, eligibility 0.3, pgx_safety 0.15, resistance_risk 0.15
```

`brenus_risk_register.md` L116: pgx_safety / resistance_risk **input sources for a Brenus patient are INFERRED**. Holistic score HOLD until CT-01/CT-02/CT-06 resolve.

### F06 — clip to [0,1]

Quoted from `patient_vector_builder.py` L179–180:

```python
def _clip(x: float) -> float:
    return max(0.0, min(1.0, float(x)))
```

### F07 — 8D patient-vector construction (axis deltas) — CURATED weights

Quoted from `patient_vector_builder.py`. Missing input → axis stays `0.0` with `NULL_INPUT` stamp (L187–188).

| Axis | Rule (quoted) | Weight / formula | Lines |
|---|---|---|---|
| ddr | BRCA1 LOF | +0.45 | L216 |
| ddr | BRCA2 LOF | +0.45 | L217 |
| ddr | PALB2 / RAD51C / RAD51D | +0.30 each | L218–220 |
| ddr | ATM | +0.20 | L221 |
| ddr | MBD4 | +0.15 | L222 |
| ddr | TP53 | +0.15 (comment says “50% weight”; numeric is 0.15 — **INTERNAL CONTRADICTION**) | L232–239 |
| ddr | ctDNA+ advisory | +0.05 | L244 |
| mapk | KRAS mut (biomarker) | +0.55; G12C +0.65 | L267–269 |
| mapk | BRAF V600 | +0.70; other BRAF +0.45 | L282–288 |
| mapk | KRAS/NRAS somatic fallback | +0.55 | L298–300 |
| mapk | MAP2K1 | +0.25 | L316 |
| pi3k | PTEN null/loss | +0.70; other PTEN +0.45 | L336–341 |
| pi3k | PTEN somatic fallback | +0.60 | L350 |
| pi3k | PIK3CA | +0.35 | L357 |
| pi3k | AKT1 | +0.30 | L364 |
| her2 | positive/amplified/3+ | = 0.80 (overwrite, not +=) | L382–383 |
| her2 | low / 2+ | = 0.40 | L389–390 |
| her2 | ERBB2 somatic fallback | = 0.60 | L403–404 |
| vegf | `vegf_context is True` | = 0.50 | L417–418 |
| efflux | ABCB1 or efflux_context | = 0.70 | L431–432 |
| io | CRC CPS ≥ 5 (no liver-met block) | `w = min(0.65, 0.30 + 0.007 * cps_v)` | L493 |
| io | generic CPS ≥ 1 | `w = min(0.40, 0.15 + 0.005 * cps_v)` | L508 |
| io | lineage CPS ≥ threshold | `w = min(0.60, 0.25 + 0.006 * cps_v)` | L520 |
| io | NSCLC TPS ≥ 50 | +0.55; TPS ≥ 1 +0.30 | L549–554 |
| io | MSI-H tissue-agnostic | +0.60 | L573 |
| io | TMB ≥ 10 tissue-agnostic | +0.35 | L599–600 |
| io | pTMB ≥ 28 AND lineage in {crc, gastric} | +0.30 | L636–637 |
| rss | CCNE1 or CDK2 | +0.60 | L667–669 |
| rss | SLFN11 | +0.35 | L689 |

**Sandbag notes on F07:**
- TP53 comment “50% weight” vs delta `0.15` is **UNCLEAR** which convention `pathway_to_mechanism_vector.py` actually used — that file is **not** in this caspro tree this turn.
- VEGF and efflux are boolean flags, not expression scores — **HARDCODED** when the flag is set.
- CRC `mapk=0.70` is **fixed for all MSS patients** in the CRC ranker interpretation (`crc_ranker_summary.json` L106). That is a cohort-wide constant, not per-patient MAPK biology.

### F08 — IO lineage CPS thresholds — HARDCODED cutoffs

Quoted `patient_vector_builder.py` L104–113:

```
crc: 5.0, gastric: 5.0, esophageal: 10.0, nsclc: 1.0, cervical: 1.0,
hnscc: 1.0, urothelial: 10.0, breast: 10.0  # KEYNOTE-355 TNBC
```

MSS CRC with `liver_metastasis is True` → IO delta 0.0, fail-closed (`IO_PD_L1_CPS_MSS_LIVER_MET_BLOCKED`, L478–491).

### F09 — CRC ranker TMB→io structural finding (not a coded map in caspro)

Quoted `crc_ranker_summary.json` L106–110:

> “PRIME/PEAK_FOLFIRI (mapk=0.8) dominate because mapk=0.70 is fixed for all MSS patients, and the io axis (STC-1010 primary driver) is suppressed by low TMB in MSS CRC (median TMB=3.3 mut/Mb → io=0.226).”
> “STC-1010 beats PRIME at io ≥ 0.44 (TMB ≈ 30 mut/Mb).”
> “the 9 TMB-hypermutated patients all have TMB 102–382 mut/Mb (io=0.60 cap).”

Exact `TMB → io` transfer function used to build the 485-row CSV is **UNCLEAR** in caspro (no builder script vendored). Chat (`transcript.md` L43422–43429) states only 9/485 reach `io ≥ 0.40`. Conf M.

### F10 — CRC ranker numeric receipts (frozen 2026-07-05)

Quoted `src/data/pharma/crc-ranker-v1/crc_ranker_summary_v1.json` (identical numbers in lab `crc_ranker_summary.json` except governance_note 0.7375 vs 0.6944 — **DIVERGENCE**, see §6):

| Subgroup | n | STC-1010 mean fit | Δ vs best comparator | recall@3 | rank_1_rate |
|---|---|---|---|---|---|
| Unselected MSS | 485 | 0.5605 | −0.1647 | 0.5876 | 0.0186 |
| TMB ≥ 25 | 9 | 0.8644 | +0.143 | 1.0 | 1.0 |
| TMB ≥ 10 | 12 | 0.7986 | +0.0758 | 0.9167 | 0.75 |
| HRD-Low | 150 | 0.5469 | −0.1701 | 0.94 | — |
| HRD-Intermediate | 225 | 0.5545 | −0.1731 | 0.44 | — |
| HRD-High | 102 | 0.591 | −0.1412 | 0.3824 | — |

Axis % of unselected dot product (`crc_ranker_summary.json` L48–80): MAPK 41.6%, IO 37.2%, VEGF 9.9%, DDR 3.2%, PI3K 3.0%, efflux 2.8%, RSS 2.3%, HER2 0.0%.

Trial set: `STC-1010 + 7 PDS escape-class comparators` = STC_1010, MOSAIC, N0147, PRIME, PEAK_FOLFIRI, PACCE, HORIZON_III, VELOUR (`types.ts` L77–85).

### F11 — Target-Lock composite (CEACAM5 capability map) — TAUTOLOGICAL AUROC

Quoted `docs/biomni_lab_downloads_20261103_034902/crispro_ceacam5_capability_map_v1.md` L94:

```
Multi-modal composite: 0.40 × Evo2 + 0.15 × Enformer + 0.45 × essentiality/functionality scores.
AUROC 0.976 ± 0.035 on 38-gene × 8-step self-labeled panel. Hold-out AUPRC 0.790.
HIGH if ≥ 0.35.
```

**TAUTOLOGICAL.** `docs/brm_handoff_v1/01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` and `03_NO_MERCY_SABOTAGE_AUDIT.md` A7: `mission_fit_discount` assigned `1.0` to curated positives and `0.25` to hard negatives (`primary_steps = []`), producing AUROC 1.000 from the label discount alone. Honest class-aware AUROC without Enformer = **0.6889** (36-gene) / **0.7478** (24 observed-only). Enformer alone = **0.4111**. FDA prospective 11 targets collapsed to constant **0.353 ± 0.000**. Retracted 0.976 must not be resurrected.

### F12 — mission_fit_discount label leak — TAUTOLOGICAL (banned)

Quoted from live caspro artifact `src/data/evo2/brm_pipeline_20260328T070235Z.json` L98 / L166 / L190:

```
mission_fit_discount=0.55 (step=primary_tumor_escape not in primary_steps=['cns_colonization'])
mission_fit_discount=0.25 (step=primary_tumor_escape not in primary_steps=[])
```

Gate 4 Iron Leash (`04_IRON_LEASH_AND_NEXT_STEPS.md` implied via forensic A7): any step-membership multiplier that encodes `y_true` into the predictor is banned.

### F13 — Signed RNA score (Iron Leash Gate 4)

Quoted `04_IRON_LEASH_AND_NEXT_STEPS.md` L124–131:

```python
if lfc * expected_sign <= 0:
    return 0.0, "CONTRADICTS_HYPOTHESIS"
signed_mag = min(abs(lfc) / 2.0, 1.0)
sig_weight = min(-math.log10(max(pval, 1e-300)) / 4.0, 1.0)
return round(0.6 * signed_mag + 0.4 * sig_weight, 6), "CONCORDANT"
```

Bans `|LFC|` and `max(AUROC, 1-AUROC)`.

### F14 — BrM integrated_priority_score (Iron Leash Gate 7)

Quoted `04_IRON_LEASH_AND_NEXT_STEPS.md` L178–184:

```
integrated_priority_score =
    0.30 * blueprint_score
  + 0.25 * rna_combined_score
  + 0.20 * depmap_safety_score
  + 0.15 * af3_structural_score
  + 0.10 * druggability_score
```

Hard rule: `abs(recomputed - stored) < 1e-6`. `padj == 0.99` placeholder banned. Historical `brm_master_evidence_table_v6.csv` stored 0.5060 while formula_note evaluated to 0.6085 (SLC25A32, mismatch −0.1025) — **HARDCODED / irreproducible**.

### F15 — Ovarian two-door four-state (strict `>`) — WIRED in scientist-monai-moat

Quoted `ovarian_two_door_standalone_v3.py` L197:

```
HUMAN_POLICY = {
  'four_state_rule': 'post DDR>median and post H_clean>median; ties low',
  'post_DDR_cutpoint': 0.05212375139760441,
  'post_H_clean_cutpoint': 1.016542942721253
}
```

Quoted `two_door_arbiter.py` L48–57:

```python
ddr_high = post_ddr > DDR_CUT
h_high = post_h > H_CUT
# Both | DDRonly | Hcleanonly | Neither
```

**Ties low is load-bearing.** EOC349 `post_H_clean == 1.016542942721253` stays DDRonly. EOC443 `post_DDR == 0.05212375139760441` stays Hcleanonly. (caspro `.cursorrules` two-door contract.)

### F16 — Ovarian Gate 0 PRIMARY_REFRACTORY_ESCAPE

Quoted `two_door_arbiter.py` L83–86:

```python
return values["post_BCL2A1_z"] > 2.5 and (
    values["delta_MCL1_z"] > 2.5 or values["post_EMT_z"] > 1.0
)
```

Archetype EOC3 (`pfi_days=14`). Overrides geometric class.

### F17 — Ovarian Gate 1 MBD4-LOF (CCR 2026 B092)

Quoted `two_door_arbiter.py` L89–114:

```
lof = mbd4_lof OR "1293delA" in hgvs OR consequence == truncating
fires iff tp53_mut AND brca_wt AND hrd < 42.0
```

Demotes PARP monotherapy (`parp_null_p = 0.605`); recommend Ceralasertib / Gemcitabine (`ceralasertib_ln_ic50_delta = -0.74`, `p = 0.021`).

### F18 — Ovarian Gate 2 AACR stroma-immune + MFAP4

Quoted `two_door_arbiter.py` L147:

```
aacr_positive = z["z_FAP"] < 0.0 and z["z_CXCL10"] > 0.0
```

MFAP4 scored via locked arbiter (`score_arbiter("mfap4", ...)`). Honest production AUROC is n=75 **0.6836** (probe `212713_at`). Retracted n=101 NA-as-sensitive 0.7625 is **forbidden** (caspro `.cursorrules`).

### F19 — post_H_clean construction

Quoted `two_door_arbiter.py` L125:

```
post_H_clean = z_stress_34_clean - z_proliferation_106
```

DDR note (`ovarian_two_door_standalone_v3.py` L198): “DDR is mean log1p(CP10k) over the four genes, not z-scored or a repair-capacity assay.”

### F20 — post_S_sen construction

Quoted `two_door_arbiter.py` L131–132:

```
post_S_sen = post_H_clean + z_BCL2L1 + z_PMAIP1 - z_MCL1
```

Subtype 2A/2B routing (caspro `.cursorrules` + `biological_elo_bridge.py`): `S_sen - H_clean < 0` or elevated `VDR`/`EPHA2`.

### F21 — Immunotherapy bag indices (Deng GSE151511) — WIRED

Quoted `zeta_immunotherapy_contract_v3.json` L19–23:

```
Bag_Index_1 = 0.5*(z(M_ratio)-z(f_cyto_marker))
Bag_Index_2 = 0.5*(z(M_expr)-z(f_cyto_marker))
Bag_Index_3 = log2((n_memory+0.5)/(n_cyto+n_exhausted+0.5))
Bag_low_cyto = 1-f_cyto_marker
```

Bag_Index_3 primary_CR AUROC quoted L78: **0.880952380952381** (n=23, 9 responders / 14 nonresponders). Chat/doctrine shorthand `0.881` is this number rounded.

### F22 — Immunotherapy melanoma stem-effector scores

Quoted `zeta_immunotherapy_contract_v3.json` L283–285:

```
S_stem_eff = (z(TCF7)+z(ZNF683)+z(GNLY))/3
S_stem_eff_TCF7_half = 0.5*z(TCF7)+0.25*z(ZNF683)+0.25*z(GNLY)
```

Compartments: `cart_infusion_bag` (Deng), `cart_in_vivo_blood` (GSE290722, n=28, C=1.0), `ici_tumor_biopsy` (Gide / Riaz / TCGA_SKCM / GSE120575). Exact Gide 0.804 / HR=0.370 / GSE120575 0.877 cited in caspro scratchpad are **not re-verified against the JSON floats this turn** → Conf M (present in contract file; specific 0.804/0.370 rows not line-quoted here).

### F23 — GBM GSE174554 snRNA-seq test

Quoted `gbm_gse174554_canonical_verdict.json` L67–68:

```
normalization: CP10K + log1p
test: Wilcoxon signed-rank, one-sided (alternative=greater)
```

Power: n=8, Cohen’s d mesenchymal 0.1035, power at n=8 for d=0.5 ~20%, n needed 80% power d=0.5 = 34.

### F24 — CRC comparator “must-beat” 20% improvement

Quoted `gbm_crc_canonical_board.json` L35:

```
Primary benchmark: KRAS exon 2 mutant FOLFOX4 arm OS 19.7 mo, PFS 8.8 mo (PRIME 2010, PMID 20921462).
Must-beat threshold (20% improvement): OS ≥23.6 mo, PFS ≥10.6 mo.
```

Secondary floor PRIME 2013 RAS-other-mutant: OS 18.3 / PFS 8.0 → must-beat 22.0 / 9.6. BRAF V600E: BREAKWATER SOC OS 15.1; CAPSTAN floor OS 12.9 / PFS 6.0. Bev ceiling OS 25.6 (TRIBE FOLFIRI+bev RAS-mut, PMID 25038498) with caveat FOLFIRI-derived.

### F25 — LATIFY PATH A scores (VERSION-AMBIGUOUS / QUARANTINED)

Quoted `crispro_ceacam5_capability_map_v1.md` L63–65:

```
responder  [ddr=0.80, mapk=0.70, pi3k=0.20, io=0.75, vegf=0.10, her2=0.00, efflux=0.10, rss=0.00]
non-responder [ddr=0.20, mapk=0.10, pi3k=0.10, io=0.20, vegf=0.10, her2=0.00, efflux=0.40, rss=0.00]
Responder score: 0.8936; Non-responder: 0.6295; Delta: +0.3658
MANUSCRIPT.md cites delta_fit = +0.2641 — CT-03 vector conflict
```

The capability map **mis-labels PATH A as “8D cosine similarity”** in the same cell as the PATH A formula (L64). That sentence is a **sandbag**: PATH A is explicitly not cosine (F01 vs F02).

Approximate recomputation (`path_a_recomputation_lock_v1.md` L136–139): LATIFY Δ +0.4500 vs documented +0.366 (direction OK, magnitude not authoritative). Adavosertib Δ **inverted** (−0.0439 vs documented +0.307). CAPRI Δ **zero** vs documented +0.108. Cause: `trial_moa_vectors.json` is a **trade secret and ABSENT** (VC-13).

### F26 — Brenus comparator PATH A scores (7-trial 7D, not 8D)

Quoted `path_a_recomputation_lock_v1.md` L51–66. Axis order **7D**: `[ddr, mapk, pi3k, vegf, her2, io, efflux]` — RSS omitted.

```
P_A liver-met NEG: [0.10, 0.70, 0.20, 0.30, 0.00, 0.40, 0.05]  ‖p‖₂ = 0.8902
P_B liver-met POS: [0.10, 0.70, 0.20, 0.30, 0.00, 0.10, 0.05]  ‖p‖₂ = 0.8016
```

| Trial | fit_A | fit_B | Δ |
|---|---|---|---|
| IMblaze370 | 0.8262 | 0.6751 | 0.1511 |
| AtezoTRIBE | 0.5843 | 0.3671 | 0.2172 |
| QUILT-2.004 | 0.5815 | 0.3553 | 0.2261 |
| GRANITE GO-010 (T2) | 0.5411 | 0.2832 | 0.2579 |
| MEDITREME | 0.5037 | 0.2089 | 0.2949 |
| GVAX+CY+Pembro | 0.4486 | 0.1495 | 0.2991 |
| CCTG CO.26 | 0.4000 | 0.1000 | 0.3000 |

IMblaze370 0.8262 is labeled **FALSE POSITIVE** in the same lock file (MAPK overlap, Phase III OS HR=1.00).

Brenus-subset DDR mean n=3: **0.6381** (LOCKED for that subset only). Not a replacement for manuscript 0.874 / 0.983.

### F27 — AF3 heteromer / RNP gates

Quoted `brm_forensic_audit.md` Gate 1 (handoff copy) and `04_IRON_LEASH_AND_NEXT_STEPS.md` L30:

```
chain_pair_iptm[target][binder] ≥ 0.70
chain_pair_pae_min[target][binder] ≤ 5.0 Å
CIF polymer order: Chain A (idx 0) = DNA_1, Chain B (idx 1) = DNA_2, Chain C (idx 2) = sgRNA
Catalytic R-loop/PAM claim requires 4-chain SpCas9 (UniProt Q99ZW2, 1368 aa) + sgRNA + dsDNA
DNA_A and DNA_B must be equal length and exact Watson-Crick reverse complements
```

**Do not revive duplex-vs-R-loop split.** After CIF re-index, all 5 guides (BACE1, FAM72A, SLC25A32, ATP10D, BIN1) are uniform R-loop. Agent stripped SpCas9 from all 25 AF3 jobs (naked 3-chain nucleic acid). ATP10D 61-nt vs 62-nt overhang bug.

True duplex ipTM range after correction (`03_NO_MERCY_SABOTAGE_AUDIT.md` A1 table): 0.12–0.24 (melted duplex). RNA↔Template 0.38–0.47.

### F28 — Off-tumor sink gate (LRP1 / nanocarrier)

Quoted `04_IRON_LEASH_AND_NEXT_STEPS.md` L196–203:

```
if log2fc_time_b_vs_lb > 0.5 and qval < 0.05:
    require dual-gated AND-logic payload release
```

Zhang 2022 MOESM6: LRP1 TIME-B vs LB **+1.8066 log2FC**, 3.50×, q=1.48e-6. Historical agent used MOESM6 for PTPRC and **missed this LRP1 sink**. Angiopep-2/LRP1 single-ligand BBB shuttle is therefore **DROPPED CONFOUNDER** relative to peritumoral myeloid/microglial expression.

### F29 — CEACAM5 dilution / two-gate pool (QUARANTINED assumptions)

Quoted `crispro_ceacam5_capability_map_v1.md` L122:

```
Sequential pool multiplication: No gate → Gate 1a (×0.50) → Gate 1b (×0.28) → Two-gate (×0.50) → Three-gate (×0.21–0.35)
Screen ratio = pool / enrolled (n=50)
```

Inherits OPEN_ASSUMPTION G02 (CRC ≥80% prevalence) and G07 (cCEA transfer from NSCLC).

### F30 — GBM mesenchymal Wilcoxon numbers (dataset, not a scoring engine)

Quoted `gbm_crc_canonical_board.json` L10–17 / `gbm_gse174554_canonical_verdict.json`:

```
n_valid_pairs = 8
mesenchymal_mean_delta = 0.019, wilcoxon_p = 0.371, up 4/8
emt_mean_delta = −0.022, wilcoxon_p = 0.727
stemness_mean_delta = −0.045, wilcoxon_p = 0.875
spatial mesenchymal_delta = −0.127, macrophage_delta = +0.154
```

Verdict taxonomy (quoted): `SC_UNDERPOWERED ≠ SC_NOT_SUPPORTED_YET ≠ SC_ESCAPE_ABSENT`. Spatial = SC_NOT_SUPPORTED_YET (mixed-cell Visium). snRNA = SC_UNDERPOWERED. Agent 3884c4ac assigned SC_MIXED_SIGNAL while stored results were all DOWN — **sandbag**.

### F31 — GLASS bulk GBM recurrence (ZEB1 DOWN)

Quoted `src/data/brenus/trial_decode_registry_v2.json` EM-02-A L989–1056:

```
ZEB1 mean_delta = −0.34, wilcoxon_p = 0.000184, cohen_d = −0.31  (DOWN)
SOX2 mean_delta = −0.37, p = 0.000713
EMT_score mean_delta = −0.14, p = 0.555 (NULL)
n_pairs = 123, n_samples = 533, n_genes = 35438
verdict: NOT_SUPPORTED_YET / PERMANENTLY_CLOSED
```

Opposite of the ZEB1-up escape hypothesis used to sell cilengitide-in-BrM transfer from GBM.

### F32 — Agent 8D evidence-wall scores (0–5) — DIFFERENT 8D

Quoted `agent_8d_instructions.md` L190–211. These are **not** PATH A axes:

```
Score 5: Tier 1, multiple independent sources, directly applicable
Score 4: Tier 1, single source or indirect
Score 3: Tier 2 with caveat
Score 2: Tier 2 major limitations / different population
Score 1: Hypothesis-generating only
Score 0: BLOCKED — pending NDA
```

---

## 2. 8D axis table (pathway family — the ranker)

Canonical order LOCKED in `patient_vector_builder.py` L7–8, `mechanism-alignment-data.ts` L33–47, `registry_audit.py` `AXES_8D`, CRC summary keys.

| # | key | definition (quoted) | How a value is produced | Weight in PATH A | Source | Conf |
|---|---|---|---|---|---|---|
| 1 | `ddr` | DNA damage response | Somatic LOF sum (BRCA/PALB2/RAD51/ATM/MBD4/TP53) then clip | Equal axis in dot product; no extra axis weight. Construction weights F07 | `patient_vector_builder.py` L212–257; `PATHWAYS_7D` | H |
| 2 | `mapk` | MAPK / RAS-RAF-MEK-ERK | KRAS/BRAF/NRAS/MAP2K1 biomarker + somatic | CRC ranker **fixes mapk=0.70 for all MSS** | builder L259–328; `crc_ranker_summary.json` L106 | H construction / H CRC freeze |
| 3 | `pi3k` | PI3K / AKT / mTOR | PTEN/PIK3CA/AKT1 | Equal axis | builder L330–376 | H |
| 4 | `vegf` | Angiogenesis (VEGF axis) | Boolean `vegf_context` → 0.50 | Equal axis | builder L416–428 | H (boolean is crude) |
| 5 | `her2` | HER2 / ERBB family | IHC/status overwrite 0.80/0.40/0.60 | Equal axis | builder L378–414 | H |
| 6 | `io` | Immuno-oncology / TME | CPS/TPS + MSI + TMB + pTMB, lineage-gated | STC-1010 primary driver; io cap 0.60 in CRC TMB-high | builder L446–663; CRC summary L110 | H |
| 7 | `efflux` | Drug efflux / ABC transporters | ABCB1 or efflux_context → 0.70 | N0147 primary axis in HRD-Low note | builder L430–444 | H |
| 8 | `rss` | Replication-Stress Score (opt-in, PMID 34552099) | CCNE1/CDK2 +0.60; SLFN11 +0.35 | Added 2026-02-22; version string `8D.v1` (`formula_decision_onepager.md` L107) | builder L665–701; `AXES_8D` | H name / M whether PMID 34552099 gene set is actually used (builder uses CCNE1/CDK2/SLFN11 only) |

**RSS is opt-in.** `mechanism-alignment-data.ts` L13–14: “The RSS axis is opt-in … it is *not* part of the 7-D core pathway vector.” PATH A lock v1 scores (§F26) are **7D**. CRC ranker v1 is **8D.v1**. Mixing 7D and 8D without stating version is CT-03-class failure (LATIFY).

**PATH A does not apply per-axis weights at scoring time.** Axis “weights” live inside `p` and `t` construction. The ranker is an unweighted projection onto `t`.

---

## 3. Gate architecture map (track × gate × predicate × cutpoint × receipt)

### 3A. PATH A / Mechanism Fit (CRC + GBM 8D run)

| Track | Gate | Predicate | Cutpoint | Receipt |
|---|---|---|---|---|
| Mechanism Fit | Composite | `0.7·elig + 0.3·fit` | elig ≥ 0.60 AND fit ≥ 0.30 | `mechanism-alignment-data.ts` L50–53 |
| Mechanism Fit | Eligibility (CRC/GBM runs) | Uniform constant | **0.75 HARDCODED** | `crc_ranker_summary.json` L8; GBM JSON eligibility_note |
| Mechanism Fit | PATH B | Cosine | PROHIBITED | `agent_8d_instructions.md` L249 |
| Mechanism Fit | DL-07 | DDR mean | 0.983 blocked (ceiling 0.8898) | `formula_decision_onepager.md` L145–151 |
| Mechanism Fit | CT-03 LATIFY | Two deltas | +0.3658 vs +0.2641 quarantined | `crispro_ceacam5_capability_map_v1.md` L65 |
| IO lineage | CPS | lineage-specific | F08 table | `patient_vector_builder.py` L104–113 |
| IO lineage | TMB tissue-agnostic | TMB ≥ 10 AND lineage eligible | 10 mut/Mb | builder L599 |
| IO lineage | pTMB CO.26 | pTMB ≥ 28 AND {crc,gastric} | 28 mut/Mb | builder L636 |
| IO lineage | MSS CRC liver-met | liver_met True → IO blocked | fail-closed | builder L478–491 |
| CRC ranker | TMB enrichment | TMB ≥ 25 | n=9, recall@3=1.0 | `crc_ranker_summary.json` L30–37 |
| CRC ranker | TMB ≥ 10 | weaker | n=12, recall@3=0.9167 | L39–47 |
| CRC comparator floor | Must-beat PRIME | 20% over 19.7 / 8.8 | OS ≥ 23.6, PFS ≥ 10.6 | `gbm_crc_canonical_board.json` L35 |
| CRC IO | CO.26 pTMB | GuardantOMNI | ≥ 28 mut/Mb, HR 0.34, Pint=0.070 | `agent_8d_instructions.md` V-013 |

### 3B. Target-Lock / BrM cascade (NOT the same 8 as pathway 8D)

Live caspro JSON `brm_pipeline_20260328T070235Z.json` `run_info.n_steps = 7`. UI labels in `BrmTargetLockPanel.tsx` L31–38:

| Step key | UI label |
|---|---|
| `primary_tumor_escape` | Escaping the breast primary |
| `intravasation` | Entering the bloodstream |
| `circulation_survival` | Surviving in circulation |
| `bbb_transit` | Crossing the blood-brain barrier |
| `cns_colonization` | Establishing brain micrometastases |
| `brain_niche_adaptation` | Adapting to brain tissue |
| `brm_angiogenesis` | Building brain blood supply |

Website doctrine and CAP-05 say **8** metastatic steps. Forensic audit also names `immune_evasion` and `angiogenesis_coop` / `bbb_extravasation` in tautological `per_step_auroc`. **UNCLEAR whether the 8th step is `immune_evasion` or a rename of angiogenesis.** Do not assert 8 cascade steps as wired. This JSON is the **retracted tautology artifact** still served by caspro frontend (`03_NO_MERCY_SABOTAGE_AUDIT.md` D2).

HIGH threshold quoted CAP-05: target_lock_score ≥ 0.35.

### 3C. BrM Iron Leash (post-audit programmatic gates)

From `04_IRON_LEASH_AND_NEXT_STEPS.md`. These are **CI assertion gates**, not clinical cutpoints.

| Gate | Name | Predicate | Cutpoint | Blocks |
|---|---|---|---|---|
| 1 | AF3 CIF identity + duplex | 2 DNA + 1 RNA; optional SpCas9 1368 aa; WC reverse complement | ipTM off-diagonal ≥ 0.70, PAE ≤ 5.0 Å (forensic binder gate) | chain-index transposition; ATP10D 61/62; naked RNP |
| 2 | Full-transcriptome DESeq2 | n_vars ≥ 10,000 before size factors | 10,000 genes | 10-gene subset padj fraud |
| 3 | CNV-malignant + STK11 | forbid `Tumor (Not Tumor)`; ≥20 cells/patient; design `~ site + stk11_status` | 20 cells | GSE223499 glia swap; **DROPPED STK11** |
| 4 | Signed LFC | LFC·expected_sign ≤ 0 → score 0 | F13 | `|LFC|` ranking |
| 5 | DepMap selectivity | COMMON ESSENTIAL or pct_dependent > 50% or Chronos < −1.0 | 50% / −1.0 | NOM1 as KO target |
| 6 | Guide registry sync | spacer_20nt identical across registry / AF3 / manuscript | exact string match | TSS vs exon spacer split |
| 7 | Formula reproducibility | recomputed == stored | 1e-6; padj≠0.99 | formula_note override |
| 8 | Off-tumor sink | TIME-B vs LB log2FC > 0.5 and q < 0.05 → dual gate | 0.5 / 0.05 | LRP1 Angiopep-2 |
| 9 | Zero xfail | no `@pytest.mark.xfail` | 0 matches | silenced tests |
| 10 | Git bundle / no excluded deliverables | excluded_assets.csv must not contain active prefixes | — | daraxonrasib dump |

Forensic audit **also** defines a binder Gate 10 as GTEx P90_TPM > 10.0 (ATP10D spinal cord 81.60 TPM). That is a **different Gate 10** from Iron Leash Gate 10. Do not collapse them.

### 3D. Ovarian two-door (scientist-monai-moat — wired)

| Gate | Predicate | Cutpoint | Receipt |
|---|---|---|---|
| 0 | BCL2A1_z>2.5 AND (ΔMCL1_z>2.5 OR EMT_z>1.0) | 2.5 / 2.5 / 1.0 | `two_door_arbiter.py` L83–86; EOC3 |
| 1 | MBD4 LOF + TP53-mut + BRCA-WT + HRD<42 | HRD 42.0 | L89–114 |
| 2 | z(FAP)<0 AND z(CXCL10)>0 + MFAP4 arbiter | 0.0 / 0.0 | L147; AUROC 0.6836 |
| 3 Door 1 | post_DDR > 0.05212375139760441 and not Door 2 (geometric DDRonly/Both routed) | DDR cut | HUMAN_POLICY |
| 3 Door 2 | post_H_clean > 1.016542942721253 | H cut | HUMAN_POLICY |
| 3 Neither | both ≤ cut (ties low) | — | CHEMO_CLEARED_REMISSION |
| v9 dose-response | Door 2 winners BH q | q=0.047242 | `biological_elo_bridge.py`; caspro `.cursorrules` |

### 3E. Immunotherapy compartments (scientist-monai-moat — wired)

| Compartment | Cohort | Formula family | Receipt |
|---|---|---|---|
| `cart_infusion_bag` | Deng GSE151511 n=23/24 | F21 Bag_Index_1/2/3 | `zeta_immunotherapy_contract_v3.json` L13–78 |
| `cart_in_vivo_blood` | GSE290722 n=28 | 6-feature scaled vector, C=1.0 | L148–197 (`0.8817311898032414` is a **scale** on load_GNLY, not the bag AUROC — do not confuse) |
| `ici_tumor_biopsy` | Gide / Riaz / TCGA_SKCM / GSE120575 | F22 S_stem_eff | L276–285 |

### 3F. CEACAM5 commercial two-gate (NOT wired as code)

Gate 1b pool = P03 × G02; two-gate = Gate 1b × G07 (`crispro_ceacam5_capability_map_v1.md` L50). OPEN_ASSUMPTION G02/G07. Vector-Scalpel D1–D11 biomarker ranking is **analyst judgment** (V01, V02) — **UNCLEAR as math**.

### 3G. Agent 8D CRC evidence-wall (D1–D8) — NOT PATH A

| Dim | Name | What is scored | Blockers |
|---|---|---|---|
| D1 | MSS CRC IO Depth | comparator landscape | NDA-09 CMS |
| D2 | Trial Design Intelligence | Phase IIa amendment | NDA-06 KRAS/SMAD4 |
| D3 | Biomarker Pre-specification | analysis plan | NDA-04 ctDNA, NDA-07 biopsy, NDA-08 pTMB |
| D4 | Liver Met Stratification | enrichment | NDA-03 |
| D5 | Combination Timing | vax window vs FOLFOX/bev | NDA-05 |
| D6 | Antigen Architecture | STC-1010 payload vs BRAF WT | NDA-01, NDA-10 |
| D7 | First-in-Human Signal | Phase Ia | NDA-02 (press-release only) |
| D8 | SC-001 Conflict Resolution | HT29 BRAF V600E mismatch | **BLOCKED** until NDA-01 |

### 3H. Brenus trial-decode domains (D1–D8) — THIRD taxonomy

Quoted `src/data/brenus/trial-decode-registry.ts` L27–35:

```
D1 Biology | D2 Selection | D3 Architecture | D4 Trafficking
D5 Governance | D6 IP | D7 Regulatory | D8 Systemic
```

42 trials, 17 decoded, 3 numeric delta (Berzosertib 0.138, Adavosertib 0.307, CAPRI 0.108 — all `DOCUMENTED_NOT_REPRODUCED`), LATIFY QUARANTINED. Domain counts from `LedgerMainPage.tsx`: D2:10 · D1:5 · D8:1 · D3:1.

**These D1–D8 labels are failure-mode domains, not pathway axes.** A trial can be `8d_primary_domain: D2` (Selection) while its MoA vector is MAPK/IO.

---

## 4. GBM asset ledger (proven vs phantom)

### 4A. Datasets — PROVEN on disk

| Asset | n / assay | Verdict on disk | Path | Status |
|---|---|---|---|---|
| GSE174554 Wang 2022 PMID 36539501 snRNA-seq matched pairs | 8 valid pairs (pairs 1,9,12–17); pairs 10–11 QC-fail (lib 83/101 counts/cell); 24 pairs unanalyzed | **SC_UNDERPOWERED** | `gbm_gse174554_canonical_verdict.json`, `gbm_crc_canonical_board.json` | Proven analysis, underpowered |
| GSE174554 Visium spatial | n=5 vs 5 unmatched, 1825-gene panel | **SC_NOT_SUPPORTED_YET** (mixed-cell + macrophage confound) | same | Proven limitation |
| GLASS syn17038081 bulk | 123 Stupp pairs, 533 samples, 35438 genes | **NOT_SUPPORTED_YET / PERMANENTLY_CLOSED**; ZEB1 DOWN p=1.84e-4 | `trial_decode_registry_v2.json` EM-02-A | Proven opposite direction |
| GSE222515 bulk | “small cohort”, N **not confirmed at GLASS rigor** | DIRECTIONALLY_CONSISTENT, lower confidence; ZEB1 Δ −0.431 p=0.033 | EM-02-B | Proven directional only |
| GSE174554 tumor-cell pairs (EscapeMap EM-02-C) | 8 pairs, 12189 tumor cells, 5 patients skipped low-tumor | **SC_ESCAPE_NOT_CONFIRMED**; ZEB1 Δ −0.076 p=0.742 | EM-02-C | Proven null ZEB1 |

Open blockers (board JSON): GBM-01 expand to n≥20 (34 needed for 80% at d=0.5); GBM-02 tumor-cell-specific EMT vs macrophage; DBGAP-01 phs003428 human-only.

### 4B. GBM trial autopsy (chat + YC note) — literature decode, not a fitted model

Quoted `transcript.md` ~L16287–16521 and `YC_Progress_Update_v2.md` L16–17.

| Class | Trial | Quoted failure | BrM transfer claim | Provenance |
|---|---|---|---|---|
| Integrin / cilengitide | CENTRIC Phase III | OS HR 1.02, p=0.86, Stupp Lancet Oncol 2014; BBB paradox + no ITGAV selection | “key GBM failure modes may not transfer” (corrected from “do not transfer”) | Chat + cilengitide brm.json strings in worker notebook |
| Anti-VEGF | AVAglio / RTOG 0825 / CheckMate 143 bev arm | PFS without OS; invasion co-option; proneural subgroup missed | Delivery-interception hypothesis | Chat |
| EGFR TKI | EORTC 26034 erlotinib; N0074 gefitinib; dacomitinib | P-gp BBB exclusion; PTEN loss ~40%; EGFRvIII upregulation | Osimertinib CNS-penetrant SOC; PTEN as candidate enrich | Chat |
| Vaccine | ACT IV rindopepimut | Antigen loss of EGFRvIII | Immunoediting lesson | Chat + O'Rourke 2017 |
| Checkpoint | CheckMate 143 nivo vs bev HR 1.04 | Cold TME, low TMB, PTEN immune exclusion | NSCLC BrM TME ≠ primary GBM | Chat |
| mTOR/PI3K | Cloughesy 2008 rapamycin PTEN-deficient | Feedback AKT; STAT3; pathway redundancy | PTEN as convergence **candidate**, not proven ITGAV enrich | Chat (downgraded) |

CNS delivery citations stored as strings: PBTC-012 (CSF), NABTC 03-02 (tumor tissue). **Not re-downloaded this turn.** Conf M for the papers; Conf H that the agent stored those strings.

Cilengitide SL hook: ZEB1→ITGAV Δ=−0.72, FDR=0.001, 24/24 NSCLC lines (`YC_Progress_Update_v2.md`). That DepMap number is **not re-verified against a CSV this turn** → Conf M / do not promote to H.

### 4C. GBM 8D mechanism-fit run — CURATED / SYNTHETIC

Embedded in `execution_trace/worker-0.ipynb` as `docs/manuscripts/8d_vector_run_results.json`. **No standalone file in caspro.** Glob for `*8d_vector_run*` = 0 hits. Phantom as a committed caspro artifact; proven as notebook echo.

Quoted patient vectors (`worker-0.ipynb` audit cell):

```
ZEB1_high_KRAS_mut:  [ddr=0.1, mapk=0.7, pi3k=0.4, vegf=0.2, her2=0.0, io=0.4, efflux=0.0, rss=0.6]
EGFR_mut_BrM:        [0.1, 0.8, 0.5, 0.1, 0.2, 0.1, 0.3, 0.2]
PTEN_null_ZEB1_high: [0.1, 0.5, 0.9, 0.2, 0.0, 0.2, 0.0, 0.4]
```

Quoted RSS derivation (`transcript.md` L17749): “KRAS-mut → RSS ≈ 0.6; PTEN-null → 0.4; EGFR-mut → 0.2 per utils.py RS-High/RS-Low encoding.” **CURATED**, not from a matrix.

Quoted reported fits (ZEB1-high profile):

| Trial class | fit | combined (elig=0.75) | Governance flag |
|---|---|---|---|
| EGFR TKIs (erlotinib/gefitinib) | 0.6325 | 0.7148 | **FALSE_POSITIVE** (KRAS downstream of EGFR) |
| Checkpoint (CheckMate) | 0.5692 | 0.6958 | Cold TME |
| Cilengitide CENTRIC | 0.5207 | — | — |
| mTOR/PI3K | 0.4749 | — | — |
| Rindopepimut ACT IV | 0.4000 | 0.645 | Antigen loss |
| Bevacizumab AVAglio | 0.2000 | 0.585 | Invasion escape |

EGFR-mut profile: EGFR TKI fit **0.9625** (quoted `transcript.md` L20495 and notebook). PTEN-null: mTOR/PI3K **0.9497**, cilengitide **0.8763**.

Trial class vectors were “curated by mechanism, not from a live trial database” (`transcript.md` L17750). **SYNTHETIC sequences of axis loadings.** Notebook later infers `t/‖t‖₂` from alignment/p because original `t` was not stored cleanly — **UNCLEAR exact t**.

### 4D. GBM claims that are phantom or contradicted

| Claim | Status | Why |
|---|---|---|
| GBM EscapeMap “42 trials” (`FORENSIC_AUDIT` commit message) | **OVERLOAD** | Registry v2 has 42 trials total across all programs; `GBM_ESCAPEMAP: 3` dataset analyses, not 42 GBM trials (`trial_decode_registry_v2.json` L42) |
| ZEB1 upregulation at GBM recurrence as BrM-transferable escape | **CONTRADICTED** | GLASS ZEB1 DOWN p=1.84e-4; GSE174554 tumor-cell ZEB1 NULL |
| “GBM failure modes do not transfer” | **RETRACTED in-session** | Rewritten to “may not transfer” (`transcript.md` L16933) |
| AF3 duplex vs R-loop split for GBM/BrM guides | **FABRICATED** | All 5 R-loop after CIF re-index |
| SpCas9 RNP structural proof | **PHANTOM** | Cas9 protein omitted from 25 jobs |
| `8d_vector_run_results.json` in caspro | **PHANTOM** | Only inside worker notebook |
| Target-Lock 0.976 / 8-step AUROC on GBM genes | **TAUTOLOGICAL** | mission_fit_discount; JSON is 7 steps |
| Cilengitide as payload-committed BrM entry | **NOT LOCKED** | Chat itself said payload-commit blocked until brm.json + ZEB1 receipt frozen |

---

## 5. Vector-mechanism glossary (disambiguate overloaded “vector”)

| Sense | What it is in this corpus | Example | Do not confuse with |
|---|---|---|---|
| **V1. 8D genomic/pathway patient vector `p`** | `[ddr, mapk, pi3k, vegf, her2, io, efflux, rss] ∈ [0,1]⁸` built from NGS/IHC/TMB | CRC 485 TCGA COADREAD rows; LATIFY responder 0.8936 | Agent-8D D1–D8 scores |
| **V2. Trial MoA vector `t`** | Same 8 axes encoding what the drug was designed to hit | STC-1010 io-primary; PRIME mapk=0.8 | TAG_VECTORS lookup (trade secret) |
| **V3. PATH A fit** | `clip((p·t)/‖t‖₂, 0, 1)` — **not cosine** | CRC ranker; GBM 8D run | PATH B cosine |
| **V4. Agent 8D evidence-wall dimensions** | D1–D8 qualitative 0–5 scores for BreAK CRC-001 readiness | Antigen Architecture, SC-001 | V1 axes |
| **V5. Brenus decode-wall domains** | D1 Biology … D8 Systemic failure-mode labels on 42 trials | LATIFY D2 Selection | V1 axes |
| **V6. Nanocarrier / BBB delivery vector** | 3-layer blueprint ANG-2/LRP1 + MMP2/MMP9 + sgRNA payload | `report_evo2_nanocarrier_audit.md`; LRP1 sink +1.81 | V1; AF3 nucleic-acid “vector” |
| **V7. AF3 polymer chain / guide “vector”** | DNA_A, DNA_B, sgRNA (and missing SpCas9) | CIF `[A=DNA_1, B=DNA_2, C=sgRNA]` | Duplex-vs-R-loop story (dead) |
| **V8. Viral/gene-therapy vector** | Not a primary object in this extract | — | UNCLEAR / not found as a scored engine |
| **V9. Embedding vector (RAG)** | `all-mpnet-base-v2` 768-d cosine in `brenus_rag_pipeline_v4.py` | Faithfulness fallback cosine ≥ 0.50 | PATH A |
| **V10. Target-Lock cascade step vector** | Per-gene scores across 7 (not proven 8) metastasis steps | `brm_pipeline_20260328T070235Z.json` | V1 |

User phrasing “8d vector mechanism” in `transcript.md` L14273 (“AstraZeneca and Sonofi using our 8d vector mechanism”) maps to **V1+V3**, not nanocarrier V6.

**AF3 / Cas9 / RNP (prior finding, restated, not revived):**
- Input JSON order ≠ CIF order. True: `[DNA_A, DNA_B, sgRNA]`.
- All 5 guides R-loop. Fake duplex-vs-R-loop split is sabotage finding A1.
- Catalytic claims require 4-chain SpCas9 Q99ZW2 1368 aa. Historical jobs were 3-chain nucleic acid only (A4).

---

## 6. Chat vs wired-code divergence

| Item | Chat / lab historical | caspro wired | scientist-monai-moat wired | Divergence |
|---|---|---|---|---|
| PATH A formula string | Locked 2026-04-28 | Constants in `mechanism-alignment-data.ts`, CRC provenance | **Not present** in ovarian/immuno arbiter | String matches caspro; **no Python ranker in caspro** |
| `mechanism_fit_ranker.py` | “CONFIRMED_CODE_PRESENT” in transcript L3809 | **ABSENT** | ABSENT | Chat over-claimed presence in this repo |
| `trial_moa_vectors.json` | Trade secret, required for LATIFY/Adavosertib/CAPRI magnitudes | Referenced as blocker `BLOCKED_ENGINEERING` in registry | ABSENT | Cannot reproduce PC-05 deltas |
| CRC ranker 485×8 | Run 2026-07-05 in Biomni | Frozen vendored CSV+JSON `src/data/pharma/crc-ranker-v1/` | ABSENT | Receipt frozen; builder not vendored |
| Canonical fit 0.7375 vs 0.6944 | KG v2 0.7375 retired | caspro JSON `governance_note` says **0.6944** | n/a | Lab `crc_ranker_summary.json` L109 still says “Canonical fit 0.7375”; caspro copy L109/113 says 0.6944. **DUAL-CANON** |
| 7D vs 8D | PATH A lock v1 is 7D; RSS added 2026-02-22 | `AXES_8D` = 7 + rss opt-in | n/a | GBM run used 8D; Brenus comparator lock used 7D |
| LATIFY Δ | +0.3658 vs +0.2641 vs approx +0.4500 | UI copy still quotes +0.366 and 0.8936/0.6295 | n/a | CT-03 still quarantined; website doctrine still leads with +0.3658 |
| Target-Lock 0.976 | Retracted tautology | **Still served** `brm_pipeline_20260328T070235Z.json` + `BrmPipelineWorkspace` | n/a | Live product sandbag (audit D2) |
| Enformer LIVE badge | Retracted | Still `LIVE` in `bm01_evo2.ts` per audit | n/a | Same |
| Ovarian two-door 0–3 | Not in Biomni 8D family | Not in caspro engines | **Wired** `two_door_arbiter.py` + v3 HUMAN_POLICY | Separate track; do not call it “8D” |
| Immuno bag/blood/ICI | Not 8D | Not in caspro ranker | **Wired** contract v3 | Separate track |
| GBM 8D run JSON | Generated 2026-05-08 into backend-v3 docs | **Not in caspro** | n/a | Phantom here |
| Agent 8D D1–D8 | Instructions committed | Not executed as scores in caspro | n/a | Process, not engine |
| Decode-wall D1–D8 | Registry v2 | Typed in `trial-decode-registry.ts` | n/a | Labels only; 25/42 NOT_DECODED |
| PATH A called “cosine” | CAP-06 / CAP-03 CEACAM5 map | `MECHANISM_ALIGNMENT_EXPLAINER` correctly says PATH A is not cosine | n/a | Chat/docs self-contradict |

---

## 7. Sandbag shortcuts (tautology, hardcoded, dropped confounder, synthetic)

| ID | Class | What happened | Path |
|---|---|---|---|
| S1 | TAUTOLOGICAL | `mission_fit_discount` 1.0 vs 0.25 manufactured Target-Lock AUROC 0.976/1.000 | `brm_pipeline_20260328T070235Z.json`; audit A7 |
| S2 | TAUTOLOGICAL | Self-labeled 38-gene × step panel; hold-out AUPRC 0.790 is the honest number | `crispro_ceacam5_capability_map_v1.md` L94–98 |
| S3 | TAUTOLOGICAL-SUBSTITUTION | Manuscript PATH A + Figure 2 PATH B 0.983 > 0.8898 ceiling | `formula_decision_onepager.md` L145–153 |
| S4 | HARDCODED | eligibility=0.75 for all CRC patients and all GBM trial classes | CRC meta; GBM JSON |
| S5 | HARDCODED | CRC `mapk=0.70` fixed for every MSS patient | `crc_ranker_summary.json` L106 |
| S6 | HARDCODED | historical `padj=0.99` placeholders | Iron Leash Gate 7 |
| S7 | HARDCODED | VEGF/efflux boolean → 0.50/0.70 | `patient_vector_builder.py` |
| S8 | DROPPED CONFOUNDER | GSE223499 `Tumor (Not Tumor)` reactive glia; STK11 85.7% vs 23.5% imbalance omitted | Iron Leash Gate 3 |
| S9 | DROPPED CONFOUNDER | Visium mesenchymal scored without separating macrophages (macrophage Δ +0.154) | `gbm_gse174554_canonical_verdict.json` L32 |
| S10 | DROPPED CONFOUNDER | LRP1 TIME-B sink missed in nanocarrier blueprint | Iron Leash Gate 8; MOESM6 |
| S11 | DROPPED CONFOUNDER | LATIFY STK11/KEAP1 collected on every patient (chat/website) but 8D vectors are **hand-set** io=0.75 vs 0.20 rather than a fitted STK11 coefficient; `trial_moa_vectors.json` absent so STK11 is not a recovered feature — it is a story | CAP-03; CT-03 |
| S12 | SYNTHETIC | GBM 8D patient + trial class vectors curated “by mechanism” | `transcript.md` L17750; notebook |
| S13 | SYNTHETIC | Mechanism-alignment UI `DIVERGENCE_CASES` labeled ILLUSTRATIVE, not a cohort | `mechanism-alignment-data.ts` L56–60 |
| S14 | SYNTHETIC / MISINDEX | AF3 `[0=RNA]` assumption; duplex-vs-R-loop narrative; Cas9 omitted | audit A1/A4 |
| S15 | SAND BAG | Agent 3884c4ac SC_MIXED_SIGNAL vs stored all-DOWN | `gbm_gse174554_canonical_verdict.json` L14–21 |
| S16 | SAND BAG | CAP-06 calls PATH A “8D cosine similarity” in the same paragraph as the PATH A formula | `crispro_ceacam5_capability_map_v1.md` L64 |
| S17 | SAND BAG | Dual-canon CRC canonical fit 0.7375 (lab JSON) vs 0.6944 (caspro JSON) | both `crc_ranker_summary*.json` L109 |
| S18 | SAND BAG | caspro still ships tautology JSON as live Target-Lock | audit D2 |
| S19 | INTERNAL CONTRADICTION | TP53 “50% weight” comment vs +0.15 delta | `patient_vector_builder.py` L232–239 |
| S20 | PHANTOM | `8d_vector_run_results.json` not in caspro tree | glob 0 |

---

## 8. OPEN / UNCLEAR table

| ID | UNCLEAR | Assumed-leak if ignored | CLEAR strategy | Owner |
|---|---|---|---|---|
| U1 | Exact `TMB → io` function for the 485-row CRC CSV | Treat io=0.226 at TMB=3.3 as a fitted law | Recover builder script from Brenus `@ c2d90b6` `data/ranker_results/` | **CLOSED 2026-11-03** — approved plan formula `clip(0.20 + (tmb/50.0)*0.40, 0.20, 0.60)` + `fga or 0.2671` falsy-zero rule in `worker-0.ipynb` cell 732 reproduces all 3,880 cells (`0.00e+00`); gated v2 written to `src/data/pharma/crc-ranker-v1/crc_ranker_results_v2_gated.csv` + `crc_ranker_summary_v2_gated.json` |
| U2 | Exact GBM trial-class vectors `t` (only alignments stored) | Reconstruct t from alignment/p | Notebook already started that inversion; original JSON `trial_vectors` key not quoted | **CLOSED (18/18 exact matches) 2026-11-03** — in `8d_vector_run_results.json`, `full_alignment` stores unnormalized `p_i * t_i` (not `p_i * t_i / ‖t‖₂`). Dividing by `p_i` across the 3 profiles recovers exact `t` (`egfr_tkis_erlotinib` adds `her2=0.3` → `‖t‖₂=1.090871`; `checkpoint_CheckMate` has `rss=0.3` → `‖t‖₂=0.948683`) and reproduces all 18/18 fit scores to 4 decimals |
| U3 | `pathway_to_mechanism_vector.py` TP53 50% convention | Trust the comment or the 0.15 | Fix comment in `patient_vector_builder.py` | **CLOSED 2026-11-03** — patched `docs/biomni_lab_downloads_20261103_034902/phase_d_repair/patient_vector_builder.py` L232–240 (`DDR_TP53_ADDITIVE_BOOST_015`: `+0.15 additive DDR boost (not 50% relative reduction; legacy prototype superseded by pathway_8d_ranker.py)`) |
| U4 | Honest Target-Lock 0.6889/0.7478 formula + cascade 7 vs 8 | Website “8 steps” / 0.976 | Quote class-aware composite + reconcile 29-gene × 7-step copy | **CLOSED 2026-11-03** — `CRISPR+Expression+ATAC`, Enformer + `mission_fit_discount` removed; reconciled exact `n_genes=29` (24 observed-only + 5 ATAC mean-imputed; legacy 36/38-gene prose alias noted) × `n_steps=7` cascade steps in `BrmTargetLockPanel.tsx`, `bm01_evo2.ts`, and `brm_pipeline_20260328T070235Z.json` |
| U5 | Gide 0.804 / HR 0.370 / GSE120575 0.877 exact JSON rows | Scratchpad rounding | Line-quote those keys from contract / external_validation_v3 | **CLOSED 2026-11-03** — contract v3 line-quoted below |
| U6 | Cilengitide ZEB1→ITGAV Δ −0.72 FDR 0.001 24/24 | Treat as DepMap glioma fact | Audit local DepMap / worker notebooks; quarantine if unverified | **CLOSED (QUARANTINED) 2026-11-03** — `UNVERIFIED_PROSE_CLAIM_QUARANTINED (no local DepMap glioma CSV receipt)`: `worker-0.ipynb` Cells 129/139/145 computed `ZEB1 -> ITGAV ΔChronos = -0.72, FDR = 0.013` on `n=95` NSCLC lines (`DepMap 24Q4`), NOT `FDR = 0.001` on `24/24` glioma lines |
| U7 | `utils.py` RS-High/RS-Low encoding used for GBM RSS | Treat 0.6/0.4/0.2 as measured cohort biology | Lock as curated archetype constants | **CLOSED 2026-11-03** — annotated in `05`, `06`, `bm01_evo2.ts`, and `brm_pipeline_20260328T070235Z.json` as `LOCKED_CURATED_ARCHETYPE_CONSTANTS (RS-High=0.6, RS-Intermediate=0.4, RS-Low=0.2 in GBM_PROFILE_VECTORS_8D)` |
| U8 | `mechanism_fit_ranker.py` live SHA in crispro-backend-v3 | Assume caspro executes PATH A | Clone backend-v3 or wire moat arbiter | **CLOSED (moat arbiter) 2026-11-03** — executable 8D/7D PATH A + Contraindication Gate wired in `scientist-monai-moat/src/oncology_arbiter/arbiter/pathway_8d_ranker.py` (`33351847…`) + `tests/unit/test_pathway_8d_ranker.py` (`e79e0d8f…`, 5/5 passed) |
| U9 | `trial_moa_vectors.json` contents across 42 registry rows | Approximate LATIFY/Adavosertib/CAPRI | Audit all 42 rows + secondary ATR_DDR/CEACAM5 rescue | **CLOSED 2026-11-03** — wrote `src/data/brenus/all_42_trials_vector_audit_v2.json` (`797eaca7…`): 42/42 registry rows classified (`8 LOCKED_VERIFIED`, `5 APPROXIMATE_QUARANTINED` ATR/DDR, `29 METADATA_ONLY`) + 21 computational vectors locked across repos + secondary `ATR_DDR` / `CEACAM5` rescue quantified on the 327 Gate-2 Cold non-POLE MSS CRC patients |
| U10 | GSE174554 EM-02-C vs board JSON (SC_ESCAPE_NOT_CONFIRMED vs SC_UNDERPOWERED) | Pick one verdict | Dual-canon inside caspro registry vs lab board JSON | Zo-owned CLEAR: they are different analyses (tumor-cell ZEB1 vs bulk-signature EMT); do not merge |
| U11 | dbGaP phs003428 | Pretend access exists | Human blockers remain | Alpha |
| U12 | Vector-Scalpel D1–D11 math | Treat 27/33 scores as computed | Docs say analyst judgment | OPEN |
| U13 | Immuno `0.881` bag AUROC vs blood-compartment `scale=0.881731…` | Conflate two 0.881s | Already separated in F21 vs 3E; keep separate | CLEAR this turn |

U10 CLEAR (executed above): board JSON scores **signature EMT on snRNA spots/cells without requiring ZEB1**; registry EM-02-C scores **ZEB1 in tumor cells**. Different hypotheses. Both can be true at once: underpowered mesenchymal 4/8 AND ZEB1 null.

U13 CLEAR (executed above): Deng Bag_Index_3 AUROC 0.88095 ≠ GSE290722 `scale[load_GNLY]=0.88173`.

---

## 9. Executive reconstruction (what the historical agent actually did)

1. **Ranker math that is real:** PATH A `fit = clip((p·t)/‖t‖₂, 0, 1)` plus `combined = 0.7·elig + 0.3·fit`. PATH B cosine is a second service and is prohibited in outputs. Figure 2’s 0.983 is PATH B leaking into a PATH A manuscript.

2. **8D that is real:** eight pathway axes, RSS opt-in. Patient construction is a pile of labeled-rule deltas, then clip. Scoring itself has **no extra axis weights**.

3. **8D that is a different product:** Agent-8D 0–5 evidence scores; Brenus decode-wall Biology→Systemic domains. Calling all of this “the 8D vector” is how LATIFY CT-03 and website copy stay confused.

4. **CRC ranker that is real as a frozen receipt:** 485 MSS patients × 8 trials, PATH A, elig=0.75, STC-1010 wins only in TMB≥25 n=9. Unselected MSS: STC ranks 3rd/4th in 98.1%. Builder and `t` library are not in caspro.

5. **GBM that is real as datasets:** GSE174554 underpowered; GLASS ZEB1 DOWN. Trial autopsy is literature. 8D GBM run is curated vectors with uniform eligibility and a FALSE_POSITIVE EGFR-TKI hit — same pattern as IMblaze370.

6. **Gates that are real in moat, not in the 8D family:** ovarian 0–3 two-door (strict `>`), immuno three compartments. BrM Iron Leash 1–10 are anti-fraud CI gates, not clinical engines.

7. **Nanocarrier “vector”:** LRP1/ANG-2 + MMP9 blueprint is a delivery idea with a documented off-tumor sink. AF3 does not prove Cas9 RNP catalysis.

No PASS. No “we proved GBM.” Formula count 32. Pathway 8D axes 8. Two extra 8D taxonomies flagged so they cannot be laundered into the ranker.

---

## 10. PART 1 CLOSURE — stored `t`, 485-row anatomy, 17 decoded trials, honest Target-Lock, immuno line-quotes (2026-11-03)

**This-turn receipts (not memory):**
- Approved ranker plan: `docs/biomni_chat_extract/biomni_sess_be00d436f181_user_assistant.json` `plan_markdown` (2026-07-05, Alpha-approved)
- STC-1010 dual `t`: `docs/biomni_lab_downloads_20261103_034902/brenus_vector_master_v2.json` L779–831 + `brenus_repo_intelligence_report.md` L42–43
- IO-CORE 7D `t`: `docs/biomni_lab_downloads_20261103_034902/brenus_data_room/02_scores/path_a_scores.yaml`
- 485-row CSV: `src/data/pharma/crc-ranker-v1/crc_ranker_results_v1.csv` (485 data rows; **no** `p` axis columns)
- GBM plan `t`: `docs/biomni_lab_downloads_20261103_034902/execution_trace/worker-0.ipynb` (cell with `trial_vectors = {…}`)
- Registry: `src/data/brenus/trial_decode_registry_v2.json` (`total_trials=42`; 17 = ATR_DDR 5 + CEACAM5 5 + IO_CORE 7)
- Honest Target-Lock: `docs/biomni_lab_downloads_20261103_034902/FORENSIC_AUDIT_AND_SIGNALS.md` L1702 + `docs/brm.md` L4491–4497
- Immuno: `scientist-monai-moat/src/oncology_arbiter/arbiter/models/zeta_immunotherapy_contract_v3.json`

`canonical_vectors.py` and `mechanism_fit_ranker.py` are **ABSENT** from caspro (glob 0). `trial_moa_vectors.json` remains trade-secret / ABSENT.

### 10A. All stored trial MoA vectors `t` (closes U1 reconstruction + U2/U9 PARTIAL)

Axis order unless noted: `[ddr, mapk, pi3k, vegf, her2, io, efflux, rss]`. PATH A: `fit = clip((p·t)/‖t‖₂, 0, 1)`.

#### 8 CRC ranker trials (8D.v1) — plan `t` verified against 485-row CSV

Source: approved 2026-07-05 plan Step 3 (`user_assistant.json` `plan_markdown`). STC-1010 also locked in `brenus_vector_master_v2.json` `canonical_values.STC1010_trial_vector_ranker`.

| Trial | `t` | ‖t‖₂ | Fit-recon vs 485-row CSV |
|---|---|---|---|
| STC-1010 (ranker / correct) | `[0.10, 0.30, 0.10, 0.20, 0.00, 0.80, 0.10, 0.10]` | **0.9000** | Residual max 1.67e-2 (rss/FGA absent from CSV) |
| STC-1010 (KG v2 / BD, RETIRED) | `[0.10, 0.30, 0.10, 0.30, 0.05, 0.80, 0.10, 0.10]` | **0.9288** | Transcription error; do not use for compute |
| MOSAIC | `[0.00, 0.10, 0.00, 0.10, 0.00, 0.00, 0.30, 0.00]` | **0.3317** | **exact** (max\|err\|=0) |
| N0147 | `[0.00, 0.20, 0.00, 0.10, 0.00, 0.00, 0.30, 0.00]` | **0.3742** | **exact** |
| PRIME | `[0.00, 0.80, 0.10, 0.00, 0.00, 0.00, 0.10, 0.00]` | **0.8124** | **exact** |
| PEAK_FOLFIRI | `[0.00, 0.80, 0.10, 0.00, 0.00, 0.00, 0.10, 0.00]` | **0.8124** | **exact** (identical `t` to PRIME) |
| PACCE | `[0.00, 0.10, 0.00, 0.70, 0.00, 0.00, 0.10, 0.00]` | **0.7141** | **exact** |
| HORIZON_III | `[0.00, 0.00, 0.00, 0.90, 0.00, 0.00, 0.00, 0.00]` | **0.9000** | **exact**; all 485 fits = **0.25** (vegf-only) |
| VELOUR | `[0.00, 0.00, 0.00, 0.80, 0.00, 0.00, 0.10, 0.00]` | **0.8062** | **exact** |

PRIME ≡ PEAK_FOLFIRI is why they tie as best comparator (mean fit 0.7252). Rank deficiency: `mapk/pi3k/vegf/her2` constant across all 485 `p` (see 10B). `rss` does not enter any comparator `t` (all `rss_t=0`), so missing FGA cannot pollute comparator reconstruction.

Canonical patient used for the 0.6944 lock (`brenus_vector_master_v2.json` L832–855): `p = [0.10, 0.70, 0.15, 0.25, 0.05, 0.40, 0.10, 0.10]`.

#### 7 IO-CORE trials (7D — no `rss`) — PATH A lock 2026-05-04

Source: `path_a_scores.yaml`. Patient `P_A = [0.10, 0.70, 0.20, 0.30, 0.00, 0.40, 0.05]`, ‖P_A‖₂=0.8902; `P_B = [0.10, 0.70, 0.20, 0.30, 0.00, 0.10, 0.05]`, ‖P_B‖₂=0.8016.

| Trial | `t` (7D) | ‖t‖₂ | fit_A | fit_B | Δ | Note |
|---|---|---|---|---|---|---|
| QUILT-2.004 | `[0.00, 0.10, 0.05, 0.60, 0.00, 0.70, 0.00]` | 0.9287 | 0.5815 | 0.3553 | 0.2261 | |
| GRANITE GO-010 | `[0.00, 0.05, 0.05, 0.50, 0.00, 0.85, 0.00]` | 0.9887 | 0.5411 | 0.2832 | 0.2579 | TIER2 press-release |
| GVAX+CY+Pembro | `[0.00, 0.05, 0.05, 0.00, 0.00, 0.90, 0.00]` | 0.9028 | 0.4486 | 0.1495 | 0.2991 | |
| **IMblaze370** | `[0.05, 0.85, 0.10, 0.00, 0.00, 0.50, 0.00]` | 0.9925 | **0.8262** | 0.6751 | 0.1511 | **FALSE POSITIVE** — MAPK overlap; OS HR=1.00 |
| AtezoTRIBE | `[0.10, 0.10, 0.05, 0.65, 0.00, 0.70, 0.00]` | 0.9670 | 0.5843 | 0.3671 | 0.2172 | |
| MEDITREME | `[0.10, 0.10, 0.05, 0.00, 0.00, 0.80, 0.00]` | 0.8139 | 0.5037 | 0.2089 | 0.2949 | |
| CCTG CO.26 | `[0.00, 0.00, 0.00, 0.00, 0.00, 0.90, 0.00]` | 0.9000 | 0.4000 | 0.1000 | 0.3000 | Pure IO |

This-turn verify: `fit(P_A, IMblaze370_t) = 0.82622006385` matches locked 0.8262.

#### 6 GBM trial classes (8D) — CLOSED (18/18 exact matches via `full_alignment = p_i * t_i`)

Source: `8d_vector_run_results.json` (`worker-0.ipynb` L30235–30800 & `crispro-backend-v3/docs/manuscripts/8d_vector_run_results.json`). The notebook's audit cell (`cell 73`) mistakenly assumed `full_alignment` stored $p_i t_i / \|t\|_2$ and used a stale draft `t` (`her2=0.0` on EGFR TKI, `rss=0.5` on CheckMate). In fact, `full_alignment` stores the **unnormalized product $p_i t_i$**. Dividing `full_alignment` by $p_i$ across all 3 profiles (`ZEB1_high_KRAS_mut = [0.1, 0.7, 0.4, 0.2, 0.0, 0.4, 0.0, 0.6]`, `EGFR_mut_BrM = [0.1, 0.8, 0.5, 0.1, 0.2, 0.1, 0.3, 0.2]`, `PTEN_null_ZEB1_high = [0.1, 0.5, 0.9, 0.2, 0.0, 0.2, 0.0, 0.4]`) recovers the **exact** run vectors `t` and reproduces **18/18** reported fit scores to 4 decimal places:

| Class | Exact Run `t` (`[ddr, mapk, pi3k, vegf, her2, io, efflux, rss]`) | ‖t‖₂ | `ZEB1_high_KRAS_mut` fit | `EGFR_mut_BrM` fit | `PTEN_null_ZEB1_high` fit |
|---|---|---:|---:|---:|---:|
| `egfr_tkis_erlotinib` | `[0.0, 0.7, 0.5, 0.0, 0.3, 0.0, 0.6, 0.0]` | **1.090871** ($\sqrt{1.19}$) | **0.6325** (`0.69/1.090871`) | **0.9625** (`1.05/1.090871`) | **0.7334** (`0.80/1.090871`) |
| `checkpoint_CheckMate` | `[0.0, 0.0, 0.0, 0.0, 0.0, 0.9, 0.0, 0.3]` | **0.948683** ($\sqrt{0.90}$) | **0.5692** (`0.54/0.948683`) | **0.1581** (`0.15/0.948683`) | **0.3162** (`0.30/0.948683`) |
| `cilengitide_CENTRIC` | `[0.0, 0.1, 0.6, 0.5, 0.0, 0.0, 0.0, 0.0]` | **0.787401** ($\sqrt{0.62}$) | **0.5207** (`0.41/0.787401`) | **0.5461** (`0.43/0.787401`) | **0.8763** (`0.69/0.787401`) |
| `mtor_pi3k_inhibitors` | `[0.0, 0.1, 0.9, 0.0, 0.0, 0.0, 0.0, 0.0]` | **0.905539** ($\sqrt{0.82}$) | **0.4749** (`0.43/0.905539`) | **0.5853** (`0.53/0.905539`) | **0.9497** (`0.86/0.905539`) |
| `rindopepimut_ACTIV` | `[0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.0, 0.0]` | **0.700000** ($\sqrt{0.49}$) | **0.4000** (`0.28/0.700000`) | **0.1000** (`0.07/0.700000`) | **0.2000** (`0.14/0.700000`) |
| `bevacizumab_AVAglio` | `[0.0, 0.0, 0.0, 0.9, 0.0, 0.0, 0.0, 0.0]` | **0.900000** ($\sqrt{0.81}$) | **0.2000** (`0.18/0.900000`) | **0.1000** (`0.09/0.900000`) | **0.2000** (`0.18/0.900000`) |

**U2 is CLOSED.** Under Biological Contraindication Mask $G(p, t)$ (or axis mask $g_{\text{mapk}}=0$ when `KRAS` is mutated downstream of `EGFR`), `egfr_tkis_erlotinib` in `ZEB1_high_KRAS_mut` drops from **0.6325 (#1 FALSE_POSITIVE) → 0.0000 gated / 0.1833 axis-masked (#6 last)**, while preserving `EGFR_mut_BrM = 0.9625` (#1 positive control).

ATR/DDR exact `t` (Berzosertib / Adavosertib / CAPRI / LATIFY / NCT02264678): **UNCLEAR** — `trial_moa_vectors.json` still ABSENT. Registry marks them `APPROXIMATE` / `QUARANTINED` / `N/A`.

### 10B. Anatomy of the 485-row CRC CSV (closes U1)

**File:** `src/data/pharma/crc-ranker-v1/crc_ranker_results_v1.csv`  
**n = 485.** Schema (27 cols; **zero** 8D `p` columns):

`patient_id, tmb, hrd_proxy, aneuploidy_score, stc1010_fit, stc1010_combined, stc1010_rank, best_comparator, best_comp_fit, fit_STC-1010, fit_MOSAIC, fit_N0147, fit_PRIME, fit_PEAK_FOLFIRI, fit_PACCE, fit_HORIZON_III, fit_VELOUR, rank_STC-1010 … rank_VELOUR, best_comp_fit_actual, best_comp_name`

| Input | min | p25 | median | p75 | max | n unique |
|---|---|---|---|---|---|---|
| TMB (mut/Mb) | 0.30 | 2.667 | **3.30** | 4.20 | 382.633 | 165 |
| aneuploidy_score | 1.0 | 9.0 | 13.0 | 20.0 | 31.0 | 31 |
| hrd_proxy | — | — | — | — | — | HRD-Int 225 / Low 150 / High 102 / Unknown 8 |

**Exact mapping (approved plan Step 4; this-turn verified):**

```
ddr    = {HRD-Low: 0.05, HRD-Intermediate: 0.15, HRD-High: 0.35, Unknown: 0.15}   # +0.1 if brca_somatic — field ABSENT in CSV
mapk   = 0.70   # CONSTANT — rank-deficient
pi3k   = 0.15   # CONSTANT
vegf   = 0.25   # CONSTANT
her2   = 0.05   # CONSTANT
io     = clip(0.20 + (tmb / 50.0) * 0.40, 0.20, 0.60)
efflux = clip(aneuploidy_score / 31.0 * 0.30, 0.05, 0.30)
rss    = clip(fraction_genome_altered * 0.40, 0.05, 0.25)   # FGA ABSENT from CSV → STC-1010 residual
```

Reconstructed `p` distributions (rss omitted):

| Axis | min | p25 | median | p75 | max | n unique |
|---|---|---|---|---|---|---|
| ddr | 0.050 | 0.050 | 0.150 | 0.150 | 0.350 | 3 |
| mapk | 0.700 | 0.700 | 0.700 | 0.700 | 0.700 | **1** |
| pi3k | 0.150 | 0.150 | 0.150 | 0.150 | 0.150 | **1** |
| vegf | 0.250 | 0.250 | 0.250 | 0.250 | 0.250 | **1** |
| her2 | 0.050 | 0.050 | 0.050 | 0.050 | 0.050 | **1** |
| io | 0.2024 | 0.2213 | **0.2264** | 0.2336 | 0.6000 | 157 |
| efflux | 0.0500 | 0.0871 | 0.1258 | 0.1935 | 0.3000 | 27 |

**TMB → io checkpoints (formula, not folklore):**
- median TMB 3.3 → io = 0.20 + 3.3/50×0.40 = **0.2264** (matches `crc_ranker_summary.json` “median TMB=3.3 → io=0.226”)
- io ≥ 0.40 iff TMB ≥ 25 → **n=9**; all 9 hit the **0.60 cap** (TMB 102–382)
- STC-1010 beats PRIME at io ≥ 0.44 → TMB ≈ 30.1 (io=0.4408). **Zero patients in TMB 25–50.**
- Combined ranker: `combined = 0.7 × 0.75 + 0.3 × fit` (eligibility hardcoded 0.75)

Cannot invert 8 CRC `t` from the CSV alone: `p` axes not stored, and 4/8 axes are constant (rank-deficient design matrix). Recovery required the approved plan + exact fit match on the 7 comparators.

### 10C. The 17 decoded trials (ATR_DDR + CEACAM5 + IO_CORE)

Registry has **42** rows. The 17 with a decode-wall `8d_primary_domain` in the three decoded programs:

| trial_id | indication | 8d_primary_domain | clinical outcome / HR | stored_delta_fit | root_cause_of_failure |
|---|---|---|---|---|---|
| NCT02595892 Berzosertib | Ovarian expansion | D2 Selection | ORR 17%; RS-High 40% vs RS-Low 5% | 0.138 (DOCUMENTED_NOT_REPRODUCED, dir FALSE) | RS-saturated patients unresponsive; ITT diluted |
| NCT03579316 Adavosertib | PROC | D2 Selection | ORR 23% PTEN-intact vs 0% PTEN-loss; PFS HR 0.55 vs 1.82 | 0.307 (dir TRUE) | PTEN-loss bypasses WEE1 |
| NCT03462342 CAPRI | PROC | D2 Selection | ORR 36% PARPi-naïve vs 4% post-PARPi; PFS HR 0.42 vs 1.31 | 0.108 (dir FALSE) | Post-PARPi efflux |
| NCT05450692 LATIFY | IO-refractory NSCLC | D2 Selection | STK11/KEAP1-loss benefit; intact did not | **QUARANTINED** | Unselected enrollment |
| NCT02264678 Ceralasertib+Olaparib | Advanced solid tumors | D2 Selection | NOT STATED | N/A | Patient B vector undefined |
| NCT04154956 CARMEN-LC03 | 2L+ nsNSCLC CEACAM5 IHC≥50% | D2 Selection | PFS HR 1.14 (P=0.8204); 5.4 vs 5.9 mo | N/A — CEACAM5 | IHC prognostic not predictive; threshold too low |
| NCT05464030 PROCEADE-CRC-01 | 3L+ irinotecan-ref mCRC | D2 Selection | ORR 7.5% (3/40); mPFS 5.9 mo | N/A — CEACAM5 | No predictive biomarker |
| NCT01270698 IMMU-130 | 3L+ prior-irinotecan mCRC | D1 Biology | ORR 1.2%; mPFS 3.6; mOS 6.9 | N/A — CEACAM5 | SN-38 = prior irinotecan (D1) |
| NCT04826003 Cibisatamab | 3L+ pMMR/MSS mCRC | D1 Biology | ORR 13.5%; CRS 57.7% | N/A — CEACAM5 | PD immune activation ≠ regression; on-target GI tox |
| NCT06131840 SGN-CEACAM5C | Solid tumors incl CRC | D8 Systemic | EU clinical hold | N/A — CEACAM5 | Regulatory hold; shared VKG+Topo1i |
| NCT03050814 QUILT-2.004 | 1L MSS/pMMR mCRC | D1 Biology | PFS HR 1.061 p=0.91; terminated | PATH-A Δ 0.2261 (yaml, not registry) | CEA T cells suppressed in TME |
| NCT05141721 GRANITE | 1L MSS maintenance | D2 Selection | HR 0.73 (90% CI 0.44–1.21) | PATH-A Δ 0.2579 | NeoAg T cells insufficient unselected |
| NCT02981524 GVAX+CY+Pembro | Refractory MSS mCRC | D1 Biology | ORR 0% (0/22) | PATH-A Δ 0.2991 | Peripheral T cells ≠ tumor regression |
| NCT02788279 IMblaze370 | 3L+ MSS mCRC | D1 Biology | OS 8.87 vs 8.51 mo; no Δ | PATH-A Δ 0.1511; fit_A **0.8262 FALSE+** | MEKi failed to convert MSS |
| NCT03721653 AtezoTRIBE | 1L mCRC | D2 Selection | ITT PFS HR 0.69; pMMR HR 0.86 NS | PATH-A Δ 0.2172 | Signal only in immune-inflamed ~20–30% |
| NCT03202758 MEDITREME | 1L MSS mCRC | D3 Architecture | mPFS 8.2; ORR 64.5%; no control | PATH-A Δ 0.2949 | Single-arm; IO unattributable vs FOLFOX |
| NCT02870920 CO.26 | Refractory MSS mCRC | D2 Selection | OS HR 0.73 p=0.07; pTMB≥28 HR 0.34 | PATH-A Δ 0.3000 | Broad enrollment; liver mets abolish benefit |

IO-CORE registry rows do **not** store `delta_approx`. Deltas above are from `path_a_scores.yaml`, not the registry key.

### 10D. Clean non-tautological Target-Lock (closes U4 formula)

`01_CLEAN_SIGNALS_AND_MOLECULAR_TRUTH.md` L17 keeps `0.6889` / `0.7478` and points at `report_evo2_nanocarrier_audit.md`. **That audit file does not contain 0.6889** (this-turn Grep 0). Live quotes:

**FORENSIC_AUDIT_AND_SIGNALS.md L1701–1702 (verbatim):**
> Unleaked 3-Modality Composite (`CRISPR + Expression + ATAC`, Enformer removed, `mission_fit_discount` removed): `AUROC = 0.6889` (`36`-gene benchmark) / `0.7478` (`24` observed-only genes).

**`docs/brm.md` L4491–4497 (class-aware composite locked from `class_aware_composite_final.json`):**
```
TSG: (0.60 × abs_crispr + 0.20 × atac + 0.15 × evo2) / 0.95
ONC: (0.25 × abs_crispr + 0.35 × atac + 0.20 × evo2) / 0.80
Enformer weight = 0 (AUROC=0.41, endpoint broken)
signals min-max normalized across the 29-gene panel jointly
5 missing ATAC genes (MMP2, CXCR4, STAT3, KRAS, MAPK1) receive mean imputation
Assassin Score: 0.37×Efficacy + 0.30×Safety + 0.30×Mission + 0.03×Structure
Mission-fit is post-hoc metadata only — never baked into the score
```

**Dual-canon (do not collapse):** FORENSIC says **36-gene / 24 observed**; `brm.md` says **29-gene panel** AUROC 0.6889 ± 0.005. Same headline float, different n. `class_aware_composite_final.json` is **not** in caspro this turn.

**Top-ranked genes that survive the clean dossier** (`01_CLEAN` §3.1 / Chafe 2025):
- **BACE1** — Tier 1 Actionable (`tumor_like` LFC +1.0688; DepMap NON_ESSENTIAL Chronos −0.068)
- **FAM72A** — Tier 2 Trending RNA (LFC +1.0536, padj 0.0605; baseMean 22.39)
- **NOM1** — Biomarker only (COMMON_ESSENTIAL, Chronos −0.725, 82.5% pan-lethal) — **not** a therapeutic target
- Retracted as oncogene targets: PTPRC, SENP8, SLC45A4, ATP10D, TFEB, SLC25A32 (RNA-null / wrong-direction)

### 10E. `zeta_immunotherapy_contract_v3.json` line-quotes (closes U5)

File: `/Users/fahadkiani/Desktop/development/scientist-monai-moat/src/oncology_arbiter/arbiter/models/zeta_immunotherapy_contract_v3.json`

**Gide pretreatment response AUROC 0.804** (`gide_pretreatment_metrics.ZNF683_GNLY_effector_response`, L952–969):
```
"cohort": "Gide_PRJEB23709",
"timepoint": "pretreatment",
"n": 41.0, "responders": 19.0, "nonresponders": 22.0,
"auroc": 0.8038277512,
"ci_low": 0.6483253589, "ci_high": 0.9258461495,
"p": 0.0009421334
```

**Gide OS HR 0.370** (`ZNF683_GNLY_effector_OS`, L970–998):
```
"cohort": "Gide_antiPD1_monotherapy",
"n": 41, "events": 24,
"hr": 0.369656981096761,
"ci_low": 0.19494152718843, "ci_high": 0.700960363060504,
"wald_p": 0.002301604062677
```

**Riaz 0.700** (`riaz_on_treatment_metrics.ZNF683_GNLY_effector_response`, L1306–1322):
```
"cohort": "Riaz_GSE91061",
"timepoint": "on_treatment",
"n": 55.0, "responders": 13.0, "nonresponders": 42.0,
"auroc": 0.6996336996,
"ci_low": 0.5256410256, "ci_high": 0.8533064738,
"p": 0.0315976954
```

**TCGA-SKCM HR 0.718** (`tcga_skcm_metrics.ZNF683_GNLY_effector_OS_age_stage_adjusted`, L1381–1408):
```
"cohort": "TCGA_SKCM",
"model": "age_stage_adjusted",
"n": 390.0, "events": 191.0,
"hr": 0.7179485941,
"hr_low": 0.6195341899, "hr_high": 0.8319963484,
"cox_p": 1.05721e-05
```
Univariate OS HR is **0.7466500094** (n=425) — do not swap for 0.718.

**GSE120575 0.877** (L950–951):
```
"single_cell_internal_tcell_ratios_cv_auroc": 0.8766666666666667,
"single_cell_internal_tcell_ratios_cv_auroc_rounded": 0.877
```

### 10F. PART 2 prep (truncated tail: “io was driven by TMB (median TMB =”)

Ready when Alpha drops the rest. On-disk facts already staged:

1. **Legacy 485-row `io` is TMB-only.** Formula in 10B. Median TMB = **3.3** → io = **0.2264**. No Immunoscore, no pTMB, no liver-met, no CPS in that CSV.
2. **`io` beyond TMB exists in a different builder:** `docs/biomni_lab_downloads_20261103_034902/phase_d_repair/patient_vector_builder.py` L595–663 — additive deltas, not the linear TMB map:
   - MSI-H + lineage-ok → tissue-agnostic IO
   - TMB ≥ 10 + lineage-ok → `io += 0.35`
   - pTMB ≥ 28 + lineage ∈ {crc, gastric} → `io += 0.30` (CO.26)
   - These rules were **not** applied to the 485-row table.
3. **`mechanism_fit_ranker.py`:** cited as `crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py` (transcript L3809; plan Step 5). **File not in caspro.** Formula locked: PATH A + `combined = 0.7·elig + 0.3·fit`, elig=0.75.
4. **IMblaze370 0.8262:** reconstructed this turn from yaml `t` + `P_A`. Gate 2 in chat (`transcript.md` L30813): `mechanism_validity FALSIFIED-MSS (OS HR=1.00 at Phase III)` — alignment is necessary, Phase III falsification is the second gate.
5. **EGFR TKI in KRAS-mut 0.6325:** **CLOSED (18/18 exact matches).** Exact run `t = [0.0, 0.7, 0.5, 0.0, 0.3, 0.0, 0.6, 0.0]` ($\|t\|_2 = \sqrt{1.19} = 1.090871$) recovered from `full_alignment = p_i * t_i` in `8d_vector_run_results.json`. Contraindication gate $G(p,t)=0$ (or axis mask $g_{\text{mapk}}=0 \implies 0.1833$) eliminates the `0.6325` false positive while preserving `EGFR_mut_BrM = 0.9625` (#1).
6. **PART 2 Gated Ranker Artifacts Landed (2026-11-03):**
   - `src/data/pharma/crc-ranker-v1/crc_ranker_results_v2_gated.csv` (sha256 `05971fa3…`, 485 rows × 63 cols; joins `coadread_tcga_pan_can_atlas_2018_enriched_v1.json` FGA/BRCA + `cbioportal_crc_unified.csv` `KRAS/NRAS/BRAF` + `tcga_coad_immune_scores.csv` RNA immune score + `BreAK_CRC-001_stress_cohort_records.csv` CMS/Gate-2; preserves legacy v1 CSV `29e31a66…` untouched).
   - `src/data/pharma/crc-ranker-v1/crc_ranker_summary_v2_gated.json` (sha256 `b59d9e37…`; documents exact 3,880/3,880 cell reproduction of v1 via the cell 732 `fga or 0.2671` falsy-zero rule on `TCGA-AA-A03F`, `TCGA-AG-3878`, `TCGA-AH-6547`, `TCGA-CA-6717`; before-vs-after false-positive gating for `IMblaze370`, `EGFR TKI`, `PRIME/PEAK`, `PACCE`; and `STC-1010` Rank #1 shift in non-POLE `TMB < 10` MSS CRC from `0/473 [0.00%]` in legacy v1 to `449/473 [94.93%]` in Mode `iii-A`, `273/473 [57.72%]` in Mode `iii-B`, and `146/146 [100.00%]` of Gate-2 Immune-Hot [`146/473 = 30.87%`] vs `0/327 [0.00%]` Immune-Cold in Mode `iii-C`).
   - Retracted `0.976` `mission_fit_discount` label-leak quarantined in `src/data/evo2/brm_pipeline_20260328T070235Z.json` (`db98080e…`), `src/data/tumor-board/anchor/bm01_evo2.ts` (`13fc62a4…`), and `src/components/tumor-board/anchor/BrmTargetLockPanel.tsx` (`a4b546fc…`) (`RETRACTED_LABEL_LEAK_QUARANTINED`; honest class-aware `0.6889` all-gene / `0.7478` 24-observed surfaced; Enformer marked `DISABLED_DEFAULT_0.5`).
   - Executable Python 8D/7D ranker wired in `scientist-monai-moat`: `src/oncology_arbiter/arbiter/pathway_8d_ranker.py` (sha256 `3335184774f6493e6f812dd7e3c8908b0e590d7c70092e7e53fe3f3a4b50dc9e`) + `tests/unit/test_pathway_8d_ranker.py` (sha256 `e79e0d8fac6f252d108482a9a1b637b321ddc81b3f4fc3ef031b401c34988d6d`; `5/5` pytest passed in `0.28s`).
   - Full 42-trial vector & gate audit written to `src/data/brenus/all_42_trials_vector_audit_v2.json` (sha256 `797eaca7738adfb3caf044331d31b6234bc8373d88ac15b727cce8ee8e2e5408`; `8 LOCKED_VERIFIED`, `5 APPROXIMATE_QUARANTINED` ATR/DDR, `29 METADATA_ONLY`, plus `21` computational vectors locked across repos and secondary `ATR_DDR` / `CEACAM5` rescue quantified on the `327` Gate-2 Cold non-POLE MSS CRC patients).
   - `U3` closed in `patient_vector_builder.py` (`+0.15 additive DDR boost`); `U4` closed across `BrmTargetLockPanel.tsx`/`bm01_evo2.ts`/`brm_pipeline_20260328T070235Z.json` (`n_genes=29` × `n_steps=7`); `U6` quarantined as `UNVERIFIED_PROSE_CLAIM_QUARANTINED (no local DepMap glioma CSV receipt; worker-0.ipynb computed ΔChronos=-0.72, FDR=0.013 on n=95 NSCLC lines)`; `U7` locked as `LOCKED_CURATED_ARCHETYPE_CONSTANTS (RS-High=0.6, RS-Intermediate=0.4, RS-Low=0.2 in GBM_PROFILE_VECTORS_8D)`.

No PASS. **9 / 9 (`U1–U9`) CLOSED.**
