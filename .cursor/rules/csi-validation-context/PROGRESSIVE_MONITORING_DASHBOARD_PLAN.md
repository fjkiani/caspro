# Progressive Monitoring Dashboard - Visual Journey Build-Up

**Date:** 2025-01-29  
**Status:** 🎯 EXECUTION PLAN  
**Goal:** Show progressive build-up of monitoring dashboard as users unlock levels

---

## 🎯 CORE CONCEPT

### **Progressive Disclosure Pattern:**
Users see the monitoring dashboard **build up** as they progress through levels. Each level page shows:
- ✅ **What's unlocked so far** (active, colored)
- 🔒 **What's locked** (grayed out, "Unlock at Level X")
- 🎯 **What's next** (highlighted, "Unlock at Level X")

### **Educational + Visual Journey:**
- **Level 1:** Only CSI Score visible
- **Level 2:** CSI Score + Drug Recommendations visible
- **Level 3:** CSI Score + Drug Recommendations + Resistance Prediction visible
- **Level 4:** CSI Score + Drug Recommendations + Resistance Prediction + Toxicity Prevention visible
- **Level 5:** FULL dashboard (all metrics active)

---

## 📊 MONITORING DASHBOARD BREAKDOWN

### **Current Full Dashboard (Level 5 - All Unlocked):**

```
CSI Score (Level 1)
├─ Value: 72/100
├─ Trend: Decreased from 78
└─ Status: Warning (above threshold ≥70)

CA-125 (Level 1)
├─ Value: 900
├─ Trend: Plateau detected
└─ Status: Warning

ctDNA (Level 2)
├─ Value: KRAS G12D: 0.8% VAF
├─ Trend: New mutation detected
└─ Status: Alert (resistance mutation)

Imaging (Level 1)
├─ Value: No progression
├─ Trend: Last scan: 3 weeks ago
└─ Status: Normal

Active Trials (Level 2)
├─ Value: 3 matches
├─ Trend: New trial added
└─ Status: Active

Active Alerts & Insights (Level 3+)
├─ CSI Score Decreased (Level 1)
├─ CA-125 Plateau (Level 1)
├─ Resistance Mutation (Level 3)
└─ New Trial Match (Level 2)

Monitoring Timeline (Level 5)
├─ Day 1 → Month 1 → Month 3 → Month 6 → Month 9 → Month 12
└─ Shows progression across all levels
```

---

## 🎨 LEVEL-SPECIFIC DASHBOARD VIEWS

### **Level 1 Page: "The Score"**
**Unlocked:** CSI Score, CA-125, Imaging  
**Locked:** ctDNA, Active Trials, Alerts, Timeline

```typescript
const level1Metrics = {
  unlocked: [
    { id: 'csi', name: 'CSI Score', value: 72, status: 'warning' },
    { id: 'ca125', name: 'CA-125', value: 900, status: 'warning' },
    { id: 'imaging', name: 'Imaging', value: 'No progression', status: 'normal' }
  ],
  locked: [
    { id: 'ctdna', name: 'ctDNA', lockedAt: 'Level 2', reason: 'Requires genomic test results (NGS)' },
    { id: 'trials', name: 'Active Trials', lockedAt: 'Level 2', reason: 'Requires drug recommendations' },
    { id: 'alerts', name: 'Active Alerts', lockedAt: 'Level 3', reason: 'Requires resistance prediction' },
    { id: 'timeline', name: 'Monitoring Timeline', lockedAt: 'Level 5', reason: 'Requires complete care plan' }
  ]
};
```

**Visual:**
- ✅ CSI Score, CA-125, Imaging: Full color, active
- 🔒 ctDNA: Grayed out, "Unlock at Level 2: Add Genomic Test Results"
- 🔒 Active Trials: Grayed out, "Unlock at Level 2: Drug Recommendations"
- 🔒 Active Alerts: Grayed out, "Unlock at Level 3: Resistance Prediction"
- 🔒 Timeline: Grayed out, "Unlock at Level 5: Complete Care Plan"

---

### **Level 2 Page: "Therapies & Trials"**
**Unlocked:** CSI Score, CA-125, Imaging, ctDNA, Active Trials  
**Locked:** Active Alerts (Resistance), Timeline

