# Weaponization Agent — Blocker Closure Report
**Generated:** 2026-04-28  
**Agent:** Weaponization Agent (Session 3)  
**Scope:** Public-source resolution attempts for B-002, B-003, B-005, SC-001/B-006  
**Method:** Primary source retrieval only — no inference, no fabrication

---

## Executive Summary

| Blocker | Domain | Prior Status | Resolution | New Status |
|---------|--------|-------------|-----------|-----------|
| B-001 | Cell line identity (HCT116/HT29/LoVo) | RESOLVED 2026-04-28 | Already closed | RESOLVED |
| B-002 | GMP manufacturing parameters | BLOCKED | Murine proxy extracted; human params not public | PARTIALLY RESOLVED — PROXY ONLY |
| B-003 | Human clinical efficacy/safety (n=6, DCR, DTH) | BLOCKED | BusinessWire AACR 2026 press release retrieved | CLOSED — PRESS-RELEASE-ONLY |
| B-004 | Bevacizumab arm assignment | BLOCKED | Requires internal protocol — not closeable | REMAINS BLOCKED |
| B-005 | ASCO 2024 abstract-specific claims | BLOCKED | ASCO 2024 was study design only — no efficacy data | CLOSED — CLAIM INVALIDATED |
| B-006 / SC-001 | HT29 BRAF V600E vs BRAF WT eligibility | ACTIVE CONFLICT | No public rationale found | REMAINS OPEN — UNRESOLVABLE |

---

## B-003: Human Clinical Efficacy/Safety Data
**Prior status:** BLOCKED — no public source for n=6, 100% DCR, DTH claims  
**Resolution:** CLOSED — PRESS-RELEASE-ONLY  
**Evidence grade:** PRESS-RELEASE-ONLY (not peer-reviewed; no CI, no PFS, no quantified immune data)

### Primary Source Retrieved
**Source:** BusinessWire, April 14, 2026 — "AACR 2026: First-in-Human STC-1010 Data Show Favorable Safety and Early Immune Engagement in Metastatic MSS Colorectal Cancer"  
**Abstract:** CT051, AACR Annual Meeting 2026, April 20, 2026, Poster Section 50, Board 11  
**Title:** "From preclinical models to first-in-human evaluation of STC-1010 immunotherapy in unresectable advanced colorectal cancer"

### Confirmed Data Points (verbatim from press release)
- **n = 6** patients treated (BreAK CRC-001, NCT06934538, Phase I/IIa, 1L MSS mCRC)
- **Median follow-up: 6 months**
- **Safety:** "Favorable safety with no dose-limiting toxicities (DLTs) observed"
- **Efficacy:** "Promising early efficacy, including 100% disease control rate (DCR) in RECIST"
- **Immune:** "Evidence of immune activation, including delayed-type hypersensitivity (DTH) responses"
- **Exploratory:** "Exploratory analyses are ongoing to further characterize tumor–immune dynamics and identify predictive biomarkers"

### Authors (CT051)
Diego TOSI (Montpellier Cancer Institute), Antoine ITALIANO (Bergonié Institute, Bordeaux), Antoine HOLLEBECQUE (Gustave Roussy, Villejuif), Benoît YOU (Hospices Civils de Lyon), Iseulys RICHERT (Brenus Pharma), Benoit PINTEUR (Brenus Pharma), Paul BRAVETTI (Brenus Pharma), François GHIRINGHELLI (Georges-François Leclerc Cancer Center, Dijon)

### Supporting Source: January 6, 2026 Press Release
**Source:** BusinessWire, January 6, 2026 — "Brenus Pharma Reports Favorable Tolerability and Clinical Signals in Early Preliminary Results"  
- "The first dose levels have been successfully completed with good overall tolerance and no dose-limiting toxicities observed to date"
- CEO Paul Bravetti quote: "preliminary clinical signals are very promising and support further evaluation of subsequent cohorts – we are observing trends in efficacy that are stronger than anything that has been previously reported in hard-to-treat solid tumors"
- Trial continuing to enroll at higher dose levels
- Exploratory analyses ongoing: cytokine profiles, immunophenotyping, PBMC markers, ctDNA, HLA expression, tumor necrosis, immune infiltration, TLS evolution

### Limitations
- No confidence intervals reported for DCR
- No ORR breakdown (CR vs PR vs SD)
- No PFS data
- No quantified DTH response rate or magnitude
- No immune biomarker data (cytokines, T-cell counts)
- Source is press release only — abstract text not publicly accessible (AACR paywall)
- n=6 is insufficient for statistical inference; all findings are descriptive only

### Downstream Routing
- CrisPRO claims citing B-003 data: label as PRESS-RELEASE-ONLY, evidence grade LOW
- Do not use 100% DCR as a standalone efficacy claim without caveat (n=6, no CI, no comparator)
- DTH responses: confirmed as observed, not quantified

