# Brenus Pharma — Scientific Anchor Document
## Source: Alzeeb et al., Frontiers in Oncology, July 2024
## DOI: https://doi.org/10.3389/fonc.2024.1427428
## Status: VERIFIED — extracted from raw paper text

---

## 1. VACCINE COMPOSITION — 3CL-SH

### Cell Lines (Preclinical / Murine)
| Cell Line | Registry | Origin | Species |
|-----------|----------|--------|---------|
| CT26 | ATCC CRL-2639 | BALB/c mouse colon tumor | Murine |
| CMT-93 | ECACC 89111413 | Rectal carcinoma | Murine |
| LTPA | ATCC CRL-2389 | Pancreatic adenocarcinoma | Murine |

**AUDIT FLAG**: LTPA is pancreatic, not colorectal. This is intentional — Brenus uses it for cross-tumor antigen breadth. The human vaccine (STC-1010) uses **undisclosed human CRC cell lines**.

### Vaccine Dose & Composition
- 10^6 cells/mouse/injection SC (right flank, 100 µL volume)
- Equal thirds: 0.33×10^6 CT26-SH + 0.33×10^6 CMT-93-SH + 0.33×10^6 LTPA-SH

---

## 2. MANUFACTURING PROTOCOL (Verified)
| Step | Parameter |
|------|-----------|
| Thermal stress | 1h at 42°C then 14h at 37°C |
| Haptenation | DNFB (dinitrofluorobenzene, Sigma) 12.7 µg/mL for 30 min ⚠️ [CORRECTED 2026-04-29 — prior entry had typographic error DFNB; correct abbreviation is DNFB] |
| Irradiation | 10 Gy (during stress) + 25 Gy (final inactivation) |
| Storage | -80°C in EBSS + 80 g/L sucrose at 10×10^6 cells/mL |

---

## 3. NAMED TUMOR-ASSOCIATED ANTIGENS (TAAs)
From Table 2 of paper — "Tumor-related proteins, up-regulated in one or more cell line after stimulation and haptenation":

| Protein | Full Name | Mechanism Relevance |
|---------|-----------|---------------------|
| HSP70 (HSPA1A) | Heat Shock Protein 70 | Overexpressed by thermal stress; mediates phagocytosis via CD91 |
| MDR1A | Multidrug Resistance Protein 1A (ABCB1a murine) | Drug resistance marker |
| MDR1B | Multidrug Resistance Protein 1B (ABCB1b murine) | Drug resistance marker |
| TTK | Threonine Tyrosine Kinase / MPS1 | Spindle assembly checkpoint |
| MTA | Metastasis-Associated protein | Transcriptional repressor complex subunit |
| LAMP1 | Lysosomal Associated Membrane Protein 1 | Lysosomal trafficking |

**NOTE**: Paper states 1,196+ proteins expressed in 3CL-SH. Full list in Supplementary Material only.
- MS instrument: Q-Exactive HF (Thermo-Fisher)
- Software: Proline v1.6.1 + HCPprofiler (Anaquant, Lyon)
- Raw MS data: deposited to external repository (see Data Availability Statement)

**Human homologs for TCGA analysis**: ABCB1, TTK, MTA1, MTA2, LAMP1, HSPA1A

---

## 4. IMMUNOSTIMULATORY REGIMEN (Verified Dosages)

### Cyclophosphamide (CP)
- Dose: **15 mg/kg**
- Route: **Intraperitoneal (IP)**
- Timing: **ONE DAY BEFORE each vaccine injection**
- Exact quote: *"cyclophosphamide (Sigma, France) (CP, 15 mg/kg) was administered by intraperitoneal (IP) injection one day before vaccination"*

### GM-CSF (mGM-CSF)
- Dose: **5 µg** (flat dose, not per kg)
- Route: **Subcutaneous (SC) — co-administered with vaccine in same injection**
- Timing: **Same day as vaccine, mixed into same syringe**
- Exact quote: *"mouse granulocyte-macrophage colony-stimulating factor (PeproTech, Neuilly-sur-Seine, France) (mGM-CSF, 5 µg) was administered by SC injections mixing with the vaccine"*

---

## 5. VACCINATION SCHEDULES

### Studies A & B (Standard)
- D7, D14, D21 — once weekly × 3 weeks
- IS: CP IP on D6, D13, D20; mGM-CSF SC on D7, D14, D21 (with vaccine)

### Study B High-Frequency Arm (Dropped)
- D7, D10, D14, D17, D21, D24, D28, D31 — twice weekly × 4 weeks
- **Result**: No significant additional benefit vs once-weekly. This arm was dropped.

