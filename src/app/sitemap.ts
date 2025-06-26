import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://crispro.ai' // Replace with your actual domain
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/agents',
    '/blog',
    '/careers',
    '/co-pilot-app',
    '/co-pilot-app/precision-rad',
    '/co-pilot-app/agentic-emr',
    '/co-pilot-app/crispr-intelligence',
    '/competitor-analysis',
    '/genome-editing',
    '/hipaa-statement',
    '/investment-thesis',
    '/knowledge-graph',
    '/privacy',
    '/security-overview',
    '/terms',
    '/visualization-demo',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 
                    route.includes('/blog') ? 'weekly' : 
                    route.includes('/investment-thesis') ? 'monthly' :
                    route.includes('/competitor-analysis') ? 'monthly' :
                    'monthly',
    priority: route === '' ? 1 : 
             route === '/investment-thesis' ? 0.9 :
             route === '/about' ? 0.8 :
             route.includes('/co-pilot-app') ? 0.8 :
             route === '/blog' ? 0.7 :
             0.6,
  }))
} 