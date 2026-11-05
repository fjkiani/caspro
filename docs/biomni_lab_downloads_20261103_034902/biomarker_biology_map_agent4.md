# Biomarker & Biology Map: MSS Colorectal Cancer for STC-1010 Immunotherapy Program
**Agent 4: Biomarker & Biology Synthesizer**  
**Date:** 2025  
**Scope:** Comprehensive biomarker map across 6 domains for haptenated whole-cell vaccine (STC-1010) in MSS CRC

---

## PREAMBLE: Evidence Classification System

Throughout this document, claims are classified as:
- **[VALIDATED CLINICAL BIOMARKER]** — Prospectively validated, used in clinical decision-making, or FDA/EMA-recognized
- **[MECHANISTIC HYPOTHESIS]** — Supported by preclinical or correlative data but not prospectively validated in CRC IO
- **[EXPLORATORY SIGNAL]** — Emerging data, single studies, or extrapolated from other tumor types

---

## DOMAIN 1: KRAS/BRAF/RAS Context

### 1.1 KRAS Mutation Landscape in CRC

**Frequency:** KRAS mutations occur in ~40% of all CRC. Among KRAS-mutant CRC, the allele distribution is approximately:
- G12D: ~29% of KRAS-mutant cases (most common)
- G12V: ~22%
- G13D: ~17%
- G12C: ~6%
- G12A, G12S: ~5% each
*(Source: Nordic mCRC cohort, BJC Reports 2025; Strickler et al., Oncologist 2023)*

**KRAS mutation overall in MSS CRC:** KRAS mutations are enriched in MSS/pMMR CRC (CMS3 subtype) and are associated with the immunosuppressive CMS3 transcriptional program. [VALIDATED CLINICAL BIOMARKER for anti-EGFR resistance; MECHANISTIC HYPOTHESIS for IO resistance]

### 1.2 KRAS Immune Microenvironment Effects

**CD8+ T cell suppression:**
- KRAS-mutant CRC shows significantly reduced CD8+ T cell tumor infiltration vs. KRAS wild-type in human specimens (Liu et al., *Advanced Science* 2023; DOI: 10.1002/advs.202203757). [MECHANISTIC HYPOTHESIS]
- Mechanism: mutant KRAS sensitizes cytotoxic T cells to activation-induced cell death (AICD), depleting the effector pool (Liu et al. 2023). [MECHANISTIC HYPOTHESIS]
- KRAS mutation associated with modest but independent suppression of Th1 and cytotoxic cell immunity in CRC, independent of MMR status (Lal et al., 2017). [MECHANISTIC HYPOTHESIS]

**MDSC recruitment via KRAS-IRF2-CXCL3 axis:**
- KRAS represses IRF2, which directly represses CXCL3. KRAS-mediated IRF2 loss → high CXCL3 → CXCR2+ MDSC recruitment to TME → anti-PD-1 resistance (Liao et al., *Cancer Cell* 2019; DOI: 10.1016/j.ccell.2019.02.008). [MECHANISTIC HYPOTHESIS — validated in CRC mouse model]
- SLC25A22 mediates KRAS-driven MDSC expansion; SLC25A22 KO reverses immunosuppression in KRAS-mutant CRC (Zhou et al., *Nature Communications* 2023; DOI: 10.1038/s41467-023-39571-6). [MECHANISTIC HYPOTHESIS]

**PD-L1 and antigen presentation:**
- KRAS-G12D specifically drives immune suppression and primary resistance to anti-PD-1/PD-L1 in NSCLC (Liu et al., *Cancer Communications* 2022; DOI: 10.1002/cac2.12327). Extrapolation to CRC is plausible but not directly validated. [EXPLORATORY SIGNAL in CRC]
- KRAS-G12D predicts lower TMB and drives immune suppression in lung adenocarcinoma (Gao et al., *Lung Cancer* 2020). In CRC, KRAS-mutant tumors in KEYNOTE-177 subgroup analysis showed reduced benefit from pembrolizumab vs. KRAS-WT (Liu et al., *JCO* 2021; DOI: 10.1200/jco.2021.39.15_suppl.e15588). [MECHANISTIC HYPOTHESIS]
- KRAS activates CD47 ("don't eat me" signal) to evade innate immune surveillance (Hu et al., *JCI* 2022; DOI: 10.1172/jci153470). [MECHANISTIC HYPOTHESIS — lung adenocarcinoma; extrapolated to CRC]

**CMS3 immunosuppressive phenotype:**
- KRAS-mutant CRC is enriched in CMS3 (metabolic subtype), which shows an immunosuppressive TME with reduced immune infiltration and reactivity (Tanjak et al., *Cancers* 2023; DOI: 10.3390/cancers15041098). [MECHANISTIC HYPOTHESIS]

### 1.3 BRAF V600E: MSS vs. MSI Context

**Frequency:** BRAF V600E occurs in ~8–12% of all CRC. Of these, ~30% are MSI-H/dMMR; ~70% are MSS/pMMR.

**MSS BRAF V600E — distinct immune phenotype:**
- MSS BRAF V600E CRC has HIGHER immune activation than other MSS CRC subtypes, with elevated PD-L1 expression and greater T cell infiltration (Morris et al., *Cancer Cell* 2025; DOI: 10.1016/j.ccell.2025.08.002; Kasi, *Cancer Cell* 2025; DOI: 10.1016/j.ccell.2025.09.008). [MECHANISTIC HYPOTHESIS — emerging clinical data]
- Phase 1/2 trial (NCT04017650): encorafenib + cetuximab + nivolumab in MSS BRAF V600E mCRC achieved **50% ORR** (n=26), suggesting this subgroup is immunologically distinct and potentially IO-responsive with MAPK pathway co-inhibition (Morris et al., *Cancer Cell* 2025; DOI: 10.1016/j.ccell.2025.08.002; PMID: 40882637). [VALIDATED CLINICAL BIOMARKER — emerging, not yet standard-of-care] **CONTEXT FLAG: This is a refractory (previously treated) population, NOT 1L. STC-1010 targets 1L. The biomarker insight is valid but the clinical context differs from BreAK CRC-001 and must not be conflated.**
- BRAF + MEK inhibition (dabrafenib + trametinib) + anti-PD-1 (sparatlizumab) in BRAF V600E CRC: 12% ORR in phase 2 (Tian et al., *Nature Medicine* 2023; DOI: 10.1038/s41591-022-02181-8). [VALIDATED CLINICAL BIOMARKER — limited efficacy as monotherapy combination]

**MSI-H BRAF V600E:**
- MSI-H BRAF V600E CRC responds well to anti-PD-1 monotherapy; BRAF V600E in MSI-H context does not appear to impair IO response (Salem et al., *Clinical Cancer Research* 2025; DOI: 10.1158/1078-0432.ccr-25-2160). [VALIDATED CLINICAL BIOMARKER]

**Implication for STC-1010:** MSS BRAF V600E CRC may represent a subgroup with higher baseline immune activation that could be more responsive to vaccine-based approaches. However, this is a small subgroup (~6–8% of all CRC). [EXPLORATORY SIGNAL]