---

## B-005: ASCO 2024 Abstract Claims
**Prior status:** BLOCKED — ASCO abstract page inaccessible  
**Resolution:** CLOSED — CLAIM INVALIDATED  
**Finding:** ASCO 2024 presentation was a **study design presentation only** — no clinical efficacy data was presented

### Primary Sources Retrieved
1. **Synapse/Patsnap summary** of ASCO 2024 Brenus presentation (June 2024, Chicago)
2. **ASCO abstract page** (meetings.asco.org/abstracts-presentations/238381) — page loads but no abstract body accessible
3. **BusinessWire ASCO 2024** press release (June 13, 2024)

### Confirmed Finding
The ASCO 2024 presentation described:
- Trial design for BreAK-CRC Phase I/IIA
- Phase I: tolerability of two dose levels + low-dose immunostimulants + SoC chemotherapy
- Phase IIA: 12-month non-progression rate as primary efficacy endpoint
- Exploratory: immune response, ctDNA dynamics
- CTA submission to EU clinical trial system was underway at time of presentation
- **No patients had been treated at time of ASCO 2024** (first patients dosed September 2025)

### Implication for Canon
Any prior canon claim citing "ASCO 2024 efficacy data" for STC-1010 is **unsupported**. ASCO 2024 contained zero patient-level data. The correct citation for first-in-human data is AACR 2026 CT051 (April 2026).

### Corrected Citation Chain
| Milestone | Date | Source | Data Type |
|-----------|------|--------|-----------|
| Preclinical efficacy (murine) | July 2024 | Alzeeb et al., Front. Oncol. | Peer-reviewed |
| Trial design presentation | June 2024 | ASCO 2024, abstract 238381 | Study design only |
| First patients dosed | September 2025 | BusinessWire Sept 2, 2025 | Press release |
| First dose levels completed | January 2026 | BusinessWire Jan 6, 2026 | Press release |
| First-in-human efficacy data | April 2026 | AACR 2026 CT051 | Press release (abstract) |

---

## B-002: GMP Manufacturing Parameters
**Prior status:** BLOCKED — no public human STC-1010 GMP parameters  
**Resolution:** PARTIALLY RESOLVED — murine proxy parameters extracted; human parameters not publicly disclosed  
**See:** `manufacturing_proxy.md` for full analysis

### Summary
Alzeeb 2024 (Front. Oncol.) describes **murine** STC vaccine manufacturing only:
- Irradiation: 25 Gy (final inactivation step)
- Thermal stress: 1h at 42°C then 14h at 37°C
- Haptenation: DNFB (dinitrofluorobenzene) at 12.7 µg/mL for 30 min
- Formulation: EBSS + 80 g/L sucrose, frozen at -80°C at 10×10⁶ cells/mL
- Dose: 10⁶ cells/mouse/injection (SC)

Human STC-1010 parameters (irradiation dose, haptenation concentration, cell density, formulation, GMP batch size) are **not disclosed in any public source**. IND/CTA filing details are not publicly available.

---

## B-004: Bevacizumab Arm Assignment
**Prior status:** BLOCKED  
**Resolution:** REMAINS BLOCKED — requires internal Brenus protocol document  
**Public sources:** NCT06934538 registry entry confirms bevacizumab is part of backbone but does not specify arm-level assignment logic  
**Action required:** Brenus internal protocol review

---

## SC-001 / B-006: HT29 BRAF V600E vs BRAF WT Eligibility Conflict
**Prior status:** ACTIVE CONFLICT  
**Resolution:** REMAINS OPEN — UNRESOLVABLE FROM PUBLIC SOURCES  
**See:** `sc001_conflict_analysis.md` for full analysis

### Summary
- HT29 cell line carries BRAF V600E mutation (well-established in literature)
- BreAK CRC-001 Exclusion Criterion #7: BRAF V600E mutation carriers excluded
- Alzeeb 2024 describes only **murine** cell lines — does not address human STC-1010 composition
- No public source provides scientific rationale for including BRAF V600E-expressing HT29 in a vaccine targeting BRAF WT patients
- Conflict cannot be resolved without Brenus internal data on antigen selection rationale

---

## Actions Required (Manager-Level)

| Action | Owner | Priority |
|--------|-------|---------|
| Confirm B-003 data with actual CT051 poster (request from Brenus or AACR) | Scientific Lead | HIGH |
| Invalidate any canon claims citing ASCO 2024 efficacy data | Canon Manager | HIGH |
| Obtain Brenus internal protocol for B-004 bevacizumab arm assignment | BD Lead | MEDIUM |
| Request Brenus scientific rationale for HT29 inclusion (SC-001) | Scientific Lead | HIGH |
| Obtain human STC-1010 GMP parameters for B-002 closure | Regulatory Lead | MEDIUM |
