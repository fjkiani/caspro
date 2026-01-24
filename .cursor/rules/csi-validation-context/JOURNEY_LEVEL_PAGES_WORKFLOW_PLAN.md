# Journey Level Pages Workflow Plan

**Date:** 2025-01-29  
**Status:** 🚨 CRITICAL - Execute immediately  
**Purpose:** Align journey level detail pages with CSI-focused strategy and create clear workflow

---

## 🎯 CURRENT WORKFLOW

### **User Journey:**
```
Homepage
  └─> "One Score. Complete Care Journey" section
      └─> 5 Journey Level Cards (clickable)
          ├─> Level 1: The Score → /products/oncology (CSI page)
          ├─> Level 2: Therapies & Trials → /products/oncology/match-patients-to-therapies
          ├─> Level 3: Resistance Prediction → /products/oncology/predict-resistance
          ├─> Level 4: Safety & Dosing → /products/oncology/prevent-toxicity
          └─> Level 5: Complete Care Plan → /products/oncology
```

### **Current Page Structure:**

#### **1. Homepage (`/`)**
- Shows "One Score. Complete Care Journey" section
- Displays 5 journey level cards with:
  - Icon, subtitle (metric), title, description
  - Data requirement, unlocks list
  - Validation status
  - "View Details →" link routing to detail pages

#### **2. CSI Main Page (`/products/oncology`)**
- **Purpose:** Showcase CSI as the ONE product
- **Content:** Hero (CSI-focused), Problem (chemosensitivity uncertainty), Score visualization, Solution (CSI), Journey levels, Monitoring dashboard, Validation
- **Status:** ✅ **UPDATED** - Now CSI-focused

#### **3. Match Patients to Therapies (`/products/oncology/match-patients-to-therapies`)**
- **Purpose:** Level 2 - Show drug recommendations and trial matching
- **Current Structure:**
  - Uses `TabbedCapabilityPage` component
  - Shows Therapy Fit card (active) + 4 related capability cards
  - Hero: "Match Patients to Therapies" / "Mechanism-Based Drug Ranking"
  - Description: "S/P/E fusion (Sequence/Pathway/Evidence) for drug ranking"
  - **Problem:** ❌ Shows S/P/E framework as product, not CSI
- **Status:** ⚠️ **NEEDS UPDATE** - Conflicts with CSI strategy

#### **4. Predict Resistance (`/products/oncology/predict-resistance`)**
- **Purpose:** Level 3 - Show resistance prediction capabilities
- **Status:** ⚠️ **NEEDS AUDIT** - Not yet reviewed

#### **5. Prevent Toxicity (`/products/oncology/prevent-toxicity`)**
- **Purpose:** Level 4 - Show PGx safety and dosing
- **Status:** ⚠️ **NEEDS AUDIT** - Not yet reviewed

---

## 🔍 MATCH-PATIENTS-TO-THERAPIES PAGE AUDIT

### **Current State:**

#### **Hero Section:**
```typescript
{
  title: "Match Patients to Therapies",
  subtitle: "Mechanism-Based Drug Ranking",
  description: "S/P/E fusion (Sequence/Pathway/Evidence) for drug ranking."
}
```

**Problems:**
- ❌ Generic "Mechanism-Based" (could be any pathway)
- ❌ S/P/E framework presented as the product
- ❌ No mention of CSI
- ❌ No DDR-specific focus
- ❌ No TOPACIO validation mention

#### **Capability Cards:**
- Shows 5 cards equally:
  1. **Therapy Fit** (active) - "Personalized drug ranking with 70-85% confidence"
  2. **Prevent Toxicity** - "100% PGx Coverage"
  3. **Predict Resistance** - "3-6 Weeks Early Detection"
  4. **Resolve Genetic Uncertainty** - "Zero-Shot Variant Interpretation"
  5. **Match Patients to Clinical Trials** - "96.6% Match Accuracy"

**Problems:**
- ❌ 5 capabilities shown equally (not focused)
- ❌ No CSI mention
- ❌ Generic confidence metrics (70-85%)
- ❌ No TOPACIO validation

#### **Technical Details:**
- Shows S/P/E framework as primary product
- Generic drug ranking methodology
- No CSI architecture (D-P-M-T-S)
- No DDR-specific examples

---

## ✅ REQUIRED STATE (CSI-FOCUSED)

