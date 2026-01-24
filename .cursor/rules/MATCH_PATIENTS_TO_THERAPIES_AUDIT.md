# Match Patients to Therapies Page Audit
**Date:** 2024-12-19  
**Page:** `/products/oncology/match-patients-to-therapies`  
**Status:** ⚠️ **CONFLICTS WITH CSI-FOCUSED STRATEGY**

---

## 🎯 EXECUTIVE SUMMARY

**Problem:** This page shows a **broad framework** (S/P/E drug ranking) with **5 different capabilities** displayed upfront, which directly conflicts with the Keytruda-focused strategy of "ONE product, ONE use case, ONE validation."

**Current State:**
- Shows 5 capabilities: Therapy Fit + 4 related capabilities (Toxicity, Resistance, VUS, Trials)
- Emphasizes S/P/E framework (30% S, 40% P, 30% E) as the core product
- No mention of CSI (ChemoSensitivity Index)
- No focus on DDR-targeted therapy as the primary use case
- Generic "mechanism-based drug ranking" messaging

**Required State (CSI-Focused):**
- Lead with CSI as the ONE product
- Focus on ONE use case: Next-line selection for DDR-targeted therapy (platinum/PARPi/DDR)
- Show ONE validation: TOPACIO (AUROC 0.714, p=0.023)
- S/P/E framework should be positioned as the **underlying methodology** for M (Mechanism Fit), not the product
- Related capabilities should be de-emphasized or moved to secondary sections

**Critical Validation Context (Updated 2025-01-28):**
- ✅ **S/P/E Pipeline IS validated** (AUROC 0.70, n=149) - This validates the M (Mechanism Fit) component of CSI
- ❌ **DDR_bin alone is NOT validated** for baseline resistance (AUROC 0.52, p=0.80) - But IS validated for OS (prognostic, HR=0.62, p=0.013)
- ✅ **CSI unified framework** (D-P-M-T-S) is what matters - Individual components have different validation statuses
- **Key Insight:** CSI unifies validated components (S/P/E for M) with prognostic components (DDR_bin for D/P) and kinetic components (KELIM for T)

---

## 📊 CURRENT PAGE STRUCTURE

### 1. Hero Section
**Current:**
- Title: "Match Patients to Therapies"
- Subtitle: "Mechanism-Based Drug Ranking"
- Description: "S/P/E fusion (Sequence/Pathway/Evidence) for drug ranking."

