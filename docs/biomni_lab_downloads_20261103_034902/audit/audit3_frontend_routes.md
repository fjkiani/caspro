# Audit 3: Frontend Routes + Pages + Navigation

## 1. routes/index.js
```js
/**
 * Route Aggregator - Central route configuration
 * 
 * Imports all route modules and exports them for use in App.jsx
 * This provides a scalable, modular approach to route management.
 */

import { authRoutes } from './authRoutes';
import { coreRoutes } from './coreRoutes';
import { moatRoutes } from './moatRoutes';
import { patientRoutes } from './patientRoutes';
import { oncologistRoutes } from './oncologistRoutes';
import { researchRoutes } from './researchRoutes';
import { legacyRoutes } from './legacyRoutes';
import { devRoutes } from './devRoutes';
import { getExperimentalRoutes } from './experimentalRoutes';

/**
 * Get all routes organized by category
 * Routes are rendered in order, so specific routes should come before wildcard routes
 * 
 * @param {boolean} includeDev - Whether to include DEV-only routes
 * @param {boolean} includeExperimental - Whether to include experimental routes (DEV-gated)
 */
export const getAllRoutes = (includeDev = import.meta.env.DEV, includeExperimental = import.meta.env.DEV) => {
  const routes = [
    ...authRoutes,
    ...coreRoutes,
    ...moatRoutes,        // MOAT Core - Primary focus
    ...patientRoutes,
    ...oncologistRoutes,  // Oncologist persona routes
    ...researchRoutes,
    ...legacyRoutes,      // Legacy/Unclear routes - kept for backward compatibility
  ];
  
  if (includeExperimental) {
    const experimental = getExperimentalRoutes();
    routes.push(...experimental);
  }
  
  if (includeDev) {
    routes.push(...devRoutes);
  }
  
  return routes;
};

// Default export for backward compatibility (includes DEV routes in DEV mode)
export const allRoutes = getAllRoutes();

/**
 * Route categories for documentation and debugging
 */
export const routeCategories = {
  auth: authRoutes,
  core: coreRoutes,
  moat: moatRoutes,
  patient: patientRoutes,
  oncologist: oncologistRoutes,
  research: researchRoutes,
  legacy: legacyRoutes,
  experimental: getExperimentalRoutes,
  dev: devRoutes,
};

export default allRoutes;
```

## authRoutes.jsx
```jsx
/**
 * Authentication Routes
 * 
 * Public and protected authentication-related routes
 */

import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import AuthRedirect from '../components/AuthRedirect';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminDashboard from '../pages/admin/Dashboard';
import DSRRequest from '../pages/DSRRequest';

export const authRoutes = [
  // Public auth routes
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="signup" path="/signup" element={<Signup />} />,
  
  // Root redirect
  <Route key="root" path="/" element={<AuthRedirect />} />,
  
  // Protected routes
  <Route 
    key="admin-dashboard" 
    path="/admin/dashboard" 
    element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="dsr-request" 
    path="/dsr-request" 
    element={
      <ProtectedRoute>
        <DSRRequest />
      </ProtectedRoute>
    } 
  />,
];
```

## coreRoutes.jsx
```jsx
/**
 * Core Navigation Routes
 * 
 * Essential application routes for basic navigation and functionality
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Profile, Onboarding } from '../pages';
import DoctorDashboard from '../pages/DoctorDashboard';
import MedicalRecords from '../pages/records/index';
import SingleRecordDetails from '../pages/records/single-record-details';
import ScreeningSchedule from '../pages/ScreeningSchedule';
import FollowUpTaskBoard from '../pages/FollowUpTaskBoard';
import PatientTasksPage from '../pages/PatientTasksPage';
import TargetDossier from '../pages/TargetDossier';
import OutreachDashboard from '../pages/OutreachDashboard';
import Research from '../pages/Research';

export const coreRoutes = [
  <Route key="home" path="/home" element={<Home />} />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route key="onboarding" path="/onboarding" element={<Onboarding />} />,
  <Route key="dashboard" path="/dashboard" element={<DoctorDashboard />} />,
  <Route key="workload-dashboard" path="/workload-dashboard" element={<FollowUpTaskBoard />} />,
  <Route key="medical-records" path="/medical-records" element={<MedicalRecords />} />,
  <Route 
    key="medical-records-detail" 
    path="/medical-records/:id" 
    element={<SingleRecordDetails />} 
  />,
  <Route 
    key="medical-records-research" 
    path="/medical-records/:patientId/research" 
    element={<Research />} 
  />,
  <Route 
    key="medical-records-tasks" 
    path="/medical-records/:patientId/tasks"
    element={<PatientTasksPage />} 
  />,
  <Route key="screening-schedules" path="/screening-schedules" element={<ScreeningSchedule />} />,
  <Route key="outreach" path="/outreach" element={<OutreachDashboard />} />,
  <Route key="dossier" path="/dossier" element={<TargetDossier />} />,
];
```

## devRoutes.jsx
```jsx
/**
 * Development-Only Routes
 * 
 * Routes that are ONLY available in development mode
 * These are automatically wrapped in import.meta.env.DEV check
 */

import React from 'react';
import { Route } from 'react-router-dom';
import AgentDemo from '../pages/AgentDemo';
import AgentStudio from '../pages/AgentStudio';
import AyeshaTwinDemo from '../pages/AyeshaTwinDemo';
import ClinicalDossierTest from '../pages/ClinicalDossierTest';
import { Q2CRouterTest } from '../components/CoPilot/Q2CRouter/Q2CRouterTest';
import Phase3ActionDemo from '../components/Phase3ActionDemo';
import CoPilotSmokeTest from '../components/CoPilotSmokeTest';
import CoPilotDoctrineGapAnalysis from '../components/CoPilotDoctrineGapAnalysis';

/**
 * DEV-Only Routes
 * 
 * These routes are only rendered when import.meta.env.DEV === true
 * Used for development, testing, and debugging
 */
export const devRoutes = [
  <Route key="agent-demo" path="/agent-demo/:agentId" element={<AgentDemo />} />,
  <Route key="agent-studio" path="/agent-studio" element={<AgentStudio />} />,
  <Route key="ayesha-twin-demo" path="/ayesha-twin-demo" element={<AyeshaTwinDemo />} />,
  <Route key="clinical-dossier-test" path="/clinical-dossier-test" element={<ClinicalDossierTest />} />,
  <Route key="q2c-test" path="/q2c-test" element={<Q2CRouterTest />} />,
  <Route key="phase3-demo" path="/phase3-demo" element={<Phase3ActionDemo />} />,
  <Route key="copilot-smoke-test" path="/copilot-smoke-test" element={<CoPilotSmokeTest />} />,
  <Route key="copilot-gap-analysis" path="/copilot-gap-analysis" element={<CoPilotDoctrineGapAnalysis />} />,
];
```

## experimentalRoutes.jsx
```jsx
/**
 * Experimental Routes
 * 
 * Routes that are experimental, A/B tests, or demos
 * These should be DEV-gated for production safety
 */

import React from 'react';
import { Route } from 'react-router-dom';
import InvestorSlideshow from '../pages/InvestorSlideshow';
import DemoSummarizer from '../pages/DemoSummarizer';
import FoodValidatorAB from '../pages/FoodValidatorAB';
import BatchFoodValidator from '../pages/BatchFoodValidator';
import RunxConquest from '../pages/RunxConquest';
import CampaignRunner from '../pages/CampaignRunner';
import { pik3caTrinityCampaignConfig } from '../config/campaigns/pik3ca_trinity_campaign_config';

/**
 * Experimental Routes - DEV-Gated
 * 
 * TIER 4: Routes that should only be available in development
 * These are wrapped in import.meta.env.DEV check in App.jsx
 * 
 * Note: These routes are exported as a function that returns routes conditionally
 */
export const getExperimentalRoutes = () => {
  if (!import.meta.env.DEV) {
    return [];
  }
  
  return [
    <Route key="investor-slideshow" path="/investor-slideshow" element={<InvestorSlideshow />} />,
    <Route key="demo-summarizer" path="/demo-summarizer" element={<DemoSummarizer />} />,
    <Route key="food-validator" path="/food-validator" element={<FoodValidatorAB />} />,
    <Route key="batch-food-validator" path="/batch-food-validator" element={<BatchFoodValidator />} />,
    <Route key="runx-conquest" path="/runx-conquest" element={<RunxConquest />} />,
    <Route key="runx-conquest-demo" path="/runx-conquest/:demoId" element={<RunxConquest />} />,
    <Route 
      key="campaign-pik3ca" 
      path="/campaigns/pik3ca-de-risking" 
      element={<CampaignRunner config={pik3caTrinityCampaignConfig} />} 
    />,
  ];
};

// Export route definitions for documentation
export const experimentalRouteDefinitions = [
  {
    path: '/investor-slideshow',
    component: 'InvestorSlideshow',
    reason: 'Demo only - investor presentations',
  },
  {
    path: '/demo-summarizer',
    component: 'DemoSummarizer',
    reason: 'Demo only - demo summarization tool',
  },
  {
    path: '/food-validator',
    component: 'FoodValidatorAB',
    reason: 'Experimental A/B test - food validation',
  },
  {
    path: '/batch-food-validator',
    component: 'BatchFoodValidator',
    reason: 'Experimental - batch food validation',
  },
  {
    path: '/runx-conquest',
    component: 'RunxConquest',
    reason: 'Campaign demo - RUNX conquest campaign',
  },
  {
    path: '/campaigns/pik3ca-de-risking',
    component: 'CampaignRunner',
    reason: 'Campaign demo - PIK3CA de-risking campaign',
  },
];
```

## legacyRoutes.jsx
```jsx
/**
 * Legacy/Unclear Routes
 * 
 * Routes that may be duplicates or have unclear status
 * Kept for backward compatibility but marked for evaluation
 * 
 * TODO: Evaluate these routes and consolidate or remove:
 * - /agent-dashboard vs /orchestrator (legacy duplicate?)
 * - /agents vs /orchestrator (what's the difference?)
 * - /research vs /research-intelligence (same purpose?)
 */

import React from 'react';
import { Route } from 'react-router-dom';
import Research from '../pages/Research';
import MutationExplorer from '../pages/MutationExplorer';
import AgentDashboard from '../pages/AgentDashboard';
import { AgentsPage } from '../pages/AgentsPage';
import GenomicAnalysis from '../pages/GenomicAnalysis.tsx';
import HypothesisValidator from '../pages/HypothesisValidator';

/**
 * Legacy Routes - Backward Compatibility
 * 
 * TIER 6: Routes to evaluate for consolidation or removal
 */
export const legacyRoutes = [
  // Research - Legacy route (consider consolidating with /research-intelligence)
  <Route key="research" path="/research" element={<Research />} />,
  <Route key="research-patient" path="/research/:patientId" element={<Research />} />,
  
  // Mutation Explorer - Legacy genomic analysis tool
  <Route key="mutation-explorer" path="/mutation-explorer" element={<MutationExplorer />} />,
  <Route 
    key="mutation-explorer-patient" 
    path="/mutation-explorer/:patientId" 
    element={<MutationExplorer />} 
  />,
  
  // Agent Dashboard - Legacy (may duplicate /orchestrator)
  <Route key="agent-dashboard" path="/agent-dashboard" element={<AgentDashboard />} />,
  <Route 
    key="agent-dashboard-patient" 
    path="/agent-dashboard/:patientId" 
    element={<AgentDashboard />} 
  />,
  
  // Agents Page - Legacy (unclear vs /orchestrator)
  <Route key="agents" path="/agents" element={<AgentsPage />} />,
  
  // Genomic Analysis - Legacy (consider consolidating with /clinical-genomics)
  <Route 
    key="genomic-analysis" 
    path="/genomic-analysis/:patientId" 
    element={<GenomicAnalysis />} 
  />,
  
  // Hypothesis Validator - Legacy validation tool
  <Route key="validate" path="/validate" element={<HypothesisValidator />} />,
];
```

## moatRoutes.jsx
```jsx
/**
 * MOAT Core Routes - Primary Focus
 * 
 * MOAT (Mechanism-Oriented Analysis & Treatment) orchestration routes
 * These are the core production-ready capabilities of the platform
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PersonaRoute from '../components/auth/PersonaRoute';
import UniversalCompleteCare from '../pages/UniversalCompleteCare';
import UniversalTrialIntelligence from '../pages/UniversalTrialIntelligence';
import UniversalDossierBrowser from '../pages/UniversalDossierBrowser';
import UniversalDossierDetail from '../pages/UniversalDossierDetail';
import { OrchestratorDashboard } from '../pages/OrchestratorDashboard';
import ResearchIntelligence from '../pages/ResearchIntelligence';
import ClinicalGenomicsCommandCenter from '../components/ClinicalGenomicsCommandCenter/ClinicalGenomicsCommandCenter';
import { SyntheticLethalityAnalyzer } from '../components/SyntheticLethality';
import DosingGuidancePage from '../pages/DosingGuidancePage';
import MetastasisDashboard from '../pages/MetastasisDashboard';
import DDRStatusPage from '../pages/DDRStatusPage';
import PrognosisSentinel from '../pages/ayesha/PrognosisSentinel';

/**
 * MOAT Core Routes - Production Ready
 * 
 * TIER 1: Core MOAT capabilities
 * Personas: Oncologist, Researcher (some Researcher-only)
 */
export const moatRoutes = [
  // Universal Complete Care - Full orchestration
  <Route
    key="universal-complete-care"
    path="/universal-complete-care"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <UniversalCompleteCare />
      </PersonaRoute>
    }
  />,
  <Route
    key="universal-complete-care-patient"
    path="/universal-complete-care/:patientId"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <UniversalCompleteCare />
      </PersonaRoute>
    }
  />,

  // Universal Trial Intelligence - Trial matching
  <Route
    key="universal-trial-intelligence"
    path="/universal-trial-intelligence"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <UniversalTrialIntelligence />
      </PersonaRoute>
    }
  />,

  // Universal Dossiers - Dossier management
  <Route
    key="universal-dossiers"
    path="/universal-dossiers"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <UniversalDossierBrowser />
      </PersonaRoute>
    }
  />,
  <Route
    key="universal-dossiers-detail"
    path="/universal-dossiers/:patientId/:nct_id"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <UniversalDossierDetail />
      </PersonaRoute>
    }
  />,

  // Research Intelligence - Research orchestration
  <Route
    key="research-intelligence"
    path="/research-intelligence"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <ResearchIntelligence />
      </PersonaRoute>
    }
  />,

  // Orchestrator Dashboard - Researcher-only
  <Route
    key="orchestrator"
    path="/orchestrator"
    element={
      <PersonaRoute allowedPersonas={['researcher']}>
        <OrchestratorDashboard />
      </PersonaRoute>
    }
  />,

  // Clinical Genomics - VCF/genomic analysis
  <Route
    key="clinical-genomics"
    path="/clinical-genomics"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <ClinicalGenomicsCommandCenter />
      </PersonaRoute>
    }
  />,

  // Synthetic Lethality - SL analysis
  <Route
    key="synthetic-lethality"
    path="/synthetic-lethality"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <SyntheticLethalityAnalyzer />
      </PersonaRoute>
    }
  />,

  // Dosing Guidance - Drug dosing recommendations
  <Route
    key="dosing-guidance"
    path="/dosing-guidance"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <DosingGuidancePage />
      </PersonaRoute>
    }
  />,

  // Metastasis Dashboard - Metastasis analysis
  <Route
    key="metastasis"
    path="/metastasis"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <MetastasisDashboard />
      </PersonaRoute>
    }
  />,

  // DDR Status - DDR_bin classification
  <Route
    key="ddr-status"
    path="/ddr-status"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <DDRStatusPage />
      </PersonaRoute>
    }
  />,

  // Prognosis Sentinel - Ayesha/Hybrid Engine View
  <Route
    key="prognosis-sentinel"
    path="/sentinel"
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher', 'patient']}>
        <PrognosisSentinel />
      </PersonaRoute>
    }
  />,
];
```

## oncologistRoutes.jsx
```jsx
/**
 * Oncologist Persona Routes
 * 
 * Routes for oncologist/clinician persona following PERSONA_ACCESS_QUICK_START.md patterns
 * Uses PersonaRoute for access control
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PersonaRoute from '../components/auth/PersonaRoute';
import OncologistOnboarding from '../pages/DoctorOnboarding';

/**
 * Oncologist Routes - Oncologist Persona Access
 * 
 * Following PERSONA_ACCESS_QUICK_START.md:
 * - Persona: oncologist (maps from role: 'clinician')
 * - Access: Oncologist persona only
 */
export const oncologistRoutes = [
  // Oncologist Onboarding
  <Route 
    key="oncologist-onboarding" 
    path="/oncologist/onboarding" 
    element={
      <PersonaRoute allowedPersonas={['oncologist']}>
        <OncologistOnboarding />
      </PersonaRoute>
    } 
  />,
];
```

