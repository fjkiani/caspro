# MBD4-LOF Synthetic-Lethality Framework — Production Wiring Report

**Status:** `MBD4_LOF_SL_FRAMEWORK_v2.0` · wired into crispro-backend-v2 and crispro-backend-v3
**Scope:** RUO — Research Use Only. Not a clinical guideline. No clinical efficacy claim.
**Anchor module:** `github.com/fjkiani/Synthetic-Lethality :: 00-mbd4-manuscript/mbd4_parp_response`
**Shared evidence pack:** `mbd4_sl_evidence.json` v2.0.0 (byte-identical in both backends)
**Framework:** canonical `ManagerEvidenceTier` (Tier 1–5) — the same five-tier evidence framework the backend already ships
**Data:** DepMap 24Q2 · GDSC2 (release 8.5) · published isogenic (Chabot et al. 2022)

---

## 0. What this run did (one paragraph)

I mapped the MBD4-LOF synthetic-lethality evidence onto the platform's **canonical
five-tier evidence framework** (`ManagerEvidenceTier`, Tier 1–5), generated a
versioned evidence pack from the anchor module's receipts on that schema, and
wired the pack into **both** backends as a shared contract — a new loader, policy
entries, a mechanism-fit DDR decomposition, a corrected resistance registry, and
an augmented MBD4 rule engine. Each axis carries its **canonical tier**, plus two
documented refinement fields (`preclinical_strength`, `evidence_status`) that
capture within-tier nuance and refutation without inventing new tiers. The work
**augments** (does not replace) the existing HGSOC CN-armor capability, and it
**corrects a falsified claim** that was live in both backends.

## 0a. Correction of a prior over-tiering (read first)

An earlier version of this work expressed MBD4 evidence in a **bespoke, parallel
6-rung ladder** (`GOLD_STANDARD_SL_RUO`, `PRECLINICAL_INVITRO_RUO`,
`MECHANISTIC_CANDIDATE_RUO`, `BIOMARKER_SELECTION_RUO`, plus `HYPOTHESIS` and
`FALSIFIED`) with a `MAX_DRUG_EFFICACY_TIER` cap, and described axes as ranking
*"above HYPOTHESIS."* That was the wrong call: the task was to apply the **same
5-tier framework the backend already uses**, not to invent a new one. The rogue
ladder also implied more actionability than the evidence supports.

This report re-maps MBD4 onto the canonical `ManagerEvidenceTier`. The honest
consequence is that the MBD4 tiers are **lower**, not higher:

- **All MBD4 *drug* axes are preclinical/cell-line evidence → TIER_5.** A
  significant cell-line screen (ATR, p=0.021) is still preclinical; it does **not**
  earn TIER_3, which requires a *clinical* cohort.
- **Only the patient-derived PARP1-expression association reaches TIER_4** (a human
  expression association, still not trial-predictive).
- **FALSIFIED / NULL are statuses, never tiers.** A refuted claim is not a
  weak-but-real TIER_5; it is excluded from being surfaced as a treatment.

The within-tier nuance the clinical ladder cannot express (causal-isogenic vs
screen-significant vs trend) is carried in a documented refinement enum,
`preclinical_strength`; refutation is carried in `evidence_status`.

## 1. The scientific correction (why this matters)

Both backends carried a resistance-registry stub asserting:

> `"MBD4 loss confers PARP sensitivity"` via `"BER deficiency → PARP trapping"` (effect: SENSITIVITY)

That MBD4-specific transcriptional mechanism is **falsified** by the anchor
module's receipts:

- **PARP1 is not upregulated in MBD4-LOF** — median 6.770 vs 6.656, two-sided
  Mann-Whitney U **p=0.605** (n=19 LOF vs 1498 comparator). The RNF144A
  degradation bridge is also null (p=0.476).
- **Genome-wide CRISPR dependency scan is null after FDR** — 0/17,453 genes pass
  FDR<0.25 (n=7 MBD4-LOF vs 1,179 WT); PARP1 dependency Δ=0.031, p=0.675,
  FDR≈1.0. The MBD4-LOF vulnerability is a **drug-response** phenotype, not a
  genetic dependency.

