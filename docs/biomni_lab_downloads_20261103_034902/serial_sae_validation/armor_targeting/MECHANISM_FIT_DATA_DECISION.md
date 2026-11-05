# Mechanism-Fit Data Decision — Armor Targeting (HGSOC)

**Status:** `ARMOR_ASSOCIATION_VALIDATED_RUO` · `ARMOR_DRUG_AXES_HYPOTHESIS` · `DRUG_RESPONSE_BENCHMARK_DATA_BLOCKED`
**Scope:** RUO — Research Use Only. Not a clinical guideline. No efficacy claim.
**Evidence pack:** `armor_targeting_evidence.json` v1.0.0
**Supersedes:** prior `ENGINE_VALIDATION_BLOCKED_DATA_INSUFFICIENT` (EGA no-key / PDS 401 / Synapse 403).

---

## 1. Decision in one paragraph

The mechanism-fit "armor" capability targets the HGSOC pre-treatment copy-number
state (HR-proficient / CCNE1-amplified / replication-stress-tolerant) that our
reproduced finding associates with platinum resistance and worse overall survival
**at diagnosis, before selection**. That *association* is validated on a real
cohort and earns a tier. The *therapeutic corollary* — which drug beats the armor
(ATR / WEE1 / CHK1 / CDK2 / PKMYT1) — is **not** proven by our cohorts and is
wired strictly at `HYPOTHESIS`. It stays there until an independent HGSOC cohort
that is CCNE1/HR-annotated **and** carries ATR/WEE1/CDK2i drug-response is
available. As of this decision, no such authorized cohort exists.

## 2. What the finding proves vs. hypothesizes (the boundary enforced in code)

| Claim | Status | Tier | Basis |
|---|---|---|---|
| CCNE1-amp / HR-proficient at diagnosis ↔ platinum resistance & worse OS | **PROVEN (association/prognostic)** | `COHORT_VALIDATED_RUO` | BriTROC-1 n=98 dx (20 resistant); CCNE1 amplification OR **4.347**, Fisher **p=0.0233**; s3/HRD-axis at dx AUROC 0.729 (stored 0.2715, inverted), BH-q=0.012; adj OS HR 0.6989 (p=0.0431) |
| Which drug beats the armor (ATR/WEE1/CHK1/CDK2/PKMYT1) | **HYPOTHESIS** | `HYPOTHESIS` | Mechanism + curated literature only; **no drug-response cohort** |
| Clonal bottleneck selects an *emergent* armor state | **Rejected (clean negative)** | — | GSE165897 11 pairs: CCNE1 Δ p=0.7646 (q=0.7646); armor is pre-existing, not selected |

The drug axes can **never** be rendered above `HYPOTHESIS` and never carry an
efficacy or resistant/sensitive drug label. This is enforced by unit tests in
both backends (`test_armor_targeting_v2.py`, `test_armor_targeting_v3.py`).

## 3. Data-access reality (authoritative, receipted)

Receipt: `receipts/zetabridge_receipts.json` (generated 2026-07-26).

| Source | Status | Detail |
|---|---|---|
| **EGA** | **AUTHORIZED (byte-proven)** | Account authoritatively entitled to **exactly 1 dataset: `EGAD00001011049`** (BriTROC-1 shallow-WGS CN, DAC EGAC00001000388). `authorized-datasets` HTTP 200, `n_authorized=1`; files listing 679 authorized BAMs, `access:authorized`. |
| EGA byte-proof | **PASS** | File `EGAF00008095623` (JBLAB-4927.bam, 698,709,769 bytes; published full-file MD5 `a9430a9b58057f11f45351433ba8c067`): access-probe `can_download:true`, `byte_probe_status:206`; capped ≤1 MB ranged pull HTTP 200, prefix MD5 `b41f151168f0b77d137f255fae28241c`, BAM magic confirmed. Proves authorized byte egress. |
| **Synapse** | **LIVE** | `whoami` HTTP 200 as `fjkiani` (ownerId 3572550). |
| **ARGO** | **LIVE** | health HTTP 200; `list_entities` HTTP 200, 10,000 in registry (controlled-access WGS, e.g. MUTO-INTL). |
| **SAS / PDS** | **UNREACHABLE** | Unchanged from prior decision. |

**Which blockers cleared, which remain:**
- Cleared: EGA (was no-key → now byte-authorized for the exact CN dataset the
  finding rests on); Synapse (was 403 → live); ARGO (live).