```typescript
const level2Metrics = {
  unlocked: [
    { id: 'csi', name: 'CSI Score', value: 72, status: 'warning' },
    { id: 'ca125', name: 'CA-125', value: 900, status: 'warning' },
    { id: 'imaging', name: 'Imaging', value: 'No progression', status: 'normal' },
    { id: 'ctdna', name: 'ctDNA', value: 'KRAS G12D: 0.8% VAF', status: 'alert' }, // NOW UNLOCKED
    { id: 'trials', name: 'Active Trials', value: '3 matches', status: 'active' } // NOW UNLOCKED
  ],
  locked: [
    { id: 'alerts-resistance', name: 'Resistance Alerts', lockedAt: 'Level 3', reason: 'Requires resistance prediction' },
    { id: 'timeline', name: 'Monitoring Timeline', lockedAt: 'Level 5', reason: 'Requires complete care plan' }
  ]
};
```

**Visual:**
- ✅ CSI Score, CA-125, Imaging, ctDNA, Active Trials: Full color, active
- 🔒 Resistance Alerts: Grayed out, "Unlock at Level 3: Predict Resistance"
- 🔒 Timeline: Grayed out, "Unlock at Level 5: Complete Care Plan"

**Alerts Section:**
- ✅ Shows: "CSI Score Decreased", "CA-125 Plateau", "New Trial Match" (Level 1-2 alerts)
- 🔒 Hides: "Resistance Mutation" alert (Level 3)

---

### **Level 3 Page: "Resistance Prediction"**
**Unlocked:** CSI Score, CA-125, Imaging, ctDNA, Active Trials, Resistance Alerts  
**Locked:** Timeline

```typescript
const level3Metrics = {
  unlocked: [
    { id: 'csi', name: 'CSI Score', value: 72, status: 'warning' },
    { id: 'ca125', name: 'CA-125', value: 900, status: 'warning' },
    { id: 'imaging', name: 'Imaging', value: 'No progression', status: 'normal' },
    { id: 'ctdna', name: 'ctDNA', value: 'KRAS G12D: 0.8% VAF', status: 'alert' },
    { id: 'trials', name: 'Active Trials', value: '3 matches', status: 'active' },
    { id: 'alerts-resistance', name: 'Resistance Alerts', value: 'Active', status: 'alert' } // NOW UNLOCKED
  ],
  locked: [
    { id: 'timeline', name: 'Monitoring Timeline', lockedAt: 'Level 5', reason: 'Requires complete care plan' }
  ]
};
```

**Visual:**
- ✅ All metrics except Timeline: Full color, active
- 🔒 Timeline: Grayed out, "Unlock at Level 5: Complete Care Plan"

**Alerts Section:**
- ✅ Shows: ALL alerts including "Resistance Mutation: KRAS G12D" (Level 3)
- 🔒 Hides: Timeline progression

---

### **Level 4 Page: "Safety & Dosing"**
**Unlocked:** CSI Score, CA-125, Imaging, ctDNA, Active Trials, Resistance Alerts, Toxicity Alerts  
**Locked:** Timeline

```typescript
const level4Metrics = {
  unlocked: [
    // All previous metrics +
    { id: 'alerts-toxicity', name: 'Toxicity Alerts', value: 'Active', status: 'normal' } // NEW
  ],
  locked: [
    { id: 'timeline', name: 'Monitoring Timeline', lockedAt: 'Level 5', reason: 'Requires complete care plan' }
  ]
};
```

**Visual:**
- ✅ All metrics except Timeline: Full color, active
- 🔒 Timeline: Grayed out, "Unlock at Level 5: Complete Care Plan"

**Alerts Section:**
- ✅ Shows: ALL alerts including toxicity prevention alerts (Level 4)

---

### **Level 5 Page: "Complete Care Plan" (Main Oncology Page)**
**Unlocked:** EVERYTHING - Full Dashboard

```typescript
const level5Metrics = {
  unlocked: [
    // ALL metrics active
    { id: 'csi', name: 'CSI Score', value: 72, status: 'warning' },
    { id: 'ca125', name: 'CA-125', value: 900, status: 'warning' },
    { id: 'imaging', name: 'Imaging', value: 'No progression', status: 'normal' },
    { id: 'ctdna', name: 'ctDNA', value: 'KRAS G12D: 0.8% VAF', status: 'alert' },
    { id: 'trials', name: 'Active Trials', value: '3 matches', status: 'active' },
    { id: 'alerts', name: 'Active Alerts', value: '4 Active', status: 'alert' },
    { id: 'timeline', name: 'Monitoring Timeline', value: 'Full Timeline', status: 'active' } // NOW UNLOCKED
  ]
};
```

**Visual:**
- ✅ ALL metrics: Full color, active
- ✅ Full timeline: Shows complete progression

---

## 🏗️ COMPONENT ARCHITECTURE

### **Create: `ProgressiveMonitoringDashboard.tsx`**