The receipt-backed actionable vulnerabilities are instead **replication-stress /
ATR checkpoint dependency** and **cytidine-analog synthetic lethality**. PARP is
repositioned as a **PARP1-expression selection biomarker**, genetically
independent of MBD4.

## 2. The evidence, on the canonical five-tier framework

Three fields per axis: `manager_evidence_tier` (canonical Tier 1–5, primary),
`preclinical_strength` (refinement enum, **not** a tier), `evidence_status`
(`VALID | FALSIFIED | NULL`).

| Axis / claim | `manager_evidence_tier` | `preclinical_strength` | `evidence_status` | Receipt basis |
|---|---|---|---|---|
| **Cytidine-analog SL** (gemcitabine/cytarabine) | **TIER_5** | `CAUSAL_ISOGENIC` | `VALID` | Isogenic MBD4-KO + rescue; gemcitabine ~10x (IC50 2.3 nM KO vs 20.1 nM WT, P=2.82e-3). Chabot et al. 2022. Strongest *preclinical* class — still preclinical → TIER_5. |
| **ATR checkpoint dependency** (ceralasertib) | **TIER_5** | `SCREEN_SIGNIFICANT_MULTITEST` | `VALID` | MBD4 True-LOF more sensitive: LN_IC50 Δ=−0.732, p=0.0215, Cohen's d=−0.503 (n=14 LOF vs 914 WT). Survives 4 orthogonal stress tests. Cell-line panel → TIER_5. |
| **WEE1 checkpoint** (adavosertib) | **TIER_5** | `SCREEN_TREND_NS` | `VALID` | Directional but non-significant: LN_IC50 Δ=−0.508, p=0.074, d=−0.359 (n=15 vs 920). Trend only → TIER_5. |
| **PARP1 expression → PARPi** (pan-cancer) | **TIER_4** | `HUMAN_ASSOC_EXPRESSION` | `VALID` | Spearman ρ=−0.416, p=1.4e-21 (n=481). Patient-derived expression association, independent of MBD4 → TIER_4, selection biomarker only. |
| **MBD4 → PARP1 transcriptional upregulation** | TIER_5 | — | **FALSIFIED** | Two-sided MWU p=0.605; RNF144A p=0.476. Refuted → status FALSIFIED, never surfaced as a treatment. |
| **MBD4-LOF genetic dependency (CRISPR)** | TIER_5 | — | **NULL** | 0/17,453 genes pass FDR<0.25. Null → status NULL. |

**Boundary enforced in code:** no MBD4 drug axis exceeds TIER_5; only the
patient-derived PARP1-expression association reaches TIER_4. The
PARP-trapping-via-MBD4 axis can never be rendered as sensitive: its status is
`FALSIFIED`, and the PARPi axis that *is* allowed is gated on **PARP1 expression**,
not MBD4. A loader guard (`_guard_parp()`) forces the PARP selection axis back to
the canonical **TIER_4** even if the pack is tampered.

### 2.1 The ATR signal is robust to confounding (4 orthogonal stress tests)

The ceralasertib signal is not an MSI-H or TP53 artifact and does not hinge on any
single cell line (this is what earns `preclinical_strength = SCREEN_SIGNIFICANT_MULTITEST`
*within* TIER_5 — it does not raise the tier):

| Stress test | n (LOF/WT) | p | Δ LN_IC50 | Cohen's d |
|---|---|---|---|---|
| MSI-H purged | 10 / 906 | 0.0153 | −0.910 | −0.623 |
| TP53-stratified | 11 / 619 | 0.0030 | −1.069 | −0.740 |
| Lineage (non-Bowel) | 9 / 873 | 0.0253 | −0.871 | −0.599 |
| Leave-one-out (14 iterations) | — | max p = 0.0452 (all <0.05) | — | — |

(The Bowel-lineage subset n=5/41 is underpowered, p=0.126, and is **not** used as a
passing test — reported for honesty.)

## 3. The framework applied (canonical, per correction)

`build_mbd4_sl_framework.py` (`FRAMEWORK_VERSION = "2.0.0"`) — a self-contained,
self-validating generator that emits the pack on the **canonical** schema:

