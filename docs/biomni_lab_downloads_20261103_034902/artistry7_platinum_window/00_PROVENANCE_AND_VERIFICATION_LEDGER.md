# ARTISTRY-7 Platinum Window — Provenance & Verification Ledger

**Date:** 2026-07-18
**Author:** Biomni (analysis agent), for Fahad Kiani / Brenus Pharma CrisPRO workstream
**Purpose:** Record exactly what is VERIFIED, what is UNVERIFIED/QUARANTINED, and what was explicitly NOT done, before any design work is consumed downstream. This ledger governs every claim in the sibling documents in this folder.

---

> **⟳ STATUS UPDATE (2026-07-18, later same day): VAULT ACCESS GRANTED — QUARANTINE LIFTED.**
> A working PAT was subsequently provided. The `data-room` subtree was cloned, `run_artistry7_proxy_pipeline.py` was read, and the 427-patient patient-level table was independently re-executed. **Every claimed number reproduces exactly** (p=0.0038 to 10 dp; tier counts 107/107/213; 1A/1B 54/53; PLATINUM_WINDOW 9). The §1 access-failure narrative and the §3 QUARANTINE table below are **retained for the audit trail only** and are **superseded** by `04_VAULT_VERIFICATION_REPORT.md`. Key correction from re-execution: **p=0.0038 is a 3-tier prognostic log-rank, not the 1A/1B test; the 1A-vs-1B split is not significant (self-computed log-rank p=0.126); the result is prognostic, not predictive.** See the verification report for the full verdict.

## 1. Vault access attempt — the blueprint could NOT be ingested *(original attempt; see status update above)*

The directive pointed to `https://github.com/fjkiani/data-room/tree/main/datasets/artistry7-platinum-window` and to `run_artistry7_proxy_pipeline.py`, a claimed deterministic 427-patient TCGA-OV survival stratifier with log-rank p=0.0038.

**Access result (2026-07-18):**
| Attempt | Endpoint | HTTP | Meaning |
|---|---|---|---|
| Unauthenticated | `api.github.com/repos/fjkiani/data-room` | **404** | Repo is private or does not exist to anonymous callers |
| Brenus PAT | `api.github.com/repos/fjkiani/data-room` | **401 Bad credentials** | The Brenus-scoped token is **rejected outright** by `data-room` — it does not authenticate to that repo at all |
| Brenus PAT | `.../contents/datasets/artistry7-platinum-window` | **401** | Same — subtree not reachable |

**Consequence:** I have **not** seen `run_artistry7_proxy_pipeline.py`, the 427-patient label/score table, the cutpoint logic, or any survival curve. Therefore I **cannot verify** the p=0.0038 log-rank statistic, the IMMUNE_ACCESS weights, the SPE gates, or the 1A/1B assignment rule. Nothing in these documents should be read as confirming those numbers. To verify, I need a token scoped to `fjkiani/data-room` or the files mirrored into `fjkiani/Brenus`.

---

## 2. What IS verified (independent public sources)

### ARTISTRY-7 trial facts — VERIFIED via press release, trial registry, and oncology press
- **Trial:** ARTISTRY-7, NCT05092360 (GOG-3063; ENGOT-OV68). Phase 3, multicenter, open-label, randomized. [8, 13]
- **Population:** platinum-**resistant** epithelial ovarian, fallopian tube, or primary peritoneal cancer (PROC). [8, 13]
- **Design:** 4 arms, 456 patients enrolled, ~3:1:1:3 randomization: (1) nemvaleukin alfa + pembrolizumab, (2) pembrolizumab mono, (3) nemvaleukin mono, (4) investigator's choice single-agent chemotherapy. Only arms 1 vs 4 were powered for statistical comparison. [11, 12, 14]
- **Primary endpoint:** overall survival (OS). [13]
- **OUTCOME — NEGATIVE:** prespecified interim analysis (at ~77% of events) by the independent data monitoring committee showed **no statistically significant OS improvement**. **Median OS 10.1 mo (nemvaleukin+pembro) vs 9.8 mo (IC chemo), HR 0.98.** Company judged final success "highly unlikely," terminated the trial, and ceased nemvaleukin development for PROC. [8, 9, 11]
- **Per-arm median OS (ClinicalTrials.gov):** nemva+pembro 10.1 (7.4–12.5); pembro 10.1 (4.0–NA); nemva mono 10.7 (8.1–13.9); IC chemo 9.8 (8.2–11.5). [13]
- **Sponsor's own stated interpretation:** ovarian cancer is "an immunologically cold tumor" with "few treatment options that improve survival." [11] — a documented, citable hook for an immune-access hypothesis, but NOT evidence of a responsive subgroup.