**Issues:**
- ❌ Generic "mechanism-based" messaging (could be any pathway)
- ❌ S/P/E framework presented as the product (it's the methodology)
- ❌ No mention of CSI
- ❌ No specific use case (DDR-targeted therapy)
- ❌ No validation metric (TOPACIO AUROC 0.714)

**Should Be:**
- Title: "CrisPRO ChemoSensitivity Index (CSI)"
- Subtitle: "Predict 6-Month PFS Probability for Next DDR-Targeted Therapy"
- Description: "One score that fuses DDR biology, treatment timing history, and early kinetics into a unified chemosensitivity prediction. Validated: TOPACIO AUROC 0.714, p=0.023"

### 2. Capability Cards Section
**Current:**
Shows 5 cards in a 3-column grid:
1. **Therapy Fit** (Active) - "Personalized drug ranking with 70-85% confidence"
2. **Prevent Toxicity** - "100% PGx Coverage"
3. **Predict Resistance** - "3-6 Weeks Early Detection"
4. **Resolve Genetic Uncertainty** - "Zero-Shot Variant Interpretation"
5. **Match Clinical Trials** - "96.6% Match Accuracy"

**Issues:**
- ❌ **5 capabilities shown upfront** = "too smart for its own good"
- ❌ No hierarchy - all capabilities appear equal
- ❌ Therapy Fit card doesn't mention CSI or DDR focus
- ❌ Related capabilities distract from core message

**Should Be:**
- **ONE primary card:** CSI for DDR-targeted therapy
  - Title: "ChemoSensitivity Index (CSI)"
  - Subtitle: "Predict 6-Month PFS for Next DDR Therapy"
  - Metric: "AUROC 0.714 (TOPACIO validation, p=0.023)"
  - Use Case: "Next-line selection for platinum/PARPi/DDR therapy"
- **Related capabilities moved to:** Secondary section or separate pages
- **Clear hierarchy:** CSI is the product, other capabilities are supporting tools

### 3. Technical Details Section (Collapsible)
**Current:**
Shows when expanded:
- S/P/E Framework (30% S, 40% P, 30% E)
- Drug Ranking methodology
- Confidence & Evidence Tiers
- Insights Integration
- Genomic Use Cases Grid
- Value Proposition Flywheel

**Issues:**
- ❌ S/P/E framework presented as the primary product
- ❌ No mention of CSI formula or architecture
- ❌ No DDR-specific focus
- ❌ Generic "drug ranking" instead of "chemosensitivity prediction"

**Should Be:**
- **Lead with CSI Architecture:**
  - CSI Formula: `CSI = f(DDR_bin, PFI/PTPI/TFI, KELIM/CA-125, line_of_therapy)`
  - Components: D (Diagnostic), P (Prognostic), M (Mechanism), T (Therapeutic), S (Safety)
  - Use-case-specific weights (next-line: M=0.35, P=0.25, T=0.20, D=0.10, S=0.10)
- **S/P/E Framework as Methodology for M (Mechanism Fit):**
  - ✅ **Validated** (AUROC 0.70, n=149) - This is the validated component
  - Positioned as the underlying mechanism for computing M (Mechanism Fit)
  - Not the product itself, but the validated methodology for the M component
- **DDR_bin Context (Important Clarification):**
  - ❌ **NOT validated** for baseline resistance prediction (AUROC 0.52, p=0.80)
  - ✅ **IS validated** for OS (prognostic, HR=0.62, p=0.013) - Used in D/P components
  - **Key Distinction:** DDR_bin is prognostic (survival), not predictive (resistance) at baseline
- **DDR-Specific Examples:**
  - BRCA1/2 mutations → PARP inhibitors (via S/P/E M component, validated)
  - HRD+ status → Platinum sensitivity (via S/P/E M component, validated)
  - PFI intervals → Chemosensitivity prediction (via P component, prognostic)

---

## 🔍 DETAILED ANALYSIS

### What's Being Shown (Current)

#### Hero Section
```typescript
// Current hero content
{
  title: "Match Patients to Therapies",
  subtitle: "Mechanism-Based Drug Ranking",
  description: "S/P/E fusion (Sequence/Pathway/Evidence) for drug ranking."
}
```

**Problems:**
1. **Too Generic:** "Mechanism-based" could mean any pathway (MAPK, PI3K, VEGF, HER2, IO, Efflux, DDR)
2. **Framework as Product:** S/P/E is presented as the product, not the methodology
3. **No CSI Mention:** The actual product (CSI) is not mentioned
4. **No Use Case:** Doesn't specify DDR-targeted therapy
5. **No Validation:** Missing TOPACIO validation metric

#### Capability Cards
**Current Structure:**
- 1 primary card (Therapy Fit) + 4 related cards
- All shown in equal prominence
- No clear hierarchy

**Problems:**
1. **5 Capabilities = Information Overload:** Exactly the "too smart for its own good" problem
2. **No CSI Focus:** Therapy Fit card doesn't mention CSI
3. **Equal Weighting:** All capabilities appear equally important
4. **Distraction:** Related capabilities pull attention away from core message

#### Technical Details
**Current Content:**
- S/P/E Framework (30% S, 40% P, 30% E)
- Drug Ranking methodology
- Confidence tiers
- Evidence badges

**Problems:**
1. **S/P/E as Product:** Framework presented as the primary product
2. **No CSI Architecture:** Missing D-P-M-T-S framework
3. **No DDR Focus:** Generic drug ranking, not chemosensitivity prediction
4. **No Validation:** Missing TOPACIO validation details

---

## ✅ REQUIRED CHANGES

### 1. Hero Section Transformation

**From:**
```
Title: "Match Patients to Therapies"
Subtitle: "Mechanism-Based Drug Ranking"
Description: "S/P/E fusion (Sequence/Pathway/Evidence) for drug ranking."
```

**To:**
```
Title: "CrisPRO ChemoSensitivity Index (CSI)"
Subtitle: "Predict 6-Month PFS Probability for Next DDR-Targeted Therapy"
Description: "One score that fuses DDR biology, treatment timing history, and early kinetics into a unified chemosensitivity prediction. Validated: TOPACIO AUROC 0.714, p=0.023"
```

**Key Changes:**
- ✅ Lead with CSI (the product)
- ✅ Specify use case (DDR-targeted therapy)
- ✅ Include validation metric (TOPACIO)
- ✅ Focus on ONE problem (chemosensitivity prediction)

### 2. Capability Cards Restructure

**From:**
- 5 cards shown equally (Therapy Fit + 4 related)

**To:**
- **ONE primary card:** CSI for DDR-targeted therapy
  - Title: "ChemoSensitivity Index (CSI)"
  - Subtitle: "Predict 6-Month PFS for Next DDR Therapy"
  - Metric: "AUROC 0.714 (TOPACIO validation)"
  - Use Case: "Next-line selection for platinum/PARPi/DDR therapy"
  - Formula: "CSI = f(DDR_bin, PFI/PTPI/TFI, KELIM/CA-125, line_of_therapy)"
- **Related capabilities:** Move to secondary section or separate pages
- **Clear hierarchy:** CSI is the product, others are supporting tools

### 3. Technical Details Refocus

**From:**
- S/P/E Framework as primary product
- Generic drug ranking methodology

**To:**
- **CSI Architecture as primary:**
  - D-P-M-T-S framework (Diagnostic, Prognostic, Mechanism, Therapeutic, Safety)
  - CSI formula and components
  - Use-case-specific weights
  - DDR-specific examples
- **S/P/E Framework as methodology:**
  - Positioned as the mechanism for computing M (Mechanism Fit)
  - Not the product itself
  - Supporting detail, not primary focus

---

## 🎯 ALIGNMENT WITH CSI STRATEGY

### Keytruda Model Compliance

**Keytruda Model:**
- ✅ ONE drug (Keytruda)
- ✅ ONE biomarker (PDL1 IHC)
- ✅ ONE claim (if PDL1 ≥50%, response rate is 45%)
- ✅ Prospective trial validation

**Current Page:**
- ❌ Multiple capabilities (5 shown)
- ❌ Multiple biomarkers (DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux)
- ❌ Generic claims (70-85% confidence, mechanism-based)
- ❌ No clear validation (TOPACIO not mentioned)

**Required (CSI-Focused):**
- ✅ ONE product (CSI)
- ✅ ONE biomarker (DDR/HRD status)
- ✅ ONE claim (CSI predicts 6-month PFS probability for next DDR-targeted therapy)
- ✅ ONE validation (TOPACIO AUROC 0.714, p=0.023)

### Relationship to Holistic Score & Validation Status

**Current Confusion:**
- Page shows S/P/E framework as the product
- No mention of D-P-M-T-S framework
- No connection to CSI
- No clarity on what's validated vs what's not

**Clarification Needed (Updated 2025-01-29):**
- **CSI = Predictive core** (mostly M + part of P) - This is the homepage product
- **Holistic Score = Clinical-facing orchestration layer** (D-P-M-T-S) - This is what should be on product pages
- **S/P/E = Methodology** for computing M (Mechanism Fit) - ✅ **VALIDATED** (AUROC 0.70, n=149)
- **DDR_bin = Component** for D/P (Diagnostic/Prognostic) - ✅ **VALIDATED for OS** (HR=0.62), ❌ **NOT validated for baseline resistance** (AUROC 0.52)
- **This page should focus on CSI**, with Holistic Score as the clinical-facing framework

**Architecture Hierarchy:**
```
CSI (Predictive Core)
  ├─ M (Mechanism Fit) ← S/P/E methodology (✅ Validated, AUROC 0.70)
  └─ P (Prognostic Risk) ← Timing + DDR_bin (⚠️ DDR_bin prognostic only)

Holistic Score (Clinical-Facing Layer)
  ├─ D (Diagnostic Fit) ← DDR_bin engine
  ├─ P (Prognostic Risk) ← Timing engine (PFI/PTPI/TFI)
  ├─ M (Mechanism Fit) ← S/P/E framework (✅ Validated)
  ├─ T (Therapeutic Dynamics) ← KELIM/CA-125 (✅ Validated)
  └─ S (Safety/Tolerability) ← PGx screening (✅ Validated, PREPARE trial)
```

**Validation Status by Component:**
- **M (Mechanism Fit) via S/P/E:** ✅ Validated (AUROC 0.70, n=149)
- **D (Diagnostic) via DDR_bin:** ⚠️ Validated for OS (prognostic, HR=0.62), NOT for baseline resistance (AUROC 0.52)
- **P (Prognostic) via Timing:** ✅ Validated (PFI/PTPI/TFI correlation with outcomes)
- **T (Therapeutic) via KELIM:** ✅ Validated (KELIM correlation with response)
- **S (Safety) via PGx:** ✅ Validated (PREPARE trial, 83% toxicity reduction)

**Key Insight:** 
- **CSI unifies validated components** - S/P/E (M) is validated, DDR_bin (D/P) is prognostic, KELIM (T) is validated, PGx (S) is validated
- **Holistic Score is the clinical-facing orchestration** - Backend complete (✅), Frontend not started (❌)
- **This page should lead with CSI**, show Holistic Score as the framework, and position S/P/E as the validated methodology for M component

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Hero Section (Priority: P0)
1. Update hero title to "CrisPRO ChemoSensitivity Index (CSI)"
2. Update subtitle to "Predict 6-Month PFS Probability for Next DDR-Targeted Therapy"
3. Add TOPACIO validation metric
4. Focus on ONE use case (next-line DDR therapy)

### Phase 2: Capability Cards (Priority: P0)
1. Replace 5-card grid with ONE primary CSI card
2. Move related capabilities to secondary section
3. Add CSI formula and components
4. Include DDR-specific examples

### Phase 3: Technical Details (Priority: P1)
1. Lead with CSI architecture (D-P-M-T-S)
2. Position S/P/E as methodology for M (Mechanism Fit)
3. Add DDR-specific examples
4. Include TOPACIO validation details

### Phase 4: Content Updates (Priority: P1)
1. Update `therapy-fit-data.ts` to focus on CSI
2. Add CSI formula and components
3. Include DDR-specific use cases
4. Add TOPACIO validation metrics

---

## 🔗 RELATED DOCUMENTS

- `.cursor/rules/FOCUSED_HOMEPAGE_STRATEGY.md` - CSI-focused homepage strategy
- `src/data/homepage/hero-focused-claim.ts` - CSI hero configuration
- `src/data/copilots/therapy-fit-data.ts` - Current therapy-fit data (needs update)

---

## ✅ SUCCESS CRITERIA

**Page should answer:**
1. ✅ What is CSI? (ONE product)
2. ✅ What problem does it solve? (Chemosensitivity prediction for DDR-targeted therapy)
3. ✅ What is the ONE use case? (Next-line selection for platinum/PARPi/DDR therapy)
4. ✅ What is the ONE validation? (TOPACIO AUROC 0.714, p=0.023)
5. ✅ How does it work? (D-P-M-T-S framework, with S/P/E as methodology for M)

**Page should NOT show:**
- ❌ Multiple capabilities upfront (5 cards)
- ❌ Generic "mechanism-based" messaging
- ❌ S/P/E framework as the product
- ❌ All pathways/cancer types equally

---

## 📊 VALIDATION STATUS SUMMARY (Updated 2025-01-28)

### What IS Validated:
- ✅ **S/P/E Pipeline → Platinum Response** (AUROC 0.70, n=149) - Validates M component
- ✅ **DDR_bin → OS** (HR=0.62, p=0.013) - Validates D/P components (prognostic)
- ✅ **MAPK Pathway → Resistance** (RR=2.03x, n=469) - Validated marker
- ✅ **NF1 Mutation → Resistance** (RR=2.16x, n=469) - Validated marker
- ✅ **MFAP4 → Platinum Response** (AUROC 0.763) - Orthogonal biomarker

### What is NOT Validated:
- ❌ **DDR_bin → Baseline Resistance** (AUROC 0.52, p=0.80) - No discrimination
- ❌ **Individual components alone** - Only unified frameworks work

### Key Takeaway:
**CSI unifies validated components** - S/P/E (M) is validated, DDR_bin (D/P) is prognostic, KELIM (T) is validated. The unified CSI framework is what matters, not individual components alone.

---

**Status:** ⚠️ **REQUIRES REFOCUSING ON CSI**  
**Priority:** P0 (Critical - conflicts with homepage strategy)  
**Estimated Effort:** 4-6 hours  
**Last Updated:** 2025-01-29 (Added Holistic Score architecture context + Ovarian Cancer implementation status)

**Related Documents:**
- `.cursor/ayesha/HOLISTIC_CLINICAL_BENEFIT_SCORE_ARCHITECTURE.md` - Backend specification
- `Holistic Clinical Benefit Score - Front-End Integration Plan` - Frontend integration plan (backend ✅ complete, frontend ❌ not started)
- `.cursor/rules/FOCUSED_HOMEPAGE_STRATEGY.md` - CSI-focused homepage strategy
- `OVARIAN CANCER - IMPLEMENTATION SUMMARY` - Complete backend status (✅ 100% complete, frontend ❌ 0% complete)

---

## 🎯 OVARIAN CANCER IMPLEMENTATION CONTEXT (Updated 2025-01-29)

### **Backend Status: ✅ 100% COMPLETE**

**All Engines Ready:**
- ✅ **DDR_bin Engine** - DDR status, BRCA1/BRCA2, HRD assessment
- ✅ **Timing Engine** - PFI, PTPI, TFI, PFS, OS + CA-125 KELIM
- ✅ **CA-125 KELIM** - K-value computation, categories, early decline metrics
- ✅ **Holistic Clinical Benefit Score** - D, P, M, T, S + Overall (all use cases)
- ✅ **CSI v0** - Mechanism Fit (M) + Baseline Risk (P_contrib)

**API Endpoints: ✅ 90% COMPLETE**
- ✅ `POST /api/resistance/ddr-status`
- ✅ `POST /api/resistance/timing-chemo-features`
- ✅ `POST /api/resistance/holistic-clinical-benefit`
- ✅ `POST /api/resistance/csi-v0`
- ⏳ API documentation (10% remaining)

### **Frontend Status: ❌ 0% COMPLETE**

**What's Missing:**
- ❌ `useHolisticClinicalBenefit` hook
- ❌ `useTimingChemoFeatures` hook
- ❌ `HolisticClinicalBenefitCard` component
- ❌ `TimingFeaturesCard` component
- ❌ Integration into trial matching, regimen selection, monitoring views

### **Implications for Match Patients to Therapies Page:**

**Current Problem:**
- Page shows generic S/P/E framework (methodology, not product)
- No mention of completed backend engines
- No focus on ovarian cancer (where all engines are complete)
- No connection to CSI or Holistic Score

**Required Solution:**
- **Lead with CSI** (predictive core) - Backend ✅ complete
- **Show Holistic Score** (clinical-facing framework) - Backend ✅ complete
- **Focus on Ovarian Cancer** (HGSOC) - All engines complete for this use case
- **Position S/P/E** as validated methodology for M component (✅ validated, AUROC 0.70)
- **Show completed capabilities** - DDR_bin, Timing, CA-125 KELIM, Holistic Score, CSI v0

**Key Insight:**
The page should showcase **what's actually built and validated** (CSI, Holistic Score, S/P/E for M) rather than generic framework messaging. All backend engines are complete for ovarian cancer - the page should reflect this reality.