### 1.4 RAS Pathway Effects Summary

| Effect | Mechanism | Evidence Level |
|--------|-----------|----------------|
| ↓ CD8+ TIL | AICD sensitization, CXCL3-MDSC axis | MECHANISTIC HYPOTHESIS |
| ↑ MDSC recruitment | KRAS-IRF2-CXCL3-CXCR2 axis | MECHANISTIC HYPOTHESIS (CRC model) |
| ↑ CD47 ("don't eat me") | KRAS → CD47 upregulation | MECHANISTIC HYPOTHESIS (lung) |
| ↓ MHC-I antigen presentation | KRAS downstream signaling | EXPLORATORY SIGNAL |
| ↑ PD-L1 (context-dependent) | MAPK/MEK pathway | MECHANISTIC HYPOTHESIS |
| ↑ CXCL8 → M2 macrophage | KRAS-driven CXCL8 | MECHANISTIC HYPOTHESIS |

---

## DOMAIN 2: SMAD4 Loss

### 2.1 Frequency and Clinical Context

**Frequency:**
- SMAD4 protein loss (IHC): ~25–30% of all CRC (Wasserman et al., *Clinical Cancer Research* 2018; DOI: 10.1158/1078-0432.ccr-18-1726)
- SMAD4 somatic mutation: ~5–24% depending on cohort and detection method (Fang et al., *BMC Gastroenterology* 2021; DOI: 10.1186/s12876-021-01864-9; Mehrvarz Sarshekeh et al., *PLoS ONE* 2017; DOI: 10.1371/journal.pone.0173345)
- SMAD4 loss is enriched in metastatic CRC: higher frequency in liver metastases vs. primary tumors (Miyaki et al., *Oncogene* 1999; DOI: 10.1038/sj.onc.1202642)
- SMAD4 loss predicts liver metastasis (Losi et al., *Oncology Reports* 2007; DOI: 10.3892/or.17.5.1095; Itatani et al., *Gastroenterology* 2013; DOI: 10.1053/j.gastro.2013.07.033)

**Prognostic significance:** SMAD4 loss is independently associated with worse recurrence-free survival and overall survival in stage II/III CRC (Yan et al., *Clinical Cancer Research* 2016; DOI: 10.1158/1078-0432.ccr-15-0939; Kozak et al., *Journal of Clinical Pathology* 2015; DOI: 10.1136/jclinpath-2014-202660). [VALIDATED CLINICAL BIOMARKER for prognosis; NOT yet validated for IO selection]

### 2.2 SMAD4 Loss and Immune Microenvironment

**Immune exclusion:**
- SMAD4 loss in CRC correlates with **reduced immune infiltrate** (CD3+, CD8+ T cells) and increased recurrence (Wasserman et al., *Clinical Cancer Research* 2018). [MECHANISTIC HYPOTHESIS — correlative clinical data]
- SMAD4-deficient CRC recruits CCR1+ G-MDSCs via CCL15/CCL9-CCR1 axis; these MDSCs secrete TGF-β, suppressing CTL responses (Niu et al., *Acta Pharmaceutica Sinica B* 2024; DOI: 10.1016/j.apsb.2024.05.009). [MECHANISTIC HYPOTHESIS]
- SMAD4 loss promotes tumor-associated neutrophil (TAN) recruitment via CXCL1/8-CXCR2 axis (Ogawa et al., *Clinical Cancer Research* 2019; DOI: 10.1158/1078-0432.ccr-18-3684). [MECHANISTIC HYPOTHESIS]

**TGF-β signaling paradox:**
- In SMAD4-intact tumors, TGF-β signals through SMAD4 to suppress tumor growth (tumor suppressor role in early CRC)
- In SMAD4-deficient tumors, TGF-β loses its canonical growth-suppressive function but retains non-canonical pro-tumorigenic and immunosuppressive effects (Liu et al., *Advanced Science* 2023; DOI: 10.1002/advs.202300708). [MECHANISTIC HYPOTHESIS]
- SMAD4 loss → YAP-dependent TGF-β-driven inflammation and tumorigenesis (Liu et al. 2023). [MECHANISTIC HYPOTHESIS]

**SMAD4 as IO biomarker:**
- SMAD4 loss in pancreatic cancer correlates with poor T cell infiltrate and reduced PD-L1 expression (Principe et al., *Frontiers in Oncology* 2022; DOI: 10.3389/fonc.2022.806963). Extrapolation to CRC is plausible. [EXPLORATORY SIGNAL in CRC]
- Multi-omics characterization of SMAD4-mutant CRC shows distinct immune landscape (Zhao et al., *Discover Oncology* 2024; DOI: 10.1007/s12672-024-01268-7). [EXPLORATORY SIGNAL]
- **CONTESTED:** Whether SMAD4 loss predicts IO resistance or creates a distinct vulnerability (e.g., to TGF-β inhibition) is not established in CRC IO trials.

### 2.3 SMAD4 and Liver Metastasis Mechanism

- SMAD4 loss → CCL15 upregulation → CCR1+ myeloid cell recruitment → MMP9 secretion → liver metastasis facilitation (Itatani et al., *Gastroenterology* 2013). [MECHANISTIC HYPOTHESIS]
- SMAD4 mutation predicts poor prognosis after liver metastasis resection (Mizuno et al., *EJSO* 2018; DOI: 10.1016/j.ejso.2018.02.247). [VALIDATED CLINICAL BIOMARKER for surgical prognosis]

---

## DOMAIN 3: TGF-β Immune Exclusion

### 3.1 TGF-β as Master Immune Exclusion Driver in MSS CRC

**Foundational evidence:**
- Tauriello et al. (*Nature* 2018; DOI: 10.1038/nature25492): In genetically reconstituted CRC metastasis models, TGF-β drives immune evasion. TGF-β inhibition + anti-PD-L1 induces complete responses in mice. TGF-β levels predict adverse outcomes in CRC patients. [MECHANISTIC HYPOTHESIS — preclinical; clinical translation pending]
- Mariathasan et al. (*Nature* 2018; DOI: 10.1038/nature25501): In metastatic urothelial cancer, TGF-β signaling in CAFs (pan-fibroblast TGF-β response signature) predicts exclusion of CD8+ T cells from tumor parenchyma and resistance to atezolizumab. This "exclusion signature" has been extrapolated to CRC. [VALIDATED CLINICAL BIOMARKER in urothelial cancer; MECHANISTIC HYPOTHESIS in CRC]
- Ganesh & Massagué (*Immunity* 2018; DOI: 10.1016/j.immuni.2018.03.037): Commentary confirming TGF-β as determinant of immune exclusion across tumor types.

### 3.2 Mechanisms of TGF-β-Mediated CD8 Exclusion

