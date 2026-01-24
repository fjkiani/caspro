# Homepage & Navbar Execution Plan - CSI Focus

**Date:** 2025-01-29  
**Status:** 🚨 CRITICAL - Execute immediately  
**Based on:** `FOCUSED_HOMEPAGE_STRATEGY.md`

---

## 🎯 CURRENT STATE AUDIT

### **Homepage Current Sections:**
1. ✅ **HeroSection** - Already using `FOCUSED_HERO_CONFIG` (GOOD - CSI-focused)
2. ✅ **CSISisterQuestion** - Already showing focused scenario (GOOD)
3. ⚠️ **TrustedBy** - Social proof (ACCEPTABLE - keep but make CSI-focused)
4. ❌ **FeaturedMediaPreview** - Generic content (NEEDS REVIEW - may remove or make CSI-focused)

### **Homepage Commented Out (Good - Already Removed):**
- WhatWeDoSection
- MetricsShowcase
- HowItWorksSection
- DrugDevelopmentPlatform
- FeaturedDemosSection
- EngineRoom
- InteractiveDemoSection
- ROICalculatorSection

### **Navbar Current Structure:**
```
- About
- Platform (dropdown: Therapy Selection, Hypothesis Validator, CRISPR Intelligence, Drug Discovery)
- AI Engines (dropdown: Oracle, Forge)
- Use Cases (dropdown: 7+ links)
- Evidence (dropdown: Evidence Intelligence, S/P/E Fusion, SAE Intelligence)
- SAE (direct link)
- Blog
- Docs
- Contact
```

**Problem:** Too many options, not CSI-focused, shows "everything for everyone"

---

## ✅ TARGET STATE (What We Want)

### **Homepage Sections (4-5 Total):**

1. **Hero Section** ✅ (Already good - CSI-focused)
   - Problem: "How chemosensitive is the tumor right now?"
   - Product: "CrisPRO ChemoSensitivity Index (CSI)"
   - Claim: "CSI predicts 6-month PFS probability"
   - Validation: "AUROC 0.714 (TOPACIO validation, p=0.023)"
   - CTAs: "Calculate CSI" + "View TOPACIO Validation"

2. **Sister Question Section** ✅ (Already good - shows ONE scenario)
   - Scenario: Ovarian cancer, 2nd-line, PARP inhibitor
   - Answer: CSI = 72/100 → RECOMMEND PARPi
   - Validation: TOPACIO AUROC 0.714

3. **The Moat Section** ❌ (MISSING - Add this)
   - Headline: "Multimodal, Longitudinal Integration (What Others Don't Have)"
   - Comparison: Foundation Medicine/Guardant (static) vs CrisPRO (continuous)
   - Components: DDR_bin engine + Timing engine + Kinetic engine
   - Value: Continuously re-estimates chemosensitivity

4. **Trusted By** ⚠️ (Keep but make CSI-focused)
   - Keep social proof but add CSI validation context
   - Show: "Validated on TOPACIO trial" badge

5. **Featured Media Preview** ❌ (REMOVE or make CSI-focused)
   - Option A: Remove entirely (simplest)
   - Option B: Only show CSI-related content (TOPACIO validation, CSI demos)

### **Navbar Target Structure (Simplified, CSI-Focused):**

```
- Home (logo)
- Products (dropdown)
  - CSI for Oncology (/products/oncology)
  - Research (/products/research)
  - R&D (/products/r-d)
- Evidence (dropdown)
  - TOPACIO Validation (/evidence/csi-validation)
  - S/P/E Framework (/evidence/spe-fusion)
  - SAE Intelligence (/evidence/sae-intelligence)
- About
- Docs
- Contact
```

**Removed from Navbar:**
- ❌ "AI Engines" (too technical, not CSI-focused)
- ❌ "Use Cases" (too many options, dilutes focus)
- ❌ "SAE" direct link (move to Evidence dropdown)
- ❌ "Blog" (or keep if it has CSI content)

---

## 📋 10 DELIVERABLES PLAN

### **DELIVERABLE 1: Add "The Moat" Section to Homepage**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/landing/CSIMoatSection.tsx` (NEW)  
**Content:**
- Headline: "Multimodal, Longitudinal Integration (What Others Don't Have)"
- Comparison table: Foundation Medicine/Guardant vs CrisPRO
- Three components: DDR_bin engine, Timing engine, Kinetic engine
- Value proposition: "Continuously re-estimates chemosensitivity"
- CTA: Link to `/products/oncology`

