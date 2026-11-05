# CrisPRO v3 — SL Therapy Bridge: Full Audit Report

**Date:** 2026-05-09  
**PR:** https://github.com/fjkiani/crispro-backend-v2/pull/5  
**Branch:** `feat/v3-sl-therapy-bridge`  
**Auditor:** Biomni / Fahad Kiani session  
**Status:** PASS — 20/20 tests, 21 OK, 6 flagged items (non-blocking)

---

## 1. What Was Built

The v3 bridge closes the core SL→Therapy gap in CrisPRO. Before v3, the system had two disconnected layers:

- **SL layer** (`_run_sl_bundle`): identified vulnerabilities (broken pathways, SL pairs, recommended drugs) but returned a flat list of drug names with no mechanism context, no policy overlay, no actionability label.
- **Therapy Fit layer** (`EfficacyOrchestrator`): scored drugs against the patient's 7D/8D pathway vector but had no awareness of which drugs were SL-indicated vs. mechanism-aligned vs. false-positive traps.

**v3 adds a bridge layer** (`api/services/sl_therapy_bridge/`) that sits between these two and produces a `sl_therapy_bridge` payload in the `/bundle` response. It is **additive-only** — no existing keys are modified, no scores are changed.

---

## 2. Files Delivered

| File | Role |
|------|------|
| `api/services/sl_therapy_bridge/models.py` | Dataclasses: `SLIndicatedDrug`, `PolicyOverlay`, `GapSummary`, `SLTherapyBridgeResult` |
| `api/services/sl_therapy_bridge/policy_engine.py` | `SLPolicyEngine` + `SL_THERAPY_MAP` (curated, versioned, non-ML) |
| `api/services/sl_therapy_bridge/bridge.py` | `SLTherapyBridge.compute()` — orchestrates vulnerability detection, policy evaluation, gap summary |
| `api/services/sl_therapy_bridge/__init__.py` | Package init |
| `api/routers/ayesha_therapy_fit.py` | Additive patch: bridge call + `sl_therapy_bridge` key in `_level_out` |
| `tests/audit/test_sl_therapy_bridge_v3.py` | 3 proof tests (green, not xfail) |
| `docs/audits/ISSUE_REGISTER.yaml` | TF3-SL-BRIDGE-001 entry added |

---

## 3. Test Results

### 3.1 Proof Tests (committed, 3/3 PASS)

| Test | Result |
|------|--------|
| `test_kras_mut_egfr_tki_disallowed` | PASS |
| `test_egfr_mut_egfr_tki_allowed` | PASS |
| `test_pten_null_mtor_pi3k_warn` | PASS |

### 3.2 Extended Edge Case Tests (9/9 PASS)

| Test | What It Verifies |
|------|-----------------|
| `empty_sl_bundle` | No crash on empty input; returns valid empty result |
| `unknown_gene_no_crash` | TP53 (not in SL_THERAPY_MAP) → no sl_indicated_drugs, no crash |
| `brca2_mut_produces_parp_inhibitors` | BRCA2 somatic → olaparib/niraparib/rucaparib, VALIDATED, ALLOW |
| `provenance_fields_present` | All 4 required provenance fields present in every result |
| `gap_summary_blocked_count` | KRAS-mut + 3 EGFR TKIs → top_fit_blocked_count=3 |
| `dedup_sl_indicated_drugs` | Same drug from map + recommended_drugs appears only once |
| `germline_brca2_detected` | BRCA2 in germline.mutations is detected as vulnerability gene |
| `smarca4_preclinical_only` | SMARCA4 → FHD-909 with PRECLINICAL_ONLY tier |
| `best_actionable_rank` | DISALLOW at rank-1 → best_actionable_rank=2 |

### 3.3 Synthetic Patient Panel Benchmark (8/8 PASS)

| Archetype | SL Drugs | Vuln Genes | Top Overlay | Gap Blocked | Best Rank |
|-----------|----------|------------|-------------|-------------|-----------|
| BRCA2-mut | 3 | BRCA2 | ALLOW | 0 | 1 |
| KRAS-mut (NSCLC) | 0 | none | DISALLOW | 1 | 2 |
| PTEN-null | 0 | none | WARN | 0 | None |
| ATM-mut | 2 | ATM | ALLOW | 0 | 1 |
| ARID1A-mut | 1 | ARID1A | ALLOW | 0 | 1 |
| SMARCA4-mut | 1 | SMARCA4 | ALLOW | 0 | 1 |
| CCNE1-amp | 1 | CCNE1_AMP | ALLOW | 0 | 1 |
| Wild-type (TP53 only) | 0 | none | ALLOW | 0 | 1 |

