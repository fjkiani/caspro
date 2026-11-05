# Audit 2: Backend v2 API Architecture

## 1. main.py
```python
"""
MOAT Orchestration Backend - Main FastAPI Application

The core backend for the oncology-focused agentic orchestration system.

Features:
- Modular agent architecture
- Full patient pipeline orchestration
- Validated resistance prediction (DIS3 RR=2.08, TP53 RR=1.90)
- Disease-agnostic design (Ovarian, Myeloma, more to come)

Run with:
    uvicorn main:app --reload --port 8000
    # Reload trigger
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="MOAT Orchestration API",
    description="""
    🏆 Ultimate MOAT Orchestration System
    
    Vision: "Upload once. Track forever. Never miss a signal."
    
    ## Features
    
    - **Full Pipeline Orchestration**: Coordinate all agents in optimal order
    - **Resistance Prediction**: Validated markers (DIS3 RR=2.08, TP53 RR=1.90)
    - **Drug Efficacy Ranking**: S/P/E framework
    - **Clinical Trial Matching**: 7D mechanism vector
    - **Care Plan Generation**: Unified patient care documents
    - **Continuous Monitoring**: Early resistance detection
    
    ## Supported Diseases
    
    - **Ovarian Cancer**: MAPK/PI3K pathway resistance, platinum sensitivity
    - **Multiple Myeloma**: PI/IMiD resistance, cytogenetics risk
    
    ## Validated Capabilities
    
    | Marker | RR | p-value | Status |
    |--------|-----|---------|--------|
    | DIS3 (MM) | 2.08 | 0.0145 | ✅ VALIDATED |
    | TP53 (MM) | 1.90 | 0.11 | ⚠️ TREND |
    | NF1 (OV) | 2.10 | <0.05 | ✅ VALIDATED |
    | KRAS (OV) | 1.97 | <0.05 | ✅ VALIDATED |
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
# allow_origins must be explicit (not "*") when allow_credentials=True.
# ALLOWED_ORIGINS env var can extend this list (comma-separated), but the
# production frontend is always included regardless of env var state.
import os as _os
_ALWAYS_ALLOWED = [
    "https://crispro-front-end.onrender.com",        # production frontend
    "https://crispro-front-end-lubq.onrender.com",   # active Render deploy slug (added 2026-06-05)
    "https://crispro-frontend-demo.vercel.app",       # Vercel demo frontend (added 2026-06-04)
    "http://localhost:5173",                          # Vite dev server
    "http://localhost:3000",                          # alternate dev
    "http://127.0.0.1:5173",
]
_raw_origins = _os.getenv("ALLOWED_ORIGINS", "").strip()
_extra_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()] if _raw_origins else []
_allowed_origins = list(dict.fromkeys(_ALWAYS_ALLOWED + _extra_origins))  # deduplicated, order preserved

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization"],
)

# Import and register routers
from api.routers.orchestrate import router as orchestrate_router
from api.routers.resistance import router as resistance_router
from api.routers.guidance import router as guidance_router
from api.routers.vus import router as vus_router
from api.routers.evo import router as evo_router
from api.routers.insights import router as insights_router
from api.routers.fusion import router as fusion_router
from api.routers.evidence import router as evidence_router
from api.routers.health import router as health_router
from api.routers.efficacy.router import router as efficacy_router

app.include_router(orchestrate_router)
app.include_router(resistance_router)
app.include_router(guidance_router)
app.include_router(vus_router)
app.include_router(evo_router)
app.include_router(insights_router)
app.include_router(efficacy_router)
app.include_router(fusion_router)
app.include_router(evidence_router)
app.include_router(health_router)

# Try to include trials router if available
try:
    from api.routers.trials_agent import router as trials_router
    app.include_router(trials_router)
except ImportError:
    logger.warning("Trials router not available")

# Include agents router (Zeta Agent system)
try:
    from api.routers import agents as agents_router
    app.include_router(agents_router.router)
    logger.info("✅ Agents router registered")
except ImportError as e:
    logger.warning(f"⚠️ Agents router not available: {e}")

# Include research intelligence router
try:
    from api.routers import research_intelligence as research_intelligence_router
    app.include_router(research_intelligence_router.router)
    logger.info("✅ Research intelligence router registered")
except ImportError as e:
    logger.warning(f"⚠️ Research intelligence router not available: {e}")

# Include Ayesha orchestrator v2 router (complete_care_v2 endpoint)
try:
    from api.routers import ayesha_orchestrator_v2 as ayesha_orchestrator_v2_router
    app.include_router(ayesha_orchestrator_v2_router.router)
    logger.info("✅ Ayesha orchestrator v2 router registered")
except ImportError as e:
    logger.warning(f"⚠️ Ayesha orchestrator v2 router not available: {e}")

# Include Ayesha trials router (Modular)
try:
    from api.routers import ayesha_trials
    app.include_router(ayesha_trials.router)
    logger.info("✅ Ayesha trials router registered")
except ImportError as e:
    logger.warning(f"⚠️ Ayesha trials router not available: {e}")

# Include Ayesha Therapy Fit router (Service-based modular architecture)
try:
    from api.routers import ayesha_therapy_fit
    app.include_router(ayesha_therapy_fit.router)
    logger.info("✅ Ayesha therapy fit router registered")
except ImportError as e:
    logger.warning(f"⚠️ Ayesha therapy fit router not available: {e}")

# Include SPE Repurposing Arsenal router
try:
    from api.routers.therapy_fit_router import router as spe_arsenal_router
    app.include_router(spe_arsenal_router)
    logger.info("✅ SPE Repurposing Arsenal router registered")
except ImportError as e:
    logger.warning(f"⚠️ SPE Repurposing Arsenal router not available: {e}")




# Include IO selection router
try:
    from api.routers import io_selection as io_selection_router
    app.include_router(io_selection_router.router)
    logger.info("✅ IO selection router registered")
except ImportError as e:
    logger.warning(f"⚠️ IO selection router not available: {e}")

# Include auth router
try:
    from api.routers import auth as auth_router
    app.include_router(auth_router.router)
    logger.info("✅ Auth router registered")
except ImportError as e:
    logger.warning(f"⚠️ Auth router not available: {e}")


# Include LLM router
try:
    from api.routers import llm as llm_router
    app.include_router(llm_router.router)
    logger.info("✅ LLM router registered")
except ImportError as e:
    logger.warning(f"⚠️ LLM router not available: {e}")

# Include population analytics router
try:
    from api.routers import population as population_router
    app.include_router(population_router.router)
    logger.info("✅ Population router registered")
except ImportError as e:
    logger.warning(f"⚠️ Population router not available: {e}")

# Include hypothesis validator router
try:
    from api.routers import hypothesis_validator as hypothesis_router
    app.include_router(hypothesis_router.router)
    logger.info("✅ Hypothesis validator router registered")
except ImportError as e:
    logger.warning(f"⚠️ Hypothesis validator router not available: {e}")

@app.get("/ping")
async def ping():
    """Instant health check — used by Render health check and keep-alive pings."""
    return {"ok": True}


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    import asyncio
    import os as _os

    logger.info("🚀 Starting MOAT Orchestration Backend")
    logger.info("📊 Validated markers loaded: DIS3, TP53, NF1, KRAS")
    logger.info("🏥 Supported diseases: Ovarian, Myeloma")

    # Keep-alive: self-ping every 10 minutes to prevent Render free-tier hibernation.
    # Only runs when KEEP_ALIVE_ENABLED=true (set in Render env vars).
    if _os.getenv("KEEP_ALIVE_ENABLED", "").lower() in ("1", "true", "yes"):
        import httpx

        async def _keep_alive_loop():
            await asyncio.sleep(60)  # Wait 60s after startup before first ping
            while True:
                try:
                    async with httpx.AsyncClient(timeout=10) as client:
                        r = await client.get("http://localhost:" + str(_os.getenv("PORT", "8000")) + "/ping")
                        logger.debug(f"Keep-alive ping: {r.status_code}")
                except Exception as _ka_err:
                    logger.debug(f"Keep-alive ping failed (non-fatal): {_ka_err}")
                await asyncio.sleep(600)  # 10 minutes

        asyncio.create_task(_keep_alive_loop())
        logger.info("🏓 Keep-alive loop started (10-min interval)")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown."""
    logger.info("👋 Shutting down MOAT Orchestration Backend")


@app.get("/")
async def root():
    """Root endpoint with API overview."""
    return {
        "service": "MOAT Orchestration API",
        "version": "1.0.0",
        "vision": "Upload once. Track forever. Never miss a signal.",
        "endpoints": {
            "orchestration": "/api/orchestrate/full",
            "resistance": "/api/resistance/predict",
            "patients": "/api/patients",
            "health": "/api/health",
            "docs": "/docs"
        },
        "validated_markers": {
            "myeloma": {
                "DIS3": {"RR": 2.08, "p_value": 0.0145, "status": "VALIDATED"},
                "TP53": {"RR": 1.90, "p_value": 0.11, "status": "TREND"}
            },
            "ovarian": {
                "NF1": {"RR": 2.10, "status": "VALIDATED"},
                "KRAS": {"RR": 1.97, "status": "VALIDATED"}
            }
        }
    }


@app.get("/api/debug/trials")
async def debug_trials():
    """Diagnostic endpoint to debug trial pipeline on Render."""
    import traceback
    from pathlib import Path
    diag = {}
    
    # 1. Check DB file
    try:
        project_root = Path(__file__).resolve().parent
        db_path = project_root / "data" / "clinical_trials.db"
        diag["db_path"] = str(db_path)
        diag["db_exists"] = db_path.exists()
        if db_path.exists():
            diag["db_size_mb"] = round(db_path.stat().st_size / 1024 / 1024, 1)
    except Exception as e:
        diag["db_check_error"] = str(e)
    
    # 2. Check SQLite connection
    try:
        from api.services.database_connections import get_db_connections
        db_conn = get_db_connections()
        conn = db_conn.get_sqlite_connection()
        diag["sqlite_connected"] = conn is not None
        if conn:
            cur = conn.cursor()
            cur.execute("SELECT count(*) FROM trials")
            diag["trials_table_count"] = cur.fetchone()[0]
            try:
                cur.execute("SELECT count(*) FROM v_discovery_all_active")
                diag["view_count"] = cur.fetchone()[0]
            except Exception as ve:
                diag["view_error"] = str(ve)
    except Exception as e:
        diag["sqlite_error"] = f"{type(e).__name__}: {e}"
    
    # 3. Check discovery import
    try:
        from api.routers.ayesha_trials.discovery import discover_ayesha_candidates
        diag["discovery_import"] = "OK"
    except Exception as e:
        diag["discovery_import_error"] = f"{type(e).__name__}: {e}"
    
    # 4. Check enrichment import
    try:
        from api.routers.ayesha_trials.enrichment import enrich_trial_with_moa
        diag["enrichment_import"] = "OK"
    except Exception as e:
        diag["enrichment_import_error"] = f"{type(e).__name__}: {e}"
        diag["enrichment_traceback"] = traceback.format_exc()
    
    # 5. Check ranker import
    try:
        from api.services.ayesha_trial_ranker import get_ayesha_trial_ranker
        diag["ranker_import"] = "OK"
    except Exception as e:
        diag["ranker_import_error"] = f"{type(e).__name__}: {e}"
    
    # 6. Run discovery
    try:
        result = discover_ayesha_candidates(location_state="NY", max_candidates=10)
        diag["discovery_count"] = len(result.get("candidate_trial_ids", []))
        diag["discovery_provenance"] = result.get("provenance", {})
    except Exception as e:
        diag["discovery_run_error"] = f"{type(e).__name__}: {e}"
    
    # 7. Run ranker
    try:
        ranker = get_ayesha_trial_ranker()
        trials = ranker.rank_trials_for_ayesha_with_details(max_results=3)
        diag["ranker_count"] = len(trials)
        if trials:
            diag["ranker_sample"] = [t.get("nct_id") for t in trials[:3]]
    except Exception as e:
        diag["ranker_run_error"] = f"{type(e).__name__}: {e}"
        diag["ranker_traceback"] = traceback.format_exc()
    
    return diag


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

```