### **Hero Section:**
```typescript
{
  title: "Therapies & Trials: Level 2 of CSI Journey",
  subtitle: "Drug Recommendations Powered by CSI",
  description: "Once you have CSI score, unlock drug recommendations and clinical trial matching. S/P/E framework (validated AUROC 0.70) ranks therapies by mechanism fit for DDR-targeted treatments."
}
```

**Key Changes:**
- ✅ Position as "Level 2" of CSI journey
- ✅ Lead with CSI (not S/P/E)
- ✅ Mention validation (AUROC 0.70)
- ✅ Focus on DDR-targeted therapy

### **Capability Cards:**
**Primary Card (CSI-Based Drug Ranking):**
```typescript
{
  title: "CSI-Powered Drug Recommendations",
  subtitle: "S/P/E Framework (Validated)",
  description: "Rank drugs by mechanism fit for DDR-targeted therapy. S/P/E framework (AUROC 0.70, n=149) computes M (Mechanism Fit) component of CSI.",
  metric: "AUROC 0.70",
  time: "45 seconds",
  validation: "Retrospective-tested (n=149)"
}
```

**Related Capabilities (Secondary):**
- Move to "Related Capabilities" section
- Show as supporting tools, not primary product
- Link to their own detail pages

### **Technical Details:**
**Lead with CSI Architecture:**
- Show how this page fits into CSI (D-P-M-T-S framework)
- Position S/P/E as methodology for M (Mechanism Fit) component
- Show DDR-specific examples (BRCA1/2 → PARPi, HRD+ → Platinum)
- Include TOPACIO validation context

---

## 📋 IMPLEMENTATION PLAN

### **Phase 1: Update Match-Patients-to-Therapies Page (Priority: P0)**

#### **1.1 Update Hero Content**
**File:** `src/data/navigation/product-capabilities.ts`
```typescript
'match-patients-to-therapies': {
  slug: 'match-patients-to-therapies',
  title: 'Therapies & Trials: Level 2 of CSI Journey',
  subtitle: 'Drug Recommendations Powered by CSI',
  description: 'Once you have CSI score, unlock drug recommendations and clinical trial matching. S/P/E framework (validated AUROC 0.70) ranks therapies by mechanism fit for DDR-targeted treatments.',
  icon: 'Target',
  color: 'from-green-500 to-emerald-600',
  badge: 'CSI Level 2',
  metrics: 'AUROC 0.70 (Validated)',
  time: '45 seconds',
  businessImpact: 'Rank drugs by mechanism fit for DDR-targeted therapy',
  apis: ['predict_variant_impact', 'predict_gene_essentiality']
}
```

#### **1.2 Update TabbedCapabilityPage Component**
**File:** `src/components/products/shared/TabbedCapabilityPage.tsx`

**Changes:**
- Add CSI context section above capability cards
- Show "This is Level 2 of the CSI Journey" banner
- Update Therapy Fit card to mention CSI
- Position S/P/E as methodology for M component
- Add DDR-specific examples

#### **1.3 Add CSI Context Section**
**New Component:** `src/components/products/oncology/CSIJourneyContext.tsx`
```typescript
// Shows:
// - "This is Level 2 of CSI Journey"
// - How it fits into CSI (D-P-M-T-S)
// - What data unlocks this level (Genomic test results)
// - What you get (Top 5 drugs, trials, S/P/E scoring)
// - Validation status (AUROC 0.70, n=149)
```

#### **1.4 Update Related Capabilities**
- Move 4 related cards to secondary section
- Add "Related Capabilities" header
- Show as supporting tools, not primary product
- Link to their detail pages

---

### **Phase 2: Audit Predict-Resistance Page (Priority: P1)**

#### **2.1 Audit Current State**
- Review page structure
- Check if it aligns with CSI strategy
- Identify conflicts with Level 3 journey description

#### **2.2 Update to CSI-Focused**
- Lead with CSI context (Level 3)
- Show resistance prediction as part of CSI updates
- Include post-treatment pathway profiling
- Add validation metrics (AUROC 0.714-0.750, n=11)

---

### **Phase 3: Audit Prevent-Toxicity Page (Priority: P1)**

#### **3.1 Audit Current State**
- Review page structure
- Check if it aligns with CSI strategy
- Identify conflicts with Level 4 journey description

#### **3.2 Update to CSI-Focused**
- Lead with CSI context (Level 4)
- Show PGx as Safety (S) component of CSI
- Include PREPARE trial validation (83.1% toxicity reduction)
- Position as supporting capability for CSI

