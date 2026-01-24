# 🚀 START HERE - Homepage & Navbar Execution

**Date:** 2025-01-29  
**Status:** 🎯 READY TO START  
**Starting Point:** Homepage (`src/app/page.tsx`)

---

## 📍 WHERE WE'RE STARTING

### **Primary Page: Homepage**
**File:** `src/app/page.tsx`  
**Current State:**
- ✅ HeroSection (CSI-focused - already good)
- ✅ CSISisterQuestion (ONE scenario - already good)
- ⚠️ TrustedBy (needs CSI badge)
- ❌ FeaturedMediaPreview (needs removal or refocus)
- ❌ MISSING: CSIMoatSection (needs to be added)

**Target State:**
1. HeroSection ✅
2. CSISisterQuestion ✅
3. **CSIMoatSection** ❌ (ADD THIS - Deliverable 1)
4. TrustedBy ⚠️ (UPDATE - Deliverable 8)
5. **CSIFinalCTA** ❌ (ADD THIS - Deliverable 9)

---

## 🎯 WEEK 1 DELIVERABLES (START HERE)

### **DELIVERABLE 1: Add "The Moat" Section to Homepage** 🔥
**Priority:** CRITICAL  
**File to Create:** `src/components/landing/CSIMoatSection.tsx`  
**File to Update:** `src/app/page.tsx` (add import and component)

**What to Do:**
1. Copy `src/components/landing/MOATShowcase.tsx` → `src/components/landing/CSIMoatSection.tsx`
2. Replace MOAT_CAPABILITIES array with CSI moat data (see data structure below)
3. Add comparison table using `ComparisonSection` component
4. Import and add to `src/app/page.tsx` after `CSISisterQuestion`

**Data Structure:**
```typescript
const CSI_MOAT_DATA = {
  headline: "Multimodal, Longitudinal Integration (What Others Don't Have)",
  description: "No single competitor integrates DDR biology + early kinetics + full treatment-interval history into unified predictions",
  components: [
    {
      name: "DDR_bin engine",
      description: "Structural DNA repair biology (BRCA/HRD/DDR defects, HRDsig, lncRNA HRD)"
    },
    {
      name: "Timing engine", 
      description: "PFI/PTPI/TFI, per-regimen PFS/OS (realized chemosensitivity history)"
    },
    {
      name: "Kinetic engine",
      description: "KELIM/CA-125, PSA-KELIM (early on-treatment chemosensitivity signal)"
    }
  ],
  comparison: {
    competitors: {
      title: "Foundation Medicine/Guardant",
      features: ["Static HRD snapshots", "One-time test", "No evolution tracking"]
    },
    crispro: {
      title: "CrisPRO",
      features: ["Continuous chemosensitivity re-estimation", "Across treatment lines", "Multimodal integration"]
    }
  },
  value: "Continuously re-estimates chemosensitivity for next DDR-related treatment line, not a static one-time test"
}
```

**Acceptance Criteria:**
- [ ] Component created at `src/components/landing/CSIMoatSection.tsx`
- [ ] Added to homepage after `CSISisterQuestion`
- [ ] Shows ONE advantage (multimodal, longitudinal)
- [ ] Clear comparison with Foundation Medicine/Guardant
- [ ] No pathway lists, no cancer type lists
- [ ] Reuses MOATShowcase structure

---

### **DELIVERABLE 2: Create `/evidence/csi-validation` Page** 🔥
**Priority:** CRITICAL  
**File to Create:** `src/app/evidence/csi-validation/page.tsx`  
**Reusable Component:** `MetricsShowcase` from `src/components/products/shared/MetricsShowcase.tsx`

**What to Do:**
1. Create directory: `src/app/evidence/csi-validation/`
2. Create `page.tsx` file
3. Use `MetricsShowcase` component with TOPACIO data
4. Add mechanism fit validation section
5. Add ORR by quartile visualization

**Data Structure:**
```typescript
const topacioMetrics = [
  {
    icon: Target,
    value: '0.714',
    label: 'AUROC',
    description: 'TOPACIO trial validation (n=55)',
    color: 'blue'
  },
  {
    icon: CheckCircle,
    value: '0.023',
    label: 'p-value',
    description: 'Statistical significance',
    color: 'green'
  },
  {
    icon: TrendingUp,
    value: '42.9%',
    label: 'Q4 ORR',
    description: 'Highest quartile response rate',
    color: 'purple'
  },
  {
    icon: TrendingDown,
    value: '7.1%',
    label: 'Q1 ORR',
    description: 'Lowest quartile response rate',
    color: 'red'
  }
]
```

