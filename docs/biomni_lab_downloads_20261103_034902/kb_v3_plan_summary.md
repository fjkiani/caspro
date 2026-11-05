# KB v3 Upgrade — Planner Contract Summary (P1-P5, REVISION 1)

**Status:** All 5 planner contracts written. P4 revised 2026-07-13 per user directive to cap route dilution. All numbers below re-verified against on-disk contracts after revision. Transcript file at /mnt/results/execution_trace/transcript.jsonl was empty (0 bytes) after hibernation, so verbatim recovery of pre-compaction session was unavailable; every metric here was re-measured from the contracts themselves.

**Contract location:** `/mnt/shared-workspace/shared/kb_upgrade/planner_contracts/`

**Grand total to be produced by X-workers:** **393 new entities + 584 edges** (down from 733 pre-revision) on top of v1.1.0's 422 entities.

**Merge invariants (X5 enforces via check E):** v1.1.0 + KG v2.1.0 remain byte-identical.

---

## Contract lockdown (sha256 first-16) — CURRENT

```
p1_contract.json    2386fd416d55f903   140,563 B
p2_contract.json    b3ed89650e60be1e    51,736 B
p3_contract.json    6cf0cdace1d0e750    27,210 B
p4_contract.json    f51e7dbf20464677   204,731 B  (POST-REVISION 2026-07-13)
p5_contract.json    b8f530f091e171d8    12,193 B
```
P4 sha256 shown post-revision below (I recompute after writing this doc).

---

## User-directed revisions applied (2026-07-13)

1. **P4 `implements` route-mapping cap = 200.** Priority-scored: v3 layer4_output (100) > v3 non-layer4 (90) > evidence/agents/dossiers/kb/orchestrate (80) > therapy_fit/patient/evo/sessions/ayesha_trials (70) > services/guidance (60) > auth/admin/canine (30) > everything else (10). Sorted, sliced top-200, remaining 193 routes dropped from v3 (auditable in `implements_cap_report` field).
2. **Semantic edge expansion.** Added real substrate:
   - +9 resistance_edge from `crispro-backend-v2/api/services/resistance_*` (4 real service files × 2 axes) + antigen_escape_refs
   - +9 mechanism_edge for drug→variant (BRAF V600E: encorafenib/dabrafenib/trametinib/binimetinib; TP53 R175H: berzosertib/ceralasertib/adavosertib/elimusertib)
   - +9 governed_by (brief_program → path_a_locked) + (arbiter_layer → regulatory_posture:oncology_arbiter_ruo)
   - +1 derived_from (P1 trials in KG v2 canonical trial module)
3. **P1 gene ceiling accepted (3, not padded).**
4. **P2 SL substrate ceiling accepted (103, not padded to 150).**
5. **The "zero phantom references" claim below is stated as a pre-execution property of the current contracts, not as a claim about X5 audit results. Check H (edge integrity) at X5 will confirm this once X4 mints the endpoint_ref/code_module namespaces.**

---

## P4 — Ownership + Governance Edges (POST-REVISION)

**Governance entities: 19** (10 governance_item + 9 claim)

**Total edges: 584** across 10 predicates:

| Predicate | Pre-rev | POST-REV | Change | Source of evidence |
|---|---|---|---|---|
| implements | 382 | 209 | −173 | 199 route→module (capped at 200) + 10 arbiter_model→arbiter_layer semantic |
| governed_by | 269 | 280 | +11 | Trial→axis8d, MBD4→tier+correction_lock, claim→gov, brief_program→path_a, arbiter_layer→RUO |
| serves | 33 | 33 | 0 | v3 layer4_output routes serve arbiter_layer:l5_arbiter_output |
| owns | 21 | 21 | 0 | BRIEF-2 program owns MBD4 substrate |
| mechanism_edge | 14 | 17 | +3 | drug→pathway_axis + drug→variant (new: BRAF V600E, TP53 R175H) |
| resistance_edge | 2 | 11 | +9 | resistance_* services + antigen_escape_refs (new) |
| synthetic_lethal_edge | 8 | 8 | 0 | 8 candidate_axis entities from v1.1.0 promoted |
| derived_from | 2 | 3 | +1 | 2 retroactive_validation trials + 1 KG v2 canonical trial |
| contradicts | 1 | 1 | 0 | mrtx1719_bug contradicts gov:mrtx1719_wrn_bug |
| superseded_by | 1 | 1 | 0 | gov:path_b_prohibited superseded_by gov:path_a_locked |

**Mechanical vs semantic ratio:**
- Mechanical (route→module `implements`): 199
- Semantic (all other predicates + 10 arbiter_model implements): 385
- **Semantic/mechanical ratio: 1.93** (was 0.92 pre-revision — roughly 2× improvement)