## 2. api/main.py
```python
"""
Modular FastAPI application for oncology-backend-v2
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
import httpx
import time
import asyncio
import logging
import os

logger = logging.getLogger(__name__)

from .config import EVO_TIMEOUT, MODEL_TO_BASE, USE_CASES, SUPABASE_URL, SUPABASE_KEY, get_api_flags
from .constants.cors import CORS_ALLOW_ORIGINS
from .services.supabase_service import _supabase_select, _supabase_event
from .routers import health, myeloma, evo, evidence, efficacy
from api.routers import personalized_outreach
from .routers import fusion as fusion_router
from .routers import guidance as guidance_router
from .routers import datasets as datasets_router
from .routers import insights as insights_router
from .routers import design as design_router
from .routers import command_center as command_router
from .routers import sessions as sessions_router
from .routers import auth as auth_router
from .routers import admin as admin_router
from .routers import patient as patient_router
from .routers import doctor as doctor_router
from .routers import dsr as dsr_router  # NEW: Data Subject Requests (GDPR compliance) (Jan 2025)
from .routers import toxicity as toxicity_router
from .routers import safety as safety_router
from .routers import metastasis as metastasis_router
# TEMPORARILY DISABLED - IndentationError in metastasis_interception.py line 75
# from .routers import metastasis_interception as metastasis_interception_router
from .routers.kb import router as kb_router
from .routers import acmg as acmg_router
from .routers import pharmgkb as pharmgkb_router
from .routers import pgx_health as pgx_health_router
from .routers import dosing as dosing_router
from .routers import supplements as supplements_router
from .routers import clinical_trials as clinical_trials_router
from .routers import trials as trials_router  # NEW: Search and refresh endpoints
from .routers import trials_graph as trials_graph_router  # NEW: Graph-optimized search
from .routers import trials_agent as trials_agent_router  # NEW: Autonomous trial agent
from .routers import advanced_trial_queries as advanced_trial_queries_router  # NEW: Advanced multi-criteria query endpoint
from .routers import trials_simulator as trials_simulator_router  # NEW: Autonomous Trial Simulator socket
from .routers import resistance as resistance_router
from .routers import resistance_predict as resistance_predict_router
from .routers import resistance_metadata as resistance_metadata_router  # Sprint 3: Kill Chain metadata endpoint
from .routers.resistance import ayesha_router as resistance_ayesha_router  # /api/ayesha/resistance/simulate
from .routers import nccn as nccn_router
from .routers import clinical_genomics as clinical_genomics_router
from .routers import llm as llm_router
from .routers import copilot as copilot_router  # NEW: CoPilot OCR & Analysis (Phase 7)
# from .routers import offtarget as offtarget_router  # TODO: Not created yet
from .routers import kg as kg_router
from .routers import hypothesis_validator as hypothesis_validator_router
from .routers import ayesha_twin_demo as ayesha_twin_demo_router
from .routers import ayesha as ayesha_router
from .routers import tumor as tumor_router  # NEW: Sporadic Cancer Strategy (Day 1)
from .routers import care as care_router  # NEW: Resistance Playbook (Section 17)
from .routers import canine as canine_router  # NEW: Canine TCC VetOnco module (May 2026)
from .routers import ceacam5_demo as ceacam5_demo_router  # NEW: CEACAM5 Intelligence Demo — Brenus/STC-1010 (Jun 2026)
try:
    from .routers import ayesha_trials as ayesha_trials_router  # NEW: Ayesha clinical trials (Jan 13, 2025)
except ImportError:
    ayesha_trials_router = None
    logger.warning("⚠️ ayesha_trials router not available - skipping")
try:
    from .routers import ayesha_therapy_fit as ayesha_therapy_fit_router  # NEW: Ayesha Therapy Fit analysis (Jan 25, 2026)
except ImportError:
    ayesha_therapy_fit_router = None
    logger.warning("⚠️ ayesha_therapy_fit router not available - skipping")
try:
    from .routers import therapy_fit_router as spe_arsenal_router  # SPE Repurposing Arsenal (Mar 2026)
except ImportError:
    spe_arsenal_router = None
    logger.warning("⚠️ therapy_fit_router (SPE Arsenal) not available - skipping")
try:
    from .routers import ayesha_l1 as ayesha_l1_router  # NEW: Ayesha L1 simplified endpoint (Jan 27, 2026)
except ImportError:
    ayesha_l1_router = None
    logger.warning("⚠️ ayesha_l1 router not available - skipping")
from .routers import ayesha_orchestrator_v2 as ayesha_orchestrator_v2_router  # NEW: Complete care v2 orchestrator (Jan 13, 2025)
try:
    from .routers import ayesha_soc_spe as ayesha_soc_spe_router  # NEW: SOC L1 S/P/E analysis (Jan 26, 2025)
except ImportError:
    ayesha_soc_spe_router = None
    logger.warning("⚠️ ayesha_soc_spe router not available - skipping")
from .routers import complete_care_universal as complete_care_universal_router  # NEW: Universal complete care orchestrator (Jan 2025)
from .routers import biomarker_intelligence as biomarker_intelligence_router  # NEW: Universal biomarker intelligence (Jan 2025)
from .routers import dossiers as dossiers_router  # NEW: JR2 dossier generation pipeline (Jan 13, 2025)
from .routers import ayesha_dossiers as ayesha_dossiers_router  # NEW: Ayesha dossier browser API (Nov 17, 2025)
from .routers import dossiers_intelligence as dossiers_intelligence_router  # NEW: Universal dossier intelligence API (Nov 2025)
from .routers import agents as agents_router  # NEW: Zeta Agent system (Jan 13, 2025)
from .routers import sae as sae_router  # NEW: SAE (Sparse Autoencoder) feature extraction (Jan 14, 2025)
from .routers import expression as expression_router  # NEW: Expression ingest (RUO) (Dec 2025)
from .routers import orchestrator as orchestrator_router  # NEW: MOAT Orchestration - State Management & Pipeline (Jan 2025)
# GPT router is optional; some deployments don't include it.
try:
    from .routers import gpt as gpt_router  # type: ignore
except Exception as _gpt_import_err:
    gpt_router = None  # type: ignore
    logger.warning(f"⚠️ GPT router unavailable - skipping: {_gpt_import_err}")

from .routers import research_intelligence as research_intelligence_router
from .routers import patient_kb as patient_kb_router  # NEW: Patient Knowledge Base Agent (Jan 2026)
from .routers import holistic_score as holistic_score_router  # NEW: Holistic Score Router (Jan 2026)

# Optional imports - these routers may not exist yet
try:
    from .routers import surrogate_validator as surrogate_validator_router
except ImportError:
    surrogate_validator_router = None
    logger.warning("⚠️ surrogate_validator router not available - skipping")

try:
    from .routers import vus as vus_router
except ImportError:
    vus_router = None
    logger.warning("⚠️ vus router not available - skipping")
# Copilot orchestrator removed - RAG integration is via evidence.router (evidence/rag.py)

app = FastAPI(
    title="Oncology Backend API",
    description="Modular FastAPI backend for CRISPR-based precision oncology",
    version="2.0.0"
)

# CORS middleware — allow_origins from api/constants/cors.py (single source of truth).
# If allow_credentials=True, Starlette will NOT emit Access-Control-Allow-Origin: *.
# Do not switch this block to api.config.ALLOWED_ORIGINS only: env on Render has
# historically omitted production frontends → silent CORS failures.
_allowed_origins = list(CORS_ALLOW_ORIGINS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    """Instant health check — Railway healthcheck path."""
    return {"ok": True}


@app.get("/debug/cors")
async def debug_cors():
    """Effective Starlette CORS allow_origins (literal list; not env-driven)."""
    return {"allowed_origins": list(CORS_ALLOW_ORIGINS)}


# Timing middleware — emits X-Run-Id and X-Process-Time-Ms on every response (A-Z Guide §N)
from .middleware.timing import TimingMiddleware
app.add_middleware(TimingMiddleware)

# Security headers middleware
from .middleware.security_headers import SecurityHeadersMiddleware
app.add_middleware(SecurityHeadersMiddleware)

# HIPAA/PII detection middleware (only when HIPAA_MODE=true)
HIPAA_MODE = os.getenv("HIPAA_MODE", "false").lower() == "true"
if HIPAA_MODE:
    from .middleware.hipaa_pii import HIPAAPIIMiddleware
    app.add_middleware(HIPAAPIIMiddleware)
    logger.info("✅ HIPAA/PII protection middleware enabled")

# Include routers
app.include_router(health.router)
app.include_router(myeloma.router)
app.include_router(evo.router)
app.include_router(evidence.router)
app.include_router(personalized_outreach.router)
app.include_router(efficacy.router)
app.include_router(guidance_router.router)
app.include_router(fusion_router.router)
app.include_router(sessions_router.router)
app.include_router(auth_router.router)  # NEW: Authentication endpoints
app.include_router(admin_router.router)  # NEW: Admin dashboard endpoints
# Toxicity hint (germline-aware caution)
# app.include_router(toxicity_router.router)  # Temporarily disabled - pre-existing issue
# Safety endpoints (toxicity risk + off-target preview) - P1 LIVE
app.include_router(safety_router.router)
# Metastasis cascade risk assessment
# TEMPORARILY DISABLED - AttributeError: no attribute 'router'
# app.include_router(metastasis_router.router)
# Metastasis interception (weapon design)
# TEMPORARILY DISABLED - IndentationError
# app.include_router(metastasis_interception_router.router)
# app.include_router(kb_router.router)  # Temporarily disabled

# Conditionally include new routers based on API flags
_api_flags = get_api_flags()
if _api_flags.get("insights"):
    app.include_router(insights_router.router)
if _api_flags.get("design"):
    app.include_router(design_router.router)
if _api_flags.get("command_center"):
    app.include_router(command_router.router)
app.include_router(datasets_router.router)
app.include_router(acmg_router.router)
app.include_router(pharmgkb_router.router)
app.include_router(pgx_health_router.router)
app.include_router(dosing_router.router)
app.include_router(supplements_router.router)  # NEW: Supplement recommendations based on drugs + treatment line (Jan 2026)
app.include_router(clinical_trials_router.router)
app.include_router(trials_router.router)  # NEW: /api/search-trials and /api/trials/refresh_status
app.include_router(trials_graph_router.router)  # NEW: /api/trials/search-optimized (hybrid graph search)
app.include_router(trials_agent_router.router)  # NEW: /api/trials/agent/search (autonomous agent)
app.include_router(advanced_trial_queries_router.router)  # NEW: /api/trials/advanced-query (complex multi-criteria queries)
app.include_router(trials_simulator_router.router)  # NEW: /api/trials/simulator
app.include_router(resistance_router.router)
app.include_router(resistance_predict_router.router)  # NEW: /api/resistance/predict (disease-agnostic)
app.include_router(resistance_metadata_router.router)  # Sprint 3: /api/resistance/metadata (static Kill Chain constants)
app.include_router(resistance_ayesha_router)  # /api/ayesha/resistance/simulate — Evo2+Gates wired
app.include_router(nccn_router.router)
app.include_router(clinical_genomics_router.router)
app.include_router(llm_router.router)  # LLM endpoints for AI explanations
app.include_router(copilot_router.router)  # NEW: CoPilot Analysis Endpoints
# app.include_router(offtarget_router.router)  # TODO: Not created yet
app.include_router(kg_router.router)
app.include_router(hypothesis_validator_router.router)
app.include_router(ayesha_twin_demo_router.router)
app.include_router(ayesha_router.router)
app.include_router(tumor_router.router)  # NEW: Sporadic Cancer Strategy (Day 1-7)
app.include_router(canine_router.router)  # NEW: Canine TCC — VetOnco SaaS (May 2026)
app.include_router(care_router.router)  # NEW: Resistance Playbook (Section 17)
app.include_router(ceacam5_demo_router.router)  # NEW: CEACAM5 Intelligence Demo — Brenus/STC-1010 (Jun 2026)
if ayesha_trials_router and hasattr(ayesha_trials_router, 'router'):
    app.include_router(ayesha_trials_router.router)  # NEW: Ayesha clinical trials - FOR AYESHA'S LIFE (Jan 13, 2025)
if ayesha_therapy_fit_router and hasattr(ayesha_therapy_fit_router, 'router'):
    app.include_router(ayesha_therapy_fit_router.router)  # NEW: Ayesha Therapy Fit - Drug recommendations & completeness (Jan 25, 2026)
if spe_arsenal_router and hasattr(spe_arsenal_router, 'router'):
    app.include_router(spe_arsenal_router.router)  # SPE Repurposing Arsenal - Mars verdicts & PK gating (Mar 2026)
if ayesha_l1_router and hasattr(ayesha_l1_router, 'router'):
    app.include_router(ayesha_l1_router.router)  # NEW: Ayesha L1 simplified - Validated S/P/E scores (Jan 27, 2026)
app.include_router(patient_router.router)  # NEW: Patient session & context management - FOR AYESHA (Jan 13, 2025)
app.include_router(doctor_router.router)  # NEW: Doctor/Oncologist profile management (Jan 2025)
app.include_router(dsr_router.router)  # NEW: Data Subject Requests (GDPR compliance) (Jan 2025)
app.include_router(ayesha_orchestrator_v2_router.router)  # NEW: Complete care v2 orchestrator - UNIFIED FOR CO-PILOT (Jan 13, 2025)
from .routers import workflow_router
app.include_router(workflow_router.router) # NEW: Kanban Workflow Store (Jan 31, 2026)
if ayesha_soc_spe_router and hasattr(ayesha_soc_spe_router, 'router'):
    app.include_router(ayesha_soc_spe_router.router)  # NEW: SOC L1 S/P/E analysis - Show treatment benefits (Jan 26, 2025)
app.include_router(complete_care_universal_router.router)  # NEW: Universal complete care orchestrator - ANY PATIENT (Jan 2025)
app.include_router(biomarker_intelligence_router.router)  # NEW: Universal biomarker intelligence - ANY BIOMARKER (Jan 2025)
app.include_router(ayesha_dossiers_router.router)  # NEW: Ayesha dossier browser API - DISPLAY ALL 60 TRIALS (Nov 17, 2025)
app.include_router(dossiers_intelligence_router.router)  # NEW: Universal dossier intelligence API - ANY PATIENT (Nov 2025)
app.include_router(dossiers_router.router)  # NEW: JR2 dossier generation pipeline (Jan 13, 2025)
app.include_router(agents_router.router)  # NEW: Zeta Agent system - AUTONOMOUS INTELLIGENCE (Jan 13, 2025)
app.include_router(sae_router.router)  # NEW: SAE (Sparse Autoencoder) for mechanistic interpretability - PHASE 1 (Jan 14, 2025)
app.include_router(expression_router.router)  # NEW: Expression ingest endpoints (RUO) (Dec 2025)
app.include_router(orchestrator_router.router)  # NEW: MOAT Orchestration - State Management & Pipeline Coordination (Jan 2025)
if gpt_router is not None:
    app.include_router(gpt_router.router)  # optional
app.include_router(research_intelligence_router.router)
app.include_router(patient_kb_router.router)  # NEW: Patient Knowledge Base Agent - Autonomous KB building (Jan 2026)
app.include_router(holistic_score_router.router)  # NEW: Holistic Score Router - Unified Patient-Trial-Dose Feasibility Score (Jan 2026)
if surrogate_validator_router is not None:
    app.include_router(surrogate_validator_router.router)  # NEW: Surrogate Validation Platform  # NEW: Research Intelligence - Full LLM-based research framework (Jan 2025)
if vus_router is not None:
    app.include_router(vus_router.router)  # NEW: VUS (Variant of Uncertain Significance) identification and resolution (Jan 2025)
# Co-Pilot conversational endpoint is via evidence.router → evidence/rag.py → /api/evidence/rag-query

@app.on_event("startup")
async def _on_startup():
    """Initialize background services (calibration preload, refresh, agent scheduler)."""
    try:
        from .startup import startup_tasks
        await startup_tasks()
    except Exception:
        # Do not block app startup on background init failures
        pass

    # Validate Ayesha Therapy Fit demo scenarios (cheap; no orchestrator calls)
    try:
        if ayesha_therapy_fit_router is not None:
            from .routers.ayesha_therapy_fit import validate_demo_scenarios
            # Strict in development by default, overridable via ENVIRONMENT
            report = validate_demo_scenarios()
            logger.info(
                f"✅ Ayesha therapy-fit demo scenarios validated: "
                f"L2 ok={len(report.get('l2', {}).get('ok', []))}, "
                f"L3 ok={len(report.get('l3', {}).get('ok', []))}"
            )
    except Exception as e:
        # Log but do not block startup — Railway has no ENVIRONMENT set so defaults
        # to strict/dev mode; a validation failure must not prevent the app from serving.
        logger.warning(f"⚠️ Ayesha therapy-fit scenario validation failed (non-blocking): {e}")
    
    # Start agent scheduler
    try:
        from .services.agent_scheduler import get_scheduler
        scheduler = get_scheduler()
        await scheduler.start()
        logger.info("✅ Agent scheduler started")
    except Exception as e:
        logger.warning(f"⚠️ Agent scheduler failed to start: {e}")
        # Do not block app startup

    # ─── Cache Pre-Warm (background, non-blocking) ────────────────────────────
    # Seeds the SQLite cache.db 5s after startup so the first user request is
    # instant instead of waiting 60-90s for the orchestrator to run cold.
    # Ayesha's canonical 8D mechanism vector — activates live ranking in both prewarms
    # Prevents "offline ranking fallback" from being seeded into cache.db on startup.
    _AYESHA_SAE_VECTOR = {
        "ddr": 0.88, "mapk": 0.12, "pi3k": 0.15, "vegf": 0.10,
        "her2": 0.05, "io": 0.30, "efflux": 0.05, "rss": 0.00,
    }

    async def _prewarm_cache():
        await asyncio.sleep(5)  # Let uvicorn finish starting up
        try:
            logger.info("🔥 Pre-warming complete_care_v2 cache (stage IVB, with mechanism vector)...")
            from .services.ayesha_care_plan.schemas import CompleteCareV2Request
            from .services.ayesha_care_plan.orchestrator import get_ayesha_care_plan_orchestrator
            from .services.persistent_cache import persistent_cache
            req = CompleteCareV2Request(
                stage="IVB",
                scenario_key="control",
                max_trials=5,
            )
            cache_key = f"care_plan_{hash(str(req.dict()))}"
            # Always flush stale entries (offline-ranked) before seeding fresh ones
            try:
                persistent_cache.delete(cache_key)
            except Exception:
                pass
            orchestrator = get_ayesha_care_plan_orchestrator()
            result = await orchestrator.get_complete_care_plan(req)
            persistent_cache.set(cache_key, result.dict(), ttl_seconds=900)
            logger.info("✅ Cache pre-warm complete — stage IVB/mechanism-vector seeded in cache.db")
        except Exception as e:
            logger.warning(f"⚠️ Cache pre-warm failed (non-critical): {e}")

    asyncio.create_task(_prewarm_cache())

    async def _prewarm_trials_cache():
        await asyncio.sleep(10)  # After complete_care_v2 pre-warm (5s)
        try:
            logger.info("🔥 Pre-warming trials/search cache (stage IVB, NY, with mechanism vector)...")
            from .routers.ayesha_trials.routes import search_ayesha_trials
            from .routers.ayesha_trials.schemas import AyeshaTrialSearchRequest
            req = AyeshaTrialSearchRequest(
                stage="IVB",
                germline_status="positive",
                location_state="NY",
                treatment_line="either",
                max_results=20,
                sae_mechanism_vector=_AYESHA_SAE_VECTOR,
            )
            await search_ayesha_trials(req)
            logger.info("✅ Trials cache pre-warm complete — IVB/NY/mechanism-vector seeded in cache.db")
        except Exception as e:
            logger.warning(f"⚠️ Trials cache pre-warm failed (non-critical): {e}")

    asyncio.create_task(_prewarm_trials_cache())

@app.on_event("shutdown")
async def _on_shutdown():
    """Gracefully stop background services."""
    try:
        from .startup import shutdown_tasks
        await shutdown_tasks()
    except Exception:
        pass
    
    # Stop agent scheduler
    try:
        from .services.agent_scheduler import get_scheduler
        scheduler = get_scheduler()
        await scheduler.stop()
        logger.info("🛑 Agent scheduler stopped")
    except Exception:
        pass

def _choose_base(model_id: str) -> str:
    """Choose the appropriate base URL for the model"""
    model_key = model_id.lower()
    url_func = MODEL_TO_BASE.get(model_key, MODEL_TO_BASE["evo2_7b"])
    if callable(url_func):
        return url_func()
    return url_func

# Additional endpoints that don't fit in specific routers yet

@app.post("/api/workflow/run_seed_soil_analysis")
async def run_seed_soil_analysis(request: Dict[str, Any]):
    """Seed & Soil — placeholder removed (was hardcoded). Use metastasis router for real assessment."""
    return {
        "analysis": "NOT_IMPLEMENTED",
        "metastatic_risk": None,
        "recommendations": [],
        "message": "Hardcoded seed/soil response removed. Use POST /api/metastasis/assess with a structured request.",
        "provenance": {"source": "stub_removed"},
        "request_echo": request or {},
    }

@app.post("/api/twin/run")
async def twin_run(request: Dict[str, Any]):
    """Orchestrator: warm model, run scoring (chunked inside predict), emit Supabase events, return full results."""
    if not isinstance(request, dict):
        raise HTTPException(status_code=400, detail="invalid payload")
    model_id = request.get("model_id", "evo2_7b")
    base_url = _choose_base(model_id)
    
    # Warm up the model first
    try:
        async with httpx.AsyncClient(timeout=EVO_TIMEOUT, follow_redirects=True) as client:
            warmup_payload = {"ref_sequence": "AAAAAA", "alt_sequence": "AAACAA", "model_id": model_id}
            r = await client.post(f"{base_url}/score_delta", json=warmup_payload)
            r.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Model warmup failed: {e}")
    
    # Route to myeloma prediction
    from .routers.myeloma import predict_myeloma_response
    result = await predict_myeloma_response(request)
    
    # Emit completion event
    try:
        if SUPABASE_URL and SUPABASE_KEY:
            await _supabase_event("twin_run_complete", {
                "model_id": model_id,
                "num_variants": len(result.get("detailed_analysis", [])),
                "prediction": result.get("prediction")
            })
    except Exception:
        pass
    
    return result

@app.post("/api/twin/submit")
async def twin_submit(request: Dict[str, Any]):
    """Submit a Digital Twin analysis job (async processing)"""
    if not isinstance(request, dict):
        raise HTTPException(status_code=400, detail="invalid payload")
    
    import uuid
    job_id = str(uuid.uuid4())

    # Frontend expects run_signature + state (async queue not deployed).
    return {
        "run_signature": job_id,
        "job_id": job_id,
        "status": "submitted",
        "state": "submitted",
        "estimated_completion": None,
        "message": "No background twin queue is deployed; use POST /api/twin/run for synchronous scoring.",
    }

@app.post("/api/twin/status")
async def twin_status(request: Dict[str, Any]):
    """Poll twin job — async backend not deployed; returns explicit error state (no fake completed)."""
    run_sig = request.get("run_signature") or request.get("job_id")
    if not run_sig:
        raise HTTPException(status_code=400, detail="run_signature or job_id required")

    return {
        "run_signature": run_sig,
        "job_id": run_sig,
        "state": "error",
        "status": "error",
        "progress": 0,
        "result_available": False,
        "events": [],
        "summary": {
            "error": (
                "Async digital twin jobs are not available on this deployment. "
                "Use POST /api/twin/run for synchronous myeloma twin scoring."
            ),
            "hint_endpoint": "/api/twin/run",
        },
    }

@app.get("/api/analytics/dashboard")
async def analytics_dashboard():
    """Analytics dashboard data aggregation"""
    try:
        data = {"summary": {"total_runs": 0, "total_variants": 0, "avg_confidence": 0.0}}
        
        if SUPABASE_URL and SUPABASE_KEY:
            try:
                # Get basic run statistics
                runs_data = await _supabase_select("mdt_runs", ["count(*) as total"])
                if runs_data and len(runs_data) > 0:
                    data["summary"]["total_runs"] = runs_data[0].get("total", 0)
                
                # Get variant statistics  
                variants_data = await _supabase_select("mdt_run_variants", ["count(*) as total", "avg(confidence) as avg_conf"])
                if variants_data and len(variants_data) > 0:
                    data["summary"]["total_variants"] = variants_data[0].get("total", 0)
                    data["summary"]["avg_confidence"] = round(float(variants_data[0].get("avg_conf", 0.0)), 3)
            except Exception:
                pass
        
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"analytics failed: {e}")

@app.post("/api/safety/ensembl_context")
async def ensembl_context(request: Dict[str, Any]):
    """Return Ensembl context for a locus: refcheck, exon overlap, VEP consequence, transcript hints.
    Input: { assembly:"GRCh38|GRCh37", chrom:"7", pos:140753336, ref:"A", alt?:"T" }
    """
    try:
        asm_in = (request or {}).get("assembly", "GRCh38")
        chrom = str((request or {}).get("chrom"))
        pos = int((request or {}).get("pos"))
        ref = str((request or {}).get("ref", "")).upper()
        alt = str((request or {}).get("alt", "")).upper()
        asm = "GRCh38" if str(asm_in).lower() in ("grch38","hg38") else "GRCh37"
        region = f"{chrom}:{pos}-{pos}:1"
        urls = {
            "sequence": f"https://rest.ensembl.org/sequence/region/human/{region}?content-type=text/plain;coord_system_version={asm}",
            "overlap": f"https://rest.ensembl.org/overlap/region/human/{chrom}:{pos}-{pos}?content-type=application/json;feature=exon",
        }
        fetched_base = None
        exon_overlap = False
        transcripts = []
        with httpx.Client(timeout=20) as client:
            # sequence
            try:
                r = client.get(urls["sequence"]) ; r.raise_for_status(); fetched_base = r.text.strip().upper()
            except Exception:
                fetched_base = None
            # overlap
            try:
                ro = client.get(urls["overlap"]) ; ro.raise_for_status(); data = ro.json()
                exon_overlap = bool(isinstance(data, list) and len(data) > 0)
                # pull transcript ids if available
                for it in (data or [])[:10]:
                    tid = it.get("Parent") or it.get("transcript_id") or it.get("id")
                    if tid: transcripts.append(tid)
            except Exception:
                exon_overlap = False
        # VEP consequence (best-effort)
        vep_url = None
        vep = None
        if ref and alt:
            vep_url = f"https://rest.ensembl.org/vep/human/region/{chrom}:{pos}{ref}/{alt}?content-type=application/json"
            try:
                with httpx.Client(timeout=20) as client:
                    rv = client.get(vep_url)
                    if rv.status_code == 200:
                        v = rv.json()
                        if isinstance(v, list) and v:
                            vep = v[0]
            except Exception:
                vep = None
        ok = bool(fetched_base) and (fetched_base == ref or fetched_base == "N" or not ref)
        return {
            "refcheck": {"ok": ok, "fetched": fetched_base, "expected": ref, "assembly": asm, "chrom": chrom, "pos": pos},
            "exon_overlap": exon_overlap,
            "transcripts": transcripts,
            "vep": vep,
            "urls": {k: v for k, v in urls.items() if v} | ({"vep": vep_url} if vep_url else {}),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"ensembl_context failed: {e}")

@app.post("/api/safety/clinvar_context")
async def clinvar_context(request: Dict[str, Any]):
    """Return ClinVar context for a variant via Variation ID or URL fallback."""
    try:
        # Import from evidence router
        from .routers.evidence import clinvar_context as _clinvar_context
        return await _clinvar_context(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"clinvar_context failed: {e}")

@app.get("/api/patients/{patient_id}")
async def get_patient(patient_id: str):
    """Mutation Explorer: mutations from in-memory patient profile (POST /api/patient/profile/{id}), not demo fixtures."""
    from .routers.patient import legacy_patient_mutations_payload

    data = legacy_patient_mutations_payload(patient_id)
    if data is None:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Patient ID {patient_id} not found. "
                "Create/update a profile via POST /api/patient/profile/{user_id}, "
                "or use Mutation Explorer patient AK / local profile."
            ),
        )
    return {"success": True, "data": data}


@app.post("/api/research/mutation-analysis")
async def mutation_analysis(request: Dict[str, Any]):
    """Legacy Mutation Explorer hook — demo VEP payload removed (RUO: use clinical_genomics / insights)."""
    patient_id = request.get("patient_id", "")
    prompt = request.get("prompt", "")
    return {
        "status": "not_implemented",
        "patient_id": patient_id,
        "query": prompt,
        "summary": (
            "Demo mutation-analysis payload was removed. "
            "Use POST /api/clinical_genomics/analyze_variant or POST /api/insights/predict_* "
            "with structured variants."
        ),
        "simulated_vep_details": [],
        "evidence": {},
        "provenance": {"mode": "removed_demo_mock", "hint": "/api/clinical_genomics/analyze_variant"},
    }
```

