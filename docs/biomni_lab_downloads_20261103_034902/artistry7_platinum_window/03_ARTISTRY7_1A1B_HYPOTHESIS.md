# ARTISTRY-7 and the 1A/1B Stromal-Cage Stratification — A Prospectively-Testable Hypothesis

**Date:** 2026-07-18
**Framing (locked):** This document is a **mechanistic hypothesis for prospective / patient-level retrospective testing.** It is **NOT** a proof that "the drug did not fail, patient selection did." That specific claim cannot be made from the available evidence and is explicitly declined here (see §5). Trial facts are verified (`00_PROVENANCE_AND_VERIFICATION_LEDGER.md`); the 427-patient TCGA-OV stratifier and its p=0.0038 remain UNVERIFIED (data-room inaccessible).

---

## 1. The verified failure to be explained

ARTISTRY-7 (NCT05092360; GOG-3063; ENGOT-OV68) tested **nemvaleukin alfa + pembrolizumab vs investigator's-choice chemotherapy** in **platinum-resistant** ovarian cancer (456 pts, 4 arms, OS primary). At the prespecified interim (≈77% events), the combination showed **no OS benefit: median 10.1 vs 9.8 months, HR 0.98**; the trial was stopped and nemvaleukin PROC development ceased. [8, 9, 11, 13, 14]

**HR 0.98 is an essentially null average effect** — the combination did not measurably extend survival in the enrolled, molecularly-**unselected** PROC population. Any explanation must respect that starting point.

---

## 2. The mechanistic premise (literature-grounded)

The hypothesis rests on two independently-established facts:

**(A) Nemvaleukin's mechanism requires effector cells that can reach tumor.** Nemvaleukin (ALKS 4230) is an engineered intermediate-affinity IL-2R agonist that **selectively expands CD8⁺ T and NK cells while sparing Tregs** [21, 22]. Its demonstrated intratumoral pharmacodynamic effect is to **increase CD8⁺/NK density and shorten the tumor-to-effector-cell distance** [23]. A drug whose action is "expand and mobilize cytotoxic lymphocytes" can only translate to benefit **if those lymphocytes can physically access the tumor epithelium.**

**(B) A large fraction of ovarian tumors physically exclude T cells — a validated, outcome-associated axis.** In 370 ovarian tumors from the **ICON7 Phase III** cohort, Desbois et al. defined three phenotypes — infiltrated, **excluded** (CD8⁺ T cells trapped in stroma, not reaching epithelium), and desert — and showed the excluded phenotype is driven by **(i) loss of tumor MHC-I and (ii) TGF-β–activated stroma/desmoplasia forming a physical ECM barrier** (FAP⁺ fibroblasts, collagens, SPARC, ACTA2, TNC, LOX). The excluded phenotype maps onto the **Mesenchymal (MES) molecular subtype** and carries **significantly worse PFS even after adjustment for stage and debulking**; TGF-β inhibition restored MHC-I in vitro. [28] This is corroborated by single-cell/spatial work and immunophenotype-tailoring reviews [24, 26, 27].

**Synthesis:** (A) + (B) generate a clean, falsifiable prediction — **nemvaleukin+pembro can only benefit patients whose tumors are immunologically *accessible* (open cage); in *caged* (excluded/MES/high-stroma) tumors the drug's expanded effectors are barred from the epithelium and no survival benefit is expected.** Averaging responders (accessible) with non-responders (caged) in an unselected trial would dilute any true effect toward the null — consistent with HR 0.98.

---

## 3. How 1A/1B operationalizes the premise

The `fjkiani/data-room` framework proposes to split "bad-biology" patients by cage state:
- **`TIER_1A_ACCESSIBLE`** — open cage: effectors can reach tumor → immune-access-dependent regimens (nemvaleukin+pembro) are *plausible*.
- **`TIER_1B_CAGED`** — closed cage (high `STROMAL_CAGE`, high `MYELOID_FLOOD`, low `TCELL_GPS`) → effectors barred → immune-access-dependent regimens *expected to fail*.

via `IMMUNE_ACCESS = 0.40·TCELL_GPS − 0.35·MYELOID_FLOOD − 0.25·STROMAL_CAGE` (weights UNVERIFIED). Conceptually this is a **quantitative re-expression of the Desbois excluded-vs-infiltrated axis** [28]: the two *subtractive* terms (stroma, myeloid) encode the physical/suppressive barrier; the additive term (T-cell) encodes effector presence. **The concept is biologically well-founded. Its specific weights and cutpoint are not verified.**

---

## 4. The hypothesis, stated as a testable protocol

> **H1:** Among ARTISTRY-7 patients, the nemvaleukin+pembro OS benefit vs chemotherapy is concentrated in `TIER_1A_ACCESSIBLE` tumors and absent in `TIER_1B_CAGED` tumors (predictive biomarker; significant treatment×tier interaction).

**Minimum evidence required to support H1 (none of which exists yet):**
1. The 1A/1B classifier applied to **ARTISTRY-7's own patients** (archival tissue / RNA), not a TCGA proxy.
2. A **prespecified** tier cutpoint (locked before looking at ARTISTRY-7 outcomes) — otherwise the split is data-dredged.
3. A **treatment-by-tier interaction test** on OS in the randomized arms 1 vs 4 (the interaction, not a within-1A subgroup p-value, is what distinguishes a *predictive* from a merely *prognostic* marker — and Desbois already shows cage state is **prognostic** [28], so a within-arm survival difference is expected even with an inert drug).
4. Replication or, at minimum, multiplicity-corrected reporting.