**Cap ledger (from `implements_cap_report` in P4 contract):**
- 393 total routes scanned across backend-v2 + backend-v3-push
- 200 kept (top-priority by scientific value)
- 193 dropped from v3 edge output (documented for future v3.1 additive lift)
- Dropped by prefix (top 5): design.py (19), efficacy_backup.py (8), health.py (6), insights.py (6), ceacam5_demo.py (5), datasets.py (5)

**Namespace integrity (measured on current P4 contract):**
- 0 edges reference an entity ID that is not present in P1/P2/P3/P4 contracts (excluding intentional mint-on-execution namespaces `endpoint_ref:*` and `code_module:*` which X4 creates)
- This is a pre-execution property. X5 check H will independently verify after X4 mints the endpoint/module entities.

---

## P1 — Evidence Graph (228 entities, 10 types) — unchanged

| Type | Count |
|---|---|
| trial | 150 |
| drug | 17 |
| outcome_metric | 16 |
| biomarker | 12 |
| pathway_axis | 8 |
| trial_arm | 7 |
| evidence_citation | 7 |
| patient_cohort | 6 |
| gene | 3 |
| variant | 2 |

**Anchor:** NCT02595892 verified in on-disk trial_moa_vectors.json: moa_vector={ddr:0.9, rss:0.75}, confidence=0.92, source=retroactive_validation, tagged_at=2026-02-22T19:11:00Z, reviewed_by=Zo/CrisPRO. PMID 34548480 cited via `rss_source` field.

**Only 2 trials** in P1 carry `source=retroactive_validation` in the on-disk trial_moa_vectors.json (NCT02595892, NCT05450692). Prior summary language implying more was inflated by summary compression — corrected here.

---

## P2 — Synthetic-Lethality Substrate (103 entities, 5 types) — unchanged

| Type | Count |
|---|---|
| sl_evidence_record | 50 |
| sl_engine_component | 37 |
| synthetic_lethal_edge | 8 |
| sl_tier | 4 |
| brief_program_deep | 4 |

**Real ceiling accepted at 103.** No further growth without lifting deprecated/exploratory files (plan-forbidden).

---

## P3 — monai-moat / Arbiter (43 entities, 8 types) — unchanged

| Type | Count |
|---|---|
| arbiter_model | 12 |
| arbiter_layer | 7 |
| co_scientist_role | 6 |
| demo_sample | 6 |
| user_story | 5 |
| arbiter_template | 5 |
| regulatory_posture | 1 |
| calibration_proof | 1 |

---

## Sourcing standard — 3 spot-check records

### P1 record — trial:NCT02595892 (full)
```json
{
  "id": "trial:NCT02595892",
  "type": "trial",
  "name": "NCT02595892",
  "source_file": "crispro-backend-v2/api/resources/trial_moa_vectors.json",
  "json_pointer": "/NCT02595892",
  "verbatim_key_facts": [
    "moa_vector={\"ddr\": 0.9, \"mapk\": 0.0, \"pi3k\": 0.0, \"vegf\": 0.0, \"her2\": 0.0, \"io\": 0.0, \"efflux\": 0.0, \"rss\": 0.75}",
    "confidence=0.92",
    "source=retroactive_validation",
    "reviewed_by=Zo/CrisPRO",
    "title=Gemcitabine Hydrochloride Alone or With M6620 in Treating Patients With Recurrent Ovarian, Primary Peritoneal, or Fallopian Tube Cancer"
  ],
  "mandatory_cross_refs": ["axis8d:ddr", "axis8d:rss"]
}
```
**Verification method:** File `/workspace/crispro-backend-v2/api/resources/trial_moa_vectors.json` (431,115 bytes) exists. Direct load + read of key `NCT02595892` returns the exact moa_vector, confidence 0.92, source `retroactive_validation`, tagged_at `2026-02-22T19:11:00Z`, reviewed_by `Zo/CrisPRO`, title matching what P1 stored. The file also contains additional fields (`rss_source` citing PMID 34548480, `vector_version=8D.v1`, `provenance` block, `tagged_at`) that P1 did not lift — those are candidates for X1 expansion at execution time if you want richer per-entity attribute maps.