**Direct CD8 suppression:**
- TGF-β suppresses CD8+ T cell expression of CXCR3, preventing tumor trafficking (Gunderson et al., *Nature Communications* 2020; DOI: 10.1038/s41467-020-15404-8). In CRC mouse models, CD8-specific ALK5 (TGF-βRI) deletion leads to tumor rejection. [MECHANISTIC HYPOTHESIS — CRC model]
- TGF-β builds a dual immune barrier: (1) impairs T cell recruitment via chemokine suppression; (2) instructs immunosuppressive SPP1+ macrophages (Henriques et al., *Nature Genetics* 2025; DOI: 10.1038/s41588-025-02380-2). [MECHANISTIC HYPOTHESIS — CRC model]

**CAF activation:**
- TGF-β activates cancer-associated fibroblasts (CAFs), which form a physical barrier to T cell infiltration (stromal exclusion phenotype). This is the dominant mechanism in the Mariathasan exclusion signature. [MECHANISTIC HYPOTHESIS]

**Treg induction:**
- TGF-β is a potent inducer of FoxP3+ Tregs. However, bevacizumab does NOT significantly reduce Tregs in MSS CRC (PMID 35135679 — as noted in STC-1010 context). [VALIDATED CLINICAL OBSERVATION]

**M-MDSC orchestration:**
- TGF-β orchestrates the phenotype and function of monocytic MDSCs in CRC TME (Gneo et al., *Cancer Immunology, Immunotherapy* 2021; DOI: 10.1007/s00262-021-03081-5). [MECHANISTIC HYPOTHESIS]

### 3.3 TGF-β Signatures and Clinical Relevance

**TGF-β exclusion signature (Mariathasan 2018):**
- Defined by stromal/CAF TGF-β response genes (e.g., TGFB1, ACTA2, FN1, COL1A1, THBS1)
- Predicts non-response to PD-L1 blockade in urothelial cancer
- Applied to CRC: high TGF-β signature correlates with immune-excluded phenotype and poor IO response [MECHANISTIC HYPOTHESIS in CRC]

**Clinical trial data in MSS CRC:**
- Vactosertib (TGF-βRI inhibitor) + pembrolizumab in MSS mCRC: PD-L1 expression and CD8 T cell infiltration correlated with response (Kim et al., *JITC* 2021; DOI: 10.1136/jitc-2021-sitc2021.074). [EXPLORATORY SIGNAL]
- Co-inhibition of TGF-β + PD-L1 in CRC mouse model triggers interferon responses and innate/adaptive immunity but also reveals resistance mechanisms (Nair et al., *Oncoimmunology* 2024; DOI: 10.1080/2162402x.2024.2330194). [MECHANISTIC HYPOTHESIS]

**VEGF-TGF-β co-axis:**
- VEGF-A drives TOX-dependent T cell exhaustion in MSS CRC (Kim et al., *Science Immunology* 2019; DOI: 10.1126/sciimmunol.aay0555). VEGF and TGF-β act synergistically to suppress anti-tumor immunity. [MECHANISTIC HYPOTHESIS]
- VEGF-A modulates inhibitory checkpoints (PD-1, CTLA-4, Tim-3) on CD8+ T cells (Voron et al., *JEM* 2015; DOI: 10.1084/jem.20140559). [MECHANISTIC HYPOTHESIS]

### 3.4 Relevance to STC-1010

- STC-1010's mechanism (ICD → DC priming → CD8 activation) must overcome TGF-β-mediated CD8 exclusion and CXCR3 suppression
- Bevacizumab co-administration creates a transient vascular normalization window that may partially relieve TGF-β-driven exclusion, but does NOT reduce Tregs (PMID 35135679)
- **Critical gap:** Whether STC-1010-induced CD8 cells can overcome TGF-β-mediated CXCR3 suppression is unknown [UNKNOWN — key mechanistic question]

---

## DOMAIN 4: Liver Metastasis & IO Resistance

### 4.1 Epidemiology

- Liver metastasis occurs in ~50% of CRC patients overall; in metastatic CRC (mCRC), liver is the most common metastatic site (Kong et al., *Cancer Letters* 2024; DOI: 10.1016/j.canlet.2024.217113)
- ~50–70% of mCRC patients have liver metastases at some point in their disease course [VALIDATED CLINICAL OBSERVATION]
- Liver metastasis is the leading cause of CRC mortality (Wu et al., *Cancer Discovery* 2021; DOI: 10.1158/2159-8290.cd-21-0316)

### 4.2 Liver Metastasis Suppresses Systemic IO Response

**Clinical evidence:**
- Yu et al. (*Nature Medicine* 2021; DOI: 10.1038/s41591-020-1131-x): Liver metastases diminish immunotherapy efficacy **systemically** in patients and preclinical models, independent of other established biomarkers of response. Liver metastases siphon activated T cells and induce their apoptosis via FasL+ Kupffer cells. [VALIDATED CLINICAL OBSERVATION — multi-cancer]
- Wang et al. (*JAMA Network Open* 2021; DOI: 10.1001/jamanetworkopen.2021.18418): In MSS mCRC, patients WITHOUT liver metastases had higher response rates to PD-1/PD-L1 inhibitors than those WITH liver metastases. [VALIDATED CLINICAL OBSERVATION in MSS CRC]
- Lee et al. (*Science Immunology* 2020; DOI: 10.1126/sciimmunol.aba0759): Liver metastases cause antigen-specific systemic suppression of anti-tumor immunity via Treg expansion in the liver. [MECHANISTIC HYPOTHESIS — mouse model]

### 4.3 Hepatic Immune Tolerance Mechanisms

**Kupffer cells:**
- Kupffer cells (liver-resident macrophages) express FasL and induce apoptosis of activated T cells entering the liver (Yu et al., *Nature Medicine* 2021). [MECHANISTIC HYPOTHESIS]
- Kupffer cells promote tolerogenic responses via IL-10 and TGF-β secretion. [MECHANISTIC HYPOTHESIS]

**Liver sinusoidal endothelial cells (LSECs):**
- LSECs present antigens in a tolerogenic manner, inducing T cell anergy rather than activation (Zeng et al., *Cancers* 2021; DOI: 10.3390/cancers13102418). [MECHANISTIC HYPOTHESIS]
- LSECs express PD-L1 and promote Treg differentiation. [MECHANISTIC HYPOTHESIS]

**Portal tolerance:**
- The liver is evolutionarily adapted to tolerize against dietary antigens via portal circulation; tumor cells exploit this mechanism (Gao et al., *Journal of Advanced Research* 2023; DOI: 10.1016/j.jare.2023.08.011). [MECHANISTIC HYPOTHESIS]

**Spatial reprogramming:**
- Single-cell analysis of CRC liver metastases shows remarkable spatial reprogramming toward M2-like macrophages and metabolic suppression of T cells (Wu et al., *Cancer Discovery* 2021). [MECHANISTIC HYPOTHESIS]
- SPP1+ macrophages in liver metastases drive immunotherapy resistance via CXCL12 production in CAFs (Liu et al., *Cancer Research* 2025; DOI: 10.1158/0008-5472.can-24-4916). [MECHANISTIC HYPOTHESIS]

