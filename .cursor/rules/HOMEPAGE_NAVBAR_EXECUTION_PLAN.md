# Homepage & Navbar Execution Plan - CSI Focus (REVISED)

**Date:** 2025-01-29  
**Status:** 🚨 CRITICAL - Execute immediately  
**Based on:** `FOCUSED_HOMEPAGE_STRATEGY.md`  
**Revision:** Audited existing components - REUSE instead of reinventing

---

## 🎯 CURRENT STATE AUDIT

### **Homepage Current Sections:**
1. ✅ **HeroSection** - Already using `FOCUSED_HERO_CONFIG` (GOOD - CSI-focused)
2. ✅ **CSISisterQuestion** - Already showing focused scenario (GOOD)
3. ⚠️ **TrustedBy** - Social proof (ACCEPTABLE - keep but make CSI-focused)
4. ❌ **FeaturedMediaPreview** - Generic content (NEEDS REVIEW - may remove or make CSI-focused)

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
2. **Sister Question Section** ✅ (Already good - shows ONE scenario)
3. **The Moat Section** ❌ (MISSING - Add this - **REUSE MOATShowcase component**)
4. **Trusted By** ⚠️ (Keep but make CSI-focused)
5. **Final CTA** ❌ (MISSING - Add this - **REUSE CTASection component**)

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

---

## 🔍 REUSABLE COMPONENTS AUDIT

### **✅ Components We Can REUSE (Don't Reinvent):**

#### **1. MOATShowcase Component** (`src/components/landing/MOATShowcase.tsx`)
- **Status:** ✅ EXISTS (345 lines)
- **What it does:** Interactive MOAT capabilities showcase with CardSlider
- **Reuse for:** CSI Moat Section (Deliverable 1)
- **Adaptation needed:**
  - Replace MOAT_CAPABILITIES array with CSI-focused moat data
  - Keep CardSlider, interactive expand/collapse
  - Update content to show: "Multimodal, Longitudinal Integration"
  - Show 3 components: DDR_bin engine, Timing engine, Kinetic engine
  - Comparison: Foundation Medicine/Guardant vs CrisPRO

#### **2. CTASection Component** (`src/components/shared/CTASection.tsx`)
- **Status:** ✅ EXISTS (110 lines)
- **What it does:** Reusable CTA section with primary/secondary buttons
- **Reuse for:** Final CTA Section (Deliverable 9)
- **Adaptation needed:**
  - Just pass props: title, description, primaryButton, secondaryButton
  - No code changes needed!

#### **3. ComparisonSection Component** (`src/components/universal/organisms/ComparisonSection.tsx`)
- **Status:** ✅ EXISTS (312 lines)
- **What it does:** Side-by-side comparison with cards/table layout
- **Reuse for:** CSI Moat Section comparison (Deliverable 1)
- **Adaptation needed:**
  - Create comparison data: Foundation Medicine/Guardant vs CrisPRO
  - Use "side_by_side" layout
  - Show: Static HRD snapshots vs Continuous chemosensitivity

#### **4. MetricsShowcase Component** (`src/components/products/shared/MetricsShowcase.tsx`)
- **Status:** ✅ EXISTS (188 lines)
- **What it does:** Displays metrics with icons, values, descriptions
- **Reuse for:** TOPACIO Validation Page (Deliverable 2)
- **Adaptation needed:**
  - Pass TOPACIO metrics: AUROC 0.714, p=0.023, ORR quartiles
  - Use existing badge, title, subtitle props
  - No code changes needed!

#### **5. Evidence Page Structure** (`src/app/evidence/page.tsx`)
- **Status:** ✅ EXISTS
- **What it does:** Evidence page wrapper using UnifiedEvidencePage
- **Reuse for:** Create `/evidence/csi-validation` page (Deliverable 2)
- **Adaptation needed:**
  - Create new page: `src/app/evidence/csi-validation/page.tsx`
  - Use MetricsShowcase for TOPACIO metrics
  - Use existing evidence components for structure

#### **6. TrustedBy Component** (`src/components/shared/TrustedBy.tsx`)
- **Status:** ✅ EXISTS (220 lines)
- **What it does:** Social proof with partner logos
- **Reuse for:** Update TrustedBy Section (Deliverable 8)
- **Adaptation needed:**
  - Add CSI validation badge: "Validated on TOPACIO trial"
  - Update header text to mention CSI
  - Keep existing partner logos