## patientRoutes.jsx
```jsx
/**
 * Patient Persona Routes
 * 
 * Patient-facing routes for personal health data and care plans
 */

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PatientRoute from '../components/auth/PatientRoute';
import PersonaRoute from '../components/auth/PersonaRoute';
import AyeshaCompleteCare from '../pages/AyeshaCompleteCare';
import AyeshaTrialsOnly from '../pages/ayesha/AyeshaTrialsOnly';
import AyeshaTrialExplorer from '../pages/ayesha/AyeshaTrialExplorer';
import AyeshaDossierBrowser from '../pages/AyeshaDossierBrowser';
import AyeshaDossierDetail from '../pages/AyeshaDossierDetail';
import AyeshaPatientDashboard from '../pages/ayesha/AyeshaPatientDashboard';
import AyeshaTwinDemo from '../pages/ayesha/AyeshaTwinDemo';
import ResistanceLab from '../pages/ayesha/ResistanceLab';
import BiomarkerIntelligencePage from '../pages/ayesha/BiomarkerIntelligencePage';
import PrognosisSentinel from '../pages/ayesha/PrognosisSentinel';
import AyeshaWeaponCompatibility from '../pages/ayesha/AyeshaWeaponCompatibility';
import AyeshaTestsUnlocks from '../pages/ayesha/AyeshaTestsUnlocks';
import AyeshaHolisticScoring from '../pages/ayesha/AyeshaHolisticScoring';
import PatientStrategyBoard from '../pages/ayesha/PatientStrategyBoard';
import TestsPage from '../pages/ayesha/TestsPage';
import PostDebulkingMRD from '../pages/ayesha/PostDebulkingMRD';
import TrialReplaySandbox from '../components/ayesha/simulator/TrialReplaySandbox';
import PatientDashboard from '../pages/PatientDashboard';
import PatientProfile from '../pages/PatientProfile';
import PatientSettings from '../pages/PatientSettings';
import PatientOnboarding from '../pages/PatientOnboarding';
import Phase1Profile from '../pages/ayesha/phases/Phase1Profile';
import Phase2Tests from '../pages/ayesha/phases/Phase2Tests';
import Phase3Treatment from '../pages/ayesha/phases/Phase3Treatment';
import Phase4Monitoring from '../pages/ayesha/phases/Phase4Monitoring';
import Phase5Resistance from '../pages/ayesha/phases/Phase5Resistance';
import Phase6Board from '../pages/ayesha/phases/Phase6Board';
import DrugDetailPage from '../pages/ayesha/phases/DrugDetailPage';
import TestDetailPage from '../pages/ayesha/phases/TestDetailPage';
import RepurposingArsenalPage from '../pages/ayesha/phases/RepurposingArsenalPage';
import ArsenalDrugDetailPage from '../pages/ayesha/phases/ArsenalDrugDetailPage';
import IOHarmPreventionDemo from '../pages/ayesha/IOHarmPreventionDemo';
import PatientKnowledgeBase from '../pages/PatientKnowledgeBase';

/**
 * Patient Routes - Patient Persona Access
 * 
 * TIER 2: Patient-facing features
 */
export const patientRoutes = [
  // Patient Dashboard
  <Route
    key="patient-dashboard"
    path="/patient/dashboard"
    element={
      <PatientRoute>
        <PatientDashboard />
      </PatientRoute>
    }
  />,

  // Patient Profile & Settings
  <Route
    key="patient-profile"
    path="/patient/profile"
    element={
      <PersonaRoute allowedPersonas={['patient', 'oncologist']}>
        <PatientProfile />
      </PersonaRoute>
    }
  />,
  <Route
    key="patient-onboarding"
    path="/patient/onboarding"
    element={
      <PersonaRoute allowedPersonas={['patient', 'oncologist']}>
        <PatientOnboarding />
      </PersonaRoute>
    }
  />,
  <Route
    key="patient-settings"
    path="/patient/settings"
    element={
      <PatientRoute>
        <PatientSettings />
      </PatientRoute>
    }
  />,
  // Patient Knowledge Base
  <Route
    key="patient-knowledge-base"
    path="/patient/knowledge-base"
    element={
      <PatientRoute>
        <PatientKnowledgeBase />
      </PatientRoute>
    }
  />,
  <Route
    key="patient-knowledge-base-id"
    path="/patient/knowledge-base/:patientId"
    element={
      <PatientRoute>
        <PatientKnowledgeBase />
      </PatientRoute>
    }
  />,
  // Ayesha Patient Dashboard - Main landing page
  <Route
    key="ayesha-dashboard"
    path="/ayesha"
    element={
      <PatientRoute>
        <AyeshaPatientDashboard />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-dashboard-alt"
    path="/ayesha/dashboard"
    element={
      <PatientRoute>
        <AyeshaPatientDashboard />
      </PatientRoute>
    }
  />,

  // Ayesha Complete Care - Patient view
  <Route
    key="ayesha-complete-care"
    path="/ayesha-complete-care"
    element={
      <PatientRoute>
        <AyeshaCompleteCare />
      </PatientRoute>
    }
  />,

  // Ayesha 360° Dashboard
  <Route
    key="ayesha-trials"
    path="/ayesha-trials"
    element={
      <PatientRoute>
        <AyeshaTrialExplorer />
      </PatientRoute>
    }
  />,

  // Ayesha Full Trials List
  <Route
    key="ayesha-trials-full"
    path="/ayesha/trials-full"
    element={
      <PatientRoute>
        <AyeshaTrialsOnly />
      </PatientRoute>
    }
  />,

  // Ayesha Dossiers - Patient dossier view
  <Route
    key="ayesha-dossiers"
    path="/ayesha-dossiers"
    element={<AyeshaDossierBrowser />}
  />,
  <Route
    key="ayesha-dossiers-detail"
    path="/ayesha-dossiers/:nct_id"
    element={<AyeshaDossierDetail />}
  />,

  // Ayesha Digital Twin - Mechanistic biology analysis
  <Route
    key="ayesha-digital-twin"
    path="/ayesha-digital-twin"
    element={
      <PatientRoute>
        <AyeshaTwinDemo />
      </PatientRoute>
    }
  />,
  // Also support the demo route for backward compatibility
  <Route
    key="ayesha-twin-demo"
    path="/ayesha-twin-demo"
    element={
      <PatientRoute>
        <AyeshaTwinDemo />
      </PatientRoute>
    }
  />,
  // Ayesha Resistance Lab - "Glass Box" Simulator
  <Route
    key="ayesha-resistance-lab"
    path="/resistance-lab"
    element={
      <PatientRoute>
        <ResistanceLab />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-therapy-fit"
    path="/ayesha/therapy-fit"
    element={
      <PatientRoute>
        <AyeshaWeaponCompatibility />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-sandbox"
    path="/ayesha/sandbox"
    element={
      <PatientRoute>
        <TrialReplaySandbox />
      </PatientRoute>
    }
  />
  ,
  <Route
    key="ayesha-tumor-board"
    path="/ayesha/tumor-board"
    element={
      <PatientRoute>
        <PatientStrategyBoard />
      </PatientRoute>
    }
  />
  ,
  <Route
    key="ayesha-holistic-scoring"
    path="/ayesha/holistic-scoring"
    element={
      <PatientRoute>
        <AyeshaHolisticScoring />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-tests-unlocks"
    path="/ayesha/tests"
    element={
      <PatientRoute>
        <TestsPage />
      </PatientRoute>
    }
  />
  ,
  <Route
    key="ayesha-tests-unlocks-legacy"
    path="/ayesha/tests-unlocks"
    element={
      <PatientRoute>
        <AyeshaTestsUnlocks />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-biomarker-intelligence"
    path="/ayesha/biomarker-intelligence"
    element={
      <PatientRoute>
        <BiomarkerIntelligencePage />
      </PatientRoute>
    }
  />,
  <Route
    key="ayesha-prognosis-sentinel"
    path="/ayesha/prognosis-sentinel"
    element={
      <PatientRoute>
        <PrognosisSentinel />
      </PatientRoute>
    }
  />,

  // IO Harm Prevention Demo
  <Route
    key="ayesha-io-harm-demo"
    path="/ayesha/io-harm-demo"
    element={
      <PatientRoute>
        <IOHarmPreventionDemo />
      </PatientRoute>
    }
  />,

  // ══════════════════════════════════════════════════════════════════════
  // 6-Phase Patient Journey Routes
  // ══════════════════════════════════════════════════════════════════════
  <Route key="journey-profile" path="/ayesha/journey/profile" element={<PatientRoute><Phase1Profile /></PatientRoute>} />,
  <Route key="journey-tests" path="/ayesha/journey/tests" element={<PatientRoute><Phase2Tests /></PatientRoute>} />,
  <Route key="journey-treatment" path="/ayesha/journey/treatment" element={<PatientRoute><Phase3Treatment /></PatientRoute>} />,
  <Route key="journey-monitoring" path="/ayesha/journey/monitoring" element={<PatientRoute><Phase4Monitoring /></PatientRoute>} />,
  <Route key="journey-resistance" path="/ayesha/journey/resistance" element={<PatientRoute><Phase5Resistance /></PatientRoute>} />,
  <Route key="journey-board" path="/ayesha/journey/board" element={<PatientRoute><Phase6Board /></PatientRoute>} />,
  <Route key="journey-drug-detail" path="/ayesha/journey/drug/:slug" element={<PatientRoute><DrugDetailPage /></PatientRoute>} />,
  <Route key="journey-test-detail" path="/ayesha/journey/test/:slug" element={<PatientRoute><TestDetailPage /></PatientRoute>} />,
  <Route key="journey-monitor-detail" path="/ayesha/journey/monitor/:slug" element={<PatientRoute><TestDetailPage /></PatientRoute>} />,
  <Route key="journey-repurposing-arsenal" path="/ayesha/journey/repurposing-arsenal" element={<PatientRoute><RepurposingArsenalPage /></PatientRoute>} />,
  <Route key="journey-arsenal-detail" path="/ayesha/journey/arsenal/:slug" element={<PatientRoute><ArsenalDrugDetailPage /></PatientRoute>} />,
  <Route key="journey-biomarker" path="/ayesha/journey/biomarker" element={<PatientRoute><BiomarkerIntelligencePage /></PatientRoute>} />,
  <Route key="journey-prognosis" path="/ayesha/journey/prognosis" element={<PatientRoute><PrognosisSentinel /></PatientRoute>} />,
  <Route key="journey-post-debulking" path="/ayesha/journey/post-debulking" element={<PatientRoute><PostDebulkingMRD /></PatientRoute>} />,
  <Route key="post-debulking-legacy" path="/ayesha/post-debulking" element={<PatientRoute><PostDebulkingMRD /></PatientRoute>} />,
  // Redirect /ayesha/journey to Phase 1
  <Route key="journey-root" path="/ayesha/journey" element={<Navigate to="/ayesha/journey/profile" replace />} />,
];
```

## researchRoutes.jsx
```jsx
/**
 * Research Tools Routes
 * 
 * Research-focused routes for advanced analysis tools
 * Most are Researcher-only, some available to Oncologists
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PersonaRoute from '../components/auth/PersonaRoute';
import Armory from '../pages/Armory';
import CrisprDesigner from '../pages/CrisprDesigner';
import ProteinSynthesis from '../pages/ProteinSynthesis';
import StructurePredictor from '../pages/StructurePredictor';
import MyelomaDigitalTwin from '../pages/MyelomaDigitalTwin';
import RadOncCoPilot from '../pages/RadOncCoPilot';
import SporadicCancerPage from '../pages/SporadicCancerPage';
import ThreatAssessor from '../pages/ThreatAssessor';

/**
 * Research Routes - Advanced Tools
 * 
 * TIER 5: Research tools with persona protection
 */
export const researchRoutes = [
  // Armory - Research tools hub (Researcher-only)
  <Route 
    key="tools" 
    path="/tools" 
    element={
      <PersonaRoute allowedPersonas={['researcher']}>
        <Armory />
      </PersonaRoute>
    } 
  />,
  
  // CRISPR Designer - CRISPR design tool (Researcher-only)
  <Route 
    key="crispr-designer" 
    path="/crispr-designer" 
    element={
      <PersonaRoute allowedPersonas={['researcher']}>
        <CrisprDesigner />
      </PersonaRoute>
    } 
  />,
  
  // Protein Synthesis - Protein analysis (Researcher-only)
  <Route 
    key="protein-synthesis" 
    path="/protein-synthesis" 
    element={
      <PersonaRoute allowedPersonas={['researcher']}>
        <ProteinSynthesis />
      </PersonaRoute>
    } 
  />,
  
  // Structure Predictor - Structure prediction (Researcher-only)
  <Route 
    key="structure-predictor" 
    path="/structure-predictor" 
    element={
      <PersonaRoute allowedPersonas={['researcher']}>
        <StructurePredictor />
      </PersonaRoute>
    } 
  />,
  
  // Specialty Tools - Available to Oncologists and Researchers
  <Route 
    key="myeloma-digital-twin" 
    path="/myeloma-digital-twin" 
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <MyelomaDigitalTwin />
      </PersonaRoute>
    } 
  />,
  
  <Route 
    key="radonc-co-pilot" 
    path="/radonc-co-pilot" 
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <RadOncCoPilot />
      </PersonaRoute>
    } 
  />,
  
  <Route 
    key="sporadic-cancer" 
    path="/sporadic-cancer" 
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <SporadicCancerPage />
      </PersonaRoute>
    } 
  />,
  
  <Route 
    key="threat-assessor" 
    path="/threat-assessor" 
    element={
      <PersonaRoute allowedPersonas={['oncologist', 'researcher']}>
        <ThreatAssessor />
      </PersonaRoute>
    } 
  />,
];
```

## index.js
```jsx
/**
 * Route Aggregator - Central route configuration
 * 
 * Imports all route modules and exports them for use in App.jsx
 * This provides a scalable, modular approach to route management.
 */

import { authRoutes } from './authRoutes';
import { coreRoutes } from './coreRoutes';
import { moatRoutes } from './moatRoutes';
import { patientRoutes } from './patientRoutes';
import { oncologistRoutes } from './oncologistRoutes';
import { researchRoutes } from './researchRoutes';
import { legacyRoutes } from './legacyRoutes';
import { devRoutes } from './devRoutes';
import { getExperimentalRoutes } from './experimentalRoutes';

/**
 * Get all routes organized by category
 * Routes are rendered in order, so specific routes should come before wildcard routes
 * 
 * @param {boolean} includeDev - Whether to include DEV-only routes
 * @param {boolean} includeExperimental - Whether to include experimental routes (DEV-gated)
 */
export const getAllRoutes = (includeDev = import.meta.env.DEV, includeExperimental = import.meta.env.DEV) => {
  const routes = [
    ...authRoutes,
    ...coreRoutes,
    ...moatRoutes,        // MOAT Core - Primary focus
    ...patientRoutes,
    ...oncologistRoutes,  // Oncologist persona routes
    ...researchRoutes,
    ...legacyRoutes,      // Legacy/Unclear routes - kept for backward compatibility
  ];
  
  if (includeExperimental) {
    const experimental = getExperimentalRoutes();
    routes.push(...experimental);
  }
  
  if (includeDev) {
    routes.push(...devRoutes);
  }
  
  return routes;
};

// Default export for backward compatibility (includes DEV routes in DEV mode)
export const allRoutes = getAllRoutes();

/**
 * Route categories for documentation and debugging
 */
export const routeCategories = {
  auth: authRoutes,
  core: coreRoutes,
  moat: moatRoutes,
  patient: patientRoutes,
  oncologist: oncologistRoutes,
  research: researchRoutes,
  legacy: legacyRoutes,
  experimental: getExperimentalRoutes,
  dev: devRoutes,
};

export default allRoutes;
```

