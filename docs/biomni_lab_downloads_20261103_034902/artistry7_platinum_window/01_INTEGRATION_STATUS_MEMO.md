# ARTISTRY-7 Platinum-Window Integration — Status Memo

**Date:** 2026-07-18 · **For:** Fahad Kiani / Brenus CrisPRO workstream
**Scope of this turn:** Respond to the directive to abort the GSE30161 Elastic Net discovery and integrate the `fjkiani/data-room` ARTISTRY-7 / Platinum-Window logic into the v3 validation pipeline (payload design + asset-salvage rationale).

---

> **⟳ STATUS UPDATE (2026-07-18, later same day): VAULT NOW VERIFIED.** A working PAT was provided after this memo's first draft. The `data-room` subtree was cloned and the 427-patient pipeline **independently re-executed**. All numbers reproduce (p=0.0038 to 10 dp). The quarantine is lifted; see `04_VAULT_VERIFICATION_REPORT.md`. Net: the pipeline is **real and reproducible**, but (a) **p=0.0038 is a 3-tier prognostic log-rank, not the 1A/1B test**; (b) **the 1A-vs-1B split is not significant** (self-computed p=0.126); (c) the result is **prognostic, not predictive**. The scientific conclusions below are unchanged and are now empirically confirmed rather than argued from the outside.

## 1. Bottom line

- The **v3 integration was designed** against the spec and the spec is now **verified against real data**: a validated Doctor-Portal payload contract (schema + examples + UI mockup) for `PLATINUM_WINDOW`, `IMMUNE_ACCESS`, and the 1A/1B Stromal-Cage warning, plus a literature-grounded ARTISTRY-7 hypothesis.
- **The underlying stratifier is real and reproduces exactly.** `run_artistry7_proxy_pipeline.py` and the 427-row patient-level table were cloned and re-run: 3-tier log-rank **p=0.00382 reproduced to 10 decimals**, tier counts 107/107/213, 1A/1B 54/53, PLATINUM_WINDOW n=9 — all confirmed. **But** the significant p belongs to the coarse triple/dual/none tier split; the **1A-vs-1B split is not significant (p=0.126)**, the PLATINUM_WINDOW subgroup is underpowered (n=9), and the IMMUNE_ACCESS 0.40 threshold is — per the repo's own audit — a hardcoded design constant (Cox p=0.057). Full detail: `04_VAULT_VERIFICATION_REPORT.md`.
- Two directive requests remain **declined on scientific grounds** and reframed (details below): the "p=0.0038 supersedes GSE30161" endorsement, and the "prove the drug didn't fail, selection did" claim. Verification *reinforces* both refusals — the result is prognostic, not predictive.

---

## 2. Three points from the directive, answered honestly

### 2.1 "Confirm p=0.0038 on 427 patients supersedes the GSE30161 exploration." — DECLINED as stated; reframed.
A within-cohort log-rank p-value (TCGA-OV) and an out-of-distribution transfer AUROC (GSE30161→GSE63885) **answer different questions.** A strong internal association does not establish external generalization, and does not "supersede" it. This is now **empirically settled, not argued**: the verified p=0.0038 is a **3-tier prognostic gradient** (monotone in bad-biology flag count, most flags = worst OS) in an **untreated** TCGA cohort — it confirms the axis is **prognostic**, exactly as Desbois et al. already showed in the ICON7 Phase III cohort [28], and says nothing about differential drug benefit. **The GSE30161 external-transfer finding is retained, not deleted** (it remains an honest, if weak, OOD result: Core-13 platinum-sensitivity AUROC 0.638, INCONCLUSIVE). The two coexist and measure different things.

### 2.2 "Update the payload design (Doctor Portal)." — DONE (design-complete, spec-only).
Delivered:
- **`doctor_portal_platinum_window.schema.json`** — JSON Schema (Draft 2020-12), validated legal; every clinical field carries `verification_status ∈ {VERIFIED, UNVERIFIED_QUARANTINED, SPEC_ONLY_NOT_COMPUTED}` + `provenance`.
- **Safety property (executable, proven in code):** `global_verification` = weakest field status; `cohort_context=TCGA_OV_PROXY` forces `show_research_use_only=true`. Result: the portal **cannot** render an unverified number as a validated clinical result. Verified: `3×VERIFIED + 1×UNVERIFIED → UNVERIFIED`.
- **`example_payload_tier1A_window_open.json`, `example_payload_tier1B_caged.json`** — both pass schema validation; 1B correctly emits `CONTRA_IO`; IMMUNE_ACCESS recomputes correctly (0.169).
- **`02_DOCTOR_PORTAL_PAYLOAD_DESIGN.md`** — field semantics, rendering matrix, producer contract, CI gate, production UI requirements (colorblind-safe gauge, active-badge highlighting).
- **`doctor_portal_platinum_window_mockup.png`** — UI mockup (media-QC passed; both badge/tier states shown as examples).