## 3. api/config.py
```python
"""
Configuration module for the oncology backend.
"""
import os
from dotenv import load_dotenv
from httpx import Timeout
from loguru import logger

# Load environment variables from .env file
load_dotenv()

# HIPAA and Security Configuration
HIPAA_MODE = os.getenv("HIPAA_MODE", "false").lower() == "true"
AUDIT_ENABLED = os.getenv("AUDIT_ENABLED", "false").lower() == "true"
LOG_JSON = os.getenv("LOG_JSON", "false").lower() == "true"
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
# Comma-separated list; Render should set ALLOWED_ORIGINS for each production frontend hostname.
# Literal Starlette CORS for api.main lives in api/constants/cors.py (edit there first).
# Defaults include known Render frontends (add new deploy URLs here or via env).
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://localhost:5173,"
        "http://127.0.0.1:3000,http://127.0.0.1:5173,"
        "https://crispro-front-end.onrender.com,"       # production frontend
        "https://crispro-front-end-22.onrender.com,"    # legacy deploy slug
        "https://crispro-front-end-lubq.onrender.com",  # legacy deploy slug
    ).split(",")
    if o.strip()
]

# Database configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# API keys
DIFFBOT_TOKEN = os.getenv("DIFFBOT_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# S/P/E Weight Configuration (clinical-grade defaults)
WEIGHT_SEQUENCE = float(os.getenv("WEIGHT_SEQUENCE", "0.35"))
WEIGHT_PATHWAY = float(os.getenv("WEIGHT_PATHWAY", "0.35"))
WEIGHT_EVIDENCE = float(os.getenv("WEIGHT_EVIDENCE", "0.30"))

# Evidence Gate Thresholds (conservative clinical defaults)
EVIDENCE_GATE_THRESHOLD = float(os.getenv("EVIDENCE_GATE_THRESHOLD", "0.7"))
CLINVAR_STRONG_THRESHOLD = float(os.getenv("CLINVAR_STRONG_THRESHOLD", "0.8"))
PATHWAY_ALIGNMENT_THRESHOLD = float(os.getenv("PATHWAY_ALIGNMENT_THRESHOLD", "0.2"))
INSUFFICIENT_SIGNAL_THRESHOLD = float(os.getenv("INSUFFICIENT_SIGNAL_THRESHOLD", "0.02"))

# Feature Flags
# Default massive modes to false for production safety; enable explicitly in research
ENABLE_MASSIVE_MODES = os.getenv("ENABLE_MASSIVE_MODES", "false").lower() == "true"
ENABLE_RESEARCH_MODE = os.getenv("ENABLE_RESEARCH_MODE", "false").lower() == "true"
ENABLE_CALIBRATION_PRELOAD = os.getenv("ENABLE_CALIBRATION_PRELOAD", "true").lower() == "true"
# Global Evo2 disable gate
DISABLE_EVO2 = os.getenv("DISABLE_EVO2", "false").lower() in ("true", "1", "yes")
# Global Literature disable gate
DISABLE_LITERATURE = os.getenv("DISABLE_LITERATURE", "false").lower() in ("true", "1", "yes")
# Global Fusion (AlphaMissense) disable gate
DISABLE_FUSION = os.getenv("DISABLE_FUSION", "false").lower() in ("true", "1", "yes")

# SAE (Sparse Autoencoder) feature flags
# Phase 1: Evo2 activations endpoint (disabled by default)
ENABLE_EVO2_SAE = os.getenv("ENABLE_EVO2_SAE", "false").lower() in ("true", "1", "yes")
# Phase 1: True SAE features from layer 26 (disabled by default)
ENABLE_TRUE_SAE = os.getenv("ENABLE_TRUE_SAE", "false").lower() in ("true", "1", "yes")
logger.info(f"DEBUG: ENABLE_TRUE_SAE resolved to: {ENABLE_TRUE_SAE}") # DEBUG STATEMENT
# Phase 2: True SAE pathway scores (disabled by default, requires feature→pathway mapping)
ENABLE_TRUE_SAE_PATHWAYS = os.getenv("ENABLE_TRUE_SAE_PATHWAYS", "false").lower() in ("true", "1", "yes")

# Spam-safety controls for Evo fan-out (defaults favor safety)
EVO_SPAM_SAFE = os.getenv("EVO_SPAM_SAFE", "true").lower() in ("true", "1", "yes")
EVO_MAX_MODELS = int(os.getenv("EVO_MAX_MODELS", "1" if EVO_SPAM_SAFE else "3"))
EVO_MAX_FLANKS = int(os.getenv("EVO_MAX_FLANKS", "1" if EVO_SPAM_SAFE else "5"))
EVO_DISABLE_TRANSCRIPT_SWEEP = os.getenv("EVO_DISABLE_TRANSCRIPT_SWEEP", "true" if EVO_SPAM_SAFE else "false").lower() in ("true", "1", "yes")
EVO_DISABLE_SYMMETRY = os.getenv("EVO_DISABLE_SYMMETRY", "true" if EVO_SPAM_SAFE else "false").lower() in ("true", "1", "yes")

# API Exposure Flags (enable in dev by default)
ENABLE_INSIGHTS_API = os.getenv("ENABLE_INSIGHTS_API", "true").lower() == "true"
ENABLE_DESIGN_API = os.getenv("ENABLE_DESIGN_API", "true").lower() == "true"
ENABLE_COMMAND_CENTER = os.getenv("ENABLE_COMMAND_CENTER", "true").lower() == "true"

# Operational Mode
OPERATIONAL_MODE = os.getenv("OPERATIONAL_MODE", "research")  # "clinical" or "research"

# Calibration Configuration
CALIBRATION_TTL_HOURS = int(os.getenv("CALIBRATION_TTL_HOURS", "24"))
CALIBRATION_REFRESH_INTERVAL_HOURS = int(os.getenv("CALIBRATION_REFRESH_INTERVAL_HOURS", "6"))

# Common MM genes for preloading
COMMON_MM_GENES = [
    "BRAF", "KRAS", "NRAS", "FGFR3", "TP53", "ATM", "MDM2", 
    "MYC", "CCND1", "CCND2", "CCND3", "BRCA1", "BRCA2", 
    "PSMB5", "CRBN", "IKZF1", "IKZF3", "DKK1", "NFKB1", 
    "RELA", "TRAF3", "PARP1", "RB1", "CDKN2A"
]

def get_evidence_weights():
    """Get current evidence weights configuration."""
    return {
        "sequence": WEIGHT_SEQUENCE,
        "pathway": WEIGHT_PATHWAY,
        "evidence": WEIGHT_EVIDENCE
    }

def get_evidence_gates():
    """Get current evidence gate thresholds."""
    return {
        "evidence_gate_threshold": EVIDENCE_GATE_THRESHOLD,
        "clinvar_strong_threshold": CLINVAR_STRONG_THRESHOLD,
        "pathway_alignment_threshold": PATHWAY_ALIGNMENT_THRESHOLD,
        "insufficient_signal_threshold": INSUFFICIENT_SIGNAL_THRESHOLD
    }

def get_feature_flags():
    """Get current feature flag configuration."""
    return {
        "enable_massive_modes": ENABLE_MASSIVE_MODES,
        "enable_research_mode": ENABLE_RESEARCH_MODE,
        "enable_calibration_preload": ENABLE_CALIBRATION_PRELOAD,
        "enable_insights_api": ENABLE_INSIGHTS_API,
        "enable_design_api": ENABLE_DESIGN_API,
        "enable_command_center": ENABLE_COMMAND_CENTER,
        "disable_evo2": DISABLE_EVO2,
        "disable_literature": DISABLE_LITERATURE,
        "disable_fusion": DISABLE_FUSION,
        # SAE flags
        "enable_evo2_sae": ENABLE_EVO2_SAE,
        "enable_true_sae": ENABLE_TRUE_SAE,
        "enable_true_sae_pathways": ENABLE_TRUE_SAE_PATHWAYS,
        # Evo spam-safety knobs
        "evo_spam_safe": EVO_SPAM_SAFE,
        "evo_max_models": EVO_MAX_MODELS,
        "evo_max_flanks": EVO_MAX_FLANKS,
        "evo_disable_transcript_sweep": EVO_DISABLE_TRANSCRIPT_SWEEP,
        "evo_disable_symmetry": EVO_DISABLE_SYMMETRY,
        # Default to delta-only to prevent upstream fan-out unless explicitly opted-in
        "evo_use_delta_only": os.getenv("EVO_USE_DELTA_ONLY", "true").lower() in ("true", "1", "yes"),
    }

def get_api_flags():
    """Return API exposure flags for conditional router includes and handlers."""
    return {
        "insights": ENABLE_INSIGHTS_API,
        "design": ENABLE_DESIGN_API,
        "command_center": ENABLE_COMMAND_CENTER,
    }

def is_clinical_mode():
    """Check if running in clinical mode (stricter validation)."""
    return OPERATIONAL_MODE.lower() == "clinical"

def is_research_mode():
    """Check if running in research mode (more permissive)."""
    return OPERATIONAL_MODE.lower() == "research"

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", os.getenv("SUPABASE_ANON_KEY", "").strip()).strip()
SUPABASE_RUNS_TABLE = os.getenv("SUPABASE_RUNS_TABLE", "mdt_runs").strip()
SUPABASE_RUN_VARIANTS_TABLE = os.getenv("SUPABASE_RUN_VARIANTS_TABLE", "mdt_run_variants").strip()
SUPABASE_EVENTS_TABLE = os.getenv("SUPABASE_EVENTS_TABLE", "mdt_events").strip()
SUPABASE_DEEP_ANALYSIS_TABLE = os.getenv("SUPABASE_DEEP_ANALYSIS_TABLE", "mdt_deep_analysis").strip()
SUPABASE_JOB_RESULTS_TABLE = os.getenv("SUPABASE_JOB_RESULTS_TABLE", "mdt_job_results").strip()

# External API tokens
DIFFBOT_TOKEN = os.getenv("DIFFBOT_TOKEN", "").strip()
ENFORMER_URL = os.getenv("ENFORMER_URL", "").strip()
BORZOI_URL = os.getenv("BORZOI_URL", "").strip()

# Evo2 service configuration
EVO_SERVICE_URL = os.getenv("EVO_SERVICE_URL", "https://crispro--evo-service-evoservice-api.modal.run")
EVO_URL_1B = os.getenv("EVO_URL_1B", "https://crispro--evo-service-evoservice1b-api-1b.modal.run")
# IMPORTANT: Do NOT default to a 7B URL. In many environments the 7B service is not deployed,
# and a non-empty default causes silent fallback behavior + noisy 404s that look like "Evo2 ran"
# when it didn't. Only use 7B when explicitly configured via env.
EVO_URL_7B = os.getenv("EVO_URL_7B", "")
EVO_URL_40B = os.getenv("EVO_URL_40B", "https://crispro--evo-service-evoservice-api.modal.run")
EVO_TIMEOUT = Timeout(60.0, connect=10.0)

# Default Evo2 model (can be overridden via DEFAULT_EVO_MODEL env var)
# Change this default to affect all Evo2 model selections system-wide
DEFAULT_EVO_MODEL = os.getenv("DEFAULT_EVO_MODEL", "evo2_1b")

# Model to base URL mapping with dynamic fallback logic
def get_model_url(model_id: str) -> str:
    """Get URL for model with fallback logic, evaluated at runtime"""
    # Re-read environment variables at runtime
    # IMPORTANT: provide sane defaults from this module so an unset env var
    # doesn't silently route to an unintended fallback URL.
    url_1b = os.getenv("EVO_URL_1B", EVO_URL_1B).strip()
    url_7b = os.getenv("EVO_URL_7B", EVO_URL_7B).strip()
    url_40b = os.getenv("EVO_URL_40B", EVO_URL_40B).strip()
    
    if model_id == "evo2_1b":
        return url_1b or url_7b or url_40b
    elif model_id == "evo2_7b":
        return url_7b or url_1b or url_40b
    elif model_id == "evo2_40b":
        return url_40b
    else:
        # Default fallback
        return url_1b or url_7b or url_40b

# Legacy dictionary for backward compatibility (will use runtime lookup)
MODEL_TO_BASE = {
    "evo2_1b": lambda: get_model_url("evo2_1b"),
    "evo2_7b": lambda: get_model_url("evo2_7b"), 
    "evo2_40b": lambda: get_model_url("evo2_40b"),
}

# Use-case configuration
USE_CASES = {
    "myeloma": {
        "id": "myeloma",
        "title": "Myeloma Digital Twin",
        "default_windows": [1024, 2048, 4096, 8192],
        "default_exon_flank": 600,
        "decision_policy": {"id": "v1", "ras_threshold": 2.0},
    }
}

# Hotspot variants for myeloma analysis
HOTSPOTS = {
    ("BRAF", "p.Val600Glu"), ("KRAS", "p.Gly12Asp"), ("KRAS", "p.Gly12Val"), ("KRAS", "p.Gly12Cys"),
    ("NRAS", "p.Gln61Lys"), ("NRAS", "p.Gln61Arg"),
}```

