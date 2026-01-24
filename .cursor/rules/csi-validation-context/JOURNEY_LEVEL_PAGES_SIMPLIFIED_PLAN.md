# Journey Level Pages - Simplified, Focused Approach

**Date:** 2025-01-29  
**Status:** 🎯 **SIMPLIFIED PLAN**  
**Problem:** Too many tabs (6 tabs) - overwhelming, not focused  
**Solution:** Use main oncology page structure, focus on ONE core message per level

---

## 🚨 PROBLEM WITH CURRENT APPROACH

### **Current Tabbed Layout:**
```
1. The Question
2. Journey
3. The Solution
4. How It Works
5. Outcomes
6. Monitoring
7. Integration
```

**Issues:**
- ❌ **7 tabs** - Too many, overwhelming
- ❌ **No clear focus** - Everything is equal weight
- ❌ **User doesn't know where to start** - Which tab matters?
- ❌ **Not aligned with main oncology page** - Different structure

---

## ✅ SIMPLIFIED APPROACH: REUSE MAIN ONCOLOGY PAGE STRUCTURE

### **Core Principle:**
**Each journey level page should look like the main oncology page, but focused on that specific level.**

### **Structure (Same as Main Oncology Page):**
```
1. Hero Section
   - Level-specific question
   - Level-specific badge
   - CTAs: "Try This Level", "View Full Journey"

2. Problem Section
   - Level-specific problem
   - 3 cards (same pattern as main page)

3. Solution Section
   - Level-specific solution
   - 3 cards (same pattern as main page)

4. How It Works (Compact)
   - 4-step visual (not tabs, just visual steps)
   - Same card pattern as main page

5. Progressive Monitoring Dashboard
   - Shows build-up for this level
   - Visual journey (this is the key!)

6. Validation Metrics
   - Level-specific validation only
   - Compact, focused

7. Next Level CTA
   - "Ready for Level X? → [Next Level]"
   - Guides progression
```

**NO TABS** - Just scrolling sections, same as main oncology page.

---

## 🎯 FOCUS: ONE CORE MESSAGE PER LEVEL

### **Level 2: "Therapies & Trials"**
**Core Message:** "Once you have CSI, unlock drug recommendations with S/P/E framework"

**What to Show:**
- ✅ Hero: "What therapy should we give next?"
- ✅ Problem: Generic drug ranking fails for DDR-targeted therapy
- ✅ Solution: CSI + S/P/E framework (validated AUROC 0.70)
- ✅ How It Works: 4-step visual (CSI → Add NGS → S/P/E → Rank drugs)
- ✅ Progressive Dashboard: Level 2 unlocked (CSI + ctDNA + Trials)
- ✅ Validation: S/P/E Pipeline (AUROC 0.70, n=149)
- ✅ Next: "Ready for Level 3? → Predict Resistance"

**What NOT to Show:**
- ❌ Complex Holistic Score details (D-P-M-T-S)
- ❌ Biomarker gating details (L0/L1/L2)
- ❌ Static → Evolution journey (save for Level 3)
- ❌ All validation contexts (just show Level 2 validation)

---

### **Level 3: "Resistance Prediction"**
**Core Message:** "Predict when chemo might stop working - capture tumor evolution"

**What to Show:**
- ✅ Hero: "When will chemo stop working?"
- ✅ Problem: No early warning for resistance
- ✅ Solution: Post-treatment pathway profiling (validated AUROC 0.714-0.750)
- ✅ How It Works: 4-step visual (Treatment → Post-treatment biopsy → Pathway profiling → Resistance prediction)
- ✅ Progressive Dashboard: Level 3 unlocked (CSI + ctDNA + Trials + Resistance alerts)
- ✅ Validation: Post-treatment pathway profiling (AUROC 0.714-0.750, n=11)
- ✅ Next: "Ready for Level 4? → Safety & Dosing"