**Treg-mediated systemic suppression:**
- Liver metastases expand antigen-specific Tregs that systemically suppress anti-tumor immunity (Lee et al., *Science Immunology* 2020). [MECHANISTIC HYPOTHESIS]

### 4.4 Implications for STC-1010

- Patients with active liver metastases represent the most immunologically hostile subgroup for any IO approach
- The systemic T cell siphoning effect means vaccine-induced CD8+ T cells may be preferentially eliminated in the liver
- Locoregional liver-directed therapies (SBRT, TACE, ablation) may potentiate IO by reducing the hepatic immune tolerance burden (Zlotnik et al., *Cancers* 2023; DOI: 10.3390/cancers15215210). [MECHANISTIC HYPOTHESIS — emerging clinical strategy]
- **Critical unknown:** Whether STC-1010 + bevacizumab can overcome liver-specific immune tolerance is not established

---

## DOMAIN 5: Antigen Presentation & Dendritic Cell Priming

### 5.1 MHC-I Downregulation in MSS CRC

**Frequency and mechanisms:**
- Total MHC-I loss occurs in ~11% of CRC (Cabrera et al., *Tissue Antigens* 2003; DOI: 10.1034/j.1399-0039.2003.00020.x)
- In MSS CRC: MHC-I loss predominantly via **LMP7/TAP2 downregulation** (not B2M mutation, which is more common in MSI-H) (Cabrera et al. 2003). [MECHANISTIC HYPOTHESIS — validated in CRC specimens]
- Partial MHC-I downregulation (allele-specific loss, reduced surface expression) is far more common than total loss. [MECHANISTIC HYPOTHESIS]
- CEMIP drives MHC-I internalization and degradation in CRC, limiting CD8+ T cell recognition (Zhang et al., *JITC* 2023; DOI: 10.1136/jitc-2022-005592). [MECHANISTIC HYPOTHESIS]
- miR-148a-3p silences the CANX/MHC-I pathway in CRC (Zheng et al., *FASEB Journal* 2021; DOI: 10.1096/fj.202100235r). [MECHANISTIC HYPOTHESIS]

**B2M loss:**
- B2M mutations are predominantly found in MSI-H CRC (frameshift mutations in microsatellite repeats) (Bicknell et al., *Current Biology* 1996; DOI: 10.1016/s0960-9822(02)70795-1; Sňahničanová et al., *Clinical and Experimental Medicine* 2019; DOI: 10.1007/s10238-019-00601-7)
- In MSS CRC, B2M loss is less common but occurs via other mechanisms (LOH, epigenetic silencing). [MECHANISTIC HYPOTHESIS]
- B2M expression in CRC: high B2M correlates with activated immune milieu and better outcomes in CRC (Lee et al., *American Journal of Clinical Pathology* 2024; DOI: 10.1093/ajcp/aqae066). [MECHANISTIC HYPOTHESIS]

**TAP deficiency in MSS CRC:**
- TAP1/TAP2 downregulation is the dominant mechanism of MHC-I loss in MSS (pMMR) CRC (Cabrera et al. 2003). TAP deficiency prevents peptide loading onto MHC-I, rendering tumor cells invisible to CD8+ T cells. [MECHANISTIC HYPOTHESIS — validated in CRC]
- Chemotherapy agents (oxaliplatin, 5-FU) can upregulate TAP expression in CRC cell lines (Liang et al., *Scientific Reports* 2021; DOI: 10.1038/s41598-021-88648-z). [MECHANISTIC HYPOTHESIS]

### 5.2 Dendritic Cell Dysfunction in CRC TME

**DC dysfunction mechanisms:**
- Tumor-derived factors (IL-6, PGE2, VEGF, IL-10) impair DC maturation and antigen presentation in CRC (Zhang et al., *Cancer Biology & Medicine* 2024; DOI: 10.20892/j.issn.2095-3941.2024.0188). [MECHANISTIC HYPOTHESIS]
- cDC2 plasticity: IL-6 and PGE2 in CRC organoid models drive cDC2 toward a DC3-like immunosuppressive phenotype (Subtil et al., *European Journal of Immunology* 2024; DOI: 10.1002/eji.202350891). [MECHANISTIC HYPOTHESIS]
- PD-L1+ macrophages in lymph nodes antagonize DC vaccines by suppressing CD8+ T cells (Sprooten et al., *Cell Reports Medicine* 2024; DOI: 10.1016/j.xcrm.2023.101377). [MECHANISTIC HYPOTHESIS — relevant to STC-1010 mechanism]
- Tumor acidity and hypertonicity impair DC cross-presentation (Burgdorf et al., *Cancers* 2020; DOI: 10.3390/cancers12092403). [MECHANISTIC HYPOTHESIS]

**cDC1 (cross-presenting DC) deficiency:**
- cDC1s (CLEC9A+, XCR1+, BATF3+) are the primary cross-presenting DCs required for CD8+ T cell priming. Their frequency is reduced in CRC TME. [MECHANISTIC HYPOTHESIS]
- Effective cancer immunotherapy by natural cDC1s bearing dead tumor antigen has been demonstrated (Wculek et al., *JITC* 2019; DOI: 10.1186/s40425-019-0565-5). [MECHANISTIC HYPOTHESIS]

### 5.3 How STC-1010 Addresses These Constraints

**Haptenation mechanism:**
- DFNB haptenation of tumor cell surface proteins creates neo-epitopes that are recognized as foreign by the immune system, bypassing tolerance to self-antigens. [MECHANISTIC HYPOTHESIS — STC-1010 specific]
- Thermal stress (heat shock) induces HSP70 (HSPA1A) surface expression, which acts as a "danger signal" and DC maturation stimulus. [MECHANISTIC HYPOTHESIS]

**Immunogenic cell death (ICD):**
- ICD releases DAMPs (HMGB1, calreticulin, ATP) that activate DCs and overcome DC dysfunction (Jin & Wang, *Frontiers in Immunology* 2021; DOI: 10.3389/fimmu.2021.697964). [MECHANISTIC HYPOTHESIS]
- DC vaccines based on ICD elicit danger signals and T cell-driven rejection in preclinical models (Garg et al., *Science Translational Medicine* 2016; DOI: 10.1126/scitranslmed.aae0105). [MECHANISTIC HYPOTHESIS]
- ICD + DC vaccination combination is superior to either alone (Lamberti et al., *Pharmaceutics* 2020; DOI: 10.3390/pharmaceutics12030256). [MECHANISTIC HYPOTHESIS]

**Antigen breadth:**
- STC-1010's 1,190+ protein antigen repertoire (from mass spectrometry) provides broad antigen coverage that may overcome MHC-I allele-specific loss and TAP deficiency by presenting multiple peptides across different HLA alleles. [MECHANISTIC HYPOTHESIS — STC-1010 specific]

**Critical constraint:**
- Even if STC-1010 successfully primes CD8+ T cells, TAP deficiency in MSS CRC means tumor cells may still not present peptides on MHC-I for recognition. This is a fundamental constraint that haptenation alone may not overcome. [MECHANISTIC HYPOTHESIS — key limitation]
- **Unknown:** Whether STC-1010-induced immune response includes MHC-II-restricted CD4+ T cells and NK cells that can kill MHC-I-deficient tumors.