## All Pages (line counts)
  src/pages/AgentDashboard.jsx: 545 lines
  src/pages/AgentDemo.jsx: 318 lines
  src/pages/AgentStudio.jsx: 89 lines
  src/pages/AgentsPage.jsx: 17 lines
  src/pages/Armory.jsx: 56 lines
  src/pages/AyeshaCompleteCare.jsx: 361 lines
  src/pages/AyeshaDossierBrowser.jsx: 299 lines
  src/pages/AyeshaDossierDetail.jsx: 356 lines
  src/pages/AyeshaTrialExplorer.jsx: 30 lines
  src/pages/AyeshaTwinDemo.jsx: 325 lines
  src/pages/BatchFoodValidator.jsx: 178 lines
  src/pages/CampaignRunner.jsx: 175 lines
  src/pages/ClinicalDossierTest.jsx: 167 lines
  src/pages/CrisprDesigner.jsx: 10 lines
  src/pages/DDRStatusPage.jsx: 179 lines
  src/pages/DSRRequest.jsx: 362 lines
  src/pages/DemoSummarizer.jsx: 8 lines
  src/pages/DoctorDashboard.jsx: 30 lines
  src/pages/DoctorOnboarding.jsx: 527 lines
  src/pages/DosingGuidancePage.jsx: 243 lines
  src/pages/DynamicFoodValidator.jsx: 686 lines
  src/pages/FollowUpTaskBoard.jsx: 262 lines
  src/pages/FoodValidatorAB.jsx: 588 lines
  src/pages/HolisticHypothesisTester.jsx: 377 lines
  src/pages/Home.jsx: 31 lines
  src/pages/HypothesisValidator.jsx: 341 lines
  src/pages/InvestorSlideshow.jsx: 1197 lines
  src/pages/MetastasisDashboard.jsx: 322 lines
  src/pages/MutationExplorer.jsx: 187 lines
  src/pages/MyelomaDigitalTwin.jsx: 516 lines
  src/pages/Onboarding.jsx: 105 lines
  src/pages/OrchestratorDashboard.jsx: 250 lines
  src/pages/OutreachDashboard.jsx: 120 lines
  src/pages/PatientDashboard.jsx: 173 lines
  src/pages/PatientHomeDashboard.jsx: 191 lines
  src/pages/PatientKnowledgeBase.jsx: 29 lines
  src/pages/PatientOnboarding.jsx: 524 lines
  src/pages/PatientProfile.jsx: 108 lines
  src/pages/PatientSettings.jsx: 259 lines
  src/pages/PatientTasksPage.jsx: 247 lines
  src/pages/Profile.jsx: 57 lines
  src/pages/ProteinSynthesis.jsx: 8 lines
  src/pages/RadOncCoPilot.jsx: 85 lines
  src/pages/Research.jsx: 488 lines
  src/pages/ResearchIntelligence.jsx: 244 lines
  src/pages/ResearchPortal/ResearchPortal.jsx: 279 lines
  src/pages/RunxConquest.jsx: 52 lines
  src/pages/ScreeningSchedule.jsx: 14 lines
  src/pages/SporadicCancerPage.jsx: 215 lines
  src/pages/StructurePredictor.jsx: 9 lines
  src/pages/TargetDossier.jsx: 8 lines
  src/pages/TherapyFitPage.jsx: 138 lines
  src/pages/ThreatAssessor.jsx: 8 lines
  src/pages/ToxicityRiskAssessment.jsx: 461 lines
  src/pages/TreatmentPlan.jsx: 89 lines
  src/pages/UniversalCompleteCare.jsx: 694 lines
  src/pages/UniversalDossierBrowser.jsx: 304 lines
  src/pages/UniversalDossierDetail.jsx: 188 lines
  src/pages/UniversalTrialIntelligence.jsx: 822 lines
  src/pages/admin/Dashboard.jsx: 173 lines
  src/pages/admin/Users.jsx: 263 lines
  src/pages/auth/Login.jsx: 185 lines
  src/pages/auth/Signup.jsx: 241 lines
  src/pages/ayesha/AyeshaDossierBrowser.jsx: 198 lines
  src/pages/ayesha/AyeshaDossierDetail.jsx: 366 lines
  src/pages/ayesha/AyeshaHolisticScoring.jsx: 374 lines
  src/pages/ayesha/AyeshaPatientDashboard.jsx: 459 lines
  src/pages/ayesha/AyeshaTestsUnlocks.jsx: 168 lines
  src/pages/ayesha/AyeshaTherapyFit.jsx: 275 lines
  src/pages/ayesha/AyeshaTrialExplorer.jsx: 382 lines
  src/pages/ayesha/AyeshaTrialsOnly.jsx: 158 lines
  src/pages/ayesha/AyeshaTwinDemo.jsx: 119 lines
  src/pages/ayesha/AyeshaWeaponCompatibility.jsx: 876 lines
  src/pages/ayesha/BiomarkerIntelligencePage.jsx: 236 lines
  src/pages/ayesha/IOHarmPreventionDemo.jsx: 135 lines
  src/pages/ayesha/PatientStrategyBoard.jsx: 223 lines
  src/pages/ayesha/PostDebulkingMRD.jsx: 493 lines
  src/pages/ayesha/PrognosisSentinel.jsx: 176 lines
  src/pages/ayesha/ResistanceLab.jsx: 270 lines
  src/pages/ayesha/ZetaDashboardComponents.jsx: 341 lines
  src/pages/ayesha/index.js: 17 lines
  src/pages/ayesha/phases/ArsenalDrugDetailPage.jsx: 171 lines
  src/pages/ayesha/phases/DrugDetailPage.jsx: 186 lines
  src/pages/ayesha/phases/Phase1Profile.jsx: 197 lines
  src/pages/ayesha/phases/Phase2Tests.jsx: 245 lines
  src/pages/ayesha/phases/Phase3Treatment.jsx: 172 lines
  src/pages/ayesha/phases/Phase4Monitoring.jsx: 330 lines
  src/pages/ayesha/phases/Phase5Resistance.jsx: 343 lines
  src/pages/ayesha/phases/Phase6Board.jsx: 613 lines
  src/pages/ayesha/phases/RepurposingArsenalPage.jsx: 274 lines
  src/pages/ayesha/phases/TestDetailPage.jsx: 385 lines
  src/pages/index.js: 3 lines
  src/pages/records/components/Modal.jsx: 39 lines
  src/pages/records/components/create-record-modal.jsx: 43 lines
  src/pages/records/components/file-upload-modal.jsx: 69 lines
  src/pages/records/components/loading-spinner.jsx: 24 lines
  src/pages/records/components/record-card.jsx: 24 lines
  src/pages/records/components/record-details-header.jsx: 24 lines
  src/pages/records/index.jsx: 108 lines
  src/pages/records/single-record-details.jsx: 488 lines

## ImprovedSidebar.jsx
```jsx
/**
 * ImprovedSidebar - Mobile-First Sidebar with Labels
 * 
 * Features:
 * - Desktop: Vertical sidebar with icons + labels
 * - Mobile: Hidden (use MobileNavbar instead)
 * - Clear labels for all items
 * - Proper color contrast
 * - MOAT routes only
 */

import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePersona } from "../context/PersonaContext";
import { moatNavigationItems, getNavigationForPersona } from "../constants/moatNavigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Paper,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as CareIcon,
  Science as TrialIcon,
  Description as DossierIcon,
  Biotech as ResearchIcon,
  Biotech as GenomicsIcon,
  TrendingUp as SLIcon,
  Medication as DosingIcon,
  Assessment as MetastasisIcon,
  Brightness4 as ThemeIcon,
  Person as PatientIcon,
  AccountTree as DigitalTwinIcon,
  Terminal as LabIcon,
} from '@mui/icons-material';

const iconMap = {
  'orchestrator': DashboardIcon,
  'universal-complete-care': CareIcon,
  'universal-trial-intelligence': TrialIcon,
  'universal-dossiers': DossierIcon,
  'research-intelligence': ResearchIcon,
  'clinical-genomics': GenomicsIcon,
  'synthetic-lethality': SLIcon,
  'dosing-guidance': DosingIcon,
  'metastasis': MetastasisIcon,
  // Journey phases
  'journey-snapshot': CareIcon,
  'journey-tests': TrialIcon,
  'journey-treatment': DosingIcon,
  'journey-monitoring': MetastasisIcon,
  'journey-resistance': LabIcon,
  'journey-board': DossierIcon,
  // Legacy Ayesha pages
  'ayesha-dashboard': DashboardIcon,
  'ayesha-complete-care': CareIcon,
  'ayesha-trials': TrialIcon,
  'ayesha-dossiers': DossierIcon,
  'ayesha-digital-twin': DigitalTwinIcon,
  'ayesha-resistance-lab': LabIcon,
  'ayesha-therapy-fit': DosingIcon,
  'ayesha-holistic-scoring': TrialIcon,
  'ayesha-tumor-board': DossierIcon,
  'ayesha-tests': CareIcon,
  'mutation-explorer': GenomicsIcon,
};

export const ImprovedSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  let persona = null;
  try {
    const personaContext = usePersona();
    persona = personaContext?.persona || null;
  } catch (e) {
    // PersonaContext not available, continue without filtering
  }
  const [activeItem, setActiveItem] = useState('');

  // Get filtered navigation based on persona
  // When on journey pages, ONLY show the 6 journey phases for a focused experience
  const isOnJourneyPage = location.pathname.startsWith('/ayesha/journey');
  const navItems = useMemo(() => {
    if (!user) return [];
    const allItems = getNavigationForPersona(persona);
    if (isOnJourneyPage) {
      return allItems.filter(item => item.name.startsWith('journey-'));
    }
    return allItems;
  }, [user, persona, isOnJourneyPage]);

  // Determine active route
  useEffect(() => {
    const path = location.pathname;
    const active = navItems.find(item => path === item.link || path.startsWith(item.link + '/'));
    if (active) {
      setActiveItem(active.name);
    } else {
      setActiveItem('');
    }
  }, [location.pathname, navItems]);

  // Hide on mobile (MobileNavbar handles mobile)
  if (isMobile) {
    return null;
  }

  const handleNavClick = (item) => {
    setActiveItem(item.name);
    navigate(item.link);
  };

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
      }}
    >
      {/* Logo/Brand */}
      <Box
        component={Link}
        to="/"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          textDecoration: 'none',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            fontSize: '2rem',
            lineHeight: 1,
          }}
        >
          🧬
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2 }}>
            CrisPRO
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            MOAT
          </Typography>
        </Box>
      </Box>

      {/* Navigation List */}
      <List sx={{ flex: 1, py: 1, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const IconComponent = iconMap[item.name] || DashboardIcon;
          const isActive = activeItem === item.name;

          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={item.description || item.label} placement="right" arrow>
                <ListItemButton
                  onClick={() => handleNavClick(item)}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    py: 1.5,
                    '&.Mui-selected': {
                      bgcolor: `${item.color || theme.palette.primary.main}15`,
                      color: item.color || theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: `${item.color || theme.palette.primary.main}25`,
                      },
                      '& .MuiListItemIcon-root': {
                        color: item.color || theme.palette.primary.main,
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive
                        ? (item.color || theme.palette.primary.main)
                        : 'text.secondary',
                    }}
                  >
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Theme Toggle / Footer */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            py: 1,
          }}
        >
          <ListItemIcon>
            <ThemeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Theme"
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default ImprovedSidebar;
```

## moatNavigation.js
```js
/**
 * MOAT Navigation Configuration
 * 
 * Mobile-first navigation with clear labels and proper color contrast
 * Only includes MOAT production routes
 */

import {
  apps,      // Dashboard/Orchestrator
  screening, // Medical/Care
  research,  // Research/Trials
  dna,       // Genomics/SL
  records    // Dossiers
} from "../assets";

/**
 * MOAT Navigation Items
 * 
 * These are the core production-ready capabilities
 * Each item includes:
 * - name: Unique identifier
 * - label: Display text (shown on mobile)
 * - shortLabel: Abbreviated label for compact views
 * - icon: Image URL or icon component
 * - link: Route path
 * - description: Tooltip/help text
 * - color: Theme color for active state
 */
export const moatNavigationItems = [
  {
    name: "orchestrator",
    label: "Orchestrator",
    shortLabel: "Pipeline",
    imgUrl: apps,
    link: '/orchestrator',
    description: 'Full pipeline dashboard - upload and analyze',
    color: '#6366f1', // Indigo
    tier: 'functional',
    personas: ['researcher']
  },
  {
    name: "universal-complete-care",
    label: "Complete Care",
    shortLabel: "Care",
    imgUrl: screening,
    link: '/universal-complete-care',
    description: 'Unified care orchestration',
    color: '#10b981', // Green
    tier: 'production',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "universal-trial-intelligence",
    label: "Trial Intelligence",
    shortLabel: "Trials",
    imgUrl: research,
    link: '/universal-trial-intelligence',
    description: 'Clinical trial matching',
    color: '#3b82f6', // Blue
    tier: 'production',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "universal-dossiers",
    label: "Dossiers",
    shortLabel: "Dossiers",
    imgUrl: records,
    link: '/universal-dossiers',
    description: 'Dossier management',
    color: '#8b5cf6', // Purple
    tier: 'production',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "research-intelligence",
    label: "Research",
    shortLabel: "Research",
    imgUrl: research,
    link: '/research-intelligence',
    description: 'Research orchestration',
    color: '#ec4899', // Pink
    tier: 'functional',
    personas: ['researcher']
  },
  {
    name: "clinical-genomics",
    label: "Genomics",
    shortLabel: "Genomics",
    imgUrl: dna,
    link: '/clinical-genomics',
    description: 'VCF/genomic analysis',
    color: '#f59e0b', // Amber
    tier: 'functional',
    personas: ['researcher']
  },
  {
    name: "synthetic-lethality",
    label: "Synthetic Lethality",
    shortLabel: "SL",
    imgUrl: dna,
    link: '/synthetic-lethality',
    description: 'SL analysis',
    color: '#ef4444', // Red
    tier: 'functional',
    personas: ['researcher']
  },
  {
    name: "dosing-guidance",
    label: "Dosing",
    shortLabel: "Dosing",
    imgUrl: screening,
    link: '/dosing-guidance',
    description: 'Drug dosing guidance',
    color: '#06b6d4', // Cyan
    tier: 'production',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "metastasis",
    label: "Metastasis",
    shortLabel: "Metastasis",
    imgUrl: dna,
    link: '/metastasis',
    description: 'Metastasis analysis',
    color: '#84cc16', // Lime
    tier: 'functional',
    personas: ['researcher']
  },
  {
    name: "mutation-explorer",
    label: "Mutation Explorer",
    shortLabel: "Explorer",
    imgUrl: dna,
    link: '/mutation-explorer',
    description: 'Legacy Mutation Analysis (Audit)',
    color: '#f43f5e', // Rose
    tier: 'legacy',
    personas: ['researcher']
  },
  // ══════════════════════════════════════════════════════════════════════
  // Ayesha Patient Journey — 6 Phases (patient-facing)
  // ══════════════════════════════════════════════════════════════════════
  {
    name: "journey-snapshot",
    label: "① Snapshot",
    shortLabel: "Snapshot",
    imgUrl: screening,
    link: '/ayesha/journey/profile',
    description: 'Phase 1: What do we know about you?',
    color: '#10b981', // Green
    personas: ['patient', 'oncologist', 'researcher']
  },
  {
    name: "journey-tests",
    label: "② Tests & Unlocks",
    shortLabel: "Tests",
    imgUrl: research,
    link: '/ayesha/journey/tests',
    description: 'Phase 2: What should we test next?',
    color: '#3b82f6', // Blue
    personas: ['patient', 'oncologist', 'researcher']
  },
  {
    name: "journey-treatment",
    label: "③ Treatment Fit",
    shortLabel: "Treatment",
    imgUrl: dna,
    link: '/ayesha/journey/treatment',
    description: 'Phase 3: What treatments fit me today?',
    color: '#8b5cf6', // Purple
    personas: ['patient', 'oncologist', 'researcher']
  },
  {
    name: "journey-monitoring",
    label: "④ Monitoring",
    shortLabel: "Monitor",
    imgUrl: screening,
    link: '/ayesha/journey/monitoring',
    description: 'Phase 4: How will we know if it\'s working?',
    color: '#0ea5e9', // Sky
    personas: ['patient', 'oncologist', 'researcher']
  },
  {
    name: "journey-resistance",
    label: "⑤ Resistance",
    shortLabel: "Resistance",
    imgUrl: dna,
    link: '/ayesha/journey/resistance',
    description: 'Phase 5: If it stops working, what\'s next?',
    color: '#f59e0b', // Amber
    personas: ['patient', 'oncologist', 'researcher']
  },
  {
    name: "journey-board",
    label: "⑥ Tumor Board",
    shortLabel: "Board",
    imgUrl: records,
    link: '/ayesha/journey/board',
    description: 'Phase 6: Bring it to your doctor',
    color: '#ec4899', // Pink
    personas: ['patient', 'oncologist', 'researcher']
  },
  // ══════════════════════════════════════════════════════════════════════
  // Legacy Ayesha Pages (advanced / oncologist views)
  // All original routes still work — these provide direct access
  // ══════════════════════════════════════════════════════════════════════
  {
    name: "ayesha-complete-care",
    label: "Care (Legacy)",
    shortLabel: "Care",
    imgUrl: screening,
    link: '/ayesha-complete-care',
    description: 'Complete care plan — legacy view',
    color: '#10b981',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "ayesha-trials",
    label: "360° (Legacy)",
    shortLabel: "360°",
    imgUrl: apps,
    link: '/ayesha-trials',
    description: '360° dashboard — legacy view',
    color: '#3b82f6',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "ayesha-resistance-lab",
    label: "Lab (Legacy)",
    shortLabel: "Lab",
    imgUrl: dna,
    link: '/resistance-lab',
    description: 'Resistance Lab — legacy standalone',
    color: '#4fd1c5',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "ayesha-therapy-fit",
    label: "Therapy Fit (Legacy)",
    shortLabel: "Therapy",
    imgUrl: dna,
    link: '/ayesha/therapy-fit',
    description: 'Therapy matching — legacy view',
    color: '#84cc16',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "ayesha-tumor-board",
    label: "Board (Legacy)",
    shortLabel: "Board",
    imgUrl: records,
    link: '/ayesha/tumor-board',
    description: 'Strategy board — legacy view',
    color: '#0ea5e9',
    personas: ['oncologist', 'researcher']
  },
  {
    name: "ayesha-sandbox",
    label: "Sandbox (Proof)",
    shortLabel: "Sandbox",
    imgUrl: dna,
    link: '/ayesha/sandbox',
    description: 'Agentic Trial Failure Proof Sandbox',
    color: '#eab308',
    personas: ['oncologist', 'researcher', 'patient']
  },
  {
    name: "medical-records",
    label: "Patient Records",
    shortLabel: "Records",
    imgUrl: records,
    link: '/medical-records',
    description: 'Electronic Health Records',
    color: '#64748b', // Slate
    personas: ['oncologist', 'researcher']
  },
  {
    name: "outreach",
    label: "Outreach",
    shortLabel: "Outreach",
    imgUrl: research,
    link: '/outreach',
    description: 'Personalized email generation for doctors',
    color: '#8b5cf6', // Purple
    personas: ['oncologist', 'researcher']
  },
];

/**
 * Get navigation items filtered by persona
 */
export const getNavigationForPersona = (persona) => {
  // Default to 'patient' persona — patients only see the 6 journey phases
  const effectivePersona = persona || 'patient';
  return moatNavigationItems.filter(item =>
    !item.personas || item.personas.includes(effectivePersona)
  );
};

/**
 * Navigation item labels mapping (for backward compatibility)
 */
export const getNavigationLabel = (name) => {
  const item = moatNavigationItems.find(nav => nav.name === name);
  return item?.label || name.charAt(0).toUpperCase() + name.slice(1);
};
```