---

## 📋 10 DELIVERABLES PLAN (REVISED - REUSE FOCUSED)

### **DELIVERABLE 1: Add "The Moat" Section to Homepage**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/landing/CSIMoatSection.tsx` (NEW - but REUSE MOATShowcase structure)  
**Reusable Components:**
- ✅ **MOATShowcase.tsx** - Use as template/structure
- ✅ **ComparisonSection.tsx** - Use for Foundation Medicine/Guardant comparison
- ✅ **CardSlider.tsx** - Already used in MOATShowcase

**Implementation:**
1. Copy `MOATShowcase.tsx` structure
2. Replace MOAT_CAPABILITIES with CSI moat data:
   ```typescript
   const CSI_MOAT = {
     id: 'multimodal-longitudinal',
     title: 'Multimodal, Longitudinal Integration',
     subtitle: 'What Others Don't Have',
     description: 'No competitor integrates DDR biology + early kinetics + full treatment-interval history',
     components: [
       { name: 'DDR_bin engine', description: 'Structural DNA repair biology' },
       { name: 'Timing engine', description: 'PFI/PTPI/TFI, per-regimen PFS/OS' },
       { name: 'Kinetic engine', description: 'KELIM/CA-125, PSA-KELIM' }
     ],
     comparison: {
       competitors: ['Foundation Medicine', 'Guardant'],
       crispro: 'Continuous chemosensitivity re-estimation'
     }
   }
   ```
3. Use ComparisonSection for Foundation Medicine/Guardant vs CrisPRO table
4. Keep interactive expand/collapse from MOATShowcase

**Acceptance Criteria:**
- [ ] Shows ONE advantage (multimodal, longitudinal)
- [ ] Clear comparison with competitors (using ComparisonSection)
- [ ] No pathway lists, no cancer type lists
- [ ] Focused on CSI differentiator
- [ ] Reuses existing components (no reinvention)

---

### **DELIVERABLE 2: Create `/evidence/csi-validation` Page**
**Priority:** 🔥 CRITICAL  
**File:** `src/app/evidence/csi-validation/page.tsx` (NEW)  
**Reusable Components:**
- ✅ **MetricsShowcase.tsx** - Use for TOPACIO metrics display
- ✅ **Evidence page structure** - Follow existing pattern
- ✅ **CTASection.tsx** - Use for page CTA

**Implementation:**
1. Create new page: `src/app/evidence/csi-validation/page.tsx`
2. Use MetricsShowcase component with TOPACIO data:
   ```typescript
   const topacioMetrics = [
     { icon: Target, value: '0.714', label: 'AUROC', description: 'TOPACIO trial validation', color: 'blue' },
     { icon: CheckCircle, value: '0.023', label: 'p-value', description: 'Statistical significance', color: 'green' },
     { icon: TrendingUp, value: '42.9%', label: 'Q4 ORR', description: 'Highest quartile response rate', color: 'purple' }
   ]
   ```
3. Add mechanism fit validation section (BRCA-mutant 0.849 vs HRD-negative 0.579)
4. Add ORR by quartile visualization
5. Use CTASection for "Back to Homepage" CTA

**Acceptance Criteria:**
- [ ] ONE validation (TOPACIO) prominently shown
- [ ] Clear metrics (AUROC, p-value, ORR) using MetricsShowcase
- [ ] No other validations competing for attention
- [ ] Links back to CSI homepage
- [ ] Reuses existing components (MetricsShowcase, CTASection)

---

### **DELIVERABLE 3: Simplify Navbar - Remove "AI Engines"**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Remove "AI Engines" dropdown from NAV_LINKS array
- No component changes needed - just data structure update

**Acceptance Criteria:**
- [ ] "AI Engines" removed from navbar
- [ ] Navbar has max 5-6 items
- [ ] All items are CSI-focused or essential

---

### **DELIVERABLE 4: Simplify Navbar - Remove "Use Cases"**
**Priority:** 🔥 CRITICAL  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Remove "Use Cases" dropdown from NAV_LINKS array
- No component changes needed - just data structure update

**Acceptance Criteria:**
- [ ] "Use Cases" removed from navbar
- [ ] Navigation doesn't show multiple use cases upfront
- [ ] ONE use case (CSI for next-line DDR therapy) is clear from homepage

---