## 4. All Routers (line counts)
  __init__.py: 3 lines
  _ayesha_trials_legacy.py: 410 lines
  acmg.py: 338 lines
  admin.py: 394 lines
  advanced_trial_queries.py: 632 lines
  agents.py: 738 lines
  auth.py: 516 lines
  ayesha.py: 252 lines
  ayesha_dossiers.py: 464 lines
  ayesha_l1.py: 657 lines
  ayesha_orchestrator_v2.py: 228 lines
  ayesha_soc_spe.py: 199 lines
  ayesha_therapy_fit.py: 1428 lines
  ayesha_twin_demo.py: 161 lines
  biomarker_intelligence.py: 92 lines
  canine.py: 572 lines
  care.py: 215 lines
  ceacam5_demo.py: 1080 lines
  clinical_genomics.py: 141 lines
  clinical_trials.py: 339 lines
  command_center.py: 118 lines
  complete_care_universal.py: 1466 lines
  copilot.py: 85 lines
  datasets.py: 792 lines
  demo.py: 306 lines
  design.py: 914 lines
  doctor.py: 94 lines
  doctor_portal.py: 193 lines
  dosing.py: 67 lines
  dossiers.py: 194 lines
  dossiers_intelligence.py: 454 lines
  dsr.py: 139 lines
  efficacy.py: 7 lines
  efficacy_backup.py: 1428 lines
  evidence.py: 6 lines
  evidence2.py: 1206 lines
  evidence_shim.py: 6 lines
  evo.py: 1210 lines
  expression.py: 102 lines
  fusion.py: 206 lines
  gpt_router.py: 141 lines
  guidance.py: 488 lines
  health.py: 99 lines
  holistic_score.py: 264 lines
  hypothesis_validator.py: 1214 lines
  insights.py: 631 lines
  io_selection.py: 54 lines
  kg.py: 60 lines
  llm.py: 100 lines
  metastasis.py: 2 lines
  metastasis_interception.py: 54 lines
  myeloma.py: 546 lines
  nccn.py: 237 lines
  orchestrate.py: 482 lines
  orchestrator.py: 278 lines
  patient.py: 290 lines
  patient_kb.py: 105 lines
  personalized_outreach.py: 155 lines
  pgx_health.py: 89 lines
  pharmgkb.py: 505 lines
  plco_router.py: 180 lines
  population.py: 90 lines
  research_intelligence.py: 308 lines
  resistance.py: 283 lines
  resistance_metadata.py: 191 lines
  resistance_predict.py: 398 lines
  sae.py: 220 lines
  safety.py: 91 lines
  sessions.py: 372 lines
  supplements.py: 81 lines
  surrogate_validator.py: 96 lines
  therapy_fit_router.py: 116 lines
  toxicity.py: 1 lines
  trials.py: 175 lines
  trials_agent.py: 174 lines
  trials_graph.py: 63 lines
  trials_simulator.py: 166 lines
  tumor.py: 123 lines
  vus.py: 650 lines
  workflow_router.py: 62 lines