**What the TCGA-OV p=0.0038 can and cannot establish:** a log-rank split on TCGA-OV shows the cage axis is **prognostic** in ovarian cancer — which Desbois already established [28]. It says **nothing** about whether nemvaleukin *works better* in 1A, because TCGA-OV patients did not receive nemvaleukin. Prognostic ≠ predictive. This is the single most important limitation.

> **⟳ VERIFIED UPDATE (2026-07-18):** The pipeline was cloned and re-executed on the 427-patient table (`04_VAULT_VERIFICATION_REPORT.md`). Findings that directly bear on H1:
> - **p=0.0038 is a 3-tier prognostic log-rank** (TIER_1_TRIPLE/TIER_2_DUAL/TIER_3_NONE), reproduced to 10 dp — and it is **monotone in bad-biology flag count** (most flags = worst OS). This is exactly the *prognostic* pattern predicted above, in an untreated cohort. It is **not** the 1A/1B contrast.
> - **The 1A-vs-1B split itself is NOT statistically significant** (self-computed log-rank **p=0.126**; 1A median 38.0 mo vs 1B 34.4 mo). Direction matches H1 (accessible > caged) but the cohort is underpowered for it.
> - **PLATINUM_WINDOW is n=9** (5 events, CI-upper not estimable) — far too small for any claim.
> **Net effect on H1:** the biology and *direction* are consistent, but the specific accessible-vs-caged separation the hypothesis needs is **not yet demonstrated even in the proxy cohort**, let alone in ARTISTRY-7 patients. H1 remains a hypothesis requiring prospective, patient-level, prespecified testing — the verification strengthens, not weakens, that conclusion.

---

## 5. What is explicitly NOT claimed (and why)

- **NOT claimed: "nemvaleukin did not fail; selection failed."** To assert this, H1 must be confirmed on ARTISTRY-7's own patient-level data under a prespecified rule. That analysis has not been done here (no access to trial-patient data, and the classifier itself is unverified). Asserting it now would be a **post-hoc rescue narrative** — exactly the pattern regulators and reviewers discount, and the kind of overclaim that discredits an otherwise sound biomarker program.
- **NOT claimed: the specific weights (0.40/0.35/0.25) or the 1A/1B cutpoint are correct.** Quarantined pending pipeline access.
- **NOT claimed: p=0.0038 supports release or supersedes the GSE30161 external-transfer work.** Different question (internal prognosis vs out-of-distribution transfer); see ledger §4.
- **Also honest:** the immune-excluded/MES axis is **already known** [24, 26, 27, 28]. The 1A/1B framing is a credible *application* of established biology to a specific drug, not a novel discovery. Its value is as a **prospective selection hypothesis**, and its novelty (if any) lies in the specific composite and its use as a companion-diagnostic for IL-2-variant + PD-1 therapy.

---

## 6. Asset-salvage rationale (honest version)

The defensible business/scientific case is **not** "the drug secretly works." It is:

> ARTISTRY-7 enrolled a molecularly-unselected platinum-resistant population into a therapy whose mechanism (CD8/NK expansion and mobilization [21, 22, 23]) is predicted to be inert wherever a validated stromal/TGF-β barrier excludes effectors from tumor [28]. A prespecified **immune-access companion diagnostic (1A vs 1B)** is a scientifically coherent way to test whether an accessible subgroup exists — the same immunophenotype-tailoring strategy now advocated for ovarian IO broadly [27]. If (and only if) a treatment×tier interaction is confirmed on ARTISTRY-7 tissue, the asset could be repositioned to a biomarker-defined 1A population. **Until then this is a hypothesis worth the cost of a retrospective biomarker analysis on banked ARTISTRY-7 samples — not a claim that the pivotal readout was wrong.**

This framing is defensible in front of a scientific reviewer or regulator precisely because it (a) states the null trial result plainly, (b) grounds the mechanism in independent literature, (c) demands the drug's own trial data to test the rescue, and (d) distinguishes prognostic from predictive.

---

## Citations
- [8] Mural Oncology press release, 25 Mar 2025. [9] OncNursingNews, 27 Mar 2025. [11] TargetedOnc, 25 Mar 2025. [13] ClinicalTrials.gov NCT05092360. [14] BioSpace, 25 Mar 2025.
- [21] Lopes et al. 2020, *J Immunother Cancer* (ALKS 4230 CD8-selective). [22] Lopes et al. 2021, *JPET* (CD8/NK expansion, Treg-sparing, cyno PK/PD). [23] Donatelli et al. 2024, SITC/ARTISTRY-3 (intratumoral CD8/NK density, shortened effector distance).
- [24] He et al. 2025, *Front Immunol* (TGF-β T-cell exclusion). [26] Hornburg et al. 2021, *Cancer Cell* (chemokine-driven immune phenotypes). [27] Ghisoni et al. 2024, *Nat Rev Clin Oncol* (immunophenotype-based ovarian IO). [28] Desbois et al. 2020, *Nat Commun* (ICON7; excluded phenotype = MHC-I loss + TGF-β stroma; MES; worse PFS).
