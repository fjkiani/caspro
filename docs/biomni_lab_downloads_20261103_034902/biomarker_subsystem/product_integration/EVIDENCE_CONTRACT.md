# Evidence Contract — `cin_resistance_evidence_v1.json`

**Schema version:** 1.0.0
**Artifact:** `cin_resistance_evidence_v1.json`
**Status:** hypothesis-generating (evidence tier `Consider`)
**Consumed by:** Resistance Prophet integration spec (backend) and the `resistance-cin` frontend feature. Both MUST read this
artifact rather than hard-coding numbers, so a single edit propagates everywhere.

This document is the authoritative definition of the artifact's shape. The JSON and this contract are kept in lockstep; if
they diverge, the JSON is corrected to match this contract, not the reverse.

---

## Design rules

1. **Single source of truth.** Every quantitative value in the artifact traces to a receipt file listed under
   `provenance.receipts`. No value is computed or restated anywhere else in the product.
2. **Tier vocabulary is the Prophet's.** `evidence_tier` and `therapeutic_nomination.tier` use exactly
   `Supported | Consider | Insufficient` (from `RESISTANCE_PROPHET_MASTER.md`). This artifact is `Consider` — never
   `Supported` (n=5 pilot; single-call PTEN; no outcome data).
3. **Hard cap.** `therapeutic_nomination.hard_cap` states the finding may never, alone, drive a HIGH resistance call.
   Consumers must honour this.
4. **Additive versioning.** Breaking changes bump the major version and the filename suffix (`_v2`). Additive,
   backward-compatible fields bump minor. Field removals/renames are breaking.

---

## Top-level fields

| Field | Type | Meaning |
|---|---|---|
| `schema_version` | string (semver) | Contract version this artifact conforms to. |
| `artifact_id` | string | Stable id (`cin_resistance_evidence_v1`). |
| `title` | string | Human-readable title. |
| `evidence_class` | enum | `hypothesis_generating` \| `validated`. Currently `hypothesis_generating`. |
| `evidence_tier` | enum | `Supported` \| `Consider` \| `Insufficient`. Currently `Consider`. |
| `cohort` | object | Provenance of the sample set (see below). |
| `method` | object | Assay + caller + breakpoint definition + CN bands + signature heuristic. |
| `cohort_architecture` | array<object> | One row per subject (the 5-subject table). |
| `lead_subject` | object | Subject 260 deep-dive. |
| `therapeutic_nomination` | object | The acquired-PTEN-loss → PI3K/mTOR nomination. |
| `counter_evidence_and_caveats` | object | Explicit caveats and counter-signals (KEAP1, ceiling, selection-vs-induction). |
| `provenance` | object | Manuscript, figure, receipt filenames, generator. |

### `cohort.*`
`name`, `ega_dataset`, `ega_study`, `n_subjects` (int), `design`, `access`.

### `method.*`
`assay`, `caller`, `reference`, `bin_size_kb` (int), `breakpoint_definition`, `cn_bands` (object), `signature_heuristic` (object).

### `cohort_architecture[]` (one object per subject)
`subject` (int), `dx_sample`, `relapse_sample`, `dx_breakpoints` (int), `relapse_breakpoints` (int),
`breakpoint_delta` (int, raw relapse−dx), `net_gained_breakpoints` (int, summed over gaining chromosomes only),
`n_chromosomes_gained` (int), `top_focus_chrom`, `top_focus_fraction` (float 0–1), `top_chrom_cn_levels` (int),
`architecture_signature` (enum: `dispersed_stochastic_CIN` \| `intermediate_rearrangement` \| `modest_gain` \| `focal_catastrophe`).

> **Note on the three count fields.** `breakpoint_delta`, `net_gained_breakpoints`, and the sum of `delta_by_chrom` are
> three distinct, correctly-defined quantities and will generally differ (raw delta includes losses; net gained sums only
> gaining chromosomes; per-chrom includes negative entries). This is expected, not a discrepancy. Consumers must not
> "reconcile" them by arithmetic.

### `lead_subject.*`
`subject`, `dx_sample`, `relapse_sample`, `architecture` (same shape as a `cohort_architecture` row),
`delta_by_chrom` (object: chrom→int, may be negative), `qc` (array: `sample`, `used_reads`, `n_bins`, `median_cn`, `mad_cn`),
`premise_note` (string), `gene_cn` (array: `gene`, `dx_rel_cn`, `relapse_rel_cn`, `delta`, `dx_call`, `relapse_call`, `changed`).

### `therapeutic_nomination.*`
`lesion`, `pathway`, `prophet_signal_mapping`, `nominated_agents_class`, `tier` (`Consider`),
`hard_cap`, `grade`.

### `counter_evidence_and_caveats.*`
`keap1_gain_not_resistance`, `slc31a1_stable`, `swgs_ceiling`, `selection_vs_induction`, `pilot`, `not_chromothripsis_diagnosis`.

### `provenance.*`
`manuscript`, `figure`, `receipts` (array of filenames), `generated_by`.

---

## Consumer contracts

**Backend (Resistance Prophet).** Read `therapeutic_nomination` + `lead_subject.gene_cn` + `lead_subject.architecture`.
Emit a `ResistanceSignal` mapped to the existing PI3K ovarian pathway signal, tier `Consider`, capped below HIGH, with
`evidence_refs` pointing at `artifact_id`. See `resistance_prophet_CIN_integration_SPEC.md`.

**Frontend (`resistance-cin` feature).** Read `cohort_architecture` (table), `lead_subject` (Subject 260 detail + per-chrom),
`therapeutic_nomination` (PTEN card), `counter_evidence_and_caveats` (honesty drawer). Render tier and pilot/ceiling labels
as first-class UI. Never display a value not present in the artifact.

---

## Validation checklist (run before shipping any new version)
- [ ] JSON parses; `schema_version` present.
- [ ] Every `cohort_architecture` row's numbers equal the corresponding receipt row.
- [ ] `lead_subject.architecture.breakpoint_delta == 60`, `net_gained_breakpoints == 66`.
- [ ] PTEN `relapse_rel_cn == 0.6915`, `relapse_call == "loss"`, `changed == true`.
- [ ] KEAP1 `relapse_call == "gain"` and appears only in `counter_evidence_and_caveats` as NOT-resistance.
- [ ] `evidence_tier == "Consider"` and `therapeutic_nomination.tier == "Consider"`.
- [ ] No credentials, no absolute filesystem paths anywhere in the artifact.