## 5. auth.py
```python
"""
Authentication Router
Endpoints for user signup, login, logout, and profile management.
"""
from fastapi import APIRouter, HTTPException, Depends, Body
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
import logging

from api.services.auth_service import AuthService, AuthBackendUnavailableError
from api.middleware.auth_middleware import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(tags=["auth"])

# Initialize auth service
_auth_service: Optional[AuthService] = None

def get_auth_service() -> AuthService:
    """Get auth service singleton."""
    global _auth_service
    if _auth_service is None:
        _auth_service = AuthService()
    return _auth_service


# FIX-2: Server-side role allowlist — admin cannot be self-assigned at signup or profile update.
# Admin promotion is handled exclusively via POST /api/admin/users/{user_id}/promote
# which requires an existing admin token (require_admin dependency).
ALLOWED_SIGNUP_ROLES: frozenset = frozenset({"researcher", "clinician", "patient"})


# Pydantic models
class SignupRequest(BaseModel):
    """Signup request model."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=8, description="User password (min 8 characters)")
    full_name: Optional[str] = Field(None, description="User full name")
    institution: Optional[str] = Field(None, description="User institution")
    role: Optional[str] = Field("researcher", description="User role. Allowed: researcher, clinician, patient. Admin role must be granted by an existing admin.")


class LoginRequest(BaseModel):
    """Login request model."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., description="User password")


class ProfileUpdateRequest(BaseModel):
    """Profile update request model."""
    full_name: Optional[str] = None
    institution: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None


# Auth endpoints
@router.post("/api/auth/signup")
async def signup(request: SignupRequest):
    """
    Sign up a new user.
    
    Creates user account via Supabase Auth and user profile in database.
    Returns JWT token for immediate login.
    """
    try:
        auth_service = get_auth_service()

        # FIX-2: Enforce role allowlist before any Supabase call.
        # Prevents privilege escalation via self-assigned admin role.
        effective_role = (request.role or "researcher").strip().lower()
        if effective_role not in ALLOWED_SIGNUP_ROLES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid role '{effective_role}'. Allowed roles at signup: {sorted(ALLOWED_SIGNUP_ROLES)}. "
                       f"Admin access must be granted by an existing administrator."
            )

        metadata = {
            "full_name": request.full_name,
            "institution": request.institution,
            "role": effective_role,  # Use sanitized, validated role
        }

        result = await auth_service.signup(
            email=request.email,
            password=request.password,
            metadata=metadata
        )
        
        # If role is "patient", create empty patient profile
        if request.role == "patient" and result.get("user_id"):
            try:
                from ..services.patient_service import get_patient_service
                patient_service = get_patient_service()
                await patient_service.create_patient_profile(
                    result["user_id"],
                    {
                        "disease": "ovarian_cancer_hgs",  # Default, can be updated in onboarding
                        "treatment_line": 0
                    }
                )
                logger.info(f"✅ Created patient profile for user {result['user_id']}")
            except Exception as e:
                logger.warning(f"Failed to create patient profile: {e}")
                # Don't fail signup if profile creation fails
        
        return {
            "success": True,
            "message": "Account created successfully. Please check your email for confirmation.",
            "data": {
                "user_id": result["user_id"],
                "email": result["email"],
                "session": result["session"],
                "email_confirmed": result["email_confirmed"]
            }
        }
        
    except AuthBackendUnavailableError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")


@router.post("/api/auth/login")
async def login(request: LoginRequest):
    """
    Log in user.
    
    Authenticates user via Supabase Auth and returns JWT token.
    """
    try:
        auth_service = get_auth_service()
        
        result = await auth_service.login(
            email=request.email,
            password=request.password
        )
        
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "user_id": result["user_id"],
                "email": result["email"],
                "session": result["session"],
                "profile": result["profile"]
            }
        }
        
    except AuthBackendUnavailableError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


@router.post("/api/auth/logout")
async def logout(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Log out user.
    
    Revokes current session. Requires authentication.
    """
    try:
        auth_service = get_auth_service()
        
        # Note: Frontend should handle token removal
        # Backend logout is handled by Supabase Auth client-side
        return {
            "success": True,
            "message": "Logout successful"
        }
        
    except Exception as e:
        logger.error(f"Logout error: {e}")
        raise HTTPException(status_code=500, detail=f"Logout failed: {str(e)}")


@router.get("/api/auth/profile")
async def get_profile(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Get current user profile.
    
    Requires authentication.
    """
    try:
        auth_service = get_auth_service()
        user_id = user["user_id"]
        
        try:
            profile = await auth_service.get_user_profile(user_id)
        except Exception as db_err:
            logger.warning(f"Failed to fetch profile from DB (using fallback): {db_err}")
            profile = None
        
        if not profile:
            # Profile might not exist yet (created by trigger) OR fetch failed
            # Return basic info from token
            return {
                "success": True,
                "data": {
                    "user_id": user_id,
                    "email": user.get("email"),
                    "tier": "free",
                    "role": "researcher",
                    "full_name": user.get("user_metadata", {}).get("full_name") or user.get("email", "").split("@")[0],
                    "is_fallback": True
                }
            }
        
        return {
            "success": True,
            "data": profile
        }
        
    except Exception as e:
        logger.error(f"Get profile error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve profile")


@router.put("/api/auth/profile")
async def update_profile(
    request: ProfileUpdateRequest,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Update user profile.
    
    Requires authentication.
    """
    try:
        auth_service = get_auth_service()
        user_id = user["user_id"]

        updates = request.dict(exclude_unset=True)

        # FIX-2: Block self-promotion via profile update.
        # Users cannot elevate their own role to admin through this endpoint.
        if "role" in updates:
            requested_role = (updates["role"] or "").strip().lower()
            if requested_role not in ALLOWED_SIGNUP_ROLES:
                raise HTTPException(
                    status_code=403,
                    detail=f"Role '{requested_role}' cannot be self-assigned. "
                           f"Admin access must be granted by an existing administrator."
                )
            updates["role"] = requested_role  # Normalize to lowercase

        success = await auth_service.update_user_profile(user_id, updates)
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update profile")
        
        # Get updated profile
        profile = await auth_service.get_user_profile(user_id)
        
        return {
            "success": True,
            "message": "Profile updated successfully",
            "data": profile
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update profile error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")


@router.post("/api/auth/refresh")
async def refresh_token(
    refresh_token: str = Body(..., embed=True),
    user: Optional[Dict[str, Any]] = Depends(get_current_user)
):
    """
    Refresh access token.
    
    Uses refresh token to get new access token.
    Note: Frontend typically handles this via Supabase client.
    """
    try:
        auth_service = get_auth_service()
        
        if not auth_service.supabase:
            raise HTTPException(status_code=500, detail="Auth service not configured")
        
        # Refresh session via Supabase
        response = auth_service.supabase.auth.refresh_session(refresh_token)
        
        return {
            "success": True,
            "data": {
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token,
                "expires_at": response.session.expires_at,
            }
        }
        
    except Exception as e:
        logger.error(f"Refresh token error: {e}")
        raise HTTPException(status_code=401, detail=f"Token refresh failed: {str(e)}")


@router.get("/api/auth/me")
async def get_me(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Lightweight token verification endpoint.
    Returns basic user info from the JWT without a database call.
    Used by ProtectedRoute to verify stored tokens on mount.
    """
    return {
        "success": True,
        "data": {
            "user_id": user["user_id"],
            "email": user.get("email"),
            "role": user.get("role", "authenticated"),
        }
    }


@router.get("/api/auth/health")
async def auth_health():
    """Health check for auth service."""
    auth_service = get_auth_service()
    
    return {
        "status": "healthy" if auth_service.supabase else "degraded",
        "service": "auth",
        "supabase_configured": auth_service.supabase is not None
    }









# MFA endpoints
from ..services.mfa_service import get_mfa_service


class MFAVerifyRequest(BaseModel):
    """MFA verification request model."""
    code: str = Field(..., min_length=6, max_length=6, description="6-digit TOTP code")


class MFADisableRequest(BaseModel):
    """MFA disable request model."""
    code: Optional[str] = Field(None, description="MFA code to confirm disable (optional)")


@router.post("/api/auth/mfa/generate-secret")
async def generate_mfa_secret(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Generate MFA secret and QR code for enrollment.
    
    Requires: Authenticated user
    Returns: Secret, QR code URL, and backup codes
    """
    try:
        mfa_service = get_mfa_service()
        user_id = user["user_id"]
        user_email = user.get("email", "")
        
        result = mfa_service.generate_mfa_secret(user_id, user_email)
        
        return {
            "success": True,
            "data": {
                "secret": result["secret"],
                "qr_code_url": result["qr_code_url"],
                "backup_codes": result["backup_codes"],
                "provisioning_uri": result["provisioning_uri"]
            }
        }
    except Exception as e:
        logger.error(f"Generate MFA secret error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate MFA secret: {str(e)}")


@router.post("/api/auth/mfa/verify-enrollment")
async def verify_mfa_enrollment(
    request: MFAVerifyRequest,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Verify MFA code during enrollment and enable MFA.
    
    Requires: Authenticated user
    Returns: Success status
    """
    try:
        mfa_service = get_mfa_service()
        user_id = user["user_id"]
        
        result = await mfa_service.enable_mfa(user_id, request.code)
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["message"])
        
        return {
            "success": True,
            "message": result["message"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Verify MFA enrollment error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to verify MFA enrollment: {str(e)}")


@router.post("/api/auth/mfa/verify")
async def verify_mfa_code(
    request: MFAVerifyRequest,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Verify MFA code for login or session verification.
    
    Requires: Authenticated user
    Returns: Success status
    """
    try:
        mfa_service = get_mfa_service()
        user_id = user["user_id"]
        
        is_valid = mfa_service.verify_mfa_code(user_id, request.code)
        
        if not is_valid:
            raise HTTPException(status_code=401, detail="Invalid MFA code")
        
        return {
            "success": True,
            "message": "MFA code verified successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Verify MFA code error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to verify MFA code: {str(e)}")


@router.post("/api/auth/mfa/disable")
async def disable_mfa(
    request: Optional[MFADisableRequest] = None,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Disable MFA for the current user.
    
    Requires: Authenticated user
    Optional: MFA code to confirm disable
    Returns: Success status
    """
    try:
        mfa_service = get_mfa_service()
        user_id = user["user_id"]
        
        # If code provided, verify it first
        if request and request.code:
            is_valid = mfa_service.verify_mfa_code(user_id, request.code)
            if not is_valid:
                raise HTTPException(status_code=401, detail="Invalid MFA code")
        
        result = await mfa_service.disable_mfa(user_id)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["message"])
        
        return {
            "success": True,
            "message": result["message"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Disable MFA error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to disable MFA: {str(e)}")


@router.get("/api/auth/mfa/status")
async def get_mfa_status(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Get MFA status for the current user.
    
    Requires: Authenticated user
    Returns: MFA enabled status and verification recency
    """
    try:
        mfa_service = get_mfa_service()
        user_id = user["user_id"]
        
        mfa_enabled = mfa_service.is_mfa_enabled(user_id)
        mfa_verified_recently = mfa_service.is_mfa_verified_recently(user_id) if mfa_enabled else False
        
        return {
            "success": True,
            "data": {
                "mfa_enabled": mfa_enabled,
                "mfa_verified_recently": mfa_verified_recently
            }
        }
    except Exception as e:
        logger.error(f"Get MFA status error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get MFA status: {str(e)}")
```

## 6. auth_service.py
```python
"""
Authentication Service
Handles user profile operations and Supabase Auth integration.
"""
import errno
import os
import logging
import socket
from typing import Dict, Any, Optional
from dotenv import load_dotenv


class AuthBackendUnavailableError(Exception):
    """Supabase unreachable, misconfigured URL, DNS failure, or auth package missing."""


def _is_connectivity_failure(exc: BaseException) -> bool:
    """
    True if the failure is likely DNS/network/timeout rather than invalid credentials.

    Supabase/gotrue often wraps low-level errors; we also match common message substrings.
    """
    if isinstance(exc, socket.gaierror):
        return True
    if isinstance(exc, (ConnectionError, TimeoutError)):
        return True
    if isinstance(exc, OSError):
        code = getattr(exc, "errno", None)
        conn_codes = [
            errno.ECONNREFUSED,
            errno.ENETUNREACH,
            errno.EHOSTUNREACH,
            errno.ENOTCONN,
        ]
        if hasattr(errno, "ETIMEDOUT"):
            conn_codes.append(errno.ETIMEDOUT)
        if code in conn_codes:
            return True
    msg = str(exc).lower()
    needles = (
        "name or service not known",
        "nodename nor servname provided, or not known",
        "temporary failure in name resolution",
        "connection refused",
        "network is unreachable",
        "no route to host",
        "failed to resolve",
        "could not resolve host",
    )
    if any(n in msg for n in needles):
        return True
    try:
        import httpx

        if isinstance(exc, (httpx.ConnectError, httpx.ConnectTimeout, httpx.ReadTimeout, httpx.WriteTimeout)):
            return True
    except ImportError:
        pass
    return False


def _public_infra_detail(*, configured: bool) -> str:
    if not configured:
        return (
            "Authentication backend is not configured. "
            "Set SUPABASE_URL and SUPABASE_ANON_KEY on the server (e.g. Render environment)."
        )
    return (
        "Authentication backend is unreachable (DNS/network or wrong SUPABASE_URL). "
        "Verify SUPABASE_URL and network access from the server."
    )

# Try to import supabase, but handle gracefully if not installed
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    Client = None

load_dotenv()

logger = logging.getLogger(__name__)

# Initialize Supabase client for Auth operations
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY") or os.getenv("SUPABASE_KEY")

_supabase_client: Optional[Client] = None

def get_supabase_auth_client() -> Optional[Client]:
    """Get Supabase Auth client (singleton)."""
    global _supabase_client
    
    if not SUPABASE_AVAILABLE:
        logger.warning("⚠️ supabase package not installed. Run: pip install supabase")
        return None
    
    if _supabase_client is None:
        if not SUPABASE_URL or not SUPABASE_ANON_KEY:
            logger.warning("⚠️ Supabase Auth not configured (SUPABASE_URL or SUPABASE_ANON_KEY missing)")
            return None
        
        try:
            _supabase_client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
            logger.info("✅ Supabase Auth client initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Supabase Auth client: {e}")
            return None
    
    return _supabase_client


class AuthService:
    """Service for authentication and user profile operations."""
    
    def __init__(self):
        self.supabase = get_supabase_auth_client()
        # Use existing supabase_service for database operations
        from api.services.supabase_service import supabase as db_service
        self.db = db_service
    
    async def signup(self, email: str, password: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Sign up a new user via Supabase Auth.
        
        Args:
            email: User email
            password: User password
            metadata: Optional user metadata (full_name, institution, role)
            
        Returns:
            {
                "user_id": "uuid",
                "email": "user@example.com",
                "session": {...},
                "profile_created": True
            }
        """
        if not self.supabase:
            raise AuthBackendUnavailableError(_public_infra_detail(configured=False))
        
        try:
            # Sign up via Supabase Auth
            response = self.supabase.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": metadata or {}
                }
            })
            
            if not response.user:
                raise ValueError("Signup failed: no user returned")
            
            user_id = response.user.id
            user_email = response.user.email
            
            # Create user profile in database
            profile_created = await self.create_user_profile(
                user_id=user_id,
                email=user_email,
                metadata=metadata
            )
            
            return {
                "user_id": user_id,
                "email": user_email,
                "session": {
                    "access_token": response.session.access_token if response.session else None,
                    "refresh_token": response.session.refresh_token if response.session else None,
                    "expires_at": response.session.expires_at if response.session else None,
                },
                "profile_created": profile_created,
                "email_confirmed": response.user.email_confirmed_at is not None
            }
            
        except AuthBackendUnavailableError:
            raise
        except Exception as e:
            logger.error(f"Signup error: {e}", exc_info=True)
            if _is_connectivity_failure(e):
                raise AuthBackendUnavailableError(_public_infra_detail(configured=True)) from e
            raise ValueError(f"Signup failed: {str(e)}") from e
    
    async def login(self, email: str, password: str) -> Dict[str, Any]:
        """
        Log in user via Supabase Auth.
        
        Args:
            email: User email
            password: User password
            
        Returns:
            {
                "user_id": "uuid",
                "email": "user@example.com",
                "session": {...},
                "profile": {...}
            }
        """
        if not self.supabase:
            raise AuthBackendUnavailableError(_public_infra_detail(configured=False))
        
        try:
            # Sign in via Supabase Auth
            response = self.supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            
            if not response.user:
                raise ValueError("Login failed: no user returned")
            
            user_id = response.user.id
            
            # Get user profile
            profile = await self.get_user_profile(user_id)
            
            return {
                "user_id": user_id,
                "email": response.user.email,
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_at,
                },
                "profile": profile
            }
            
        except AuthBackendUnavailableError:
            raise
        except Exception as e:
            logger.error(f"Login error: {e}", exc_info=True)
            if _is_connectivity_failure(e):
                raise AuthBackendUnavailableError(_public_infra_detail(configured=True)) from e
            raise ValueError(f"Login failed: {str(e)}") from e
    
    async def logout(self, access_token: str) -> bool:
        """
        Log out user (revoke session).
        
        Args:
            access_token: Current access token
            
        Returns:
            True if logout successful
        """
        if not self.supabase:
            return False
        
        try:
            # Set session for logout
            self.supabase.auth.set_session(access_token, "")
            self.supabase.auth.sign_out()
            return True
        except Exception as e:
            logger.error(f"Logout error: {e}")
            return False
    
    async def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Get user profile from database.
        
        Args:
            user_id: User UUID
            
        Returns:
            User profile dict or None
        """
        if not self.db.enabled:
            return None
        
        try:
            profiles = await self.db.select("user_profiles", {"id": user_id}, limit=1)
            if profiles and len(profiles) > 0:
                return profiles[0]
            return None
        except Exception as e:
            logger.error(f"Failed to get user profile: {e}")
            return None
    
    async def update_user_profile(self, user_id: str, updates: Dict[str, Any]) -> bool:
        """
        Update user profile.
        
        Args:
            user_id: User UUID
            updates: Dictionary of fields to update
            
        Returns:
            True if update successful
        """
        if not self.db.enabled:
            return False
        
        try:
            # Remove None values
            updates = {k: v for k, v in updates.items() if v is not None}
            
            if not updates:
                return True
            
            success = await self.db.update("user_profiles", updates, {"id": user_id})
            if not success:
                logger.warning(f"Failed to update user profile {user_id}")
            return True
        except Exception as e:
            logger.error(f"Failed to update user profile: {e}")
            return False
    
    async def create_user_profile(self, user_id: str, email: str, metadata: Optional[Dict[str, Any]] = None) -> bool:
        """
        Create user profile and default quotas on signup.
        
        Args:
            user_id: User UUID from Supabase Auth
            email: User email
            metadata: Optional metadata (full_name, institution, role)
            
        Returns:
            True if profile created successfully
        """
        if not self.db.enabled:
            logger.warning("Supabase not enabled, skipping profile creation")
            return False
        
        try:
            # Create user profile
            profile_data = {
                "id": user_id,
                "email": email,
                "tier": "free",
                "role": metadata.get("role", "researcher") if metadata else "researcher",
                "institution": metadata.get("institution") if metadata else None,
                "full_name": metadata.get("full_name") if metadata else None,
            }
            
            await self.db.insert("user_profiles", [profile_data])
            
            # Create default quotas
            quota_data = {
                "user_id": user_id,
                "tier": "free",
                "variant_analyses_limit": 10,
                "variant_analyses_used": 0,
                "drug_queries_limit": 5,
                "drug_queries_used": 0,
                "food_queries_limit": 3,
                "food_queries_used": 0,
                "clinical_trials_limit": 0,
                "clinical_trials_used": 0,
            }
            
            await self.db.insert("user_quotas", [quota_data])
            
            logger.info(f"✅ Created profile and quotas for user {user_id[:8]}...")
            return True
            
        except Exception as e:
            logger.error(f"Failed to create user profile: {e}")
            # Check if profile already exists (might be created by trigger)
            existing = await self.get_user_profile(user_id)
            return existing is not None

```

