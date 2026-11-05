# CORE-05 — AtezoTRIBE
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## Header

| Field | Value |
|---|---|
| Trial name | AtezoTRIBE |
| NCT identifier | NCT03721653 |
| Sponsor | Fondazione IRCCS Istituto Nazionale dei Tumori, Milan |
| Phase | Randomized Phase II |
| Setting | 1L mCRC (all-comers, including pMMR/MSS) |
| Tier | **TIER1** — peer-reviewed, verified |
| Admissibility | VERIFIED — PMID 39908699 (ESMO Open 2025); Antoniotti et al. Lancet Oncol 2022 |
| Status | COMPLETED — pMMR subgroup negative |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | PFS |
| ITT PFS HR | 0.69 (95% CI 0.52–0.91, p=0.0075) — significant in ITT |
| **pMMR subgroup PFS HR** | **0.86 (95% CI 0.63–1.17) — NOT significant** |
| pMMR OS HR (4-year) | 0.80 (80% CI 0.63–1.02) — trend only |
| Immunoscore-IC high pMMR | PFS HR ~0.50 (exploratory) |
| Verdict | **pMMR/MSS benefit NOT demonstrated; ITT benefit driven by dMMR/MSI-H subgroup** |

**Evidence level:** [PHARMACODYNAMIC ACTIVITY] in pMMR — Immunoscore-IC high subgroup shows exploratory signal. No statistically significant benefit in pMMR/MSS population.

**Failure domains:**
- **D2 Selection** — Unselected enrollment dilutes IO signal; pMMR HR 0.86 NS reflects mixing of IO-sensitive (~20-30% immune-inflamed) with IO-resistant (~70-80% cold) pMMR tumors
- **D5 Attribution** — FOLFOXIRI backbone too active; high response rate in control arm makes IO contribution undetectable in unselected population

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.10 | Minor DDR stress from oxaliplatin in FOLFOXIRI |
| mapk | 0.10 | No direct MAPK targeting |
| pi3k | 0.05 | No PI3K targeting |
| vegf | 0.65 | Bevacizumab — dominant VEGF axis |
| her2 | 0.00 | No HER2 targeting |
| io | 0.70 | Atezolizumab (PD-L1) — strong IO axis |
| efflux | 0.00 | 1L, treatment-naive |

**Vector norm ‖t‖₂:** 0.9619

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.5843** |
| fit_B (liver-met POS) | 0.3671 |
| Δ (fit_A − fit_B) | 0.2172 |
| Rank by fit_A | 2 of 7 |
| Rank by Δ | 6 of 7 |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** High VEGF axis (bev=0.65) and IO axis (atezo=0.70) produce the second-highest fit_A. The moderate delta (0.2172) reflects that the VEGF axis is partially liver-met independent — bev backbone activity persists regardless of liver-met status. The IO axis (0.70) contributes to liver-met sensitivity, but the VEGF axis (0.65) partially offsets it.

**What the score does NOT mean:** The high fit_A does not imply AtezoTRIBE demonstrated IO benefit in pMMR/MSS patients. The pMMR subgroup HR 0.86 is not significant. The ITT benefit is driven by the dMMR/MSI-H minority.

---

## Decode Narrative

AtezoTRIBE is the canonical D2 Selection failure in 1L MSS mCRC IO. The trial enrolled all-comers — MSS and MSI-H together — without pre-specifying a biomarker-enriched primary analysis. The ITT result (PFS HR 0.69) looks promising until you disaggregate it: the benefit is concentrated in the dMMR/MSI-H subgroup, which represents ~5% of mCRC. The pMMR/MSS subgroup — the population relevant to BreAK CRC-001 — showed HR 0.86, not statistically significant.

The Immunoscore-IC high pMMR subgroup (PFS HR ~0.50, exploratory) is the most important signal from this trial. It identifies a subset of pMMR/MSS patients — approximately 20-30% — who have pre-existing immune infiltration and may benefit from IO. The DetermaIO gene signature (HR ~0.45 in high expressors) points in the same direction.

These signals are exploratory. They are not prospectively validated. But they represent the best available hypothesis for identifying the IO-sensitive minority within the pMMR/MSS population.

**The liver metastasis finding is nuanced:** In AtezoTRIBE, liver metastases did NOT predict resistance when Immunoscore-IC was high. This is the one trial in the comparator set where the liver-met signal is attenuated by immune infiltrate status. The implication: liver-met suppression of IO may be overcome in patients with pre-existing high immune infiltration. This does not contradict the CO.26 liver-met finding — it refines it.

---

## BreAK CRC-001 Implication

**Single actionable lesson:** BreAK CRC-001's KRAS-mutant enrichment (Arm 2A-1) is a direct response to the AtezoTRIBE selection failure — molecular marker enrichment is necessary. However, KRAS mutation alone may be insufficient. The AtezoTRIBE Immunoscore-IC signal suggests that immune infiltrate pre-selection may be needed beyond molecular marker alone. BreAK CRC-001 should consider pre-specifying Immunoscore-IC or DetermaIO as an exploratory stratification variable in Phase IIa to identify the IO-sensitive subgroup within the KRAS-mutant MSS population.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 |
| Primary PFS source | Antoniotti et al. Lancet Oncol 2022 (DOI 10.1016/s1470-2045(22)00274-1) |
| OS source | Antoniotti et al. JCO 2024 (DOI 10.1200/jco.23.02728); PMID 39908699 |
| Immunoscore-IC source | Antoniotti et al. Clin Cancer Res 2023 (DOI 10.1158/1078-0432.ccr-22-3878) |
| Evidence level | PHARMACODYNAMIC ACTIVITY in pMMR — exploratory subgroup signals only |
| BLOCKED fields | None in this file |
| PATH B | Not used |
