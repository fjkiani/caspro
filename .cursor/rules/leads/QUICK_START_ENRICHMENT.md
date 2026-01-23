# Quick Start: Data Enrichment Guide

## TL;DR - Best Approach

**Recommended Strategy**: **Hybrid Automated + Manual**

1. **Start with Automated Bulk Enrichment** (Week 1)
   - Use the `clinic_data_enricher.py` script to scrape all clinic websites
   - Extract emails, phones, technology mentions automatically
   - **Expected**: 70-75% data completion

2. **Manual Research for High-Value Targets** (Week 2-3)
   - Focus on Tier 1A & 1B (30 clinics)
   - Use LinkedIn, professional directories
   - **Expected**: 85-90% data completion for top tiers

3. **Deep Dive on Top 6 Tier 1A** (Week 4)
   - Full intelligence gathering
   - Multiple contacts per clinic
   - Strategic intelligence
   - **Expected**: 95%+ data completion

## What Data Can We Extract?

### ✅ **High Success Rate (70-90%)**
- Website contact information (emails, phones)
- Technology mentions (genomic, precision medicine, etc.)
- Research focus areas
- Leadership team pages
- Clinical trial information (academic centers)
- Publications (academic centers)

### ⚠️ **Medium Success Rate (40-60%)**
- Direct decision-maker emails
- LinkedIn professional information
- Patient volume data
- Budget/funding information

### ❌ **Low Success Rate (<30%)**
- Private contact information
- Internal organizational data
- Financial details (unless public company)

## Quick Start Commands

### 1. Install Dependencies
```bash
pip install beautifulsoup4 requests lxml
```

### 2. Run Automated Enrichment
```bash
# Process all clinics
python tools/clinic_data_enricher.py \
  .cursor/rules/leads/Untitled\ spCrisPRO\ Integrative\ Oncology\ Clinics\ -\ Outreach\ Database\ \(Jan\ 2026\)readsheet\ -\ Sheet1.csv \
  .cursor/rules/leads/enrichment_results.json

# Process first 10 clinics (test run)
python tools/clinic_data_enricher.py \
  .cursor/rules/leads/Untitled\ spCrisPRO\ Integrative\ Oncology\ Clinics\ -\ Outreach\ Database\ \(Jan\ 2026\)readsheet\ -\ Sheet1.csv \
  .cursor/rules/leads/enrichment_results.json \
  0 \
  10
```

### 3. Review Results
```bash
# View enrichment results
cat .cursor/rules/leads/enrichment_results.json | python -m json.tool | less
```

## Expected Output Per Clinic

```json
{
  "clinic_name": "MD Anderson Cancer Center",
  "website": "mdanderson.org",
  "scraped_emails": [
    "CWu19@MDAnderson.org",
    "cancercto@ucsd.edu"
  ],
  "scraped_phones": [
    "(713) 582-2393",
    "(877) 632-6789"
  ],
  "contact_page_url": "https://mdanderson.org/contact",
  "leadership_page_url": "https://mdanderson.org/about/leadership",
  "technology_mentions": [
    "genomic",
    "precision medicine",
    "immunotherapy",
    "molecular profiling"
  ],
  "research_mentions": [
    "clinical trial",
    "research",
    "precision oncology"
  ],
  "pubmed_results": [
    {"pmid": "12345678"},
    {"pmid": "12345679"}
  ],
  "errors": []
}
```

## Time Investment

- **Automated (All 65 clinics)**: 8-12 hours
- **Manual (Tier 1A & 1B - 30 clinics)**: 20-30 hours
- **Deep Dive (Tier 1A - 6 clinics)**: 10-15 hours
- **Total**: 38-57 hours

## Priority Order

1. **Tier 1A (6 clinics)**: Full manual research + deep dive
2. **Tier 1B (24 clinics)**: Automated + manual research
3. **Tier 2+ (35 clinics)**: Automated only

## Next Steps

1. ✅ Run automated enrichment script
2. ✅ Review results, identify gaps
3. ✅ Prioritize Tier 1A & 1B for manual research
4. ✅ Create enhanced database with enriched data
5. ✅ Begin outreach with complete contact information