- **Canonical tiers:** `TIER_DEFINITIONS` quotes the platform `ManagerEvidenceTier`
  (Tier 1–5) verbatim as provenance; the pack's `tier_framework` block names
  `ManagerEvidenceTier` as the source. There is **no** `TIER_LADDER`, no
  `MAX_DRUG_EFFICACY_TIER`, no `GOLD_STANDARD_TIER`.
- **Refinement axes:** `PRECLINICAL_STRENGTH_LADDER`
  (`NONE < SCREEN_TREND_NS < SCREEN_SIGNIFICANT_MULTITEST < HUMAN_ASSOC_EXPRESSION < CAUSAL_ISOGENIC`)
  and `EVIDENCE_STATUSES` (`VALID | FALSIFIED | NULL`) carry within-tier nuance and
  refutation.
- **Self-validation:** `validate()` raises on drift — every axis tier must be a
  canonical `TIER_1..TIER_5`; every `FALSIFIED` item must carry
  `evidence_status=FALSIFIED` and no positive drug axis; PARP-trapping-via-MBD4 must
  be FALSIFIED; `parp_biomarker_selection` must be TIER_4 keyed on
  `PARP1_EXPRESSION_HIGH` (not MBD4). The generator refuses to emit an invalid pack.
- **Provenance:** MD5 of every source receipt embedded in the pack.
- **Tests:** `test_mbd4_sl_framework.py` — 26 tests, all pass, including explicit
  guards that the rogue ladder symbols do **not** reappear.

The generated archetype `MBD4_LOF_BER_DEFECTIVE`: trigger = MBD4 LikelyLoF /
CpG>TpG hypermutator; up-weight = {ATR replication-stress, cytidine-analog SL};
biomarker-only = {PARP selection}; down-weight = {} (nothing is falsely penalized).

## 4. How it is wired into the backends

**Shared contract (byte-identical, md5-verified):**
`api/contracts/mbd4_sl/` (v2) and `layer0_contracts/mbd4_sl/` (v3) — the JSON pack
plus 3 CSVs.

**crispro-backend-v2:**
- `sl_therapy_bridge/mbd4_lof_targeting.py` — loader: conservative MBD4-LOF
  classification (a missense VUS does **not** qualify); per-axis canonical tier +
  `preclinical_strength` + `evidence_status`; a `_guard_parp()` that forces the
  PARP axis back to the canonical **TIER_4** even if the pack were tampered.
- `resistance_prophet/constants.py` — the falsified MBD4 stub **corrected** to the
  receipt-backed mechanism (ATRi + cytidine at TIER_5 with their preclinical-strength
  refinements), with the falsification recorded as a status, not silently dropped.
- `sl_therapy_bridge/policy_engine.py` — `CYTIDINE_ANALOG` added to therapy-class
  inference (gemcitabine/cytarabine were previously uncovered); MBD4-LOF policy
  overlay: PARP flagged `MBD4_LOF_PARP_NOT_SL_BIOMARKER_ONLY`, ATR/cytidine flagged
  `MBD4_LOF_AXIS_PRIORITIZE`.
- `api/contracts/resistance_builders.py` — the SL→manager seam
  (`_map_sl_evidence_tier_to_manager_tier`) passes the canonical `TIER_x` strings
  through to `ManagerEvidenceTier`; action-card assembly **excludes** any axis whose
  `evidence_status` is `FALSIFIED`/`NULL` (a refuted axis is never surfaced as a
  treatment).

**crispro-backend-v3:**
- `sl_therapy_bridge/mbd4_lof_targeting.py` — same loader (path-adjusted).
  v3 namespacing note: the canonical `TIER_1..TIER_5` strings are **evidence**
  tiers, deliberately distinct from v3's SPE subgroup symbols
  (`TIER_1_TRIPLE` / `TIER_2_DUAL` / `TIER_3_NONE`); no SPE symbol is reused.
- `sl_therapy_bridge/policy_engine.py` — MBD4-LOF entries added to `SL_THERAPY_MAP`
  carrying the canonical tier in the `evidence_tier` slot (`TIER_5` for drug axes,
  `TIER_4` for PARP1-expression) with `preclinical_strength` / `evidence_status`
  encoded in the mandatory-disclosure slot; PARP-on-MBD4 disclosed as
  `status=FALSIFIED`.
