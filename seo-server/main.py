"""
main.py — JEDI Labs SEO Intelligence API
FastAPI multi-agent orchestrator for SEO auditing.

Architecture:
  Tier 1 (asyncio.gather): KeywordAgent + AuthorityAgent + TrafficAgent + ViteAudit — concurrent
  Tier 2 (inline):         TechnicalAgent desktop (blocking, primary signal)
  Tier 3 (BackgroundTask): TechnicalAgent mobile (non-blocking, rate-limit safe)
  Tier 4 (compute):        CrawlabilityAgent (embeds ViteSPAAudit) + StrategyAgent (ODI-normalised SCI)
  Tier 5 (inline):         LLMAgent (OpenRouter synthesis, optional)

Requirement 1 — ViteSPAAudit:
  run_vite_audit() fetches package.json, vite.config.js/ts, src/App.jsx/tsx, src/main.jsx/tsx
  from GitHub Raw Content API (no git clone). Detects bare SPA, routing type, dynamic routes,
  harmful sitemap pattern, client-side fetch deps.

Requirement 2 — ODI Normalization:
  StrategyAgent uses Estimated_ODI = (competition_index × 0.7) + (PageSpeed_Impact × 0.3)
  as the SCI denominator instead of raw KD or competition_index.

Usage:
  uvicorn main:app --reload --port 8000
  curl http://localhost:8000/audit/jedilabs.org
  curl http://localhost:8000/health
  curl http://localhost:8000/vite-audit/fjkiani/jedi-v2
"""
import asyncio
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from agents import (
    authority_agent,
    crawlability_agent,
    keyword_agent,
    llm_agent,
    strategy_agent,
    technical_agent,
    traffic_agent,
)
from core.config import get_settings
from core.models import AuditRequest, AuditResponse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="JEDI Labs SEO Intelligence API",
    description=(
        "Multi-agent SEO audit framework. "
        "Tier 1: concurrent keyword+authority+traffic+ViteAudit. "
        "Tier 2: PageSpeed desktop. Tier 3: PageSpeed mobile (background). "
        "Tier 4: CrawlabilityAgent (ViteSPAAudit) + StrategyAgent (ODI-normalised SCI). "
        "Tier 5: OpenRouter LLM synthesis."
    ),
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for background mobile PageSpeed results
_mobile_results: dict = {}


