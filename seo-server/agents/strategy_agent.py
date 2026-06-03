"""
agents/strategy_agent.py
Computes SCI scores for all page nodes and generates the 90-day action plan.

SCI Formula (PATH A — signed by Fahad Kiani 2026-04-28):
  SCI = (Volume × Relevance) / (KD × Competitor_Score)
  - KD floor = 1 (avoid division by zero; Semrush KD=0 is unreliable)
  - Competitor_Score floor = 1
  - Relevance: 0.0–1.0 (how well the page topic matches the keyword intent)
  - Competitor_Score: 1.0 = no strong competitors; higher = more competition

Page inventory: manually seeded with 14 core JEDI Labs pages.
Full 221-page inventory requires Hygraph API pull (future enhancement).
"""
from typing import Any, Dict, List

from core.models import KeywordResult, PageNode, SCINode, StrategyResult


# Default JEDI Labs page inventory (14 core nodes)
DEFAULT_JEDI_PAGES: List[Dict[str, Any]] = [
    {"path": "/", "title": "JEDI Labs Home", "primary_keyword": "AI agents platform", "relevance": 0.9},
    {"path": "/solutions/enterprise-ai", "title": "Enterprise AI Solutions", "primary_keyword": "enterprise AI solutions", "relevance": 1.0},
    {"path": "/solutions/ai-agents", "title": "AI Agents", "primary_keyword": "AI agents platform", "relevance": 1.0},
    {"path": "/solutions/machine-learning", "title": "Machine Learning Platform", "primary_keyword": "machine learning platform", "relevance": 0.9},
    {"path": "/solutions/llm-orchestration", "title": "LLM Orchestration", "primary_keyword": "LLM orchestration", "relevance": 1.0},
    {"path": "/use-cases/enterprise-ai", "title": "Enterprise AI Use Cases", "primary_keyword": "AI solutions for enterprise", "relevance": 0.95},
    {"path": "/use-cases/automation", "title": "AI Automation Use Cases", "primary_keyword": "AI automation platform", "relevance": 0.9},
    {"path": "/use-cases/consulting", "title": "AI Consulting", "primary_keyword": "AI consulting services", "relevance": 0.85},
    {"path": "/technologies/multi-agent", "title": "Multi-Agent Systems", "primary_keyword": "multi-agent AI", "relevance": 1.0},
    {"path": "/technologies/llm", "title": "LLM Technology", "primary_keyword": "LLM orchestration", "relevance": 0.9},
    {"path": "/technologies/agent-framework", "title": "Agent Framework", "primary_keyword": "AI agent framework", "relevance": 1.0},
    {"path": "/about", "title": "About JEDI Labs", "primary_keyword": "AI consulting services", "relevance": 0.5},
    {"path": "/blog", "title": "JEDI Labs Blog", "primary_keyword": "enterprise AI solutions", "relevance": 0.6},
    {"path": "/contact", "title": "Contact", "primary_keyword": "AI consulting services", "relevance": 0.4},
]


def _compute_sci(volume: int, relevance: float, kd: float, competitor_score: float) -> float:
    """
    SCI = (Volume × Relevance) / (KD × Competitor_Score)
    PATH A formula — signed 2026-04-28.
    """
    kd_safe = max(kd, 1.0)
    comp_safe = max(competitor_score, 1.0)
    return round((volume * relevance) / (kd_safe * comp_safe), 2)


