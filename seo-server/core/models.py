"""
core/models.py — Pydantic models for all agent inputs/outputs.
"""
from __future__ import annotations
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


# ── Request ───────────────────────────────────────────────────────────────────

class AuditRequest(BaseModel):
    domain: str = Field(..., example="jedilabs.org")
    keywords: List[str] = Field(
        default=[
            "enterprise AI solutions",
            "AI agents platform",
            "AI agent framework",
            "AI automation platform",
            "AI consulting services",
            "LLM orchestration",
            "multi-agent AI",
            "AI solutions for enterprise",
        ]
    )
    pages: List[PageNode] = Field(default_factory=list)


class PageNode(BaseModel):
    path: str
    title: str
    primary_keyword: str
    relevance: float = 0.8


# ── Agent outputs ─────────────────────────────────────────────────────────────

class KeywordResult(BaseModel):
    keyword: str
    volume: int
    kd: float
    source: str
    competition_index: Optional[float] = None


class AuthorityResult(BaseModel):
    domain: str
    moz_da: int
    moz_pa: int
    ahrefs_dr: int
    majestic_tf: int
    majestic_cf: int
    backlinks: int
    ref_domains: int
    indexed_pages: int
    organic_keywords: int


class TrafficResult(BaseModel):
    domain: str
    monthly_visits: int
    top_keywords: List[Dict[str, Any]]
    snapshot_date: str


class TechnicalResult(BaseModel):
    url: str
    strategy: str
    performance: Optional[int]
    seo_score: Optional[int]
    accessibility: Optional[int]
    fcp_ms: Optional[float]
    lcp_ms: Optional[float]
    tbt_ms: Optional[float]
    unused_js_kib: Optional[float]
    spa_signal: bool
    status: int
    error: Optional[str] = None


class CrawlabilityResult(BaseModel):
    indexed_pages: int
    organic_keywords: int
    spa_confirmed: bool
    tbt_ms: Optional[float]
    unused_js_kib: Optional[float]
    severity: str  # "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
    root_cause: str
    fix_priority: int  # 0 = must fix before anything else
    recommendations: List[str]


class SCINode(BaseModel):
    path: str
    title: str
    primary_keyword: str
    volume: int
    kd: float
    relevance: float
    competitor_score: float
    sci: float


class StrategyResult(BaseModel):
    sci_rankings: List[SCINode]
    top_opportunities: List[Dict[str, Any]]
    quick_wins: List[str]
    ninety_day_plan: List[Dict[str, Any]]


class LLMSynthesis(BaseModel):
    executive_summary: str
    critical_blockers: List[str]
    top_3_actions: List[str]
    page_briefs: List[Dict[str, Any]]
    model_used: str


# ── Full audit response ───────────────────────────────────────────────────────

class AuditResponse(BaseModel):
    domain: str
    audit_timestamp: str
    keywords: List[KeywordResult]
    authority: AuthorityResult
    traffic: TrafficResult
    technical: List[TechnicalResult]
    crawlability: CrawlabilityResult
    strategy: StrategyResult
    synthesis: Optional[LLMSynthesis] = None
    data_quality_notes: List[str] = Field(default_factory=list)