---

## DOMAIN 6: Myeloid Suppression

### 6.1 MDSC Frequency and Function in MSS CRC

**Frequency:**
- MDSCs are significantly expanded in peripheral blood and TME of CRC patients vs. healthy controls (Gneo et al., *Cancer Immunology, Immunotherapy* 2021; DOI: 10.1007/s00262-021-03081-5). [MECHANISTIC HYPOTHESIS — clinical correlative data]
- M-MDSCs (monocytic) are the predominant MDSC subset in CRC TME; G-MDSCs (granulocytic/PMN-MDSCs) are enriched in SMAD4-deficient CRC (Niu et al., *Acta Pharmaceutica Sinica B* 2024). [MECHANISTIC HYPOTHESIS]
- MDSC frequency correlates with disease stage and poor prognosis in CRC (Zhang et al., *International Immunopharmacology* 2025; DOI: 10.1016/j.intimp.2025.115274). [MECHANISTIC HYPOTHESIS]

**Suppressive mechanisms in CRC:**
- TGF-β orchestrates M-MDSC phenotype and function in CRC TME (Gneo et al. 2021). [MECHANISTIC HYPOTHESIS]
- MDSCs suppress T cell proliferation via arginase-1, iNOS, ROS, and PD-L1 expression. [MECHANISTIC HYPOTHESIS]
- SPP1high TAMs, PMN-MDSCs, and LAMP3+ mregDCs form an immunosuppressive myeloid ecosystem in MSS CRC (Dai et al., *Frontiers in Immunology* 2026; DOI: 10.3389/fimmu.2025.1742654). [MECHANISTIC HYPOTHESIS]
- USP15 overexpression in CRC recruits MDSCs via SMYD3/CCL2 axis (Han et al., *Cancer Immunology Research* 2025; DOI: 10.1158/2326-6066.cir-24-1194). [MECHANISTIC HYPOTHESIS]

### 6.2 M2 Macrophage Polarization

**VEGF-NRP1 axis (documented):**
- VEGF-NRP1 axis drives M2 macrophage polarization in CRC (PMID 31209139). [MECHANISTIC HYPOTHESIS — documented in STC-1010 context]
- Bevacizumab (anti-VEGF) may partially reverse M2 polarization by blocking VEGF-NRP1 signaling, creating a transient window for immune activation. [MECHANISTIC HYPOTHESIS]

**PGE2-mediated CD8 exhaustion:**
- Tumor-associated macrophages produce PGE2 to promote CD8+ T cell exhaustion and drive resistance to PD-L1 blockade in MSS CRC (Fumet et al., *Cancer Research* 2025; DOI: 10.1158/0008-5472.can-25-0079). [MECHANISTIC HYPOTHESIS]

**SPP1+ macrophages:**
- SPP1+ macrophages are a dominant immunosuppressive macrophage subset in MSS CRC and liver metastases, driving IO resistance (Liu et al., *Cancer Research* 2025; Dai et al. 2026). [MECHANISTIC HYPOTHESIS]

### 6.3 Cyclophosphamide Effects on MDSCs (Relevant to STC-1010 Regimen)

**Mechanism of low-dose cyclophosphamide (CY):**
- Low-dose CY selectively depletes Tregs and MDSCs while sparing effector T cells (Madondo et al., *Cancer Treatment Reviews* 2016; DOI: 10.1016/j.ctrv.2015.11.005). [MECHANISTIC HYPOTHESIS — multiple models]
- Low-dose CY induces anti-tumor T cell responses that associate with survival in metastatic CRC (Scurr et al., *Clinical Cancer Research* 2017; DOI: 10.1158/1078-0432.ccr-17-0895). [MECHANISTIC HYPOTHESIS — CRC clinical data]
- CY + IL-12 gene therapy is superior to metronomic CY alone in CRC mouse models (Malvicini et al., *Oncoimmunology* 2012; DOI: 10.4161/onci.20684). [MECHANISTIC HYPOTHESIS]
- CY depletes tumor-infiltrating Tregs and combined with anti-PD-1 improves survival in neuroblastoma (Webb et al., *iScience* 2022; DOI: 10.1016/j.isci.2022.104995). [MECHANISTIC HYPOTHESIS]

**Dose-dependent effects:**
- Low-dose CY (20 mg/kg): decreases Tregs, enhances anti-tumor immunity
- High-dose CY: broad lymphodepletion including effector T cells
- Metronomic CY: sustained low-level immunomodulation (Motoyoshi et al., *Oncology Reports* 2006; DOI: 10.3892/or.16.1.141). [MECHANISTIC HYPOTHESIS]

**Caution:**
- In some models (melanoma), low-dose CY enhanced chronic inflammation and increased MDSC accumulation despite Treg depletion (Sevko et al., *Journal of Investigative Dermatology* 2013; DOI: 10.1038/jid.2012.444). Context-dependent effects must be considered. [MECHANISTIC HYPOTHESIS — contradictory data]
- CY immunopotentiation with active specific immunotherapy has been used in melanoma and other cancers (Bass & Mastrangelo, *Cancer Immunology, Immunotherapy* 1998; DOI: 10.1007/s002620050498). [MECHANISTIC HYPOTHESIS]

**Relevance to STC-1010:**
- Low-dose CY in the STC-1010 regimen likely targets Tregs and MDSCs to create an immunological window for vaccine-induced CD8+ T cell expansion
- The preclinical data showing ↑M1 macrophages (p=0.02) in anti-PD-1 resistant model may partly reflect CY-mediated MDSC depletion and M1 repolarization [MECHANISTIC HYPOTHESIS]

---

## SECTION 1: Candidate Enrichment Biomarkers