---

### **Phase 4: Create Journey Navigation (Priority: P2)**

#### **4.1 Add Journey Breadcrumb**
**Component:** `src/components/products/shared/JourneyBreadcrumb.tsx`
```typescript
// Shows:
// Homepage → CSI (Level 1) → Current Level (e.g., Level 2)
// With clickable navigation between levels
```

#### **4.2 Add "Back to CSI" Link**
- Add prominent "Back to CSI Overview" link
- Link to `/products/oncology`
- Show journey progress (e.g., "Level 2 of 5")

---

## 🎯 WORKFLOW CLARITY

### **User Journey Flow:**

```
1. Homepage
   └─> Sees "One Score. Complete Care Journey"
       └─> Clicks "Level 2: Therapies & Trials" card
           └─> Routes to /products/oncology/match-patients-to-therapies

2. Match-Patients-to-Therapies Page
   └─> Sees "Level 2 of CSI Journey" banner
   └─> Sees CSI context (how this fits into CSI)
   └─> Sees primary capability: CSI-Powered Drug Recommendations
   └─> Sees related capabilities (secondary)
   └─> Can navigate:
       ├─> Back to CSI Overview (/products/oncology)
       ├─> Level 1: The Score (/products/oncology)
       ├─> Level 3: Resistance Prediction (/products/oncology/predict-resistance)
       ├─> Level 4: Safety & Dosing (/products/oncology/prevent-toxicity)
       └─> Level 5: Complete Care Plan (/products/oncology)
```

### **Key Principles:**

1. **CSI is the Product** - All journey level pages should lead with CSI context
2. **Journey Progression** - Each page should show its position in the 5-level journey
3. **Validation First** - Show validated metrics prominently (TOPACIO, S/P/E, PREPARE)
4. **DDR Focus** - All examples should focus on DDR-targeted therapy (platinum/PARPi/DDR)
5. **Clear Navigation** - Easy navigation between journey levels

---

## 📊 VALIDATION STATUS BY PAGE

### **Level 1: The Score (`/products/oncology`)**
- ✅ **CSI validated** (TOPACIO AUROC 0.714, p=0.023)
- ✅ **Status:** Updated to CSI-focused

### **Level 2: Therapies & Trials (`/products/oncology/match-patients-to-therapies`)**
- ✅ **S/P/E validated** (AUROC 0.70, n=149)
- ⚠️ **Status:** Needs update to CSI-focused

### **Level 3: Resistance Prediction (`/products/oncology/predict-resistance`)**
- ✅ **Post-treatment profiling validated** (AUROC 0.714-0.750, n=11)
- ⚠️ **Status:** Needs audit

### **Level 4: Safety & Dosing (`/products/oncology/prevent-toxicity`)**
- ✅ **PGx validated** (PREPARE trial, 83.1% toxicity reduction)
- ⚠️ **Status:** Needs audit

### **Level 5: Complete Care Plan (`/products/oncology`)**
- ⚠️ **Platform architecture** (proof-of-concept)
- ✅ **Status:** Updated to CSI-focused

---

## ✅ SUCCESS CRITERIA

### **Match-Patients-to-Therapies Page Should:**
1. ✅ Lead with CSI context (Level 2 of journey)
2. ✅ Show how S/P/E fits into CSI (M component methodology)
3. ✅ Focus on DDR-targeted therapy examples
4. ✅ Display validation metrics (AUROC 0.70, n=149)
5. ✅ Position related capabilities as secondary
6. ✅ Provide clear navigation to other journey levels

### **All Journey Level Pages Should:**
1. ✅ Show journey position (Level X of 5)
2. ✅ Lead with CSI context
3. ✅ Show validation status
4. ✅ Focus on DDR-targeted therapy
5. ✅ Provide navigation between levels

---

## 🔗 RELATED DOCUMENTS

- `.cursor/rules/FOCUSED_HOMEPAGE_STRATEGY.md` - CSI-focused homepage strategy
- `.cursor/rules/MATCH_PATIENTS_TO_THERAPIES_AUDIT.md` - Detailed audit of match-patients-to-therapies page
- `.cursor/rules/csi-validation-context/ONCOLOGY_PAGE_CSI_REFOCUS_PLAN.md` - Oncology page refocus plan
- `src/data/homepage/csi-journey-data.ts` - Journey level data structure

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **PLAN COMPLETE** - Ready for execution