**Acceptance Criteria:**
- [ ] Page created at `src/app/evidence/csi-validation/page.tsx`
- [ ] Uses MetricsShowcase component
- [ ] Shows ONE validation (TOPACIO) prominently
- [ ] Clear metrics (AUROC, p-value, ORR)
- [ ] Links back to homepage
- [ ] No other validations competing for attention

---

### **DELIVERABLE 3: Simplify Navbar - Remove "AI Engines"** 🔥
**Priority:** CRITICAL  
**File to Update:** `src/components/ui/Navbar.tsx`  
**Line to Find:** Look for `NAV_LINKS` array (around line 78)

**What to Do:**
1. Open `src/components/ui/Navbar.tsx`
2. Find `NAV_LINKS` array
3. Remove the object with `label: 'AI Engines'`
4. That's it! No component changes needed.

**Before:**
```typescript
{
  href: '/ai-engines',
  label: 'AI Engines',
  icon: <Zap className="inline-block h-4 w-4" />,
  subLinks: [
    { href: '/products/oracle', label: 'Oracle (Discriminative AI)' },
    { href: '/products/forge', label: 'Forge (Generative AI)' },
  ],
}
```

**After:**
```typescript
// REMOVED - AI Engines dropdown
```

**Acceptance Criteria:**
- [ ] "AI Engines" removed from NAV_LINKS array
- [ ] Navbar still works (no errors)
- [ ] Navbar has max 5-6 items remaining

---

## ✅ DELIVERABLES CLARITY CHECK

### **Are Deliverables Clear? YES ✅**

Each deliverable has:
- ✅ **Clear Priority** (🔥 CRITICAL, HIGH, MEDIUM)
- ✅ **Exact File Path** (where to create/update)
- ✅ **What to Do** (step-by-step instructions)
- ✅ **Data Structure** (exact code examples)
- ✅ **Acceptance Criteria** (checklist to verify completion)
- ✅ **Reusable Components** (what to reuse, not reinvent)

### **Starting Order:**
1. **Deliverable 1** - Add Moat Section (homepage)
2. **Deliverable 2** - Create Validation Page (new page)
3. **Deliverable 3** - Remove AI Engines (navbar data)

---

## 🎯 QUICK START CHECKLIST

**Before You Start:**
- [ ] Read `FOCUSED_HOMEPAGE_STRATEGY.md` (understand the "why")
- [ ] Read `HOMEPAGE_NAVBAR_EXECUTION_PLAN.md` (understand the "what")
- [ ] Review existing components: MOATShowcase, CTASection, MetricsShowcase

**Start With:**
- [ ] **Deliverable 1** - Create CSIMoatSection.tsx (reuse MOATShowcase)
- [ ] Add to homepage: `src/app/page.tsx`
- [ ] Test: Does it show ONE advantage? Clear comparison?

**Then:**
- [ ] **Deliverable 2** - Create `/evidence/csi-validation` page
- [ ] **Deliverable 3** - Remove "AI Engines" from navbar

---

## 📋 KEYTRUDA MODEL CHECKLIST (Verify Each Deliverable)

Before marking any deliverable complete, verify:

- [ ] **ONE problem?** (How chemosensitive is the tumor right now?)
- [ ] **ONE product?** (CSI, not multiple products)
- [ ] **ONE claim?** (CSI predicts 6-month PFS probability)
- [ ] **ONE use case?** (Next-line selection for DDR-targeted therapy)
- [ ] **ONE metric?** (AUROC 0.714 TOPACIO)
- [ ] **ONE advantage?** (Multimodal, longitudinal integration)
- [ ] **Specific validation?** (TOPACIO trial, not "works for everything")

---

## 🚨 CRITICAL RULES (Don't Forget!)

1. **REUSE existing components** - Don't reinvent
2. **NEVER show multiple pathways** on homepage
3. **NEVER show multiple cancer types** on homepage
4. **NEVER claim "works for everything"**
5. **ALWAYS show specific validation** (TOPACIO)
6. **ALWAYS verify against Keytruda Model Checklist**

---

**Ready to start? Begin with Deliverable 1!**

**Last Updated:** 2025-01-29  
**Status:** ✅ **READY TO START - DELIVERABLES CLEAR**