**Acceptance Criteria:**
- [ ] Shows ONE advantage (multimodal, longitudinal)
- [ ] Clear comparison with competitors
- [ ] No pathway lists, no cancer type lists
- [ ] Focused on CSI differentiator

---

### **DELIVERABLE 2: Create `/evidence/csi-validation` Page**
**Priority:** 🔥 CRITICAL  
**File:** `src/app/evidence/csi-validation/page.tsx` (NEW)  
**Content:**
- TOPACIO validation prominently displayed
- AUROC 0.714, p=0.023
- Mechanism fit validation (BRCA-mutant 0.849 vs HRD-negative 0.579)
- ORR by quartile (Q4 = 42.9% vs Q1 = 7.1%)
- Link back to homepage

**Acceptance Criteria:**
- [ ] ONE validation (TOPACIO) prominently shown
- [ ] Clear metrics (AUROC, p-value, ORR)
- [ ] No other validations competing for attention
- [ ] Links back to CSI homepage

---

### **DELIVERABLE 3: Simplify Navbar - Remove "AI Engines"**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Remove "AI Engines" dropdown
- Move Oracle/Forge to "Products" dropdown (if needed) or remove entirely
- Keep navigation focused on CSI

**Acceptance Criteria:**
- [ ] "AI Engines" removed from navbar
- [ ] Navbar has max 5-6 items
- [ ] All items are CSI-focused or essential (About, Docs, Contact)

---

### **DELIVERABLE 4: Simplify Navbar - Remove "Use Cases"**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Remove "Use Cases" dropdown
- Use cases can be accessed from product pages
- Keep navigation focused on ONE use case (next-line DDR therapy)

**Acceptance Criteria:**
- [ ] "Use Cases" removed from navbar
- [ ] Navigation doesn't show multiple use cases upfront
- [ ] ONE use case (CSI for next-line DDR therapy) is clear from homepage

---

### **DELIVERABLE 5: Update Navbar "Platform" to "Products"**
**Priority:** HIGH  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Rename "Platform" to "Products"
- Update dropdown to show:
  - CSI for Oncology (/products/oncology)
  - Research (/products/research)
  - R&D (/products/r-d)
- Remove "Therapy Selection", "Hypothesis Validator", "CRISPR Intelligence" (too specific)

**Acceptance Criteria:**
- [ ] "Platform" renamed to "Products"
- [ ] Dropdown shows 3 products max
- [ ] CSI for Oncology is first item
- [ ] No capability-level items in dropdown

---

### **DELIVERABLE 6: Update Navbar "Evidence" Dropdown**
**Priority:** HIGH  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Update Evidence dropdown:
  - TOPACIO Validation (/evidence/csi-validation) - FIRST ITEM
  - S/P/E Framework (/evidence/spe-fusion)
  - SAE Intelligence (/evidence/sae-intelligence)
- Remove "Evidence Intelligence" (too generic)
- Move "SAE" direct link into dropdown

**Acceptance Criteria:**
- [ ] TOPACIO Validation is first item
- [ ] Max 3 items in Evidence dropdown
- [ ] All items are CSI-relevant
- [ ] No generic "Evidence Intelligence" link

---

### **DELIVERABLE 7: Remove or Refocus FeaturedMediaPreview**
**Priority:** MEDIUM  
**File:** `src/app/page.tsx`  
**Options:**
- **Option A:** Remove entirely (simplest)
- **Option B:** Only show if media has "csi" or "topacio" tag
- **Option C:** Replace with CSI validation preview card

**Acceptance Criteria:**
- [ ] No generic content on homepage
- [ ] If media shown, it's CSI-focused
- [ ] Homepage doesn't show "everything for everyone"

---

### **DELIVERABLE 8: Update TrustedBy Section**
**Priority:** MEDIUM  
**File:** `src/components/shared/TrustedBy.tsx`  
**Changes:**
- Add CSI validation badge: "Validated on TOPACIO trial"
- Update header to mention CSI validation
- Keep social proof but add CSI context

**Acceptance Criteria:**
- [ ] CSI validation mentioned
- [ ] TOPACIO trial referenced
- [ ] Still shows social proof
- [ ] No generic "trusted by everyone" messaging

---