**What NOT to Show:**
- ❌ Baseline S/P/E details (that's Level 2)
- ❌ Holistic Score details (not the focus)
- ❌ Biomarker gating (not the focus)
- ❌ All validation contexts (just show Level 3 validation)

---

### **Level 4: "Safety & Dosing"**
**Core Message:** "Prevent dangerous side effects before they happen"

**What to Show:**
- ✅ Hero: "How do we prevent toxicity?"
- ✅ Problem: Toxicity discovered too late
- ✅ Solution: PGx-guided therapy selection (83.1% relative risk reduction)
- ✅ How It Works: 4-step visual (Genetic screening → PGx analysis → Dose adjustment → Safety check)
- ✅ Progressive Dashboard: Level 4 unlocked (CSI + ctDNA + Trials + Resistance + Toxicity alerts)
- ✅ Validation: PREPARE trial (83.1% relative risk reduction)
- ✅ Next: "Ready for Level 5? → Complete Care Plan"

**What NOT to Show:**
- ❌ Drug ranking details (that's Level 2)
- ❌ Resistance prediction details (that's Level 3)
- ❌ All validation contexts (just show Level 4 validation)

---

## 🏗️ COMPONENT STRUCTURE

### **Create: `OncologyJourneyLevelPage.tsx`**

```typescript
interface OncologyJourneyLevelPageProps {
  level: 2 | 3 | 4;
  heroContent: ProductHeroContent;
  problemContent: ProblemSolutionContent;
  solutionContent: ProblemSolutionContent;
  howItWorksSteps: HowItWorksStep[];
  validationMetrics: Metric[];
  nextLevel?: JourneyLevel;
}

export default function OncologyJourneyLevelPage({
  level,
  heroContent,
  problemContent,
  solutionContent,
  howItWorksSteps,
  validationMetrics,
  nextLevel
}: OncologyJourneyLevelPageProps) {
  return (
    <OncologyAgentProvider patientId="AK">
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* 1. Hero Section */}
          <ProductHeroSection content={heroContent} />

          {/* 2. Problem Section */}
          <ProblemSolutionSection content={problemContent} />

          {/* 3. Solution Section */}
          <ProblemSolutionSection content={solutionContent} />

          {/* 4. How It Works - Compact Visual Steps */}
          <section id="how-it-works" className="mb-16">
            <SectionHeader
              title={`How Level ${level} Works`}
              description="Four steps to unlock this capability"
            />
            <div className="grid md:grid-cols-2 gap-6">
              {howItWorksSteps.map((step, index) => (
                <StepCard key={step.number} step={step} index={index} />
              ))}
            </div>
          </section>

          {/* 5. Progressive Monitoring Dashboard */}
          <section id="monitoring-dashboard" className="mb-16">
            <SectionHeader
              title="CSI in Action: Continuous Monitoring"
              description="See how CSI updates automatically as tumor evolves. Track chemosensitivity across treatment lines with real-time alerts when CSI drops below threshold."
            />
            <ProgressiveMonitoringDashboard level={level} patientId="AK" />
          </section>

          {/* 6. Validation Metrics */}
          <section id="validation" className="mb-16">
            <MetricsShowcase
              badge={{
                text: `Level ${level} Validation`,
                icon: Award,
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800'
              }}
              title={`Level ${level} Performance Metrics`}
              subtitle="Validated performance for this capability"
              metrics={validationMetrics}
            />
          </section>

          {/* 7. Next Level CTA */}
          {nextLevel && (
            <section id="next-level" className="mb-16">
              <NextLevelCTA currentLevel={level} nextLevel={nextLevel} />
            </section>
          )}
        </div>
      </main>
    </OncologyAgentProvider>
  );
}
```

---

## 📋 IMPLEMENTATION STEPS

### **Step 1: Remove TabbedEducationalPage for Journey Levels**
- Don't use tabs for journey level pages
- Use the same structure as main oncology page

### **Step 2: Create OncologyJourneyLevelPage Component**
- Reuse all components from main oncology page
- Same structure, different content
- Focus on ONE core message per level

### **Step 3: Create Level-Specific Content Files**
- `oncology-level-2-content.ts` - Focused on drug recommendations
- `oncology-level-3-content.ts` - Focused on resistance prediction
- `oncology-level-4-content.ts` - Focused on safety & dosing

### **Step 4: Simplify How It Works Section**
- 4-step visual cards (not tabs)
- Same card pattern as main page
- Compact, scannable

### **Step 5: Add Next Level CTA**
- Guides progression
- Clear call-to-action

---

## ✅ SUCCESS CRITERIA

### **Each Journey Level Page Should:**
1. ✅ Look like main oncology page (same structure)
2. ✅ Focus on ONE core message (not 7 tabs)
3. ✅ Show progressive dashboard (visual journey)
4. ✅ Show level-specific validation only
5. ✅ Guide to next level (progression)
6. ✅ No tabs - just scrolling sections

### **User Experience:**
- **Level 2:** "I see drug recommendations - this is what I unlock"
- **Level 3:** "I see resistance prediction - this is what I unlock"
- **Level 4:** "I see toxicity prevention - this is what I unlock"
- **Level 5:** "I see full dashboard - this is what I was working towards"

---

## 🎯 KEY PRINCIPLES

### **1. Focus on ONE Core Message**
- Each level has ONE main capability
- Don't show everything - just what matters for this level

### **2. Reuse Main Oncology Page Structure**
- Same components
- Same layout
- Same visual language

### **3. Progressive Disclosure**
- Show what's unlocked at this level
- Show what's locked (next level)
- Visual journey build-up

### **4. No Tabs**
- Just scrolling sections
- Same as main oncology page
- Simpler, more focused

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **SIMPLIFIED PLAN** - Focus on ONE core message, reuse main page structure, no tabs