# ── Background worker: mobile PageSpeed ───────────────────────────────────────
async def _run_mobile_pagespeed(domain: str) -> None:
    """Non-blocking background task for mobile PageSpeed."""
    try:
        settings = get_settings()
        result = await technical_agent.run_mobile(domain, settings)
        _mobile_results[domain] = result.model_dump()
        logger.info(f"Mobile PageSpeed complete for {domain}: perf={result.performance}")
    except Exception as e:
        logger.error(f"Mobile PageSpeed background error for {domain}: {e}")
        _mobile_results[domain] = {"error": str(e), "strategy": "mobile", "status": 0}


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    """Health check — confirms API key is loaded."""
    try:
        settings = get_settings()
        return {
            "status": "ok",
            "rapidapi_key_set": bool(settings.rapidapi_key),
            "openrouter_key_set": bool(settings.openrouter_key),
            "version": "2.0.0",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/vite-audit/{owner}/{repo}")
async def vite_audit_endpoint(owner: str, repo: str, branch: str = "master"):
    """
    Standalone Vite SPA audit endpoint.
    Fetches package.json, vite.config, App/main entry from GitHub Raw API.

    GET /vite-audit/fjkiani/jedi-v2
    GET /vite-audit/fjkiani/jedi-v2?branch=main
    """
    full_repo = f"{owner}/{repo}"
    logger.info(f"Running ViteSPAAudit for {full_repo}@{branch}")
    audit = await crawlability_agent.run_vite_audit(repo=full_repo, branch=branch)
    return audit.model_dump()


@app.post("/audit", response_model=AuditResponse)
@app.get("/audit/{domain}", response_model=AuditResponse)
async def run_audit(
    background_tasks: BackgroundTasks,
    domain: str = "jedilabs.org",
    body: Optional[AuditRequest] = None,
    vite_repo: str = "fjkiani/jedi-v2",
    vite_branch: str = "master",
) -> AuditResponse:
    """
    Run full SEO audit for a domain.

    GET  /audit/jedilabs.org
    POST /audit  {"domain": "jedilabs.org", "keywords": [...], "pages": [...]}

    Query params:
      vite_repo   — GitHub repo to audit for SPA crawlability (default: fjkiani/jedi-v2)
      vite_branch — branch to fetch from (default: master)

    Tier 1 (concurrent): KeywordAgent + AuthorityAgent + TrafficAgent + ViteAudit
    Tier 2 (inline):     TechnicalAgent desktop
    Tier 3 (background): TechnicalAgent mobile
    Tier 4 (compute):    CrawlabilityAgent (with ViteSPAAudit) + StrategyAgent (ODI SCI)
    Tier 5 (optional):   LLM synthesis via OpenRouter
    """
    settings = get_settings()

    if body:
        domain = body.domain
        keywords = body.keywords
        pages = body.pages
    else:
        keywords = AuditRequest.__fields__["keywords"].default
        pages = []

    logger.info(f"Starting audit for {domain} | vite_repo={vite_repo}@{vite_branch}")
    audit_start = datetime.now(timezone.utc)

    # ── Tier 1: Concurrent — keyword + authority + traffic + Vite audit ───────
    logger.info("Tier 1: keyword + authority + traffic + ViteAudit (concurrent)")
    (
        keyword_results,
        authority_result,
        traffic_result,
        vite_audit,
    ) = await asyncio.gather(
        keyword_agent.run(keywords, settings),
        authority_agent.run(domain, settings),
        traffic_agent.run(domain, settings),
        crawlability_agent.run_vite_audit(repo=vite_repo, branch=vite_branch),
    )
    logger.info(
        f"Tier 1 complete: {len(keyword_results)} keywords, "
        f"DA={authority_result.moz_da}, visits={traffic_result.monthly_visits}, "
        f"vite_severity={vite_audit.severity}"
    )

    # ── Tier 2: Desktop PageSpeed (blocking) ──────────────────────────────────
    logger.info("Tier 2: Desktop PageSpeed (blocking)")
    desktop_result = await technical_agent.run_desktop(domain, settings)
    logger.info(
        f"Tier 2 complete: perf={desktop_result.performance}, "
        f"TBT={desktop_result.tbt_ms}ms, SPA={desktop_result.spa_signal}"
    )

    # ── Tier 3: Mobile PageSpeed (background) ─────────────────────────────────
    logger.info("Tier 3: Mobile PageSpeed dispatched as background task")
    background_tasks.add_task(_run_mobile_pagespeed, domain)

    technical_results = [desktop_result]

    # ── Tier 4: Crawlability + ODI-normalised SCI ─────────────────────────────
    logger.info("Tier 4: CrawlabilityAgent + StrategyAgent (ODI SCI)")
    crawlability_result = crawlability_agent.run(
        authority_result,
        technical_results,
        vite_audit=vite_audit,
    )
    strategy_result = strategy_agent.run(
        keyword_results,
        pages,
        competitor_score=1.0,
        desktop_performance=desktop_result.performance,
    )
    logger.info(
        f"Tier 4 complete: crawlability={crawlability_result.severity}, "
        f"top SCI={strategy_result.sci_rankings[0].sci:,.0f} "
        f"(ODI={strategy_result.sci_rankings[0].odi_display}) "
        f"if strategy_result.sci_rankings else 'no rankings'"
    )

    # ── Tier 5: LLM synthesis (optional) ─────────────────────────────────────
    logger.info("Tier 5: LLM synthesis")
    synthesis = await llm_agent.run(
        domain, authority_result, traffic_result,
        crawlability_result, keyword_results, strategy_result, settings,
    )

    # ── Data quality notes ────────────────────────────────────────────────────
    data_quality_notes = []
    if vite_audit.is_bare_spa:
        data_quality_notes.append(
            f"ViteSPAAudit [{vite_repo}@{vite_branch}]: BARE SPA confirmed. "
            f"No pre-rendering plugins. {vite_audit.dynamic_route_count} dynamic routes invisible to Googlebot."
        )
    if vite_audit.sitemap_harmful:
        data_quality_notes.append(
            "HARMFUL SITEMAP: vite-plugin-sitemap is submitting unrenderable SPA routes to Google. "
            "Pause sitemap submission until SSR/SSG is in place."
        )
    if traffic_result.monthly_visits == 0:
        data_quality_notes.append(
            "Similarweb: 0 monthly visits — site below 5K/mo measurement threshold."
        )
    if authority_result.indexed_pages < 10:
        data_quality_notes.append(
            f"Only {authority_result.indexed_pages} pages indexed. Expected 221+. SPA crawl problem confirmed."
        )
    kd_zero = [k for k in keyword_results if k.kd == 0.0]
    if kd_zero:
        data_quality_notes.append(
            f"Semrush KD=0 for {len(kd_zero)} keywords — unreliable. "
            "ODI uses Google competition_index as primary input."
        )
    data_quality_notes.append(
        f"ODI formula: {strategy_result.odi_formula}"
    )

    return AuditResponse(
        domain=domain,
        audit_timestamp=datetime.now(timezone.utc).isoformat(),
        keywords=keyword_results,
        authority=authority_result,
        traffic=traffic_result,
        technical=technical_results,
        crawlability=crawlability_result,
        strategy=strategy_result,
        synthesis=synthesis,
        data_quality_notes=data_quality_notes,
    )


@app.get("/mobile-result/{domain}")
async def get_mobile_result(domain: str):
    """Poll for background mobile PageSpeed result after /audit returns."""
    result = _mobile_results.get(domain)
    if result is None:
        return JSONResponse(
            status_code=202,
            content={"status": "pending", "message": "Mobile PageSpeed still running"},
        )
    return result


@app.get("/sci/{domain}")
async def get_sci_rankings(domain: str = "jedilabs.org", desktop_performance: Optional[int] = None):
    """
    Quick ODI-normalised SCI ranking endpoint.
    Pass ?desktop_performance=72 to use real PageSpeed data.
    """
    settings = get_settings()
    keywords_list = [
        "enterprise AI solutions", "AI agents platform", "AI agent framework",
        "AI automation platform", "AI consulting services", "LLM orchestration",
        "multi-agent AI", "AI solutions for enterprise",
    ]
    kw_results = await keyword_agent.run(keywords_list, settings)
    strategy = strategy_agent.run(kw_results, [], desktop_performance=desktop_performance)
    return {
        "domain": domain,
        "odi_formula": strategy.odi_formula,
        "pagespeed_impact_used": strategy.pagespeed_impact_used,
        "sci_rankings": [n.model_dump() for n in strategy.sci_rankings],
        "top_opportunities": strategy.top_opportunities,
        "quick_wins": strategy.quick_wins,
    }
