# MSS CRC Biology: What CrisPRO Has Mapped for the STC-1010 Program
## A CrisPRO Biomarker Intelligence Brief for Next-Generation Program Partners

**Prepared by:** CrisPRO Platform Intelligence  
**Indication:** MSS/pMMR Metastatic Colorectal Cancer  
**Purpose:** Biomarker biology orientation for prospective STC-1010 program partners

---

> **What this document is.** CrisPRO has built a six-domain biology map of MSS CRC immune resistance — the mechanistic substrate that determines which patients can respond to immune-based therapy and which cannot. This brief gives you the framework, the key signals, and the clinical accessibility classification for each candidate biomarker. It is the scientific foundation for any rational patient selection or trial design conversation.

---

## THE BIOLOGY PROBLEM IN ONE SENTENCE

MSS CRC is not immunologically inert — it is immunologically suppressed. The distinction matters enormously for program design: inert tumors cannot be rescued by any immune approach; suppressed tumors can be rescued if you identify and address the right suppression mechanism in the right patient.

CrisPRO has mapped six suppression mechanisms. They are not equally operative in all patients. That heterogeneity is the opportunity.

---

## DOMAIN 1: KRAS/BRAF MUTATION CONTEXT

**Why it matters for immune therapy:**  
KRAS mutations occur in ~40% of CRC and are enriched in MSS/pMMR disease. KRAS-mutant CRC is not just a signaling problem — it is an immune architecture problem. KRAS-mutant tumors show significantly reduced CD8+ T cell infiltration compared to KRAS wild-type, driven by at least two distinct mechanisms: KRAS-mediated sensitization of cytotoxic T cells to activation-induced cell death, and KRAS-driven MDSC recruitment via the IRF2-CXCL3-CXCR2 axis.

**The BRAF V600E exception:**  
MSS BRAF V600E CRC (~6–8% of all CRC) has a distinct immune phenotype — higher baseline immune activation, elevated PD-L1, greater T cell infiltration. Recent Phase 1/2 data with BRAF+EGFR+PD-1 inhibition in this subgroup showed 50% ORR. This is a small but biologically distinct subgroup that may be more permissive for vaccine-based approaches.

**What CrisPRO maps:**  
- KRAS allele-specific immune microenvironment profiles (G12D vs. G12V vs. G13D — not equivalent immunologically)
- IRF2 expression as a functional readout of KRAS-driven MDSC recruitment
- BRAF V600E MSS as a candidate enrichment subgroup

**Clinical accessibility:** KRAS/BRAF mutation status — standard NGS, CLIA-certified, available at enrollment.

---

## DOMAIN 2: SMAD4 LOSS

**Why it matters:**  
SMAD4 protein loss occurs in ~25–30% of CRC and is enriched in metastatic disease. SMAD4-deficient tumors have a distinct immune exclusion mechanism: CCL15/CCL9-driven G-MDSC recruitment via CCR1, and CXCL1/8-driven tumor-associated neutrophil infiltration. These are different from the KRAS-driven MDSC axis — meaning SMAD4-deficient patients may not respond to the same immune interventions as KRAS-mutant patients.

**The TGF-β paradox:**  
In SMAD4-intact tumors, TGF-β signals through SMAD4 to suppress tumor growth. In SMAD4-deficient tumors, TGF-β loses its canonical growth-suppressive function but retains non-canonical immunosuppressive effects via YAP-dependent signaling. This means TGF-β inhibition strategies may behave differently in SMAD4-intact vs. SMAD4-deficient patients — a distinction that no MSS CRC IO trial has prospectively addressed.

**What CrisPRO maps:**  
- SMAD4 status as a stratification variable for immune exclusion subtype
- SMAD4-deficient vs. SMAD4-intact immune microenvironment profiles
- SMAD4 loss as a predictor of liver metastasis (via CCL15-CCR1-MMP9 axis)

**Clinical accessibility:** SMAD4 IHC — standard pathology, CLIA-certified, available from archival tumor tissue.

---

## DOMAIN 3: TGF-β IMMUNE EXCLUSION

**Why it matters:**  
TGF-β is the master regulator of T cell exclusion in MSS CRC. It operates through at least four parallel mechanisms: direct suppression of CD8+ T cell CXCR3 expression (preventing tumor trafficking), CAF activation creating a physical stromal barrier, Treg induction, and M-MDSC orchestration. The Mariathasan exclusion signature — a stromal/CAF TGF-β response gene panel — predicts non-response to PD-L1 blockade and has been validated in urothelial cancer with strong mechanistic extrapolation to CRC.