- **Remains:** the **drug-response benchmark for the armor archetype**. EGA's one
  authorized dataset is copy-number, not drug-response; the Synapse/ARGO scan did
  not surface an authorized HGSOC cohort that is CCNE1/HR-annotated **and** carries
  ATR/WEE1/CDK2i response. **Honest-null recorded.** No bulk download was performed.

## 4. How the target axis is identified (deterministic, auditable)

1. Read structural state from the patient: CCNE1 amplification, s3/HRD-axis proxy
   (HR-pathway integrity), HR-deficiency signal (BRCA1/2 / core HR gene).
2. Classify an **armor archetype**: `HR_PROFICIENT_CCNE1_ARMOR` vs
   `HRD_PLATINUM_TRACTABLE` vs `INDETERMINATE` (HR-deficiency dominates toward
   tractable; ties → indeterminate).
3. Map archetype → axis via the versioned `ARCHETYPE_AXIS_MAP` / `AXIS_DRUG_SL_MAP`:
   armor → up-weight ATR / WEE1 / CDK2 / CHK1 / PKMYT1, down-weight platinum / PARP.
4. Emit ranked axis + SL-indicated drugs, each with MoA, citations, and its tier
   (all drug axes `HYPOTHESIS`).

## 5. How we would prove a drug axis (pre-specified proof path)

Each armor drug axis ships a proof contract naming: the **locked biomarker rule**
(CCNE1-amp and/or low-s3, HR-proficient), the **pre-specified endpoint** (drug
response / PFS in the archetype), the **independent cohort required** (CCNE1/HR-
annotated HGSOC with ATR/WEE1/CDK2i response — not currently authorized), and the
**success criterion** (effect CI excludes the null in the archetype). Until such a
cohort exists and clears that criterion, the axis stays `HYPOTHESIS`. This mirrors
the mechanism the readiness report already uses for every other component.

## 6. Governance carried through (do not override)

- **LATIFY deltas QUARANTINED** — cite only responder 0.8936 vs non-responder 0.6295;
  the delta/vector version is unresolved.
- **DDR 0.983 QUARANTINED** (DL-07, publication-blocking).
- PATH A formula is the locked production ranker; PATH B prohibited.
- The single collapsed `{"ddr":1.0}` mechanism vector is differentiated into DDR
  sub-pathways **only** inside the armor archetype (gated), so non-OC behavior is
  unchanged.

---
*RUO — Research Use Only. Not cleared for clinical decision-making. Every headline
number above traces to `receipts/zetabridge_receipts.json` or the frozen finding
tables in this directory.*

---

# ADDENDUM — Mechanism-Fit Data Decision · MBD4-LOF (BER-defective) archetype

**Status:** `MBD4_LOF_ARCHETYPE_ACTIVE_RUO` · `CANONICAL_TIERS_TIER_1_TO_5` · `PRECLINICAL_STRENGTH_REFINEMENT`
**Scope:** RUO — Research Use Only. Not a clinical guideline. No efficacy claim.
**Evidence pack:** `mbd4_sl/mbd4_sl_evidence.json` v2.0.0
**Anchor module:** `Synthetic-Lethality/00-mbd4-manuscript/mbd4_parp_response`
**Framework:** canonical `ManagerEvidenceTier` (Tier 1–5), the same five-tier
evidence framework the backend already ships — NOT a bespoke parallel ladder.

## A0. Correction of a prior over-tiering (read first)

An earlier version of this addendum expressed MBD4 evidence in a **bespoke,
parallel 6-rung ladder** (`GOLD_STANDARD_SL_RUO`, `PRECLINICAL_INVITRO_RUO`,
`MECHANISTIC_CANDIDATE_RUO`, `BIOMARKER_SELECTION_RUO`, plus `HYPOTHESIS` and
`FALSIFIED`) and described axes as being *"above HYPOTHESIS"* with a
`MAX_DRUG_EFFICACY_TIER`. That was wrong: it invented tiering vocabulary instead
of applying the framework the platform already uses. It also implied a higher
actionability than the evidence supports.

This addendum re-maps MBD4 onto the **canonical `ManagerEvidenceTier` (Tier
1–5)**. The honest consequence is that the MBD4 tiers are **lower**, not higher:
all MBD4 *drug* axes are preclinical/cell-line evidence → **TIER_5**. Cell-line
significance does **not** earn TIER_3 (which requires a *clinical* cohort). The
within-tier nuance the clinical ladder cannot express (causal-isogenic vs
screen-significant vs trend) is carried in a documented refinement axis,
`preclinical_strength`, and refuted/null claims are carried as an
`evidence_status`, never as a tier.