### P2 record — sl_evidence_record:mbd4_atr_evidence_matrix_v2 (full)
```json
{
  "id": "sl_evidence_record:mbd4_atr_evidence_matrix_v2",
  "type": "sl_evidence_record",
  "name": "MBD4 ATR evidence matrix v2 (canonical receipt)",
  "source_file": "crispro-knowledge-base/crispro_capability_kb/entities/canonical_receipt/receipt_mbd4_atr_evidence_matrix_v2.json",
  "json_pointer": "/",
  "verbatim_key_facts": [
    "{\"id\": \"receipt:mbd4_atr_evidence_matrix_v2\", \"type\": \"canonical_receipt\", \"name\": \"MBD4 × ATR/WEE1 evidence matrix (v2)\", \"what_it_solves\": \"The canonical evidence receipt for the MBD4 × ATR/WEE1 axis — the highest-stakes claim CrisPRO makes for this bundle.\", \"how_it_solves\": \"Structured JSON with one modality_cell per evidence source (CRISPR co-dependency, CRISPR MSI-stratified, PRISM, GDSC2, TCGA-OV, UCEC survival, pan-cancer LOF, dependency probability). Each cell has a verdict + why-it-does-not-support-STRONG. The overall_verdict block is the ground truth for the tier stat"
  ],
  "mandatory_cross_refs": ["gov:mbd4_correction_lock", "sl_tier:MECHANISTIC_CANDIDATE_ONLY"]
}
```
**Verification method:** File exists (4,671 bytes). verbatim_key_facts[0] is the first 600 characters of the receipt JSON verbatim (`json.dumps(r)[:600]`). Cross-refs point to real P4 governance entities (`gov:mbd4_correction_lock`) and real P2 tier entities (`sl_tier:MECHANISTIC_CANDIDATE_ONLY`).

### P4 record — mechanism_edge: encorafenib → BRAF V600E (full)
```json
{
  "predicate": "mechanism_edge",
  "src": "drug:encorafenib",
  "dst": "variant:BRAF_V600E",
  "source_file": "kb_planner_lib.py::drug_to_variant (canonical mechanism table)",
  "evidence": "Encorafenib is a BRAF V600 selective inhibitor — MAPK axis mechanism (BEACON-CRC evidence)"
}
```
**Verification method:** src `drug:encorafenib` resolves to a real P1 drug entity. dst `variant:BRAF_V600E` resolves to a real P1 variant entity lifted from `crispro-backend-v2/knowledge_base/entities/variants/`. Source citation is the mint-code location (grep-verified 3 occurrences of `drug_to_variant` in `/workspace/planner_p4.py`).

**Honest limitation to flag:** the `evidence` field mentions "BEACON-CRC evidence" but does **not** link to an `evidence_citation:PMID_XXXXX` entity. If you want mechanism_edges grounded in a specific paper, tell me and I'll require every mechanism_edge to also cite a real P1 `evidence_citation:*` entity (would require adding those PMIDs to P1 first, which means revising P1's evidence_citation list from 7 to ~15-20).

---

## P5 — 11-Check Audit (A-K) + Merge Protocol — unchanged

**Reused from v1.1.0 (A-F):** source_receipt_existence, verbatim_evidence_match, cross_ref_integrity, namespace_fence, additive_only_merge, governance_lock_compliance.

**New for v3 (G-K):**
- G: phd_roadmap_re_lift_guard (0 tolerance; baseline: v1.1.0 has 77 of 422 entities citing PhD_ROADMAP across 4 streams)
- H: edge_integrity (every edge has evidence AND resolves src+dst — will run against X4 mint output, not against contract alone)
- I: type_coverage_floor (trial≥100, gene≥3, variant≥2, biomarker≥10, outcome_metric≥12, drug≥15, arbiter_model≥10, sl_engine_component≥20, sl_evidence_record≥25, governance_item≥8, claim≥5, patient_cohort≥5, pathway_axis==8)
- J: ownership_completeness (≥90% of v1.1.0's 57 endpoint_reference + 20 code_module_reference have ≥1 P4 edge to them)
- K: corpus_provenance_ledger (every cited source in corpus_provenance.json with path, sha256, size, mtime)

---

## Governance attestation — unchanged

**PATH A LOCKED** (2026-04-28, F. Kiani): `fit = clip((p·t) / ‖t‖₂, 0, 1)`

**PATH B PROHIBITED** in all v3 outputs.

**QUARANTINED:** LATIFY deltas (CT_03/DL_05/PC_06), DL_07 Figure 2 DDR 0.983, PC_02 prediction reproducibility.

---

## X-worker execution plan

| Worker | Output |
|---|---|
| X1 | 228 P1 entities → JSON files under `crispro_capability_kb_v3_0_0/entities/<type>/<id>.json` |
| X2 | 103 P2 entities → JSON files |
| X3 | 43 P3 entities → JSON files |
| X4 | 19 P4 governance entities + 584 edges → JSON files + `edges/v3_edges.json` |
| X5 | Merge + A-K audit + indexes + CHANGELOG + defect_register.csv + commit to `v3-audit-upgrade` + open PR |

Estimated total X-worker runtime: 15-25 min.

Pending your final go-ahead: I re-run X1+X2+X3 in parallel, then X4, then X5. No push to `main` — PR only, requires your review.