**Key implication for framing:** HR 0.98 is an essentially null average effect. The combination did not measurably extend survival in the enrolled (unselected) PROC population. Any subgroup-benefit claim is, by construction, a *post-hoc hypothesis* until tested on ARTISTRY-7's own patient-level data under a prespecified rule.

---

## 3. What is QUARANTINED (asserted in the directive, not verifiable here)

| Item | Asserted value | Status |
|---|---|---|
| 427-patient TCGA-OV stratifier exists & is deterministic | `run_artistry7_proxy_pipeline.py` | ✅ **VERIFIED** — cloned, read, re-executed; 427 rows one-per-sample |
| Log-rank p on 427-patient cohort | p = 0.0038 | ✅ **VERIFIED & REPRODUCED to 10 dp** — BUT it is a **3-tier** (triple/dual/none) prognostic log-rank, **not** the 1A/1B test |
| IMMUNE_ACCESS equation | `0.40·TCELL_GPS − 0.35·MYELOID_FLOOD − 0.25·STROMAL_CAGE` | ✅ **VERIFIED in code** — weights & z-scored gene-sets confirmed; map onto Desbois excluded-axis genes |
| SPE PK gate (Pub 10) | IC50/free_Cmax; kills Ivermectin (250×), clears Metformin (0.08×) | Present in repo (Pub 10 manuscript); remains a DRUG-TRIAGE gate, **not** a survival model (see §4) |
| SPE_COMPOSITE (Pub 11) | M2-macrophage + metformin TME score | ✅ **VERIFIED** — `SPE_COMPOSITE_SCORE` column present; drives tier assignment |
| 1A/1B split rule | TIER_1A_ACCESSIBLE vs TIER_1B_CAGED | ✅ counts VERIFIED (54/53) — ⚠️ **but 1A-vs-1B log-rank p=0.126 (NS, self-computed); split is NOT significant** |
| IMMUNE_ACCESS threshold = 0.40 | narrative gate | ⚠️ **VERIFIED as a HARDCODED DESIGN CONSTANT**, not data-derived (repo's own audit); Cox on split p=0.057 (NS) |
| PLATINUM_WINDOW subgroup | 9 patients, all platinum-sensitive, KM median 84.1 mo | ✅ VERIFIED counts — ⚠️ **n=9, 5 events, CI-upper not estimable; window-vs-rest p=0.31; underpowered** |
| PLATINUM_WINDOW definition | (TIER == 1A_ACCESSIBLE) AND (PLATINUM_STATUS == sensitive) | Definition recorded; inputs unverified |

**These are treated as a SPECIFICATION to design against, not as established results.**

---

## 4. What I explicitly did NOT do, and why (integrity guardrails)

1. **I did NOT confirm that "p=0.0038 supersedes the GSE30161 exploration."** They answer different questions: a within-cohort log-rank association (TCGA-OV) is not a substitute for an out-of-distribution transfer test (GSE30161→GSE63885 AUROC 0.638). A strong internal p-value does not establish external generalization. The GSE30161 external-transfer finding is **retained**, not deleted; both stand as answers to different questions.
2. **I did NOT invoke the frozen PRODUCT ranker (`fit = clip((p·t)/‖t‖₂,0,1)`) or the SPE PK gate as an outcome/survival model.** Per standing workstream constraints, the SPE feasibility gate (IC50/Cmax) is a drug-triage filter; it is not evidence that a survival stratifier generalizes. Those lanes are kept separate.
3. **I did NOT draft "the drug did not fail, patient selection did" as a proof.** ARTISTRY-7 is a randomized trial with a null OS result (HR 0.98). Constructing a 1A/1B split from an *external* cohort (TCGA-OV) and asserting it *explains* the trial failure is a textbook post-hoc rescue narrative unless the split is prespecified and applied to ARTISTRY-7's **own** patient-level outcomes. I drafted it strictly as a **prospectively-testable hypothesis** (see `03_ARTISTRY7_1A1B_HYPOTHESIS.md`), labeled exploratory.
4. **I did NOT fabricate the contents of inaccessible files.** No invented survival curves, coefficients, or patient rows.

---

## 5. Citations used in this ledger
Numbering matches the session's retrieved sources.
- [8] Mural Oncology press release, 25 Mar 2025 (ir.muraloncology.com).
- [9] OncNursingNews, 27 Mar 2025.
- [11] TargetedOnc, 25 Mar 2025 (incl. CEO quote on cold tumor).
- [12] GlobeNewswire, 25 Mar 2025.
- [13] ClinicalTrials.gov NCT05092360 (per-arm OS; termination note).
- [14] BioSpace, 25 Mar 2025 (77% events interim; arms 1 & 4 powered).
