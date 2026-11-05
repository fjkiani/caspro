# PROVENANCE — reproducibility manifest

Reproducibility ≠ validity. This manifest documents that the SIMULATION is a faithful,
deterministic re-execution of the existing ARTISTRY-7 Lazarus simulator. It makes **no**
claim of predictive validity; predictive status remains SHADOW.

---

## 1. Source of truth (simulator math)

| Item | Value |
|------|-------|
| Script | `datasets/artistry7-platinum-window/publications/11-artistry7-hgsoc-subgroup/scripts/simulate_intervention.py` |
| Script SHA-256 | `aeee8b543bde0cbeff101b0343dc2743b99ef61c4f969cd78776d6e47648535b` |
| Data-room git commit | `a54b8a11be7d0f1a58be256ade38b313408e0b11` |
| Lazarus data | `datasets/artistry7-platinum-window/data/artistry7_proxy/crispro_lazarus_output.csv` (427 rows, 38 cols) |

**Math reused verbatim** (no new math introduced): `INTERVENTION_MODELS`,
`_recompute_immune_access`, `simulate_treatment_sequence`. Fidelity was checked by executing the
original script and the vendored adapter on the pinned eligible patient and confirming the
timelines are **bit-identical step-by-step** (post-scores match to < 1e-12; identical
`prereq_met` and `universe` at every step).

`IMMUNE_ACCESS = TCELL_GPS·0.40 − MYELOID_FLOOD·0.35 − STROMAL_CAGE·0.25`.
Universe label: `IMMUNE_ACCESS > 0.40 ⇒ B`, else `A` (0.40 is a hardcoded design constant).

---

## 2. Provenance stamp (emitted on every non-disabled payload)

Per mission §E, each `simulated_predictive_reprogramming` payload carries:

| Key | Meaning |
|-----|---------|
| `status` | `simulated_predictive_reprogramming` |
| `mathematical_integrity` | `deterministic_hypothesis` |
| `reproduction_basis` | `artistry7_sequence_B_lazarus_simulator` (NOT a fitted model) |
| `flag_value` | effective flag (true on this path) |
| `script_path` | simulator path (above) |
| `code_sha256` | **BOTH senses covered:** SHA-256 of `simulate_intervention.py` bytes (`aeee8b54…`) |
| `dataroom_commit` | data-room git ref `a54b8a11…` |
| `input_sample_id` | the ARTISTRY-7 SAMPLE_ID simulated |
| `run_id` | `uuid4()` per run |
| `run_timestamp_utc` | ISO-8601 Z |

Determinism: repeated runs produce identical `post_scores`, `delta_summary`, and
`universe_transition`; only `run_id` and `run_timestamp_utc` differ (test-enforced).

---

## 3. Delivered module SHA-256 (this change set)

| File | SHA-256 |
|------|---------|
| `layer0_contracts/case_resolution.py` | `c7806773cb517aeb50448f920baeecf488fd07742ba8b620fa1be12838f79ee4` |
| `layer3_orchestrator/case_resolver.py` | `e09b19ffe7f7ca7cbc218dec089f42d184fcf6890fe3df8a0c02ae07fc7fbb10` |
| `layer2_gates/predictive_simulation_gate.py` | `aae739a19ae6437387cead7ec26ff2b1f811f9caef5472e6c1cd0e1ac923ce56` |
| `layer1_engines/artistry7_reprogramming/simulator_adapter.py` | `51443bc58e9fcd09bcd55b4b27c52373ce959f05605d3afbe6c1dc70f47bc837` |
| `tests/test_layer3/test_predictive_simulation_gate.py` | `4872f13deb435145fbde9fcc3dbc2e41a5e82e1441ca0f88cea5828c66552cfa` |

(SHAs are of the copies in `module_copies/`, identical to the working-tree files at delivery.)

---

## 4. Cohort accounting (real patients)

- Lazarus cohort: **427** rows.
- `TIER` counts: TIER_3_NONE 213, TIER_1_TRIPLE 107, TIER_2_DUAL 107.
- `TIER_REFINED` counts: TIER_3_NONE 213, TIER_2_DUAL 107, TIER_1A_ACCESSIBLE 54, TIER_1B_CAGED 53.
- `PLATINUM_WINDOW == true`: **9**.
- **Eligible = TIER_1_TRIPLE ∩ TIER_1A_ACCESSIBLE ∩ PLATINUM_WINDOW = exactly 9.**

### Pinned test fixtures (one row = one real patient)
| SAMPLE_ID | TIER | TIER_REFINED | PLATINUM_WINDOW | baseline IMMUNE_ACCESS | role |
|-----------|------|--------------|-----------------|------------------------|------|
| TCGA-04-1517-01 | TIER_1_TRIPLE | TIER_1A_ACCESSIBLE | true | 0.0886 (universe A) | eligible |
| TCGA-04-1331-01 | TIER_3_NONE | TIER_3_NONE | false | 0.0176 | ineligible (all gates) |
| TCGA-04-1337-01 | TIER_1_TRIPLE | TIER_1B_CAGED | false | −0.4118 | ineligible (refined+window) |

Eligible patient simulated result (Sequence B, deterministic):
IMMUNE_ACCESS 0.0886 → 0.4561 (Δ +0.3675), universe **A→B**, `prereq_met=false`
(CHECKPOINT prerequisite evaluated pre-boost when IMMUNE_ACCESS = 0.2561 < 0.40).

---

## 5. Test evidence

- `test_evidence/pytest_predictive_simulation.txt` — 12/12 assertions PASS (new suite).
- `test_evidence/pytest_regression_layers_0_2_3.txt` — layers 0/2/3 run. The **only** failures
  are 5 pre-existing tests in `tests/test_layer0/test_canonical_vectors.py`
  (BreAK-CRC canonical-vector / PATH-A formula constants). These are **unrelated** to this change
  and reproduce identically on the pristine tree with this change set stashed out. No file touched
  by this task is imported by those tests.
- `test_evidence/example_payloads.json` — canonical flag-off, eligible-on, TIER_3-ineligible,
  TIER_1B-ineligible payloads.
- `test_evidence/pinned_rows.json` — the 3 real fixture rows.

---

## 6. Scope boundary (what was NOT done, by design)

- Nothing pushed to GitHub.
- No Doctor-Portal UI built (only the backend field it would read).
- IMMUNE_ACCESS **not** relabeled predictive; GSE30161 AUROC **not** replaced with p=0.0038.
- No survival model fit to n=9; "drug didn't fail, selection did" **not** asserted as proven.
- ARTISTRY-7 row is not yet threaded through `orchestrator.resolve_case()` / the HTTP route
  (caller's responsibility) — same integration boundary MarrowGuard currently sits at.
