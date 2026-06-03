"""
agents/authority_agent.py
Fetches domain authority metrics from Domain Metrics Check API.
Returns DA, DR, TF, CF, backlinks, ref domains, indexed pages.
"""
import logging
from typing import Optional

import aiohttp

from core.config import Settings
from core.models import AuthorityResult

logger = logging.getLogger(__name__)


async def run(domain: str, settings: Settings) -> AuthorityResult:
    """
    Fetch domain authority metrics.
    Endpoint: GET /domain-metrics/{domain}/
    """
    url = f"https://domain-metrics-check.p.rapidapi.com/domain-metrics/{domain}/"
    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": settings.domain_metrics_host,
        "Accept-Encoding": "gzip, deflate",
    }

    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=20)) as resp:
                if resp.status == 200:
                    data = await resp.json(content_type=None)
                    return _parse(domain, data)
                else:
                    text = await resp.text()
                    logger.error(f"AuthorityAgent {resp.status}: {text[:300]}")
                    return _empty(domain)
        except Exception as e:
            logger.error(f"AuthorityAgent exception: {e}")
            return _empty(domain)


def _parse(domain: str, data: dict) -> AuthorityResult:
    """Parse Domain Metrics Check response into AuthorityResult."""
    def safe_int(val, default=0) -> int:
        try:
            return int(val or default)
        except (ValueError, TypeError):
            return default

    return AuthorityResult(
        domain=domain,
        moz_da=safe_int(data.get("moz_da")),
        moz_pa=safe_int(data.get("moz_pa")),
        ahrefs_dr=safe_int(data.get("ahrefs_dr")),
        majestic_tf=safe_int(data.get("majestic_tf")),
        majestic_cf=safe_int(data.get("majestic_cf")),
        backlinks=safe_int(data.get("ahrefs_backlinks")),
        ref_domains=safe_int(data.get("ahrefs_ref_domains")),
        indexed_pages=safe_int(data.get("majestic_crawled_pages", data.get("pretty_page_count"))),
        organic_keywords=safe_int(data.get("ahrefs_organic_keywords")),
    )


def _empty(domain: str) -> AuthorityResult:
    return AuthorityResult(
        domain=domain,
        moz_da=0, moz_pa=0, ahrefs_dr=0,
        majestic_tf=0, majestic_cf=0,
        backlinks=0, ref_domains=0,
        indexed_pages=0, organic_keywords=0,
    )