## 7. auth_middleware.py
```python
"""
Authentication Middleware for FastAPI
Verifies JWT tokens from Supabase Auth and provides user context.
"""
import os
try:
    import jwt  # PyJWT package provides 'jwt' module
except ImportError:
    jwt = None  # Optional auth - graceful degradation
from fastapi import HTTPException, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, Dict, Any
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Security scheme for Bearer token
security = HTTPBearer()

# Get JWT secret from environment
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
JWT_ALGORITHM = "HS256"

if not SUPABASE_JWT_SECRET:
    logger.warning("⚠️ SUPABASE_JWT_SECRET not set - JWT verification will fail")


async def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """
    Verify JWT token from Authorization header.
    
    Args:
        credentials: HTTPBearer credentials containing the token
        
    Returns:
        {
            "user_id": "uuid",
            "email": "user@example.com",
            "role": "authenticated",
            "exp": 1234567890
        }
        
    Raises:
        HTTPException: If token is invalid, expired, or missing
    """
    if not SUPABASE_JWT_SECRET:
        logger.warning("SUPABASE_JWT_SECRET not set - rejecting auth with 401")
        raise HTTPException(
            status_code=401,
            detail="Authentication unavailable (configuration missing)"
        )
    
    token = credentials.credentials
    
    try:
        # Decode JWT token using Supabase JWT secret
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
            audience="authenticated"
        )
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid token: missing user_id (sub claim)"
            )
        
        return {
            "user_id": user_id,
            "email": payload.get("email"),
            "role": payload.get("role", "authenticated"),
            "exp": payload.get("exp"),
            "raw_payload": payload  # For debugging
        }
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired. Please log in again."
        )
    except jwt.InvalidTokenError as e:
        logger.warning(f"Invalid token: {str(e)}")
        raise HTTPException(
            status_code=401,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}"
        )


async def get_current_user(token_data: Dict[str, Any] = Depends(verify_token)) -> Dict[str, Any]:
    """
    Get current authenticated user from verified token.
    
    Usage:
        @router.post("/api/endpoint")
        async def my_endpoint(user: dict = Depends(get_current_user)):
            user_id = user["user_id"]
            ...
    """
    return token_data


async def get_optional_user(
    authorization: Optional[str] = Header(None)
) -> Optional[Dict[str, Any]]:
    """
    Get user if token is present, otherwise return None.
    Useful for endpoints that work with or without authentication.
    
    Usage:
        @router.post("/api/endpoint")
        async def my_endpoint(user: Optional[dict] = Depends(get_optional_user)):
            if user:
                user_id = user["user_id"]
            else:
                # Anonymous access
                ...
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
            audience="authenticated"
        )
        
        return {
            "user_id": payload.get("sub"),
            "email": payload.get("email"),
            "role": payload.get("role", "authenticated"),
            "exp": payload.get("exp")
        }
    except Exception:
        # Invalid token, return None (anonymous access)
        return None





```

## 8. patient.py (first 100)
```python
"""
Patient Router - Handles patient profile and data management

Author: Zo
Date: January 2025
Updated: January 2025 - Added auto tumor context generation for sporadic gates
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import logging

logger = logging.getLogger(__name__)

# Import services for auto-generating tumor context
try:
    from ..services.tumor_quick_intake import generate_level0_tumor_context
    from ..services.input_completeness import compute_input_completeness
    TUMOR_SERVICES_AVAILABLE = True
except ImportError:
    logger.warning("Tumor quick intake services not available - auto-generation disabled")
    TUMOR_SERVICES_AVAILABLE = False

router = APIRouter(prefix="/api/patient", tags=["patient"])


class PatientProfile(BaseModel):
    """Patient profile schema"""
    user_id: str
    disease: str = "ovarian_cancer_hgs"
    stage: Optional[str] = None
    treatment_line: int = 0
    germline_status: Optional[str] = None
    biomarkers: Optional[Dict[str, Any]] = None
    tumor_context: Optional[Dict[str, Any]] = None
    ca125_value: Optional[float] = None
    location_state: Optional[str] = None


class PatientProfileUpdate(BaseModel):
    """Patient profile update schema"""
    disease: Optional[str] = None
    stage: Optional[str] = None
    treatment_line: Optional[int] = None
    germline_status: Optional[str] = None
    biomarkers: Optional[Dict[str, Any]] = None
    tumor_context: Optional[Dict[str, Any]] = None
    ca125_value: Optional[float] = None
    location_state: Optional[str] = None
    location_city: Optional[str] = None
    full_name: Optional[str] = None
    # Optional biomarkers for Quick Intake (L0/L1 support)
    tmb: Optional[float] = None  # Tumor mutational burden
    msi_status: Optional[str] = None  # MSI-H / MSS
    hrd_score: Optional[float] = None  # HRD score (0-100)
    platinum_response: Optional[str] = None  # sensitive/resistant/refractory (for ovarian/breast)
    somatic_mutations: Optional[List[Dict[str, Any]]] = None  # Partial mutation list


# In-memory storage for demo (in production, use database)
_patient_profiles: Dict[str, PatientProfile] = {}


def legacy_patient_mutations_payload(raw_id: str) -> Optional[Dict[str, Any]]:
    """
    Mutation Explorer compatibility: build GET /api/patients/{id} payload from stored profile.
    Returns None if no profile exists for this id (no fabricated demo rows).
    """
    uid = (raw_id or "").strip()
    if not uid:
        return None
    prof = _patient_profiles.get(uid) or _patient_profiles.get(uid.upper())
    if prof is None:
        return None
    pd = prof.model_dump() if hasattr(prof, "model_dump") else {}
    tc = pd.get("tumor_context") or getattr(prof, "tumor_context", None)
    if hasattr(tc, "model_dump"):
        tc = tc.model_dump()
    mutations: List[Dict[str, Any]] = []
    if isinstance(tc, dict):
        for m in tc.get("somatic_mutations") or []:
            if not isinstance(m, dict):
                continue
            gene = m.get("gene") or m.get("hugo_gene_symbol")
            if not gene:
                continue
            pc = (
                m.get("hgvs_p")
                or m.get("protein_change")
                or m.get("variant")
                or ""
            )
            row: Dict[str, Any] = {
                "hugo_gene_symbol": gene,
                "protein_change": pc,
                "variant_type": m.get("variant_type") or "Somatic",
                "genomic_coordinate_hg38": m.get("genomic_coordinate_hg38"),
                "chrom": m.get("chrom"),
                "pos": m.get("pos"),
```

## 9. doctor.py (first 100)
```python
"""
Doctor Router - Handles doctor/clinician profile and data management

Author: Zo
Date: January 2025
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

from ..schemas.doctor_profile import (
    DoctorProfileCreate,
    DoctorProfileUpdate,
    DoctorProfileResponse
)

# TODO: Import auth middleware when available
# from ..middleware.auth_middleware import get_current_user
# from ..middleware.doctor_middleware import require_doctor_role

router = APIRouter(prefix="/api/doctor", tags=["doctor"])


# In-memory storage for demo (in production, use database)
_doctor_profiles: Dict[str, DoctorProfileResponse] = {}


@router.get("/profile/{user_id}")
async def get_doctor_profile(user_id: str):
    """Get doctor profile by user ID"""
    if user_id not in _doctor_profiles:
        # Return empty profile for new doctors
        return DoctorProfileResponse(user_id=user_id)
    return _doctor_profiles[user_id]


@router.put("/profile")
async def update_doctor_profile(profile: DoctorProfileUpdate):
    """
    PUT endpoint for profile updates (used by frontend onboarding).
    Creates or updates doctor profile.
    """
    # For demo: extract user_id from default or auth token
    # In production, this would come from auth token via Depends(require_doctor_role)
    user_id = "demo_doctor"  # TODO: Get from auth token in production
    
    return await create_doctor_profile(user_id, profile)


@router.post("/profile/{user_id}")
async def create_doctor_profile(user_id: str, profile: DoctorProfileUpdate):
    """Create or update doctor profile"""
    existing = _doctor_profiles.get(user_id)
    
    # Update fields
    update_data = profile.model_dump(exclude_unset=True)
    
    if existing:
        # Update existing profile
        for key, value in update_data.items():
            if hasattr(existing, key):
                setattr(existing, key, value)
        existing.updated_at = "now"  # TODO: Use actual timestamp
    else:
        # Create new profile
        from datetime import datetime
        new_profile_data = {
            "user_id": user_id,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            **update_data
        }
        existing = DoctorProfileResponse(**new_profile_data)
    
    _doctor_profiles[user_id] = existing
    logger.info(f"✅ Updated doctor profile for {user_id}")
    
    return {
        "success": True,
        "profile": existing.model_dump() if hasattr(existing, 'model_dump') else existing.__dict__
    }


@router.delete("/profile/{user_id}")
async def delete_doctor_profile(user_id: str):
    """Delete doctor profile"""
    if user_id in _doctor_profiles:
        del _doctor_profiles[user_id]
        logger.info(f"🗑️ Deleted doctor profile for {user_id}")
        return {"success": True, "message": "Profile deleted"}
    return {"success": True, "message": "No profile found"}
```

## 10. ceacam5_demo.py (first 200)
```python
"""
CrisPRO CEACAM5 Intelligence Demo — Brenus Pharma / STC-1010

Endpoints:
  GET  /api/ceacam5/scenarios        → Brenus-specific proof scenarios
  POST /api/ceacam5/gate-simulate    → Live gate math (enrollment pool, ORR, cost/responder, fit_A, narrative)
  GET  /api/ceacam5/comparators      → Block 4 comparator fit scores (PATH A, locked 2026-04-28)
  GET  /api/ceacam5/sanofi-payload   → Persona-specific executive arguments + archetype table
  GET  /api/ceacam5/health           → Health check

All numbers sourced from verified artifacts only.
Claim types: SOURCED / COMPUTED / OPEN ASSUMPTION — labeled on every output.
PATH A formula: fit_A = clip((p·t) / ‖t‖₂, 0, 1) — locked 2026-04-28 by Fahad Kiani.
PATH B (cosine similarity dividing by ‖p‖₂·‖t‖₂) is PROHIBITED.

Research Use Only — Not for Clinical Decision Making.
"""

from __future__ import annotations

import math
from typing import Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field, validator

router = APIRouter(prefix="/api/ceacam5", tags=["ceacam5-demo"])

# ─────────────────────────────────────────────────────────────────────────────
# Constants — all from verified artifacts
# ─────────────────────────────────────────────────────────────────────────────

BASE_MSS_MCRC_US = 46_750
CEACAM5_50_FRAC = 0.50
CEACAM5_80_FRAC = 0.28             # OA-08: NSCLC proxy — WEAKEST NUMBER, CRC unconfirmed
CEA_HIGH_IN_80_FRAC = 0.403        # SOURCED CR-04
PTMB_HIGH_FRAC = 0.10              # SOURCED CR-15
IMMUNOSCORE_HIGH_FRAC = 0.15       # OA-09
RHO_CEACAM5_IO = 0.43              # SOURCED CR-26
PHASE2_COST_PER_PT_LOW = 25_000    # SOURCED CR-09
PHASE2_COST_PER_PT_HIGH = 50_000   # SOURCED CR-09

ORR_UNSELECTED = (0.03, 0.05)
ORR_CEACAM5_50 = (0.07, 0.08)      # SOURCED CR-01
ORR_CEACAM5_80 = (0.15, 0.20)      # COMPUTED CR-03
ORR_TWO_GATE = (0.35, 0.45)        # OPEN ASSUMPTION OA-05

P_VECTOR = {
    "ddr": 0.05, "mapk": 0.30, "pi3k": 0.10,
    "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10,
}
P_NORM = 0.8016

COMPARATORS = [
    {
        "core_id": "INDEX",
        "trial_name": "BreAK CRC-001",
        "nct_id": "NCT06934538",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "UNPROVEN — Phase Ia only",
        "evidence_tier": "T3_UNPROVEN",
        "fit_A": 0.8016,
        "rank": 1,
    },
    {
        "core_id": "CORE-01",
        "trial_name": "QUILT-3.055",
        "nct_id": "NCT03167164",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "FALSIFIED_PARTIAL — HR 1.061 (no benefit)",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.8016,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7938 — prior p_vector version)
        "rank": 2,
    },
    {
        "core_id": "CORE-03",
        "trial_name": "GVAX + CRS-207",
        "nct_id": "NCT01417000",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.70, "efflux": 0.10},
        "mechanism_validity": "FALSIFIED — ORR 0/22 in MSS CRC",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.8016,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7938 — prior p_vector version)
        "rank": 3,
    },
    {
        "core_id": "CORE-06",
        "trial_name": "MEDITREME",
        "nct_id": "NCT03202758",
        "t_vector": {"ddr": 0.05, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.10, "her2": 0.00, "io": 0.50, "efflux": 0.05},
        "mechanism_validity": "FALSIFIED_MSS — no IO signal in MSS subgroup",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.7904,
        "rank": 4,
    },
    {
        "core_id": "CORE-02",
        "trial_name": "GRANITE",
        "nct_id": "NCT03165994",
        "t_vector": {"ddr": 0.10, "mapk": 0.30, "pi3k": 0.10, "vegf": 0.20, "her2": 0.00, "io": 0.50, "efflux": 0.10},
        "mechanism_validity": "PROVISIONAL — Phase II/III ongoing; ctDNA-low signal preliminary",
        "evidence_tier": "T2_PROVISIONAL",
        "fit_A": 0.7887,
        "rank": 5,
    },
    {
        "core_id": "CORE-07",
        "trial_name": "CO.26",
        "nct_id": "NCT02264678",
        "t_vector": {"ddr": 0.05, "mapk": 0.20, "pi3k": 0.10, "vegf": 0.30, "her2": 0.00, "io": 0.60, "efflux": 0.05},
        "mechanism_validity": "PARTIAL — OS HR 0.73 (trend); liver-met subgroup Pint=0.02 (VERIFIED)",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.7845,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.7751 — prior p_vector version)
        "rank": 6,
    },
    {
        "core_id": "CORE-05",
        "trial_name": "AtezoTRIBE",
        "nct_id": "NCT03721653",
        "t_vector": {"ddr": 0.05, "mapk": 0.10, "pi3k": 0.10, "vegf": 0.60, "her2": 0.00, "io": 0.50, "efflux": 0.05},
        "mechanism_validity": "PARTIAL — PFS HR 0.69; DetermaIO IOOPT+ subgroup PFS HR 0.10 (PROVISIONAL)",
        "evidence_tier": "T2_PROVISIONAL",
        "fit_A": 0.6494,  # recomputed 2026-06-09 PATH A P_VECTOR v0.8016 (was 0.6297 — prior p_vector version)
        "rank": 7,
    },
    {
        "core_id": "CORE-04",
        "trial_name": "IMblaze370",
        "nct_id": "NCT02788279",
        "t_vector": {"ddr": 0.05, "mapk": 0.80, "pi3k": 0.10, "vegf": 0.10, "her2": 0.00, "io": 0.40, "efflux": 0.05},
        "mechanism_validity": "FALSIFIED — OS HR=1.00; MEKi immune priming definitively falsified at Phase III",
        "evidence_tier": "T1_VERIFIED",
        "fit_A": 0.6138,
        "rank": 8,
    },
]

ASSET_FIT_SCORES = {
    "SAR445877": {
        "pTMB-high, no liver mets": 0.880,
        "DetermaIO IOOPT+": 0.926,
        "Immunoscore-IC-high": 0.770,
        "CEACAM5 ≥80% + IO-permissive": 0.880,
        "pTMB-high, liver mets": 0.371,
        "Unselected MSS mCRC": 0.320,
    },
    "SAR445953": {
        "pTMB-high, no liver mets": 0.770,
        "DetermaIO IOOPT+": 0.741,
        "Immunoscore-IC-high": 0.596,
        "CEACAM5 ≥80% + IO-permissive": 0.770,
        "pTMB-high, liver mets": 0.597,
        "Unselected MSS mCRC": 0.480,
    },
    "tusamitamab": {
        "pTMB-high, no liver mets": 0.519,
        "DetermaIO IOOPT+": 0.473,
        "Immunoscore-IC-high": 0.361,
        "CEACAM5 ≥80% + IO-permissive": 0.519,
        "pTMB-high, liver mets": 0.477,
        "Unselected MSS mCRC": 0.490,
    },
    "STC-1010": {
        "pTMB-high, no liver mets": 0.8016,
        "DetermaIO IOOPT+": 0.8016,
        "Immunoscore-IC-high": 0.8016,
        "CEACAM5 ≥80% + IO-permissive": 0.8016,
        "pTMB-high, liver mets": 0.640,
        "Unselected MSS mCRC": 0.8016,
    },
}

BRENUS_SCENARIOS = [
    {
        "id": "B1",
        "title": "CO.26 Liver-Met Subgroup",
        "subtitle": "EC-07 Verified — PMC10698621 Table 2",
        "cancer_label": "MSS mCRC",
        "narrative": (
            "CO.26 tested durvalumab + tremelimumab vs. BSC in MSS mCRC. "
            "The ITT result was negative (OS HR 0.73, trend only). "
            "But the liver-met subgroup told a different story: "
            "patients WITHOUT liver mets had PFS HR=0.54 (Pint=0.02 — SIGNIFICANT). "
            "Patients WITH liver mets had PFS HR=1.39 (harm). "
            "CrisPRO's liver-met toggle captures this split using the EC-07 verified values."
        ),
        "published_result": "PFS HR=0.54 (no-LM, Pint=0.02) vs HR=1.39 (with-LM)",
        "published_doi": "10.1200/JCO.2023.41.16_suppl.3561",
        "pmcid": "PMC10698621",
        "responder_profile": "No liver mets, IO-permissive",
        "non_responder_profile": "Liver mets present",
        "responder_fit": 0.7845,  # recomputed 2026-06-09 (CO.26 fit_A corrected from 0.7751)
        "non_responder_fit": 0.371,
        "delta": "+0.414",  # recomputed 2026-06-09 (was +0.404; CO.26 responder_fit corrected)
        "verdict": "CALLED",
        "claim_type": "SOURCED [EC-07, PMC10698621]",
    },
    {
        "id": "B2",
        "title": "CARMEN-LC03 CEACAM5 ≥80% Subgroup",
        "subtitle": "CR-03 — IASLC 2024 WCLC (post-hoc, not pre-specified)",
```