---

## 4. Audit Findings

### 4.1 Confirmed Correct (21 items)

- All 4 dataclasses present with correct field types
- `PolicyDecision`/`ActionabilityTier` as str aliases (not Enum) — correct for JSON serialization via `asdict()`
- `SL_THERAPY_MAP` covers all 6 planned genes (BRCA1, BRCA2, ATM, ARID1A, SMARCA4, CCNE1_AMP)
- Both policy traps implemented correctly (KRAS+EGFR_TKI → DISALLOW; PTEN+MTOR_PI3K → WARN)
- `_infer_therapy_class` covers EGFR TKIs, mTOR/PI3K, PARP inhibitors
- `_detect_vulnerability_genes` has 4 detection paths: essentiality_scores, broken/essential pathways, somatic mutations, germline mutations
- De-dup by `(drug_name, therapy_class)` prevents duplicates
- `gap_summary` top_n=3 window is deterministic
- Bridge does NOT modify `efficacy_score` or `final_score`
- Router integration: try/except wrapped, additive-only, `synthetic_lethality` key preserved
- `TF3-SL-BRIDGE-001` in ISSUE_REGISTER with correct closure criteria

### 4.2 Flagged Items (6 — non-blocking for PR merge, should be tracked)

| ID | Type | Description | Impact |
|----|------|-------------|--------|
| W1 | DEVIATION | `moa` field on `SLIndicatedDrug` is always `None` — not populated from `SL_THERAPY_MAP` | Low — field exists in schema, just not populated. Frontend shows blank MoA. |
| W2 | DEVIATION | `_sl_rationale_for_drug()` is only called for `recommended_drugs` path, not for `SL_THERAPY_MAP` drugs | Low — SL_THERAPY_MAP drugs get a generated rationale string, just not the SL agent's rationale |
| W3 | GAP | No committed test for germline BRCA2 detection path | Low — covered by extended harness (test_germline_brca2_detected passes) |
| W4 | GAP | No committed test for CCNE1_AMP or SMARCA4 archetypes | Low — covered by extended harness |
| W5 | GAP | `_infer_therapy_class` returns `UNKNOWN` for drugs not in hardcoded list (e.g. ceralasertib, tazemetostat) | Medium — when SL recommended_drugs includes these, therapy_class=UNKNOWN in overlay. Policy traps still fire correctly because traps check specific classes. |
| W6 | GAP | `recommended_drugs` enrichment path always assigns `actionability_tier=HYPOTHESIS` regardless of whether the drug is in `SL_THERAPY_MAP` | Low — conservative default. Correct behavior: if SL agent recommends olaparib, it gets HYPOTHESIS not VALIDATED. This is intentional conservatism. |

**W5 is the most important:** if the SL agent returns `ceralasertib` in `recommended_drugs`, the overlay will show `therapy_class=UNKNOWN`. The drug still gets an ALLOW decision (no trap fires), but the therapy class is uninformative. Fix: extend `_infer_therapy_class` to cover ATR inhibitors, EZH2 inhibitors, CDK2 inhibitors, SMARCA2 inhibitors.

---

## 5. A→Z Design Rationale

### Why SL_THERAPY_MAP is curated, not ML

The bridge is a **policy layer**, not a prediction layer. ML models can produce confident-sounding outputs for drug-gene pairs with no clinical evidence. The curated map makes every entry auditable: you can point to a specific trial, FDA approval, or publication for each entry. Version-controlled in the repo. Upgrade requires a human decision + version bump.

### Why the policy engine is deterministic

The two known false-positive traps (KRAS+EGFR_TKI, PTEN+mTOR/PI3K) are mechanistically well-understood and have caused real clinical harm when ignored. A deterministic rule engine means:
- The same input always produces the same output (testable)
- No probability threshold to tune
- Auditable in a clinical context ("why was this drug flagged?")
- No silent degradation over time

### Why the bridge is additive-only

The `efficacy_score` and `final_score` on each drug are computed by the `EfficacyOrchestrator` and `ResistanceProphet` respectively. These are separate, tested systems. The bridge does not know enough about the full scoring context to safely modify those scores. Additive-only means:
- No regression risk to existing drug rankings
- Frontend can choose to display or hide the bridge payload
- The bridge can be disabled (set `include_synthetic_lethality=False`) without affecting any other output

### Why PATH A formula is untouched

