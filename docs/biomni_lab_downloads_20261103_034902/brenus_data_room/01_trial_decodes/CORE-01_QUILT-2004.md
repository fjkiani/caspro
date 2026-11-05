# CORE-01 — QUILT-2.004
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## Header

| Field | Value |
|---|---|
| Trial name | QUILT-2.004 |
| NCT identifier | NCT03050814 |
| Sponsor | National Cancer Institute (NCI/NIH) |
| PI | Julius Y. Strauss MD |
| Phase | Randomized Phase II |
| Setting | 1L MSS/pMMR mCRC |
| Tier | **TIER1** — peer-reviewed, verified |
| Admissibility | VERIFIED — PMID 35274710 + ClinicalTrials.gov registry results module |
| Status | TERMINATED for futility |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | PFS |
| Arm A (SOC) median PFS | 8.8 months (95% CI 3.3–17.0) |
| Arm B (SOC + vaccine + avelumab) median PFS | 10.1 months (95% CI 3.6–16.1) |
| Hazard ratio | 1.061 (95% CI 0.380–2.966) |
| p-value (log-rank) | 0.91 |
| ORR | 52% vs 54% — consistent with chemotherapy alone |
| Enrolled | 30 (target 70) — terminated at unplanned interim |
| Verdict | **NEGATIVE — terminated for futility** |

**Evidence level:** [PHARMACODYNAMIC ACTIVITY] — CEA-specific T-cell responses induced in >80% of vaccinated patients. No PFS benefit. Immune responses did not translate to clinical benefit.

**Failure domains:**
- **D1 Biology** — Single-antigen CEA targeting insufficient for MSS TME; CEA is a self-antigen with central tolerance issues; T cells generated but functionally suppressed
- **D3 Architecture** — n=30, far short of 70-subject target; wide CI (0.380–2.966) reflects underpowering; terminated before primary analysis

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.00 | No DDR pathway targeting |
| mapk | 0.10 | No direct MAPK targeting; minor indirect effect |
| pi3k | 0.05 | No PI3K targeting |
| vegf | 0.60 | Bevacizumab backbone — dominant VEGF axis |
| her2 | 0.00 | No HER2 targeting |
| io | 0.70 | Avelumab (PD-L1) + CEA vaccine — dual IO mechanism |
| efflux | 0.00 | 1L, treatment-naive |

**Vector norm ‖t‖₂:** 0.9434

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.5815** |
| fit_B (liver-met POS) | 0.3553 |
| Δ (fit_A − fit_B) | 0.2261 |
| Rank by fit_A | 3 of 7 |
| Rank by Δ | 5 of 7 |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** QUILT-2.004 has the closest structural match to BreAK CRC-001 — identical backbone (mFOLFOX6 + bev), identical line (1L), identical MSS/pMMR population. The high VEGF axis (bev=0.60) and IO axis (avelumab=0.70) produce moderate fit_A. The delta (0.2261) reflects that the IO component is sensitive to liver-met status.

**What the score does NOT mean:** The moderate fit_A does not imply QUILT-2.004 was a well-designed trial. It was terminated for futility at n=30. The null result (HR 1.061) is the historical floor that STC-1010 must clear.

**Design precedent value (structural elements only — NOT efficacy):**
- Safety lead-in: n=6, ≤1 DLT threshold — directly applicable to BreAK CRC-001 Phase 1
- Bevacizumab sequencing: Day 2 after vaccine/avelumab on Day 1 — applicable to BreAK CRC-001 bev arm
- Oxaliplatin dose reduction in vaccine arm: 85 mg/m² (SOC) vs 68 mg/m² (vaccine arm)

---

## Decode Narrative

QUILT-2.004 is the most structurally similar trial to BreAK CRC-001 in the comparator set. Same backbone. Same line. Same population. Same randomized design. It failed.

The failure is instructive. CEA is a shared tumor-associated antigen expressed on normal colonic epithelium — it is a self-antigen. The immune system has been trained to tolerate it. Even with avelumab removing the PD-L1 brake, the vaccine-primed T cells could not overcome the MSS TME's structural immunosuppression. T-cell responses were generated in >80% of patients. They did not translate to tumor regression.

The wide confidence interval (0.380–2.966) is not a sign of promise — it is a sign of underpowering. The trial was terminated before it could generate interpretable data. The HR of 1.061 is the point estimate, but the true effect could be anywhere from a 62% reduction to a 197% increase in hazard. This trial cannot be cited as evidence of anything except that the approach was tested and abandoned.

**The lesson for STC-1010:** Multi-antigen whole-cell vaccine (STC-1010) vs. single-antigen CEA vaccine (QUILT-2.004) is the key mechanistic distinction. STC-1010's DNFB haptenation creates a danger signal that CEA alone cannot. This distinction must be explicit in the BreAK CRC-001 protocol rationale.

---

## BreAK CRC-001 Implication

**Single actionable lesson:** STC-1010's whole-cell multi-antigen approach must be mechanistically distinguished from single-antigen CEA targeting in the protocol rationale. The QUILT-2.004 null result (HR 1.061, terminated for futility) is the primary negative precedent. BreAK CRC-001 must pre-specify what makes STC-1010 different — ICD mechanism via DNFB haptenation, antigen breadth across the full tumor proteome, and the danger signal that drives DC maturation — and why that difference is expected to produce a different outcome.

**GAP relevance:** QUILT-2.004's termination at n=30 underscores the importance of BreAK CRC-001's Phase 1 safety lead-in design. The structural precedent (6-patient safety lead-in, bev Day 2 sequencing) is valid and applicable. The efficacy framing is not.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 |
| Primary source | PMID 35274710 (Redman et al. Oncologist 2022) |
| Registry source | NCT03050814 results module — ClinicalTrials.gov API v2 |
| NCT correction | Prior canon cited NCT02853604 — CORRECTED to NCT03050814 (C-002) |
| HR correction | Prior canon cited HR 1.02 (0.65–1.60) — CORRECTED to HR 1.061 (0.380–2.966) (C-003) |
| Framing correction | Prior canon framed as positive design precedent — CORRECTED to NEGATIVE terminated trial (C-006) |
| BLOCKED fields | None in this file |
| PATH B | Not used |