**The clinical translation gap:**  
Dual TGF-β/PD-L1 blockade (bintrafusp alfa) showed 0% ORR in CRC in Phase I expansion. This is not evidence that TGF-β is the wrong target — it is evidence that systemic TGF-β blockade in established metastatic disease is insufficient. The opportunity is in identifying patients with low baseline TGF-β exclusion signature, where the suppression mechanism is not yet entrenched.

**What CrisPRO maps:**  
- TGF-β exclusion signature score from tumor RNA-seq or IHC panel
- VEGF-TGF-β co-axis activity (VEGF-A drives TOX-dependent T cell exhaustion synergistically with TGF-β)
- Bevacizumab vascular normalization window as a potential TGF-β exclusion relief mechanism

**Clinical accessibility:** TGF-β exclusion signature — research-only (RNA-seq or validated IHC panel); not yet standard of care.

---

## DOMAIN 4: LIVER METASTASIS AND SYSTEMIC IMMUNE TOLERANCE

**Why it matters:**  
This is the single most clinically actionable biology insight in MSS CRC IO. Liver metastases suppress systemic IO response — not just locally, but systemically. The mechanism is well-characterized: Kupffer cells (liver-resident macrophages) express FasL and induce apoptosis of activated T cells entering the liver; liver sinusoidal endothelial cells present antigens tolerogenically; liver metastases expand antigen-specific Tregs that systemically suppress anti-tumor immunity.

The clinical consequence is stark: in REGONIVO, all 8 responders had no liver metastases. In the US Phase 2 replication, non-liver-metastatic patients showed 22% ORR vs. ~0% in liver-metastatic patients. In CCTG CO.26, patients without liver metastases showed OS HR ~0.50 vs. ~0.90 with liver metastases.

**What this means for a vaccine program:**  
Vaccine-induced CD8+ T cells are preferentially eliminated in the liver. A program that does not stratify by liver metastasis status is enrolling the most immunologically hostile patients alongside the most permissive ones — and the hostile majority will dilute any signal from the permissive minority.

**What CrisPRO maps:**  
- Liver metastasis burden as a continuous variable (number of lesions, % liver involvement, presence of extrahepatic disease)
- Non-liver-metastatic MSS CRC as the primary enrichment subgroup
- Locoregional liver-directed therapy (SBRT, ablation) as a potential strategy to convert liver-metastatic patients to a more permissive immune state

**Clinical accessibility:** Liver metastasis status — standard staging (CT/MRI), available at enrollment. This is the highest-value, lowest-cost enrichment criterion in MSS CRC IO.

---

## DOMAIN 5: ANTIGEN PRESENTATION AND DENDRITIC CELL PRIMING

**Why it matters for a vaccine program:**  
Even if a vaccine successfully primes CD8+ T cells in the periphery, those T cells must recognize tumor cells to kill them. In MSS CRC, the dominant mechanism of antigen presentation failure is TAP1/TAP2 downregulation — not B2M mutation (which is more common in MSI-H). TAP deficiency prevents peptide loading onto MHC-I, rendering tumor cells invisible to CD8+ T cells regardless of how many vaccine-specific T cells are circulating.

**The opportunity:**  
Oxaliplatin and 5-FU (components of mFOLFOX6) can upregulate TAP expression in CRC cell lines. This creates a mechanistic rationale for vaccine timing relative to chemotherapy — the chemotherapy may transiently restore antigen presentation capacity, creating a window for vaccine-primed T cells to recognize tumor cells.

**DC dysfunction:**  
Tumor-derived IL-6, PGE2, VEGF, and IL-10 impair DC maturation and antigen presentation. Bevacizumab (anti-VEGF) may partially restore DC function by reducing VEGF-mediated DC suppression — another mechanistic rationale for the vaccine + bevacizumab combination.

**What CrisPRO maps:**  
- TAP1/TAP2 expression as a candidate predictive biomarker for vaccine response
- MHC-I surface expression (allele-specific loss vs. total loss)
- DC maturation markers as pharmacodynamic endpoints
- Chemotherapy-induced TAP upregulation as a timing optimization signal

**Clinical accessibility:** TAP/MHC-I expression — research-only (IHC or RNA-seq); not yet standard of care.