| Biomarker | Rationale | Clinical Accessibility | Evidence Strength |
|-----------|-----------|----------------------|-------------------|
| **MSS/pMMR status** | Defines the target population; MSS CRC is the indication for STC-1010 | Standard (IHC/PCR, CLIA-certified) | **Strong** — VALIDATED CLINICAL BIOMARKER |
| **Absence of liver metastases (or liver-limited disease treated with locoregional therapy)** | Liver mets suppress systemic IO response via Kupffer cell-mediated T cell elimination and Treg expansion (Yu et al., *Nature Medicine* 2021) | Standard (CT/MRI staging) | **Strong** — VALIDATED CLINICAL OBSERVATION |
| **Low/absent TGF-β exclusion signature** | Low stromal TGF-β signaling predicts preserved T cell trafficking and IO responsiveness (Mariathasan et al., *Nature* 2018; Tauriello et al., *Nature* 2018) | Research-only (RNA-seq or IHC panel) | **Moderate** — MECHANISTIC HYPOTHESIS in CRC |
| **BRAF V600E MSS subtype** | Higher baseline immune activation; 50% ORR with BRAF+EGFR+PD-1 inhibition (Morris et al., *Cancer Cell* 2025) | Standard (NGS/PCR, CLIA-certified) | **Moderate** — VALIDATED CLINICAL BIOMARKER (emerging) |
| **Low MDSC frequency (peripheral blood)** | High MDSC burden predicts IO resistance; low MDSCs indicate permissive immune environment | Research-only (flow cytometry) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **Intact MHC-I / TAP expression** | TAP-sufficient tumors can present vaccine-derived peptides on MHC-I for CD8+ T cell recognition (Cabrera et al. 2003; Liang et al. 2021) | Research-only (IHC or RNA-seq) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **Baseline CD8+ TIL presence (even low)** | Presence of any CD8+ T cells suggests functional antigen presentation machinery and T cell trafficking capacity | Standard (IHC, CLIA-certified) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **KRAS wild-type** | KRAS-WT CRC has higher CD8+ TIL, less MDSC recruitment, and better immune contexture (Lal et al. 2017; Liu et al. 2023) | Standard (NGS/PCR, CLIA-certified) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **Low serum TGF-β1** | Systemic TGF-β suppresses vaccine-induced T cell responses; low baseline TGF-β may predict better vaccine immunogenicity | Research-only (ELISA) | **Weak** — EXPLORATORY SIGNAL |
| **Immunoscore (high)** | High Immunoscore (CD3+/CD8+ density at tumor center and invasive margin) predicts better prognosis and potentially IO responsiveness | Research-only (validated assay, not yet standard) | **Moderate** — VALIDATED CLINICAL BIOMARKER for prognosis; MECHANISTIC HYPOTHESIS for IO |
| **SMAD4 intact** | SMAD4 retention correlates with preserved immune infiltrate and better prognosis (Wasserman et al. 2018) | Standard (IHC, CLIA-certified) | **Moderate** — MECHANISTIC HYPOTHESIS for IO |

---

## SECTION 2: Candidate Exclusion Biomarkers

| Biomarker | Rationale | Clinical Accessibility | Evidence Strength |
|-----------|-----------|----------------------|-------------------|
| **Active liver metastases (unresected/unablated)** | Systemic T cell siphoning and hepatic immune tolerance mechanisms suppress IO response (Yu et al., *Nature Medicine* 2021; Wang et al., *JAMA Network Open* 2021) | Standard (CT/MRI staging) | **Strong** — VALIDATED CLINICAL OBSERVATION |
| **High TGF-β exclusion signature** | Stromal TGF-β drives CD8 exclusion, CXCR3 suppression, and CAF barrier formation (Mariathasan 2018; Gunderson 2020; Henriques 2025) | Research-only (RNA-seq) | **Moderate** — MECHANISTIC HYPOTHESIS in CRC |
| **SMAD4 loss** | Correlates with reduced immune infiltrate, MDSC/neutrophil recruitment, liver metastasis, and chemoresistance (Wasserman 2018; Ogawa 2019; Niu 2024) | Standard (IHC, CLIA-certified) | **Moderate** — MECHANISTIC HYPOTHESIS for IO |
| **Total MHC-I loss (TAP2/LMP7 deficiency)** | Prevents CD8+ T cell recognition of vaccine-primed targets; dominant mechanism in MSS CRC (Cabrera 2003) | Research-only (IHC or RNA-seq) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **High MDSC burden (peripheral blood or TME)** | MDSCs suppress vaccine-induced T cell responses and promote IO resistance (Gneo 2021; Zhang 2025) | Research-only (flow cytometry) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **KRAS mutation (especially G12D)** | Drives MDSC recruitment (CXCL3-CXCR2 axis), CD8 AICD, and immune suppression (Liao 2019; Liu 2023) | Standard (NGS/PCR, CLIA-certified) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **High VEGF-A (serum or tumor)** | VEGF-A drives TOX-dependent T cell exhaustion in MSS CRC (Kim 2019); M2 macrophage polarization via NRP1 (PMID 31209139) | Standard (serum ELISA or IHC) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **High SPP1+ macrophage signature** | SPP1+ macrophages drive IO resistance in MSS CRC and liver metastases (Liu 2025; Dai 2026) | Research-only (RNA-seq or IHC) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **Peritoneal metastases** | Associated with IO resistance in CRC (Küçükköse et al., *JITC* 2022; DOI: 10.1136/jitc-2022-005345) | Standard (CT/MRI staging) | **Moderate** — MECHANISTIC HYPOTHESIS |
| **High serum IL-6** | IL-6 drives DC dysfunction (cDC2→DC3 conversion), MDSC expansion, and immune suppression (Subtil 2024) | Standard (ELISA, CLIA-certified) | **Weak** — EXPLORATORY SIGNAL |

---

## SECTION 3: Contradiction Patterns

Cases where a patient appears favorable on one axis but is actually poor IO biology:

| Apparent Positive Signal | Contradicting Feature | Net Interpretation | Clinical Implication |
|--------------------------|----------------------|-------------------|---------------------|
| **MSS CRC (correct target population)** | Active liver metastases present | Liver mets suppress systemic IO response independent of MSS status; even vaccine-induced T cells are siphoned and eliminated in liver (Yu 2021) | Liver-directed therapy (SBRT, ablation) before or concurrent with STC-1010 may be necessary; liver-only disease may be exclusion criterion |
| **BRAF V600E MSS (higher immune activation)** | Concurrent SMAD4 loss | SMAD4 loss drives MDSC/neutrophil recruitment and immune exclusion, potentially negating the immune-hot phenotype of BRAF V600E | BRAF V600E + SMAD4 loss may represent a contradictory biomarker combination requiring co-targeting of TGF-β/MDSC axis |
| **Low TGF-β signature (favorable)** | KRAS mutation present | KRAS drives MDSC recruitment via CXCL3-CXCR2 axis independently of TGF-β; low TGF-β does not guarantee absence of myeloid suppression | Both TGF-β and KRAS-MDSC axes must be assessed independently |
| **Intact MHC-I expression (favorable for CD8 killing)** | High TGF-β exclusion signature | MHC-I intact but CD8+ T cells cannot traffic to tumor due to TGF-β-mediated CXCR3 suppression and CAF barrier | Antigen presentation capacity is necessary but not sufficient; T cell trafficking must also be permissive |
| **Baseline CD8+ TIL present** | TOX+ exhausted phenotype (high VEGF-A) | CD8+ T cells present but terminally exhausted via VEGF-A/TOX axis; cannot be reinvigorated by vaccine alone (Kim 2019) | Exhaustion phenotyping (TOX, PD-1, TIM-3, LAG-3 co-expression) needed; anti-VEGF (bevacizumab) may partially reverse exhaustion |
| **Low peripheral MDSC count** | High intratumoral SPP1+ macrophage signature | Peripheral MDSCs may not reflect intratumoral myeloid suppression; SPP1+ TAMs are a distinct suppressive population not captured by peripheral MDSC assays | Tumor biopsy-based myeloid profiling needed; peripheral MDSC alone is insufficient |
| **SMAD4 intact (favorable immune infiltrate)** | KRAS G12D co-mutation | SMAD4 retention preserves immune infiltrate, but KRAS G12D independently drives MDSC recruitment and CD8 AICD; co-occurrence creates compound immunosuppression | Combined SMAD4/KRAS status may define a particularly resistant subgroup |
| **Bevacizumab-induced vascular normalization (favorable window)** | Tregs not reduced by bevacizumab in MSS CRC (PMID 35135679) | Vascular normalization improves T cell trafficking but Treg-mediated suppression persists; net effect on vaccine efficacy is uncertain | Treg depletion (low-dose CY) is a necessary complement to bevacizumab in STC-1010 regimen |
| **High tumor mutational burden (TMB) in MSS CRC** | MSS status means TMB is relatively low; high TMB in MSS is rare and may reflect POLE/POLD1 mutations | POLE/POLD1-mutant MSS CRC with high TMB may actually respond to anti-PD-1 monotherapy and may not need vaccine approach | POLE/POLD1 mutation testing should be performed; these patients may be better served by checkpoint inhibitors |