## A1. Why MBD4-LOF is decided differently from Armor (the key contrast)

The armor archetype above blocks every drug axis at `HYPOTHESIS` for one reason:
no authorized cohort carries the armor biomarker **and** the matched
drug-response, so the armor axes are data-*starved*. MBD4-LOF is data-*resolved*:
the anchor module supplies **isogenic and pan-cancer drug-response data** (GDSC2
LN_IC50, DepMap 24Q2 CRISPR dependency, published isogenic MBD4-KO cytidine
panels). That data does two things a bare hypothesis cannot: it lets each MBD4
axis carry a *documented preclinical strength* within its canonical tier, and it
lets us **falsify** a wrong axis rather than leave it open. Crucially, being
data-resolved does **not** raise the canonical tier above TIER_5 — the evidence is
still preclinical. It only sharpens the refinement and the status.

## A2. Canonical re-map — tier, refinement, status (boundary enforced in code)

Three fields are carried per axis:
- **`manager_evidence_tier`** — canonical TIER_1..TIER_5 (primary, manager-facing).
- **`preclinical_strength`** — refinement enum
  `NONE < SCREEN_TREND_NS < SCREEN_SIGNIFICANT_MULTITEST < HUMAN_ASSOC_EXPRESSION < CAUSAL_ISOGENIC`
  (within-tier nuance, **not** a tier).
- **`evidence_status`** — `VALID | FALSIFIED | NULL` (a refuted claim is a status,
  never a weak-but-real TIER_5).

| Axis | `manager_evidence_tier` | `preclinical_strength` | `evidence_status` | Basis |
|---|---|---|---|---|
| MBD4-LOF ↔ cytidine-analog (gemcitabine) synthetic lethality | **TIER_5** | `CAUSAL_ISOGENIC` | `VALID` | Isogenic MBD4-KO ~10x sensitization (IC50 2.3 nM KO vs 20.1 nM WT; **P=2.82e-3**), rescued on re-expression (Chabot et al. 2022, published). Strongest *preclinical* class — still preclinical → TIER_5 |
| MBD4-LOF ↔ ATR (ceralasertib) replication-stress dependency | **TIER_5** | `SCREEN_SIGNIFICANT_MULTITEST` | `VALID` | GDSC2 LN_IC50 Δ=**−0.732**, **p=0.0215**, Cohen's d=**−0.503**, n=14 True-LOF vs 914 WT; survives 4 stress tests (MSI-H purge p=0.0153; TP53-strat p=0.0030; non-Bowel lineage p=0.0253; leave-one-out max_p=0.0452). Cell-line panel → TIER_5 |
| MBD4-LOF ↔ WEE1 (adavosertib) G2/M dependency | **TIER_5** | `SCREEN_TREND_NS` | `VALID` | GDSC2 Δ=**−0.508**, **p=0.0745** (n.s.), d=**−0.359**, n=15 vs 920 — direction-consistent but not significant. Trend only → TIER_5 |
| PARP1-HIGH expression ↔ PARPi sensitivity (pan-cancer) | **TIER_4** | `HUMAN_ASSOC_EXPRESSION` | `VALID` | Spearman ρ=**−0.416**, **p=1.36e-21**, n=481 — genetically **independent** of MBD4; a patient-derived expression association, not trial-predictive → TIER_4, biomarker only |
| MBD4-LOF *drives* PARP-trapping vulnerability (transcriptional PARP1-up model) | **TIER_5** | — | **FALSIFIED** | PARP1 transcript MWU **p=0.605** (n=19 LOF vs 1498); RNF144A **p=0.476**; CRISPR dependency **0/17453** genes pass FDR<0.25 (PARP1 dep Δ=0.031, p=0.675, FDR≈0.9998). A refuted claim → `evidence_status=FALSIFIED`, never surfaced as a treatment |

Key boundary: **no MBD4 drug axis exceeds TIER_5**, because every one rests on
preclinical/cell-line data. Only the patient-derived PARP1-expression association
reaches TIER_4. The PARP-trapping-via-MBD4 axis can **never** be rendered as
sensitive: its status is `FALSIFIED`, and the PARPi axis that *is* allowed is
gated on **PARP1 expression**, not MBD4. This boundary is enforced by unit tests
in both backends (`test_mbd4_lof_targeting_v2.py`, `test_mbd4_lof_targeting_v3.py`)
and by a loader guard (`_guard_parp()`) that forces the PARP selection axis back
to the canonical **TIER_4** even if the pack is tampered.