### Study C (Anti-PD-1 Resistant Model)
- D6, D13, D20 — once weekly × 3 weeks (same IS regimen)

---

## 6. RAW NUMERICAL RESULTS

### Study A
| Comparison | Day | Avg Tumor Vol (Treatment) | Avg Tumor Vol (Control) | p-value |
|-----------|-----|--------------------------|------------------------|---------|
| CT26-SH + IS vs Control | D20 | 100 mm³ | 661 mm³ | p<0.0003 |
| CT26-SH alone vs Control | D20 | 238 mm³ | 661 mm³ | p=0.003 |
| mOS: CT26-SH vs CT26-H | — | 28d | 24d | p=0.0219 (log-rank) |
| IS + CT26-SH vs IS alone | — | — | — | p=0.0046 (log-rank) |
| IS + CT26-SH vs CT26-SH alone | — | — | — | p=0.0748 (log-rank) |

### Study B
| Comparison | Day | Treatment | Control | p-value |
|-----------|-----|-----------|---------|---------|
| IS + 3CL-SH vs IS + 1CL-SH | D24 | 150 mm³ | 341 mm³ | p=0.0002 (Student's t-test) |
| mOS: IS + 3CL-SH vs IS + CT26-SH | — | 38d | 31.5d | p=0.05 (log-rank) |

### Study C (Anti-PD-1 Resistant MC38)
| Readout | Result |
|---------|--------|
| IS + 3CL-SH vs control (survival) | p=0.00368 |
| Responder rate | 60% |
| Complete responses | 1 confirmed |
| CD8+ T cells | ↑ p=0.045 |
| M1 macrophages | ↑ p=0.02 |

---

## 7. BEVACIZUMAB IMMUNOSUPPRESSION LITERATURE (Verified PMIDs)

| PMID | Title (abbreviated) | Key Mechanism | CRC Relevance |
|------|---------------------|---------------|---------------|
| 28698619 | Anti-VEGF normalizes vasculature, inhibits Treg accumulation | Bev reduces Treg frequency transiently; CD8:Treg ratio rebounds at later cycles | Breast cancer; translational |
| 23340198 | VEGF inhibits DC maturation, promotes Treg accumulation | VEGF suppresses DC function, promotes Treg generation | Foundational mechanistic |
| 31209139 | Tumor VEGF induces M2 macrophage polarization via NRP-1 | VEGF-A → NRP-1 → CD163/IL-10/Arg-1 ↑, TNF-α/IL-12 ↓ | In vitro + in vivo |
| 35135679 | Immune contexture and Treg dynamics in bev-treated mCRC | Bev did NOT significantly reduce Treg density vs baseline in MSS CRC | **MSS CRC specific — critical** |
| 30679748 | VEGF-induced immunosuppression and CD8 TIL exclusion in CRC | VEGF inversely correlated with CD8+ TIL (r=-0.41, p=0.003) | Primary CRC specimens |
| 24399798 | VEGF blockade enhances cancer immunotherapy | Anti-VEGF reduces VEGF-mediated T cell trafficking suppression — only in normalization window | Mechanistic |
| 36858688 | Bev modulates immune microenvironment in mCRC (ESMO Open 2023) | Peak CD8 at cycle 2; CD8:Treg ratio declines by cycle 4 | **mCRC paired biopsy — critical** |

### Critical Mechanistic Tension (AUDIT FLAG)
The BreAK CRC-001 trial includes bevacizumab as OPTIONAL component of SOC backbone (mFOLFOX6 +/- bev).

The literature documents:
- A time-limited "normalization window" after each bev dose (peak CD8 effect at cycle 2)
- Treg reconstitution by cycle 4 as hypoxia re-establishes
- In MSS CRC specifically: bev did NOT significantly reduce Treg density vs baseline

**Implication**: Optimal vaccine-driven CD8 priming may require precise scheduling relative to the bev normalization window. This scheduling question is **NOT addressed in the public BreAK CRC protocol**. This is a primary signal dilution risk.

---

## 8. TCGA ANALYSIS GENE LIST (From Python Script Header)
Human homologs of vaccine antigens + immune readout markers:
- ABCB1 (MDR1 / P-glycoprotein)
- TTK (MPS1)
- MTA1, MTA2
- LAMP1
- HSPA1A (HSP70)
- [Additional immune markers — script truncated in source]

---

*Document status: GROUNDED — all data extracted from verified source material provided by user.*
*Last updated: 2026-04-27*