## 11. tumor.py
```python
"""
Tumor Context Router for Sporadic Cancer Strategy

Endpoints:
- POST /api/tumor/quick_intake: Level 0 intake (no NGS report)
- POST /api/tumor/ingest_ngs: Level 2 NGS report parsing (Foundation/Tempus)
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import hashlib
from datetime import datetime

from ..schemas.tumor_context import (
    QuickIntakeRequest,
    QuickIntakeResponse,
    IngestNGSRequest,
    IngestNGSResponse,
    TumorContext,
    SomaticMutation
)
from ..services.tumor_quick_intake import generate_level0_tumor_context
# from ..services.tumor_ngs_parser import parse_foundation_report, parse_tempus_report  # Day 3

router = APIRouter(prefix="/api/tumor", tags=["tumor"])


@router.post("/quick_intake", response_model=QuickIntakeResponse)
async def quick_intake(request: QuickIntakeRequest) -> QuickIntakeResponse:
    """
    Level 0/1 Quick Intake (no NGS report required).
    
    Uses disease priors + platinum response proxy to estimate tumor biomarkers
    for sporadic cancer patients without NGS reports.
    
    **Level 0:** Disease priors only (no manual inputs)
    **Level 1:** Partial manual inputs (TMB/MSI/HRD/mutations)
    
    Returns:
        QuickIntakeResponse with estimated TumorContext and confidence cap
    """
    try:
        # Generate tumor context using disease priors
        tumor_context, provenance, confidence_cap, recommendations = await generate_level0_tumor_context(
            cancer_type=request.cancer_type,
            stage=request.stage,
            line=request.line,
            platinum_response=request.platinum_response,
            manual_tmb=request.tmb,
            manual_msi=request.msi_status,
            manual_hrd=request.hrd_score,
            manual_mutations=request.somatic_mutations
        )
        
        return QuickIntakeResponse(
            tumor_context=tumor_context,
            provenance=provenance,
            confidence_cap=confidence_cap,
            recommendations=recommendations
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quick intake failed: {str(e)}")


@router.post("/ingest_ngs", response_model=IngestNGSResponse)
async def ingest_ngs(request: IngestNGSRequest) -> IngestNGSResponse:
    """
    Level 2 NGS Report Ingestion (Foundation Medicine / Tempus).
    
    **Preferred:** Provide `report_json` (bypasses PDF parsing)
    **Fallback:** Provide `report_file` (base64 PDF, slower parsing)
    
    Returns:
        IngestNGSResponse with parsed TumorContext from NGS report
    """
    # TODO: Day 3 implementation
    raise HTTPException(
        status_code=501,
        detail="NGS report ingestion will be implemented on Day 3. Use quick_intake for now."
    )
    
    # # Day 3: Uncomment when parsers are ready
    # try:
    #     # Prefer JSON over PDF for speed
    #     if request.report_json:
    #         tumor_context = await parse_json_report(request.report_json, request.report_source)
    #         report_hash = hashlib.sha256(str(request.report_json).encode()).hexdigest()
    #     elif request.report_file:
    #         # Parse PDF (slower)
    #         if request.report_source == "Foundation":
    #             tumor_context = await parse_foundation_report(request.report_file)
    #         elif request.report_source == "Tempus":
    #             tumor_context = await parse_tempus_report(request.report_file)
    #         else:
    #             raise ValueError(f"Unsupported report source: {request.report_source}")
    #         
    #         report_hash = hashlib.sha256(request.report_file.encode()).hexdigest()
    #     else:
    #         raise ValueError("Must provide report_json or report_file")
    #     
    #     provenance = {
    #         "source": request.report_source,
    #         "report_hash": f"sha256:{report_hash}",
    #         "parsed_at": datetime.utcnow().isoformat(),
    #         "parser_version": "v1.0",
    #         "confidence_version": "v1.0"
    #     }
    #     
    #     return IngestNGSResponse(
    #         tumor_context=tumor_context,
    #         provenance=provenance
    #     )
    #     
    # except ValueError as e:
    #     raise HTTPException(status_code=400, detail=str(e))
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"NGS ingestion failed: {str(e)}")



```

## 12. ayesha.py (first 100)
```python
"""
Ayesha Complete Care Router

Unified endpoint for complete care planning (drugs + foods)
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List, Optional
import logging

from api.services.ayesha_care_plan.orchestrator import get_ayesha_care_plan_orchestrator
from api.services.ayesha_care_plan.schemas import CompleteCareV2Request

# Targeted Therapy Engine Imports (Zeta)
from api.services.therapy_fit.service import targeted_therapy_service
from api.schemas.ayesha_target import CandidateQuery, TargetedBriefV1


router = APIRouter(prefix="/api/ayesha", tags=["ayesha"])
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Canonical endpoint map (backend source of truth)
# ---------------------------------------------------------------------------
# Ayesha complete care:
# - Compatibility endpoint (kept stable): POST /api/ayesha/complete_care_plan
# - Also exists elsewhere in the codebase: POST /api/ayesha/complete_care_v2, POST /api/complete_care/v2
#
# Note: CoPilot and the Tests page should treat /complete_care_plan as the compat alias.


@router.post("/targeted-brief", response_model=TargetedBriefV1, tags=["Ayesha"])
async def generate_targeted_brief(query: CandidateQuery):
    """
    ZETA ENGINE V1 (HARDENED): 
    Generates a ranked list of targeted therapies based on patient context.
    Returns provenance-rich V1 briefing.
    """
    return targeted_therapy_service.generate_brief(query)


@router.post("/complete_care_plan")
async def complete_care_plan(request: Dict[str, Any]):
    """
    Unified Complete Care Plan Endpoint (Adapter to V2)
    
    Orchestrates holistic care recommendations via V2 Modular Architecture.
    Refactored Jan 2026 to remove legacy code.
    """
    try:
        if not isinstance(request, dict):
            raise HTTPException(status_code=400, detail="Invalid payload - expected JSON object")
        
        patient_context = request.get("patient_context", {})
        mutations = request.get("mutations", [])
        
        # 1. Map V1 Request -> V2 Request
        # 1. Map V1 Request -> V2 Request
        
        # Map mutations to tumor_context
        tumor_context = {
            "somatic_mutations": mutations,
            "biomarkers": patient_context.get("biomarkers", {})
        }
        
        # 1b. Apply Preview Scenario (if requested)
        scenario_id = request.get("scenario_id")
        scenario_ca125 = None
        if scenario_id:
            try:
                from api.services.ayesha_fit.builder import build_ayesha_profile
                from api.services.ayesha_fit.scenarios import SCENARIOS, DEFAULT_SCENARIO_ID, get_scenario_metadata
                from api.services.therapy_fit.service import targeted_therapy_service
                from api.schemas.ayesha_target import CandidateQuery, TargetedBrief
                from api.services.resistance_prophet.scenarios import apply_scenario_to_context, get_scenario
                tumor_context = apply_scenario_to_context(tumor_context, scenario_id)
                scn_def = get_scenario(scenario_id)
                if scn_def and "ca125_value" in scn_def:
                    scenario_ca125 = scn_def["ca125_value"]
                logger.info(f"Applied preview scenario: {scenario_id}")
            except ImportError:
                logger.warning("Scenarios module not found, skipping preview injection")
            except Exception as e:
                logger.error(f"Failed to apply scenario {scenario_id}: {e}")

        v2_request_data = {
            # Default to IVB for Ayesha if not specified
            "stage": patient_context.get("stage", "IVB"),
            "treatment_line": "either", # Default
            "germline_status": patient_context.get("germline_status", "unknown"),
            "treatment_history": patient_context.get("treatment_history", []),
            
            "tumor_context": tumor_context,
            
            # Injected Scalar (if present in scenario)
            "ca125_value": scenario_ca125 if scenario_ca125 is not None else patient_context.get("ca125_value"),
            
            # Flags - Enable all for complete plan
            "include_trials": True,
            "include_soc": True,
```

## 13. requirements.txt
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

## 14. Migrations
total 6
drwxr-xr-x 1 root root  100 Jul  8 07:42 .
drwxr-xr-x 1 root root 1900 Jul  8 07:42 ..
-rw-r--r-- 1 root root 2743 Jul  8 07:42 007_add_data_classification.sql
-rw-r--r-- 1 root root 1043 Jul  8 07:42 008_add_mfa_columns.sql
-rw-r--r-- 1 root root  912 Jul  8 07:42 create_patient_dossiers_table.sql

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



