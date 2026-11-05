# STC-1010 Positioning — What Must Be Different
**CrisPRO Cross-Cutting Analysis | Brenus Pharma Data Room**
**Audience:** Pharma BD, clinical partners, IRB reviewers
**Source:** brenus_comparator_path_a_report.md (LOCKED) + MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED)

---

## The Question Every Partner Will Ask

Thirty-plus IO trials have failed in MSS colorectal cancer. Whole-cell vaccines have been tried. Checkpoint inhibitors have been tried. MEK inhibitors have been tried. Neoantigen vaccines have been tried. Every combination imaginable has been tried. ORR 0% is the most common result.

Why will STC-1010 be different?

This document answers that question with specificity. Not with optimism. With mechanism.

---

## What Has Been Tried and Why It Failed

### Checkpoint Blockade Alone — Permanently Closed

**Trials:** CheckMate 142 MSS cohort (nivolumab mono, ORR 0%, n=74); KEYNOTE-158 MSS-TMB-H (pembrolizumab, ORR 0%); CheckMate 9X8 (nivolumab + mFOLFOX6 + bev, PFS HR=0.81 NS — **identical backbone to BreAK CRC-001**)

**Why it failed:** MSS CRC tumors are immunologically cold. Median TMB 3–5 mut/Mb vs 40–50 in MSI-H. No pre-existing T-cell infiltration. No PD-L1 to block. Checkpoint blockade reinvigorates exhausted T cells — but there are no T cells to reinvigorate in MSS CRC.

**CheckMate 9X8 is the most important null result for STC-1010 positioning.** It tested PD-1 blockade on the identical backbone (nivolumab + mFOLFOX6 + bev) in 1L mCRC (95% MSS). PFS HR=0.81, p=0.30. Primary endpoint not met. Phase 3 not triggered. This trial definitively closes the question of whether checkpoint blockade alone on the mFOLFOX6 ± bev backbone is sufficient in MSS mCRC. It is not.

**Implication for STC-1010:** STC-1010 must generate T cells that do not yet exist in the tumor — not reinvigorate T cells that are already there. This is a fundamentally different mechanism than checkpoint blockade.

---

### MEK Inhibition + PD-L1 — Permanently Closed

**Trial:** IMblaze370 (cobimetinib + atezolizumab, Phase III, OS HR=1.00, n=363)

**Why it failed:** MEK inhibition upregulates MHC-I and promotes T-cell infiltration in murine models. In humans, the hepatic immune tolerance mechanism, KRAS-driven MDSC recruitment, and TGF-β-mediated T-cell exclusion collectively prevent the T-cell infiltration that MEK inhibition was supposed to generate. The translational gap was absolute.

**Implication for STC-1010:** STC-1010's ICD mechanism does not target MAPK directly. The high CrisPRO fit score for IMblaze370 (fit_A=0.8262) reflects the patient population's KRAS-driven MAPK burden — not a recommendation that STC-1010 should be compared to IMblaze370 as a positive precedent. The MAPK axis is real; the MEK inhibition mechanism is permanently closed.

---

### Single-Antigen Vaccines + PD-L1 — Insufficient

**Trial:** QUILT-2.004 (CEA vaccine + avelumab + mFOLFOX6 + bev, HR=1.061, terminated for futility)

**Why it failed:** CEA is a self-antigen. Central tolerance limits the magnitude and quality of CEA-specific T-cell responses. Even with PD-L1 blockade, the vaccine-primed T cells could not overcome MSS TME suppression. T-cell responses were generated in >80% of patients. No PFS benefit.

**Implication for STC-1010:** Multi-antigen whole-cell vaccine (STC-1010) vs. single-antigen CEA vaccine (QUILT-2.004) is the key mechanistic distinction. STC-1010 presents the full tumor proteome — not a single antigen — as the immunogenic target. The breadth of antigen coverage is the mechanistic argument for why STC-1010 should generate a broader and more durable T-cell response than CEA alone.

---

### Whole-Cell Vaccine + CY + PD-1 — Insufficient (Most Important Comparator)

**Trial:** GVAX + cyclophosphamide + pembrolizumab (ORR 0%, n=22)

**Why it failed:** GVAX is the mechanistic mirror of STC-1010. Both are whole-cell vaccines. Both use cyclophosphamide. Both combine with immune checkpoint modulation. GVAX failed with ORR 0% despite confirmed T-cell responses and CD8+ infiltration.

**This is the most important failure for STC-1010 to address.** The bottleneck was not T-cell priming — GVAX primed T cells successfully. The bottleneck was T-cell trafficking and effector function within the TME. TGF-β and MDSCs suppressed the primed T cells before they could kill tumor cells.

**Implication for STC-1010:** The mechanistic differentiation between STC-1010 and GVAX is the DNFB haptenation mechanism. GVAX uses GM-CSF secretion to attract and activate dendritic cells. STC-1010 uses DNFB (dinitrofluorobenzene) haptenation to create a contact hypersensitivity danger signal — a fundamentally different DC activation pathway that drives a more intense and qualitatively different immune response.

The scientific question BreAK CRC-001 must answer: does DNFB-driven DC activation generate T cells with superior trafficking and effector function compared to GM-CSF-driven DC activation? The preclinical data (Alzeeb et al. 2024) shows superior tumor control in murine models. The human data does not yet exist.

---

## What STC-1010 Is Attempting That No Prior Trial Has Done

