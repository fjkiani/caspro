# Audit 5: Deployment + Integration + Data Flow

## 1. Frontend Deployment Config
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

## 2. Frontend .env.production
```
# Baked into production builds when Render/CI does not override.
# REST + WebSocket base (no trailing slash). Railway is the live backend.
VITE_API_ROOT=https://crispro-backend-v2-production.up.railway.app
VITE_WS_ROOT=https://crispro-backend-v2-production.up.railway.app
```

## 3. Frontend env.example
```
# CrisPRO Frontend — Environment Configuration
# Copy this file to .env.local for local dev, or set vars in Render dashboard for production.
#
# REQUIRED for production:
#   VITE_API_ROOT          — deployed backend URL (no trailing slash)
#   VITE_ENABLE_MOCK_AUTH  — MUST be "false" in production
#
# REQUIRED for Supabase Analysis History:
#   VITE_SUPABASE_URL
#   VITE_SUPABASE_ANON_KEY

# ── Backend ──────────────────────────────────────────────────────────────────
# Production (Railway). REST calls use VITE_API_ROOT; WebSockets use VITE_WS_ROOT.
# If only VITE_WS_ROOT is set on Render, apiConfig still routes REST to the same host.
VITE_API_ROOT=https://crispro-backend-v2-production.up.railway.app
VITE_WS_ROOT=https://crispro-backend-v2-production.up.railway.app
# Local dev (Vite proxy handles /api → localhost:8000 when unset or localhost):
# VITE_API_ROOT=

# ── External Services ─────────────────────────────────────────────────────────
VITE_FUSION_ENGINE_URL=https://crispro--fusion-engine-v1-fusionengine-api.modal.run
VITE_EVO_SERVICE_URL=
VITE_ZETA_ORACLE_URL=

# ── Supabase (Analysis History) ───────────────────────────────────────────────
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# ── Auth ──────────────────────────────────────────────────────────────────────
# NEVER set to "true" in production.
# When "true": enables MARS MODE auto-login, AK bypass, and mock profile fallbacks.
# When "false" or unset: all auth goes through the real backend (Supabase).
VITE_ENABLE_MOCK_AUTH=false

# ── Feature Flags ─────────────────────────────────────────────────────────────
VITE_ENABLE_AGENT_SYSTEM=true
VITE_ENABLE_WEBSOCKET=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ANALYSIS_HISTORY=true

# ── Build ─────────────────────────────────────────────────────────────────────
VITE_APP_NAME=CrisPRO Oncology CoPilot
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
```

## 4. Backend Procfile
```
web: uvicorn api.main:app --host 0.0.0.0 --port $PORT
```

## 5. Backend requirements.txt
```
# MOAT Orchestration Backend Requirements

# Web Framework
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
pydantic>=2.0.0
pydantic-settings>=2.0.0
email-validator>=2.0.0
starlette>=0.27.0

# Async
aiofiles>=23.0.0
httpx>=0.25.0

# Data Processing
numpy>=1.24.0
scipy>=1.11.0
pandas>=2.0.0
scikit-learn>=1.3.0

# Utilities
python-dotenv>=1.0.0
python-multipart>=0.0.6
psycopg2-binary>=2.9.0
requests>=2.31.0
PyYAML>=6.0.0
jsonschema>=4.0.0
rapidfuzz>=3.0.0

# Auth / Security
PyJWT>=2.8.0
pyotp>=2.9.0
qrcode>=7.4.0

# Logging
structlog>=23.0.0
loguru>=0.7.0

# AI / LLM
openai>=1.0.0
groq>=0.11.0
cohere>=4.0.0
anthropic>=0.20.0
google-generativeai>=0.8.0
google-genai>=0.3.0

# Database
supabase>=2.0.0
redis>=5.0.0
neo4j>=5.0.0
astrapy>=0.7.0

# Bio / Medical
biopython>=1.80
pubmed-parser>=0.4.0

# PDF & Image
PyPDF2>=3.0.0
pypdfium2>=4.0.0
Pillow>=10.0.0

# Web scraping
beautifulsoup4>=4.12.0
lxml>=4.9.0

# SAS / SWAT: not on PyPI for all Python versions (e.g. 3.13+); unused in this codebase.
# If you need SAS Viya/CAS, install per SAS docs and pin a compatible Python (often <3.12).
aiosqlite>=0.19.0
pyarrow>=16
statsmodels>=0.14.2
# depmap-downloader: not used (v3/data/depmap_loader uses httpx+pandas). PyPI only has 0.0.x; do not pin fake >=0.1.5.
chembl-webresource-client>=0.10.9
diskcache>=5.6.3
```

## 6. Backend .env files

---
-rw-r--r-- 1 root root   1 Jul  5 13:32 /workspace/crispro-backend-v2/.env.astra
-rw-r--r-- 1 root root   1 Jul  5 13:32 /workspace/crispro-backend-v2/.env.bak
-rw-r--r-- 1 root root   1 Jul  5 13:32 /workspace/crispro-backend-v2/.env.bak2
-rw-r--r-- 1 root root 665 Jul  5 13:32 /workspace/crispro-backend-v2/.env.supabase_test