```typescript
interface ProgressiveMonitoringDashboardProps {
  level: 1 | 2 | 3 | 4 | 5;
  patientId?: string;
}

export default function ProgressiveMonitoringDashboard({
  level,
  patientId = 'AK'
}: ProgressiveMonitoringDashboardProps) {
  // Determine which metrics are unlocked/locked based on level
  const unlockedMetrics = getUnlockedMetrics(level);
  const lockedMetrics = getLockedMetrics(level);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              CSI Continuous Monitoring
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              Track CSI score updates as tumor evolves. Never miss a chemosensitivity change. • Patient {patientId}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">LIVE</span>
              <span className="text-sm text-white/80">
                • Level {level} of 5 Unlocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Unlocked Metrics */}
          {unlockedMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              status="unlocked"
            />
          ))}
          
          {/* Locked Metrics */}
          {lockedMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              status="locked"
            />
          ))}
        </div>
      </div>

      {/* Active Alerts - Progressive */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="text-xl font-bold text-slate-900">Active Alerts & Insights</h3>
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
            {getUnlockedAlertsCount(level)} Active
          </span>
          {lockedMetrics.some(m => m.id.includes('alert')) && (
            <span className="text-sm text-slate-500">
              ({getLockedAlertsCount(level)} locked at Level {getNextAlertLevel(level)})
            </span>
          )}
        </div>
        
        {/* Unlocked Alerts */}
        <div className="space-y-3">
          {getUnlockedAlerts(level).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
        
        {/* Locked Alerts Preview */}
        {getLockedAlerts(level).length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">
                Unlock at Level {getNextAlertLevel(level)}: {getNextAlertReason(level)}
              </span>
            </div>
            <div className="text-sm text-slate-500">
              {getLockedAlerts(level).map(alert => alert.title).join(', ')} will be available
            </div>
          </div>
        )}
      </div>

      {/* Monitoring Timeline - Only at Level 5 */}
      {level === 5 && (
        <div className="p-6 border-t border-slate-200">
          <MonitoringTimeline />
        </div>
      )}
      
      {/* Timeline Locked Preview */}
      {level < 5 && (
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-600">
              Unlock at Level 5: Complete Care Plan
            </span>
          </div>
          <div className="text-sm text-slate-500">
            Full monitoring timeline showing progression across all treatment lines will be available
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 IMPLEMENTATION STEPS

### **Step 1: Create ProgressiveMonitoringDashboard Component**
- Takes `level` prop (1-5)
- Determines unlocked/locked metrics based on level
- Shows locked metrics as grayed out with "Unlock at Level X" message

### **Step 2: Create MetricCard Component**
- Handles both unlocked (full color) and locked (grayed out) states
- Shows unlock reason for locked metrics

### **Step 3: Create AlertCard Component**
- Shows unlocked alerts (full color)
- Shows locked alerts preview (grayed out, "Unlock at Level X")

### **Step 4: Create MonitoringTimeline Component**
- Only shows at Level 5
- Shows full progression timeline

### **Step 5: Update Journey Level Pages**
- Level 1: Use `ProgressiveMonitoringDashboard level={1}`
- Level 2: Use `ProgressiveMonitoringDashboard level={2}`
- Level 3: Use `ProgressiveMonitoringDashboard level={3}`
- Level 4: Use `ProgressiveMonitoringDashboard level={4}`
- Level 5 (Main): Use `ProgressiveMonitoringDashboard level={5}` (full dashboard)

---

## ✅ SUCCESS CRITERIA

### **Each Level Page Should:**
1. ✅ Show progressive build-up (more metrics unlocked as level increases)
2. ✅ Show locked metrics with clear unlock path ("Unlock at Level X")
3. ✅ Show educational context (why metrics are locked)
4. ✅ Motivate progression (see what you unlock next)
5. ✅ Visual consistency (same dashboard, different unlock state)

### **User Journey:**
- **Level 1:** "I see CSI Score - what else can I unlock?"
- **Level 2:** "Now I see Drug Recommendations - what's next?"
- **Level 3:** "Now I see Resistance Prediction - almost there!"
- **Level 4:** "Now I see Toxicity Prevention - one more level!"
- **Level 5:** "FULL DASHBOARD! This is what I was working towards!"

---

## 💡 WHY THIS IS BETTER

### **Educational:**
- Users understand what each level unlocks
- Clear progression path
- See the value of completing the journey

### **Visual:**
- See the dashboard build up
- Understand the full value at Level 5
- Motivated to progress

### **User Experience:**
- No redundancy (each page shows different unlock state)
- Clear purpose (see what you have, what's next)
- Progressive disclosure (not overwhelming)

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **EXECUTION PLAN** - Progressive monitoring dashboard build-up