---

## SECTION 4: Biomarker Accessibility Classification

| Biomarker | Clinically Accessible Now? | Standard Assay? | Research Only? | Notes |
|-----------|---------------------------|-----------------|----------------|-------|
| MSS/pMMR status | ✅ Yes | ✅ IHC (4-antibody panel) + PCR/NGS | — | FDA-approved companion diagnostic for pembrolizumab; universally available |
| KRAS mutation status | ✅ Yes | ✅ NGS/PCR | — | Standard-of-care for anti-EGFR therapy selection; allele-specific (G12C, G12D, G12V) available |
| BRAF V600E status | ✅ Yes | ✅ NGS/PCR/IHC | — | Standard-of-care; companion diagnostic for encorafenib |
| SMAD4 protein expression | ✅ Yes | ✅ IHC (CLIA-certified labs) | — | Not standard-of-care but widely available; used in research and some clinical settings |
| Liver metastasis status | ✅ Yes | ✅ CT/MRI staging | — | Standard staging; universally available |
| Peritoneal metastasis status | ✅ Yes | ✅ CT/MRI/laparoscopy | — | Standard staging |
| Serum VEGF-A | ✅ Yes | ✅ ELISA (CLIA-certified) | — | Available but not routinely used for IO selection |
| Serum TGF-β1 | ⚠️ Limited | ⚠️ ELISA available but not standardized | — | Pre-analytical variability; not routinely used clinically |
| Serum IL-6 | ✅ Yes | ✅ ELISA (CLIA-certified) | — | Available; used in inflammatory conditions; not standard for IO |
| CD8+ TIL (IHC) | ✅ Yes | ✅ IHC (CLIA-certified) | — | Available; Immunoscore validated but not yet standard-of-care |
| Immunoscore | ⚠️ Limited | ⚠️ Validated assay (HalioDx) | — | CE-marked in Europe; not FDA-approved; available at specialized centers |
| MHC-I expression (IHC) | ⚠️ Limited | ⚠️ IHC available | — | Not standardized for clinical use; research-grade antibodies |
| TAP1/TAP2 expression | ❌ Research only | — | ✅ RNA-seq or IHC | Not clinically standardized |
| B2M expression/mutation | ⚠️ Limited | ⚠️ IHC/NGS available | — | B2M mutation testing available via NGS panels; IHC not standardized |
| TGF-β exclusion signature | ❌ Research only | — | ✅ RNA-seq | Requires tumor RNA-seq; not clinically standardized |
| MDSC frequency (peripheral blood) | ❌ Research only | — | ✅ Flow cytometry | No standardized clinical assay; research-grade |
| SPP1+ macrophage signature | ❌ Research only | — | ✅ scRNA-seq or IHC | Requires specialized assays |
| TOX expression (T cell exhaustion) | ❌ Research only | — | ✅ IHC or flow cytometry | Not clinically standardized |
| VEGF-A (tumor IHC) | ⚠️ Limited | ⚠️ IHC available | — | Not standardized for IO selection |
| POLE/POLD1 mutation | ✅ Yes | ✅ NGS (CLIA-certified) | — | Available via comprehensive NGS panels |
| TMB (tumor mutational burden) | ✅ Yes | ✅ NGS (CLIA-certified) | — | FDA-approved companion diagnostic (pembrolizumab TMB-H); available via Foundation Medicine, Tempus, etc. |

---

## SECTION 5: Priority Stratification Hypothesis

**Given STC-1010's mechanism (thermal stress + haptenation → ICD → DC priming → CD8+ T cell activation), the following 3–5 biomarkers would most powerfully define a benefit-enriched subgroup:**

### Rank 1: Absence of Active Liver Metastases
**Rationale:** The most powerful single predictor of IO failure in MSS CRC is active liver metastasis. Liver mets suppress systemic T cell responses via Kupffer cell-mediated T cell elimination and antigen-specific Treg expansion (Yu et al., *Nature Medicine* 2021; Wang et al., *JAMA Network Open* 2021). STC-1010's mechanism depends on systemic CD8+ T cell expansion and trafficking to tumor sites — both are directly undermined by hepatic immune tolerance. Patients without liver metastases (or with liver disease controlled by locoregional therapy) represent the most immunologically permissive subgroup.
**Evidence:** VALIDATED CLINICAL OBSERVATION (multi-cancer, CRC-specific data)
**Clinical accessibility:** Standard CT/MRI staging

### Rank 2: Low/Absent TGF-β Exclusion Signature
**Rationale:** TGF-β is the master immune exclusion driver in MSS CRC. Even if STC-1010 successfully primes CD8+ T cells, TGF-β-mediated CXCR3 suppression prevents their trafficking to tumor (Gunderson 2020), and CAF barriers physically exclude them (Mariathasan 2018; Tauriello 2018). A low TGF-β exclusion signature identifies tumors where vaccine-induced T cells can actually reach their targets. This is the most mechanistically critical biomarker for vaccine efficacy.
**Evidence:** MECHANISTIC HYPOTHESIS in CRC (strong preclinical data; clinical validation pending)
**Clinical accessibility:** Research-only (RNA-seq); could be approximated by stromal density on H&E or αSMA IHC

### Rank 3: SMAD4 Status (Intact = Favorable)
**Rationale:** SMAD4 loss (~25–30% of CRC) creates a compound immunosuppressive state: reduced CD8+ TIL, MDSC/neutrophil recruitment, liver metastasis propensity, and chemoresistance (Wasserman 2018; Ogawa 2019; Niu 2024). SMAD4-intact tumors have better immune infiltrate and are more likely to respond to immune activation. SMAD4 is clinically accessible via IHC and provides orthogonal information to MSS status. Importantly, SMAD4 loss may identify patients who need TGF-β pathway co-targeting.
**Evidence:** MECHANISTIC HYPOTHESIS for IO (strong correlative clinical data for prognosis)
**Clinical accessibility:** Standard IHC (CLIA-certified)