---

## DOMAIN 6: MYELOID SUPPRESSION

**Why it matters:**  
MDSCs are significantly expanded in MSS CRC TME and peripheral blood. They suppress T cell proliferation via arginase-1, iNOS, ROS, and PD-L1 expression. SPP1+ macrophages, PMN-MDSCs, and LAMP3+ mregDCs form an immunosuppressive myeloid ecosystem that is the proximal effector of multiple upstream suppression signals (TGF-β, KRAS-IRF2, SMAD4-CCL15).

**The cyclophosphamide rationale:**  
Low-dose cyclophosphamide selectively depletes Tregs and MDSCs while sparing effector T cells. This is the mechanistic basis for including low-dose CY in vaccine regimens — it creates an immunological window for vaccine-induced CD8+ T cell expansion. The timing of CY relative to vaccination is not a detail; it is a mechanism.

**The VEGF-NRP1 axis:**  
VEGF-NRP1 signaling drives M2 macrophage polarization in CRC. Bevacizumab may partially reverse M2 polarization by blocking this axis, creating a transient window for immune activation. This is a second mechanistic rationale for the vaccine + bevacizumab combination — distinct from the vascular normalization effect.

**What CrisPRO maps:**  
- MDSC frequency (peripheral blood flow cytometry) as a baseline enrichment biomarker
- SPP1+ macrophage burden as a TME resistance indicator
- M2/M1 macrophage ratio as a pharmacodynamic endpoint
- Cyclophosphamide timing optimization relative to MDSC nadir

**Clinical accessibility:** MDSC frequency — research-only (flow cytometry); M2/M1 ratio — research-only (IHC or RNA-seq).

---

## THE COMPOSITE ENRICHMENT HYPOTHESIS

CrisPRO's biology map converges on a five-feature composite enrichment hypothesis for MSS CRC IO programs. No single biomarker is sufficient — the suppression mechanisms are redundant, and a patient who clears one gate may fail another.

**The five gates (in order of clinical accessibility):**

| Gate | Feature | Accessibility | Rationale |
|---|---|---|---|
| 1 | Absence of active liver metastases | Standard (CT/MRI) | Removes systemic immune tolerance mechanism |
| 2 | KRAS wild-type or BRAF V600E MSS | Standard (NGS) | Higher baseline immune activation, less MDSC recruitment |
| 3 | SMAD4 intact | Standard (IHC) | Preserved immune infiltrate, lower G-MDSC burden |
| 4 | Low TGF-β exclusion signature | Research (RNA-seq) | Preserved T cell trafficking capacity |
| 5 | Intact MHC-I / TAP expression | Research (IHC/RNA-seq) | Functional antigen presentation for vaccine-primed T cells |

**What this means in practice:**  
Gates 1–3 are available at enrollment from standard staging and pathology. Gates 4–5 require research-grade assays from tumor tissue. A program that applies only Gates 1–3 can enrich for the highest-probability subgroup using data already being collected. Gates 4–5 add precision but require prospective biopsy collection with standardized assay platforms.

CrisPRO has modeled the population funnel implications of each gate combination. The enriched subgroup is smaller than the unselected MSS CRC population — but it is the subgroup where a real signal can be detected.

---

## WHAT CRISPRO BRINGS TO THIS BIOLOGY

CrisPRO's biomarker biology map is not a literature review. It is a structured, evidence-graded, clinically actionable framework built specifically for MSS CRC IO programs. For a next-generation STC-1010 program partner, this translates to:

- **Biomarker panel design:** Which assays to run, in which tissue, at which timepoints, with which pre-specified response thresholds
- **Enrichment scoring:** A composite enrichment score that integrates the five gates into a single patient-level probability estimate
- **Pharmacodynamic endpoint selection:** Which on-treatment biomarker changes are mechanistically linked to the vaccine (not the chemotherapy backbone)
- **Resistance mechanism taxonomy:** When a patient progresses, which suppression mechanism was operative — and what does that mean for next-line strategy

The biology is mapped. The question is whether your trial design is built to detect the signal that exists in the enriched subgroup.

---

*This document represents a curated subset of CrisPRO's MSS CRC biomarker biology map. Full mechanistic pathway diagrams, evidence grading tables, assay platform specifications, and enrichment scoring models are available under engagement. Contact CrisPRO to discuss how this biology framework applies to your specific program.*
