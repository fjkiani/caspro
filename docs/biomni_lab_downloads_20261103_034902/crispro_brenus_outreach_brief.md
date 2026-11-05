# CrisPRO × Brenus Pharma — Scientific Collaboration Proposal

**Subject:** Computational support for BreAK CRC-001 enrollment gating, DFNB haptenation optimization, and STC-1010 antigen structural validation

---

## Opening

STC-1010's haptenated whole-cell vaccine strategy in MSS/pMMR metastatic colorectal cancer addresses a population with no approved immunotherapy option — a gap underscored by the N0147 pMMR/MSS KRAS-mutant subgroup, which remains ICI-ineligible and whose FOLFOX-treated OS trajectory is well-characterized as a historical benchmark. The preclinical data in Alzeeb et al. 2024 (CT26 tumor volume 150 vs. 341 mm³ at D24; MC38-PD1R mOS improvement, p=0.0368; 60% responders; CD8⁺ enrichment p=0.045; M1 TAM shift p=0.02) provide a mechanistic rationale that warrants rigorous computational support at the enrollment, conjugate chemistry, and antigen-structure levels, which is why CrisPRO is reaching out now.

---

## CrisPRO Contributions

### 1. Oracle — MSS/pMMR Enrollment Gating

Oracle's MMR gene variant classifier (AUROC 0.957) can replace or augment manual IHC-based MSS/pMMR screening for BreAK CRC-001 enrollment. The pipeline was benchmarked against the N0147 pMMR/MSS subgroup — KRAS-mutant, FOLFOX-treated, ICI-ineligible patients who represent the exact target population of STC-1010 — and classifies pathogenic variants across all four canonical MMR genes. Deploying Oracle at screening would reduce IHC-equivocal exclusions and provide a variant-level audit trail for stratification analyses.

### 2. Forge — DFNB Hapten–Antigen Conjugate Optimization

Forge's structure-guided haptenation module can identify optimal DFNB conjugation sites on each of the five STC-1010 tumor-associated antigens — HSP70, CDK1, EPHA2, FAS, and MDR1 — by scoring solvent-exposed lysine and amine residues for steric accessibility, epitope proximity, and predicted conjugation efficiency. Suboptimal haptenation geometry risks masking immunodominant epitopes; Forge's site-ranking output can directly inform conjugate synthesis decisions prior to GMP batch preparation for BreAK CRC-001.

### 3. Boltz — Structural Validation of STC-1010 Antigen Immunogenicity

Boltz's MHC-I/II binding prediction and TCR contact residue mapping can structurally validate the immunogenic potential of the five STC antigens (HSP70, CDK1, EPHA2, FAS, MDR1) across common HLA supertypes. This provides a residue-level mechanistic basis for the CD8⁺ enrichment (p=0.045) and M1 TAM polarization (p=0.02) observed in the MC38-PD1R model, and can flag which antigen–HLA pairings are most likely to drive the responder/non-responder split (60% responders in Alzeeb et al. 2024).

---

## Honest Scope Boundary

CrisPRO's current platform does not include a proteomics pipeline for tumor lysate characterization, methylation-based CMS subtype classification, TMB scoring from sequencing data, TME spatial immunophenotyping, or population-level HLA frequency coverage beyond common supertypes. These capabilities are outside CrisPRO's present scope and would require orthogonal platforms or wet-lab partners to address within BreAK CRC-001.

---

## Proposed Next Step

We propose a 60-minute working session with the BreAK CRC-001 translational team to review the N0147-benchmarked Oracle classifier output on a de-identified MSS/pMMR variant call set and assess fit for prospective enrollment gating.

---

## Signature

**CrisPRO Platform Team**
Oracle · Forge · Boltz