## 15. Services
total 1194
drwxr-xr-x 1 root root  2880 Jul  8 07:42 .
drwxr-xr-x 1 root root   440 Jul  8 07:42 ..
-rw-r--r-- 1 root root  6148 Jul  8 07:42 .DS_Store
-rw-r--r-- 1 root root 30915 Jul  8 07:42 BACKEND_SERVICES_INTEGRATION_PLAN.md
-rw-r--r-- 1 root root 24846 Jul  8 07:42 BIOMARKER_DRIVEN_WORKFLOWS.md
-rw-r--r-- 1 root root     0 Jul  8 07:42 __init__.py
-rw-r--r-- 1 root root 12863 Jul  8 07:42 admin_service.py
-rw-r--r-- 1 root root 18800 Jul  8 07:42 agent_executor.py
-rw-r--r-- 1 root root 16186 Jul  8 07:42 agent_manager.py
-rw-r--r-- 1 root root  4143 Jul  8 07:42 agent_scheduler.py
-rw-r--r-- 1 root root 12298 Jul  8 07:42 auth_service.py
-rw-r--r-- 1 root root 20535 Jul  8 07:42 autonomous_trial_agent.py
drwxr-xr-x 1 root root   340 Jul  8 07:42 ayesha_care_plan
drwxr-xr-x 1 root root   220 Jul  8 07:42 ayesha_fit
drwxr-xr-x 1 root root   140 Jul  8 07:42 ayesha_trial_matching
-rw-r--r-- 1 root root  5154 Jul  8 07:42 ayesha_trial_ranker.py
-rw-r--r-- 1 root root 25736 Jul  8 07:42 biomarker_correlation_service.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 biomarker_intelligence_universal
-rw-r--r-- 1 root root 23737 Jul  8 07:42 ca125_intelligence.py
-rw-r--r-- 1 root root  4902 Jul  8 07:42 ca125_intelligence_service.py
-rw-r--r-- 1 root root 31115 Jul  8 07:42 ca125_kinetics.py
-rw-r--r-- 1 root root  3218 Jul  8 07:42 ca125_normalizer.py
-rw-r--r-- 1 root root 10815 Jul  8 07:42 cache_service.py
drwxr-xr-x 1 root root   180 Jul  8 07:42 canine
drwxr-xr-x 1 root root   160 Jul  8 07:42 client_dossier
-rw-r--r-- 1 root root  9361 Jul  8 07:42 clinical_parser.py
-rw-r--r-- 1 root root 12347 Jul  8 07:42 clinical_trial_search_service.py
drwxr-xr-x 1 root root   100 Jul  8 07:42 complete_care_universal
-rw-r--r-- 1 root root 11228 Jul  8 07:42 compound_alias_resolver.py
-rw-r--r-- 1 root root 18841 Jul  8 07:42 compound_calibration.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 comprehensive_analysis
drwxr-xr-x 1 root root   260 Jul  8 07:42 confidence
drwxr-xr-x 1 root root   180 Jul  8 07:42 csi
-rw-r--r-- 1 root root 10323 Jul  8 07:42 ctgov_query_builder.py
-rw-r--r-- 1 root root  6642 Jul  8 07:42 database_connections.py
-rw-r--r-- 1 root root 20069 Jul  8 07:42 dietician_recommendations.py
-rw-r--r-- 1 root root 30813 Jul  8 07:42 disease_based_trial_ranker.py
-rw-r--r-- 1 root root 17591 Jul  8 07:42 disease_module_loader.py
-rw-r--r-- 1 root root  2583 Jul  8 07:42 disease_normalization.py
-rw-r--r-- 1 root root 12399 Jul  8 07:42 dosing_guidance_service.py
-rw-r--r-- 1 root root 20163 Jul  8 07:42 dynamic_food_extraction.py
drwxr-xr-x 1 root root   480 Jul  8 07:42 efficacy_orchestrator
-rw-r--r-- 1 root root  2001 Jul  8 07:42 eligibility_extractor.py
-rw-r--r-- 1 root root  4902 Jul  8 07:42 enformer_client.py
-rw-r--r-- 1 root root 54657 Jul  8 07:42 enhanced_evidence_service.py
drwxr-xr-x 1 root root   180 Jul  8 07:42 evidence
-rw-r--r-- 1 root root  7320 Jul  8 07:42 evidence_artifacts.py
-rw-r--r-- 1 root root  8543 Jul  8 07:42 evo2_gates_service.py
-rw-r--r-- 1 root root  8543 Jul  8 07:42 evo2_gates_service.py.bak
drwxr-xr-x 1 root root   140 Jul  8 07:42 extraction
-rw-r--r-- 1 root root  6149 Jul  8 07:42 feature_flag_service.py
-rw-r--r-- 1 root root  6570 Jul  8 07:42 food_data_loader.py
-rw-r--r-- 1 root root 20691 Jul  8 07:42 food_llm_enhancement_service.py
-rw-r--r-- 1 root root  9604 Jul  8 07:42 food_response_builder.py
-rw-r--r-- 1 root root 20167 Jul  8 07:42 food_spe_integration.py
-rw-r--r-- 1 root root 12556 Jul  8 07:42 food_treatment_line_service.py
drwxr-xr-x 1 root root   180 Jul  8 07:42 food_validation
-rw-r--r-- 1 root root  8475 Jul  8 07:42 food_validation_orchestrator.py
-rw-r--r-- 1 root root 14387 Jul  8 07:42 gene_calibration.py
-rw-r--r-- 1 root root  5817 Jul  8 07:42 gpt_service.py
-rw-r--r-- 1 root root 19456 Jul  8 07:42 hint_tiles_service.py
drwxr-xr-x 1 root root   200 Jul  8 07:42 holistic_clinical_benefit
drwxr-xr-x 1 root root   220 Jul  8 07:42 holistic_score
-rw-r--r-- 1 root root  1547 Jul  8 07:42 holistic_score_service.py
-rw-r--r-- 1 root root  9713 Jul  8 07:42 hotspot_detector.py
-rw-r--r-- 1 root root 14152 Jul  8 07:42 hybrid_trial_search.py
-rw-r--r-- 1 root root  2592 Jul  8 07:42 input_completeness.py
drwxr-xr-x 1 root root   120 Jul  8 07:42 insights
drwxr-xr-x 1 root root    80 Jul  8 07:42 interception
drwxr-xr-x 1 root root   140 Jul  8 07:42 io_engine
-rw-r--r-- 1 root root  8388 Jul  8 07:42 io_safest_selection_service.py
-rw-r--r-- 1 root root 11213 Jul  8 07:42 job_service.py
-rw-r--r-- 1 root root  7538 Jul  8 07:42 kb_client.py
-rw-r--r-- 1 root root 11217 Jul  8 07:42 kb_store.py
-rw-r--r-- 1 root root  7821 Jul  8 07:42 kb_validator.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 kill_chain
-rw-r--r-- 1 root root  1584 Jul  8 07:42 kill_chain_policy.py
-rw-r--r-- 1 root root  7593 Jul  8 07:42 llm_literature_service.py
drwxr-xr-x 1 root root    80 Jul  8 07:42 llm_provider
-rw-r--r-- 1 root root 11555 Jul  8 07:42 llm_service.py
-rw-r--r-- 1 root root  9745 Jul  8 07:42 llm_toxicity_service.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 logging
-rw-r--r-- 1 root root     0 Jul  8 07:42 logging_service.py
-rw-r--r-- 1 root root  6203 Jul  8 07:42 mbd4_module.py
-rw-r--r-- 1 root root 17987 Jul  8 07:42 mechanism_fit_ranker.py
-rw-r--r-- 1 root root 19266 Jul  8 07:42 mechanism_map_service.py
-rw-r--r-- 1 root root 18670 Jul  8 07:42 metastasis_interception_service.py
-rw-r--r-- 1 root root 10626 Jul  8 07:42 mfa_service.py
-rw-r--r-- 1 root root  2050 Jul  8 07:42 mm_pathway_service.py
-rw-r--r-- 1 root root  6579 Jul  8 07:42 mrd_air_support.py
-rw-r--r-- 1 root root 21425 Jul  8 07:42 multi_llm_service.py
-rw-r--r-- 1 root root  2727 Jul  8 07:42 neo4j_connection.py
-rw-r--r-- 1 root root 14243 Jul  8 07:42 neo4j_graph_loader.py
-rw-r--r-- 1 root root 18465 Jul  8 07:42 next_test_recommender.py
-rw-r--r-- 1 root root 11886 Jul  8 07:42 ngs_fast_track.py
drwxr-xr-x 1 root root   100 Jul  8 07:42 nutrition
drwxr-xr-x 1 root root   240 Jul  8 07:42 orchestrator
drwxr-xr-x 1 root root   180 Jul  8 07:42 pathway
-rw-r--r-- 1 root root 10992 Jul  8 07:42 pathway_to_mechanism_vector.py
drwxr-xr-x 1 root root   100 Jul  8 07:42 patient_knowledge_base
-rw-r--r-- 1 root root 17761 Jul  8 07:42 patient_knowledge_base_agent.py
-rw-r--r-- 1 root root  4047 Jul  8 07:42 persistent_cache.py
drwxr-xr-x 1 root root   120 Jul  8 07:42 personalized_outreach
-rw-r--r-- 1 root root 15254 Jul  8 07:42 pgx_care_plan_integration.py
-rw-r--r-- 1 root root  9721 Jul  8 07:42 pgx_extraction_service.py
-rw-r--r-- 1 root root  4890 Jul  8 07:42 pgx_production_monitoring.py
-rw-r--r-- 1 root root  8938 Jul  8 07:42 pgx_screening_service.py
-rw-r--r-- 1 root root 12596 Jul  8 07:42 quota_service.py
drwxr-xr-x 1 root root   260 Jul  8 07:42 research_intelligence
drwxr-xr-x 1 root root   100 Jul  8 07:42 resistance
-rw-r--r-- 1 root root 11478 Jul  8 07:42 resistance_detection_service.py
-rw-r--r-- 1 root root  1876 Jul  8 07:42 resistance_evidence_tiers.py
-rw-r--r-- 1 root root 21602 Jul  8 07:42 resistance_playbook_service.py
drwxr-xr-x 1 root root   420 Jul  8 07:42 resistance_prophet
-rw-r--r-- 1 root root 16353 Jul  8 07:42 resistance_prophet_service.py
-rw-r--r-- 1 root root  6896 Jul  8 07:42 risk_benefit_composition_service.py
-rw-r--r-- 1 root root  5431 Jul  8 07:42 rss_service.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 sae
-rw-r--r-- 1 root root  1751 Jul  8 07:42 sae_feature_service.py
-rw-r--r-- 1 root root  6778 Jul  8 07:42 sae_model_service.py
-rw-r--r-- 1 root root 19620 Jul  8 07:42 sae_service.py
-rw-r--r-- 1 root root 11215 Jul  8 07:42 safety_service.py
-rw-r--r-- 1 root root 13097 Jul  8 07:42 safety_validator.py
drwxr-xr-x 1 root root    60 Jul  8 07:42 scoring
drwxr-xr-x 1 root root   220 Jul  8 07:42 sequence_scorers
drwxr-xr-x 1 root root   120 Jul  8 07:42 sl_therapy_bridge
drwxr-xr-x 1 root root   120 Jul  8 07:42 spe_engine
-rw-r--r-- 1 root root  8530 Jul  8 07:42 supabase_service.py
-rw-r--r-- 1 root root 15414 Jul  8 07:42 supplement_recommendation_service.py
drwxr-xr-x 1 root root   100 Jul  8 07:42 surrogate_validator
drwxr-xr-x 1 root root   420 Jul  8 07:42 synthetic_lethality
-rw-r--r-- 1 root root 16006 Jul  8 07:42 therapeutic_optimizer.py
-rw-r--r-- 1 root root  7963 Jul  8 07:42 therapeutic_prompt_builder.py
drwxr-xr-x 1 root root   160 Jul  8 07:42 therapy_fit
-rw-r--r-- 1 root root 26837 Jul  8 07:42 toxicity_pathway_mappings.py
-rw-r--r-- 1 root root 12193 Jul  8 07:42 trial_data_enricher.py
drwxr-xr-x 1 root root   220 Jul  8 07:42 trial_intelligence
drwxr-xr-x 1 root root   240 Jul  8 07:42 trial_intelligence_universal
drwxr-xr-x 1 root root   140 Jul  8 07:42 trial_refresh
-rw-r--r-- 1 root root  5577 Jul  8 07:42 trial_search_criteria_mapper.py
drwxr-xr-x 1 root root   100 Jul  8 07:42 trials
drwxr-xr-x 1 root root   120 Jul  8 07:42 triggers
-rw-r--r-- 1 root root  7376 Jul  8 07:42 tumor_quick_intake.py
-rw-r--r-- 1 root root  8096 Jul  8 07:42 variant_resolution.py

## 16. Schemas
total 61
drwxr-xr-x 1 root root  340 Jul  8 07:42 .
drwxr-xr-x 1 root root  440 Jul  8 07:42 ..
-rw-r--r-- 1 root root  713 Jul  8 07:42 __init__.py
-rw-r--r-- 1 root root 3656 Jul  8 07:42 ayesha.py
-rw-r--r-- 1 root root 3403 Jul  8 07:42 ayesha_target.py
-rw-r--r-- 1 root root 6793 Jul  8 07:42 ayesha_trials.py
-rw-r--r-- 1 root root 2345 Jul  8 07:42 design.py
-rw-r--r-- 1 root root 4562 Jul  8 07:42 doctor_profile.py
-rw-r--r-- 1 root root 2958 Jul  8 07:42 dosing.py
-rw-r--r-- 1 root root    2 Jul  8 07:42 metastasis.py
-rw-r--r-- 1 root root 1450 Jul  8 07:42 metastasis_interception.py
-rw-r--r-- 1 root root 7346 Jul  8 07:42 orchestrate.py
-rw-r--r-- 1 root root 5167 Jul  8 07:42 patient.py
-rw-r--r-- 1 root root 5870 Jul  8 07:42 safety.py
-rw-r--r-- 1 root root 3636 Jul  8 07:42 supplements.py
-rw-r--r-- 1 root root 1526 Jul  8 07:42 trials_graph.py
-rw-r--r-- 1 root root 8770 Jul  8 07:42 tumor_context.py

## 17. Procfile + startup
web: uvicorn api.main:app --host 0.0.0.0 --port $PORT
---

## 18. CORS
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

## 19. WebSocket endpoints

## 20. Env vars
/workspace/crispro-backend-v2/api/audit/writer.py:15:AUDIT_ENABLED = os.getenv("AUDIT_ENABLED", "false").lower() == "true"
/workspace/crispro-backend-v2/api/audit/writer.py:16:AUDIT_LOG_DIR = os.getenv("AUDIT_LOG_DIR", "./audit_logs")
/workspace/crispro-backend-v2/api/audit/writer.py:17:AUDIT_TTL_DAYS = int(os.getenv("HIPAA_AUDIT_TTL_DAYS", "2555"))  # Default: 7 years (HIPAA requirement)
/workspace/crispro-backend-v2/api/config.py:13:HIPAA_MODE = os.getenv("HIPAA_MODE", "false").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:14:AUDIT_ENABLED = os.getenv("AUDIT_ENABLED", "false").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:15:LOG_JSON = os.getenv("LOG_JSON", "false").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:16:ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
/workspace/crispro-backend-v2/api/config.py:22:    for o in os.getenv(
/workspace/crispro-backend-v2/api/config.py:34:SUPABASE_URL = os.getenv("SUPABASE_URL")
/workspace/crispro-backend-v2/api/config.py:35:SUPABASE_KEY = os.getenv("SUPABASE_KEY")
/workspace/crispro-backend-v2/api/config.py:38:DIFFBOT_TOKEN = os.getenv("DIFFBOT_TOKEN")
/workspace/crispro-backend-v2/api/config.py:39:GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
/workspace/crispro-backend-v2/api/config.py:42:WEIGHT_SEQUENCE = float(os.getenv("WEIGHT_SEQUENCE", "0.35"))
/workspace/crispro-backend-v2/api/config.py:43:WEIGHT_PATHWAY = float(os.getenv("WEIGHT_PATHWAY", "0.35"))
/workspace/crispro-backend-v2/api/config.py:44:WEIGHT_EVIDENCE = float(os.getenv("WEIGHT_EVIDENCE", "0.30"))
/workspace/crispro-backend-v2/api/config.py:47:EVIDENCE_GATE_THRESHOLD = float(os.getenv("EVIDENCE_GATE_THRESHOLD", "0.7"))
/workspace/crispro-backend-v2/api/config.py:48:CLINVAR_STRONG_THRESHOLD = float(os.getenv("CLINVAR_STRONG_THRESHOLD", "0.8"))
/workspace/crispro-backend-v2/api/config.py:49:PATHWAY_ALIGNMENT_THRESHOLD = float(os.getenv("PATHWAY_ALIGNMENT_THRESHOLD", "0.2"))
/workspace/crispro-backend-v2/api/config.py:50:INSUFFICIENT_SIGNAL_THRESHOLD = float(os.getenv("INSUFFICIENT_SIGNAL_THRESHOLD", "0.02"))
/workspace/crispro-backend-v2/api/config.py:54:ENABLE_MASSIVE_MODES = os.getenv("ENABLE_MASSIVE_MODES", "false").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:55:ENABLE_RESEARCH_MODE = os.getenv("ENABLE_RESEARCH_MODE", "false").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:56:ENABLE_CALIBRATION_PRELOAD = os.getenv("ENABLE_CALIBRATION_PRELOAD", "true").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:58:DISABLE_EVO2 = os.getenv("DISABLE_EVO2", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:60:DISABLE_LITERATURE = os.getenv("DISABLE_LITERATURE", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:62:DISABLE_FUSION = os.getenv("DISABLE_FUSION", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:66:ENABLE_EVO2_SAE = os.getenv("ENABLE_EVO2_SAE", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:68:ENABLE_TRUE_SAE = os.getenv("ENABLE_TRUE_SAE", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:71:ENABLE_TRUE_SAE_PATHWAYS = os.getenv("ENABLE_TRUE_SAE_PATHWAYS", "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:74:EVO_SPAM_SAFE = os.getenv("EVO_SPAM_SAFE", "true").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:75:EVO_MAX_MODELS = int(os.getenv("EVO_MAX_MODELS", "1" if EVO_SPAM_SAFE else "3"))
/workspace/crispro-backend-v2/api/config.py:76:EVO_MAX_FLANKS = int(os.getenv("EVO_MAX_FLANKS", "1" if EVO_SPAM_SAFE else "5"))
/workspace/crispro-backend-v2/api/config.py:77:EVO_DISABLE_TRANSCRIPT_SWEEP = os.getenv("EVO_DISABLE_TRANSCRIPT_SWEEP", "true" if EVO_SPAM_SAFE else "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:78:EVO_DISABLE_SYMMETRY = os.getenv("EVO_DISABLE_SYMMETRY", "true" if EVO_SPAM_SAFE else "false").lower() in ("true", "1", "yes")
/workspace/crispro-backend-v2/api/config.py:81:ENABLE_INSIGHTS_API = os.getenv("ENABLE_INSIGHTS_API", "true").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:82:ENABLE_DESIGN_API = os.getenv("ENABLE_DESIGN_API", "true").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:83:ENABLE_COMMAND_CENTER = os.getenv("ENABLE_COMMAND_CENTER", "true").lower() == "true"
/workspace/crispro-backend-v2/api/config.py:86:OPERATIONAL_MODE = os.getenv("OPERATIONAL_MODE", "research")  # "clinical" or "research"
/workspace/crispro-backend-v2/api/config.py:89:CALIBRATION_TTL_HOURS = int(os.getenv("CALIBRATION_TTL_HOURS", "24"))
/workspace/crispro-backend-v2/api/config.py:90:CALIBRATION_REFRESH_INTERVAL_HOURS = int(os.getenv("CALIBRATION_REFRESH_INTERVAL_HOURS", "6"))
/workspace/crispro-backend-v2/api/config.py:140:        "evo_use_delta_only": os.getenv("EVO_USE_DELTA_ONLY", "true").lower() in ("true", "1", "yes"),

## AUDIT COMPLETE