### Rank 4: Intact MHC-I / TAP Expression
**Rationale:** STC-1010's ultimate effector mechanism is CD8+ T cell killing of tumor cells. This requires tumor cells to present vaccine-derived peptides on MHC-I. In MSS CRC, TAP1/TAP2 downregulation is the dominant mechanism of MHC-I loss (Cabrera 2003). Patients with intact TAP/MHC-I expression are the only ones where CD8+ T cell killing can occur via classical MHC-I-restricted cytotoxicity. TAP-deficient tumors would require alternative killing mechanisms (NK cells, CD4+ T cells, ADCC).
**Evidence:** MECHANISTIC HYPOTHESIS (validated in CRC specimens; not prospectively tested in IO trials)
**Clinical accessibility:** Research-only (IHC or RNA-seq); could be incorporated into trial biopsy protocol

### Rank 5: KRAS Wild-Type or BRAF V600E MSS
**Rationale:** KRAS mutation drives MDSC recruitment (CXCL3-CXCR2 axis), CD8 AICD, and immune suppression independently of TGF-β (Liao 2019; Liu 2023). KRAS-WT CRC has a more permissive immune microenvironment. Alternatively, BRAF V600E MSS CRC has higher baseline immune activation and may be particularly responsive to vaccine + MAPK inhibition combinations (Morris 2025). These two subgroups represent distinct but favorable immune contexts.
**Evidence:** MECHANISTIC HYPOTHESIS (KRAS-WT); VALIDATED CLINICAL BIOMARKER emerging (BRAF V600E MSS)
**Clinical accessibility:** Standard NGS/PCR (CLIA-certified)

### Composite Stratification Hypothesis

**Highest benefit subgroup (hypothesis):**
MSS CRC + No active liver metastases + SMAD4 intact + Low TGF-β signature + KRAS-WT or BRAF V600E

**Estimated frequency:** This composite subgroup may represent ~10–20% of all MSS mCRC patients (rough estimate; not validated). The rarity of this "ideal" subgroup underscores the need for combination strategies (e.g., TGF-β inhibition, MDSC depletion) to expand the eligible population.

**Lowest benefit subgroup (hypothesis):**
MSS CRC + Active liver metastases + SMAD4 loss + High TGF-β signature + KRAS G12D

---

## APPENDIX: Key Unknowns and Contested Areas

1. **Whether STC-1010-induced immunity is primarily MHC-I-restricted (CD8+) or also includes MHC-II-restricted (CD4+) and innate (NK) components** — critical for TAP-deficient tumors [UNKNOWN]

2. **Whether bevacizumab's vascular normalization window is sufficient to enable vaccine-induced T cell trafficking in the presence of TGF-β-mediated CXCR3 suppression** [UNKNOWN]

3. **Whether low-dose cyclophosphamide in the STC-1010 regimen effectively depletes MDSCs in the CRC TME (vs. peripheral blood only)** [UNKNOWN — CRC-specific data limited]

4. **Whether SMAD4 loss predicts IO resistance (exclusion biomarker) or creates a specific vulnerability to TGF-β inhibition combination** [CONTESTED — no prospective CRC IO trial data]

5. **Whether KRAS G12D-specific T cell responses (Tran et al., *NEJM* 2016; DOI: 10.1056/nejmoa1609279) can be elicited by STC-1010's whole-cell antigen approach** [UNKNOWN — STC-1010 specific]

6. **The relative contribution of M1 macrophage increase (STC-1010 preclinical data, p=0.02) vs. CD8+ T cell increase (p=0.045) to anti-tumor efficacy** [UNKNOWN — mechanistic question]

7. **Whether the SPP1+ macrophage ecosystem in MSS CRC can be reprogrammed by STC-1010 + CY, or whether it represents an absolute resistance mechanism** [UNKNOWN]

8. **Optimal timing of STC-1010 relative to bevacizumab (vascular normalization window is transient)** [UNKNOWN — pharmacodynamic question]

---

## REFERENCES (Key PMIDs/DOIs)

| Citation | PMID/DOI |
|----------|----------|
| Yu et al. 2021 (Liver mets, Nature Medicine) | DOI: 10.1038/s41591-020-1131-x |
| Mariathasan et al. 2018 (TGF-β exclusion, Nature) | DOI: 10.1038/nature25501 |
| Tauriello et al. 2018 (TGF-β CRC, Nature) | DOI: 10.1038/nature25492 |
| Liao et al. 2019 (KRAS-IRF2, Cancer Cell) | DOI: 10.1016/j.ccell.2019.02.008 |
| Liu et al. 2023 (KRAS AICD, Advanced Science) | DOI: 10.1002/advs.202203757 |
| Wasserman et al. 2018 (SMAD4 immune, CCR) | DOI: 10.1158/1078-0432.ccr-18-1726 |
| Ogawa et al. 2019 (SMAD4 neutrophils, CCR) | DOI: 10.1158/1078-0432.ccr-18-3684 |
| Gunderson et al. 2020 (TGF-β CXCR3, Nat Commun) | DOI: 10.1038/s41467-020-15404-8 |
| Kim et al. 2019 (VEGF-TOX exhaustion, Sci Immunol) | DOI: 10.1126/sciimmunol.aay0555 |
| Cabrera et al. 2003 (TAP/B2M CRC, Tissue Antigens) | DOI: 10.1034/j.1399-0039.2003.00020.x |
| Scurr et al. 2017 (Low-dose CY CRC, CCR) | DOI: 10.1158/1078-0432.ccr-17-0895 |
| Gneo et al. 2021 (TGF-β MDSC CRC, CII) | DOI: 10.1007/s00262-021-03081-5 |
| Morris et al. 2025 (BRAF V600E + nivolumab, Cancer Cell) | DOI: 10.1016/j.ccell.2025.08.002 |
| Lee et al. 2020 (Liver mets Tregs, Sci Immunol) | DOI: 10.1126/sciimmunol.aba0759 |
| Henriques et al. 2025 (TGF-β dual barrier, Nat Genetics) | DOI: 10.1038/s41588-025-02380-2 |
| Niu et al. 2024 (SMAD4 G-MDSC, Acta Pharm Sin B) | DOI: 10.1016/j.apsb.2024.05.009 |
| Itatani et al. 2013 (SMAD4 CCL15 liver mets, Gastroenterology) | DOI: 10.1053/j.gastro.2013.07.033 |
| Bevacizumab Tregs MSS CRC | PMID: 35135679 |
| VEGF-NRP1 M2 macrophage | PMID: 31209139 |
| Wang et al. 2021 (MSS CRC liver mets IO, JAMA Network Open) | DOI: 10.1001/jamanetworkopen.2021.18418 |
| Fumet et al. 2025 (PGE2 CD8 exhaustion MSS CRC, Cancer Research) | DOI: 10.1158/0008-5472.can-25-0079 |
| Dai et al. 2026 (Myeloid states MSS CRC, Front Immunol) | DOI: 10.3389/fimmu.2025.1742654 |
| Lal et al. 2017 (KRAS immune CRC) | University of Birmingham preprint/publication |
| Tran et al. 2016 (KRAS G12D TIL, NEJM) | DOI: 10.1056/nejmoa1609279 |