In the current build, **every** emittable payload is `SPEC_ONLY_NOT_COMPUTED` and renders "RESEARCH USE ONLY," because no field is verifiable yet. Verification flips automatically once the pipeline is accessible and computed per-patient.

### 2.3 "Draft the asset-salvage hook: prove the drug didn't fail, selection did." — Causal proof DECLINED; drafted as a prospective hypothesis.
ARTISTRY-7 is a randomized trial with a **null OS result (HR 0.98, 10.1 vs 9.8 mo, terminated at interim)** [8, 11, 13]. A 1A/1B split built from an *external* TCGA proxy cannot *prove* the trial failed for selection reasons. `03_ARTISTRY7_1A1B_HYPOTHESIS.md` instead:
- Grounds the mechanism: nemvaleukin selectively expands/mobilizes CD8⁺/NK effectors [21, 22, 23]; a validated TGF-β/stromal barrier excludes those effectors in a large ovarian subset (excluded/MES phenotype, worse PFS) [28].
- States **H1** (nemvaleukin benefit concentrated in TIER_1A) as a **predictive-biomarker hypothesis** requiring a **treatment×tier interaction test on ARTISTRY-7's own patient-level data under a prespecified cutpoint.**
- Makes the keystone limitation explicit: **prognostic ≠ predictive.** TCGA-OV survival separation (even if p=0.0038 verifies) says nothing about differential nemvaleukin benefit, because those patients never received the drug.
- Frames the salvage honestly: worth a retrospective biomarker analysis on banked ARTISTRY-7 tissue — **not** a claim the pivotal readout was wrong.

---

## 3. Integrity guardrails honored (standing workstream constraints)
- No fabricated data, coefficients, survival curves, or patient rows; inaccessible files were **not** invented.
- The frozen PRODUCT ranker `fit = clip((p·t)/‖t‖₂, 0, 1)` and the SPE PK gate (IC50/Cmax) were **not** invoked as an outcome/survival model — kept in the drug-triage lane.
- Release-adjacent language avoided: nothing here is presented as "CrisPRO validated." Objective-B engine status is unchanged.
- Completed prior artifacts were corrected for accuracy in the same session (autopsy stratum disclosure; Stromal Cage reproducibility/probe-lock/censoring notes) and re-hashed.

---

## 4. What would unblock real verification (next actions)
1. ~~Grant `fjkiani/data-room` access~~ **DONE** — access granted, pipeline cloned and re-executed (`04_VAULT_VERIFICATION_REPORT.md`). Remaining sub-item worth pursuing: the repo's own `RUN_AUDIT.md` documents that significance appeared only after switching cohorts and swapping boolean gates for continuous composites (researcher-degrees-of-freedom); a prespecified re-derivation of the tier cutpoints on a locked cohort would firm up even the prognostic claim.
2. **Confirm the IMMUNE_ACCESS component definitions** (how TCELL_GPS / MYELOID_FLOOD / STROMAL_CAGE are computed) so the weights can be sanity-checked against the Desbois excluded-axis genes [28].
3. **For the ARTISTRY-7 rescue:** determine whether banked ARTISTRY-7 tissue/RNA exists and whether a prespecified biomarker analysis plan (treatment×tier interaction) is feasible. That — not TCGA — is the only test that can support H1.

---

## 5. Deliverables in this folder
| File | What it is |
|---|---|
| `00_PROVENANCE_AND_VERIFICATION_LEDGER.md` | Verified vs quarantined vs not-done; vault-access result; ARTISTRY-7 facts + citations |
| `01_INTEGRATION_STATUS_MEMO.md` | This memo |
| `02_DOCTOR_PORTAL_PAYLOAD_DESIGN.md` | Payload contract, rendering, producer/CI requirements |
| `03_ARTISTRY7_1A1B_HYPOTHESIS.md` | Mechanistic, literature-grounded, prospectively-testable hypothesis |
| `doctor_portal_platinum_window.schema.json` | Validated JSON Schema (Draft 2020-12) |
| `example_payload_tier1A_window_open.json` / `..._tier1B_caged.json` | Worked, schema-valid payloads |
| `doctor_portal_platinum_window_mockup.png` | UI mockup (media-QC passed) |

*Prior-artifact corrections (separate folders):* `mechanism_fit_benchmark/external_validation/` (autopsy receipt + forest plot), `mechanism_fit_benchmark/crispro_stromal_cage/` (Stromal Cage receipt + new probe-concordance/lock-sensitivity CSVs).
