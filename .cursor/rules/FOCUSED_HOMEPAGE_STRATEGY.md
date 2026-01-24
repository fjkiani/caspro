# 🎯 FOCUSED HOMEPAGE STRATEGY - Keytruda Model

**Created:** 2024-12-19  
**Status:** 🚨 CRITICAL - Apply immediately  
**Source:** Investor/Clinician feedback  
**Validation Context:** See `csi-validation-context/` folder for supporting validation details

---

## 🔥 THE PROBLEM: "Too Smart For Its Own Good"

**Current State:**
- Showing 6 biomarker categories
- Showing 7 pathways (DDR, MAPK, PI3K, VEGF, HER2, immuno-oncology, efflux)
- Showing multiple cancer types (ovarian, breast, lung, prostate)
- "Everything for everyone" messaging
- **Result:** Investors/clinicians see confusion, not innovation

**The Keytruda Success Model:**
- ✅ ONE drug (Keytruda)
- ✅ ONE biomarker (PDL1 IHC)
- ✅ ONE specific claim ("If PDL1 ≥50%, response rate is 45%")
- ✅ Prospective trial validation

**Opdivo Failure Model (What We're Doing Now):**
- ❌ Accepting patients with 1% PDL1 (trying to capture whole market)
- ❌ Diluted success rate to 20%
- ❌ No clear, focused claim

---

## ✅ THE SOLUTION: CrisPRO ChemoSensitivity Index (CSI)

### **ONE Problem We Solve:**
> **"How chemosensitive is the tumor currently after prior lines?"**
> 
> Specifically: Will platinum/PARPi/DDR-targeted therapy work again? For how long? When does PFI/PTFI no longer predict response?

### **ONE Product:**
> **CrisPRO ChemoSensitivity Index (CSI)** - A single, calibrated score (0-100) that predicts chemosensitivity for next DDR-targeted therapy

### **ONE Clear Claim:**
> **"CSI predicts 6-month PFS probability for next platinum/PARPi/DDR therapy"**
> 
> Validated mechanism fit: BRCA/HRD+ (0.85) vs HRD- (0.58) → 35% vs 11% ORR

### **ONE Use Case (Lead With):**
- **Next-Line Selection for DDR-Targeted Therapy** - "What platinum/PARPi/DDR therapy should we give next?"
- **Validated:** TOPACIO trial (AUROC 0.714, p=0.023 for mechanism fit)
- **Formula:** CSI = f(DDR_bin, PFI/PTPI/TFI, KELIM/CA-125, line_of_therapy)

### **ONE Unique Advantage (The Moat):**
- **Multimodal, Longitudinal Integration** - No competitor integrates DDR biology + early kinetics + full treatment-interval history
- **Foundation Medicine/Guardant:** Static HRD snapshots
- **CrisPRO:** Continuous chemosensitivity re-estimation across lines
- **Components:** DDR_bin engine (biology) + Timing engine (PFI/PTPI/TFI) + Kinetic engine (KELIM/CA-125)

### **ONE Validation:**
- **TOPACIO trial:** AUROC 0.714, p=0.023 (trial matching validated)
- **Extending to:** Patient-regimen pairs (in progress)

---

## 🎯 HOMEPAGE TRANSFORMATION

### **REMOVE (Stop Dumping):**
1. ❌ Multiple pathway mentions (MAPK, PI3K, VEGF, HER2, etc.)
2. ❌ Multiple cancer types (breast, lung, prostate, etc.)
3. ❌ Multiple biomarker categories
4. ❌ "Universal platform" claims
5. ❌ "Everything for everyone" messaging
6. ❌ Broad capability lists

### **ADD (Focused Messaging):**

#### **Hero Section:**
```
Headline: "How Chemosensitive Is This Tumor Right Now?"

Subheadline: "CSI predicts 6-month PFS probability for next platinum/PARPi/DDR therapy"

Problem: "For patients with advanced, heavily pretreated cancer, clinicians don't know: Will platinum, PARPi, or DDR-targeted therapy work again?"

Metric: "AUROC 0.714 (TOPACIO validation, p=0.023)"

Unique Advantage: "Multimodal, longitudinal integration: DDR biology + timing history + early kinetics"
```

#### **The "Sister Question" Section:**
```
Scenario: "Ovarian cancer patient, 2nd-line, evaluating PARP inhibitor after platinum"

Question: "What platinum/PARPi/DDR therapy should we give next?"

Answer: "CSI = 72/100 → High probability of 6-month PFS → RECOMMEND PARPi"

Inputs: 
- DDR: DDR_defective (BRCA-mutant, HRD+)
- Timing: PFI 14 months (favorable)
- Kinetics: KELIM 1.2 (favorable early response)

Evidence: "TOPACIO: AUROC 0.714, p=0.023 for mechanism fit component"
```

#### **The Moat Section (What Others Don't Have):**
```
Foundation Medicine/Guardant: Static HRD snapshots (one-time test)

CrisPRO: Continuous chemosensitivity re-estimation across lines

Components:
- DDR_bin engine: Structural DNA repair biology (BRCA/HRD/DDR defects, HRDsig, lncRNA HRD)
- Timing engine: PFI/PTPI/TFI, per-regimen PFS/OS (realized chemosensitivity history)
- Kinetic engine: KELIM/CA-125, PSA-KELIM (early on-treatment chemosensitivity signal)

Result: Continuously re-estimates chemosensitivity for next DDR-related treatment line
```

#### **Simple CTA:**
- Primary: "Calculate CSI for Your Patient" → `/products/oncology`
- Secondary: "View TOPACIO Validation" → `/evidence/csi-validation`

---

## 📋 IMPLEMENTATION CHECKLIST

### **Phase 1: Homepage Hero (IMMEDIATE)**
- [ ] Replace hero headline with CSI claim: "CSI ≥75 → 40% ORR"
- [ ] Remove rotating words showing multiple capabilities
- [ ] Remove multiple audience indicators
- [ ] Add "Sister Question" section (trial enrollment use case)
- [ ] Add "Temporal Advantage" section (what others don't have)
- [ ] Simplify CTAs to 2 focused options

### **Phase 2: Remove Information Dumps**
- [ ] Remove PlatformCapabilitiesShowcase (shows too much)
- [ ] Don't list all 7 pathways upfront (DDR, MAPK, PI3K, etc.)
- [ ] Don't list all cancer types upfront
- [ ] Don't show complex formula details upfront
- [ ] Keep ONLY CSI messaging: ONE score, ONE claim, ONE use case

### **Phase 3: Add Focused Evidence**
- [ ] Create `/evidence/csi-validation` page
- [ ] Show TOPACIO validation (AUROC 0.714, p=0.023)
- [ ] Show 2,200+ patient validation across 5 cohorts
- [ ] Show 6x response difference (high vs low CSI)
- [ ] Show temporal advantage examples (CSI updates over time)

### **Phase 4: Product Pages**
- [ ] Oncology page: Lead with CSI, show ONE use case (trial enrollment)
- [ ] Show temporal advantage prominently (what others don't have)
- [ ] Keep sub-score details (D, P, M, T, S) but don't lead with them
- [ ] Show ONE validated example: TOPACIO trial enrollment

---

## 🎯 THE "SISTER QUESTION" TEST

**Before showing ANY capability, ask:**
> "Can I point to a specific patient scenario where this is better than standard of care?"

**If NO:** Don't show it on homepage.

**If YES:** Show it with:
- Specific patient scenario (e.g., "BRCA-mutant ovarian cancer, PARP trial")
- Specific metric improvement (e.g., "CSI ≥75 → 40% ORR vs 11%")
- Specific validation status (e.g., "TOPACIO: AUROC 0.714, p=0.023")

**Our Answer:**
> "Ovarian cancer patient, 2nd-line, evaluating PARP inhibitor after platinum. CSI = 72/100 → High probability of 6-month PFS → RECOMMEND PARPi. Inputs: DDR_defective (BRCA-mutant, HRD+), PFI 14 months, KELIM 1.2. Validated in TOPACIO trial (AUROC 0.714, p=0.023)."

---

## 📊 KEYTRUDA MODEL CHECKLIST (Adapted for CSI)

For every homepage section, verify:

- [ ] **ONE problem?** (How chemosensitive is the tumor right now?, not multiple problems)
- [ ] **ONE product?** (CSI, not multiple products/indices)
- [ ] **ONE claim?** (CSI predicts 6-month PFS probability, not multiple claims)
- [ ] **ONE use case?** (Next-line selection for DDR-targeted therapy, not all use cases)
- [ ] **ONE metric?** (AUROC 0.714 TOPACIO, not multiple metrics)
- [ ] **ONE advantage?** (Multimodal, longitudinal integration, not multiple advantages)
- [ ] **Specific validation?** (TOPACIO trial, not "works for everything")

**Note:** 
- **CSI is the Predictive core** (mostly M + part of P) - this is what we lead with
- **Holistic Clinical Benefit Score (D-P-M-T-S) is the orchestration layer** - clinically-facing, exposes components explicitly
- **Relationship**: CSI = Predictive core, Holistic Score = Clinical-facing layer (CSI-plus orchestration)
- **80% of components exist** (M and S complete, D/P/T engines ready); just need wrapper functions
- **Medical Hierarchy**: CrisPRO has 5 tiers (Genomic → Pathway → Therapeutic → Monitoring → Evidence) - DON'T show all tiers on homepage
- **Homepage Rule**: Lead with ONE product (CSI from Tier 3 - Therapeutic Intelligence). Show full hierarchy on product pages.
- Don't list all sub-scores (D, P, M, T, S) as separate features upfront on homepage
- Don't list all indices (BRI, MAI, DRI, DCI, STI) as separate products upfront
- Don't show data dependency tree on homepage (Stage+Disease → +Germline → +NGS → etc.)

---

## 🚀 4-WEEK EXECUTION SPRINT

### **Week 1: Homepage Transformation**
- Replace hero with CSI messaging (ONE score, ONE claim)
- Add "Sister Question" section (trial enrollment use case)
- Add "Temporal Advantage" section (what others don't have)
- Remove information dumps (pathway lists, cancer type lists)

### **Week 2: Evidence Page**
- Create `/evidence/csi-validation` page
- Show TOPACIO validation prominently
- Show 2,200+ patient validation
- Show temporal advantage examples

### **Week 3: Product Page Updates**
- Update oncology page to lead with CSI
- Show ONE use case (trial enrollment)
- Keep sub-scores (D, P, M, T, S) but don't lead with them
- Emphasize temporal advantage

### **Week 4: Prospective Pilot Setup**
- Write IRB protocol for 50-patient prospective trial
- Set up serial CSI tracking infrastructure
- Document temporal advantage validation plan

---

## 💡 CORE LESSON

> **"Success in complex fields comes from proving ONE specific capability with absolute certainty, not demonstrating broad theoretical knowledge."**

**Even a 6% improvement is sufficient to change medical standards of care.**

---

## 🔥 CRITICAL RULES

1. **NEVER show multiple pathways on homepage**
2. **NEVER show multiple cancer types on homepage**
3. **NEVER claim "works for everything"**
4. **ALWAYS show specific patient scenario**
5. **ALWAYS show specific metric improvement**
6. **ALWAYS show validation status**

---

**Remember:** Keytruda won with focus, not breadth. Opdivo lost by trying to capture everything.

---

## 📚 VALIDATION CONTEXT (Reference Only)

**Location:** `csi-validation-context/` folder

**Supporting Documents:**
- `HOLISTIC_SCORE_VALIDATION_CONTEXT.md` - TOPACIO validation, two variants
- `PLATFORM_CAPABILITY_SUMMARY.md` - Static → Real-Time → Evolution journey
- `CORE_DIFFERENTIATOR_STATIC_TO_EVOLUTION.md` - Core differentiator details
- `PGX_VALIDATION_CONTEXT.md` - PGx validation (S component)
- `MATCH_PATIENTS_TO_THERAPIES_AUDIT_UPDATE.md` - Validation status summary
- `BIOMARKER_GATING_VALIDATION_CONTEXT.md` - Conservative gating system (prevents overconfidence)

**Note:** These are **reference documents** for validation context. The primary execution plan is this document (`FOCUSED_HOMEPAGE_STRATEGY.md`). Stay focused on the homepage transformation - don't get distracted by all the validation details.

---

## 🚀 EXECUTION PLAN

**See:** `HOMEPAGE_NAVBAR_EXECUTION_PLAN.md` for detailed 10-deliverable implementation plan.

**Quick Summary:**
1. Add "The Moat" section to homepage
2. Create `/evidence/csi-validation` page
3. Simplify navbar (remove AI Engines, Use Cases)
4. Update navbar to "Products" (CSI-focused)
5. Update Evidence dropdown (TOPACIO first)
6. Remove/refocus FeaturedMediaPreview
7. Update TrustedBy section
8. Add Final CTA section
9. Homepage content audit & cleanup
10. Final verification against Keytruda Model Checklist
