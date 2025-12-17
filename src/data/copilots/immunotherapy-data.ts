import { CoPilotDetailContent } from '@/types/copilot-types';

export const immunotherapyData: CoPilotDetailContent = {
  slug: "immunotherapy",
  pageTitle: "Immunotherapy Matching: Eligibility & Response Prediction",
  heroSubtitle: "Predict immunotherapy eligibility and response using biomarker analysis. TMB, MSI, PD-L1, and tumor microenvironment analysis for precision immunotherapy selection.",
  vision: "Identify patients most likely to benefit from immunotherapy through comprehensive biomarker analysis and response prediction.",

  valueProps: [
    {
      audience: 'For Medical Oncologists',
      icon: 'Target',
      points: [
        'Comprehensive biomarker analysis: TMB, MSI, PD-L1, tumor microenvironment',
        'Response prediction with confidence scores',
        'Action-ready immunotherapy recommendations'
      ]
    }
  ],

  buildsOn: "Core Capabilities",
  buildsOnStackPoints: [
    "**Biomarker analysis:** TMB, MSI, PD-L1 expression, and tumor microenvironment assessment",
    "**Response prediction:** AI-powered immunotherapy response forecasting",
    "**Eligibility matching:** Transparent eligibility criteria with confidence scores"
  ],

  kpis: [
    { label: 'Eligibility Accuracy', value: '92%' },
    { label: 'Response Prediction', value: '85%' },
  ],

  observedOutcomes: [
    {
      title: "Improved Immunotherapy Selection",
      keyMetric: "92% accuracy",
      description: "Precise immunotherapy eligibility determination with comprehensive biomarker analysis",
      icon: "Target",
      color: "blue"
    },
    {
      title: "Response Prediction",
      keyMetric: "85% accuracy",
      description: "Predict immunotherapy response before treatment initiation",
      icon: "TrendingUp",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "Comprehensive immunotherapy biomarker analysis and response prediction.",
  coreProblemIntro: "Immunotherapy eligibility and response prediction requires complex biomarker analysis across multiple dimensions.",
  coreProblemPoints: [
    "Biomarker analysis scattered across multiple tests",
    "Response prediction uncertainty",
    "Complex eligibility criteria"
  ],

  genomicUseCasesGrid: [
    { label: "TMB Analysis", iconName: "Dna", color: "text-blue-400" },
    { label: "MSI Status", iconName: "Activity", color: "text-green-400" },
    { label: "PD-L1 Expression", iconName: "Target", color: "text-purple-400" },
    { label: "TME Analysis", iconName: "Microscope", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Biomarker Analysis",
      technical: {
        title: "Technical Approach",
        keyMetric: "Multi-Modal Biomarker Assessment",
        description: "Comprehensive analysis of TMB, MSI, PD-L1, and tumor microenvironment for immunotherapy eligibility",
        icon: "Dna",
        color: "blue"
      },
      business: {
        title: "Business Impact",
        keyMetric: "92% Eligibility Accuracy",
        description: "Precise immunotherapy patient selection with transparent biomarker reasoning",
        icon: "Target",
        color: "teal"
      },
      scientific: {
        title: "Scientific Foundation",
        keyMetric: "Validated Biomarkers",
        description: "Evidence-based biomarker analysis using validated clinical markers for immunotherapy eligibility",
        icon: "Microscope",
        color: "indigo"
      }
    }
  ],


  inSilicoWorkflow: {
    title: "Immunotherapy Matching Workflow",
    steps: [
      {
        title: "Biomarker Analysis",
        description: "Analyze TMB, MSI, PD-L1, and tumor microenvironment",
        iconName: "Dna"
      },
      {
        title: "Eligibility Assessment",
        description: "Determine immunotherapy eligibility with confidence scores",
        iconName: "Target"
      },
      {
        title: "Response Prediction",
        description: "Predict immunotherapy response probability",
        iconName: "TrendingUp"
      }
    ]
  },

  valuePropositionSections: [
    {
      audience: "For Medical Oncologists",
      points: [
        "Comprehensive biomarker analysis: TMB, MSI, PD-L1, tumor microenvironment",
        "Response prediction with confidence scores",
        "Action-ready immunotherapy recommendations"
      ]
    }
  ],

  conclusion: "Immunotherapy matching provides comprehensive biomarker analysis and response prediction for precision immunotherapy selection."
};