### **DELIVERABLE 9: Add Final CTA Section**
**Priority:** MEDIUM  
**File:** `src/components/landing/CSIFinalCTA.tsx` (NEW)  
**Content:**
- Headline: "Calculate CSI for Your Patient"
- Subheadline: "Predict chemosensitivity for next DDR-targeted therapy"
- Two CTAs:
  - Primary: "Calculate CSI" → `/products/oncology`
  - Secondary: "View TOPACIO Validation" → `/evidence/csi-validation`
- Simple, focused, no information dump

**Acceptance Criteria:**
- [ ] ONE clear CTA (Calculate CSI)
- [ ] ONE secondary CTA (View Validation)
- [ ] No multiple options confusing users
- [ ] Focused on ONE use case

---

### **DELIVERABLE 10: Homepage Content Audit & Cleanup**
**Priority:** HIGH  
**File:** `src/app/page.tsx`  
**Changes:**
- Remove all commented-out sections (clean up code)
- Ensure only 4-5 sections are active:
  1. HeroSection
  2. CSISisterQuestion
  3. CSIMoatSection (NEW - Deliverable 1)
  4. TrustedBy (updated)
  5. CSIFinalCTA (NEW - Deliverable 9)
- Remove FeaturedMediaPreview (or make CSI-only)

**Acceptance Criteria:**
- [ ] Only 4-5 sections on homepage
- [ ] All sections are CSI-focused
- [ ] No commented-out code
- [ ] Clean, focused homepage

---

## 🎯 KEYTRUDA MODEL CHECKLIST (Per Deliverable)

For each deliverable, verify:

- [ ] **ONE problem?** (How chemosensitive is the tumor right now?)
- [ ] **ONE product?** (CSI, not multiple products)
- [ ] **ONE claim?** (CSI predicts 6-month PFS probability)
- [ ] **ONE use case?** (Next-line selection for DDR-targeted therapy)
- [ ] **ONE metric?** (AUROC 0.714 TOPACIO)
- [ ] **ONE advantage?** (Multimodal, longitudinal integration)
- [ ] **Specific validation?** (TOPACIO trial, not "works for everything")

---

## 📊 IMPLEMENTATION ORDER

### **Week 1: Critical Foundation (Deliverables 1-3)**
1. Add "The Moat" Section (Deliverable 1)
2. Create `/evidence/csi-validation` Page (Deliverable 2)
3. Simplify Navbar - Remove "AI Engines" (Deliverable 3)

### **Week 2: Navigation Simplification (Deliverables 4-6)**
4. Simplify Navbar - Remove "Use Cases" (Deliverable 4)
5. Update Navbar "Platform" to "Products" (Deliverable 5)
6. Update Navbar "Evidence" Dropdown (Deliverable 6)

### **Week 3: Content Refinement (Deliverables 7-9)**
7. Remove or Refocus FeaturedMediaPreview (Deliverable 7)
8. Update TrustedBy Section (Deliverable 8)
9. Add Final CTA Section (Deliverable 9)

### **Week 4: Final Cleanup (Deliverable 10)**
10. Homepage Content Audit & Cleanup (Deliverable 10)

---

## 🔥 CRITICAL RULES (Apply to ALL Deliverables)

1. **NEVER show multiple pathways on homepage**
2. **NEVER show multiple cancer types on homepage**
3. **NEVER claim "works for everything"**
4. **ALWAYS show specific patient scenario**
5. **ALWAYS show specific metric improvement**
6. **ALWAYS show validation status**
7. **ALWAYS verify against Keytruda Model Checklist**

---

## ✅ SUCCESS METRICS

### **Homepage:**
- [ ] Only 4-5 sections total
- [ ] All sections are CSI-focused
- [ ] ONE problem, ONE product, ONE claim, ONE use case
- [ ] Clear path to `/products/oncology` and `/evidence/csi-validation`

### **Navbar:**
- [ ] Max 5-6 items (including dropdowns)
- [ ] All items are CSI-focused or essential
- [ ] No "everything for everyone" messaging
- [ ] Clear path to CSI product and validation

### **User Experience:**
- [ ] Visitor immediately understands: "CSI predicts chemosensitivity for DDR therapy"
- [ ] Visitor can find ONE use case (next-line selection)
- [ ] Visitor can see ONE validation (TOPACIO)
- [ ] No confusion about what CrisPRO does

---

**Remember:** Keytruda won with focus, not breadth. Opdivo lost by trying to capture everything.

**Last Updated:** 2025-01-29  
**Status:** ✅ **EXECUTION PLAN READY**
