export const TRIAL_DASHBOARD_TEXTS = {
  navbar: {
    brandName: "Mars V6",
    brandSuffix: "Intelligence",
    tabs: ['PATIENT DATA', 'SIMULATION', 'DATA ANALYSIS', 'SETTINGS'],
    nodeStatus: "Node Syncing",
  },
  sidebar: {
    title: "Navigation",
    items: [
      { label: 'Model Overview', active: true },
      { label: 'Treatment History', active: false },
      { label: 'Resistance Delta', active: false },
      { label: 'System Alerts', active: false }
    ],
    cohortProps: {
      title: "Cohort Analysis",
      relapseLabel: "Relapse Probability",
      trajectoryWarningInfo: "Critical trajectory detected toward"
    }
  },
  patientData: {
    title: "Genomic Stream Processing",
    columnHeader: "Cohort_ID"
  },
  simulation: {
    riskBenefitGate: {
      title: "ENGINE 04 // IO RISK-BENEFIT GATE",
      equationStart: "Net Clinical Benefit = (p",
      respLabel: "resp",
      equationMiddle: " × Benefit) - (Risk",
      toxLabel: "tox",
      equationEnd: " × Toxicity",
      costLabel: "cost",
      aucScore: "AUC 0.822",
      xAxisLabel: "Toxicity Risk",
      yAxisLabel: "Response Probability",
      ruleOutPrefix: "RULE OUT:",
      futileToxicity: "FUTILE TOXICITY"
    },
    resistanceMatrix: {
      title: "Cancer 'Kill Chain' Resistance Matrix"
    },
    statsPanel: {
      title: "Pathway Activation Scores"
    },
    recommendations: {
      title: "Treatment Recommendations",
      criticalAlertTitle: "Critical Resistance Detected",
      criticalInfoPrefix: "Resistance probability in Alkylating Agents: 78.4%. Immediate strategy pivot required.",
      adjuvantLabel: "Adjuvant Therapy:",
      adjuvantValue: "PARP INHIBITOR",
      comboLabel: "Combo Strategy:",
      comboValue: "PEMBRO + MET_I",
      buttonText: "[Download Optimization Protocol]"
    }
  },
  footer: {
    heroStatementPart1: "Built the first clinical AI that tells you",
    heroHighlight: "why",
    heroStatementPart2: "a trial will fail.",
    escapePrefix: "Evolutionary Escape Detected:",
    cohortPrefix: "n=29",
    btnReceipts: "[Scan Another Cohort]",
    btnContact: "[Export Model Specs]",
    engineActive: "ENGINE_V6.2_ACTIVE",
    batchDelta: "Batch_Delta:"
  }
};
