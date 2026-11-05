# CORE-04 — IMblaze370
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## ⚠️ FALSE POSITIVE WARNING — READ BEFORE CITING

**IMblaze370 ranks first on fit_A (0.8262). This score is mechanistically misleading. IMblaze370 is a Phase III definitive negative — OS HR=1.00, ORR 3% vs 2%, no biomarker subgroup rescued. The MEKi immune priming hypothesis was definitively falsified in humans. The high score is a warning about the patient population's MAPK burden, not a recommendation. Do not cite fit_A=0.8262 without this caveat.**

---

## Header

| Field | Value |
|---|---|
| Trial name | IMblaze370 |
| NCT identifier | NCT02788279 |
| Sponsor | F. Hoffmann-La Roche / Genentech |
| Phase | Phase III (randomized) |
| Setting | 3L+ mCRC, predominantly MSS |
| Tier | **TIER1** — Phase III peer-reviewed |
| Admissibility | VERIFIED — Eng et al. Lancet Oncol 2019 (DOI 10.1016/s1470-2045(19)30027-0) |
| Status | COMPLETED — definitive negative |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | OS |
| OS — atezo + cobimetinib | 8.87 months |
| OS — atezolizumab mono | 7.10 months |
| OS — regorafenib | 8.51 months |
| OS HR (atezo+cobi vs rego) | **1.00** — no difference |
| ORR | 3% vs 2% vs 2% — no difference |
| Biomarker subgroups | All negative — PD-L1, TMB, MSI, ATG16L1 |
| Verdict | **DEFINITIVE NEGATIVE — Phase III; MEKi immune priming hypothesis permanently falsified** |

**Evidence level:** [PROVEN EFFICACY — NEGATIVE] — Phase III randomized trial. Primary endpoint not met. No subgroup rescued. Highest level of evidence for a null result.

**Failure domains:**
- **D1 Biology** — MEK inhibition failed to convert MSS tumors to immunogenic; T-cell infiltration not achieved at scale in humans despite preclinical synergy
- **D7 Translational** — Murine synergy (MEKi + anti-PD-L1) did not translate to human MSS CRC; preclinical models did not recapitulate hepatic TME suppression or KRAS-driven MDSC recruitment

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.05 | Minor DDR stress from MEK inhibition |
| mapk | 0.85 | Cobimetinib — direct MEK1/2 inhibition; dominant MAPK axis |
| pi3k | 0.10 | Minor PI3K cross-talk from MEK inhibition |
| vegf | 0.00 | No anti-VEGF component |
| her2 | 0.00 | No HER2 targeting |
| io | 0.50 | Atezolizumab (PD-L1) — moderate IO axis |
| efflux | 0.00 | 3L+ but no efflux-specific targeting |

**Vector norm ‖t‖₂:** 0.9874

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.8262** ⚠️ FALSE POSITIVE |
| fit_B (liver-met POS) | 0.6751 |
| Δ (fit_A − fit_B) | 0.1511 |
| Rank by fit_A | **1 of 7** ⚠️ FALSE POSITIVE |
| Rank by Δ | 7 of 7 (lowest) |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** The patient's KRAS-driven MAPK burden (mapk=0.70) aligns strongly with cobimetinib's MEK inhibition (mapk=0.85). The dot product is large. The formula correctly identifies this axis alignment. The score is mathematically valid.

**What the score does NOT mean:** fit_A=0.8262 does not mean IMblaze370 is a good comparator for STC-1010. It does not mean MEK inhibition is a viable strategy in MSS CRC. It does not mean the patient population will respond to MAPK-targeting agents. The MAPK axis is real and large in this patient population — but the mechanism of targeting it (MEK inhibition) has been definitively falsified.

**Why the delta is lowest (0.1511):** MEK inhibition is not IO-dependent. Cobimetinib's mechanism does not require an intact immune TME. Liver-met status does not suppress MEK inhibition the way it suppresses IO mechanisms. Therefore the fit difference between liver-met NEG and liver-met POS patients is minimal — the MAPK axis dominates regardless of liver-met status.

---

## Decode Narrative

IMblaze370 is the paradigmatic example of why mechanism-axis alignment scores must be interpreted with clinical context.

The hypothesis was scientifically rational: MEK inhibition upregulates MHC-I expression on tumor cells, promotes T-cell infiltration, and synergizes with PD-L1 blockade in preclinical models. The murine data was compelling. The Phase I/II signal was encouraging. Roche ran a 363-patient Phase III trial.

OS HR=1.00. Not 0.99. Not 0.95. 1.00. The drug did nothing. ORR 3% vs 2% — indistinguishable from regorafenib, the standard of care at the time. Every biomarker subgroup was negative. PD-L1 high: negative. TMB high: negative. MSI: negative. ATG16L1: negative. No patient population was identified that benefited.

The reason is now understood. MEK inhibition in human MSS CRC does not achieve the T-cell infiltration seen in murine models. The human MSS CRC TME — with its hepatic immune tolerance, KRAS-driven MDSC recruitment, TGF-β-mediated T-cell exclusion, and low neoantigen density — is not recapitulated in the murine models that generated the preclinical rationale. The translational gap was absolute.

**The MAPK axis is real. The MEK inhibition mechanism is permanently closed.**

The patient population's KRAS-driven MAPK burden (mapk=0.70) is a genuine biological feature. It is not a scoring artifact. But targeting MAPK directly through MEK inhibition has been tested at Phase III scale and failed definitively. Any future MAPK-targeting strategy in MSS CRC must demonstrate a fundamentally different mechanism of action — not just a different MEK inhibitor.

STC-1010's ICD mechanism (DNFB haptenation → danger signal → DC maturation → CD8+ T-cell priming) does not target MAPK directly. The high fit_A score for IMblaze370 is a warning that the patient population's MAPK burden is large — not a suggestion that STC-1010 should be compared to IMblaze370 as a positive precedent.

---

## BreAK CRC-001 Implication

**Single actionable lesson:** The MEKi immune priming pathway is permanently closed in MSS CRC. STC-1010's ICD mechanism must be mechanistically distinguished from MEKi priming in the protocol rationale and in every CrisPRO positioning document. The distinction is: MEKi attempts to make tumor cells more visible to T cells by upregulating MHC-I; STC-1010 attempts to generate T cells that are primed against the full tumor antigen repertoire through danger-signal-driven DC maturation. These are different mechanisms targeting different bottlenecks. The IMblaze370 failure does not predict STC-1010's outcome — but it must be addressed explicitly.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 — Phase III peer-reviewed |
| Primary source | Eng et al. Lancet Oncol 2019 (DOI 10.1016/s1470-2045(19)30027-0) |
| Biomarker source | Argilés et al. Ann Oncol 2020 (DOI 10.1016/j.annonc.2020.04.047) |
| Evidence level | PROVEN EFFICACY — NEGATIVE (Phase III) |
| FALSE POSITIVE warning | Mandatory wherever fit_A=0.8262 appears |
| BLOCKED fields | None in this file |
| PATH B | Not used |