## A3. Correction of record (falsified stub replaced)

Both backends previously shipped a registry stub asserting *"MBD4 loss confers
PARP sensitivity"* via *"BER deficiency → PARP trapping"* (effect: SENSITIVITY).
The anchor module's receipts **falsify** that mechanism. `resistance_prophet/
constants.py` in both v2 and v3 now records the receipt-backed mechanism (ATR +
cytidine at canonical TIER_5 with their preclinical-strength refinements; PARP as
an expression-gated TIER_4 biomarker selection; the transcriptional PARP1-up model
marked `evidence_status=FALSIFIED`). This is a correction, not an augmentation, and
it supersedes the prior stub wherever it was referenced.

## A4. Data-access reality for MBD4 (why the evidence is preclinical-resolved)

Unlike the armor drug-response benchmark (honest-null — no authorized cohort),
the MBD4 drug axes rest on **already-public, receipted** data pinned by MD5 in the
evidence pack. This data resolves the *preclinical strength* and the *status* of
each axis; it does not (and cannot) raise the canonical tier above TIER_5, because
none of it is a clinical cohort.

| Source | Role | Receipt (MD5-pinned in pack) |
|---|---|---|
| GDSC2 LN_IC50 (ATR, WEE1) | Preclinical drug response | `canonical_atr_wee1_rerun.json` (`70e1c5e4…`) |
| DepMap 24Q2 CRISPR | Dependency falsification | `sl_agent_mbd4_lof_standalone.json` (`e9068900…`) |
| Pan-cancer PARP1 expr ↔ PARPi | Biomarker selection (TIER_4) | `parp1_parpi_spearman_MANUSCRIPT_RECEIPT.json` (`9e941010…`) |
| PARP1/RNF144A transcript model | Falsification | `parp_axis_expression_MANUSCRIPT_RECEIPT.json` (`f7772eaa…`) |
| Isogenic MBD4-KO cytidine panel | Causal-isogenic SL (preclinical) | Chabot et al. 2022 (published) |

No controlled-access egress was required; every MBD4 headline number traces to one
of the receipts above.

## A5. How the MBD4 archetype is identified (deterministic, conservative)

1. Read MBD4 status from the patient: explicit `mbd4_lof` flag, a LikelyLoF
   annotation, or a truncating/frameshift/nonsense/splice/deleterious call. A bare
   MBD4 **missense VUS does not qualify** (mirrors the manuscript True-LOF
   definition).
2. Classify archetype `MBD4_LOF_BER_DEFECTIVE` (trigger = MBD4 LikelyLoF /
   hypermutator).
3. Map archetype → axes via the versioned pack: **up-weight**
   `atr_replication_stress` + `cytidine_analog_sl`; **biomarker-only**
   `parp_biomarker_selection` (keyed on PARP1_EXPRESSION_HIGH, not MBD4);
   PARP-trapping-via-MBD4 held at `evidence_status=FALSIFIED`.
4. Emit ranked axes + SL drugs, each with MoA, citations, its canonical
   `manager_evidence_tier`, and the `preclinical_strength` / `evidence_status`
   refinements.

## A6. Governance carried through (do not override)

- The armor governance in §6 above is unchanged; MBD4-LOF is an **independent new
  archetype**, not a replacement — HGSOC armor pack and wiring remain intact.
- MBD4 and armor are **convergent on ATR/replication-stress** but rest on
  different biology and different patient state; both are wired side by side.
- **All MBD4 drug axes are canonical TIER_5 (preclinical).** No drug axis exceeds
  TIER_5; only the patient-derived PARP1-expression association reaches TIER_4. The
  strength of a signal is carried in `preclinical_strength`, never by inflating the
  tier. Cell-line significance does not earn TIER_3.
- v3 namespacing: the canonical `TIER_1..TIER_5` strings carried by the MBD4 pack
  are **evidence** tiers (ManagerEvidenceTier). They are distinct from v3's SPE
  subgroup symbols (`TIER_1_TRIPLE` / `TIER_2_DUAL` / `TIER_3_NONE`), which live on
  a different axis; no SPE symbol is reused.
- All MBD4 outputs are RUO and carry the invariant RUO banner. No efficacy claim,
  no clinical guideline.

---
*RUO — Research Use Only. Not cleared for clinical decision-making. Every headline
number above traces to a receipt in `mbd4_sl/mbd4_sl_evidence.json` (MD5-pinned) or
to the cited published isogenic panel.*