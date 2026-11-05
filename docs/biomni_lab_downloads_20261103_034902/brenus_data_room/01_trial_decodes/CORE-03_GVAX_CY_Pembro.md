# CORE-03 — GVAX + Cyclophosphamide + Pembrolizumab
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## Header

| Field | Value |
|---|---|
| Trial name | GVAX + Cyclophosphamide + Pembrolizumab |
| NCT identifier | NCT02981524 |
| Sponsor | Sidney Kimmel Comprehensive Cancer Center / Johns Hopkins |
| Phase | Phase II |
| Setting | pMMR/MSS advanced CRC, refractory |
| Tier | **TIER1** — peer-reviewed, verified |
| Admissibility | VERIFIED — Yarchoan et al. Cancer Med 2019 (DOI 10.1002/cam4.2763) |
| Status | COMPLETED — negative result |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | ORR |
| ORR | **0% (0/22 evaluable patients)** |
| Stable disease | ~30% |
| T-cell responses | Confirmed in peripheral blood |
| CD8+ infiltration | Increased in tumor biopsies (subset) |
| Verdict | **NEGATIVE — ORR 0% despite pharmacodynamic immune activity** |

**Evidence level:** [PHARMACODYNAMIC ACTIVITY] — Vaccine induced T-cell responses to tumor antigens. Tumor biopsies showed increased CD8+ infiltration. No clinical responses. Pharmacodynamic activity ≠ clinical benefit.

**Failure domains:**
- **D1 Biology** — ORR 0% despite confirmed T-cell responses and CD8+ infiltration; TME suppression (TGF-β, MDSCs) prevents effector function at tumor site; peripheral T-cell induction is necessary but not sufficient
- **D2 Selection** — Refractory setting with maximal immune exclusion; heavily pretreated patients with established immunosuppressive TME

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.00 | No DDR pathway targeting |
| mapk | 0.05 | No direct MAPK targeting |
| pi3k | 0.05 | No PI3K targeting |
| vegf | 0.00 | No anti-VEGF component |
| her2 | 0.00 | No HER2 targeting |
| io | 0.90 | GVAX whole-cell vaccine + cyclophosphamide + pembrolizumab (PD-1) — dominant IO mechanism |
| efflux | 0.00 | Refractory but no efflux-specific targeting |

**Vector norm ‖t‖₂:** 0.9028

**Vector geometry note:** Low fit_A (0.4486) is a **vector geometry artifact**, not a clinical relevance judgment. GVAX has no MAPK or VEGF axis, so the patient's KRAS burden (mapk=0.70) and bev backbone (vegf=0.30) are unmatched. GVAX is the mechanistically closest analog to STC-1010 in the comparator set despite its low fit score.

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.4486** |
| fit_B (liver-met POS) | 0.1495 |
| Δ (fit_A − fit_B) | 0.2991 |
| Rank by fit_A | 6 of 7 |
| Rank by Δ | 2 of 7 |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** The low fit_A (0.4486) reflects that GVAX has no MAPK or VEGF axis — the patient's dominant oncogenic driver (KRAS/MAPK) and backbone component (bev/VEGF) are unmatched. The high delta (0.2991) confirms that pure IO mechanisms are maximally sensitive to liver-met IO suppression. This is mechanistically correct: a pure IO trial with no MAPK/VEGF axes will show the largest fit difference between liver-met NEG and liver-met POS patients.

**What the score does NOT mean:** The low fit_A does not mean GVAX is clinically irrelevant to STC-1010. It is the most important comparator in the set. The score measures mechanism-axis alignment, not clinical relevance.

---

## Decode Narrative

GVAX is the mechanistic mirror of STC-1010. Both are whole-cell vaccines. Both use cyclophosphamide as an immunostimulant. Both combine with a checkpoint inhibitor (GVAX: pembrolizumab; STC-1010: mFOLFOX6 as the immunogenic backbone). The mechanism class is identical.

GVAX failed with ORR 0% in 22 evaluable patients. Not a single objective response. This is the most important number in the entire comparator set for BreAK CRC-001.

But the failure is not a failure of the vaccine concept — it is a failure of the TME. T-cell responses were generated. CD8+ T cells infiltrated tumors in some patients. The immune system was primed. The T cells arrived at the tumor margin. And then they stopped. TGF-β, MDSCs, and regulatory T cells suppressed their effector function before they could kill tumor cells.

This is the central lesson of MSS CRC IO: **the bottleneck is not T-cell priming — it is T-cell trafficking and effector function within the TME.**

STC-1010's DNFB haptenation mechanism is designed to address this bottleneck differently from GVAX's GM-CSF secretion approach. DNFB creates a contact hypersensitivity danger signal that drives dendritic cell maturation through a different pathway than GM-CSF. Whether this difference is sufficient to overcome the TME suppression that defeated GVAX is the central scientific question of BreAK CRC-001.

The refractory setting of the GVAX trial (vs. 1L for BreAK CRC-001) is a meaningful difference — earlier treatment means less established immunosuppression. But the GVAX lesson cannot be dismissed on this basis alone. The TME suppression mechanisms (TGF-β, MDSCs, liver immune tolerance) are present in 1L disease as well.

---

## BreAK CRC-001 Implication

**Single actionable lesson:** BreAK CRC-001 must pre-specify **clinical endpoints (PFS, ORR) as primary**, not immune biomarkers (DTH, T-cell responses, CD8+ infiltration). Pharmacodynamic immune activity is necessary but not sufficient for clinical benefit in MSS CRC. The GVAX lesson is explicit and directly applicable to STC-1010: T-cell responses will likely be generated; the question is whether they translate to tumor regression.

**Secondary implication:** The protocol rationale must explicitly address how STC-1010's DNFB haptenation mechanism is expected to overcome the TME suppression that defeated GVAX. GM-CSF secretion vs. DNFB danger signal — what is the mechanistic basis for expecting a different outcome? This question will be asked by every IRB reviewer and pharma BD partner who reads the protocol.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 |
| Primary source | Yarchoan et al. Cancer Med 2019 (DOI 10.1002/cam4.2763) |
| Evidence level | PHARMACODYNAMIC ACTIVITY — T-cell responses confirmed; ORR 0% |
| BLOCKED fields | None in this file |
| PATH B | Not used |