### **DELIVERABLE 5: Update Navbar "Platform" to "Products"**
**Priority:** HIGH  
**File:** `src/components/ui/Navbar.tsx`  
**Changes:**
- Rename "Platform" to "Products" in NAV_LINKS
- Update dropdown subLinks array:
  ```typescript
  subLinks: [
    { href: '/products/oncology', label: 'CSI for Oncology' },
    { href: '/products/research', label: 'Research' },
    { href: '/products/r-d', label: 'R&D' }
  ]
  ```
- Remove "Therapy Selection", "Hypothesis Validator", "CRISPR Intelligence"

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
- Update Evidence dropdown subLinks:
  ```typescript
  subLinks: [
    { href: '/evidence/csi-validation', label: 'TOPACIO Validation' },
    { href: '/evidence/spe-fusion', label: 'S/P/E Framework' },
    { href: '/evidence/sae-intelligence', label: 'SAE Intelligence' }
  ]
  ```
- Remove "Evidence Intelligence" (too generic)
- Remove "SAE" direct link (now in dropdown)

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
- **Option A:** Remove entirely (simplest) - **RECOMMENDED**
- **Option B:** Only show if media has "csi" or "topacio" tag
- **Option C:** Replace with CSI validation preview card (reuse MetricsShowcase)

**Acceptance Criteria:**
- [ ] No generic content on homepage
- [ ] If media shown, it's CSI-focused
- [ ] Homepage doesn't show "everything for everyone"

---

### **DELIVERABLE 8: Update TrustedBy Section**
**Priority:** MEDIUM  
**File:** `src/components/shared/TrustedBy.tsx`  
**Reusable Components:**
- ✅ **TrustedBy.tsx** - Already exists, just update content

**Changes:**
- Add CSI validation badge in header:
  ```typescript
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
    ✅ Validated on TOPACIO trial (AUROC 0.714, p=0.023)
  </div>
  ```
- Update header text: "Trusted By Leading Organizations - CSI Validated"
- Keep existing partner logos

**Acceptance Criteria:**
- [ ] CSI validation mentioned
- [ ] TOPACIO trial referenced
- [ ] Still shows social proof
- [ ] No generic "trusted by everyone" messaging
- [ ] Reuses existing TrustedBy component

---

### **DELIVERABLE 9: Add Final CTA Section**
**Priority:** MEDIUM  
**File:** `src/components/landing/CSIFinalCTA.tsx` (NEW - but REUSE CTASection)  
**Reusable Components:**
- ✅ **CTASection.tsx** - Perfect match! Just pass props

**Implementation:**
1. Create wrapper component: `CSIFinalCTA.tsx`
2. Use CTASection component with CSI props:
   ```typescript
   <CTASection
     title="Calculate CSI for Your Patient"
     description="Predict chemosensitivity for next DDR-targeted therapy"
     primaryButton={{
       text: "Calculate CSI",
       href: "/products/oncology",
       color: "blue"
     }}
     secondaryButton={{
       text: "View TOPACIO Validation",
       href: "/evidence/csi-validation",
       color: "blue"
     }}
     backgroundColor="blue"
   />
   ```
3. No custom code needed - just props!

**Acceptance Criteria:**
- [ ] ONE clear CTA (Calculate CSI)
- [ ] ONE secondary CTA (View Validation)
- [ ] No multiple options confusing users
- [ ] Focused on ONE use case
- [ ] Reuses existing CTASection component (no reinvention)

---

### **DELIVERABLE 10: Homepage Content Audit & Cleanup**
**Priority:** HIGH  
**File:** `src/app/page.tsx`  
**Changes:**
- Remove all commented-out sections (clean up code)
- Ensure only 4-5 sections are active:
  1. HeroSection ✅
  2. CSISisterQuestion ✅
  3. CSIMoatSection (NEW - Deliverable 1)
  4. TrustedBy (updated - Deliverable 8)
  5. CSIFinalCTA (NEW - Deliverable 9)
- Remove FeaturedMediaPreview (Deliverable 7)

**Acceptance Criteria:**
- [ ] Only 4-5 sections on homepage
- [ ] All sections are CSI-focused
- [ ] No commented-out code
- [ ] Clean, focused homepage

---

## 🎯 REUSABLE COMPONENTS SUMMARY

### **Components to REUSE (Don't Reinvent):**