### The Mechanistic Gap No Trial Has Filled

Across all 7 CORE comparator trials, no trial has simultaneously addressed:
1. **T-cell priming** via a danger-signal-driven mechanism (not GM-CSF, not CEA, not MEK inhibition)
2. **MAPK-axis immunogenic cell death** via oxaliplatin in mFOLFOX6 (oxaliplatin induces ICD, releasing DAMPs that synergize with vaccine-driven DC activation)
3. **VEGF-axis immunosuppression reduction** via bevacizumab (optional arm)
4. **Cyclophosphamide-mediated Treg depletion** (low-dose CY depletes regulatory T cells, reducing TME suppression)

STC-1010 + mFOLFOX6 ± bev + low-dose CY is the first combination to address all four simultaneously in 1L MSS mCRC. The CrisPRO patient vector (mapk=0.70, io=0.40, vegf=0.30) reflects this multi-axis approach — no prior trial has a trial vector that matches this combination.

### The DNFB Haptenation Mechanism

DNFB (dinitrofluorobenzene) is a contact sensitizer that creates a type IV hypersensitivity reaction when applied to tumor cells. When haptenated tumor cells are injected, the immune system recognizes the DNFB hapten as a danger signal — triggering a rapid, intense DC maturation response that is qualitatively different from GM-CSF-driven DC activation.

The proposed mechanism:
1. DNFB-haptenated tumor cells are recognized as foreign (danger signal)
2. Dendritic cells mature rapidly in response to the DNFB danger signal
3. Mature DCs present the full tumor antigen repertoire (not just CEA) to T cells
4. T cells are primed against multiple tumor antigens simultaneously
5. Low-dose cyclophosphamide depletes Tregs, reducing TME suppression
6. Oxaliplatin in mFOLFOX6 induces ICD in residual tumor cells, releasing additional DAMPs that sustain DC activation

**Evidence level:** [MECHANISTIC PLAUSIBILITY] for the full combination in humans. [PHARMACODYNAMIC ACTIVITY] for individual components in murine models (Alzeeb et al. 2024). BreAK CRC-001 is the first human test.

---

## The Honest Positioning Statement

STC-1010 is not a proven therapy. It is a mechanistically differentiated hypothesis being tested for the first time in humans in BreAK CRC-001.

The differentiation from prior failures is real and specific:
- **vs. checkpoint blockade alone:** STC-1010 generates T cells de novo; checkpoint blockade cannot reinvigorate T cells that don't exist
- **vs. MEK inhibition:** STC-1010 uses danger-signal-driven DC activation, not MAPK pathway modulation; the MEK inhibition pathway is permanently closed
- **vs. CEA vaccine:** STC-1010 presents the full tumor proteome; single-antigen targeting is insufficient for MSS TME
- **vs. GVAX:** STC-1010 uses DNFB danger-signal-driven DC activation vs. GM-CSF secretion; the mechanistic distinction is real but unvalidated in humans

The risk is also real and specific:
- The GVAX failure (ORR 0% despite T-cell responses) demonstrates that T-cell priming alone is insufficient
- The liver-met suppression mechanism (GAP-01) is the dominant risk factor for BreAK CRC-001
- The preclinical data is from murine surrogate models; human translation is unvalidated

**What BreAK CRC-001 must demonstrate to be interpretable:**
1. Clinical endpoints (PFS, ORR) as primary — not immune biomarkers
2. Liver-met stratification to allow clean interpretation of the IO-sensitive subgroup
3. A randomized control arm or pre-specified historical control to allow attribution of any observed benefit to STC-1010 rather than mFOLFOX6

---

## Summary Table — STC-1010 vs. Prior Failures

| Prior approach | Key failure | STC-1010 differentiation | Evidence level |
|---|---|---|---|
| Checkpoint blockade alone (CheckMate 9X8) | No T cells to reinvigorate in MSS CRC | STC-1010 generates T cells de novo via DNFB danger signal | MECHANISTIC PLAUSIBILITY |
| MEK inhibition + PD-L1 (IMblaze370) | Murine synergy did not translate; OS HR=1.00 | STC-1010 does not target MAPK; different bottleneck | PROVEN EFFICACY — NEGATIVE (IMblaze370) |
| Single-antigen CEA vaccine (QUILT-2.004) | Central tolerance; single antigen insufficient | STC-1010 presents full tumor proteome | MECHANISTIC PLAUSIBILITY |
| Whole-cell vaccine + GM-CSF (GVAX) | T-cell priming insufficient; TME suppression | DNFB danger signal vs. GM-CSF — different DC activation pathway | MECHANISTIC PLAUSIBILITY |
| Unselected IO enrollment (AtezoTRIBE, CO.26) | Liver-met majority diluted IO-sensitive minority | BreAK CRC-001 KRAS enrichment; GAP-01 unresolved | DESIGN IMPROVEMENT (partial) |

---

*Source: brenus_comparator_path_a_report.md (LOCKED) + MSS_CRC_IO_comparator_trials_agent3.md (VERIFIED)*
*CheckMate 9X8 source: Lenz et al. J Immunother Cancer 2024, PMID 38485190*
*STC-1010 preclinical: Alzeeb et al. 2024 (DOI 10.3389/fonc.2024.1427428) — murine surrogate only*
*Governance: MANIFEST.yaml | PATH B: Not used*
*SC-001 (HT29 BRAF V600E conflict): ACTIVE — not addressed in this document per governance rules*
