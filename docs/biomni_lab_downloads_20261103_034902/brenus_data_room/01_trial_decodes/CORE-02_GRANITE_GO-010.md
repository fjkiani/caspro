# CORE-02 — GRANITE GO-010
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## ⚠️ TIER2 WARNING — READ BEFORE PROCEEDING

**This trial is TIER2. All data derives from press releases only (P-003). Gritstone Oncology filed for Chapter 11 bankruptcy. No peer-reviewed publication exists. PATH A scores are directional only. Do not cite GRANITE efficacy data in any external document, partner communication, or regulatory submission.**

---

## Header

| Field | Value |
|---|---|
| Trial name | GRANITE GO-010 |
| NCT identifier | NCT05141721 |
| Sponsor | Gritstone bio (Chapter 11 bankruptcy) |
| Phase | Phase II/III |
| Setting | 1L MSS mCRC (maintenance after 1L chemo) |
| Tier | **TIER2** — press-release only; company bankrupt |
| Admissibility | PRESS-RELEASE-ONLY (P-003) — directional scores only |
| Status | Primary endpoint NOT MET; company bankrupt |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | PFS |
| ITT PFS HR | 0.73 (90% CI 0.44–1.21) — NOT statistically significant |
| Low-ctDNA subgroup PFS HR | 0.50 (exploratory) — [PROVISIONAL] |
| Verdict | **Primary endpoint NOT MET** |
| Data source | Press release P-003 only — not peer-reviewed |

**Evidence level:** [PHARMACODYNAMIC ACTIVITY] — Neoantigen-specific T-cell responses in >90% of patients. ctDNA clearance correlated with PFS benefit in exploratory analysis. Primary endpoint not met.

**Failure domains:**
- **D8 Systemic** — Company in Chapter 11 bankruptcy; trial infrastructure collapsed
- **D6 Interpretability** — Immature data; HR 0.73 CI crosses 1.0; ctDNA threshold undefined; not peer-reviewed

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.00 | No DDR pathway targeting |
| mapk | 0.05 | No direct MAPK targeting |
| pi3k | 0.05 | No PI3K targeting |
| vegf | 0.50 | Bevacizumab backbone |
| her2 | 0.00 | No HER2 targeting |
| io | 0.85 | Triple IO: personalized neoantigen vaccine + atezolizumab + ipilimumab |
| efflux | 0.00 | Maintenance setting |

**Vector norm ‖t‖₂:** 0.9950

---

## PATH A Scores — DIRECTIONAL ONLY

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.5411** ⚠️ directional only |
| fit_B (liver-met POS) | 0.2832 ⚠️ directional only |
| Δ (fit_A − fit_B) | 0.2579 |
| Rank by fit_A | 4 of 7 |
| Rank by Δ | 4 of 7 |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means (directional only):** GRANITE's high IO weight (triple IO mechanism) produces moderate fit_A. The delta (0.2579) confirms IO-axis liver-met sensitivity. These scores are directional indicators of mechanism-axis alignment only.

**What the score does NOT mean:** These scores cannot be used to make any claim about GRANITE's efficacy, clinical validity, or relevance as a positive comparator. The trial failed its primary endpoint. The company is bankrupt. The data is unverified.

---

## Decode Narrative

GRANITE is the most ambitious vaccine trial attempted in 1L MSS mCRC. Personalized neoantigen vaccine (ChAd68 + self-amplifying mRNA) + atezolizumab + ipilimumab as maintenance after 1L chemotherapy. The hypothesis was sound: personalized neoantigens generate stronger, more specific T-cell responses than shared tumor-associated antigens; maintenance IO after chemotherapy-induced immunogenic cell death may sustain T-cell responses.

The primary endpoint was not met. The ITT PFS HR of 0.73 (90% CI 0.44–1.21) does not cross the significance threshold. The low-ctDNA subgroup HR of 0.50 is exploratory and hypothesis-generating only — the ctDNA threshold was not pre-specified, the subgroup was not powered, and the data has not been peer-reviewed.

The company's bankruptcy means this data will likely never be fully published. The trial infrastructure has collapsed. Any future citation of GRANITE data must carry the TIER2 label and the press-release-only caveat.

**The one signal worth tracking:** The low-ctDNA subgroup HR 0.50 [PROVISIONAL — P-003, Pint undefined, not pre-specified] is the strongest enrichment hypothesis in the field for vaccine-based approaches in 1L MSS mCRC. If this signal is real, it suggests that vaccine-primed T cells may be effective against low tumor burden but not against established metastatic disease with fully developed immunosuppressive TMEs. This is consistent with the AMPLIFY-201 ctDNA clearance data in minimal residual disease.

---

## BreAK CRC-001 Implication

**Single actionable lesson (PROVISIONAL — TIER2 source):** BreAK CRC-001 should pre-specify ctDNA as a stratification or primary subgroup variable. The GRANITE ctDNA-low signal [PROVISIONAL — P-003] is the best available hypothesis for molecular enrichment in 1L MSS mCRC vaccine trials. This is currently flagged as GAP (NDA-04) in the BreAK CRC-001 gap analysis. The implication is directional only — do not cite GRANITE as efficacy evidence for this design choice.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | **TIER2** |
| Primary source | P-003 — press release only; not peer-reviewed |
| Company status | Chapter 11 bankruptcy |
| Peer-reviewed publication | NONE |
| External citation | **PROHIBITED** — do not cite GRANITE efficacy data externally |
| PATH A scores | Directional only — do not use as efficacy evidence |
| BLOCKED fields | All GRANITE efficacy claims in external outputs |
| PATH B | Not used |