| Component | File | Reuse For | Adaptation Needed |
|-----------|------|-----------|------------------|
| **MOATShowcase** | `src/components/landing/MOATShowcase.tsx` | CSI Moat Section | Replace data array, keep structure |
| **CTASection** | `src/components/shared/CTASection.tsx` | Final CTA | Just pass props, no code changes |
| **ComparisonSection** | `src/components/universal/organisms/ComparisonSection.tsx` | Competitor comparison | Create comparison data object |
| **MetricsShowcase** | `src/components/products/shared/MetricsShowcase.tsx` | TOPACIO validation | Pass TOPACIO metrics as props |
| **TrustedBy** | `src/components/shared/TrustedBy.tsx` | Social proof | Add CSI badge, update text |
| **CardSlider** | `src/components/shared/CardSlider.tsx` | Moat cards display | Already used in MOATShowcase |

### **New Components Needed (Minimal Code):**

1. **CSIMoatSection.tsx** - Copy MOATShowcase, replace data
2. **CSIFinalCTA.tsx** - Wrapper around CTASection (just props)
3. **csi-validation/page.tsx** - Use MetricsShowcase + existing evidence structure

**Code Savings:** ~80% - Most components already exist, just need data/config updates!

---

## 📊 IMPLEMENTATION ORDER (REVISED)

### **Week 1: Critical Foundation (Deliverables 1-3)**
1. Add "The Moat" Section (Deliverable 1) - **REUSE MOATShowcase**
2. Create `/evidence/csi-validation` Page (Deliverable 2) - **REUSE MetricsShowcase**
3. Simplify Navbar - Remove "AI Engines" (Deliverable 3) - **Just data update**

### **Week 2: Navigation Simplification (Deliverables 4-6)**
4. Simplify Navbar - Remove "Use Cases" (Deliverable 4) - **Just data update**
5. Update Navbar "Platform" to "Products" (Deliverable 5) - **Just data update**
6. Update Navbar "Evidence" Dropdown (Deliverable 6) - **Just data update**

### **Week 3: Content Refinement (Deliverables 7-9)**
7. Remove FeaturedMediaPreview (Deliverable 7) - **Just remove from page.tsx**
8. Update TrustedBy Section (Deliverable 8) - **REUSE TrustedBy, add badge**
9. Add Final CTA Section (Deliverable 9) - **REUSE CTASection, just props**

### **Week 4: Final Cleanup (Deliverable 10)**
10. Homepage Content Audit & Cleanup (Deliverable 10) - **Remove commented code**

---

## 🔥 CRITICAL RULES (Apply to ALL Deliverables)

1. **REUSE existing components** - Don't reinvent the wheel
2. **NEVER show multiple pathways on homepage**
3. **NEVER show multiple cancer types on homepage**
4. **NEVER claim "works for everything"**
5. **ALWAYS show specific patient scenario**
6. **ALWAYS show specific metric improvement**
7. **ALWAYS show validation status**
8. **ALWAYS verify against Keytruda Model Checklist**

---

## ✅ SUCCESS METRICS

### **Homepage:**
- [ ] Only 4-5 sections total
- [ ] All sections are CSI-focused
- [ ] ONE problem, ONE product, ONE claim, ONE use case
- [ ] Clear path to `/products/oncology` and `/evidence/csi-validation`
- [ ] **80%+ code reuse** (using existing components)

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

## 💡 KEY INSIGHT

**We have 80% of what we need already built!**

- ✅ MOATShowcase exists - just need CSI data
- ✅ CTASection exists - just need props
- ✅ MetricsShowcase exists - just need TOPACIO metrics
- ✅ ComparisonSection exists - just need comparison data
- ✅ TrustedBy exists - just need CSI badge

**Don't reinvent - REUSE!**

---

**Remember:** Keytruda won with focus, not breadth. Opdivo lost by trying to capture everything.

**Last Updated:** 2025-01-29  
**Status:** ✅ **EXECUTION PLAN REVISED - REUSE FOCUSED**

---

## 🚀 START HERE

**See:** `START_HERE.md` for clear starting point and Week 1 deliverables breakdown.

**Quick Answer:**
- **Starting Page:** Homepage (`src/app/page.tsx`)
- **First Deliverable:** Add "The Moat" Section (Deliverable 1)
- **Deliverables Clear?** YES - Each has file path, step-by-step instructions, data structure, and acceptance criteria