## PatientOnboarding.jsx
```jsx
/**
 * Patient Onboarding Page
 * 
 * Collect required patient information for initial profile setup.
 * Enhanced with optional biomarkers and sporadic gates intake level display.
 * 
 * Following PERSONA_ACCESS_QUICK_START.md patterns:
 * - Persona: patient (or oncologist helping a patient)
 * - Access: Patient and Oncologist personas (route-level protection via PersonaRoute)
 * - Uses persona context for consistency with other onboarding flows
 */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';
import InfoIcon from '@mui/icons-material/Info';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatient } from '../context/PatientContext';
import { usePersona } from '../context/PersonaContext';
import { API_ROOT } from '../lib/apiConfig';


/**
 * Patient Onboarding Page
 * 
 * Collect required patient information for initial profile setup.
 * Enhanced with optional biomarkers and sporadic gates intake level display.
 * 
 * Following PERSONA_ACCESS_QUICK_START.md patterns:
 * - Persona: patient (or oncologist helping a patient)
 * - Access: Patient and Oncologist personas (route-level protection via PersonaRoute)
 * - Uses persona context for consistency
 */
export default function PatientOnboarding() {
  const { user, session } = useAuth();
  const { loadPatientContext } = usePatient();
  const { persona, isPatient, isOncologist } = usePersona();
  const navigate = useNavigate();
  
  // Persona access check - only patient or oncologist persona can access
  React.useEffect(() => {
    if (persona && !isPatient && !isOncologist) {
      navigate('/home');
    }
  }, [persona, isPatient, isOncologist, navigate]);
  
  const [formData, setFormData] = useState({
    full_name: '',
    disease: 'ovarian_cancer_hgs',
    stage: 'IVB',
    ca125_value: '',
    germline_status: 'negative',
    treatment_line: '0',
    location_state: 'NY',
    location_city: 'NYC Metro',
    // Optional biomarkers (for L0/L1/L2 intake level)
    tmb: '',
    msi_status: '',
    hrd_score: '',
    platinum_response: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!session?.access_token) {
      setError('Not authenticated. Please log in first.');
      setLoading(false);
      return;
    }

    try {
      // Build request body with optional biomarkers
      const requestBody = {
        full_name: formData.full_name,
        disease: formData.disease,
        stage: formData.stage,
        ca125_value: formData.ca125_value ? parseFloat(formData.ca125_value) : null,
        germline_status: formData.germline_status,
        treatment_line: parseInt(formData.treatment_line) || 0,
        location_state: formData.location_state,
        location_city: formData.location_city,
        // Optional biomarkers (only include if provided)
        ...(formData.tmb && { tmb: parseFloat(formData.tmb) }),
        ...(formData.msi_status && { msi_status: formData.msi_status }),
        ...(formData.hrd_score && { hrd_score: parseFloat(formData.hrd_score) }),
        ...(formData.platinum_response && ['ovarian_cancer_hgs', 'ovarian_cancer_lgs', 'breast_cancer'].includes(formData.disease) && { platinum_response: formData.platinum_response })
      };

      const response = await fetch(`${API_ROOT}/api/patient/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }));
        throw new Error(errorData.detail || 'Failed to create profile');
      }

      const data = await response.json();
      
      // Store completion data (intake level, recommendations)
      setCompletionData({
        intake_level: data.intake_level || 'L0',
        confidence_cap: data.confidence_cap || 0.4,
        recommendations: data.recommendations || []
      });

      // Reload patient context
      if (loadPatientContext) {
        await loadPatientContext();
      }

      // Show completion screen instead of redirecting
      setShowCompletion(true);
    } catch (err) {
      setError(err.message || 'Failed to create patient profile');
    } finally {
      setLoading(false);
    }
  };

  const getIntakeLevelColor = (level) => {
    if (level === 'L2') return 'success';
    if (level === 'L1') return 'warning';
    return 'error';
  };

  const getIntakeLevelLabel = (level) => {
    if (level === 'L2') return 'L2 - Full Data';
    if (level === 'L1') return 'L1 - Partial Data';
    return 'L0 - Minimal Data';
  };

  const getIntakeLevelExplanation = (level) => {
    if (level === 'L2') {
      return 'You have full biomarker data available (mutations + biomarkers). This enables the highest confidence predictions (up to 80% confidence cap).';
    }
    if (level === 'L1') {
      return 'You have partial biomarker data (either mutations OR biomarkers, but not both). This enables moderate confidence predictions (up to 60% confidence cap).';
    }
    return 'You have minimal data (disease priors only). We can still provide value using disease statistics, but confidence is capped at 40%. Order biomarker tests to unlock higher confidence predictions.';
  };

  // Completion Screen
  if (showCompletion && completionData) {
    return (
      <Box sx={{ p: 3, maxWidth: '900px', mx: 'auto' }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4" gutterBottom>
                Profile Created Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your patient profile has been set up. Here's your data completeness level.
              </Typography>
            </Box>
          </Box>

          {/* Intake Level Badge */}
          <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Your Intake Level:
                </Typography>
                <Chip
                  label={getIntakeLevelLabel(completionData.intake_level)}
                  color={getIntakeLevelColor(completionData.intake_level)}
                  size="large"
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Confidence Cap: {Math.round((completionData.confidence_cap || 0.4) * 100)}%
              </Typography>
            </CardContent>
          </Card>

          {/* What Does This Mean? Accordion */}
          <Accordion sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  What does this intake level mean?
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {getIntakeLevelExplanation(completionData.intake_level)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Why confidence caps?</strong> We use conservative confidence limits to ensure safety. 
                As you add more biomarker data, confidence caps increase, allowing more precise predictions.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Next Test Recommendations */}
          {completionData.recommendations && completionData.recommendations.length > 0 && (
            <Card sx={{ mb: 3, bgcolor: 'primary.50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ScienceIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Recommended Next Tests
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Order these tests to unlock higher confidence predictions:
                </Typography>
                <List>
                  {completionData.recommendations.map((rec, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <ArrowForwardIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => setShowCompletion(false)}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/ayesha-complete-care')}
              startIcon={<LocalHospitalIcon />}
            >
              Continue to Care Plan
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // Main Onboarding Form
  return (
    <Box sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Onboarding
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please provide your basic information to get started. We'll use disease priors to generate 
          treatment recommendations even without full biomarker data.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name (Optional)"
                value={formData.full_name}
                onChange={handleChange('full_name')}
                placeholder="Ayesha Kiani"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Disease Type"
                value={formData.disease}
                onChange={handleChange('disease')}
                required
              >
                <MenuItem value="ovarian_cancer_hgs">Ovarian Cancer (HGS)</MenuItem>
                <MenuItem value="ovarian_cancer_lgs">Ovarian Cancer (LGS)</MenuItem>
                <MenuItem value="breast_cancer">Breast Cancer</MenuItem>
                <MenuItem value="lung_cancer">Lung Cancer</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stage"
                value={formData.stage}
                onChange={handleChange('stage')}
              required
                placeholder="IVB"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="CA-125 Value (U/mL)"
                value={formData.ca125_value}
                onChange={handleChange('ca125_value')}
                placeholder="2842"
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Germline Status"
                value={formData.germline_status}
                onChange={handleChange('germline_status')}
                required
              >
                <MenuItem value="positive">Positive</MenuItem>
                <MenuItem value="negative">Negative</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Treatment Line"
                value={formData.treatment_line}
                onChange={handleChange('treatment_line')}
              required
                inputProps={{ min: 0 }}
                helperText="0 = treatment-naive"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="State"
                value={formData.location_state}
                onChange={handleChange('location_state')}
                placeholder="NY"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                value={formData.location_city}
                onChange={handleChange('location_city')}
                placeholder="NYC Metro"
              />
            </Grid>

            {/* Optional Biomarkers Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScienceIcon color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Optional Biomarkers (Skip if you don't have these yet)
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    If you have biomarker test results, enter them here to unlock higher confidence predictions. 
                    If you don't have these yet, that's okay! We can still provide value using disease priors.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="TMB (mutations per megabase)"
                        value={formData.tmb}
                        onChange={handleChange('tmb')}
                        placeholder="e.g., 5.2"
                        inputProps={{ min: 0, step: 0.1 }}
                        helperText="Tumor mutational burden"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        select
                        label="MSI Status"
                        value={formData.msi_status}
                        onChange={handleChange('msi_status')}
                      >
                        <MenuItem value="">Not specified</MenuItem>
                        <MenuItem value="MSI-H">MSI-High</MenuItem>
                        <MenuItem value="MSS">MSS (Microsatellite Stable)</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="HRD Score"
                        value={formData.hrd_score}
                        onChange={handleChange('hrd_score')}
                        placeholder="e.g., 42"
                        inputProps={{ min: 0, max: 100 }}
                        helperText="HRD score (0-100, ≥42 = HRD-high)"
                      />
                    </Grid>

                    {['ovarian_cancer_hgs', 'ovarian_cancer_lgs', 'breast_cancer'].includes(formData.disease) && (
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          select
                          label="Platinum Response (Optional)"
                          value={formData.platinum_response}
                          onChange={handleChange('platinum_response')}
                        >
                          <MenuItem value="">Not specified</MenuItem>
                          <MenuItem value="sensitive">Platinum-sensitive</MenuItem>
                          <MenuItem value="resistant">Platinum-resistant</MenuItem>
                          <MenuItem value="refractory">Platinum-refractory</MenuItem>
                        </TextField>
                      </Grid>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Submit Buttons */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
              type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                >
                  {loading ? 'Creating Profile...' : 'Create Profile'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
```

## DoctorOnboarding.jsx
```jsx
/**
 * Oncologist/Clinician Onboarding Page
 * 
 * Collect required oncologist information for initial profile setup.
 * Uses persona-based access control (oncologist persona).
 * 
 * Following PERSONA_ACCESS_QUICK_START.md patterns:
 * - Persona: oncologist (maps from role: 'clinician')
 * - Access: Oncologist persona only
 * - Stores: Professional info in user_profiles or metadata
 */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
  Divider,
  Chip,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePersona } from '../context/PersonaContext';
import { API_ROOT } from '../lib/apiConfig';


const CANCER_TYPES = [
  'Ovarian Cancer',
  'Breast Cancer',
  'Lung Cancer',
  'Colorectal Cancer',
  'Prostate Cancer',
  'Pancreatic Cancer',
  'Liver Cancer',
  'Kidney Cancer',
  'Bladder Cancer',
  'Leukemia',
  'Lymphoma',
  'Multiple Myeloma',
  'Melanoma',
  'Brain Cancer',
  'Other'
];

const RESEARCH_INTERESTS_OPTIONS = [
  'PARP inhibitors',
  'IO therapy',
  'Precision medicine',
  'Targeted therapy',
  'CAR-T therapy',
  'Biomarker discovery',
  'Clinical trials',
  'Resistance mechanisms',
  'Combinatorial therapies',
  'Early detection',
  'Other'
];

function OncologistOnboarding() {
  const { user, session } = useAuth();
  const { persona, isOncologist } = usePersona();
  const navigate = useNavigate();
  
  // Persona access check - only oncologist persona can access
  React.useEffect(() => {
    if (persona && !isOncologist) {
      navigate('/home');
    }
  }, [persona, isOncologist, navigate]);
  
  const [formData, setFormData] = useState({
    full_name: '',
    specialty: '',
    sub_specialty: '',
    npi: '',
    license_number: '',
    license_state: '',
    institution_name: '',
    institution_type: '',
    institution_city: '',
    institution_state: '',
    primary_cancer_types: [],
    clinical_trials_enrollment: false,
    research_interests: [],
    preferred_communication: 'email'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleChange = (field) => (e) => {
    if (field === 'clinical_trials_enrollment') {
      setFormData({ ...formData, [field]: e.target.checked });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!session?.access_token) {
      setError('Not authenticated. Please log in first.');
      setLoading(false);
      return;
    }

    try {
      // Store professional info via doctor profile endpoint
      const response = await fetch(`${API_ROOT}/api/doctor/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          specialty: formData.specialty,
          sub_specialty: formData.sub_specialty || null,
          npi: formData.npi || null,
          license_number: formData.license_number || null,
          license_state: formData.license_state || null,
          institution_name: formData.institution_name,
          institution_type: formData.institution_type || null,
          institution_city: formData.institution_city || null,
          institution_state: formData.institution_state || null,
          primary_cancer_types: formData.primary_cancer_types,
          clinical_trials_enrollment: formData.clinical_trials_enrollment,
          research_interests: formData.research_interests,
          preferred_communication: formData.preferred_communication
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }));
        throw new Error(errorData.detail || 'Failed to create profile');
      }

      const data = await response.json();
      
      // Show completion screen
      setShowCompletion(true);
    } catch (err) {
      setError(err.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  // Completion Screen
  if (showCompletion) {
    return (
      <Box sx={{ p: 3, maxWidth: '900px', mx: 'auto' }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4" gutterBottom>
                Profile Created Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your doctor profile has been set up. You can now access clinical features.
              </Typography>
            </Box>
          </Box>

          <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Welcome, {formData.full_name || 'Doctor'}!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your profile has been configured with the following information:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.specialty && (
                  <Chip label={`Specialty: ${formData.specialty}`} size="small" />
                )}
                {formData.institution_name && (
                  <Chip label={`Institution: ${formData.institution_name}`} size="small" />
                )}
                {formData.primary_cancer_types.length > 0 && (
                  <Chip 
                    label={`${formData.primary_cancer_types.length} Cancer Type(s)`} 
                    size="small" 
                  />
                )}
                {formData.clinical_trials_enrollment && (
                  <Chip label="Clinical Trials Enrollment" color="primary" size="small" />
                )}
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => setShowCompletion(false)}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/universal-complete-care')}
              disabled={!isOncologist}
              startIcon={<LocalHospitalIcon />}
            >
              Continue to Clinical Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // Main Onboarding Form
  return (
    <Box sx={{ p: 3, maxWidth: '900px', mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Oncologist Onboarding
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please provide your professional information to get started. This helps us personalize your clinical experience and enable access to MOAT clinical features.
        </Typography>
        
        {persona && !isOncologist && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            This page is only accessible to oncologist persona. Your current persona: {persona}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Professional Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.full_name}
                onChange={handleChange('full_name')}
                required
                placeholder="Dr. Jane Smith"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Medical Specialty"
                value={formData.specialty}
                onChange={handleChange('specialty')}
                required
              >
                <MenuItem value="Medical Oncology">Medical Oncology</MenuItem>
                <MenuItem value="Gynecologic Oncology">Gynecologic Oncology</MenuItem>
                <MenuItem value="Hematology/Oncology">Hematology/Oncology</MenuItem>
                <MenuItem value="Radiation Oncology">Radiation Oncology</MenuItem>
                <MenuItem value="Surgical Oncology">Surgical Oncology</MenuItem>
                <MenuItem value="Pediatric Oncology">Pediatric Oncology</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sub-Specialty (Optional)"
                value={formData.sub_specialty}
                onChange={handleChange('sub_specialty')}
                placeholder="e.g., Breast Cancer, Gynecologic Oncology"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NPI (Optional)"
                value={formData.npi}
                onChange={handleChange('npi')}
                placeholder="10-digit NPI"
                inputProps={{ maxLength: 10 }}
                helperText="National Provider Identifier (10 digits)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Medical License Number (Optional)"
                value={formData.license_number}
                onChange={handleChange('license_number')}
                placeholder="MD12345"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="License State (Optional)"
                value={formData.license_state}
                onChange={handleChange('license_state')}
                placeholder="NY"
                inputProps={{ maxLength: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Institution/Organization
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Institution Name"
                value={formData.institution_name}
                onChange={handleChange('institution_name')}
                required
                placeholder="Memorial Sloan Kettering Cancer Center"
                InputProps={{
                  startAdornment: <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Institution Type"
                value={formData.institution_type}
                onChange={handleChange('institution_type')}
              >
                <MenuItem value="">Not specified</MenuItem>
                <MenuItem value="Academic">Academic Medical Center</MenuItem>
                <MenuItem value="Community">Community Hospital</MenuItem>
                <MenuItem value="Private Practice">Private Practice</MenuItem>
                <MenuItem value="Research Institute">Research Institute</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.institution_city}
                onChange={handleChange('institution_city')}
                placeholder="New York"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="State"
                value={formData.institution_state}
                onChange={handleChange('institution_state')}
                placeholder="NY"
                inputProps={{ maxLength: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Clinical Focus
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={CANCER_TYPES}
                value={formData.primary_cancer_types}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, primary_cancer_types: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Primary Cancer Types Treated"
                    placeholder="Select cancer types"
                    helperText="Select all cancer types you primarily treat"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.clinical_trials_enrollment}
                    onChange={handleChange('clinical_trials_enrollment')}
                    color="primary"
                  />
                }
                label="I enroll patients in clinical trials"
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={RESEARCH_INTERESTS_OPTIONS}
                value={formData.research_interests}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, research_interests: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Research Interests (Optional)"
                    placeholder="Select research interests"
                    helperText="Select areas of research interest"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Preferences
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Preferred Communication Method"
                value={formData.preferred_communication}
                onChange={handleChange('preferred_communication')}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="sms">SMS</MenuItem>
                <MenuItem value="both">Email + SMS</MenuItem>
                <MenuItem value="none">No notifications</MenuItem>
              </TextField>
            </Grid>

            {/* Submit Buttons */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                >
                  {loading ? 'Creating Profile...' : 'Create Profile'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default OncologistOnboarding;
```

## AyeshaPatientDashboard.jsx
```jsx
/**
 * Ayesha Patient Dashboard - Beautiful, Modular Landing Page
 * 
 * When Ayesha logs in, this is her main dashboard showing:
 * - Patient Journey Timeline (diagnosis → tests → treatments)
 * - Quick Profile Summary (biomarkers, stage, status)
 * - Quick Actions (navigate to trials, treatment, monitoring)
 * - Key Insights (DDR Status, SOC, Next Steps) - collapsible cards
 * - Personalized Recommendations (Drug + Food) [NEW]
 * 
 * NO NESTED TABS - All navigation via sidebar
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Collapse,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Science as ScienceIcon,
  LocalHospital as LocalHospitalIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import hooks (single source of truth)
import { useAyeshaProfile } from '../../hooks/ayesha/useAyeshaProfile';
import { useAyeshaCareData } from '../../hooks/ayesha/useAyeshaCareData';

// Import existing components
import PatientJourneyEnhanced from '../../components/patient/PatientJourneyEnhanced';
import CA125Tracker from '../../components/ayesha/CA125Tracker';
import SOCRecommendationCard from '../../components/ayesha/SOCRecommendationCard';
import { API_ROOT } from '../../lib/apiConfig';
import NextTestCard from '../../components/ayesha/NextTestCard';
import { DDRStatusCard } from '../../components/ddr';
import { useDDRStatus } from '../../hooks/useDDRStatus';
import {
  FoodRecommendationsCard,
  DrugRecommendationsCard
} from '../../components/ayesha/twin';
import { useAyeshaTherapyFitBundle } from '../../hooks/useAyeshaTherapyFitBundle';
import WeeklyStrategyLoop from '../../components/ayesha/WeeklyStrategyLoop';


// Styled components for beautiful UI
const DashboardHeader = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.95) 0%, rgba(0, 40, 80, 0.95) 100%)',
  color: '#ffffff',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  border: '2px solid rgba(0, 255, 127, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 255, 127, 0.2)',
}));

const InsightCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: '1px solid rgba(0, 255, 127, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 255, 127, 0.15)',
    borderColor: 'rgba(0, 255, 127, 0.4)',
  },
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 191, 255, 0.1))',
  border: '1px solid rgba(0, 255, 127, 0.3)',
  color: '#00ff7f',
  padding: theme.spacing(1.5, 3),
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.2), rgba(0, 191, 255, 0.2))',
    borderColor: 'rgba(0, 255, 127, 0.5)',
    transform: 'translateY(-2px)',
  },
}));

const AyeshaPatientDashboard = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({
    ddr: false,
    soc: false,
    nextSteps: false,
    ca125: false,
  });

  // Use hooks - single source of truth
  const { profile, patient, disease, tumorContext, germline, labs, biomarkerChips, getDDRMutations } = useAyeshaProfile();
  const { result: careData, loading, error } = useAyeshaCareData({
    include_trials: false,
    include_wiwfm: true, // Enabled for dashboard
    include_food: true,   // Enabled for dashboard
    include_resistance: false,
    include_soc: true,
    include_ca125: true,
    include_biomarker: true,
  });

  // TherapyFit bundle for Weekly Strategy Loop stepper (parallel data source)
  const { data: therapyBundle, isLoading: tbLoading, error: tbError } = useAyeshaTherapyFitBundle({ level: 'l1' });

  // DDR Status
  const { ddrStatus, loading: ddrLoading, calculateDDRStatus } = useDDRStatus();
  const ddrCalculationInitiated = React.useRef(false);

  // Toggle card expansion
  const handleToggleCard = (cardName) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  // DDR Status calculation (only once)
  useEffect(() => {
    if (ddrStatus || ddrLoading || ddrCalculationInitiated.current) return;

    const mutations = getDDRMutations();

    if (mutations.length > 0) {
      ddrCalculationInitiated.current = true;
      calculateDDRStatus({
        patient_id: patient?.patient_id || 'AK',
        disease_site: 'ovary',
        tumor_subtype: 'HGSOC',
        mutations,
      }).catch((err) => {
        console.error('[DDR] Failed to compute:', err);
        // Keep ddrCalculationInitiated true — resetting caused unbounded POST retries on failure.
      });
    }
  }, [getDDRMutations, patient, calculateDDRStatus, ddrStatus, ddrLoading]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Failed to load dashboard: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Beautiful Header */}
      <DashboardHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <ScienceIcon sx={{ fontSize: 48, color: '#00ff7f', filter: 'drop-shadow(0 0 10px rgba(0, 255, 127, 0.8))' }} />
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
              Welcome back, {patient?.display_name || 'Ayesha'}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Your personalized precision oncology dashboard
            </Typography>
          </Box>
        </Box>

        {/* Biomarker Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {biomarkerChips.map((chip, idx) => (
            <Chip
              key={idx}
              label={chip.label}
              color={chip.color}
              size="small"
              sx={{
                background: chip.color === 'error' ? 'rgba(211, 47, 47, 0.2)' : 'rgba(0, 255, 127, 0.1)',
                border: `1px solid ${chip.color === 'error' ? 'rgba(211, 47, 47, 0.5)' : 'rgba(0, 255, 127, 0.3)'}`,
                color: '#ffffff',
              }}
            />
          ))}
        </Box>
      </DashboardHeader>

      {/* Weekly Strategy Loop — Measure → Detect → Decide → Act */}
      <WeeklyStrategyLoop
        bundle={therapyBundle}
        bundleLoading={tbLoading}
        bundleError={tbError}
      />

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon sx={{ color: '#00ff7f' }} />
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              fullWidth
              startIcon={<ScienceIcon />}
              onClick={() => navigate('/ayesha-trials/explore')}
            >
              Clinical Trials
            </QuickActionButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              fullWidth
              startIcon={<LocalHospitalIcon />}
              onClick={() => navigate('/ayesha-complete-care')}
            >
              Complete Care Plan
            </QuickActionButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              fullWidth
              startIcon={<VisibilityIcon />}
              onClick={() => navigate('/ayesha-dossiers')}
            >
              Trial Dossiers
            </QuickActionButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              fullWidth
              startIcon={<TimelineIcon />}
              onClick={() => {
                // Scroll to timeline section
                document.getElementById('patient-journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Journey
            </QuickActionButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Key Insights - Collapsible Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* DDR Status Card */}
        <Grid item xs={12} md={6}>
          <InsightCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  🧬 DDR Status & PARP Eligibility
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleToggleCard('ddr')}
                  sx={{ color: '#00ff7f' }}
                >
                  {expandedCards.ddr ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              {ddrLoading ? (
                <Box display="flex" alignItems="center" gap={2}>
                  <CircularProgress size={20} />
                  <Typography variant="body2">Computing DDR status...</Typography>
                </Box>
              ) : ddrStatus ? (
                <>
                  <DDRStatusCard ddrStatus={ddrStatus} />
                  <Collapse in={expandedCards.ddr}>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        DDR (DNA Damage Response) status determines PARP inhibitor eligibility.
                        High DDR burden indicates synthetic lethality opportunities.
                      </Typography>
                    </Box>
                  </Collapse>
                </>
              ) : (
                <Alert severity="info" sx={{ mt: 1 }}>
                  DDR status requires genomic mutation data. MBD4 frameshift detected — computing status…
                </Alert>
              )}
            </CardContent>
          </InsightCard>
        </Grid>

        {/* SOC Recommendation Card */}
        {careData?.soc_recommendation && (
          <Grid item xs={12} md={6}>
            <InsightCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    💊 Standard of Care
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleCard('soc')}
                    sx={{ color: '#00ff7f' }}
                  >
                    {expandedCards.soc ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={expandedCards.soc || true}>
                  <SOCRecommendationCard {...careData.soc_recommendation} />
                </Collapse>
              </CardContent>
            </InsightCard>
          </Grid>
        )}

        {/* Next Steps Card */}
        {careData?.next_test_recommender && (
          <Grid item xs={12} md={6}>
            <InsightCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📋 Recommended Next Steps
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleCard('nextSteps')}
                    sx={{ color: '#00ff7f' }}
                  >
                    {expandedCards.nextSteps ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={expandedCards.nextSteps || true}>
                  <NextTestCard recommendations={careData.next_test_recommender?.recommendations || []} />
                </Collapse>
              </CardContent>
            </InsightCard>
          </Grid>
        )}

        {/* CA-125 Monitoring Card */}
        {careData?.ca125_intelligence && (
          <Grid item xs={12} md={6}>
            <InsightCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📊 CA-125 Monitoring
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleCard('ca125')}
                    sx={{ color: '#00ff7f' }}
                  >
                    {expandedCards.ca125 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Collapse in={expandedCards.ca125 || true}>
                  <CA125Tracker {...careData.ca125_intelligence} />
                </Collapse>
              </CardContent>
            </InsightCard>
          </Grid>
        )}

        {/* CA-125 Safety Alerts — from complete_care_v2 safety_alerts field */}
        {careData?.safety_alerts?.length > 0 && (
          <Grid item xs={12}>
            {careData.safety_alerts.map((safetyAlert, idx) => (
              <Alert
                key={safetyAlert.alert_type || idx}
                severity={safetyAlert.severity === 'warning' ? 'warning' : 'info'}
                sx={{ mb: 1, borderRadius: '8px', fontSize: '0.85rem' }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {safetyAlert.message}
                </Typography>
                {safetyAlert.detail && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                    {safetyAlert.detail}
                  </Typography>
                )}
                {safetyAlert.ruo_disclaimer && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.25, fontStyle: 'italic', color: 'text.disabled' }}>
                    {safetyAlert.ruo_disclaimer}
                  </Typography>
                )}
              </Alert>
            ))}
          </Grid>
        )}

        {/* Drug Recommendations (Personalized) */}
        {careData?.wiwfm?.drugs && (
          <Grid item xs={12} md={6}>
            <DrugRecommendationsCard drugRecommendations={careData.wiwfm.drugs} />
          </Grid>
        )}

        {/* Food Recommendations (Symptom Mgmt) */}
        {careData?.food_recommendations && (
          <Grid item xs={12} md={6}>
            <FoodRecommendationsCard
              foodRecommendations={careData.food_recommendations}
              analysisSummary={careData.summary || {}}
            />
          </Grid>
        )}
      </Grid>

      {/* Patient Journey Timeline - Main Feature */}
      <Paper
        id="patient-journey"
        sx={{
          p: 4,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.02), rgba(0, 40, 80, 0.02))',
          border: '1px solid rgba(0, 255, 127, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimelineIcon sx={{ color: '#00ff7f' }} />
          Your Journey
        </Typography>
        <PatientJourneyEnhanced patientProfile={profile} />
      </Paper>

      {/* RUO Disclaimer */}
      <Alert severity="info" sx={{ mt: 4, borderRadius: '8px' }}>
        <Typography variant="body2">
          <strong>Research Use Only (RUO):</strong> This tool is for research purposes only. All recommendations
          should be reviewed by a qualified oncologist before making treatment decisions.
        </Typography>
      </Alert>
    </Container>
  );
};

export default AyeshaPatientDashboard;
```

## PatientStrategyBoard.jsx
```jsx

import React, { useMemo, useState } from 'react';
import { Container, Grid, Box, Chip, Alert, CircularProgress, Typography, Tabs, Tab } from '@mui/material';
import { useTumorBoardBundle } from '../../hooks/useTumorBoardBundle';
import { useAyeshaScenarios } from '../../hooks/useAyeshaTherapyFitBundle';
import DrugRankingPanel from '../../components/ayesha/DrugRankingPanel';

// Tumor Board Components
import BoardHeader from '../../components/ayesha/tumor-board/BoardHeader';
import IntelligencePanel from '../../components/ayesha/tumor-board/IntelligencePanel';
import SimulationControl from '../../components/ayesha/tumor-board/SimulationControl';
import OpportunityPanel from '../../components/ayesha/tumor-board/OpportunityPanel';
import EvidenceVault from '../../components/ayesha/tumor-board/EvidenceVault';

function safeArray(v) { return Array.isArray(v) ? v : []; }
function safeObj(v) { return v && typeof v === 'object' ? v : {}; }

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PatientStrategyBoard() {
  // State Management
  const [level, setLevel] = useState('l1');
  const [scenarioId, setScenarioId] = useState(null);
  const [l3ScenarioId, setL3ScenarioId] = useState(null);
  const [efficacyMode] = useState('comprehensive');
  const [activeTab, setActiveTab] = useState(0);

  // Data Fetching
  const { data: scenariosData, isLoading: scenariosLoading, error: scenariosError } = useAyeshaScenarios();
  const { data: bundle, isLoading: bundleLoading, error: bundleError } = useTumorBoardBundle({
    level,
    scenarioId,
    l3ScenarioId,
    includeSyntheticLethality: true,
    efficacyMode,
  });

  // Data Transformation
  const levelsObj = safeObj(bundle?.levels);
  const activeKey = String(level || 'l1').toUpperCase();
  const activeLevelData = safeObj(levelsObj?.[activeKey]);

  const completeness = safeObj(activeLevelData?.completeness);
  const missing = safeArray(completeness?.missing);
  const drugs = safeArray(activeLevelData?.efficacy?.drugs);
  const slPayload = activeLevelData?.synthetic_lethality;
  const resistanceGate = activeLevelData?.resistance_gate;
  const rssResult = activeLevelData?.rss; // { rss, rs_high, confidence, triggers } | null
  const testsNeeded = useMemo(() => safeArray(bundle?.tests_needed), [bundle]);
  const isPreview = Boolean(activeLevelData?.is_preview);

  const l2Scenarios = useMemo(() => safeArray(scenariosData?.l2_scenarios), [scenariosData]);
  const l3Scenarios = useMemo(() => safeArray(scenariosData?.l3_scenarios), [scenariosData]);

  const headerMeta = useMemo(() => ({
    patient_id: bundle?.patient_id || '—',
    contract_version: bundle?.contract_version || bundle?.contractVersion || '—',
    generated_at: bundle?.generated_at || bundle?.generatedAt,
    requested_levels: safeArray(bundle?.requested_levels),
    run_id: activeLevelData?.efficacy?.provenance?.run_id,
    efficacy_mode: efficacyMode,
  }), [bundle, activeLevelData, efficacyMode]);

  // Handlers
  const handleSelectL1 = () => { setLevel('l1'); setScenarioId(null); setL3ScenarioId(null); };
  const handleRunL2 = (sid) => { setLevel('l2'); setScenarioId(sid); setL3ScenarioId(null); };
  const handleRunL3 = (l2BaseId, l3Id) => { setLevel('l3'); setScenarioId(l2BaseId); setL3ScenarioId(l3Id); };

  if (bundleError || scenariosError) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Tumor Board — Offline</Typography>
        {bundleError && <Alert severity="error" sx={{ mb: 2 }}>Bundle Error: {bundleError.message}</Alert>}
        {scenariosError && <Alert severity="warning">Scenario Error: {scenariosError.message}</Alert>}
      </Container>
    )
  }

  if (bundleLoading || scenariosLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 4 }} />
          <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 600 }}>Loading Tumor Board...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="2xl">

        {/* 1. Header */}
        <BoardHeader metadata={headerMeta} isPreview={isPreview} rawBundle={bundle} title="Tumor Board" />

        {/* 2. Top Controls */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <IntelligencePanel completeness={completeness} missing={missing} />
            {/* RS classification badge — shown when backend returns rss data */}
            {rssResult?.rss != null && (
              <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={rssResult.rs_high ? 'RS-High' : 'RS-Low'}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    bgcolor: rssResult.rs_high ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                    color: rssResult.rs_high ? '#f59e0b' : '#818cf8',
                    border: `1px solid ${rssResult.rs_high ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)'}`,
                  }}
                />
                <Typography variant="caption" sx={{ color: '#475569', fontSize: '0.65rem' }}>
                  rss={rssResult.rss?.toFixed(2)} · {rssResult.confidence}
                  {rssResult.triggers?.length > 0 && ` · ${rssResult.triggers.join(', ')}`}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <SimulationControl
              level={level}
              onSelectL1={handleSelectL1}
              onSelectL2={handleRunL2}
              onSelectL3={handleRunL3}
              scenarioId={scenarioId}
              l3ScenarioId={l3ScenarioId}
            />
          </Grid>
        </Grid>

        {/* 3. Tabbed Content */}
        <Box sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              bgcolor: '#f8fafc',
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 2, pt: 1,
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.95rem',
                minHeight: 48,
                '&.Mui-selected': { color: 'primary.main' },
              },
              '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3 },
            }}
          >
            <Tab label={`Strategy (${drugs.length} drugs)`} />
            <Tab label="Opportunity" />
            <Tab label="Evidence" />
          </Tabs>

          {/* Tab 1: Strategy — Drug Rankings */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ px: 2, pb: 3 }}>
              <DrugRankingPanel
                drugs={drugs}
                context={{
                  level: activeKey,
                  scenario: level !== 'l1' ? `${scenarioId || '—'}${l3ScenarioId ? `/${l3ScenarioId}` : ''}` : 'Baseline',
                  inputs: activeLevelData?.inputs_used,
                  provenance: activeLevelData?.efficacy?.provenance,
                }}
                title="Treatment Rankings"
              />
            </Box>
          </TabPanel>

          {/* Tab 2: Opportunity — SL + Resistance + Tests */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ px: 2, pb: 3 }}>
              <OpportunityPanel
                slPayload={slPayload}
                resistanceGate={resistanceGate}
                levelKey={activeKey}
                testsNeeded={testsNeeded}
                missing={missing}
              />
            </Box>
          </TabPanel>

          {/* Tab 3: Evidence — Inputs, Scenarios, Provenance */}
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ px: 2, pb: 3 }}>
              <EvidenceVault
                levelData={activeLevelData}
                activeKey={activeKey}
                level={level}
                drugsCount={drugs.length}
                l2Scenarios={l2Scenarios}
                l3Scenarios={l3Scenarios}
                onRunL2={handleRunL2}
                onRunL3={handleRunL3}
                isPreview={isPreview}
                rawBundle={bundle}
              />
            </Box>
          </TabPanel>
        </Box>

      </Container>
    </Box>
  );
}
```

## Tumor Board Components
total 72
drwxr-xr-x 1 root root   240 Jul  8 07:42 .
drwxr-xr-x 1 root root  1740 Jul  8 07:42 ..
-rw-r--r-- 1 root root  2148 Jul  8 07:42 ActionableInsights.jsx
-rw-r--r-- 1 root root  7991 Jul  8 07:42 BoardHeader.jsx
-rw-r--r-- 1 root root  6375 Jul  8 07:42 CapabilitiesHeroStrip.jsx
-rw-r--r-- 1 root root  5558 Jul  8 07:42 DataReadinessPanel.jsx
-rw-r--r-- 1 root root 18682 Jul  8 07:42 EvidenceVault.jsx
-rw-r--r-- 1 root root  9792 Jul  8 07:42 IntelligencePanel.jsx
-rw-r--r-- 1 root root  9850 Jul  8 07:42 OpportunityPanel.jsx
-rw-r--r-- 1 root root  3650 Jul  8 07:42 ScenarioController.jsx
-rw-r--r-- 1 root root  3173 Jul  8 07:42 SimulationControl.jsx
-rw-r--r-- 1 root root  2640 Jul  8 07:42 StrategicPriorities.jsx

## ayesha_11_17_25.js
```js
/**
 * Ayesha (AK) - Complete Patient Profile (January 2025)
 *
 * This is the complete source-of-truth patient profile constant used to power the patient dashboard.
 * It includes data from all 7 reports organized hierarchically in MEDICAL_REPORT_ORGANIZATION_SCHEMA.md:
 * - 2 CT Scans (baseline 2/1/2024, progression 10/28/2025)
 * - 1 PET Scan (11/11/2025)
 * - 3 Pathology Reports (2 cytology 11/17/2025, 1 surgical 11/20/2025)
 * - 1 Genetic Test (germline 11/24/2025)
 *
 * Sources:
 * - MEDICAL_REPORT_ORGANIZATION_SCHEMA.md (complete hierarchical organization)
 * - All 7 reports parsed and organized manually (January 2025)
 */

export const AYESHA_11_17_25_PROFILE = {
  meta: {
    profile_id: "ayesha_11_17_25",
    version: "2.0.0",
    last_updated: "2026-01-13",
    status: "complete", // Updated from "pre_ngs" - now includes all reports including genetic testing
    source_document: "MEDICAL_REPORT_ORGANIZATION_SCHEMA.md",
  },

  patient: {
    patient_id: "AK",
    display_name: "AK",
    treatment_history: [
      {
        drug: "Carboplatin + Bevacizumab",
        date: "2025-11-25",
        type: "Systemic",
        outcome: "Completed",
        regimen_details: "Cycle 1: Carboplatin AUC 5 + Bevacizumab 15mg/kg",
      },
      {
        drug: "Carboplatin + Bevacizumab",
        date: "2025-12-16",
        type: "Systemic",
        outcome: "Completed",
        regimen_details: "Cycle 2: Carboplatin AUC 5 + Bevacizumab 15mg/kg",
      },
      {
        drug: "Carboplatin + Bevacizumab",
        date: "2026-01-06",
        type: "Systemic",
        outcome: "Completed",
        regimen_details: "Cycle 3: Carboplatin AUC 5 + Bevacizumab 15mg/kg",
      },
      {
        drug: "Carboplatin",
        date: "2026-01-27",
        type: "Systemic",
        outcome: "Completed - Avastin held",
        regimen_details: "Cycle 4: Carboplatin AUC 5 only (Bevacizumab held due to proteinuria)",
      },
    ],
    demographics: {
      sex: "F", // From genetic test report (11/24/2025)
      age: 40, // From genetic test report (DOB 6/25/1985, Age 40 as of 11/24/2025)
      date_of_birth: "1985-06-25", // From genetic test report
      location_state: "NY",
      location_city: "NYC Metro",
      mrn: "1011021118", // From pathology reports
    },
  },

  disease: {
    type: "ovarian_cancer_hgs",
    stage: "IVB",
    histology: "high_grade_serous_carcinoma",
    primary_site: "ovarian/peritoneal (Mullerian origin)",
    diagnosis_summary:
      "Metastatic high-grade serous carcinoma consistent with Mullerian origin (adnexal or primary peritoneal). Strong WT-1 staining suggests high grade serous carcinoma of adnexal or primary peritoneal origin rather than endometrial primary.",
    diagnosis_provenance: {
      source_files: [
        "MEDICAL_REPORT_ORGANIZATION_SCHEMA.md",
        "Pathology Report CN25-5777 (Right Pleural Fluid - 11/17/2025)",
        "Pathology Report GP25-3371 (Surgical Biopsies - 11/20/2025)",
      ],
      inferred: false,
    },
  },

  clinical: {
    has_ascites: true,
    has_peritoneal_disease: true,
    has_carcinomatosis: true,
    has_pleural_effusions: true,
    has_pleural_metastases: true,
    has_lymph_node_metastases: true,
    has_distant_metastases: true,
    ecog_status: null,
    clinical_provenance: {
      source_files: [
        "CT Abdomen/Pelvis 10/28/2025",
        "PET Scan 11/11/2025",
        "Pathology Reports 11/17-11/20/2025",
      ],
      inferred: false,
    },
  },

  tumor_context: {
    // PLUMBER 2: Add completeness_score (L1: Has IHC + germline, missing NGS/CA-125)
    completeness_score: 0.55, // L1: Has IHC + germline, missing NGS/CA-125

    // Somatic mutations (IHC evidence - not full NGS genomic coordinates yet)
    somatic_mutations: [
      {
        gene: "TP53",
        variant: null,
        // RUO: p53 IHC "mutant pattern" proxy — we carry a canonical hotspot form + GRCh38
        // so sequence engines can run without asking the clinician to hand-enter coords.
        hgvs_p: "p.R175H",
        hgvs_c: "c.524G>A",
        chrom: "17",
        pos: 7675088,
        ref: "C",
        alt: "T",
        build: "GRCh38",
        consequence: "missense_variant",
        source: "IHC_proxy_hotspot",
        evidence: "IHC: p53 positive, favor mutant type (from surgical pathology GP25-3371) — hotspot proxy p.R175H (RUO)",
        provenance: { source_file: "Pathology Report GP25-3371", inferred: true },
      },
    ],

    biomarkers: {
      // Mismatch Repair Status
      mmr_status: "PRESERVED",
      msi_status: "MSS", // Microsatellite Stable (inferred from preserved MMR)
      mmr_proteins: ["MLH1", "PMS2", "MSH2", "MSH6"],

      // Hormone Receptors
      er_status: "WEAKLY_POSITIVE",
      er_percent: 50, // From surgical pathology (GP25-3371)
      pr_status: "NEGATIVE",
      pr_percent: "<1%",

      // Tumor Suppressors
      p53_status: "MUTANT_TYPE",
      p16_status: "STRONG_AND_DIFFUSE", // From cytology report CN25-5777

      // Growth Factor Receptors
      her2_status: "NEGATIVE",
      her2_score: 0,

      // Therapeutic Targets
      folr1_status: "NEGATIVE",
      folr1_percent: "<1%",
      folr1_threshold_percent_for_elahere: 75, // Requires ≥75% for ELAHERE eligibility

      pd_l1_status: "POSITIVE",
      pd_l1_assay: "22C3",
      pd_l1_cps: 10, // Combined Positive Score

      ntrk_status: "NEGATIVE",

      // IHC Profile Summary
      ihc_profile:
        "Mullerian origin (WT1+, PAX8+, CK7+, MOC31+, claudin4+); Negative: CK20, SATB2, GATA3, calretinin, CD163, TTF1",
    },

    // Unknown until full NGS report available
    hrd_score: null,
    tmb: null,

    tumor_context_provenance: {
      source_files: [
        "Pathology Report CN25-5777 (Cytology - 11/17/2025)",
        "Pathology Report GP25-3371 (Surgical - 11/20/2025)",
      ],
      inferred: false,
    },
  },

  germline: {
    status: "POSITIVE", // MBD4 homozygous pathogenic mutation detected
    test_date: "2025-11-24",
    lab: "Ambry Genetics",
    panel: "CancerNext-Expanded + RNAinsight (77 genes)",
    accession_number: "25-743747",
    mutations: [
      {
        gene: "MBD4",
        variant: "c.1293delA",
        protein_change: "p.K431Nfs*54",
        // IMPORTANT (Manager-aligned): do NOT store ad-hoc indel allele encodings (e.g. alt="") in the
        // patient profile. That is not standard VCF and may be mishandled end-to-end.
        //
        // We *do* have a receipt-backed GRCh38 locus candidate, but until we implement a proper HGVS→VCF
        // allele resolution step (left-padding, transcript mapping, ref validation), this remains
        // "unscorable-by-sequence-engines" and must be explicitly excluded (with reason) rather than coerced.
        //
        // Coordinate receipt (Ensembl REST, GRCh38 single-base query):
        // - chr3:129149435 base == "A" ✅ consistent with delA
        // - chr3:129430456 base == "G" ❌ inconsistent with delA
        build: "GRCh38",
        consequence: "frameshift_variant",
        zygosity: "homozygous",
        classification: "pathogenic",
        inheritance: "autosomal_recessive",
        syndrome: "MBD4-associated neoplasia syndrome (MANS)",
        risk_increases: ["Acute myelogenous leukemia (AML)", "Colorectal cancer (CRC)"],
      },
      {
        gene: "PDGFRA",
        variant: "c.2263T>C",
        protein_change: "p.S755P",
        // Receipt-backed GRCh38 normalization from MOAT dossier: PDGFRA p.S755P → chr4:54280422 T>C
        chrom: "4",
        pos: 54280422,
        ref: "T",
        alt: "C",
        build: "GRCh38",
        consequence: "missense_variant",
        zygosity: "heterozygous",
        classification: "VUS",
        inheritance: "unknown",
      },
    ],
    genes_analyzed: 77,
    germline_provenance: {
      source_file: "Ambry Genetics CancerNext-Expanded + RNAinsight Report (11/24/2025)",
      inferred: false,
    },
  },

  imaging: {
    // Keep key name for compatibility with patientGates.js
    ct_abdomen_pelvis_2025_10_28: {
      modality: "CT Abdomen/Pelvis with IV contrast",
      performed_date: "2025-10-28",
      key_findings: [
        "Peritoneal carcinomatosis",
        "Small volume ascites",
        "Abdominopelvic lymphadenopathy",
        "Large bilateral pleural effusions",
        "Ovaries inseparable from peritoneal deposits",
      ],
      impression:
        "Peritoneal carcinomatosis, small volume ascites, and abdominopelvic lymphadenopathy suspicious for metastatic disease. Recommend tissue sampling.",
      clinical_context: "~22 months after baseline - PROGRESSION DETECTED",
      provenance: {
        source_file: "CT Abdomen/Pelvis 10/28/2025 (Progression)",
        inferred: false,
      },
    },
    ct_baseline_2024_02_01: {
      modality: "CT Abdomen/Pelvis with IV contrast",
      performed_date: "2024-02-01",
      key_findings: [
        "Left ovarian cysts (5.2cm inferior, 4.4cm superior)",
        "Lower abdominal wall/rectus collection",
        "NO CARCINOMATOSIS detected",
        "No ascites",
        "No lymphadenopathy",
      ],
      clinical_context: "Baseline scan - status post total colectomy 01/02/2024",
      provenance: {
        source_file: "CT Abdomen/Pelvis 2/1/2024 (Baseline)",
        inferred: false,
      },
    },
    pet_scan_2025_11_11: {
      modality: "PET-CT Skull Base to Mid-Thigh",
      performed_date: "2025-11-11",
      key_findings: [
        "Extensive carcinomatosis",
        "Moderate volume ascites",
        "Bilateral pleural metastatic disease",
        "Extensive cervical, thoracic, and abdominopelvic nodal metastases",
        "SUV max: 15.0",
        "Suspected gynecologic primary (left adnexal, endometrial, or cervical)",
      ],
      impression:
        "Extensive carcinomatosis with widespread metastases. Suspect a gynecologic primary.",
      clinical_context: "~2 weeks after progression CT - WIDESPREAD METASTASES confirmed",
      provenance: {
        source_file: "PET Scan 11/11/2025",
        inferred: false,
      },
    },
  },

  pathology: {
    cytology_right_pleural_2025_11_17: {
      report_number: "CN25-5777",
      report_date: "2025-11-17",
      specimen_type: "Pleural fluid, right",
      specimen_volume: "1400 cc",
      diagnosis: {
        result: "POSITIVE FOR MALIGNANT CELLS",
        tumor_type: "Metastatic adenocarcinoma",
        primary_site: "Mullerian (gynecologic)",
      },
      immunohistochemistry: {
        positive_markers: ["claudin4", "MOC31", "CK7", "PAX8", "WT1"],
        negative_markers: ["calretinin", "CD163", "TTF1", "GATA3", "CK20"],
        special_markers: {
          p16: "strong_and_diffuse",
          p53: "mutant_type",
          ER: { status: "weakly_to_moderately_positive", percent: 60 },
          PR: { status: "negative", percent: 0 },
        },
      },
      note: "Complete IHC workup performed on this specimen",
      provenance: {
        source_file: "Pathology Report CN25-5777 (Right Pleural Fluid)",
        inferred: false,
      },
    },
    cytology_left_pleural_2025_11_17: {
      report_number: "CN25-5778",
      report_date: "2025-11-17",
      specimen_type: "Pleural fluid, left",
      specimen_volume: "1200 cc",
      diagnosis: {
        result: "POSITIVE FOR MALIGNANT CELLS",
        tumor_type: "Metastatic adenocarcinoma",
        primary_site: "Mullerian (gynecologic)",
      },
      clinical_context:
        "Same cytomorphology as right pleural fluid (CN25-5777). References CN25-5777 for complete IHC workup.",
      note: "Bilateral pleural metastases confirmed - same tumor type on both sides",
      provenance: {
        source_file: "Pathology Report CN25-5778 (Left Pleural Fluid)",
        inferred: false,
      },
    },
    surgical_biopsies_2025_11_20: {
      path_number: "GP25-3371",
      report_date: "2025-11-20",
      date_obtained: "2025-11-17",
      specimens: [
        { id: "A", type: "Biopsy of omentum", diagnosis: "Metastatic adenocarcinoma, Mullerian origin" },
        { id: "B", type: "Endometrial curettings", diagnosis: "Fragments of high grade carcinoma" },
        { id: "C", type: "Anterior perineal nodule", diagnosis: "Metastatic adenocarcinoma, Mullerian origin" },
        { id: "D", type: "Biopsy of omentum #2", diagnosis: "Metastatic adenocarcinoma, Mullerian origin" },
      ],
      diagnosis_summary:
        "Similar tumor identified in all parts. Strong WT-1 staining more commonly seen in high grade serous carcinoma of adnexal or primary peritoneal origin than endometrial primary.",
      immunohistochemistry: {
        positive_markers: ["PAX8", "CK7", "WT-1"],
        negative_markers: ["CK20", "SATB2", "GATA3"],
        note: "Per cytology report, also negative for calretinin, positive for MOC31 and Claudin4.",
      },
      biomarkers: {
        mismatch_repair: {
          status: "preserved",
          markers: { MLH1: "positive", PMS2: "positive", MSH2: "positive", MSH6: "positive" },
        },
        hormone_receptors: {
          ER: { status: "weakly_positive", percent: 50 },
          PR: { status: "negative", percent: "<1%" },
        },
        p53: { status: "positive", type: "mutant_type" },
        HER2: { status: "negative", score: 0 },
        FOLR1: {
          status: "negative",
          percent: "<1%",
          note: "Requires ≥75% for ELAHERE eligibility",
        },
        PDL1: {
          assay: "22C3",
          status: "positive",
          cps: 10,
          note: "Combined Positive Score (CPS): PD-L1 positive tumor cells and infiltrating immune cells / total viable tumor cells × 100",
        },
        NTRK: { status: "negative" },
      },
      additional_tests: [
        { name: "Solid Tumor Gynecological Panel", date_signed_out: "2025-12-03" },
        {
          name: "Microsatellite Instability (MSI) Testing",
          date_signed_out: "2025-12-03",
          note: "Likely MSS given preserved MMR",
        },
      ],
      provenance: {
        source_file: "Pathology Report GP25-3371 (Surgical Biopsies)",
        inferred: false,
      },
    },
  },

  labs: {
    ca125_value: null,
    ca125_units: "U/mL",
    ca125_provenance: {
      source_files: ["Not present in attached reports"],
      inferred: false,
      note: "Not present in the attached reports; needs patient lab upload.",
    },
  },

  diagnostic_timeline: [
    {
      date: "2024-02-01",
      report_type: "CT_SCAN",
      finding: "Baseline: Left ovarian cysts (5.2cm, 4.4cm), lower abdominal wall collection. NO CARCINOMATOSIS detected.",
      stage: "baseline",
    },
    {
      date: "2025-10-28",
      report_type: "CT_SCAN",
      finding: "PROGRESSION DETECTED: Extensive peritoneal carcinomatosis, small volume ascites, lymphadenopathy. Ovaries inseparable from peritoneal deposits.",
      stage: "metastatic_detected",
    },
    {
      date: "2025-11-11",
      report_type: "PET_SCAN",
      finding: "WIDESPREAD METASTASES: Extensive carcinomatosis with widespread metastases (SUV max 15.0), suspected gynecologic primary",
      stage: "widespread_metastases",
    },
    {
      date: "2025-11-17",
      report_type: "PATHOLOGY_CYTOLOGY",
      finding: "DIAGNOSIS CONFIRMED: POSITIVE FOR MALIGNANT CELLS - Metastatic adenocarcinoma, Mullerian primary (p53 mutant, ER weakly positive, PR negative). BILATERAL pleural metastases (right and left).",
      stage: "diagnosis_confirmed",
      specimens: ["Pleural fluid, right (CN25-5777)", "Pleural fluid, left (CN25-5778)"],
    },
    {
      date: "2025-11-20",
      report_type: "PATHOLOGY_SURGICAL",
      finding: "TISSUE BIOPSIES CONFIRMED: Metastatic adenocarcinoma, Mullerian origin in all 4 specimens (omentum x2, endometrial curettings, perineal nodule). Comprehensive biomarkers: PD-L1 positive (CPS=10), FOLR1 negative (<1%), MMR preserved (MSS), HER2 negative, NTRK negative.",
      stage: "tissue_confirmed",
      report_number: "GP25-3371",
    },
    {
      date: "2025-11-24",
      report_type: "GENETIC_GERMLINE",
      finding: "GERMLINE TESTING: POSITIVE - MBD4 homozygous pathogenic mutation (c.1293delA) detected. MBD4-associated neoplasia syndrome (MANS) diagnosed. Increased risk for AML and colorectal cancer. PDGFRA VUS also detected.",
      stage: "germline_diagnosis",
    },
  ],

  // Top-level fields for API compatibility (derived from nested structures)
  germline_status: "positive", // Derived from germline.status (MBD4 homozygous pathogenic mutation detected)

  // Fields that are *commonly assumed* but must be explicitly confirmed by patient/clinician.
  inferred_fields: {
    treatment_line: {
      value: 1, // First-line platinum started Nov 2025
      inferred: false,
      reason: "Patient reports completing 4 cycles of Carboplatin/Bevacizumab (Last dose 1/27/26)",
      source_files: ["Patient Reported - Feb 2026 Audit"],
    },
    // Note: platinum_response removed - not available in reports and should not be shown as inferred
  },
};
```

## All Hooks
  src/hooks/__tests__/useInsights.test.js: 176 lines
  src/hooks/ayesha/index.js: 6 lines
  src/hooks/ayesha/useAyeshaCareData.js: 96 lines
  src/hooks/ayesha/useAyeshaProfile.js: 276 lines
  src/hooks/ayesha/useAyeshaTwinDemo.js: 61 lines
  src/hooks/ayesha/useBiomarkerUpdate.js: 76 lines
  src/hooks/ayesha/useKillChainSignals.js: 33 lines
  src/hooks/ayesha/useProfileEditor.js: 84 lines
  src/hooks/ayesha/useRepurposingArsenal.js: 204 lines
  src/hooks/ayesha/useResistanceMetadata.js: 98 lines
  src/hooks/useApiClient.js: 34 lines
  src/hooks/useAyeshaTestsUnlocksBundle.js: 54 lines
  src/hooks/useAyeshaTherapyFitBundle.js: 126 lines
  src/hooks/useAyeshaTrials.js: 130 lines
  src/hooks/useBatchValidation.js: 245 lines
  src/hooks/useCoPilotIntegration.js: 233 lines
  src/hooks/useCompleteCareOrchestrator.js: 634 lines
  src/hooks/useCompleteCarePlan.js: 171 lines
  src/hooks/useDDRStatus.js: 97 lines
  src/hooks/useDemoWorkflow.js: 119 lines
  src/hooks/useDrugDetail.js: 150 lines
  src/hooks/useEvidence.js: 224 lines
  src/hooks/useHolisticClinicalBenefit.js: 97 lines
  src/hooks/useHolisticValidation.js: 381 lines
  src/hooks/useInsights.js: 416 lines
  src/hooks/useKb.js: 427 lines
  src/hooks/useMetastasis.js: 83 lines
  src/hooks/useMetastasisInterception.js: 84 lines
  src/hooks/useMoatPatientDashboard.js: 116 lines
  src/hooks/usePatientStatus.js: 92 lines
  src/hooks/usePersonaAccess.js: 61 lines
  src/hooks/usePipelineStatus.js: 76 lines
  src/hooks/usePopulationData.js: 57 lines
  src/hooks/useResearchIntelligence.js: 142 lines
  src/hooks/useResearchIntelligenceStream.js: 62 lines
  src/hooks/useResultCache.js: 13 lines
  src/hooks/useSyntheticLethality.js: 167 lines
  src/hooks/useTargetedTherapyBrief.js: 57 lines
  src/hooks/useTimingChemoFeatures.js: 117 lines
  src/hooks/useTrialRefresh.js: 70 lines
  src/hooks/useTumorBoardBundle.js: 180 lines
  src/hooks/useWebSocket.js: 162 lines
  src/hooks/vus/useMutationExplorerData.js: 222 lines

## useTumorBoardBundle.js
```js
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  buildAyeshaTherapyFitBundleUrl,
  getAyeshaTherapyFitScenariosUrl,
  mergeTherapyFitBundleWithScenarios,
} from '../utils/ayeshaApi';
import {
  storageKeyForBundle,
  readPersistedBundle,
  writePersistedBundle,
} from '../utils/ayeshaBundleSessionPersistence';

const TB_BUNDLE_STORAGE_PREFIX = 'tumor_board_bundle_v1:';

const getAuthToken = () => {
  const t = localStorage.getItem('supabase_auth_token');
  if (t && t !== 'null' && t !== 'undefined') return t;
  return null;
};

// ─── localStorage helpers (canonical keys, mirrors DataEntryPanel exports) ────
function readCA125History() {
  try {
    const raw = localStorage.getItem('ayesha_ca125_history_v1');
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) && arr.length > 0 ? arr : null;
  } catch { return null; }
}

function readHRD() {
  try { return JSON.parse(localStorage.getItem('ayesha_hrd_v1') || 'null'); }
  catch { return null; }
}

function readRSSInputs() {
  // Written by RSSEntryForm.jsx under key 'ayesha_rss_inputs_v1'
  try { return JSON.parse(localStorage.getItem('ayesha_rss_inputs_v1') || 'null'); }
  catch { return null; }
}

async function fetchTumorBoardBundle({
  level = 'l1',
  scenarioId = null,
  l3ScenarioId = null,
  includeSyntheticLethality = true,
  ctdnaStatusOverride = null,
  efficacyMode = 'comprehensive', // 'fast' | 'comprehensive'
} = {}) {
  const token = getAuthToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Read locally-stored patient data and attach to request body.
  // Backend expects these in tumor_context_additions or directly in the body.
  // Fields are optional — only attach when present to avoid polluting baseline.
  const ca125History = readCA125History();
  const hrdEntry = readHRD();
  const body = {};
  const localSources = [];
  if (ca125History) {
    body.ca125_history = ca125History;
    // Most recent value as single-reading shortcut
    const last = ca125History[ca125History.length - 1];
    if (last?.value) {
      body.ca125_value = last.value;
      body.ca125_date = last.date;
    }
    localSources.push('ca125_history');
  }
  if (hrdEntry?.hrd_score != null) {
    body.hrd_score = hrdEntry.hrd_score;
    body.hrd_status = hrdEntry.hrd_status;
    localSources.push('hrd');
  }

  // Replication Stress Score inputs — enables 8th vector axis (PMID 34552099)
  const rssInputs = readRSSInputs();
  if (rssInputs && Object.keys(rssInputs).length > 0) {
    body.rss_inputs = rssInputs;
    localSources.push('rss');
  }

  // Tag the request with local-data provenance so the UI can label it honestly
  if (localSources.length > 0) {
    body._local_data_sources = localSources;
  }

  const [bundleRes, scenariosRes] = await Promise.all([
    fetch(buildAyeshaTherapyFitBundleUrl({
      level,
      scenarioId,
      l3ScenarioId,
      includeSyntheticLethality,
      ctdnaStatusOverride,
      efficacyMode,
    }), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }),
    fetch(getAyeshaTherapyFitScenariosUrl(), { headers }),
  ]);

  if (!bundleRes.ok) {
    const txt = await bundleRes.text().catch(() => '');
    throw new Error(`Failed to load tumor board bundle: ${bundleRes.status} ${bundleRes.statusText}${txt ? ` — ${txt}` : ''}`);
  }
  if (!scenariosRes.ok) {
    const txt = await scenariosRes.text().catch(() => '');
    throw new Error(`Failed to load therapy-fit scenarios: ${scenariosRes.status} ${scenariosRes.statusText}${txt ? ` — ${txt}` : ''}`);
  }

  const bundleJson = await bundleRes.json();
  const scenariosJson = await scenariosRes.json();
  return mergeTherapyFitBundleWithScenarios(bundleJson, scenariosJson);
}

export function useTumorBoardBundle(
  {
    level = 'l1',
    scenarioId = null,
    l3ScenarioId = null,
    includeSyntheticLethality = true,
    ctdnaStatusOverride = null,
    efficacyMode = 'comprehensive',
  } = {},
  options = {}
) {
  const queryKeyPayload = {
    level,
    scenarioId,
    l3ScenarioId,
    includeSyntheticLethality,
    ctdnaStatusOverride,
    efficacyMode,
  };

  const persistKey = useMemo(
    () => storageKeyForBundle(TB_BUNDLE_STORAGE_PREFIX, queryKeyPayload),
    [
      level,
      scenarioId,
      l3ScenarioId,
      includeSyntheticLethality,
      ctdnaStatusOverride,
      efficacyMode,
    ]
  );

  const persisted = useMemo(() => readPersistedBundle(persistKey), [persistKey]);

  return useQuery({
    queryKey: ['tumor-board-bundle', queryKeyPayload],
    queryFn: async () => {
      const data = await fetchTumorBoardBundle({
        level,
        scenarioId,
        l3ScenarioId,
        includeSyntheticLethality,
        ctdnaStatusOverride,
        efficacyMode,
      });
      writePersistedBundle(persistKey, data);
      return data;
    },
    // Instant paint when returning to Tumor Board / Therapy Fit in the same session
    initialData: persisted?.data,
    initialDataUpdatedAt: persisted?.updatedAt,
    // Prefer long warm cache: app default is 5m stale / 10m cache; tumor board is heavy
    staleTime: 5 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    ...options,
  });
}

```

## useAyeshaProfile.js
```js
/**
 * useAyeshaProfile - Hook for accessing Ayesha's patient profile
 * 
 * Single source of truth: AYESHA_11_17_25_PROFILE constant
 * Provides helper functions to extract data from profile
 * 
 * NO HARD-CODING - All data comes from the profile constant
 */

import { useMemo, useState, useEffect } from 'react';
import { AYESHA_11_17_25_PROFILE } from '../../constants/patients/ayesha_11_17_25';

/**
 * Custom hook for Ayesha's patient profile
 * Returns profile and helper functions to extract data
 */
export const useAyeshaProfile = () => {
  // 1. Manage Overrides (Phase 4: "Fix Holistic Score Inputs")
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    const load = () => {
      try {
        const s = localStorage.getItem('ayesha_profile_overrides');
        if (s) setOverrides(JSON.parse(s));
      } catch (e) { console.error("Profile override load failed", e); }
    };
    load();
    window.addEventListener('ayesha_profile_updated', load);
    return () => window.removeEventListener('ayesha_profile_updated', load);
  }, []);

  // 2. Merge Profile with Overrides
  const profile = useMemo(() => {
    const base = AYESHA_11_17_25_PROFILE;
    if (!overrides || Object.keys(overrides).length === 0) return base;

    // Deep merge logic (Targeted)
    const merged = { ...base };

    // 1. Treatment Line
    if (overrides.line_of_therapy) {
      merged.inferred_fields = {
        ...merged.inferred_fields,
        treatment_line: {
          ...merged.inferred_fields?.treatment_line,
          value: overrides.line_of_therapy
        }
      };
    }

    // 2. Platinum Status (Inject into tumor_context for Routes.py consumption)
    if (overrides.pfi_status) {
      merged.tumor_context = {
        ...merged.tumor_context,
        platinum_status: overrides.pfi_status
      };
    }

    // 3. Stage
    if (overrides.stage) {
      merged.disease = {
        ...merged.disease,
        stage: overrides.stage
      };
    }

    return merged;
  }, [overrides]);

  // Memoized extractions (computed once)
  const patient = useMemo(() => profile.patient || {}, [profile]);
  const disease = useMemo(() => profile.disease || {}, [profile]);
  const tumorContext = useMemo(() => profile.tumor_context || {}, [profile]);
  const germline = useMemo(() => profile.germline || {}, [profile]);
  const labs = useMemo(() => profile.labs || {}, [profile]);
  const clinical = useMemo(() => profile.clinical || {}, [profile]);
  const imaging = useMemo(() => profile.imaging || {}, [profile]);
  const pathology = useMemo(() => profile.pathology || {}, [profile]);

  // Helper: Extract biomarkers as chips
  const biomarkerChips = useMemo(() => {
    const chips = [];
    const biomarkers = tumorContext?.biomarkers || {};

    if (disease?.stage) {
      chips.push({ label: `Stage ${disease.stage}`, color: 'error' });
    }

    if (labs?.ca125_value) {
      chips.push({
        label: `CA-125: ${labs.ca125_value.toLocaleString()} ${labs.ca125_units || 'U/mL'}`,
        color: 'success',
      });
    }

    if (germline?.status === 'POSITIVE') {
      const firstMutation = germline.mutations?.[0];
      chips.push({
        label: `Germline: Positive (${firstMutation?.gene || 'MBD4'})`,
        color: 'error',
      });
    }

    if (biomarkers.pd_l1_status === 'POSITIVE') {
      chips.push({
        label: `PD-L1+ (CPS ${biomarkers.pd_l1_cps || 'N/A'})`,
        color: 'success',
      });
    }

    if (biomarkers.p53_status === 'MUTANT_TYPE') {
      chips.push({ label: 'p53 Mutant', color: 'info' });
    }

    if (biomarkers.mmr_status === 'PRESERVED') {
      chips.push({ label: 'MMR Preserved', color: 'default' });
    }

    if (biomarkers.er_status) {
      chips.push({
        label: `ER ${biomarkers.er_status.replace('_', ' ')}`,
        color: 'default',
      });
    }

    if (biomarkers.her2_status === 'NEGATIVE') {
      chips.push({ label: 'HER2-', color: 'default' });
    }

    if (biomarkers.folr1_status === 'NEGATIVE') {
      chips.push({ label: 'FOLR1-', color: 'default' });
    }

    return chips;
  }, [disease, labs, germline, tumorContext]);

  // Helper: Build API request body from profile (matches useCompleteCareOrchestrator format)
  const buildRequest = useMemo(() => {
    return (options = {}) => {
      const {
        include_trials = false,
        include_wiwfm = false,
        include_food = false,
        include_resistance = false,
        include_resistance_prediction = false,
        include_soc = true,
        include_ca125 = true,
        include_biomarker = true,
        max_trials = 10,
      } = options;

      // Extract tumor_context for backend (matches useCompleteCareOrchestrator format)
      const biomarkers = tumorContext?.biomarkers || {};
      const somatic = tumorContext?.somatic_mutations || [];

      const tumor_context_for_api = {
        p53_status: biomarkers.p53_status || null,
        pd_l1: {
          cps: biomarkers.pd_l1_cps || null,
          status: biomarkers.pd_l1_status || null,
        },
        pd_l1_cps: biomarkers.pd_l1_cps || null,
        pd_l1_status: biomarkers.pd_l1_status || null,
        msi_status: biomarkers.msi_status || null,
        er_percent: biomarkers.er_percent || null,
        er_status: biomarkers.er_status || null,
        pr_status: biomarkers.pr_status || null,
        mmr_status: biomarkers.mmr_status || null,
        her2_status: biomarkers.her2_status || null,
        folr1_status: biomarkers.folr1_status || null,
        ntrk_status: biomarkers.ntrk_status || null,
        hrd_score: tumorContext?.hrd_score || null,
        tmb: tumorContext?.tmb || null,
        somatic_mutations: somatic
          .map((m) => ({
            gene: m.gene,
            variant: m.variant || null,
            hgvs_p: m.hgvs_p || m.protein_change || null,
            hgvs_c: m.hgvs_c || null,
            chrom: m.chrom || null,
            pos: typeof m.pos === 'number' ? m.pos : (m.pos ? Number(m.pos) : null),
            ref: m.ref || null,
            alt: (m.alt === '' ? '' : (m.alt || null)),
            build: m.build || null,
            consequence: m.consequence || null,
            source: m.source || null,
            evidence: m.evidence || null,
          }))
          .filter((m) => m.gene),
      };

      // Match useCompleteCareOrchestrator format (flat, not nested in patient_profile)
      return {
        ca125_value: labs?.ca125_value || null,
        stage: disease?.stage || 'IVB',
        treatment_line: profile.inferred_fields?.treatment_line?.value?.toString() || 'either',
        germline_status: profile.germline_status || germline?.status?.toLowerCase() || 'positive',
        location_state: patient?.demographics?.location_state || 'NY',
        has_ascites: profile.clinical?.has_ascites || false,
        has_peritoneal_disease: profile.clinical?.has_peritoneal_disease || false,
        ecog_status: profile.clinical?.ecog_status || null,
        tumor_context: tumor_context_for_api,
        treatment_history: profile.treatment_history || [],
        patient_age: patient?.demographics?.age || null,
        autoimmune_history: patient?.autoimmune_history || [],
        germline_variants: germline?.mutations?.map((m) => ({
          gene: m.gene,
          variant: m.variant || null,
          hgvs_c: m.variant || null,
          hgvs_p: m.hgvs_p || m.protein_change || null,
          protein_change: m.protein_change || null,
          chrom: m.chrom || null,
          pos: typeof m.pos === 'number' ? m.pos : (m.pos ? Number(m.pos) : null),
          ref: m.ref || null,
          alt: (m.alt === '' ? '' : (m.alt || null)),
          build: m.build || null,
          consequence: m.consequence || null,
          classification: m.classification,
          zygosity: m.zygosity,
        })) || [],
        include_trials,
        include_soc,
        include_ca125,
        include_wiwfm,
        include_io_selection: false, // Optional, not in default options
        include_food,
        include_resistance,
        include_resistance_prediction,
        max_trials,
      };
    };
  }, [profile, patient, disease, germline, tumorContext, labs]);

  // Helper: Get germline mutations for DDR calculation
  const getDDRMutations = useMemo(() => {
    return () => {
      return (germline?.mutations || [])
        .filter((m) => m.classification === 'pathogenic' || m.gene === 'MBD4')
        .map((m) => ({
          gene_symbol: m.gene,
          variant_classification: m.classification || 'pathogenic',
        }));
    };
  }, [germline]);

  return useMemo(() => ({
    profile,
    patient,
    disease,
    tumorContext,
    germline,
    labs,
    clinical,
    imaging,
    pathology,
    biomarkerChips,
    buildRequest,
    getDDRMutations,
  }), [
    profile,
    patient,
    disease,
    tumorContext,
    germline,
    labs,
    clinical,
    imaging,
    pathology,
    biomarkerChips,
    buildRequest,
    getDDRMutations
  ]);
};

export default useAyeshaProfile;
```

## useAyeshaCareData.js
```js
/**
 * useAyeshaCareData - Hook for loading Ayesha's care data
 * 
 * Wraps useCompleteCareOrchestrator with react-query caching.
 * Uses AYESHA_11_17_25_PROFILE as single source of truth.
 * 
 * Cache: 5-minute staleTime via @tanstack/react-query — shared
 * across all components that call this hook.
 */

import { useQuery } from '@tanstack/react-query';
import { useAyeshaProfile } from './useAyeshaProfile';
import { useCompleteCareOrchestrator } from '../useCompleteCareOrchestrator';
import { useRef, useCallback } from 'react';

/**
 * Custom hook for Ayesha's care data — cached with react-query.
 * 
 * Unlike the old implementation (which created a fresh useState/useEffect
 * per mount), this shares cached data across all consumers via the
 * shared react-query cache.
 */
export const useAyeshaCareData = (options = {}) => {
  const {
    skip_auxiliary_parallel_requests,
    skip_synthetic_lethality_parallel,
    ...careOptions
  } = options;
  const { profile, buildRequest } = useAyeshaProfile();
  const orchestrator = useCompleteCareOrchestrator();
  const orchestratorRef = useRef(orchestrator);
  orchestratorRef.current = orchestrator;

  const patientKey =
    profile?.patient?.patient_id ||
    profile?.patient_id ||
    'ayesha-default';

  const stableOptions = JSON.stringify({
    ...careOptions,
    patientKey,
    skip_auxiliary_parallel_requests: !!skip_auxiliary_parallel_requests,
    skip_synthetic_lethality_parallel: !!skip_synthetic_lethality_parallel,
  });

  const fetchCareData = useCallback(async () => {
    if (!profile) return null;
    const requestBody = buildRequest({
      ...careOptions,
      include_io_selection: true,
      max_trials: 50,
    });
    // Use the orchestrator's generatePlan (parallel aux + main plan, or lite mode).
    await orchestratorRef.current.generatePlan(profile, {
      ...requestBody,
      ...(skip_auxiliary_parallel_requests
        ? { skip_auxiliary_parallel_requests: true }
        : {}),
      ...(skip_synthetic_lethality_parallel
        ? { skip_synthetic_lethality_parallel: true }
        : {}),
    });
    // After generatePlan resolves, the result is in orchestrator.result
    // but we can't read it synchronously. Return a resolved value instead.
    return orchestratorRef.current.result;
  }, [
    profile,
    buildRequest,
    stableOptions,
    skip_auxiliary_parallel_requests,
    skip_synthetic_lethality_parallel,
  ]);

  const query = useQuery({
    queryKey: ['ayesha-care-data', stableOptions],
    queryFn: fetchCareData,
    enabled: !!profile,
    staleTime: 5 * 60 * 1000,      // 5 min — matches therapy bundle cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  // Prefer orchestrator's result (always up-to-date after generatePlan)
  // but fall back to react-query cache for cross-mount sharing.
  const result = orchestrator.result || query.data;

  return {
    result,
    loading: orchestrator.loading || query.isLoading,
    error: orchestrator.error || query.error,
    refresh: () => query.refetch(),
  };
};

export default useAyeshaCareData;
```

## package.json
```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "build:render": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "build:production": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "preview": "vite preview",
    "deploy": "yarn build && npx thirdweb@latest upload dist",
    "db:migrate": "node scripts/migrate.js",
    "db:studio": "npx drizzle-kit studio",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "@dnd-kit/core": "6.0.8",
    "@dnd-kit/sortable": "7.0.2",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@google/generative-ai": "^0.16.0",
    "@heroicons/react": "^2.2.0",
    "@mui/icons-material": "^6.5.0",
    "@mui/lab": "^6.0.0-beta.7",
    "@mui/material": "^6.5.0",
    "@mui/system": "^6.5.0",
    "@mui/x-charts": "^7.29.1",
    "@neondatabase/serverless": "^0.9.4",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.12",
    "@react-pdf/renderer": "^4.3.0",
    "@react-spring/web": "^10.0.1",
    "@supabase/supabase-js": "^2.56.0",
    "@tabler/icons-react": "^3.7.0",
    "@tanstack/react-query": "^4.42.2",
    "@thirdweb-dev/react": "^3",
    "@thirdweb-dev/sdk": "^3",
    "appwrite": "14.0.1",
    "buffer": "^6.0.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotenv": "^16.4.5",
    "drizzle-orm": "^0.32.1",
    "ethers": "^5.7.2",
    "lucide-react": "^0.511.0",
    "markdown-to-jsx": "^7.4.7",
    "node-fetch": "^3.3.2",
    "notistack": "^3.0.2",
    "openai": "^4.52.0",
    "preline": "^2.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.5.0",
    "react-joyride": "^2.9.3",
    "react-markdown": "^9.0.1",
    "react-router-dom": "^6.4.4",
    "react-toastify": "^11.0.5",
    "recharts": "^2.15.4",
    "rehype-highlight": "^7.0.0",
    "rehype-katex": "^7.0.0",
    "remark-gfm": "^4.0.0",
    "remark-math": "^6.0.0",
    "tailwind-merge": "^3.3.1",
    "url": "^0.11.4",
    "zod": "3.23.8",
    "zustand": "^4.5.7"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^14.3.1",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.13",
    "drizzle-kit": "^0.23.0",
    "jsdom": "^24.0.0",
    "path-browserify": "^1.0.1",
    "postcss": "^8.4.19",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.5",
    "prop-types": "^15.8.1",
    "tailwindcss": "^3.2.4",
    "util": "^0.12.5",
    "vite": "^5.0.0",
    "vitest": "^1.6.0"
  },
  "main": "index.js",
  "license": "MIT",
  "type": "module",
  "vitest": {
    "environment": "jsdom",
    "setupFiles": [
      "./src/setupTests.js"
    ]
  }
}
```

## vite.config.js
```js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Merged config: Vite 5 (oncology-frontend) + production hardening (root)
export default defineConfig({
  plugins: [
    react({
      // Use the new JSX runtime (automatic)
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
  ],

  // Path aliases (@ and ~ both resolve to ./src)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
      'buffer': 'buffer',
      'path': 'path-browserify',
      'node:url': 'url',
    },
  },

  // Global defines for Node.js compat
  define: {
    'process.env': process.env,
    global: 'globalThis',
  },

  base: '/',

  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        /**
         * Route-level code splitting.
         *
         * Strategy: isolate the heaviest, most cache-stable vendor groups.
         * Rollup handles app-code splitting automatically via dynamic import()
         * boundaries in the route files.
         *
         * NOTE: We do NOT split 'deps' into a separate chunk — that caused
         * circular chunk warnings because many node_modules cross-import each
         * other. Instead we let Rollup auto-chunk everything not explicitly
         * named here.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return; // app code: let Rollup decide

          // React core — always in initial bundle, tiny, cache-stable
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router-dom/') ||
            id.includes('/node_modules/react-router/')
          ) {
            return 'vendor-react';
          }

          // MUI + Emotion — large, rarely changes, safe to isolate
          if (
            id.includes('/node_modules/@mui/') ||
            id.includes('/node_modules/@emotion/')
          ) {
            return 'vendor-mui';
          }

          // Charting — only loaded on data pages
          if (
            id.includes('/node_modules/recharts') ||
            id.includes('/node_modules/@mui/x-charts')
          ) {
            return 'vendor-charts';
          }

          // PDF renderer — very heavy, only on export flows
          if (id.includes('/node_modules/@react-pdf')) {
            return 'vendor-pdf';
          }

          // Everything else in node_modules: let Rollup auto-chunk
          // (avoids circular chunk warnings from cross-importing deps)
        },
      },
      onwarn(warning, warn) {
        // Suppress 'use client' directive warnings from dependencies
        if (warning.message && warning.message.includes("'use client'")) {
          return;
        }
        // Suppress 'Module level directives' warnings
        if (warning.message && warning.message.includes('Module level directives')) {
          return;
        }
        warn(warning);
      },
    },
    // CommonJS compatibility for mixed ESM/CJS deps
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },

  server: {
    port: 5173,
    // Proxy all /api/* requests to the FastAPI backend running on 8000.
    // Without this, fetch('/api/...') hits Vite (port 5173) and returns 404.
    // This is the development-only fix — production uses the actual backend URL.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
  },

  logLevel: 'warn',
});
```

## render.yaml
```yaml
services:
  - type: web
    name: crispro-frontend
    env: static
    # Root Directory: leave EMPTY in the Render dashboard (repo root — flat repo, no subdirectory).
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    headers:
      - path: /*
        name: Cache-Control
        value: no-cache
      - path: /assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: NODE_VERSION
        value: "18"
      - key: VITE_ENABLE_MOCK_AUTH
        value: "false"
      - key: VITE_API_ROOT
        value: "https://crispro-backend-v2-production.up.railway.app"
      - key: VITE_WS_ROOT
        value: "https://crispro-backend-v2-production.up.railway.app"
```

## AUDIT COMPLETE