- `mechanism_fit/pathway_to_mechanism_vector.py` — `differentiate_ddr_subpathways_mbd4_lof()`:
  an MBD4-LOF-gated DDR decomposition carrying per-axis canonical tiers plus
  `subpathway_preclinical_strength` and `subpathway_evidence_status`, up-weighting
  ATR + cytidine, PARP biomarker-only. Returns `None` for non-MBD4 patients
  (regression-safe).
- `resistance_prophet/constants.py` — same registry correction as v2.
- `mbd4_module.py` — the pipeline's existing MBD4 rule engine **augmented** with
  **Axis D (ATR replication-stress dependency)** — the receipt-backed drug-response
  axis it previously lacked — whose receipt now carries
  `manager_evidence_tier=TIER_5` + `preclinical_strength` + `evidence_status`, plus
  a `parp_mechanism_note` recording the PARP falsification. Existing axes A/B/C
  unchanged.

## 5. Test + regression status (proven, not asserted)

| Backend | New MBD4 tests | Result | Pre-existing failures (clean baseline) | With my changes | New failures |
|---|---|---|---|---|---|
| Framework generator | 26 | pass | — | — | 0 |
| v2 (targeting 28 + contract 26) | 54 | pass | 20 (SQLite/env fixtures) | 20 | **0** |
| v3 (targeting 29 + mbd4_module 11 + contract 26) | 66 | pass | 7 fail + 7 collection errors (missing deps) | 7 + 7 | **0** |

Regression was proven by stashing my changes and running the identical suites on
the clean tree: the failure sets are **identical** before and after (SQLite
fixtures, ctDNA env stubs, KELIM harness in v2; io_engine / therapy_fit brm_bundle
and `sl_agent`-missing collection errors in v3 — all unrelated to MBD4). Armor
regression: **v2 18/18, v3 17/17** armor targeting still green (plus v3 50/50 across
armor/DDR/mechanism-fit). Every new MBD4 test suite includes explicit regression
guards asserting the rogue ladder symbols and tokens do not reappear.

## 6. Governance carried through (unchanged)

- **RUO invariant** emitted on the pack and on every consumer response.
- **No efficacy leak:** no axis carries a clinical efficacy or resistant/sensitive
  drug label; enforced by unit tests (efficacy-claim phrase bans + structured
  `efficacy_claim=False`).
- **PARP is never an MBD4-SL target** — falsified mechanism recorded as a status;
  PARP retained only as a TIER_4 PARP1-expression selection biomarker.
- **AUGMENT, not replace:** the HGSOC CN-armor pack and wiring are fully intact;
  MBD4-LOF is an independent, additive archetype. Both coexist and converge on
  ATR / replication-stress.
- Prior governance holds: LATIFY deltas quarantined, DDR 0.983 quarantined
  (DL-07), PATH A the locked production ranker (PATH B prohibited).

## 7. What would raise a tier (pre-specified proof path)

- **ATR (TIER_5 → TIER_3/2):** an MBD4-LOF-annotated *clinical cohort* with
  ATR-inhibitor response / PFS; success = effect CI excludes null in the LOF
  stratum with a pinned receipt (TIER_3), or an RCT (TIER_2). Until a clinical
  cohort exists it stays TIER_5 (its preclinical strength is already
  `SCREEN_SIGNIFICANT_MULTITEST`).
- **WEE1 (strengthen within TIER_5):** a larger MBD4-LOF panel powering the
  adavosertib shift below p=0.05 would move `preclinical_strength` from
  `SCREEN_TREND_NS` to `SCREEN_SIGNIFICANT_MULTITEST` — still TIER_5 until clinical
  data exist.
- **Cytidine:** already causal-isogenic (the top preclinical strength); a clinical
  MBD4-LOF cytidine cohort would move it from TIER_5 toward a clinical tier.

---
*RUO — Research Use Only. Not cleared for clinical decision-making. Every headline
number traces to a receipt JSON in the anchor module
(`00-mbd4-manuscript/mbd4_parp_response/artifacts/`), MD5-pinned in the evidence
pack's `provenance_receipts`.*