## 7. Frontend API calls (all fetch URLs)
/workspace/crispro-front-end/src/components/ClinicalDossier/hooks/useClinicalDossier.js:185:      const data = await apiPost('/api/efficacy/predict', {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useACMG.js:4: * Calls POST /api/acmg/classify_variant
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useACMG.js:38:      const data = await apiPost('/api/acmg/classify_variant', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useClinicalTrials.js:5: * - POST /api/clinical_trials/match
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useClinicalTrials.js:6: * - POST /api/clinical_trials/eligibility_check
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useClinicalTrials.js:36:      const data = await apiPost('/api/clinical_trials/match', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useClinicalTrials.js:66:      const data = await apiPost('/api/clinical_trials/eligibility_check', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useEfficacy.js:6: * Calls the unified /api/clinical_genomics/analyze_variant endpoint
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useEfficacy.js:17:      const data = await apiPost('/api/clinical_genomics/analyze_variant', {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useNCCN.js:4: * Calls POST /api/nccn/check_guideline
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useNCCN.js:33:      const data = await apiPost('/api/nccn/check_guideline', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/usePharmGKB.js:5: * - POST /api/pharmgkb/metabolizer_status (CYP2D6, CYP2C19)
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/usePharmGKB.js:6: * - POST /api/pharmgkb/drug_interaction
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/usePharmGKB.js:35:      const data = await apiPost('/api/pharmgkb/metabolizer_status', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/usePharmGKB.js:68:      const data = await apiPost('/api/pharmgkb/drug_interaction', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useResistance.js:4: * Calls POST /api/resistance/predict
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useResistance.js:34:      const data = await apiPost('/api/resistance/predict', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useToxicity.js:4: * Calls /api/safety/toxicity_risk with germline variants, drug MoA, and clinical context.
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useToxicity.js:38:      const data = await apiPost('/api/safety/toxicity_risk', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useToxicity.js:73: * Calls /api/safety/off_target_preview with guide RNAs.
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/hooks/useToxicity.js:93:      const data = await apiPost('/api/safety/off_target_preview', payload, {
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/utils/genomicsUtils.js:1:import { API_ROOT as API_BASE } from '../../../lib/apiConfig';
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/utils/genomicsUtils.js:7: * - Base URL from env (VITE_API_ROOT)
/workspace/crispro-front-end/src/components/ClinicalGenomicsCommandCenter/utils/genomicsUtils.js:66: * @param {string} path - API endpoint path (e.g., '/api/acmg/classify_variant')
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:8:import { API_ROOT } from '../../lib/apiConfig';
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:62:        const response = await fetch(`${API_ROOT}/api/efficacy/config`);
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:144:          '/api/efficacy/predict',
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:145:          '/api/evidence/literature',
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:146:          '/api/evidence/deep_analysis',
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:147:          '/api/evidence/rag-query',
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:148:          '/api/evo/score_variant_profile',
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:149:          '/api/evo/score_variant_probe'
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:155:          liveEndpoints.splice(liveEndpoints.indexOf('/api/evidence/rag-query'), 1);
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:178:        endpoint = '/api/evidence/rag-query';
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:186:          endpoint = '/api/evidence/literature';
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:191:      const response = await fetch(`${API_ROOT}${endpoint}`, {
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:313:      const response = await fetch(`${API_ROOT}/api/copilot/analyze_file`, {
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:450:      case '/api/evidence/deep_analysis':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:456:      case '/api/efficacy/predict':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:459:      case '/api/evidence/literature':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:463:      case '/api/evo/score_variant_profile':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:466:      case '/api/command/run_evidence_bundle':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:469:      case '/api/guidance/radonc':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:472:      case '/api/guidance/chemo':
/workspace/crispro-front-end/src/components/CoPilot/CoPilotLogic.jsx:475:      case '/api/design/guide_rna':
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/Q2CRouterTest.jsx:2:import { API_ROOT } from '../../../lib/apiConfig';
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/Q2CRouterTest.jsx:62:      const response = await fetch(`${API_ROOT}/api/evidence/rag-query`, {
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:1:import { API_ROOT } from '../../../lib/apiConfig';
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:21:    endpoint: '/api/trials/agent/search',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:34:    endpoint: '/api/guidance/chemo',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:47:    endpoint: '/api/evidence/deep_analysis',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:61:    endpoint: '/api/efficacy/predict',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:69:    endpoint: '/api/guidance/radonc',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:82:    endpoint: '/api/evidence/literature',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:95:    endpoint: '/api/evidence/deep_analysis',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:107:    endpoint: '/api/design/guide_rna',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:119:    endpoint: '/api/evidence/explain',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:134:    endpoint: '/api/hypothesis/validate_food_dynamic',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:147:    endpoint: '/api/ayesha/complete_care_plan',
/workspace/crispro-front-end/src/components/CoPilot/Q2CRouter/intents.js:161:    endpoint: '/api/agents/synthetic_lethality',

## 8. Backend endpoint inventory (all @router decorators)
/workspace/crispro-backend-v2/api/routers/ayesha.py:32:@router.post("/targeted-brief", response_model=TargetedBriefV1, tags=["Ayesha"])
/workspace/crispro-backend-v2/api/routers/ayesha.py:42:@router.post("/complete_care_plan")
/workspace/crispro-backend-v2/api/routers/ayesha.py:134:@router.post("/resistance/simulate")
/workspace/crispro-backend-v2/api/routers/ceacam5_demo.py:969:@router.get("/scenarios")
/workspace/crispro-backend-v2/api/routers/ceacam5_demo.py:974:@router.post("/gate-simulate")
/workspace/crispro-backend-v2/api/routers/ceacam5_demo.py:1032:@router.get("/comparators")
/workspace/crispro-backend-v2/api/routers/ceacam5_demo.py:1043:@router.get("/sanofi-payload")
/workspace/crispro-backend-v2/api/routers/ceacam5_demo.py:1073:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/metastasis_interception.py:22:@router.post("/intercept", response_model=MetastasisInterceptResponse)
/workspace/crispro-backend-v2/api/routers/metastasis_interception.py:46:@router.get("/intercept/health")
/workspace/crispro-backend-v2/api/routers/io_selection.py:37:@router.post("/select")
/workspace/crispro-backend-v2/api/routers/io_selection.py:47:@router.post("/profile-card")
/workspace/crispro-backend-v2/api/routers/guidance.py:191:@router.post("/chemo")
/workspace/crispro-backend-v2/api/routers/guidance.py:348:@router.post("/radonc")
/workspace/crispro-backend-v2/api/routers/guidance.py:408:@router.post("/synthetic_lethality")
/workspace/crispro-backend-v2/api/routers/guidance.py:486:@router.get("/synthetic_lethality/depmap-status")
/workspace/crispro-backend-v2/api/routers/health.py:31:@router.get("/")
/workspace/crispro-backend-v2/api/routers/health.py:41:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/health.py:47:@router.post("/api/oracle/assess_variant_threat")
/workspace/crispro-backend-v2/api/routers/health.py:62:@router.post("/api/forge/generate_therapeutics")
/workspace/crispro-backend-v2/api/routers/health.py:73:@router.post("/api/gauntlet/run_trials")
/workspace/crispro-backend-v2/api/routers/health.py:88:@router.post("/api/dossier/generate")
/workspace/crispro-backend-v2/api/routers/admin.py:42:@router.get("/users")
/workspace/crispro-backend-v2/api/routers/admin.py:75:@router.get("/users/{user_id}")
/workspace/crispro-backend-v2/api/routers/admin.py:102:@router.put("/users/{user_id}")
/workspace/crispro-backend-v2/api/routers/admin.py:157:@router.post("/users/{user_id}/suspend")
/workspace/crispro-backend-v2/api/routers/admin.py:193:@router.post("/users/{user_id}/activate")
/workspace/crispro-backend-v2/api/routers/admin.py:229:@router.post("/users/{user_id}/promote")
/workspace/crispro-backend-v2/api/routers/admin.py:279:@router.get("/analytics/overview")
/workspace/crispro-backend-v2/api/routers/admin.py:301:@router.get("/analytics/usage")
/workspace/crispro-backend-v2/api/routers/admin.py:324:@router.get("/activity/logs")
/workspace/crispro-backend-v2/api/routers/admin.py:355:@router.get("/activity/sessions")
/workspace/crispro-backend-v2/api/routers/admin.py:379:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:81:@router.post("/filter")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:125:@router.post("/generate")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:212:@router.post("/batch-generate")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:296:@router.get("/list/{patient_id}")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:341:@router.get("/{patient_id}/{nct_id}")
/workspace/crispro-backend-v2/api/routers/dossiers_intelligence.py:382:@router.post("/comprehensive-analysis")
/workspace/crispro-backend-v2/api/routers/evidence/extraction.py:12:@router.post("/extract")
/workspace/crispro-backend-v2/api/routers/evidence/jobs.py:20:@router.post("/crawl")
/workspace/crispro-backend-v2/api/routers/evidence/jobs.py:48:@router.post("/summarize")
/workspace/crispro-backend-v2/api/routers/evidence/jobs.py:80:@router.post("/align")
/workspace/crispro-backend-v2/api/routers/evidence/jobs.py:112:@router.get("/job/{job_id}")
/workspace/crispro-backend-v2/api/routers/evidence/__init__.py:18:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/evidence/literature.py:175:@router.post("/literature")
/workspace/crispro-backend-v2/api/routers/evidence/literature.py:474:@router.post("/test")
/workspace/crispro-backend-v2/api/routers/evidence/literature.py:486:@router.post("/explain")
/workspace/crispro-backend-v2/api/routers/evidence/rag.py:35:@router.post("/rag-query")
/workspace/crispro-backend-v2/api/routers/evidence/rag.py:104:@router.post("/rag-add-variant")
/workspace/crispro-backend-v2/api/routers/evidence/rag.py:146:@router.get("/rag-stats")
/workspace/crispro-backend-v2/api/routers/evidence/clinvar.py:211:@router.get("/clinvar")
/workspace/crispro-backend-v2/api/routers/evidence/clinvar.py:261:@router.post("/deep_analysis")
/workspace/crispro-backend-v2/api/routers/ayesha_trials/routes.py:42:@router.post("/search", response_model=AyeshaTrialSearchResponse)
/workspace/crispro-backend-v2/api/routers/ayesha_trials/routes.py:619:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/resistance.py:187:@router.post("/ddr-status", response_model=DDRStatusResponse)
/workspace/crispro-backend-v2/api/routers/resistance.py:199:@router.post("/timing-chemo-features", response_model=TimingChemoFeaturesResponse)
/workspace/crispro-backend-v2/api/routers/resistance.py:228:@router.post("/holistic-clinical-benefit", response_model=HolisticClinicalBenefitResponse)
/workspace/crispro-backend-v2/api/routers/resistance.py:232:@router.post("/csi-v0", response_model=CSIv0Response)
/workspace/crispro-backend-v2/api/routers/resistance.py:236:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/orchestrator.py:74:@router.post("/full", response_model=PipelineResponse)
/workspace/crispro-backend-v2/api/routers/orchestrator.py:128:@router.get("/status/{patient_id}", response_model=StatusResponse)
/workspace/crispro-backend-v2/api/routers/orchestrator.py:162:@router.get("/state/{patient_id}")
/workspace/crispro-backend-v2/api/routers/orchestrator.py:189:@router.post("/event")
/workspace/crispro-backend-v2/api/routers/orchestrator.py:223:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/orchestrator.py:257:@router.get("/states")
/workspace/crispro-backend-v2/api/routers/demo.py:230:@router.get("/scenarios")
/workspace/crispro-backend-v2/api/routers/demo.py:240:@router.post("/simulate", response_model=SimulateResponse)
/workspace/crispro-backend-v2/api/routers/demo.py:294:@router.get("/health")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:508:@router.get("/config")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:524:@router.post("/predict")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1234:@router.post("/explain")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1274:@router.get("/run/{run_signature}")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1310:@router.get("/calibration/status")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1334:@router.post("/explain")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1374:@router.get("/run/{run_signature}")
/workspace/crispro-backend-v2/api/routers/efficacy_backup.py:1410:@router.get("/calibration/status")
/workspace/crispro-backend-v2/api/routers/resistance_metadata.py:133:@router.get("/metadata")
/workspace/crispro-backend-v2/api/routers/clinical_genomics.py:28:@router.post("/analyze_variant")
/workspace/crispro-backend-v2/api/routers/clinical_genomics.py:137:@router.get("/health")

## 9. Context Provider Stack (from App.jsx)
23:import { ThemeProvider } from '@mui/material/styles';
29:import { ActivityProvider } from "./context/ActivityContext";
30:import { AnalysisHistoryProvider } from "./context/AnalysisHistoryContext";
31:import { AuthProvider, useAuth } from "./context/AuthContext";
32:import { PatientProvider } from "./context/PatientContext";
33:import { PersonaProvider } from "./context/PersonaContext";
34:import { CoPilotProvider } from "./components/CoPilot/context";
35:import { SporadicProvider } from "./context/SporadicContext";
36:import { AgentProvider } from "./context/AgentContext";
40:import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
142:    <ThemeProvider theme={theme}>
144:      <QueryClientProvider client={queryClient}>
146:          <AuthProvider>
147:            <PersonaProvider>
148:              <PatientProvider>
149:                <AgentProvider>
150:                  <SporadicProvider>
151:                    <CoPilotProvider>
152:                      <AnalysisHistoryProvider>
153:                        <ActivityProvider>
155:                        </ActivityProvider>
156:                      </AnalysisHistoryProvider>
157:                    </CoPilotProvider>
158:                  </SporadicProvider>
159:                </AgentProvider>
160:              </PatientProvider>
161:            </PersonaProvider>
162:          </AuthProvider>
164:      </QueryClientProvider>
165:    </ThemeProvider>

## 10. All Context Files
total 71
drwxr-xr-x  2 root root  4096 Jul  8 07:02 .
drwxr-xr-x 20 root root  4096 Jul  8 07:02 ..
-rw-r--r--  1 root root  4064 Jul  8 07:02 ActivityContext.jsx
-rw-r--r--  1 root root 12712 Jul  8 07:02 AgentContext.jsx
-rw-r--r--  1 root root  9455 Jul  8 07:02 AnalysisHistoryContext.jsx
-rw-r--r--  1 root root 18665 Jul  8 07:02 AuthContext.jsx
-rw-r--r--  1 root root  1548 Jul  8 07:02 PatientContext.jsx
-rw-r--r--  1 root root  5763 Jul  8 07:02 PersonaContext.jsx
-rw-r--r--  1 root root  4662 Jul  8 07:02 SporadicContext.jsx
-rw-r--r--  1 root root  5232 Jul  8 07:02 index.jsx

  ActivityContext.jsx: 115 lines
  AgentContext.jsx: 498 lines
  AnalysisHistoryContext.jsx: 285 lines
  AuthContext.jsx: 513 lines
  PatientContext.jsx: 63 lines
  PersonaContext.jsx: 215 lines
  SporadicContext.jsx: 159 lines
  index.jsx: 157 lines
  *.js:  lines

## 11. Frontend Services
total 13
drwxr-xr-x  3 root root   54 Jul  8 07:02 .
drwxr-xr-x 20 root root 4096 Jul  8 07:02 ..
drwxr-xr-x  2 root root   37 Jul  8 07:02 api
-rw-r--r--  1 root root 8140 Jul  8 07:02 supabaseClient.js

total 8
drwxr-xr-x 2 root root   37 Jul  8 07:02 .
drwxr-xr-x 3 root root   54 Jul  8 07:02 ..
-rw-r--r-- 1 root root 6466 Jul  8 07:02 orchestrator.ts

## 12. Backend Services (detailed)
  __init__.py: 0 lines
  admin_service.py: 378 lines
  agent_executor.py: 508 lines
  agent_manager.py: 474 lines
  agent_scheduler.py: 123 lines
  auth_service.py: 365 lines
  autonomous_trial_agent.py: 481 lines
  ayesha_trial_ranker.py: 124 lines
  biomarker_correlation_service.py: 724 lines
  ca125_intelligence.py: 566 lines
  ca125_intelligence_service.py: 123 lines
  ca125_kinetics.py: 701 lines
  ca125_normalizer.py: 90 lines
  cache_service.py: 324 lines
  clinical_parser.py: 238 lines
  clinical_trial_search_service.py: 288 lines
  compound_alias_resolver.py: 299 lines
  compound_calibration.py: 512 lines
  ctgov_query_builder.py: 331 lines
  database_connections.py: 175 lines
  dietician_recommendations.py: 501 lines
  disease_based_trial_ranker.py: 651 lines
  disease_module_loader.py: 417 lines
  disease_normalization.py: 104 lines
  dosing_guidance_service.py: 294 lines
  dynamic_food_extraction.py: 477 lines
  eligibility_extractor.py: 74 lines
  enformer_client.py: 160 lines
  enhanced_evidence_service.py: 1352 lines
  evidence_artifacts.py: 164 lines
  evo2_gates_service.py: 213 lines
  feature_flag_service.py: 220 lines
  food_data_loader.py: 199 lines
  food_llm_enhancement_service.py: 562 lines
  food_response_builder.py: 257 lines
  food_spe_integration.py: 505 lines
  food_treatment_line_service.py: 311 lines
  food_validation_orchestrator.py: 198 lines
  gene_calibration.py: 353 lines
  gpt_service.py: 192 lines
  hint_tiles_service.py: 486 lines
  holistic_score_service.py: 54 lines
  hotspot_detector.py: 290 lines
  hybrid_trial_search.py: 318 lines
  input_completeness.py: 66 lines
  io_safest_selection_service.py: 256 lines
  job_service.py: 299 lines
  kb_client.py: 210 lines
  kb_store.py: 292 lines
  kb_validator.py: 218 lines
  kill_chain_policy.py: 47 lines
  llm_literature_service.py: 208 lines
  llm_service.py: 295 lines
  llm_toxicity_service.py: 287 lines
  logging_service.py: 0 lines
  mbd4_module.py: 156 lines
  mechanism_fit_ranker.py: 393 lines
  mechanism_map_service.py: 504 lines
  metastasis_interception_service.py: 499 lines
  mfa_service.py: 305 lines
  mm_pathway_service.py: 95 lines
  mrd_air_support.py: 160 lines
  multi_llm_service.py: 566 lines
  neo4j_connection.py: 84 lines
  neo4j_graph_loader.py: 359 lines
  next_test_recommender.py: 409 lines
  ngs_fast_track.py: 278 lines
  pathway_to_mechanism_vector.py: 329 lines
  patient_knowledge_base_agent.py: 427 lines
  persistent_cache.py: 106 lines
  pgx_care_plan_integration.py: 373 lines
  pgx_extraction_service.py: 244 lines
  pgx_production_monitoring.py: 149 lines
  pgx_screening_service.py: 226 lines
  quota_service.py: 346 lines
  resistance_detection_service.py: 285 lines
  resistance_evidence_tiers.py: 57 lines
  resistance_playbook_service.py: 522 lines
  resistance_prophet_service.py: 344 lines
  risk_benefit_composition_service.py: 185 lines
  rss_service.py: 161 lines
  sae_feature_service.py: 52 lines
  sae_model_service.py: 187 lines
  sae_service.py: 468 lines
  safety_service.py: 272 lines
  safety_validator.py: 359 lines
  supabase_service.py: 224 lines
  supplement_recommendation_service.py: 347 lines
  therapeutic_optimizer.py: 467 lines
  therapeutic_prompt_builder.py: 273 lines
  toxicity_pathway_mappings.py: 758 lines
  trial_data_enricher.py: 296 lines
  trial_search_criteria_mapper.py: 144 lines
  tumor_quick_intake.py: 218 lines
  variant_resolution.py: 220 lines

## 13. Frontend Store (zustand)
total 5
drwxr-xr-x  2 root root   30 Jul  8 07:02 .
drwxr-xr-x 20 root root 4096 Jul  8 07:02 ..
-rw-r--r--  1 root root  262 Jul  8 07:02 index.js

### index.js
import { create } from 'zustand';

const useAppStore = create((set) => ({
  activeMutation: null,
  setActiveMutation: (mutation) => set({ activeMutation: mutation }),
  clearActiveMutation: () => set({ activeMutation: null }),
}));

export default useAppStore; 
### *.jsx

## 14. Database Schema (migrations)
### 007_add_data_classification.sql
-- Migration: Add data_classification column to relevant tables
-- Purpose: Classify data as PHI vs NON_PHI for SAAS compliance and retention policies
-- Date: 2025-01-XX

-- Add data_classification column to patient_profiles
ALTER TABLE patient_profiles
ADD COLUMN IF NOT EXISTS data_classification TEXT DEFAULT 'PHI';

-- Add data_classification column to patient_care_plans
ALTER TABLE patient_care_plans
ADD COLUMN IF NOT EXISTS data_classification TEXT DEFAULT 'PHI';

-- Add data_classification column to patient_sessions
ALTER TABLE patient_sessions
ADD COLUMN IF NOT EXISTS data_classification TEXT DEFAULT 'PHI';

-- Add data_classification column to user_profiles (for general user data)
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS data_classification TEXT DEFAULT 'NON_PHI';

-- Add CHECK constraints for allowed values
ALTER TABLE patient_profiles
DROP CONSTRAINT IF EXISTS chk_data_classification_patient_profiles,
ADD CONSTRAINT chk_data_classification_patient_profiles
CHECK (data_classification IN ('PHI', 'NON_PHI', 'SENSITIVE', 'PUBLIC'));

ALTER TABLE patient_care_plans
DROP CONSTRAINT IF EXISTS chk_data_classification_patient_care_plans,
ADD CONSTRAINT chk_data_classification_patient_care_plans
CHECK (data_classification IN ('PHI', 'NON_PHI', 'SENSITIVE', 'PUBLIC'));

ALTER TABLE patient_sessions
DROP CONSTRAINT IF EXISTS chk_data_classification_patient_sessions,
ADD CONSTRAINT chk_data_classification_patient_sessions
CHECK (data_classification IN ('PHI', 'NON_PHI', 'SENSITIVE', 'PUBLIC'));

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS chk_data_classification_user_profiles,
ADD CONSTRAINT chk_data_classification_user_profiles
CHECK (data_classification IN ('PHI', 'NON_PHI', 'SENSITIVE', 'PUBLIC'));

-- Add indexes for faster filtering
CREATE INDEX IF NOT EXISTS idx_patient_profiles_data_classification ON patient_profiles(data_classification);
CREATE INDEX IF NOT EXISTS idx_patient_care_plans_data_classification ON patient_care_plans(data_classification);
CREATE INDEX IF NOT EXISTS idx_patient_sessions_data_classification ON patient_sessions(data_classification);

-- Add comments for documentation
COMMENT ON COLUMN patient_profiles.data_classification IS 'Data classification: PHI (Protected Health Information), NON_PHI, SENSITIVE, or PUBLIC';
COMMENT ON COLUMN patient_care_plans.data_classification IS 'Data classification: PHI (Protected Health Information), NON_PHI, SENSITIVE, or PUBLIC';
COMMENT ON COLUMN patient_sessions.data_classification IS 'Data classification: PHI (Protected Health Information), NON_PHI, SENSITIVE, or PUBLIC';
COMMENT ON COLUMN user_profiles.data_classification IS 'Data classification: PHI (Protected Health Information), NON_PHI, SENSITIVE, or PUBLIC';

### 008_add_mfa_columns.sql
-- Migration: Add MFA (Multi-Factor Authentication) columns to user_profiles
-- Purpose: Enable MFA for admin users and PHI access (HIPAA requirement)
-- Date: 2025-01-XX

-- Add MFA columns to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS mfa_secret TEXT,
ADD COLUMN IF NOT EXISTS mfa_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS mfa_backup_codes TEXT[]; -- Array of backup codes

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_mfa_enabled ON user_profiles(mfa_enabled) WHERE mfa_enabled = TRUE;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.mfa_enabled IS 'Whether MFA is enabled for this user';
COMMENT ON COLUMN user_profiles.mfa_secret IS 'TOTP secret key (encrypted at application level)';
COMMENT ON COLUMN user_profiles.mfa_verified_at IS 'Timestamp of last successful MFA verification';
COMMENT ON COLUMN user_profiles.mfa_backup_codes IS 'Array of backup codes for MFA recovery';

### create_patient_dossiers_table.sql
-- Patient Dossiers Metadata Table
-- Stores metadata about generated dossiers for search and management
-- Actual markdown/JSON files stored in file system: .cursor/patients/{patient_id}/dossiers/

CREATE TABLE IF NOT EXISTS patient_dossiers (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    nct_id VARCHAR(50) NOT NULL,
    dossier_id VARCHAR(255) UNIQUE NOT NULL,
    tier VARCHAR(20),  -- 'TOP_TIER', 'GOOD_TIER', 'OK_TIER'
    match_score FLOAT,
    file_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(patient_id, nct_id)
);

CREATE INDEX idx_patient_dossiers_patient_id ON patient_dossiers(patient_id);
CREATE INDEX idx_patient_dossiers_nct_id ON patient_dossiers(nct_id);
CREATE INDEX idx_patient_dossiers_tier ON patient_dossiers(tier);
CREATE INDEX idx_patient_dossiers_match_score ON patient_dossiers(match_score DESC);



## 15. vite.config.js
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

## 16. tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
import preline from "preline/plugin";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/preline/dist/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                epilogue: ["Epilogue", "sans-serif", "Poppins"],
            },
            boxShadow: {
                secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
            },
            colors: {
                mainBackgroundColor: "#0D1117",
                columnBackgroundColor: "#161C22",
            },
        },
    },
    plugins: [preline],
};
```

## 17. index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CrisPro: Oncology Co-Pilot</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- CRITICAL: Response.headers protection + Render cold-start retry must run BEFORE any modules load -->
    <script>
      // Protect Response.headers access at the earliest possible moment
      // This runs before any ES modules are loaded to catch initialization errors
      (function() {
        'use strict';
        
        if (typeof Response !== 'undefined' && Response.prototype) {
          // Store original headers descriptor if it exists
          const originalDescriptor = Object.getOwnPropertyDescriptor(Response.prototype, 'headers');
          
          // Override headers getter to always return a valid Headers object
          Object.defineProperty(Response.prototype, 'headers', {
            get: function() {
              // Safety check: if this is not a valid Response, return empty Headers
              if (!this || typeof this !== 'object') {
                return new Headers();
              }
              
              // Try to get original headers
              try {
                if (originalDescriptor && originalDescriptor.get) {
                  const headers = originalDescriptor.get.call(this);
                  return headers || new Headers();
                }
                // Fallback: if no original getter, check if headers property exists
                if (this._headers) {
                  return this._headers;
                }
              } catch (e) {
                // If accessing headers fails, return empty Headers
                console.warn('[Response.headers protection] Error accessing headers:', e);
              }
              
              // Last resort: return empty Headers
              return new Headers();
            },
            configurable: true,
            enumerable: true
          });
        }
        
        // ── Render cold-start retry wrapper ──────────────────────────────────────
        // Problem: Render free-tier services sleep after 15 min of inactivity.
        // When waking, they return 502/503 with NO CORS headers for 5-10 seconds.
        // The browser sees this as "TypeError: Failed to fetch" (network error).
        // Fix: wrap window.fetch globally to retry on network errors and 502/503/504.
        //
        // Only retries requests to our backend (Railway production host).
        // All other fetches (CDN, analytics, etc.) pass through unchanged.
        // ─────────────────────────────────────────────────────────────────────────
        if (typeof window !== 'undefined' && window.fetch) {
          var _originalFetch = window.fetch;
          var _BACKEND_HOST = 'crispro-backend-v2-production.up.railway.app'; // Railway — no sleep/hibernate
          var _MAX_RETRIES = 2;
          var _BASE_DELAY_MS = 3000;

          function _sleep(ms) {
            return new Promise(function(resolve) { setTimeout(resolve, ms); });
          }

          function _isBackendUrl(args) {
            try {
              var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url) || '';
              return url.indexOf(_BACKEND_HOST) !== -1;
            } catch(e) { return false; }
          }

          function _isRetryableStatus(status) {
            return status === 502 || status === 503 || status === 504;
          }

          window.fetch = function() {
            var args = Array.prototype.slice.call(arguments);
            var isBackend = _isBackendUrl(args);

            if (!isBackend) {
              // Non-backend: pass through with original headers protection only
              return _originalFetch.apply(this, args).then(function(response) {
                if (response && !response.headers) {
                  try { Object.defineProperty(response, 'headers', { value: new Headers(), writable: false, configurable: true }); } catch(e) {}
                }
                return response;
              }).catch(function(error) {
                console.error('[Fetch protection] Fetch error:', error);
                throw error;
              });
            }

            // Backend request: retry on network error or 502/503/504
            var attempt = 0;
            function doFetch() {
              return _originalFetch.apply(window, args).then(function(response) {
                // Ensure headers property exists
                if (response && !response.headers) {
                  try { Object.defineProperty(response, 'headers', { value: new Headers(), writable: false, configurable: true }); } catch(e) {}
                }
                // Retry on gateway errors (Render waking up)
                if (_isRetryableStatus(response.status) && attempt < _MAX_RETRIES) {
                  attempt++;
                  var delay = _BASE_DELAY_MS * attempt;
                  console.warn('[Fetch retry] ' + response.status + ' from backend — retrying in ' + delay + 'ms (attempt ' + attempt + '/' + _MAX_RETRIES + ')');
                  return _sleep(delay).then(doFetch);
                }
                return response;
              }).catch(function(error) {
                // TypeError: Failed to fetch = network error or CORS-less 502/503
                if (attempt < _MAX_RETRIES) {
                  attempt++;
                  var delay = _BASE_DELAY_MS * attempt;
                  console.warn('[Fetch retry] Network error from backend — retrying in ' + delay + 'ms (attempt ' + attempt + '/' + _MAX_RETRIES + '): ' + error.message);
                  return _sleep(delay).then(doFetch);
                }
                console.error('[Fetch protection] Fetch error:', error);
                throw error;
              });
            }
            return doFetch();
          };
        }
      })();
    </script>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

## 18. Backend WebSocket Support

## 19. CORS Origins
"""
Browser CORS allow_origins for apps that use explicit literals (not env-only).

``api.config.ALLOWED_ORIGINS`` is still used elsewhere (e.g. env-driven defaults).
For ``api.main:app`` and related entrypoints, production frontends must stay listed
here so Render dashboard env drift cannot silently drop them.

When adding a new Render frontend URL or local dev origin, update ``CORS_ALLOW_ORIGINS`` only.
"""

from typing import Final, Tuple

CORS_ALLOW_ORIGINS: Final[Tuple[str, ...]] = (
    "https://crispro-front-end.onrender.com",
    "https://crispro-front-end-22.onrender.com",
    "https://crispro-front-end-lubq.onrender.com",    # active Render deploy slug (added 2026-06-05)
    "https://crispro-frontend.onrender.com",          # Render frontend (added 2026-06-05)
    "https://crispro-frontend-demo.vercel.app",        # Vercel demo frontend (added 2026-06-04)
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
)

## 20. Supabase Integration Depth
28
files with supabase refs:
/workspace/crispro-front-end/src/components/CoPilotDoctrineGapAnalysis.jsx
/workspace/crispro-front-end/src/context/AgentContext.jsx
/workspace/crispro-front-end/src/context/AnalysisHistoryContext.jsx
/workspace/crispro-front-end/src/hooks/useAyeshaTestsUnlocksBundle.js
/workspace/crispro-front-end/src/hooks/useDrugDetail.js
/workspace/crispro-front-end/src/hooks/useTargetedTherapyBrief.js
/workspace/crispro-front-end/src/hooks/useTumorBoardBundle.js
/workspace/crispro-front-end/src/services/supabaseClient.js
/workspace/crispro-front-end/src/utils/sessionPersistence.js

## 21. Backend Supabase Integration
/workspace/crispro-backend-v2/api/services/supabase_service.py:10:from ..config import SUPABASE_URL, SUPABASE_KEY
/workspace/crispro-backend-v2/api/services/supabase_service.py:18:        self.url = SUPABASE_URL
/workspace/crispro-backend-v2/api/services/supabase_service.py:19:        self.key = SUPABASE_KEY
/workspace/crispro-backend-v2/api/services/supabase_service.py:186:supabase = SupabaseService()
/workspace/crispro-backend-v2/api/services/supabase_service.py:189:async def _supabase_select(table: str, columns: list = None, eq: dict = None, limit: int = 1000):
/workspace/crispro-backend-v2/api/services/supabase_service.py:191:    return await supabase.select(table, eq or {}, limit=limit)
/workspace/crispro-backend-v2/api/services/supabase_service.py:193:async def _supabase_event(stage: str, data: dict, run_signature: str = "default"):
/workspace/crispro-backend-v2/api/services/supabase_service.py:195:    await supabase.log_event(run_signature, stage, str(data))
/workspace/crispro-backend-v2/api/services/supabase_service.py:197:async def _supabase_insert(table: str, rows: list):
/workspace/crispro-backend-v2/api/services/supabase_service.py:199:    await supabase.insert(table, rows)
/workspace/crispro-backend-v2/api/services/supabase_service.py:201:async def _supabase_update(table: str, data: dict, eq: dict):
/workspace/crispro-backend-v2/api/services/supabase_service.py:203:    if not supabase.enabled or not table or not data or not eq:
/workspace/crispro-backend-v2/api/services/supabase_service.py:206:    url = f"{supabase.url.rstrip('/')}/rest/v1/{table}"
/workspace/crispro-backend-v2/api/services/supabase_service.py:208:        "apikey": supabase.key,
/workspace/crispro-backend-v2/api/services/supabase_service.py:209:        "Authorization": f"Bearer {supabase.key}",
/workspace/crispro-backend-v2/api/services/agent_manager.py:14:# Try to import supabase, but handle gracefully if not installed
/workspace/crispro-backend-v2/api/services/agent_manager.py:16:    from supabase import create_client, Client
/workspace/crispro-backend-v2/api/services/agent_manager.py:17:    SUPABASE_AVAILABLE = True
/workspace/crispro-backend-v2/api/services/agent_manager.py:19:    SUPABASE_AVAILABLE = False
/workspace/crispro-backend-v2/api/services/agent_manager.py:22:from ..config import SUPABASE_URL, SUPABASE_KEY
/workspace/crispro-backend-v2/api/services/agent_manager.py:27:SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY") or SUPABASE_KEY
/workspace/crispro-backend-v2/api/services/agent_manager.py:28:_supabase_client: Optional[Client] = None
/workspace/crispro-backend-v2/api/services/agent_manager.py:30:def get_supabase_client() -> Optional[Client]:
/workspace/crispro-backend-v2/api/services/agent_manager.py:32:    global _supabase_client
/workspace/crispro-backend-v2/api/services/agent_manager.py:34:    if not SUPABASE_AVAILABLE:
/workspace/crispro-backend-v2/api/services/agent_manager.py:35:        logger.warning("⚠️ supabase package not installed. Run: pip install supabase")
/workspace/crispro-backend-v2/api/services/agent_manager.py:38:    if _supabase_client is None:
/workspace/crispro-backend-v2/api/services/agent_manager.py:39:        if not SUPABASE_URL or not SUPABASE_ANON_KEY:
/workspace/crispro-backend-v2/api/services/agent_manager.py:40:            logger.warning("⚠️ Supabase not configured (SUPABASE_URL or SUPABASE_ANON_KEY missing)")
/workspace/crispro-backend-v2/api/services/agent_manager.py:44:            _supabase_client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

## AUDIT COMPLETE
