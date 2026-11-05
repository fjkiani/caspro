# B-002 Manufacturing Proxy Analysis: STC-1010 GMP Parameters
**Generated:** 2026-04-28  
**Agent:** Weaponization Agent (Session 3)  
**Blocker:** B-002 — Clinical GMP manufacturing parameters  
**Status:** PARTIALLY RESOLVED — murine proxy only; human parameters not public

---

## What Is Known (Public Sources)

### Murine STC Vaccine Manufacturing (Alzeeb 2024, Front. Oncol.)
Source: Alzeeb G et al. "Efficacy of novel allogeneic cancer cells vaccine to treat colorectal cancer." Front. Oncol. 14:1427428 (2024). DOI: 10.3389/fonc.2024.1427428

These parameters describe the **murine surrogate vaccine** used in preclinical studies. They are NOT confirmed human GMP parameters.

#### Step 1: Thermal Stress
- Temperature: 42°C for 1 hour, then 37°C for 14 hours
- Purpose: Induce HSP70 overexpression (confirmed by flow cytometry using cmHSP70.1 mAb)
- Readout: HSP70 surface expression as QC marker

#### Step 2: Haptenation
- Agent: Dinitrofluorobenzene (DNFB) — note: paper uses "DFNB" but standard chemical name is DNFB (2,4-dinitrofluorobenzene)
- Concentration: 12.7 µg/mL
- Duration: 30 minutes
- Reference: Adapted from Claman & Moorhead (1976) J Immunol 117:480-5
- Purpose: Covalent conjugation of hapten to cell surface proteins; induces DC maturation and proinflammatory signaling

#### Step 3: Inactivation (Final Irradiation)
- Dose: 25 Gy
- Timing: Applied after freezing, before use
- Purpose: Block proliferation capability; maintain membrane integrity ("dead cell with maintained membrane")
- Note: Distinct from the 10 Gy low-dose irradiation used as physical stimulation in Study A (1CL vaccine only)

#### Step 4: Formulation
- Buffer: Earle's Balanced Salt Solution (EBSS) + 80 g/L sucrose
- Cell density: 10 × 10⁶ cells/mL
- Storage: Frozen at -80°C
- Dose per injection: 10⁶ cells/mouse (100 µL SC injection)

#### Step 5: Immunostimulants (Co-administered, not part of vaccine formulation)
- Cyclophosphamide (CP): 15 mg/kg IP, 1 day before vaccination
- mGM-CSF: 5 µg SC, mixed with vaccine at injection
- Purpose: CP depletes Tregs; GM-CSF recruits DCs to injection site

#### Quality Control
- HSP70 overexpression confirmed by flow cytometry (cmHSP70.1 mAb, Klinikum TU München)
- Proteomic validation: LC/MS-MS on Q-Exactive HF; cross-referenced against patient biopsy databases

---

## What Is NOT Known (Human GMP Parameters)

The following human STC-1010 GMP parameters are **not disclosed in any public source**:

| Parameter | Status |
|-----------|--------|
| Irradiation dose (human) | NOT PUBLIC |
| Haptenation agent (human) — DNFB vs alternative | NOT PUBLIC |
| Haptenation concentration (human) | NOT PUBLIC |
| Cell density per dose (human) | NOT PUBLIC |
| Formulation buffer (human) | NOT PUBLIC |
| Batch size / manufacturing scale | NOT PUBLIC |
| GMP facility | NOT PUBLIC |
| Shelf life / stability data | NOT PUBLIC |
| Release criteria | NOT PUBLIC |
| IND/CTA manufacturing section | NOT PUBLIC |

---

## Proxy Inference (Advisory Only — NOT Canon)

Based on the murine parameters and published whole-cell vaccine GMP literature, the following proxy estimates can be made for internal planning purposes only. **These are NOT confirmed and must not be cited as Brenus data.**

### Haptenation Agent
DNFB (dinitrofluorobenzene) is the most likely human haptenation agent based on:
- Murine studies use DNFB (Alzeeb 2024)
- Historical precedent: Berd et al. melanoma vaccine used DNCB (dinitrochlorobenzene), a related hapten
- Gliovac (ERC Belgium) uses a similar haptenation approach
- DNFB is the standard research hapten for contact hypersensitivity induction

### Irradiation
25 Gy is the most likely final inactivation dose based on:
- Murine studies use 25 Gy for final inactivation
- Published whole-cell vaccine literature (GVAX, ONCOVAX) uses 100-200 Gy for human products
- Regulatory precedent for irradiated whole-cell vaccines: 100-200 Gy range common for human GMP
- **Caveat:** Human GMP irradiation dose may differ substantially from murine; 25 Gy may be insufficient for human GMP sterility/inactivation requirements

### Cell Density
10 × 10⁶ cells/mL is the murine formulation density. Human dose is unknown but likely in the range of 10⁷–10⁸ cells/dose based on published whole-cell vaccine literature (GVAX: 5×10⁸ cells/dose; ONCOVAX: 10⁶–10⁷ cells/dose).

### Manufacturing Platform
The SGC (Stimulated Ghost Cell) platform description suggests:
- Adherent cell culture (standard CRC cell line expansion)
- Closed system processing (mentioned as improvement target in Alzeeb 2024 Discussion)
- Cryopreservation-based distribution ("off-the-shelf" model)
- Allogeneic: no patient biopsy required

---

## Comparator: Published Whole-Cell Vaccine GMP Parameters

| Vaccine | Hapten | Irradiation | Cell Dose | Formulation |
|---------|--------|-------------|-----------|-------------|
| Berd melanoma vaccine | DNCB | Not irradiated | 10⁷ cells | Autologous |
| GVAX (pancreatic) | None (GM-CSF secreting) | 100 Gy | 5×10⁸ cells | Allogeneic |
| ONCOVAX (colon) | BCG adjuvant | Not irradiated | 10⁶–10⁷ cells | Autologous |
| Gliovac (glioblastoma) | Haptenated | Not specified | Not specified | Allogeneic |
| STC-1010 (murine proxy) | DNFB 12.7 µg/mL | 25 Gy | 10⁶ cells/mouse | Allogeneic |

---

## B-002 Status
**PARTIALLY RESOLVED — PROXY ONLY**  
- Murine manufacturing parameters extracted from Alzeeb 2024 (peer-reviewed)
- Human GMP parameters not publicly available
- Proxy estimates provided for internal planning only — not for external claims
- Full closure requires Brenus internal GMP documentation or IND/CTA filing review

## Recommended Action
Request Brenus manufacturing summary document (non-confidential version) for B-002 closure. Alternatively, if CrisPRO manufacturing capability assessment is needed, use the murine proxy with explicit PROXY-ONLY label and LOW confidence.
