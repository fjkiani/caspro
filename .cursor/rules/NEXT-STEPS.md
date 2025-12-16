# 🚀 NEXT STEPS - Homepage Complete, Product Pages Next

**Last Updated:** 2024-12-19  
**Status:** Homepage transformation complete ✅

---

## ✅ COMPLETED THIS SESSION

### Homepage Transformation (Complete)
1. ✅ **Hero Section Enhanced**
   - Rotating words: "Precision Oncology" → "Drug Discovery" → "Curing Cancer" → "Therapeutic Engineering"
   - Rotating captivating sentences (4 powerful value propositions)
   - Consolidated to 3 buttons: "I am treating patients", "I am designing a drug", "I am a patient"
   - Created reusable `RotatingText` component

2. ✅ **EngineRoom Component**
   - Converted to tabbed interface
   - Clicking tabs shows corresponding engine card (Oracle, Forge, Boltz, Command Center)
   - Smooth animations and transitions

3. ✅ **Homepage Streamlined**
   - Reduced from 12 to 9 focused sections
   - Three Products showcase (Oncology, R&D, Research)
   - PlatformCapabilitiesShowcase with interactive tabs
   - Clean, user-focused layout

---

## 🎯 NEXT PRIORITY: PRODUCT PAGES OVERHAUL

### Sprint 1-2: Product Pages (Weeks 1-4)

**Goal:** Transform product pages from API dumps to compelling narratives with interactive demos

#### Priority 1: Oracle Page Enhancement ⭐ CRITICAL
**File:** `src/app/products/oracle/page.tsx`

**What to Build:**
1. Hero section with rotating words (reuse RotatingText component)
2. Problem/Solution narrative (VUS crisis → Oracle solution)
3. Interactive VUS demo (`VUSResolutionDemo` from src2)
4. SAE explainability section (`DynamicOracleExplain` from src2)
5. Performance metrics showcase (95.7% ClinVar AUROC, etc.)
6. Case study (BRCA1/2 VUS resolution)
7. Clear CTA

**Components to Import from src2:**
- `VUSResolutionDemo.tsx` (~440 lines) - Interactive VUS demo
- `DynamicOracleExplain.tsx` - Oracle thinking process visualization
- `OracleScore.tsx` - VUS → Verdict comparison
- `OracleProduct.tsx` - Complete Oracle page structure (~280 lines)

**Estimated Time:** 8-12 hours

---

#### Priority 2: Forge Page Enhancement
**File:** `src/app/products/forge/page.tsx`

**What to Build:**
1. Hero: "Engineer Precision Therapeutics from First Principles"
2. Problem: Traditional lead discovery failures
3. Solution: Generative AI with guided design
4. Interactive demo: Guide RNA designer or protein generator
5. Case study: TLS seed therapeutic design
6. Performance metrics (70% Pfam-hit rate, AlphaFold 3 validation)
7. Clear CTA

**Components to Import from src2:**
- `ForgeCapabilityGrid.tsx` - Forge-specific capabilities
- Design challenge components
- Generative demo components

**Estimated Time:** 6-10 hours

---

#### Priority 3: Boltz Page Enhancement
**File:** `src/app/products/boltz/page.tsx`

**What to Build:**
1. Hero: "3D Structural Validation & Binding Affinity Prediction"
2. Problem: In-silico validation gap
3. Solution: AlphaFold 3 integration + structural confidence scoring
4. Interactive 3D protein viewer
5. Case study: Protein complex validation
6. Performance metrics (83% high-confidence threshold)
7. Clear CTA

**Components to Import from src2:**
- `BoltzConfidence.tsx` - Structural confidence visualization
- 3D viewer components
- Binding affinity prediction components

**Estimated Time:** 6-10 hours

---

#### Priority 4: Command Center Page Enhancement
**File:** `src/app/products/command-center/page.tsx`

**What to Build:**
1. Hero: "Orchestration, Provenance & Evidence Aggregation"
2. Problem: Fragmented workflow management
3. Solution: Unified pipeline orchestration
4. Interactive workflow visualization
5. Case study: End-to-end therapeutic development pipeline
6. Performance metrics (provenance tracking, audit trails)
7. Clear CTA

**Components to Import from src2:**
- Command Center workflow components
- Pipeline visualization components
- Provenance tracking components

**Estimated Time:** 6-10 hours

---

## 📋 AFTER PRODUCT PAGES: SOLUTIONS HUBS

### Sprint 3-4: Solutions Hubs (Weeks 5-8)

**Priority 1: Clinical Decision Support Hub** ⭐ FLAGSHIP
- `/solutions/clinical-decision-support/page.tsx`
- Unified Care Plan showcase
- Link to co-pilots (Will It Work For Me, Clinical Trials, etc.)

**Priority 2: Research Acceleration Hub**
- `/solutions/research-acceleration/page.tsx`
- VUS Explorer tool
- Hypothesis testing capabilities

**Priority 3: Therapeutic Design Hub**
- `/solutions/therapeutic-design/page.tsx`
- Kill Chain integration
- CRISPR guide design

---

## 🎯 IMMEDIATE NEXT ACTION

**Start with Oracle Page Enhancement** - This is the most critical product page and has the most complete components ready in src2.

**Steps:**
1. Read existing Oracle page: `src/app/products/oracle/page.tsx`
2. Review src2 Oracle components: `src/src2/components/site/OracleProduct.tsx`
3. Import and adapt VUSResolutionDemo
4. Import and adapt DynamicOracleExplain
5. Build compelling narrative structure
6. Test and polish

**Estimated Time:** 8-12 hours  
**Priority:** 🔴 CRITICAL

---

## 📝 FILES TO CREATE/MODIFY

### Create:
- None (reuse existing structure, import from src2)

### Modify:
- `src/app/products/oracle/page.tsx` - Complete overhaul
- `src/app/products/forge/page.tsx` - Complete overhaul  
- `src/app/products/boltz/page.tsx` - Add 3D viewer
- `src/app/products/command-center/page.tsx` - Add workflow viz

### Import from src2:
- `VUSResolutionDemo.tsx`
- `DynamicOracleExplain.tsx`
- `OracleProduct.tsx`
- `ForgeCapabilityGrid.tsx`
- `BoltzConfidence.tsx`
- Command Center workflow components

---

**Ready to proceed with Oracle page enhancement!** 🚀

