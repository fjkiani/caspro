# Governance Record — Brenus Data Room
**CrisPRO Platform | Phylo**
**Last updated:** 2026-05-07
**Status:** ACTIVE

---

## Formula Lock

**Formula:** PATH A (LOCKED)
**Signed:** Fahad Kiani, 2026-04-28
**Approval statement:** "Approved PATH A as production ranker formula effective immediately."
**Formula:** `fit = clip((p·t) / ‖t‖₂, 0, 1)`
**PATH B status:** PROHIBITED in all outputs

**What this means for this data room:**
- All fit scores in `02_scores/path_a_scores.yaml` use PATH A exclusively
- All trial decode files use PATH A exclusively
- PATH B scores are not computed, not stored, not referenced except in admissibility footers as "Not used"
- Any future recomputation must use PATH A formula

---

## Open Conflicts

### SC-001 — HT29 BRAF V600E Conflict (ACTIVE)

**Status:** ACTIVE — blocks Arm 2A-1 KRAS-enriched cohort vector assignment
**Description:** HT29 cell line (used in STC-1010 preclinical data, Alzeeb et al. 2024) is BRAF V600E-mutant. BreAK CRC-001 Arm 2A-1 is described as KRAS-enriched. KRAS and BRAF V600E are mutually exclusive in CRC (~95% of cases). If the KRAS-enriched arm excludes BRAF V600E patients (as expected), the HT29 preclinical model does not represent the enrolled patient population.
**Resolution required:** Brenus Pharma must clarify whether HT29 was used as a convenience cell line (BRAF V600E status irrelevant to the vaccine mechanism) or as a representative model (in which case the BRAF V600E conflict is scientifically material).
**Impact:** Arm 2A-1 vector assignment is blocked until SC-001 is resolved. All Arm 2A-1 analyses in this data room use the ITT vector, not the KRAS-enriched vector.

### B-004 — Bevacizumab Arm Assignment (BLOCKED)

**Status:** BLOCKED — bevacizumab arm (Arm 2A-2) vector assignment pending
**Description:** BreAK CRC-001 includes an optional bevacizumab arm (mFOLFOX6 + bev + STC-1010). The VEGF axis weight for the bev arm has not been finalized. The bev arm vector differs from the no-bev arm vector in the vegf dimension.
**Resolution required:** Brenus Pharma must confirm whether the bev arm is a separate randomization or a physician choice. If separate randomization, the bev arm requires its own trial vector and PATH A score.
**Impact:** All scores in this data room use the no-bev arm vector (vegf=0.30 for the patient population, not the treatment vector). Bev arm scores are not computed.

### GAP-01 — Liver-Met Stratification (CRITICAL — OPEN)

**Status:** CRITICAL — protocol design gap, not a data room conflict
**Description:** Liver-metastasis status is not pre-specified as a stratification variable in BreAK CRC-001 (NCT06934538). This is the dominant IO suppression mechanism in MSS mCRC (see `03_cross_cutting/liver_met_stratification.md`).
**Resolution required:** Brenus Pharma must decide whether to add liver-met stratification before enrollment opens. This is a protocol amendment, not a CrisPRO data room action.
**Impact:** All analyses in this data room treat the enrolled population as mixed liver-met/non-liver-met. The non-liver-met subgroup signal is not separately modeled.

---

## Admissibility Rules

### What Is Admissible in This Data Room

1. **Published peer-reviewed data:** Admissible as primary evidence. Citation required.
2. **Conference abstracts (ASCO, ESMO, AACR):** Admissible as supporting evidence. Must be labeled [ABSTRACT] and not used as primary evidence for efficacy claims.
3. **Press releases:** Admissible as hypothesis-generating only. Must be labeled [PRESS RELEASE]. GRANITE GO-010 data is press release only — see TIER2 warning.
4. **ClinicalTrials.gov registry data:** Admissible for trial design facts (enrollment, endpoints, arms). Not admissible for efficacy claims.
5. **Preclinical data (murine models):** Admissible as mechanistic plausibility only. Must be labeled [PRECLINICAL — MURINE]. Alzeeb et al. 2024 is the only preclinical source in this data room.

### What Is Not Admissible

1. **DL-07 (0.983 DDR score):** QUARANTINED. Not used in any analysis in this data room. Publication-blocking.
2. **LATIFY deltas (CT-03/DL-05/PC-06):** QUARANTINED. Vector version unresolved. Not used.
3. **PC-02:** Permanently downgraded. Not used.
4. **PATH B formula:** PROHIBITED. Not computed, not stored, not referenced.
5. **Fabricated or simulated data:** Never admissible. All findings must be from provided data or correctly retrieved external sources.

---

## Evidence Level Taxonomy

| Level | Label | Definition |
|---|---|---|
| 1 | PROVEN EFFICACY — POSITIVE | Phase III RCT, primary endpoint met, peer-reviewed |
| 2 | PROVEN EFFICACY — NEGATIVE | Phase III RCT, primary endpoint not met, peer-reviewed |
| 3 | PROVEN EFFICACY — SUBGROUP | Phase III RCT, subgroup analysis, peer-reviewed |
| 4 | PHARMACODYNAMIC ACTIVITY | Biomarker/immune response confirmed, no clinical endpoint met |
| 5 | MECHANISTIC PLAUSIBILITY | Preclinical or mechanistic rationale, no human efficacy data |
| 6 | HYPOTHESIS GENERATING | Post-hoc analysis, press release, or single-arm without control |

---

## 8D Remediation Status

**Approved:** 2026-04-28
**Immediate downgrades applied:**
- Filing status downgraded
- 4-published-trials downgrade applied
- LATIFY preliminary label applied
- LATIFY delta quarantine applied
- NCT02264678 split applied
- Claim 16 split applied
- CT-06 §2.4 addendum applied
- Script reproducibility permanently downgraded

**Formula-dependent items (PATH A signed 2026-04-28):**
- CT-01: Unblocked by PATH A signing — recomputation required
- CT-02: Unblocked by PATH A signing — recomputation required
- DL-03: Unblocked by PATH A signing — recomputation required
- DL-07: QUARANTINED — 0.983 DDR score is publication-blocking; not unblocked by PATH A
- PC-05: Unblocked by PATH A signing — recomputation required

**Still quarantined:**
- DL-07 Figure 2 (DDR 0.983) — publication-blocking
- LATIFY deltas (CT-03/DL-05/PC-06) — vector version unresolved
- PC-02 — permanently downgraded until retroactive_prediction_run.py reproduces documented deltas

---

## Data Room Integrity Verification

**Verification date:** 2026-05-07
**Verified by:** CrisPRO governance agent

| Check | Result |
|---|---|
| FALSE POSITIVE warning in CORE-04 | PASS (4× confirmed) |
| TIER2 warning in CORE-02 | PASS (6× confirmed) |
| DL-07 (0.983) absent from all trial decodes | PASS |
| PATH B absent from all trial decodes (except admissibility footers) | PASS |
| All ceiling checks in path_a_scores.yaml | PASS (14/14) |
| All 7 trial decode files exist | PASS |
| All 3 cross-cutting files exist | PASS |
| Executive summary exists | PASS |
| MANIFEST.yaml exists | PASS |

---

*CrisPRO Platform | Phylo | 2026-05-07*
*Formula: PATH A (LOCKED 2026-04-28)*
*PATH B: PROHIBITED*
