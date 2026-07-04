/**
 * Dynamic API Endpoint Page
 * Renders API endpoints parsed from endpoints.mdc
 */

import { notFound } from 'next/navigation';
import { parseEndpointsMDC } from '@/lib/docs/parser';
import APIExplorerAdapter from '@/components/docs/adapters/APIExplorerAdapter';
import type { APIEndpoint } from '@/lib/docs/hygraph/types';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }> | { endpoint: string };
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const slug = resolved.endpoint;
  const humanized = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${humanized} API`,
    description: `${humanized} endpoint reference for the CrisPRO.ai API: parameters, responses, and example requests.`,
    alternates: { canonical: `/docs/api/${slug}` },
  };
}

interface PageProps {
  params: Promise<{ endpoint: string }>;
}

export async function generateStaticParams() {
  try {
    const endpoints = await parseEndpointsMDC();
    return endpoints.map((endpoint) => ({
      endpoint: endpoint.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function APIEndpointPage({ params }: PageProps) {
  const { endpoint: endpointId } = await params;
  
  // Parse endpoints from MDC
  const endpoints = await parseEndpointsMDC();
  const endpoint = endpoints.find((e) => e.id === endpointId);

  if (!endpoint) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <APIExplorerAdapter endpoint={endpoint} />
    </div>
  );
}

