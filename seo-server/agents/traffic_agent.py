"""
agents/traffic_agent.py
Fetches organic traffic + top keywords from Similarweb.
Runs two concurrent requests: /seo and /traffic endpoints.
"""
import asyncio
import logging
from typing import Any, Dict, List

import aiohttp

from core.config import Settings
from core.models import TrafficResult

logger = logging.getLogger(__name__)


async def _fetch_sw(
    session: aiohttp.ClientSession,
    endpoint: str,
    domain: str,
    settings: Settings,
) -> dict:
    url = f"https://similarweb12.p.rapidapi.com/{endpoint}"
    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": settings.similarweb_host,
        "Accept-Encoding": "gzip, deflate",
    }
    params = {"domain": domain}
    try:
        async with session.get(url, headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=20)) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                return {"endpoint": endpoint, "status": 200, "data": data}
            else:
                text = await resp.text()
                logger.warning(f"Similarweb /{endpoint} {resp.status}: {text[:200]}")
                return {"endpoint": endpoint, "status": resp.status, "data": None}
    except Exception as e:
        logger.error(f"Similarweb /{endpoint} exception: {e}")
        return {"endpoint": endpoint, "status": 0, "data": None, "error": str(e)}


async def run(domain: str, settings: Settings) -> TrafficResult:
    """
    Fetch Similarweb SEO + traffic data concurrently.
    """
    async with aiohttp.ClientSession() as session:
        seo_task = _fetch_sw(session, "seo", domain, settings)
        traffic_task = _fetch_sw(session, "traffic", domain, settings)
        seo_raw, traffic_raw = await asyncio.gather(seo_task, traffic_task)

    monthly_visits = 0
    top_keywords: List[Dict[str, Any]] = []
    snapshot_date = "unknown"

    # Parse traffic
    if traffic_raw.get("status") == 200 and traffic_raw.get("data"):
        td = traffic_raw["data"]
        monthly_visits = int(td.get("visits", td.get("monthly_visits", 0)) or 0)
        snapshot_date = td.get("snapshot_date", td.get("date", "unknown"))

    # Parse SEO keywords
    if seo_raw.get("status") == 200 and seo_raw.get("data"):
        sd = seo_raw["data"]
        kws = sd.get("top_keywords", sd.get("keywords", []))
        if isinstance(kws, list):
            top_keywords = [
                {
                    "keyword": k.get("keyword", k.get("name", "")),
                    "volume": int(k.get("volume", k.get("search_volume", 0)) or 0),
                    "traffic_share": float(k.get("traffic_share", k.get("share", 0)) or 0),
                }
                for k in kws[:20]
            ]

    return TrafficResult(
        domain=domain,
        monthly_visits=monthly_visits,
        top_keywords=top_keywords,
        snapshot_date=str(snapshot_date),
    )