def run(
    keywords: List[KeywordResult],
    pages: List[PageNode],
    competitor_score: float = 1.0,
) -> StrategyResult:
    """
    Compute SCI for all page nodes and generate strategy.
    Uses DEFAULT_JEDI_PAGES if pages list is empty.
    """
    # Build keyword lookup: keyword → (volume, kd)
    kw_lookup: Dict[str, KeywordResult] = {k.keyword.lower(): k for k in keywords}

    # Use provided pages or fall back to default inventory
    page_nodes = pages if pages else [PageNode(**p) for p in DEFAULT_JEDI_PAGES]

    sci_nodes: List[SCINode] = []
    data_quality_notes: List[str] = []

    for page in page_nodes:
        kw_lower = page.primary_keyword.lower()
        kw_data = kw_lookup.get(kw_lower)

        if kw_data:
            volume = kw_data.volume
            kd = kw_data.kd
        else:
            # Keyword not in fetched data — use conservative defaults
            volume = 500
            kd = 10.0
            data_quality_notes.append(
                f"No keyword data for '{page.primary_keyword}' on {page.path}. "
                "Using conservative defaults (vol=500, KD=10)."
            )

        if kd == 0.0:
            data_quality_notes.append(
                f"KD=0 for '{page.primary_keyword}' — using KD=1 floor in SCI calculation."
            )

        sci = _compute_sci(volume, page.relevance, kd, competitor_score)

        sci_nodes.append(SCINode(
            path=page.path,
            title=page.title,
            primary_keyword=page.primary_keyword,
            volume=volume,
            kd=kd,
            relevance=page.relevance,
            competitor_score=competitor_score,
            sci=sci,
        ))

    # Sort by SCI descending
    sci_nodes.sort(key=lambda x: x.sci, reverse=True)

    # ── Top opportunities (top 5 by SCI) ─────────────────────────────────────
    top_opportunities = []
    for node in sci_nodes[:5]:
        top_opportunities.append({
            "rank": sci_nodes.index(node) + 1,
            "path": node.path,
            "title": node.title,
            "keyword": node.primary_keyword,
            "volume": node.volume,
            "kd": node.kd,
            "sci": node.sci,
            "action": _generate_action(node),
        })

    # ── Quick wins (KD < 20, volume > 1000) ──────────────────────────────────
    quick_wins = [
        f"{n.path} → '{n.primary_keyword}' (vol={n.volume:,}, KD={n.kd}, SCI={n.sci:,.0f})"
        for n in sci_nodes
        if n.kd < 20 and n.volume > 1000
    ]

    # ── 90-day plan ───────────────────────────────────────────────────────────
    ninety_day_plan = [
        {
            "phase": "Days 1–30: Fix Crawlability (Priority 0)",
            "actions": [
                "Migrate to Next.js SSR/SSG or add Vite SSR plugin",
                "Generate and submit XML sitemap for all 221 Hygraph pages",
                "Add <meta name=\"description\"> to all page templates",
                "Implement dynamic rendering (Prerender.io) as bridge",
                "Set up Google Search Console and submit sitemap",
            ],
            "expected_outcome": "Google begins indexing all 221 pages. Organic keyword count rises from 0.",
        },
        {
            "phase": "Days 31–60: On-Page Optimisation for Top SCI Pages",
            "actions": [
                f"Optimise {sci_nodes[0].path} for '{sci_nodes[0].primary_keyword}' (SCI={sci_nodes[0].sci:,.0f})",
                f"Optimise {sci_nodes[1].path} for '{sci_nodes[1].primary_keyword}' (SCI={sci_nodes[1].sci:,.0f})",
                f"Optimise {sci_nodes[2].path} for '{sci_nodes[2].primary_keyword}' (SCI={sci_nodes[2].sci:,.0f})",
                "Add structured data (JSON-LD) to all solution and use-case pages",
                "Internal linking: connect all /technologies/ pages to /solutions/ pages",
            ],
            "expected_outcome": "Top 3 SCI pages begin appearing in Google for target keywords.",
        },
        {
            "phase": "Days 61–90: Authority + Content Moat",
            "actions": [
                "Publish 4 long-form blog posts targeting quick-win keywords (KD<20)",
                "Build 10 high-quality backlinks via guest posts on AI/ML publications",
                "Launch TechDemoPanel interactive demos as linkable assets",
                "Create comparison pages: 'JEDI Labs vs [competitor]' for AI agent frameworks",
                "Submit to AI tool directories (Futurepedia, There's An AI For That, etc.)",
            ],
            "expected_outcome": "DA rises from 5 to 15+. First page rankings for KD<20 keywords.",
        },
    ]

    return StrategyResult(
        sci_rankings=sci_nodes,
        top_opportunities=top_opportunities,
        quick_wins=quick_wins,
        ninety_day_plan=ninety_day_plan,
    )


def _generate_action(node: SCINode) -> str:
    """Generate a one-line action brief for a page node."""
    if node.kd < 10:
        urgency = "QUICK WIN"
    elif node.kd < 25:
        urgency = "HIGH PRIORITY"
    else:
        urgency = "MEDIUM PRIORITY"

    return (
        f"[{urgency}] Add H1 + meta description targeting '{node.primary_keyword}'. "
        f"Ensure SSR renders full content. Add JSON-LD SoftwareApplication schema."
    )
