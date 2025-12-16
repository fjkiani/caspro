/**
 * Dynamic API Endpoint Page
 * Renders API endpoints parsed from endpoints.mdc
 */

import { notFound } from 'next/navigation';
import { parseEndpointsMDC } from '@/lib/docs/parser';
import APIExplorerAdapter from '@/components/docs/adapters/APIExplorerAdapter';
import type { APIEndpoint } from '@/lib/docs/hygraph/types';

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