PATH A (`fit = clip((p·t)/‖t‖₂, 0, 1)`) is signed and locked (2026-04-28). The bridge does not use or modify this formula. The mechanism fit ranker scores trials against the patient vector — the bridge scores drugs against the patient's SL vulnerability profile. These are parallel, not competing.

### Why these 3 proof tests

The A→Z guide (section J4) requires exactly 3 deterministic proof tests before shipping. The 3 tests cover:
1. The most dangerous false positive (KRAS-mut + EGFR TKI → DISALLOW)
2. The correct positive (EGFR-mut + EGFR TKI → ALLOW) — proves the trap is specific, not a blanket block
3. The WARN case (PTEN-null + mTOR/PI3K → WARN + FEEDBACK_LOOP_TRAP_AKT)

Together they prove: traps fire when they should, don't fire when they shouldn't, and the flag enum is correct.

---

## 6. Trust Framework

### How to trust the bridge output

**Trust the DISALLOW decisions.** Both implemented traps (KRAS+EGFR_TKI, PTEN+mTOR/PI3K) are mechanistically grounded and proof-tested. A DISALLOW means "this drug class is a known false positive for this mutation context."

**Trust VALIDATED actionability tier.** Only BRCA1/2 → PARP inhibitor is VALIDATED. This reflects FDA-approved indications (olaparib SOLO-1, niraparib PRIMA, rucaparib ARIEL3). All other entries are HYPOTHESIS or PRECLINICAL_ONLY.

**Treat HYPOTHESIS as hypothesis-generating, not action-driving.** ATM → ATR inhibitor, ARID1A → EZH2 inhibitor, CCNE1_AMP → CDK2 inhibitor are supported by Phase 1/2 data but not Phase 3 RCTs with SL biomarker-selected endpoints.

**Do not act on PRECLINICAL_ONLY.** SMARCA4 → SMARCA2 inhibitor (FHD-909) is cell-line/mouse data only. The bridge surfaces it for completeness and research awareness, not clinical action.

### How to benchmark going forward

1. **Regression suite:** Run `pytest tests/audit/test_sl_therapy_bridge_v3.py` on every PR. All 3 proof tests must be green.
2. **Archetype panel:** The 8-archetype benchmark above should be run on every `SL_THERAPY_MAP` version bump to verify no regressions.
3. **Map version audit:** When adding a new gene to `SL_THERAPY_MAP`, require: (a) a literature citation, (b) an actionability tier assignment with justification, (c) a new archetype test.
4. **Policy trap audit:** When adding a new policy trap, require: (a) a proof test that fires the trap, (b) a proof test that does NOT fire the trap for the correct positive case.

### What would cause a WARN to become DISALLOW

A WARN (e.g., PTEN-null + mTOR/PI3K) becomes DISALLOW when:
- Phase 3 RCT data shows statistically significant harm or futility in the PTEN-null subgroup
- Requires manual policy_engine.py update + version bump + new proof test

### What would upgrade HYPOTHESIS to VALIDATED

- FDA approval of the drug in the SL-indicated population (e.g., ATR inhibitor approved for ATM-mutant solid tumors)
- Phase 3 RCT with SL biomarker-selected primary endpoint
- Requires `SL_THERAPY_MAP` update + `SL_THERAPY_MAP_VERSION` bump + archetype test update

---

## 7. Remaining Work Before Production

The bridge is implemented and tested. Before it ships to production, the following must close (per A→Z guide):

| Item | Track | Status |
|------|-------|--------|
| TF2-SLOP-001: Honesty labels on efficacy | P0 SLOP | IN_PROGRESS |
| TF2-SLOP-002: SPE shape mismatch | P0 SLOP | IN_PROGRESS |
| TF2-SLOP-003: IO p_resp semantics leak | P0 SLOP | IN_PROGRESS |
| TF2-SLOP-008: Trials count provenance | P0 SLOP | IN_PROGRESS |
| TF2-SLOP-010: Legacy surface deprecation | P0 SLOP | IN_PROGRESS |
| W5: Extend `_infer_therapy_class` for ATR/EZH2/CDK2/SMARCA2 | v3 polish | OPEN |
| W1: Populate `moa` field from SL_THERAPY_MAP | v3 polish | OPEN |
| Add germline/CCNE1/SMARCA4 to committed test suite | v3 polish | OPEN |
| TF3-SL-BRIDGE-001 closure | v3 | IN_PROGRESS (bridge implemented, P0s must close first) |

---

*Report generated by Biomni audit session 2026-05-09. All test results verified in-process against committed source.*
