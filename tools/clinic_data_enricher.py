#!/usr/bin/env python3
"""
Clinic Data Enrichment Tool
Extracts contact information and key data from clinic websites and public sources
"""

import csv
import json
import re
import time
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from typing import Dict, List, Optional, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ClinicDataEnricher:
    """Extracts data from clinic websites and public sources"""
    
    def __init__(self, delay: float = 1.0):
        self.delay = delay  # Delay between requests (seconds)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def extract_emails(self, text: str) -> List[str]:
        """Extract email addresses from text"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        # Filter out common non-contact emails
        filtered = [e for e in emails if not any(x in e.lower() for x in ['noreply', 'donotreply', 'privacy', 'webmaster'])]
        return list(set(filtered))
    
    def extract_phones(self, text: str) -> List[str]:
        """Extract phone numbers from text"""
        # US phone patterns
        patterns = [
            r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',  # (123) 456-7890
            r'\d{3}[-.\s]?\d{3}[-.\s]?\d{4}',        # 123-456-7890
            r'\(\d{3}\)\s?\d{3}-\d{4}',              # (123) 456-7890
        ]
        phones = []
        for pattern in patterns:
            phones.extend(re.findall(pattern, text))
        return list(set(phones))
    
    def scrape_website(self, url: str) -> Dict[str, any]:
        """Scrape clinic website for contact information and key data"""
        result = {
            'url': url,
            'emails': [],
            'phones': [],
            'contact_page': None,
            'leadership_page': None,
            'about_page': None,
            'research_mentions': [],
            'technology_mentions': [],
            'error': None
        }
        
        try:
            # Ensure URL has protocol
            if not url.startswith('http'):
                url = f'https://{url}'
            
            logger.info(f"Scraping {url}")
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            text = soup.get_text()
            
            # Extract emails and phones from main page
            result['emails'] = self.extract_emails(text)
            result['phones'] = self.extract_phones(text)
            
            # Find common page links
            links = soup.find_all('a', href=True)
            link_texts = [link.get_text().lower() for link in links]
            link_hrefs = [link['href'] for link in links]
            
            # Look for contact/about/team pages
            contact_keywords = ['contact', 'reach', 'connect', 'location']
            about_keywords = ['about', 'team', 'staff', 'physicians', 'doctors', 'leadership']
            research_keywords = ['research', 'clinical trials', 'publications', 'studies']
            
            for i, link_text in enumerate(link_texts):
                href = link_hrefs[i]
                full_url = urljoin(url, href)
                
                if any(kw in link_text for kw in contact_keywords):
                    result['contact_page'] = full_url
                if any(kw in link_text for kw in about_keywords):
                    result['leadership_page'] = full_url
                if any(kw in link_text for kw in research_keywords):
                    result['about_page'] = full_url
            
            # Extract technology/research mentions
            tech_keywords = [
                'genomic', 'precision medicine', 'immunotherapy', 'CAR-T', 'NGS',
                'liquid biopsy', 'molecular profiling', 'targeted therapy', 'AI', 'machine learning',
                'AlphaFold', 'genomic testing', 'tumor board', 'personalized medicine'
            ]
            
            for keyword in tech_keywords:
                if keyword.lower() in text.lower():
                    result['technology_mentions'].append(keyword)
            
            # Look for research mentions
            research_patterns = [
                r'clinical trial[s]?',
                r'research',
                r'publication[s]?',
                r'study',
                r'precision oncology'
            ]
            
            for pattern in research_patterns:
                if re.search(pattern, text, re.IGNORECASE):
                    result['research_mentions'].append(pattern)
            
            time.sleep(self.delay)  # Be respectful
            
        except Exception as e:
            logger.error(f"Error scraping {url}: {str(e)}")
            result['error'] = str(e)
        
        return result
    
    def scrape_contact_page(self, url: str) -> Dict[str, any]:
        """Scrape contact page for additional information"""
        result = {
            'emails': [],
            'phones': [],
            'addresses': [],
            'error': None
        }
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            text = soup.get_text()
            
            result['emails'] = self.extract_emails(text)
            result['phones'] = self.extract_phones(text)
            
            # Try to extract addresses (basic pattern)
            address_pattern = r'\d+[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Circle|Cir)[\w\s,]+(?:[A-Z]{2})?\s?\d{5}'
            addresses = re.findall(address_pattern, text)
            result['addresses'] = addresses
            
            time.sleep(self.delay)
            
        except Exception as e:
            logger.error(f"Error scraping contact page {url}: {str(e)}")
            result['error'] = str(e)
        
        return result
    
    def search_pubmed(self, institution: str, max_results: int = 10) -> List[Dict]:
        """Search PubMed for recent publications from institution"""
        results = []
        
        try:
            # PubMed API endpoint
            base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
            params = {
                'db': 'pubmed',
                'term': f'{institution}[Affiliation]',
                'retmax': max_results,
                'retmode': 'json',
                'sort': 'pub_date'
            }
            
            response = self.session.get(base_url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            pmids = data.get('esearchresult', {}).get('idlist', [])
            
            # Get article details
            if pmids:
                fetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
                fetch_params = {
                    'db': 'pubmed',
                    'id': ','.join(pmids[:5]),  # Limit to 5 for speed
                    'retmode': 'xml'
                }
                
                fetch_response = self.session.get(fetch_url, params=fetch_params, timeout=10)
                # Parse XML would go here - simplified for now
                results = [{'pmid': pmid} for pmid in pmids[:5]]
            
            time.sleep(self.delay)
            
        except Exception as e:
            logger.error(f"Error searching PubMed for {institution}: {str(e)}")
        
        return results
    
    def enrich_clinic_data(self, clinic_name: str, website: str, 
                          existing_data: Dict = None) -> Dict:
        """Main enrichment function - combines all data sources"""
        enriched = {
            'clinic_name': clinic_name,
            'website': website,
            'scraped_emails': [],
            'scraped_phones': [],
            'contact_page_url': None,
            'leadership_page_url': None,
            'technology_mentions': [],
            'research_mentions': [],
            'pubmed_results': [],
            'errors': []
        }
        
        # Scrape main website
        main_result = self.scrape_website(website)
        enriched['scraped_emails'].extend(main_result.get('emails', []))
        enriched['scraped_phones'].extend(main_result.get('phones', []))
        enriched['contact_page_url'] = main_result.get('contact_page')
        enriched['leadership_page_url'] = main_result.get('leadership_page')
        enriched['technology_mentions'] = main_result.get('technology_mentions', [])
        enriched['research_mentions'] = main_result.get('research_mentions', [])
        
        if main_result.get('error'):
            enriched['errors'].append(f"Main site: {main_result['error']}")
        
        # Scrape contact page if found
        if main_result.get('contact_page'):
            logger.info(f"Scraping contact page: {main_result['contact_page']}")
            contact_result = self.scrape_contact_page(main_result['contact_page'])
            enriched['scraped_emails'].extend(contact_result.get('emails', []))
            enriched['scraped_phones'].extend(contact_result.get('phones', []))
            
            if contact_result.get('error'):
                enriched['errors'].append(f"Contact page: {contact_result['error']}")
        
        # Also scrape leadership page for key personnel
        if main_result.get('leadership_page'):
            logger.info(f"Scraping leadership page: {main_result['leadership_page']}")
            leadership_result = self.scrape_contact_page(main_result['leadership_page'])
            enriched['scraped_emails'].extend(leadership_result.get('emails', []))
            enriched['scraped_phones'].extend(leadership_result.get('phones', []))
            
            if leadership_result.get('error'):
                enriched['errors'].append(f"Leadership page: {leadership_result['error']}")
        
        # Search PubMed for academic centers
        if 'university' in clinic_name.lower() or 'institute' in clinic_name.lower() or 'center' in clinic_name.lower():
            pubmed_results = self.search_pubmed(clinic_name)
            enriched['pubmed_results'] = pubmed_results
        
        # Deduplicate
        enriched['scraped_emails'] = list(set(enriched['scraped_emails']))
        enriched['scraped_phones'] = list(set(enriched['scraped_phones']))
        
        return enriched


def process_csv_file(input_file: str, output_file: str, start_row: int = 0, 
                    max_rows: int = None):
    """Process CSV file and enrich clinic data"""
    enricher = ClinicDataEnricher(delay=2.0)  # 2 second delay between requests
    
    results = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        # Skip first two header rows, then read CSV
        lines = f.readlines()
        # Find the actual header row (line 3, index 2)
        header_line = lines[2] if len(lines) > 2 else lines[0]
        
        # Create a new file-like object starting from header
        from io import StringIO
        csv_content = ''.join(lines[2:])  # Start from line 3 (index 2)
        reader = csv.DictReader(StringIO(csv_content))
        rows = list(reader)
        
        # Filter out empty rows
        rows = [r for r in rows if r.get('Clinic Name', '').strip()]
        
        # Apply limits
        if max_rows:
            rows = rows[start_row:start_row + max_rows]
        else:
            rows = rows[start_row:]
        
        for i, row in enumerate(rows):
            clinic_name = row.get('Clinic Name', '').strip()
            website = row.get('Website', '').strip()
            
            if not clinic_name or not website:
                logger.warning(f"Skipping row {i+1}: Missing clinic name or website")
                continue
            
            logger.info(f"Processing {i+1}/{len(rows)}: {clinic_name}")
            
            enriched = enricher.enrich_clinic_data(clinic_name, website, row)
            results.append(enriched)
            
            # Save progress every 10 clinics
            if (i + 1) % 10 == 0:
                save_results(results, output_file)
                logger.info(f"Progress saved: {i+1}/{len(rows)} clinics processed")
    
    # Final save
    save_results(results, output_file)
    logger.info(f"Completed! Processed {len(results)} clinics")


def save_results(results: List[Dict], output_file: str):
    """Save enrichment results to JSON file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)


if __name__ == '__main__':
    import sys
    
    input_file = sys.argv[1] if len(sys.argv) > 1 else '.cursor/rules/leads/Untitled spCrisPRO Integrative Oncology Clinics - Outreach Database (Jan 2026)readsheet - Sheet1.csv'
    output_file = sys.argv[2] if len(sys.argv) > 2 else '.cursor/rules/leads/enrichment_results.json'
    start_row = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    max_rows = int(sys.argv[4]) if len(sys.argv) > 4 else None
    
    print(f"Processing {input_file}")
    print(f"Output: {output_file}")
    print(f"Starting at row {start_row}")
    if max_rows:
        print(f"Processing {max_rows} rows")
    
    process_csv_file(input_file, output_file, start_row, max_rows)
