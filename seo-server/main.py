"""
main.py — JEDI Labs SEO Intelligence API
FastAPI multi-agent orchestrator for SEO auditing.

Architecture:
  - Tier 1 (asyncio.gather): KeywordAgent + AuthorityAgent + TrafficAgent run concurrently
  - Tier 2 (inline): TechnicalAgent desktop (blocking, primary signal)
  - Tier 3 (BackgroundTask): TechnicalAgent mobile (non-blocking, rate-limit safe)
  - Tier 4 (inline): CrawlabilityAgent (pure computation, no API)
  - Tier 5 (inline): StrategyAgent (SCI computation, no API)
  - Tier 6 (inline): LLMAgent (OpenRouter synthesis, optional)

Usage:
  uvicorn main:app --reload --port 8000
  curl http://localhost:8000/audit/jedilabs.org
  curl http://localhost:8000/health
"""
import asyncio
import json
import logging
import os
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

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
from core.models import AuditRequest, AuditResponse, PageNode

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="JEDI Labs SEO Intelligence API",
    description="Multi-agent SEO audit framework with live RapidAPI data + LLM synthesis",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for background mobile PageSpeed results
_mobile_results: Dict[str, Any] = {}


# ── Background worker: mobile PageSpeed ───────────────────────────────────────
async def _run_mobile_pagespeed(domain: str) -> None:
    """
    Background task: fetch mobile PageSpeed and store result.
    Non-blocking — does not delay the main audit response.
    """
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
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/audit", response_model=AuditResponse)
@app.get("/audit/{domain}", response_model=AuditResponse)
async def run_audit(
    background_tasks: BackgroundTasks,
    domain: str = "jedilabs.org",
    body: Optional[AuditRequest] = None,
) -> AuditResponse:
    """
    Run full SEO audit for a domain.

    GET  /audit/jedilabs.org
    POST /audit  {"domain": "jedilabs.org", "keywords": [...], "pages": [...]}

    Tier 1 (concurrent): KeywordAgent + AuthorityAgent + TrafficAgent
    Tier 2 (inline):     TechnicalAgent desktop
    Tier 3 (background): TechnicalAgent mobile (non-blocking)
    Tier 4 (compute):    CrawlabilityAgent + StrategyAgent
    Tier 5 (optional):   LLM synthesis via OpenRouter
    """
    settings = get_settings()

    # Merge GET params with POST body
    if body:
        domain = body.domain
        keywords = body.keywords
        pages = body.pages
    else:
        keywords = AuditRequest().keywords
        pages = []

    logger.info(f"Starting audit for {domain} with {len(keywords)} keywords")
    audit_start = datetime.now(timezone.utc)

    # ── Tier 1: Concurrent API calls ──────────────────────────────────────────
    logger.info("Tier 1: Launching concurrent keyword + authority + traffic agents")
    kw_task = keyword_agent.run(keywords, settings)
    auth_task = authority_agent.run(domain, settings)
    traffic_task = traffic_agent.run(domain, settings)

    keyword_results, authority_result, traffic_result = await asyncio.gather(
        kw_task, auth_task, traffic_task,
        return_exceptions=False,
    )
    logger.info(
        f"Tier 1 complete: {len(keyword_results)} keywords, "
        f"DA={authority_result.moz_da}, visits={traffic_result.monthly_visits}"
    )

    # ── Tier 2: Desktop PageSpeed (blocking — primary technical signal) ───────
    logger.info("Tier 2: Desktop PageSpeed (blocking)")
    desktop_result = await technical_agent.run_desktop(domain, settings)
    logger.info(f"Tier 2 complete: desktop perf={desktop_result.performance}, TBT={desktop_result.tbt_ms}ms")

    # ── Tier 3: Mobile PageSpeed (background — non-blocking) ─────────────────
    logger.info("Tier 3: Mobile PageSpeed dispatched as background task")
    background_tasks.add_task(_run_mobile_pagespeed, domain)

    technical_results = [desktop_result]

    # ── Tier 4: Crawlability + Strategy (pure computation) ───────────────────
    logger.info("Tier 4: Crawlability diagnosis + SCI computation")
    crawlability_result = crawlability_agent.run(authority_result, technical_results)
    strategy_result = strategy_agent.run(keyword_results, pages)
    logger.info(
        f"Tier 4 complete: crawlability={crawlability_result.severity}, "
        f"top SCI={strategy_result.sci_rankings[0].sci if strategy_result.sci_rankings else 0}"
    )

    # ── Tier 5: LLM synthesis (optional) ─────────────────────────────────────
    logger.info("Tier 5: LLM synthesis")
    synthesis = await llm_agent.run(
        domain, authority_result, traffic_result,
        crawlability_result, keyword_results, strategy_result, settings,
    )
    if synthesis:
        logger.info(f"Tier 5 complete: synthesis model={synthesis.model_used}")
    else:
        logger.info("Tier 5: LLM synthesis skipped (no OPENROUTER_API_KEY)")

    # ── Data quality notes ────────────────────────────────────────────────────
    data_quality_notes = []
    semrush_kd_zero = [k for k in keyword_results if k.kd == 0.0]
    if semrush_kd_zero:
        data_quality_notes.append(
            f"Semrush global-volume endpoint returns KD=0 for all keywords. "
            f"Using Google KW competition_index as authoritative KD source. "
            f"SCI uses KD=1 floor for {len(semrush_kd_zero)} keywords."
        )
    if traffic_result.monthly_visits == 0:
        data_quality_notes.append(
            "Similarweb reports 0 monthly visits — site is below Similarweb measurement "
            "threshold (<5K visits/mo). Confirms near-zero organic search presence."
        )
    if authority_result.indexed_pages < 10:
        data_quality_notes.append(
            f"Only {authority_result.indexed_pages} pages indexed by Majestic. "
            "Expected 221+ from Hygraph CMS. SPA crawl problem confirmed."
        )

    audit_end = datetime.now(timezone.utc)
    elapsed = (audit_end - audit_start).total_seconds()
    logger.info(f"Audit complete for {domain} in {elapsed:.1f}s")

    return AuditResponse(
        domain=domain,
        audit_timestamp=audit_end.isoformat(),
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
    """
    Retrieve background mobile PageSpeed result.
    Poll this endpoint after /audit returns to get mobile data.
    """
    result = _mobile_results.get(domain)
    if result is None:
        return JSONResponse(
            status_code=202,
            content={"status": "pending", "message": "Mobile PageSpeed still running"},
        )
    return result


@app.get("/sci/{domain}")
async def get_sci_rankings(domain: str = "jedilabs.org"):
    """
    Quick SCI ranking endpoint — uses cached keyword data if available,
    otherwise returns default page inventory with placeholder volumes.
    """
    settings = get_settings()
    keywords = AuditRequest().keywords
    kw_results = await keyword_agent.run(keywords, settings)
    strategy = strategy_agent.run(kw_results, [])
    return {
        "domain": domain,
        "sci_rankings": [n.model_dump() for n in strategy.sci_rankings],
        "top_opportunities": strategy.top_opportunities,
        "quick_wins": strategy.quick_wins,
    }
