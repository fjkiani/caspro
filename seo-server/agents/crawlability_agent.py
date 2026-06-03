"""
agents/crawlability_agent.py
Synthesises authority + technical data into a crawlability diagnosis.
This is Priority 0 — no SEO tactic matters until crawlability is fixed.

SPA Detection Logic:
  - Majestic indexed_pages < 10 AND ahrefs_organic_keywords == 0 → indexation crisis
  - PageSpeed TBT > 300ms AND unused_js > 100 KiB → SPA bundle not code-split
  - Combined → Vite/React SPA with no SSR/SSG confirmed
"""
from typing import List

from core.models import AuthorityResult, CrawlabilityResult, TechnicalResult


INDEXED_PAGES_THRESHOLD = 10
ORGANIC_KW_THRESHOLD = 5
TBT_SPA_THRESHOLD = 300.0
UNUSED_JS_SPA_THRESHOLD = 100.0


def run(authority: AuthorityResult, technical: List[TechnicalResult]) -> CrawlabilityResult:
    """
    Synthesise crawlability diagnosis from authority + technical data.
    No API calls — pure computation on already-fetched data.
    """
    indexed = authority.indexed_pages
    organic_kw = authority.organic_keywords

    # Find desktop PageSpeed result
    desktop = next((t for t in technical if t.strategy == "desktop" and t.status == 200), None)
    tbt = desktop.tbt_ms if desktop else None
    unused_js = desktop.unused_js_kib if desktop else None

    # ── Severity classification ───────────────────────────────────────────────
    spa_confirmed = bool(
        tbt is not None and tbt > TBT_SPA_THRESHOLD and
        unused_js is not None and unused_js > UNUSED_JS_SPA_THRESHOLD
    )
    indexation_crisis = indexed < INDEXED_PAGES_THRESHOLD and organic_kw < ORGANIC_KW_THRESHOLD

    if indexation_crisis and spa_confirmed:
        severity = "CRITICAL"
        root_cause = (
            f"Vite SPA with no SSR/SSG. Googlebot fetches <div id=\"root\"></div> and "
            f"abandons rendering. Only {indexed} pages indexed (expected 221+). "
            f"TBT={tbt}ms + {unused_js} KiB unused JS confirms un-split bundle. "
            "All keyword and content work is blocked until this is resolved."
        )
        fix_priority = 0
    elif indexation_crisis:
        severity = "CRITICAL"
        root_cause = (
            f"Severe under-indexation: only {indexed} pages indexed, {organic_kw} organic keywords. "
            "Likely SPA crawl problem or robots.txt/noindex misconfiguration."
        )
        fix_priority = 0
    elif spa_confirmed:
        severity = "HIGH"
        root_cause = (
            f"SPA bundle not code-split (TBT={tbt}ms, {unused_js} KiB unused JS). "
            "Googlebot rendering budget may be exhausted before hydration completes."
        )
        fix_priority = 1
    else:
        severity = "MEDIUM"
        root_cause = "No critical crawlability issues detected. Standard SEO optimisation applies."
        fix_priority = 2

    # ── Recommendations ───────────────────────────────────────────────────────
    recommendations: List[str] = []

    if severity == "CRITICAL" and spa_confirmed:
        recommendations += [
            "IMMEDIATE: Migrate to Next.js (SSR/SSG) or add Vite SSR plugin. "
            "This is the single highest-leverage action — it unlocks all 221 Hygraph pages for indexation.",
            "Add a static sitemap.xml listing all /technologies/, /solutions/, /use-cases/ paths. "
            "Submit to Google Search Console immediately.",
            "Implement dynamic rendering (Rendertron/Prerender.io) as a short-term bridge "
            "while SSR migration is in progress.",
            "Add <meta name=\"description\"> tags to all pages — PageSpeed SEO score is 0, "
            "indicating missing meta tags on the rendered HTML shell.",
            "Code-split the Vite bundle: use React.lazy() + Suspense for route-level splitting. "
            f"Current unused JS: {unused_js} KiB. Target: <50 KiB per route.",
        ]
    elif severity == "HIGH":
        recommendations += [
            f"Code-split Vite bundle (currently {unused_js} KiB unused JS). "
            "Use React.lazy() + dynamic imports for route-level splitting.",
            "Add SSG for static pages (/about, /solutions, /use-cases) using vite-plugin-ssg.",
            "Implement prerendering for top SCI pages as immediate fix.",
        ]
    else:
        recommendations += [
            "Ensure all pages have unique <title> and <meta name=\"description\"> tags.",
            "Submit XML sitemap to Google Search Console.",
            "Monitor Core Web Vitals in Search Console.",
        ]

    return CrawlabilityResult(
        indexed_pages=indexed,
        organic_keywords=organic_kw,
        spa_confirmed=spa_confirmed,
        tbt_ms=tbt,
        unused_js_kib=unused_js,
        severity=severity,
        root_cause=root_cause,
        fix_priority=fix_priority,
        recommendations=recommendations,
    )
